import { useState } from 'react';
import { CustomCursor } from '../app/components/CustomCursor';
import { PerspectivesCoverArt } from './PerspectivesCoverArt';
import { PerspectivesPlayableProof } from './PerspectivesPlayableProof';
import UpgradeAndCostSheetV from './imports/UpgradeAndCostSheetV1/UpgradeAndCostSheetV1';
import womanImg from '../assets/perspectives/b57fa03efae908dc0ffc9d2d8992cf3c0e8877fc.png';
import gentlemanImg from '../assets/perspectives/040a89687a081c8922d47ce01181afc7f12d47d4.png';
import farmerImg from '../assets/perspectives/d7eee63e5d931ab5ac6b52272cadaf9a9cf4e474.png';
import kingImg from '../assets/perspectives/fd62593ed3a99dc48c1587c439fc5a0ee82e8ff2.png';

type CardTab = 'scenario' | 'media' | 'perk';

const projectTags = ['Systems Design', 'Game Design', 'Research'];

const heroMeta = [
  { label: 'Format', value: 'Speculative board game' },
  { label: 'Focus', value: 'Privilege, power, inequity' },
  { label: 'Built Through', value: 'Research, prototyping, playtesting' },
];

const approachPillars = [
  {
    title: 'Systems as mechanics',
    description:
      'I translated abstract social theory into rules, constraints, and progression loops so power becomes visible through play.',
  },
  {
    title: 'Safe exploration',
    description:
      'The game creates enough distance for players to examine inequity without feeling immediately accused or cornered.',
  },
  {
    title: 'Iterative design',
    description:
      'Playtesting helped me tune emotional friction, pacing, and clarity so the lesson stayed legible without collapsing the game.',
  },
];

const tutorialSteps = [
  {
    title: "You're probably wondering...",
    content:
      'How do you play this? What does it all mean? This walkthrough makes the system legible before the actual gameplay begins.',
    image: farmerImg,
  },
  {
    title: 'Step 1: Set up the board',
    content:
      'Players begin with the base tile layout, while advanced players can rearrange the terrain to create different strategic conditions.',
  },
  {
    title: 'Step 2: Who goes first?',
    content:
      'The game immediately introduces asymmetry and discomfort, framing order-of-play as part of the larger critique of systemic inequality.',
    image: womanImg,
    highlight: true,
  },
  {
    title: 'Step 3: Choose your representative',
    content:
      'Players select a representative and place them near the resources that will define their early opportunities.',
    image: gentlemanImg,
  },
  {
    title: 'Step 4: Define your culture',
    content:
      'Before expanding, players articulate identity, language, rituals, and origin. The game makes culture part of what is at stake when power consolidates.',
    image: kingImg,
  },
  {
    title: 'Resource acquisition',
    content:
      'Players gather resources from surrounding tiles, but each turn limits what they can take. Scarcity shapes strategy from the beginning.',
  },
  {
    title: 'Movement rules',
    content:
      'Positioning matters. Citizens move across intersections and spacing rules determine who can expand, block, or access future opportunities.',
  },
  {
    title: 'Capturing tiles',
    content:
      'Structures convert territory into long-term advantage. Once claimed, tiles become engines for compounding growth.',
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
  { name: 'Emergency Services', effect: 'Immune to one scenario card' },
  { name: 'Lucky Break', effect: 'Draw an additional resource card during your turn' },
  { name: 'Master Trader', effect: 'Initiate a trade with any player at any time' },
  { name: 'Resourceful', effect: 'Extract two additional resources during your turn' },
  { name: 'Wild Card', effect: 'Draw a scenario, media, or perk card of your choice' },
];

const impactPoints = [
  {
    title: 'Made systems visible',
    description:
      'The game gave players a concrete way to see how privilege compounds across turns, territories, and generations.',
  },
  {
    title: 'Sparked dialogue',
    description:
      'The format opened up harder conversations by moving the discussion from accusation to shared observation.',
  },
  {
    title: 'Demonstrated complexity',
    description:
      'The board, cards, and progression loops showed how “fair” systems can still produce uneven outcomes when starting conditions are unequal.',
  },
  {
    title: 'Informed practice',
    description:
      'It became a useful facilitation artifact for educators and intervention designers thinking about power, access, and structural bias.',
  },
];

const reflectionQuestions = [
  'What story unfolded in front of you as the game progressed?',
  'Who won, and who ended up controlling the centers of power?',
  'What culture advanced most visibly, and why?',
  'Does that mean one culture is better than another?',
  'Who held the most power in the game, and who held the least?',
  'How did privilege shape the outcome?',
  'How did structures and systems reinforce inequity?',
  'How did stereotypes and bias influence the game state?',
];

const whatThisShows = [
  {
    title: 'Systems thinking',
    description: 'Mapping complex social structures and turning them into interactive models that reveal hidden dynamics.',
  },
  {
    title: 'Translation of complexity',
    description: 'Converting abstract ideas of privilege and power into mechanics that can be experienced directly.',
  },
  {
    title: 'Iterative design',
    description: 'Balancing educational depth with engagement through testing, critique, and refinement.',
  },
  {
    title: 'Cross-disciplinary execution',
    description: 'Bringing together sociology, game design, systems practice, and facilitation into one coherent artifact.',
  },
];

function SectionHeader({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <header className="space-y-4">
      {eyebrow ? <p className="perspectives-eyebrow">{eyebrow}</p> : null}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.05em] text-[#222]">{title}</h2>
      {description ? <p className="max-w-3xl text-lg leading-relaxed text-[#545454]">{description}</p> : null}
    </header>
  );
}

function ProblemPanel() {
  return (
    <div className="perspectives-problem-panel" aria-label="Static framing panel about unequal systems">
      <div className="perspectives-problem-panel__header">
        <span>Starting conditions</span>
        <span>Invisible systems</span>
        <span>Outcomes</span>
      </div>
      <div className="perspectives-problem-panel__body">
        <div className="perspectives-problem-node">
          <p className="perspectives-problem-node__title">Access</p>
          <p>Land, health, education, trade</p>
        </div>
        <div className="perspectives-problem-flow">
          <span />
          <span />
          <span />
        </div>
        <div className="perspectives-problem-node perspectives-problem-node--accent">
          <p className="perspectives-problem-node__title">Institutions</p>
          <p>Laws, myths, protections, gatekeeping</p>
        </div>
        <div className="perspectives-problem-flow">
          <span />
          <span />
          <span />
        </div>
        <div className="perspectives-problem-node">
          <p className="perspectives-problem-node__title">Advantage</p>
          <p>Compounding wealth, safety, power</p>
        </div>
      </div>
    </div>
  );
}

function SystemsMapPanel() {
  return (
    <div className="perspectives-map-panel" aria-label="Static systems map placeholder">
      <div className="perspectives-map-row">
        <div className="perspectives-map-box">Resources</div>
        <div className="perspectives-map-box">Buildings</div>
        <div className="perspectives-map-box">Protection</div>
      </div>
      <div className="perspectives-map-links">
        <span />
        <span />
      </div>
      <div className="perspectives-map-row perspectives-map-row--single">
        <div className="perspectives-map-box perspectives-map-box--accent">Intergenerational advantage</div>
      </div>
    </div>
  );
}

function MechanicsPanel() {
  return (
    <div className="perspectives-mechanics-panel" aria-label="Static mechanics breakdown panel">
      <div className="perspectives-mechanics-track">
        <div>Move</div>
        <div>Extract</div>
        <div>Build</div>
        <div>Protect</div>
      </div>
      <div className="perspectives-mechanics-notes">
        <p>Scarcity limits options early.</p>
        <p>Structures convert luck into durable advantage.</p>
        <p>Protection changes who can absorb shocks.</p>
      </div>
    </div>
  );
}

export default function PerspectivesPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [activeTab, setActiveTab] = useState<CardTab>('scenario');

  const activeCardSet =
    activeTab === 'scenario' ? scenarioCards : activeTab === 'media' ? mediaCards : perkCards;

  return (
    <div className="min-h-screen bg-white text-black perspectives-page">
      <CustomCursor />
      <a href="#main-content" className="perspectives-skip-link">
        Skip to content
      </a>

      <header className="perspectives-topbar">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
          <a href="../#featured-work" className="text-xl font-semibold tracking-[-0.03em] hover:text-[#FF4400] transition-colors">
            Cynyassy
          </a>
          <nav aria-label="Perspectives sections" className="hidden lg:flex items-center gap-6 text-sm uppercase tracking-[0.18em]">
            <a href="#playable-proof" className="perspectives-nav-link">Playable Proof</a>
            <a href="#context" className="perspectives-nav-link">Context</a>
            <a href="#system-design" className="perspectives-nav-link">System</a>
            <a href="#gameplay" className="perspectives-nav-link">Gameplay</a>
            <a href="#impact" className="perspectives-nav-link">Impact</a>
          </nav>
          <a href="../#featured-work" className="perspectives-back-link">
            Back to Projects
          </a>
        </div>
      </header>

      <main id="main-content" className="pt-24">
        <section className="px-6 py-14 md:py-20 border-b border-black" id="hero">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="perspectives-hero-grid">
              <div className="space-y-8">
                <div className="space-y-6">
                  <p className="perspectives-eyebrow">Case Study</p>
                  <div className="space-y-4">
                    <h1 className="text-6xl md:text-8xl lg:text-[4.5rem] font-semibold leading-[0.98] tracking-[-0.07em] inline-block relative text-[#171717]">
                      A board game about how systems create inequality
                      <span aria-hidden="true" className="absolute left-0 bottom-2 h-3 md:h-4 w-full bg-[#ffdf00] -z-10" />
                    </h1>
                    <p className="max-w-3xl text-xl md:text-1xl leading-relaxed text-[#3d3d3d]">
                      Perspectives is a thesis project that turns privilege, access, and institutional power into something players can experience through rules, geography, and compounding outcomes.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {projectTags.map((tag) => (
                    <span key={tag} className="perspectives-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <dl className="perspectives-hero-meta">
                  {heroMeta.map((item) => (
                    <div key={item.label} className="perspectives-hero-meta__item">
                      <dt>{item.label}</dt>
                      <dd>{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="space-y-4">
                <figure className="perspectives-cover-shell">
                  <div className="perspectives-cover-stage">
                    <PerspectivesCoverArt className="h-full shadow-none border-0" />
                  </div>
                  <figcaption className="sr-only">
                    Poster-style cover composition for Perspectives with the project title and illustrated characters.
                  </figcaption>
                </figure>

                <div className="perspectives-hero-caption">
                  <p>Hero artwork adapted from the original Figma Make export and re-framed as a cleaner editorial cover for the case study.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-20 border-b border-black bg-[#fbfbfb]" id="playable-proof">
          <div className="max-w-7xl mx-auto space-y-10">
            <SectionHeader
              eyebrow="Playable Proof"
              title="A compact explorable sits at the top of the case study"
              description="This is the first playable digital proof, not the full simulation. It captures the core thesis in a lightweight canvas model, while the deeper design process and supporting artifacts continue below."
            />
            <PerspectivesPlayableProof />
          </div>
        </section>

        <section className="px-6 py-20 border-b border-black bg-white" id="thesis-presentation">
          <div className="max-w-6xl mx-auto space-y-6">
            <SectionHeader
              eyebrow="Thesis Presentation"
              title="Thesis Presentation at DSI, SVA"
              description="This video captures how I framed the game academically: a board game that functions as a systems artifact for starting conversations around exploring privilege, access, and structural inequity."
            />

            <div className="perspectives-video-shell">
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
            </div>
          </div>
        </section>

        <section className="px-6 py-20 border-b border-black" id="context">
          <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[1.3fr_0.7fr] items-start">
            <div className="space-y-6">
              <SectionHeader
                eyebrow="Context"
                title="Making invisible systems visible"
                description="Systems shape who gets ahead and who gets left behind. This project turns those structures into something players can experience, question, and discuss together."
              />
              <div className="space-y-5 text-lg leading-relaxed text-[#333] max-w-3xl">
                <p>
                  Perspectives began as a thesis project about how inequality becomes normalized through institutions, geography, and accumulated advantage.
                </p>
                <p>
                  Rather than explaining those dynamics only through writing, I built a game that lets players feel how access, scarcity, and protection stack over time.
                </p>
                <p>
                  The result is a case study in translating systems thinking into an artifact that is teachable, discussable, and emotionally legible.
                </p>
              </div>
            </div>

            <aside className="perspectives-side-panel">
              <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[#222]">Project framing</h3>
              <ul className="space-y-4 text-base leading-relaxed text-[#454545]">
                <li><strong>Format:</strong> Board game prototype</li>
                <li><strong>Focus:</strong> Privilege, power, and systems</li>
                <li><strong>Role:</strong> Research, game design, interaction framing</li>
              </ul>
            </aside>
          </div>
        </section>

        <section className="px-6 py-20 border-b border-black" id="problem">
          <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[1fr_0.85fr] items-start">
            <div className="space-y-8">
              <SectionHeader eyebrow="Problem" title="How do you create reflection without shutting people down?" />
              <div className="space-y-5 max-w-3xl text-lg leading-relaxed text-[#333]">
                <p>
                  Inequity persists across education, healthcare, and wealth distribution, but conversations about those systems often become abstract, defensive, or emotionally stuck.
                </p>
                <p>
                  I wanted to build a format that could hold complexity while still inviting participation. The challenge was to make structural advantage understandable without flattening it into a lecture.
                </p>
                <p>
                  Perspectives answers that by moving the conversation into a playable system, where compounding advantage is experienced rather than simply asserted.
                </p>
              </div>
            </div>

            <aside className="perspectives-diagram-placeholder">
              <h3 className="perspectives-placeholder-title">Problem framing panel</h3>
              <p>This static panel sketches the design logic behind the game: unequal access feeds institutions, and institutions shape outcomes.</p>
              <ProblemPanel />
            </aside>
          </div>
        </section>

        <section className="px-6 py-20 border-b border-black bg-[#fbfbfb]" id="approach">
          <div className="max-w-6xl mx-auto space-y-12">
            <SectionHeader eyebrow="How I approached this" title="From abstract theory to playable systems" />
            <div className="grid gap-6 md:grid-cols-3">
              {approachPillars.map((pillar) => (
                <article key={pillar.title} className="perspectives-pillar-card">
                  <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[#222]">{pillar.title}</h3>
                  <p className="text-base leading-relaxed text-[#4d4d4d]">{pillar.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20 border-b border-black" id="system-design">
          <div className="max-w-6xl mx-auto space-y-12">
            <SectionHeader
              eyebrow="System Design"
              title="Progression, protection, and compounding power"
                description="The game simulates intergenerational privilege through progression tiers, building unlocks, and asymmetric resilience. Education, healthcare, and industry become mechanics that shape long-term outcomes."
            />

            <div className="perspectives-upgrade-sheet">
              <div className="min-w-[595px] bg-white">
                <UpgradeAndCostSheetV />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <article className="perspectives-diagram-placeholder">
                <h3 className="perspectives-placeholder-title">Flow diagram</h3>
                <p>A static systems map showing how resource access leads to buildings, buildings create protection, and protection compounds over time.</p>
                <SystemsMapPanel />
              </article>
              <article className="perspectives-diagram-placeholder">
                <h3 className="perspectives-placeholder-title">Mechanics breakdown</h3>
                <p>A static editorial panel summarizing the loop players feel: move, extract, build, protect, repeat.</p>
                <MechanicsPanel />
              </article>
            </div>
          </div>
        </section>

        <section className="px-6 py-20 border-b border-black bg-white" id="gameplay">
          <div className="max-w-6xl mx-auto space-y-12">
            <SectionHeader
              eyebrow="How to Play / Gameplay"
              title="A turn-by-turn explanation area"
              description="This walkthrough remains intentionally present in the case study because the onboarding itself is part of the design."
            />

            <div className="perspectives-tutorial-shell">
              <article className={`perspectives-tutorial-card ${tutorialSteps[currentStep].highlight ? 'is-highlighted' : ''}`}>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
                  <div className="space-y-4 flex-1">
                    <p className="perspectives-eyebrow">Step {currentStep + 1}</p>
                    <h3 className="text-3xl md:text-4xl font-semibold tracking-[-0.04em] text-[#222]">{tutorialSteps[currentStep].title}</h3>
                    <p className="text-lg leading-relaxed text-[#333]">{tutorialSteps[currentStep].content}</p>
                  </div>
                  {tutorialSteps[currentStep].image ? (
                    <img
                      src={tutorialSteps[currentStep].image}
                      alt="Illustrated gameplay character"
                      className="w-28 h-28 md:w-32 md:h-32 object-contain shrink-0"
                    />
                  ) : null}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t-2 border-black">
                  <button
                    type="button"
                    onClick={() => setCurrentStep((value) => Math.max(0, value - 1))}
                    disabled={currentStep === 0}
                    className="perspectives-control-button"
                  >
                    Previous
                  </button>
                  <p className="text-sm font-semibold tracking-[0.18em] uppercase text-[#5b5b5b]">
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

              <div className="flex gap-2" aria-label="Tutorial progress">
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

          </div>
        </section>

        <section className="px-6 py-20 border-b border-black bg-[#fbfbfb]" id="rules-components">
          <div className="max-w-6xl mx-auto space-y-12">
            <SectionHeader
              eyebrow="Rules / Cards / Components"
              title="Where the critique lives in the rules"
              description="Cards introduce volatility and expose how protection, education, and luck interact with structural advantage."
            />

            <div className="perspectives-tab-shell">
              <div className="perspectives-tab-list" role="tablist" aria-label="Card types">
                <button type="button" role="tab" aria-selected={activeTab === 'scenario'} className={`perspectives-tab ${activeTab === 'scenario' ? 'is-active' : ''}`} onClick={() => setActiveTab('scenario')}>
                  Scenario
                </button>
                <button type="button" role="tab" aria-selected={activeTab === 'media'} className={`perspectives-tab ${activeTab === 'media' ? 'is-active' : ''}`} onClick={() => setActiveTab('media')}>
                  Media
                </button>
                <button type="button" role="tab" aria-selected={activeTab === 'perk'} className={`perspectives-tab ${activeTab === 'perk' ? 'is-active' : ''}`} onClick={() => setActiveTab('perk')}>
                  Perk
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {activeCardSet.map((card) => (
                  <article key={card.name} className="perspectives-card-entry">
                    <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[#222]">{card.name}</h3>
                    <p className="text-base leading-relaxed text-[#444]">{card.effect}</p>
                    {'defense' in card ? (
                      <p className="text-sm uppercase tracking-[0.12em] text-[#666]">Defense: {card.defense}</p>
                    ) : null}
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-20 border-b border-black bg-[#fbfbfb]" id="impact">
          <div className="max-w-6xl mx-auto space-y-12">
            <SectionHeader
              eyebrow="Impact"
              title="What the project made possible"
              description="The strongest effect of the work was not a single metric, but the kind of reflection and dialogue it made possible."
            />

            <div className="grid gap-6 md:grid-cols-2">
              {impactPoints.map((point) => (
                <article key={point.title} className="perspectives-impact-item">
                  <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[#222]">{point.title}</h3>
                  <p className="text-base leading-relaxed text-[#444]">{point.description}</p>
                </article>
              ))}
            </div>

            <div className="perspectives-reflection-block">
              <h3 className="text-3xl md:text-4xl font-semibold tracking-[-0.04em] text-[#222]">Post-game reflection prompts</h3>
              <p className="text-lg leading-relaxed text-[#3e3e3e]">
                These facilitator prompts help players connect their experience back to power, identity, and real-world systems.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                {reflectionQuestions.map((question, index) => (
                  <article key={question} className="perspectives-question-card">
                    <span className="perspectives-question-index">{index + 1}</span>
                    <p className="text-base leading-relaxed text-[#333]">{question}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-20 border-b border-black" id="reflection">
          <div className="max-w-6xl mx-auto space-y-12">
            <SectionHeader
              eyebrow="Reflection / What this shows"
              title="The project demonstrates more than one artifact"
              description="It shows how research, systems thinking, facilitation, and design can converge into a single learning experience."
            />
            <div className="grid gap-6 md:grid-cols-2">
              {whatThisShows.map((item) => (
                <article key={item.title} className="perspectives-what-card">
                  <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[#222]">{item.title}</h3>
                  <p className="text-base leading-relaxed text-[#444]">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="px-6 py-16 bg-black text-white">
        <div className="max-w-6xl mx-auto flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3 max-w-2xl">
            <p className="text-3xl md:text-4xl font-semibold tracking-[-0.04em] text-[#ffdf00]">Back to the portfolio</p>
            <p className="text-base leading-relaxed text-white/75">
              Perspectives now includes a lightweight playable proof in-page, with the fuller simulation work linked out for deeper exploration.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 md:items-end">
            <a href="../#featured-work" className="perspectives-footer-link">Back to Projects</a>
            <a href="../#contact" className="perspectives-footer-link">Get in touch</a>
            <p className="text-sm text-white/50">© 2026 Shashank Sharma / Cynyassy</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
