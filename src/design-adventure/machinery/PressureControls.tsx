import { PRESSURE_SAFE } from '../reactor-puzzles';
import type { PuzzleState } from '../reactor-puzzles';

type PressureSettings=Pick<PuzzleState,'pressure'|'inlet'|'vent'|'stableMs'>;
type NextControl='inlet'|'vent'|'lock'|null;

export function pressureGuidance(p:PressureSettings,ready:boolean):{next:NextControl;message:string}{
 if(ready)return {next:'lock',message:'That’s two seconds. Lock the stabiliser.'};
 if(p.pressure<PRESSURE_SAFE[0]){
  if(p.vent)return {next:'vent',message:'Close the vent to build pressure.'};
  return {next:'inlet',message:p.inlet?'Pressure is rising. Close the inlet near 50 kPa.':'Open the inlet to raise pressure.'};
 }
 if(p.pressure>PRESSURE_SAFE[1]){
  if(p.inlet)return {next:'inlet',message:'Close the inlet to stop raising pressure.'};
  return {next:'vent',message:p.vent?'Pressure is falling. Close the vent near 50 kPa.':'Open the vent to release pressure.'};
 }
 if(p.inlet&&p.vent)return {next:null,message:'Balanced flow. Hold the band for two seconds.'};
 if(p.inlet)return {next:'inlet',message:'Close the inlet near 50 kPa to hold the pressure.'};
 if(p.vent)return {next:'vent',message:'Close the vent to hold the band.'};
 return {next:null,message:'Keep it in range. Pressure falls slowly when both valves are closed.'};
}

export function PressureControls({puzzles,matched,locked,submitLabel,onToggle,onReset,onSubmit}:{
 puzzles:PressureSettings;matched:boolean;locked:boolean;submitLabel:string;
 onToggle:(kind:'inlet'|'vent')=>void;onReset?:()=>void;onSubmit:()=>void;
}){
 const {pressure,inlet,vent,stableMs}=puzzles;
 const guide=pressureGuidance(puzzles,matched);
 const inside=pressure>=PRESSURE_SAFE[0]&&pressure<=PRESSURE_SAFE[1];
 const display=(inside?Math.round(pressure*10)/10:pressure<PRESSURE_SAFE[0]?Math.floor(pressure*10)/10:Math.ceil(pressure*10)/10).toFixed(1);
 return <div className="ix-controls ix-pressure-controls">
  <div className="ix-charge-readout"><span>Live pressure</span><output aria-live="off">{display}<small> kPa</small></output></div>
  <p className="ix-charge-state">{inside?'Inside operating band.':'Target: '+PRESSURE_SAFE[0]+'–'+PRESSURE_SAFE[1]+' kPa.'}</p>
  <div className="ix-charge-track" role="img" aria-label={'Pressure '+display+' kilopascals. Operating band '+PRESSURE_SAFE[0]+' to '+PRESSURE_SAFE[1]+'.'}>
   <div className="ix-charge-safe" style={{left:PRESSURE_SAFE[0]+'%',width:PRESSURE_SAFE[1]-PRESSURE_SAFE[0]+'%'}}/>
   <i className="ix-charge-pointer" style={{left:pressure+'%'}} aria-hidden="true"/>
  </div>
  <div className="ix-charge-ruler" aria-hidden="true"><span>0</span><span style={{left:PRESSURE_SAFE[0]+'%'}}>{PRESSURE_SAFE[0]}</span><span style={{left:PRESSURE_SAFE[1]+'%'}}>{PRESSURE_SAFE[1]}</span><span>100 kPa</span></div>
  <div className="ix-pressure-valves" role="group" aria-label="Pressure valves">
   {([{kind:'inlet',open:inlet,name:'Inlet valve',effect:'Raise pressure'},{kind:'vent',open:vent,name:'Vent valve',effect:'Release pressure'}] as const).map(valve=><button key={valve.kind}
    aria-label={valve.name} aria-pressed={valve.open} disabled={locked} data-active={!locked&&guide.next===valve.kind} onClick={()=>onToggle(valve.kind)}>
    <span>{valve.name}</span><i className="ix-valve-wheel" aria-hidden="true"><i/></i><small>{valve.open?'OPEN':'CLOSED'}</small><span className="ix-valve-effect">{valve.effect}</span>
   </button>)}
  </div>
  <div className="ix-pressure-hold"><span>Stable hold</span><span>{(Math.floor(stableMs/100)/10).toFixed(1)} / 2 seconds</span>
   <progress aria-label="Stable pressure hold" max="2000" value={stableMs}/>
  </div>
  <div className="ix-actions"><button className="ix-connect" data-active={!locked&&guide.next==='lock'} disabled={locked} onClick={onSubmit}>{submitLabel}<span aria-hidden="true">↗</span></button>
   {onReset&&<button className="ix-reset" disabled={locked} onClick={onReset}>Reset pressure</button>}</div>
 </div>;
}
