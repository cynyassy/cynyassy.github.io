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

type Tile = {
  terrain: TerrainType;
  owner: number | null;
  institution: boolean;
  corridorDepth: number;
};

type CrisisSummary = {
  turn: number;
  label: string;
  description: string;
};

type SimulationState = {
  width: number;
  height: number;
  tick: number;
  ready: boolean;
  world: Tile[];
  civilizations: Civilization[];
  playerId: number;
  crisisCount: number;
  lastCrisis: CrisisSummary | null;
};

type MetricsSnapshot = {
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

const GRID_WIDTH = 24;
const GRID_HEIGHT = 14;
const PLAYER_ID = 0;
const NPC_COUNT = 3;
const CRISIS_INTERVAL = 12;
const MAX_TURNS = 48;
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

function generateWorld(width: number, height: number) {
  const world: Tile[] = [];
  const corridorPath: number[] = [];
  let centerY = Math.floor(height * (0.28 + Math.random() * 0.42));

  for (let x = 0; x < width; x += 1) {
    centerY = clamp(centerY + Math.floor(Math.random() * 3) - 1, 2, height - 3);
    corridorPath.push(centerY);
  }

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const noise = Math.random();
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
        corridorDepth,
      });
    }
  }

  return world;
}

function createInitialSimulation(): SimulationState {
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
    width: GRID_WIDTH,
    height: GRID_HEIGHT,
    tick: 0,
    ready: false,
    world: generateWorld(GRID_WIDTH, GRID_HEIGHT),
    civilizations,
    playerId: PLAYER_ID,
    crisisCount: 0,
    lastCrisis: null,
  };
}

function scoreTileForExpansion(tile: Tile, civ: Civilization) {
  return TERRAIN_YIELD[tile.terrain] + tile.corridorDepth * 0.75 + civ.institutions * 0.08 + Math.random() * 0.14;
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
      Math.random() * 0.3;

    if (score > bestScore) {
      bestScore = score;
      bestIndex = index;
    }
  }

  return bestIndex;
}

function setupSimulation(sim: SimulationState, playerIndex: number) {
  placeCivilizationStart(sim, playerIndex, sim.playerId);

  const taken = new Set<number>([playerIndex]);

  for (let npc = 1; npc <= NPC_COUNT; npc += 1) {
    const startIndex = findNpcStart(sim, playerIndex, taken);
    if (startIndex >= 0) {
      placeCivilizationStart(sim, startIndex, npc);
      taken.add(startIndex);
    }
  }

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
      score: scoreTileForExpansion(sim.world[index], civ),
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
  sim.world.forEach((tile) => {
    if (tile.owner !== civId) return;
    income += TERRAIN_YIELD[tile.terrain];
    if (tile.institution) income += 1.55;
  });

  civ.resources += income * 0.45 - civ.territory * 0.05;
}

function removeTile(sim: SimulationState, tileIndex: number) {
  const tile = sim.world[tileIndex];
  if (tile.owner === null) return;

  const civ = sim.civilizations[tile.owner];
  tile.owner = null;
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
    const resourceHit = 0.16 + Math.random() * 0.16;
    civ.resources = Math.max(0, civ.resources * (1 - resourceHit * (1 - resilience)));

    const exposure = Math.max(0, 0.85 - resilience);
    const lossTarget = Math.floor(exposure * (1 + Math.random() * 2));

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
  if (!sim.ready) return;
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

  if (!sim.ready) {
    ctx.fillStyle = 'rgba(255,255,255,0.88)';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'center';
    ctx.font = `${Math.max(16, width * 0.026)}px sans-serif`;
    ctx.fillText('Choose a starting tile', width / 2, height / 2 - 8);
    ctx.font = `${Math.max(11, width * 0.015)}px sans-serif`;
    ctx.fillText('Rich land and the fertile corridor accelerate growth. Institutions come later.', width / 2, height / 2 + 18);
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
  const [metrics, setMetrics] = useState<MetricsSnapshot>(() => buildMetrics(createInitialSimulation()));
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shellRef = useRef<HTMLDivElement | null>(null);
  const simulationRef = useRef<SimulationState>(createInitialSimulation());

  useEffect(() => {
    const shell = shellRef.current;
    const canvas = canvasRef.current;
    if (!shell || !canvas) return;

    const resize = () => {
      const rect = shell.getBoundingClientRect();
      const nextWidth = Math.max(320, Math.floor(rect.width));
      const nextHeight = Math.max(260, Math.floor(rect.width * 0.62));

      canvas.width = nextWidth;
      canvas.height = nextHeight;
      canvas.style.width = `${nextWidth}px`;
      canvas.style.height = `${nextHeight}px`;
      renderSimulation(canvas, simulationRef.current, hoveredIndex);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(shell);

    return () => observer.disconnect();
  }, [hoveredIndex]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    renderSimulation(canvas, simulationRef.current, hoveredIndex);
  }, [metrics, hoveredIndex]);

  useEffect(() => {
    if (!running) return undefined;

    const timer = window.setInterval(() => {
      stepSimulation(simulationRef.current);
      setMetrics(buildMetrics(simulationRef.current));
    }, 750);

    return () => window.clearInterval(timer);
  }, [running]);

  useEffect(() => {
    if (metrics.tick >= MAX_TURNS && running) {
      setRunning(false);
    }
  }, [metrics.tick, running]);

  const resetSimulation = () => {
    simulationRef.current = createInitialSimulation();
    setRunning(false);
    setHoveredIndex(null);
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
      setMetrics(buildMetrics(sim));
    }
  };

  return (
    <section className="perspectives-proof-shell" aria-labelledby="playable-proof-title">
      <div className="perspectives-proof-grid">
        <div className="perspectives-proof-stage">
          <div className="perspectives-proof-stage__header">
            <div>
              <p className="perspectives-eyebrow">Playable Proof</p>
              <h3 id="playable-proof-title" className="text-4xl md:text-5xl font-semibold tracking-[-0.05em] text-[#1a1a1a]">
                What happens when geography shapes opportunity, and institutions shape survival?
              </h3>
            </div>
            <p className="perspectives-proof-stage__deck">
              This proof of concept turns the case study into a lightweight explorable. Pick one tile, let three neighboring societies emerge, and watch how terrain, resilience, and periodic crisis shape the map over time.
            </p>
          </div>

          <div className="perspectives-proof-canvas-shell" ref={shellRef}>
            <canvas
              ref={canvasRef}
              className="perspectives-proof-canvas"
              onPointerMove={(event) => handleCanvasPointer(event.clientX, event.clientY)}
              onPointerLeave={() => setHoveredIndex(null)}
              onClick={(event) => handleCanvasPointer(event.clientX, event.clientY, true)}
              aria-label="Playable proof showing terrain, expansion, institutions, and crisis over time."
            />
          </div>

          <div className="perspectives-proof-legend" aria-label="Terrain and settlement legend">
            <span><i className="terrain-poor" /> Poor land</span>
            <span><i className="terrain-medium" /> Medium land</span>
            <span><i className="terrain-rich" /> Rich land</span>
            <span><i className="terrain-corridor" /> Fertile corridor</span>
            <span><i className="terrain-institution" /> Institution</span>
          </div>
        </div>

        <aside className="perspectives-proof-panel">
          <div className="perspectives-proof-panel__section">
            <p className="perspectives-proof-panel__label"><b>Hypothesis</b></p>
            <p>
              Geography shapes early access. Institutions reduce collapse. Systems compound those differences over time.
            </p>
          </div>

          <div className="perspectives-proof-panel__section">
            <p className="perspectives-proof-panel__label"><b>How to use</b></p>
            <p>Pick one tile to establish your starting region. Three NPC regions auto-spawn, then you can run, pause, or reset the model.</p>
          </div>

          <div className="perspectives-proof-panel__section">
            <p className="perspectives-proof-panel__label"><b>Reading guide</b></p>
            <ul className="perspectives-proof-notes">
              <li>Start near rich land or the fertile corridor for faster early expansion.</li>
              <li>Institutions appear later and reduce losses when crisis hits.</li>
              <li>This proof stops at turn {MAX_TURNS} so the pattern stays readable.</li>
            </ul>
          </div>

          <div className="perspectives-proof-panel__section">
            <p className="perspectives-proof-panel__label"><b>Player legend</b></p>
            <div className="perspectives-proof-player-legend">
              <div><span className="perspectives-player-chip perspectives-player-chip--you" /> You</div>
              <div><span className="perspectives-player-chip perspectives-player-chip--npc1" /> NPC 1</div>
              <div><span className="perspectives-player-chip perspectives-player-chip--npc2" /> NPC 2</div>
              <div><span className="perspectives-player-chip perspectives-player-chip--npc3" /> NPC 3</div>
            </div>
          </div>

          <div className="perspectives-proof-panel__section">
            <p className="perspectives-proof-panel__label"><b>Controls</b></p>
            <div className="perspectives-proof-controls">
              <button type="button" className="perspectives-control-button" onClick={() => setRunning(true)} disabled={!metrics.ready || running || metrics.tick >= MAX_TURNS}>
                Run
              </button>
              <button type="button" className="perspectives-control-button" onClick={() => setRunning(false)} disabled={!metrics.ready || !running}>
                Pause
              </button>
              <button type="button" className="perspectives-control-button" onClick={resetSimulation}>
                Reset
              </button>
            </div>
          </div>

          <div className="perspectives-proof-panel__section">
            <p className="perspectives-proof-panel__label"><b>Your Territory Metrics</b></p>
            <dl className="perspectives-proof-metrics">
              <div>
                <dt>Turn</dt>
                <dd>{metrics.tick}/{MAX_TURNS}</dd>
              </div>
              <div>
                <dt>Territory</dt>
                <dd>{metrics.playerTerritory}</dd>
              </div>
              <div>
                <dt>Resources</dt>
                <dd>{metrics.playerResources}</dd>
              </div>
              <div>
                <dt>Institutions</dt>
                <dd>{metrics.playerInstitutions}</dd>
              </div>
              <div>
                <dt>Resilience</dt>
                <dd>{metrics.playerResilience}%</dd>
              </div>
              <div>
                <dt>Crises</dt>
                <dd>{metrics.crisisCount}</dd>
              </div>
            </dl>
          </div>

          <div className="perspectives-proof-panel__section">
            <p className="perspectives-proof-panel__label"><b>Interpretation</b></p>
            <p>{metrics.interpretation}</p>
            <p className="perspectives-proof-signal">{metrics.systemSignal}</p>
            {metrics.lastCrisis ? (
              <p className="perspectives-proof-crisis-note">
                Latest crisis: <strong>{metrics.lastCrisis.label}</strong> on turn {metrics.lastCrisis.turn}.
              </p>
            ) : null}
          </div>

          <div className="perspectives-proof-panel__footer">
            <span><b>Leader territory</b>: {metrics.leadingTerritory}</span>
            <span><b>Leader resources</b>: {metrics.leadingResources}</span>
          </div>

          {metrics.summaryReady ? (
            <div className="perspectives-proof-panel__section">
              <p className="perspectives-proof-panel__label"><b>End summary</b></p>
              <div className="perspectives-proof-summary">
                {metrics.finalStandings.map((entry, index) => (
                  <div key={entry.id} className="perspectives-proof-summary__row">
                    <div className="perspectives-proof-summary__title">
                      <span className={`perspectives-player-chip perspectives-player-chip--${entry.id === 0 ? 'you' : `npc${entry.id}`}`} />
                      <span>{index + 1}. {entry.label}</span>
                    </div>
                    <span>{entry.territory} tiles</span>
                    <span>{TERRAIN_LABEL[entry.startTerrain]}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <div className="perspectives-proof-panel__section">
            <p className="perspectives-proof-panel__label"><b>What this panel means</b></p>
            <ul className="perspectives-proof-notes">
              <li><u>Territory</u> shows how much of the map your region controls.</li>
              <li><u>Resources</u> track accumulated capacity for future expansion.</li>
              <li><u>Institutions</u> reduce collapse during periodic shocks.</li>
            </ul>
          </div>

          <div className="perspectives-proof-panel__section">
            <p className="perspectives-proof-panel__label">Full simulation</p>
            <a href={REPO_URL} target="_blank" rel="noreferrer" className="perspectives-proof-link">
              <b>Explore the GitHub simulation</b>
            </a>
          </div>

          
        </aside>
      </div>
    </section>
  );
}
