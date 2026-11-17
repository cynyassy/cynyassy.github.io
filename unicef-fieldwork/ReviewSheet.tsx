import {useEffect,useState} from 'react';
import {timestamp,type ExcerptDraft,type ExcerptCandidate} from '../src/field-notes-lab/archive-types';

export function ReviewSheet({onOpen}:{onOpen:(candidate:ExcerptCandidate,origin:HTMLButtonElement)=>void}){
 const [drafts,setDrafts]=useState<ExcerptDraft[]|null>(null),[error,setError]=useState(false),[attempt,setAttempt]=useState(0);
 const local=import.meta.env.DEV&&['localhost','127.0.0.1','[::1]'].includes(location.hostname);
 useEffect(()=>{
  if(!local||drafts)return;
  const controller=new AbortController();setError(false);
  void fetch('/__field-notes-archive/excerpts',{signal:controller.signal,cache:'no-store'}).then(async response=>{if(!response.ok)throw new Error('Unavailable');const result=await response.json()as ExcerptDraft[];if(!controller.signal.aborted)setDrafts(result);}).catch(()=>{if(!controller.signal.aborted)setError(true);});
  return()=>controller.abort();
 },[local,drafts,attempt]);
 return <section className="uf-review-sheet" aria-labelledby="review-sheet-heading">
  <h2 id="review-sheet-heading">Six candidate passages</h2>
  <p className="uf-review-intro">Working text for listening and correction. These are machine drafts, not approved quotations. Check the audio, translation, speaker and surrounding conversation. Publication suitability is a separate decision.</p>
  {!local&&<p>The review sheet is available in the local development preview only.</p>}
  {local&&!drafts&&!error&&<p role="status">Loading candidate drafts…</p>}
  {error&&<div role="alert"><p>The private drafts could not load.</p><button type="button" onClick={()=>setAttempt(value=>value+1)}>Retry review sheet</button></div>}
  {drafts?.map(draft=><article key={draft.id} className="uf-review-item">
   <p className="fl-kicker">{draft.recordingId} · {timestamp(draft.start)}–{timestamp(draft.end)} · awaiting review</p>
   <h3>{draft.title}</h3><p>{draft.question}</p>
   <button type="button" onClick={event=>onOpen(draft,event.currentTarget)}>Open recording at {timestamp(draft.start)} ↗</button>
   <div className="uf-review-drafts">{draft.passages.map((passage,index)=><div key={index}><span className="uf-review-time">{timestamp(passage.start)} / approximate recognition window</span><div><p lang="hi">{passage.original}</p><p lang="en">{passage.english}</p></div></div>)}</div>
  </article>)}
 </section>;
}
