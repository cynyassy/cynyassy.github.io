import { motion } from 'motion/react';

const steps = [
  {
    title: 'Learn',
    description: 'Understand the subject, the audience, the constraints, and the connections shaping the problem.',
    capabilities: ['Research', 'Systems mapping', 'Service design', 'Product strategy', 'Analytics'],
  },
  {
    title: 'Translate',
    description: 'Find the clearest narrative, structure, metaphor, interaction, or product model for the situation.',
    capabilities: ['Writing', 'Illustration', 'Comics', 'Video', 'Documentation', 'Facilitation'],
  },
  {
    title: 'Build',
    description: 'Write, design, prototype, or code the idea into a tangible form, then improve it through response.',
    capabilities: ['React', 'TypeScript', 'APIs', 'Databases', 'Prototypes', 'AI workflows'],
  },
];

export function SystemsDefinition() {
  return (
    <section id="skills" className="border-y-2 border-black bg-black px-6 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end"
        >
          <div>
            <p className="text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-white/60">How I work</p>
            <h2 className="mt-3 text-4xl font-semibold leading-[1.02] tracking-[-0.05em] md:text-5xl">
              Learn. Translate. Build.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            I begin by understanding the subject and the people involved, choose the form that makes the idea most
            useful, then make and test the thing rather than stopping at a recommendation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08, duration: 0.45 }}
          className="mt-12 grid border-y border-white/30 md:grid-cols-3"
        >
          {steps.map((step, index) => (
            <article key={step.title} className="border-b border-white/30 py-8 md:border-b-0 md:border-r md:border-white/30 md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
              <span className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#FF4400]">0{index + 1}</span>
              <h3 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-white">{step.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-white/70">{step.description}</p>
              <p className="mt-6 text-sm font-semibold leading-relaxed text-white">
                {step.capabilities.join(' · ')}
              </p>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
