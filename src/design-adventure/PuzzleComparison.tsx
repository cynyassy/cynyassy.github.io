import { useEffect, useReducer, useState } from 'react';
import { reactorReducer, initialSandbox, restorationText } from './reactor-state';
import type { ReactorState, ReactorChoices, ReactorAction } from './reactor-state';
import type { ThemeId } from './types';
import { PuzzleModule } from './PuzzleModule';
import { ReactorScene } from './ReactorScene';
import { puzzleDefinitions } from './reactor-puzzles';
import { themes } from './content';
import { StyleShowcase } from './StyleShowcase';
import { ChoiceField } from './DesignLab';
import { ResponsiveDesignLab } from './AdventureShell';
import { reactorReference } from './reactor-share';
export interface ComparisonConfiguration {theme:ThemeId;choices:ReactorChoices}
interface ComparisonState {a:ReactorState;b:ReactorState}
type Action={side:'a'|'b';action:ReactorAction}|{stage:number;now:number;side:'a'|'b'};
function reduce(s:ComparisonState,a:Action):ComparisonState {
 if('stage' in a)return {a:{...initialSandbox(a.stage,a.now,s.a.runId+1),paused:a.side!=='a'},b:{...initialSandbox(a.stage,a.now,s.b.runId+1),paused:a.side!=='b'}};
 return {...s,[a.side]:reactorReducer(s[a.side],a.action)};
}
export function PuzzleComparison({stage:initialStage,configuration,onExit,active}:{stage:number;configuration:ComparisonConfiguration;onExit:()=>void;active:boolean}) {
 const [stage,setStage]=useState(initialStage),[side,setSide]=useState<'a'|'b'>('a');
 const [a]=useState(configuration),[b,setB]=useState<ComparisonConfiguration>({theme:configuration.theme,choices:{...reactorReference,attention:configuration.choices.attention==='outline'?'solid':'outline'}});
 const [state,dispatch]=useReducer(reduce,null,()=>({a:initialSandbox(initialStage,performance.now()),b:{...initialSandbox(initialStage,performance.now()),paused:true}}));
 const current=state[side],config=side==='a'?a:b;
 useEffect(()=>{if(!active||current.paused||current.phase!=='running')return;const runId=current.runId;const id=window.setInterval(()=>dispatch({side,action:{type:'tick',runId,now:performance.now()}}),50);return()=>clearInterval(id);},[side,current.runId,current.phase,current.paused,active]);
 useEffect(()=>{const hide=()=>{if(document.hidden)dispatch({side,action:{type:'pause',now:performance.now()}});};document.addEventListener('visibilitychange',hide);return()=>document.removeEventListener('visibilitychange',hide);},[side]);
 useEffect(()=>{if(!active)dispatch({side,action:{type:'pause',now:performance.now()}});},[active,side]);
 function switchSide(next:'a'|'b'){if(next===side)return;dispatch({side,action:{type:'pause',now:performance.now()}});dispatch({side:next,action:{type:'resume',now:performance.now()}});setSide(next);}
 const send=(action:ReactorAction)=>dispatch({side,action});
 return <section className="da-page lab-comparison" data-theme={config.theme} aria-label="Isolated puzzle comparison">
 <StyleShowcase compact value={config.theme} selectLabel="Comparison visual style" disabled={side==='a'} onChange={theme=>setB({...b,theme})}/>
 <div className="lab-compare-top"><div><p className="da-eyebrow">COMPARE / ISOLATED PRACTICE</p><h2>One task. Two treatments.</h2></div><button className="da-button da-secondary" onClick={onExit}>Return to experiment</button></div>
 <div className="lab-compare-tools"><label className="da-field">Puzzle to compare<select value={stage} onChange={e=>{const n=Number(e.target.value);setStage(n);dispatch({stage:n,now:performance.now(),side});}}>{puzzleDefinitions.map((d,i)=><option value={i} key={d.title}>{i+1}. {d.title}</option>)}</select></label><div className="da-modes" role="group" aria-label="Comparison version"><button aria-pressed={side==='a'} onClick={()=>switchSide('a')}>A · Saved design</button><button aria-pressed={side==='b'} onClick={()=>switchSide('b')}>B · Alternative</button></div></div>
 <p className="lab-compare-description">A: {themes.find(t=>t.id===a.theme)!.name} · {a.choices.attention} / {a.choices.feedback} / {a.choices.undo}<br/>B: {themes.find(t=>t.id===b.theme)!.name} · {b.choices.attention} / {b.choices.feedback} / {b.choices.undo}. Both begin with identical controls. Live mission stays paused.</p>
 <div className="shell-workspace" data-mode="make"><div className="shell-artifact lab-playground"><ReactorScene state={current}/><div className="rx-console">
 <PuzzleModule key={side} state={current} attention={config.choices.attention} input={input=>send({type:'input',stage,input,now:performance.now()})} commit={()=>send({type:'commit',stage,now:performance.now()})}/>
 <div className="rx-feedback" role="status">{current.operation?(config.choices.feedback==='generic'?'Working…':`Setting accepted. Applying ${puzzleDefinitions[stage].title.toLowerCase()}…`):current.message}{current.operation&&config.choices.feedback==='steps'&&<label>Known operation progress<progress max={1500} value={current.operation.elapsed}/></label>}</div>
 {current.phase==='success'&&<p><strong>Interaction complete.</strong> Replay this version or try the other treatment.</p>}
 <button className="da-button da-secondary" onClick={()=>dispatch({side,action:{type:'reset',now:performance.now()}})}>Replay version {side.toUpperCase()}</button>
 {current.paused&&<button className="da-button da-primary" onClick={()=>send({type:'resume',now:performance.now()})}>Resume comparison</button>}
 {current.fault&&<button className="rx-recovery-lever" onClick={()=>send({type:'restore',now:performance.now()})}>{config.choices.undo==='generic'?'Undo':config.choices.undo==='setting'?'Undo reactor setting':restorationText(current)}</button>}<details><summary>Rehearse recovery</summary><p>Restore this version’s starting controls without changing the live mission.</p><p>Lever label: {config.choices.undo==='generic'?'Undo':config.choices.undo==='setting'?'Undo reactor setting':restorationText({...current,fault:{index:stage,training:false}})}</p><button className="da-text-button" disabled={current.phase!=='running'||current.paused||!!current.operation||!!current.fault} onClick={()=>dispatch({side,action:{type:'rehearse-recovery'}})}>Trigger sandbox fault</button></details>
 </div></div><ResponsiveDesignLab mode="make"><div className="lab-panel-content"><p className="da-eyebrow">EDIT CONFIGURATION B</p><h2>Change the interface.</h2>{(['attention','feedback','undo'] as const).map(p=><ChoiceField property={p} key={p} choices={b.choices} onChange={choices=>setB({...b,choices})}/>)}<p className="da-small">Edits apply to B only. Select B to experience them and use its visual style selector above. A stays as saved.</p><div className="lab-reflect"><span>REFLECT</span><p>{puzzleDefinitions[stage].question}</p><p>Which version made the task or system state clearer?</p></div></div></ResponsiveDesignLab></div>
 </section>;
}
