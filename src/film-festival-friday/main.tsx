import { createRoot } from 'react-dom/client';
import { PortfolioHeader } from '../shared/PortfolioHeader';
import { PortfolioFooter } from '../shared/PortfolioFooter';
import '../styles/index.css';
import './film.css';
function FilmFestivalFriday() {
  return <div className="film-page"><PortfolioHeader /><main className="film-main">
    <section className="film-intro" aria-labelledby="film-title">
      <div><p className="film-eyebrow">Film Festival Friday / Creative practice & code</p><h1 id="film-title">Less waiting.<br />More making.</h1></div>
      <div className="film-intro-copy"><p>I wanted to do more with my love of films than keep a watchlist. Film Festival Friday turns that intention into a small creative challenge between friends.</p><p>A prompt on Friday. Something made by Sunday. A film, a comic, an animation or whatever the idea calls for.</p><p className="film-role"><strong>My part</strong>Creative practice, prompt design, filmmaking and bot development.</p><a className="film-link" href="#garam-chai">See a prompt become a film ↓</a></div>
    </section>
    <section id="garam-chai" className="film-example" aria-labelledby="example-title">
      <div className="film-prompt-card"><p className="film-eyebrow">One actual weekend prompt</p><h2 id="example-title">Garam chai</h2><p>Make something in any medium inspired by this prompt.</p><p className="film-deadline">Submit by Sunday, 8 p.m.</p><p>No critique. Make something and have fun!</p></div>
      <figure className="film-screen"><iframe src="https://www.youtube-nocookie.com/embed/24PBoXh_uXo" title="Film Festival Friday II: Garam Chai" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /><figcaption><span>The prompt became this little film.</span><a href="https://youtu.be/24PBoXh_uXo" target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a></figcaption></figure>
    </section>
    <section className="film-practice" aria-labelledby="practice-title"><div><p className="film-eyebrow">A little structure helps</p><h2 id="practice-title">Make starting easier.</h2></div><div><p>The difficult part can be getting started. An open brief leaves room to play, but a weekend deadline gives the idea somewhere to go.</p><p>I built a bot to send the prompt. The rules keep it simple: use a familiar starting point, choose any medium, make something and share it. The point is to practise, rather than wait for a perfect idea.</p><div className="film-links"><a href="https://github.com/cynyassy/weekend-movie-bot" target="_blank" rel="noopener noreferrer">See the prompt bot ↗</a><a href="https://www.youtube.com/channel/UCxwAvV6fwi2on14yENSJL6w" target="_blank" rel="noopener noreferrer">More on YouTube ↗</a></div></div></section>
    <PortfolioFooter project="ChaddiMan" href="/projects/cynyassy.html" connection="Another way I turn an everyday observation into a story, this time through writing and illustration." />
  </main></div>;
}
createRoot(document.getElementById('root')!).render(<FilmFestivalFriday />);
