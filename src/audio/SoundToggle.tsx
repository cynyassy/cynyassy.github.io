import { useEffect, useState } from 'react';
import type { SoundState } from './sound';
import './sound.css';
export function SoundToggle() {
 const [state,setState]=useState<SoundState | null>(null);
 useEffect(()=>{
  let unsubscribe: (()=>void) | undefined;
  const connect=()=>{unsubscribe?.();const engine=window.CynyassyAudio;if(engine?.getState){setState(engine.getState());unsubscribe=engine.subscribe(setState);}};
  window.addEventListener('cynyassy:audio-ready',connect);connect();
  return ()=>{unsubscribe?.();window.removeEventListener('cynyassy:audio-ready',connect);};
 },[]);
 const available=state?.available??false;
 return <div className="portfolio-sound"><button id="sound" type="button" data-sound-toggle disabled={!available} aria-pressed={available&&state?.enabled} aria-label={available?`Sound ${state?.enabled?'on. Mute sound':'off. Unmute sound'}`:'Sound unavailable'} onClick={()=>window.CynyassyAudio?.setEnabled(!state?.enabled)}>Sound: {available?(state?.enabled?'On':'Off'):'unavailable'}</button><span className="sound-announcement" role="status">{state?.message}</span></div>;
}
