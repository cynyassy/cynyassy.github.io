import type { Configuration, DesignChoices, Emphasis, Feedback, Layout, LessonId, Mode, ThemeId, UndoWording } from './types';
export type BuildPhase = 'ready' | 'preparing' | 'rendering' | 'finishing' | 'done' | 'interrupted';
export interface AdventureState extends Configuration {
  opened: boolean; inspecting: boolean; hint: boolean; notice: string;
  completed: LessonId[]; history: Layout[];
  build: { phase: BuildPhase; runId: number; interrupt: boolean };
}
export const defaultChoices: DesignChoices = { emphasis: 'equal', feedback: 'generic', undo: 'generic' };
export const referenceChoices: DesignChoices = { emphasis: 'preview', feedback: 'steps', undo: 'value' };
export const defaultConfiguration: Configuration = {
  story: 'workshop', theme: 'swiss', lesson: 'action', mode: 'try', choices: defaultChoices, layout: 'spacious',
};
export function initialState(configuration: Configuration = defaultConfiguration, notice = ''): AdventureState {
  return { ...configuration, choices: { ...configuration.choices }, opened: false, inspecting: false,
    hint: false, notice, completed: [], history: [], build: { phase: 'ready', runId: 0, interrupt: false } };
}
export type Action =
  | { type: 'theme'; value: ThemeId } | { type: 'mode'; value: Mode } | { type: 'lesson'; value: LessonId }
  | { type: 'emphasis'; value: Emphasis } | { type: 'feedback'; value: Feedback } | { type: 'undo-wording'; value: UndoWording }
  | { type: 'open' } | { type: 'inspect' } | { type: 'hint' } | { type: 'replay' }
  | { type: 'start-build'; interrupt?: boolean } | { type: 'tick'; runId: number; step: 1 | 2 | 3 }
  | { type: 'layout'; value: Layout } | { type: 'undo' };
export const isBuilding = (phase: BuildPhase) => ['preparing', 'rendering', 'finishing'].includes(phase);
const complete = (state: AdventureState, lesson: LessonId) => state.completed.includes(lesson) ? state.completed : [...state.completed, lesson];
export function reducer(state: AdventureState, action: Action): AdventureState {
  switch (action.type) {
    case 'theme': return { ...state, theme: action.value };
    case 'mode': return { ...state, mode: action.value };
    case 'lesson': {
      if (action.value === state.lesson) return state;
      const pending = isBuilding(state.build.phase);
      return { ...state, lesson: action.value, hint: false, inspecting: false,
        notice: pending ? 'The unfinished preview was cancelled. Your design choices are unchanged.' : '',
        build: pending ? { phase: 'ready', runId: state.build.runId + 1, interrupt: false } : state.build };
    }
    case 'emphasis': return { ...state, choices: { ...state.choices, emphasis: action.value } };
    case 'feedback': return { ...state, choices: { ...state.choices, feedback: action.value } };
    case 'undo-wording': return { ...state, choices: { ...state.choices, undo: action.value } };
    case 'open': return state.lesson !== 'action' ? state : { ...state, opened: true, hint: false, completed: complete(state, 'action') };
    case 'inspect': return { ...state, inspecting: !state.inspecting };
    case 'hint': return { ...state, hint: !state.hint };
    case 'start-build':
      if (state.lesson !== 'feedback' || isBuilding(state.build.phase) || state.build.phase === 'done') return state;
      return { ...state, hint: false, notice: '', build: { phase: 'preparing', runId: state.build.runId + 1, interrupt: !!action.interrupt } };
    case 'tick': {
      if (state.lesson !== 'feedback' || action.runId !== state.build.runId || !isBuilding(state.build.phase)) return state;
      const expected = state.build.phase === 'preparing' ? 1 : state.build.phase === 'rendering' ? 2 : 3;
      if (action.step !== expected) return state;
      const phase = action.step === 1 ? 'rendering' : action.step === 2 ? (state.build.interrupt ? 'interrupted' : 'finishing') : 'done';
      return { ...state, build: { ...state.build, phase }, completed: phase === 'done' ? complete(state, 'feedback') : state.completed };
    }
    case 'layout':
      if (state.lesson !== 'recovery' || state.layout === action.value) return state;
      return { ...state, layout: action.value, history: [...state.history, state.layout], notice: 'Layout changed to ' + action.value + '.', hint: false };
    case 'undo': {
      if (state.lesson !== 'recovery' || !state.history.length) return state;
      const layout = state.history[state.history.length - 1];
      return { ...state, layout, history: state.history.slice(0, -1), notice: 'Restored the ' + layout + ' layout.', completed: complete(state, 'recovery'), hint: false };
    }
    case 'replay': {
      const completed = state.completed.filter(id => id !== state.lesson);
      const base = { ...state, completed, hint: false, notice: 'This lesson is ready to try again.' };
      if (state.lesson === 'action') return { ...base, opened: false, inspecting: false };
      if (state.lesson === 'feedback') return { ...base, build: { phase: 'ready', runId: state.build.runId + 1, interrupt: false } };
      return { ...base, layout: 'spacious', history: [] };
    }
  }
}
