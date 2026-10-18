export function PumpControls({code,locked,error,submitLabel,onChange,onSubmit}:{
 code:string;locked:boolean;error:boolean;submitLabel:string;onChange:(value:string)=>void;onSubmit:()=>void;
}){
 const ready=code.length===3;
 return <div className="ix-controls ix-pump-controls">
  <div className="ix-code-machine">
   <label className="ix-code-label" htmlFor="ix-pump-code">Pump code
    <input id="ix-pump-code" className="ix-code-input" data-active={!locked&&(!ready||error)}
     aria-describedby={error?'ix-pump-clue ix-operation-feedback':'ix-pump-clue'} aria-invalid={error||undefined}
     inputMode="numeric" autoComplete="off" spellCheck={false} maxLength={3} value={code} placeholder="— — —"
     disabled={locked} onChange={e=>onChange(e.target.value)}
     onKeyDown={e=>{if(e.key==='Enter'&&ready&&!locked){e.preventDefault();onSubmit();}}}/>
   </label>
   <div className="ix-keypad" role="group" aria-label="Pump numeric keypad">
    {['1','2','3','4','5','6','7','8','9','Clear','0','Delete'].map(key=><button key={key}
     disabled={locked||(ready&&key!=='Clear'&&key!=='Delete')}
     aria-label={key==='Clear'?'Clear pump code':key==='Delete'?'Delete last digit':'Digit '+key}
     onClick={()=>onChange(key==='Clear'?'':key==='Delete'?code.slice(0,-1):code+key)}>
     {key==='Delete'?'⌫':key}
    </button>)}
   </div>
  </div>
  <div className="ix-actions ix-code-actions"><button className="ix-connect" data-active={!locked&&ready&&!error}
   disabled={locked||!ready} onClick={onSubmit}>{submitLabel} <span aria-hidden="true">↗</span></button></div>
 </div>;
}
