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
  persona: string;
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
}

function CoffeeToolsShowcase() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-full max-w-[34rem] items-center justify-center overflow-hidden rounded-[18px] border-2 border-black bg-white p-5 shadow-[6px_6px_0px_rgba(0,0,0,1)]">
        <img
          src={coffeeToolsDetailImage}
          alt="Coffee Tools bag detail and brew history screen"
          className="h-full max-h-[26rem] w-full rounded-[16px] border-2 border-black bg-white object-contain object-center shadow-[4px_4px_0px_rgba(0,0,0,1)]"
        />
      </div>
    </div>
  );
}

function AlgoTestShowcase() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-full max-w-[34rem] flex-col gap-5 rounded-[18px] border-2 border-black bg-white p-5 shadow-[6px_6px_0px_rgba(0,0,0,1)]">
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
      <div className="flex w-full max-w-[34rem] items-center justify-center overflow-hidden rounded-[18px] border-2 border-black bg-white p-5 shadow-[4px_4px_0px_rgba(0,0,0,0.85)]">
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
    title: 'Perspectives',
    persona: 'Systems Thinker',
    category: 'Thesis / Board Game',
    problem:
      'How do you help people understand privilege, institutional power, and unequal starting conditions without turning the learning experience into a lecture?',
    approach:
      'I translated systems thinking into a playable board game with geography, compounding advantage, protection mechanics, and crisis events so players could experience structural inequality through rules and consequences.',
    outcome:
      'The project became a case study in behavior design and systems translation, showing how mechanics, progression, and world rules can make invisible systems legible.',
    highlights: ['System design thinking', 'Mechanics and behavior design', 'Board and game visual framing'],
    links: [
      { label: 'Open case study', href: 'projects/perspectives.html' },
      { label: 'Full simulation on GitHub', href: 'https://github.com/cynyassy/simulation_civilisation_perspective', external: true },
    ],
    illustration: <PerspectivesCoverArt compact className="h-full shadow-none" />,
    imageHref: 'projects/perspectives.html',
  },
  {
    title: 'Coffee Tools',
    persona: 'Builder',
    category: 'Backend / Product System',
    problem:
      'As someone buying multiple bags at once and switching between a J-Ultra, ZP6, Baratza Encore ESP, and Timemore C2, I found most coffee logging tools too laborious for the one thing that matters most: consistency.',
    approach:
      'I designed Coffee Tools as a bag-centered workflow instead of a generic notes app: Supabase auth, a structured backend, bag lifecycle tracking, brew logging, grinder-aware inputs, and analytics that help serious home brewers compare results over time.',
    outcome:
      'The project shows how I move from personal frustration to product structure: define the workflow clearly, model the data carefully, and build a system that makes repeatability easier instead of adding more tracking overhead.',
    highlights: ['Bag-centered product design', 'Node + TypeScript + database-backed architecture', 'Brew logging, grinder tracking, and analytics flow'],
    metrics: ['Supabase authentication', 'Multi-bag and multi-grinder workflow', 'Designed for repeatability, not just note-taking'],
    links: [
      { label: 'Open case study', href: 'projects/coffee-tools.html' },
      { label: 'View GitHub repo', href: 'https://github.com/cynyassy/coffee-tool', external: true },
    ],
    illustration: <CoffeeToolsShowcase />,
    imageHref: 'projects/coffee-tools.html',
  },
  {
    title: 'AlgoTest Growth Strategy',
    persona: 'Product & Growth Strategist',
    category: 'Growth Strategy',
    problem:
      'AlgoTest needed stronger acquisition and activation: better SEO visibility, better onboarding, and a more coherent path from first visit to product value.',
    approach:
      'I treated growth as a product problem by improving onboarding, tightening the user journey, strengthening SEO strategy, and using analytics to connect changes to real business outcomes.',
    outcome:
      'This case study shows product strategy in action: clearer activation, better discovery, and measurable business impact across traffic, engagement, and revenue.',
    highlights: ['SEO growth', 'Onboarding improvements', 'Analytics-backed product decisions'],
    metrics: ['Organic traffic: 25K -> 150K/month', 'Revenue impact: 3x growth', 'Improved onboarding and engagement'],
    links: [
      { label: 'Open case study', href: 'projects/algotest.html' },
    ],
    illustration: <AlgoTestShowcase />,
    imageHref: 'projects/algotest.html',
    titleLogo: algotestLogoImage,
  },
  {
    title: 'Cynyassy Platform',
    persona: 'Storyteller & Creator',
    category: 'Platform / Content System',
    problem:
      'How do you make ideas around emotion, mental health, and inner life feel approachable enough that people actually engage with them instead of scrolling past them?',
    approach:
      'I treated Cynyassy as a platform, not just an art feed: ideation, comic-based storytelling, content creation, iteration, and audience learning all work together to make mental health more accessible through narrative.',
    outcome:
      'The platform shows what resonates when storytelling is simple, specific, and repeatable. It became both a creative system and a way to learn what audiences respond to over time.',
    highlights: [
      'Content philosophy: "A story worth telling is worth telling simply"',
      'Mental health made accessible through storytelling',
      'Audience behavior and resonance as part of the process',
    ],
    metrics: ['100K+ audience reach', 'Growing follower base', 'Repeatable content creation and iteration loop'],
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
          <p className="text-lg opacity-60">Four personas • Four projects • Problem → Approach → Outcome</p>
        </motion.div>

        <div className="space-y-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              id={project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
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
                      <div className="relative inline-block bg-white px-4 py-1 text-sm rounded-[4px]">
                        <span className="text-sm font-medium text-[#333]">{project.persona}</span>
                        <div aria-hidden="true" className="absolute border-2 border-black border-solid inset-0 pointer-events-none rounded-[4px]" />
                      </div>
                      <div className="relative inline-block bg-[#FF4400] px-4 py-1 text-sm rounded-[4px]">
                        <span className="text-sm font-medium text-white">{project.category}</span>
                        <div aria-hidden="true" className="absolute border-2 border-black border-solid inset-0 pointer-events-none rounded-[4px]" />
                      </div>
                    </div>

                    <div className="mb-6 flex items-center gap-3">
                      {project.titleLogo ? (
                        <img
                          src={project.titleLogo}
                          alt=""
                          aria-hidden="true"
                          className="h-10 w-10 rounded-[10px] bg-white object-cover"
                        />
                      ) : null}
                      <h3 className="text-3xl md:text-4xl font-semibold tracking-[-0.04em] text-[#333]">
                        {project.title}
                      </h3>
                    </div>

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
            Four personas. Four case studies. One practice.
          </WireframeButton>
        </motion.div>
      </div>
    </section>
  );
}
