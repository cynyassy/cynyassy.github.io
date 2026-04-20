import { ArrowRight, Blocks, Gamepad2, Layers3 } from 'lucide-react';
import { CustomCursor } from '../app/components/CustomCursor';
import '../styles/other-projects.css';

const projectBuckets = [
  {
    title: 'Board & Card Game Systems',
    status: 'Planned',
    description:
      'A place for tabletop concepts, rule experiments, and card-game systems that explore behavior, institutions, decisions, and tradeoffs through play.',
    examples: ['Future card games', 'Board game prototypes', 'Rulebooks and balancing experiments'],
  },
  {
    title: 'Interactive Learning Games',
    status: 'In progress',
    description:
      'Smaller browser-based interactives that make systems, psychology, and ideas easier to test and understand through direct participation.',
    examples: ['Mini simulations', 'Educational explainers', 'Playable system demos'],
  },
  {
    title: 'Creative Tools & Miscellaneous Builds',
    status: 'Open shelf',
    description:
      'Projects that do not belong inside the four core case studies yet, but still show how I explore, prototype, and build across formats.',
    examples: ['Narrative tools', 'Experimental interfaces', 'Small publishing or design builds'],
  },
];

const nextUp = [
  {
    icon: <Blocks size={28} />,
    title: 'Card game concepts',
    note: 'Systems, tradeoffs, and player behavior through simple analog mechanics.',
  },
  {
    icon: <Gamepad2 size={28} />,
    title: 'Interactable web games',
    note: 'Compact browser-based ideas that teach by letting people test the system themselves.',
  },
  {
    icon: <Layers3 size={28} />,
    title: 'Creative experiments',
    note: 'A flexible shelf for side builds that may later grow into full case studies.',
  },
];

export default function OtherProjectsPage() {
  return (
    <div className="other-projects-page min-h-screen bg-white text-[#111]">
      <CustomCursor />

      <header className="other-projects-topbar">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4 md:px-10">
          <a href="../index.html#other-projects" className="other-projects-back-link">
            Back To Portfolio
          </a>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-20 px-6 py-12 md:px-10 md:py-16">
        <section className="space-y-8">
          <div className="space-y-4 max-w-4xl">
            <p className="other-projects-eyebrow">Other Projects</p>
            <h1 className="text-5xl md:text-7xl font-semibold tracking-[-0.06em] leading-[0.98]">
              The shelf for future builds, games, and experiments
            </h1>
            <p className="text-xl leading-relaxed text-[#555]">
              Not every project needs to be one of the four core case studies. This page is where smaller builds,
              planned games, and future experiments can keep accumulating without losing clarity on the homepage.
            </p>
          </div>

          <div className="other-projects-highlight">
            <strong>What belongs here:</strong>
            <p>
              future card games, interactable web experiments, small educational games, and creative tools that may
              later grow into fuller case studies.
            </p>
          </div>
        </section>

        <section className="space-y-8">
          <div className="space-y-3">
            <p className="other-projects-eyebrow">Buckets</p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.05em]">How I’m organizing the shelf</h2>
          </div>

          <div className="other-projects-grid">
            {projectBuckets.map((bucket) => (
              <article key={bucket.title} className="other-projects-card">
                <div className="other-projects-status">{bucket.status}</div>
                <h3>{bucket.title}</h3>
                <p>{bucket.description}</p>
                <ul>
                  {bucket.examples.map((example) => (
                    <li key={example}>{example}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <div className="space-y-3">
            <p className="other-projects-eyebrow">Next Up</p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.05em]">What I expect to add here next</h2>
          </div>

          <div className="other-projects-next-grid">
            {nextUp.map((item) => (
              <article key={item.title} className="other-projects-next-card">
                <div className="mb-4">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="other-projects-footer">
          <p>
            This page is intentionally open-ended. It is the part of the portfolio that can keep growing as new game,
            interaction, and storytelling experiments take shape.
          </p>
          <a href="../index.html#featured-work" className="other-projects-inline-link">
            Return to core case studies <ArrowRight size={18} />
          </a>
        </section>
      </main>
    </div>
  );
}
