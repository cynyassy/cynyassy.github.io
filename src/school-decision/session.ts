import { initialState, type GameState, type Phase, type Decision } from './state';
import { rounds } from './rounds';
export const sessionKey = 'cynyassy:four-names:v2';
const phases: Phase[] = ['briefing','round-briefing','select','confirm','reports','research','debrief','chapter'];
const same = (a:number[],b:number[])=>a.length===b.length&&a.every((id,i)=>id===b[i]);
function ids(value:unknown): value is number[] { return Array.isArray(value)&&value.every(Number.isInteger)&&new Set(value).size===value.length; }
export function parseSession(raw: string | null): GameState | null {
  if (!raw) return null;
  try {
    const s = JSON.parse(raw) as GameState;
    if (!s || !phases.includes(s.phase) || !Number.isInteger(s.round) || s.round<0 || s.round>=rounds.length || !ids(s.roster) || !ids(s.selected) || s.selected.length>4 || !Array.isArray(s.history) || s.history.length>rounds.length || !Number.isInteger(s.reportIndex) || s.reportIndex<0 || s.reportIndex>3 || ![0,1].includes(s.researchIndex)) return null;
    let roster = [...initialState.roster];
    const history: Decision[] = [];
    for (let i=0;i<s.history.length;i++) {
      const d=s.history[i];
      if (!d || d.round!==i || !ids(d.selected) || d.selected.length!==4 || !d.selected.every(id=>roster.includes(id))) return null;
      history.push({round:i,selected:[...d.selected]});
      if (i<s.round) roster=[...roster.filter(id=>!d.selected.includes(id)),...rounds[i+1].intake];
    }
    if (!same(s.roster,roster) || !s.selected.every(id=>roster.includes(id))) return null;
    const committed=['reports','research','debrief'].includes(s.phase) || (s.phase==='chapter'&&history.length>0);
    if (committed) {
      if(history.length!==s.round+1 || s.selected.length!==4 || !same(s.selected,history[s.round].selected))return null;
    } else if(history.length!==s.round)return null;
    if((s.phase==='debrief'||(s.phase==='chapter'&&history.length>0))&&s.round!==rounds.length-1)return null;
    if(s.phase==='briefing'&&(s.round!==0||s.selected.length))return null;
    if(s.phase==='round-briefing'&&(s.round===0||s.selected.length))return null;
    if(s.phase==='confirm'&&s.selected.length!==4)return null;
    return {...s,history};
  } catch { return null; }
}
export function loadSession(): GameState {
  try { const raw=sessionStorage.getItem(sessionKey); const saved=parseSession(raw); return saved ? {...saved,phase:saved.phase==='confirm'?'select':saved.phase} : {...initialState,roster:[...initialState.roster]}; }
  catch { return {...initialState,roster:[...initialState.roster]}; }
}
export function saveSession(state:GameState) { try {sessionStorage.setItem(sessionKey,JSON.stringify(state));} catch { /* Memory-only play still works when storage is unavailable. */ } }
