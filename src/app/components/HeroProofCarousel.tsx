import { useEffect, useMemo, useState } from 'react';

type HeroLine = {
  html: string;
  plain: string;
};

/* Change the lines here. Keep the `hl` span around the proof you want accented. */
const heroLines: HeroLine[] = [
  {
    plain: 'Scaled organic traffic from 25K to 150K/month and helped drive 3x revenue through documentation-led growth.',
    html: 'Scaled organic traffic from <span class="hl">25K to 150K/month</span> and helped drive <span class="hl">3x revenue</span> through documentation-led growth.',
  },
  {
    plain: 'Built a 100K+ audience storytelling brand by understanding what people actually respond to.',
    html: 'Built a <span class="hl">100K+ audience</span> storytelling brand by understanding what people actually respond to.',
  },
  {
    plain: 'Turned product complexity into clearer onboarding, education, and feature adoption.',
    html: 'Turned product complexity into <span class="hl">clearer onboarding</span>, education, and feature adoption.',
  },
  {
    plain: 'Built backend tools end-to-end, from authentication and APIs to databases and deployment.',
    html: 'Built backend tools <span class="hl">end-to-end</span>, from authentication and APIs to databases and deployment.',
  },
];

/* Adjust timing here. */
const AUTOPLAY_MS = 3800;
const TRANSITION_MS = 460;
/* Disable autoplay here if you want a fully manual carousel. */
const AUTOPLAY_ENABLED = true;

type Phase = 'idle' | 'enter' | 'entered' | 'exit';

export function HeroProofCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('enter');
  const [isPaused, setIsPaused] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [announceLine, setAnnounceLine] = useState(heroLines[0].plain);

  const canAutoplay = AUTOPLAY_ENABLED && !isPaused && !isReducedMotion;

  const currentLine = useMemo(() => heroLines[activeIndex], [activeIndex]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => {
      setIsReducedMotion(mediaQuery.matches);
      setPhase(mediaQuery.matches ? 'idle' : 'enter');
    };

    handleChange();
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    setAnnounceLine(currentLine.plain);

    if (isReducedMotion) {
      setPhase('idle');
      return undefined;
    }

    setPhase('enter');
    const settleTimer = window.setTimeout(() => setPhase('entered'), TRANSITION_MS);

    return () => window.clearTimeout(settleTimer);
  }, [currentLine, isReducedMotion]);

  useEffect(() => {
    if (!canAutoplay) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setPhase('exit');

      window.setTimeout(() => {
        setActiveIndex((currentIndex) => (currentIndex + 1) % heroLines.length);
      }, TRANSITION_MS);
    }, AUTOPLAY_MS);

    return () => window.clearTimeout(timer);
  }, [activeIndex, canAutoplay]);

  return (
    <section
      className="hero-proof-carousel mb-7"
      aria-label="Selected proof points"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div className="hero-proof-carousel__viewport">
        <p
          className={`hero-proof-carousel__line hero-proof-carousel__line--${phase}`}
          style={{
            transitionDuration: isReducedMotion ? '0ms' : `${TRANSITION_MS}ms`,
            ['--hero-line-tilt' as string]: activeIndex % 2 === 0 ? '-0.55deg' : '0.45deg',
          }}
          dangerouslySetInnerHTML={{ __html: currentLine.html }}
        />
      </div>

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {announceLine}
      </p>
    </section>
  );
}
