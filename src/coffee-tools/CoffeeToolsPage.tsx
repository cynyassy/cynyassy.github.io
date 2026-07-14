import { useState } from 'react';
import currentAuthImg from '../assets/coffee-tools-case-study/current-auth.png';
import currentBagOverviewImg from '../assets/coffee-tools-case-study/current-bag-overview.png';
import currentBagsImg from '../assets/coffee-tools-case-study/current-bags.png';
import currentBrewHistoryImg from '../assets/coffee-tools-case-study/current-brew-history.png';
import currentBrewStoryImg from '../assets/coffee-tools-case-study/current-brew-story.png';
import currentProfileShelfImg from '../assets/coffee-tools-case-study/current-profile-shelf.png';
import currentRecentBrewsImg from '../assets/coffee-tools-case-study/current-recent-brews.png';
import currentSplashImg from '../assets/coffee-tools-case-study/current-splash.png';
import indianCoffeeStoriesHeroImg from '../assets/coffee-tools-case-study/indian-coffee-stories-hero.png';
import analyticsOneImg from '../assets/coffee-tools-case-study/bag-analytics-page-1.png';
import analyticsTwoImg from '../assets/coffee-tools-case-study/bag-analytics-page-2.png';
import analyticsThreeImg from '../assets/coffee-tools-case-study/bag-analytics-page-3.png';

const workflowSteps = [
  {
    title: 'Enter with low friction',
    description:
      'A calm splash screen and Cognito-backed email sign-in keep the product private without making entry feel heavy.',
    image: [currentSplashImg, currentAuthImg],
  },
  {
    title: 'Manage the active shelf',
    description:
      'The home and profile views show what is currently brewing, recent cups, and the best result so far.',
    image: [currentBagsImg, currentProfileShelfImg, currentRecentBrewsImg],
  },
  {
    title: 'Work from one bag hub',
    description:
      'The bag detail keeps roast age, setup, brew story, best cup, and history attached to one coffee.',
    image: [currentBagOverviewImg, currentBrewStoryImg, currentBrewHistoryImg],
  },
  {
    title: 'Compare and improve',
    description:
      'Deeper analytics can emerge once a bag has enough comparable brews, without pretending every setup is equivalent.',
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
    description: 'Cognito Hosted UI signs the user in and the browser sends a JWT with protected API requests.',
  },
  {
    label: '03',
    title: 'Authorize',
    description: 'API Gateway verifies the token before the Lambda handler receives the request.',
  },
  {
    label: '04',
    title: 'Process',
    description: 'Lambda validates the brew, scopes it to the signed-in user, and connects it to the right bag.',
  },
  {
    label: '05',
    title: 'Persist',
    description: 'DynamoDB stores the bag and brew history so analytics can surface patterns over time.',
  },
];

const nextSteps = [
  {
    title: 'Automated deployment',
    description: 'Move the beta from manual Amplify uploads to a repeatable GitHub-connected deployment flow.',
  },
  {
    title: 'More real-user testing',
    description: 'Validate the mobile flow with brewers logging while they are actually making coffee.',
  },
  {
    title: 'Sharper brew fields',
    description: 'Add method-specific details like water temperature, espresso yield, and recipe adjustment notes.',
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
            <p className="coffee-eyebrow">Live beta / AWS-backed product</p>
            <h1>Brew Tracker</h1>
            <p className="coffee-hero__dek">
              A working coffee journal that turns repeated cups into a useful dial-in history.
            </p>
            <p className="coffee-hero__body">
              I keep several coffees and four grinders in rotation. Remembering what worked across changing beans,
              roast age, recipes, and equipment was harder than brewing itself. Brew Tracker became a practical way to
              turn that personal workflow into an authenticated, AWS-backed product with real per-user persistence.
            </p>
            <p className="coffee-role">
              <span>My work</span>
              Product model · UX flow · AWS backend · authentication · analytics design
            </p>
            <div className="coffee-actions">
              <a href="https://test.dpdc9h20103x8.amplifyapp.com" target="_blank" rel="noreferrer">
                Open live beta
              </a>
              <a href="https://github.com/cynyassy/coffee-tools-api" target="_blank" rel="noreferrer" className="coffee-actions__secondary">
                View GitHub repo
              </a>
              <a href="https://indiancoffeestories.com" target="_blank" rel="noreferrer" className="coffee-actions__secondary">
                Visit Indian Coffee Stories
              </a>
              <a href="#product" className="coffee-actions__secondary">
                See the product
              </a>
            </div>
          </div>

          <figure className="coffee-hero__visual">
            <img src={currentBagsImg} alt="Brew Tracker active coffee bags screen" />
          </figure>
        </section>

        <section className="coffee-section coffee-decision">
          <SectionIntro label="The product decision" title="Track the lifecycle of a bag">
            <p>
              Most coffee trackers begin with a blank brew record. Brew Tracker begins with the thing the brewer is
              actually trying to understand: a specific bag of coffee over time.
            </p>
          </SectionIntro>

          <div className="coffee-decision__panel">
            <article>
              <p className="coffee-index">Start</p>
              <h3>Active shelf</h3>
              <p>Open with the coffees currently in rotation, plus recent cups and the best result nearby.</p>
            </article>
            <article>
              <p className="coffee-index">Model</p>
              <h3>One bag hub</h3>
              <p>Each coffee owns its origin, roast age, brew story, best cup, and full history.</p>
            </article>
            <article>
              <p className="coffee-index">Use</p>
              <h3>Repeatable cups</h3>
              <p>Compare methods and grinders without turning brewing into admin work.</p>
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
              <dt>Live backend</dt>
              <dd>Cognito · API Gateway · Lambda · DynamoDB</dd>
            </div>
          </dl>
        </section>

        <section className="coffee-section coffee-discovery">
          <SectionIntro label="Discovery and education" title="A public path into the product">
            <p>
              Indian Coffee Stories is the public-facing companion to Brew Tracker: an approachable place to learn,
              discover Indian coffee, and then bring those questions into a personal brewing practice.
            </p>
          </SectionIntro>

          <div className="coffee-discovery__panel">
            <div>
              <p className="coffee-index">Indian Coffee Stories</p>
              <h3>Make specialty coffee easier to enter</h3>
              <p>
                The live platform brings together beginner-friendly articles, a Coffee Atlas, and a Substack
                newsletter. It is designed for curiosity without the snobbery.
              </p>
              <ol className="coffee-discovery__loop">
                <li>
                  <span>01</span>
                  <div>
                    <strong>Learn</strong>
                    <p>Guides make beans, brewing, equipment, and tasting more legible.</p>
                  </div>
                </li>
                <li>
                  <span>02</span>
                  <div>
                    <strong>Discover</strong>
                    <p>Coffee Atlas and the newsletter connect people to roasters and the wider Indian scene.</p>
                  </div>
                </li>
                <li>
                  <span>03</span>
                  <div>
                    <strong>Track</strong>
                    <p>Brew Tracker turns that interest into repeatable cups and personal learning.</p>
                  </div>
                </li>
              </ol>
              <a href="https://indiancoffeestories.com" target="_blank" rel="noreferrer">
                Visit Indian Coffee Stories
              </a>
            </div>

            <figure className="coffee-discovery__visual">
              <img
                src={indianCoffeeStoriesHeroImg}
                alt="Indian Coffee Stories botanical homepage artwork"
              />
              <figcaption>Indian Coffee Stories: curiosity, without the snobbery.</figcaption>
            </figure>
          </div>
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
              analytics are separate responsibilities, but they serve one continuous user action.
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
              <p className="coffee-eyebrow">Why Cognito</p>
              <p>Use AWS-managed authentication so identity, tokens, and protected requests are handled cleanly.</p>
            </div>
            <div>
              <p className="coffee-eyebrow">Why Lambda</p>
              <p>Keep the beta low-operations: no VM, no always-on container, and no production database server to manage.</p>
            </div>
            <div>
              <p className="coffee-eyebrow">Why DynamoDB</p>
              <p>Model each user&apos;s bags and brews as one scoped history that can be queried and analyzed over time.</p>
            </div>
          </div>
        </section>

        <section id="next" className="coffee-section coffee-next">
          <div>
            <p className="coffee-eyebrow">Next iteration</p>
            <h2>Turn recorded history into better decisions</h2>
            <p className="coffee-next__intro">
              The beta proves the core workflow: authenticated users can create bags, log brews, archive finished
              coffees, and review analytics. The next work is making deployment, testing, and brewing ergonomics sharper.
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
          <img src={currentProfileShelfImg} alt="Brew Tracker profile shelf screen with current coffee stats" />
        </section>
      </main>

      <footer className="coffee-footer">
        <p>Brew Tracker</p>
        <div>
          <a href="https://test.dpdc9h20103x8.amplifyapp.com" target="_blank" rel="noreferrer">
            Live beta
          </a>
          <a href="https://github.com/cynyassy/coffee-tools-api" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="../index.html#featured-work">More work</a>
        </div>
      </footer>
    </div>
  );
}
