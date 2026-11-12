import {projects,worlds,type Area} from './data';
import {createExplorer} from './explore';
import {createTrailStore} from './storage';
import {createRunner,createRunStore,type RunPhase,type RunnerCue} from './runner';
import {jump} from './physics';
import {createRenderer,loadSprites,type SceneLayout} from './renderer';
import {playSound} from '../audio/sound';
import {createSkillCollection,SKILL_BRICK,type Skill} from './skills';
export type Mode='explore'|'runner';
export interface SceneView{mode:Mode;area:Area;seen:string[];skillFound:{skill:Skill;found:number;total:number;revisited:boolean}|null;ready:boolean;error:boolean;message:string;saveNotice:string;phase:RunPhase;reason:string;score:number;bonus:number;ducking:boolean;speed:number;cue:RunnerCue|null;best:number;seconds:number;history:ReturnType<ReturnType<typeof createRunStore>['read']>}
export function mountTrail(canvas:HTMLCanvasElement,region:HTMLElement,onChange:(view:SceneView)=>void,onPreview:(id:string,origin:HTMLElement)=>void,onLayout:(layout:SceneLayout)=>void){
 const explore=createExplorer(),store=createTrailStore(),runStore=createRunStore(),renderer=createRenderer(canvas),keys=new Set<string>(),abort=new AbortController();
 let loaded=store.load(),epoch=loaded.snapshot.resetId,mode:Mode='explore',alive=true,ready=false,error=false,blocked=false,offscreen=false,last=0,raf=0,saveElapsed=0,frames:Record<string,HTMLImageElement>={},pending:{id:string;origin:HTMLElement;remaining:number}|null=null;
 let dirty=true,inFrame=false,settle=true,saveDirty=false,lastHUD=0,previousView:SceneView|undefined;
 let lastSaved=loaded.kind==='saved'?loaded.snapshot:null;
 let seenValues:string[]=[];
 let message=loaded.kind==='saved'?'Welcome back. Pick up where you left off.':'Break a block to look inside. Or choose a project below.',saveNotice=loaded.kind==='session'?'Saving is unavailable. Progress lasts for this visit.':'Progress saves on this browser.',history=runStore.read();
 const skillCollection=createSkillCollection();let skillFound:ReturnType<typeof skillCollection.hit>=null,skillPopAge=1,skillCooldown=0;
 explore.apply(loaded.snapshot);
 const runner=createRunner(record=>{history=runStore.record(record);playSound(record.outcome==='collision'?'failure':'complete');message=record.outcome==='collision'?'That one caught you. Try another run?':'Run saved. Ready for another?';},()=>playSound('land'),Math.random,()=>playSound('discover'));
 let sceneTap:{id:number;x:number;y:number;at:number}|null=null;
 function clearInput(){sceneTap=null;keys.clear();explore.player.jumpBuffer=0;runner.player.jumpBuffer=0;runner.duck(false);}
 function save(){
  const next=explore.snapshot(epoch),prior=lastSaved;
  const same=prior&&next.resetId===prior.resetId&&next.area===prior.area&&next.seen.length===prior.seen.length&&next.seen.every(id=>prior.seen.includes(id))&&(['main','bonus'] as Area[]).every(area=>{const a=next.positions[area],b=prior.positions[area];return a.x===b.x&&a.y===b.y&&a.facing===b.facing;});
  if(same){saveDirty=false;return;}
  const r=store.save(next);lastSaved=r.snapshot;saveDirty=false;
  if(r.kind==='reset'){epoch=r.snapshot.resetId;explore.apply(r.snapshot);pending=null;clearInput();settle=true;dirty=true;message='Progress changed in another tab. The trail is up to date.';}
  else r.snapshot.seen.forEach(id=>explore.seen.add(id));
  if(r.kind==='session')saveNotice='Saving is unavailable. Progress lasts for this visit.';
 }

 function pause(why='Paused. Ready when you are.'){const was=runner.phase;runner.pause(why);clearInput();if(was==='running')playSound('pause');refresh();}
 function open(id:string,origin:HTMLElement){const p=projects.find(p=>p.id===id);if(!p||blocked)return;pause('Paused while you look at a project.');pending=null;save();const fresh=!explore.seen.has(id);explore.seen.add(id);save();clearInput();playSound(fresh?(explore.seen.size===projects.length?'complete':'discover'):'revisit');message=explore.seen.size===projects.length?'All projects explored. There’s a little more of my story below.':`${p.name} opened. ${projects.length-explore.seen.size} more to explore.`;blocked=true;onPreview(id,origin);refresh();}
 function discover(id:string,origin:HTMLElement){if(mode==='runner'){open(id,origin);return;}if(blocked||pending)return;if(explore.seen.has(id)||matchMedia('(prefers-reduced-motion: reduce)').matches||projects.find(p=>p.id===id)?.area!==explore.area){open(id,origin);return;}pending={id,origin,remaining:.25};clearInput();playSound('tap');refresh();}
 function hitSkill(){if(mode!=='explore'||explore.area!=='main'||blocked||pending||skillCooldown>0)return;skillCooldown=.2;skillPopAge=0;skillFound=skillCollection.hit();playSound('progress');refresh(true);}
 function setMode(next:Mode){if(next===mode||blocked)return;save();pause('Paused while you explore.');pending=null;mode=next;last=0;message=next==='runner'?'Jump over ground obstacles. Hold Duck for drones. Break bonus bricks for 50 points.':'Your place on the trail is saved. Keep exploring.';refresh(true);}
 function switchArea(next:Area){if(mode!=='explore'||blocked||pending)return;save();explore.switchArea(next);settle=true;clearInput();save();message=next==='bonus'?`${projects.filter(p=>p.area==='bonus').length} more things I’ve made. Take a look around.`:'Back on the main trail.';playSound('start');canvas.focus({preventScroll:true});refresh(true);}
 function triggerJump(){if(!ready||blocked||pending||offscreen||document.hidden)return;if(mode==='runner'){if(runner.jump())playSound('jump');}else if(jump(explore.player))playSound('jump');refresh();}
 function start(){if(!ready||blocked||offscreen||document.hidden)return;if(runner.phase==='paused'){runner.resume();message='Back in the run. Jump, duck, or chase a bonus.';playSound('resume');}else{runner.start();message='Ground obstacles first. Drones and bonus bricks join as you go.';playSound('start');}clearInput();last=0;if(renderer.width<650)region.scrollIntoView({block:'center',inline:'nearest',behavior:'instant'});canvas.focus({preventScroll:true});refresh(true);}
 function end(){runner.finish('ended');clearInput();refresh(true);}
 function snapshot():SceneView{
  if(seenValues.length!==explore.seen.size||seenValues.some(id=>!explore.seen.has(id)))seenValues=[...explore.seen];
  return {mode,skillFound,area:explore.area,seen:seenValues,ready,error,message,saveNotice,phase:runner.phase,reason:runner.reason,score:runner.score,bonus:runner.bonus,ducking:runner.ducking,speed:runner.speed,cue:runner.cue,best:history.best,seconds:Math.floor(runner.elapsed),history};
 }
 function notify(force=false){
  if(!alive)return;
  const v=snapshot();
  if(force||!previousView||(Object.keys(v) as (keyof SceneView)[]).some(key=>v[key]!==previousView![key])){previousView=v;onChange(v);}
 }
 function wake(){
  if(!alive||raf||inFrame||offscreen||document.hidden)return;
  last=0;raf=requestAnimationFrame(loop);
 }
 function refresh(force=false){dirty=true;notify(force);wake();}
 function direction(){return Number(keys.has('arrowright')||keys.has('d'))-Number(keys.has('arrowleft')||keys.has('a'));}
 function active(){return ready&&!blocked&&!offscreen&&!document.hidden;}
 function needsFrame(){
  if(!active())return false;
  if(mode==='runner')return runner.phase==='running';
  const p=explore.player;
  return settle||!!direction()||!p.grounded||p.landing>0||p.jumpBuffer>0||p.walkTime>0||!!pending||skillPopAge<1||skillCooldown>0;
 }
 function draw(){
  if(mode==='explore')onLayout(renderer.explore(explore,frames,skillPopAge,skillFound?.skill.name));
  else{runner.setViewWidth(renderer.runner(runner.player,runner.distance,runner.obstacles,frames,runner.ducking,runner.bricks,runner.bursts));onLayout({blocks:[],skillBrick:{x:0,y:0,w:0,h:0,visible:false},portal:{x:0,y:0,visible:false}});}
  dirty=false;
 }
 function loop(now:number){
  raf=0;if(!alive)return;inFrame=true;
  const dt=last?Math.max(0,(now-last)/1000):0;last=now;
  if(active()&&dt>0){
   if(mode==='runner')runner.step(dt);
   else if(dt<=.25){
    const p=explore.player,before={x:p.x,y:p.y,facing:p.facing};
    skillPopAge=Math.min(1,skillPopAge+dt);skillCooldown=Math.max(0,skillCooldown-dt);
    let left=dt;while(left>1e-8&&!blocked){
     const slice=Math.min(left,1/120);left-=slice;
     if(pending){pending.remaining-=slice;if(pending.remaining<=0){const current=pending;open(current.id,current.origin);}continue;}
     const id=explore.step(slice,direction(),()=>playSound('land'));
     if(id===SKILL_BRICK.id)hitSkill();else if(id)discover(id,canvas);
    }
    settle=false;saveDirty ||= before.x!==p.x||before.y!==p.y||before.facing!==p.facing;
    saveElapsed+=dt;if(saveElapsed>=1){saveElapsed=0;if(saveDirty)save();}
   }else clearInput();
  }
  if(!offscreen&&!document.hidden&&(dirty||active()))draw();
  if(mode!=='runner'||runner.phase!=='running'||runner.phase!==previousView?.phase||runner.bonus!==previousView?.bonus||now-lastHUD>=100){notify();lastHUD=now;}
  inFrame=false;
  if(needsFrame())raf=requestAnimationFrame(loop);else{last=0;if(saveDirty){save();notify();}}
 }
 const listen=(target:EventTarget,name:string,fn:EventListener)=>target.addEventListener(name,fn,{signal:abort.signal});
 listen(canvas,'keydown',((event:KeyboardEvent)=>{if(blocked)return;const key=event.key.toLowerCase();if(mode==='explore'&&['arrowdown','enter'].includes(key)&&Math.abs(explore.player.x-worlds[explore.area].portal)<125){event.preventDefault();if(!event.repeat)switchArea(explore.area==='main'?'bonus':'main');return;}
  if(mode==='runner'&&['arrowdown','s'].includes(key)){event.preventDefault();keys.add(key);runner.duck(true);refresh(true);}
  if(['arrowleft','arrowright','a','d'].includes(key)&&mode==='explore'){event.preventDefault();keys.add(key);wake();}if(key===' '||key==='arrowup'){event.preventDefault();if(!event.repeat)triggerJump();}if(key==='escape'&&mode==='runner'){event.preventDefault();pause();}}) as EventListener);
 listen(window,'keyup',((event:KeyboardEvent)=>{const key=event.key.toLowerCase();keys.delete(key);wake();if(['arrowdown','s'].includes(key)){runner.duck(keys.has('arrowdown')||keys.has('s'));refresh(true);}}) as EventListener);
 // Only commit a short, stationary tap on the canvas. Native pan-y scrolling
 // cancels the pointer; project buttons are siblings and never enter this path.
 listen(canvas,'pointerdown',((event:PointerEvent)=>{if(event.button>0)return;canvas.focus({preventScroll:true});sceneTap={id:event.pointerId,x:event.clientX,y:event.clientY,at:event.timeStamp};}) as EventListener);
 listen(window,'pointermove',((event:PointerEvent)=>{if(sceneTap?.id===event.pointerId&&Math.hypot(event.clientX-sceneTap.x,event.clientY-sceneTap.y)>10)sceneTap=null;}) as EventListener);
 listen(window,'pointerup',((event:PointerEvent)=>{const tap=sceneTap;if(tap?.id!==event.pointerId)return;sceneTap=null;if(event.target===canvas&&event.timeStamp-tap.at<350&&Math.hypot(event.clientX-tap.x,event.clientY-tap.y)<=10)triggerJump();}) as EventListener);
 listen(window,'pointercancel',()=>{sceneTap=null;});
 listen(window,'scroll',()=>{sceneTap=null;});
 listen(canvas,'blur',()=>{clearInput();refresh();});listen(window,'blur',()=>{clearInput();save();pause('Paused while this window is away.');});
 listen(document,'visibilitychange',()=>{last=0;clearInput();if(document.hidden){cancelAnimationFrame(raf);raf=0;save();pause('Paused while this tab is hidden.');}else refresh(true);});
 listen(window,'pagehide',()=>{save();runner.finish('ended');});
 listen(window,'storage',((event:StorageEvent)=>{if(event.key===runStore.key||event.key===null)history=runStore.read();if(event.key===store.key||event.key===null){const r=store.load();if(r.snapshot.resetId!==epoch){epoch=r.snapshot.resetId;explore.apply(r.snapshot);pending=null;clearInput();settle=true;}else r.snapshot.seen.forEach(id=>explore.seen.add(id));}refresh(true);}) as EventListener);
 listen(matchMedia('(prefers-reduced-motion: reduce)'),'change',()=>refresh(true));
 const resize=new ResizeObserver(()=>{renderer.resize();refresh(true);});resize.observe(canvas);
 const intersection=new IntersectionObserver(entries=>{offscreen=!entries[0].isIntersecting;if(offscreen){cancelAnimationFrame(raf);raf=0;clearInput();save();pause('Paused while the game is out of view.');}else refresh(true);last=0;},{threshold:0});intersection.observe(canvas);
 renderer.resize();refresh(true);loadSprites().then(images=>{if(!alive)return;frames=images;ready=true;refresh(true);}).catch(()=>{if(!alive)return;error=true;message='The character could not load. All projects are still available below.';refresh(true);});wake();
 return {setMode,switchArea,hitSkill,jump:triggerJump,start,end,pause,discover,open,
 duck(held:boolean){if(mode==='runner'&&!blocked&&!offscreen&&!document.hidden){runner.duck(held);refresh(true);}},
 move(direction:'left'|'right',pressed:boolean){if(mode==='explore'&&!blocked&&!pending){const key=direction==='left'?'arrowleft':'arrowright';if(pressed)keys.add(key);else keys.delete(key);wake();}},
 closePreview(){blocked=false;last=0;clearInput();refresh(true);},
 setBlocked(value:boolean){blocked=value;clearInput();if(value)pause('Paused while you check a setting.');else refresh(true);},
 resetPosition(){if(mode==='explore'){explore.resetPosition();clearInput();save();message='Back at the entrance. Your discoveries are still here.';refresh(true);}},
 resetProgress(){const r=store.clear();epoch=r.snapshot.resetId;explore.apply(r.snapshot);skillCollection.reset();skillFound=null;pending=null;clearInput();message='A fresh trail. All projects are ready to explore again.';if(r.kind==='session')saveNotice='Saving is unavailable. Progress lasts for this visit.';refresh(true);},
 dispose(){save();alive=false;runner.finish('ended');abort.abort();resize.disconnect();intersection.disconnect();cancelAnimationFrame(raf);clearInput();}
 };
}
export type TrailController=ReturnType<typeof mountTrail>;
