import docs from '../brick-trail/assets/gallery/algotest.webp';
import './product-positioning.css';

export function ProductProof() {
  return <section className="product-proof" aria-label="A working example: AlgoTest">
    <div><p className="positioning-eyebrow">AlgoTest / Product education</p><h2>Documentation for traders.</h2><p>Traders kept asking the same setup questions. I built a searchable documentation hub and connected it to support, search and product education.</p><p className="product-proof-result">Monthly organic clicks grew from <strong>25K to 150K</strong>.</p><p className="product-proof-note">Monthly comparison. The case study separates this from its 16-month report and company-level revenue.</p><a href="/projects/algotest.html">Read the AlgoTest case study ↗</a></div>
    <a className="product-proof-image" href="/projects/algotest.html" aria-label="View the AlgoTest case study"><img src={docs} width="1200" height="751" alt="AlgoTest documentation: product navigation, guides and trading examples" loading="lazy" decoding="async"/></a>
  </section>;
}

export function FirstProject() {
  return <section id="first-project" className="first-project" aria-label="How we could start"><div><h2>How we could start.</h2><p>We could start with a screen, a setup guide, or a feature customers keep asking about. We agree what needs doing before work begins.</p></div><div><ol><li>I look at how it works now and where people need help.</li><li>I propose changes to the screens, instructions or both.</li><li>You get a prototype or draft, with recommendations for what to do next. If you need it built, we can agree that too.</li></ol><a href="mailto:cynyassy@gmail.com?subject=A%20project%20to%20discuss">Email me about a project ↗</a></div></section>;
}
