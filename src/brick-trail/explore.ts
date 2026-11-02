import {projects,worlds,type Area} from './data';
import {SKILL_BRICK} from './skills';
import {body,vertical,PLAYER_HEIGHT,HALF_WIDTH,type Body} from './physics';
export interface Position{x:number;y:number;facing:number}
export interface TrailSave{version:1;resetId:string;area:Area;seen:string[];positions:Record<Area,Position>}
export function createExplorer(){
 const player=body(worlds.main.spawn);let area:Area='main';const seen=new Set<string>();
 const positions:Record<Area,Position>={main:{x:110,y:366,facing:1},bonus:{x:185,y:366,facing:1}};
 return {player,seen,positions,get area(){return area;},
 apply(save:TrailSave){area=save.area;seen.clear();save.seen.forEach(id=>seen.add(id));Object.assign(positions,save.positions);Object.assign(player,body(save.positions[area].x,save.positions[area].y,save.positions[area].facing));},
 switchArea(next:Area){if(next===area)return;positions[area]={x:player.x,y:player.y,facing:player.facing};area=next;Object.assign(player,body(positions[area].x,positions[area].y,positions[area].facing));},
 resetPosition(){Object.assign(player,body(worlds[area].spawn));},
 snapshot(resetId:string):TrailSave{return {version:1,resetId,area,seen:[...seen],positions:{...positions,[area]:{x:player.x,y:player.y,facing:player.facing}}};},
 step(dt:number,direction:number,onLand:()=>void):string|null{
 const world=worlds[area];player.x=Math.max(35,Math.min(world.width-35,player.x+direction*210*dt));if(direction){player.facing=direction;player.walkTime+=dt;}else player.walkTime=0;
 const head=player.y-PLAYER_HEIGHT;vertical(player,dt,world.platforms,onLand);
 if(player.vy<0){const b=SKILL_BRICK;if(area==='main'&&player.x+HALF_WIDTH>b.x-b.w/2&&player.x-HALF_WIDTH<b.x+b.w/2&&head>=b.y+b.h&&player.y-PLAYER_HEIGHT<=b.y+b.h){player.y=b.y+b.h+PLAYER_HEIGHT;player.vy=60;return b.id;}for(const p of projects){const bottom=p.y+60;if(p.area===area&&!seen.has(p.id)&&player.x+HALF_WIDTH>p.x-73&&player.x-HALF_WIDTH<p.x+73&&head>=bottom&&player.y-PLAYER_HEIGHT<=bottom){player.y=bottom+PLAYER_HEIGHT;player.vy=60;return p.id;}}}return null;
 }};
}
export type Explorer=ReturnType<typeof createExplorer>;
