'use strict';

const PAGE_HTML = "<!doctype html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <meta name=\"theme-color\" content=\"#12355b\">\n  <meta name=\"description\" content=\"A hosted JSON API for decoding the FalconCast events feed.\">\n  <title>FalconCast Events API — Decrypt feed to JSON</title>\n  \n  <style>\n@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;600;700&display=swap');\n\n:root {\n  color-scheme: light;\n  --navy: #12355b;\n  --ink: #122944;\n  --muted: #63768b;\n  --blue: #2d6f9f;\n  --sky: #a7d8f0;\n  --paper: #f5f9fc;\n  --line: #d4e2ec;\n  --mono: 'DM Mono', 'Space Mono', ui-monospace, SFMono-Regular, monospace;\n  --sans: 'Space Grotesk', system-ui, sans-serif;\n}\n\n* { box-sizing: border-box; }\nhtml { scroll-behavior: smooth; }\nbody { margin: 0; background: var(--paper); color: var(--ink); font-family: var(--sans); }\n.topbar, main, footer { width: min(1120px, calc(100% - 48px)); margin-inline: auto; }\n.topbar { min-height: 76px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--line); }\n.brand { display: inline-flex; align-items: center; gap: 11px; color: var(--navy); font: 500 12px var(--mono); letter-spacing: .08em; text-decoration: none; }\n.brand img { display: block; }\n.brand b { color: #7890a7; font-weight: 400; }\n.status, .eyebrow, .version, .method, .result-meta, .example-head, footer { font-family: var(--mono); letter-spacing: .08em; }\n.status { color: #43627b; font-size: 10px; }\n.status i { display: inline-block; width: 7px; height: 7px; margin-right: 8px; border-radius: 50%; background: #338c72; box-shadow: 0 0 0 4px #338c7218; }\nmain { padding: 67px 0 58px; }\n.hero { position: relative; padding: 0 0 52px; }\n.hero::after { position: absolute; top: -18px; right: 3%; width: 165px; height: 165px; content: ''; opacity: .62; background: linear-gradient(90deg, transparent 49.5%, #a7d8f066 50%, transparent 50.5%), linear-gradient(0deg, transparent 49.5%, #a7d8f066 50%, transparent 50.5%); background-size: 25px 25px; mask-image: radial-gradient(circle, #000 8%, transparent 70%); pointer-events: none; }\n.eyebrow { color: #5580a3; font-size: 10px; font-weight: 500; }\n.eyebrow span { margin-inline: 6px; color: #8bbad2; }\nh1 { position: relative; z-index: 1; margin: 22px 0 16px; max-width: 760px; color: var(--navy); font-size: clamp(42px, 7vw, 73px); line-height: .99; letter-spacing: -.055em; font-weight: 600; }\nh1 em { color: #5785a8; font-style: normal; }\n.lede { max-width: 560px; color: var(--muted); font-size: 16px; line-height: 1.65; }\n.endpoint-chip { display: inline-flex; align-items: center; gap: 12px; margin-top: 15px; padding: 10px 13px; border: 1px solid #c7d9e7; border-radius: 4px; background: #fff; color: #355772; }\n.endpoint-chip code, code, pre { font-family: var(--mono); }\n.endpoint-chip code { font-size: 12px; }\n.method { padding: 4px 6px; border-radius: 2px; background: #e2f2fb; color: #2f729b; font-size: 9px; }\n.console { padding: 27px; border: 1px solid var(--line); border-top: 3px solid var(--navy); background: #fff; box-shadow: 0 18px 55px #12355b0a; }\n.section-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 23px; }\n.section-head .eyebrow { margin: 0 0 6px; }\nh2 { margin: 0; color: var(--navy); font-size: 25px; letter-spacing: -.035em; }\n.version { color: #8397aa; font-size: 9px; }\nlabel { display: block; margin: 0 0 8px; color: #536d84; font: 10px var(--mono); letter-spacing: .06em; text-transform: uppercase; }\n.request-line { display: flex; gap: 10px; }\ninput { flex: 1; min-width: 0; padding: 13px 14px; border: 1px solid #bfd1df; border-radius: 3px; outline: none; background: #fbfdff; color: var(--ink); font: 12px var(--mono); }\ninput:focus { border-color: #4984ad; box-shadow: 0 0 0 3px #a7d8f044; }\nbutton { border: 0; border-radius: 3px; padding: 0 18px; background: var(--navy); color: white; cursor: pointer; font: 500 10px var(--mono); letter-spacing: .08em; transition: background .18s, transform .18s; }\nbutton:hover { background: #24577f; transform: translateY(-1px); }\nbutton:disabled { opacity: .62; cursor: progress; transform: none; }\nbutton span { padding-left: 8px; color: var(--sky); font-size: 15px; }\n.hint { margin: 10px 0 21px; color: #7b8da0; font-size: 11px; }\n.result { overflow: hidden; border: 1px solid #dbe5ec; border-radius: 3px; background: #f8fbfd; }\n.result-meta { display: flex; justify-content: space-between; padding: 10px 13px; border-bottom: 1px solid #dbe5ec; color: #688196; font-size: 9px; }\n#result-status { color: #327456; }\n.result pre { overflow: auto; max-height: 260px; margin: 0; padding: 15px; color: #3d5d78; font-size: 11px; line-height: 1.6; white-space: pre-wrap; overflow-wrap: anywhere; }\n.usage { display: grid; grid-template-columns: .8fr 1.2fr; gap: 54px; padding: 72px 0 62px; }\n.usage-intro .eyebrow { margin-top: 0; }\n.usage-intro h2 { font-size: 31px; line-height: 1.18; }\n.usage-intro p:not(.eyebrow) { max-width: 350px; color: var(--muted); font-size: 13px; line-height: 1.7; }\n.usage-intro code { padding: 2px 4px; background: #e7f0f6; color: #315f80; font-size: 11px; }\n.examples { display: grid; gap: 12px; }\n.examples article { overflow: hidden; border: 1px solid var(--line); background: white; }\n.example-head { display: flex; justify-content: space-between; padding: 9px 12px; border-bottom: 1px solid #e2ebf1; color: #66839a; font-size: 9px; }\n.examples pre { overflow-x: auto; margin: 0; padding: 13px; color: #315b7a; font-size: 10px; line-height: 1.6; white-space: pre-wrap; overflow-wrap: anywhere; }\n.footnotes { display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }\n.footnotes > div { display: flex; gap: 12px; padding: 19px 16px 19px 0; }\n.footnotes > div + div { padding-left: 18px; border-left: 1px solid var(--line); }\n.note-mark { display: grid; place-items: center; flex: 0 0 23px; height: 23px; border: 1px solid #b9d4e5; border-radius: 50%; color: #4780a3; font: 10px var(--mono); }\n.footnotes p { margin: 0; color: #708398; font-size: 11px; line-height: 1.6; }\n.footnotes strong { color: #284c6c; font-weight: 600; }\nfooter { display: flex; justify-content: space-between; padding: 19px 0 25px; color: #8295a8; font-size: 9px; }\n\n@media (max-width: 720px) {\n  .topbar, main, footer { width: min(100% - 30px, 580px); }\n  main { padding-top: 48px; }\n  .hero::after { right: -10px; top: 2px; width: 110px; height: 110px; }\n  .section-head { align-items: flex-start; gap: 18px; }\n  .version { padding-top: 6px; text-align: right; }\n  .console { padding: 19px 15px; }\n  .request-line { flex-direction: column; }\n  button { min-height: 44px; }\n  .usage { grid-template-columns: 1fr; gap: 22px; padding: 54px 0 42px; }\n  .footnotes { grid-template-columns: 1fr; }\n  .footnotes > div, .footnotes > div + div { padding: 14px 0; border-left: 0; }\n  .footnotes > div + div { border-top: 1px solid var(--line); }\n  footer { gap: 12px; font-size: 8px; }\n}\n\n</style>\n</head>\n<body>\n  <header class=\"topbar\">\n    <a class=\"brand\" href=\"/\" aria-label=\"FalconCast API home\">\n      <span class=\"brand-mark\" aria-hidden=\"true\">FC</span>\n      <span>FIELDNOTE <b>/ API 01</b></span>\n    </a>\n    <span class=\"status\"><i></i> SERVICE READY</span>\n  </header>\n\n  <main>\n    <section class=\"hero\">\n      <p class=\"eyebrow\">HOSTED JSON ENDPOINT <span>•</span> NODE 22</p>\n      <h1>Decode the feed.<br><em>Keep the response clean.</em></h1>\n      <p class=\"lede\">A small, direct API for the FalconCast events feed. Send the approved feed URL and receive the decrypted JSON response.</p>\n      <div class=\"endpoint-chip\"><span class=\"method\">GET</span><code>/api/decrypt?url=&lt;feed-url&gt;</code></div>\n    </section>\n\n    <section class=\"console\" aria-labelledby=\"try-title\">\n      <div class=\"section-head\">\n        <div><p class=\"eyebrow\">01 / REQUEST</p><h2 id=\"try-title\">Try the endpoint</h2></div>\n        <span class=\"version\">READ-ONLY · JSON</span>\n      </div>\n      <label for=\"feed-url\">Feed URL</label>\n      <div class=\"request-line\">\n        <input id=\"feed-url\" type=\"url\" spellcheck=\"false\" autocomplete=\"url\" value=\"https://repos-1wy.pages.dev/events.txt\">\n        <button id=\"send\" type=\"button\">DECODE <span aria-hidden=\"true\">→</span></button>\n      </div>\n      <p class=\"hint\">Fetching is restricted to the supplied HTTPS feed URL. Other hosts and redirects are rejected.</p>\n      <div id=\"result\" class=\"result\" aria-live=\"polite\">\n        <div class=\"result-meta\"><span>RESPONSE</span><span id=\"result-status\">IDLE</span></div>\n        <pre id=\"output\">Choose DECODE to request the feed. The API returns JSON at /api/decrypt.</pre>\n      </div>\n    </section>\n\n    <section class=\"usage\">\n      <div class=\"usage-intro\"><p class=\"eyebrow\">02 / INTEGRATE</p><h2>One endpoint.<br>Three input styles.</h2><p>Use a query parameter, a URL path suffix, or a JSON POST body. Every successful response is the decrypted feed with <code>application/json</code> content type.</p></div>\n      <div class=\"examples\">\n        <article><div class=\"example-head\"><span>QUERY</span><span>GET</span></div><pre><code>GET /api/decrypt?url=https%3A%2F%2Frepos-1wy.pages.dev%2Fevents.txt</code></pre></article>\n        <article><div class=\"example-head\"><span>PATH</span><span>GET</span></div><pre><code>GET /api/decrypt/https%3A%2F%2Frepos-1wy.pages.dev%2Fevents.txt</code></pre></article>\n        <article><div class=\"example-head\"><span>JSON BODY</span><span>POST</span></div><pre><code>{ \"url\": \"https://repos-1wy.pages.dev/events.txt\" }</code></pre></article>\n      </div>\n    </section>\n\n    <section class=\"footnotes\">\n      <div><span class=\"note-mark\">A</span><p><strong>Source locked.</strong><br>Only the configured HTTPS events resource is fetched; arbitrary URLs and redirects are blocked.</p></div>\n      <div><span class=\"note-mark\">B</span><p><strong>Errors are JSON.</strong><br>Invalid input, upstream failures, timeouts, and decode errors return an error code and message.</p></div>\n      <div><span class=\"note-mark\">C</span><p><strong>No storage.</strong><br>Requests are processed in memory and the response is sent with no-store cache policy.</p></div>\n    </section>\n  </main>\n\n  <footer><span>FALCONCAST EVENTS DECRYPT API</span><span>HTTPS · JSON · NO PERSISTENCE</span></footer>\n  <script>\n    const button = document.querySelector('#send');\n    const input = document.querySelector('#feed-url');\n    const status = document.querySelector('#result-status');\n    const output = document.querySelector('#output');\n    button.addEventListener('click', async () => {\n      button.disabled = true;\n      status.textContent = 'FETCHING';\n      output.textContent = 'Requesting and decrypting…';\n      try {\n        const query = new URLSearchParams({ url: input.value });\n        const response = await fetch(`/api/decrypt?${query.toString()}`);\n        const data = await response.json();\n        status.textContent = `${response.status} ${response.ok ? 'OK' : 'ERROR'}`;\n        output.textContent = JSON.stringify(data, null, 2);\n      } catch (error) {\n        status.textContent = 'NETWORK ERROR';\n        output.textContent = error.message || 'Request failed.';\n      } finally {\n        button.disabled = false;\n      }\n    });\n  </script>\n</body>\n</html>\n";

const SOURCE_HOST = 'repos-1wy.pages.dev';
const SOURCE_PATH = '/events.txt';
const SOURCE_URL = `https://${SOURCE_HOST}${SOURCE_PATH}`;
const API_PREFIX = '/api/decrypt';
const MAX_FEED_BYTES = 2 * 1024 * 1024;
const MAX_BODY_BYTES = 8 * 1024;
const UPSTREAM_TIMEOUT_MS = 12_000;
const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = 30;
const rateBuckets = new Map(); // Best-effort per-isolate limit; use Cloudflare Rate Limiting rules for global enforcement.

const SIGNER_SHA256 = '7859132d7a4b8162405f6d94d4e2582a478137b83a76a34b029612e9f5e5e00c';
const IV = new TextEncoder().encode('k5K4nN7oU8hL6l19');

function hexToBytes(hex) {
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  return out;
}
function bytesToBase64(bytes) {
  let binary = '';
  for (let i = 0; i < bytes.length; i += 0x8000) binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(binary);
}
function pairSwapText(value) {
  if (value.length % 2) throw new Error('Unexpected odd-length transform input');
  let out = '';
  for (let i = 0; i < value.length; i += 2) out += value[i + 1] + value[i];
  return out;
}
function deriveAesKey() {
  const firstBase64 = bytesToBase64(hexToBytes(SIGNER_SHA256));
  const pairSwapped = pairSwapText([...firstBase64].reverse().join(''));
  return new TextEncoder().encode(bytesToBase64(new TextEncoder().encode(pairSwapped)).slice(0, 16));
}
const AES_KEY = deriveAesKey();

function decodeBase64Strict(value) {
  const compact = value.replace(/[\r\n\t ]/g, '');
  if (!compact || !/^[A-Za-z0-9+/]*={0,2}$/.test(compact)) throw new Error('Payload contains invalid Base64 characters');
  const unpadded = compact.replace(/=+$/, '');
  if (unpadded.length % 4 === 1) throw new Error('Invalid Base64 length');
  const normalized = unpadded + '='.repeat((4 - (unpadded.length % 4)) % 4);
  let binary;
  try { binary = atob(normalized); } catch { throw new Error('Invalid Base64 payload'); }
  const decoded = Uint8Array.from(binary, c => c.charCodeAt(0));
  if (bytesToBase64(decoded).replace(/=+$/, '') !== unpadded) throw new Error('Non-canonical Base64 payload');
  return decoded;
}
function transformFallbackBytes(bytes) {
  if (bytes.length % 2) throw new Error('Unexpected odd-length wrapped payload');
  const swapped = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i += 2) { swapped[i] = bytes[i + 1]; swapped[i + 1] = bytes[i]; }
  return swapped.reverse();
}
function normalizeJsonStrings(value) {
  if (Array.isArray(value)) return value.map(normalizeJsonStrings);
  if (value !== null && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, normalizeJsonStrings(v)]));
  if (typeof value === 'string') {
    const candidate = value.trim();
    if ((candidate.startsWith('{') && candidate.endsWith('}')) || (candidate.startsWith('[') && candidate.endsWith(']'))) {
      try { return normalizeJsonStrings(JSON.parse(candidate)); } catch { /* keep ordinary text */ }
    }
  }
  return value;
}
async function decryptPayload(payloadText) {
  const trimmed = payloadText.trim();
  if (!trimmed) throw new Error('Empty upstream response');
  if (trimmed.startsWith('{') || trimmed.startsWith('[')) return normalizeJsonStrings(JSON.parse(trimmed));
  const outerDecoded = decodeBase64Strict(trimmed);
  const reordered = transformFallbackBytes(outerDecoded);
  const secondLayerText = new TextDecoder('ascii').decode(reordered);
  if (!/^[\x00-\x7f]*$/.test(secondLayerText)) throw new Error('Decoded wrapper is not ASCII');
  const ciphertext = decodeBase64Strict(secondLayerText);
  if (!ciphertext.length || ciphertext.length % 16) throw new Error('Ciphertext is not AES block-aligned');
  const cryptoKey = await crypto.subtle.importKey('raw', AES_KEY, { name: 'AES-CBC' }, false, ['decrypt']);
  const plaintext = await crypto.subtle.decrypt({ name: 'AES-CBC', iv: IV }, cryptoKey, ciphertext);
  const decodedText = new TextDecoder('utf-8', { fatal: true }).decode(plaintext);
  return normalizeJsonStrings(JSON.parse(decodedText));
}
function validateSourceUrl(input) {
  if (typeof input !== 'string' || !input || input.length > 2048 || input.trim() !== input) throw httpError(400, 'invalid_url', 'Provide one complete HTTPS feed URL.');
  let parsed;
  try { parsed = new URL(input); } catch { throw httpError(400, 'invalid_url', 'The supplied feed URL is not valid.'); }
  const allowed = parsed.protocol === 'https:' && parsed.hostname === SOURCE_HOST && !parsed.port && !parsed.username && !parsed.password && parsed.pathname === SOURCE_PATH && !parsed.search && !parsed.hash;
  if (!allowed) throw httpError(403, 'source_not_allowed', `Only ${SOURCE_URL} is accepted.`);
  return SOURCE_URL;
}
function httpError(status, code, message) { const e = new Error(message); e.status = status; e.code = code; return e; }
function headers(extra = {}) {
  return { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...extra };
}
function json(data, status = 200, extra = {}) {
  return new Response(JSON.stringify(data), { status, headers: headers({ 'Content-Type': 'application/json; charset=utf-8', ...extra }) });
}
function apiError(status, code, message, extra = {}) { return json({ error: { code, message } }, status, extra); }
function enforceRateLimit(request) {
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const now = Date.now();
  let bucket = rateBuckets.get(ip);
  if (!bucket || now - bucket.start >= RATE_WINDOW_MS) { bucket = { start: now, count: 0 }; rateBuckets.set(ip, bucket); }
  bucket.count++;
  if (rateBuckets.size > 1000) for (const [key, item] of rateBuckets) if (now - item.start >= RATE_WINDOW_MS) rateBuckets.delete(key);
  return bucket.count <= RATE_LIMIT;
}
async function readLimited(response, limit) {
  if (!response.body) return new Uint8Array();
  const reader = response.body.getReader();
  const chunks = []; let total = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > limit) { await reader.cancel().catch(() => {}); throw httpError(413, 'feed_too_large', 'The upstream feed exceeds the size limit.'); }
    chunks.push(value);
  }
  const merged = new Uint8Array(total); let offset = 0;
  for (const chunk of chunks) { merged.set(chunk, offset); offset += chunk.length; }
  return merged;
}
async function handleDecrypt(request, url) {
  if (!enforceRateLimit(request)) return apiError(429, 'rate_limited', 'Too many requests. Try again shortly.', { 'Retry-After': '60' });
  let inputUrl;
  if (request.method === 'GET') {
    if (url.pathname === API_PREFIX) inputUrl = url.searchParams.get('url');
    else {
      try { inputUrl = decodeURIComponent(url.pathname.slice(API_PREFIX.length + 1)); }
      catch { return apiError(400, 'invalid_url_encoding', 'The path URL is not correctly percent-encoded.'); }
    }
  } else if (request.method === 'POST') {
    if (url.pathname !== API_PREFIX) return apiError(400, 'invalid_request', 'POST JSON input is supported only at /api/decrypt.');
    if (!(request.headers.get('content-type') || '').toLowerCase().startsWith('application/json')) return apiError(415, 'unsupported_media_type', 'POST requests must use application/json.');
    const raw = await request.arrayBuffer();
    if (raw.byteLength > MAX_BODY_BYTES) return apiError(413, 'request_too_large', 'Request body is too large.');
    let body; try { body = JSON.parse(new TextDecoder().decode(raw)); } catch { return apiError(400, 'invalid_json', 'POST body must be valid JSON with a string "url" field.'); }
    inputUrl = body && typeof body === 'object' && !Array.isArray(body) ? body.url : null;
  }
  if (inputUrl === null || inputUrl === undefined || inputUrl === '') return apiError(400, 'missing_url', 'Supply the feed URL as the url query parameter, an encoded path suffix, or a JSON POST field.');
  let sourceUrl;
  try { sourceUrl = validateSourceUrl(inputUrl); } catch (e) { return apiError(e.status || 400, e.code || 'invalid_url', e.message); }
  let upstream;
  try {
    upstream = await fetch(sourceUrl, { method: 'GET', redirect: 'error', signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS), headers: { Accept: 'text/plain, application/json;q=0.9' } });
  } catch (e) {
    if (e && (e.name === 'TimeoutError' || e.name === 'AbortError')) return apiError(504, 'upstream_timeout', 'The feed server did not respond in time.');
    return apiError(502, 'upstream_fetch_failed', 'Could not fetch the feed; redirects are not followed.');
  }
  if (!upstream.ok) return apiError(502, 'upstream_http_error', 'The feed server returned an unsuccessful status.', { 'X-Upstream-Status': String(upstream.status) });
  try {
    const bytes = await readLimited(upstream, MAX_FEED_BYTES);
    const text = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
    return json(await decryptPayload(text));
  } catch (e) {
    const status = e.status || 422;
    const code = e.code || (e instanceof SyntaxError ? 'malformed_output' : 'decryption_failed');
    const message = e.status ? e.message : (e instanceof SyntaxError ? 'The decrypted feed is not valid JSON.' : 'Could not decrypt the feed using the bundled FalconCast-compatible algorithm.');
    return apiError(status, code, message);
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: headers() });
    if (url.pathname === '/_app/health') return json({ ok: true, service: 'falconcast-events-decrypt-api' });
    if ((url.pathname === API_PREFIX || url.pathname.startsWith(`${API_PREFIX}/`))) {
      if (request.method !== 'GET' && request.method !== 'POST') return apiError(405, 'method_not_allowed', 'Use GET, POST, or OPTIONS.', { Allow: 'GET, POST, OPTIONS' });
      try { return await handleDecrypt(request, url); }
      catch (e) { return apiError(e.status || 500, e.code || 'internal_error', e.status ? e.message : 'The request could not be processed.'); }
    }
    if (url.pathname === '/' && (request.method === 'GET' || request.method === 'HEAD')) {
      const info = {
        ok: true,
        service: 'falconcast-events-decrypt-api',
        status: 'ready',
        format: 'application/json',
        endpoints: {
          health: '/_app/health',
          decrypt: '/api/decrypt?url=' + SOURCE_URL
        },
        usage: {
          method: 'GET',
          example: '/api/decrypt?url=' + encodeURIComponent(SOURCE_URL)
        }
      };
      return new Response(request.method === 'HEAD' ? null : JSON.stringify(info, null, 2), {
        status: 200,
        headers: headers({ 'Content-Type': 'application/json; charset=utf-8' })
      });
    }
    return apiError(405, 'method_not_allowed', 'Use GET, POST, or OPTIONS.', { Allow: 'GET, POST, OPTIONS' });
  }
};
