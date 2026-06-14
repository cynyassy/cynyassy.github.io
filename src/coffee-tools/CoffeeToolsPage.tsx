import { useState } from 'react';
import myBagsViewImageImg from '../assets/coffee-tools-case-study/my-bags-view-image.png';
import appShellImg from '../assets/coffee-tools-case-study/app-shell.png';
import coverImageImg from '../assets/coffee-tools-case-study/cover-image.png';
import bagPageOneImg from '../assets/coffee-tools-case-study/bag-page-1.png';
import bagPageTwoImg from '../assets/coffee-tools-case-study/bag-page-2.png';
import analyticsOneImg from '../assets/coffee-tools-case-study/bag-analytics-page-1.png';
import analyticsTwoImg from '../assets/coffee-tools-case-study/bag-analytics-page-2.png';
import analyticsThreeImg from '../assets/coffee-tools-case-study/bag-analytics-page-3.png';
import profileImg from '../assets/coffee-tools-case-study/profile-page.png';

const workflowSteps = [
  {
    title: 'Enter with low friction',
    description:
      'A short introduction and magic-link login make the product easy to enter without making it feel disposable.',
    image: coverImageImg,
  },
  {
    title: 'See the active rotation',
    description:
      'The home screen starts with the bags currently in use, because serious brewers are often comparing several coffees at once.',
    image: [appShellImg, myBagsViewImageImg],
  },
  {
    title: 'Work from one bag hub',
    description:
      'Identity, roast age, notes, best brew, and history stay attached to the coffee they describe.',
    image: [bagPageOneImg, bagPageTwoImg],
  },
  {
    title: 'Compare and improve',
    description:
      'Structured brew records turn taste memory into patterns that can guide the next attempt.',
    image: [analyticsOneImg, analyticsTwoImg, analyticsThreeImg],
  },
];

const backendSteps = [
  {
    label: '01',
    title: 'Capture',
    description: 'The frontend collects method, grinder, dose, water, settings, rating, and tasting notes.',
  },
  {
    label: '02',
    title: 'Authenticate',
    description: 'Supabase verifies the session before middleware attaches the user to the request.',
  },
  {
    label: '03',
    title: 'Validate',
    description: 'Express hands the request to typed business logic that checks inputs and connects the brew to its bag.',
  },
  {
    label: '04',
    title: 'Store',
    description: 'Drizzle writes the clean record to PostgreSQL and keeps the data model explicit.',
  },
  {
    label: '05',
    title: 'Learn',
    description: 'The response updates the product and gives future analytics a reliable history to work with.',
  },
];

const nextSteps = [
  {
    title: 'Faster brew logging',
    description: 'Reduce the interaction cost of capturing a brew while the user is already busy making it.',
  },
  {
    title: 'Sharper comparisons',
    description: 'Make grinder, recipe, roast age, and rating differences easier to read together.',
  },
  {
    title: 'Useful recommendations',
    description: 'Use brew history to suggest repeatable starting points rather than simply reporting old data.',
  },
];

function ScreenCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = workflowSteps[activeIndex];

  const goPrev = () =>
    setActiveIndex((current) => (current === 0 ? workflowSteps.length - 1 : current - 1));
  const goNext = () =>
    setActiveIndex((current) => (current === workflowSteps.length - 1 ? 0 : current + 1));

  return (
    <div className="coffee-workflow" aria-label="Coffee Tools product workflow">
      <div className="coffee-workflow__copy">
        <p className="coffee-index">
          {String(activeIndex + 1).padStart(2, '0')} / {String(workflowSteps.length).padStart(2, '0')}
        </p>
        <h3>{activeItem.title}</h3>
        <p>{activeItem.description}</p>
      </div>

      <div className="coffee-workflow__visual">
        <div
          className={`coffee-workflow__screens${
            Array.isArray(activeItem.image) && activeItem.image.length === 3
              ? ' coffee-workflow__screens--triple'
              : ''
          }`}
        >
          {(Array.isArray(activeItem.image) ? activeItem.image : [activeItem.image]).map((image, index) => (
            <img key={image} src={image} alt={`${activeItem.title} screen ${index + 1}`} />
          ))}
        </div>
      </div>

      <div className="coffee-workflow__controls">
        <button type="button" onClick={goPrev} aria-label="Previous workflow step">
          Prev
        </button>
        <div className="coffee-workflow__dots" aria-label="Workflow navigation">
          {workflowSteps.map((step, index) => (
            <button
              key={step.title}
              type="button"
              className={index === activeIndex ? 'is-active' : ''}
              aria-label={`Go to ${step.title}`}
              aria-pressed={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
        <button type="button" onClick={goNext} aria-label="Next workflow step">
          Next
        </button>
      </div>
    </div>
  );
}

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
    <header className="coffee-section-intro">
      <p className="coffee-eyebrow">{label}</p>
      <div>
        <h2>{title}</h2>
        {children}
      </div>
    </header>
  );
}

export default function CoffeeToolsPage() {
  return (
    <div className="coffee-page">
      <a href="#coffee-main" className="coffee-skip-link">
        Skip to content
      </a>

      <header className="coffee-topbar">
        <a href="../index.html#featured-work">Back to portfolio</a>
        <nav aria-label="Coffee Tools sections">
          <a href="#product">Product</a>
          <a href="#backend">Backend</a>
          <a href="#next">Next</a>
        </nav>
      </header>

      <main id="coffee-main">
        <section className="coffee-hero">
          <div className="coffee-hero__copy">
            <p className="coffee-eyebrow">Product build / backend learning</p>
            <h1>Coffee Tools</h1>
            <p className="coffee-hero__dek">
              A brew tracker built around the coffee bag, not the isolated note.
            </p>
            <p className="coffee-hero__body">
              I keep several coffees and four grinders in rotation. Remembering what worked across changing beans,
              roast age, recipes, and equipment was harder than brewing itself. I used that familiar problem to learn
              how product flows, authentication, APIs, and data models fit together.
            </p>
            <p className="coffee-role">
              <span>My work</span>
              Product model · UX flow · API design · authentication · data modelling
            </p>
            <div className="coffee-actions">
              <a href="https://github.com/cynyassy/coffee-tool" target="_blank" rel="noreferrer">
                View GitHub repo
              </a>
              <a href="#product" className="coffee-actions__secondary">
                See the product
              </a>
            </div>
          </div>

          <figure className="coffee-hero__visual">
            <img src={coverImageImg} alt="Coffee Tools splash screen beside the active coffee bag list" />
          </figure>
        </section>

        <section className="coffee-section coffee-decision">
          <SectionIntro label="The product decision" title="Track the lifecycle of a bag">
            <p>
              Most coffee trackers begin with a blank brew record. Coffee Tools begins with the thing the brewer is
              actually trying to understand: a specific bag of coffee over time.
            </p>
          </SectionIntro>

          <div className="coffee-decision__comparison">
            <article>
              <p className="coffee-index">Before</p>
              <h3>Disconnected notes</h3>
              <p>Recipes, grinder settings, ratings, and tasting notes lived as separate memories or entries.</p>
            </article>
            <span aria-hidden="true">→</span>
            <article>
              <p className="coffee-index">Coffee Tools</p>
              <h3>One bag-centered history</h3>
              <p>Every brew stays connected to origin, roaster, roast age, equipment, and the best result so far.</p>
            </article>
          </div>

          <dl className="coffee-model">
            <div>
              <dt>Core object</dt>
              <dd>Coffee bag</dd>
            </div>
            <div>
              <dt>Repeated action</dt>
              <dd>Log a brew</dd>
            </div>
            <div>
              <dt>Useful outcome</dt>
              <dd>Find what works</dd>
            </div>
            <div>
              <dt>Stack</dt>
              <dd>Node · TypeScript · Supabase · PostgreSQL</dd>
            </div>
          </dl>
        </section>

        <section id="product" className="coffee-section">
          <SectionIntro label="Product workflow" title="The interface follows the way coffee is used">
            <p>
              The flow moves from active rotation to one bag, then from individual brews to patterns. It is simple
              because brewing already has enough ceremony.
            </p>
          </SectionIntro>
          <ScreenCarousel />
        </section>

        <section id="backend" className="coffee-section coffee-backend">
          <SectionIntro label="Backend architecture" title="What happens when a user logs a brew">
            <p>
              The backend turns a quick interaction into structured history. Authentication, validation, storage, and
              response are separate responsibilities, but they serve one continuous user action.
            </p>
          </SectionIntro>

          <ol className="coffee-backend__flow">
            {backendSteps.map((step) => (
              <li key={step.title}>
                <span>{step.label}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>

          <div className="coffee-backend__decisions">
            <div>
              <p className="coffee-eyebrow">Why Supabase Auth</p>
              <p>Use a proven identity layer instead of rebuilding authentication inside the API.</p>
            </div>
            <div>
              <p className="coffee-eyebrow">Why Drizzle</p>
              <p>Keep schema and queries typed so the database model remains visible in the code.</p>
            </div>
            <div>
              <p className="coffee-eyebrow">Why stateless requests</p>
              <p>Let each request carry the context it needs, keeping the service easier to reason about and extend.</p>
            </div>
          </div>
        </section>

        <section id="next" className="coffee-section coffee-next">
          <div>
            <p className="coffee-eyebrow">Next iteration</p>
            <h2>Turn recorded history into better decisions</h2>
            <p className="coffee-next__intro">
              The prototype proves the model. The next version should make logging lighter and use the accumulated data
              more actively.
            </p>
            <ul>
              {nextSteps.map((step) => (
                <li key={step.title}>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </li>
              ))}
            </ul>
          </div>
          <img src={profileImg} alt="Coffee Tools profile screen with four configured grinders" />
        </section>
      </main>

      <footer className="coffee-footer">
        <p>Coffee Tools</p>
        <div>
          <a href="https://github.com/cynyassy/coffee-tool" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="../index.html#featured-work">More work</a>
        </div>
      </footer>
    </div>
  );
}
