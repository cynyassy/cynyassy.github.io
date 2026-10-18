import originalDesktop from './assets/reactor-mars-desktop.webp';
import originalMobile from './assets/reactor-mars-mobile.webp';
import type { ThemeId } from './types';

// Import URLs only. The picture element fetches the selected style and size;
// the catalogue does not preload the other artwork files.
const files = import.meta.glob<string>('./assets/reactor-mars-*-*.webp', {
  eager: true, query: '?url', import: 'default',
});

const descriptions: Record<ThemeId, string> = {
  swiss: 'a precise Swiss graphic illustration',
  neo: 'a bold Neo-Brutalist poster illustration',
  pixel: 'a stepped pixel-art landscape',
  glass: 'a translucent glass illustration',
  scrapbook: 'a layered cut-paper collage',
  clay: 'a soft sculpted clay diorama',
  cybercore: 'a technical schematic illustration',
  surreal: 'a dreamlike surrealist painting',
  y2k: 'a glossy chrome digital illustration',
  synthwave: 'a synthwave illustration with an indigo sky',
  neumorphism: 'a pale sculpted relief',
  bento: 'a modular geometric illustration',
  editorial: 'an ink and gouache editorial illustration',
  minimal: 'a sparse minimal line illustration',
  maximal: 'a richly patterned geometric illustration',
  luxury: 'a refined fine-line engraving',
  sketch: 'a pencil and watercolor concept sketch',
  ethereal: 'an airy watercolor illustration',
  bohemian: 'an earthy textile-inspired illustration',
  victorian: 'an antique scientific engraving',
  cyberpunk: 'an angular cyberpunk industrial illustration',
  wabi: 'a quiet ink and earth-pigment illustration',
};

export function reactorArtwork(theme?: ThemeId) {
  if (!theme) return { desktop: originalDesktop, mobile: originalMobile,
    alt: 'An isolated industrial reactor with six rows of windows in a rocky Mars landscape.' };
  return {
    desktop: files[`./assets/reactor-mars-${theme}-desktop.webp`] ?? originalDesktop,
    mobile: files[`./assets/reactor-mars-${theme}-mobile.webp`] ?? originalMobile,
    alt: `A Mars reactor with six dark window rows, shown as ${descriptions[theme]}.`,
  };
}
