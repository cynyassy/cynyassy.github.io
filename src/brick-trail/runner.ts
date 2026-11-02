import {body,jump,vertical,GROUND,HALF_WIDTH,PLAYER_HEIGHT,JUMP_DURATION} from './physics';
import {storageAccess} from './storage';
export const DUCK_HEIGHT=38,BONUS_POINTS=50;
export const START_SPEED=210,ACCELERATION=2,REACTION_TIME=1.25;
export type RunnerCue='jump'|'duck'|'bonus';
const travel=(speed:number,seconds:number)=>speed*seconds+ACCELERATION*seconds*seconds/2;
const arrivalTime=(speed:number,distance:number)=>2*Math.max(0,distance)/(Math.sqrt(speed*speed+2*ACCELERATION*Math.max(0,distance))+speed);
export interface RunRecord{id:string;score:number;bonus?:number;seconds:number;distance:number;outcome:'collision'|'ended';at:number}
export interface Obstacle{x:number;y:number;w:number;h:number;kind:'barrier'|'crate'|'rock'|'drone'}
export interface BonusBrick{x:number;y:number;w:number;h:number}
export interface BonusBurst{x:number;y:number;age:number}
export type RunPhase='ready'|'running'|'paused'|'finished';
/** Feet are the body anchor. Swept intervals protect against tunnelling at higher speed. */
export function sweptHit(ax:number,ay:number,bx:number,by:number,o:Obstacle,height=PLAYER_HEIGHT){
 let enter=0,exit=1;
 for(const [from,to,min,max] of [[ax,bx,o.x-HALF_WIDTH,o.x+o.w+HALF_WIDTH],[ay,by,o.y,o.y+o.h+height]]){
  const d=to-from;if(Math.abs(d)<1e-10){if(from<=min||from>=max)return false;continue;}
  const a=(min-from)/d,b=(max-from)/d;enter=Math.max(enter,Math.min(a,b));exit=Math.min(exit,Math.max(a,b));if(enter>=exit)return false;
 }return exit>0&&enter<1;
}
export function createRunner(onFinish:(record:RunRecord)=>void,onLand:()=>void,random=Math.random,onBonus:()=>void=()=>{}){
 const player=body(54);let phase:RunPhase='ready',reason='',elapsed=0,distance=0,speed=START_SPEED,obstacles:Obstacle[]=[],bricks:BonusBrick[]=[],bursts:BonusBurst[]=[],bonus=0,duckHeld=false,spawnAt=0,viewWidth=1000,id='',lastKind=-1,encounter=0;
 const score=()=>Math.floor(distance/10)+bonus;
 function finish(outcome:RunRecord['outcome']){if(phase!=='running'&&phase!=='paused')return;phase='finished';reason=outcome;duckHeld=false;const savedDistance=Math.floor(distance*10)/10;onFinish({id,score:Math.floor(savedDistance/10)+bonus,bonus,seconds:Math.round(elapsed*10)/10,distance:savedDistance,outcome,at:Date.now()});}
 function start(){Object.assign(player,body(54));phase='running';reason='';elapsed=0;distance=0;speed=START_SPEED;obstacles=[];bricks=[];bursts=[];bonus=0;duckHeld=false;spawnAt=0;lastKind=-1;encounter=0;id=Date.now().toString(36)+'-'+Math.random().toString(36).slice(2);}
 function pause(why='Paused. Ready when you are.'){if(phase==='running'){phase='paused';reason=why;player.jumpBuffer=0;duckHeld=false;}}
 function resume(){if(phase==='paused'){phase='running';reason='';}}
 function spawn(){
  // At high speeds a hazard can cross a phone in less than a second. Spawn it
  // early enough for the next-action cue, even before it enters the window.
  const lead=Math.max(Math.max(410,viewWidth)+40,54+HALF_WIDTH+travel(speed,REACTION_TIME));
  const x=distance+lead;
  // Each slot is one clearable obstacle OR an optional brick, never a forced combo.
  let width=40;
  if(elapsed>=6&&encounter%4===3)bricks.push({x,y:GROUND-164,w:40,h:32});
  else if(elapsed>=8&&encounter%3===2){obstacles.push({x,y:GROUND-94,w:70,h:46,kind:'drone'});width=70;}
  else{
   const choices=[{kind:'barrier' as const,w:56,h:24},{kind:'crate' as const,w:36,h:38},{kind:'rock' as const,w:28,h:54}];
   let kind=Math.max(0,Math.min(2,Math.floor(random()*choices.length)));if(kind===lastKind)kind=(kind+1)%3;lastKind=kind;const choice=choices[kind];obstacles.push({x,y:GROUND-choice.h,...choice});width=choice.w;
  }
  encounter++;
  const gapTime=JUMP_DURATION+.35,arrivalSpeed=Math.sqrt(speed*speed+2*ACCELERATION*(lead+width+2*HALF_WIDTH));
  spawnAt=distance+width+2*HALF_WIDTH+travel(arrivalSpeed,gapTime)+random()*24;
 }
 function cue():RunnerCue|null{
  if(phase!=='running')return null;
  const next=[...obstacles.map(o=>({x:o.x,w:o.w,kind:o.kind==='drone'?'duck' as const:'jump' as const})),...bricks.map(b=>({x:b.x,w:b.w,kind:'bonus' as const}))]
   .filter(o=>o.x+o.w>player.x-HALF_WIDTH).sort((a,b)=>a.x-b.x)[0];
  return next&&arrivalTime(speed,next.x-player.x-HALF_WIDTH)<=REACTION_TIME?next.kind:null;
 }
 function step(dt:number){if(phase!=='running'||!Number.isFinite(dt)||dt<=0)return;if(dt>.25){pause('The game paused while the screen caught up.');return;}
  let left=dt;while(left>1e-8&&phase==='running'){
   const slice=Math.min(1/120,left);left-=slice;const x=player.x,y=player.y;distance+=travel(speed,slice);elapsed+=slice;speed=START_SPEED+ACCELERATION*elapsed;player.x=54+distance;player.walkTime+=slice;vertical(player,slice,[],onLand);
   bursts=bursts.map(b=>({...b,age:b.age+slice})).filter(b=>b.age<.8);
   if(elapsed>=3&&distance>=spawnAt)spawn();
   const height=duckHeld&&player.grounded?DUCK_HEIGHT:PLAYER_HEIGHT;
   if(obstacles.some(o=>sweptHit(x,y,player.x,player.y,o,height)))finish('collision');
   if(phase==='running'&&player.vy<0){
    const hit=bricks.find(b=>Math.max(x,player.x)+HALF_WIDTH>b.x&&Math.min(x,player.x)-HALF_WIDTH<b.x+b.w&&y-PLAYER_HEIGHT>=b.y+b.h&&player.y-PLAYER_HEIGHT<=b.y+b.h);
    if(hit){bricks=bricks.filter(b=>b!==hit);bonus+=BONUS_POINTS;bursts.push({x:hit.x+hit.w/2,y:hit.y,age:0});player.y=hit.y+hit.h+PLAYER_HEIGHT;player.vy=60;onBonus();}
   }
   obstacles=obstacles.filter(o=>o.x+o.w>distance-60);bricks=bricks.filter(b=>b.x+b.w>distance-60);
  }
 }
 return {player,get phase(){return phase;},get reason(){return reason;},get elapsed(){return elapsed;},get distance(){return distance;},get score(){return score();},get bonus(){return bonus;},get speed(){return speed;},get cue(){return cue();},get obstacles(){return obstacles;},get bricks(){return bricks;},get bursts(){return bursts;},get ducking(){return duckHeld&&player.grounded&&phase==='running';},setViewWidth(w:number){viewWidth=Math.max(410,w);},start,pause,resume,finish,step,duck(held:boolean){duckHeld=phase==='running'&&held;},jump(){return phase==='running'&&!duckHeld&&jump(player);}};
}
export const RUN_KEY='cynyassy:brick-trail:runner:v1';
export function createRunStore(storage:Storage|null=storageAccess()){
 let available=!!storage,cached:{version:1;best:number;runs:RunRecord[]}={version:1,best:0,runs:[]};
 function clean(input:unknown){const value=input as Partial<typeof cached>|null;if(!value||value.version!==1)return {version:1 as const,best:0,runs:[]};const runs=Array.isArray(value?.runs)?value.runs.filter(r=>r&&typeof r.id==='string'&&r.id.length<100&&Number.isFinite(r.distance)&&r.distance>=0&&r.distance<1e10&&Number.isSafeInteger(r.bonus??0)&&(r.bonus??0)>=0&&(r.bonus??0)<1e8&&r.score===Math.floor(r.distance/10)+(r.bonus??0)&&Number.isFinite(r.seconds)&&r.seconds>=0&&r.seconds<1e8&&['collision','ended'].includes(r.outcome)&&Number.isFinite(r.at)&&r.at>0&&r.at<=8640000000000000).sort((a,b)=>b.at-a.at).filter((r,i,all)=>all.findIndex(x=>x.id===r.id)===i).slice(0,5).map(r=>({id:r.id,score:r.score,bonus:r.bonus??0,seconds:r.seconds,distance:r.distance,outcome:r.outcome,at:r.at})):[];
 return {version:1 as const,best:Math.max(Number.isSafeInteger(value?.best)&&value!.best!>=0&&value!.best!<1e9?value!.best!:0,...runs.map(r=>r.score)),runs};}
 function read(){if(available)try{const raw=storage!.getItem(RUN_KEY);cached=raw&&raw.length<=16384?clean(JSON.parse(raw)):{version:1,best:0,runs:[]};}catch(e){if(e instanceof SyntaxError)cached={version:1,best:0,runs:[]};else available=false;}return {available,...cached};}
 function record(run:RunRecord){read();cached=clean({...cached,best:Math.max(cached.best,run.score),runs:[run,...cached.runs]});if(available)try{storage!.setItem(RUN_KEY,JSON.stringify(cached));}catch{available=false;}return {available,...cached};}
 return {key:RUN_KEY,read,record};
}
