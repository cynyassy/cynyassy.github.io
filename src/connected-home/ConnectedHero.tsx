import {useLayoutEffect,useRef,useState,type CSSProperties} from 'react';
import {pieces,connections,curve,type HeroProjectId} from './artwork';
import {ConnectionPreview} from './ConnectionPreview';
import './hero.css';

export function ConnectedHero({layout='split'}:{layout?:'split'|'surround'}={}){
 const [selected,setSelected]=useState<HeroProjectId|null>(null);
 const [hovered,setHovered]=useState<HeroProjectId|null>(null);
 const [focused,setFocused]=useState<HeroProjectId|null>(null);
 const triggers=useRef<Partial<Record<HeroProjectId,HTMLButtonElement>>>({});
 const mobileHeading=useRef<HTMLHeadingElement>(null);
 const revealRequested=useRef(false),pendingFrame=useRef(0);
 const active=hovered??focused??selected,piece=pieces.find(p=>p.id===selected);

 // Selection requests reveal once. Viewport changes never initiate navigation.
 useLayoutEffect(()=>{
  if(!selected||!revealRequested.current)return;
  revealRequested.current=false;
  pendingFrame.current=requestAnimationFrame(()=>{
   pendingFrame.current=0;
   if(!matchMedia('(max-width: 760px)').matches)return;
   const heading=mobileHeading.current;
   heading?.focus({preventScroll:true});
   heading?.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  });
  return()=>cancelAnimationFrame(pendingFrame.current);
 },[selected]);

 function select(id:HeroProjectId){
  cancelAnimationFrame(pendingFrame.current);
  revealRequested.current=matchMedia('(max-width: 760px)').matches;
  setSelected(id);
  if(!revealRequested.current)triggers.current[id]?.focus({preventScroll:true});
 }
 function clear(){
  cancelAnimationFrame(pendingFrame.current);
  revealRequested.current=false;
  if(matchMedia('(max-width: 760px)').matches)window.scrollTo({top:window.scrollY,behavior:'instant'});
  setSelected(null);
  if(selected)triggers.current[selected]?.focus({preventScroll:matchMedia('(min-width: 761px)').matches});
 }
 const preview=piece?<ConnectionPreview piece={piece} onSelect={select} onClose={clear}/>:null;
 return <section className="connected-home-hero" data-layout={layout} aria-labelledby="home-title"
  onKeyDown={e=>{if(e.key==='Escape'&&selected){e.stopPropagation();clear();}}}>
  <svg className="home-connection-lines" viewBox="0 0 1000 640" preserveAspectRatio="none" aria-hidden="true">
   {connections.map(([a,b])=><path key={`${a}-${b}`} d={curve(a,b,layout==='split')}
    className={active===a||active===b?'is-lit':''} data-quiet={!!active&&active!==a&&active!==b} pathLength="1"/>)}
  </svg>
  <div className="connected-home-copy">
   <p className="connected-home-eyebrow">SHASHANK SHARMA / CYNYASSY</p>
   <h1 id="home-title">I <span>build products</span> and the <em>stories</em> around them.</h1>
   <p className="connected-home-byline">I’m a designer, developer and storyteller. These are a few of the things I’ve made.</p>
   <div className="connected-home-actions"><a href="#projects">Browse projects ↓</a><a href="/projects/work-with-me.html">Work with me ↗</a></div>
   {layout==='surround'&&<div className="surround-preview-space">{preview}</div>}
  </div>
  <p className="home-artwork-hint">Pick a project to see the connections.</p>
  <div className="connected-home-artworks" role="group" aria-label="Explore connections between my projects">
   {pieces.map(p=><button key={p.id} ref={el=>{if(el)triggers.current[p.id]=el;}}
    className="home-artwork" style={{left:`${layout==='split'?(p.x<50?25:75):p.x}%`,top:`${p.y}%`,'--art-angle':`${p.angle}deg`} as CSSProperties}
    aria-label={`Explore ${p.title}`} aria-expanded={selected===p.id} data-active={active===p.id}
    onPointerEnter={e=>{if(e.pointerType!=='touch')setHovered(p.id);}} onPointerLeave={()=>setHovered(null)}
    onFocus={()=>setFocused(p.id)} onBlur={()=>setFocused(null)} onClick={()=>selected===p.id?clear():select(p.id)}>
    <span className="home-artwork-image"><img src={p.src} alt={p.alt} width="240" height="160" decoding="async"/></span>
    <span className="home-artwork-title">{p.title}</span><small>{p.skills.slice(0,2).join(' · ')}</small>
   </button>)}
  </div>
  {layout==='split'&&piece&&<div className="split-project-preview">{preview}</div>}
  {piece&&<ConnectionPreview piece={piece} onSelect={select} onClose={clear} mobile headingRef={mobileHeading}/>}
 </section>;
}
