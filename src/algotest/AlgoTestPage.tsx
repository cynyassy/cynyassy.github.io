import algotestLogoImg from '../assets/algotest-case-study/algotest-logo.png';
import algotestDocsScreenshot from '../assets/algotest_documentation.png';
import google_search_console1 from '../assets/algotest-case-study/google_search_console1.png';
import google_search_console2 from '../assets/algotest-case-study/google_search_console2.png';
import tradersPathFrame1 from '../assets/algotest-bet-sizer/BS - Trader\'s Path 1.png';
import tradersPathFrame3 from '../assets/algotest-bet-sizer/BS - Trader\'s Path 3.png';
import tradersPathFrame4 from '../assets/algotest-bet-sizer/BS - Trader\'s Path 4.png';
import tradersPathFrame7 from '../assets/algotest-bet-sizer/BS - Trader\'s Path 7.png';
import tradersPathFrame8 from '../assets/algotest-bet-sizer/BS - Trader\'s Path 8.png';
import tradersPathFrame13 from '../assets/algotest-bet-sizer/BS - Trader\'s Path 13.png';

const heroMetrics = [
  {
    label: 'Monthly organic clicks',
    value: '25K → 150K',
    detail: 'through documentation-led search growth',
  },
  {
    label: 'Monthly revenue',
    value: '₹15–18L → ₹50L+',
    detail: 'as education and demand capture improved',
  },
  {
    label: 'Domain Rating',
    value: '23 → 37',
    detail: 'in roughly 12 months',
  },
  {
    label: 'Lead-generation mix',
    value: 'SEO became primary',
    detail: 'instead of acting as a side channel',
  },
];

const roleAreas = [
  'Growth strategy',
  'Documentation system design',
  'SEO execution',
  'Cross-functional delivery',
];

const roleScope =
  'Scope: strategy, documentation systems, acquisition, onboarding clarity, and product education.';

const problemPoints = [
  'Customer support was overloaded with repetitive setup and onboarding questions.',
  'Onboarding friction was limiting activation and conversions.',
  'The website was not fully capturing high-intent search demand.',
];

const buildPillars = [
  {
    title: 'Documentation system',
    description:
      'I built docs.algotest.in from scratch and created onboarding, broker setup, workflow, and troubleshooting content in Markdown, versioned through GitHub and shipped at effectively zero hosting cost.',
  },
  {
    title: 'SEO engine',
    description:
      'Content decisions were driven by user intent rather than generic keywords. I used Ahrefs, Google Search Console, Google Analytics, and support feedback to identify durable search opportunities.',
  },
  {
    title: 'Education layer',
    description:
      'I extended the system beyond docs into YouTube education, clearer product messaging, and interactive learning tools for concepts that were easier to understand visually than through text alone.',
  },
];

const leveragePoints = [
  'Reduced repetitive support load',
  'Improved onboarding and activation',
  'Created reusable assets for support and marketing',
  'Compounded as SEO traffic over time',
];

const executionPoints = [
  'Identified recurring user pain directly from support conversations',
  'Prioritized pages with the highest support and onboarding value',
  'Collaborated with frontend, backend, and design teams',
  'Wrote, versioned, and updated documentation continuously through GitHub',
  'Measured results through Ahrefs, GSC, GA, and user feedback',
  'Noticed that pages support actively shared tended to rank faster and stronger',
];

const proofStats = [
  { label: 'Search clicks', value: '1.29M', detail: 'qualified visits generated over 16 months' },
  { label: 'Impressions', value: '11.3M', detail: 'category-level demand captured through docs' },
  { label: 'CTR', value: '11.4%', detail: 'signal that searchers found the result relevant' },
  { label: 'Avg position', value: '12.7', detail: 'sustained visibility across high-intent topics' },
];

const proofCallouts = [
  'Documentation increased qualified discovery because the pages solved setup and workflow pain directly.',
  'Some documentation pages outranked brokers’ own official documentation, which made the docs a competitive acquisition surface.',
  'Brokers reached out after losing traffic to AlgoTest pages, which signaled real category displacement rather than vanity growth.',
  'The compounding advantage came from utility and trust, which later supported activation, support efficiency, and revenue growth.',
];

const beyondDocs = [
  {
    title: 'YouTube education system',
    description:
      'Documentation created the base layer, but some concepts needed a more guided format. Video helped extend educational reach and improve comprehension outside the product.',
  },
  {
    title: 'Message consistency',
    description:
      'The documentation system also strengthened marketing language by making product explanations clearer, more structured, and easier to reuse across channels.',
  },
  {
    title: 'Interactive learning tools',
    description:
      'Some ideas are easier to understand interactively than through text alone. I designed learning tools like Trader’s Path to make abstract trading concepts around risk, probability, and position sizing more intuitive.',
  },
];

const docsCoverage = [
  'Getting-started and signup flows',
  'Pricing and plan explanation pages',
  '20+ broker setup guides',
  'Feature and workflow explainers',
  'Signals automation documentation',
];

const betSizerFrames = [
  {
    title: 'Start with an intuitive setup',
    description:
      'The tool introduces Harish, his capital, and the first high-risk decision so users immediately understand the scenario without needing to read a long explainer first.',
    image: tradersPathFrame1,
  },
  {
    title: 'Show why the first loss matters',
    description:
      'Instead of abstract percentages, the next steps make the capital damage visible so users feel the consequence of overbetting before the theory arrives.',
    image: tradersPathFrame8,
  },
  {
    title: 'Let users experiment with bet size',
    description:
      'Interactive controls turn the lesson into exploration. Users can change inputs and watch how return curves shift rather than passively reading an answer.',
    image: tradersPathFrame7,
  },
  {
    title: 'Connect the graph to the concept',
    description:
      'The tool introduces the Kelly Criterion after users have seen the problem play out, which makes the “optimal bet size” idea feel earned instead of academic.',
    image: tradersPathFrame4,
  },
  {
    title: 'Land the idea with a visual payoff',
    description:
      'The end state ties the recommendation back to outcome: final capital, return, and the optimal point all reinforce why risk sizing matters.',
    image: tradersPathFrame13,
  },
  {
    title: 'Use explanation screens to bridge theory',
    description:
      'Text-heavy screens still play a role, but only after the user has built intuition. They support the interaction instead of trying to replace it.',
    image: tradersPathFrame3,
  },
];

const reflections = [
  'Documentation can be a growth system, not just a support resource.',
  'In complex products, product education often reduces more friction than feature expansion.',
  'Quality and problem-solution fit compound faster than content volume.',
];

function SectionHeader({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <header className="space-y-3">
      {eyebrow ? <p className="algotest-eyebrow">{eyebrow}</p> : null}
      <h2 className="text-4xl font-semibold tracking-[-0.04em] md:text-5xl text-[#111111]">{title}</h2>
      {description ? <p className="max-w-3xl text-base md:text-lg leading-relaxed text-[#5a5752]">{description}</p> : null}
    </header>
  );
}

export default function AlgoTestPage() {
  return (
    <div className="algotest-page min-h-screen bg-[#ffffff] text-[#111111]">
      <a href="#algotest-main" className="algotest-skip-link">
        Skip to content
      </a>

      <header className="algotest-topbar">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4 md:px-10">
          <a href="../index.html#featured-work" className="algotest-back-link">
            Back To Portfolio
          </a>
          <nav className="hidden items-center gap-6 md:flex">
            <a href="#overview" className="algotest-nav-link">
              Overview
            </a>
            <a href="#system" className="algotest-nav-link">
              System
            </a>
            <a href="#proof" className="algotest-nav-link">
              Proof
            </a>
          </nav>
        </div>
      </header>

      <main id="algotest-main" className="mx-auto flex max-w-6xl flex-col gap-24 px-6 py-12 md:px-10 md:py-16">
        <section id="overview" className="algotest-hero-grid">
          <div className="space-y-8">
            <div className="space-y-5">
              <div className="algotest-brand-lockup">
                <img src={algotestLogoImg} alt="AlgoTest logo" className="algotest-brand-lockup__logo" />
                <div>
                  <p className="algotest-eyebrow">Product & Growth Strategy</p>
                  <p className="algotest-brand-lockup__name">AlgoTest</p>
                </div>
              </div>
              <h1 className="text-5xl font-semibold leading-[0.98] tracking-[-0.06em] text-[#111111] md:text-5xl">
                Documentation led growth helped drive 3x revenue at AlgoTest
              </h1>
              <p className="text-2xl font-medium leading-tight text-[#1f1f1f] md:text-2xl">
                Product education became the acquisition, onboarding, and support system.
              </p>
              <p className="max-w-3xl text-lg leading-relaxed text-[#55524d] md:text-xl">
                I built a documentation-led growth system that improved acquisition, onboarding, and support efficiency
                for a complex fintech product. AlgoTest had a powerful product, but growth was constrained not just by
                traffic. It was constrained by comprehension, trust, and onboarding friction.
              </p>
              <p className="max-w-3xl text-base md:text-lg leading-relaxed text-[#5a5752]">
                I identified the leverage point, designed the system, and executed it across documentation, product
                education, search, and measurement rather than treating those as separate workstreams.
              </p>
            </div>

            <div className="algotest-role-strip" aria-label="My role">
              <span className="algotest-role-strip__label">My role</span>
              <div className="algotest-role-strip__items">
                {roleAreas.map((role) => (
                  <span key={role}>{role}</span>
                ))}
              </div>
            </div>
            <p className="text-sm md:text-base leading-relaxed text-[#55524d]">{roleScope}</p>

            <ul className="algotest-highlight-list" aria-label="Key outcomes">
              {heroMetrics.map((metric) => (
                <li key={metric.label} className="algotest-highlight-item">
                  <span className="algotest-highlight-item__label">{metric.label}</span>
                  <p className="algotest-highlight-item__text">
                    <strong>{metric.value}</strong>
                    <span>{metric.detail}</span>
                  </p>
                </li>
              ))}
            </ul>

            <p className="algotest-recruiter-summary">
              This case study is strongest as <strong>documentation-led growth infrastructure</strong>: one system
              improving <strong>support efficiency</strong>, <strong>onboarding clarity</strong>, and
              <strong> qualified demand</strong> at the same time.
            </p>
          </div>

          <div className="algotest-hero-visual">
            <div className="algotest-growth-panel">
              <p className="algotest-growth-panel__eyebrow">Growth system</p>
              <div className="algotest-growth-track">
                <span>Support pain</span>
                <span>→</span>
                <span>Docs system</span>
                <span>→</span>
                <span>SEO visibility</span>
                <span>→</span>
                <span>Qualified demand</span>
              </div>
              <div className="algotest-growth-bars">
                <div className="algotest-growth-bars__label">Organic clicks</div>
                <div className="algotest-growth-bars__row">
                  <span>25K</span>
                  <div className="algotest-growth-bars__bar algotest-growth-bars__bar--short" />
                </div>
                <div className="algotest-growth-bars__row">
                  <span>150K</span>
                  <div className="algotest-growth-bars__bar algotest-growth-bars__bar--long" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-10">
          <SectionHeader
            eyebrow="Context"
            title="A technical product where growth was constrained by comprehension"
            description="AlgoTest is a technical trading and backtesting platform. The product was powerful, but conceptually difficult for new users. Customers struggled not just with setup, but with understanding broker connections, workflows, and the logic behind the platform itself."
          />
        </section>

        <section className="space-y-10">
          <SectionHeader
            eyebrow="Problem"
            title="The growth bottleneck was not just traffic"
            description="We were dealing with a product that generated recurring friction at acquisition, onboarding, and support at the same time."
          />

          <div className="algotest-problem-grid">
            {problemPoints.map((point) => (
              <article key={point} className="algotest-problem-card">
                <p>{point}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-10" id="system">
          <SectionHeader
            eyebrow="Core Insight"
            title="The growth problem was actually a product education problem"
            description="If users cannot understand how to set up the product, connect brokers, or interpret workflows, growth stalls at multiple levels: acquisition, activation, and retention. Documentation was not just a support artifact. It became the missing product layer."
          />
        </section>

        <section className="space-y-10">
          <SectionHeader
            eyebrow="What I Built"
            title="One system across documentation, search, and education"
            description="The work was not ‘content marketing’ in the abstract. It was an operating system for reducing recurring user friction in a form that could scale."
          />

          <div className="algotest-pillar-grid">
            {buildPillars.map((pillar) => (
              <article key={pillar.title} className="algotest-pillar-card">
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </article>
            ))}
          </div>

          <div className="algotest-coverage-block">
            <div className="algotest-coverage-block__intro">
              <p className="algotest-eyebrow">What the docs system actually covered</p>
              <p>
                AlgoTest's Documentation Project was not a handful of articles. It was a structured
                education layer spanning onboarding, pricing, broker setup, feature workflows, and signals automation.
              </p>
            </div>
            <ul className="algotest-coverage-list">
              {docsCoverage.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <figure className="algotest-coverage-figure">
              <img src={algotestDocsScreenshot} alt="Published AlgoTest documentation homepage with navigation and educational resources" />
              <figcaption>
                The published docs became a real product surface: navigable, structured, and broad enough to support
                onboarding, education, and ongoing support at scale.
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="space-y-10">
          <SectionHeader
            eyebrow="Leverage"
            title="Why documentation was such a high-leverage bet"
            description="We were not writing content for content’s sake. We were solving the same customer problem once, in a form that could scale."
          />

          <div className="algotest-leverage-grid">
            {leveragePoints.map((point) => (
              <div key={point} className="algotest-leverage-item">
                {point}
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-10">
          <SectionHeader
            eyebrow="Execution"
            title="Support pain determined what got built first"
            description="Pages that support actively shared with users tended to rank faster and stronger, which reinforced the idea that content solving real problems tends to perform well in search too."
          />

          <ol className="algotest-execution-list">
            {executionPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ol>
        </section>

        <section className="space-y-10" id="proof">
          <SectionHeader
            eyebrow="Proof"
            title="Search visibility grew because utility grew"
            description="The strongest evidence was not just more traffic, but stronger demand capture, clearer business influence, and a documentation system that became a competitive advantage in the category."
          />

          <div className="algotest-proof-grid">
            <div className="algotest-proof-board">
              <p className="algotest-proof-board__eyebrow">Search performance snapshot</p>
              <div className="algotest-proof-stats">
                {proofStats.map((stat) => (
                  <div key={stat.label} className="algotest-proof-stat">
                    <span>{stat.label}</span>
                    <strong>{stat.value}</strong>
                    <small>{stat.detail}</small>
                  </div>
                ))}
              </div>
              <div className="algotest-proof-images">
                <figure className="algotest-proof-image-card">
                  <img src={google_search_console1} alt="Google Search Console clicks graph for AlgoTest" />
                  <figcaption>
                    <strong>Clicks:</strong> 1.29M visits over 16 months, showing that documentation translated
                    educational intent into qualified traffic.
                  </figcaption>
                </figure>
                <figure className="algotest-proof-image-card">
                  <img src={google_search_console2} alt="Google Search Console impressions graph for AlgoTest" />
                  <figcaption>
                    <strong>Impressions:</strong> 11.3M impressions as documentation depth expanded across high-intent
                    product and broker queries.
                  </figcaption>
                </figure>
              </div>
            </div>

            <div className="algotest-proof-notes">
              {proofCallouts.map((note) => (
                <div key={note} className="algotest-proof-note">
                  {note}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-10">
          <SectionHeader
            eyebrow="Beyond Documentation"
            title="Once the foundation was trusted, the system could expand"
            description="Documentation came first because it solved the sharpest friction. Once that layer was solid, I extended the system into broader education and messaging."
          />

          <div className="algotest-beyond-grid">
            {beyondDocs.map((item) => (
              <article key={item.title} className="algotest-beyond-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-10">
          <SectionHeader
            eyebrow="Interactive Education"
            title="Trader’s Path turned bet sizing into something users could feel"
            description="Bet sizing and risk management are hard to teach through static copy alone. Trader’s Path was an educational tool I worked on to make position sizing, compounding loss, and the Kelly Criterion more intuitive through guided interaction."
          />

          <div className="algotest-betsizer-summary">
            <div className="algotest-betsizer-summary__copy">
              <h3>Why it mattered</h3>
              <p>
                This was not a side project for novelty. It extended the same product education logic behind the docs:
                when a concept is difficult, teach it in the format users can actually understand.
              </p>
            </div>
            <ul className="algotest-betsizer-points">
              <li>Made abstract risk concepts more intuitive.</li>
              <li>Used story and interaction instead of jargon-heavy explanation.</li>
              <li>Connected theory to outcomes users could visualize immediately.</li>
              <li>Showed how education could support trust and product adoption.</li>
            </ul>
          </div>

          <div className="algotest-betsizer-grid">
            {betSizerFrames.map((frame) => (
              <figure key={frame.title} className="algotest-betsizer-card">
                <img src={frame.image} alt={frame.title} />
                <figcaption>
                  <strong>{frame.title}</strong>
                  <span>{frame.description}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="space-y-10">
          <SectionHeader
            eyebrow="Reflection"
            title="What this taught me about growth in complex products"
            description="This work reinforced a pattern I still believe in strongly: the highest-leverage growth systems often look like education systems first."
          />

          <div className="algotest-reflection-list">
            {reflections.map((reflection) => (
              <div key={reflection} className="algotest-reflection-item">
                {reflection}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
