import { playSound } from '../audio/sound';
import { useEffect, useRef, useState } from 'react';

type TerrainType = 'poor' | 'medium' | 'rich' | 'corridor';

type Civilization = {
  id: number;
  label: string;
  territory: number;
  resources: number;
  institutions: number;
  collapsedTiles: number;
  startTerrain: TerrainType;
};

type BuildOption = { index: number; sharedWith: number[] };
type BuildDecision = BuildOption & { cost: number };

type Tile = {
  terrain: TerrainType;
  owner: number | null;
  institution: boolean;
  house: boolean;
  corridorDepth: number;
};

type CrisisSummary = {
  turn: number;
  label: string;
  description: string;
};

type AccessRule = 'exclusive' | 'shared';

type SimulationState = {
  seed: number;
  rule: AccessRule;
  width: number;
  height: number;
  tick: number;
  ready: boolean;
  world: Tile[];
  civilizations: Civilization[];
  playerId: number;
  crisisCount: number;
  lastCrisis: CrisisSummary | null;
  buildOptions: BuildOption[];
  buildDecision: BuildDecision | null;
};

type MetricsSnapshot = {
  rule: AccessRule;
  tick: number;
  ready: boolean;
  playerStartTerrain: TerrainType | null;
  playerTerritory: number;
  playerResources: number;
  playerInstitutions: number;
  playerResilience: number;
  leadingTerritory: number;
  leadingResources: number;
  crisisCount: number;
  lastCrisis: CrisisSummary | null;
  buildOptions: Array<BuildOption & { terrain: TerrainType; row: number; column: number }>;
  buildDecision: BuildDecision | null;
  interpretation: string;
  systemSignal: string;
  summaryReady: boolean;
  finalStandings: Array<{
    id: number;
    label: string;
    territory: number;
    resources: number;
    institutions: number;
    startTerrain: TerrainType;
  }>;
};

const GRID_WIDTH = 32;
const GRID_HEIGHT = 21;
const PLAYER_ID = 0;
const NPC_COUNT = 3;
const CRISIS_INTERVAL = 12;
const MAX_TURNS = 48;
const BUILD_COST = 3;
const REPO_URL = 'https://github.com/cynyassy/simulation_civilisation_perspective';

const TERRAIN_YIELD: Record<TerrainType, number> = {
  poor: 0.8,
  medium: 1.35,
  rich: 2.15,
  corridor: 2.7,
};

const TERRAIN_FILL: Record<TerrainType, string> = {
  poor: '#ffffff',
  medium: '#efefef',
  rich: '#bfe3a1',
  corridor: '#5ea85a',
};

const TERRAIN_LABEL: Record<TerrainType, string> = {
  poor: 'poor land',
  medium: 'medium land',
  rich: 'rich land',
  corridor: 'fertile corridor',
};

const OWNER_FILL = ['#ffdf00', '#111111', '#ffffff', '#fff7b8'];

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function terrainPriority(terrain: TerrainType) {
  return terrain === 'corridor' ? 4 : terrain === 'rich' ? 3 : terrain === 'medium' ? 2 : 1;
}

function indexFor(x: number, y: number, width: number) {
  return y * width + x;
}

function coordsFor(index: number, width: number) {
  return { x: index % width, y: Math.floor(index / width) };
}

function neighbors(index: number, width: number, height: number) {
  const { x, y } = coordsFor(index, width);
  const result: number[] = [];

  for (let ny = y - 1; ny <= y + 1; ny += 1) {
    for (let nx = x - 1; nx <= x + 1; nx += 1) {
      if (nx === x && ny === y) continue;
      if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
      result.push(indexFor(nx, ny, width));
    }
  }

  return result;
}

// Stateless event noise prevents different expansion paths from shifting later events.
function eventNoise(seed: number, ...keys: number[]) {
  let value = seed >>> 0;
  for (const key of keys) {
    value = Math.imul(value ^ (key >>> 0), 0x45d9f3b);
    value ^= value >>> 16;
  }
  value = Math.imul(value ^ (value >>> 16), 0x7feb352d);
  value = Math.imul(value ^ (value >>> 15), 0x846ca68b);
  return ((value ^ (value >>> 16)) >>> 0) / 4294967296;
}

function generateWorld(width: number, height: number, seed: number) {
  let draw = 0;
  const random = () => eventNoise(seed, 0, draw++);
  const world: Tile[] = [];
  const corridorPath: number[] = [];
  let centerY = Math.floor(height * (0.28 + random() * 0.42));

  for (let x = 0; x < width; x += 1) {
    centerY = clamp(centerY + Math.floor(random() * 3) - 1, 2, height - 3);
    corridorPath.push(centerY);
  }

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const noise = random();
      const corridorDistance = Math.abs(y - corridorPath[x]);
      let terrain: TerrainType = noise > 0.86 ? 'rich' : noise > 0.56 ? 'medium' : 'poor';
      const corridorDepth = clamp(1 - corridorDistance / 3, 0, 1);

      if (corridorDistance <= 0.65) {
        terrain = 'corridor';
      } else if (corridorDistance <= 1.5) {
        terrain = noise > 0.42 ? 'rich' : 'medium';
      } else if (corridorDistance <= 2.5 && terrain === 'poor') {
        terrain = 'medium';
      }

      world.push({
        terrain,
        owner: null,
        institution: false,
        house: false,
        corridorDepth,
      });
    }
  }

  return world;
}

function createInitialSimulation(seed = Math.floor(Math.random() * 4294967296)): SimulationState {
  const civilizations: Civilization[] = Array.from({ length: 1 + NPC_COUNT }, (_, id) => ({
    id,
    label: id === PLAYER_ID ? 'You' : `NPC ${id}`,
    territory: 0,
    resources: id === PLAYER_ID ? 7 : 8,
    institutions: 0,
    collapsedTiles: 0,
    startTerrain: 'poor',
  }));

  return {
    seed,
    rule: 'exclusive',
    width: GRID_WIDTH,
    height: GRID_HEIGHT,
    tick: 0,
    ready: false,
    world: generateWorld(GRID_WIDTH, GRID_HEIGHT, seed),
    civilizations,
    playerId: PLAYER_ID,
    crisisCount: 0,
    lastCrisis: null,
    buildOptions: [],
    buildDecision: null,
  };
}

function scoreTileForExpansion(sim: SimulationState, index: number, tile: Tile, civ: Civilization) {
  return TERRAIN_YIELD[tile.terrain] + tile.corridorDepth * 0.75 + civ.institutions * 0.08 + eventNoise(sim.seed, 1, sim.tick, civ.id, index) * 0.14;
}

function assignTile(sim: SimulationState, tileIndex: number, ownerId: number) {
  const tile = sim.world[tileIndex];
  if (tile.owner !== null) return;

  tile.owner = ownerId;
  const civ = sim.civilizations[ownerId];
  civ.territory += 1;
}

function placeCivilizationStart(sim: SimulationState, tileIndex: number, ownerId: number) {
  assignTile(sim, tileIndex, ownerId);
  sim.civilizations[ownerId].startTerrain = sim.world[tileIndex].terrain;
}

function findNpcStart(sim: SimulationState, playerIndex: number, taken: Set<number>) {
  const playerCoords = coordsFor(playerIndex, sim.width);
  let bestIndex = -1;
  let bestScore = -Infinity;

  for (let index = 0; index < sim.world.length; index += 1) {
    if (taken.has(index)) continue;
    const tile = sim.world[index];
    if (tile.owner !== null) continue;

    const { x, y } = coordsFor(index, sim.width);
    const distance = Math.hypot(x - playerCoords.x, y - playerCoords.y);
    if (distance < 6) continue;

    const score =
      terrainPriority(tile.terrain) * 3 +
      tile.corridorDepth * 2 +
      distance * 0.15 +
      eventNoise(sim.seed, 2, index) * 0.3;

    if (score > bestScore) {
      bestScore = score;
      bestIndex = index;
    }
  }

  return bestIndex;
}

// Unclaimed resources are available to every adjacent society. Claimed land is exclusive.
function accessForTile(sim: SimulationState, index: number): number[] {
  const tile = sim.world[index];
  if (tile.owner !== null && sim.rule !== 'shared') return [tile.owner];
  const adjacent = neighbors(index, sim.width, sim.height)
    .map(neighbor => sim.world[neighbor].owner)
    .filter((owner): owner is number => owner !== null);
  if (tile.owner !== null) adjacent.push(tile.owner);
  return [...new Set(adjacent)].sort((a, b) => a - b);
}

function buildOnTile(sim: SimulationState, index: number) {
  if (!sim.ready || sim.tick !== 0 || sim.buildDecision) return false;
  const option = sim.buildOptions.find(item => item.index === index);
  const player = sim.civilizations[sim.playerId];
  if (!option || sim.world[index].owner !== null || player.resources < BUILD_COST) return false;
  const sharedWith = accessForTile(sim, index).filter(id => id !== sim.playerId);
  player.resources -= BUILD_COST;
  assignTile(sim, index, sim.playerId);
  sim.world[index].house = true;
  sim.buildDecision = { index, sharedWith, cost: BUILD_COST };
  return true;
}

function setupSimulation(sim: SimulationState, playerIndex: number) {
  placeCivilizationStart(sim, playerIndex, sim.playerId);

  const taken = new Set<number>([playerIndex]);

  // A nearby community makes shared access visible in the opening choice.
  const player = coordsFor(playerIndex, sim.width);
  const nearby = [[2, 0], [-2, 0], [0, 2], [0, -2]]
    .map(([dx, dy]) => ({ x: player.x + dx, y: player.y + dy }))
    .find(({ x, y }) => x >= 0 && y >= 0 && x < sim.width && y < sim.height);
  if (nearby) {
    const index = indexFor(nearby.x, nearby.y, sim.width);
    placeCivilizationStart(sim, index, 1);
    taken.add(index);
  }
  for (let npc = 2; npc <= NPC_COUNT; npc += 1) {
    const startIndex = findNpcStart(sim, playerIndex, taken);
    if (startIndex >= 0) {
      placeCivilizationStart(sim, startIndex, npc);
      taken.add(startIndex);
    }
  }
  const options = neighbors(playerIndex, sim.width, sim.height)
    .filter(index => sim.world[index].owner === null)
    .map(index => ({ index, sharedWith: accessForTile(sim, index).filter(id => id !== sim.playerId) }))
    .sort((a, b) => terrainPriority(sim.world[b.index].terrain) - terrainPriority(sim.world[a.index].terrain));
  const shared = options.find(option => option.sharedWith.length > 0);
  const personal = options.find(option => option.sharedWith.length === 0);
  sim.buildOptions = [shared, personal].filter((option): option is BuildOption => !!option);

  sim.ready = true;
}

function attemptExpansion(sim: SimulationState, civId: number) {
  const civ = sim.civilizations[civId];
  if (civ.territory === 0) return;

  const frontier = new Set<number>();

  sim.world.forEach((tile, index) => {
    if (tile.owner !== civId) return;
    neighbors(index, sim.width, sim.height).forEach((neighborIndex) => {
      if (sim.world[neighborIndex].owner === null) {
        frontier.add(neighborIndex);
      }
    });
  });

  if (frontier.size === 0) return;

  const options = Array.from(frontier)
    .map((index) => ({
      index,
      score: scoreTileForExpansion(sim, index, sim.world[index], civ),
      cost: 2.4 - sim.world[index].corridorDepth * 0.45 + (sim.world[index].terrain === 'poor' ? 0.35 : 0),
    }))
    .sort((a, b) => b.score - a.score);

  const actions = 1 + (civ.resources > 22 ? 1 : 0) + (civ.institutions > 1 ? 1 : 0);

  let completed = 0;
  for (const option of options) {
    if (completed >= actions) break;
    if (civ.resources < option.cost) break;
    civ.resources -= option.cost;
    assignTile(sim, option.index, civId);
    completed += 1;
  }
}

function attemptInstitution(sim: SimulationState, civId: number) {
  const civ = sim.civilizations[civId];
  const cap = Math.max(1, Math.floor(civ.territory / 5));
  if (civ.resources < 14 || civ.institutions >= cap) return;

  let bestIndex = -1;
  let bestScore = -Infinity;

  sim.world.forEach((tile, index) => {
    if (tile.owner !== civId || tile.institution) return;
    const base =
      terrainPriority(tile.terrain) * 2 +
      tile.corridorDepth * 3 +
      neighbors(index, sim.width, sim.height).filter((neighborIndex) => sim.world[neighborIndex].owner === civId).length * 0.3;

    if (base > bestScore) {
      bestScore = base;
      bestIndex = index;
    }
  });

  if (bestIndex >= 0) {
    sim.world[bestIndex].institution = true;
    civ.institutions += 1;
    civ.resources -= 14;
  }
}

function applyIncome(sim: SimulationState, civId: number) {
  const civ = sim.civilizations[civId];
  if (civ.territory === 0) return;

  let income = 0;
  sim.world.forEach((tile, index) => {
    if (!accessForTile(sim, index).includes(civId)) return;
    income += TERRAIN_YIELD[tile.terrain];
    if (tile.owner === civId && tile.institution) income += 1.55;
  });

  civ.resources += income * 0.45 - civ.territory * 0.05;
}

function removeTile(sim: SimulationState, tileIndex: number) {
  const tile = sim.world[tileIndex];
  if (tile.owner === null) return;

  const civ = sim.civilizations[tile.owner];
  tile.owner = null;
  tile.house = false;
  if (tile.institution) {
    tile.institution = false;
    civ.institutions = Math.max(0, civ.institutions - 1);
  }
  civ.territory = Math.max(0, civ.territory - 1);
  civ.collapsedTiles += 1;
}

function triggerCrisis(sim: SimulationState) {
  const crisisLabels = ['Drought', 'Market shock', 'Political fracture', 'Flood season'];
  const crisisLabel = crisisLabels[(sim.crisisCount + sim.tick) % crisisLabels.length];

  sim.civilizations.forEach((civ) => {
    if (civ.territory === 0) return;

    const resilience = Math.min(0.82, civ.institutions * 0.18 + civ.territory * 0.012);
    const resourceHit = 0.16 + eventNoise(sim.seed, 3, sim.tick, civ.id) * 0.16;
    civ.resources = Math.max(0, civ.resources * (1 - resourceHit * (1 - resilience)));

    const exposure = Math.max(0, 0.85 - resilience);
    const lossTarget = Math.floor(exposure * (1 + eventNoise(sim.seed, 4, sim.tick, civ.id) * 2));

    const vulnerableTiles = sim.world
      .map((tile, index) => ({ tile, index }))
      .filter(({ tile }) => tile.owner === civ.id)
      .sort((a, b) => {
        const aNeighbors = neighbors(a.index, sim.width, sim.height).filter((neighborIndex) => sim.world[neighborIndex].owner === civ.id).length;
        const bNeighbors = neighbors(b.index, sim.width, sim.height).filter((neighborIndex) => sim.world[neighborIndex].owner === civ.id).length;
        return aNeighbors - bNeighbors;
      });

    for (let i = 0; i < Math.min(lossTarget, vulnerableTiles.length - 1); i += 1) {
      removeTile(sim, vulnerableTiles[i].index);
    }
  });

  sim.crisisCount += 1;
  sim.lastCrisis = {
    turn: sim.tick,
    label: crisisLabel,
    description: 'Lower-institution regions lose more land and resources when shocks hit.',
  };
}

function stepSimulation(sim: SimulationState) {
  if (!sim.ready || !sim.buildDecision) return;
  if (sim.tick >= MAX_TURNS) return;

  sim.tick += 1;

  sim.civilizations.forEach((civ) => {
    applyIncome(sim, civ.id);
    attemptInstitution(sim, civ.id);
    attemptExpansion(sim, civ.id);
  });

  if (sim.tick % CRISIS_INTERVAL === 0) {
    triggerCrisis(sim);
  }
}

function buildMetrics(sim: SimulationState): MetricsSnapshot {
  const player = sim.civilizations[sim.playerId];
  const leadersByTerritory = [...sim.civilizations].sort((a, b) => b.territory - a.territory);
  const leadersByResources = [...sim.civilizations].sort((a, b) => b.resources - a.resources);
  const finalStandings = [...sim.civilizations]
    .sort((a, b) => b.territory - a.territory)
    .map((civ) => ({
      id: civ.id,
      label: civ.label,
      territory: civ.territory,
      resources: Number(civ.resources.toFixed(1)),
      institutions: civ.institutions,
      startTerrain: civ.startTerrain,
    }));

  const playerResilience = player.territory === 0 ? 0 : Math.min(100, Math.round((player.institutions * 18 + player.territory * 1.2) * 1.8));
  const territoryGap = leadersByTerritory[0].territory - player.territory;

  let interpretation = 'Pick a tile to begin the proof.';
  let systemSignal = 'Starting conditions are waiting to be chosen.';

  if (sim.ready) {
    if (sim.tick < 6) {
      interpretation = `You started on ${TERRAIN_LABEL[player.startTerrain]}. The first few turns make geography visible before institutions can compensate.`;
      systemSignal = player.startTerrain === 'corridor' || player.startTerrain === 'rich'
        ? 'Early opportunity is opening faster than elsewhere.'
        : 'A thinner starting position makes every expansion choice matter.';
    } else if (sim.tick < CRISIS_INTERVAL) {
      interpretation =
        player.institutions > 0
          ? 'Institutions are beginning to convert access into resilience. The map may still look close, but future shocks will not land evenly.'
          : 'Expansion is happening, but without institutions your gains remain fragile even if territory is growing.';
      systemSignal = territoryGap <= 0
        ? 'You are matching or surpassing the field.'
        : `A ${territoryGap}-tile gap is opening between your region and the leader.`;
    } else {
      interpretation =
        player.institutions > 1
          ? 'The crisis cycle shows the core hypothesis: institutions do not erase geography, but they reduce collapse when systems are stressed.'
          : 'The crisis cycle is doing its job. Territory without resilience grows, then sheds gains when pressure arrives.';
      systemSignal = sim.lastCrisis
        ? `${sim.lastCrisis.label} just hit on turn ${sim.lastCrisis.turn}.`
        : 'Systems are compounding quietly in the background.';
    }
  }

  return {
    rule: sim.rule,
    tick: sim.tick,
    ready: sim.ready,
    playerStartTerrain: sim.ready ? player.startTerrain : null,
    playerTerritory: player.territory,
    playerResources: Number(player.resources.toFixed(1)),
    playerInstitutions: player.institutions,
    playerResilience,
    leadingTerritory: leadersByTerritory[0].territory,
    leadingResources: Number(leadersByResources[0].resources.toFixed(1)),
    crisisCount: sim.crisisCount,
    lastCrisis: sim.lastCrisis,
    buildOptions: sim.buildOptions.map(option => ({ ...option, terrain: sim.world[option.index].terrain,
      row: Math.floor(option.index / sim.width) + 1, column: option.index % sim.width + 1 })),
    buildDecision: sim.buildDecision,
    interpretation,
    systemSignal,
    summaryReady: sim.tick >= MAX_TURNS,
    finalStandings,
  };
}

function drawMarker(ctx: CanvasRenderingContext2D, ownerId: number, centerX: number, centerY: number, size: number) {
  ctx.save();
  ctx.translate(centerX, centerY);

  if (ownerId === 0) {
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.18, 0, Math.PI * 2);
    ctx.fill();
  } else if (ownerId === 1) {
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = Math.max(1, size * 0.07);
    ctx.beginPath();
    ctx.moveTo(-size * 0.18, -size * 0.18);
    ctx.lineTo(size * 0.18, size * 0.18);
    ctx.moveTo(size * 0.18, -size * 0.18);
    ctx.lineTo(-size * 0.18, size * 0.18);
    ctx.stroke();
  } else if (ownerId === 2) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(-size * 0.14, -size * 0.14, size * 0.28, size * 0.28);
  } else {
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = Math.max(1, size * 0.06);
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.18, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.restore();
}

function renderSimulation(
  canvas: HTMLCanvasElement,
  sim: SimulationState,
  hoveredIndex: number | null,
  selectedIndex: number | null,
  opening: SimulationState | null,
  showAccess: boolean,
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const width = canvas.width;
  const height = canvas.height;
  const tileWidth = width / sim.width;
  const tileHeight = height / sim.height;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#fffdfa';
  ctx.fillRect(0, 0, width, height);

  sim.world.forEach((tile, index) => {
    const { x, y } = coordsFor(index, sim.width);
    const left = x * tileWidth;
    const top = y * tileHeight;

    ctx.fillStyle = TERRAIN_FILL[tile.terrain];
    ctx.fillRect(left, top, tileWidth, tileHeight);

    if (tile.terrain === 'corridor') {
      ctx.fillStyle = 'rgba(0,0,0,0.08)';
      ctx.fillRect(left, top + tileHeight * 0.65, tileWidth, tileHeight * 0.15);
    }

    if (tile.owner !== null) {
      ctx.fillStyle = OWNER_FILL[tile.owner] ?? '#000000';
      ctx.globalAlpha = tile.owner === 0 ? 0.82 : tile.owner === 1 ? 0.86 : tile.owner === 2 ? 0.92 : 0.55;
      ctx.fillRect(left + 1, top + 1, tileWidth - 2, tileHeight - 2);
      ctx.globalAlpha = 1;

      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 1;
      ctx.strokeRect(left + 0.5, top + 0.5, tileWidth - 1, tileHeight - 1);
      drawMarker(ctx, tile.owner, left + tileWidth / 2, top + tileHeight / 2, Math.min(tileWidth, tileHeight));
    }

    if (tile.institution) {
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = Math.max(1.25, Math.min(tileWidth, tileHeight) * 0.08);
      ctx.beginPath();
      ctx.arc(left + tileWidth * 0.76, top + tileHeight * 0.3, Math.min(tileWidth, tileHeight) * 0.16, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.strokeStyle = 'rgba(0,0,0,0.16)';
    ctx.lineWidth = 1;
    ctx.strokeRect(left, top, tileWidth, tileHeight);
  });

  const pending = sim.ready && !sim.buildDecision;
  if (pending) {
    sim.buildOptions.forEach((option, i) => {
      const { x, y } = coordsFor(option.index, sim.width);
      ctx.fillStyle = '#fff';
      ctx.fillRect(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
      ctx.strokeStyle = '#c00'; ctx.lineWidth = 2;
      ctx.strokeRect(x * tileWidth + 1, y * tileHeight + 1, tileWidth - 2, tileHeight - 2);
      ctx.fillStyle = '#353535'; ctx.font = `bold ${Math.max(10, tileHeight * .7)}px sans-serif`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(String(i + 1), (x + .5) * tileWidth, (y + .5) * tileHeight);
    });
  }
  const decision = sim.buildDecision;
  if (decision && sim.world[decision.index].house) {
    const { x, y } = coordsFor(decision.index, sim.width);
    ctx.fillStyle = '#353535';
    ctx.beginPath();
    ctx.moveTo((x + .15) * tileWidth, (y + .48) * tileHeight);
    ctx.lineTo((x + .5) * tileWidth, (y + .15) * tileHeight);
    ctx.lineTo((x + .85) * tileWidth, (y + .48) * tileHeight);
    ctx.closePath(); ctx.fill();
    ctx.fillRect((x + .25) * tileWidth, (y + .48) * tileHeight, tileWidth * .5, tileHeight * .36);
    ctx.strokeStyle = '#c00'; ctx.lineWidth = 2;
    ctx.strokeRect(x * tileWidth + 1, y * tileHeight + 1, tileWidth - 2, tileHeight - 2);
  }

  // This overlay describes the opening decision, including when inspecting a paused/completed run.
  const previewIndex = sim.buildOptions.some(option => option.index === hoveredIndex) ? hoveredIndex : selectedIndex;
  const accessIndex = sim.buildDecision?.index ?? previewIndex;
  if (showAccess && accessIndex !== null && accessIndex !== undefined && sim.ready) {
    const before = opening ?? sim;
    const originalUsers = accessForTile(before, accessIndex);
    const built = !!sim.buildDecision;
    const shared = sim.rule === 'shared';
    const site = sim.buildOptions.findIndex(option => option.index === accessIndex) + 1;
    const point = (index: number) => {
      const { x, y } = coordsFor(index, sim.width);
      return { x: (x + .5) * tileWidth, y: (y + .5) * tileHeight };
    };
    const resource = point(accessIndex);
    ctx.save();
    for (const owner of originalUsers) {
      const anchor = before.world.findIndex(tile => tile.owner === owner);
      if (anchor < 0) continue;
      const target = point(anchor);
      const blocked = built && !shared && owner !== sim.playerId;
      ctx.strokeStyle = blocked ? '#c00' : '#086b9c';
      ctx.lineWidth = 2;
      ctx.setLineDash(blocked ? [] : [4, 3]);
      ctx.beginPath(); ctx.moveTo(resource.x, resource.y); ctx.lineTo(target.x, target.y); ctx.stroke();
      ctx.setLineDash([]);
      ctx.strokeRect(target.x - tileWidth / 2 - 2, target.y - tileHeight / 2 - 2, tileWidth + 4, tileHeight + 4);
      if (blocked) {
        const x = (resource.x + target.x) / 2, y = (resource.y + target.y) / 2;
        ctx.fillStyle = '#fff'; ctx.fillRect(x - 5, y - 5, 10, 10);
        ctx.beginPath(); ctx.moveTo(x - 4, y - 4); ctx.lineTo(x + 4, y + 4);
        ctx.moveTo(x + 4, y - 4); ctx.lineTo(x - 4, y + 4); ctx.stroke();
      }
    }
    ctx.strokeStyle = '#c00'; ctx.lineWidth = 3;
    ctx.strokeRect(resource.x - tileWidth / 2 - 1, resource.y - tileHeight / 2 - 1, tileWidth + 2, tileHeight + 2);

    // Small maps keep the same readable explanation immediately below the board.
    if (width < 420) { ctx.restore(); return; }
    const boxWidth = Math.min(238, width - 16), boxHeight = 100;
    let boxX = resource.x + tileWidth * 2;
    if (boxX + boxWidth > width - 8) boxX = resource.x - boxWidth - tileWidth * 2;
    boxX = clamp(boxX, 8, width - boxWidth - 8);
    const boxY = clamp(resource.y < height / 2 ? resource.y + tileHeight * 2 : resource.y - boxHeight - tileHeight * 2, 8, Math.max(8, height - boxHeight - 8));
    ctx.strokeStyle = '#353535'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(resource.x, resource.y); ctx.lineTo(clamp(resource.x, boxX, boxX + boxWidth), boxY < resource.y ? boxY + boxHeight : boxY); ctx.stroke();
    ctx.fillStyle = '#fff'; ctx.fillRect(boxX, boxY, boxWidth, boxHeight);
    ctx.strokeRect(boxX + .5, boxY + .5, boxWidth - 1, boxHeight - 1);
    ctx.textAlign = 'left'; ctx.textBaseline = 'top';
    ctx.font = '11px sans-serif'; ctx.fillStyle = '#5b5b5b';
    ctx.fillText(built ? `Opening access · ${shared ? 'Shared rule' : 'Exclusive rule'}` : `Site ${site} · ${originalUsers.length > 1 ? 'Shared resource' : 'Unshared resource'}`, boxX + 12, boxY + 10);
    // A readable inset repeats the tiny on-board connections without relying on colour.
    const rowY = boxY + 40;
    ctx.fillStyle = '#ffdf00'; ctx.fillRect(boxX + 12, rowY - 2, 12, 12);
    ctx.fillStyle = '#353535'; ctx.font = 'bold 12px sans-serif'; ctx.fillText('You', boxX + 30, rowY - 2);
    const endX = boxX + boxWidth - 56, startX = boxX + 62, lineY = rowY + 4;
    const tileX = (startX + endX - 8) / 2;
    ctx.strokeStyle = '#086b9c'; ctx.lineWidth = 2; ctx.setLineDash([3, 3]);
    ctx.beginPath(); ctx.moveTo(startX, lineY); ctx.lineTo(tileX - 10, lineY); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = built ? '#ffdf00' : '#fff'; ctx.strokeStyle = '#353535'; ctx.lineWidth = 1;
    ctx.fillRect(tileX - 8, lineY - 8, 16, 16); ctx.strokeRect(tileX - 8, lineY - 8, 16, 16);
    ctx.beginPath(); ctx.moveTo(tileX, lineY - 8); ctx.lineTo(tileX, lineY + 8);
    ctx.moveTo(tileX - 8, lineY); ctx.lineTo(tileX + 8, lineY); ctx.stroke();
    if (originalUsers.length > 1) {
      const closed = built && !shared;
      ctx.strokeStyle = closed ? '#c00' : '#086b9c'; ctx.lineWidth = 2;
      ctx.setLineDash(closed ? [] : [3, 3]);
      ctx.beginPath(); ctx.moveTo(tileX + 10, lineY); ctx.lineTo(endX - 8, lineY); ctx.stroke(); ctx.setLineDash([]);
      if (closed) {
        const crossX = (tileX + 10 + endX - 8) / 2;
        ctx.fillStyle = '#fff'; ctx.fillRect(crossX - 6, lineY - 7, 12, 14);
        ctx.beginPath(); ctx.moveTo(crossX - 4, lineY - 4); ctx.lineTo(crossX + 4, lineY + 4);
        ctx.moveTo(crossX + 4, lineY - 4); ctx.lineTo(crossX - 4, lineY + 4); ctx.stroke();
      }
      ctx.fillStyle = '#353535'; ctx.fillText(`NPC ${originalUsers.find(id => id !== sim.playerId)}`, endX, rowY - 2);
    }
    ctx.font = '12px sans-serif'; ctx.fillStyle = '#353535';
    const message = originalUsers.length < 2 ? (built ? 'Only you could reach this tile.' : 'Only you can reach this tile.')
      : !built ? 'Both can gather. Building claims it.'
      : shared ? 'At build: access stayed open.' : 'At build: NPC 1 lost access.';
    // Wrap within the callout on narrow canvases.
    const words = message.split(' '); let line = '', y = boxY + 66;
    for (const word of words) {
      if (line && ctx.measureText(`${line} ${word}`).width > boxWidth - 24) {
        ctx.fillText(line, boxX + 12, y); y += 15; line = word;
      } else line = line ? `${line} ${word}` : word;
    }
    if (line) ctx.fillText(line, boxX + 12, y);
    ctx.restore();
  }

  if (hoveredIndex !== null && hoveredIndex >= 0) {
    const { x, y } = coordsFor(hoveredIndex, sim.width);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.strokeRect(x * tileWidth + 1, y * tileHeight + 1, tileWidth - 2, tileHeight - 2);
  }
}

export function PerspectivesPlayableProof() {
  const [running, setRunning] = useState(false);
  const [exclusiveResult, setExclusiveResult] = useState<MetricsSnapshot | null>(null);
  const [sharedResult, setSharedResult] = useState<MetricsSnapshot | null>(null);
  const openingRef = useRef<SimulationState | null>(null);
  const [metrics, setMetrics] = useState<MetricsSnapshot>(() => buildMetrics(createInitialSimulation()));
  useEffect(() => {
    if (!metrics.summaryReady) return;
    if (metrics.rule === 'shared') setSharedResult(metrics);
    else setExclusiveResult(metrics);
  }, [metrics]);
  const siteButtonRef = useRef<HTMLButtonElement | null>(null);
  const completionRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const focusSite = useRef(false);
  useEffect(() => {
    if (metrics.ready && focusSite.current) { focusSite.current=false; siteButtonRef.current?.focus({preventScroll:true}); }
    if (metrics.summaryReady) completionRef.current?.focus({preventScroll:true});
  }, [metrics.ready, metrics.summaryReady, exclusiveResult, sharedResult]);
  const runButtonRef = useRef<HTMLButtonElement | null>(null);
  const pauseButtonRef = useRef<HTMLButtonElement | null>(null);
  const focusRunAfterBuild = useRef(false);
  useEffect(() => {
    if (metrics.buildDecision && focusRunAfterBuild.current) {
      focusRunAfterBuild.current = false;
      (running ? pauseButtonRef.current : runButtonRef.current)?.focus({ preventScroll: true });
    }
  }, [metrics.buildDecision, running]);
  const audioPrevious = useRef(metrics);
  useEffect(() => {
    const old = audioPrevious.current;
    audioPrevious.current = metrics;
    if (metrics.summaryReady && !old.summaryReady) playSound('complete');
    else if (metrics.crisisCount > old.crisisCount) playSound('crisis');
    else if (metrics.ready && !old.ready) playSound('progress');
    else if (old.playerInstitutions === 0 && metrics.playerInstitutions > 0) playSound('progress');
  }, [metrics]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedBuildIndex, setSelectedBuildIndex] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shellRef = useRef<HTMLDivElement | null>(null);
  const simulationRef = useRef<SimulationState>(createInitialSimulation());

  useEffect(() => {
    const shell = shellRef.current;
    const canvas = canvasRef.current;
    if (!shell || !canvas) return;

    const resize = () => {
      const rect = shell.getBoundingClientRect();
      const nextWidth = Math.max(1, Math.floor(rect.width));
      const nextHeight = Math.max(1, Math.round(nextWidth * GRID_HEIGHT / GRID_WIDTH));

      canvas.width = nextWidth;
      canvas.height = nextHeight;
      canvas.style.width = `${nextWidth}px`;
      canvas.style.height = `${nextHeight}px`;
      renderSimulation(canvas, simulationRef.current, hoveredIndex, selectedBuildIndex, openingRef.current, !running);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(shell);

    return () => observer.disconnect();
  }, [hoveredIndex, selectedBuildIndex, running]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    renderSimulation(canvas, simulationRef.current, hoveredIndex, selectedBuildIndex, openingRef.current, !running);
  }, [metrics, hoveredIndex, selectedBuildIndex, running]);

  useEffect(() => {
    if (!running) return undefined;

    const activeSimulation = simulationRef.current;
    const timer = window.setInterval(() => {
      if (simulationRef.current !== activeSimulation || !activeSimulation.buildDecision) return;
      stepSimulation(activeSimulation);
      setMetrics(buildMetrics(activeSimulation));
    }, 750);

    return () => window.clearInterval(timer);
  }, [running]);

  useEffect(() => {
    if (metrics.tick >= MAX_TURNS && running) {
      setRunning(false);
    }
  }, [metrics.tick, running]);

  const resetSimulation = () => {
    playSound('recover');
    simulationRef.current = createInitialSimulation();
    focusRunAfterBuild.current = false;
    openingRef.current = null;
    setExclusiveResult(null);
    setSharedResult(null);
    setRunning(false);
    setHoveredIndex(null);
    setSelectedBuildIndex(null);
    setMetrics(buildMetrics(simulationRef.current));
  };

  const handleCanvasPointer = (clientX: number, clientY: number, click = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const sim = simulationRef.current;
    const x = clamp(Math.floor(((clientX - rect.left) / rect.width) * sim.width), 0, sim.width - 1);
    const y = clamp(Math.floor(((clientY - rect.top) / rect.height) * sim.height), 0, sim.height - 1);
    const tileIndex = indexFor(x, y, sim.width);

    setHoveredIndex(tileIndex);

    if (click && !sim.ready) {
      setupSimulation(sim, tileIndex);
      focusSite.current=true;
      setMetrics(buildMetrics(sim));
    } else if (click && sim.buildOptions.some(option => option.index === tileIndex) && !sim.buildDecision) {
      setSelectedBuildIndex(tileIndex);
    }
  };

  const chooseTerrain = (terrain: 'rich' | 'poor') => {
    const sim = simulationRef.current;
    if (sim.ready) return;
    const tile = sim.world.findIndex(item => item.terrain === terrain);
    if (tile < 0) return;
    setupSimulation(sim, tile);
    focusSite.current=true;
    setMetrics(buildMetrics(sim));
  };

  const chooseBuild = (index: number) => {
    const sim = simulationRef.current;
    const opening = structuredClone(sim);
    if (!buildOnTile(sim, index)) return;
    openingRef.current = opening;
    focusRunAfterBuild.current = true;
    playSound('progress');
    setMetrics(buildMetrics(sim));
  };
  const replayWithRule = (rule: AccessRule) => {
    const opening = openingRef.current;
    const site = exclusiveResult?.buildDecision?.index;
    if (!opening || site === undefined || running || !metrics.summaryReady) return;
    const replay = structuredClone(opening);
    replay.rule = rule;
    if (!buildOnTile(replay, site)) return;
    simulationRef.current = replay;
    setHoveredIndex(null);
    setSelectedBuildIndex(null);
    focusRunAfterBuild.current = true;
    setMetrics(buildMetrics(replay));
    setRunning(true);
    playSound('start');
  };
  const sharedMode = metrics.rule === 'shared';
  const pendingBuild = metrics.ready && !metrics.buildDecision;
  const decision = metrics.buildDecision;
  const blockedNames = decision?.sharedWith.map(id => `NPC ${id}`).join(' and ');
  const buildMessage = decision
    ? decision.sharedWith.length > 0
      ? sharedMode
        ? `Same house, different rule: ${blockedNames} can still gather from this tile. Building keeps access shared.`
        : `You claimed the shared tile. ${blockedNames} can no longer gather from it. Its yield now goes only to you.`
      : 'You claimed a tile only your society could reach. Nobody else lost access to this tile.'
    : '';

  const previewOption = metrics.buildOptions.find(option => option.index ===
    (metrics.buildOptions.some(item => item.index === hoveredIndex) ? hoveredIndex : selectedBuildIndex));
  const accessUsers = decision?.sharedWith ?? previewOption?.sharedWith;
  const accessNote = accessUsers
    ? accessUsers.length === 0 ? (decision ? 'Only your society could reach this tile when you built.' : 'Only your society can reach this tile.')
      : decision ? sharedMode ? 'You and NPC 1 both kept access when you built.' : 'You kept this resource. NPC 1 lost access when you built.'
      : 'You and NPC 1 can both gather here. Building will close their access.'
    : '';

  const stateLabel = metrics.summaryReady ? 'Complete' : running ? 'Running' : pendingBuild ? 'Choose where to build' : metrics.ready ? (metrics.tick === 0 ? 'Ready' : 'Paused') : 'Choose a starting point';

  return (
    <section data-sound-scope="game" className="perspectives-proof-shell perspectives-proof-compact" aria-labelledby="playable-proof-title">
      <h3 id="playable-proof-title" className="sr-only">Society simulation</h3>
      <div className="perspectives-mission-toolbar">
        <div className="perspectives-mission-start">
          {!metrics.ready ? <>
            <span>Pick a map tile, or start on:</span>
            <div className="perspectives-mission-terrains">
              <button type="button" className="perspectives-control-button" onClick={() => chooseTerrain('rich')}>Rich land</button>
              <button type="button" className="perspectives-control-button" onClick={() => chooseTerrain('poor')}>Poor land</button>
            </div>
          </> : <span>{metrics.summaryReady ? 'Compare the rules below, or reset for a new map.' : pendingBuild ? 'Select a site to preview its access. Then build.' : sharedMode ? 'Shared access. Same map and house, one rule changed.' : 'Exclusive access. Your house is marked on the map.'}</span>}
        </div>
        <div className="perspectives-proof-controls" aria-label="Simulation controls">
          {metrics.summaryReady && exclusiveResult && openingRef.current ? (
            sharedResult ? <a ref={node => { completionRef.current=node; }} href="#rule-comparison" className="perspectives-control-button perspectives-run-button">Compare results ↓</a>
              : <button ref={node => { completionRef.current=node; }} type="button" className="perspectives-control-button perspectives-run-button" onClick={() => replayWithRule('shared')}>Try shared access</button>
          ) : <>
          <button ref={runButtonRef} type="button" className="perspectives-control-button perspectives-run-button" onClick={() => { if (!simulationRef.current.buildDecision) return; playSound('start'); focusRunAfterBuild.current=true; setRunning(true); }} disabled={!metrics.ready || pendingBuild || running || metrics.summaryReady}>Run</button>
          <button ref={pauseButtonRef} type="button" className="perspectives-control-button" onClick={() => { playSound('pause'); focusRunAfterBuild.current=true; setRunning(false); }} disabled={!metrics.ready || !running}>Pause</button>
          </>}
          <button type="button" className="perspectives-control-button" onClick={resetSimulation} title="Start a new map and clear both comparison results">Reset</button>
        </div>
      </div>

      <div className="perspectives-mission-status">
        <div><strong>{sharedMode ? `Shared access · ${stateLabel}` : stateLabel}</strong><span>Turn {metrics.tick}/{MAX_TURNS}</span></div>
        <p role="status">{!metrics.ready ? 'Choose where to start. Then decide where to build.' : pendingBuild ? (selectedBuildIndex !== null ? 'Site selected. Check who uses it, then choose Build here.' : 'Preview a building site to see who uses its resources.') : metrics.summaryReady ? (sharedMode ? 'Both runs are complete. Compare the results below.' : 'First run complete. Try shared access on the same map.') : metrics.tick === 0 ? buildMessage : metrics.systemSignal}</p>
      </div>

      <div className="perspectives-mission-workspace">
        <div className="perspectives-mission-map">
          <div className="perspectives-proof-canvas-shell" ref={shellRef}>
            <canvas ref={canvasRef} className="perspectives-proof-canvas"
              onPointerMove={(event) => handleCanvasPointer(event.clientX, event.clientY)}
              onPointerLeave={() => setHoveredIndex(null)}
              onClick={(event) => handleCanvasPointer(event.clientX, event.clientY, true)}
              aria-label={(pendingBuild ? "Society map. Building sites 1 and 2 are outlined. Select a site to preview its communities and access. Use the building-site buttons and Build here for the same choices." : sharedMode ? "Society map under the shared-access rule. The same starting map and house are reused. Adjacent societies can gather from claimed tiles too." : metrics.ready ? "Society map under exclusive access. Your opening house is marked. Claimed tiles belong to their society; unclaimed adjacent tiles can be shared." : "Society map. Choose a starting tile here, or use the Rich land and Poor land buttons above. Claimed tiles belong to their society; unclaimed adjacent tiles can be shared.") + (!running && accessNote ? ` ${accessNote}` : '')} />
          </div>
          {accessNote && !running && <div className="perspectives-access-caption" role="note" aria-label="Resource access">
            <strong>{decision ? 'Opening access' : `Site ${metrics.buildOptions.findIndex(option => option.index === previewOption?.index) + 1}`}</strong>
            <span>{accessUsers?.length ? `You ↔ Resource ${decision && !sharedMode ? '×' : '↔'} NPC 1` : 'You ↔ Resource'}</span>
            <p>{accessNote}</p>
          </div>}
          <div className="perspectives-proof-legend" aria-label="Terrain and settlement legend">
            <span><i className="terrain-poor" /> Poor land</span>
            <span><i className="terrain-medium" /> Medium land</span>
            <span><i className="terrain-rich" /> Rich land</span>
            <span><i className="terrain-corridor" /> Fertile corridor</span>
            <span><i className="terrain-institution" /> Institution</span>
            {pendingBuild && <span>1 / 2 · Building sites</span>}{decision && <span>⌂ Your opening house</span>}
          </div>
        </div>
        <aside className="perspectives-mission-summary" aria-label="Your society">
          {pendingBuild && <div className="perspectives-build-choices" role="group" aria-label="Choose a building site">
            <p className="perspectives-proof-panel__label">Build a house · {BUILD_COST} resources<br />{metrics.playerResources} available</p>
            {metrics.buildOptions.map((option, i) => <div key={option.index}>
              <button ref={i===0?siteButtonRef:undefined} type="button" className="perspectives-control-button" aria-pressed={selectedBuildIndex === option.index} aria-describedby={`build-site-${option.index}-details`}
                onPointerEnter={() => setHoveredIndex(option.index)} onPointerLeave={() => setHoveredIndex(null)}
                onFocus={() => setHoveredIndex(option.index)} onBlur={() => setHoveredIndex(null)}
                onClick={() => setSelectedBuildIndex(option.index)}>{i + 1}. {option.sharedWith.length ? 'Shared site' : 'Unshared site'}</button>
              <p id={`build-site-${option.index}-details`}>{TERRAIN_LABEL[option.terrain]} · row {option.row}, column {option.column}<br />{option.sharedWith.length ? `Also used by ${option.sharedWith.map(id => `NPC ${id}`).join(', ')}.` : 'Only you can reach it.'}</p>
            </div>)}
            <button type="button" className="perspectives-control-button perspectives-build-confirm" disabled={selectedBuildIndex === null}
              onClick={() => { if (selectedBuildIndex !== null) chooseBuild(selectedBuildIndex); }}>Build here · {BUILD_COST} resources</button>
          </div>}
          {decision && <div className="perspectives-build-outcome">
            <p className="perspectives-proof-panel__label">{sharedMode ? "Shared access" : "Your opening choice"}</p>
            <strong>{decision.sharedWith.length ? `${1 + decision.sharedWith.length} societies → ${sharedMode ? 1 + decision.sharedWith.length : 1}` : '1 society → 1'}</strong>
            <p>{decision.sharedWith.length ? sharedMode ? `${blockedNames} kept access when you built.` : `${blockedNames} lost access to this tile when you built.` : 'No neighbour lost access when you built.'}</p>
            <a href="#reflection">What would you change?</a>
          </div>}
          {!pendingBuild && <><p className="perspectives-proof-panel__label">Your society</p>
          <dl className={`perspectives-mission-metrics${pendingBuild ? " perspectives-build-metrics" : ""}`}>
            <div><dt>Territory</dt><dd>{metrics.playerTerritory}</dd></div>
            <div><dt>Resources</dt><dd>{metrics.playerResources}</dd></div>
            <div><dt>Institutions</dt><dd>{metrics.playerInstitutions}</dd></div>
          </dl></>}
          {!pendingBuild && <div className="perspectives-proof-player-legend" aria-label="Societies">
            <div><span className="perspectives-player-chip perspectives-player-chip--you" /> You</div>
            <div><span className="perspectives-player-chip perspectives-player-chip--npc1" /> NPC 1</div>
            <div><span className="perspectives-player-chip perspectives-player-chip--npc2" /> NPC 2</div>
            <div><span className="perspectives-player-chip perspectives-player-chip--npc3" /> NPC 3</div>
          </div>}
        </aside>
      </div>

      {exclusiveResult && <section id="rule-comparison" className="perspectives-rule-comparison" aria-labelledby="comparison-title">
        <p className="perspectives-eyebrow">Question the rule</p>
        <h3 id="comparison-title">What if building didn’t stop others gathering?</h3>
        <p>Keep the same map, starting positions, house and event sequence. Change one rule: claimed tiles stay available to neighbouring societies.</p>
        {sharedResult && <>
          <table>
            <caption>Saved results after {MAX_TURNS} turns</caption>
            <thead><tr><th scope="col">Rule</th><th scope="col">Your tiles</th><th scope="col">NPC 1 tiles</th><th scope="col">NPC 1 resources</th></tr></thead>
            <tbody>{[exclusiveResult, sharedResult].map(result => {
              const neighbour = result.finalStandings.find(entry => entry.id === 1)!;
              return <tr key={result.rule}><th scope="row">{result.rule === 'shared' ? 'Shared access' : 'Exclusive access'}</th><td>{result.playerTerritory}</td><td>{neighbour.territory}</td><td>{neighbour.resources.toLocaleString(undefined, { maximumFractionDigits: 1 })}</td></tr>;
            })}</tbody>
          </table>
          <p>Who gained ground? Who had more room to grow? These are outcomes of this small model, not a prediction about real communities.</p>
        </>}
        {!metrics.summaryReady && <p role="status">Your first result is saved. Finish this run to compare both at turn {MAX_TURNS}.</p>}
        {metrics.summaryReady && openingRef.current && <div className="perspectives-rule-actions">
          {sharedResult && <button type="button" className="perspectives-control-button" onClick={() => replayWithRule('exclusive')}>Replay exclusive access</button>}
          <button type="button" className="perspectives-control-button perspectives-run-button" onClick={() => replayWithRule('shared')}>{sharedResult ? 'Replay shared access' : 'Try shared access'}</button>
        </div>}
        {metrics.summaryReady && !openingRef.current && <p>Reset to compare both rules from a fresh starting point.</p>}
      </section>}

      {metrics.summaryReady && <details className="perspectives-details perspectives-proof-live__summary">
        <summary>Final standings for this run</summary>
        <div className="perspectives-proof-summary">{metrics.finalStandings.map((entry, index) => <div key={entry.id} className="perspectives-proof-summary__row">
          <div className="perspectives-proof-summary__title"><span className={`perspectives-player-chip perspectives-player-chip--${entry.id === 0 ? 'you' : `npc${entry.id}`}`} /><span>{index + 1}. {entry.label}</span></div>
          <span>{entry.territory} tiles</span><span>{TERRAIN_LABEL[entry.startTerrain]}</span>
        </div>)}</div>
      </details>}

      <details className="perspectives-details perspectives-mission-details"><summary>More stats & how it works</summary>
        <dl className="perspectives-mission-extra-metrics">
          <div><dt>Resilience</dt><dd>{metrics.playerResilience}%</dd></div>
          <div><dt>Crises</dt><dd>{metrics.crisisCount}</dd></div>
          <div><dt>Leader territory</dt><dd>{metrics.leadingTerritory}</dd></div>
        </dl>
        <div className="perspectives-proof-panel">
          <div className="perspectives-proof-panel__section"><p className="perspectives-proof-panel__label"><b>The idea</b></p><p>Geography shapes early access. Institutions reduce losses when a crisis hits. Those differences can grow over time.</p></div>
          <div className="perspectives-proof-panel__section"><p className="perspectives-proof-panel__label"><b>Reading the map</b></p><p>Outlined numbers mark the two opening building choices. Unclaimed tiles can supply every adjacent society. Under exclusive access, claiming a tile makes its yield exclusive. Under shared access, adjacent societies can still gather there. Rich land and the fertile corridor produce more. This adaptation stops at turn {MAX_TURNS}.</p></div>
          <div className="perspectives-proof-panel__section"><p className="perspectives-proof-panel__label"><b>What is happening?</b></p><p>{metrics.interpretation}</p>{metrics.lastCrisis && <p>Latest crisis: <strong>{metrics.lastCrisis.label}</strong> on turn {metrics.lastCrisis.turn}.</p>}</div>
          <div className="perspectives-proof-panel__section"><p className="perspectives-proof-panel__label"><b>The numbers</b></p><p>The opening house costs 3 pooled resources here. The physical game uses grain, wood and brick. After your opening choice, expansion and institutions run automatically. The opening access note records what happened when you built. For the rule comparison, the same initial map, house and turn-specific random draws are reused. Different growth can still change who is exposed to each event. Reset starts a new comparison.</p><a href={REPO_URL} target="_blank" rel="noreferrer" className="perspectives-proof-link">Explore the GitHub simulation ↗</a></div>
        </div>
      </details>
    </section>
  );
}
