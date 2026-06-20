import { motion } from 'motion/react';
import { ArrowRight, BookOpen, ExternalLink, Sparkles } from 'lucide-react';
import emotionIdentifierCover from '../../assets/other-projects/emotion-identifier-cover.png';
import bookCover from '../../assets/cynyassy-book/not-everything-is-urgent-first-this.png';

export function OtherProjects() {
  return (
    <section id="other-projects" className="relative overflow-hidden bg-white px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-14 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="mb-3 text-[0.78rem] uppercase tracking-[0.22em] text-[#666]">Other Projects</p>
          <h2 className="mb-4 text-5xl font-semibold tracking-[-0.05em] text-[#111] md:text-6xl">
            Useful ideas in other forms
          </h2>
          <p className="text-lg leading-relaxed text-[#555]">
            Independent projects that extend the same practice beyond the main case studies: understand something
            carefully, then give it a clear and useful form.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          <motion.article
            className="flex h-full flex-col overflow-hidden rounded-[8px] border-2 border-black bg-white text-black"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <a
              href="https://cynyassy.github.io/emotions/"
              target="_blank"
              rel="noreferrer"
              className="block border-b-2 border-black bg-[#f4f4f2]"
              aria-label="Try the Emotion Identifier"
            >
              <img
                src={emotionIdentifierCover}
                alt="Emotion Identifier guided reflection tool"
                className="aspect-[4/3] w-full object-contain"
              />
            </a>
            <div className="flex flex-1 flex-col justify-between p-8">
              <div>
                <Sparkles size={30} className="mb-6 text-[#FF4400]" aria-hidden="true" />
                <span className="mb-5 inline-block rounded-[4px] border-2 border-black px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em]">
                  Live interactive tool
                </span>
                <h3 className="mb-3 text-3xl font-semibold tracking-[-0.04em]">Emotion Identifier</h3>
                <p className="leading-relaxed text-[#555]">
                  A seven-step guided experience that helps people move from broad feelings to more precise emotional
                  language and underlying needs.
                </p>
              </div>
              <a
                href="https://cynyassy.github.io/emotions/"
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex w-fit items-center gap-2 text-sm font-semibold uppercase tracking-[0.13em] text-[#111] underline decoration-[#FF4400] decoration-2 underline-offset-8"
              >
                Try the live tool <ExternalLink size={16} />
              </a>
            </div>
          </motion.article>

          <motion.article
            className="flex h-full flex-col overflow-hidden rounded-[8px] border-2 border-black bg-[#111] text-white"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
          >
            <a
              href="https://www.poundproject.co.uk/not-everything-is-urgent"
              target="_blank"
              rel="noreferrer"
              className="block border-b-2 border-white/40 bg-[#d8bdca]"
              aria-label="Visit the Not Everything Is Urgent book website"
            >
              <img
                src={bookCover}
                alt="Not Everything Is Urgent book cover"
                className="aspect-[4/3] w-full object-contain object-center"
              />
            </a>
            <div className="flex flex-1 flex-col justify-between p-8">
              <div>
                <BookOpen size={30} className="mb-6 text-[#FF4400]" aria-hidden="true" />
                <span className="mb-5 inline-block rounded-[4px] border-2 border-white px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em]">
                  Illustrated book
                </span>
                <h3 className="mb-3 text-3xl font-semibold tracking-[-0.04em]">Not Everything Is Urgent</h3>
                <p className="leading-relaxed text-[#d5d5d5]">
                  A two-part illustrated book about attention, pressure, and remembering that not everything deserves
                  the same urgency.
                </p>
              </div>
              <a
                href="https://www.poundproject.co.uk/not-everything-is-urgent"
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex w-fit items-center gap-2 text-sm font-semibold uppercase tracking-[0.13em] text-white underline decoration-[#FF4400] decoration-2 underline-offset-8"
              >
                Visit the book website <ExternalLink size={16} />
              </a>
            </div>
          </motion.article>
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
            <span>Explore Other Projects</span>
            <ArrowRight size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
