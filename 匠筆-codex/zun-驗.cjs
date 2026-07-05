const { createServer } = require('http');
const { readFile } = require('fs/promises');
const { existsSync, mkdirSync, readdirSync } = require('fs');
const { join, extname, resolve, sep } = require('path');
const os = require('os');

const ROOT = join(__dirname, '..');
const OUT = join(__dirname, '截圖');

function 覓playwright() {
  try { return require('playwright-core'); } catch { /* use npx cache below */ }
  const npx = join(os.homedir(), '.npm/_npx');
  if (existsSync(npx)) {
    for (const d of readdirSync(npx)) {
      const p = join(npx, d, 'node_modules/playwright-core');
      if (existsSync(p)) return require(p);
    }
  }
  throw new Error('未見 playwright-core');
}

function 覓headless() {
  const base = process.platform === 'darwin'
    ? join(os.homedir(), 'Library/Caches/ms-playwright')
    : join(os.homedir(), '.cache/ms-playwright');
  const name = process.platform === 'win32' ? 'chrome-headless-shell.exe' : 'chrome-headless-shell';
  const seek = (dir, depth) => {
    if (depth > 4 || !existsSync(dir)) return null;
    for (const ent of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, ent.name);
      if (ent.isFile() && ent.name === name) return p;
      if (ent.isDirectory()) {
        const hit = seek(p, depth + 1);
        if (hit) return hit;
      }
    }
    return null;
  };
  const dirs = existsSync(base)
    ? readdirSync(base).filter(d => d.startsWith('chromium_headless_shell-')).sort().reverse()
    : [];
  for (const d of dirs) {
    const hit = seek(join(base, d), 0);
    if (hit) return hit;
  }
  throw new Error('未見 chrome-headless-shell');
}

function server() {
  const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' };
  const srv = createServer(async (req, res) => {
    try {
      const raw = decodeURIComponent(req.url.split('?')[0]);
      const p = resolve(ROOT, raw === '/' ? '匠筆-codex/zun-codex.html' : `.${raw}`);
      if (p !== resolve(ROOT) && !p.startsWith(resolve(ROOT) + sep)) {
        res.writeHead(403); res.end(); return;
      }
      const body = await readFile(p);
      res.writeHead(200, { 'content-type': MIME[extname(p)] || 'application/octet-stream' });
      res.end(body);
    } catch {
      res.writeHead(404); res.end();
    }
  });
  return srv;
}

(async () => {
  const round = process.argv[2] || 'round';
  mkdirSync(OUT, { recursive: true });
  const srv = server().listen(0, '127.0.0.1');
  await new Promise(r => srv.once('listening', r));
  const { chromium } = 覓playwright();
  const browser = await chromium.launch({ executablePath: 覓headless() });
  const page = await browser.newPage({ viewport: { width: 1960, height: 980 }, deviceScaleFactor: 1 });
  page.on('pageerror', e => console.log('[pageerror]', e.message));
  const url = `http://127.0.0.1:${srv.address().port}/匠筆-codex/zun-codex.html?grid=1`;
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__zunCodexReady === true);
  await page.waitForTimeout(350);
  const full = join(OUT, `${round}-full.png`);
  await page.screenshot({ path: full, fullPage: true });
  const cards = await page.locator('.card').all();
  for (let i = 0; i < cards.length; i++) {
    await cards[i].screenshot({ path: join(OUT, `${round}-${i + 1}.png`) });
  }
  await browser.close();
  srv.close();
  console.log(`截圖 ${round}: ${full}`);
})().catch(e => {
  console.error(e);
  process.exit(1);
});
