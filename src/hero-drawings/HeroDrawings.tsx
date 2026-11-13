import {useEffect, useRef, useState} from 'react';
import portraits from '../book-story/assets/portraits.webp';
import chaddiman from '../assets/chaddiman-portrait-logo.png';
import './drawings.css';

// Original illustrations remain intact. SVG viewBoxes select a portrait from the
// existing sheet; small white patches allow the pupils to look around.
const characters = [
  {id:'shashank',name:'the bearded character',view:'62 680 258 250',sheet:true,eyes:[[155,780],[213,776]],eyeHeight:26,patchHeight:25,colour:'#853248'},
  {id:'kim',name:'the character with long hair',view:'18 12 320 300',sheet:true,eyes:[[142,123],[200,127]],eyeHeight:22,patchHeight:17,colour:'#853248'},
  {id:'ian',name:'the character with glasses',view:'72 330 238 286',sheet:true,eyes:[[143,438],[231,433]],eyeHeight:22,patchHeight:19,colour:'#853248'},
  {id:'chaddiman',name:'ChaddiMan',view:'42 45 245 260',sheet:false,eyes:[[137,109],[179,108]],eyeHeight:12,patchHeight:13,colour:'#353535'},
] as const;

export function HeroDrawings({blocked=false}:{blocked?:boolean}){
  const stage=useRef<HTMLDivElement>(null);
  const nodes=useRef<(HTMLDivElement|null)[]>([]);
  const pupils=useRef<(SVGGElement|null)[]>([]);
  const timers=useRef(new Map<number,ReturnType<typeof setTimeout>>());
  const turns=useRef([0,0,0,0]);
  const [reactions,setReactions]=useState([0,0,0,0]);
  const [paused,setPaused]=useState(false);
  const [compact,setCompact]=useState(false);
  const [announcement,setAnnouncement]=useState('');

  function greet(index:number){
    const reaction=turns.current[index]%3+1;
    turns.current[index]++;
    clearTimeout(timers.current.get(index));
    setReactions(previous=>previous.map((value,i)=>i===index?reaction:value));
    setAnnouncement(`${characters[index].name}: ${['','a smile','a surprised look','a wink'][reaction]}.`);
    timers.current.set(index,setTimeout(()=>{
      setReactions(previous=>previous.map((value,i)=>i===index?0:value));
      timers.current.delete(index);
    },1800));
  }

  useEffect(()=>()=>{timers.current.forEach(clearTimeout);timers.current.clear();},[]);

  useEffect(()=>{
    const element=stage.current,hero=element?.closest('.profile-intro');
    if(!element||!hero)return;
    const reduced=matchMedia('(prefers-reduced-motion: reduce)');
    const mobile=matchMedia('(max-width: 700px)');
    let frame=0,visible=true,previous=0,elapsed=0;
    let pointer:{x:number;y:number}|null=null;
    const centres=characters.map(()=>({x:0,y:0}));
    const offsets=characters.map(()=>({x:0,y:0,lookX:0,lookY:0}));
    const canMove=()=>!paused&&!blocked&&!reduced.matches&&visible&&!document.hidden;
    function measure(){
      nodes.current.forEach((node,i)=>{
        if(!node)return;
        const rect=node.getBoundingClientRect(),offset=offsets[i];
        centres[i]={x:rect.left+rect.width/2-offset.x,y:rect.top+rect.height/2-offset.y};
      });
    }
    function reset(){
      nodes.current.forEach(node=>{if(node)node.style.transform='';});
      pupils.current.forEach(node=>node?.setAttribute('transform','translate(0 0)'));
      offsets.forEach(offset=>{offset.x=offset.y=offset.lookX=offset.lookY=0;});
    }
    function draw(now:number){
      frame=0;
      if(!canMove())return;
      const delta=previous?Math.min(32,now-previous):16;
      previous=now;elapsed+=delta;
      const blend=1-Math.exp(-delta/110);
      nodes.current.forEach((node,i)=>{
        if(!node||(mobile.matches&&i>1))return;
        const centre=centres[i],offset=offsets[i];
        const dx=pointer?pointer.x-centre.x:0,dy=pointer?pointer.y-centre.y:0;
        const distance=Math.hypot(dx,dy),near=!!pointer&&distance<260;
        const push=near?(1-distance/260)*10:0;
        const driftX=Math.sin(elapsed/2400+i*1.8)*4;
        const driftY=Math.cos(elapsed/1900+i*2.1)*5;
        const targetX=driftX-(distance?dx/distance*push:0);
        const targetY=driftY-(distance?dy/distance*push:0);
        offset.x+=(targetX-offset.x)*blend;offset.y+=(targetY-offset.y)*blend;
        offset.lookX+=((near?Math.max(-5,Math.min(5,dx/25)):0)-offset.lookX)*blend;
        offset.lookY+=((near?Math.max(-4,Math.min(4,dy/25)):0)-offset.lookY)*blend;
        node.style.transform=`translate(${offset.x.toFixed(2)}px,${offset.y.toFixed(2)}px) rotate(${(Math.sin(elapsed/2800+i)*2).toFixed(2)}deg)`;
        pupils.current[i]?.setAttribute('transform',`translate(${offset.lookX.toFixed(2)} ${offset.lookY.toFixed(2)})`);
      });
      frame=requestAnimationFrame(draw);
    }
    function sync(){
      setCompact(mobile.matches);
      cancelAnimationFrame(frame);frame=0;previous=0;
      if(canMove()){measure();frame=requestAnimationFrame(draw);}
      else if(paused||reduced.matches)reset();
    }
    function move(event:Event){
      const e=event as PointerEvent;
      if(e.pointerType==='touch')return;
      pointer={x:e.clientX,y:e.clientY};
    }
    function leave(){pointer=null;}
    const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();});
    observer.observe(element);
    const resize=new ResizeObserver(()=>{reset();measure();});resize.observe(element);
    hero.addEventListener('pointermove',move);hero.addEventListener('pointerleave',leave);
    window.addEventListener('scroll',measure,{passive:true});
    document.addEventListener('visibilitychange',sync);
    reduced.addEventListener('change',sync);mobile.addEventListener('change',sync);
    sync();
    return ()=>{
      cancelAnimationFrame(frame);observer.disconnect();resize.disconnect();
      hero.removeEventListener('pointermove',move);hero.removeEventListener('pointerleave',leave);
      window.removeEventListener('scroll',measure);document.removeEventListener('visibilitychange',sync);
      reduced.removeEventListener('change',sync);mobile.removeEventListener('change',sync);reset();
    };
  },[paused,blocked]);

  return <div className="hero-drawings" ref={stage} role="group" aria-label={compact?'Animated drawings around the introduction':'My drawings. Move near a character, or select one to say hello.'}>
    <div className="drawing-field" aria-hidden={compact||undefined}>{[[0,2],[1,3]].map((indices,side)=><div className={`drawing-side drawing-side-${side===0?'left':'right'}`} key={side}>{indices.map(index=>{
      const character=characters[index];
      const reaction=reactions[index];
      return <div className={`drawing-float drawing-${character.id}`} key={character.id} ref={node=>{nodes.current[index]=node;}}>
        <button className="drawing-character" type="button" tabIndex={compact?-1:0} onClick={()=>greet(index)} aria-label={`Say hello to ${character.name}`}>
          <svg viewBox={character.view} aria-hidden="true" focusable="false">
            <image href={character.sheet?portraits:chaddiman} width={character.sheet?625:319} height={character.sheet?935:368}/>
            {character.eyes.map(([x,y],i)=><ellipse key={`patch-${i}`} cx={x} cy={y} rx="10" ry={character.patchHeight} fill="white"/>)}
            <g ref={node=>{pupils.current[index]=node;}} stroke={character.colour} strokeWidth="5" strokeLinecap="round" fill="none">
              {character.eyes.map(([x,y],i)=>reaction===1||reaction===3&&i===1?<path key={i} d={`M ${x-6} ${y+2} Q ${x} ${y-5} ${x+6} ${y+2}`}/>:reaction===2?<ellipse key={i} cx={x} cy={y} rx="5" ry="8"/>:<path key={i} d={`M ${x} ${y-character.eyeHeight/2} L ${x+1} ${y+character.eyeHeight/2}`}/>)}
            </g>
            {!!reaction&&character.eyes.map(([x,y],i)=><ellipse key={`cheek-${i}`} cx={x+(i===0?-12:12)} cy={y+22} rx="9" ry="5" fill="#d00000" opacity=".16"/>)}
          </svg>
          {!!reaction&&<span className="drawing-reply" aria-hidden="true">{['','hi!','oh!','☺'][reaction]}</span>}
        </button>
      </div>;
    })}</div>)}</div>
    <div className="drawing-tools"><button type="button" aria-label={paused?'Resume drawings':'Pause drawings'} title={paused?'Resume drawings':'Pause drawings'} aria-pressed={paused} onClick={()=>setPaused(value=>!value)}><span aria-hidden="true">{paused?'▶':'Ⅱ'}</span></button></div>
    <span className="sr-only" role="status" aria-live="polite">{announcement}</span>
  </div>;
}
