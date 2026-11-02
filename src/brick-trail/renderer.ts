import {projects,worlds,type Area} from './data';
import {drawLandmark} from './landmarks';
import {SKILL_BRICK} from './skills';
import {GROUND,HEIGHT as H,type Body} from './physics';
import type {Explorer} from './explore';
import {DUCK_HEIGHT,BONUS_POINTS,type Obstacle,type BonusBrick,type BonusBurst} from './runner';
const spriteUrls=import.meta.glob('./assets/sprites/*.png',{eager:true,query:'?url',import:'default'}) as Record<string,string>;
export async function loadSprites(){const entries=await Promise.all(Object.entries(spriteUrls).map(([path,url])=>new Promise<[string,HTMLImageElement]>((resolve,reject)=>{const image=new Image();image.onload=()=>resolve([path.split('/').pop()!.slice(0,-4),image]);image.onerror=()=>reject(new Error('Character image unavailable'));image.src=url;})));return Object.fromEntries(entries);}
export interface Placement{id:string;x:number;y:number;w:number;h:number;visible:boolean}
export interface SceneLayout {blocks:Placement[];skillBrick:{x:number;y:number;w:number;h:number;visible:boolean};portal:{x:number;y:number;visible:boolean}}
export function createRenderer(canvas:HTMLCanvasElement){
 const ctx=canvas.getContext('2d')!;let area:Area='main',W=worlds.main.width,platforms=worlds.main.platforms,camera=0,viewW=1000,viewH=400;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');let scale=1;
 function resize(){const r=canvas.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,2);viewW=r.width;viewH=r.height;canvas.width=Math.round(viewW*dpr);canvas.height=Math.round(viewH*dpr);}
function brickSurface(x:number,y:number,w:number,color:string){
 ctx.fillStyle='#090f1d';ctx.fillRect(x+4,y+5,w,23);
 ctx.fillStyle=color;ctx.fillRect(x,y,w,8);
 ctx.fillStyle='#353535';ctx.fillRect(x,y+8,w,16);
 ctx.strokeStyle='#76808b';ctx.lineWidth=1;ctx.strokeRect(x+.5,y+8.5,w-1,15);
 for(let bx=x+30;bx<x+w;bx+=30){ctx.beginPath();ctx.moveTo(bx,y+8);ctx.lineTo(bx,y+24);ctx.stroke();}
}
function landmarks(seen:Set<string>){
 for(const project of projects.filter(p=>p.area===area)){
  const shelf=platforms.filter(p=>project.x>=p.x&&project.x<=p.x+p.w&&p.y>project.y+60).sort((a,b)=>a.y-b.y)[0];
  drawLandmark(ctx,project.landmark,project.x,shelf?.y??GROUND,seen.has(project.id),shelf?2:3);
 }
}
function scenery(seen:Set<string>){
 if(area==='bonus'){bonusScenery(seen);return;}
 ctx.fillStyle='#dce1e8';for(let i=0;i<60;i++)ctx.fillRect((i*173+45)%W,25+(i*47)%210,i%5===0?3:2,2);
 // Distant silhouettes drift less than the foreground as the camera moves.
 ctx.save();ctx.translate(reduced.matches?0:camera*.28,0);ctx.fillStyle='#152039';ctx.beginPath();ctx.moveTo(-600,330);
 for(let x=-600;x<=W+600;x+=100)ctx.lineTo(x,247+((Math.abs(x)*7)%97));
 ctx.lineTo(W+600,H);ctx.lineTo(-600,H);ctx.fill();ctx.restore();
 ctx.fillStyle='#202c45';for(let i=0;i<18;i++)ctx.fillRect(i*104,316-(i%4)*14,65,80);
 ctx.fillStyle='#f2f0e8';ctx.fillRect(0,GROUND,W,12);ctx.fillStyle='#353535';ctx.fillRect(0,GROUND+12,W,70);
 ctx.strokeStyle='#62625e';ctx.lineWidth=1;
 for(let y=GROUND+12;y<H;y+=18){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();for(let x=(y%36?0:20);x<W;x+=40){ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x,y+18);ctx.stroke();}}
 landmarks(seen);platforms.forEach(p=>brickSurface(p.x,p.y,p.w,p.color));
 ctx.font='10px monospace';ctx.fillStyle='#aab4c7';
 ctx.fillText('START →',45,GROUND+42);
 if(viewW>=650){projects.filter(p=>p.area==='main').forEach((project,i)=>ctx.fillText(`${String(i+1).padStart(2,'0')} / ${['COFFEE & CODE','MAKE IT CLEAR','TELL A STORY','TRY SOMETHING'][i]}`,project.x-80,GROUND+42));}
 drawTunnel(worlds.main.portal);
}
function drawTunnel(x:number){
 ctx.fillStyle='#050912';ctx.fillRect(x-33,GROUND-72,66,72);ctx.fillRect(x-24,GROUND-88,48,18);
 for(let row=0;row<4;row++){ctx.fillStyle=row%2?'#9ca4b2':'#c2c6cc';ctx.fillRect(x-49,GROUND-68+row*17,16,16);ctx.fillRect(x+33,GROUND-68+row*17,16,16);}
 ctx.fillStyle='#c2c6cc';ctx.fillRect(x-33,GROUND-88,18,18);ctx.fillRect(x+15,GROUND-88,18,18);ctx.fillRect(x-16,GROUND-100,32,18);
 ctx.fillStyle='#ffba08';ctx.fillRect(x-48,GROUND-72,4,8);ctx.fillRect(x+44,GROUND-72,4,8);
}
function bonusScenery(seen:Set<string>){
 ctx.fillStyle='#141927';ctx.fillRect(0,0,W,H);
 ctx.fillStyle='#252b38';ctx.beginPath();ctx.moveTo(0,0);for(let x=0;x<=W;x+=80)ctx.lineTo(x,60+(x%240)/3);ctx.lineTo(W,0);ctx.fill();
 ctx.fillStyle='#202633';for(let x=0;x<W;x+=120)ctx.fillRect(x,GROUND-70-(x%3)*12,100,100);
 for(const x of [260,760,1260,1760,2160]){ctx.fillStyle='#596272';ctx.fillRect(x,0,2,110);ctx.fillStyle='#ffba08';ctx.fillRect(x-10,110,22,8);ctx.fillStyle='#ffba0810';ctx.fillRect(x-35,118,72,90);}
 ctx.fillStyle='#cccfd3';ctx.fillRect(0,GROUND,W,12);ctx.fillStyle='#353535';ctx.fillRect(0,GROUND+12,W,70);
 ctx.strokeStyle='#62625e';ctx.lineWidth=1;for(let y=GROUND+12;y<H;y+=18){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();for(let x=(y%36?0:20);x<W;x+=40){ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x,y+18);ctx.stroke();}}
 landmarks(seen);platforms.forEach(p=>brickSurface(p.x,p.y,p.w,p.color));drawTunnel(worlds.bonus.portal);
 if(viewW>=650){ctx.font='10px monospace';ctx.fillStyle='#adb7c9';ctx.fillText(`${projects.filter(p=>p.area==='bonus').length} MORE WAYS INTO MY WORK →`,210,GROUND+42);}

}

 function setup(){const dpr=Math.min(devicePixelRatio||1,2);ctx.setTransform(dpr,0,0,dpr,0,0);ctx.fillStyle='#0a1224';ctx.fillRect(0,0,viewW,viewH);ctx.imageSmoothingEnabled=false;}
 function character(p:Body,frames:Record<string,HTMLImageElement>,ducking=false){
  let name='idle';
  if(ducking&&p.grounded)name='crouch';else if(!p.grounded)name=p.vy<0?'takeoff':'airborne';else if(p.landing>0)name='landing';else if(p.walkTime>0)name='walk-'+(Math.floor(p.walkTime/.13)%4+1);
  const image=frames[name];if(!image)return;
  // Prepared frames use a shared cell. Keep feet planted; scale crouch uniformly to its collision height.
  const baseline=name==='crouch'||name==='landing'?54:55;const size=name==='crouch'?DUCK_HEIGHT/31:1.6;
  ctx.save();ctx.translate(Math.round(p.x),Math.round(p.y-baseline*size));ctx.scale(p.facing*size,size);ctx.drawImage(image,-24,0);ctx.restore();
 }
 function explore(model:Explorer,frames:Record<string,HTMLImageElement>,skillPopAge=1,skillName?:string){setup();area=model.area;W=worlds[area].width;platforms=worlds[area].platforms;scale=viewW<650?.85:Math.min(1,viewW/1000);const visible=viewW/scale;camera=Math.max(0,Math.min(Math.max(0,W-visible),model.player.x-visible*.38));const top=Math.max(viewH-H*scale,32-Math.min(...projects.filter(p=>p.area===area).map(p=>p.y))*scale);
 ctx.save();ctx.translate(-camera*scale,top);ctx.scale(scale,scale);scenery(model.seen);ctx.fillStyle='#a9b6ca';ctx.font='11px monospace';for(const p of projects.filter(p=>p.area===area))ctx.fillText(String(projects.indexOf(p)+1).padStart(2,'0'),p.x-6,p.y-14);character(model.player,frames);
 if(model.area==='main'&&skillName&&skillPopAge<1){
  const lift=reduced.matches?20:18+skillPopAge*50;
  ctx.save();ctx.font='700 16px monospace';ctx.textAlign='center';ctx.textBaseline='bottom';
  const lines:string[]=[];let line='';
  for(const word of skillName.split(' ')){const next=line?line+' '+word:word;if(line&&ctx.measureText(next).width>220){lines.push(line);line=word;}else line=next;}if(line)lines.push(line);
  const half=Math.max(...lines.map(text=>ctx.measureText(text).width))/2;
  const x=Math.max(camera+half+12,Math.min(camera+visible-half-12,SKILL_BRICK.x));
  ctx.globalAlpha=reduced.matches?1:Math.min(1,(1-skillPopAge)/.25);ctx.strokeStyle='#0a1224';ctx.lineWidth=4;ctx.lineJoin='round';ctx.fillStyle='#ffdf77';
  lines.forEach((text,i)=>{const y=Math.round(SKILL_BRICK.y-lift-(lines.length-1-i)*19);ctx.strokeText(text,Math.round(x),y);ctx.fillText(text,Math.round(x),y);});ctx.restore();
 }
 ctx.restore();
 return {skillBrick:{x:(SKILL_BRICK.x-camera)*scale,y:top+SKILL_BRICK.y*scale,w:SKILL_BRICK.w*scale,h:SKILL_BRICK.h*scale,visible:area==='main'&&SKILL_BRICK.x+28>=camera&&SKILL_BRICK.x-28<=camera+visible},blocks:projects.map(p=>({id:p.id,x:(p.x-camera)*scale,y:top+p.y*scale,w:146*scale,h:60*scale,visible:p.area===area&&p.x+73>=camera&&p.x-73<=camera+visible})),portal:{x:Math.max(78,Math.min(viewW-78,(worlds[area].portal-camera)*scale)),y:top+218*scale,visible:worlds[area].portal+80>=camera&&worlds[area].portal-80<=camera+visible}};
 }
 function runner(player:Body,distance:number,obstacles:Obstacle[],frames:Record<string,HTMLImageElement>,ducking:boolean,bricks:BonusBrick[],bursts:BonusBurst[]){setup();const s=Math.min(1,viewW/410),visible=viewW/s,top=viewH-H*s;ctx.save();ctx.translate(0,top);ctx.scale(s,s);
 const drift=reduced.matches?0:distance*.18;ctx.fillStyle='#c4cfde';for(let i=0;i<50;i++){const x=((i*173-drift)%visible+visible)%visible;ctx.fillRect(x,30+(i*43)%170,2,2);}ctx.fillStyle='#19263f';for(let i=-1;i<Math.ceil(visible/100)+1;i++){const x=i*100-(reduced.matches?0:distance*.1%100);ctx.fillRect(x,250+(i%3)*15,72,116);}
 ctx.fillStyle='#f2f0e8';ctx.fillRect(0,GROUND,visible,12);ctx.fillStyle='#353535';ctx.fillRect(0,GROUND+12,visible,H-GROUND-12);ctx.strokeStyle='#62625e';for(let i=-1;i<visible/40+1;i++){const x=i*40-distance%40;ctx.strokeRect(x,GROUND+12,40,24);}
 ctx.strokeStyle='#111';ctx.lineWidth=2;for(const o of obstacles){const x=o.x-distance,y=o.y;
 if(o.kind==='drone'){
  ctx.fillStyle='#3f88c5';ctx.fillRect(x+8,y+10,o.w-16,o.h-14);ctx.strokeRect(x+8,y+10,o.w-16,o.h-14);ctx.fillStyle='#f2f0e8';ctx.fillRect(x+22,y+18,25,9);ctx.fillStyle='#353535';ctx.fillRect(x,y+4,22,5);ctx.fillRect(x+o.w-22,y+4,22,5);ctx.fillStyle='#ffba08';ctx.fillRect(x+12,y+o.h-3,7,4);ctx.fillRect(x+o.w-19,y+o.h-3,7,4);ctx.fillStyle='#e4eaf1';ctx.font='bold 11px monospace';ctx.textAlign='center';ctx.fillText('DUCK ↓',x+o.w/2,y-9);ctx.textAlign='start';
 }
 else if(o.kind==='rock'){ctx.fillStyle='#b9c2ce';ctx.beginPath();ctx.moveTo(x,GROUND);ctx.lineTo(x+2,y+16);ctx.lineTo(x+9,y);ctx.lineTo(x+o.w-5,y+4);ctx.lineTo(x+o.w,y+20);ctx.lineTo(x+o.w,GROUND);ctx.closePath();ctx.fill();ctx.stroke();ctx.fillStyle='#7b899e';ctx.fillRect(x+8,y+15,6,18);}
 else if(o.kind==='barrier'){ctx.fillStyle='#3f88c5';ctx.fillRect(x,y,o.w,o.h);ctx.strokeRect(x,y,o.w,o.h);ctx.fillStyle='#f5f3ee';for(let stripe=5;stripe<o.w-5;stripe+=16)ctx.fillRect(x+stripe,y+5,7,5);}
 else{ctx.fillStyle='#ffba08';ctx.fillRect(x,y,o.w,o.h);ctx.strokeRect(x,y,o.w,o.h);ctx.strokeStyle='#353535';ctx.strokeRect(x+5,y+5,o.w-10,o.h-10);ctx.beginPath();ctx.moveTo(x+5,y+5);ctx.lineTo(x+o.w-5,GROUND-5);ctx.moveTo(x+o.w-5,y+5);ctx.lineTo(x+5,GROUND-5);ctx.stroke();ctx.strokeStyle='#111';}}

 for(const brick of bricks){const x=brick.x-distance;ctx.fillStyle='#ffba08';ctx.fillRect(x,brick.y,brick.w,brick.h);ctx.strokeStyle='#353535';ctx.strokeRect(x,brick.y,brick.w,brick.h);ctx.fillStyle='#353535';ctx.font='bold 15px monospace';ctx.textAlign='center';ctx.fillText('+',x+brick.w/2,brick.y+22);ctx.fillStyle='#ffdf77';ctx.font='10px monospace';ctx.fillText('BONUS',x+brick.w/2,brick.y-10);ctx.textAlign='start';}
 for(const burst of bursts){const x=burst.x-distance,t=burst.age/.8;ctx.save();ctx.globalAlpha=reduced.matches?1:Math.min(1,(1-t)*3);ctx.fillStyle='#ffdf77';ctx.font='bold 20px monospace';ctx.textAlign='center';ctx.fillText('+'+BONUS_POINTS,Math.max(125,x),burst.y-(reduced.matches?22:18+t*48));if(!reduced.matches)for(let i=0;i<8;i++){const angle=i*Math.PI/4;ctx.fillRect(x+Math.cos(angle)*(10+t*35),burst.y+Math.sin(angle)*(8+t*26)+t*t*25,4,4);}ctx.restore();}
 character({...player,x:54},frames,ducking);ctx.restore();return visible;
 }
 return {resize,explore,runner,get width(){return viewW;},get height(){return viewH;}};
}
