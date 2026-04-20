import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CustomCursor } from '../app/components/CustomCursor';
import artImage from '../assets/hero-personas/art.png';
import purposeComic from '../assets/cynyassy-comics/purpose.png';
import feelingLostComic from '../assets/cynyassy-comics/feeling-lost.png';
import rightTimeComic from '../assets/cynyassy-comics/right-time.png';
import newYearComic from '../assets/cynyassy-comics/new-year.png';
import calendarSuccessComic from '../assets/cynyassy-comics/calendar-success.png';
import fiveWhysComic from '../assets/cynyassy-comics/five-whys.png';
import chaddimanFormatImage from '../assets/cynyassy-formats/chaddiman-suffering.png';
import reelsFormatImage from '../assets/cynyassy-formats/reels-making-tasks-fun.png';
import stickerFormatImage from '../assets/cynyassy-formats/productivity-sticker.png';
import storyFormatImage from '../assets/cynyassy-formats/story-week.png';

const heroMetrics = [
  '0 → 100K+ followers',
  '600+ multi-panel comics',
  '~2 years of daily publishing',
  'Thousands of messages from people who felt seen by the work',
  'Built a recognizable voice across Cynyassy / Chaddiman',
];

const problemPoints = [
  'Most creators chase trends instead of building real audience understanding.',
  'Growth becomes inconsistent when feedback loops are weak or ignored.',
  'Content gets produced without a clear sense of what resonates emotionally.',
];

const approachLayers = [
  {
    title: 'Volume as a learning engine',
    description:
      'I posted almost daily for around two years and created 600+ comics in a repeatable multi-panel format. The goal was not volume for its own sake. It was to generate enough output to learn from patterns over time.',
    insight: 'Consistency was not just discipline. It was data collection.',
  },
  {
    title: 'Feedback loops',
    description:
      'I tracked what people shared, saved, commented on, and returned to. Audience behavior became the strongest signal for what worked, what felt true, and what deserved refinement.',
    insight: 'Engagement was useful only when treated as feedback, not vanity.',
  },
  {
    title: 'Iterative storytelling',
    description:
      'Over time I moved from simple observations to more layered narratives, sharper emotional hooks, stronger panel pacing, and a clearer voice. The output improved because the system improved.',
    insight: 'Voice was developed deliberately, not discovered all at once.',
  },
];

const contentTypes = [
  {
    type: 'Relatable life moments',
    outcome: 'Drove shares',
    description: 'People passed these on when they felt seen by a specific everyday moment.',
  },
  {
    type: 'Mental health and introspection',
    outcome: 'Drove saves',
    description: 'These worked when they gave people language for feelings they already knew but had not named.',
  },
  {
    type: 'Humor and irony',
    outcome: 'Drove reach',
    description: 'Humor widened the top of the funnel and brought people into the broader body of work.',
  },
  {
    type: 'Observational insights',
    outcome: 'Built loyalty',
    description: 'Honest, specific observations made the platform feel more consistent and trustworthy over time.',
  },
];

const audienceInsights = [
  'People do not share what is merely “good.” They share what feels true.',
  'Specificity drives relatability more reliably than vague inspiration.',
  'Emotional clarity beats cleverness when attention is limited.',
  'Consistency builds familiarity, and familiarity builds trust.',
];

const craftEvolution = [
  {
    label: 'Visual',
    points: ['Cleaner compositions', 'Clearer illustration language', 'Better panel flow'],
  },
  {
    label: 'Writing',
    points: ['Tighter dialogue', 'Sharper punchlines', 'Clearer emotional beats'],
  },
  {
    label: 'Structure',
    points: ['Better setup → escalation → payoff', 'Stronger pacing across panels', 'More deliberate emotional progression'],
  },
];

const results = [
  'Built a 100K+ audience from zero',
  'Published 600+ comics',
  'Maintained a daily creative rhythm for roughly two years',
  'Created a recognizable brand voice across Cynyassy / Chaddiman',
];

const translationPoints = [
  'Understanding user behavior through live feedback loops',
  'Designing for attention, retention, and emotional clarity',
  'Iterating based on signals instead of assumptions',
  'Communicating complex inner states simply',
  'Building systems that improve through repeated use',
];

const formatExperiments = [
  {
    label: 'Comic system',
    title: 'Chaddiman',
    description:
      'Longer comic sequences were the core format. They gave enough space for setup, emotional movement, and payoff without losing clarity.',
    image: chaddimanFormatImage,
  },
  {
    label: 'Short-form video',
    title: 'Reels and motion stills',
    description:
      'Reels translated the same emotional voice into a more attention-competitive format, helping test pace, compression, and repeatability beyond static posts.',
    image: reelsFormatImage,
  },
  {
    label: 'Product expression',
    title: 'Stickers and objects',
    description:
      'Stickers turned the character and tone into portable artifacts, which pushed the work from content into lightweight product thinking.',
    image: stickerFormatImage,
  },
  {
    label: 'Story format',
    title: 'Narrative prompts and visual stories',
    description:
      'Story-led experiments extended the universe and tested how the same voice could work in more episodic or reflective formats.',
    image: storyFormatImage,
  },
];

const comicExamples = [
  {
    title: 'Purpose',
    worked: 'A single reframing line turned an abstract question into something personal and actionable.',
    learned: 'People respond strongly when existential ideas are made smaller, clearer, and more livable.',
    image: purposeComic,
  },
  {
    title: 'Feeling Lost',
    worked: 'It stayed inside confusion instead of rushing toward a clean resolution, which made it feel more honest.',
    learned: 'Audiences trust work that can hold uncertainty without trying to sound wiser than it is.',
    image: feelingLostComic,
  },
  {
    title: 'The Right Time',
    worked: 'The premise was familiar immediately: waiting, postponing, and telling ourselves the moment is not right yet.',
    learned: 'Everyday hesitation is highly shareable because people recognize themselves in it quickly.',
    image: rightTimeComic,
  },
  {
    title: 'New Year',
    worked: 'It used a seasonal spike in attention without abandoning the emotional tone people already expected from the page.',
    learned: 'Topical moments work best when they extend the existing voice instead of temporarily replacing it.',
    image: newYearComic,
  },
  {
    title: 'Calendar for Success',
    worked: 'The comic translated self-improvement into a simple visual framework people could understand at a glance.',
    learned: 'Structured, reusable ideas tend to generate saves because people want to come back to them later.',
    image: calendarSuccessComic,
  },
  {
    title: 'The 5 Whys',
    worked: 'It broke introspection into a stepwise prompt, which made heavier emotional work feel less intimidating.',
    learned: 'People stay with difficult material longer when it is scaffolded into small, usable steps.',
    image: fiveWhysComic,
  },
];

function SectionHeader({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <header className="space-y-3">
      {eyebrow ? <p className="cynyassy-eyebrow">{eyebrow}</p> : null}
      <h2 className="text-4xl font-semibold tracking-[-0.04em] md:text-5xl text-[#111111]">{title}</h2>
      {description ? <p className="max-w-3xl text-base md:text-lg leading-relaxed text-[#55524d]">{description}</p> : null}
    </header>
  );
}

export default function CynyassyPage() {
  const [comicIndex, setComicIndex] = useState(0);
  const currentComic = comicExamples[comicIndex];

  const showPrevComic = () => {
    setComicIndex((prev) => (prev - 1 + comicExamples.length) % comicExamples.length);
  };

  const showNextComic = () => {
    setComicIndex((prev) => (prev + 1) % comicExamples.length);
  };

  return (
    <div className="cynyassy-page min-h-screen bg-white text-[#111111]">
      <CustomCursor />
      <a href="#cynyassy-main" className="cynyassy-skip-link">
        Skip to content
      </a>

      <header className="cynyassy-topbar">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4 md:px-10">
          <a href="../index.html#featured-work" className="cynyassy-back-link">
            Back To Portfolio
          </a>
          <nav className="hidden items-center gap-6 md:flex">
            <a href="#overview" className="cynyassy-nav-link">
              Overview
            </a>
            <a href="#system" className="cynyassy-nav-link">
              System
            </a>
            <a href="#results" className="cynyassy-nav-link">
              Results
            </a>
          </nav>
        </div>
      </header>

      <main id="cynyassy-main" className="mx-auto flex max-w-6xl flex-col gap-24 px-6 py-12 md:px-10 md:py-16">
        <section id="overview" className="cynyassy-hero-grid">
          <div className="space-y-8">
            <div className="space-y-5">
              <p className="cynyassy-eyebrow">Storytelling System / Audience Understanding</p>
              <h1 className="text-5xl font-semibold leading-[0.98] tracking-[-0.06em] text-[#111111] md:text-7xl">
                Cynyassy — Building a <span className="text-[#FF4400]">100K+</span> Audience Through Daily Storytelling
              </h1>
              <p className="text-2xl font-medium leading-tight text-[#1f1f1f] md:text-4xl">
                A two-year experiment in content, emotion, and audience understanding.
              </p>
              <p className="max-w-3xl text-lg leading-relaxed text-[#55524d] md:text-xl">
                Cynyassy started after a difficult stretch in my twenties, when I spent years trying to understand my
                own emotions and learn how to regulate them. That process was hard, slow, and often isolating. I
                wanted to make some of those ideas easier to access through comics, humor, and care. That became
                ChaddiMan.
              </p>
            </div>

            <ul className="cynyassy-highlight-list" aria-label="Key outcomes">
              {heroMetrics.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <p className="cynyassy-summary">
              This case study is about <strong>turning emotional learning into a repeatable storytelling system</strong>
              {' '}that could help people feel less alone, understand themselves more clearly, and return to difficult
              ideas in a simpler, more humane format.
            </p>
          </div>

          <div className="cynyassy-hero-visual">
            <div className="cynyassy-art-panel">
              <div className="cynyassy-art-panel__meta">
                <span>Storytelling platform</span>
                <span>Daily output</span>
              </div>
              <div className="cynyassy-art-panel__image-shell">
                <img src={artImage} alt="Illustration representing the Cynyassy storytelling platform" />
              </div>
              <div className="cynyassy-art-panel__note">
                <strong>Community education and care, told simply.</strong>
                <p>
                  The long-term goal was not just to grow an audience. It was to build a body of work people could
                  return to when they needed language, comfort, or perspective.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-10">
          <SectionHeader
            eyebrow="Problem"
            title="Most creators optimize for posting, not understanding"
            description="The real challenge was not just making more work. It was learning what people actually respond to, what helps them feel understood, and how to turn difficult emotional material into something more accessible."
          />

          <div className="cynyassy-problem-grid">
            {problemPoints.map((point) => (
              <article key={point} className="cynyassy-problem-card">
                <p>{point}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="system" className="space-y-10">
          <SectionHeader
            eyebrow="Approach / System"
            title="A long-term system for learning through output"
            description="The project worked because output, feedback, and iteration were connected. Each post was a small experiment inside a larger system."
          />

          <div className="cynyassy-layer-grid">
            {approachLayers.map((layer) => (
              <article key={layer.title} className="cynyassy-layer-card">
                <h3>{layer.title}</h3>
                <p>{layer.description}</p>
                <div className="cynyassy-layer-card__insight">{layer.insight}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-10">
          <SectionHeader
            eyebrow="Formats, Content Types, And What They Did"
            title="Different formats and emotional modes served different jobs"
            description="The platform became more effective once I understood that not every piece needed to do the same thing. Format shaped attention, and emotional mode shaped what people did next."
          />

          <div className="space-y-6">
            <div>
              <p className="cynyassy-eyebrow mb-4">Content Types</p>
              <div className="cynyassy-content-grid">
                {contentTypes.map((item) => (
                  <article key={item.type} className="cynyassy-content-card">
                    <div className="cynyassy-content-card__top">
                      <h3>{item.type}</h3>
                      <span>{item.outcome}</span>
                    </div>
                    <p>{item.description}</p>
                  </article>
                ))}
              </div>
            </div>

            <div>
              <p className="cynyassy-eyebrow mb-4">Formats And Experiments</p>
              <div className="cynyassy-formats-grid">
                {formatExperiments.map((item) => (
                  <article key={item.title} className="cynyassy-format-card">
                    <div className="cynyassy-format-card__media">
                      <img src={item.image} alt={`${item.title} example from Cynyassy`} />
                    </div>
                    <div className="cynyassy-format-card__body">
                      <p className="cynyassy-eyebrow">{item.label}</p>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-10">
          <SectionHeader
            eyebrow="Selected Comics"
            title="Examples made the learning visible"
            description="These examples show the kinds of emotional hooks, structures, and observations that helped clarify what resonated and why."
          />

          <div className="cynyassy-comics-carousel">
            <div className="cynyassy-comics-carousel__copy">
              <p className="cynyassy-eyebrow">
                {String(comicIndex + 1).padStart(2, '0')} / {String(comicExamples.length).padStart(2, '0')}
              </p>
              <h3>{currentComic.title}</h3>
              <div className="cynyassy-comics-carousel__notes">
                <div>
                  <strong>What worked</strong>
                  <p>{currentComic.worked}</p>
                </div>
                <div>
                  <strong>What I learned</strong>
                  <p>{currentComic.learned}</p>
                </div>
              </div>

              <div className="cynyassy-comics-carousel__controls">
                <button type="button" onClick={showPrevComic} className="cynyassy-carousel-button" aria-label="Previous comic">
                  <ChevronLeft size={18} />
                  <span>Prev</span>
                </button>
                <div className="cynyassy-carousel-dots" aria-label="Comic examples">
                  {comicExamples.map((comic, index) => (
                    <button
                      key={comic.title}
                      type="button"
                      aria-label={`Go to ${comic.title}`}
                      aria-pressed={index === comicIndex}
                      className={`cynyassy-carousel-dot${index === comicIndex ? ' is-active' : ''}`}
                      onClick={() => setComicIndex(index)}
                    />
                  ))}
                </div>
                <button type="button" onClick={showNextComic} className="cynyassy-carousel-button" aria-label="Next comic">
                  <span>Next</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            <figure className="cynyassy-comics-carousel__figure">
              <img src={currentComic.image} alt={`${currentComic.title} comic by Cynyassy`} />
            </figure>
          </div>
        </section>

        <section className="space-y-10">
          <SectionHeader
            eyebrow="Audience Insights"
            title="What this taught me about people"
            description="The most useful outcome was not follower count alone. It was a much sharper understanding of what people hold onto, share, and return to."
          />

          <div className="cynyassy-insight-grid">
            {audienceInsights.map((insight) => (
              <div key={insight} className="cynyassy-insight-item">
                {insight}
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-10">
          <SectionHeader
            eyebrow="Craft Evolution"
            title="The work improved because the craft improved"
            description="This was not just an exercise in consistency. It was a deliberate improvement loop across visual language, writing, and narrative structure."
          />

          <div className="cynyassy-craft-grid">
            {craftEvolution.map((group) => (
              <article key={group.label} className="cynyassy-craft-card">
                <h3>{group.label}</h3>
                <ul>
                  {group.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="results" className="space-y-10">
          <SectionHeader
            eyebrow="Results"
            title="The output compounded into a recognizable platform"
            description="The clearest proof is the combination of audience growth, publishing volume, and a voice that became recognizable over time."
          />

          <div className="cynyassy-results-grid">
            {results.map((result) => (
              <div key={result} className="cynyassy-result-item">
                {result}
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-10">
          <SectionHeader
            eyebrow="Translation To Product / Design"
            title="Why this matters beyond content"
            description="This project matters in a portfolio because it demonstrates the same skills that make product, strategy, and systems work stronger."
          />

          <div className="cynyassy-translation-block">
            <p>
              The work translated directly into product thinking: understanding people deeply, designing for clarity
              and trust, building feedback loops, and turning complex emotional experiences into formats people can
              actually stay with. That is as relevant to education and product design as it is to storytelling.
            </p>
            <ul className="cynyassy-translation-list">
              {translationPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="space-y-10">
          <SectionHeader
            eyebrow="Reflection"
            title="Audience understanding is built, not guessed"
            description="This project taught me that audience understanding is not a theoretical exercise. It is built through care, consistency, honest feedback loops, and long-term iteration."
          />

          <div className="cynyassy-reflection-panel">
            <p>
              Cynyassy was never only an audience-building exercise. It was a community-building one. People reached
              out by the thousands to say the work helped them, and some even tattooed the art onto their bodies. That
              taught me that what resonates most is not cleverness for its own sake, but care translated into a form
              people can carry with them.
            </p>
            <p>
              The inspiration came less from creator culture and more from figures like Mr. Rogers and{' '}
              <em>Calvin and Hobbes</em>: work that is gentle, honest, emotionally literate, and simple without being
              shallow.
            </p>
            <a href="https://instagram.com/cynyassy" target="_blank" rel="noreferrer" className="cynyassy-link">
              Visit Cynyassy on Instagram
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
