// 幀具 · tools/lib/幀具.cjs —— 圖錄合幀共用之殼（伺服＋headless＋存圖）
// 諸 tools/*.cjs 合幀工具共倚：起本地伺服（路徑防逸）、開 chrome-headless-shell、
// 於頁內 evaluate 作畫（畫者自理 canvas 與蔽法——勿於畫布內鋪底，見 CLAUDE.md）、
// 存 PNG 至 圖錄/。用法：
//   const { 合幀 } = require('./lib/幀具.cjs');
//   合幀({ 出: '圖錄/風格館/某幀.png', 幀: async (page) => dataUrl });
const { createServer } = require('http');
const { readFile } = require('fs/promises');
const { realpathSync } = require('fs');
const { writeFileSync, readdirSync, existsSync, mkdirSync } = require('fs');
const { join, extname, resolve, sep, dirname } = require('path');
const os = require('os');
const ROOT = join(__dirname, '..', '..');

function 覓playwright() {
  try { return require(join(ROOT, 'node_modules/playwright-core')); } catch {}
  const npx = join(os.homedir(), '.npm/_npx');
  if (existsSync(npx)) for (const d of readdirSync(npx)) {
    const p = join(npx, d, 'node_modules/playwright-core');
    if (existsSync(p)) return require(p);
  }
  throw new Error('未見 playwright-core：於倉內 npm i -D playwright-core（勿提交 package.json 之變）');
}
function 覓headless() {
  const base = join(os.homedir(), 'Library/Caches/ms-playwright');
  const 尋 = (dir, depth) => {
    if (depth > 3 || !existsSync(dir)) return null;
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, e.name);
      if (e.isFile() && e.name === 'chrome-headless-shell') return p;
      if (e.isDirectory()) { const r = 尋(p, depth + 1); if (r) return r; }
    }
    return null;
  };
  if (existsSync(base)) for (const d of readdirSync(base).filter(x => x.startsWith('chromium_headless_shell-')).sort().reverse()) {
    const exe = 尋(join(base, d), 0); if (exe) return exe;
  }
  throw new Error('未見 chrome-headless-shell：npx playwright install chromium-headless-shell');
}

async function 合幀({ 出, 幀 }) {
  const { chromium } = 覓playwright();
  const MIME = { '.html': 'text/html', '.js': 'text/javascript' };
  const server = createServer(async (req, res) => {
    try {
      const raw = decodeURIComponent(req.url.split('?')[0]);
      const p = resolve(ROOT, raw === '/' ? 'index.html' : '.' + raw);
      if (p !== resolve(ROOT) && !p.startsWith(resolve(ROOT) + sep)) { res.writeHead(403); res.end(); return; }
      // symlink 逸出之防：realpath 後再核（回填.cjs 同律）
      const rp = realpathSync(p);
      const rroot = realpathSync(ROOT);
      if (rp !== rroot && !rp.startsWith(rroot + sep)) { res.writeHead(403); res.end(); return; }
      const body = await readFile(p);
      res.writeHead(200, { 'content-type': MIME[extname(p)] || 'application/octet-stream' });
      res.end(body);
    } catch { res.writeHead(404); res.end(); }
  }).listen(0, '127.0.0.1');
  await new Promise(r => server.once('listening', r));
  const browser = await chromium.launch({ executablePath: 覓headless() });
  const page = await browser.newPage();
  page.on('pageerror', e => console.log('[pageerror]', e.message));
  await page.goto(`http://127.0.0.1:${server.address().port}/index.html`);
  await page.waitForTimeout(250);
  const dataUrl = await 幀(page);
  const outAbs = join(ROOT, 出);
  mkdirSync(dirname(outAbs), { recursive: true });
  writeFileSync(outAbs, Buffer.from(dataUrl.split(',')[1], 'base64'));
  console.log('機出', 出);
  await browser.close();
  await new Promise(r => server.close(r));
}

module.exports = { 合幀, ROOT };
