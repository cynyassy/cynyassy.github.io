import { copyPuzzles, initialPuzzles, inputPuzzle, puzzleDefinitions, puzzleSolved, tickPuzzle } from './reactor-puzzles';
import type { PuzzleInput, PuzzleState } from './reactor-puzzles';
export type Session = 'practice' | 'mission';
export type Attention = 'solid' | 'outline' | 'pulse';
export interface ReactorChoices { attention: Attention; feedback: 'generic' | 'descriptive' | 'steps'; undo: 'generic' | 'setting' | 'value' }
export interface ReactorState {
 sandboxStage: number | null; duration: number; session: Session; phase: 'briefing' | 'running' | 'success' | 'failure'; step: number;
 operation: { index: number; elapsed: number } | null;
 fault: { index: number; training: boolean } | null;
 recoveryUsed: boolean; trainingDone: boolean; remaining: number; paused: boolean;
 lastAt: number; runId: number; mistakes: number; restores: number; message: string; cause: string;
 puzzles: PuzzleState; safePuzzles: PuzzleState;
}
// Adjust this single value for human playtesting; shares never start a running clock.
const configuredSeconds = Number(import.meta.env?.VITE_REACTOR_MISSION_SECONDS ?? 60);
export const MISSION_DURATION = (Number.isFinite(configuredSeconds) && configuredSeconds >= 15 ? configuredSeconds : 60) * 1000;
export function initialReactor(session: Session = 'practice', runId = 0): ReactorState {
 return { sandboxStage:null, duration:MISSION_DURATION, session, phase: 'briefing', step: 0, operation: null, fault: null, recoveryUsed: false, trainingDone: false, remaining: MISSION_DURATION, paused: false, lastAt: 0, runId, mistakes: 0, restores: 0, message: '', cause: '', puzzles:initialPuzzles(),safePuzzles:initialPuzzles() };
}
export type ReactorAction =
 | { type: 'start'; session: Session; now: number }
 | { type: 'tick'; runId: number; now: number }
 | { type: 'input'; stage: number; input: PuzzleInput; now: number }
 | { type: 'commit'; stage: number; now: number }
 | { type: 'restore'; now: number }
 | { type: 'pause' | 'resume'; now: number }
 | { type: 'retry-puzzle' }
 | { type: 'rehearse-recovery' }
 | { type: 'reset'; session?: Session; now?:number };
function fail(s: ReactorState, cause: string): ReactorState {
 return { ...s, phase: 'failure', operation: null, paused: false, cause, message: cause, runId: s.runId + 1 };
}
function advance(s: ReactorState, now: number): ReactorState {
 if(s.phase !== 'running' || s.paused) return s;
 const delta = Math.max(0, now - s.lastAt);
 const remaining = s.session === 'mission' ? Math.max(0, s.remaining - delta) : s.remaining;
 let n = { ...s, remaining, lastAt: Math.max(now, s.lastAt) };
 if(remaining === 0) return fail(n, 'Time ran out before the reactor was stable. Try again, or return to practice.');
 if(!s.operation) return {...n,puzzles:s.fault?s.puzzles:tickPuzzle(s.puzzles,s.step,delta)};
 const elapsed = s.operation.elapsed + delta;
 if(elapsed < 1500) return { ...n, operation: { ...s.operation, elapsed } };
 const step = s.step + 1;
 n = { ...n, operation: null, step, safePuzzles:copyPuzzles(s.puzzles), message: 'That section is online. Next up: ' + puzzleDefinitions[Math.min(step,5)].title + '.' };
 if(step === 6 || s.sandboxStage !== null) return { ...n, phase: 'success', runId: n.runId + 1, message: s.sandboxStage===null?'All six sections are online. The reactor is stable.':'Interaction complete. This reactor section is illuminated.' };
 if(s.sandboxStage === null && s.session === 'practice' && step === 3 && !s.trainingDone)
  return { ...n, puzzles:{...s.puzzles,pipes:s.puzzles.pipes.map((r,i)=>i===2?(r+1)%4:r)}, fault: { index: 2, training: true }, trainingDone: true, message: 'This is a practice fault. Restore junction 3; the sections already online will stay on.' };
 return n;
}
function incorrect(n: ReactorState,index:number,cause:string):ReactorState {
 const wrong={...n,mistakes:n.mistakes+1};
 if(n.session==='practice')return {...wrong,message:'Practice check: '+cause+' Adjust the controls and try again; your exploration is safe.'};
 if(n.fault || n.recoveryUsed)return fail(wrong,'A second incorrect setting caused a meltdown. '+cause+' Try again, or return to practice.');
 return {...wrong,fault:{index,training:false},message:cause+' Restore the previous setting to continue. You have one recovery chance.'};
}
export function restorationText(s: ReactorState):string {
 if(!s.fault)return 'Restore previous setting';
 if(s.fault.training)return 'Restore junction 3';
 if(s.fault.index===3)return 'Restore frequency to '+s.safePuzzles.frequency+' Hz';
 if(s.fault.index===4)return 'Disarm ignition and restore the previous charge';
 if(s.fault.index===5)return 'Close both valves and restore '+Math.round(s.safePuzzles.pressure)+' kPa';
 return puzzleDefinitions[s.fault.index].restore;
}
export function reactorReducer(s: ReactorState, a: ReactorAction): ReactorState {
 if(a.type === 'rehearse-recovery') {
  if(s.sandboxStage===null || s.phase!=='running' || s.operation || s.paused)return s;
  return {...s,fault:{index:s.step,training:false},message:'Sandbox fault. Restore the starting controls and inspect the lever wording.'};
 }
 if(a.type === 'retry-puzzle') {
  if(s.session !== 'practice' || s.phase !== 'running' || s.fault) return s;
  return {...s, puzzles:copyPuzzles(s.safePuzzles), operation:null, runId:s.runId+1, message:'This interaction is reset. Earlier reactor sections stay online.'};
 }
 if(a.type === 'reset' && s.sandboxStage!==null)return initialSandbox(s.sandboxStage,a.now??s.lastAt,s.runId+1);
 if(a.type === 'reset') return initialReactor(a.session ?? s.session, s.runId + 1);
 if(a.type === 'start') {
  if(s.phase === 'running') return s;
  return { ...initialReactor(a.session, s.runId + 1), phase: 'running', lastAt: a.now, message: 'Let’s get the power on.' };
 }
 if(a.type === 'tick') {
  if(a.runId !== s.runId) return s;
  return advance(s, a.now);
 }
 if(a.type === 'pause') {
  const n = advance(s, a.now);
  return n.phase === 'running' && !n.paused ? { ...n, paused: true, runId: n.runId + 1 } : n;
 }
 if(a.type === 'resume') return s.phase === 'running' && s.paused ? { ...s, paused: false, lastAt: a.now } : s;
 const n = advance(s, a.now);
 if(n.phase !== 'running' || n.paused) return n;
 if(a.type === 'restore') {
  if(!n.fault) return n;
  return { ...n, puzzles:{...copyPuzzles(n.safePuzzles),manualTiming:n.puzzles.manualTiming}, fault: null, recoveryUsed: n.session === 'mission' ? true : n.recoveryUsed, restores: n.restores + 1, message: 'The previous setting is restored. The sections already online are still on.' };
 }
 if(a.type === 'input'){
  if(a.stage!==n.step || n.operation || n.fault)return n;
  return {...n,puzzles:inputPuzzle(n.puzzles,n.step,a.input)};
 }
 if(a.type === 'commit'){
  if(a.stage!==n.step || n.operation)return n;
  if(n.fault)return incorrect(n,n.fault.index,'The setting was submitted before the active fault was restored.');
  if(!puzzleSolved(n.puzzles,n.step))return incorrect(n,n.step,puzzleDefinitions[n.step].fault);
  return {...n,operation:{index:n.step,elapsed:0},message:'Got it. Waiting for the reactor to respond.'};
 }
 return n;
}

// A standalone puzzle uses the exact mission transitions, with no clock or progression.
export function initialSandbox(stage:number, now:number, runId=0):ReactorState {
 const base=initialReactor('practice',runId);
 return {...base,sandboxStage:stage,step:stage,phase:'running',trainingDone:true,lastAt:now,message:'Isolated practice. Live mission is unchanged.'};
}
