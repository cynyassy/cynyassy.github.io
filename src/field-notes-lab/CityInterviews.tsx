import {useEffect, useRef, useState} from 'react';
import {places, type Language, type PlaceId} from './data';
import {durationLabel, timestamp, type ArchiveCatalogue, type ArchiveRecording, type ArchiveTranscript, type ArchiveReadingRequest} from './archive-types';
import './interviews.css';

const localArchive = import.meta.env.DEV && ['localhost','127.0.0.1','[::1]'].includes(location.hostname);
const endpoint = '/__field-notes-archive';
const transcripts = new Map<string,ArchiveTranscript>();
type Position = {section:number;language:Language};
function moveTo(element:HTMLElement|null,scroll:boolean){
  if(!element)return;
  element.focus({preventScroll:true});
  if(scroll)element.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
}

function InterviewReader({recording,initial,onRemember,onClose,suggestedTime}:{recording:ArchiveRecording;initial:Position;onRemember:(position:Position)=>void;onClose:()=>void;suggestedTime?:number}){
  const [data,setData]=useState<ArchiveTranscript|null>(()=>transcripts.get(recording.id)??null);
  const [error,setError]=useState(false),[attempt,setAttempt]=useState(0);
  const [language,setLanguage]=useState<Language>(initial.language),[section,setSection]=useState(initial.section);
  const [audioNote,setAudioNote]=useState('');
  const [audioEnabled,setAudioEnabled]=useState(false);
  const audio=useRef<HTMLAudioElement>(null),heading=useRef<HTMLHeadingElement>(null),sectionHeading=useRef<HTMLHeadingElement>(null);
  const pendingSeek=useRef<number|null>(null);
  const sectionFrame=useRef(0);
  useEffect(()=>{
    const frame=requestAnimationFrame(()=>moveTo(heading.current,true));
    return ()=>{cancelAnimationFrame(frame);cancelAnimationFrame(sectionFrame.current);};
  },[]);
  useEffect(()=>{const player=audio.current;return()=>player?.pause();},[audioEnabled]);
  useEffect(()=>{
    const cached=transcripts.get(recording.id);
    if(cached){setData(cached);return;}
    const controller=new AbortController();
    setError(false);
    void fetch(`${endpoint}/recordings/${recording.id}`,{signal:controller.signal,cache:'no-store'}).then(async response=>{
      if(!response.ok)throw new Error('Archive unavailable');
      const result=await response.json()as ArchiveTranscript;
      if(!controller.signal.aborted){transcripts.set(recording.id,result);setData(result);}
    }).catch(()=>{if(!controller.signal.aborted)setError(true);});
    return ()=>controller.abort();
  },[recording.id,attempt]);
  const count=Math.max(1,Math.ceil(recording.duration/600));
  const safeSection=Math.min(section,count-1),start=safeSection*600,end=Math.min(recording.duration,start+600);
  const rows=data?.passages.filter(passage=>passage.start>=start&&passage.start<end)??[];
  const changeSection=(value:number)=>{
    const next=Math.max(0,Math.min(count-1,value));setSection(next);onRemember({section:next,language});
    cancelAnimationFrame(sectionFrame.current);
    sectionFrame.current=requestAnimationFrame(()=>moveTo(sectionHeading.current,true));
  };
  const changeLanguage=(value:Language)=>{setLanguage(value);onRemember({section:safeSection,language:value});};
  const play=(time:number)=>{
    setAudioNote('');pendingSeek.current=time;
    if(!audioEnabled){setAudioEnabled(true);return;}
    const player=audio.current;if(!player)return;
    if(player.readyState>=1){player.currentTime=time;pendingSeek.current=null;}
    void player.play().catch(()=>setAudioNote('Audio could not start. Use the player controls or try again.'));
  };
  return <section className="fn-reader" aria-labelledby="fn-reader-title">
    <button type="button" className="fn-back" onClick={onClose}>← Back to the interview list</button>
    <header className="fn-reader-head"><p className="fl-kicker">Full interview draft / {durationLabel(recording.duration)}</p><h3 id="fn-reader-title" ref={heading} tabIndex={-1}>{recording.title}</h3><p className="fn-draft-note">Draft transcript and English rendering. Not checked against the audio. Speaker identities and unclear wording need review.</p></header>
    {suggestedTime!==undefined&&<p className="fn-suggested"><button type="button" className="fn-back" onClick={()=>play(suggestedTime)}>Play suggested passage · {timestamp(suggestedTime)}</button><span>Approximate start. Listen around the passage before confirming its context.</span></p>}
    {!audioEnabled?<button type="button" className="fn-back" onClick={()=>setAudioEnabled(true)}>Load recording · {durationLabel(recording.duration)}</button>:<audio ref={audio} controls preload="metadata" src={`${endpoint}/audio/${recording.id}`} aria-label={`Recording: ${recording.title}`} onLoadedMetadata={()=>{if(pendingSeek.current!==null&&audio.current){audio.current.currentTime=pendingSeek.current;pendingSeek.current=null;void audio.current.play().catch(()=>setAudioNote('Audio is ready. Press Play in the audio controls.'));}}} onError={()=>setAudioNote('The local recording is unavailable. You can still read the draft below.')}/>}
    {audioNote&&<p className="fn-audio-note" role="status">{audioNote}</p>}
    <div className="fn-reader-tools"><fieldset className="fl-segments"><legend>Transcript language</legend>{([['hi',recording.sourceLanguage==='hi'?'हिन्दी':'Original'],['en','English'],['both','Both']]as const).map(([value,label])=><button type="button" key={value} aria-pressed={language===value} onClick={()=>changeLanguage(value)} lang={value==='hi'&&recording.sourceLanguage==='hi'?'hi':'en'}>{label}</button>)}</fieldset><label className="fn-section-picker" htmlFor="fn-reading-section">Jump to a section<select id="fn-reading-section" value={safeSection} onChange={event=>changeSection(Number(event.target.value))}>{Array.from({length:count},(_,index)=><option key={index} value={index}>{timestamp(index*600)} – {timestamp(Math.min(recording.duration,(index+1)*600))}</option>)}</select></label></div>
    <div className="fn-section-heading"><h4 ref={sectionHeading} tabIndex={-1}>{timestamp(start)} – {timestamp(end)}</h4><span>Section {safeSection+1} of {count}</span><button type="button" onClick={()=>play(start)}>Play from here ↗</button></div>
    <p className="fn-time-note">Timestamps follow approximate recognition windows, not individual words. Every section of the full draft is available.</p>
    {!data&&!error&&<p className="fn-loading" role="status">Loading the interview…</p>}
    {error&&<div className="fn-load-error" role="alert"><p>The interview could not load from the local archive.</p><button type="button" onClick={()=>setAttempt(value=>value+1)}>Retry interview</button></div>}
    {data&&<div className={`fn-passages fn-language-${language}`}>
      <div className="fn-column-labels">{language!=='en'&&<span>{recording.sourceLanguage==='hi'?'हिन्दी / Original':'Original / mostly English'}</span>}{language!=='hi'&&<span>{recording.sourceLanguage==='hi'?'English translation':'English reading copy'}</span>}</div>
      {rows.map((passage,index)=><article className="fn-passage" key={`${passage.start}-${index}`} aria-label={`Passage at ${timestamp(passage.start)}`}><button type="button" className="fn-time-button" onClick={()=>play(passage.start)} aria-label={`Play audio from ${timestamp(passage.start)}`}>{timestamp(passage.start)} <span aria-hidden="true">↗</span></button><div className="fn-passage-columns">{language!=='en'&&<p lang={recording.sourceLanguage}>{passage.original}</p>}{language!=='hi'&&<p lang="en">{passage.english}</p>}</div></article>)}
    </div>}
    <nav className="fn-pagination" aria-label="Interview sections"><button type="button" onClick={()=>changeSection(safeSection-1)} disabled={safeSection===0}>← Previous section</button><span>{safeSection+1} / {count}</span><button type="button" onClick={()=>changeSection(safeSection+1)} disabled={safeSection===count-1}>Next section →</button></nav>
    <button type="button" className="fn-back" onClick={onClose}>← Return to the interview list</button>
  </section>;
}

export function CityInterviews({cityId,selection,language,request,compact=false}:{cityId:PlaceId;selection:number;language:Language;request?:ArchiveReadingRequest;compact?:boolean}){
  const [catalogue,setCatalogue]=useState<ArchiveCatalogue|null>(null),[error,setError]=useState(false),[attempt,setAttempt]=useState(0);
  const [opened,setOpened]=useState<{id:string;cityId:PlaceId;suggestedTime?:number;serial?:number}|null>(null);
  const heading=useRef<HTMLHeadingElement>(null),origin=useRef<HTMLButtonElement|null>(null);
  const positions=useRef(new Map<string,Position>());
  const returnFrame=useRef(0);
  const handledRequest=useRef(0);
  const place=places.find(item=>item.id===cityId)!;
  useEffect(()=>{
    const controller=new AbortController();setError(false);
    void fetch(localArchive?endpoint+'/catalogue':'/content/unicef-places.json',{signal:controller.signal,cache:localArchive?'no-store':'default'}).then(async response=>{
      if(!response.ok)throw new Error('Archive unavailable');
      const result=await response.json()as ArchiveCatalogue;if(!controller.signal.aborted)setCatalogue(result);
    }).catch(()=>{if(!controller.signal.aborted)setError(true);});
    return ()=>controller.abort();
  },[attempt]);
  useEffect(()=>{
    setOpened(null);
    cancelAnimationFrame(returnFrame.current);
  },[cityId]);
  useEffect(()=>()=>cancelAnimationFrame(returnFrame.current),[]);
  useEffect(()=>{
    if(!selection)return;
    const frame=requestAnimationFrame(()=>moveTo(heading.current,matchMedia('(max-width: 760px)').matches));
    return ()=>cancelAnimationFrame(frame);
  },[cityId,selection]);
  useEffect(()=>{
    if(!request||!catalogue||request.serial===handledRequest.current||(request.cityId!==null&&request.cityId!==cityId))return;
    const item=catalogue.recordings.find(item=>item.id===request.recordingId);
    if(!item)return;
    handledRequest.current=request.serial;origin.current=request.origin;
    const time=Math.max(0,Math.min(item.duration-.1,request.startSeconds));
    positions.current.set(item.id,{section:Math.floor(time/600),language:'both'});
    setOpened({id:item.id,cityId,suggestedTime:time,serial:request.serial});
  },[request,catalogue,cityId]);
  const interviews=catalogue?.recordings.filter(item=>item.cityId===cityId)??[];
  const unplaced=catalogue?.recordings.filter(item=>item.cityId===null)??[];
  const city=catalogue?.cities[cityId];
  const recording=opened?.cityId===cityId?catalogue?.recordings.find(item=>item.id===opened.id):undefined;
  const open=(item:ArchiveRecording,button:HTMLButtonElement)=>{origin.current=button;setOpened({id:item.id,cityId});};
  const close=()=>{setOpened(null);cancelAnimationFrame(returnFrame.current);returnFrame.current=requestAnimationFrame(()=>{const button=origin.current;if(button?.isConnected){button.focus({preventScroll:true});button.scrollIntoView({block:'nearest',behavior:'instant'});}});};
  function cards(items:ArchiveRecording[]){const Title=compact?'h5':'h4';return <div className="fn-interview-cards">{items.map(item=><article key={item.id}><div className="fn-card-meta"><span>{durationLabel(item.duration)}</span><span>{item.sourceLanguage==='hi'?'Hindi + English':'Mostly English'}</span></div><Title>{item.title}</Title>{!compact&&<p>{item.description}</p>}<button type="button" onClick={event=>open(item,event.currentTarget)} aria-label={`Read ${item.title}`}>{compact?'Read interview':'Read full interview'} <span aria-hidden="true">↗</span></button></article>)}</div>;}
  return <section id="city-interviews" className="fn-city" data-city={cityId} aria-labelledby="fn-city-heading">
    {!compact&&<div className="fl-section-top"><p className="fl-kicker">Conversations from this stop</p><span className="fn-private-tag">Local research preview</span></div>}
    <header className="fn-city-heading"><h3 id="fn-city-heading" ref={heading} tabIndex={-1}><span lang="hi">{place.hi}</span><span>{place.en}</span></h3>{catalogue&&localArchive&&<p aria-live="polite">{interviews.length} {interviews.length===1?'recording':'recordings'} · {durationLabel(interviews.reduce((total,item)=>total+item.duration,0))}</p>}</header>
    {city&&(compact?<div className="fn-city-brief"><p className="fn-summary-label">Conversation summary · draft</p>{(city.paragraphs??[city.summary]).map((paragraph,index)=><p key={index}>{paragraph}</p>)}</div>:<div className="fn-city-summary"><div><p className="fn-summary-label">Working summary from draft transcripts</p>{(city.paragraphs??[city.summary]).map((paragraph,index)=><p key={index}>{paragraph}</p>)}<p className="fn-city-focus">{city.focus}</p></div><aside><p className="fn-summary-label">For your recollection</p><p>{city.reflection}</p></aside></div>)}
    {!localArchive&&<p className="fn-public-note">The full recordings and transcripts remain in my private research archive.</p>}
    {!catalogue&&!error&&<p className="fn-loading" role="status">{localArchive?'Loading the local interview index…':'Loading the city notes…'}</p>}
    {error&&<div className="fn-load-error" role="alert"><p>{localArchive?'The local archive is unavailable. Check that Crucial is connected, then retry.':'The city notes could not load. Please try again.'}</p><button type="button" onClick={()=>setAttempt(value=>value+1)}>Retry {localArchive?'archive':'city notes'}</button></div>}
    {catalogue&&localArchive&&<><div className="fn-list-heading"><h4>Interviews & translations</h4>{!compact&&<p>Full drafts, with original-language text, English and audio.</p>}</div>{cards(interviews)}<details className="fn-other-recordings"><summary>Other recordings · {unplaced.length} awaiting location confirmation</summary><p>These files stay accessible without assigning them to an unconfirmed place.</p>{cards(unplaced)}</details></>}
    {recording&&<InterviewReader key={`${recording.id}-${opened?.serial??0}`} recording={recording} initial={positions.current.get(recording.id)??{section:0,language}} suggestedTime={opened?.suggestedTime} onRemember={position=>positions.current.set(recording.id,position)} onClose={close}/>}
  </section>;
}
