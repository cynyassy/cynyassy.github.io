import { test, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import type { Page } from '@playwright/test';
const route='/projects/design-adventure.html';
async function controlledClock(page:Page){await page.clock.install();}
async function capture(page:Page,name:string,project:string){await mkdir('artifacts/machinery',{recursive:true});await page.screenshot({path:'artifacts/machinery/'+project+'-'+name+'.png',fullPage:true});}
async function range(page:Page,name:RegExp,value:number){
 const slider=page.getByRole('slider',{name});
 await slider.evaluate((el,v)=>{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value')!.set!.call(el,String(v));el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}));},value);
 await expect(slider).toHaveValue(String(value));
}
async function prepare(page:Page,stage:number){
 switch(stage){
  case 0:for(const name of ['B','A','C'])await page.getByRole('switch',{name:'Power switch '+name,exact:true}).click();break;
  case 1:await expect(page.getByRole('group',{name:'Pump instruments'})).toBeVisible();await page.getByRole('textbox',{name:'Pump authorisation code',exact:true}).fill('427');break;
  case 2:for(const [i,n] of [3,1,2].entries())for(let k=0;k<n;k++)await page.getByRole('button',{name:'Rotate junction '+(i+1),exact:true}).click();await expect(page.getByTestId('pipe-status')).toContainText('Route connected');break;
  case 3:await range(page,/Containment frequency/,62);break;
  case 4:if(await page.getByRole('button',{name:'Use manual timing',exact:true}).count())await page.getByRole('button',{name:'Use manual timing',exact:true}).click();await range(page,/Manual ignition charge/,75);break;
  case 5:{const current=parseFloat((await page.locator('.rx-pressure-readout strong').textContent())!);await page.getByRole('button',{name:/Inlet valve/}).click();await page.clock.runFor(Math.max(100,Math.round((50-current)/11*1000)));await page.getByRole('button',{name:/Inlet valve/}).click();await page.clock.runFor(2100);await expect(page.locator('.rx-valves progress')).toHaveAttribute('value','2000');break;}
 }
}
async function solve(page:Page,stage:number){
 await prepare(page,stage);await page.getByTestId('puzzle-commit').click();await page.clock.runFor(1600);
 await expect(page.getByTestId('reactor-band-'+stage)).toHaveAttribute('data-lit','true');
 if(stage===2&&await page.getByTestId('recovery-lever').isVisible())await page.getByTestId('recovery-lever').click();
}
test('all six practice puzzles teach interactions and lead to a timed mission',async({page},info)=>{
 await controlledClock(page);await page.goto(route);await capture(page,'briefing',info.project.name);
 await page.getByRole('button',{name:'Start practice',exact:true}).click();
 for(let stage=0;stage<6;stage++){await expect(page.getByTestId('puzzle-module')).toHaveAttribute('data-stage',String(stage));await expect(page.getByText('INTERACTION PRINCIPLE',{exact:true}).filter({visible:true}).first()).toBeVisible();await capture(page,'system-'+stage,info.project.name);await solve(page,stage);}
 await expect(page.getByRole('region',{name:'Mission debrief'})).toContainText('6 of 6');
 await expect(page.getByRole('list',{name:'Interactions explored'})).toContainText('Continuous controls');
 await capture(page,'practice-success',info.project.name);
 await page.getByRole('button',{name:'Start another mission',exact:true}).click();
 for(let i=0;i<6;i++)await solve(page,i);
 await expect(page.getByRole('region',{name:'Mission debrief'})).toContainText('stable reactor');await capture(page,'mission-success',info.project.name);
});
test('wrong submissions create faults, physical restoration restores actual settings, second failure melts down',async({page},info)=>{
 await controlledClock(page);await page.goto(route);await page.getByRole('button',{name:'Start mission',exact:true}).click();await solve(page,0);
 await page.getByRole('textbox',{name:'Pump authorisation code',exact:true}).fill('999');await page.getByTestId('puzzle-commit').click();
 await expect(page.getByRole('status').filter({hasText:'code was incorrect'})).toBeVisible();await capture(page,'fault',info.project.name);
 await page.getByTestId('recovery-lever').click();await expect(page.getByRole('textbox',{name:'Pump authorisation code',exact:true})).toHaveValue('');
 await expect(page.getByTestId('reactor-band-0')).toHaveAttribute('data-lit','true');
 await page.getByRole('textbox',{name:'Pump authorisation code',exact:true}).fill('999');await page.getByTestId('puzzle-commit').click();
 await expect(page.getByRole('region',{name:'Mission debrief'})).toBeFocused();await expect(page.locator('.rx-blackout')).toHaveCSS('opacity','1');await capture(page,'failure',info.project.name);
 await page.getByRole('button',{name:'Retry mission',exact:true}).click();await expect(page.getByTestId('countdown')).toHaveText('01:00');
 await prepare(page,0);await page.getByTestId('puzzle-commit').click();await page.getByRole('button',{name:'Replay',exact:true}).click();await page.clock.runFor(5000);
 await expect(page.getByTestId('reactor-band-0')).toHaveAttribute('data-lit','false');await expect(page.getByRole('button',{name:'Start practice',exact:true})).toBeVisible();
});
test('keyboard, reduced-motion manual timing and learning/source panels',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await controlledClock(page);await page.goto(route);await page.getByRole('link',{name:'Skip to reactor controls',exact:true}).waitFor();await page.keyboard.press('Tab');await expect(page.getByRole('link',{name:'Skip to reactor controls',exact:true})).toBeFocused();await page.keyboard.press('Enter');
 await page.getByRole('button',{name:'Start practice',exact:true}).click();
 for(const name of ['B','A','C']){await page.getByRole('switch',{name:'Power switch '+name,exact:true}).focus();await page.keyboard.press('Space');}
 await page.getByTestId('puzzle-commit').focus();await page.keyboard.press('Enter');await page.clock.runFor(1600);
 for(let i=1;i<4;i++)await solve(page,i);
 await expect(page.getByRole('slider',{name:/Manual ignition charge/})).toBeVisible();
 const value=await page.locator('.rx-ignition-readout strong').textContent();await page.clock.runFor(2000);expect(await page.locator('.rx-ignition-readout strong').textContent()).toBe(value);
 await range(page,/Manual ignition charge/,75);await page.getByTestId('puzzle-commit').click();await page.clock.runFor(1600);await solve(page,5);
 await page.getByRole('button',{name:'Review the interaction',exact:true}).click();await expect(page.getByText(/Our adaptation: The dial/)).toBeVisible();await expect(page.getByText(/Related book section:/).first()).toBeVisible();await page.keyboard.press('Escape');
 await page.getByRole('button',{name:'About this style',exact:true}).click();await expect(page.getByRole('link',{name:'Museum für Gestaltung — Graphic collection',exact:true})).toHaveAttribute('href','https://museum-gestaltung.ch/de/grafik');
});
