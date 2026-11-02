import {projects,worlds,type Area} from './data';
import type {Position,TrailSave} from './explore';
import {GROUND,HALF_WIDTH} from './physics';
export const TRAIL_KEY='cynyassy:brick-trail:progress:v1';
export function storageAccess(){try{return window.localStorage;}catch{return null;}}
const object=(x:unknown):x is Record<string,unknown>=>!!x&&typeof x==='object'&&!Array.isArray(x);
const finite=(v:unknown):v is number=>typeof v==='number'&&Number.isFinite(v);
export function createTrailStore(storage:Storage|null=storageAccess()){
 let available=!!storage,epoch='initial';
 function position(area:Area,input:unknown):Position{const raw=object(input)?input:{};const world=worlds[area],x=finite(raw.x)?Math.max(35,Math.min(world.width-35,raw.x)):world.spawn,feet=finite(raw.y)&&raw.y>=0&&raw.y<=GROUND?raw.y:GROUND;
 const y=world.platforms.filter(p=>x+HALF_WIDTH>p.x&&x-HALF_WIDTH<p.x+p.w&&p.y>=feet-.5).reduce((n,p)=>Math.min(n,p.y),GROUND);return {x:Math.round(x*10)/10,y,facing:raw.facing===-1?-1:1};}
 function fresh():TrailSave{return {version:1,resetId:epoch,area:'main',seen:[],positions:{main:position('main',null),bonus:position('bonus',null)}};}
 function decode(text:string|null):TrailSave|null{try{if(!text||text.length>8192)return null;const r:unknown=JSON.parse(text);if(!object(r)||r.version!==1||!Array.isArray(r.seen)||r.seen.length>100||!['main','bonus'].includes(String(r.area))||!object(r.positions))return null;
 return {version:1,resetId:typeof r.resetId==='string'&&r.resetId.length<100?r.resetId:'initial',area:r.area as Area,seen:[...new Set(r.seen.filter((id):id is string=>typeof id==='string'&&projects.some(p=>p.id===id)))],positions:{main:position('main',r.positions.main),bonus:position('bonus',r.positions.bonus)}};}catch{return null;}}
 let cached=fresh();
 function read(){if(available)try{const raw=storage!.getItem(TRAIL_KEY);const parsed=decode(raw);return {kind:raw===null?'new':parsed?'saved':'invalid',snapshot:parsed??fresh()};}catch{available=false;}return {kind:'session',snapshot:cached};}
 function load(){const r=read();epoch=r.snapshot.resetId;cached=r.snapshot;return r;}
 function save(input:TrailSave){const current=read();if(current.kind==='saved'&&current.snapshot.resetId!==epoch){epoch=current.snapshot.resetId;cached=current.snapshot;return {kind:'reset',snapshot:cached};}
 const valid=decode(JSON.stringify({...input,resetId:epoch}));if(!valid)return {kind:'invalid',snapshot:cached};
 cached={...valid,seen:[...new Set([...current.snapshot.seen,...valid.seen])],positions:{...current.snapshot.positions,[valid.area]:valid.positions[valid.area]}};
 if(available)try{storage!.setItem(TRAIL_KEY,JSON.stringify(cached));}catch{available=false;}return {kind:available?'saved':'session',snapshot:cached};}
 function clear(){epoch=Date.now().toString(36)+'-'+Math.random().toString(36).slice(2);cached=fresh();if(available)try{storage!.setItem(TRAIL_KEY,JSON.stringify(cached));}catch{available=false;}return {kind:available?'saved':'session',snapshot:cached};}
 return {key:TRAIL_KEY,load,save,clear};
}
