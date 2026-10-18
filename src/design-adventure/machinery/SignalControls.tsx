import { useMemo } from 'react';
import { REFERENCE_HZ } from '../reactor-puzzles';

function waveform(frequency:number){
 return Array.from({length:121},(_,i)=>`${i?'L':'M'}${i*3},${(50+Math.sin(i*frequency/250)*28).toFixed(2)}`).join(' ');
}
const referenceWave=waveform(REFERENCE_HZ);

export function SignalControls({frequency,matched,locked,submitLabel,onChange,onSubmit}:{
 frequency:number;matched:boolean;locked:boolean;submitLabel:string;onChange:(value:number)=>void;onSubmit:()=>void;
}){
 const liveWave=useMemo(()=>waveform(frequency),[frequency]);
 return <div className="ix-controls ix-signal-controls">
  <svg className="ix-signal-scope" viewBox="0 0 360 100" role="img" aria-label={'Reference and live signal waveforms. Reference '+REFERENCE_HZ+' hertz; live '+frequency+' hertz.'}>
   <path className="ix-scope-grid" d="M0 20H360M0 50H360M0 80H360M60 0V100M120 0V100M180 0V100M240 0V100M300 0V100"/>
   <path className="ix-reference-wave" d={referenceWave}/><path className="ix-live-wave" d={liveWave}/>
  </svg>
  <div className="ix-wave-key"><span>— Reference · {REFERENCE_HZ} Hz</span><span>┄ Live signal</span></div>
  <label className="ix-frequency-label" htmlFor="ix-frequency">Live frequency <output>{frequency} Hz</output></label>
  <div className="ix-frequency-row">
   <button className="ix-fine-tune" aria-label="Decrease frequency" disabled={locked||frequency===0} onClick={()=>onChange(frequency-1)}>−</button>
   <input id="ix-frequency" aria-label="Containment frequency" aria-describedby="ix-signal-clue" aria-valuetext={frequency+' hertz; reference '+REFERENCE_HZ+' hertz'}
    type="range" min="0" max="100" step="1" value={frequency} data-active={!locked&&!matched} disabled={locked} onChange={e=>onChange(Number(e.target.value))}/>
   <button className="ix-fine-tune" aria-label="Increase frequency" disabled={locked||frequency===100} onClick={()=>onChange(frequency+1)}>+</button>
  </div>
  <div className="ix-actions ix-code-actions"><button className="ix-connect" data-active={!locked&&matched} disabled={locked} onClick={onSubmit}>{submitLabel}<span aria-hidden="true">↗</span></button></div>
 </div>;
}
