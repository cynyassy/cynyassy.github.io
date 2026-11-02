import { useEffect, useRef, useState } from 'react';
import { comicStories } from './comics';
export function ComicReader() {
 const [storyId,setStoryId]=useState(comicStories[0].id);
 const [positions,setPositions]=useState<Record<string,number>>({});
 const story=comicStories.find(item=>item.id===storyId)!;
 const index=positions[storyId]??0, panel=story.panels[index];
 const previous=useRef<HTMLButtonElement>(null),next=useRef<HTMLButtonElement>(null);
 const move=(delta:number)=>{
  const value=Math.max(0,Math.min(story.panels.length-1,index+delta));
  if(value===index)return;
  setPositions(old=>({...old,[storyId]:value}));
  if(value===0&&document.activeElement===previous.current)next.current?.focus({preventScroll:true});
  if(value===story.panels.length-1&&document.activeElement===next.current)previous.current?.focus({preventScroll:true});
 };
 useEffect(()=>{
  const images=[story.panels[index-1],story.panels[index+1]].filter(Boolean).map(item=>{const image=new Image();image.src=item.src;return image;});
  return ()=>{for(const image of images)image.removeAttribute('src');};
 },[story,index]);
 return <div className="comic-reader" role="region" aria-label="Selected comic reader" tabIndex={0} onKeyDown={event=>{if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();event.stopPropagation();move(event.key==='ArrowLeft'?-1:1);}}}>
  <div className="story-choices" role="group" aria-label="Choose a story">{comicStories.map(item=><button type="button" key={item.id} aria-pressed={item.id===storyId} onClick={()=>setStoryId(item.id)}>{item.title}</button>)}</div>
  <div className="reader-heading"><div><h3>{story.title}</h3><p>{story.description}</p></div><p role="status" aria-live="polite">{story.title} · {index+1} / {story.panels.length}</p></div>
  <figure className="comic-panel"><img src={panel.src} alt={panel.description} width={panel.width} height={panel.height} decoding="async" /><figcaption><a href={panel.src} target="_blank" rel="noopener">Open full-size panel ↗</a></figcaption></figure>
  <div className="reader-controls"><button ref={previous} type="button" disabled={index===0} onClick={()=>move(-1)}>← Previous</button><span>Panel {index+1} of {story.panels.length}</span><button ref={next} type="button" disabled={index===story.panels.length-1} onClick={()=>move(1)}>Next →</button></div>
  <details className="panel-transcript"><summary>Read the text for this panel</summary><p>{panel.description}</p><p>{panel.transcript}</p></details>
  <details className="editorial-note"><summary>A note on the storytelling</summary><p>{story.editorialNote}</p></details>
 </div>;
}
