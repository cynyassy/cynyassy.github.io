import { useState } from 'react';
import currentBrewHistoryImg from '../assets/coffee-tools-case-study/current-brew-history.png';
import currentBrewStoryImg from '../assets/coffee-tools-case-study/current-brew-story.png';
import currentProfileShelfImg from '../assets/coffee-tools-case-study/current-profile-shelf.png';
import indianCoffeeStoriesHeroImg from '../assets/coffee-tools-case-study/indian-coffee-stories-hero.png';
import liveShareCardImg from '../assets/coffee-tools-case-study/live-product/share-card-current.jpg';
import liveBagContextImg from '../assets/coffee-tools-case-study/live-product/bag-context.jpg';
import liveFeedImg from '../assets/coffee-tools-case-study/live-product/live-feed-mobile.png';
import recipeLibraryImg from '../assets/coffee-tools-case-study/live-product/recipe-library-desktop.png';
import gaLaunchProofImg from '../assets/coffee-tools-case-study/launch-proof/indian-coffee-stories-ga-launch.jpeg';
import redditLaunchProofImg from '../assets/coffee-tools-case-study/launch-proof/coffee-atlas-reddit-launch.jpeg';

const workflowSteps = [
  {
    title: 'Remember what worked',
    description:
      'Every coffee keeps its roast age, recipes, equipment, tasting notes, and best cups connected to the same bag.',
    image: [liveShareCardImg, liveBagContextImg],
  },
  {
    title: 'Make coffee social',
    description:
      'Public brews, photos, reactions, comments, recipes, and reviews let a useful coffee moment travel beyond one shelf.',
    image: [liveFeedImg],
  },
  {
    title: 'Find a recipe worth repeating',
    description:
      'A public recipe library lets people browse proven cups before they commit to brewing one themselves.',
    image: [recipeLibraryImg],
  },
  {
    title: 'Dial in the next cup',
    description:
      'The bag history and brew story make it easier to compare attempts, find a best cup, and make the next adjustment deliberately.',
    image: [currentBrewStoryImg, currentBrewHistoryImg],
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
            <p className="coffee-eyebrow">Live product / discovery + utility</p>
            <h1>Brew Tracker</h1>
            <p className="coffee-hero__dek">
              A live coffee product that connects discovery to better brewing.
            </p>
            <p className="coffee-hero__body">
              I keep several coffees and four grinders in rotation. Remembering what worked across changing beans,
              roast age, recipes, and equipment was harder than brewing itself. I built Brew Tracker as the private,
              AWS-backed utility, then Indian Coffee Stories as the public learning and discovery path into it.
            </p>
            <p className="coffee-role">
              <span>My work</span>
              Product model · UX flow · AWS backend · discovery strategy · analytics design
            </p>
            <div className="coffee-actions">
              <a href="https://brew.indiancoffeestories.com" target="_blank" rel="noreferrer">
                Open Brew Tracker
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
            <img src={liveShareCardImg} alt="Brew Tracker share card from the live product" />
          </figure>
        </section>

        <section className="coffee-section coffee-decision">
          <SectionIntro label="The product loop" title="Remember what worked. Brew what's next.">
            <p>
              Brew Tracker starts with a personal shelf, then turns repeated brewing into a record people can learn
              from, share, and return to.
            </p>
          </SectionIntro>

          <div className="coffee-decision__panel">
            <article>
              <p className="coffee-index">01 / Track</p>
              <h3>Keep the context</h3>
              <p>Bag, roast age, recipe, equipment, notes, and every cup stay attached to the same coffee.</p>
            </article>
            <article>
              <p className="coffee-index">02 / Improve</p>
              <h3>See what changed</h3>
              <p>Compare attempts, locate the best cup, and use the record to choose a more intentional next step.</p>
            </article>
            <article>
              <p className="coffee-index">03 / Share</p>
              <h3>Make the cup useful</h3>
              <p>Publish a brew, recipe, or review when it is worth someone else discovering and repeating.</p>
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
              <dt>Live stack</dt>
              <dd>React · Cognito · API Gateway · Lambda · DynamoDB · S3</dd>
            </div>
          </dl>
        </section>

        <section className="coffee-section coffee-discovery">
          <SectionIntro label="Discovery and education" title="A public path into better brewing">
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
                The live platform brings together beginner-friendly articles, the Coffee Atlas, and a newsletter.
                It makes specialty coffee easier to enter, then points people toward a more personal practice.
              </p>
              <ol className="coffee-discovery__loop">
                <li>
                  <span>01</span>
                  <div>
                    <strong>Learn</strong>
                    <p>Articles make beans, brewing, equipment, and tasting more legible.</p>
                  </div>
                </li>
                <li>
                  <span>02</span>
                  <div>
                    <strong>Discover</strong>
                    <p>Coffee Atlas connects people to a growing directory of Indian roasters.</p>
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

        <section className="coffee-section coffee-launch-signals" aria-labelledby="coffee-launch-signals-title">
          <SectionIntro label="Early launch proof" title="Useful things travel when people can find them">
            <p>
              These are early launch signals, measured from July 15 to August 11, 2026, or the first 48 hours of the
              Coffee Atlas Reddit post. They show interest across both the public discovery layer and the utility it supports.
            </p>
          </SectionIntro>

          <ul className="coffee-launch-signals__metrics" id="coffee-launch-signals-title">
            <li><strong>706</strong><span>active users across Indian Coffee Stories and Coffee Atlas in the first 28 days</span></li>
            <li><strong>1.2K</strong><span>Coffee Atlas views in the same launch window</span></li>
            <li><strong>95</strong><span>Indian coffee roasters mapped in the public directory</span></li>
            <li><strong>6.8K</strong><span>Reddit views in 48 hours, with 50 shares and 22 comments</span></li>
          </ul>

          <div className="coffee-launch-signals__proof">
            <figure>
              <img src={gaLaunchProofImg} alt="Google Analytics launch snapshot for Indian Coffee Stories and Coffee Atlas" />
              <figcaption>Google Analytics, July 15-August 11, 2026: 706 active users and 1.2K Coffee Atlas views.</figcaption>
            </figure>
            <figure>
              <img src={redditLaunchProofImg} alt="Reddit post insights for the Coffee Atlas launch post" />
              <figcaption>Reddit, first 48 hours: 6.8K views, 50 shares, and 22 comments on the Coffee Atlas launch post.</figcaption>
            </figure>
          </div>
        </section>

        <section id="product" className="coffee-section">
          <SectionIntro label="Live product" title="From a coffee shelf to a cup worth repeating">
            <p>
              The public landing page is built around real outputs from the live product: a personal record, a useful
              next step, and public paths for coffee people to learn from each other before signing in.
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
          <a href="https://brew.indiancoffeestories.com" target="_blank" rel="noreferrer">
            Brew Tracker
          </a>
          <a href="https://indiancoffeestories.com" target="_blank" rel="noreferrer">Indian Coffee Stories</a>
          <a href="https://github.com/cynyassy/coffee-tools-api" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="../index.html#featured-work">More work</a>
        </div>
      </footer>
    </div>
  );
}
