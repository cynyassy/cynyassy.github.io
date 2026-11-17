import {useRef,useState} from 'react';
import {createRoot} from 'react-dom/client';
import {PortfolioHeader} from '../src/shared/PortfolioHeader';
import {FieldMap} from '../src/field-notes-lab/FieldMap';
import {MapAttribution} from '../src/field-notes-lab/MapAttribution';
import type {ArchiveReadingRequest,ExcerptCandidate} from '../src/field-notes-lab/archive-types';
import {ReviewSheet} from './ReviewSheet';
import '../src/field-notes-lab/fonts.css';
import '../src/field-notes-lab/study.css';
import './story.css';
import './review.css';

function ReviewWorkspace(){
 const [request,setRequest]=useState<ArchiveReadingRequest>();
 const serial=useRef(0);
 const open=(candidate:ExcerptCandidate,origin:HTMLButtonElement)=>setRequest({recordingId:candidate.recordingId,cityId:candidate.cityId,startSeconds:candidate.start,serial:++serial.current,origin});
 return <div className="field-lab unicef-story uf-workspace"><a className="fl-skip" href="#review-sheet-heading">Skip to candidate passages</a><PortfolioHeader/><main>
  <header className="uf-review-header"><p className="fl-kicker">Local editorial workspace</p><h1>Interview review</h1><nav aria-label="Review workspace"><a href="/projects/unicef-fieldwork.html">← Case-study draft</a><a href="/projects/field-notes-lab.html">Typography experiment ↗</a></nav></header>
  <ReviewSheet onOpen={open}/>
  <FieldMap language="both" story request={request}/>
  <footer className="uf-footer"><MapAttribution/></footer>
 </main></div>;
}
createRoot(document.getElementById('root')!).render(<ReviewWorkspace/>);
