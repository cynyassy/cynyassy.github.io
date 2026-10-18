import type { StoryId, ThemeId } from './types';
import './RunReflection.css';

export function RunReflection({story,theme,completed,recovered}:{story:StoryId;theme:ThemeId;completed:number;recovered:boolean}) {
 const reactor = story === 'reactor';
 return <section className="run-reflection" aria-label="What did you notice?">
  <h3>What did you notice?</h3>
  <ul>
   <li><strong>Finding the next step.</strong> {reactor?'An outline gave one control more emphasis. That’s visual hierarchy.':'Start preview and Inspect exhibit had different roles. Their emphasis affects which you notice first. That’s visual hierarchy.'}</li>
   {completed>0&&<li><strong>Knowing what happened.</strong> {reactor?'The command was acknowledged before its windows lit up. That’s feedback: received, working, then done.':'The preview showed when it was working and when it was ready. That’s feedback: received, working, then done.'}</li>}
   <li><strong>Trying again.</strong> {recovered?(reactor?'You restored a setting without losing the sections already online. That’s recovery.':'You undid a layout change without resetting the other lessons. That’s recovery.'):'You didn’t use recovery this run. Try it in practice to see how restoring a setting helps you continue.'}</li>
  </ul>
  <p>What helped you work out what to do next?</p>
  <a href={'style-studio.html?theme='+theme} target="_blank" rel="noopener noreferrer">Remix a style or build a shortlist ↗</a>
 </section>;
}
