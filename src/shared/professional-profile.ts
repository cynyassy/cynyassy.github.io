export interface Capability {
  title: string;
  description: string;
  skills: string;
  examples: {name: string; href: string}[];
}

export const capabilities: Capability[] = [
  {title:'Product and interaction design',description:'Understand the people and the problem. Shape the service, flow or interaction, then prototype and refine it.',skills:'Research · Service design · Game design · Prototyping · Figma',examples:[{name:'Perspectives',href:'/projects/perspectives.html'},{name:'Design Adventure',href:'/projects/design-adventure.html'}]},
  {title:'Software and delivery',description:'Build the interface, connect the data and services, and take the product through launch and handover.',skills:'React · TypeScript · APIs · PostgreSQL · Deployment',examples:[{name:'Indian Coffee Stories',href:'/projects/coffee-tools.html'},{name:'Project RESET',href:'/projects/project-reset.html'}]},
  {title:'Communication and growth',description:'Make a complicated subject easier to get into. Build the documentation, content and distribution around it.',skills:'Product education · GTM · SEO · Analytics · Content strategy',examples:[{name:'AlgoTest',href:'/projects/algotest.html'},{name:'Indian Coffee Stories',href:'/projects/coffee-tools.html'}]},
  {title:'Writing and visual storytelling',description:'Find the words, drawings and pacing that make an idea land, from a short comic to a published book.',skills:'Writing · Illustration · Narrative · Publication design',examples:[{name:'ChaddiMan',href:'/projects/cynyassy.html'},{name:'The book',href:'/projects/not-everything-is-urgent.html'}]},
];

export interface ExperienceEntry {
  organisation: string;
  role: string;
  period?: string;
  description: string;
  href?: string;
}

export const selectedExperience: ExperienceEntry[] = [
  {organisation:'The Virsa Foundation / Project RESET',role:'Production design, development & event experience',period:'2026',description:'Took a supplied prototype through the production app, conversation tool, screening materials and handover.',href:'/projects/project-reset.html'},
  {organisation:'AlgoTest',role:'Content, product communication & growth',period:'2023–2025',description:'Led documentation, product education and launch communication, working with product and engineering.',href:'/projects/algotest.html'},
  {organisation:'Cynyassy',role:'Founder, writer & illustrator',period:'2019–present',description:'Built the comic channel to 100K+ followers. Created the stories, artwork, voice and formats.',href:'/projects/cynyassy.html'},
  {organisation:'CreateNet',role:'Brand, communications & knowledge management consultant',period:'2017–2019',description:'Brand storytelling for Kama Ayurveda, and knowledge and communication systems for Studio Lotus.'},
  {organisation:'Teach For India',role:'Fellow',period:'2013–2015',description:'Taught the same class through Grades 3 and 4, using storytelling and filmmaking in the classroom.',href:'/projects/school-decision.html'},
];

export const earlierExperience: ExperienceEntry[] = [
  {organisation:'Tara India Research Press',role:'Editing & commissioning',description:'Worked with authors to develop books, progressing from an internship to commissioning editor.'},
  {organisation:'RedInk Literary Agency',role:'Editorial work',description:'Editorial work with a literary agency.'},
  {organisation:'Indus Action',role:'Facilitation & programme design',description:'Conducted staff interviews, facilitated sessions on work and culture, and helped redesign the Phule-Ambedkar fellowship.'},
  {organisation:'Dextra',role:'Content & marketing lead',description:'Developed content, editorial tone, branding and search strategy for a creative network.'},
  {organisation:'Jamboree Education',role:'Verbal instructor',description:'Taught GRE, GMAT and SAT verbal preparation and worked on course materials.'},
  {organisation:'Tihar Jail',role:'Storytelling workshops',description:'Taught storytelling to young adults, an experience that continues to inform my work on education and access.'},
];

// Names recovered from the previous portfolio and the owner's supplied history.
// Do not invent employment titles or dates for these shorter engagements.
export const otherOrganisations = ['KPMG','Bahrisons','Slam Out Loud','CreatNet Education','Kaivalya Plays','UNICEF','Bhakt Bharat'];
