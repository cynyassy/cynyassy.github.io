import {useEffect,useState} from 'react';
import portraits from '../book-story/assets/portraits.webp';
import {playSound} from '../audio/sound';
import {WorkLink} from './ArtworkWall';
type RelayState={phase:'ready'|'running'|'held'|'paused'|'finished';active:number;stop:number|null;calm:boolean;run:number};
const views=['62 680 258 250','18 12 320 300','72 330 238 286'];
export function EmotionalRelay(){
 const [state,setState]=useState<RelayState>({phase:'ready',active:-1,stop:2,calm:false,run:0});
 useEffect(()=>{
  if(state.phase!=='running')return;
  const run=state.run,active=state.active;
  const timer=setTimeout(()=>setState(current=>{
   if(current.run!==run||current.phase!=='running'||current.active!==active)return current;
   const next=current.active+1;
   return next>=6?{...current,phase:'finished'}:{...current,active:next,phase:next===current.stop?'held':'running'};
  }),1200);
  return ()=>clearTimeout(timer);
 },[state.phase,state.active,state.run,state.stop]);
 useEffect(()=>{const hide=()=>{if(document.hidden)setState(current=>current.phase==='running'?{...current,phase:'paused'}:current);};document.addEventListener('visibilitychange',hide);return ()=>document.removeEventListener('visibilitychange',hide);},[]);
 function start(stop:number|null){playSound('start');setState(current=>({phase:'running',active:0,stop,calm:false,run:current.run+1}));}
 const held=state.phase==='held';
 const message=state.phase==='ready'?'Someone sends a sharp reply. What happens next?':held?'The reply reaches this person. Choose what they send on.':state.phase==='paused'?'The exchange is paused.':state.phase==='finished'?(state.calm?'The next person receives a calmer reply. The remaining characters stay out of the argument.':'The sharp reply reached everyone. Try pausing at one person next time.'):'The reply is being passed along. You can choose an upcoming person to pause.';
 return <><div className="relay-controls">{state.phase==='ready'||state.phase==='finished'?<><button className="lab-primary" onClick={()=>start(state.stop??2)}>Start exchange</button><button onClick={()=>start(null)}>Try without a pause</button></>:state.phase==='paused'?<button className="lab-primary" onClick={()=>setState(current=>({...current,phase:'running'}))}>Resume</button>:state.phase==='running'?<button onClick={()=>setState(current=>({...current,phase:'paused'}))}>Pause exchange</button>:null}</div><div className="relay-cast" role="group" aria-label="Choose a person who will pause before replying">{Array.from({length:6},(_,index)=>{
 const calm=state.calm&&(index===state.active||index===state.active+1),reached=index<=state.active||calm,chosen=index===state.stop;
 return <div className="relay-person" data-reached={reached} data-chosen={chosen} data-calm={calm} key={index}><span className="relay-reply" aria-hidden="true">{calm?(index===state.active?'Give me a minute.':'Okay.'):index===state.active?(held?'…':'Not now!'):reached?'Not now!':' '}</span><button disabled={index===0||state.phase==='held'||state.phase==='paused'||state.phase!=='finished'&&index<=state.active} aria-label={`Pause at person ${index+1}`} aria-pressed={chosen} onClick={()=>setState(current=>({...current,stop:index}))}><svg viewBox={views[index%3]} aria-hidden="true"><image href={portraits} width="625" height="935"/></svg><span>{index+1}</span></button><small>{calm?(index===state.active?'A different reply':'A calmer reply'):index===0?'Starts here':chosen?'Pause here':reached?'Reply received':'Waiting'}</small></div>;
 })}</div><div className="relay-feedback" role="status" aria-live="polite"><p>{message}</p></div>{held&&<div className="relay-choices"><button onClick={()=>setState(current=>({...current,stop:null,phase:'running'}))}>Send the same reply</button><button className="lab-primary" onClick={()=>{playSound('recover');setState(current=>({...current,calm:true,phase:'finished'}));}}>Take a breath. Answer differently.</button></div>}<details className="lab-disclosure"><summary>What could this become?</summary><p>This is a fictional exchange with deliberately simple rules. It could grow into a short illustrated story about choosing a response, using your own dialogue and drawings. It is not a model of how every person or brain reacts.</p><p>New artwork would make the difference: the same character looking neutral, irritated, taking a breath and responding calmly.</p><WorkLink id="book"/></details></>;
}
