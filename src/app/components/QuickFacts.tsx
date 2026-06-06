import { motion } from 'motion/react';

const facts = [
  {
    value: '6x',
    label: 'Organic traffic growth',
    detail: '25K to 150K monthly visits at AlgoTest',
  },
  {
    value: '3x+',
    label: 'Revenue growth influenced',
    detail: '₹15–18L to ₹50L+ monthly revenue',
  },
  {
    value: '100K+',
    label: 'Community built',
    detail: '1.2M monthly reach at peak in 2021',
  },
  {
    value: 'MFA',
    label: 'Design for Social Innovation',
    detail: 'SVA, New York City · Graduated 2023',
  },
  {
    value: 'Level 100',
    label: 'Backend path completed',
    detail: 'Boot.dev · 200+ days of hands-on learning',
  },
  {
    value: 'Fellow',
    label: 'Teach For India',
    detail: 'A foundation in teaching and learning design',
  },
];

export function QuickFacts() {
  return (
    <section className="border-y-2 border-black bg-black px-6 py-14 text-white" aria-labelledby="quick-facts-title">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <p className="text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-white/60">Quick facts</p>
            <h2 id="quick-facts-title" className="mt-2 text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
              Proof before the deeper story
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-white/65 md:text-right md:text-base">
            A snapshot of business impact, community building, technical learning, and design education.
          </p>
        </motion.div>

        <div className="grid gap-px overflow-hidden rounded-[8px] border border-white/30 bg-white/30 sm:grid-cols-2 lg:grid-cols-3">
          {facts.map((fact, index) => (
            <motion.article
              key={fact.label}
              className="min-h-[10rem] bg-black p-5 md:p-6"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <p className="text-3xl font-semibold tracking-[-0.05em] text-[#FF4400] md:text-4xl">{fact.value}</p>
              <h3 className="mt-3 text-base font-semibold text-white md:text-lg">{fact.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{fact.detail}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
