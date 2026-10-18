import { useEffect, useRef, useState } from 'react';

/** In-page selection keeps menus at the page's readable size, including mobile previews. */
export function ChoiceMenu({id,label,value,options,onChange,disabled=false,describedBy}:{id:string;label:string;value:string;options:{value:string;label:string}[];onChange:(value:string)=>void;disabled?:boolean;describedBy?:string}){
 const [open,setOpen]=useState(false);
 const root=useRef<HTMLSpanElement>(null),trigger=useRef<HTMLButtonElement>(null),items=useRef<(HTMLButtonElement|null)[]>([]);
 const selected=Math.max(0,options.findIndex(option=>option.value===value));
 function close(restore=false){setOpen(false);if(restore)trigger.current?.focus();}
 useEffect(()=>{
  if(!open)return;
  const frame=requestAnimationFrame(()=>items.current[selected]?.focus());
  const outside=(event:PointerEvent)=>{if(!root.current?.contains(event.target as Node))setOpen(false);};
  document.addEventListener('pointerdown',outside);
  return()=>{cancelAnimationFrame(frame);document.removeEventListener('pointerdown',outside);};
 },[open,selected]);
 return <span className="choice-menu" ref={root}>
  <button id={id} ref={trigger} type="button" className="choice-trigger" disabled={disabled} aria-label={label+': '+options[selected].label} aria-describedby={describedBy} aria-haspopup="listbox" aria-expanded={open} aria-controls={open?id+'-options':undefined} onClick={()=>setOpen(!open)} onKeyDown={event=>{if(event.key==='ArrowDown'||event.key==='ArrowUp'){event.preventDefault();setOpen(true);}}}>
   <span>{options[selected].label}</span><span aria-hidden="true">⌄</span>
  </button>
  {open&&<span id={id+'-options'} className="choice-options" role="listbox" aria-label={label} onKeyDown={event=>{
   const current=items.current.findIndex(item=>item===document.activeElement);
   let next=current;
   if(event.key==='ArrowDown')next=(current+1)%options.length;
   else if(event.key==='ArrowUp')next=(current-1+options.length)%options.length;
   else if(event.key==='Home')next=0;
   else if(event.key==='End')next=options.length-1;
   else if(event.key==='Escape'){event.preventDefault();event.stopPropagation();close(true);return;}
   else if(event.key==='Tab'){close();return;}
   else if(event.key.length===1&&event.key!==' '){const index=options.findIndex((option,i)=>i>current&&option.label.toLowerCase().startsWith(event.key.toLowerCase()));next=index>=0?index:options.findIndex(option=>option.label.toLowerCase().startsWith(event.key.toLowerCase()));}
   else return;
   event.preventDefault();items.current[next]?.focus();
  }}>
   {options.map((option,index)=><button type="button" key={option.value} ref={element=>{items.current[index]=element;}} role="option" aria-selected={option.value===value} tabIndex={-1} onClick={()=>{onChange(option.value);close(true);}}><span aria-hidden="true">{option.value===value?'✓':''}</span>{option.label}</button>)}
  </span>}
 </span>;
}
