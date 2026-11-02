import { SoundToggle } from '../audio/SoundToggle';
import { ExternalLink, Mail } from 'lucide-react';

const offers = [
 { title:'Building products', description:'Take an idea through product design, interfaces, software and launch. Connect the parts so the thing actually works.', proof:'Indian Coffee Stories & Brew Tracker', href:'/projects/coffee-tools.html' },
 { title:'Communication and product education', description:'Work out what to say, who it helps and how it reaches them. Build the stories, channels, documentation and useful content around a product.', proof:'AlgoTest', href:'/projects/algotest.html' },
 { title:'Game and interaction design', description:'Give people something to try, question and learn from. Turn research into games, services and interactive experiences.', proof:'Perspectives', href:'/projects/perspectives.html' },
 { title:'Writing and illustration', description:'Find the words, drawings and pacing that make an idea land. From a short comic to a published book.', proof:'ChaddiMan & the book', href:'/projects/cynyassy.html' },
];

export default function WorkWithMePage() {
  return (
    <div className="work-with-me-page min-h-screen bg-white text-[#111]">
      <header className="work-with-me-topbar">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4 md:px-10">
          <a href="/#projects" className="work-with-me-toplink work-with-me-brand">
            cynyassy<span> / Back to projects</span>
          </a>
          <a href="mailto:cynyassy@gmail.com" className="work-with-me-toplink">
            Email Me
          </a>
          <SoundToggle />
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-14 md:px-10 md:py-20">
        <section className="work-with-me-hero">
          <p className="work-with-me-eyebrow">Work With Me</p>
          <h1>I turn ideas into stories, products and experiences people can use.</h1>
          <p className="work-with-me-intro">
            I work across communication, design and software. I can help shape the idea, make it tangible, build it and find a useful way to put it in front of people.
          </p>
        </section>

        <section className="work-with-me-offers-block">
          <div className="work-with-me-offers-inner">
            <p className="work-with-me-eyebrow">What You Can Hire Me For</p>
            <div className="work-with-me-offers">
              {offers.map((offer) => (
                <article className="work-with-me-offer" key={offer.title}>
                  <h2>{offer.title}</h2>
                  <p>{offer.description}</p><a className="offer-proof" href={offer.href}>See the work: {offer.proof} ↗</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="work-with-me-note">
          <p className="work-with-me-eyebrow">Best Fit</p>
          <p>
            I work well with teams who need someone to connect the thinking and the making, especially when a product, service or idea crosses more than one discipline.
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
