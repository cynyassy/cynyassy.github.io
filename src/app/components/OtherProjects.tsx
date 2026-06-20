import { motion } from 'motion/react';
import { ArrowRight, BookOpen, ExternalLink, Film, Github, Sparkles, Youtube } from 'lucide-react';
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

        <div className="grid gap-8 lg:grid-cols-3">
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
                <a href="https://cynyassy.github.io/emotions/" target="_blank" rel="noreferrer" className="group/title">
                  <h3 className="mb-3 text-3xl font-semibold tracking-[-0.04em] transition-colors group-hover/title:text-[#FF4400]">
                    Emotion Identifier
                  </h3>
                </a>
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
                <a
                  href="https://www.poundproject.co.uk/not-everything-is-urgent"
                  target="_blank"
                  rel="noreferrer"
                  className="group/title"
                >
                  <h3 className="mb-3 text-3xl font-semibold tracking-[-0.04em] transition-colors group-hover/title:text-[#FF4400]">
                    Not Everything Is Urgent
                  </h3>
                </a>
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

          <motion.article
            className="flex h-full flex-col overflow-hidden rounded-[8px] border-2 border-black bg-white text-black"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.22 }}
          >
            <a
              href="https://www.youtube.com/channel/UCxwAvV6fwi2on14yENSJL6w"
              target="_blank"
              rel="noreferrer"
              className="block border-b-2 border-black bg-[#FF4400]"
              aria-label="Visit the Film Festival Friday YouTube channel"
            >
              <div className="flex aspect-[4/3] flex-col justify-between p-8 text-white">
                <div className="flex items-center justify-between">
                  <span className="rounded-full border-2 border-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]">
                    Friday
                  </span>
                  <Film size={34} aria-hidden="true" />
                </div>
                <div>
                  <p className="mb-4 text-sm uppercase tracking-[0.22em] opacity-80">Prompt ritual</p>
                  <p className="text-4xl font-semibold leading-none tracking-[-0.05em]">
                    Watch
                    <br />
                    Notice
                    <br />
                    Make
                  </p>
                </div>
              </div>
            </a>
            <div className="flex flex-1 flex-col justify-between p-8">
              <div>
                <Youtube size={30} className="mb-6 text-[#FF4400]" aria-hidden="true" />
                <span className="mb-5 inline-block rounded-[4px] border-2 border-black px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em]">
                  Film prompt channel
                </span>
                <a
                  href="https://www.youtube.com/channel/UCxwAvV6fwi2on14yENSJL6w"
                  target="_blank"
                  rel="noreferrer"
                  className="group/title"
                >
                  <h3 className="mb-3 text-3xl font-semibold tracking-[-0.04em] transition-colors group-hover/title:text-[#FF4400]">
                    Film Festival Friday
                  </h3>
                </a>
                <p className="leading-relaxed text-[#555]">
                  A weekly filmmaking practice powered by a prompt bot: a small ritual for watching films more
                  intentionally and turning that love of cinema into creative exercises.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="https://www.youtube.com/channel/UCxwAvV6fwi2on14yENSJL6w"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-fit items-center gap-2 text-sm font-semibold uppercase tracking-[0.13em] text-[#111] underline decoration-[#FF4400] decoration-2 underline-offset-8"
                >
                  YouTube <ExternalLink size={16} />
                </a>
                <a
                  href="https://github.com/cynyassy/weekend-movie-bot"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-fit items-center gap-2 text-sm font-semibold uppercase tracking-[0.13em] text-[#111] underline decoration-[#FF4400] decoration-2 underline-offset-8"
                >
                  GitHub <Github size={16} />
                </a>
              </div>
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
