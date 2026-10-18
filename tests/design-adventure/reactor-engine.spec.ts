import { test, expect } from '@playwright/test';
import { initialReactor, reactorReducer as reduce } from '../../src/design-adventure/reactor-state';
import type { ReactorState } from '../../src/design-adventure/reactor-state';
import { initialPuzzles, inputPuzzle, puzzleSolved, tickPuzzle, ignitionCharge } from '../../src/design-adventure/reactor-puzzles';
import { initialStory, parseReactor, reactorShareURL } from '../../src/design-adventure/reactor-share';
function input(s:ReactorState, value:any, now:number){return reduce(s,{type:'input',stage:s.step,input:value,now});}
function solve(s:ReactorState, now:number):{state:ReactorState;now:number}{
 switch(s.step){
  case 0: for(const index of [1,0,2])s=input(s,{kind:'switch',index},now);break;
  case 1:s=input(s,{kind:'code',value:'427'},now);break;
  case 2:for(const [index,count] of [3,1,2].entries())for(let n=0;n<count;n++)s=input(s,{kind:'pipe',index},now);break;
  case 3:s=input(s,{kind:'frequency',value:62},now);break;
  case 4:s=input(s,{kind:'timing-mode',manual:true},now);s=input(s,{kind:'charge',value:75},now);break;
  case 5:s=input(s,{kind:'inlet'},now);now+=1000;s=reduce(s,{type:'tick',runId:s.runId,now});s=input(s,{kind:'inlet'},now);now+=2000;s=reduce(s,{type:'tick',runId:s.runId,now});break;
 }
 s=reduce(s,{type:'commit',stage:s.step,now});expect(s.operation).not.toBeNull();
 now+=1500;s=reduce(s,{type:'tick',runId:s.runId,now});return {state:s,now};
}
test('all six solved mechanisms illuminate the reactor and stop the countdown',()=>{
 let s=reduce(initialReactor(),{type:'start',session:'mission',now:0});let now=0;
 for(let i=0;i<6;i++){const r=solve(s,now);s=r.state;now=r.now;expect(s.step).toBe(i+1);}
 expect(s.phase).toBe('success');expect(s.remaining).toBe(48000);
 expect(reduce(s,{type:'tick',runId:s.runId,now:100000})).toEqual(s);
});
test('physical recovery restores edited values while retaining confirmed stages',()=>{
 let s=reduce(initialReactor(),{type:'start',session:'mission',now:0});const r=solve(s,0);s=input(r.state,{kind:'code',value:'999'},r.now);
 s=reduce(s,{type:'commit',stage:1,now:r.now});expect(s.fault).not.toBeNull();
 s=reduce(s,{type:'restore',now:r.now});expect(s.puzzles.code).toBe('');expect(s.puzzles.switches).toEqual([1,0,2]);expect(s.step).toBe(1);expect(s.recoveryUsed).toBe(true);
 s=input(s,{kind:'code',value:'999'},r.now);s=reduce(s,{type:'commit',stage:1,now:r.now});expect(s.phase).toBe('failure');
});
test('practice errors are informative; scripted training fault restores a connected route',()=>{
 let s=reduce(initialReactor(),{type:'start',session:'practice',now:0});let now=0;
 s=reduce(s,{type:'commit',stage:0,now:0});expect(s.fault).toBeNull();expect(s.message).toContain('Practice check');
 for(let i=0;i<3;i++){const r=solve(s,now);s=r.state;now=r.now;}
 expect(s.fault?.training).toBe(true);expect(s.puzzles.pipes).toEqual([3,1,3]);
 s=reduce(s,{type:'restore',now:100000});expect(s.puzzles.pipes).toEqual([3,1,2]);expect(s.remaining).toBe(60000);expect(s.step).toBe(3);
});
test('pause holds the operation, arcade meter and countdown; callbacks are invalidated',()=>{
 let s=reduce(initialReactor(),{type:'start',session:'mission',now:0});s={...s,step:4};
 s=reduce(s,{type:'pause',now:500});const paused=s;const run=s.runId;
 expect(reduce(s,{type:'tick',runId:run,now:100000})).toEqual(paused);
 s=reduce(s,{type:'resume',now:100000});s=reduce(s,{type:'tick',runId:s.runId,now:101000});
 expect(s.puzzles.ignitionElapsed).toBe(1500);expect(s.remaining).toBe(58500);
 expect(reduce(s,{type:'tick',runId:run-1,now:200000})).toEqual(s);
});
test('deadline wins over a valid puzzle submission or a finishing operation',()=>{
 let s=reduce(initialReactor(),{type:'start',session:'mission',now:0});for(const index of [1,0,2])s=input(s,{kind:'switch',index},0);
 expect(reduce(s,{type:'commit',stage:0,now:60000}).phase).toBe('failure');
 s={...s,step:5,lastAt:59900,remaining:100,operation:{index:5,elapsed:1499}};
 expect(reduce(s,{type:'tick',runId:s.runId,now:60000}).phase).toBe('failure');
});

test('isolated puzzle versions share starting values, finish locally, and reset with stale-run protection',async()=>{
 const {initialSandbox}=await import('../../src/design-adventure/reactor-state');
 const live=reduce(initialReactor(),{type:'start',session:'mission',now:0});
 const saved=JSON.stringify(live);
 for(let stage=0;stage<6;stage++){
  const a=initialSandbox(stage,0),b=initialSandbox(stage,0);
  expect(a.puzzles).toEqual(b.puzzles);expect(a.puzzles.pipes).not.toBe(b.puzzles.pipes);
  const completed=solve(a,0).state;expect(completed.phase).toBe('success');expect(completed.step).toBe(stage+1);
  const replay=reduce(completed,{type:'reset',now:20000});expect(replay.step).toBe(stage);expect(replay.puzzles).toEqual(b.puzzles);
  expect(reduce(replay,{type:'tick',runId:completed.runId,now:50000})).toEqual(replay);
 }
 expect(JSON.stringify(live)).toBe(saved);
});
