export type StoryId = 'workshop' | 'reactor';
export const lessonIds = ['action', 'feedback', 'recovery'] as const;
export const themeIds = ['swiss', 'neo', 'pixel', 'glass', 'scrapbook', 'clay', 'cybercore', 'surreal', 'y2k', 'synthwave', 'neumorphism', 'bento', 'editorial', 'minimal', 'maximal', 'luxury', 'sketch', 'ethereal', 'bohemian', 'victorian', 'cyberpunk', 'wabi'] as const;
export type LessonId = typeof lessonIds[number];
export type ThemeId = typeof themeIds[number];
export type Mode = 'try' | 'make';
export type Layout = 'spacious' | 'compact';
export type Emphasis = 'equal' | 'preview' | 'inspect';
export type Feedback = 'generic' | 'descriptive' | 'steps';
export type UndoWording = 'generic' | 'setting' | 'value';
export interface DesignChoices { emphasis: Emphasis; feedback: Feedback; undo: UndoWording }
export interface StoryDefinition {
  id: StoryId;
  title: string;
  introduction: string;
  artifact: { title: string; subtitle: string; description: string };
  labels: { preview: string; inspect: string; build: string };
  messages: { preparing: string; rendering: string; finishing: string; done: string; interrupted: string };
}
export interface ThemeDefinition {
  id: ThemeId; name: string; number: string; description: string; category: string; summary: string;
  context: string; vocabulary: string; fit: string; tradeoff: string;
  example: string; sources: { label: string; url: string }[];
}
export interface LessonDefinition {
  id: LessonId; number: string; title: string; task: string; principle: string;
  explanation: string; adaptation: string; question: string; source: string; makingSource: string;
}
export interface Configuration {
  story: 'workshop'; theme: ThemeId; lesson: LessonId; mode: Mode;
  choices: DesignChoices; layout: Layout;
}
