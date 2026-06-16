import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Instagram, Linkedin, Mail } from 'lucide-react';
import { WireframeButton } from './wireframe/WireframeButton';
import productDevelopmentDoodle from '../../assets/hero-personas/product-development.png';
import artDoodle from '../../assets/hero-personas/art.png';
import designDoodle from '../../assets/hero-personas/design.png';
import techStackDoodle from '../../assets/hero-personas/techstack_builder.png';

// Keep this experiment easy to reverse while we evaluate the illustrated hero.
const showHeroDoodle = true;

const heroDoodles = [
  {
    src: artDoodle,
    alt: 'A hand-drawn character making art',
  },
  {
    src: designDoodle,
    alt: 'A hand-drawn character arranging a design system',
  },
  {
    src: productDevelopmentDoodle,
    alt: 'A hand-drawn character explaining a product-development path on a whiteboard',
  },
  {
    src: techStackDoodle,
    alt: 'A hand-drawn character explaining a technical architecture on a whiteboard',
  },
];

const heroLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/cynyassy/',
    icon: Linkedin,
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/cynyassy',
    icon: Instagram,
  },
  {
    label: 'Email',
    href: 'mailto:cynyassy@gmail.com',
    icon: Mail,
  },
];

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const [activeDoodle, setActiveDoodle] = useState(0);

  useEffect(() => {
    if (!showHeroDoodle || prefersReducedMotion) return;

    const rotation = window.setInterval(() => {
      setActiveDoodle((current) => (current + 1) % heroDoodles.length);
    }, 3200);

    return () => window.clearInterval(rotation);
  }, [prefersReducedMotion]);

  const scrollToWork = () => {
    document.getElementById('featured-work')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white">
      <motion.nav
        className="absolute right-6 top-24 z-20 hidden items-center gap-2 lg:flex"
        aria-label="Important profile links"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.45 }}
      >
        {heroLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={link.href.startsWith('mailto:') ? undefined : 'noreferrer'}
              className="flex h-11 w-11 items-center justify-center rounded-[4px] border-2 border-black bg-white text-[#111] transition-colors hover:bg-[#FF4400] hover:text-white"
              aria-label={link.label}
              title={link.label}
            >
              <Icon size={20} strokeWidth={2.4} aria-hidden="true" />
            </a>
          );
        })}
      </motion.nav>

      <div className="absolute inset-0 opacity-5">
        <svg className="h-full w-full" viewBox="0 0 1200 800">
          <motion.path
            d="M100,200 Q300,100 500,200 T900,200"
            stroke="black"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
          <motion.circle
            cx="200"
            cy="150"
            r="30"
            stroke="black"
            strokeWidth="2"
            fill="none"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          />
          <motion.rect
            x="800"
            y="500"
            width="60"
            height="60"
            stroke="black"
            strokeWidth="2"
            fill="none"
            initial={{ rotate: -45, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-28">
        <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <motion.div
              className="mb-6 inline-block"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative inline-block -rotate-1 rounded-[4px] bg-white px-6 py-2">
                <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[#333]">
                  Shashank / Cynyassy
                </span>
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[4px] border-4 border-[#333]" />
              </div>
            </motion.div>

            <motion.p
              className="mx-auto mb-4 text-[0.85rem] font-semibold uppercase tracking-[0.2em] text-[#666] lg:mx-0"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.34, duration: 0.5 }}
            >
              Storytelling · Product · Technology
            </motion.p>

            <motion.h1
              className="mb-7 text-5xl font-semibold leading-[1.02] tracking-[-0.055em] md:text-6xl lg:text-[4.35rem]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              I learn complex things and make them clear, useful, and engaging.
            </motion.h1>

            <motion.p
              className="mx-auto mb-9 max-w-2xl text-base leading-relaxed text-[#666] md:text-lg lg:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              I move between strategy and execution: understanding a subject, finding the form that serves it best,
              and making the result real. That might be documentation, a product flow, a comic, a simulation, or code.
            </motion.p>

            <motion.blockquote
              className="mx-auto mb-10 max-w-2xl border-l-4 border-[#FF4400] pl-5 text-left text-base font-semibold leading-relaxed text-[#222] md:text-lg lg:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              All stories worth telling are worth telling simply.
            </motion.blockquote>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.76 }}
              whileHover={{ y: -2 }}
              className="inline-block"
            >
              <WireframeButton onClick={scrollToWork} variant="primary" className="w-auto">
                See the work
              </WireframeButton>
            </motion.div>

            <motion.div
              className="mt-6 flex flex-wrap justify-center gap-2 lg:hidden"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.82, duration: 0.45 }}
              aria-label="Important profile links"
            >
              {heroLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={link.href.startsWith('mailto:') ? undefined : 'noreferrer'}
                    className="flex h-11 w-11 items-center justify-center rounded-[4px] border-2 border-black bg-white text-[#111] transition-colors hover:bg-[#FF4400] hover:text-white"
                    aria-label={link.label}
                    title={link.label}
                  >
                    <Icon size={20} strokeWidth={2.4} aria-hidden="true" />
                  </a>
                );
              })}
            </motion.div>
          </motion.div>

          <motion.div
            className="relative overflow-hidden bg-black p-8 text-white md:p-12"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <div className="relative grid grid-cols-[minmax(0,1fr)_minmax(8rem,0.72fr)] items-start gap-5 border-b border-white/30 pb-5">
              <p className="pt-1 text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-white/80">
                My mediums for communication
              </p>
              {showHeroDoodle ? (
                <motion.div
                  className="-mb-8 -mt-7 ml-auto flex aspect-square w-full max-w-[14.5rem] items-center justify-center overflow-hidden rounded-full bg-white p-4"
                  initial={{ opacity: 0, rotate: 2, y: 8 }}
                  animate={{ opacity: 1, rotate: -1, y: 0 }}
                  transition={{ delay: 0.72, duration: 0.55 }}
                  aria-live="off"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.img
                      key={heroDoodles[activeDoodle].src}
                      src={heroDoodles[activeDoodle].src}
                      alt={heroDoodles[activeDoodle].alt}
                      className="w-full object-contain"
                      initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 1.04 }}
                      transition={{ duration: 0.38, ease: 'easeOut' }}
                    />
                  </AnimatePresence>
                </motion.div>
              ) : (
                <div className="absolute right-[-4rem] top-[-4rem] h-48 w-48 rounded-full bg-[#FF4400] opacity-90" />
              )}
            </div>
            <div className="relative space-y-0">
              {['Documentation', 'Products', 'Comics', 'Games', 'Code'].map((medium, index) => (
                <motion.p
                  key={medium}
                  className="border-b border-white/30 py-4 text-3xl font-semibold tracking-[-0.045em] md:text-4xl"
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.64 + index * 0.06 }}
                >
                  {medium}
                </motion.p>
              ))}
            </div>
            <p className="relative pt-6 text-lg leading-relaxed text-white/75">
              The job stays the same: understand the idea, then make it work for its audience.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
