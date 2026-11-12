import { rounds } from './rounds';
export type Phase = 'briefing' | 'round-briefing' | 'select' | 'confirm' | 'reports' | 'research' | 'debrief' | 'chapter';
export interface Decision { round: number; selected: number[] }
export interface GameState { phase: Phase; round: number; roster: number[]; selected: number[]; history: Decision[]; reportIndex: number; researchIndex: number }
export type Action = { type: 'start' } | { type: 'read-research' } | { type: 'toggle'; id: number } | { type: 'review' } | { type: 'cancel' } | { type: 'submit' } | { type: 'report'; direction: -1 | 1 } | { type: 'research' } | { type: 'evidence'; index: number } | { type: 'finish' } | { type: 'next-round' } | { type: 'close-chapter' } | { type: 'restart' };
export const initialState: GameState = { phase: 'briefing', round: 0, roster: Array.from({length:40},(_,i)=>i+1), selected: [], history: [], reportIndex: 0, researchIndex: 0 };
export function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'read-research': return state.phase === 'briefing' || state.phase === 'debrief' ? { ...state, phase: 'chapter' } : state;
    case 'close-chapter': return state.phase === 'chapter' ? { ...state, phase: state.history.length === rounds.length ? 'debrief' : 'briefing' } : state;
    case 'start': return state.phase === 'briefing' || state.phase === 'round-briefing' ? { ...state, phase: 'select' } : state;
    case 'toggle': {
      if (state.phase !== 'select' || !state.roster.includes(action.id)) return state;
      const selected = state.selected.includes(action.id) ? state.selected.filter(id => id !== action.id) : state.selected.length < 4 ? [...state.selected, action.id] : state.selected;
      return { ...state, selected };
    }
    case 'review': return state.phase === 'select' && state.selected.length === 4 ? { ...state, phase: 'confirm' } : state;
    case 'cancel': return state.phase === 'confirm' ? { ...state, phase: 'select' } : state;
    case 'submit': return state.phase === 'confirm' && state.selected.length === 4 ? { ...state, phase: 'reports', reportIndex: 0, history: [...state.history, {round: state.round, selected: [...state.selected]}] } : state;
    case 'report': return state.phase === 'reports' ? { ...state, reportIndex: Math.max(0, Math.min(3, state.reportIndex + action.direction)) } : state;
    case 'research': return state.phase === 'reports' && state.reportIndex === 3 ? { ...state, phase: 'research', researchIndex: 0 } : state;
    case 'evidence': return state.phase === 'research' && (action.index === 0 || action.index === 1) ? { ...state, researchIndex: action.index } : state;
    case 'next-round': return state.phase === 'research' && state.researchIndex === 1 && state.round < rounds.length-1 ? { ...state, phase: 'round-briefing', round: state.round+1, roster: [...state.roster.filter(id=>!state.selected.includes(id)), ...rounds[state.round+1].intake], selected: [], reportIndex: 0, researchIndex: 0 } : state;
    case 'finish': return state.phase === 'research' && state.researchIndex === 1 && state.round === rounds.length-1 ? { ...state, phase: 'debrief' } : state;
    case 'restart': return state.phase === 'debrief' || state.phase === 'briefing' || state.phase === 'round-briefing' ? { ...initialState, roster: [...initialState.roster] } : state;
  }
}
