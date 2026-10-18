import { useEffect, useReducer, useRef, useState } from 'react';
import type { RefObject } from 'react';
import { ReactorScene } from '../ReactorScene';
import { initialSandbox } from '../reactor-state';
import { POWER_ORDER, puzzleSolved, ignitionCharge } from '../reactor-puzzles';
import type { PuzzleInput } from '../reactor-puzzles';
import { reactorLessons } from '../reactor-content';
import { prototypeReducer, LAST_PROTOTYPE_STAGE } from './prototype-state';
import { PumpControls } from '../machinery/PumpControls';
import { PipeControls } from '../machinery/PipeControls';
import { SignalControls } from '../machinery/SignalControls';
import { IgnitionControls } from '../machinery/IgnitionControls';
import { PressureControls, pressureGuidance } from '../machinery/PressureControls';
import './experiments.css';

const versions = [
 {id:'a',name:'Play first',principle:'Clear labels link an action to its effect.'},
 {id:'b',name:'Guided puzzle',principle:'A clear next action makes an interface easier to follow.'},
 {id:'c',name:'Change and see',principle:'Visual emphasis helps distinguish the main action.'},
] as const;
type Version = typeof versions[number]['id'];
function fromURL():Version {
 const value=new URLSearchParams(window.location.search).get('version');
 return versions.some(v=>v.id===value)?value as Version:'b';
}
function initialStage(version:Version){
 const value=new URLSearchParams(window.location.search).get('puzzle');
 return version==='b'?(value==='pump'?1:value==='pipes'?2:value==='signal'?3:value==='ignition'?4:value==='pressure'?5:0):0;
}
function puzzleURL(stage:number){
 const url=new URL(window.location.href);
 if(stage===1)url.searchParams.set('puzzle','pump');else if(stage===2)url.searchParams.set('puzzle','pipes');else if(stage===3)url.searchParams.set('puzzle','signal');else if(stage===4)url.searchParams.set('puzzle','ignition');else if(stage===5)url.searchParams.set('puzzle','pressure');else url.searchParams.delete('puzzle');
 window.history.replaceState({},'',url);
}

export default function Experiments(){
 const [version,setVersion]=useState<Version>(fromURL);
 const firstVisit=useRef(true);
 const title=useRef<HTMLHeadingElement>(null);
 const [notice,setNotice]=useState(()=>{
  const value=new URLSearchParams(window.location.search).get('version');
  return value&&!versions.some(v=>v.id===value)?'Unknown version. Showing B.':'';
 });
 useEffect(()=>{
  const back=()=>{setVersion(fromURL());setNotice('');};
  window.addEventListener('popstate',back);return()=>window.removeEventListener('popstate',back);
 },[]);
 useEffect(()=>{if(firstVisit.current){firstVisit.current=false;return;}title.current?.focus();},[version]);
 function choose(next:Version){
  if(next===version)return;
  const url=new URL(window.location.href);url.searchParams.set('version',next);url.searchParams.delete('puzzle');
  window.history.pushState({},'',url);setVersion(next);setNotice('');
 }
 return <div className="ix-space">
  <a className="ix-skip" href="#prototype">Skip to prototype</a>
  <header className="ix-header"><a className="ix-brand" href="../index.html">cynyassy<sup>®</sup></a><span>Interface experiments</span><a className="ix-reference" href="design-adventure.html">Full adventure ↗</a></header>
  <nav className="ix-versions" aria-label="Experiment version">{versions.map(v=><button key={v.id} aria-current={version===v.id?'page':undefined} onClick={()=>choose(v.id)}><span>{v.id.toUpperCase()}</span>{v.name}</button>)}</nav>
  {notice&&<p className="ix-notice" role="status">{notice}</p>}
  <main id="prototype" tabIndex={-1}><Prototype key={version} version={version} titleRef={title}/></main>
  <footer className="ix-footer"><details><summary>About these experiments</summary>
   <p>One Swiss palette. Three ways to reveal information. Switching versions starts a fresh puzzle.</p>
   <p>A shows the whole switchboard task. B guides all six reactor systems, from connecting power to stabilising pressure. C lets you compare button emphasis.</p>
   <p>These are untimed prototypes, not the complete adventure. They do not score or measure learning.</p>
  </details>{versions.map(v=><a key={v.id} href={'?version='+v.id} onClick={e=>{e.preventDefault();choose(v.id);}}>{v.id.toUpperCase()}</a>)}</footer>
 </div>;
}

function Prototype({version,titleRef}:{version:Version;titleRef:RefObject<HTMLHeadingElement>}){
 const [state,dispatch]=useReducer(prototypeReducer,null,()=>initialSandbox(
  initialStage(version),performance.now()));
 const [equal,setEqual]=useState(true);
 const [panel,setPanel]=useState<'style'|'learning'|null>(null);
 const [error,setError]=useState(false);
 const [reducedMotion,setReducedMotion]=useState(()=>window.matchMedia('(prefers-reduced-motion:reduce)').matches);
 const previousMistakes=useRef(state.mistakes);
 const dialog=useRef<HTMLDialogElement>(null);
 const taskHeading=useRef<HTMLHeadingElement>(null);
 const scene=useRef<HTMLDivElement>(null);
 const stage=state.sandboxStage??0, pump=stage===1, routing=stage===2, signal=stage===3, ignition=stage===4, pressure=stage===5;
 const previousStage=useRef(stage);
 const lesson=versions.find(v=>v.id===version)!;
 const principle=pressure?'Feedback helps you regulate a changing system.':ignition?'Visible constraints help you choose when to act.':signal?'Continuous controls need continuous feedback.':routing?'Visible feedback makes exploration easier.':pump?'Labels connect clues to the controls.':lesson.principle;
 const busy=!!state.operation,done=state.phase==='success',locked=busy||done||state.paused;
 const route=state.puzzles.switches;
 const prefix=route.every((n,i)=>n===POWER_ORDER[i]);
 const next=POWER_ORDER[route.length];
 const names=['A','B','C'];
 const task=pressure?(done?'Reactor stabilised.':'Balance the pressure.'):ignition?(done?'Core ignited.':'Catch the ignition window.'):signal?(done?'Containment aligned.':'Match the signals.'):routing?(done?'Cooling loop open.':'Route the coolant.'):pump?(done?'Coolant ready.':'Prime the coolant.'):(done?'Power online.':'Power the reactor.');
 const guided=version==='b'&&!locked;
 const charge=ignitionCharge(state.puzzles);
 const ignitionReady=ignition&&puzzleSolved(state.puzzles,4);
 const pressureReady=pressure&&puzzleSolved(state.puzzles,5);
 const needsReset=(error&&route.length===3)||!prefix;
 const guideConnect=guided&&!needsReset&&route.length===3;
 const guideReset=guided&&needsReset;
 useEffect(()=>{
  const query=window.matchMedia('(prefers-reduced-motion:reduce)');
  const change=()=>setReducedMotion(query.matches);
  query.addEventListener('change',change);return()=>query.removeEventListener('change',change);
 },[]);
 useEffect(()=>{
  if(ignition&&reducedMotion&&!locked&&!state.puzzles.manualTiming)
   dispatch({type:'input',stage:4,input:{kind:'timing-mode',manual:true},now:performance.now()});
 },[ignition,reducedMotion,locked,state.puzzles.manualTiming]);
 useEffect(()=>{
  if(state.mistakes>previousMistakes.current)setError(true);
  previousMistakes.current=state.mistakes;
 },[state.mistakes]);
 useEffect(()=>{if(ignitionReady||pressureReady)setError(false);},[ignitionReady,pressureReady]);
 useEffect(()=>{
  if(state.phase!=='running'||state.paused)return;
  const runId=state.runId;
  const timer=window.setInterval(()=>dispatch({type:'tick',runId,now:performance.now()}),50);
  return()=>window.clearInterval(timer);
 },[state.phase,state.paused,state.runId]);
 useEffect(()=>{
  const hide=()=>{if(document.hidden)dispatch({type:'pause',now:performance.now()});};
  document.addEventListener('visibilitychange',hide);return()=>document.removeEventListener('visibilitychange',hide);
 },[]);
 useEffect(()=>{
  if(panel&&!dialog.current?.open)dialog.current?.showModal();
  if(!panel&&dialog.current?.open)dialog.current.close();
 },[panel]);
 useEffect(()=>{
  if(stage>0||stage!==previousStage.current){
   taskHeading.current?.focus({preventScroll:true});
   if(window.matchMedia('(max-width:700px)').matches)scene.current?.scrollIntoView({block:'start',behavior:'auto'});
  }
  previousStage.current=stage;
 },[stage]);
 function open(value:'style'|'learning'){
  if(state.operation)dispatch({type:'pause',now:performance.now()});setPanel(value);
 }
 function input(value:PuzzleInput){setError(false);dispatch({type:'input',stage,input:value,now:performance.now()});}
 function submit(){setError(false);dispatch({type:'commit',stage,now:performance.now()});}
 function reset(){
  if(version==='b'){dispatch({type:'restart-sequence',now:performance.now()});puzzleURL(0);}
  else dispatch({type:'reset',now:performance.now()});
  setError(false);setPanel(null);
 }
 function nextPuzzle(){
  if(version!=='b'||stage>=LAST_PROTOTYPE_STAGE||state.phase!=='success')return;
  dispatch({type:'next-puzzle',now:performance.now()});setError(false);setPanel(null);puzzleURL(stage+1);
 }
 const message=state.paused?'Paused.':done?(pressure?'All six sections online.':ignition?'Core online.':signal?'Containment locked.':routing?'Coolant flowing.':pump?'Coolant primed.':'Power connected.'):
  busy?(pressure?'Locking the stabiliser…':ignition?'Igniting the core…':signal?'Locking containment…':routing?'Opening the cooling loop…':pump?'Priming coolant…':'Connecting…'):
  error?(pressure?'Hold 45–55 kPa for two seconds, then lock.':ignition?'Missed the safe band. Try again.':signal?'Signals not aligned. Adjust and retry.':routing?'Route incomplete. Adjust the junctions.':pump?'Code did not match. Edit and retry.':route.length<3?'Set all three switches, then connect.':'Order did not match. Reset and try again.'):
  pressure?pressureGuidance(state.puzzles,pressureReady).message:
  ignition?(ignitionReady?'Inside safe band. Ignite the core.':state.puzzles.manualTiming?'Set charge inside the safe band.':'Wait for the charge to enter the safe band.'):
  signal?(puzzleSolved(state.puzzles,3)?'Signals aligned. Lock containment.':'Tune the live signal to match the reference.'):
  routing?(puzzleSolved(state.puzzles,2)?'Route connected. Open the cooling loop.':'Rotate the outlined junction to connect the route.'):
  pump?(state.puzzles.code.length===3?'Ready to authorise.':'Read the instruments. Enter three digits.'):
  version==='b'&&!prefix?'Route off track. Reset the switches.':route.length?`Route: ${route.map(n=>names[n]).join(' → ')}`:'Switches off.';
 return <section className={'ix-prototype ix-version-'+version+(pump?' ix-pump':routing?' ix-routing':signal?' ix-signal':ignition?' ix-ignition':pressure?' ix-pressure':'')} aria-label={lesson.name}>
  <div className="ix-style"><h1 ref={titleRef} tabIndex={-1}>Swiss Design<span> / {version.toUpperCase()}</span></h1><button className="ix-text" onClick={()=>open('style')}>About the style</button></div>
  <div className="ix-scene" ref={scene}><ReactorScene state={state} compactInstruments={pump}/><span className="ix-scene-state" aria-hidden="true">{pressure?(done?'ALL SIX SYSTEMS ONLINE':'CORE ONLINE / STABILISER READY'):ignition?(done?'CORE ONLINE':'CONTAINMENT ONLINE / IGNITION READY'):signal?(done?'CONTAINMENT ONLINE':'COOLING ONLINE / SIGNAL READY'):routing?(done?'COOLING LOOP ONLINE':'PUMP ONLINE / ROUTING READY'):pump?(done?'COOLANT ONLINE':'POWER ONLINE / PUMP READY'):done?'POWER ONLINE':'MARS / ARRAY 07'}</span></div>
  <section className="ix-console" aria-label={pressure?'Pressure stabilisation':ignition?'Core ignition':signal?'Containment signal':routing?'Coolant routing':pump?'Pump authorisation':'Power switchboard'}>
   <div className="ix-task"><h2 ref={taskHeading} tabIndex={-1}>{task}</h2>
    {pressure?<p id="ix-pressure-clue" className="ix-pump-clue">Hold 45–55 kPa.<br/>Keep it there for two seconds.</p>:ignition?<p id="ix-ignition-clue" className="ix-pump-clue">Ignite at 65–85% charge.<br/>Missed it? Try the next pass.</p>:signal?<p id="ix-signal-clue" className="ix-pump-clue">Match the reference.<br/>Within ±2 Hz.</p>:routing?<p className="ix-pump-clue">INLET → CHAMBER.<br/>Click a junction to rotate.</p>:pump?<p id="ix-pump-clue" className="ix-pump-clue">Read A → B → C.</p>:<p id="ix-route-clue" className="ix-order" aria-label="Switch order: B, then A, then C">B <span>→</span> A <span>→</span> C</p>}
   </div>
   {pressure?<PressureControls puzzles={state.puzzles} matched={pressureReady} locked={locked}
    submitLabel={busy?'Stabilising…':done?'Reactor stable ✓':'Lock stabiliser'} onToggle={kind=>input({kind})} onReset={()=>{setError(false);dispatch({type:'retry-puzzle'});}} onSubmit={submit}/>:ignition?<IgnitionControls charge={charge} matched={ignitionReady} manual={state.puzzles.manualTiming} locked={locked} reducedMotion={reducedMotion}
    submitLabel={busy?'Igniting…':done?'Core online ✓':'Ignite core'} onModeChange={manual=>input({kind:'timing-mode',manual})} onCharge={value=>input({kind:'charge',value})} onSubmit={submit}/>:signal?<SignalControls frequency={state.puzzles.frequency} matched={puzzleSolved(state.puzzles,3)} locked={locked}
    submitLabel={busy?'Locking…':done?'Containment locked ✓':'Lock containment'} onChange={value=>input({kind:'frequency',value})} onSubmit={submit}/>:routing?<PipeControls rotations={state.puzzles.pipes} locked={locked}
    submitLabel={busy?'Opening…':done?'Loop open ✓':'Open cooling loop'}
    onRotate={index=>input({kind:'pipe',index})} onReset={()=>{setError(false);dispatch({type:'retry-puzzle'});}} onSubmit={submit}/>:pump?<PumpControls code={state.puzzles.code} locked={locked} error={error}
    submitLabel={busy?'Priming…':done?'Pump ready ✓':'Authorise pump'} onChange={value=>input({kind:'code',value})} onSubmit={submit}/>:<>
    {version==='c'&&<div className="ix-treatment" role="group" aria-label="Button emphasis"><span>Buttons</span><button aria-pressed={equal} onClick={()=>setEqual(true)}>Equal</button><button aria-pressed={!equal} onClick={()=>setEqual(false)}>One primary</button></div>}
    <div className="ix-controls"><div className="ix-switches" role="group" aria-label="Power switchboard" aria-describedby="ix-route-clue">
     {names.map((name,index)=>{
      const on=route.includes(index),hint=guided&&prefix&&next===index;
      return <button key={name} role="switch" type="button" aria-label={'Power switch '+name} aria-checked={on} disabled={locked} data-next={hint} onClick={()=>input({kind:'switch',index})}>
       <span>{name}</span><i aria-hidden="true"><i/></i><small>{on?'ON':'OFF'}</small>{hint&&<span className="ix-next">Next</span>}
      </button>;
     })}
    </div>
    <div className={'ix-actions '+(version==='c'&&equal?'ix-equal':'')}>
     <button className="ix-connect" data-active={guideConnect} disabled={locked} onClick={submit}>{busy?'Connecting…':done?'Connected ✓':'Connect power'}<span aria-hidden="true">↗</span></button>
     <button className="ix-reset" data-active={guideReset} disabled={locked} onClick={()=>input({kind:'switch-reset'})}>Reset switches</button>
    </div></div>
   </>}
   <div id="ix-operation-feedback" className="ix-feedback" role="status" aria-live="polite"><span className={error?'ix-error':''}>{message}</span>
    {state.paused&&!done&&<button className="ix-text" onClick={()=>dispatch({type:'resume',now:performance.now()})}>Resume</button>}
    {busy&&<progress aria-label={pressure?'Locking stabiliser':ignition?'Igniting core':signal?'Locking containment':routing?'Opening cooling loop':pump?'Priming coolant':'Connecting power'} max="1500" value={state.operation!.elapsed}/>}
   </div>
  </section>
  {done&&<section className="ix-completion" aria-label="Interaction lesson"><div><span className="ix-small">{pressure?'ALL SIX SYSTEMS ONLINE':'WHAT YOU JUST EXPERIENCED'}</span><h3>{principle}</h3></div><div>
   <button className="ix-text" onClick={()=>open('learning')}>Why it works ↗</button>
   {version==='b'&&stage<LAST_PROTOTYPE_STAGE?<button className="ix-text ix-next-puzzle" onClick={nextPuzzle}>Next puzzle →</button>:<button className="ix-text" onClick={reset}>{version==='b'?'Start over ↺':'Play again ↺'}</button>}
  </div></section>}
  <dialog className="ix-dialog" ref={dialog} onCancel={()=>setPanel(null)} onClose={()=>setPanel(null)} aria-labelledby="ix-panel-title">
   <button className="ix-text ix-close" onClick={()=>setPanel(null)}>Close ✕</button>
   <h2 id="ix-panel-title">{panel==='style'?'Swiss Design':principle}</h2>
   {panel==='style'?<>
    <p>A clear grid. Strong type. Restrained colour.</p><p>This is our interface interpretation of the Swiss graphic design tradition.</p>
    <a href="https://museum-gestaltung.ch/de/grafik" target="_blank" rel="noreferrer">Study the graphic collection ↗</a>
   </>:<>
    <p>{pressure?'Valve state changes immediately, but pressure changes over time. The readout, operating band and stable-hold indicator let you adjust, observe and correct. The outline guides you to a valve, then Lock stabiliser once the two-second hold is complete.':ignition?'The labelled safe band makes the accepted charge range visible before you act. The marker and charge number show when to ignite. Manual timing offers the same task without a moving target. The action outline stays steady, rather than flashing as the band is crossed.':signal?'The waveform and numerical readout respond together as you tune. The reference stays visible. When the signals are within tolerance, the outline moves to Lock containment. A solid reference and dashed live signal distinguish the traces without depending on colour.':routing?'Each click visibly rotates a junction. The outline guides you through the controls; you still work out the pipe orientation. A connected route turns blue and displays a connection message. You can reset junctions without losing earlier reactor sections.':pump?'The instrument labels connect the scene to the code field. The outline points to that field, then Authorise; it never supplies a digit. You can edit the code before trying it.':version==='a'?'Matching letters on the diagram and switches help you connect an instruction to an action.':version==='b'?'The red outline identifies the next switch, then Connect power. If the route goes off track, it points to Reset. The full clue stays visible so you can relate each action to the route.':'One primary button gives the intended action more visual weight. Equal emphasis makes the main action and reset compete.'}</p>
    <p><strong>Notice:</strong> {pressure?'Pressure drifts down even with both valves closed. Reset pressure restores this setting without removing earlier reactor progress. The final section lights only after stabilisation finishes.':ignition?'Your click is checked against the actual charge at that moment. A missed attempt is safe to retry; the fifth reactor section lights after a successful ignition finishes.':signal?'The signal changes immediately while tuning. The fourth reactor section lights only after containment finishes locking.':routing?'The pipe preview responds immediately. The third reactor section lights only after the cooling loop finishes opening.':pump?'The digits change immediately. The second reactor section lights only after authorisation finishes.':'The switches acknowledge your input immediately; the reactor lights after the operation finishes.'}</p>
    <details><summary>Source and reflection</summary><p>Related reading: {reactorLessons[0].source}{pump||routing||signal||ignition||pressure?' '+reactorLessons[1].source:''}</p>
     <p>Our adaptation uses the fictional reactor as a small interface experiment. {version==='b'?'The staged highlighting is our design exploration, not a learning measurement.':''}</p>
     <p>{pressure?'Did you understand the delay between changing a valve and seeing pressure settle?':ignition?'Could you recognise the safe band without relying on colour or motion alone?':signal?'Which feedback helped most: the waveform, the number, or the alignment message?':routing?'Did the changing pipe shapes help you understand what to try next?':pump?'Was it clear where to find the code and how to correct it?':'Which cue helped you decide what to do next?'}</p>
    </details>
   </>}
  </dialog>
 </section>;
}
