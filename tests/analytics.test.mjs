import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
// Data URL also works when these tests are staged outside the site's ESM package.
const source = await readFile(new URL('../functions/api/e.js', import.meta.url), 'utf8');
const { onRequestPost } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
const client = await readFile(new URL('../public/lp-analytics.js', import.meta.url), 'utf8');
function environment() {
  const rows = [];
  return { rows, ANALYTICS: {
    prepare(sql) {
      return { args: [], bind(...args) { this.args = args; return this; },
        async run() { if (sql.startsWith('INSERT INTO events')) rows.push(this.args); },
        async first() { return { salt: 'test-only-salt' }; },
      };
    }, async batch() {},
  } };
}
async function record(body, headers = {}, url = 'https://lightphotos.app/api/e') {
  const env = environment();
  const response = await onRequestPost({ env, request: new Request(url, {
    method: 'POST', headers: { Origin: 'https://lightphotos.app', 'User-Agent': 'test-browser', ...headers },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  }) });
  assert.equal(response.status, 204);
  return env.rows;
}
test('app properties are event-specific and local paths never reach D1', async () => {
  const rows = await record({ name: 'folder_opened', path: '/Users/private/photo.jpg', props: {
    photo_count_bucket: '100-999', reason: 'secret', filename: 'private.jpg', ms: 100,
  } });
  assert.equal(rows.length, 1);
  assert.equal(rows[0][3], '/app');
  assert.deepEqual(JSON.parse(rows[0][7]), { photo_count_bucket: '100-999' });
  assert.ok(!JSON.stringify(rows).includes('private'));
});
test('unknown enum values and numeric timing abuse are removed', async () => {
  for (const props of [{ reason: 'my-secret-name' }, { reason: '/a/b' }, { ms: 123 }]) {
    const rows = await record({ name: 'decode_error', props });
    assert.equal(rows[0][7], null);
  }
  for (const ms of [-1, 1.5, 86400001, '42']) {
    assert.equal((await record({ name: 'wasm_loaded', props: { ms } }))[0][7], null);
  }
  assert.deepEqual(JSON.parse((await record({ name: 'wasm_loaded', props: { ms: 42 } }))[0][7]), { ms: 42 });
});
test('invalid events, malformed bodies, opt-outs, preview traffic and foreign origins are dropped', async () => {
  for (const body of [{ name: 'arbitrary' }, 'bad json', 'x'.repeat(2049)]) assert.equal((await record(body)).length, 0);
  for (const headers of [{ DNT: '1' }, { 'Sec-GPC': '1' }, { Origin: 'https://other.test' }]) {
    assert.equal((await record({ name: 'app_started' }, headers)).length, 0);
  }
  assert.equal((await record({ name: 'app_started' }, { Origin: 'https://preview.pages.dev' }, 'https://preview.pages.dev/api/e')).length, 0);
});
test('successful and failed exports retain only their declared payload', async () => {
  assert.equal((await record({ name: 'photo_exported', props: { reason: 'export_pipeline' } }))[0][7], null);
  assert.deepEqual(JSON.parse((await record({ name: 'export_failed', props: { reason: 'export_pipeline' } }))[0][7]), { reason: 'export_pipeline' });
});
test('D1 failures remain non-fatal', async () => {
  const response = await onRequestPost({ env: {}, request: new Request('https://lightphotos.app/api/e', { method: 'POST', body: '{"name":"app_started"}' }) });
  assert.equal(response.status, 204);
});
function runClient(navigator = {}, fetch = () => Promise.resolve()) {
  const context = vm.createContext({ navigator, window: {}, location: { pathname: '/app' }, document: { referrer: '' }, Blob, fetch });
  vm.runInContext(client, context);
  return context.window;
}
test('DNT and GPC suppress page and action events', () => {
  for (const signal of [{ doNotTrack: '1' }, { globalPrivacyControl: true }]) {
    let sent = 0;
    const window = runClient({ ...signal, sendBeacon() { sent++; return true; } }, () => { sent++; return Promise.resolve(); });
    window.lpTrack('photo_rated');
    assert.equal(sent, 0);
  }
});
test('beacons carry named events and rejected beacons fall back without throwing', async () => {
  const payloads = [];
  const window = runClient({ sendBeacon(url, body) { assert.equal(url, '/api/e'); payloads.push(body); return true; } });
  window.lpTrack('photo_rated');
  assert.deepEqual(await Promise.all(payloads.map(async b => JSON.parse(await b.text()).name)), ['app_page_view', 'photo_rated']);
  let calls = 0;
  const fallback = runClient({ sendBeacon: () => false }, () => { calls++; return Promise.reject(new Error('blocked')); });
  assert.doesNotThrow(() => fallback.lpTrack('photo_rated'));
  assert.equal(calls, 2);
  const throwing = runClient({ sendBeacon() { throw new Error('blocked'); } });
  assert.doesNotThrow(() => throwing.lpTrack('photo_rated'));
});
