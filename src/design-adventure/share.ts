import { defaultConfiguration, initialState } from './state';
import { lessonIds, themeIds } from './types';
import type { Configuration } from './types';

export function parseConfiguration(search: string): { configuration: Configuration; notice: string } {
  const params = new URLSearchParams(search);
  let invalid = false;
  function pick<T extends string>(key: string, allowed: readonly T[], fallback: T): T {
    const value = params.get(key);
    if (value === null) return fallback;
    if (allowed.includes(value as T)) return value as T;
    invalid = true; return fallback;
  }
  const configuration: Configuration = {
    story: pick('story', ['workshop'], 'workshop'),
    theme: pick('theme', themeIds, 'swiss'),
    lesson: pick('lesson', lessonIds, 'action'),
    mode: pick('mode', ['try', 'make'], 'try'),
    layout: pick('layout', ['spacious', 'compact'], 'spacious'),
    choices: {
      emphasis: pick('emphasis', ['equal', 'preview', 'inspect'], defaultConfiguration.choices.emphasis),
      feedback: pick('feedback', ['generic', 'descriptive', 'steps'], defaultConfiguration.choices.feedback),
      undo: pick('undo', ['generic', 'setting', 'value'], defaultConfiguration.choices.undo),
    },
  };
  return { configuration, notice: invalid ? 'We couldn’t use part of that link, so we opened the default setup for those options.' : '' };
}
export function createShareURL(base: string, configuration: Configuration): string {
  const url = new URL(base);
  url.search = ''; url.hash = '';
  const values = { story: configuration.story, theme: configuration.theme, lesson: configuration.lesson, mode: configuration.mode,
    emphasis: configuration.choices.emphasis, feedback: configuration.choices.feedback, undo: configuration.choices.undo, layout: configuration.layout };
  Object.entries(values).forEach(([key, value]) => url.searchParams.set(key, value));
  return url.toString();
}
export function sharedInitialState(search: string) {
  const { configuration, notice } = parseConfiguration(search);
  return initialState(configuration, notice);
}
