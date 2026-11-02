/* Cynyassy sound layer. Original synthesised cues; no samples or dependencies. */
(()=>{
'use strict';
if(window.CynyassyAudio)return;
const KEY='cynyassy:sound',AudioClass=window.AudioContext||window.webkitAudioContext;
let enabled=true,context=null,master=null,generation=0,resuming=false,lastCueAt=-Infinity;
const voices=new Set();
try{enabled=localStorage.getItem(KEY)!=='muted';}catch{/* Storage is optional. */}
function stop(){for(const voice of voices){try{voice.stop();}catch{}}voices.clear();}
const listeners=new Set();
let message='';
function getState(){return {enabled,available:!!AudioClass,message};}
function update(nextMessage=''){
 message=nextMessage;
 for(const listener of listeners)listener(getState());
}
function applyPreference(next,persist=true){
 enabled=next;generation++;stop();
 if(master)master.gain.setValueAtTime(enabled&&!document.hidden?.3:0,context.currentTime);
 if(persist)try{localStorage.setItem(KEY,enabled?'on':'muted');}catch{}
 update(enabled?'Sound on.':'Sound muted.');
}
function note(hz,start,duration,{end=hz,type='triangle',volume=.11}={}){
 if(!context||!enabled||document.hidden||voices.size>=24)return;
 const osc=context.createOscillator(),gain=context.createGain();osc.type=type;
 osc.frequency.setValueAtTime(hz,start);if(end!==hz)osc.frequency.exponentialRampToValueAtTime(end,start+duration*.85);
 gain.gain.setValueAtTime(0,start);gain.gain.linearRampToValueAtTime(volume,start+.006);gain.gain.exponentialRampToValueAtTime(.0001,start+duration);
 osc.connect(gain);gain.connect(master);voices.add(osc);osc.onended=()=>{voices.delete(osc);osc.disconnect();gain.disconnect();};osc.start(start);osc.stop(start+duration+.015);
}
function play(cue){
 if(!enabled||!context||context.state!=='running'||document.hidden)return;
 const t=context.currentTime+.006;
 // Keep rapidly adjusted knobs/sliders and click bubbling from becoming a buzz.
 if((cue==='tap'||cue==='adjust')&&context.currentTime-lastCueAt<.075)return;
 lastCueAt=context.currentTime;
 const sequence=(hz,spacing=.075,duration=.12,type='triangle',volume=.1)=>hz.forEach((n,i)=>note(n,t+i*spacing,duration,{type,volume}));
 switch(cue){
 case 'tap':note(580,t,.035,{end:440,volume:.06});break;
 case 'adjust':note(420,t,.04,{volume:.065});break;
 case 'start':sequence([330,440,660]);break;
 case 'pause':sequence([440,330],.06,.08);break;
 case 'resume':sequence([330,440],.06,.08);break;
 case 'working':note(180,t,.12,{end:300,volume:.07});break;
 case 'progress':sequence([523,659],.075,.12);break;
 case 'recover':sequence([330,440,554],.07,.12);break;
 case 'fault':sequence([220,165],.11,.15,'triangle',.12);break;
 case 'warning':sequence([392,392],.18,.10,'triangle',.1);break;
 case 'failure':sequence([294,247,196,131],.13,.18,'triangle',.12);break;
 case 'crisis':sequence([196,147,196],.12,.13,'triangle',.11);break;
 case 'complete':sequence([523,659,784,1047,784,1047],.105,.2,'square',.07);break;
 case 'discover':sequence([523,659,784],.075,.12,'square',.08);break;
 case 'revisit':note(440,t,.065,{volume:.12});break;
 case 'fire':note(820,t,.10,{end:180,type:'sawtooth',volume:.07});break;
 case 'jump':note(220,t,.16,{end:660,type:'square',volume:.11});break;
 case 'land':note(115,t,.055,{end:65,volume:.14});break;
 }
}
function unlock(){
 if(!enabled||!AudioClass||document.hidden||resuming)return;
 try{
  if(!context){context=new AudioClass();master=context.createGain();master.gain.value=.3;master.connect(context.destination);}
  if(context.state==='running')return;
  resuming=true;const token=generation;
  context.resume().then(()=>{if(token===generation&&master)master.gain.setValueAtTime(enabled&&!document.hidden?.3:0,context.currentTime);}).catch(()=>{update('Sound is unavailable right now. You can keep playing.');}).finally(()=>{resuming=false;});
 }catch{update('Sound could not start. You can keep playing.');}
}
window.CynyassyAudio={play,getState,subscribe(listener){listeners.add(listener);return ()=>listeners.delete(listener);},setEnabled(next){applyPreference(!!next);if(enabled){unlock();play('resume');}}};
window.dispatchEvent(new Event('cynyassy:audio-ready'));
function init(){
 update(AudioClass?'':'Sound is not supported in this browser.');
 // Capture before application handlers. Never create a context on load or from a timer.
 document.addEventListener('pointerdown',event=>{if(!event.target.closest?.('#sound'))unlock();},true);
 document.addEventListener('keydown',event=>{if(!event.repeat&&!event.target.closest?.('#sound')&&['Enter',' ','ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key))unlock();},true);
 document.addEventListener('click',event=>{
  const target=event.target.closest?.('button,a,summary,[role="tab"]');
  if(!target||target.closest('#sound,[data-sound-scope="game"]')||target.disabled||target.getAttribute('aria-disabled')==='true')return;
  unlock();play('tap');
 },true);
 document.addEventListener('change',event=>{if(event.target.matches?.('select,input[type="checkbox"],input[type="radio"]')&&!event.target.closest('[data-sound-scope="game"]')){unlock();play('adjust');}},true);
}
document.addEventListener('visibilitychange',()=>{generation++;stop();if(master)master.gain.setValueAtTime(enabled&&!document.hidden?.3:0,context.currentTime);});
window.addEventListener('pagehide',stop);
window.addEventListener('storage',event=>{if(event.key===KEY||event.key===null)applyPreference(event.newValue!=='muted',false);});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
