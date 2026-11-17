import {createRoot} from 'react-dom/client';
import {PortfolioHeader} from '../src/shared/PortfolioHeader';
import {FieldMap} from '../src/field-notes-lab/FieldMap';
import {MapAttribution} from '../src/field-notes-lab/MapAttribution';
import {chapters,reflection} from './content';
import {useFeaturedExcerpts} from './useFeaturedExcerpts';
import '../src/field-notes-lab/fonts.css';
import '../src/field-notes-lab/study.css';
import './story.css';

function FieldworkStory(){
 const {excerpts,failed,local}=useFeaturedExcerpts();
 return <div className="field-lab unicef-story">
  <a className="fl-skip" href="#story-content">Skip to the fieldwork story</a><PortfolioHeader/>
  <main id="story-content">
   <header className="uf-opening">
    <div className="uf-opening-top"><p className="fl-kicker">UNICEF / Fieldwork / 2016</p>{import.meta.env.DEV&&<span className="uf-local">Local case-study draft</span>}</div>
    <div className="uf-opening-grid"><div><h1>Listening to the people behind polio eradication</h1><p className="uf-deck">UNICEF commissioned me to document the Social Mobilization Network’s contribution to polio eradication in India. I travelled across western Uttar Pradesh to interview the people doing that work.</p></div><aside><span lang="hi" className="uf-opening-word">बातचीत</span><span>Conversations</span></aside></div>
    <div className="uf-opening-foot"><p><span className="uf-label">My role</span>Field interviews, photography, documentation and writing</p></div>
    <nav className="uf-nav" aria-label="Case study"><a href="#map">Explore the conversations ↓</a></nav>
   </header>

   <FieldMap language="both" story/>

   <section className="uf-about" aria-labelledby="fieldwork-about-heading"><h3 id="fieldwork-about-heading">About the fieldwork</h3><div><p>I arranged meetings by city using contacts supplied for the assignment. I first met many of the people at a conference in Greater Noida.</p><p>With a DSLR, my phone and recording equipment, I drove between meetings for roughly two to three weeks, photographing, interviewing and bringing the accounts together in writing.</p></div></section>

   {chapters.map(chapter=><section className={`uf-chapter uf-accent-${chapter.accent}`} key={chapter.id} id={chapter.id} aria-labelledby={`${chapter.id}-heading`}>
    <div className="uf-chapter-heading"><h2 id={`${chapter.id}-heading`}>{chapter.title}</h2><div className="uf-word"><span lang="hi">{chapter.word}</span><span>{chapter.wordMeaning}</span></div></div>
    {excerpts.filter(excerpt=>excerpt.chapterId===chapter.id).map(excerpt=><blockquote className="uf-featured-excerpt" key={excerpt.id}><p lang="hi">"... {excerpt.hi} ..."</p><p lang="en">{excerpt.en}</p></blockquote>)}
    {!excerpts.length&&<p className="uf-passage-pending">{failed?'Interview excerpts could not load. Please refresh to try again.':local?'Loading interview excerpts…':'Interview excerpts are available in the local draft.'}</p>}
   </section>)}

   <section id="driving-home" className="uf-reflection" aria-labelledby="reflection-heading"><div><h2 id="reflection-heading">Driving home</h2><p className="uf-reflection-note">Returning from Aligarh</p><span className="uf-giving" lang="hi">देना</span><span className="uf-giving-caption">to give</span></div><div className="uf-reflection-copy">{reflection.map((paragraph,index)=><p key={index}>{paragraph}</p>)}<a href="/projects/cynyassy.html">Read about Cynyassy ↗</a></div></section>

   <footer className="uf-footer"><div className="fl-footer"><a href="#map">Back to the map ↑</a><a href="/#projects">← Back to the portfolio</a><a href="/#contact">Get in touch ↗</a></div>{excerpts.length>0&&<p className="uf-excerpt-note">Excerpts edited for readability from transcript drafts. Audio checking is pending.</p>}<MapAttribution/></footer>
  </main>
 </div>;
}
createRoot(document.getElementById('root')!).render(<FieldworkStory/>);
