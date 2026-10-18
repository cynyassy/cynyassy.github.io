import { useEffect, useId, useState } from 'react';
import { themes } from './content';
import { ChoiceMenu } from './ChoiceMenu';
import type { ThemeId } from './types';

export function StyleShowcase({value,onChange,disabled=false,selectLabel='Visual style',compact=false}:{value:ThemeId;onChange:(id:ThemeId)=>void;disabled?:boolean;selectLabel?:string;compact?:boolean}) {
 const [open,setOpen]=useState(!compact);
 useEffect(()=>{setOpen(!compact);},[compact]);
 const id=useId();const theme=themes.find(t=>t.id===value)!;
 return <section className={"style-showcase"+(compact?" style-showcase-compact":"")} aria-label="Explore visual styles">
 <div className="style-showcase-main"><div className="style-title"><span className="style-kicker">VISUAL STYLE · {theme.number} / {String(themes.length).padStart(2,'0')}</span><h1 aria-label={theme.name}><span className="style-name">{theme.name}</span><span className="style-chevron" aria-hidden="true">⌄</span><ChoiceMenu id={id} label={selectLabel} value={value} disabled={disabled} onChange={value=>{setOpen(!compact);onChange(value as ThemeId);}} describedBy={id+'-definition'} options={themes.map(theme=>({value:theme.id,label:theme.name}))}/></h1></div><div className="style-definition"><p id={id+'-definition'}>{theme.vocabulary}</p><span className="style-switch-help">Switch styles to see the entire interface change. Your task and progress stay the same.</span></div></div>
 <details open={open} onToggle={e=>setOpen(e.currentTarget.open)} className="style-about"><summary>About this style <span>{theme.category}</span></summary><div className="style-about-grid"><p><strong>Context.</strong> {theme.summary}</p><p><strong>Consider the trade-off.</strong> {theme.tradeoff}</p></div><details className="style-study"><summary>Study the history, examples &amp; sources</summary><p>{theme.context}</p><p>{theme.example}</p><p><strong>Where it can fit:</strong> {theme.fit}</p><ul>{theme.sources.map(source=><li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label} ↗</a></li>)}</ul></details></details>
 </section>;
}
