import { puzzleDefinitions } from './reactor-puzzles';
import { reactorLessons } from './reactor-content';
import type { ReactorChoices } from './reactor-state';
import type { ThemeId } from './types';

export const learningMetadata = [
 {property:'attention',event:'A switch changed state. Its position, label and ON/OFF state connect your action to its effect.',source:0},
 {property:'feedback',event:'The digits changed before submission. You can inspect and correct an input before it affects the reactor.',source:0},
 {property:'feedback',event:'A junction changed direction immediately. Visible consequences let you explore before committing.',source:1},
 {property:'feedback',event:'The waveform and number changed together. Continuous feedback helps you make precise adjustments.',source:1},
 {property:'attention',event:'The safe band remains labelled. Emphasis attracts attention; the visible constraint explains when to act.',source:0},
 {property:'undo',event:'A valve changed state. The pressure responds over time; watch both the control and its delayed consequence.',source:2},
] as const;
export function ChoiceField({property,choices,onChange,disabled=false}:{property:keyof ReactorChoices;choices:ReactorChoices;onChange:(c:ReactorChoices)=>void;disabled?:boolean}) {
 const options={attention:[['solid','Solid primary treatment'],['outline','Outlined highlight'],['pulse','Gentle pulse']],feedback:[['generic','Generic acknowledgement'],['descriptive','Descriptive status'],['steps','Descriptive status + progress']],undo:[['generic','Undo'],['setting','Undo reactor setting'],['value','Describe restoration']]};
 return <label className="da-field">{property==='attention'?'Action treatment':property==='feedback'?'Status detail':'Recovery wording'}<select disabled={disabled} value={choices[property]} onChange={e=>onChange({...choices,[property]:e.target.value})}>{options[property].map(([value,label])=><option value={value} key={value}>{label}</option>)}</select></label>;
}
export function DesignLab({stage,mode,theme,choices,onChange,observation,onCompare,onLearn,onStyle,fault=false}:{stage:number;mode:'try'|'make';theme:ThemeId;choices:ReactorChoices;onChange:(c:ReactorChoices)=>void;observation:string;onCompare:()=>void;onLearn:()=>void;onStyle:()=>void;fault?:boolean}) {
 const d=puzzleDefinitions[stage], meta=learningMetadata[stage], property=fault?'undo':meta.property;
 return <section className="lab-panel-content" aria-label="Contextual design laboratory">
 <ChoiceField property={property} choices={choices} onChange={onChange} disabled={mode==='try'}/>
 <p className="lab-choice-effect">{mode==='try'?'Choose Make to change this treatment and see its effect.':property==='attention'?'This changes the highlighted control’s emphasis.':property==='feedback'?'Submit a setting to experience this feedback.':'This changes the recovery lever’s explanation.'}</p>
 <details className="shell-lab-more"><summary>Why this choice?</summary><h2>{fault?'Recovery should explain what will change.':d.principle}</h2><p>{d.effect}</p>{observation&&<p><strong>Notice:</strong> {observation}</p>}<p><strong>Reflect:</strong> {d.question}</p><div className="shell-extra-choices">{(['attention','feedback','undo'] as const).filter(p=>p!==property).map(p=><ChoiceField key={p} property={p} choices={choices} onChange={onChange} disabled={mode==='try'}/>)}</div><p className="da-small">{reactorLessons[meta.source].source}</p><button className="da-text-button" onClick={onLearn}>Read the source notes</button></details>
 <button className="da-button da-secondary shell-compare-action" onClick={onCompare}>Compare this puzzle ↗</button>
 </section>;
}
