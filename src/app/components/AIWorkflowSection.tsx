import { motion } from 'motion/react';

const aiLanes = [
  {
    title: 'Design exploration',
    description:
      'I use AI to get to a strong first draft faster: testing flows, structuring interfaces, and exploring directions before I refine them with judgment.',
  },
  {
    title: 'Engineering acceleration',
    description:
      'I use AI to scaffold implementation, debug faster, and reduce the time between an idea, a prototype, and something that actually works.',
  },
  {
    title: 'System thinking',
    description:
      'I use AI to pressure-test concepts, map complexity, and turn vague product ideas into decisions I can actually design or build from.',
  },
];

export function AIWorkflowSection() {
  return (
    <section className="border-y-2 border-black bg-white px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="mb-3 text-[0.78rem] uppercase tracking-[0.22em] text-[#666]">AI Workflow</p>
          <h2 className="text-4xl font-semibold tracking-[-0.05em] text-[#111] md:text-5xl">
            How I Use AI
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#4e4e4e]">
            I use AI as part of how I think, prototype, design, and build. It helps me move faster from
            a rough idea to something testable, whether that means shaping a product flow, exploring an
            interface, or accelerating implementation.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {aiLanes.map((lane, index) => (
            <motion.div
              key={lane.title}
              className="rounded-[14px] border-2 border-black bg-white p-6 shadow-[6px_6px_0px_rgba(0,0,0,1)]"
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
          Used across product exploration, case-study writing, interface iteration, and implementation
          workflows for Coffee Tools, Perspectives, AlgoTest, and this portfolio itself.
        </motion.p>
      </div>
    </section>
  );
}
