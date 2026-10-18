import { initialSandbox, reactorReducer } from '../reactor-state';
import type { ReactorAction, ReactorState } from '../reactor-state';
import { copyPuzzles } from '../reactor-puzzles';

export type PrototypeAction = ReactorAction | {type:'next-puzzle';now:number} | {type:'restart-sequence';now:number};
export const LAST_PROTOTYPE_STAGE=5;

// The experiment supplies navigation; the existing reducer still owns puzzle rules and operations.
export function prototypeReducer(state:ReactorState, action:PrototypeAction):ReactorState {
 if(action.type==='restart-sequence')return initialSandbox(0,action.now,state.runId+1);
 if(action.type==='next-puzzle'){
  if(state.sandboxStage===null||state.sandboxStage<0||state.sandboxStage>=LAST_PROTOTYPE_STAGE||state.phase!=='success')return state;
  return {...initialSandbox(state.sandboxStage+1,action.now,state.runId+1),puzzles:copyPuzzles(state.puzzles),safePuzzles:copyPuzzles(state.puzzles)};
 }
 return reactorReducer(state,action);
}
