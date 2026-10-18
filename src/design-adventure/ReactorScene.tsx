import { StyleAccent } from './StyleAccent';
import { reactorArtwork } from './reactor-artwork';
import type { ThemeId } from './types';
import type { ReactorState } from './reactor-state';
import { operations } from './reactor-content';
import { ignitionCharge, REFERENCE_HZ } from './reactor-puzzles';
export function ReactorScene({ state, compactInstruments = false, styleAccent = false, theme }: { state: ReactorState; compactInstruments?: boolean; styleAccent?: boolean; theme?: ThemeId }) {
 const failure = state.phase === 'failure';
 const artwork = reactorArtwork(theme);
 return <figure className={'rx-window ' + (failure ? 'rx-window--failure' : '')} aria-label="Mars reactor observation window">
 <picture><source media="(max-width: 600px)" srcSet={artwork.mobile}/><img src={artwork.desktop} alt={artwork.alt} width="2170" height="725" fetchPriority="high"/></picture>
 <svg viewBox="0 0 2048 684" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
 <defs><filter id="reactor-glow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="5"/></filter><radialGradient id="reactor-fire"><stop stopColor="#fff"/><stop offset=".3" stopColor="#ffba08"/><stop offset=".7" stopColor="#d00000"/><stop offset="1" stopColor="#d00000" stopOpacity="0"/></radialGradient></defs>
 {operations.map((op,i) => { const lit = i < state.step; const fault = state.fault?.index === i; const y = [444,381,317,254,191,127][i]; return <g key={op.label} data-testid={'reactor-band-'+i} data-lit={lit} data-fault={fault} className={fault ? 'rx-fault-lights' : ''}>
 {[938,973,1009,1047,1083].map(x => <g key={x}><rect x={x-2} y={y-2} width="32" height="24" fill={fault ? '#d00000' : '#ffba08'} opacity={lit || fault ? '.6' : '0'} filter="url(#reactor-glow)"/><rect x={x} y={y} width="28" height="20" fill={fault ? '#d00000' : '#ffba08'} opacity={lit || fault ? '.9' : '0'}/></g>)}
 </g>; })}
 {state.fault && <g className="rx-smoke" opacity=".5"><ellipse cx="1140" cy="260" rx="50" ry="80" fill="#353535"/><ellipse cx="1160" cy="165" rx="65" ry="75" fill="#353535"/></g>}
 {failure && <g className="rx-explosion"><ellipse cx="1024" cy="320" rx="360" ry="340" fill="url(#reactor-fire)"/><path d="M1024 210L1180 45L1110 245L1410 230L1180 340L1320 540L1080 420L950 630L930 410L720 465L870 320L690 160L945 230Z" fill="#ffba08" opacity=".7"/></g>}
 </svg>
 {state.phase!=='briefing' && state.step===1 && <div className="rx-instruments" role="group" aria-label="Pump instruments"><div className="rx-instrument"><span>{compactInstruments?'A':'INSTRUMENT A'}</span><strong>4</strong></div><div className="rx-instrument"><span>{compactInstruments?'B':'INSTRUMENT B'}</span><strong>2</strong></div><div className="rx-instrument"><span>{compactInstruments?'C':'INSTRUMENT C'}</span><strong>7</strong></div></div>}
 {state.phase==='running' && state.step===3 && <div className="rx-instruments"><div className="rx-instrument"><span>REFERENCE</span><strong>{REFERENCE_HZ} Hz</strong></div></div>}
 {state.phase==='running' && state.step===4 && <div className="rx-instruments"><div className="rx-instrument"><span>IGNITION PREVIEW</span><strong>{Math.round(ignitionCharge(state.puzzles))}%</strong></div></div>}
 {state.phase==='running' && state.step===5 && <div className="rx-instruments"><div className="rx-instrument"><span>LIVE PRESSURE</span><strong>{state.puzzles.pressure.toFixed(1)} kPa</strong></div></div>}
 {styleAccent&&<StyleAccent/>}
 <figcaption className="rx-window-caption"><span>{state.sandboxStage===null?'MARS / ARRAY 07':'MARS / ARRAY 07 · ISOLATED SYSTEM PREVIEW'}</span><span>{state.sandboxStage===null?state.step+'/6 SECTIONS ONLINE':'SYSTEM '+String(state.sandboxStage+1).padStart(2,'0')+' / '+(state.phase==='success'?'CONFIRMED':'READY')}</span></figcaption>
 {failure && <div className="rx-blackout"><span>CONNECTION LOST</span></div>}
 </figure>;
}
