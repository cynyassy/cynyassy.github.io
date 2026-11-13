import {projectCatalogue,type ProjectContent,type ProjectId} from '../shared/project-catalogue';
export type Area = 'main' | 'bonus';
export interface Platform {x:number;y:number;w:number;color:string}
export interface World {width:number;portal:number;spawn:number;platforms:Platform[]}
export type LandmarkId = 'coffee-cart' | 'terminal' | 'comic-kiosk' | 'reactor' | 'board-table' | 'feeling-meter' | 'bookshelf' | 'cinema' | 'schoolhouse' | 'reset-station';
export interface Project extends ProjectContent {id:ProjectId;landmark:LandmarkId;area:Area;x:number;y:number;color:string}
export const projects: Project[] =[
 {...projectCatalogue.brew,id:'brew',area:'main',landmark:'coffee-cart',x:330,y:198,color:'#f5f3ee'},
 {...projectCatalogue.algotest,id:'algotest',area:'main',landmark:'terminal',x:815,y:130,color:'#ffba08'},
 {...projectCatalogue.chaddiman,id:'chaddiman',area:'main',landmark:'comic-kiosk',x:1380,y:112,color:'#f5f3ee'},
 {...projectCatalogue.adventure,id:'adventure',area:'main',landmark:'reactor',x:1945,y:130,color:'#3f88c5'},
 {...projectCatalogue.perspectives,id:'perspectives',area:'bonus',landmark:'board-table',x:340,y:198,color:'#ffba08'},
 {...projectCatalogue.emotions,id:'emotions',area:'bonus',landmark:'feeling-meter',x:760,y:130,color:'#3f88c5'},
 {...projectCatalogue.book,id:'book',area:'bonus',landmark:'bookshelf',x:1160,y:190,color:'#f5f3ee'},
 {...projectCatalogue.film,id:'film',area:'bonus',landmark:'cinema',x:1570,y:126,color:'#ffba08'},
 {...projectCatalogue.school,id:'school',area:'bonus',landmark:'schoolhouse',x:1985,y:198,color:'#ffffff'},
 {...projectCatalogue.reset,id:'reset',area:'bonus',landmark:'reset-station',x:2400,y:198,color:'#ffffff'}
];
export const areaCount = (area:Area) => projects.filter(project=>project.area===area).length;
export const worlds: Record<Area, World> ={
 main:{width:2400,portal:2270,spawn:110,platforms:[
  {x:515,y:330,w:92,color:'#b7becb'},{x:650,y:295,w:345,color:'#f5f3ee'},
  {x:1100,y:325,w:95,color:'#b7becb'},{x:1220,y:278,w:340,color:'#f5f3ee'},
  {x:1665,y:330,w:95,color:'#b7becb'},{x:1785,y:295,w:340,color:'#3f88c5'}]},
 bonus:{width:2670,portal:82,spawn:185,platforms:[
  {x:520,y:330,w:92,color:'#b7becb'},{x:630,y:295,w:280,color:'#f5f3ee'},
  {x:1320,y:330,w:92,color:'#b7becb'},{x:1440,y:290,w:280,color:'#ffba08'}]}
};
