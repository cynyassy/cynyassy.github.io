import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import purposeComic from '../assets/cynyassy-comics/purpose.png';
import feelingLostComic from '../assets/cynyassy-comics/feeling-lost.png';
import rightTimeComic from '../assets/cynyassy-comics/right-time.png';
import newYearComic from '../assets/cynyassy-comics/new-year.png';
import calendarSuccessComic from '../assets/cynyassy-comics/calendar-success.png';
import fiveWhysComic from '../assets/cynyassy-comics/five-whys.png';
import sufferingComic from '../assets/cynyassy-formats/chaddiman-suffering.png';
import reelsImage from '../assets/cynyassy-formats/reels-making-tasks-fun.png';
import stickerImage from '../assets/cynyassy-formats/productivity-sticker.png';
import storyImage from '../assets/cynyassy-formats/story-week.png';
import firstThisCover from '../assets/cynyassy-book/not-everything-is-urgent-first-this.png';
import thenThisCover from '../assets/cynyassy-book/not-everything-is-urgent-then-this.png';

const proof = [
  ['100K+', 'community built from zero'],
  ['1.2M', 'people reached in a peak month in 2021'],
  ['600+', 'multi-panel comics published'],
  ['Since 2019', 'publishing Cynyassy publicly'],
];

const comics = [
  {
    title: 'Purpose',
    image: purposeComic,
    note: 'An existential question became personal and usable through one simple reframing.',
  },
  {
    title: 'Feeling Lost',
    image: feelingLostComic,
    note: 'The story stayed with uncertainty instead of rushing toward an artificial resolution.',
  },
  {
    title: 'The Right Time',
    image: rightTimeComic,
    note: 'A familiar hesitation became recognizable within the first panel.',
  },
  {
    title: 'New Year',
    image: newYearComic,
    note: 'A topical moment worked because it kept the emotional voice people already trusted.',
  },
  {
    title: 'Calendar for Success',
    image: calendarSuccessComic,
    note: 'A visual framework made a self-improvement idea easy to save and revisit.',
  },
  {
    title: 'The 5 Whys',
    image: fiveWhysComic,
    note: 'A difficult act of introspection became a sequence of smaller, approachable steps.',
  },
];

const practice = [
  [
    'Publish',
    'Making almost every day created enough work to discover patterns rather than rely on intuition alone.',
  ],
  [
    'Listen',
    'Shares, saves, comments, and thousands of messages revealed what people recognized, needed, and carried forward.',
  ],
  [
    'Refine',
    'Writing became tighter, visual pacing became clearer, and the emotional payoff became more deliberate over time.',
  ],
];

const formats = [
  {
    image: reelsImage,
    label: 'Motion',
    title: 'Short-form video',
  },
  {
    image: stickerImage,
    label: 'Objects',
    title: 'Stickers and artifacts',
  },
  {
    image: storyImage,
    label: 'Narrative',
    title: 'Stories and prompts',
  },
];

const learnings = [
  'People share what feels true, not merely what looks polished.',
  'Specificity creates relatability.',
  'Emotional clarity is more useful than cleverness.',
  'Consistency builds familiarity; familiarity builds trust.',
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

export default function CynyassyPage() {
  const [comicIndex, setComicIndex] = useState(0);
  const comic = comics[comicIndex];

  const moveComic = (direction: number) => {
    setComicIndex((comicIndex + direction + comics.length) % comics.length);
  };

  return (
    <div className="cynyassy-page">
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <header className="topbar">
        <div>
          <a href="../index.html#featured-work">Back to portfolio</a>
          <nav aria-label="Case study sections">
            <a href="#story">Story</a>
            <a href="#comics">Comics</a>
            <a href="#book">Book</a>
          </nav>
        </div>
      </header>

      <main id="main">
        <section className="hero">
          <div className="hero-copy">
            <p className="label">Cynyassy / ChaddiMan</p>
            <h1>Simple stories for complicated feelings</h1>
            <p className="dek">
              A long-running comic practice about emotions, everyday life, and helping people feel a little less alone.
            </p>
            <p className="muted">
              The practice began in 2018 while I was learning to understand and regulate my own emotions. I started
              publishing Cynyassy publicly in 2019, with its most intensive near-daily period continuing through 2021.
              Comics gave me a way to turn that learning into something lighter, clearer, and easier to share. The
              practice has continued since, becoming a community, a recognizable visual language, and now an
              illustrated book.
            </p>
            <p className="role">
              <span className="label">My work</span>
              Writing · Illustration · Publishing · Audience learning · Creative direction
            </p>
          </div>

          <figure className="hero-comic">
            <img src={sufferingComic} alt="ChaddiMan comic about unnecessary suffering" />
          </figure>
        </section>

        <section className="proof" aria-label="Cynyassy in numbers">
          {proof.map(([value, description]) => (
            <p key={value}>
              <strong>{value}</strong>
              <span>{description}</span>
            </p>
          ))}
        </section>

        <section id="story" className="section">
          <SectionIntro label="Why I made it" title="Understanding became more useful when I could share it">
            <p>
              Mental-health language can be clinical, intimidating, or simply unavailable at the moment someone needs
              it. I wanted to make difficult inner experiences easier to recognize without making them shallow.
            </p>
          </SectionIntro>

          <blockquote>
            “All stories worth telling are worth telling simply.”
          </blockquote>

          <div className="story-copy">
            <p>
              ChaddiMan’s simple body, sparse expressions, and conversational writing became an advantage. There was
              very little visual noise between the reader and the idea.
            </p>
            <p>
              Humor created an entrance. Honesty created recognition. Simplicity made the work easy to remember, share,
              and return to.
            </p>
          </div>
        </section>

        <section id="comics" className="section">
          <SectionIntro label="Selected comics" title="The work should speak before the analysis does">
            <p>
              These examples show how the same minimal visual language could hold humor, confusion, introspection, and
              practical reflection.
            </p>
          </SectionIntro>

          <div className="comic-viewer">
            <figure>
              <img src={comic.image} alt={`${comic.title} comic by Cynyassy`} />
            </figure>

            <div className="comic-note">
              <p className="label">
                {String(comicIndex + 1).padStart(2, '0')} / {String(comics.length).padStart(2, '0')}
              </p>
              <h3>{comic.title}</h3>
              <p>{comic.note}</p>

              <div className="comic-controls">
                <button type="button" onClick={() => moveComic(-1)} aria-label="Previous comic">
                  <ChevronLeft size={18} />
                  Previous
                </button>
                <div className="comic-dots" aria-label="Choose a comic">
                  {comics.map((item, index) => (
                    <button
                      key={item.title}
                      type="button"
                      aria-label={`Show ${item.title}`}
                      aria-pressed={index === comicIndex}
                      className={index === comicIndex ? 'active' : ''}
                      onClick={() => setComicIndex(index)}
                    />
                  ))}
                </div>
                <button type="button" onClick={() => moveComic(1)} aria-label="Next comic">
                  Next
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <SectionIntro label="The practice" title="Make, listen, refine">
            <p>
              During its most intensive period, publishing nearly every day was not a creator-hustle exercise. It was
              how I learned what people understood, what they felt, and what the work still needed. The pace changed
              after 2021, but the writing and illustration practice did not end.
            </p>
          </SectionIntro>

          <ol className="practice">
            {practice.map(([title, description], index) => (
              <li key={title}>
                <span className="number">{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="section">
          <SectionIntro label="Beyond the panel" title="One voice, several forms">
            <p>
              The comic language expanded into motion, objects, and more episodic storytelling without losing its
              essential tone.
            </p>
          </SectionIntro>

          <div className="format-gallery">
            {formats.map((format) => (
              <figure key={format.title}>
                <img src={format.image} alt={`${format.title} by Cynyassy`} />
                <figcaption>
                  <span className="label">{format.label}</span>
                  <strong>{format.title}</strong>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="book" className="section book">
          <div className="book-intro">
            <div>
              <p className="label">Published work</p>
              <h2>Not Everything Is Urgent</h2>
            </div>
            <div className="book-copy">
              <p className="dek">
                My first illustrated book carries the same visual language into a longer form: difficult things can be
                explored with warmth, humor, and simplicity.
              </p>
              <p className="muted">
                Created with Kim and Ian through The Pound Project, the two-part book asks what deserves our attention
                now, and what can wait.
              </p>
              <a href="https://www.poundproject.co.uk/not-everything-is-urgent" target="_blank" rel="noreferrer" className="book-link">
                Visit the book website
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <div className="book-covers" aria-label="Not Everything Is Urgent book covers">
            <figure>
              <img src={firstThisCover} alt="Not Everything Is Urgent: First This book cover" />
              <figcaption>First this</figcaption>
            </figure>
            <figure>
              <img src={thenThisCover} alt="Not Everything Is Urgent: Then This book cover" />
              <figcaption>Then this</figcaption>
            </figure>
          </div>
        </section>

        <section className="section reflection">
          <SectionIntro label="What stayed with me" title="Audience understanding is built, not guessed" />
          <ol>
            {learnings.map((learning, index) => (
              <li key={learning}>
                <span className="number">{String(index + 1).padStart(2, '0')}</span>
                {learning}
              </li>
            ))}
          </ol>
          <a href="https://instagram.com/cynyassy" target="_blank" rel="noreferrer" className="instagram-link">
            Explore Cynyassy on Instagram
          </a>
        </section>
      </main>
    </div>
  );
}
