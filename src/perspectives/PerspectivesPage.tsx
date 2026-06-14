import { useState } from 'react';
import { PerspectivesCoverArt } from './PerspectivesCoverArt';
import { PerspectivesPlayableProof } from './PerspectivesPlayableProof';
import UpgradeAndCostSheetV from './imports/UpgradeAndCostSheetV1/UpgradeAndCostSheetV1';
import womanImg from '../assets/perspectives/b57fa03efae908dc0ffc9d2d8992cf3c0e8877fc.png';
import gentlemanImg from '../assets/perspectives/040a89687a081c8922d47ce01181afc7f12d47d4.png';
import farmerImg from '../assets/perspectives/d7eee63e5d931ab5ac6b52272cadaf9a9cf4e474.png';
import kingImg from '../assets/perspectives/fd62593ed3a99dc48c1587c439fc5a0ee82e8ff2.png';

type CardTab = 'scenario' | 'media' | 'perk';

const visibilityChain = [
  {
    title: 'Starting position',
    description: 'Geography changes which resources a player can reach first.',
  },
  {
    title: 'Early opportunity',
    description: 'Access changes what a player can extract, trade, and build.',
  },
  {
    title: 'Institutions',
    description: 'Buildings turn temporary advantage into protection and resilience.',
  },
  {
    title: 'Compounding outcomes',
    description: 'Crises reveal who can absorb shocks and who loses ground.',
  },
];

const tutorialSteps = [
  {
    title: "You're probably wondering...",
    content:
      'How do you play this? What does it all mean? The walkthrough makes the model understandable before the game begins.',
    image: farmerImg,
  },
  {
    title: 'Set up the board',
    content:
      'Players begin with a shared terrain layout. Rearranging the board creates new strategic and social conditions.',
  },
  {
    title: 'Decide who goes first',
    content:
      'Order immediately introduces asymmetry. The discomfort is intentional: sequence is part of the model, not neutral administration.',
    image: womanImg,
    highlight: true,
  },
  {
    title: 'Choose a representative',
    content:
      'Players place a representative near the resources that will shape their earliest opportunities.',
    image: gentlemanImg,
  },
  {
    title: 'Define a culture',
    content:
      'Players articulate identity, language, rituals, and origin before expansion begins, making culture part of what is at stake.',
    image: kingImg,
  },
  {
    title: 'Gather resources',
    content:
      'Each turn limits extraction. Scarcity and geography shape what choices remain available.',
  },
  {
    title: 'Move and expand',
    content:
      'Positioning determines who can reach new territory, block an opponent, or access future opportunities.',
  },
  {
    title: 'Build institutions',
    content:
      'Structures convert territory and resources into durable protection, making early advantages harder to reverse.',
  },
];

const scenarioCards = [
  { name: 'Earthquake', effect: 'Lose a building if hit with an earthquake', defense: 'Hospital prevents loss' },
  { name: 'Famine', effect: "Can't extract grain for 2 turns", defense: 'None' },
  { name: 'Flooding', effect: "Can't produce any resources for 1 turn", defense: 'None' },
  { name: 'Plague', effect: 'Lose a citizen and all lands they occupy', defense: 'Hospital protects region' },
  { name: 'Disease', effect: 'Produce only half of the resource for 1 turn', defense: 'Hospital protects region' },
  { name: 'Storm', effect: 'Lose 1 resource for each building in region', defense: 'Hospital prevents loss' },
];

const mediaCards = [
  { name: 'Rival Campaign', effect: 'Lose 1 citizen and 1 resource', defense: 'School prevents' },
  { name: 'Religious Movement', effect: 'One piece converts to rival team', defense: 'School prevents' },
  { name: 'Scandal', effect: 'Lose 1 building', defense: 'None' },
  { name: 'Fake News', effect: 'Lose 1 citizen', defense: 'School prevents' },
  { name: 'Hackers', effect: 'Lose 2 resources', defense: 'None' },
  { name: 'Obsolete Technology', effect: 'Lose 2 resources per turn', defense: 'None' },
];

const perkCards = [
  { name: 'City Planner', effect: 'Build two structures during your turn' },
  { name: 'Emergency Services', effect: 'Become immune to one scenario card' },
  { name: 'Lucky Break', effect: 'Draw an additional resource card during your turn' },
  { name: 'Master Trader', effect: 'Initiate a trade with any player at any time' },
  { name: 'Resourceful', effect: 'Extract two additional resources during your turn' },
  { name: 'Wild Card', effect: 'Draw a scenario, media, or perk card of your choice' },
];

const reflectionQuestions = [
  'Who gained access to resources first?',
  'Which early advantages became difficult to reverse?',
  'Who could afford institutions before the first crisis?',
  'Which players recovered from shocks, and which lost ground?',
  'When did an apparently fair rule produce an unequal outcome?',
  'What would need to change for the outcome to be different?',
];

function SectionIntro({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="perspectives-section-head">
      <p className="perspectives-eyebrow">{label}</p>
      <div>
        <h2>{title}</h2>
        {children}
      </div>
    </header>
  );
}

export default function PerspectivesPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [activeTab, setActiveTab] = useState<CardTab>('scenario');

  const activeCardSet =
    activeTab === 'scenario' ? scenarioCards : activeTab === 'media' ? mediaCards : perkCards;

  return (
    <div className="perspectives-page">
      <a href="#main-content" className="perspectives-skip-link">
        Skip to content
      </a>

      <header className="perspectives-topbar">
        <div>
          <a href="../#featured-work">Back to portfolio</a>
          <nav aria-label="Perspectives sections">
            <a href="#playable-proof">Playable proof</a>
            <a href="#model">The model</a>
            <a href="#gameplay">Gameplay</a>
            <a href="#reflection">Reflection</a>
          </nav>
        </div>
      </header>

      <main id="main-content">
        <section className="perspectives-hero">
          <div className="perspectives-hero-copy">
            <p className="perspectives-eyebrow">MFA thesis / speculative game</p>
            <h1>Perspectives</h1>
            <p className="perspectives-dek">
              A board game that makes compounding advantage visible through play.
            </p>
            <p className="perspectives-muted">
              Players begin in different geographies, gather unequal resources, build institutions, and face the same
              crises with very different levels of protection. The rules may be shared; the outcomes are not.
            </p>
            <p className="perspectives-role">
              <span className="perspectives-eyebrow">My work</span>
              Research · causal modelling · game mechanics · prototyping · playtesting · facilitation
            </p>
          </div>

          <figure className="perspectives-cover-shell">
            <PerspectivesCoverArt className="perspectives-cover-art" />
            <figcaption className="sr-only">
              Perspectives thesis cover featuring illustrated player characters.
            </figcaption>
          </figure>
        </section>

        <section id="playable-proof" className="perspectives-section perspectives-playable-section">
          <SectionIntro
            label="Playable proof"
            title="Try the thesis in miniature"
          >
            <p>
              Pick a starting tile, let four societies expand, and watch early access become durable advantage. This is
              a compact digital proof of the thesis, not the full board-game simulation.
            </p>
          </SectionIntro>
          <PerspectivesPlayableProof />
        </section>

        <section id="model" className="perspectives-section">
          <SectionIntro label="The model" title="One condition changes the next">
            <p>
              Perspectives does not ask players to accept an argument before playing. It lets them observe a chain of
              causes unfolding across turns.
            </p>
          </SectionIntro>

          <ol className="perspectives-chain">
            {visibilityChain.map((item, index) => (
              <li key={item.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ol>

          <div className="perspectives-context">
            <div>
              <p className="perspectives-eyebrow">Why a game?</p>
              <h2>Play creates distance without removing consequence</h2>
            </div>
            <div className="perspectives-context-copy">
              <p>
                Conversations about inequality can quickly become abstract, defensive, or morally predetermined. A
                game gives people a shared event to examine instead.
              </p>
              <p>
                Players can point to a turn, a building, a resource, or a crisis and ask what changed. The discussion
                begins with something everyone witnessed, then moves toward the larger forces it represents.
              </p>
              <blockquote>
                The design challenge was not to explain inequity more forcefully. It was to make cause and effect
                easier to notice.
              </blockquote>
            </div>
          </div>
        </section>

        <section className="perspectives-section perspectives-system-section">
          <SectionIntro label="From theory to mechanics" title="Temporary access becomes durable power">
            <p>
              The game turns resources, buildings, protection, and crisis response into one progression model. Each
              mechanic matters because it changes what remains possible later.
            </p>
          </SectionIntro>

          <div className="perspectives-upgrade-sheet">
            <div className="min-w-[595px] bg-white">
              <UpgradeAndCostSheetV />
            </div>
          </div>

          <div className="perspectives-loop">
            {['Move', 'Extract', 'Build', 'Protect'].map((step, index) => (
              <div key={step}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{step}</strong>
              </div>
            ))}
          </div>

          <div className="perspectives-design-notes">
            <p>Scarcity narrows choices early.</p>
            <p>Structures convert resources into resilience.</p>
            <p>Protection determines who can absorb the same shock.</p>
          </div>
        </section>

        <section id="gameplay" className="perspectives-section">
          <SectionIntro label="Gameplay" title="The lesson lives inside the rules">
            <p>
              Onboarding, turn order, movement, and cards are not supporting material. They are how the model becomes
              understandable through action.
            </p>
          </SectionIntro>

          <div className="perspectives-tutorial-shell">
            <article
              className={`perspectives-tutorial-card ${
                tutorialSteps[currentStep].highlight ? 'is-highlighted' : ''
              }`}
            >
              <div className="perspectives-tutorial-content">
                <div>
                  <p className="perspectives-eyebrow">Step {currentStep + 1}</p>
                  <h3>{tutorialSteps[currentStep].title}</h3>
                  <p>{tutorialSteps[currentStep].content}</p>
                </div>
                {tutorialSteps[currentStep].image ? (
                  <img src={tutorialSteps[currentStep].image} alt="Illustrated gameplay character" />
                ) : null}
              </div>

              <div className="perspectives-tutorial-controls">
                <button
                  type="button"
                  onClick={() => setCurrentStep((value) => Math.max(0, value - 1))}
                  disabled={currentStep === 0}
                  className="perspectives-control-button"
                >
                  Previous
                </button>
                <p>
                  {currentStep + 1} / {tutorialSteps.length}
                </p>
                <button
                  type="button"
                  onClick={() => setCurrentStep((value) => Math.min(tutorialSteps.length - 1, value + 1))}
                  disabled={currentStep === tutorialSteps.length - 1}
                  className="perspectives-control-button"
                >
                  Next
                </button>
              </div>
            </article>

            <div className="perspectives-progress" aria-label="Tutorial progress">
              {tutorialSteps.map((step, index) => (
                <button
                  key={step.title}
                  type="button"
                  onClick={() => setCurrentStep(index)}
                  className={`perspectives-progress-dot ${index === currentStep ? 'is-active' : ''}`}
                  aria-label={`Go to ${step.title}`}
                  aria-pressed={index === currentStep}
                />
              ))}
            </div>
          </div>

          <div className="perspectives-cards-section">
            <div>
              <p className="perspectives-eyebrow">Cards and shocks</p>
              <h2>Equal events do not create equal consequences</h2>
              <p>
                Scenario and media cards introduce volatility. Institutions, luck, and prior advantage determine how
                much damage each player absorbs.
              </p>
            </div>

            <div className="perspectives-tab-shell">
              <div className="perspectives-tab-list" role="tablist" aria-label="Card types">
                {(['scenario', 'media', 'perk'] as CardTab[]).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === tab}
                    className={`perspectives-tab ${activeTab === tab ? 'is-active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="perspectives-card-list">
                {activeCardSet.map((card) => (
                  <article key={card.name}>
                    <h3>{card.name}</h3>
                    <p>{card.effect}</p>
                    {'defense' in card ? <span>Defense: {card.defense}</span> : null}
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="perspectives-section perspectives-video-section">
          <SectionIntro label="Thesis presentation" title="The full academic framing">
            <p>
              The presentation explains the research, design intent, and evolution of the physical board game at
              Design for Social Innovation, SVA.
            </p>
          </SectionIntro>
          <div className="perspectives-video-frame">
            <iframe
              src="https://www.youtube.com/embed/G3VoClPmiKM"
              title="Perspectives thesis presentation"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </section>

        <section id="reflection" className="perspectives-section perspectives-reflection">
          <SectionIntro label="After play" title="The board becomes evidence for a conversation">
            <p>
              Reflection connects the game state back to the choices, structures, and assumptions that produced it.
            </p>
          </SectionIntro>

          <ol>
            {reflectionQuestions.map((question, index) => (
              <li key={question}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{question}</p>
              </li>
            ))}
          </ol>

          <p className="perspectives-closing">
            Perspectives is ultimately a translation project: an attempt to turn an invisible web of relationships
            into a world people can enter, alter, and question together.
          </p>
        </section>
      </main>

      <footer className="perspectives-footer">
        <p>Perspectives / MFA Design for Social Innovation, SVA</p>
        <div>
          <a href="../#featured-work">Back to projects</a>
          <a href="../#contact">Get in touch</a>
        </div>
      </footer>
    </div>
  );
}
