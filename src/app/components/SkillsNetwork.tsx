import { motion } from 'motion/react';

type PracticeCard = {
  id: string;
  title: string;
  description: string;
  skills: string[];
};

const practiceCards: PracticeCard[] = [
  {
    id: 'explain',
    title: 'Explain',
    description: 'Choose language and stories that make difficult ideas approachable without making them shallow.',
    skills: ['Writing', 'Illustration', 'Comics', 'Video', 'Documentation'],
  },
  {
    id: 'structure',
    title: 'Structure',
    description: 'Understand people, relationships, constraints, and consequences before deciding what should be made.',
    skills: ['Research', 'Systems Mapping', 'Service Design', 'Product Strategy', 'Facilitation'],
  },
  {
    id: 'build',
    title: 'Build',
    description: 'Turn an explanation into a usable thing when words alone are not enough.',
    skills: ['React', 'TypeScript', 'APIs', 'Databases', 'Prototypes'],
  },
  {
    id: 'learn',
    title: 'Learn and iterate',
    description: 'Treat response as evidence, then improve the story, product, or experience around what people actually need.',
    skills: ['Analytics', 'Audience Feedback', 'Experiments', 'AI Workflows', 'Iteration'],
  },
];

export function SkillsNetwork() {
  return (
    <section id="skills" className="relative overflow-hidden bg-white px-6 py-24">
      <motion.div
        className="mx-auto mb-16 max-w-5xl text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="mb-3 text-[0.78rem] uppercase tracking-[0.22em] text-[#666]">Capabilities</p>
        <h2 className="mb-4 text-5xl font-semibold tracking-[-0.05em] text-[#111] md:text-6xl">
          The medium follows the problem.
        </h2>
        <p className="mx-auto max-w-3xl text-lg leading-relaxed text-[#555]">
          I use different disciplines at different stages of the work, from understanding the problem to shaping,
          building, and improving the outcome.
        </p>
      </motion.div>

      <div className="mx-auto grid max-w-6xl border-y-2 border-black md:grid-cols-2">
        {practiceCards.map((card, index) => (
          <motion.article
            key={card.id}
            className="border-b-2 border-black py-8 md:min-h-[18rem] md:px-8 md:[&:nth-child(odd)]:border-r-2 md:[&:nth-last-child(-n+2)]:border-b-0 md:first:pl-0 md:[&:nth-child(2)]:pr-0 md:[&:nth-child(3)]:pl-0 md:last:pr-0"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
          >
            <span className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#FF4400]">0{index + 1}</span>
            <h3 className="mb-3 text-3xl font-semibold tracking-[-0.04em] text-[#111]">{card.title}</h3>
            <p className="mb-6 leading-relaxed text-[#555]">{card.description}</p>
            <p className="text-sm font-semibold leading-relaxed text-[#222]">{card.skills.join(' · ')}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
