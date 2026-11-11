import { PortfolioFooter } from '../../shared/PortfolioFooter';
import { PortfolioHeader } from '../../shared/PortfolioHeader';
import { useEffect, useId, useState } from 'react';
import type { CSSProperties } from 'react';
import { themes } from '../content';
import { ChoiceMenu } from '../ChoiceMenu';
import { reactorArtwork } from '../reactor-artwork';
import type { ThemeId } from '../types';
import { accentInk, defaultRemix, parseStudio, studioURL } from './config';
import type { Remix, StudioConfig } from './config';
import '../styles.css';
import './studio.css';

const fonts = { sans: 'Arial, Helvetica, sans-serif', serif: 'Georgia, serif', mono: "'Courier New', monospace" };
const fontNames = { theme: 'Style default', sans: 'Sans-serif', serif: 'Serif', mono: 'Monospace' };
const buttonNames = { solid: 'Solid', outline: 'Outlined', soft: 'Soft' };
function Artwork({theme}:{theme:ThemeId}) {
 const art = reactorArtwork(theme);
 return <picture><source media="(max-width:600px)" srcSet={art.mobile}/><img src={art.desktop} alt={art.alt} width="2170" height="725"/></picture>;
}
export default function StyleStudio() {
 const [initial] = useState(()=>parseStudio(window.location.search));
 const [config,setConfig] = useState<StudioConfig>(initial.config);
 const [opened,setOpened] = useState(false), [message,setMessage] = useState(''), [shareLink,setShareLink] = useState('');
 const menu = useId();
 useEffect(()=>{if(window.location.hash==='#shortlist')document.getElementById('shortlist')?.scrollIntoView({block:'start'});},[]);
 const selected = themes.find(t=>t.id===config.theme)!;
 const remix = config.remixes[config.theme] ?? defaultRemix(config.theme);
 const shortlisted = config.picks.includes(config.theme);
 const full = config.picks.length===3;
 useEffect(()=>{setOpened(false);},[config.theme,remix.accent,remix.font,remix.button]);
 // A previously copied URL must not be mistaken for the current edited brief.
 useEffect(()=>{setShareLink('');setMessage('');},[config]);
 function update(patch:Partial<Remix>) {
  setConfig(c=>({...c,remixes:{...c.remixes,[c.theme]:{...(c.remixes[c.theme]??defaultRemix(c.theme)),...patch}}}));
 }
 function togglePick() {
  setConfig(c=>({...c,picks:c.picks.includes(c.theme)?c.picks.filter(id=>id!==c.theme):c.picks.length<3?[...c.picks,c.theme]:c.picks}));
 }
 async function share() {
  const url=studioURL(window.location.href,config); setShareLink(url);
  try { if(!navigator.clipboard?.writeText)throw new Error();await navigator.clipboard.writeText(url);setMessage('Link copied. It includes your picks, adjustments and notes.'); }
  catch {setMessage('Copy the link below. It includes your picks, adjustments and notes.');}
 }
 const previewStyle = {
  '--studio-accent':remix.accent,'--studio-accent-ink':accentInk(remix.accent),
  ...(remix.font==='theme'?{}:{'--heading':fonts[remix.font],'--body':fonts[remix.font]}),
 } as CSSProperties;
 return <div className="style-studio">
 <a className="studio-skip" href="#studio-main">Skip to studio</a>
 <PortfolioHeader /><nav className="portfolio-section-nav" aria-label="Studio navigation"><a href="design-adventure.html">Back to Design Adventure</a><a href="#shortlist">Your shortlist ({config.picks.length}/3)</a></nav>
 <main id="studio-main">
  <div className="studio-intro"><p className="studio-eyebrow">STYLE STUDIO</p><h1>Find a look that feels right.</h1><p>Try a style. Change a detail. Pick three favourites to start a conversation about your next website.</p></div>
  {initial.notice&&<p className="studio-notice" role="status">{initial.notice}</p>}
  <div className="studio-workspace">
   <section className="studio-editor" aria-labelledby="remix-heading"><h2 id="remix-heading">Make it yours</h2>
    <div className="studio-field"><span id={menu+'-label'}>Visual style</span><ChoiceMenu id={menu} label="Visual style" value={config.theme} options={themes.map(t=>({value:t.id,label:t.name}))} onChange={id=>setConfig(c=>({...c,theme:id as ThemeId}))}/></div>
    <div className="studio-field"><label htmlFor="studio-accent">Accent colour</label><div className="studio-colour"><input id="studio-accent" type="color" value={remix.accent} onChange={e=>update({accent:e.target.value})}/><span>{remix.accent.toUpperCase()}</span></div><p>Changes the demo button, marker and progress bar. The artwork stays as drawn.</p></div>
    <div className="studio-field"><label htmlFor="studio-font">Typography</label><select id="studio-font" value={remix.font} onChange={e=>update({font:e.target.value as Remix['font']})}>{Object.entries(fontNames).map(([value,label])=><option key={value} value={value}>{label}</option>)}</select></div>
    <fieldset className="studio-field"><legend>Button treatment</legend><div className="studio-segments">{Object.entries(buttonNames).map(([value,label])=><button key={value} aria-pressed={remix.button===value} onClick={()=>update({button:value as Remix['button']})}>{label}</button>)}</div></fieldset>
    <button className="studio-text-button" onClick={()=>setConfig(c=>({...c,remixes:{...c.remixes,[c.theme]:defaultRemix(c.theme)}}))}>Reset this style’s adjustments</button>
    <button className="studio-primary" disabled={full&&!shortlisted} onClick={togglePick}>{shortlisted?'Remove from shortlist':'Add to shortlist'}</button>
    {full&&!shortlisted&&<p className="studio-small">You have three picks. Remove one below to make room.</p>}
    <p className="studio-small">This is a visual remix, not a change to the game’s rules. Your adjustments stay here; the adventure opens in its original treatment.</p>
   </section>
   <section className="studio-demo" aria-label="Your remixed interface">
    <div className="da-page studio-preview" data-theme={config.theme} style={previewStyle}>
     <p className="studio-demo-label"><i aria-hidden="true"/> YOUR REMIX · {selected.name}</p>
     <h2>A small change. A different feeling.</h2><p className="studio-demo-definition">{selected.vocabulary}</p>
     <div className="studio-art"><Artwork theme={config.theme}/></div>
     <div className="studio-demo-actions"><button className="studio-demo-button" data-treatment={remix.button} onClick={()=>setOpened(true)}>{opened?'Preview open ✓':'Open preview →'}</button><button className="studio-demo-secondary" onClick={()=>setOpened(false)}>Reset preview</button></div>
     <p className="studio-demo-status" role="status">{opened?'The preview is open. Notice how the button tells you what happened.':'Try the button. Notice what makes it look clickable.'}</p>
     <div className="studio-demo-progress" aria-hidden="true"><i style={{width:opened?'100%':'32%'}}/></div>
    </div>
    <div className="studio-demo-caption"><p>The same content and interaction, with your visual choices.</p><a href={'design-adventure.html?theme='+config.theme} target="_blank" rel="noopener noreferrer">Play the original {selected.name} adventure ↗</a></div>
    <details className="studio-style-notes"><summary>About {selected.name}</summary><p>{selected.context}</p><p>{selected.tradeoff}</p><ul>{selected.sources.map(source=><li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label} ↗</a></li>)}</ul></details>
   </section>
  </div>
  <section id="shortlist" className="studio-shortlist" aria-labelledby="shortlist-heading"><div className="studio-shortlist-heading"><div><p className="studio-eyebrow">A STARTING POINT FOR A CONVERSATION</p><h2 id="shortlist-heading">Your style shortlist <span>{config.picks.length}/3</span></h2></div><button className="studio-primary" disabled={!config.picks.length} onClick={share}>Copy shortlist link</button></div>
   <p>These are directions to explore, not a finished website brief. Add a note about what you like in each one.</p>
   {!config.picks.length&&<div className="studio-empty">Nothing picked yet. Add a style above, then try another.</div>}
   <div className="studio-picks">{config.picks.map(id=>{
    const theme=themes.find(t=>t.id===id)!; const variant=config.remixes[id]??defaultRemix(id);
    return <article key={id} className="studio-pick"><Artwork theme={id}/><div className="studio-pick-body"><h3>{theme.name}</h3><p className="studio-pick-settings"><i style={{background:variant.accent}} aria-hidden="true"/>{variant.accent.toUpperCase()} · {fontNames[variant.font]} · {buttonNames[variant.button]}</p><label htmlFor={'note-'+id}>What do you like about it? <span>(optional)</span></label><textarea id={'note-'+id} maxLength={160} rows={2} value={config.notes[id]??''} onChange={e=>{const value=e.target.value;setConfig(c=>({...c,notes:{...c.notes,[id]:value}}));}}/><div className="studio-pick-actions"><button onClick={()=>{setConfig(c=>({...c,theme:id}));document.getElementById(menu)?.focus();document.getElementById('remix-heading')?.scrollIntoView({block:'start'});}}>View &amp; adjust</button><button aria-label={'Remove '+theme.name+' from shortlist'} onClick={()=>setConfig(c=>({...c,picks:c.picks.filter(value=>value!==id)}))}>Remove</button></div></div></article>;
   })}</div>
   <div className="studio-project"><label htmlFor="studio-project">What are you making? <span>(optional)</span></label><textarea id="studio-project" rows={2} maxLength={240} placeholder="A portfolio, a café website, a tool…" value={config.project} onChange={e=>{const value=e.target.value;setConfig(c=>({...c,project:value}));}}/><p className="studio-small">The share link includes your picks, visual adjustments and these notes. Nothing is sent until you share the link yourself.</p></div>
   <p className="studio-share-status" role="status">{message}</p>
   {shareLink&&<label className="studio-shared-link">Your shortlist link<input readOnly value={shareLink} onFocus={e=>e.target.select()}/></label>}
  </section>
 </main>
 <PortfolioFooter project="Design Adventure" href="design-adventure.html" connection="Try your chosen style in a playable interface and notice what changes." />
 </div>;
}
