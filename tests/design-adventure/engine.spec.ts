import { test, expect } from '@playwright/test';
import { defaultConfiguration, initialState, reducer } from '../../src/design-adventure/state';
import { createShareURL, parseConfiguration, sharedInitialState } from '../../src/design-adventure/share';
test('theme and mode changes preserve edits, focus-independent state, and an active run', () => {
  let state = initialState();
  state = reducer(state, { type: 'emphasis', value: 'inspect' });
  state = reducer(state, { type: 'open' });
  state = reducer(state, { type: 'lesson', value: 'feedback' });
  state = reducer(state, { type: 'start-build' });
  const run = state.build.runId;
  state = reducer(state, { type: 'theme', value: 'pixel' });
  state = reducer(state, { type: 'mode', value: 'make' });
  expect(state.choices.emphasis).toBe('inspect');
  expect(state.completed).toEqual(['action']);
  expect(state.build.runId).toBe(run);
  expect(state.build.phase).toBe('preparing');
});
test('duplicate clicks and stale or out-of-order callbacks cannot finish a newer run', () => {
  let state = initialState({ ...defaultConfiguration, lesson: 'feedback' });
  state = reducer(state, { type: 'start-build' });
  const old = state.build.runId;
  expect(reducer(state, { type: 'start-build' })).toBe(state);
  expect(reducer(state, { type: 'tick', runId: old, step: 3 })).toBe(state);
  state = reducer(state, { type: 'replay' });
  state = reducer(state, { type: 'start-build' });
  expect(reducer(state, { type: 'tick', runId: old, step: 1 })).toBe(state);
  const runId = state.build.runId;
  for (const step of [1, 2, 3] as const) state = reducer(state, { type: 'tick', runId, step });
  expect(state.build.phase).toBe('done');
  expect(state.completed).toContain('feedback');
});
test('navigation cancels an unfinished run and preserves authored choices', () => {
  let state = initialState({ ...defaultConfiguration, lesson: 'feedback' });
  state = reducer(state, { type: 'feedback', value: 'steps' });
  state = reducer(state, { type: 'start-build' });
  const runId = state.build.runId;
  state = reducer(state, { type: 'lesson', value: 'recovery' });
  expect(state.build.phase).toBe('ready');
  expect(state.choices.feedback).toBe('steps');
  expect(reducer(state, { type: 'tick', runId, step: 1 })).toBe(state);
});
test('interruption has a deterministic successful retry', () => {
  let state = initialState({ ...defaultConfiguration, lesson: 'feedback' });
  state = reducer(state, { type: 'start-build', interrupt: true });
  let runId = state.build.runId;
  for (const step of [1, 2] as const) state = reducer(state, { type: 'tick', runId, step });
  expect(state.build.phase).toBe('interrupted');
  state = reducer(state, { type: 'start-build' });
  runId = state.build.runId;
  for (const step of [1, 2, 3] as const) state = reducer(state, { type: 'tick', runId, step });
  expect(state.build.phase).toBe('done');
});
test('multi-level undo restores values without changing another lesson or choices', () => {
  let state = reducer(initialState(), { type: 'open' });
  state = reducer(state, { type: 'lesson', value: 'recovery' });
  state = reducer(state, { type: 'undo-wording', value: 'value' });
  state = reducer(state, { type: 'layout', value: 'compact' });
  expect(reducer(state, { type: 'layout', value: 'compact' })).toBe(state);
  state = reducer(state, { type: 'layout', value: 'spacious' });
  state = reducer(state, { type: 'undo' });
  expect(state.layout).toBe('compact');
  state = reducer(state, { type: 'undo' });
  expect(state.layout).toBe('spacious');
  expect(state.completed).toEqual(['action', 'recovery']);
  expect(state.choices.undo).toBe('value');
  expect(reducer(state, { type: 'undo' })).toBe(state);
});
test('a share round trip includes configuration and excludes progress, history and unrelated data', () => {
  let state = initialState({ ...defaultConfiguration, theme: 'scrapbook', mode: 'make', lesson: 'recovery',
    choices: { emphasis: 'inspect', feedback: 'descriptive', undo: 'value' } });
  state = reducer(state, { type: 'layout', value: 'compact' });
  const url = createShareURL('https://example.com/projects/design-adventure.html?private=note#details', state);
  const parsed = sharedInitialState(new URL(url).search);
  expect(parsed.theme).toBe('scrapbook');
  expect(parsed.layout).toBe('compact');
  expect(parsed.choices).toEqual(state.choices);
  expect(parsed.history).toEqual([]);
  expect(parsed.completed).toEqual([]);
  expect(parsed.build.phase).toBe('ready');
  expect(url).not.toContain('private');
  expect(new URL(url).hash).toBe('');
});
test('invalid, unavailable, and arbitrary query values use supported defaults', () => {
  const parsed = parseConfiguration('?story=station&theme=unknown&lesson=99&mode=edit&layout=wide&undo=no&feedback=oops&emphasis=bad');
  expect(parsed.configuration).toEqual(defaultConfiguration);
  expect(parsed.notice).toContain('reset');
});
