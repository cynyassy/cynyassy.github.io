import {useRef,useState} from 'react';
import comic from '../cynyassy/assets/decide-04.webp';
import board from '../assets/perspectives/thesis/final-board.webp';
import coffee from '../brick-trail/assets/brew-tracker.webp';
import docs from '../brick-trail/assets/gallery/algotest.webp';
import {work} from './data';
import './connections.css';

type ProjectId='comics'|'coffee'|'perspectives'|'algotest';
type Skill='Writing'|'Illustration'|'Research'|'Design'|'Development';
type ProjectNode={id:ProjectId;src:string;alt:string;x:number;y:number;angle:number;skills:Skill[]};
const nodes:ProjectNode[]=[
 {id:'comics',src:comic,alt:'ChaddiMan in the final panel of I get to decide',x:15,y:23,angle:-8,skills:['Writing','Illustration']},
 {id:'coffee',src:coffee,alt:'Brew Tracker, part of Indian Coffee Stories',x:85,y:23,angle:7,skills:['Writing','Research','Design','Development']},
 {id:'perspectives',src:board,alt:'The illustrated physical board from the Perspectives thesis',x:15,y:76,angle:6,skills:['Research','Illustration','Design']},
 {id:'algotest',src:docs,alt:'AlgoTest documentation with guides and product navigation',x:85,y:76,angle:-6,skills:['Writing','Research']},
];
// Connections describe shared work, not collaboration between the projects.
const connections:[ProjectId,ProjectId,Skill[]][]=[
 ['comics','coffee',['Writing']],['comics','perspectives',['Illustration']],['comics','algotest',['Writing']],
 ['coffee','perspectives',['Research','Design']],['coffee','algotest',['Writing','Research']],['perspectives','algotest',['Research']],
];
const positions=Object.fromEntries(nodes.map(node=>[node.id,{x:node.x*10,y:node.y*6.2}])) as Record<ProjectId,{x:number;y:number}>;
function edgePath(from:ProjectId,to:ProjectId){const a=positions[from],b=positions[to];if(a.x===b.x)return `M ${a.x} ${a.y} Q ${a.x<500?35:965} ${(a.y+b.y)/2} ${b.x} ${b.y}`;if(a.y===b.y)return `M ${a.x} ${a.y} Q 500 ${a.y<310?20:610} ${b.x} ${b.y}`;return `M ${a.x} ${a.y} C ${a.x} ${a.y<310?570:40}, ${b.x} ${b.y<310?40:570}, ${b.x} ${b.y}`;}
function related(id:ProjectId){return connections.filter(([a,b])=>a===id||b===id).map(([a,b,skills])=>({id:a===id?b:a,skills}));}
function Detail({id,onSelect,onClose}:{id:ProjectId;onSelect:(id:ProjectId)=>void;onClose:()=>void}){const project=work[id];return <div className="connection-detail"><div className="connection-project"><p className="lab-label">Selected project</p><h3>{project.title}</h3><p>{project.description}</p><p className="connection-role">{project.role}</p><a href={project.href} target="_blank" rel="noopener noreferrer">Open project ↗</a></div><div className="connection-related"><p className="lab-label">Related work</p>{related(id).map(item=><button key={item.id} onClick={()=>onSelect(item.id)}><span>{work[item.id].title}</span><small>{item.skills.join(' · ')} <span aria-hidden="true">↗</span></small></button>)}<button className="connection-clear" onClick={onClose}>Clear selection</button></div></div>}
export function ConnectedArtwork(){
 const [selected,setSelected]=useState<ProjectId|null>(null),[hovered,setHovered]=useState<ProjectId|null>(null),[focused,setFocused]=useState<ProjectId|null>(null);
 const desktop=useRef<Partial<Record<ProjectId,HTMLButtonElement>>>({}),mobile=useRef<Partial<Record<ProjectId,HTMLButtonElement>>>({});
 const active=hovered??focused??selected;
 function select(id:ProjectId,small=false){setSelected(id);setHovered(null);requestAnimationFrame(()=>{(small?mobile:desktop).current[id]?.focus({preventScroll:false});});}
 function clear(){const id=selected;setSelected(null);if(id)requestAnimationFrame(()=>{const small=matchMedia('(max-width: 760px)').matches;(small?mobile:desktop).current[id]?.focus({preventScroll:true});});}
 return <div className="connected-study" onKeyDown={e=>{if(e.key==='Escape'){clear();e.stopPropagation();}}}>
  <div className="connection-preview">
   <svg className="connection-web" viewBox="0 0 1000 620" preserveAspectRatio="none" aria-hidden="true"><defs><marker id="connection-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="m1 1 7 4-7 4" fill="none" stroke="currentColor" strokeWidth="1.5"/></marker></defs>{connections.map(([from,to],i)=>{const lit=active===from||active===to;return <path key={`${from}-${to}`} className={`connection-thread ${lit?'is-connected':''}`} d={edgePath(from,to)} data-quiet={!!active&&!lit} pathLength="1" markerEnd={lit?'url(#connection-arrow)':undefined} style={{'--delay':`${i*70}ms`} as React.CSSProperties}/>;})}</svg>
   <div className="connected-intro"><p className="lab-label">Homepage study / Shashank Sharma</p><h3>I <span>build products</span> and the <em>stories</em> around them.</h3><p>I’m a designer, developer and storyteller. These are a few of the things I’ve made.</p><div className="connected-links"><a href="/#projects" target="_blank" rel="noopener noreferrer">Browse projects ↗</a><a href="/projects/work-with-me.html" target="_blank" rel="noopener noreferrer">Work With Me ↗</a></div><p className="connection-hint">{active?<>{work[active].title}<span>{nodes.find(node=>node.id===active)!.skills.join(' · ')}</span></>:<>Select a piece of work.<span>See the skills and projects connected to it.</span></>}</p></div>
   <div className="connected-desktop-nodes" role="group" aria-label="Explore connections between four projects">{nodes.map(node=>{const linked=!active||active===node.id||related(active).some(item=>item.id===node.id);return <button ref={el=>{if(el)desktop.current[node.id]=el;}} key={node.id} className="connected-node" style={{left:`${node.x}%`,top:`${node.y}%`,'--art-angle':`${node.angle}deg`} as React.CSSProperties} data-active={active===node.id} data-linked={linked} aria-pressed={selected===node.id} aria-label={`Explore connections for ${work[node.id].title}`} onPointerEnter={e=>{if(e.pointerType!=='touch')setHovered(node.id);}} onPointerLeave={()=>setHovered(null)} onFocus={()=>setFocused(node.id)} onBlur={()=>setFocused(null)} onClick={()=>setSelected(node.id)}><span className="connected-art"><img src={node.src} alt={node.alt}/></span><span className="connected-node-title">{work[node.id].title}</span><small>{node.skills.slice(0,2).join(' · ')}</small></button>;})}</div>
  </div>
  <div className="connections-desktop-detail" aria-live="polite">{selected?<Detail id={selected} onSelect={id=>select(id)} onClose={clear}/>:<p className="connection-empty">Choose any artwork to see its role and related projects. No puzzle to solve.</p>}</div>
  <div className="connected-mobile"><p className="lab-label">Explore the projects</p>{nodes.map(node=><article key={node.id}><button ref={el=>{if(el)mobile.current[node.id]=el;}} className="connected-mobile-card" aria-expanded={selected===node.id} aria-controls={`connections-${node.id}`} onClick={()=>setSelected(current=>current===node.id?null:node.id)}><span className="connected-mobile-art" style={{'--art-angle':`${node.angle}deg`} as React.CSSProperties}><img src={node.src} alt={node.alt}/></span><span><strong>{work[node.id].title}</strong><small>{node.skills.slice(0,2).join(' · ')}</small><span className="connection-mobile-action">{selected===node.id?'Hide connections ↑':'See connections ↓'}</span></span></button>{selected===node.id&&<div id={`connections-${node.id}`}><Detail id={node.id} onSelect={id=>select(id,true)} onClose={clear}/></div>}</article>)}</div>
 </div>;
}
