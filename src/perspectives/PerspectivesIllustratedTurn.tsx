import { useState } from 'react';
import { ThesisFigure } from './ThesisEvidence';

const moments = [
  { phase: 0, name: 'At first, the resources are shared.', copy: 'Representatives stand beside resource tiles. While a tile is open, any player next to it can gather from it. Each turn represents ten years of a community’s development.', note: 'Where would you settle, knowing someone else can use the same resources?', image: 'open-board', page: 108, alt: 'Original thesis diagram: four communities surround an unclaimed hexagonal board of resources.' },
  { phase: 0, name: 'A building changes who has access.', copy: 'Players spend gathered resources to build on a tile. That claims the tile for their community. A neighbour who could gather there before can no longer use it.', note: 'Your progress can close off someone else’s options.', image: 'claimed-board', page: 109, alt: 'Original thesis diagram: blue, green, yellow and purple communities have claimed different resource tiles.' },
  { phase: 0, name: 'The board starts to belong to fewer people.', copy: 'As communities build and claim more land, power becomes concentrated. The competitive goal is to dominate the board and form a nation. This is where the conversation begins.', note: 'Who gained power, and what made that possible?', image: 'dominant-board', page: 110, alt: 'Original thesis diagram: blue and green control most resource tiles, while yellow and purple hold much smaller regions.' },
  { phase: 1, name: 'Stop and compare what happened.', copy: 'Players discuss the game together: the choices they made, the luck they had and how their communities fared. Everyone’s experience matters, especially the players who struggled.', note: 'What helped you succeed? What held someone else back?', image: 'discussion', page: 111, alt: 'Original thesis illustration: four community representatives surround a shared speech bubble.' },
  { phase: 2, name: 'Now ask how power could be shared.', copy: 'The group considers what fairness would mean in the system they just played. How could they share power? What would need to change for communities with less influence?', note: 'What rule would you change, and who would it help?', image: 'cooperation', page: 112, alt: 'Original thesis illustration: four communities ask how to share power.' },
] as const;
const phases = ['Capture', 'Consolidate', 'Cooperate'];
const starts = [0, 3, 4];

export function PerspectivesIllustratedTurn() {
  const [step, setStep] = useState(0);
  const moment = moments[step];
  return <div className="perspectives-illustrated-turn">
    <div className="perspectives-phase-nav" role="group" aria-label="Three stages of the physical game">
      {phases.map((name, i) => <button key={name} type="button" aria-pressed={moment.phase === i} onClick={() => setStep(starts[i])}><span>0{i + 1}</span>{name}</button>)}
    </div>
    <div className="perspectives-turn-layout">
      <ThesisFigure image={moment.image} page={moment.page} alt={moment.alt} />
      <div className="perspectives-turn-story" aria-live="polite" aria-atomic="true">
        <p className="perspectives-eyebrow">{phases[moment.phase]}{moment.phase === 0 ? ` · Board view ${step + 1} of 3` : ''}</p>
        <h3>{moment.name}</h3><p>{moment.copy}</p><p className="perspectives-turn-notice">{moment.note}</p>
      </div>
    </div>
    <nav className="perspectives-turn-controls" aria-label="Physical-game walkthrough">
      <button type="button" className="perspectives-control-button" disabled={step === 0} onClick={() => setStep(value => value - 1)}>Previous</button>
      <button type="button" className="perspectives-control-button perspectives-turn-next" onClick={() => setStep(value => value === moments.length - 1 ? 0 : value + 1)}>{step === moments.length - 1 ? 'Start again' : step === 2 ? 'Discuss what happened' : step === 3 ? 'Explore cooperation' : 'Next board view'}</button>
    </nav>
  </div>;
}
