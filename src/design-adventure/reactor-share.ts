import { themeIds } from './types';
import type { ThemeId, Mode, StoryId } from './types';
import type { ReactorChoices, Session } from './reactor-state';
export interface ReactorConfiguration { story: 'reactor'; theme: ThemeId; mode: Mode; session: Session; choices: ReactorChoices }
export const reactorReference: ReactorChoices = { attention: 'solid', feedback: 'steps', undo: 'value' };
export function parseReactor(search: string): { configuration: ReactorConfiguration; notice: string } {
 const p = new URLSearchParams(search); let invalid = false;
 function pick<T extends string>(key: string, values: readonly T[], fallback: T): T {
  const v = p.get(key); if(v === null) return fallback;
  if(values.includes(v as T)) return v as T;
  invalid = true; return fallback;
 }
 const configuration: ReactorConfiguration = { story: 'reactor', theme: pick('theme', themeIds, 'swiss'), mode: pick('mode', ['try', 'make'], 'try'), session: pick('session', ['practice', 'mission'], 'practice'), choices: { attention: pick('attention', ['solid', 'outline', 'pulse'], 'solid'), feedback: pick('feedback', ['generic', 'descriptive', 'steps'], 'steps'), undo: pick('undo', ['generic', 'setting', 'value'], 'value') } };
 if(p.has('story') && p.get('story') !== 'reactor') invalid = true;
 return { configuration, notice: invalid ? 'We couldn’t use part of that link, so we opened the default setup for those options.' : '' };
}
export function reactorShareURL(base: string, c: ReactorConfiguration): string {
 const u = new URL(base); u.search = ''; u.hash = '';
 Object.entries({ story: 'reactor', theme: c.theme, mode: c.mode, session: c.session, ...c.choices }).forEach(([k,v]) => u.searchParams.set(k,v));
 return u.toString();
}
export type { StoryId } from './types';
export function initialStory(search: string): StoryId {
 const p = new URLSearchParams(search);
 if(p.has('story')) return p.get('story') === 'workshop' ? 'workshop' : 'reactor';
 return ['lesson','layout','emphasis'].some(k => p.has(k)) ? 'workshop' : 'reactor';
}
