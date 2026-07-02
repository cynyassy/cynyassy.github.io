import type { ReactNode } from 'react';
import { ArrowRight, BookOpen, ExternalLink, Film, Github, Sparkles, Youtube } from 'lucide-react';
import emotionIdentifierCover from '../assets/other-projects/emotion-identifier-cover.png';
import bookCover from '../assets/cynyassy-book/not-everything-is-urgent-first-this.png';
import '../styles/other-projects.css';

type OtherProjectLink = {
  label: string;
  href: string;
  icon?: ReactNode;
};

type OtherProject = {
  id: string;
  status: string;
  category: string;
  title: string;
  headline: string;
  description: string;
  proof: string[];
  links: OtherProjectLink[];
  visual: ReactNode;
};

function EmotionVisual() {
  return (
    <img
      src={emotionIdentifierCover}
      alt="Emotion Identifier Tool interface asking the user to name what they feel"
      className="other-projects-image other-projects-image-contain other-projects-image-emotion"
    />
  );
}

function BookVisual() {
  return (
    <img
      src={bookCover}
      alt="Not Everything Is Urgent book cover"
      className="other-projects-image other-projects-image-contain"
    />
  );
}

function FilmVisual() {
  return (
    <div className="other-projects-film-card" aria-hidden="true">
      <div className="other-projects-film-card__top">
        <span>Friday</span>
        <Film size={32} />
      </div>
      <p>Watch</p>
      <p>Notice</p>
      <p>Make</p>
    </div>
  );
}

const projects: OtherProject[] = [
  {
    id: 'emotion-identifier',
    status: 'Shipped',
    category: 'Live interactive tool',
    title: 'Emotion Identifier',
    headline: 'A guided entrance into emotional clarity',
    description:
      'Many people can sense that something is happening emotionally before they have language for it. This NVC-inspired tool gives that moment a softer, more structured way in.',
    proof: [
      'Seven guided steps connect broad feelings to precise emotions and needs.',
      'Reflection summary can be copied, downloaded, or shared.',
      'Built with React, TypeScript, Vite, and original Cynyassy art.',
    ],
    links: [
      {
        label: 'Try the live tool',
        href: 'https://cynyassy.github.io/emotions/',
        icon: <ExternalLink size={16} />,
      },
    ],
    visual: <EmotionVisual />,
  },
  {
    id: 'not-everything-is-urgent',
    status: 'Published',
    category: 'Illustrated book',
    title: 'Not Everything Is Urgent',
    headline: 'An illustrated book about attention, pressure, and urgency',
    description:
      'A two-part illustrated book made with Kim and Ian through The Pound Project. It turns the pressure of urgency into a simpler conversation about attention, pace, and choice.',
    proof: [
      'Extends Cynyassy’s visual storytelling into a published book format.',
      'Uses simple drawings and quiet language to make emotional pressure easier to discuss.',
      'Published through The Pound Project.',
    ],
    links: [
      {
        label: 'Visit the book website',
        href: 'https://www.poundproject.co.uk/not-everything-is-urgent',
        icon: <ExternalLink size={16} />,
      },
    ],
    visual: <BookVisual />,
  },
  {
    id: 'film-festival-friday',
    status: 'In progress',
    category: 'Creative practice + bot',
    title: 'Film Festival Friday',
    headline: 'Keeping a filmmaking practice alive through weekly prompts',
    description:
      'A weekly filmmaking practice powered by a prompt bot. The goal is to turn a love of cinema into a repeatable ritual for watching closely, noticing craft, and making small creative responses.',
    proof: [
      'Weekend Movie Bot turns a vague intention into a concrete prompt.',
      'YouTube channel creates a public shelf for the practice.',
      'Designed as a ritual: prompt, watch, notice, make.',
    ],
    links: [
      {
        label: 'Visit YouTube channel',
        href: 'https://www.youtube.com/channel/UCxwAvV6fwi2on14yENSJL6w',
        icon: <Youtube size={16} />,
      },
      {
        label: 'View bot repo',
        href: 'https://github.com/cynyassy/weekend-movie-bot',
        icon: <Github size={16} />,
      },
    ],
    visual: <FilmVisual />,
  },
];

export default function OtherProjectsPage() {
  return (
    <div className="other-projects-page min-h-screen bg-white text-[#111]">
      <header className="other-projects-topbar">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4 md:px-10">
          <a href="../index.html#other-projects" className="other-projects-back-link">
            Back To Portfolio
          </a>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col px-6 py-12 md:px-10 md:py-16">
        <section className="other-projects-hero">
          <div>
            <p className="other-projects-eyebrow">Other Projects</p>
            <h1>Useful ideas in other forms</h1>
          </div>
          <div>
            <p>
              Smaller shipped tools, publishing projects, creative rituals, games, and experiments.
            </p>
            <div className="other-projects-highlight">
              <Sparkles size={20} aria-hidden="true" />
              <span>Same pattern, smaller forms: understand something carefully, then make a useful way in.</span>
            </div>
          </div>
        </section>

        <section className="other-projects-list" aria-label="Other projects">
          {projects.map((project, index) => (
            <article key={project.id} id={project.id} className="other-projects-row">
              <a
                href={project.links[0]?.href}
                target="_blank"
                rel="noreferrer"
                className={index % 2 === 0 ? 'other-projects-media' : 'other-projects-media md:order-2'}
                aria-label={`Open ${project.title}`}
              >
                {project.visual}
              </a>

              <div className={index % 2 === 0 ? 'other-projects-copy' : 'other-projects-copy md:order-1'}>
                <p className="other-projects-meta">
                  0{index + 1} / {project.status} / {project.category}
                </p>
                <a href={project.links[0]?.href} target="_blank" rel="noreferrer" className="other-projects-title-link">
                  <h2>{project.title}</h2>
                </a>
                <h3>{project.headline}</h3>
                <p className="other-projects-description">{project.description}</p>

                <ul className="other-projects-proof-list">
                  {project.proof.map((item) => (
                    <li key={item}>
                      <span />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="other-projects-actions">
                  {project.links.map((link, linkIndex) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className={linkIndex === 0 ? 'other-projects-primary-link' : 'other-projects-secondary-link'}
                    >
                      {link.label}
                      {link.icon}
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="other-projects-footer">
          <p>
            Future card games, browser experiments, and creative tools will join this page as they become tangible
            enough to explore.
          </p>
          <a href="../index.html#featured-work" className="other-projects-inline-link">
            Return to core case studies <ArrowRight size={18} />
          </a>
        </section>
      </main>
    </div>
  );
}
