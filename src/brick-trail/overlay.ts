import type {SceneLayout} from './renderer';

/** Frame-level layout stays out of React state. Elements retain normal focus and click semantics. */
export function createOverlayLayout(){
 const elements=new Map<string,HTMLButtonElement>();
 const refs=new Map<string,(element:HTMLButtonElement|null)=>void>();
 let current:SceneLayout|null=null;
 function place(id:string,element:HTMLButtonElement){
  const box=id==='$skill'?current?.skillBrick:id==='$portal'?current?.portal:current?.blocks.find(p=>p.id===id);
  element.hidden=!box?.visible;
  if(!box)return;
  const style:Record<string,string>={left:box.x+'px',top:box.y+'px'};
  if('w' in box&&'h' in box){style.width=box.w+'px';style.height=box.h+'px';}
  for(const [key,value] of Object.entries(style))if(element.style.getPropertyValue(key)!==value)element.style.setProperty(key,value);
 }
 return {
  update(layout:SceneLayout){current=layout;elements.forEach((element,id)=>place(id,element));},
  ref(id:string){
   if(!refs.has(id))refs.set(id,element=>{if(element){elements.set(id,element);place(id,element);}else elements.delete(id);});
   return refs.get(id)!;
  },
 };
}
