import { PIPE_ROUTE } from '../reactor-puzzles';

const connections=['north and east','east and south','south and west','west and north'];
const positions=[{left:100/360*100,top:65},{left:100/360*100,top:25},{left:240/360*100,top:25}];

export function PipeControls({rotations,locked,submitLabel,onRotate,onReset,onSubmit}:{
 rotations:number[];locked:boolean;submitLabel:string;onRotate:(index:number)=>void;onReset?:()=>void;onSubmit:()=>void;
}){
 const next=rotations.findIndex((value,index)=>value!==PIPE_ROUTE[index]);
 const connected=next===-1;
 return <div className="ix-controls ix-pipe-controls">
  <p id="ix-pipe-map" className="ix-visually-hidden">The inlet enters junction 1 from the west. Junction 1 north connects to junction 2 south. Junction 2 east connects to junction 3 west. Junction 3 south leads to the chamber. Each click rotates a junction clockwise.</p>
  <div className={'ix-pipe-board '+(connected?'ix-pipe-connected':'')} role="group" aria-label="Coolant routing board" aria-describedby="ix-pipe-map">
   <svg viewBox="0 0 360 200" aria-hidden="true">
    <path className="ix-fixed-pipe" d="M16 130H100M100 130V50H240V180"/>
    <text x="16" y="107">INLET</text><text x="253" y="184">CHAMBER</text>
   </svg>
   {rotations.map((rotation,index)=><button key={index} className="ix-pipe-junction" disabled={locked}
    data-active={!locked&&index===next} aria-label={'Rotate junction '+(index+1)} aria-describedby={'ix-junction-'+index}
    style={{left:positions[index].left+'%',top:positions[index].top+'%'}} onClick={()=>onRotate(index)}>
    <svg viewBox="-28 -28 56 56" aria-hidden="true"><g transform={'rotate('+rotation*90+')'}><path d="M0 -28V0H28"/></g></svg>
    <span className="ix-junction-number" aria-hidden="true">{index+1}</span>
    <span id={'ix-junction-'+index} className="ix-visually-hidden">Connects {connections[rotation]}. Rotate clockwise.</span>
   </button>)}
  </div>
  <div className="ix-actions">
   <button className="ix-connect" data-active={!locked&&connected} disabled={locked} onClick={onSubmit}>{submitLabel}<span aria-hidden="true">↗</span></button>
   {onReset&&<button className="ix-reset" disabled={locked} onClick={onReset}>Reset junctions</button>}
  </div>
 </div>;
}
