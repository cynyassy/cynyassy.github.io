import { ExternalLink, Mail } from 'lucide-react';

const offers = [
  {
    title: 'Product education and onboarding',
    description: 'Clarify how a product works so users can reach value faster.',
  },
  {
    title: 'Documentation and knowledge systems',
    description: 'Turn scattered expertise and support pain into reusable explanations.',
  },
  {
    title: 'Learning tools and explainers',
    description: 'Make difficult ideas easier to practice through stories, workshops, visuals, or guided tools.',
  },
  {
    title: 'Prototypes and interactive artifacts',
    description: 'Build quick, testable versions of ideas so teams can discuss something concrete.',
  },
];

export default function WorkWithMePage() {
  return (
    <div className="work-with-me-page min-h-screen bg-white text-[#111]">
      <header className="work-with-me-topbar">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4 md:px-10">
          <a href="../index.html" className="work-with-me-toplink">
            Back To Portfolio
          </a>
          <a href="mailto:cynyassy@gmail.com" className="work-with-me-toplink">
            Email Me
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-14 md:px-10 md:py-20">
        <section className="work-with-me-hero">
          <p className="work-with-me-eyebrow">Work With Me</p>
          <h1>I help teams make complex ideas easier to understand and use.</h1>
          <p className="work-with-me-intro">
            I am useful when a product, service, curriculum, or idea is important but hard to explain. I can help
            turn it into documentation, learning material, product flows, prototypes, or public-facing stories.
          </p>
        </section>

        <section className="work-with-me-offers-block">
          <div className="work-with-me-offers-inner">
            <p className="work-with-me-eyebrow">What You Can Hire Me For</p>
            <div className="work-with-me-offers">
              {offers.map((offer) => (
                <article className="work-with-me-offer" key={offer.title}>
                  <h2>{offer.title}</h2>
                  <p>{offer.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="work-with-me-note">
          <p className="work-with-me-eyebrow">Best Fit</p>
          <p>
            I work best with teams building complex, technical, educational, or behavior-driven products where clarity
            matters as much as execution.
          </p>
        </section>

        <section className="work-with-me-cta">
          <p className="work-with-me-eyebrow">Next Conversation</p>
          <h2>If this sounds useful, let&apos;s talk.</h2>
          <div className="work-with-me-actions">
            <a href="mailto:cynyassy@gmail.com" className="work-with-me-primary-link">
              Start with email <Mail size={18} />
            </a>
            <a href="https://www.linkedin.com/in/cynyassy/" target="_blank" rel="noreferrer" className="work-with-me-secondary-link">
              LinkedIn <ExternalLink size={18} />
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
