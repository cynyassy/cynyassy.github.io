import type {Platform} from './data';
export const GROUND=366, HEIGHT=430, PLAYER_HEIGHT=76, HALF_WIDTH=18, JUMP_SPEED=480, GRAVITY=1050;
export const JUMP_DURATION=2*JUMP_SPEED/GRAVITY;
export interface Body {x:number;y:number;vy:number;facing:number;grounded:boolean;walkTime:number;landing:number;coyote:number;jumpBuffer:number}
export function body(x:number,y=GROUND,facing=1):Body{return {x,y,vy:0,facing,grounded:true,walkTime:0,landing:0,coyote:0,jumpBuffer:0};}
export function launch(p:Body){p.vy=-JUMP_SPEED;p.grounded=false;p.coyote=0;p.jumpBuffer=0;p.landing=0;}
export function jump(p:Body){if(p.grounded||p.coyote>0){launch(p);return true;}p.jumpBuffer=.12;return false;}
export function vertical(p:Body,dt:number,platforms:Platform[],onLand:()=>void){
 const overlap=(q:Platform)=>p.x+HALF_WIDTH>q.x&&p.x-HALF_WIDTH<q.x+q.w;
 if(p.grounded){if(p.y===GROUND||platforms.some(q=>overlap(q)&&Math.abs(p.y-q.y)<.5))p.coyote=.1;else{p.grounded=false;p.vy=0;}}
 p.coyote=Math.max(0,p.coyote-dt);p.jumpBuffer=Math.max(0,p.jumpBuffer-dt);p.landing=Math.max(0,p.landing-dt);
 if(p.grounded)return;
 const previous=p.y;p.vy+=GRAVITY*dt;p.y+=p.vy*dt;
 if(p.vy>=0){const floor=platforms.filter(q=>overlap(q)&&previous<=q.y+.1&&p.y>=q.y).reduce((v,q)=>Math.min(v,q.y),GROUND);if(p.y>=floor){p.y=floor;p.vy=0;p.grounded=true;p.landing=.1;p.coyote=.1;onLand();if(p.jumpBuffer>0)launch(p);}}
}
