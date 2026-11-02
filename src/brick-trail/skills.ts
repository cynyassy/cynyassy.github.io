/** Skills grounded in the user's education, published work and Boot.dev record. */
export interface Skill {id:string;name:string;description:string;source?:string;sourceLabel?:string}
const source='https://www.boot.dev/u/cynyassy';
export const skills:Skill[]=[
 {id:'game-service-design',name:'Game & service design',description:'My MFA in Design at SVA, New York included game and service design. Perspectives is my thesis project.',source:'/projects/perspectives.html',sourceLabel:'Explore Perspectives ↗'},
 {id:'writing',name:'Writing & storytelling',description:'I built ChaddiMan and published a book as a writer, illustrator and designer.',source:'/projects/cynyassy.html',sourceLabel:'Explore ChaddiMan ↗'},
 {id:'illustration',name:'Illustration & visual design',description:'Comics, visual storytelling and the illustrations and design of Not Everything Is Urgent.',source:'https://www.poundproject.co.uk/not-everything-is-urgent',sourceLabel:'See the book ↗'},
 {id:'audience',name:'Audience building',description:'I built a comic channel to more than 100,000 followers.',source:'/projects/cynyassy.html',sourceLabel:'See the work ↗'},
 {id:'interaction',name:'Product & interaction design',description:'Turning ideas into tools and playable experiences, including Design Adventure and its 22 styles.',source:'/projects/design-adventure.html',sourceLabel:'Play Design Adventure ↗'},
 {id:'research',name:'Research & systems thinking',description:'Using research, games and service design to make complex systems easier to understand.',source:'/projects/perspectives.html',sourceLabel:'See Perspectives ↗'},
 {id:'engineering',name:'Engineering physics',description:'An engineering physics education at Delhi Technological University informs how I approach systems and technical problems.'},
 {id:'robotics',name:'Robotics',description:'A minor in robotics alongside engineering physics at Delhi Technological University.'},

 {id:"python",name:"Python",description:"Scripts, tools and games. My projects include BookBot, a static site generator and an AI agent.",source},
 {id:"go",name:"Go",description:"HTTP clients and servers, alongside the language fundamentals.",source},
 {id:"typescript",name:"TypeScript",description:"Typed applications and backend projects, including a Pok\u00e9dex, blog aggregator and web scraper.",source},
 {id:"javascript",name:"JavaScript",description:"Programming fundamentals for building interactive experiences on the web.",source},
 {id:"sql",name:"SQL",description:"Working with relational data and writing queries.",source},
 {id:"http",name:"HTTP clients and servers",description:"Making requests and building servers in Go and TypeScript.",source},
 {id:"rabbitmq",name:"RabbitMQ pub/sub",description:"Messaging between services with RabbitMQ and TypeScript.",source},
 {id:"docker",name:"Docker",description:"Containers and reproducible development environments.",source},
 {id:"kubernetes",name:"Kubernetes",description:"Container orchestration and deployment concepts.",source},
 {id:"aws",name:"AWS",description:"Cloud fundamentals, plus file servers and CDNs with S3 and CloudFront.",source},
 {id:"linux",name:"Linux",description:"Working with the terminal and command-line development tools.",source},
 {id:"git",name:"Git",description:"Version control, tracking changes and managing code history.",source},
 {id:"c-memory",name:"Memory management in C",description:"Allocating, using and releasing memory.",source},
 {id:"algorithms",name:"Data structures and algorithms",description:"Choosing structures and working through algorithms in Python.",source},
 {id:"oop",name:"Object-oriented programming",description:"Structuring Python programs with objects and classes.",source},
 {id:"functional",name:"Functional programming",description:"Working with functional approaches in Python.",source},
 {id:"games",name:"Python game development",description:"An Asteroids project built with Python and Pygame.",source},
];
export const SKILL_BRICK={id:'skill-brick',x:470,y:198,w:56,h:52};
export function createSkillCollection(entries:Skill[]=skills){let hits=0;return {
 hit(){if(!entries.length)return null;const index=hits%entries.length;hits++;return {skill:entries[index],found:Math.min(hits,entries.length),total:entries.length,revisited:hits>entries.length};},
 reset(){hits=0;},
};}
