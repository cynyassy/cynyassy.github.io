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

export const work={
 book:{title:'Not Everything Is Urgent',href:'/projects/not-everything-is-urgent.html',role:'Co-writing, illustration and book design',description:'I co-wrote the stories, drew the illustrations and designed the layouts for a book in two parts.'},
 comics:{title:'ChaddiMan',href:'/projects/cynyassy.html',role:'Writing, illustration and audience building',description:'I built a comic channel to 100K+ followers through original stories and illustrations.'},
 coffee:{title:'Indian Coffee Stories',href:'/projects/coffee-tools.html',role:'Writing, research, product design and development',description:'A publication, coffee directories and Brew Tracker, with the communication around them.'},
 algotest:{title:'AlgoTest',href:'/projects/algotest.html',role:'Documentation, product education and SEO',description:'I built a documentation hub around the questions traders were asking about setup and the product.'},
 perspectives:{title:'Perspectives',href:'/projects/perspectives.html',role:'Research, game design, illustration and playtesting',description:'My MFA thesis became a facilitated board game about caste, power and access to resources.'},
 adventure:{title:'Design Adventure',href:'/projects/design-adventure.html',role:'Interaction design and development',description:'An interface experiment with six reactor puzzles and 22 visual treatments.'},
 school:{title:'Four Names',href:'/projects/school-decision.html',role:'Game design, writing and development',description:'A school decision game based on my teaching experience. Student stories are fictionalised composites.'},
};
export type WorkId=keyof typeof work;
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
