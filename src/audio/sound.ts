export type SoundCue = 'tap' | 'adjust' | 'start' | 'pause' | 'resume' | 'working' | 'progress' | 'recover' | 'fault' | 'warning' | 'failure' | 'crisis' | 'complete' | 'discover' | 'revisit' | 'jump' | 'land' | 'fire';
export interface SoundState { enabled: boolean; available: boolean; message: string }
export interface SoundEngine { play: (cue: SoundCue) => void; getState: () => SoundState; subscribe: (listener: (state: SoundState) => void) => () => void; setEnabled: (enabled: boolean) => void }
declare global { interface Window { CynyassyAudio?: SoundEngine } }
/** Sound is optional feedback. Application transitions never depend on audio. */
export function playSound(cue: SoundCue) { window.CynyassyAudio?.play(cue); }
