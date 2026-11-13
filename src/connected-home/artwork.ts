import {projectCatalogue} from '../shared/project-catalogue';
import comic from '../cynyassy/assets/decide-04.webp';
import coffee from './assets/coffee-focus.webp';
import board from '../assets/perspectives/thesis/final-board.webp';
import docs from './assets/algotest-focus.webp';

const artwork=[
 {id:'chaddiman',src:comic,alt:'ChaddiMan in I get to decide',angle:-8,x:15,y:25},
 {id:'brew',src:coffee,alt:'Indian Coffee Stories brewing guide alongside the Brew Tracker shelf',angle:7,x:85,y:25},
 {id:'perspectives',src:board,alt:'The illustrated Perspectives board game',angle:6,x:15,y:76},
 {id:'algotest',src:docs,alt:'A closer view of AlgoTest’s strategy documentation and guide cards',angle:-6,x:85,y:76},
] as const;
export type HeroProjectId=typeof artwork[number]['id'];
export const pieces=artwork.map(art=>{
 const project=projectCatalogue[art.id];
 return {...art,title:project.name,url:project.url,...project.hero!};
});
export type HeroPiece=typeof pieces[number];
export const connections:readonly [HeroProjectId,HeroProjectId,string][]=[
 ['chaddiman','brew','Writing'],['chaddiman','perspectives','Illustration'],
 ['chaddiman','algotest','Writing'],['brew','perspectives','Research and design'],
 ['brew','algotest','Writing and research'],['perspectives','algotest','Research'],
];
export function relatedProjects(id:HeroProjectId){
 return connections.filter(([a,b])=>a===id||b===id).map(([a,b,skill])=>({piece:pieces.find(p=>p.id===(a===id?b:a))!,skill}));
}
export function curve(from:HeroProjectId,to:HeroProjectId,split:boolean){
 const a=pieces.find(p=>p.id===from)!,b=pieces.find(p=>p.id===to)!;
 const ax=(split?(a.x<50?25:75):a.x)*10,ay=a.y*6.4;
 const bx=(split?(b.x<50?25:75):b.x)*10,by=b.y*6.4;
 if(ax===bx)return `M${ax} ${ay} Q${ax<500?35:965} ${(ay+by)/2} ${bx} ${by}`;
 if(ay===by)return `M${ax} ${ay} Q500 ${ay<320?35:620} ${bx} ${by}`;
 return `M${ax} ${ay} C${ax} ${ay<320?600:20},${bx} ${by<320?20:600},${bx} ${by}`;
}
