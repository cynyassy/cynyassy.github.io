import { thesisPages } from './ThesisEvidence';

const rules = [
  ['Starting positions', 'Begin with two representatives on the board’s placement points. Representatives must have at least one vertex between them.'],
  ['Gathering', 'Take at most one resource from each adjacent tile per turn, up to two resources in total. Open tiles can be used by more than one community.'],
  ['Holding resources', 'Without a house, hold up to four resources. With buildings, the maximum is eight.'],
  ['Movement', 'The final cost sheet lists one grain and one wood for player movement.'],
  ['Building and claiming', 'Pay the building cost back to the collection. Building on a tile makes it yours, so other players can no longer extract from it. Build in this order: House → Hospital → School.'],
  ['Round events', 'At the end of a global turn, after everyone has taken a turn, a player draws a scenario card. It applies to everyone unless the relevant card or building gives protection.'],
  ['Competitive ending', 'Form a nation by dominating the board. The rules award the win to the player with the most victory points within 100 moves or 60 minutes. Discussion and cooperation follow competitive play.'],
];
const costs = [
  ['House', '1 grain + 1 wood + 1 brick'],
  ['Hospital · 1 victory point', '2 wood + 2 brick + 2 ore/metal'],
  ['School · 2 victory points', '2 grain + 2 wood + 2 brick + 2 ore/metal'],
];
export function PerspectivesRules() {
  return <div className="perspectives-rules">
    <p className="perspectives-sheet-note">The thesis’s final iteration, pages 113–114. These are the physical-game rules, separate from the simplified simulation on this page.</p>
    <dl className="perspectives-rule-upgrades">{rules.map(([name, copy]) => <div key={name}><dt>{name}</dt><dd>{copy}</dd></div>)}</dl>
    <h3>Building costs</h3>
    <dl className="perspectives-rule-upgrades">{costs.map(([name, copy]) => <div key={name}><dt>{name}</dt><dd>{copy}</dd></div>)}</dl>
    <div className="perspectives-source-links"><a href={thesisPages[113]} target="_blank" rel="noreferrer">Read the original rules ↗</a><a href={thesisPages[114]} target="_blank" rel="noreferrer">View the cost sheet ↗</a></div>
  </div>;
}
