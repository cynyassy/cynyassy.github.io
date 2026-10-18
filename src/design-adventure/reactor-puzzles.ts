export const POWER_ORDER = [1, 0, 2] as const;
export const PUMP_CODE = '427';
export const PIPE_ROUTE = [3, 1, 2] as const;
export const REFERENCE_HZ = 62;
export const IGNITION_SAFE = [65, 85] as const;
export const PRESSURE_SAFE = [45, 55] as const;
export interface PuzzleState {
 switches: number[]; code: string; pipes: number[]; frequency: number;
 ignitionElapsed: number; manualTiming: boolean; manualCharge: number;
 pressure: number; inlet: boolean; vent: boolean; stableMs: number;
}
export function initialPuzzles(): PuzzleState {
 return { switches: [], code: '', pipes: [0,0,0], frequency: 28, ignitionElapsed: 0, manualTiming: false, manualCharge: 0, pressure: 38, inlet: false, vent: false, stableMs: 0 };
}
export function copyPuzzles(p: PuzzleState): PuzzleState { return { ...p, switches: [...p.switches], pipes: [...p.pipes] }; }
export type PuzzleInput =
 | { kind: 'switch'; index: number } | { kind: 'switch-reset' }
 | { kind: 'code'; value: string } | { kind: 'pipe'; index: number }
 | { kind: 'frequency'; value: number }
 | { kind: 'timing-mode'; manual: boolean } | { kind: 'charge'; value: number }
 | { kind: 'inlet' | 'vent' };
const clamp=(n:number,min=0,max=100)=>Math.max(min,Math.min(max,n));
export function inputPuzzle(p: PuzzleState, stage: number, input: PuzzleInput): PuzzleState {
 switch(input.kind){
  case 'switch': return stage===0 && input.index>=0 && input.index<3 ? {...p,switches:p.switches.includes(input.index)?p.switches.filter(i=>i!==input.index):[...p.switches,input.index]}:p;
  case 'switch-reset': return stage===0?{...p,switches:[]}:p;
  case 'code': return stage===1?{...p,code:input.value.replace(/[^0-9]/g,'').slice(0,3)}:p;
  case 'pipe': return stage===2 && input.index>=0 && input.index<3?{...p,pipes:p.pipes.map((r,i)=>i===input.index?(r+1)%4:r)}:p;
  case 'frequency': return stage===3 && Number.isFinite(input.value)?{...p,frequency:clamp(Math.round(input.value))}:p;
  case 'timing-mode': return stage===4?{...p,manualTiming:input.manual,manualCharge:ignitionCharge(p)}:p;
  case 'charge': return stage===4 && p.manualTiming && Number.isFinite(input.value)?{...p,manualCharge:clamp(input.value)}:p;
  case 'inlet': return stage===5?{...p,inlet:!p.inlet}:p;
  case 'vent': return stage===5?{...p,vent:!p.vent}:p;
 }
}
export function ignitionCharge(p: PuzzleState): number {
 if(p.manualTiming)return p.manualCharge;
 const f=(p.ignitionElapsed%6000)/3000;return (f<=1?f:2-f)*100;
}
export function tickPuzzle(p: PuzzleState, stage: number, delta: number): PuzzleState {
 if(stage===4 && !p.manualTiming)return {...p,ignitionElapsed:p.ignitionElapsed+delta};
 if(stage!==5)return p;
 const rate=(p.inlet?12:0)-(p.vent?12:0)-1;
 const pressure=clamp(p.pressure+rate*delta/1000);
 const endInside=pressure>=45 && pressure<=55;
 const startInside=p.pressure>=45 && p.pressure<=55;
 const entryMs=Math.max(0,Math.min((45-p.pressure)/rate,(55-p.pressure)/rate)*1000);
 const stableMs=endInside?(startInside?p.stableMs+delta:Math.max(0,delta-entryMs)):0;
 return {...p,pressure,stableMs:Math.min(2000,stableMs)};
}
export function puzzleSolved(p: PuzzleState, stage: number): boolean {
 switch(stage){
  case 0:return p.switches.join(',')===POWER_ORDER.join(',');
  case 1:return p.code===PUMP_CODE;
  case 2:return p.pipes.every((r,i)=>r===PIPE_ROUTE[i]);
  case 3:return Math.abs(p.frequency-REFERENCE_HZ)<=2;
  case 4:{const c=ignitionCharge(p);return c>=IGNITION_SAFE[0] && c<=IGNITION_SAFE[1];}
  case 5:return p.pressure>=PRESSURE_SAFE[0] && p.pressure<=PRESSURE_SAFE[1] && p.stableMs>=2000;
  default:return false;
 }
}
export const puzzleDefinitions = [
 { title:'The switchboard', task:'Trace the wiring diagram. Flip all three switches in that order, then connect the circuit.', commit:'Connect circuit', principle:'Mapping links controls to their effects.', effect:'The diagram relates labelled switches to a power route; their physical positions and ON states make your choices visible.', question:'Could you predict which switch affected which part of the circuit?', fault:'The power switches were connected in the wrong order.', restore:'Reset the breaker — switches off' },
 { title:'Pump authorisation', task:'Look for A, B and C in the window. Enter their numbers in that order.', commit:'Authorise pump', principle:'Labels make clues and controls discoverable.', effect:'Instrument labels connect the scene to the keypad. Visible digits and a correction key let you inspect and revise before submitting.', question:'Was it clear where the code came from and how to correct it?', fault:'The pump authorisation code was incorrect.', restore:'Reset pump authorisation — clear digits' },
 { title:'Route the coolant', task:'Connect INLET to CHAMBER. Click a junction to turn it.', commit:'Open cooling loop', principle:'Immediate feedback supports safe exploration.', effect:'Each rotation changes the pipe route immediately. Exploration is safe; opening an incomplete route causes a fault.', question:'Did the changing pipe shapes help you understand what to try next?', fault:'The coolant route was incomplete when the loop was opened.', restore:'Return junctions to the previous positions' },
 { title:'Match the signals', task:'Match the reference signal. Up to 2 Hz either side is fine.', commit:'Lock containment', principle:'Continuous controls need continuous feedback.', effect:'The number and waveform change as you tune. That lets you see what each adjustment did without waiting until you press Lock containment. The reference stays visible in every style.', question:'Which feedback helped you tune the dial: the shape, the number, or the alignment message?', fault:'The containment signal was outside the matching tolerance.', restore:'Return frequency to 28 Hz' },
 { title:'Catch the ignition window', task:'Press Ignite core when the charge is between 65% and 85%.', commit:'Ignite core', principle:'Visible constraints communicate a safe action window.', effect:'The safe band has numbers and a label as well as colour. The moving meter communicates when ignition will be accepted.', question:'Could you recognise the safe window without depending only on its colour?', fault:'Ignition was committed outside the safe charge window.', restore:'Disarm ignition — return to the previous charge' },
 { title:'Balance the pressure', task:'Keep the pressure between 45 and 55 kPa for two seconds, then lock the stabiliser.', commit:'Lock stabiliser', principle:'Feedback helps you regulate a changing system.', effect:'Valve state, pressure and hold progress show delayed consequences. Overshooting is safe until you commit a setting.', question:'Did you understand the delay between adjusting a valve and seeing the pressure settle?', fault:'Pressure was not in its operating range for 2 seconds.', restore:'Reset valves — return to 38 kPa' },
] as const;
