import { motion } from 'motion/react';
import { WireframeCard } from './wireframe/WireframeCard';

const accessGaps = ['Knowledge', 'Language', 'Confidence', 'Opportunity'];

export function AboutSection() {
  return (
    <section className="relative overflow-hidden bg-black px-6 py-24 text-white">
      <div className="absolute inset-0 opacity-5">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="about-grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
          <rect width="100" height="100" fill="url(#about-grid)" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          className="mb-12 max-w-4xl space-y-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-[0.78rem] uppercase tracking-[0.22em] text-white/65">Where the work began</p>
          <h2 className="text-4xl font-semibold leading-[1.04] tracking-[-0.05em] md:text-6xl">
            Teach For India made unequal access impossible for me to ignore.
          </h2>
          <p className="max-w-3xl text-lg leading-relaxed text-white/75 md:text-xl">
            I saw what happens when knowledge, language, confidence, and opportunity are distributed unevenly. Knowing
            something is not the same as making it available to someone else. That distinction has shaped nearly every
            project I have chosen since.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <WireframeCard className="h-full bg-white text-black">
              <p className="text-[0.78rem] uppercase tracking-[0.22em] text-[#666]">What became visible</p>
              <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#111]">
                Complexity is not neutral when it keeps people out.
              </h3>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {accessGaps.map((gap, index) => (
                  <div
                    key={gap}
                    className={`border-2 border-black p-4 text-base font-semibold ${index === 3 ? 'bg-[#FF4400] text-white' : 'bg-white text-black'}`}
                  >
                    {gap}
                  </div>
                ))}
              </div>
            </WireframeCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
          >
            <WireframeCard className="h-full bg-white text-black">
              <p className="text-[0.78rem] uppercase tracking-[0.22em] text-[#666]">What followed</p>
              <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#111]">
                Each project became a different way of sharing understanding.
              </h3>
              <p className="mt-5 text-base leading-relaxed text-[#444] md:text-lg">
                Documentation helped traders use a technical platform. Comics gave people gentler language for inner
                life. A board game made structural inequality discussable. An emotion tool helped people name what
                they felt. Code let useful explanations become interactive.
              </p>
              <p className="mt-5 border-l-4 border-[#FF4400] pl-4 text-base font-semibold leading-relaxed text-[#222]">
                I learn because I am curious. I explain because I care. I build because explanation sometimes needs to
                become an experience, tool, or system.
              </p>
            </WireframeCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
