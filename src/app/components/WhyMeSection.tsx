import { motion } from 'motion/react';

const reasons = [
  'I find where users get stuck.',
  'I turn confusion into structure.',
  'I build the first working version or education layer.',
];

export function WhyMeSection() {
  return (
    <section className="border-b-2 border-black bg-white px-6 py-16">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-[#666]">Why me</p>
          <h2 className="text-4xl font-semibold leading-[1.03] tracking-[-0.05em] text-[#111] md:text-5xl">
            I&apos;m useful when a product is powerful but hard to understand.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="grid gap-4 md:grid-cols-3"
        >
          {reasons.map((reason, index) => (
            <div key={reason} className="rounded-[8px] border-2 border-black bg-white p-5">
              <p className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#777]">
                0{index + 1}
              </p>
              <p className="text-xl font-semibold leading-tight tracking-[-0.03em] text-[#111]">{reason}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
