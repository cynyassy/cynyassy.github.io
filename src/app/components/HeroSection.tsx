import { motion } from 'motion/react';
import { HeroProofCarousel } from './HeroProofCarousel';
import { WireframeButton } from './wireframe/WireframeButton';
import productDevelopmentImage from '../../assets/hero-personas/product-development.png';
import techstackBuilderImage from '../../assets/hero-personas/techstack_builder.png';
import artImage from '../../assets/hero-personas/art.png';
import designImage from '../../assets/hero-personas/design.png';

const roleAreas = [
  'Design Engineering',
  'Product Strategy',
  'Backend Systems',
  'Growth & Communication',
];

const impactProof = [
  'Scaled AlgoTest to 150K monthly organic traffic',
  'Helped drive 3x revenue through documentation-led growth',
  'Built backend-first product systems through Coffee Tools',
  'Built a 100K+ storytelling community through Cynyassy',
];

const personas = [
  {
    title: 'Systems Thinker',
    description: 'Designing simulations, feedback loops, and behavioral systems that reveal how outcomes emerge over time.',
    image: designImage,
    targetId: 'perspectives',
    className: 'md:-translate-y-2',
  },
  {
    title: 'Builder',
    description: 'Building real systems end-to-end with backend logic, APIs, databases, and working prototypes.',
    image: techstackBuilderImage,
    targetId: 'coffee-tools',
    className: 'md:translate-y-12',
  },
  {
    title: 'Product Strategist',
    description: 'Improving onboarding, growth, and product outcomes by connecting user behavior to business impact.',
    image: productDevelopmentImage,
    targetId: 'algotest-growth-strategy',
    className: 'md:-translate-y-6',
  },
  {
    title: 'Storyteller',
    description: 'Communicating ideas through narrative, comics, and simple stories that make complex ideas accessible.',
    image: artImage,
    targetId: 'cynyassy-platform',
    className: 'md:translate-y-10',
  },
];

export function HeroSection() {
  const scrollToWork = () => {
    document.getElementById('featured-work')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProject = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-white">
      {/* Background comic elements */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 1200 800">
          <motion.path
            d="M100,200 Q300,100 500,200 T900,200"
            stroke="black"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
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

      <div className="max-w-7xl mx-auto px-6 relative z-10 py-24">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            {/* Name badge */}
            <motion.div
              className="inline-block mb-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative bg-white px-6 py-2 inline-block transform -rotate-1 rounded-[4px]">
                <span className="text-sm font-semibold tracking-[0.18em] uppercase text-[#333]">Shashank/Cynyassy&apos;s Portfolio</span>
                <div aria-hidden="true" className="absolute border-4 border-[#333] border-solid inset-0 pointer-events-none rounded-[4px]" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.55 }}
            >
              <HeroProofCarousel />
            </motion.div>

            <motion.p
              className="mb-4 text-[0.85rem] font-semibold uppercase tracking-[0.2em] text-[#666] mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.34, duration: 0.5 }}
            >
              Design Engineer / Hybrid Product Builder
            </motion.p>

            {/* Main title */}
            <motion.h1
              className="mb-8 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
                <span className="block text-5xl md:text-5xl lg:text-[4.0rem] tracking-[-0.04em] leading-[1.05] mb-4 relative">
                  I build product systems
                  <br />
                  that drive growth
                </span>
              </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-xl md:text-2xl max-w-3xl mb-8 leading-relaxed text-[#333] mx-auto lg:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Across design, content, and engineering.
            </motion.p>

            <motion.p
              className="text-lg md:text-xl max-w-2xl mb-12 leading-relaxed text-[#666] mx-auto lg:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              From scaling AlgoTest to 150K monthly organic traffic to building backend tools, simulations, and storytelling systems, I work across the full product stack.
            </motion.p>

            <motion.div
              className="mb-8 space-y-4 max-w-3xl mx-auto lg:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.74 }}
            >
              <div className="flex flex-wrap gap-3">
                {roleAreas.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center rounded-[4px] border-2 border-black bg-white px-3 py-2 text-sm font-medium text-[#222]"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <ul className="space-y-2 text-sm md:text-base text-[#444]">
                {impactProof.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 bg-[#FF4400]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="text-sm md:text-base leading-relaxed text-[#444]">
                I believe the strongest product systems come from solving real user problems once, then letting that
                solution scale.
              </p>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ y: -2 }}
              className="inline-block"
            >
              <WireframeButton onClick={scrollToWork} variant="primary" className="w-auto">
                Explore My Work
              </WireframeButton>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <div className="absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_top,_rgba(255,68,0,0.08),_transparent_55%)]" />
            <div className="relative grid gap-5 sm:grid-cols-2">
              {personas.map((persona, index) => (
                <motion.button
                  key={persona.title}
                  type="button"
                  onClick={() => scrollToProject(persona.targetId)}
                  className={`relative bg-white p-5 rounded-[18px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-4 border-black min-h-[23rem] text-left ${persona.className}`}
                  initial={{ opacity: 0, y: 24, rotate: index === 1 ? 2 : -2 }}
                  animate={{ opacity: 1, y: 0, rotate: index === 1 ? 2 : -2 }}
                  transition={{ delay: 0.75 + index * 0.12, duration: 0.55 }}
                  whileHover={{ y: -8, rotate: 0 }}
                  whileTap={{ scale: 0.985 }}
                >
                  <div className="absolute -top-3 left-4 inline-flex items-center rounded-full border-2 border-black bg-[#FF4400] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
                    Persona {index + 1}
                  </div>
                  <div className="aspect-[5/4] overflow-hidden rounded-[12px] border-2 border-black bg-[#f7f7f7]">
                    <img
                      src={persona.image}
                      alt={`${persona.title} persona illustration`}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="pt-4">
                    <p className="text-xl md:text-2xl font-semibold text-black tracking-[-0.03em]">
                      {persona.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[#555]">
                      {persona.description}
                    </p>
                    <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#FF4400]">
                      <span>Jump to related project</span>
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Corner illustrations */}
      <motion.div
        className="absolute bottom-10 left-10 w-24 h-24"
        initial={{ opacity: 0, rotate: -180 }}
        animate={{ opacity: 0.2, rotate: 0 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <svg viewBox="0 0 100 100">
          <path
            d="M10,50 Q30,20 50,50 T90,50"
            stroke="black"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="50" cy="50" r="5" fill="black" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-20 right-20 w-32 h-32"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <svg viewBox="0 0 100 100">
          <path
            d="M20,20 L80,20 L80,80 L20,80 Z"
            stroke="black"
            strokeWidth="2"
            fill="none"
            strokeDasharray="5,5"
          />
          <line x1="20" y1="20" x2="80" y2="80" stroke="black" strokeWidth="1" />
          <line x1="80" y1="20" x2="20" y2="80" stroke="black" strokeWidth="1" />
        </svg>
      </motion.div>
    </section>
  );
}
