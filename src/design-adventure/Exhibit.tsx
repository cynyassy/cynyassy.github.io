import { StyleAccent } from './StyleAccent';
import type { Layout, StoryDefinition } from './types';

export function Exhibit({ story, layout, active }: { story: StoryDefinition; layout: Layout; active: boolean }) {
  return (
    <div className={'da-exhibit da-exhibit--' + layout} data-testid="exhibit" data-layout={layout}>
      <div className="da-exhibit-browser" aria-hidden="true">
        <span className="da-browser-dots"><i /><i /><i /></span>
        <span>cynyassy / workshop / exhibit-001</span><span>↗</span>
      </div>
      <div className="da-exhibit-body">
        <div className="da-art" aria-hidden="true">
          <StyleAccent/>
          <svg viewBox="0 0 600 210" fill="none">
            <defs><pattern id="workshop-grid" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M30 0H0V30" className="da-svg-grid" /></pattern></defs>
            <rect width="600" height="210" fill="url(#workshop-grid)" />
            <circle cx="305" cy="108" r={active ? 80 : 64} className="da-svg-orbit" />
            <path d="M129 146L205 100L272 140L196 187Z" className="da-svg-paper" />
            <path d="M129 146V124L196 165V187M196 165L272 118V140M129 124L205 78L272 118L196 165Z" className="da-svg-box" />
            <rect x="280" y="48" width="112" height="112" rx="56" className="da-svg-seed" />
            <circle cx="317" cy="95" r="5" className="da-svg-eye" /><circle cx="351" cy="95" r="5" className="da-svg-eye" />
            <path d="M320 116Q335 128 349 115" className="da-svg-smile" />
            <path d="M396 129L440 70L485 129Z" className="da-svg-triangle" />
            <path d="M449 162H496M472 139V185M95 58H133M114 39V77" className="da-svg-detail" />
            <text x="35" y="185" className="da-svg-label">IDEA → ARTIFACT</text>
            <text x="502" y="44" className="da-svg-label">001</text>
          </svg>
        </div>
        <p className="da-eyebrow">{story.artifact.subtitle}</p>
        <h3>{story.artifact.title}</h3>
        <p className="da-artifact-description">{story.artifact.description}</p>
        <div className="da-exhibit-meta"><span>FORM / FUNCTION / FEELING</span><span>{layout.toUpperCase()}</span></div>
      </div>
    </div>
  );
}
