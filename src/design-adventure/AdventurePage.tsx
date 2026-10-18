import { AdventureShell } from './AdventureShell';
import type { SharedStoryPresentation } from './AdventureShell';
import { useEffect, useReducer, useRef, useState } from 'react';
import { ArrowRight, Check, Copy, Lightbulb, Undo2 } from 'lucide-react';
import { lessons, stories } from './content';
import { Exhibit } from './Exhibit';
import { RunReflection } from './RunReflection';
import { createShareURL, sharedInitialState } from './share';
import { isBuilding, reducer, referenceChoices } from './state';
import type { Layout } from './types';

export default function AdventurePage({ active = true, onStoryChange, search,theme:sharedTheme,onThemeChange }: { active?: boolean; search?: string } & SharedStoryPresentation) {
  const [state, dispatch] = useReducer(reducer, undefined, () => sharedInitialState(search ?? window.location.search));
  const [drawer,setDrawer]=useState<'learn'|'share'|null>(null);
  const dialog=useRef<HTMLDialogElement>(null);
  useEffect(()=>{if(drawer&&!dialog.current?.open)dialog.current?.showModal();if(!drawer&&dialog.current?.open)dialog.current.close();},[drawer]);
  useEffect(()=>{dispatch({type:'theme',value:sharedTheme});},[sharedTheme]);
  const [shareMessage, setShareMessage] = useState('');
  const [fallbackURL, setFallbackURL] = useState('');
  const shareInput = useRef<HTMLInputElement>(null);
  const story = stories[state.story];
  const lesson = lessons.find(item => item.id === state.lesson)!;
  const choices = state.mode === 'try' ? referenceChoices : state.choices;
  const pending = isBuilding(state.build.phase);
  const done = state.completed.includes(state.lesson);
  const allDone = state.completed.length === lessons.length;
  const undoTarget = state.history[state.history.length - 1];
  const undoLabel = choices.undo === 'generic' ? 'Undo' : choices.undo === 'setting' ? 'Undo layout change'
    : undoTarget ? 'Restore ' + undoTarget + ' layout' : 'Undo layout change';

  useEffect(() => {
    if (state.lesson !== 'feedback' || !isBuilding(state.build.phase)) return;
    const runId = state.build.runId;
    const timers = ([1, 2, 3] as const).map(step => window.setTimeout(() => dispatch({ type: 'tick', runId, step }), step * 1000));
    return () => timers.forEach(window.clearTimeout);
    // A run retains its original schedule when its visual presentation changes.
  }, [state.build.runId, state.lesson]);

  useEffect(() => {
    if (fallbackURL) { shareInput.current?.focus(); shareInput.current?.select(); }
  }, [fallbackURL]);

  useEffect(() => { if (!active && pending) dispatch({ type: 'replay' }); }, [active, pending]);

  async function share() {
    const url = createShareURL(window.location.href, state);
    setFallbackURL('');
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(url);
      setShareMessage('Link copied. It opens this setup with a fresh lesson.');
    } catch {
      setFallbackURL(url);
      setShareMessage('Copy the link below. It opens this setup with a fresh lesson.');
    }
  }

  const progress = state.build.phase === 'done' ? 3 : state.build.phase === 'finishing' ? 2
    : state.build.phase === 'rendering' || state.build.phase === 'interrupted' ? 1 : 0;
  const status = state.build.phase === 'ready' ? 'Ready to build'
    : state.build.phase === 'done' ? story.messages.done
    : state.build.phase === 'interrupted' ? story.messages.interrupted
    : choices.feedback === 'generic' ? 'Working…'
    : state.build.phase === 'preparing' ? story.messages.preparing
    : state.build.phase === 'rendering' ? story.messages.rendering : story.messages.finishing;
  const hintTarget = state.lesson === 'action' ? 'Start preview'
    : state.lesson === 'feedback' ? state.build.phase === 'interrupted' ? 'Retry preview' : 'Build preview'
    : state.history.length ? undoLabel : state.layout === 'spacious' ? 'Compact layout' : 'Spacious layout';

  return (
    <div className="da-page da-workshop-page adventure-shell" data-story="workshop" data-theme={sharedTheme}>
      <AdventureShell story="workshop" theme={sharedTheme} onThemeChange={onThemeChange} onStoryChange={onStoryChange} onLearn={()=>setDrawer('learn')} onReplay={()=>dispatch({type:'replay'})} onShare={()=>setDrawer('share')}>
        <nav className="da-lessons" aria-label="Lessons">
          {lessons.map(item => (
            <button type="button" key={item.id} aria-current={state.lesson === item.id ? 'step' : undefined} onClick={() => dispatch({ type: 'lesson', value: item.id })}>
              <span className="da-lesson-number">{state.completed.includes(item.id) ? <Check size={17} aria-hidden="true" /> : item.number}</span>
              <span>{item.title}{state.completed.includes(item.id) && <span className="da-sr-only"> — completed</span>}</span>
              <ArrowRight size={16} className="da-lesson-arrow" aria-hidden="true" />
            </button>
          ))}
        </nav>
        {state.notice && <p className="da-notice" role="status">{state.notice}</p>}

        <div className="shell-workspace" data-mode="try">
          <section className="da-stage shell-artifact" aria-labelledby="stage-heading">
            <div className="da-stage-heading"><div><p className="da-eyebrow">LESSON {lesson.number} / INTERACTION</p><h2 id="stage-heading">Your exhibit.</h2></div><span className="da-live-label"><span className="da-dot" /> {done ? 'TRIED' : 'IN PROGRESS'}</span></div>
            <p className="da-task">{lesson.task}</p>
            <Exhibit story={story} layout={state.layout} active={state.opened || state.build.phase === 'done'} />
            <div className="da-stage-actions">
              {state.lesson === 'action' && <>
                <div className="da-action-pair">
                  <button type="button" className={'da-button ' + (choices.emphasis !== 'inspect' ? 'da-primary' : 'da-secondary') + (state.hint && !done ? ' da-hinted' : '')} onClick={() => dispatch({ type: 'open' })}>{state.opened ? <Check size={17} /> : <ArrowRight size={17} />} {story.labels.preview}</button>
                  <button type="button" className={'da-button ' + (choices.emphasis !== 'preview' ? 'da-primary' : 'da-secondary')} aria-expanded={state.inspecting} onClick={() => dispatch({ type: 'inspect' })}>{story.labels.inspect}</button>
                </div>
                <p className="da-operation-status" role="status">{state.opened ? 'The preview is open. Take a look around.' : 'The preview is closed. Choose an action to get started.'}</p>
                {state.inspecting && <div className="da-inspection">This is an original, lightweight exhibit made from SVG and text. Its layout and visual style can change while its purpose stays the same.</div>}
              </>}
              {state.lesson === 'feedback' && <>
                <div className="da-action-pair">
                  <button type="button" disabled={pending || state.build.phase === 'done'} className={'da-button da-primary' + (state.hint && !pending && !done ? ' da-hinted' : '')} onClick={() => dispatch({ type: 'start-build' })}>{state.build.phase === 'interrupted' ? 'Retry preview' : story.labels.build}<ArrowRight size={17} /></button>
                  <button type="button" className="da-button da-secondary" disabled={pending || state.build.phase === 'done'} onClick={() => dispatch({ type: 'start-build', interrupt: true })}>Try an interruption</button>
                </div>
                <div className={'da-build-status' + (state.build.phase === 'interrupted' ? ' da-build-error' : '')}>
                  <span className={'da-status-dot' + (pending ? ' da-status-dot--active' : '')} aria-hidden="true" />
                  <p role="status" aria-live="polite" aria-atomic="true" data-testid="build-status">{status}</p>
                </div>
                {choices.feedback === 'steps' && <div className="da-progress"><progress aria-label="Preview build progress" value={progress} max={3} /><span>{progress} of 3 stages complete</span></div>}
                <p className="da-small">A three-second simulation. No files are uploaded or published.</p>
              </>}
              {state.lesson === 'recovery' && <>
                <div className="da-layout-row"><div className="da-layout-group" role="group" aria-label="Exhibit layout">
                  {(['spacious', 'compact'] as Layout[]).map(value => <button type="button" key={value} className={'da-button ' + (state.layout === value ? 'da-primary' : 'da-secondary') + (state.hint && !state.history.length && value !== state.layout ? ' da-hinted' : '')} aria-pressed={state.layout === value} onClick={() => dispatch({ type: 'layout', value })}>{value === 'spacious' ? 'Spacious layout' : 'Compact layout'}</button>)}
                </div>
                <button type="button" disabled={!state.history.length} className={'da-button da-secondary' + (state.hint && state.history.length ? ' da-hinted' : '')} onClick={() => dispatch({ type: 'undo' })}><Undo2 size={16} />{undoLabel}</button></div>
                <p className="da-small">{state.history.length ? state.history.length + ' layout change' + (state.history.length === 1 ? '' : 's') + '. Undo restores the previous layout.' : 'Nothing to undo yet. Try another layout first.'}</p>
              </>}
            </div>
            <div className="da-stage-bottom">
              <button type="button" className="da-text-button" onClick={() => dispatch({ type: 'hint' })} aria-pressed={state.hint}><Lightbulb size={15} /> {state.hint ? 'Hide hint' : 'Hint'}</button>

            </div>
            {state.hint && <p className="da-hint-note" role="status">{done ? 'You have tried this lesson. Replay it or compare a different style.' : pending ? 'Watch the build status; the simulation is running.' : 'Try “' + hintTarget + '”. Notice how its treatment helps you find it.'}</p>}
            {done && <div className="da-completion" data-testid="lesson-completion"><Check size={19} /><div><strong>{allDone ? 'You’ve tried all three interactions.' : 'You’ve tried this interaction.'}</strong><p>{allDone ? 'Try another style, or share this setup.' : 'Switch a style or move to another lesson.'}</p></div></div>}
            {allDone&&<RunReflection story="workshop" theme={sharedTheme} completed={state.completed.length} recovered={state.completed.includes('recovery')}/>}
          </section>


        </div>

      </AdventureShell>
      <dialog ref={dialog} className="rx-dialog shell-dialog" onCancel={()=>setDrawer(null)} onClose={()=>setDrawer(null)} aria-labelledby="workshop-panel-heading"><div className="rx-dialog-top"><h2 id="workshop-panel-heading">{drawer==='learn'?'Why it works':'Share this setup'}</h2><button className="da-text-button" onClick={()=>setDrawer(null)}>Close panel</button></div>
      {drawer==='learn'&&<><h3>{lesson.principle}</h3><p>{lesson.explanation}</p><h4>In this experiment</h4><p>{lesson.adaptation}</p><p>{lesson.source}</p><p>{lesson.makingSource}</p><p><strong>Reflect:</strong> {lesson.question}</p><p>These are our adaptations, not findings from a visitor study.</p></>}
      {drawer==='share'&&<section className="shell-share"><p>This link includes the style, lesson and your design choices. It opens a fresh task.</p>
          <button type="button" className="da-button da-primary" onClick={share}><Copy size={16} /> Copy link</button>
          {shareMessage && <p role="status" className="da-share-message">{shareMessage}</p>}
          {fallbackURL && <label className="da-share-fallback" htmlFor="shared-design-url">Your design link<input id="shared-design-url" ref={shareInput} readOnly value={fallbackURL} onFocus={e => e.currentTarget.select()} /></label>}
        </section>}
      </dialog>
    </div>
  );
}
