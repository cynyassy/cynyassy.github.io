import { motion } from 'motion/react';

const aiLanes = [
  {
    title: 'Research and synthesis',
    description:
      'I use AI to summarize messy inputs, compare feedback, extract patterns, and turn raw notes into sharper product questions.',
  },
  {
    title: 'Design and prototyping',
    description:
      'I use AI to explore flows, draft interface states, pressure-test copy, and move from concept to prototype faster.',
  },
  {
    title: 'Engineering and QA',
    description:
      'I use AI to scaffold implementation, debug issues, review edge cases, and shorten the loop between idea and working code.',
  },
];

export function AIWorkflowSection() {
  return (
    <section className="border-y-2 bg-white px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="mb-3 text-[0.78rem] uppercase tracking-[0.22em] text-[#666]">AI Workflow</p>
          <h2 className="text-4xl font-semibold tracking-[-0.05em] text-[#111] md:text-5xl">
            How I use AI to speed up design and engineering loops
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#4e4e4e]">
            I use AI as a collaborator for faster iteration, not as a replacement for judgment. It helps me move from
            messy inputs to clearer decisions, then from decisions to prototypes, implementation, and QA.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {aiLanes.map((lane, index) => (
            <motion.div
              key={lane.title}
              className="rounded-[14px] border-2 bg-white p-6"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <div className="mb-4 h-2 w-10 bg-[#FF4400]" />
              <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[#111]">{lane.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-[#555]">{lane.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="mt-8 max-w-4xl text-base leading-relaxed text-[#444]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Used across product exploration, case-study writing, interface iteration, implementation, and review workflows
          for Coffee Tools, Perspectives, AlgoTest, and this portfolio itself.
        </motion.p>
      </div>
    </section>
  );
}
