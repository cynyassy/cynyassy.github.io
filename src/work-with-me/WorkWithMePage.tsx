import { PortfolioFooter } from '../shared/PortfolioFooter';
import { PortfolioHeader } from '../shared/PortfolioHeader';
import {ProductProof, FirstProject} from '../shared/ProductPositioning';
import { ExternalLink, Mail } from 'lucide-react';
import { Capabilities,ProfessionalExperience,TechnicalLearning } from '../shared/ProfessionalProfile';

export default function WorkWithMePage() {
  return (
    <div className="work-with-me-page min-h-screen bg-white text-[#111]">
      <PortfolioHeader />

      <main className="mx-auto max-w-5xl px-6 py-14 md:px-10 md:py-20">
        <section className="work-with-me-hero">
          <p className="work-with-me-eyebrow">Work With Me</p>
          <h1>I make <span className="headline-products">complex products</span> easier to <span className="headline-stories">understand and use.</span></h1>
          <p className="work-with-me-intro">
            Through product design, software and clear communication, I help people see what a product can do and get started with it.
          </p>
        </section>

        <FirstProject/>
        <ProductProof/>
        <section className="work-with-me-offers-block" aria-labelledby="hire-title">
          <div className="work-with-me-offers-inner">
            <h2 id="hire-title" className="work-with-me-eyebrow">Skills and capabilities</h2>
            <details className="capability-details"><summary>Explore my capabilities and toolkit</summary><Capabilities /><TechnicalLearning /></details>
          </div>
        </section>

        <section id="experience" className="work-with-me-experience" aria-labelledby="work-experience-title">
          <h2 id="work-experience-title">Professional experience.</h2>
          <p className="work-with-me-experience-intro">Selected roles and client work in education, publishing, communication and software.</p>
          <ProfessionalExperience />
        </section>

        <aside className="research-invitation"><p className="work-with-me-eyebrow">Play, learning & systems</p><p>I also design serious games that invite people to question the rules and decisions around them.</p><a href="/projects/play-and-systems.html">Explore my practice and research questions ↗</a></aside>
        <section className="work-with-me-note">
          <p className="work-with-me-eyebrow">Working together</p>
          <p>
            I’m open to contract projects, product-team roles and collaborations. I can help with the design, development and communication, or take on a specific part of the work.
          </p>
        </section>

        <section className="work-with-me-cta">
          <h2>Get in touch.</h2>
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
