import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { resolve, sep } from 'node:path';

const root = resolve('dist/client');
const html = await readFile(resolve(root, 'index.html'), 'utf8');
const base = new URL(`${(process.env.PAGES_BASE_URL || 'http://localhost').replace(/\/$/, '')}/`);
const assets = [...html.matchAll(/(?:src|href)="([^"]+)"/g)]
  .map((match) => match[1]).filter((value) => !value.startsWith('#'));
assert.ok(assets.length > 0, 'The page must reference static assets');
for (const value of assets) {
  const url = new URL(value, base);
  assert.equal(url.origin, base.origin, `Unexpected external asset: ${value}`);
  assert.ok(url.pathname.startsWith(base.pathname), `Asset escapes deployment path: ${value}`);
  const file = resolve(root, decodeURIComponent(url.pathname.slice(base.pathname.length)));
  assert.ok(file.startsWith(root + sep), `Asset escapes artifact: ${value}`);
  assert.ok((await stat(file)).isFile(), `Missing asset: ${value}`);
}
assert.match(html, /No cloud\. No tracking\. No fees\./);
assert.doesNotMatch(html, /Illustrative dashboard · Fictional records, never your personal data/);
assert.match(html, /Explore the full dashboard/);
assert.match(html, /aria-expanded="false" aria-controls="dashboard-preview"/);
for (const id of ['up-next', 'this-month', 'tip-inbox', 'recommendations', 'activity', 'signal']) {
  assert.equal([...html.matchAll(new RegExp(`id="${id}"`, 'g'))].length, 1, `One feature section for ${id}`);
}
assert.match(html, /Art Vandelay/);
assert.doesNotMatch(html, /Now with Signal/);
assert.doesNotMatch(html, /Signal · optional/);
assert.match(html, /The data already on your Mac, finally working together\./);
console.log(`Static artifact: root index.html and ${assets.length} same-origin asset references verified`);
