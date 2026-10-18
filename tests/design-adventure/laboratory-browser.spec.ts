import {test,expect} from '@playwright/test';
import {mkdir} from 'node:fs/promises';
import type {Page} from '@playwright/test';
const route='/projects/design-adventure.html';
async function shot(page:Page,name:string,project:string){await mkdir('artifacts/laboratory',{recursive:true});await page.screenshot({path:`artifacts/laboratory/${project}-${name}.png`,fullPage:true});}
test('design lab makes real controls editable and Compare isolates equivalent A/B puzzle runs',async({page},info)=>{
 await page.clock.install();await page.goto(route);await page.getByRole('button',{name:'Start mission',exact:true}).waitFor();
 if(info.project.name==='desktop')for(const [width,height] of [[1366,768],[1440,900]]){await page.setViewportSize({width,height});await shot(page,`initial-${width}`,info.project.name);expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBe(width);}
 await page.getByRole('button',{name:'Start mission',exact:true}).click();for(const name of ['B','A','C'])await page.getByRole('switch',{name:'Power switch '+name,exact:true}).click();await page.getByTestId('puzzle-commit').click();await page.clock.runFor(1600);
 const code=page.getByRole('textbox',{name:'Pump authorisation code',exact:true});await code.fill('4');
 const style=page.getByRole('combobox',{name:'Visual style',exact:true});
 for(const theme of ['neo','pixel','glass','scrapbook','swiss']){await style.focus();await style.selectOption(theme);await expect(style).toBeFocused();await expect(code).toHaveValue('4');await expect(page.getByTestId('reactor-band-0')).toHaveAttribute('data-lit','true');}
 await shot(page,'active-lab',info.project.name);
 await page.getByRole('button',{name:'Make',exact:true}).click();
 const panel=info.project.name==='mobile'?page.getByRole('dialog'):page.locator('.lab-desktop-panel');
 await panel.getByRole('combobox',{name:'Status detail',exact:true}).selectOption('generic');
 if(info.project.name==='mobile')await page.getByRole('button',{name:'Close panel',exact:true}).click();
 await page.getByRole('button',{name:'Resume sequence',exact:true}).click();await code.fill('427');await page.getByTestId('puzzle-commit').click();await expect(page.locator('.lab-playground .rx-feedback')).toContainText('Working');await shot(page,'make-generic',info.project.name);
 // Opening Compare pauses the in-flight real operation; no sandbox event may finish it.
 await page.getByRole('button',{name:'Compare',exact:true}).click();const clock=await page.getByTestId('countdown').textContent();
 const compare=page.getByRole('region',{name:'Isolated puzzle comparison'});const compareCode=compare.getByRole('textbox',{name:'Pump authorisation code',exact:true});
 await expect(compareCode).toHaveValue('');await compareCode.fill('999');
 await compare.getByRole('button',{name:'B · Alternative',exact:true}).click();await expect(compareCode).toHaveValue('');
 await compare.getByRole('combobox',{name:'Alternative visual style',exact:true}).selectOption('pixel');await expect(compare).toHaveAttribute('data-theme','pixel');
 await compareCode.fill('427');await compare.getByTestId('puzzle-commit').click();await expect(compare.locator('.rx-feedback progress')).toBeVisible();await page.clock.runFor(1600);await expect(compare.getByText('Interaction complete.',{exact:true})).toBeVisible();await expect(compare.getByTestId('puzzle-module')).toHaveAttribute('data-stage','1');
 await compare.getByRole('button',{name:'Replay version B',exact:true}).click();await expect(compareCode).toHaveValue('');
 await compare.getByRole('button',{name:'A · Saved design',exact:true}).click();await expect(compareCode).toHaveValue('999');await compare.getByRole('button',{name:'Replay version A',exact:true}).click();await expect(compareCode).toHaveValue('');
 await shot(page,'compare-ab',info.project.name);await page.clock.runFor(10000);await expect(page.getByTestId('countdown')).toHaveText(clock!);
 await compare.getByRole('button',{name:'Return to experiment',exact:true}).click();await expect(page.getByRole('button',{name:'Compare',exact:true})).toBeFocused();await expect(code).toHaveValue('427');await expect(style).toHaveValue('swiss');await expect(page.getByTestId('reactor-band-1')).toHaveAttribute('data-lit','false');await expect(page.getByTestId('countdown')).toHaveText(clock!);
 await page.getByRole('button',{name:'Learn',exact:true}).click();await shot(page,'learning',info.project.name);await page.keyboard.press('Escape');await expect(page.getByRole('button',{name:'Resume sequence',exact:true})).toBeVisible();await page.getByRole('button',{name:'Resume sequence',exact:true}).click();await page.clock.runFor(1600);await expect(page.getByTestId('reactor-band-1')).toHaveAttribute('data-lit','true');
 await page.goto(route+'?lesson=feedback');await expect(page.getByRole('heading',{name:/Make the interface/})).toBeVisible();await expect(page.getByRole('button',{name:'Build preview',exact:true})).toBeVisible();
});
