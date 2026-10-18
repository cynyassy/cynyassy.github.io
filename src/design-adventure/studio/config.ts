import { themeIds } from '../types';
import type { ThemeId } from '../types';

export const fontOptions = ['theme', 'sans', 'serif', 'mono'] as const;
export const buttonOptions = ['solid', 'outline', 'soft'] as const;
export interface Remix { accent: string; font: typeof fontOptions[number]; button: typeof buttonOptions[number] }
export interface StudioConfig { theme: ThemeId; picks: ThemeId[]; remixes: Partial<Record<ThemeId, Remix>>; notes: Partial<Record<ThemeId, string>>; project: string }
export function defaultRemix(theme: ThemeId): Remix {
 return { accent: ['neo','bohemian','victorian'].includes(theme)?'#ffba08':['glass','pixel','clay','cybercore','y2k','ethereal'].includes(theme)?'#3f88c5':'#d00000', font: 'theme', button: 'solid' };
}
export function parseStudio(search: string): { config: StudioConfig; notice: string } {
 const params = new URLSearchParams(search); let invalid = false;
 const validTheme = (value: string): value is ThemeId => themeIds.includes(value as ThemeId);
 const rawTheme = params.get('theme') ?? 'swiss';
 const theme = validTheme(rawTheme) ? rawTheme : (invalid = true, 'swiss');
 const picks: ThemeId[] = [];
 for (const value of (params.get('styles') ?? '').split(',').filter(Boolean)) {
  if (!validTheme(value) || picks.includes(value) || picks.length >= 3) { invalid = true; continue; }
  picks.push(value);
 }
 const remixes: StudioConfig['remixes'] = {}, notes: StudioConfig['notes'] = {};
 for (const id of new Set([theme, ...picks])) {
  const remix = defaultRemix(id);
  const accent = params.get('accent_'+id), font = params.get('font_'+id), button = params.get('button_'+id);
  if (accent !== null) { if (/^[0-9a-f]{6}$/i.test(accent)) remix.accent = '#'+accent.toLowerCase(); else invalid = true; }
  if (font !== null) { if (fontOptions.includes(font as Remix['font'])) remix.font = font as Remix['font']; else invalid = true; }
  if (button !== null) { if (buttonOptions.includes(button as Remix['button'])) remix.button = button as Remix['button']; else invalid = true; }
  remixes[id] = remix;
  const note = params.get('note_'+id) ?? '';
  if (note.length > 160) invalid = true;
  notes[id] = note.slice(0,160);
 }
 const project = params.get('project') ?? '';
 if (project.length > 240) invalid = true;
 return { config: { theme, picks, remixes, notes, project: project.slice(0,240) }, notice: invalid ? 'Some options in that link weren’t available. We kept the valid choices and used defaults for the rest.' : '' };
}
export function studioURL(base: string, config: StudioConfig): string {
 const url = new URL(base); url.search = ''; url.hash = '';
 const sharedTheme = config.picks.includes(config.theme) ? config.theme : config.picks[0] ?? config.theme;
 url.searchParams.set('theme', sharedTheme);
 if (config.picks.length) url.searchParams.set('styles', config.picks.join(','));
 for (const id of new Set([sharedTheme, ...config.picks])) {
  const remix = config.remixes[id] ?? defaultRemix(id);
  url.searchParams.set('accent_'+id, remix.accent.slice(1));
  url.searchParams.set('font_'+id, remix.font); url.searchParams.set('button_'+id, remix.button);
  if (config.notes[id]) url.searchParams.set('note_'+id, config.notes[id]!);
 }
 if (config.project) url.searchParams.set('project', config.project);
 url.hash = config.picks.length ? 'shortlist' : '';
 return url.toString();
}
export function accentInk(hex: string): string {
 const rgb = [1,3,5].map(i => parseInt(hex.slice(i,i+2),16)/255).map(v => v <= .04045 ? v/12.92 : ((v+.055)/1.055)**2.4);
 const luminance = rgb[0]*.2126 + rgb[1]*.7152 + rgb[2]*.0722;
 return (luminance+.05)/.05 >= 1.05/(luminance+.05) ? '#000' : '#fff';
}
