import { motion } from 'motion/react';
import { ArrowRight, BookOpen, ExternalLink } from 'lucide-react';
import emotionIdentifierCover from '../../assets/other-projects/emotion-identifier-cover.png';

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
            Smaller builds, complete ideas
          </h2>
          <p className="text-lg leading-relaxed text-[#555]">
            Shipped tools and independent experiments that extend the same practice: making difficult ideas easier to
            understand, use, and share.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1.45fr_0.75fr]">
          <motion.a
            href="https://cynyassy.github.io/emotions/"
            target="_blank"
            rel="noreferrer"
            className="group overflow-hidden rounded-[8px] border-2 border-black bg-white transition-transform duration-300 hover:-translate-y-1"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="aspect-[1200/630] overflow-hidden border-b-2 border-black bg-[#f5f5f5]">
              <img
                src={emotionIdentifierCover}
                alt="Emotion Identifier Tool interface asking the user to name what they feel"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.015]"
              />
            </div>
            <div className="p-7 md:p-8">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <span className="rounded-[4px] border-2 border-black bg-[#FF4400] px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white">
                  Live tool
                </span>
                <ExternalLink size={20} aria-hidden="true" />
              </div>
              <h3 className="mb-3 text-3xl font-semibold tracking-[-0.04em] text-[#111]">Emotion Identifier</h3>
              <p className="mb-5 leading-relaxed text-[#555]">
                A guided seven-step experience that helps people move beyond “good” or “bad,” name a more precise
                emotion, and connect it to an underlying human need.
              </p>
              <p className="text-sm font-semibold uppercase tracking-[0.13em] text-[#222]">
                React · TypeScript · Product design · Emotional learning
              </p>
            </div>
          </motion.a>

          <motion.article
            className="flex min-h-[22rem] flex-col justify-between rounded-[8px] border-2 border-black bg-[#111] p-8 text-white"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div>
              <BookOpen size={30} className="mb-8 text-[#FF4400]" aria-hidden="true" />
              <span className="mb-5 inline-block rounded-[4px] border-2 border-white px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em]">
                Coming soon
              </span>
              <h3 className="mb-3 text-3xl font-semibold tracking-[-0.04em]">It’s Not That Urgent</h3>
              <p className="leading-relaxed text-[#d5d5d5]">
                An upcoming illustrated book joining this shelf when it launches. The project page and purchase links
                will be added here once they are ready.
              </p>
            </div>
            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.13em] text-[#aaa]">
              Illustrated publishing project
            </p>
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
