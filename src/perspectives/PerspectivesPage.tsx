import { PortfolioFooter } from '../shared/PortfolioFooter';
import { PortfolioHeader } from '../shared/PortfolioHeader';
import { PerspectivesCoverArt } from './PerspectivesCoverArt';
import { PerspectivesPlayableProof } from './PerspectivesPlayableProof';
import { PerspectivesRules } from './PerspectivesRules';
import { PerspectivesIllustratedTurn } from './PerspectivesIllustratedTurn';
import { ThesisFigure, thesisPages } from './ThesisEvidence';

function SectionIntro({ label, title, children }: { label: string; title: string; children?: React.ReactNode }) {
  return <header className="perspectives-section-head"><p className="perspectives-eyebrow">{label}</p><div><h2>{title}</h2>{children}</div></header>;
}

export default function PerspectivesPage() {
  return <div className="perspectives-page">
    <a href="#main-content" className="perspectives-skip-link">Skip to content</a>
    <PortfolioHeader /><nav className="portfolio-section-nav" aria-label="Project sections"><a href="#playable-proof">Try it</a><a href="#gameplay">The game</a><a href="#process">My process</a><a href="#reflection">After play</a></nav>

    <main id="main-content">
      <section id="overview" className="perspectives-hero">
        <div className="perspectives-hero-copy">
          <p className="perspectives-eyebrow">MFA thesis · School of Visual Arts, New York</p>
          <h1>Perspectives</h1>
          <p className="perspectives-dek">Who gets to build? Who gets left behind?</p>
          <p className="perspectives-muted">My research into caste and unequal access in India became a facilitated board game about power and resources. Players build communities, experience different starting conditions and discuss what the rules make possible.</p>
          <p className="perspectives-role"><span className="perspectives-eyebrow">My work</span>Research · Game & service design · Illustration · Prototyping · Playtesting</p>
          <a className="perspectives-play-link" href="#playable-proof">Play the mini game ↓</a>
        </div>
        <figure className="perspectives-cover-shell"><PerspectivesCoverArt className="perspectives-cover-art" editorial /><figcaption className="sr-only">Perspectives thesis cover featuring the original illustrated representatives.</figcaption></figure>
      </section>

      <section id="playable-proof" className="perspectives-section perspectives-playable-section">
        <SectionIntro label="A small digital adaptation" title="Try a starting point. Watch what changes."><p>Choose where to start and build. Run the game, then try a different rule on the same map.</p></SectionIntro>
        <PerspectivesPlayableProof />
      </section>

      <section id="model" className="perspectives-section">
        <SectionIntro label="The question" title="How do you make a system something people can experience?">
          <p>My research began with caste and unequal access to opportunity in India. I wanted to explore how control over resources becomes control over other people’s choices.</p>
        </SectionIntro>
        <div className="perspectives-context"><h3>Why a game?</h3><p>A shared board gives people an experience to talk about. Someone gains ground. Someone loses access. The conversation can move from what a person chose to what the system made possible.</p></div>
      </section>

      <section id="gameplay" className="perspectives-section">
        <SectionIntro label="The physical game" title="Compete first. Then question the game.">
          <p>Perspectives has three stages: Capture, Consolidate and Cooperate. The illustrations below come directly from my thesis. They show the larger arc, rather than every move or rule.</p>
        </SectionIntro>
        <PerspectivesIllustratedTurn />
        <details className="perspectives-details perspectives-setup-details"><summary>Read the final setup, turn rules and building costs</summary><PerspectivesRules /></details>
        <div className="perspectives-cards-section perspectives-final-cards">
          <div><p className="perspectives-eyebrow">Choices and interruptions</p><h3>Plans meet things you cannot control.</h3><p>Scenario cards affect the board at the end of a round. Players can also buy media cards to disrupt competitors, or keep perk cards for a useful moment. Buildings and power cards change which shocks a community can absorb.</p></div>
          <div className="perspectives-card-example"><h3>For example: plague</h3><p>In the final version, a region without a hospital loses a house. A region with a hospital is protected. The same event has different consequences because of what was built earlier.</p><a href={thesisPages[117]} target="_blank" rel="noreferrer">See the original scenario cards ↗</a></div>
        </div>
        <details className="perspectives-details"><summary>See the original scenario, media and perk cards</summary><div className="perspectives-source-pages">{[{page:117,name:'Scenario cards'},{page:118,name:'Media cards'},{page:119,name:'Perk cards'}].map(item => <figure key={item.page}><a href={thesisPages[item.page]} target="_blank" rel="noreferrer"><img src={thesisPages[item.page]} width="842" height="595" alt={`${item.name} and their explanation from thesis page ${item.page}. Open the full page to read.`} loading="lazy" decoding="async" /></a><figcaption><a href={thesisPages[item.page]} target="_blank" rel="noreferrer">{item.name} · p. {item.page} ↗</a></figcaption></figure>)}</div></details>
      </section>

      <section id="process" className="perspectives-section">
        <SectionIntro label="My process" title="The game took shape through making and testing.">
          <p>I moved from role-playing situations to a resource-based board game. Each version helped me work out what players needed to experience, and what was getting in their way.</p>
        </SectionIntro>
        <div className="perspectives-process-grid">
          <article><ThesisFigure image="stakeholder-prototype" page={70} alt="Photographs of classmates around a table with paper characters, sticky notes and prototype materials." /><p className="perspectives-eyebrow">01 · Roles and missing information</p><h3>Start with people trying to get something done.</h3><p>In an early classroom prototype, players took roles such as parents, teachers, students and government representatives. Each knew only part of the situation. I explored how incomplete information affected their ability to get their needs met.</p></article>
          <article><ThesisFigure image="seventh-board" page={106} alt="A later prototype with coloured hexagonal resource tiles, cards and a player resource dashboard." /><p className="perspectives-eyebrow">02 · Simplify the system</p><h3>Keep the decisions. Reduce the machinery.</h3><p>An early role-playing version stalled around movement rules. Later iterations removed the separate centres of power and refined resource gathering and holding limits, making the game faster and less cumbersome.</p><a href={thesisPages[99]} target="_blank" rel="noreferrer">Compare the first board iteration ↗</a></article>
        </div>
        <div className="perspectives-final-board">
          <ThesisFigure image="final-board" page={107} alt="Final physical board headed Domination, with grain, wood, brick and ore hexagons, power cards and three card decks." />
          <div><p className="perspectives-eyebrow">03 · Set up the conversation</p><h3>Why does the board say “Domination”?</h3><p>I renamed the final game to draw first-time players into the competitive objective. They could pursue expansion and victory before discussing the power dynamics they had just helped create.</p><p>The player dashboard made resources and progress visible. Media and perk cards offered different ways to play, beyond expanding across the board.</p><a href={thesisPages[115]} target="_blank" rel="noreferrer">Read the design decision · p. 115 ↗</a></div>
        </div>
      </section>

      <section id="testing" className="perspectives-section">
        <SectionIntro label="Playtesting · 20+ sessions documented in the thesis" title="The uncomfortable moments mattered.">
          <p>Across the sessions, players described reflection, frustration and a tension between luck and strategy. Their responses showed where the experience prompted a conversation and where the rules needed more work.</p>
        </SectionIntro>
        <ThesisFigure image="playtest-photos" page={129} alt="Thesis photographs of tabletop playtests and people handling physical game prototypes." className="perspectives-testing-evidence">Playtesting and prototype development, documented during the thesis.</ThesisFigure>
        <div className="perspectives-testing-findings">
          <article><h3>Reflection</h3><p>Some players described questioning assumptions about privilege and recognising how structural factors affected their progress.</p></article>
          <article><h3>Frustration</h3><p>Players also felt that bad luck could leave them behind, and wanted more control over how to win. That exposed a tension between the competitive goal and the discussion I wanted to facilitate.</p></article>
          <article><h3>Further development</h3><p>Ideas for a future iteration included finite resources, regional scenario effects and a gentler opening to give players time to settle in.</p></article>
        </div>
        <div className="perspectives-source-links"><a href={thesisPages[130]} target="_blank" rel="noreferrer">Read participant feedback · p. 130 ↗</a><a href={thesisPages[131]} target="_blank" rel="noreferrer">Read suggested improvements · p. 131 ↗</a></div>
      </section>



      <section id="reflection" className="perspectives-section perspectives-reflection">
        <SectionIntro label="Consolidate → Cooperate" title="The conversation is part of the design."><p>After competitive play, players compare their experiences before considering how the system could change. Facilitation needs to make room for everyone, particularly those who had less power on the board.</p></SectionIntro>
        <div className="perspectives-reflection-pair"><article><p className="perspectives-eyebrow">First, compare</p><h3>What helped you get ahead?</h3><p>Was it your decisions, your starting position or a lucky event? What did another player experience differently?</p></article><article><p className="perspectives-eyebrow">Then, reconsider</p><h3>How would you share power?</h3><p>Which rules would need to change? Who would benefit, and whose voice is missing from that decision?</p></article></div>
        <details className="perspectives-details"><summary>Read the original facilitation prompts</summary><a className="perspectives-facilitation-page" href={thesisPages[116]} target="_blank" rel="noreferrer"><img src={thesisPages[116]} width="842" height="595" alt="Original thesis facilitation sheet, with separate prompts for the victor and everyone, followed by the three stages of play." loading="lazy" decoding="async" />Open thesis page 116 ↗</a></details>
        <p className="perspectives-closing">The board creates a shared experience. The discussion makes room to question it.</p>
      </section>

      <section id="presentation" className="perspectives-section perspectives-video-section">
        <SectionIntro label="Thesis presentation" title="Hear the story behind the game."><p>I walk through the research and development of Perspectives for my MFA in Design for Social Innovation at SVA.</p></SectionIntro>
        <div className="perspectives-video-frame"><iframe src="https://www.youtube.com/embed/G3VoClPmiKM" title="Perspectives thesis presentation" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></div>
      </section>
    </main>
    <PortfolioFooter project="ChaddiMan" href="/projects/cynyassy.html" connection="Meet the characters I use to turn difficult feelings into everyday conversations." />
  </div>;
}
