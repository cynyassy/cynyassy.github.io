import { IGNITION_SAFE } from '../reactor-puzzles';

export function IgnitionControls({charge,matched,manual,locked,reducedMotion,submitLabel,onModeChange,onCharge,onSubmit}:{
 charge:number;matched:boolean;manual:boolean;locked:boolean;reducedMotion:boolean;submitLabel:string;
 onModeChange:(manual:boolean)=>void;onCharge:(value:number)=>void;onSubmit:()=>void;
}){
 // Never display an in-band integer while the actual value is outside the accepted band.
 const display=matched?Math.round(charge):charge<IGNITION_SAFE[0]?Math.floor(charge):Math.ceil(charge);
 return <div className="ix-controls ix-ignition-controls">
  <div className="ix-charge-readout"><span>Core charge</span><output aria-live="off">{display}%</output></div>
  <p className="ix-charge-state">{matched?'Inside safe band.':'Wait for the safe band.'}</p>
  <div className="ix-charge-track" role="img" aria-label={'Charge '+display+' percent. Safe ignition from '+IGNITION_SAFE[0]+' to '+IGNITION_SAFE[1]+' percent.'}>
   <div className="ix-charge-safe" style={{left:IGNITION_SAFE[0]+'%',width:IGNITION_SAFE[1]-IGNITION_SAFE[0]+'%'}}>SAFE</div>
   <i className="ix-charge-pointer" style={{left:charge+'%'}} aria-hidden="true"/>
  </div>
  <div className="ix-charge-ruler" aria-hidden="true"><span>0</span><span style={{left:IGNITION_SAFE[0]+'%'}}>{IGNITION_SAFE[0]}</span><span style={{left:IGNITION_SAFE[1]+'%'}}>{IGNITION_SAFE[1]}</span><span>100%</span></div>
  <div className="ix-timing-mode"><span>{manual?'Manual timing':'0 → 100 → 0 · 6 seconds'}</span>
   {!reducedMotion&&<button className="ix-text" disabled={locked} aria-pressed={manual} onClick={()=>onModeChange(!manual)}>{manual?'Use moving meter':'Use manual timing'}</button>}
  </div>
  {!manual&&!reducedMotion&&<p className="da-small">Prefer a still meter? Use manual timing to set the charge yourself.</p>}
  {manual&&<label className="ix-manual-charge" htmlFor="ix-ignition-charge">Set charge
   <input id="ix-ignition-charge" type="range" min="0" max="100" step="1" value={charge} aria-describedby="ix-ignition-clue"
    data-active={!locked&&!matched} disabled={locked} onChange={e=>onCharge(Number(e.target.value))}/>
  </label>}
  <div className="ix-actions ix-code-actions"><button className="ix-connect" data-active={!locked&&(!manual||matched)} disabled={locked} onClick={onSubmit}>{submitLabel}<span aria-hidden="true">↗</span></button></div>
 </div>;
}
