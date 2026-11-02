import type { ReactNode } from 'react';
import asset0 from '../assets/perspectives/thesis/open-board.webp';
import asset1 from '../assets/perspectives/thesis/claimed-board.webp';
import asset2 from '../assets/perspectives/thesis/dominant-board.webp';
import asset3 from '../assets/perspectives/thesis/discussion.webp';
import asset4 from '../assets/perspectives/thesis/cooperation.webp';
import asset5 from '../assets/perspectives/thesis/stakeholder-prototype.webp';
import asset6 from '../assets/perspectives/thesis/seventh-board.webp';
import asset7 from '../assets/perspectives/thesis/final-board.webp';
import asset8 from '../assets/perspectives/thesis/playtesting-montage.webp';
import page70 from '../assets/perspectives/thesis/page-70.webp';
import page99 from '../assets/perspectives/thesis/page-99.webp';
import page106 from '../assets/perspectives/thesis/page-106.webp';
import page107 from '../assets/perspectives/thesis/page-107.webp';
import page108 from '../assets/perspectives/thesis/page-108.webp';
import page109 from '../assets/perspectives/thesis/page-109.webp';
import page110 from '../assets/perspectives/thesis/page-110.webp';
import page111 from '../assets/perspectives/thesis/page-111.webp';
import page112 from '../assets/perspectives/thesis/page-112.webp';
import page113 from '../assets/perspectives/thesis/page-113.webp';
import page114 from '../assets/perspectives/thesis/page-114.webp';
import page115 from '../assets/perspectives/thesis/page-115.webp';
import page116 from '../assets/perspectives/thesis/page-116.webp';
import page117 from '../assets/perspectives/thesis/page-117.webp';
import page118 from '../assets/perspectives/thesis/page-118.webp';
import page119 from '../assets/perspectives/thesis/page-119.webp';
import page129 from '../assets/perspectives/thesis/page-129.webp';
import page130 from '../assets/perspectives/thesis/page-130.webp';
import page131 from '../assets/perspectives/thesis/page-131.webp';

export const thesisImages = {
  'open-board': asset0,
  'claimed-board': asset1,
  'dominant-board': asset2,
  'discussion': asset3,
  'cooperation': asset4,
  'stakeholder-prototype': asset5,
  'seventh-board': asset6,
  'final-board': asset7,
  'playtest-photos': asset8,
};
export const thesisPages: Record<number, string> = {
  70: page70,
  99: page99,
  106: page106,
  107: page107,
  108: page108,
  109: page109,
  110: page110,
  111: page111,
  112: page112,
  113: page113,
  114: page114,
  115: page115,
  116: page116,
  117: page117,
  118: page118,
  119: page119,
  129: page129,
  130: page130,
  131: page131,
};

const dimensions: Record<keyof typeof thesisImages, readonly [number, number]> = {
  'open-board': [465,370], 'claimed-board': [465,550], 'dominant-board': [465,550],
  discussion: [465,395], cooperation: [465,400], 'stakeholder-prototype': [385,418],
  'seventh-board': [262,234], 'final-board': [750,448], 'playtest-photos': [900,330],
};

export function ThesisFigure({ image, page, alt, children, className = '' }: {
  image: keyof typeof thesisImages; page: number; alt: string; children?: ReactNode; className?: string;
}) {
  return <figure className={`perspectives-thesis-figure ${className}`}>
    <a href={thesisPages[page]} target="_blank" rel="noreferrer" aria-label={`Open thesis page ${page}: ${alt}`}>
      <img src={thesisImages[image]} alt={alt} width={dimensions[image][0]} height={dimensions[image][1]} loading="lazy" decoding="async" />
    </a>
    <figcaption>{children}<a href={thesisPages[page]} target="_blank" rel="noreferrer">Thesis, p. {page} · Open full page ↗</a></figcaption>
  </figure>;
}
