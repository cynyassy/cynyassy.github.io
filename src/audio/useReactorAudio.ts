import { useEffect, useRef } from 'react';
import type { ReactorState } from '../design-adventure/reactor-state';
import { playSound } from './sound';
/** Observe accepted transitions, not clicks, ticks, or rejected/disabled input. */
export function useReactorAudio(state: ReactorState, active = true) {
 const previous = useRef(state);
 useEffect(() => {
  const old = previous.current;
  previous.current = state;
  if (!active) return;
  const controlsChanged = state.puzzles.switches !== old.puzzles.switches || state.puzzles.code !== old.puzzles.code || state.puzzles.pipes !== old.puzzles.pipes || state.puzzles.frequency !== old.puzzles.frequency || state.puzzles.manualCharge !== old.puzzles.manualCharge || state.puzzles.inlet !== old.puzzles.inlet || state.puzzles.vent !== old.puzzles.vent;
  if (state.phase === 'failure' && old.phase !== 'failure') playSound('failure');
  else if (state.phase === 'success' && old.phase !== 'success') playSound('complete');
  else if (state.mistakes > old.mistakes || (state.fault && !old.fault)) playSound('fault');
  else if (state.restores > old.restores) playSound('recover');
  else if (state.phase === 'running' && old.phase !== 'running') playSound('start');
  else if (state.paused !== old.paused && state.phase === 'running') playSound(state.paused ? 'pause' : 'resume');
  else if (state.step > old.step && state.runId === old.runId) playSound('progress');
  else if (state.operation && !old.operation) playSound('working');
  else if (controlsChanged && !state.operation && !state.paused && state.phase === 'running' && state.runId === old.runId) playSound('adjust');
  else if (state.session === 'mission' && state.phase === 'running' && !state.paused && old.remaining > 15000 && state.remaining <= 15000) playSound('warning');
 }, [state, active]);
}
