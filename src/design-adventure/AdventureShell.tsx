import { PortfolioFooter } from '../shared/PortfolioFooter';
import { PortfolioHeader } from '../shared/PortfolioHeader';
import { useEffect, useId, useRef } from 'react';
import type { ReactNode } from 'react';
import type { Mode, StoryId, ThemeId } from './types';
import { StyleShowcase } from './StyleShowcase';
import { ChoiceMenu } from './ChoiceMenu';

export interface SharedStoryPresentation {
 theme:ThemeId;
 onThemeChange:(theme:ThemeId)=>void;
 onStoryChange:(story:StoryId)=>void;
}
export function AdventureShell({story,theme,onThemeChange,onStoryChange,onLearn,onReplay,onShare,status,children}:{story:StoryId;onLearn:()=>void;onReplay:()=>void;onShare:()=>void;status?:ReactNode;children:ReactNode}&SharedStoryPresentation){
 const storyMenu=useId();
 return <>
 <a href={`#experiment-${story}`} className="da-skip">Skip to experiment</a>
 <PortfolioHeader />
 <div className="portfolio-section-nav"><label htmlFor={storyMenu}>Experiment</label><ChoiceMenu id={storyMenu} label="Adventure story" value={story} onChange={value=>onStoryChange(value as StoryId)} options={[{value:'reactor',label:'Mars Reactor'},{value:'workshop',label:'Portfolio Workshop'}]}/></div>
 <main id={`experiment-${story}`} className="shell-main" data-focused={true} tabIndex={-1}>
 
 <p className="shell-project-purpose">An experiment in how interfaces guide attention, show progress and help us recover. <span>Concept · Interaction design · Development</span></p>
 <StyleShowcase value={theme} onChange={onThemeChange} compact/>
 <nav className="shell-toolbar" aria-label="Experiment tools"><div className="shell-modes"><button title="Explore the current interaction and its sources" onClick={onLearn}>Learn</button></div>{status&&<div className="shell-state">{status}</div>}<div className="shell-tools"><button onClick={onReplay} title={story==='reactor'?'Restart this run':'Restart this lesson'}>Replay <span>{story==='reactor'?'run':'lesson'}</span></button><button onClick={onShare}>Share</button></div></nav>
 {children}
 <footer className="shell-footer"><span>Cynyassy / Play. Notice. Understand.</span><a className="shell-studio-link" href={'style-studio.html?theme='+theme} target="_blank" rel="noopener noreferrer" aria-label="Open Style Studio in a new tab">Remix &amp; shortlist styles ↗</a></footer>
 <PortfolioFooter project="Indian Coffee Stories" href="/projects/coffee-tools.html" connection="See how I bring storytelling, interface design and software together in a coffee publication and brewing app." />
 </main></>;
}

export function ResponsiveDesignLab({mode,children}:{mode:Mode;children:ReactNode}){
 const panel=useRef<HTMLElement>(null);
 useEffect(()=>{if(mode==='make'&&window.matchMedia('(max-width: 899px)').matches)requestAnimationFrame(()=>panel.current?.scrollIntoView({block:'start',behavior:'auto'}));},[mode]);
 return <aside ref={panel} className="shell-design-lab" aria-label="Design Lab" data-mode={mode}><div className="shell-panel-heading"><span>DESIGN LAB</span><span>{mode==='make'?'YOUR VARIANT':'REFERENCE'}</span></div>{children}</aside>;
}
