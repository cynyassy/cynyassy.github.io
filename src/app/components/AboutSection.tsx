import { motion } from 'motion/react';
import { WireframeCard } from './wireframe/WireframeCard';

const workLoops = [
  'Understand the system: users, constraints, incentives, and behavior',
  'Build a version: content, flows, tools, prototypes, or backend systems',
  'Observe what happens: data, usage, support pain, and feedback',
  'Iterate and scale what works',
];

const targetRoles = [
  'Product Strategy & Management',
  'Product Design / Design Engineering',
  'Growth & Product Education',
  'Service & Learning Experience Design',
];

export function AboutSection() {
  return (
    <section className="py-24 px-6 bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="about-grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
          <rect width="100" height="100" fill="url(#about-grid)" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 space-y-12">
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-[0.78rem] uppercase tracking-[0.22em] text-white/70">Role clarity</p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.05em]">
            What I&apos;m looking for
          </h2>
          <p className="max-w-3xl mx-auto text-lg leading-relaxed text-white/80">
            I&apos;m looking for product, design engineering, or hybrid product roles where complex ideas need to
            become clear enough for non-expert users to trust, learn, and act.
          </p>
          <p className="max-w-3xl mx-auto text-base md:text-lg leading-relaxed text-white/65">
            My edge is bridging strategy, design, communication, and technical execution instead of operating in only
            one lane.
          </p>
          <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3 pt-3" aria-label="Roles I am interested in">
            {targetRoles.map((role) => (
              <span
                key={role}
                className="rounded-[4px] border border-white/45 bg-white px-3 py-2 text-sm font-semibold text-black"
              >
                {role}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <WireframeCard className="h-full bg-white text-black">
              <div className="space-y-5">
                <p className="text-[0.78rem] uppercase tracking-[0.22em] text-[#666]">Where I fit best</p>
                <h3 className="text-3xl font-semibold tracking-[-0.04em] text-[#111]">
                  Product roles where complexity needs translation
                </h3>
                <p className="text-base md:text-lg leading-relaxed text-[#444]">
                  I&apos;m strongest in environments where the product is non-trivial: technical workflows, education-heavy
                  experiences, behavior-driven products, or early-stage teams where someone needs to connect user
                  understanding with execution.
                </p>
                <ul className="space-y-3 text-[#222]">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 bg-[#FF4400]" />
                    <span>Complex or technical products where onboarding is hard</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 bg-[#FF4400]" />
                    <span>Education-heavy products that need clearer explanation and trust</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 bg-[#FF4400]" />
                    <span>Behavior-driven products where understanding changes what people do</span>
                  </li>
                </ul>
                <div className="rounded-[6px] border-2 border-black bg-[#FF4400] p-4 text-white">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/80">Best fit</p>
                  <p className="mt-2 text-base font-semibold leading-relaxed">
                    Complex products, education-heavy tools, technical onboarding, and behavior-change products.
                  </p>
                </div>
              </div>
            </WireframeCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
          >
            <WireframeCard className="h-full bg-white text-black">
              <div className="space-y-5">
                <p className="text-[0.78rem] uppercase tracking-[0.22em] text-[#666]">How I work</p>
                <h3 className="text-3xl font-semibold tracking-[-0.04em] text-[#111]">
                  I approach problems in loops
                </h3>
                <ul className="space-y-4">
                  {workLoops.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-base md:text-lg leading-relaxed text-[#333]">
                      <span className="mt-1.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-black text-xs font-semibold">
                        +
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-base leading-relaxed text-[#555]">
                  This loop shaped how I worked at AlgoTest and how I now build independently across product strategy,
                  systems design, backend learning, and visual communication.
                </p>
              </div>
            </WireframeCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
