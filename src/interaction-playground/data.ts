import {projectCatalogue,type ProjectId} from '../shared/project-catalogue';
import {comicStories} from '../cynyassy/comics';
import breathe from '../book-story/assets/breathe.webp';
import clocks from '../book-story/assets/clocks.webp';
import notebook from '../book-story/assets/notebook.webp';
import reading from '../book-story/assets/reading.webp';
import waiting from '../book-story/assets/waiting.webp';
import bench from '../book-story/assets/ian-bench.webp';
import balloon from '../book-story/assets/balloon.webp';
import docs from '../brick-trail/assets/gallery/algotest.webp';
import coffee from '../brick-trail/assets/brew-tracker.webp';
import school from '../brick-trail/assets/gallery/four-names.png';
import reactor from '../design-adventure/assets/reactor-mars-neo-mobile.webp';

const workAliases={book:'book',comics:'chaddiman',coffee:'brew',algotest:'algotest',perspectives:'perspectives',adventure:'adventure',school:'school'} as const satisfies Record<string,ProjectId>;
export type WorkId=keyof typeof workAliases;
export const work=Object.fromEntries(Object.entries(workAliases).map(([alias,id])=>{
 const project=projectCatalogue[id],copy=project.playground!;
 return [alias,{title:project.name,href:project.url,role:copy.role,description:copy.description}];
})) as Record<WorkId,{title:string;href:string;role:string;description:string}>;
export type ArtItem={id:string;src:string;title:string;description:string;project:WorkId;category:'Stories'|'Products'|'Games'};
const comicArt:ArtItem[]=comicStories.flatMap(story=>story.panels.slice(0,story.id==='solid'?2:4).map((panel,index)=>({id:`${story.id}-${index}`,src:panel.src,title:story.title,description:panel.description,project:'comics',category:'Stories'})));
export const artwork:ArtItem[]=[...comicArt,
 ...[[breathe,'Breathe'],[clocks,'Not that urgent o’clock'],[notebook,'A page from the book'],[reading,'Reading'],[waiting,'Waiting to live my life'],[bench,'A moment on a bench'],[balloon,'Not every balloon needs catching']].map(([src,title],i)=>({id:`book-${i}`,src,title,description:`An original illustration from Not Everything Is Urgent: ${title}.`,project:'book' as const,category:'Stories' as const})),
 {id:'docs',src:docs,title:'Documentation for traders',description:'AlgoTest documentation with guides and product navigation.',project:'algotest',category:'Products'},
 {id:'coffee',src:coffee,title:'Brew Tracker',description:'The brewing product within Indian Coffee Stories.',project:'coffee',category:'Products'},
 {id:'school',src:school,title:'Four Names',description:'The classroom decision game.',project:'school',category:'Games'},
 {id:'reactor',src:reactor,title:'Mars Reactor',description:'The reactor illustration in its Neo-Brutalist treatment.',project:'adventure',category:'Games'},
];
export const ideas=[
 {id:'connections',title:'Connected artwork',instruction:'Hover or focus to trace the links. Select artwork to explore the project.',purpose:'Do the connections help explain the range of work?',art:'Start with four existing pieces: a comic panel, a game board, the coffee product and documentation. New project vignettes can follow after choosing the layout.'},
 {id:'wall',title:'Artwork wall',instruction:'Pick a drawing to see where it comes from.',purpose:'Does seeing more of the actual work make the introduction feel more like you?',art:'8–12 existing drawings or short comic sequences. No new drawing needed yet.'},
 {id:'comic',title:'Comic pacing',instruction:'Reveal the next panel. Then try reading without the pause.',purpose:'Can someone experience a writing and pacing decision instead of just reading about it?',art:'An existing four-panel comic with a silent reaction panel. Later, separate the characters, background and speech into layers.'},
 {id:'relay',title:'Emotional chain',instruction:'Choose someone to pause, then start the exchange.',purpose:'Could a short, fictional chain of replies introduce your interest in emotions and systems?',art:'One character in four states: neutral, irritated, taking a breath and responding calmly. Keep the pose, canvas and scale consistent.'},
] as const;
export const parkedIdeas=[{id:'combine',title:'Combine objects (parked)',instruction:'Saved for reference. This direction is parked.',purpose:'Not being developed for the homepage.',art:'No new artwork requested for this parked experiment.'}] as const;
export type IdeaId=typeof ideas[number]['id']|typeof parkedIdeas[number]['id'];
export const references=[
 {name:'Gorogoa',url:'https://www.annapurna.com/interactive/gorogoa',lesson:'Illustrated panels become something you arrange and combine, rather than a background.',idea:'Combine objects / Comic pacing'},
 {name:'Incredibox',url:'https://www.incredibox.com/',lesson:'Dragging an object onto a character produces an immediate, meaningful change.',idea:'Combine objects'},
 {name:'The Boat, SBS',url:'https://www.sbs.com.au/theboat/',lesson:'Hand-drawn artwork, text, motion and sound are used together to tell a story.',idea:'Comic pacing'},
 {name:'Patatap',url:'https://patatap.com/',lesson:'A simple input can have a distinct visual and sound response. Borrow the responsiveness, not the flashing.',idea:'Emotional chain / Object reactions'},
 {name:'Bruno Simon',url:'https://bruno-simon.com/',lesson:'Exploration leads to the actual portfolio content. The world gives the interaction a reason to exist.',idea:'Artwork wall / Project discovery'},
];
