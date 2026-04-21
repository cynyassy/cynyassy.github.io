import { motion } from 'motion/react';
import { ArrowUpRight, Award, BookOpen, ExternalLink } from 'lucide-react';
import figmaEssentialsCertificate from '../../assets/figma-essentials-certificate.jpg';

const bootDevProfile = {
  href: 'https://www.boot.dev/u/cynyassy',
  image: 'https://api.boot.dev/v1/users/public/76e094d1-ba89-49fb-9372-b8e9ee053c16/thumbnail',
};

const qualifications = [
  {
    title: 'Boot.dev',
    kind: 'Learning Profile',
    meta: 'Backend path completed · Level 100',
    description:
      'A daily, hands-on backend learning system I committed to for over 200 days. Built APIs, CLIs, and real projects across Python, TypeScript, SQL, Docker, and distributed systems. Boot.dev is how I learned to think in systems and ship working code consistently.',
    href: bootDevProfile.href,
    cta: 'Open Boot.dev profile',
    image: bootDevProfile.image,
    icon: <BookOpen size={28} />,
  },
  {
    title: 'Udemy Figma Certificate',
    kind: 'Certificate',
    meta: 'Completed',
    description:
      'A structured deep dive into UI fundamentals that sharpened how I translate ideas into interfaces. I used it alongside real projects, designing flows, prototypes, and systems for tools I was actively building.',
    href: 'https://ude.my/UC-511a39f0-cfd9-4ff2-b735-0d7795510264',
    cta: 'Open certificate',
    image: figmaEssentialsCertificate,
    icon: <Award size={28} />,
  },
  {
    title: 'MFA Design for Social Innovation, SVA, NYC',
    kind: 'Graduate Degree / Institutional Profile',
    meta: 'Graduated 2023',
    description:
      'This is where I learned to think in systems. Research, service design, facilitation, and storytelling became ways to understand real human problems and design interventions that actually work. It shaped how I approach everything I build today.',
    href: 'https://dsi.sva.edu/people/students-alumni/shashank-sharma/',
    cta: 'Open MFA DSI profile',
    icon: <ExternalLink size={28} />,
    logos: ['DSI', 'SVA NYC'],
  },
  {
    title: 'B.Tech in Engineering Physics, DTU',
    kind: 'Undergraduate Degree',
    meta: 'Delhi Technological University · 2009–2013',
    description:
      'A technical foundation in engineering, electronics, communication, and robotics from one of Delhi’s most competitive public engineering institutions. It gave me an early systems lens that still shapes how I approach technology and problem-solving.',
    icon: <Award size={28} />,
    logos: ['DTU', 'E&C', 'Robotics'],
  },
];

export function QualificationsSection() {
  return (
    <section id="qualifications" className="py-24 px-6 bg-white relative overflow-hidden">
      <motion.div
        className="max-w-5xl mx-auto mb-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="mb-3 text-[0.78rem] uppercase tracking-[0.22em] text-[#666]">Qualifications</p>
        <h2 className="text-5xl md:text-6xl font-semibold tracking-[-0.05em] text-[#111] mb-4">
          Certificates and Learning Records
        </h2>
        <p className="mt-4 text-base md:text-lg font-medium text-[#111]">
          Learning, for me, has always been tied to building.
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
        {qualifications.map((item, index) => {
          const content = (
            <article className="border-2 border-black bg-white p-8 rounded-[8px] hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-all duration-300 h-full">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div className="text-[#111]">{item.icon}</div>
                {'logos' in item && item.logos ? (
                  <div className="flex flex-wrap justify-end gap-2">
                    {item.logos.map((logo) => (
                      <span
                        key={logo}
                        className="rounded-[4px] border border-black px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#111]"
                      >
                        {logo}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>

              <p className="text-[0.78rem] uppercase tracking-[0.18em] text-[#666] mb-2">{item.kind}</p>
              <p className="mb-2 text-sm font-medium text-[#111]">{item.meta}</p>
              <h3 className="text-3xl font-semibold tracking-[-0.04em] text-[#111] mb-3">{item.title}</h3>
              <p className="text-[#555] leading-relaxed mb-6">{item.description}</p>

              {item.image ? (
                <div className="mb-6 rounded-[8px] border-2 border-black overflow-hidden bg-[#f7f7f7]">
                  <img src={item.image} alt={`${item.title} preview`} className="w-full h-auto block" />
                </div>
              ) : null}

              <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#111]">
                <span>{item.cta ?? 'Link coming soon'}</span>
                {item.href ? <ArrowUpRight size={16} /> : null}
              </div>
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
