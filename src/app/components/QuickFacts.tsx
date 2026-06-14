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
    label: 'Audience built',
    detail: '1.2M monthly reach at peak in 2021',
  },
  {
    value: 'Level 100',
    label: 'Backend path completed',
    detail: '200+ days of hands-on learning through Boot.dev',
  },
];

export function QuickFacts() {
  return (
    <section className="border-y-2 border-black bg-black px-6 py-14 text-white" aria-labelledby="quick-facts-title">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <p className="text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-white/60">Selected proof</p>
            <h2 id="quick-facts-title" className="mt-2 text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
              The work has shipped, grown, and been used.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-white/65 md:text-right md:text-base">
            A few signals from growth strategy, audience building, product experiments, and technical work.
          </p>
        </motion.div>

        <div className="grid border-y border-white/30 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((fact, index) => (
            <motion.article
              key={fact.label}
              className="border-b border-white/30 py-7 sm:px-6 sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <p className="text-4xl font-semibold tracking-[-0.055em] text-[#FF4400] md:text-5xl">{fact.value}</p>
              <h3 className="mt-3 text-base font-semibold text-white md:text-lg">{fact.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{fact.detail}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
