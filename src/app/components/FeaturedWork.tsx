import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { PerspectivesCoverArt } from '../../perspectives/PerspectivesCoverArt';
import coffeeToolsShareCardImage from '../../assets/coffee-tools-case-study/live-product/share-card-current.jpg';
import coffeeToolsBagContextImage from '../../assets/coffee-tools-case-study/live-product/bag-context.jpg';
import algotestLogoImage from '../../assets/algotest-case-study/algotest-logo.png';
import algotestDocumentationImage from '../../assets/algotest_documentation.png';
import cynyassyCoverImage from '../../assets/cynyassy-formats/chaddiman-suffering.png';

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
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#f8f6f1]">
      <div className="absolute left-5 top-5 flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-[#ea7444]" />
        <span className="h-3 w-3 rounded-full bg-[#67c7e9]" />
        <span className="h-3 w-3 rounded-full bg-[#086b6f]" />
      </div>
      <div className="absolute bottom-5 left-5 right-5 border-t border-black/20 pt-4">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#666]">Live product ecosystem</p>
        <p className="mt-1 text-lg font-semibold tracking-[-0.04em] text-[#086b6f]">
          Remember what worked. Brew what&apos;s next.
        </p>
      </div>
      <div className="relative flex h-full w-full max-w-[34rem] items-center justify-center px-5 pb-24 pt-10">
        <img
          src={coffeeToolsShareCardImage}
          alt="Brew Tracker share card from the live product"
          className="relative z-10 h-full max-h-[24rem] w-auto rounded-[22px] border border-black/10 bg-white object-contain shadow-[0_18px_45px_rgba(0,0,0,0.12)]"
        />
        <img
          src={coffeeToolsBagContextImage}
          alt="Brew Tracker bag context screen"
          className="absolute right-5 top-14 h-[82%] max-h-[23rem] w-auto rounded-[22px] border border-black/10 bg-white object-contain opacity-90 shadow-[0_18px_45px_rgba(0,0,0,0.1)]"
        />
      </div>
    </div>
  );
}

function AlgoTestShowcase() {
  return (
    <div className="grid h-full w-full grid-rows-[minmax(0,1fr)_auto] overflow-hidden bg-white">
      <div className="min-h-0 overflow-hidden border-b border-black">
        <img
          src={algotestDocumentationImage}
          alt="AlgoTest documentation showing educational pages for trading strategies"
          className="h-full w-full object-cover object-left-top"
        />
      </div>

      <div className="grid gap-5 bg-black px-5 py-5 text-white sm:grid-cols-[1fr_auto] sm:items-end sm:px-7">
        <div>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/55">
            Product knowledge → customer education
          </p>
          <p className="mt-2 max-w-sm text-base leading-snug text-white/80">
            Documentation became a reusable surface for support, onboarding, and discovery.
          </p>
        </div>
        <div className="sm:text-right">
          <p className="text-3xl font-semibold tracking-[-0.05em] text-[#FF4400]">6×</p>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/65">
            organic growth
          </p>
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
    headline: 'How documentation helped grow organic traffic 6×',
    oneLine: 'I turned customer confusion into a documentation-led growth engine for a complex fintech product.',
    role: 'Product Education / Growth Strategy',
    category: 'Documentation-led growth',
    problem:
      'AlgoTest was powerful, but much of the knowledge required to use it lived inside the company. Customers repeatedly needed help with setup, broker connections, product workflows, and trading logic before they could reach value.',
    approach:
      'I documented what internal teams already understood, prioritized pages from real support pain, and built a loop in which one clear explanation could support onboarding, customer service, search, and marketing.',
    outcome:
      'Customers gained a reusable path into a difficult product. Monthly organic traffic grew from 25K to 150K and monthly revenue moved from ₹15–18L to ₹50L+, showing that useful education can compound into trust, demand, and business impact.',
    highlights: ['Customer questions determined what got explained', 'Documentation became reusable product infrastructure', 'Utility—not content volume—drove growth'],
    metrics: ['Organic traffic: 25K -> 150K/month', 'Revenue: ₹15-18L -> ₹50L+/month', 'Domain Rating: 23 -> 37'],
    links: [
      { label: 'Open case study', href: 'projects/algotest.html' },
    ],
    illustration: <AlgoTestShowcase />,
    imageHref: 'projects/algotest.html',
    titleLogo: algotestLogoImage,
  },
  {
    id: 'cynyassy-platform',
    title: 'Cynyassy / ChaddiMan',
    status: 'Live community platform',
    headline: 'How simple visual stories grew a 100K community',
    oneLine: 'I made emotional learning feel simpler, softer, and easier to share through recurring visual stories.',
    role: 'Visual Communication / Community Education',
    category: 'Comics / Care / Learning',
    problem:
      'Mental-health language can feel clinical, intimidating, or unavailable precisely when someone needs it. Many people can feel distress before they have words that make the experience understandable.',
    approach:
      'I used comics, recurring characters, gentle humor, and simple language to create approachable entrances into emotion, self-understanding, and care. Publishing became a feedback loop for learning what helped people feel seen.',
    outcome:
      'The platform grew to 100K+ followers, reached 1.2M people in a peak month in 2021, and led to thousands of messages from people who found the work useful, comforting, or worth carrying with them.',
    highlights: ['Emotional learning without clinical distance', 'Community feedback shaped the storytelling', 'Simplicity made difficult ideas easier to share'],
    metrics: ['100K+ community', '1.2M monthly reach at peak in 2021', '600+ multi-panel comics'],
    links: [
      { label: 'Open case study', href: 'projects/cynyassy.html' },
      { label: 'Visit Cynyassy.com', href: 'https://cynyassy.com', external: true },
      { label: "Cynyassy's Instagram", href: 'https://instagram.com/cynyassy', external: true },
    ],
    illustration: <CynyassyShowcase />,
    imageHref: 'projects/cynyassy.html',
  },
  {
    id: 'perspectives',
    title: 'Perspectives',
    status: 'Playable thesis',
    headline: 'A playable model of how geography and institutions shape outcomes',
    oneLine: 'I turned an abstract social system into a playable experience people could observe, question, and discuss.',
    role: 'Learning Experience / Simulation Design',
    category: 'Thesis / Board Game',
    problem:
      'Privilege and institutional power are often explained as ideas, while their effects are experienced as connected forces that unfold over time. A lecture can name the parts without making the relationship between them felt.',
    approach:
      'I translated those connections into rules: geography shapes access, access shapes resources, resources shape institutions, and institutions affect survival when crisis arrives. Players learn by acting inside the model.',
    outcome:
      'The board game and web simulation create a shared object for discussing why outcomes diverge. Invisible relationships become observable, debatable, and easier to question without reducing them to a lecture.',
    highlights: ['Rules communicate connected causes', 'Play turns explanation into lived consequence', 'Debrief turns experience into discussion'],
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
    title: 'Brew Tracker',
    status: 'Live product ecosystem',
    headline: 'A coffee product that connects discovery to better brewing',
    oneLine: 'Indian Coffee Stories creates the public learning path; Brew Tracker turns curiosity into a private, repeatable brewing practice backed by AWS.',
    role: 'Product Builder / Growth System Design',
    category: 'Product / Discovery / AWS',
    problem:
      'As someone rotating multiple coffee bags and four grinders, I found note-taking too loose for comparison and most tracking too laborious for consistent use.',
    approach:
      'I used a real problem I understood intimately to build both sides of the journey: Indian Coffee Stories for education and discovery, then Brew Tracker for private logging and learning. The utility is backed by Cognito, API Gateway, Lambda, DynamoDB, S3, bag lifecycle tracking, grinder-aware inputs, and analytics.',
    outcome:
      'The live ecosystem has already created early discovery and discussion: 706 active users in its first 28 days, 1.2K Coffee Atlas views, and a 6.8K-view Reddit launch post. It shows how I connect a real user workflow, distribution surface, data model, and deployed product.',
    highlights: ['Public discovery connects to a private utility', 'Serverless AWS backend with real persistence', 'Analytics are designed around comparable brew setups'],
    metrics: ['706 active users in the first 28 days', '95 Indian coffee roasters mapped', '6.8K Reddit views in the first 48 hours'],
    links: [
      { label: 'Open case study', href: 'projects/coffee-tools.html' },
      { label: 'Open Brew Tracker', href: 'https://brew.indiancoffeestories.com', external: true },
      { label: 'Visit Indian Coffee Stories', href: 'https://indiancoffeestories.com', external: true },
      { label: 'View GitHub repo', href: 'https://github.com/cynyassy/coffee-tools-api', external: true },
    ],
    illustration: <CoffeeToolsShowcase />,
    imageHref: 'projects/coffee-tools.html',
  },
];

export function FeaturedWork() {
  return (
    <section className="bg-white px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-16 max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="mb-3 text-[0.78rem] uppercase tracking-[0.22em] text-[#666]">Selected work</p>
          <h2 className="mb-4 text-5xl font-semibold tracking-[-0.05em] md:text-6xl">Four projects. Four different forms.</h2>
          <p className="max-w-3xl text-lg leading-relaxed text-[#555]">
            The work ranges from growth and storytelling to simulations and software. Each project starts with
            something hard to understand, then turns it into a form people can use.
          </p>
        </motion.div>

        <div>
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              id={project.id}
              className="grid gap-10 border-black py-14 md:grid-cols-2 md:items-center md:gap-16 lg:py-20"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <motion.div
                className={index % 2 === 0 ? 'md:order-1' : 'md:order-2'}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
              >
                {project.imageHref ? (
                  <a
                    href={project.imageHref}
                    className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
                    aria-label={`Open ${project.title} case study`}
                  >
                    <div className="flex aspect-[4/3] items-center justify-center overflow-hidden border-1 border-black bg-[#f7f7f5] p-6 transition-colors hover:bg-white md:p-8">
                      {project.illustration}
                    </div>
                  </a>
                ) : null}
              </motion.div>

              <div className={index % 2 === 0 ? 'md:order-2' : 'md:order-1'}>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#666]">
                  0{index + 1} / {project.status} / {project.category}
                </p>

                <div className="mt-5 flex items-center gap-3">
                  {project.titleLogo ? (
                    <img src={project.titleLogo} alt="" aria-hidden="true" className="h-9 w-9 object-contain" />
                  ) : null}
                  <a
                    href={project.imageHref}
                    className="text-lg font-semibold tracking-[-0.03em] text-[#333] transition-colors hover:text-[#FF4400] focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
                  >
                    {project.title}
                  </a>
                </div>

                <h3 className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-[#111] md:text-4xl">
                  <a
                    href={project.imageHref}
                    className="transition-colors hover:text-[#FF4400] focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
                  >
                    {project.headline}
                  </a>
                </h3>

                <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#555]">{project.oneLine}</p>

                <p className="mt-7 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#777]">
                  Role / {project.role}
                </p>

                {project.metrics?.length ? (
                  <ul className="mt-7 border-y border-black">
                    {project.metrics.slice(0, 3).map((item) => (
                      <li key={item} className="flex gap-3 border-b border-black py-3 text-sm font-medium text-[#222] last:border-b-0 md:text-base">
                        <span className="mt-[0.45rem] h-2 w-2 shrink-0 bg-[#FF4400]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}

                <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                  {project.links.map((link) =>
                    link.external ? (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 font-semibold text-[#FF4400] transition-colors hover:text-black"
                        whileHover={{ x: 4 }}
                      >
                        <span>{link.label}</span>
                        <ExternalLink size={16} />
                      </motion.a>
                    ) : (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        className="inline-flex items-center gap-2 font-semibold text-[#FF4400] transition-colors hover:text-black"
                        whileHover={{ x: 4 }}
                      >
                        <span>{link.label}</span>
                        <ArrowRight size={16} />
                      </motion.a>
                    ),
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
