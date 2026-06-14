import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

const qualifications = [
  {
    title: 'MFA Design for Social Innovation',
    institution: 'School of Visual Arts, NYC',
    meta: 'Graduated 2023',
    description:
      'Research, service design, facilitation, and storytelling taught me to connect individual experiences to the structures around them.',
    href: 'https://dsi.sva.edu/people/students-alumni/shashank-sharma/',
    cta: 'View SVA profile',
  },
  {
    title: 'Boot.dev Backend Path',
    institution: 'Hands-on backend development',
    meta: 'Completed · Level 100',
    description:
      'More than 200 days of building APIs, CLIs, data models, and projects across Python, TypeScript, SQL, Docker, and distributed systems.',
    href: 'https://www.boot.dev/u/cynyassy',
    cta: 'View Boot.dev profile',
  },
  {
    title: 'B.Tech Engineering Physics',
    institution: 'Delhi Technological University',
    meta: 'Electronics & Communication · Robotics',
    description:
      'A technical foundation in physics, electronics, communication, and robotics that shaped how I understand connected parts and larger behaviour.',
  },
  {
    title: 'Figma UI/UX Essentials',
    institution: 'Udemy',
    meta: 'Certificate completed',
    description:
      'A structured study of interface fundamentals that sharpened how I translate ideas into usable screens, flows, and prototypes.',
    href: 'https://ude.my/UC-511a39f0-cfd9-4ff2-b735-0d7795510264',
    cta: 'View certificate',
  },
];

export function QualificationsSection() {
  return (
    <section id="qualifications" className="relative overflow-hidden bg-white px-6 py-24">
      <motion.div
        className="mx-auto mb-12 max-w-6xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="mb-3 text-[0.72rem] uppercase tracking-[0.24em] text-[#666]">Learning record</p>
        <h2 className="mb-4 max-w-3xl text-4xl font-semibold tracking-[-0.05em] text-[#111] md:text-5xl">
          How I learned to do this
        </h2>
        <p className="max-w-2xl text-base leading-relaxed text-[#555] md:text-lg">
          Learning, for me, has always been tied to making: understanding people, shaping ideas,
          and building the technical ability to bring them to life.
        </p>
      </motion.div>

      <div className="mx-auto grid max-w-6xl border border-black md:grid-cols-2">
        {qualifications.map((item, index) => {
          const dividerClasses = [
            'border-b border-black md:border-r',
            'border-b border-black',
            'border-b border-black md:border-b-0 md:border-r',
            '',
          ][index];

          const content = (
            <article
              className={`group flex h-full min-h-[19rem] flex-col bg-white p-7 transition-colors duration-200 hover:bg-[#fafafa] md:p-9 ${dividerClasses}`}
            >
              <div className="mb-8 flex items-start justify-between gap-6">
                <span className="text-sm font-semibold text-[#ff4d00]">0{index + 1}</span>
                <span className="text-right text-[0.68rem] font-medium uppercase tracking-[0.16em] text-[#666]">
                  {item.meta}
                </span>
              </div>

              <p className="mb-2 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-[#666]">
                {item.institution}
              </p>
              <h3 className="mb-4 max-w-md text-2xl font-semibold tracking-[-0.035em] text-[#111] md:text-[1.75rem]">
                {item.title}
              </h3>
              <p className="mb-8 max-w-lg leading-relaxed text-[#555]">{item.description}</p>

              {item.href ? (
                <div className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[#111]">
                  <span>{item.cta}</span>
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              ) : null}
            </article>
          );

          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              {item.href ? (
                <a href={item.href} target="_blank" rel="noreferrer" className="block h-full">
                  {content}
                </a>
              ) : (
                content
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
