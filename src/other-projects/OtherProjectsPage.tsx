import { ArrowRight, BookOpen, ExternalLink } from 'lucide-react';
import { CustomCursor } from '../app/components/CustomCursor';
import emotionIdentifierCover from '../assets/other-projects/emotion-identifier-cover.png';
import '../styles/other-projects.css';

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
          <div className="max-w-4xl space-y-4">
            <p className="other-projects-eyebrow">Other Projects</p>
            <h1 className="text-5xl font-semibold leading-[0.98] tracking-[-0.06em] md:text-7xl">
              Useful experiments that deserve their own shelf
            </h1>
            <p className="text-xl leading-relaxed text-[#555]">
              Smaller shipped tools, learning experiences, games, and publishing projects. Some stay compact; others
              may grow into full case studies as the work develops.
            </p>
          </div>

          <div className="other-projects-highlight">
            <strong>The thread:</strong>
            <p>
              Each project turns something abstract or difficult into an experience people can enter, understand, and
              use.
            </p>
          </div>
        </section>

        <section className="space-y-8">
          <div className="space-y-3">
            <p className="other-projects-eyebrow">Shipped</p>
            <h2 className="text-4xl font-semibold tracking-[-0.05em] md:text-5xl">Emotion Identifier</h2>
          </div>

          <article className="other-projects-feature">
            <a
              className="other-projects-feature-image"
              href="https://cynyassy.github.io/emotions/"
              target="_blank"
              rel="noreferrer"
              aria-label="Open the live Emotion Identifier Tool"
            >
              <img
                src={emotionIdentifierCover}
                alt="Emotion Identifier Tool interface asking the user to name what they feel"
              />
            </a>

            <div className="other-projects-feature-copy">
              <div className="other-projects-status">Live interactive tool</div>
              <h3>Helping people find more precise words for what they feel</h3>
              <p>
                Many people can tell that they feel “good,” “bad,” “off,” or “fine,” but do not have the vocabulary to
                describe what is happening underneath. This NVC-inspired tool turns that gap into a guided learning
                journey.
              </p>

              <div className="other-projects-summary-grid">
                <div>
                  <span>Problem</span>
                  <p>Unnamed emotions can feel shapeless, overwhelming, and difficult to communicate.</p>
                </div>
                <div>
                  <span>Experience</span>
                  <p>Seven guided steps connect broad feelings to precise emotions and underlying needs.</p>
                </div>
                <div>
                  <span>Output</span>
                  <p>A reflection summary that can be copied, downloaded, or shared with someone else.</p>
                </div>
                <div>
                  <span>Built with</span>
                  <p>React, TypeScript, Vite, responsive interaction design, and original Cynyassy art.</p>
                </div>
              </div>

              <a
                href="https://cynyassy.github.io/emotions/"
                target="_blank"
                rel="noreferrer"
                className="other-projects-primary-link"
              >
                Try the live tool <ExternalLink size={18} />
              </a>
            </div>
          </article>
        </section>

        <section className="space-y-8">
          <div className="space-y-3">
            <p className="other-projects-eyebrow">Coming Soon</p>
            <h2 className="text-4xl font-semibold tracking-[-0.05em] md:text-5xl">The shelf keeps growing</h2>
          </div>

          <article className="other-projects-upcoming">
            <div>
              <BookOpen size={30} aria-hidden="true" />
              <div className="other-projects-status other-projects-status-dark">Upcoming publication</div>
            </div>
            <div>
              <h3>It’s Not That Urgent</h3>
              <p>
                An upcoming illustrated book. Its project story, launch details, and purchase links will be added here
                when the book is ready rather than presenting unfinished work as a shipped outcome.
              </p>
            </div>
          </article>
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
