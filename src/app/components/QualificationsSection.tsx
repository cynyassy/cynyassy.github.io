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
    description:
      'A live public snapshot of my backend learning path and coding practice. It works well here as visible proof-of-learning rather than just another link.',
    status: 'Live',
    href: bootDevProfile.href,
    cta: 'Open Boot.dev profile',
    image: bootDevProfile.image,
    icon: <BookOpen size={28} />,
  },
  {
    title: 'Udemy Figma Certificate',
    kind: 'Certificate',
    description:
      'Formal completion of a focused Figma UI/UX course. It helps anchor the design side of the portfolio with a concrete learning credential.',
    status: 'Completed',
    href: 'https://ude.my/UC-511a39f0-cfd9-4ff2-b735-0d7795510264',
    cta: 'Open certificate',
    image: figmaEssentialsCertificate,
    icon: <Award size={28} />,
  },
  {
    title: 'DSI SVA Profile',
    kind: 'Profile / Credential',
    description:
      'An external academic and institutional reference point that complements the self-initiated work and public-facing case studies in the portfolio.',
    status: 'Live',
    href: 'https://dsi.sva.edu/people/students-alumni/shashank-sharma/',
    cta: 'Open DSI profile',
    icon: <ExternalLink size={28} />,
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
          Certificates, learning records, and public proof
        </h2>
        <p className="text-lg text-[#555] max-w-3xl mx-auto">
          A companion section to the skills layer. This is where I can show the more formal or externally verifiable
          parts of the journey alongside the work itself.
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
        {qualifications.map((item, index) => {
          const content = (
            <article className="border-2 border-black bg-white p-8 rounded-[8px] hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-all duration-300 h-full">
              <div className="mb-5 text-[#111]">{item.icon}</div>

              <div className="inline-block mb-4 rounded-[4px] border-2 border-black bg-[#FF4400] px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white">
                {item.status}
              </div>

              <p className="text-[0.78rem] uppercase tracking-[0.18em] text-[#666] mb-2">{item.kind}</p>
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
