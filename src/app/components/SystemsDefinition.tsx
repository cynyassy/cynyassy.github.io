import { motion } from 'motion/react';

const influenceChain = [
  'Geography shapes access',
  'Access shapes resources',
  'Resources shape institutions',
  'Institutions shape survival',
];

export function SystemsDefinition() {
  return (
    <section className="border-y-2 border-black bg-white px-6 py-20">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="space-y-5"
        >
          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-[#666]">
            What I mean by systems
          </p>
          <h2 className="max-w-xl text-4xl font-semibold leading-[1.02] tracking-[-0.05em] md:text-5xl">
            Connected parts that influence each other over time.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08, duration: 0.45 }}
          className="space-y-6 text-base leading-relaxed text-[#333] md:text-lg"
        >
          <p>
            I use <strong>systems</strong> to mean the way things are connected, influence each other, and
            begin to behave as a whole. That lens comes from an early pull toward physics, science fiction,
            and the question of how atoms, molecules, organisms, rules, and incentives combine into larger behavior.
          </p>
          <p>
            In practice, I map what influences what. If this rule changes, what behavior follows? If that
            behavior compounds, what becomes easier, harder, possible, or impossible? That is how a messy domain
            starts becoming legible.
          </p>

          <div className="rounded-[6px] border-2 border-black bg-white p-5">
            <div className="mb-4 flex items-center justify-between gap-4">
              <p className="text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-[#666]">
                Example from Perspectives
              </p>
              <span className="h-3 w-3 shrink-0 bg-[#FF4400]" />
            </div>
            <div className="grid gap-3 sm:grid-cols-4">
              {influenceChain.map((item, index) => (
                <div key={item} className="relative border-2 border-black bg-white p-3 text-sm font-semibold">
                  <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.18em] text-[#777]">
                    0{index + 1}
                  </span>
                  {item}
                  {index < influenceChain.length - 1 ? (
                    <span className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 bg-white px-1 text-lg font-semibold sm:block">
                      →
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[#555]">
              One thing changes the next. From chaos, clarity starts to emerge.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
