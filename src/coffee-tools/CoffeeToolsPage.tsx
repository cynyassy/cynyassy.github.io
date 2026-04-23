import { useState } from 'react';
import { CustomCursor } from '../app/components/CustomCursor';
import authScreenImg from '../assets/coffee-tools-case-study/authentication-screen.png';
import myBagsImg from '../assets/coffee-tools-case-study/my-bags-view.png';
import myBagsViewImageImg from '../assets/coffee-tools-case-study/my-bags-view-image.png';
import appShellImg from '../assets/coffee-tools-case-study/app-shell.png';
import coverImageImg from '../assets/coffee-tools-case-study/cover-image.png';
import bagPageImg from '../assets/coffee-tools-case-study/bag-page.png';
import bagPageOneImg from '../assets/coffee-tools-case-study/bag-page-1.png';
import bagPageTwoImg from '../assets/coffee-tools-case-study/bag-page-2.png';
import logBrewImg from '../assets/coffee-tools-case-study/log-brew-page.png';
import analyticsImg from '../assets/coffee-tools-case-study/bag-analytics-page.png';
import analyticsOneImg from '../assets/coffee-tools-case-study/bag-analytics-page-1.png';
import analyticsTwoImg from '../assets/coffee-tools-case-study/bag-analytics-page-2.png';
import analyticsThreeImg from '../assets/coffee-tools-case-study/bag-analytics-page-3.png';
import profileImg from '../assets/coffee-tools-case-study/profile-page.png';
import editBagImg from '../assets/coffee-tools-case-study/edit-bag-page.png';

const projectTags = ['Builder', 'Backend System', 'Product Thinking'];

const heroMeta = [
  { label: 'Format', value: 'Product + backend case study' },
  { label: 'Core Model', value: 'Bag-centered workflow' },
  { label: 'Stack', value: 'Node, TypeScript, Supabase, Postgres' },
];

const systemPillars = [
  {
    title: 'Start from real behavior',
    description:
      'The product starts from an actual enthusiast workflow: multiple bags open at once, multiple grinders in rotation, and a need to compare results without turning brewing into admin work.',
  },
  {
    title: 'Model the bag, not just the brew',
    description:
      'Instead of treating each brew like an isolated note, Coffee Tools organizes the experience around the lifecycle of a coffee bag, then nests brew logging and analytics inside that system.',
  },
  {
    title: 'Make repeatability visible',
    description:
      'Status, roast age, best brew, history, and analytics all work together to help the user see patterns over time and get more consistent results from each coffee.',
  },
];

const workflowSteps = [
  {
    title: 'Enter with low friction',
    description:
      'Splash and magic-link login keep the entry experience light while still framing the product as a serious brewing tool.',
    image: coverImageImg,
  },
  {
    title: 'Manage active rotation',
    description:
      'The home screen is built around active bags in rotation, because serious brewers are usually comparing several coffees at once.',
    image: [appShellImg, myBagsViewImageImg],
  },
  {
    title: 'Operate from one bag hub',
    description:
      'Bag detail becomes the operational center: identity, roast age, notes, best brew, and history all live in one place.',
    image: [bagPageOneImg, bagPageTwoImg],
  },
  {
    title: 'Log, compare, improve',
    description:
      'Structured brew logging and analytics turn taste memory into something more durable, searchable, and useful.',
    image: [analyticsOneImg, analyticsTwoImg, analyticsThreeImg],
  },
];

const proofPoints = [
  'Translated a personal enthusiast problem into a clear product model.',
  'Built around Node, TypeScript, database-backed workflows, and Supabase authentication.',
  'Used bag lifecycle, brewing inputs, and analytics as part of one coherent system.',
  'Balanced practical utility with a product direction that feels specific to coffee culture.',
];

const roleSummary = {
  role: 'Product Builder',
  scope: 'Backend-first workflow design, API thinking, data modeling, and UX structure',
};

function ScreenCarousel({
  items,
  label,
  variant = 'gallery',
}: {
  items: { title: string; description: string; image: string | string[] }[];
  label: string;
  variant?: 'gallery' | 'workflow';
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = items[activeIndex];

  const goPrev = () => setActiveIndex((current) => (current === 0 ? items.length - 1 : current - 1));
  const goNext = () => setActiveIndex((current) => (current === items.length - 1 ? 0 : current + 1));

  return (
    <div className={`coffee-tools-carousel${variant === 'workflow' ? ' coffee-tools-carousel--workflow' : ''}`} aria-label={label}>
      {variant === 'workflow' ? (
        <div className="coffee-tools-workflow-card">
          <div className="coffee-tools-workflow-card__copy">
            <p className="coffee-tools-step-index">
              {String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            </p>
            <h3>{activeItem.title}</h3>
            <p>{activeItem.description}</p>
          </div>
          <div className="coffee-tools-workflow-card__image-wrap">
            <div className="coffee-tools-workflow-card__image-frame">
              {Array.isArray(activeItem.image) ? (
                <div
                  className={`coffee-tools-workflow-card__image-pair${
                    activeItem.image.length === 3 ? ' coffee-tools-workflow-card__image-pair--triple' : ''
                  }`}
                >
                  {activeItem.image.map((imageSrc, index) => (
                    <img key={imageSrc} src={imageSrc} alt={`${activeItem.title} screen ${index + 1}`} />
                  ))}
                </div>
              ) : (
                <img src={activeItem.image} alt={activeItem.title} />
              )}
            </div>
          </div>
          <div className="coffee-tools-workflow-card__nav">
            <button type="button" className="coffee-tools-carousel__arrow" onClick={goPrev} aria-label={`Previous ${label}`}>
              Prev
            </button>
            <div className="coffee-tools-carousel__dots" aria-label={`${label} navigation`}>
              {items.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  className={`coffee-tools-carousel__dot${index === activeIndex ? ' is-active' : ''}`}
                  aria-label={`Go to ${item.title}`}
                  aria-pressed={index === activeIndex}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
            <button type="button" className="coffee-tools-carousel__arrow" onClick={goNext} aria-label={`Next ${label}`}>
              Next
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="coffee-tools-carousel__meta">
            <div className="coffee-tools-carousel__copy">
              <p className="coffee-tools-step-index">
                {String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
              </p>
              <h3>{activeItem.title}</h3>
              <p>{activeItem.description}</p>
            </div>
          </div>

          <div className="coffee-tools-carousel__stage">
            <div />
            <div className="coffee-tools-carousel__image-column">
              <div className="coffee-tools-carousel__image-frame">
                <img src={activeItem.image} alt={activeItem.title} />
              </div>
              <div className="coffee-tools-carousel__controls">
                <button type="button" className="coffee-tools-carousel__arrow" onClick={goPrev} aria-label={`Previous ${label}`}>
                  Prev
                </button>
                <div className="coffee-tools-carousel__dots" aria-label={`${label} navigation`}>
                  {items.map((item, index) => (
                    <button
                      key={item.title}
                      type="button"
                      className={`coffee-tools-carousel__dot${index === activeIndex ? ' is-active' : ''}`}
                      aria-label={`Go to ${item.title}`}
                      aria-pressed={index === activeIndex}
                      onClick={() => setActiveIndex(index)}
                    />
                  ))}
                </div>
                <button type="button" className="coffee-tools-carousel__arrow" onClick={goNext} aria-label={`Next ${label}`}>
                  Next
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function SectionHeader({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <header className="space-y-3">
      {eyebrow ? <p className="coffee-tools-eyebrow">{eyebrow}</p> : null}
      <h2 className="text-4xl font-semibold tracking-[-0.04em] md:text-5xl text-[#111111]">{title}</h2>
      {description ? <p className="max-w-3xl text-base md:text-lg leading-relaxed text-[#4f4f4f]">{description}</p> : null}
    </header>
  );
}

export default function CoffeeToolsPage() {
  return (
    <div className="coffee-tools-page min-h-screen bg-[#ffffff] text-[#111111]">
      <CustomCursor />
      <a href="#coffee-tools-main" className="coffee-tools-skip-link">
        Skip to content
      </a>

      <header className="coffee-tools-topbar">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4 md:px-10">
          <a href="../index.html#featured-work" className="coffee-tools-back-link">
            Back To Portfolio
          </a>
          <nav className="hidden items-center gap-6 md:flex">
            <a href="#overview" className="coffee-tools-nav-link">
              Overview
            </a>
            <a href="#workflow" className="coffee-tools-nav-link">
              Workflow
            </a>
          </nav>
        </div>
      </header>

      <main id="coffee-tools-main" className="mx-auto flex max-w-6xl flex-col gap-24 px-6 py-12 md:px-10 md:py-16">
        <section id="overview" className="coffee-tools-hero-grid">
          <div className="space-y-8">
            <div className="flex flex-wrap gap-3">
              {projectTags.map((tag) => (
                <span key={tag} className="coffee-tools-tag">
                  {tag}
                </span>
              ))}
            </div>

            <div className="space-y-5">
              <p className="coffee-tools-eyebrow">Coffee Tools</p>
              <h1 className="text-5xl font-semibold leading-[0.98] tracking-[-0.06em] text-[#111111] md:text-5xl">
                Designing a bag-centered brew tracker for repeatability
              </h1>
              <p className="text-2xl font-medium leading-tight text-[#1f1f1f] md:text-3xl">
                A product and backend system built around how serious home brewers actually work
              </p>
              <p className="max-w-3xl text-lg leading-relaxed text-[#4f4f4f] md:text-xl">
                I buy multiple bags of coffee at the same time and switch between a J-Ultra, ZP6, Baratza Encore ESP,
                and Timemore C2. Most logging tools made recipe tracking feel laborious, when the real goal was
                consistency. Coffee Tools came from that gap.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[8px] border-2 border-black bg-white p-4">
                <p className="coffee-tools-eyebrow mb-2">Role</p>
                <p className="text-lg font-semibold tracking-[-0.03em] text-[#111]">{roleSummary.role}</p>
              </div>
              <div className="rounded-[8px] border-2 border-black bg-white p-4">
                <p className="coffee-tools-eyebrow mb-2">Scope</p>
                <p className="text-base leading-relaxed text-[#444]">{roleSummary.scope}</p>
              </div>
            </div>

            <dl className="coffee-tools-hero-meta">
              {heroMeta.map((item) => (
                <div key={item.label} className="coffee-tools-hero-meta__item">
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>

            <div className="coffee-tools-note">
              <p className="text-2xl font-semibold text-[#111111]">
                The key product decision was simple:
              </p>
              <p className="text-base leading-relaxed text-[#4f4f4f] md:text-lg">
                model the <strong>bag lifecycle</strong>, not just isolated brew notes. That single shift made the rest
                of the flow make sense.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <a href="https://github.com/cynyassy/coffee-tool" target="_blank" rel="noreferrer" className="coffee-tools-button">
                View GitHub Repo
              </a>
              <a href="#screens" className="coffee-tools-button coffee-tools-button--secondary">
                See Product Screens
              </a>
            </div>
          </div>

          <div className="coffee-tools-hero-visual">
            <div className="coffee-tools-device coffee-tools-device--large">
              <img src={coverImageImg} alt="Coffee Tools cover image showing splash and bags screen" />
            </div>
          </div>
        </section>

        <section className="space-y-10">
          <SectionHeader
            eyebrow="Problem"
            title="Most coffee logging tools capture data, but not the workflow around the data"
            description="The harder part is not writing down one recipe. It is managing multiple bags, multiple grinders, roast timing, repeat attempts, and small changes that compound into better cups."
          />

          <div className="coffee-tools-story-grid">
            <article className="coffee-tools-story-panel">
              <h3>What was frustrating</h3>
              <p>
                Recipes were tedious to log, comparisons were awkward, and the experience rarely reflected how serious
                home brewers actually work. Everything felt like isolated note-taking.
              </p>
            </article>
            <article className="coffee-tools-story-panel coffee-tools-story-panel--accent">
              <h3>What needed to change</h3>
              <p>
                The product needed to center the unit people actually manage: the bag. Once that exists, brews,
                analytics, notes, and grinder choices can all connect back to a meaningful object.
              </p>
            </article>
          </div>
        </section>

        <section className="space-y-10">
          <SectionHeader
            eyebrow="Approach"
            title="I treated this as both a product problem and a system design problem"
            description="The interface only works if the underlying model is coherent. So the case study is not just about screen polish, but about how the data, actions, and screens support one another."
          />

          <div className="coffee-tools-pillars">
            {systemPillars.map((pillar) => (
              <article key={pillar.title} className="coffee-tools-pillar-card">
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="workflow" className="space-y-10">
          <SectionHeader
            eyebrow="Workflow"
            title="The product flow is simple on purpose"
            description="A good brewing tool should lower friction, not create more ceremony than the brewing process already has."
          />

          <ScreenCarousel items={workflowSteps} label="workflow screens" variant="workflow" />
        </section>

        <section className="space-y-10">
          <SectionHeader
            eyebrow="Backend"
            title="Backend Architecture & Data Flow"
            description="This project was designed as a backend-first system. The goal was to build a reliable data pipeline for logging, storing, and analyzing coffee brews."
          />

          <div className="coffee-tools-story-panel coffee-tools-story-panel--accent">
            <p>
              Instead of focusing only on UI, I built the system end-to-end across the API layer, business logic,
              database design, and authentication.
            </p>
          </div>

          <div className="coffee-tools-flow-wrap" aria-label="Coffee Tools backend architecture flow">
            <p className="coffee-tools-summary-card__eyebrow">Sequence walkthrough</p>
            <div className="coffee-tools-flow-rail">
              <div className="coffee-tools-flow-lane">
                <div className="coffee-tools-flow-column">User</div>
                <div className="coffee-tools-flow-column">Frontend</div>
                <div className="coffee-tools-flow-column">Supabase Auth</div>
                <div className="coffee-tools-flow-column">Express API</div>
                <div className="coffee-tools-flow-column">Business Logic</div>
                <div className="coffee-tools-flow-column">PostgreSQL</div>
              </div>

              <div className="coffee-tools-flow-step">
                <span className="coffee-tools-flow-step__index">1</span>
                <p>User logs a brew from the app.</p>
              </div>
              <div className="coffee-tools-flow-arrow-row">
                <span>User</span>
                <span>→</span>
                <span>Frontend captures brew fields</span>
              </div>

              <div className="coffee-tools-flow-step">
                <span className="coffee-tools-flow-step__index">2</span>
                <p>The frontend sends an authenticated request to create the brew record.</p>
              </div>
              <div className="coffee-tools-flow-arrow-row">
                <span>Frontend</span>
                <span>→</span>
                <span>Supabase Auth verifies session</span>
                <span>→</span>
                <span>API middleware attaches user context</span>
              </div>

              <div className="coffee-tools-flow-step">
                <span className="coffee-tools-flow-step__index">3</span>
                <p>The API hands the request to business logic for validation and enrichment.</p>
              </div>
              <div className="coffee-tools-flow-arrow-row">
                <span>Express API</span>
                <span>→</span>
                <span>Validate inputs</span>
                <span>→</span>
                <span>Attach coffee bag</span>
                <span>→</span>
                <span>Calculate derived fields</span>
              </div>

              <div className="coffee-tools-flow-step">
                <span className="coffee-tools-flow-step__index">4</span>
                <p>Clean data is written through Drizzle into PostgreSQL and returned to the app.</p>
              </div>
              <div className="coffee-tools-flow-arrow-row">
                <span>Business Logic</span>
                <span>→</span>
                <span>Drizzle ORM</span>
                <span>→</span>
                <span>PostgreSQL stores brew</span>
                <span>→</span>
                <span>Response updates UI</span>
              </div>
            </div>
          </div>

          <div className="coffee-tools-backend-grid">
            <article className="coffee-tools-pillar-card">
              <p className="coffee-tools-summary-card__eyebrow">Request Flow Example</p>
              <ol className="coffee-tools-number-list">
                <li>User logs a brew from the frontend.</li>
                <li>Request is sent to the Express API.</li>
                <li>Middleware verifies the user via Supabase Auth.</li>
                <li>Business logic validates inputs, attaches the coffee bag, and calculates derived fields.</li>
                <li>Data is stored in PostgreSQL through Drizzle ORM.</li>
                <li>The response returns and the UI updates.</li>
              </ol>
            </article>

            <article className="coffee-tools-pillar-card">
              <p className="coffee-tools-summary-card__eyebrow">Key Design Decisions</p>
              <ul className="coffee-tools-detail-list">
                <li>
                  <strong>Backend-first approach</strong>
                  <span>Ensured data integrity before UI polish.</span>
                </li>
                <li>
                  <strong>Typed database layer (Drizzle ORM)</strong>
                  <span>Reduced runtime errors and improved schema clarity.</span>
                </li>
                <li>
                  <strong>Stateless API design</strong>
                  <span>Kept each request self-contained and scalable.</span>
                </li>
                <li>
                  <strong>Auth separation (Supabase)</strong>
                  <span>Avoided reinventing authentication while keeping the backend clean.</span>
                </li>
              </ul>
            </article>
          </div>

          <div className="coffee-tools-note">
            <p className="coffee-tools-summary-card__eyebrow">Why this matters</p>
            <p className="mb-4">
              This system is designed not just to log data, but to scale into future product layers without needing a
              rewrite.
            </p>
            <ul className="coffee-tools-inline-list">
              <li>analytics such as best brews and trends</li>
              <li>recommendations</li>
              <li>social sharing</li>
            </ul>
          </div>
        </section>

        <section className="space-y-10">
          <div className="space-y-8">
            <SectionHeader
              eyebrow="What This Shows"
              title="This project reflects how I like to build"
              description="I usually work best when I can move from fuzzy real-world frustration to a cleaner system that makes behavior easier, not harder."
            />

            <ul className="coffee-tools-proof-list">
              {proofPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>

          <div className="coffee-tools-next-block">
            <div className="space-y-4">
              <p className="coffee-tools-summary-card__eyebrow">Next iteration</p>
              <h3>Where I would take it next</h3>
              <ul className="coffee-tools-next-list">
                <li>
                  <strong>Deepen Bag Detail</strong>
                  <span>Make the main operating screen feel even more like the center of the workflow.</span>
                </li>
                <li>
                  <strong>Improve My Bags hierarchy</strong>
                  <span>Make rotation, status, and best-result signals easier to scan at a glance.</span>
                </li>
                <li>
                  <strong>Refine brew logging</strong>
                  <span>Smooth out the interaction so capturing brews feels faster and less administrative.</span>
                </li>
                <li>
                  <strong>Sharpen analytics</strong>
                  <span>Turn analytics into a decision-making surface, not just a passive report view.</span>
                </li>
              </ul>
            </div>
            <img src={profileImg} alt="Coffee Tools profile screen" />
          </div>
        </section>
      </main>
    </div>
  );
}
