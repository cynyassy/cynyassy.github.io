import { useState } from 'react';
import docsFocus from '../assets/algotest-case-study/documentation-focus.webp';
import searchFocus from '../assets/algotest-case-study/search-focus.webp';
import { SoundToggle } from '../audio/SoundToggle';
import algotestLogoImg from '../assets/algotest-case-study/algotest-logo.png';
import algotestDocsScreenshot from '../assets/algotest_documentation.png';
import googleSearchConsoleClicks from '../assets/algotest-case-study/google_search_console2.png';
import googleSearchConsoleImpressions from '../assets/algotest-case-study/google_search_console1.png';
import tradersPathStart from '../assets/algotest-bet-sizer/BS - Trader\'s Path 1.png';
import tradersPathExperiment from '../assets/algotest-bet-sizer/BS - Trader\'s Path 7.png';
import tradersPathOutcome from '../assets/algotest-bet-sizer/BS - Trader\'s Path 13.png';

const decisions = [
  ['Start with the questions people were already asking', 'I collected recurring support questions about signup, broker connections, pricing and setup. Those questions helped me decide which pages to build first.'],
  ['Make the answers easy to find and follow', 'I built docs.algotest.in from scratch, covering onboarding, product workflows, signals and troubleshooting. I wrote and versioned the pages in Markdown through GitHub, working with design, engineering and subject-matter experts.'],
  ['Connect support, search and education', 'I used Ahrefs, Search Console, Analytics and category research to understand what people were searching for. Useful explanations could then serve support, search, marketing and video, instead of being written again for each channel.'],
];
const searchMetrics = [
  ['1.29M', 'Clicks over 16 months'],
  ['11.3M', 'Search impressions'],
  ['11.4%', 'Average click-through rate'],
  ['12.7', 'Average search position'],
];
const tradersPathFrames = [
  [tradersPathStart, 'Start with a choice', 'The opening screen introduces a character, some capital and a risky decision before the formula.'],
  [tradersPathExperiment, 'Try a different bet size', 'The adjustment screen puts bet size beside its return curve.'],
  [tradersPathOutcome, 'See what changes', 'The outcome brings the optimal point, capital and return together.'],
];

const imageSizes: Record<string, [number, number]> = {
  [docsFocus]: [1750, 970],
  [searchFocus]: [1210, 490],
  [algotestDocsScreenshot]: [3354, 2100],
  [googleSearchConsoleClicks]: [1592, 1016],
  [googleSearchConsoleImpressions]: [1592, 1016],
  [tradersPathStart]: [1440, 1024],
  [tradersPathExperiment]: [1440, 1024],
  [tradersPathOutcome]: [1440, 1024],
};

function Figure({ src, fullSrc = src, alt, caption, eager = false }: { src: string; fullSrc?: string; alt: string; caption: string; eager?: boolean }) {
  return <figure><a className="image-link" href={fullSrc} target="_blank" rel="noopener" aria-label={`Open full-size image: ${alt}`}><img src={src} alt={alt} width={imageSizes[src][0]} height={imageSizes[src][1]} loading={eager ? 'eager' : 'lazy'} decoding="async" /></a><figcaption>{caption} <a href={fullSrc} target="_blank" rel="noopener">View full size ↗</a></figcaption></figure>;
}

export default function AlgoTestPage() {
  const [frame,setFrame]=useState(0);
  return (
    <div className="algotest-page">
      <a href="#main" className="skip-link">Skip to content</a>
      <header className="topbar"><div>
        <a className="portfolio-link" href="/#projects">cynyassy<span> / Back to projects</span></a>
        <nav aria-label="Case study sections"><a href="#overview">Overview</a><a href="#intervention">The work</a><a href="#proof">Results</a></nav><SoundToggle />
      </div></header>
      <main id="main">
        <section id="overview" className="hero">
          <div className="brand"><img src={algotestLogoImg} alt="" /><span>AlgoTest · Product education & growth</span></div>
          <div className="hero-grid">
            <div className="hero-copy">
              <h1>How documentation helped grow organic traffic 6×</h1>
              <p className="dek">I built a place where traders could find clear answers, get started and learn how to use AlgoTest.</p>
              <p className="role"><span className="label">My role</span>Strategy · Documentation design · SEO · Cross-functional delivery</p>
            </div>
            <aside className="lead-result" aria-label="Leading result"><strong>25K → 150K</strong><p>Monthly organic clicks</p></aside>
          </div>
          <div className="hero-art">
            <Figure src={docsFocus} fullSrc={algotestDocsScreenshot} alt="AlgoTest documentation with navigation and trading strategy examples" caption="The documentation I built, from getting started to detailed product workflows." eager />
            <a className="text-link" href="https://docs.algotest.in/" target="_blank" rel="noopener">Explore the documentation ↗</a>
          </div>
        </section>

        <section className="section problem">
          <p className="label">The problem</p>
          <div><h2>The answers existed. Finding them was the hard part.</h2>
            <p>Customers kept asking for help with the same things: signing up, connecting a broker, understanding pricing and using the product. Much of that knowledge lived inside the company.</p>
            <p>I saw an opportunity to turn those answers into something people could use on their own. The same pages could help existing customers and reach people searching for a solution.</p>
          </div>
        </section>

        <section id="intervention" className="section">
          <header className="section-head"><p className="label">The work</p><h2>From support questions to useful pages.</h2></header>
          <div className="decision-list">{decisions.map(([title, copy], i) => <article key={title}><span className="number">0{i + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div>
        </section>

        <section id="proof" className="section">
          <header className="section-head"><p className="label">Results</p><div><h2>More people found the answers.</h2><p>Monthly organic clicks grew from 25K to 150K. Support teams also reused the documentation, and some setup pages outranked brokers’ own documentation.</p></div></header>
          <div className="stats">{searchMetrics.map(([value, label]) => <p key={label}><strong>{value}</strong><span>{label}</span></p>)}</div>
          <p className="data-note">Search Console totals below cover a 16-month reporting window. The monthly growth figures above are a separate comparison.</p>
          <div className="proof-image"><Figure src={searchFocus} fullSrc={googleSearchConsoleClicks} alt="AlgoTest Google Search Console performance dashboard" caption="Daily organic clicks in the selected 16-month report. It totals 1.29M clicks and 11.3M impressions. Full report available below." /></div>
          <details className="supporting-evidence"><summary>See the impressions view</summary><Figure src={googleSearchConsoleImpressions} alt="AlgoTest Search Console impressions graph" caption="The impressions view of the search performance report." /></details>
          <div className="business-results">
            <h3>The wider business picture</h3>
            <dl><div><dt>Domain Rating</dt><dd>23 → 37 <span>in roughly 12 months</span></dd></div><div><dt>Monthly company revenue</dt><dd>₹15–18L → ₹50L+</dd></div><div><dt>SEO</dt><dd>Became the primary lead-generation channel</dd></div></dl>
            <p>Revenue grew alongside this work. It is a company-level result, rather than a measure of documentation’s contribution on its own.</p>
          </div>
        </section>

        <section className="section">
          <header className="section-head"><p className="label">Another way to learn</p><div><h2>Some ideas are easier to understand by trying them.</h2><p>Trader’s Path explored position sizing and the Kelly Criterion through interaction. Instead of starting with a formula, the experience lets people change a bet size and see what happens.</p></div></header>
          <div className="trader-walkthrough"><h3>Prototype walkthrough</h3><p>Three snapshots of the prototype. Choose a stage to see that screen.</p><div role="group" aria-label="Prototype stage" className="trader-choices">{['Choose','Adjust','Compare'].map((label,i)=><button type="button" key={label} aria-pressed={frame===i} onClick={()=>setFrame(i)}>{label}</button>)}</div><Figure src={tradersPathFrames[frame][0]} alt={tradersPathFrames[frame][1]} caption={tradersPathFrames[frame][2]} /></div>
        </section>

        <section className="section reflection"><p className="label">What I took away</p><div><h2>Pay attention to what people keep asking.</h2><p>Those questions helped me find work that mattered. Clear, useful explanations could help someone get started, give support teams something to share and help new customers find the product.</p></div></section>
        <footer className="case-footer"><div><p className="label">Keep exploring</p><a className="next-project" href="/projects/perspectives.html">Perspectives <span>Game & service design ↗</span></a></div><nav aria-label="Continue exploring"><a href="/#projects">All projects ↗</a><a href="mailto:cynyassy@gmail.com">Have a project in mind? Email me ↗</a></nav></footer>
      </main>
    </div>
  );
}
