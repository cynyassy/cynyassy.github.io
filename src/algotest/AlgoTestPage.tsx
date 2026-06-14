import algotestLogoImg from '../assets/algotest-case-study/algotest-logo.png';
import algotestDocsScreenshot from '../assets/algotest_documentation.png';
import googleSearchConsoleClicks from '../assets/algotest-case-study/google_search_console1.png';
import googleSearchConsoleImpressions from '../assets/algotest-case-study/google_search_console2.png';
import tradersPathStart from '../assets/algotest-bet-sizer/BS - Trader\'s Path 1.png';
import tradersPathExperiment from '../assets/algotest-bet-sizer/BS - Trader\'s Path 7.png';
import tradersPathOutcome from '../assets/algotest-bet-sizer/BS - Trader\'s Path 13.png';

const impactMetrics = [
  ['25K → 150K', 'Monthly organic clicks', '6× growth through documentation-led search'],
  ['₹15–18L → ₹50L+', 'Monthly revenue', 'as education and qualified demand improved'],
  ['23 → 37', 'Domain Rating', 'in roughly 12 months'],
  ['Primary', 'Lead-generation channel', 'SEO moved from a side channel to the main source'],
];

const frictionPoints = [
  [
    'Repetitive support',
    'Customers repeatedly needed help with signup, broker connections, setup, pricing, and product workflows.',
  ],
  [
    'Onboarding friction',
    'A technically capable product still felt difficult to trust and use because essential knowledge lived inside the company.',
  ],
  [
    'Uncaptured demand',
    'High-intent searches existed, but the website did not yet answer those questions deeply enough to earn discovery.',
  ],
];

const systemPillars = [
  [
    'Documentation',
    'Built docs.algotest.in from scratch, covering onboarding, pricing, broker setup, feature workflows, signals, and troubleshooting.',
  ],
  [
    'Search',
    'Mapped content to real user intent using support conversations, Ahrefs, Search Console, Analytics, and category research.',
  ],
  [
    'Distribution',
    'Connected support, product education, search, marketing, and video so a useful explanation could work across channels.',
  ],
];

const executionSteps = [
  'Collected recurring questions directly from support conversations.',
  'Prioritized pages with the highest onboarding and support value.',
  'Worked with frontend, backend, design, and subject-matter experts.',
  'Wrote and versioned documentation in Markdown through GitHub.',
  'Measured search performance, usage, and customer response continuously.',
];

const searchMetrics = [
  ['1.29M', 'Clicks over 16 months'],
  ['11.3M', 'Search impressions'],
  ['11.4%', 'Average CTR'],
  ['12.7', 'Average position'],
];

const proofPoints = [
  'Support teams actively reused the pages, validating that they solved real product problems.',
  'Some pages outranked brokers’ official documentation for high-intent setup queries.',
  'Brokers contacted AlgoTest after losing search traffic to its documentation.',
];

const tradersPathFrames = [
  [
    tradersPathStart,
    'Begin with a recognizable decision',
    'A character, a capital amount, and a risky choice create intuition before theory appears.',
  ],
  [
    tradersPathExperiment,
    'Let the learner change the inputs',
    'Users can adjust bet size and watch the return curve respond instead of passively reading an answer.',
  ],
  [
    tradersPathOutcome,
    'Connect the model to an outcome',
    'The final state makes the optimal point, capital, and return visible in one place.',
  ],
];

const reflections = [
  'In complex products, recurring confusion is product data.',
  'Documentation can improve support, onboarding, discovery, and trust at the same time.',
  'Utility compounds more reliably than content volume.',
];

function SectionIntro({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="section-head">
      <p className="label">{label}</p>
      <div>
        <h2>{title}</h2>
        {children}
      </div>
    </header>
  );
}

function NumberedList({ items }: { items: string[][] }) {
  return (
    <div className="numbered-list">
      {items.map(([title, description], index) => (
        <article key={title}>
          <span className="number">{String(index + 1).padStart(2, '0')}</span>
          <h3>{title}</h3>
          <p>{description}</p>
        </article>
      ))}
    </div>
  );
}

function Figure({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure>
      <img src={src} alt={alt} />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export default function AlgoTestPage() {
  return (
    <div className="algotest-page">
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <header className="topbar">
        <div>
          <a href="../index.html#featured-work">Back to portfolio</a>
          <nav aria-label="Case study sections">
            <a href="#overview">Overview</a>
            <a href="#intervention">Intervention</a>
            <a href="#proof">Proof</a>
          </nav>
        </div>
      </header>

      <main id="main">
        <section id="overview" className="hero">
          <div className="hero-copy">
            <div className="brand">
              <img src={algotestLogoImg} alt="AlgoTest logo" />
              <div>
                <p className="label">Product education & growth</p>
                <strong>AlgoTest</strong>
              </div>
            </div>

            <h1>How documentation helped grow organic traffic 6×</h1>
            <p className="dek">
              I built a documentation-led growth engine that improved acquisition, onboarding, and support for a
              complex fintech product.
            </p>
            <p className="muted">
              Recurring customer questions revealed the leverage point: essential product knowledge existed, but it
              was difficult to find and use. I turned that internal understanding into structured education that could
              serve customers and compound through search.
            </p>
            <p className="role">
              <span className="label">Role</span>
              Strategy · Documentation design · SEO execution · Cross-functional delivery
            </p>
          </div>

          <aside className="impact" aria-label="Key business impact">
            <p className="label">Impact</p>
            {impactMetrics.map(([value, label, detail]) => (
              <p className="impact-item" key={label}>
                <strong>{value}</strong>
                <b>{label}</b>
                <small>{detail}</small>
              </p>
            ))}
          </aside>
        </section>

        <section className="section">
          <SectionIntro label="The challenge" title="The growth problem was also a comprehension problem">
            <p>
              AlgoTest was a powerful trading and backtesting platform. Growth stalled at several points because
              customers could not easily access the knowledge required to reach value.
            </p>
          </SectionIntro>

          <NumberedList items={frictionPoints} />

          <blockquote className="callout">
            The same explanation could reduce support load, improve onboarding, earn search visibility, and build
            trust. Documentation was not a support artifact; it was a product and growth layer.
          </blockquote>
        </section>

        <section id="intervention" className="section">
          <SectionIntro label="The intervention" title="One education engine, working across the customer journey">
            <p>
              I treated repeated confusion as a design signal. The work began with what customers were actually asking,
              then connected documentation, search, support, and product education.
            </p>
          </SectionIntro>

          <div className="split">
            <NumberedList items={systemPillars} />
            <Figure
              src={algotestDocsScreenshot}
              alt="Published AlgoTest documentation homepage with navigation and educational resources"
              caption="The documentation became a real product surface, spanning onboarding, broker setup, workflows, automation, troubleshooting, and ongoing education."
            />
          </div>

          <div className="process">
            <p className="label">How it operated</p>
            <ol>
              {executionSteps.map((step, index) => (
                <li key={step}>
                  <span className="number">{String(index + 1).padStart(2, '0')}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="proof" className="section">
          <SectionIntro label="Proof" title="Search visibility grew because the pages were useful">
            <p>
              The strongest evidence was not traffic alone. The documentation captured qualified demand, was reused by
              support, displaced category incumbents in search, and influenced business growth.
            </p>
          </SectionIntro>

          <div className="stats">
            {searchMetrics.map(([value, label]) => (
              <p key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </p>
            ))}
          </div>

          <div className="gallery gallery-two">
            <Figure
              src={googleSearchConsoleClicks}
              alt="Google Search Console clicks graph for AlgoTest"
              caption="1.29M clicks over 16 months."
            />
            <Figure
              src={googleSearchConsoleImpressions}
              alt="Google Search Console impressions graph for AlgoTest"
              caption="11.3M impressions as documentation depth expanded."
            />
          </div>

          <ul className="proof-list">
            {proofPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </section>

        <section className="section">
          <SectionIntro label="Extending the model" title="Some concepts needed interaction, not another article">
            <p>
              Trader’s Path applied the same education strategy to position sizing and the Kelly Criterion. Instead of
              explaining the formula first, the experience let users see consequences, change inputs, and build
              intuition.
            </p>
          </SectionIntro>

          <div className="gallery gallery-three">
            {tradersPathFrames.map(([image, title, description], index) => (
              <figure key={title}>
                <img src={image} alt={title} />
                <figcaption className="caption-detail">
                  <span className="number">{String(index + 1).padStart(2, '0')}</span>
                  <span>
                    <strong>{title}</strong>
                    <span>{description}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="section reflection">
          <SectionIntro label="What I learned" title="Growth in complex products often starts with education" />
          <ol>
            {reflections.map((reflection, index) => (
              <li key={reflection}>
                <span className="number">{String(index + 1).padStart(2, '0')}</span>
                {reflection}
              </li>
            ))}
          </ol>
        </section>
      </main>
    </div>
  );
}
