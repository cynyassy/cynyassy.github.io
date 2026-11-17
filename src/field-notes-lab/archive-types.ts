export type ArchiveRecording = {
  id: string; title: string; description: string; cityId: string | null;
  duration: number; sourceLanguage: 'hi' | 'en';
};
export type ArchiveCity = {summary: string; focus: string; reflection: string; paragraphs?:string[]};
export type ArchiveCatalogue = {cities: Record<string, ArchiveCity>; recordings: ArchiveRecording[]};
export type ArchivePassage = {start: number; end: number; original: string; english: string};
export type ArchiveTranscript = ArchiveRecording & {status: 'draft'; passages: ArchivePassage[]};
export type ArchiveReadingRequest = {recordingId:string;startSeconds:number;cityId:string|null;serial:number;origin:HTMLButtonElement};
export type ExcerptCandidate = {id:string;recordingId:string;cityId:string|null;start:number;end:number;title:string;question:string;status:'awaiting-review'};
export type ExcerptDraft = ExcerptCandidate & {passages:ArchivePassage[]};
export type FeaturedExcerpt = {id:string;chapterId:string;recordingId:string;start:number;end:number;hi:string;en:string;status:'draft';edited?:boolean;sourceText?:string};
export function timestamp(seconds: number): string {
  const whole = Math.max(0, Math.floor(seconds));
  return [Math.floor(whole / 3600), Math.floor(whole / 60) % 60, whole % 60].map(value => String(value).padStart(2, '0')).join(':');
}
export function durationLabel(seconds: number): string {
  const minutes = Math.floor(seconds / 60), hours = Math.floor(minutes / 60);
  return hours ? `${hours}h ${minutes % 60}m` : minutes ? `${minutes}m` : `${Math.floor(seconds)}s`;
}
