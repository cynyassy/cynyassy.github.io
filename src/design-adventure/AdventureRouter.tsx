import { lazy, Suspense, useState } from 'react';
import './styles.css';
import { themeIds } from './types';
import type { ThemeId } from './types';
import { initialStory } from './reactor-share';
import type { StoryId } from './reactor-share';
const ReactorPage = lazy(() => import('./ReactorPage'));
const WorkshopPage = lazy(() => import('./AdventurePage'));
export default function AdventureRouter() {
 const [search] = useState(window.location.search);
 const [story,setStory] = useState<StoryId>(() => initialStory(search));
 const [theme,setTheme]=useState<ThemeId>(()=>{const value=new URLSearchParams(search).get('theme');return themeIds.includes(value as ThemeId)?value as ThemeId:'swiss';});
 const [visited,setVisited] = useState<StoryId[]>([story]);
 function change(next: StoryId) {
  setVisited(v => v.includes(next)?v:[...v,next]); setStory(next);
 }
 return <Suspense fallback={<p style={{padding:24,fontFamily:'sans-serif'}}>Loading the adventure…</p>}>
 {visited.includes('reactor')&&<div hidden={story!=='reactor'}><ReactorPage theme={theme} onThemeChange={setTheme} search={initialStory(search)==='reactor'?search:''} active={story==='reactor'} onStoryChange={change}/></div>}
 {visited.includes('workshop')&&<div hidden={story!=='workshop'}><WorkshopPage theme={theme} onThemeChange={setTheme} search={initialStory(search)==='workshop'?search:'?story=workshop'} active={story==='workshop'} onStoryChange={change}/></div>}
 </Suspense>;
}
