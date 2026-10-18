import { useEffect, useRef, useState } from 'react';
import type { ReactorState, Attention } from '../reactor-state';
import { ignitionCharge, POWER_ORDER, puzzleSolved } from '../reactor-puzzles';
import type { PuzzleInput } from '../reactor-puzzles';
import { PumpControls } from './PumpControls';
import { PipeControls } from './PipeControls';
import { SignalControls } from './SignalControls';
import { IgnitionControls } from './IgnitionControls';
import { PressureControls, pressureGuidance } from './PressureControls';
import './controls.css';

const corrections=['That order didn’t match the wiring. Reset the switches and try again.', "That code didn’t match. Check A, B and C, then try again.", "The route isn’t connected yet. Adjust the junctions and try again.", 'The signals don’t match yet. Tune to within 2 Hz of the reference.', 'That charge was outside 65–85%. Try again inside the safe band.', 'Keep the pressure between 45 and 55 kPa for two seconds before locking.'];
const tasks=["Let’s get the power on.",'Prime the coolant.','Route the coolant.','Match the signals.','Catch the ignition window.','Balance the pressure.'];
const clues=['B → A → C',"Look for A, B and C in the window. Enter their numbers in that order.","Connect INLET to CHAMBER. Click a junction to turn it.","Match the reference signal. Up to 2 Hz either side is fine.","Press Ignite core when the charge is between 65% and 85%.","Keep the pressure between 45 and 55 kPa for two seconds, then lock the stabiliser."];
export function GuidedPuzzle({state,attention,input,commit,retry}:{state:ReactorState;attention:Attention;input:(i:PuzzleInput)=>void;commit:()=>void;retry:()=>void}){
 const stage=Math.min(state.fault?.index??state.step,5), p=state.puzzles;
 const locked=state.phase!=='running'||state.paused||!!state.operation||!!state.fault;
 const matched=puzzleSolved(p,stage), prefix=p.switches.every((value,i)=>value===POWER_ORDER[i]);
 const previous=useRef(state.mistakes), heading=useRef<HTMLHeadingElement>(null);
 const [error,setError]=useState(false),[reduced,setReduced]=useState(()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches);
 useEffect(()=>{const media=window.matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setReduced(media.matches);media.addEventListener('change',update);return()=>media.removeEventListener('change',update);},[]);
 useEffect(()=>{if(stage===4&&reduced&&!p.manualTiming&&!locked)input({kind:'timing-mode',manual:true});},[stage,reduced,p.manualTiming,locked]);
 useEffect(()=>{if(state.mistakes>previous.current)setError(true);previous.current=state.mistakes;},[state.mistakes]);
 useEffect(()=>{setError(false);heading.current?.focus();},[stage]);
 useEffect(()=>{if((stage===4||stage===5)&&matched)setError(false);},[stage,matched]);
 function edit(value:PuzzleInput){setError(false);input(value);}
 const labels=['Connect power','Authorise pump','Open cooling loop','Lock containment','Ignite core','Lock stabiliser'];
 const submitLabel=state.operation?'Working…':labels[stage];
 const help=state.paused?'Paused. Resume when ready.':state.fault?'Restore the previous setting to continue.':state.operation?'':error?corrections[stage]:stage===5?pressureGuidance(p,matched).message:stage===2?(matched?'Route connected. Open the cooling loop.':'Rotate the junctions to connect the route.'):stage===3?(matched?'Signals aligned. Lock containment.':'Tune the live signal to the reference.'):'';
 return <section className="clean-puzzle" data-attention={attention} aria-label={tasks[stage]}>
 <div className="clean-task"><span className="clean-step">{String(stage+1).padStart(2,'0')} / 06</span><h2 tabIndex={-1} ref={heading}>{tasks[stage]}</h2><p id={['ix-route-clue','ix-pump-clue','ix-route-clue','ix-signal-clue','ix-ignition-clue','ix-pressure-clue'][stage]}>{clues[stage]}</p></div>
 <div className="clean-controls">
 {stage===0&&<div className="ix-controls"><div className="ix-switches" role="group" aria-label="Power switchboard" aria-describedby="ix-route-clue">{['A','B','C'].map((name,i)=><button key={name} type="button" role="switch" aria-label={'Power switch '+name} aria-checked={p.switches.includes(i)} disabled={locked} data-next={!locked&&prefix&&POWER_ORDER[p.switches.length]===i} onClick={()=>edit({kind:'switch',index:i})}><span>{name}</span><i aria-hidden="true"><i/></i><small>{p.switches.includes(i)?'ON':'OFF'}</small></button>)}</div><div className="ix-actions"><button className="ix-connect" disabled={locked||p.switches.length<3} data-active={!locked&&matched} onClick={commit}>{submitLabel} ↗</button><button className="ix-reset" disabled={locked} data-active={!locked&&!prefix} onClick={()=>edit({kind:'switch-reset'})}>Reset switches</button></div></div>}
 {stage===1&&<PumpControls code={p.code} locked={locked} error={error} submitLabel={submitLabel} onChange={value=>edit({kind:'code',value})} onSubmit={commit}/>}
 {stage===2&&<PipeControls rotations={p.pipes} locked={locked} submitLabel={submitLabel} onRotate={index=>edit({kind:'pipe',index})} onReset={state.session==='practice'?()=>{setError(false);retry();}:undefined} onSubmit={commit}/>}
 {stage===3&&<SignalControls frequency={p.frequency} matched={matched} locked={locked} submitLabel={submitLabel} onChange={value=>edit({kind:'frequency',value})} onSubmit={commit}/>}
 {stage===4&&<IgnitionControls charge={ignitionCharge(p)} matched={matched} manual={p.manualTiming} locked={locked} reducedMotion={reduced} submitLabel={submitLabel} onModeChange={manual=>edit({kind:'timing-mode',manual})} onCharge={value=>edit({kind:'charge',value})} onSubmit={commit}/>}
 {stage===5&&<PressureControls puzzles={p} matched={matched} locked={locked} submitLabel={submitLabel} onToggle={kind=>edit({kind})} onReset={state.session==='practice'?()=>{setError(false);retry();}:undefined} onSubmit={commit}/>}
 {help&&<p id="ix-operation-feedback" className="clean-guidance" role="status">{help}</p>}
 </div></section>;
}
