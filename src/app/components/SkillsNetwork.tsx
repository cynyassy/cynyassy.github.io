import { motion } from 'motion/react';

type SkillCard = {
  id: string;
  title: string;
  description: string;
  skills: string[];
};

const skillCards: SkillCard[] = [
  {
    id: 'product-strategy',
    title: 'Product Strategy & Growth',
    description: 'Turning user pain into clearer onboarding, acquisition loops, measurable outcomes, and sharper product decisions.',
    skills: ['Growth Strategy', 'Onboarding', 'SEO', 'Analytics', 'Product Education'],
  },
  {
    id: 'systems-design',
    title: 'Systems & Simulation Design',
    description: 'Understanding how structure, rules, incentives, and feedback loops shape behavior over time.',
    skills: ['Game Design', 'Simulations', 'Service Design', 'Systems Mapping', 'Design Research'],
  },
  {
    id: 'builder',
    title: 'Building & Technical Execution',
    description: 'Turning ideas into working tools across backend logic, APIs, data models, prototypes, and visual communication.',
    skills: ['Backend Systems', 'TypeScript', 'APIs', 'Databases', 'Prototyping'],
  },
];

export function SkillsNetwork() {
  return (
    <section id="skills" className="py-24 px-6 bg-white relative overflow-hidden">
      <motion.div
        className="max-w-5xl mx-auto mb-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="mb-3 text-[0.78rem] uppercase tracking-[0.22em] text-[#666]">Skills</p>
        <h2 className="text-5xl md:text-6xl font-semibold tracking-[-0.05em] text-[#111] mb-4">
          The capabilities underneath the case studies
        </h2>
      </motion.div>

      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
        {skillCards.map((card, index) => (
          <motion.article
            key={card.id}
            className="border-2 border-black bg-white p-8 rounded-[8px] hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-all duration-300"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
          >
            <h3 className="text-3xl font-semibold tracking-[-0.04em] text-[#111] mb-3">{card.title}</h3>
            <p className="text-[#555] leading-relaxed mb-6">{card.description}</p>

            <ul className="flex flex-wrap gap-3">
              {card.skills.map((skill) => (
                <li
                  key={skill}
                  className="px-4 py-2 border border-black bg-white text-sm font-medium text-[#111] rounded-[4px]"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
