import { PortfolioFooter } from '../shared/PortfolioFooter';
import { PortfolioHeader } from '../shared/PortfolioHeader';
import type { ReactNode } from 'react';
import { ArrowRight, BookOpen, ExternalLink, Github, Sparkles, Youtube } from 'lucide-react';
import emotionStart from '../assets/other-projects/emotion-walkthrough/start.webp';
import emotionSpecific from '../assets/other-projects/emotion-walkthrough/specific.webp';
import bookCover from '../assets/cynyassy-book/not-everything-is-urgent-first-this.png';
import '../styles/other-projects.css';

type OtherProjectLink = {
  label: string;
  href: string;
  icon?: ReactNode;
  external?: boolean;
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
    <div className="emotion-walkthrough">
      <figure>
        <img src={emotionStart} width="390" height="844" alt="The first step asks how you feel and offers Good or Bad" loading="lazy" />
        <figcaption>Start with a familiar word</figcaption>
      </figure>
      <figure>
        <img src={emotionSpecific} width="390" height="844" alt="After choosing Good and Hopeful, a sample journey selects Encouraged with the definition Feeling supported and more hopeful" loading="lazy" />
        <figcaption>Find a more specific feeling</figcaption>
      </figure>
      <p>Sample journey · Good → Hopeful → Encouraged</p>
    </div>
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
    <div className="film-prompt">
      <span className="film-prompt-label">A prompt from the weekend bot</span>
      <h3>Garam chai</h3>
      <p>Make something in any medium inspired by this prompt.</p>
      <div className="film-prompt-deadline">Submit by Sunday, 8 p.m.</div>
      <p className="film-prompt-note">No critique. Make something and have fun!</p>
      <iframe className="film-response" src="https://www.youtube-nocookie.com/embed/24PBoXh_uXo" title="Watch the creation made for the Garam chai prompt" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
      <a href="https://youtu.be/24PBoXh_uXo" target="_blank" rel="noopener noreferrer">Watch the response on YouTube ↗</a>
    </div>
  );
}

const projects: OtherProject[] = [
  {
    id: 'design-adventure',
    status: 'Interactive prototype',
    category: 'Design + learning experiment',
    title: 'Playable Design Laboratory',
    headline: 'Bring the reactor online',
    description: 'One reactor. Six puzzles. 22 visual styles. Play with design and discover how interfaces guide you, respond to you, and help you recover.',
    proof: ['Learn by trying switches, codes, pipes, signals, timing and pressure.', 'Every visual style has its own artwork. The puzzles and your progress stay the same.', 'Take your time in practice, or try the 60-second mission.'],
    links: [{ label: 'Try the design adventure', href: 'design-adventure.html', external: false, icon: <ArrowRight size={16} /> }],
    visual: <div className="flex min-h-[300px] flex-col justify-between bg-[#ffffff] p-10 text-[#353535]"><span className="text-xs font-semibold uppercase tracking-[0.2em]">Cynyassy / Mars Array 07</span><p className="my-8 text-5xl font-semibold leading-none tracking-[-0.05em]">Connect.<br />Recover.<br /><span className="text-[#d00000]">Stabilise.</span></p><span className="text-xs uppercase tracking-[0.15em]">6 commands / 22 styles / one reactor</span></div>,
  },
  {
    id: 'emotion-identifier',
    status: 'Shipped',
    category: 'Live interactive tool',
    title: 'Emotion Identifier',
    headline: 'Find words for what you’re feeling',
    description:
      'I built a guided tool for the moment when you feel something but struggle to name it. Start with a broad feeling, then explore more specific emotions and needs.',
    proof: [
      'Seven guided steps connect broad feelings to precise emotions and needs.',
      'Reflection summary can be copied, downloaded, or shared.',
      'My role · Concept, guided interaction, original artwork and development.',
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
        label: 'Read the book case study',
        href: '/projects/not-everything-is-urgent.html',
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
    headline: 'A weekly reason to watch closely and make something.',
    description:
      'I built a weekend prompt bot to turn an intention to make things into a small challenge between friends. A prompt arrives on Friday, with a Sunday deadline and room to work in any medium.',
    proof: [
      'My role · Creative practice, prompt design and bot development.',
      '“Garam chai” is one of the prompts sent by the weekend bot.',
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
      <PortfolioHeader />

      <main className="mx-auto flex max-w-6xl flex-col px-6 py-12 md:px-10 md:py-16">
        <section className="other-projects-hero">
          <div>
            <p className="other-projects-eyebrow">More work to explore</p>
            <h1>Useful ideas in other forms</h1>
          </div>
          <div>
            <p>
              Tools, publishing projects, creative practices and experiments.
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
              {project.id === 'film-festival-friday' ? <div className="other-projects-media other-projects-evidence md:order-2">{project.visual}</div> : <a
                href={project.links[0]?.href}
                target={project.links[0]?.external === false ? undefined : "_blank"}
                rel="noreferrer"
                className={`other-projects-media ${index % 2 !== 0 ? 'md:order-2' : ''} ${project.id === 'emotion-identifier' ? 'other-projects-evidence' : ''}`}
                aria-label={`Open ${project.title}`}
              >
                {project.visual}
              </a>}

              <div className={index % 2 === 0 ? 'other-projects-copy' : 'other-projects-copy md:order-1'}>
                <p className="other-projects-meta">
                  0{index + 1} / {project.status} / {project.category}
                </p>
                <a href={project.links[0]?.href} target={project.links[0]?.external === false ? undefined : "_blank"} rel="noreferrer" className="other-projects-title-link">
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
                      target={link.external === false ? undefined : "_blank"}
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
          <a href="/#projects" className="other-projects-inline-link">
            Return to core case studies <ArrowRight size={18} />
          </a>
        </section>
        <PortfolioFooter project="Indian Coffee Stories" href="/projects/coffee-tools.html" connection="See how I connect writing, communication, design and software in one working project." />
      </main>
    </div>
  );
}
