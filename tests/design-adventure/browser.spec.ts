import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { themes } from '../../src/design-adventure/content';
const route = '/projects/design-adventure.html';
// Retain the existing five-style baseline; catalogue additions must not multiply this matrix.
for (const theme of themes.filter(t => ['swiss','neo','pixel','glass','scrapbook'].includes(t.id))) {
  test(theme.name + ': all lessons, retained state, focus, and readable responsive layout', async ({ page }, info) => {
    const errors: string[] = []; page.on('pageerror', error => errors.push(error.message));
    await page.clock.install();
    await page.goto(route + '?story=workshop');
    await page.getByRole('combobox', { name: 'Visual style', exact: true }).focus();
    await page.getByRole('combobox', { name: 'Visual style', exact: true }).selectOption(theme.id);
    await expect(page.getByRole('combobox', { name: 'Visual style', exact: true })).toBeFocused();
    await expect(page.locator('.da-page')).toHaveCSS('background-color', 'rgb(255, 255, 255)');
    await expect(page.locator('.da-page')).toHaveCSS('color', 'rgb(53, 53, 53)');
    await page.getByRole('button', { name: 'Start preview', exact: true }).click();
    await expect(page.getByText('Preview opened. Your exhibit is ready to explore.')).toBeVisible();
    await page.getByRole('button', { name: 'Make', exact: true }).click();
    await page.getByRole('combobox', { name: 'Action emphasis', exact: true }).selectOption('inspect');
    await page.getByRole('button', { name: /Understand the response/ }).click();
    await page.getByRole('combobox', { name: 'Feedback treatment', exact: true }).selectOption('steps');
    await page.getByRole('button', { name: 'Build preview', exact: true }).click();
    await page.clock.runFor(1000);
    await expect(page.getByTestId('build-status')).toHaveText('Rendering the exhibit');
    await page.getByRole('button', { name: 'Try', exact: true }).click();
    await page.getByRole('combobox', { name: 'Visual style', exact: true }).focus();
    await page.getByRole('combobox', { name: 'Visual style', exact: true }).selectOption(theme.id === 'swiss' ? 'pixel' : 'swiss');
    await expect(page.getByRole('combobox', { name: 'Visual style', exact: true })).toBeFocused();
    await page.clock.runFor(2000);
    await expect(page.getByTestId('build-status')).toHaveText('Preview ready');
    await page.getByRole('combobox', { name: 'Visual style', exact: true }).selectOption(theme.id);
    await page.getByRole('button', { name: /Recover and explore/ }).click();
    await page.getByRole('button', { name: 'Make', exact: true }).click();
    await page.getByRole('combobox', { name: 'Undo wording', exact: true }).selectOption('value');
    await page.getByRole('button', { name: 'Compact layout', exact: true }).click();
    await expect(page.getByTestId('exhibit')).toHaveAttribute('data-layout', 'compact');
    await page.getByRole('button', { name: 'Restore spacious layout', exact: true }).click();
    await expect(page.getByTestId('exhibit')).toHaveAttribute('data-layout', 'spacious');
    await expect(page.getByTestId('lesson-completion')).toContainText('Three lessons');
    await page.getByRole('button', { name: /Find the action/ }).click();
    await expect(page.getByRole('combobox', { name: 'Action emphasis', exact: true })).toHaveValue('inspect');
    const sizes = await page.evaluate(() => ({ page: document.documentElement.scrollWidth, viewport: innerWidth }));
    expect(sizes.page).toBeLessThanOrEqual(sizes.viewport);
    await mkdir('artifacts/design-adventure', { recursive: true });
    await page.screenshot({ path: 'artifacts/design-adventure/' + info.project.name + '-' + theme.id + '.png', fullPage: true });
    expect(errors).toEqual([]);
  });
}
test('interruption retry, replay, and leaving a lesson cancel stale timers', async ({ page }) => {
  await page.clock.install(); await page.goto(route + '?lesson=feedback');
  await page.getByRole('button', { name: 'Simulate interruption', exact: true }).click();
  await page.clock.runFor(2000);
  await expect(page.getByTestId('build-status')).toContainText('interrupted');
  await page.getByRole('button', { name: 'Retry preview', exact: true }).click();
  await page.clock.runFor(3000);
  await expect(page.getByTestId('build-status')).toHaveText('Preview ready');
  await page.getByRole('button', { name: 'Replay lesson', exact: true }).click();
  await page.getByRole('button', { name: 'Build preview', exact: true }).click();
  await page.getByRole('button', { name: 'Replay lesson', exact: true }).click();
  await page.clock.runFor(5000);
  await expect(page.getByTestId('build-status')).toHaveText('Ready to build');
  await page.getByRole('button', { name: 'Build preview', exact: true }).click();
  await page.getByRole('button', { name: /Find the action/ }).click();
  await page.clock.runFor(5000);
  await page.getByRole('button', { name: /Understand the response/ }).click();
  await expect(page.getByTestId('build-status')).toHaveText('Ready to build');
});
test('shared setup, invalid-link notice, clipboard fallback and future roadmap', async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: () => Promise.reject(new Error('Denied')) } }));
  await page.goto(route + '?theme=glass&lesson=recovery&mode=make&undo=value&layout=compact&feedback=descriptive&emphasis=inspect');
  await expect(page.getByRole('combobox', { name: 'Visual style', exact: true })).toHaveValue('glass');
  await expect(page.getByTestId('exhibit')).toHaveAttribute('data-layout', 'compact');
  await expect(page.getByRole('button', { name: 'Undo layout change', exact: true })).toBeDisabled();
  await page.getByRole('button', { name: 'Hint', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Spacious layout', exact: true })).toHaveClass(/da-hinted/);
  await page.getByRole('button', { name: 'Copy design link', exact: true }).click();
  const input = page.getByLabel('Your design link', { exact: true });
  await expect(input).toBeFocused();
  const link = await input.inputValue(); await page.goto(link);
  await expect(page.getByRole('combobox', { name: 'Undo wording', exact: true })).toHaveValue('value');
  await expect(page.getByTestId('exhibit')).toHaveAttribute('data-layout', 'compact');
  await page.getByText('Next worlds / 2 planned', { exact: false }).click();
  await expect(page.getByRole('heading', { name: 'Research station', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Coffee adventure', exact: true })).toBeVisible();
  await page.goto(route + '?theme=no&story=coffee');
  await expect(page.getByRole('status').filter({ hasText: 'Some shared options' })).toContainText('reset');
  await expect(page.getByRole('combobox', { name: 'Visual style', exact: true })).toHaveValue('swiss');
});
test('keyboard, hints, reduced motion, study content and successful copy', async ({ page, context }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  let copied = '';
  await page.exposeFunction('recordCopied', (text: string) => { copied = text; });
  await page.addInitScript(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: (text: string) => (window as any).recordCopied(text) } }));
  await page.goto(route + '?story=workshop');
  await page.getByRole('link', { name: 'Skip to adventure', exact: true }).waitFor();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to adventure', exact: true })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#adventure-main')).toBeFocused();
  const preview = page.getByRole('button', { name: 'Start preview', exact: true });
  await preview.focus(); await page.keyboard.press('Enter');
  await expect(page.getByText('Preview opened. Your exhibit is ready to explore.')).toBeVisible();
  await page.getByRole('button', { name: 'Replay lesson', exact: true }).click();
  await page.getByRole('button', { name: 'Hint', exact: true }).click();
  await expect(preview).toHaveClass(/da-hinted/);
  await page.getByRole('button', { name: 'About this style', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Swiss Design', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Museum für Gestaltung — Graphic collection' })).toHaveAttribute('href', 'https://museum-gestaltung.ch/de/grafik');
  await page.getByRole('button', { name: 'Close style notes', exact: true }).click();
  await page.getByRole('button', { name: 'Copy design link', exact: true }).click();
  await expect(page.getByText(/Design link copied/)).toBeVisible();
  expect(copied).toContain('story=workshop');
  expect(copied).not.toContain('history');
  await page.getByRole('button', { name: /Understand the response/ }).click();
  await page.getByRole('button', { name: 'Build preview', exact: true }).click();
  expect(await page.locator('.da-status-dot').evaluate(el => getComputedStyle(el).animationName)).toBe('none');
});
test('homepage entry stays lightweight and dedicated listing links internally', async ({ page }) => {
  const requests: string[] = [];
  page.on('request', request => requests.push(request.url()));
  await page.goto('/');
  await expect(page.getByRole('link', { name: /Try the design adventure/ })).toHaveAttribute('href', 'projects/design-adventure.html');
  expect(requests.filter(url => /design-adventure|Tiny5/.test(url))).toEqual([]);
  await page.goto('/projects/other-projects.html');
  const link = page.getByRole('link', { name: 'Try the design adventure', exact: true });
  await expect(link).toHaveAttribute('href', 'design-adventure.html');
  await expect(link).not.toHaveAttribute('target', '_blank');
});
test('record local loading and interaction measurements', async ({ page }, info) => {
  await page.addInitScript(() => {
    (window as any).__lcp = 0;
    try { new PerformanceObserver(list => { (window as any).__lcp = list.getEntries().at(-1)?.startTime || 0; }).observe({ type: 'largest-contentful-paint', buffered: true }); } catch {}
  });
  await page.goto(route + '?story=workshop');
  await page.getByRole('heading', { name: /Make the interface/ }).waitFor();
  await page.waitForTimeout(350);
  const loading = await page.evaluate(() => ({
    navigation: (performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming).toJSON(),
    lcpMs: (window as any).__lcp,
    resources: performance.getEntriesByType('resource').map(e => ({ name: e.name, duration: e.duration, transferSize: (e as PerformanceResourceTiming).transferSize })),
  }));
  const responseMs = await page.getByRole('button', { name: 'Start preview', exact: true }).evaluate((el: HTMLElement) => new Promise<number>(resolve => {
    const start = performance.now(); el.click(); requestAnimationFrame(() => resolve(performance.now() - start));
  }));
  await mkdir('artifacts/design-adventure', { recursive: true });
  await writeFile('artifacts/design-adventure/' + info.project.name + '-performance.json', JSON.stringify({ context: (process.env.ADVENTURE_PREVIEW ? 'Local production preview' : 'Local Vite dev server') + '; browser emulation; not field Core Web Vitals', viewport: page.viewportSize(), loading, clickToNextFrameMs: responseMs }, null, 2));
});

// Retain the existing five-style baseline; catalogue additions must not multiply this matrix.
for (const theme of themes.filter(t => ['swiss','neo','pixel','glass','scrapbook'].includes(t.id))) {
  test(theme.name + ': accessibility in reference and guided exercise states', async ({ page }, info) => {
    await page.goto(route + '?story=workshop&theme=' + theme.id);
    await page.getByRole('button', { name: 'About this style', exact: true }).click();
    const scans = [];
    const reference = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    expect(reference.violations.map(item => ({ id: item.id, targets: item.nodes.map(node => node.target) }))).toEqual([]);
    for (const lesson of ['action', 'feedback', 'recovery']) {
      await page.getByRole('button', { name: lesson === 'action' ? /Find the action/ : lesson === 'feedback' ? /Understand the response/ : /Recover and explore/ }).click();
      await page.getByRole('button', { name: 'Make', exact: true }).click();
      if (lesson === 'recovery') await page.getByRole('button', { name: 'Compact layout', exact: true }).click();
      const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
      scans.push({ lesson, violations: result.violations, incomplete: result.incomplete.map(item => item.id), passes: result.passes.length });
      expect(result.violations.map(item => ({ id: item.id, targets: item.nodes.map(node => node.target), reasons: item.nodes.map(node => node.failureSummary) }))).toEqual([]);
    }
    await mkdir('artifacts/design-adventure', { recursive: true });
    await writeFile('artifacts/design-adventure/' + info.project.name + '-' + theme.id + '-accessibility.json', JSON.stringify(scans, null, 2));
  });
}
