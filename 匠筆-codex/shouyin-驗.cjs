const { createServer } = require('http');
const { readFile } = require('fs/promises');
const { mkdirSync, readdirSync, existsSync, writeFileSync } = require('fs');
const { join, extname, resolve, sep } = require('path');
const os = require('os');

const ROOT = join(__dirname, '..');
const OUT = join(__dirname, 'selfcheck');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' };

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
  const exeName = process.platform === 'win32' ? 'chrome-headless-shell.exe' : 'chrome-headless-shell';
  const walk = (dir, depth) => {
    if (depth > 4 || !existsSync(dir)) return null;
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, e.name);
      if (e.isFile() && e.name === exeName) return p;
      if (e.isDirectory()) {
        const found = walk(p, depth + 1);
        if (found) return found;
      }
    }
    return null;
  };
  const dirs = existsSync(base)
    ? readdirSync(base).filter(d => d.startsWith('chromium_headless_shell-')).sort().reverse()
    : [];
  for (const d of dirs) {
    const found = walk(join(base, d), 0);
    if (found) return found;
  }
  throw new Error('未見 chrome-headless-shell');
}

async function main() {
  const round = process.argv[2] || 'round-check';
  const pagePath = process.argv[3] || '/匠筆-codex/shouyin-codex.html';
  mkdirSync(OUT, { recursive: true });

  const server = createServer(async (req, res) => {
    try {
      const raw = decodeURIComponent(req.url.split('?')[0]);
      const p = resolve(ROOT, raw === '/' ? 'index.html' : '.' + raw);
      if (p !== resolve(ROOT) && !p.startsWith(resolve(ROOT) + sep)) {
        res.writeHead(403); res.end(); return;
      }
      const body = await readFile(p);
      res.writeHead(200, { 'content-type': MIME[extname(p)] || 'application/octet-stream' });
      res.end(body);
    } catch {
      res.writeHead(404); res.end();
    }
  }).listen(0, '127.0.0.1');
  await new Promise(r => server.once('listening', r));

  const { chromium } = 覓playwright();
  const browser = await chromium.launch({ executablePath: 覓headless() });
  const page = await browser.newPage({ viewport: { width: 1460, height: 1200 }, deviceScaleFactor: 1 });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });

  await page.goto(`http://127.0.0.1:${server.address().port}${pagePath}`);
  await page.waitForTimeout(650);
  await page.screenshot({ path: join(OUT, `shouyin-${round}-full.png`), fullPage: true });
  const cards = await page.locator('.card').all();
  for (let i = 0; i < cards.length; i++) {
    await cards[i].screenshot({ path: join(OUT, `${round}-card-${String(i + 1).padStart(2, '0')}.png`) });
  }
  const canvases = await page.locator('canvas').count();
  writeFileSync(join(OUT, `shouyin-${round}.json`), JSON.stringify({
    pagePath,
    cards: cards.length,
    canvases,
    errors,
  }, null, 2));
  await browser.close();
  server.close();
  console.log(`截圖 ${round}: ${cards.length} cards / ${canvases} canvases / ${errors.length} errors`);
  if (errors.length) {
    for (const e of errors) console.log('[error]', e);
    process.exitCode = 1;
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
