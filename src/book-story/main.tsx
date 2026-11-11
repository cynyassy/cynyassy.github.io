import { createRoot } from 'react-dom/client';
import { SoundToggle } from '../audio/SoundToggle';
import firstCover from '../assets/cynyassy-book/not-everything-is-urgent-first-this.png';
import secondCover from '../assets/cynyassy-book/not-everything-is-urgent-then-this.png';
import waiting from './assets/waiting.webp';
import ian from './assets/ian-bench.webp';
import notebook from './assets/notebook.webp';
import reading from './assets/reading.webp';
import balloon from './assets/balloon.webp';
import portraits from './assets/portraits.webp';
import breathe from './assets/breathe.webp';
import board from './assets/board.webp';
import boardDetail from './assets/board-detail.png';
import stickers from './assets/sticker-sheet.webp';
import roll from './assets/roll-prototype.webp';
import wrapper from './assets/wrapper.webp';
import './story.css';

function BookStory() {
  return (
    <div className="book-story">
      <a className="book-skip" href="#main">Skip to content</a>
      <header className="book-top book-width">
        <a className="book-brand" href="/">cynyassy<sup>®</sup></a>
        <nav aria-label="Case study navigation">
          <a href="/#projects">← All projects</a>
          <SoundToggle />
        </nav>
      </header>

      <main id="main">
        <section className="book-hero book-width" aria-labelledby="book-title">
          <div className="book-intro">
            <p className="book-kicker">A book in two parts</p>
            <h1 id="book-title">Not Everything<br />Is Urgent</h1>
            <p className="book-deck">Short illustrated stories about the everyday things we treat like emergencies.</p>
            <dl className="book-brief">
              <div><dt>What is it?</dt><dd>Two books with Kim Palmer and Ian Haworth, published by The Pound Project.</dd></div>
              <div><dt>Why did we make it?</dt><dd>An ad pitch fell through, but we kept writing about why we rush.</dd></div>
              <div><dt>What problem were we exploring?</dt><dd>When everything feels urgent, it’s hard to tell what actually needs our attention.</dd></div>
            </dl>
            <p className="book-role"><strong>My role</strong> I co-wrote the books, drew every illustration, designed the layouts in Figma, and arranged printing for the stickers and some copies of the books.</p>
            <a className="book-button" href="#read">Read a story ↓</a>
          </div>
          <div className="book-stage">
            <img className="book-stage-balloon" src={balloon} alt="" width="325" height="224" />
            <div className="book-covers">
              <img src={firstCover} alt="First This, the pink cover of book one" width="890" height="1260" fetchPriority="high" />
              <img src={secondCover} alt="Then This, the burgundy cover of book two" width="890" height="1260" />
            </div>
            <p className="book-bubble">Made to be read<br />on the loo.</p>
          </div>
        </section>

        <section className="book-reading" id="read" aria-labelledby="read-title">
          <div className="book-width book-reading-grid">
            <div>
              <p className="book-kicker">01 / Read a story</p>
              <h2 id="read-title">Just get through this part first</h2>
              <p>I’m on the sofa with my girlfriend. I’m already thinking about what I need to do next. The evening I’ve been looking forward to is happening, and I’m somewhere else in my head.</p>
              <blockquote>“the problem is there’s always another ‘part.’”</blockquote>
              <p className="book-byline">From my story in <cite>Then This</cite></p>
            </div>
            <figure className="book-story-image">
              <img src={waiting} alt="A drawing of Shashank next to the words ‘waiting to live my life’" width="662" height="364" loading="lazy" />
            </figure>
          </div>
        </section>

        <section className="book-width book-chapter" aria-labelledby="voices-title">
          <p className="book-kicker">02 / Two more voices</p>
          <h2 id="voices-title">We all rush differently</h2>
          <div className="book-voices">
            <article className="book-voice book-voice-ian">
              <div><p className="book-kicker">Ian Haworth</p><h3>I sit in the garden before I go home</h3><p>Ian writes about giving himself ten quiet minutes on a bench before heading for the Tube.</p></div>
              <blockquote>“a tranquil little bench spot near a station.”</blockquote>
              <img src={ian} alt="Shashank’s drawing of Ian in glasses and a blue jacket, sitting on a park bench" width="690" height="492" loading="lazy" />
            </article>
            <article className="book-voice book-voice-kim">
              <div><p className="book-kicker">Kim Palmer</p><h3>You’re not being chased</h3><p>Kim notices how long she puts off going to the loo, then how fast she rushes when she finally goes.</p></div>
              <blockquote>“when i need a wee, i go for a wee.”</blockquote>
              <img src={reading} alt="Kim’s illustrated character holding an open sheet" width="390" height="640" loading="lazy" />
            </article>
          </div>
        </section>

        <section className="book-making" aria-labelledby="making-title">
          <div className="book-width book-chapter">
            <p className="book-kicker">03 / Making the books</p>
            <h2 id="making-title">From a working board to the page</h2>
            <div className="book-process">
              <figure>
                <img src={boardDetail} alt="Detail of the Figma board with character sketches and early page layouts" width="248" height="257" loading="lazy" />
                <figcaption><strong>Sketches beside page layouts.</strong> I worked on the drawings and layouts together in Figma. <a href={board}>Open the full working board</a>.</figcaption>
              </figure>
              <figure>
                <img src={portraits} alt="Hand-drawn portraits of Kim, Ian and Shashank with their names" width="625" height="935" loading="lazy" />
                <figcaption><strong>Three voices, three faces.</strong> I drew the three of us as recurring characters. Ian has the glasses and the bald head. I’m the one with the beard.</figcaption>
              </figure>
              <figure className="book-process-wide">
                <img src={notebook} alt="An open notebook and pen drawn for Ian’s Starting Manual story" width="887" height="755" loading="lazy" />
                <figcaption><strong>Let a drawing finish a thought.</strong> Ian’s story about returning to pen and paper ends with a note to his notebook.</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="book-width book-chapter" aria-labelledby="extras-title">
          <div className="book-extras">
            <div>
              <p className="book-kicker">04 / Off the page</p>
              <h2 id="extras-title">What if the story was on the roll?</h2>
              <p>For a collaboration pitch, we tried putting a story in the place the book was made for. One version puts the story inside the wrapper. Another imagines it printed on the roll itself.</p>
            </div>
            <div className="book-extras-art">
              <figure><img src={roll} alt="Figma mockup of a toilet roll printed with Permission to Think and a seated illustration" width="662" height="634" loading="lazy" /><figcaption>Printed roll concept · Figma mockup</figcaption></figure>
              <figure><img src={wrapper} alt="Flat mockup of an illustrated story inside a toilet-roll wrapper" width="824" height="280" loading="lazy" /><figcaption>Inside the wrapper · Pitch mockup</figcaption></figure>
            </div>
          </div>
          <div className="book-stickers">
            <img src={stickers} alt="Variations of the Hair on Fire sticker, arranged in a sheet" loading="lazy" />
            <p><strong>From drawings to stickers.</strong> The drawings became something you could hold, peel off and stick somewhere you’d see every day.</p>
            <img className="book-breathe" src={breathe} alt="" loading="lazy" />
          </div>
        </section>
      </main>

      <footer className="book-footer">
        <div className="book-width">
          <p>Written by Kim Palmer, Ian Haworth and Shashank Sharma. Illustrated and designed by Shashank Sharma. Published by The Pound Project.</p>
          <nav aria-label="Keep exploring">
            <a href="https://www.poundproject.co.uk/not-everything-is-urgent">See the book at The Pound Project ↗</a>
            <a href="/#projects">Back to projects ↑</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<BookStory />);
