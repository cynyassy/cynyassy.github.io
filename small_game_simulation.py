import numpy as np
import matplotlib.pyplot as plt
import matplotlib.animation as animation
from matplotlib.widgets import Button, Slider

"""
Geographic Determinism Simulation

FILE GUIDE
1. Configuration: simulation constants and tuning values
2. Global State: world arrays, runtime flags, and matplotlib handles
3. World Setup: terrain generation and blank state creation
4. Economy + Development Helpers: income, maintenance, caps, and upgrade logic
5. Expansion + Crisis Systems: frontier growth and collapse pressure
6. Display + Metrics: map rendering and right-panel text
7. Runtime + Interaction: turn stepping, mouse input, pause, and reset
8. Figure Setup: matplotlib layout, controls, and animation bootstrap

The simulation is intentionally organized so world rules live above the UI code.
That makes it easier to tune mechanics now and port them later.
"""

# =========================================
# Configuration
# Core tuning values for geography, economy, development, and pacing.
# =========================================
GRID_SIZE = 100
NUM_NPCS = 3
NUM_CIVS = 1 + NUM_NPCS

MAX_TURNS = 1000
EXPANSIONS_PER_TURN = 2
CRISIS_INTERVAL = 15
STARTING_RESOURCES = 10.0
MAINTENANCE_RATE = 0.30

# Development states
UNDEVELOPED = 0
FARM = 1
SETTLEMENT = 2
INSTITUTION = 3

FARM_COST = 4.0
SETTLEMENT_COST = 20.0
INSTITUTION_COST = 1200.0
DEVELOP_ACTIONS_PER_TURN = 1

FARM_BONUS_POOR = 1.5
FARM_BONUS_MEDIUM = 2.0
FARM_BONUS_RICH = 3.0
SETTLEMENT_INCOME_BONUS = 1.0
INSTITUTION_INCOME_BONUS = 2.0
SETTLEMENT_EXPANSION_BONUS = 0.08
INSTITUTION_RISK_REDUCTION = 0.03
INSTITUTION_LOSS_SHIELD = 0.15
INSTITUTION_UPKEEP = 4.0

# Terrain values
POOR = 0.2
MEDIUM = 0.5
RICH = 1.0

POOR_INCOME = 0.35
MEDIUM_INCOME = 1.2
RICH_INCOME = 3.5

POOR_COST = 3.0
MEDIUM_COST = 4.0
RICH_COST = 5.0

# Expansion tuning
BASE_EXPANSION = 0.025

# Labels
CIV_LABELS = ["Player", "NPC 1", "NPC 2", "NPC 3"]

# =========================================
# Global State
# Shared arrays and runtime handles used by the simulation and matplotlib UI.
# =========================================
resource_map = None
owner_map = None
development_map = None
civ_resources = None
crisis_stress = None

turn_count = 0
running = False
setup_done = False
player_start = None
npc_starts = []

fig = None
ax_map = None
ax_info = None
img = None
ani = None
text_info = None
btn_pause = None

DEBUG_INSTITUTIONS = True
DEBUG_CRISIS = True
DEBUG_PRINT_INTERVAL = 50

# =========================================
# World Setup
# Functions that create the initial terrain and blank ownership/development layers.
# =========================================
def generate_resource_map(size: int) -> np.ndarray:
    """Create structured terrain with scarcity and visible fertile corridors.

    Design goals:
    - Most tiles should remain poor, so geography still matters
    - Medium and rich land should cluster rather than appear randomly
    - One or two river-like bands should create legible growth corridors
    """
    noise = np.random.rand(size, size)

    for _ in range(5):
        noise = (
            noise
            + np.roll(noise, 1, axis=0)
            + np.roll(noise, -1, axis=0)
            + np.roll(noise, 1, axis=1)
            + np.roll(noise, -1, axis=1)
        ) / 5.0

    noise = (noise - noise.min()) / (noise.max() - noise.min())

    resource = np.zeros((size, size), dtype=float)
    resource[noise < 0.75] = POOR
    resource[(noise >= 0.75) & (noise < 0.92)] = MEDIUM
    resource[noise >= 0.92] = RICH

    num_rivers = np.random.randint(1, 3)

    for _ in range(num_rivers):
        x = np.random.randint(0, size)
        for y in range(size):
            x += np.random.choice([-1, 0, 1])
            x = int(np.clip(x, 0, size - 1))

            for dx in range(-2, 3):
                nx = int(np.clip(x + dx, 0, size - 1))

                if abs(dx) == 0:
                    resource[y, nx] = RICH
                elif abs(dx) <= 2:
                    resource[y, nx] = max(resource[y, nx], MEDIUM)

    return resource


def create_owner_map(size: int) -> np.ndarray:
    """Create the ownership layer.

    A value of -1 means the tile is currently unclaimed.
    Non-negative values correspond to civilization ids.
    """
    return np.full((size, size), -1, dtype=int)


def create_development_map(size: int) -> np.ndarray:
    """Create the development layer with every tile starting undeveloped."""
    return np.zeros((size, size), dtype=int)

# =========================================
# Economy And Development Helpers
# Utility functions for income, maintenance, infrastructure, and upgrade decisions.
# =========================================
def get_neighbors(y: int, x: int):
    """
    Moore neighborhood (8 directions).
    """
    for ny in range(max(0, y - 1), min(GRID_SIZE, y + 2)):
        for nx in range(max(0, x - 1), min(GRID_SIZE, x + 2)):
            if ny == y and nx == x:
                continue
            yield ny, nx


def choose_random_empty_starts(count: int, forbidden: list[tuple[int, int]]) -> list[tuple[int, int]]:
    starts = []
    while len(starts) < count:
        y = np.random.randint(0, GRID_SIZE)
        x = np.random.randint(0, GRID_SIZE)
        if (y, x) not in forbidden and (y, x) not in starts:
            starts.append((y, x))
    return starts


def development_counts(civ_id: int) -> tuple[int, int, int]:
    """Return farm, settlement, and institution counts for one civilization."""
    owned_dev = development_map[owner_map == civ_id]
    farms = int(np.sum(owned_dev == FARM))
    settlements = int(np.sum(owned_dev == SETTLEMENT))
    institutions = int(np.sum(owned_dev == INSTITUTION))
    return farms, settlements, institutions


def infrastructure_score(civ_id: int) -> float:
    farms, settlements, institutions = development_counts(civ_id)
    return float(farms + 2 * settlements + 3 * institutions)


def institution_cap(civ_id: int) -> int:
    """Limit how many institutions a civilization can sustain from its territory size."""
    territory = int(np.sum(owner_map == civ_id))
    return max(1, territory // 200)


def eligible_institution_tiles(civ_id: int) -> list[tuple[int, int]]:
    """Return owned settlement tiles on medium or rich terrain that could host institutions."""
    eligible = []
    owned_positions = np.argwhere(owner_map == civ_id)
    for y, x in owned_positions:
        if development_map[y, x] != SETTLEMENT:
            continue
        if resource_map[y, x] not in (MEDIUM, RICH):
            continue
        eligible.append((int(y), int(x)))
    return eligible


def should_prioritize_institution(civ_id: int) -> bool:
    """Return whether the civ's current state makes institution building strategically attractive."""
    territory = int(np.sum(owner_map == civ_id))
    resources = civ_resources[civ_id]
    risk_pressure = max(0.0, 0.45 - avg_land_quality(civ_id) * 0.35)
    _, settlements, institutions = development_counts(civ_id)

    if institutions >= institution_cap(civ_id):
        return False
    if resources < INSTITUTION_COST:
        return False
    if not eligible_institution_tiles(civ_id):
        return False

    return (
        territory > 500
        or risk_pressure > 0.08
        or settlements > institutions * 6
    )


def try_build_institution(civ_id: int) -> dict:
    """Try to build one institution and return structured debug information."""
    _, _, institutions = development_counts(civ_id)
    eligible_tiles = eligible_institution_tiles(civ_id)
    cap = institution_cap(civ_id)
    resources = civ_resources[civ_id]
    prioritize = should_prioritize_institution(civ_id)

    result = {
        "eligible": len(eligible_tiles),
        "cap": cap,
        "current": institutions,
        "resources": resources,
        "attempted": False,
        "built": False,
        "reason": "branch_not_reached",
    }

    if not eligible_tiles:
        result["reason"] = "terrain_or_settlement_restriction"
        return result
    if institutions >= cap:
        result["reason"] = "cap"
        return result
    if resources < INSTITUTION_COST:
        result["reason"] = "cost"
        return result
    if not prioritize:
        result["reason"] = "branch_probability"
        return result

    result["attempted"] = True
    y, x = eligible_tiles[np.random.randint(len(eligible_tiles))]
    development_map[y, x] = INSTITUTION
    civ_resources[civ_id] -= INSTITUTION_COST
    result["built"] = True
    result["reason"] = "built"
    return result


def debug_institution_status(civ_id: int, result: dict):
    """Print a compact snapshot of institution logic for debugging."""
    if not DEBUG_INSTITUTIONS:
        return
    if turn_count == 0 or turn_count % DEBUG_PRINT_INTERVAL != 0:
        return

    print(
        f"[Institution Debug][Turn {turn_count}] {CIV_LABELS[civ_id]} | "
        f"eligible={result['eligible']} | cap={result['current']}/{result['cap']} | "
        f"resources={result['resources']:.1f} | attempted={result['attempted']} | "
        f"result={result['reason']}"
    )


def institution_protection(civ_id: int) -> float:
    """Return institution-based protection with diminishing returns."""
    _, _, institutions = development_counts(civ_id)
    raw = institutions * INSTITUTION_RISK_REDUCTION
    reduction = raw / (1 + raw)
    return min(0.75, reduction)


def resilience_score(civ_id: int) -> float:
    return institution_protection(civ_id) + 0.001 * (owner_map == civ_id).sum()


def tile_base_income(tile_value: float) -> float:
    if tile_value == POOR:
        return POOR_INCOME
    if tile_value == MEDIUM:
        return MEDIUM_INCOME
    return RICH_INCOME


def tile_development_bonus(tile_value: float, development_state: int) -> float:
    if development_state == FARM:
        if tile_value == POOR:
            return FARM_BONUS_POOR
        if tile_value == MEDIUM:
            return FARM_BONUS_MEDIUM
        return FARM_BONUS_RICH
    if development_state == SETTLEMENT:
        return SETTLEMENT_INCOME_BONUS
    if development_state == INSTITUTION:
        return INSTITUTION_INCOME_BONUS
    return 0.0


def development_income_bonus(civ_id: int) -> float:
    owned_positions = np.argwhere(owner_map == civ_id)
    bonus = 0.0
    for y, x in owned_positions:
        bonus += tile_development_bonus(resource_map[y, x], development_map[y, x])
    return bonus


def civ_strength(civ_id: int) -> float:
    """
    Strength depends more on the quality of land controlled than on raw area.
    Development adds a modest structural bonus without overriding geography.
    """
    owned = (owner_map == civ_id)
    total_tiles = owned.sum()

    if total_tiles == 0:
        return 0.0

    total_resource = resource_map[owned].sum()
    avg_resource_quality = total_resource / total_tiles
    infra_bonus = infrastructure_score(civ_id) / max(1, total_tiles) * 0.18

    strength = (0.20 * total_tiles / 100.0) + (1.4 * avg_resource_quality) + infra_bonus
    return min(2.5, strength)


def civ_income(civ_id: int) -> float:
    """Compute per-turn income from terrain plus development bonuses."""
    owned_positions = np.argwhere(owner_map == civ_id)

    income = 0.0
    for y, x in owned_positions:
        tile_value = resource_map[y, x]
        income += tile_base_income(tile_value)
        income += tile_development_bonus(tile_value, development_map[y, x])

    return income


def civ_maintenance(civ_id: int) -> float:
    """Compute upkeep from territory size plus institution maintenance."""
    territory = int((owner_map == civ_id).sum())
    _, _, institutions = development_counts(civ_id)
    return territory * MAINTENANCE_RATE + institutions * INSTITUTION_UPKEEP


def avg_land_quality(civ_id: int) -> float:
    owned = resource_map[owner_map == civ_id]
    if len(owned) == 0:
        return 0.0
    return float(np.mean(owned))


def civ_income_current(civ_id: int) -> float:
    return civ_income(civ_id)


def upgrade_cost(target_state: int) -> float:
    if target_state == FARM:
        return FARM_COST
    if target_state == SETTLEMENT:
        return SETTLEMENT_COST
    return INSTITUTION_COST


def next_development_state(current_state: int) -> int | None:
    if current_state == UNDEVELOPED:
        return FARM
    if current_state == FARM:
        return SETTLEMENT
    if current_state == SETTLEMENT:
        return INSTITUTION
    return None


def preferred_development_weight(civ_id: int, y: int, x: int, current_state: int, target_state: int) -> float:
    """Score how attractive a specific upgrade is for a civilization right now.

    The heuristic is intentionally lightweight:
    - Farms help when resources are thin
    - Settlements are favored on tiles that support further expansion
    - Institutions remain rare and are treated as strategic resilience upgrades
    """
    terrain = resource_map[y, x]
    territory = int((owner_map == civ_id).sum())
    resources = civ_resources[civ_id]
    risk_pressure = max(0.0, 0.45 - avg_land_quality(civ_id) * 0.35)
    _, settlements, institutions = development_counts(civ_id)

    if target_state == FARM:
        base = 2.4 if resources < 18 else 1.5
        return base + terrain * 1.8
    if target_state == SETTLEMENT:
        base = 1.0 if resources >= 28 else 0.45
        frontier_touch = sum(1 for ny, nx in get_neighbors(y, x) if owner_map[ny, nx] == -1)
        return base + frontier_touch * 0.30 + terrain * 0.35

    if current_state != SETTLEMENT:
        return 0.0
    if terrain == POOR:
        return 0.0
    if institutions >= institution_cap(civ_id):
        return 0.0

    base = 0.12
    if territory > 500:
        base += 0.18
    if risk_pressure > 0.08:
        base += 0.22
    if settlements > institutions * 6:
        base += 0.10
    return base + min(0.25, resources / 12000.0)


def develop_civ(civ_id: int):
    """
    Spend limited resources to improve owned land.
    Farms drive income, settlements support local expansion,
    and institutions improve resilience.

    Important note for debugging: institutions are not just the automatic next step.
    They use a separate helper path so we can inspect eligibility, cap pressure,
    and prioritization directly.
    """
    owned_positions = [tuple(pos) for pos in np.argwhere(owner_map == civ_id)]
    if not owned_positions:
        return

    institution_result = try_build_institution(civ_id)
    debug_institution_status(civ_id, institution_result)

    actions_taken = 0
    for _ in range(DEVELOP_ACTIONS_PER_TURN):
        candidates = []
        for y, x in owned_positions:
            current_state = development_map[y, x]
            target_state = next_development_state(current_state)
            if target_state is None or target_state == INSTITUTION:
                continue

            cost = upgrade_cost(target_state)
            if civ_resources[civ_id] < cost:
                continue

            weight = preferred_development_weight(civ_id, y, x, current_state, target_state)
            if weight > 0:
                candidates.append((weight + np.random.random() * 0.05, y, x, target_state, cost))

        if not candidates:
            break

        _, y, x, target_state, cost = max(candidates, key=lambda item: item[0])
        development_map[y, x] = target_state
        civ_resources[civ_id] -= cost
        actions_taken += 1

        if actions_taken >= DEVELOP_ACTIONS_PER_TURN:
            break


def settlement_support_bonus(civ_id: int, y: int, x: int) -> float:
    """Give frontier growth a bonus when nearby owned settlements support expansion."""
    bonus = 0.0
    for ny, nx in get_neighbors(y, x):
        if owner_map[ny, nx] == civ_id and development_map[ny, nx] == SETTLEMENT:
            bonus += SETTLEMENT_EXPANSION_BONUS
    return min(0.18, bonus)


def tile_expansion_cost(y: int, x: int) -> float:
    tile_value = resource_map[y, x]

    if tile_value == POOR:
        return POOR_COST
    elif tile_value == MEDIUM:
        return MEDIUM_COST
    else:
        return RICH_COST


def update_civ_economy(civ_id: int):
    """
    Each turn:
    - add income from land
    - subtract maintenance
    - resources cannot go below zero
    """
    civ_resources[civ_id] += civ_income(civ_id)
    civ_resources[civ_id] -= civ_maintenance(civ_id)
    civ_resources[civ_id] = max(0.0, civ_resources[civ_id])


def frontier_tiles(civ_id: int):
    """
    Return unique empty frontier tiles adjacent to a civ's territory.
    """
    frontier = set()
    owned_positions = np.argwhere(owner_map == civ_id)

    for y, x in owned_positions:
        for ny, nx in get_neighbors(y, x):
            if owner_map[ny, nx] == -1:
                frontier.add((ny, nx))

    return list(frontier)


def frontier_edge_tiles(civ_id: int):
    """
    Return owned border tiles that touch unclaimed land.
    Used for crisis losses.
    """
    edges = []
    owned_positions = np.argwhere(owner_map == civ_id)

    for y, x in owned_positions:
        for ny, nx in get_neighbors(y, x):
            if owner_map[ny, nx] == -1:
                edges.append((y, x))
                break

    return edges


def expansion_score(civ_id: int, y: int, x: int) -> float:
    """
    Expansion depends on adjacency, tile quality, and civ strength.
    Keep it tighter so expansion is earned, not automatic.
    """
    strength = civ_strength(civ_id)

    adjacent_owned = 0
    for ny, nx in get_neighbors(y, x):
        if owner_map[ny, nx] == civ_id:
            adjacent_owned += 1

    adjacency_bonus = adjacent_owned * 0.05
    resource_bonus = (
        0.02 if resource_map[y, x] == POOR
        else 0.10 if resource_map[y, x] == MEDIUM
        else 0.22
    )
    strength_bonus = strength * 0.08
    settlement_bonus = settlement_support_bonus(civ_id, y, x)

    chance = BASE_EXPANSION + adjacency_bonus + resource_bonus + strength_bonus + settlement_bonus
    return min(0.75, chance)


def expand_civ(civ_id: int):
    """
    Civilization attempts to expand into frontier tiles.
    Expansion now requires actual resources.
    """
    frontier = frontier_tiles(civ_id)
    if not frontier:
        return

    attempts = EXPANSIONS_PER_TURN + int(civ_strength(civ_id) * 2)
    chosen_count = min(attempts, len(frontier))

    if chosen_count <= 0:
        return

    # Prefer richer frontier tiles
    weights = np.array([resource_map[y, x] + 0.05 for y, x in frontier], dtype=float)
    weights /= weights.sum()

    chosen_indices = np.random.choice(
        len(frontier),
        size=chosen_count,
        replace=False,
        p=weights
    )

    for idx in chosen_indices:
        y, x = frontier[idx]
        cost = tile_expansion_cost(y, x)
        chance = expansion_score(civ_id, y, x)

        if civ_resources[civ_id] >= cost and np.random.random() < chance:
            owner_map[y, x] = civ_id
            development_map[y, x] = UNDEVELOPED
            civ_resources[civ_id] -= cost


def crisis_phase_multiplier(current_turn: int, max_turns: int) -> float:
    """Scale crisis intensity by simulation phase.

    Early turns are lighter so the map can form.
    Mid game uses baseline pressure.
    Late game becomes more punishing.
    """
    if current_turn <= 100:
        return 0.6
    if current_turn <= 500:
        return 1.0
    return 1.25


def crisis_overextension(civ_id: int) -> float:
    """Measure how thinly a civilization's development supports its territory."""
    territory = int(np.sum(owner_map == civ_id))
    farms, settlements, institutions = development_counts(civ_id)
    return territory / (farms + settlements + institutions + 1)


def compute_crisis_severity(civ_id: int) -> tuple[float, float, float, float, float, float]:
    """Return crisis trigger risk plus severity terms for one civilization."""
    territory = int(np.sum(owner_map == civ_id))
    avg_quality = avg_land_quality(civ_id)
    resources = civ_resources[civ_id]
    protection = institution_protection(civ_id)

    structural_overextension = min(1.0, territory / 2200.0)
    weakness = max(0.0, 0.48 - avg_quality * 0.38)
    reserve_pressure = max(0.0, (20 - resources) / 40.0)
    overextension = crisis_overextension(civ_id)
    overextension_penalty = 0.0
    if overextension > 2.5:
        overextension_penalty = min(0.5, (overextension - 2.5) * 0.2)

    risk = 0.0
    risk += weakness
    risk += territory * 0.0013
    risk += 0.14 if resources < 15 else 0.0
    risk = max(0.0, risk - protection)

    phase = crisis_phase_multiplier(turn_count, MAX_TURNS)
    base_severity = min(
        1.9,
        (0.7 + structural_overextension + weakness * 1.2 + reserve_pressure + overextension_penalty) * phase,
    )
    stress = crisis_stress[civ_id]
    final_severity = min(2.5, base_severity * (1 + stress * 0.3))
    reduction = min(0.75, protection)
    return risk, base_severity, final_severity, phase, reduction, overextension


def developed_tiles_by_priority(civ_id: int) -> list[tuple[int, int]]:
    """Return developed tiles ordered by crisis vulnerability.

    Development crises remove farms first, then settlements.
    Institutions are hardest to damage and are only touched under harsher shocks.
    """
    farms = []
    settlements = []
    institutions = []

    owned_positions = np.argwhere(owner_map == civ_id)
    for y, x in owned_positions:
        state = development_map[y, x]
        coord = (int(y), int(x))
        if state == FARM:
            farms.append(coord)
        elif state == SETTLEMENT:
            settlements.append(coord)
        elif state == INSTITUTION:
            institutions.append(coord)

    np.random.shuffle(farms)
    np.random.shuffle(settlements)
    np.random.shuffle(institutions)
    return farms + settlements + institutions


def choose_crisis_type() -> str:
    """Randomly select which kind of crisis hits this turn."""
    return np.random.choice(
        ["Territorial", "Economic", "Development"],
        p=[0.4, 0.3, 0.3],
    )


def apply_territorial_crisis(civ_id: int, severity: float, reduction: float) -> dict:
    """Remove multiple border tiles, with institutions reducing the final damage."""
    territory = int(np.sum(owner_map == civ_id))
    border = frontier_edge_tiles(civ_id)
    if not border:
        return {"tiles_lost": 0, "development_lost": 0, "resources_lost": 0.0}

    if territory < 500:
        base_loss = np.random.randint(2, 5)
    elif territory < 1500:
        base_loss = np.random.randint(4, 9)
    else:
        base_loss = np.random.randint(6, 13)

    losses = max(1, int(round(base_loss * severity * max(0.35, 1 - reduction))))
    actual_losses = 0
    for _ in range(losses):
        if border:
            y, x = border[np.random.randint(len(border))]
            owner_map[y, x] = -1
            development_map[y, x] = UNDEVELOPED
            border = frontier_edge_tiles(civ_id)
            actual_losses += 1

    return {"tiles_lost": actual_losses, "development_lost": 0, "resources_lost": 0.0}


def apply_economic_crisis(civ_id: int, severity: float, reduction: float) -> dict:
    """Apply a percentage-based resource shock that weakens high-resource empires too."""
    shock_pct = min(0.12, max(0.05, 0.05 + 0.035 * severity))
    shock_pct *= max(0.45, 1 - reduction)
    resources_lost = civ_resources[civ_id] * shock_pct
    civ_resources[civ_id] = max(0.0, civ_resources[civ_id] - resources_lost)
    return {"tiles_lost": 0, "development_lost": 0, "resources_lost": resources_lost}


def apply_development_crisis(civ_id: int, severity: float, reduction: float) -> dict:
    """Destroy developed tiles, prioritizing farms and then settlements."""
    targets = developed_tiles_by_priority(civ_id)
    if not targets:
        return {"tiles_lost": 0, "development_lost": 0, "resources_lost": 0.0}

    territory = int(np.sum(owner_map == civ_id))
    if territory < 500:
        base_loss = np.random.randint(2, 5)
    elif territory < 1500:
        base_loss = np.random.randint(4, 8)
    else:
        base_loss = np.random.randint(6, 11)

    losses = max(1, int(round(base_loss * severity * max(0.4, 1 - reduction))))
    actual_losses = 0
    for y, x in targets[:losses]:
        if development_map[y, x] > UNDEVELOPED:
            development_map[y, x] = UNDEVELOPED
            actual_losses += 1

    return {"tiles_lost": 0, "development_lost": actual_losses, "resources_lost": 0.0}


def trigger_crisis_event(civ_id: int) -> dict | None:
    """Resolve one crisis event for a civilization and return debug data."""
    territory = int(np.sum(owner_map == civ_id))
    if territory == 0:
        return None

    risk, base_severity, final_severity, phase, reduction, overextension = compute_crisis_severity(civ_id)
    _, _, institutions = development_counts(civ_id)
    stress_before = crisis_stress[civ_id]

    if np.random.random() >= min(0.85, risk):
        return None

    crisis_type = choose_crisis_type()
    pre_territory = territory
    pre_resources = civ_resources[civ_id]

    if crisis_type == "Territorial":
        outcome = apply_territorial_crisis(civ_id, final_severity, reduction)
    elif crisis_type == "Economic":
        outcome = apply_economic_crisis(civ_id, final_severity, reduction)
    else:
        outcome = apply_development_crisis(civ_id, final_severity, reduction)

    crisis_stress[civ_id] += base_severity

    return {
        "type": crisis_type,
        "civ": CIV_LABELS[civ_id],
        "base_severity": base_severity,
        "final_severity": final_severity,
        "phase": phase,
        "institutions": institutions,
        "reduction": reduction,
        "risk": risk,
        "overextension": overextension,
        "stress": stress_before,
        "tiles_lost": outcome["tiles_lost"],
        "development_lost": outcome["development_lost"],
        "resources_lost": outcome["resources_lost"],
        "before_tiles": pre_territory,
        "after_tiles": int(np.sum(owner_map == civ_id)),
        "before_resources": pre_resources,
        "after_resources": civ_resources[civ_id],
    }


def crisis_event():
    """Apply periodic crises with phase-sensitive scaling and varied shock types."""
    crisis_logs = []

    for civ_id in range(NUM_CIVS):
        log = trigger_crisis_event(civ_id)
        if log is not None:
            crisis_logs.append(log)

    if DEBUG_CRISIS and crisis_logs:
        for log in crisis_logs:
            print(
                f"\n[Crisis][Turn {turn_count}][{log['type']}]\n"
                f"{log['civ']}: base={log['base_severity']:.2f} | stress={log['stress']:.2f} | "
                f"overext={log['overextension']:.2f} | final={log['final_severity']:.2f} | "
                f"phase={log['phase']:.2f} | tiles lost={log['tiles_lost']} | "
                f"development lost={log['development_lost']} | resources lost={log['resources_lost']:.1f} | "
                f"institutions={log['institutions']} | reduction={log['reduction']:.2f}"
            )


def territory_counts():
    return [(owner_map == civ_id).sum() for civ_id in range(NUM_CIVS)]

# =========================================
# Display And Metrics
# Rendering helpers for the map and readable summaries for the side panel.
# =========================================
def composite_display():
    """Render terrain, ownership, and development into one RGB display image.

    Visual priority:
    1. Terrain stays readable as the base layer
    2. Ownership colors show territorial control
    3. Development overlays stay subtle so they add signal without clutter
    """
    display = np.zeros((GRID_SIZE, GRID_SIZE, 3))

    # Terrain colors
    display[resource_map == POOR] = [0.25, 0.25, 0.25]   # dark grey
    display[resource_map == MEDIUM] = [0.55, 0.55, 0.55] # medium grey
    display[resource_map == RICH] = [0.95, 0.95, 0.95]   # light grey

    civ_colors = {
        0: np.array([0.2, 0.4, 1.0]),   # Player blue
        1: np.array([1.0, 0.3, 0.3]),   # NPC 1 red
        2: np.array([0.2, 0.8, 0.3]),   # NPC 2 green
        3: np.array([0.95, 0.8, 0.2]),  # NPC 3 yellow
    }

    for civ_id, color in civ_colors.items():
        mask = owner_map == civ_id
        display[mask] = 0.45 * display[mask] + 0.55 * color

    # Keep development markers subtle so terrain still reads clearly.
    farm_mask = development_map == FARM
    settlement_mask = development_map == SETTLEMENT
    institution_mask = development_map == INSTITUTION

    display[farm_mask] = 0.72 * display[farm_mask] + 0.28 * np.array([0.25, 0.75, 0.25])
    display[settlement_mask] = 0.65 * display[settlement_mask] + 0.35 * np.array([0.12, 0.12, 0.12])
    display[institution_mask] = 0.55 * display[institution_mask] + 0.45 * np.array([1.0, 1.0, 1.0])

    return display


def update_legend():
    return (
        "Legend\n\n"
        "Terrain:\n"
        "Light Grey -> Rich land\n"
        "Medium Grey -> Medium land\n"
        "Dark Grey -> Poor land\n\n"
        "Civilizations:\n"
        "Blue -> Player\n"
        "Red -> NPC 1\n"
        "Green -> NPC 2\n"
        "Yellow -> NPC 3\n\n"
        "Development:\n"
        "Green tint -> Farm\n"
        "Dark core -> Settlement\n"
        "White marker -> Institution\n"
    )

def update_info_text():
    """Refresh the right-side panel with readable per-civilization metrics."""
    counts = territory_counts()
    strengths = [civ_strength(i) for i in range(NUM_CIVS)]
    econ_scores = [civ_income_current(i) for i in range(NUM_CIVS)]
    infra_scores = [infrastructure_score(i) for i in range(NUM_CIVS)]
    resilience_scores = [resilience_score(i) for i in range(NUM_CIVS)]

    strength_ranking = sorted(range(NUM_CIVS), key=lambda i: strengths[i], reverse=True)
    best_economy = int(np.argmax(econ_scores))
    best_infra = int(np.argmax(infra_scores))
    best_resilience = int(np.argmax(resilience_scores))

    lines = [f"Turn: {turn_count}/{MAX_TURNS}", ""]

    for i in range(NUM_CIVS):
        farms, settlements, institutions = development_counts(i)
        lines.append(f"{CIV_LABELS[i]}: {counts[i]} tiles | {civ_resources[i]:.0f} res")
        lines.append(
            f"Farms: {farms} | Settlements: {settlements} | Institutions: {institutions}"
        )
        lines.append(
            f"Avg land: {avg_land_quality(i):.2f} | Income: +{civ_income_current(i):.1f}/turn"
        )
        lines.append("")

    lines.append(
        "Strength: "
        + " > ".join(f"{idx + 1}. {CIV_LABELS[civ_id]}" for idx, civ_id in enumerate(strength_ranking))
    )
    lines.append(f"Strongest economy: {CIV_LABELS[best_economy]}")
    lines.append(f"Strongest infrastructure: {CIV_LABELS[best_infra]}")
    lines.append(f"Most resilient: {CIV_LABELS[best_resilience]}")
    lines.append("")
    lines.append(update_legend())

    text_info.set_text("\n".join(lines))

# =========================================
# Simulation Loop
# Turn-by-turn world updates once setup is complete.
# =========================================
def step_simulation():
    """Advance the world by one turn once the player has chosen a starting tile."""
    global turn_count, running

    if not setup_done:
        return

    for civ_id in range(NUM_CIVS):
        crisis_stress[civ_id] *= 0.9

    if turn_count >= MAX_TURNS:
        running = False
        btn_pause.label.set_text("Start")

        best_resources = int(np.argmax(civ_resources))
        best_land = int(np.argmax([avg_land_quality(i) for i in range(NUM_CIVS)]))
        best_infra = int(np.argmax([infrastructure_score(i) for i in range(NUM_CIVS)]))

        print("\n=== Simulation Summary ===")
        print(f"Most resources: {CIV_LABELS[best_resources]}")
        print(f"Best land quality: {CIV_LABELS[best_land]}")
        print(f"Strongest infrastructure: {CIV_LABELS[best_infra]}")
        return

    for civ_id in range(NUM_CIVS):
        update_civ_economy(civ_id)
        develop_civ(civ_id)
        expand_civ(civ_id)

    if turn_count > 0 and turn_count % CRISIS_INTERVAL == 0:
        crisis_event()

    turn_count += 1

def update(frame):
    if running and setup_done:
        step_simulation()
        img.set_data(composite_display())
        update_info_text()
    return (img,)

# =========================================
# Interaction
# Mouse and button handlers for setup, pause/resume, and reset.
# =========================================
def on_click(event):
    """Handle the initial player click that seeds the simulation.

    The player chooses one starting tile. NPC starting tiles are then assigned
    automatically, and the simulation begins running.
    """
    global player_start, npc_starts, setup_done, running

    if event.inaxes != ax_map:
        return

    if setup_done:
        return

    if event.xdata is None or event.ydata is None:
        return

    x = int(event.xdata)
    y = int(event.ydata)

    if not (0 <= x < GRID_SIZE and 0 <= y < GRID_SIZE):
        return

    player_start = (y, x)
    owner_map[y, x] = 0
    development_map[y, x] = UNDEVELOPED

    npc_starts = choose_random_empty_starts(NUM_NPCS, forbidden=[player_start])
    for npc_id, (ny, nx) in enumerate(npc_starts, start=1):
        owner_map[ny, nx] = npc_id
        development_map[ny, nx] = UNDEVELOPED

    setup_done = True
    running = True
    btn_pause.label.set_text("Pause")

    img.set_data(composite_display())
    update_info_text()
    fig.canvas.draw_idle()


def toggle_pause(event):
    global running
    if not setup_done:
        return
    running = not running
    btn_pause.label.set_text("Pause" if running else "Resume")


def reset_sim(event):
    """Regenerate the world and return the simulation to pre-start state."""
    global resource_map, owner_map, development_map, civ_resources, crisis_stress
    global turn_count, running, setup_done, player_start, npc_starts

    resource_map = generate_resource_map(GRID_SIZE)
    owner_map = create_owner_map(GRID_SIZE)
    development_map = create_development_map(GRID_SIZE)
    civ_resources = np.array([STARTING_RESOURCES] * NUM_CIVS, dtype=float)
    crisis_stress = np.zeros(NUM_CIVS, dtype=float)

    turn_count = 0
    running = False
    setup_done = False
    player_start = None
    npc_starts = []

    btn_pause.label.set_text("Start")
    img.set_data(composite_display())
    text_info.set_text(
        "Choose your starting tile carefully.\n"
        "Adjust sandbox sliders, then press Reset to test a new world."
    )
    fig.canvas.draw_idle()

# =========================================
# Figure Setup
# Build the matplotlib layout, controls, and animation bindings.
# =========================================
# Initial world state used when the script first opens.
resource_map = generate_resource_map(GRID_SIZE)
owner_map = create_owner_map(GRID_SIZE)
development_map = create_development_map(GRID_SIZE)
civ_resources = np.array([10.0] * NUM_CIVS, dtype=float)
crisis_stress = np.zeros(NUM_CIVS, dtype=float)

fig = plt.figure(figsize=(16, 10), constrained_layout=False)
gs = fig.add_gridspec(
    nrows=14,
    ncols=12,
    left=0.05,
    right=0.97,
    top=0.94,
    bottom=0.08,
    hspace=0.40,
    wspace=0.55,
)

ax_map = fig.add_subplot(gs[0:9, 0:8])
ax_info = fig.add_subplot(gs[0:9, 8:12])
ax_controls_panel = fig.add_subplot(gs[9:14, 0:8])
ax_buttons_panel = fig.add_subplot(gs[9:14, 8:12])

ax_info.axis("off")
ax_controls_panel.axis("off")
ax_buttons_panel.axis("off")

img = ax_map.imshow(composite_display(), interpolation="nearest")
ax_map.set_title(
    "Geographic Determinism Simulation\nChoose your starting tile",
    fontsize=14,
    pad=10,
)
ax_map.set_xticks([])
ax_map.set_yticks([])
ax_map.set_anchor("N")

text_info = ax_info.text(
    0.0,
    1.0,
    "Choose your starting tile carefully.\nRich land is rare, and early geography shapes long-term growth.",
    va="top",
    ha="left",
    fontsize=12,
    wrap=True,
    transform=ax_info.transAxes,
)

ax_controls_panel.text(
    0.0,
    0.95,
    "Sandbox Controls",
    fontsize=12,
    fontweight="bold",
    ha="left",
    va="top",
)
ax_controls_panel.text(
    0.0,
    0.83,
    "Adjust sliders, then press Reset to generate a new world.",
    fontsize=10,
    ha="left",
    va="top",
    color="#444444",
)

ax_buttons_panel.text(
    0.20,
    0.7,
    "Simulation Controls",
    fontsize=12,
    fontweight="bold",
    ha="left",
    va="top",
)

# Sliders live inside a fixed bottom-left panel.
ax_maint = ax_controls_panel.inset_axes([0.02, 0.58, 0.44, 0.12])
ax_expand = ax_controls_panel.inset_axes([0.6, 0.58, 0.44, 0.12])
ax_attempts = ax_controls_panel.inset_axes([0.02, 0.32, 0.44, 0.12])
ax_crisis = ax_controls_panel.inset_axes([0.6, 0.32, 0.44, 0.12])
ax_startres = ax_controls_panel.inset_axes([0.02, 0.06, 0.44, 0.12])

# Buttons are grouped on the lower right instead of floating under the map.
ax_pause_btn = ax_buttons_panel.inset_axes([0.20, 0.20, 0.3, 0.34])
ax_reset_btn = ax_buttons_panel.inset_axes([0.54, 0.20, 0.3, 0.34])

btn_pause = Button(ax_pause_btn, "Start")
btn_reset = Button(ax_reset_btn, "Reset")

btn_pause.on_clicked(toggle_pause)
btn_reset.on_clicked(reset_sim)
fig.canvas.mpl_connect("button_press_event", on_click)

# The animation timer drives the simulation loop while the figure is open.
ani = animation.FuncAnimation(fig, update, interval=120, blit=False)

slider_maint = Slider(ax_maint, "Maintenance", 0.05, 0.60, valinit=MAINTENANCE_RATE, valstep=0.01)
slider_expand = Slider(ax_expand, "Base Expand", 0.00, 0.10, valinit=BASE_EXPANSION, valstep=0.005)
slider_attempts = Slider(ax_attempts, "Expand/Turn", 1, 6, valinit=EXPANSIONS_PER_TURN, valstep=1)
slider_crisis = Slider(ax_crisis, "Crisis Int", 5, 50, valinit=CRISIS_INTERVAL, valstep=1)
slider_startres = Slider(ax_startres, "Start Res", 1, 30, valinit=STARTING_RESOURCES, valstep=1)

def update_sliders(val):
    global MAINTENANCE_RATE, BASE_EXPANSION, EXPANSIONS_PER_TURN, CRISIS_INTERVAL, STARTING_RESOURCES

    MAINTENANCE_RATE = slider_maint.val
    BASE_EXPANSION = slider_expand.val
    EXPANSIONS_PER_TURN = int(slider_attempts.val)
    CRISIS_INTERVAL = int(slider_crisis.val)
    STARTING_RESOURCES = slider_startres.val

slider_maint.on_changed(update_sliders)
slider_expand.on_changed(update_sliders)
slider_attempts.on_changed(update_sliders)
slider_crisis.on_changed(update_sliders)
slider_startres.on_changed(update_sliders)

for s in [slider_maint, slider_expand, slider_attempts, slider_crisis, slider_startres]:
    s.label.set_fontsize(9)
    s.valtext.set_fontsize(9)

plt.show()
