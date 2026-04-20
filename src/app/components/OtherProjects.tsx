import { motion } from 'motion/react';
import { ArrowRight, Blocks, Gamepad2, Layers3 } from 'lucide-react';

const projectBuckets = [
  {
    icon: <Blocks size={30} />,
    title: 'Board & Card Game Systems',
    description:
      'Future tabletop work lives here: rule systems, playable card concepts, analog prototypes, and game mechanics built to explore behavior and decision-making.',
    status: 'Planned shelf',
  },
  {
    icon: <Gamepad2 size={30} />,
    title: 'Interactive Learning Games',
    description:
      'Small web experiments, explainers, and systems-based interactives that turn abstract ideas into something you can test, play with, and understand.',
    status: 'Growing archive',
  },
  {
    icon: <Layers3 size={30} />,
    title: 'Creative Tools & Experiments',
    description:
      'A place for prototypes that do not fit neatly into the main four case studies yet, but still show how I think, build, and iterate.',
    status: 'Open-ended',
  },
];

export function OtherProjects() {
  return (
    <section id="other-projects" className="py-24 px-6 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-14 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="mb-3 text-[0.78rem] uppercase tracking-[0.22em] text-[#666]">Other Projects</p>
          <h2 className="text-5xl md:text-6xl font-semibold tracking-[-0.05em] text-[#111] mb-4">
            A shelf for the next wave of experiments
          </h2>
          <p className="text-lg leading-relaxed text-[#555]">
            This is where future card games, interactable systems, and smaller experiments will keep collecting over
            time without crowding the core case studies.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {projectBuckets.map((item, index) => (
            <motion.article
              key={item.title}
              className="border-2 border-black bg-white p-8 rounded-[8px] hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-all duration-300"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="mb-6 text-[#111]">{item.icon}</div>
              <div className="inline-block mb-4 rounded-[4px] border-2 border-black bg-[#FF4400] px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white">
                {item.status}
              </div>
              <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[#111] mb-3">{item.title}</h3>
              <p className="text-[#555] leading-relaxed">{item.description}</p>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <a
            href="projects/other-projects.html"
            className="inline-flex items-center gap-2 rounded-[4px] border-2 border-black bg-white px-5 py-3 font-semibold text-[#111] transition-colors hover:bg-black hover:text-white"
          >
            <span>Open Other Projects</span>
            <ArrowRight size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
