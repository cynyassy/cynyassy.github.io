import { useEffect, useReducer, useRef, useState } from 'react';
import { themes } from './content';
import { AdventureShell } from './AdventureShell';
import type { SharedStoryPresentation } from './AdventureShell';
import { ReactorScene } from './ReactorScene';
import { operations, reactorLessons } from './reactor-content';
import { initialReactor, reactorReducer, restorationText } from './reactor-state';
import type { Session } from './reactor-state';
import { parseReactor, reactorReference, reactorShareURL } from './reactor-share';
import { GuidedPuzzle } from './machinery/GuidedPuzzle';
import { puzzleDefinitions } from './reactor-puzzles';

export default function ReactorPage({ search, active, onStoryChange,theme,onThemeChange }: { search: string; active: boolean } & SharedStoryPresentation) {
 const [initial] = useState(() => parseReactor(search));
 const mode = initial.configuration.mode;
 const choices = initial.configuration.choices;
 const [state,dispatch] = useReducer(reactorReducer, initial.configuration.session, initialReactor);
 const [drawer,setDrawer] = useState<'learn' | 'share' | 'style' | null>(null);
 const [copyMessage,setCopyMessage] = useState('');
 const [fallback,setFallback] = useState('');
 const dialog = useRef<HTMLDialogElement>(null);
 const terminal = useRef<HTMLElement>(null);
 const recovery = useRef<HTMLButtonElement>(null);
 const effective = mode === 'try' ? reactorReference : choices;
 const selectedTheme = themes.find(t => t.id === theme)!;
 const running = state.phase === 'running';
 const operating = !!state.operation;
 const current = operations[Math.min(state.step,5)];
 const seconds = Math.ceil(state.remaining/1000);
 const time = String(Math.floor(seconds/60)).padStart(2,'0') + ':' + String(seconds%60).padStart(2,'0');
 const urgency = state.session === 'mission' && running && state.remaining <= 15000;
 const restoreLabel = effective.undo === 'generic' ? 'Undo' : effective.undo === 'setting' ? 'Undo reactor setting' : restorationText(state);
 const now = () => performance.now();
 const stage=Math.min(state.fault?.index??state.step,5);
 function openPanel(value: typeof drawer) { if(running) dispatch({ type:'pause', now:now() }); setDrawer(value); }
 useEffect(() => {
  if(!running || state.paused || !active) return;
  const runId = state.runId;
  const timer = window.setInterval(() => dispatch({ type:'tick', runId, now:performance.now() }),50);
  return () => window.clearInterval(timer);
 },[running,state.paused,state.runId,active]);
 useEffect(() => { if(!active) dispatch({ type:'pause', now:performance.now() }); },[active]);
 useEffect(() => {
  const hide = () => { if(document.hidden) dispatch({ type:'pause', now:performance.now() }); };
  document.addEventListener('visibilitychange',hide);
  return () => document.removeEventListener('visibilitychange',hide);
 },[]);
 useEffect(() => {
  if(drawer && dialog.current && !dialog.current.open) dialog.current.showModal();
  if(!drawer && dialog.current?.open) dialog.current.close();
 },[drawer]);
 useEffect(()=>{if(state.fault)recovery.current?.focus();},[state.fault]);
 useEffect(() => { if(state.phase === 'success' || state.phase === 'failure') terminal.current?.focus(); },[state.phase]);
 async function share() {
  const url = reactorShareURL(window.location.href,{story:'reactor', theme, mode, session:state.session, choices});
  setFallback(''); setCopyMessage('');
  try { if(!navigator.clipboard?.writeText) throw new Error(); await navigator.clipboard.writeText(url); setCopyMessage('Link copied. It opens this setup at a fresh briefing.'); }
  catch { setFallback(url); setCopyMessage('Copy the link below. It opens this setup at a fresh briefing.'); }
 }
 function reset(session:Session) { dispatch({type:'reset',session}); setDrawer(null); }
 const status = state.fault ? state.message : operating ? effective.feedback === 'generic' ? 'Working…' : 'Got it. '+operations[state.operation!.index].status+'…' : state.message;
 return <div className="da-page rx-page lab-page adventure-shell" data-story="reactor" data-theme={theme} data-stage={stage}>
 <AdventureShell story="reactor" theme={theme} onThemeChange={onThemeChange} onStoryChange={next=>{dispatch({type:'pause',now:now()});onStoryChange(next);}} onLearn={()=>openPanel('learn')} onReplay={()=>reset(state.session)} onShare={()=>openPanel('share')} status={<div className={'shell-mission-status '+(urgency?'rx-urgent':'')}><span>{state.paused?'Paused':state.session==='practice'?'Practice':state.phase==='briefing'?'Mission':'Remaining'}</span>{state.session==='mission'&&<strong data-testid="countdown">{time}</strong>}{state.session==='practice'&&<span data-testid="countdown" className="da-sr-only">— —</span>}{running&&<button className="da-button da-secondary" onClick={()=>dispatch({type:state.paused?'resume':'pause',now:now()})}>{state.paused?'Resume':'Pause'}</button>}{urgency&&<span>15 seconds left.</span>}</div>}>
 {initial.notice&&<p className="rx-notice" role="status">{initial.notice}</p>}
 <div className="shell-workspace" data-mode="try"><div className="shell-artifact lab-playground"><ReactorScene state={state} theme={theme} compactInstruments styleAccent/>
 <section className="rx-console" aria-label="Reactor controls">
 <div className="rx-task-row" hidden={running&&!state.fault}><div><p className="da-eyebrow">{state.phase==='briefing'?'MARS / ARRAY 07':state.paused?'SEQUENCE PAUSED':state.fault?'RECOVERY REQUIRED':state.phase==='success'?'ALL SYSTEMS ONLINE':state.phase==='failure'?'MISSION ENDED':'NEXT OPERATION · '+String(state.step+1).padStart(2,'0')+'/06'}</p>
 <h2 id="task-heading">{state.phase==='briefing'?"Let’s get the reactor running.":state.fault?'Restore the faulty setting.':state.phase==='success'?'Reactor stabilised.':state.phase==='failure'?'Reactor meltdown.':current.label}</h2></div>
</div>
 {state.phase==='briefing' && <div className="rx-briefing"><p>Bring six systems online. Take your time in practice, or try the {Math.round(state.duration/1000)}-second mission.</p><div className="rx-starts"><button className="da-button da-primary" onClick={()=>dispatch({type:'start',session:'practice',now:now()})}>Start practice</button><button className="da-button da-secondary" onClick={()=>dispatch({type:'start',session:'mission',now:now()})}>Start mission</button></div></div>}
 {running && !state.fault && <GuidedPuzzle state={state} attention={effective.attention} input={input=>{dispatch({type:'input',stage:state.step,input,now:now()});}} commit={()=>dispatch({type:'commit',stage:state.step,now:now()})} retry={()=>dispatch({type:'retry-puzzle'})}/>}
 <div className="rx-feedback" role="status" aria-live="polite"><span>{operating?status:''}</span>
 {operating && effective.feedback==='steps' && <label className="rx-operation-progress">Operation progress<progress max="1500" value={state.operation!.elapsed}/></label>}</div>
 {state.fault && <div className="rx-recovery"><span>{state.fault.training?"This is a practice fault. Restore junction 3; the sections already online will stay on.":state.message}</span><button ref={recovery} className="rx-recovery-lever" data-testid="recovery-lever" disabled={state.paused} onClick={()=>dispatch({type:'restore',now:now()})}><i className="rx-lever-handle" aria-hidden="true"/><span>{restoreLabel}<small>Pull to restore the previous setting</small></span></button></div>}
 {running && state.step>0 && !state.fault && <p className="rx-learning-moment"><strong>Interaction explored:</strong> {puzzleDefinitions[state.step-1].principle} <button className="da-text-button" onClick={()=>openPanel('learn')}>Explore why</button></p>}
 {state.paused&&running&&<p className="shell-paused-note" role="status">Paused. Your settings{state.session==='mission'?' and timer':''} won’t change until you resume.</p>}
 {(state.phase==='success'||state.phase==='failure') && <section className="rx-terminal" ref={terminal} tabIndex={-1} aria-label="Mission debrief"><h3>{state.phase==='success'?"All six sections are online. The reactor is stable.":'The reactor shut down.'}</h3><p>{state.phase==='failure'?state.cause:''} You brought {state.step} of 6 sections online. You tried {state.mistakes} incorrect {state.mistakes===1?'setting':'settings'} and used recovery {state.restores} {state.restores===1?'time':'times'}.</p><details><summary>Interactions explored</summary><ul className="rx-lesson-ledger" aria-label="Interactions explored">{puzzleDefinitions.slice(0,state.step).map(d=><li key={d.title}>{d.title}: {d.principle}</li>)}</ul></details><p><strong>Reflection:</strong> What helped you work out what to do next? Try another visual style and see what changes.</p><div className="rx-style-comparison"><h4>Style lens · {selectedTheme.name}</h4><p>{selectedTheme.vocabulary} During practice, switch styles on the same puzzle. Compare which treatment makes controls easier to recognise, feedback easier to follow, and recovery clearer.</p></div><div className="rx-starts"><button className="da-button da-primary" onClick={()=>dispatch({type:'start',session:'mission',now:now()})}>{state.phase==='failure'?'Retry mission':'Start another mission'}</button><button className="da-button da-secondary" onClick={()=>reset('practice')}>Return to practice</button><button className="da-text-button" onClick={()=>openPanel('learn')}>Review the interaction</button></div></section>}
 {running&&state.session==='practice'&&!state.fault&&<button className="da-text-button lab-local-retry" onClick={()=>dispatch({type:'retry-puzzle'})}>Retry this interaction</button>}
 </section></div></div>
 <nav className="shell-session-tools" aria-label="Practice or mission"><button className="da-text-button" onClick={()=>reset('practice')}>Practice</button><button className="da-text-button" onClick={()=>reset('mission')}>Mission</button></nav>
 </AdventureShell>
 <dialog className="rx-dialog shell-dialog" ref={dialog} onCancel={()=>setDrawer(null)} onClose={()=>setDrawer(null)} aria-labelledby="reactor-panel-heading"><div className="rx-dialog-top"><h2 id="reactor-panel-heading">{drawer==='share'?'Share this setup':drawer==='style'?selectedTheme.name:'Why it works'}</h2><button className="da-text-button" onClick={()=>setDrawer(null)}>Close panel</button></div>
 {drawer==='learn'&&<>{[stage,...puzzleDefinitions.map((_,i)=>i).filter(i=>i!==stage)].map(i=>{const d=puzzleDefinitions[i];return <section className="rx-lesson" key={d.title}><h3>{d.title}</h3><strong>{d.principle}</strong><p>Our adaptation: {d.effect}</p><p>{d.question}</p><p className="da-small">Related book section: {reactorLessons[i===0||i===1||i===4?0:1].source}</p></section>;})}{reactorLessons.map(l=><section className="rx-lesson" key={l.title}><h3>{l.title}</h3><strong>{l.principle}</strong><p>{l.effect}</p><p className="da-small">Book section: {l.source}</p></section>)}<p>Our adaptation: a fictional reactor turns these principles into visible consequences. Urgency and catastrophic failure are game mechanics, not recommendations for everyday interfaces.</p><p className="da-small">Designing Constructionist Futures (2020), Chapter 5 (Kynigos) and Chapter 33 (Klopfer, Anderson, Perry) inform modifying, experimenting with, and reflecting on an artifact. This debrief describes actions, not a measurement of learning.</p></>}
 {drawer==='style'&&<><p><strong>{selectedTheme.category}</strong></p><p>{selectedTheme.context}</p><p>{selectedTheme.vocabulary}</p><p>{selectedTheme.example}</p><p>{selectedTheme.tradeoff}</p><ul>{selectedTheme.sources.map(s=><li key={s.url}><a href={s.url} target="_blank" rel="noreferrer">{s.label}</a></li>)}</ul><p>Each style has its own artwork. The reactor layout, controls and puzzle rules stay the same.</p></>}
 {drawer==='share'&&<><p>Share the style and practice or mission setup. The link opens a fresh briefing, without your countdown, progress or reflection.</p><button className="da-button da-primary" onClick={share}>Copy link</button><p role="status">{copyMessage}</p>{fallback&&<label className="da-field">Your share link<input readOnly value={fallback} onFocus={e=>e.target.select()} autoFocus/></label>}</>}
 </dialog>
 </div>;
}
