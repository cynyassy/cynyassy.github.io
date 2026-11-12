import { PortfolioFooter } from '../shared/PortfolioFooter';
import { PortfolioHeader } from '../shared/PortfolioHeader';
import { ExternalLink, Mail } from 'lucide-react';
import { Capabilities,ProfessionalExperience,TechnicalLearning } from '../shared/ProfessionalProfile';

export default function WorkWithMePage() {
  return (
    <div className="work-with-me-page min-h-screen bg-white text-[#111]">
      <PortfolioHeader />

      <main className="mx-auto max-w-5xl px-6 py-14 md:px-10 md:py-20">
        <section className="work-with-me-hero">
          <p className="work-with-me-eyebrow">Work With Me</p>
          <h1>I <span className="headline-products">build products</span> and the <span className="headline-stories">stories</span> around them.</h1>
          <p className="work-with-me-intro">
            I can help work out what should be made, design and build it, and explain it to the people it is for. My work connects research, interfaces, software and communication.
          </p>
        </section>

        <section className="work-with-me-offers-block" aria-labelledby="hire-title">
          <div className="work-with-me-offers-inner">
            <h2 id="hire-title" className="work-with-me-eyebrow">What You Can Hire Me For</h2>
            <Capabilities />
            <TechnicalLearning />
          </div>
        </section>

        <section id="experience" className="work-with-me-experience" aria-labelledby="work-experience-title">
          <p className="work-with-me-eyebrow">Professional experience</p>
          <h2 id="work-experience-title">Different settings. The same care for the work.</h2>
          <p className="work-with-me-experience-intro">From teaching and publishing to product teams, brand consulting and client delivery. These are some of the places I’ve put that combination to work.</p>
          <ProfessionalExperience />
        </section>

        <section className="work-with-me-note">
          <p className="work-with-me-eyebrow">Best Fit</p>
          <p>
            I work well with teams who need someone to connect the thinking and the making. That might be a role in a product team, a client project, or a collaboration that crosses disciplines.
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
        <PortfolioFooter project="Indian Coffee Stories" href="/projects/coffee-tools.html" connection="See how I connect writing, communication, design and software in one working project." />
      </main>
    </div>
  );
}
