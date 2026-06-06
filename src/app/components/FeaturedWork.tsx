import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { PerspectivesCoverArt } from '../../perspectives/PerspectivesCoverArt';
import coffeeToolsDetailImage from '../../assets/coffee-tools-case-study/cover-image.png';
import algotestLogoImage from '../../assets/algotest-case-study/algotest-logo.png';
import cynyassyCoverImage from '../../assets/cynyassy-formats/chaddiman-suffering.png';
import { WireframeCard } from './wireframe/WireframeCard';
import { WireframeButton } from './wireframe/WireframeButton';

type CaseStudyLink = {
  label: string;
  href: string;
  external?: boolean;
};

interface Project {
  title: string;
  headline: string;
  oneLine: string;
  role: string;
  category: string;
  problem: string;
  approach: string;
  outcome: string;
  highlights: string[];
  metrics?: string[];
  links: CaseStudyLink[];
  illustration: ReactNode;
  imageHref?: string;
  titleLogo?: string;
  id: string;
  status: string;
}

function CoffeeToolsShowcase() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <img
          src={coffeeToolsDetailImage}
          alt="Coffee Tools bag detail and brew history screen"
          className="h-full max-h-[26rem] w-full rounded-[16px] border-2 bg-white object-contain object-center "
        />
    </div>
  );
}

function AlgoTestShowcase() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-full max-w-[34rem] flex-col gap-5 rounded-[18px] border-2 border-black bg-white p-5">
        <div className="flex items-center gap-3 border-b-2 border-black pb-4">
          <img
            src={algotestLogoImage}
            alt="AlgoTest logo"
            className="h-10 w-10 rounded-[10px] bg-white object-cover"
          />
          <div>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[#666]">Documentation-Led Growth</p>
            <p className="text-lg font-semibold tracking-[-0.03em] text-[#222]">AlgoTest</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            ['Search clicks', '25K → 150K'],
            ['Revenue', '₹15–18L → ₹50L+'],
            ['Domain Rating', '23 → 37'],
            ['Role', 'SEO + docs + onboarding'],
          ].map(([label, value]) => (
            <div key={label} className="rounded-[12px] border-2 border-black bg-white p-3">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#666]">{label}</p>
              <p className="mt-2 text-base font-semibold tracking-[-0.03em] text-[#111]">{value}</p>
            </div>
          ))}
        </div>

        <div className="rounded-[14px] border-2 border-black bg-white p-4">
          <div className="mb-3 flex items-end justify-between">
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#666]">Growth snapshot</p>
              <p className="text-sm text-[#333]">Utility turned docs into acquisition infrastructure.</p>
            </div>
            <span className="text-sm font-semibold text-[#FF4400]">1.29M clicks</span>
          </div>
          <svg viewBox="0 0 260 90" className="h-[5.5rem] w-full">
            <path
              d="M6 72 C34 70, 48 60, 73 58 S120 52, 140 48 S176 35, 194 30 S224 24, 254 12"
              fill="none"
              stroke="#FF4400"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {[6, 73, 140, 194, 254].map((x, index) => (
              <circle key={x} cx={x} cy={[72, 58, 48, 30, 12][index]} r="4.5" fill="#FF4400" stroke="black" strokeWidth="2" />
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}

function CynyassyShowcase() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-full max-w-[34rem] items-center justify-center overflow-hidden rounded-[18px] border-2 bg-white p-5">
        <img
          src={cynyassyCoverImage}
          alt="Cynyassy comic about suffering and emotional understanding"
          className="h-full max-h-[26rem] w-full rounded-[12px] bg-white object-contain object-center"
        />
      </div>
    </div>
  );
}

const projects: Project[] = [
  {
    id: 'algotest-growth-strategy',
    title: 'AlgoTest',
    status: 'Shipped & scaled',
    headline: 'Made complex trading workflows searchable, teachable, and reusable',
    oneLine: 'In one line: I turned recurring support pain into a documentation-led growth engine.',
    role: 'Product Strategy / Growth Systems',
    category: 'Growth Strategy',
    problem:
      'AlgoTest was a powerful technical trading platform, but growth was constrained by comprehension: users needed help understanding setup, broker connections, product workflows, and trading logic before they could reach product value.',
    approach:
      'I treated recurring user confusion as product infrastructure: answer once in documentation, reuse it in support, rank it in search, and turn education into a durable acquisition and onboarding layer.',
    outcome:
      'Monthly organic traffic grew from 25K to 150K and monthly revenue moved from ₹15-18L to ₹50L+, showing how useful product education can compound into qualified demand and business impact.',
    highlights: ['Documentation-led acquisition', 'Support-informed onboarding', 'Analytics-backed product decisions'],
    metrics: ['Organic traffic: 25K -> 150K/month', 'Revenue: ₹15-18L -> ₹50L+/month', 'Domain Rating: 23 -> 37'],
    links: [
      { label: 'Open case study', href: 'projects/algotest.html' },
    ],
    illustration: <AlgoTestShowcase />,
    imageHref: 'projects/algotest.html',
    titleLogo: algotestLogoImage,
  },
  {
    id: 'perspectives',
    title: 'Perspectives',
    status: 'Playable thesis',
    headline: 'Making structural inequality playable',
    oneLine: 'In one line: I turned abstract inequality into a playable model of cause, consequence, and compounding advantage.',
    role: 'Systems & Simulation Design',
    category: 'Thesis / Board Game',
    problem:
      'How do you help people understand privilege, institutional power, and unequal starting conditions without turning the learning experience into a lecture?',
    approach:
      'I translated connected causes into play: geography shapes access, access shapes resources, resources shape institutions, and institutions shape survival when crisis hits.',
    outcome:
      'The project became a case study in making invisible relationships visible, showing how mechanics, progression, and world rules can help people discuss structural inequality without turning the experience into a lecture.',
    highlights: ['System design thinking', 'Mechanics and behavior design', 'Board and game visual framing'],
    metrics: ['Playable canvas proof', 'Three autonomous NPC societies', 'Periodic crisis and resilience model'],
    links: [
      { label: 'Open case study', href: 'projects/perspectives.html' },
      { label: 'Full simulation on GitHub', href: 'https://github.com/cynyassy/simulation_civilisation_perspective', external: true },
    ],
    illustration: <PerspectivesCoverArt compact className="h-full shadow-none" />,
    imageHref: 'projects/perspectives.html',
  },
  {
    id: 'coffee-tools',
    title: 'Coffee Tools',
    status: 'Working prototype',
    headline: 'Turning coffee experimentation into a trackable product model',
    oneLine: 'In one line: I translated a messy enthusiast workflow into a structured backend-first product model.',
    role: 'Product Builder / Backend-First Tooling',
    category: 'Backend / Product System',
    problem:
      'As someone buying multiple bags at once and switching between a J-Ultra, ZP6, Baratza Encore ESP, and Timemore C2, I found most coffee logging tools too laborious for the one thing that matters most: consistency.',
    approach:
      'I designed Coffee Tools as a bag-centered workflow instead of a generic notes app: Supabase auth, a structured backend, bag lifecycle tracking, brew logging, grinder-aware inputs, and analytics that help serious home brewers compare results over time.',
    outcome:
      'The project shows how I move from personal frustration to product structure: define the workflow clearly, model the data carefully, and build a system that makes repeatability easier instead of adding more tracking overhead.',
    highlights: ['Bag-centered product design', 'Node + TypeScript + database-backed architecture', 'Brew logging, grinder tracking, and analytics flow'],
    metrics: ['Supabase authentication', 'Express + TypeScript + PostgreSQL architecture', 'Multi-bag and multi-grinder workflow'],
    links: [
      { label: 'Open case study', href: 'projects/coffee-tools.html' },
      { label: 'View GitHub repo', href: 'https://github.com/cynyassy/coffee-tool', external: true },
    ],
    illustration: <CoffeeToolsShowcase />,
    imageHref: 'projects/coffee-tools.html',
  },
  {
    id: 'cynyassy-platform',
    title: 'Cynyassy / ChaddiMan',
    status: 'Live community platform',
    headline: 'Making emotional learning simple enough to share with 100K+ people',
    oneLine: 'In one line: I made difficult emotional ideas simple, visual, and shareable enough to build community.',
    role: 'Visual Communication / Audience Insight',
    category: 'Platform / Content System',
    problem:
      'How do you make ideas around emotion, mental health, and inner life approachable enough that people feel seen, share them, and return to them?',
    approach:
      'I treated Cynyassy as community education and care: simple comics, repeated publishing, audience feedback, and visual storytelling worked together to make emotional learning easier to enter.',
    outcome:
      'The platform grew to 100K+ followers, reached 1.2M people in a peak month in 2021, and inspired thousands of messages of appreciation.',
    highlights: [
      'Content philosophy: "A story worth telling is worth telling simply"',
      'Mental health made accessible through storytelling',
      'Audience behavior and resonance as part of the process',
    ],
    metrics: ['100K+ community', '1.2M monthly reach at peak in 2021', '600+ multi-panel comics'],
    links: [
      { label: 'Open case study', href: 'projects/cynyassy.html' },
      { label: 'View platform presence', href: 'https://instagram.com/cynyassy', external: true },
    ],
    illustration: <CynyassyShowcase />,
    imageHref: 'projects/cynyassy.html',
  },
];

export function FeaturedWork() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-semibold tracking-[-0.05em] mb-4">Case Studies</h2>
          <p className="text-lg opacity-60">Four proofs of one throughline: making complexity usable</p>
        </motion.div>

        <div className="space-y-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              id={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <WireframeCard className="p-8 md:p-12 hover:shadow-[12px_12px_0px_rgba(0,0,0,1)] transition-all duration-300">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <motion.div
                    className="order-2 md:order-1"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {project.imageHref ? (
                      <a
                        href={project.imageHref}
                        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
                        aria-label={`Open ${project.title} case study`}
                      >
                        <div className="relative border-4 border-black p-8 bg-white aspect-[4/3] flex items-center justify-center rounded-[4px] transition-colors hover:bg-[#f8f8f8]">
                          {project.illustration}
                        </div>
                      </a>
                    ) : (
                      <div className="relative border-4 border-black p-8 bg-white aspect-[4/3] flex items-center justify-center rounded-[4px]">
                        {project.illustration}
                      </div>
                    )}
                  </motion.div>

                  <div className="order-1 md:order-2">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      {index === 0 ? (
                        <div className="relative inline-block bg-black px-4 py-1 text-sm rounded-[4px]">
                          <span className="text-sm font-medium text-white">Featured Case Study</span>
                          <div aria-hidden="true" className="absolute border-2 border-black border-solid inset-0 pointer-events-none rounded-[4px]" />
                        </div>
                      ) : null}
                      <div className="relative inline-block bg-white px-4 py-1 text-sm rounded-[4px]">
                        <span className="text-sm font-medium text-[#333]">{project.status}</span>
                        <div aria-hidden="true" className="absolute border-2 border-black border-solid inset-0 pointer-events-none rounded-[4px]" />
                      </div>
                      <div className="relative inline-block bg-white px-4 py-1 text-sm rounded-[4px]">
                        <span className="text-sm font-medium text-[#333]">{project.role}</span>
                        <div aria-hidden="true" className="absolute border-2 border-black border-solid inset-0 pointer-events-none rounded-[4px]" />
                      </div>
                      <div className="relative inline-block bg-[#FF4400] px-4 py-1 text-sm rounded-[4px]">
                        <span className="text-sm font-medium text-white">{project.category}</span>
                        <div aria-hidden="true" className="absolute border-2 border-black border-solid inset-0 pointer-events-none rounded-[4px]" />
                      </div>
                    </div>

                    <div className="mb-2 flex items-center gap-3">
                      {project.titleLogo ? (
                        <img
                          src={project.titleLogo}
                          alt=""
                          aria-hidden="true"
                          className="h-10 w-10 rounded-[10px] bg-white object-cover"
                        />
                      ) : null}
                      <p className="text-lg md:text-xl font-semibold tracking-[-0.03em] text-[#333]">
                        {project.title}
                      </p>
                    </div>

                    <h3 className="mb-6 text-3xl md:text-4xl font-semibold tracking-[-0.04em] text-[#111]">
                      {project.headline}
                    </h3>

                    <p className="mb-6 rounded-[8px] border-2 border-black bg-white p-4 text-base font-semibold leading-relaxed text-[#222]">
                      {project.oneLine}
                    </p>

                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-black" />
                          <h4 className="uppercase text-sm font-semibold tracking-wider opacity-60 text-[#333]">Problem</h4>
                        </div>
                        <p className="leading-relaxed text-[#333]">{project.problem}</p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-black" />
                          <h4 className="uppercase text-sm font-semibold tracking-wider opacity-60 text-[#333]">Approach</h4>
                        </div>
                        <p className="leading-relaxed text-[#333]">{project.approach}</p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-[#FF4400]" />
                          <h4 className="uppercase text-sm font-semibold tracking-wider opacity-60 text-[#333]">Outcome</h4>
                        </div>
                        <p className="leading-relaxed font-medium text-[#333]">{project.outcome}</p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-[#FF4400]" />
                          <h4 className="uppercase text-sm font-semibold tracking-wider opacity-60 text-[#333]">Focus</h4>
                        </div>
                        <ul className="space-y-2 text-[#333]">
                          {project.highlights.map((item) => (
                            <li key={item}>• {item}</li>
                          ))}
                        </ul>
                      </div>

                      {project.metrics?.length ? (
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 bg-black" />
                            <h4 className="uppercase text-sm font-semibold tracking-wider opacity-60 text-[#333]">Signals</h4>
                          </div>
                          <ul className="space-y-2 text-[#333]">
                            {project.metrics.map((item) => (
                              <li key={item}>• {item}</li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                    </div>

                    <div className="flex flex-wrap gap-3 mt-8">
                      {project.links.map((link) =>
                        link.external ? (
                          <motion.a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 text-[#FF4400] hover:text-black transition-colors font-medium"
                            whileHover={{ x: 5 }}
                          >
                            <span>{link.label}</span>
                            <ExternalLink size={16} />
                          </motion.a>
                        ) : (
                          <motion.a
                            key={link.label}
                            href={link.href}
                            className="inline-flex items-center gap-2 text-[#FF4400] hover:text-black transition-colors font-medium"
                            whileHover={{ x: 5 }}
                          >
                            <span>{link.label}</span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                          </motion.a>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </WireframeCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <WireframeButton variant="secondary" className="inline-block">
            Strategy. Systems design. Building. One practice.
          </WireframeButton>
        </motion.div>
      </div>
    </section>
  );
}
