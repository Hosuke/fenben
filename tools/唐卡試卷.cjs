// 唐卡試卷 · tools/唐卡試卷.cjs —— 構圖層第一驗：橫三世一幀（機出 圖錄/）
// 三尊同幀（中釋迦・左西彌陀・右東藥師，面南觀者之位），幀施八大線之印記
// （梵線・對角・水平・邊框——藏地打格之制，T1419「梵絣」同源）。
// 用法：npm run build 後 node tools/唐卡試卷.cjs
const { createServer } = require('http');
const { readFile } = require('fs/promises');
const { writeFileSync, readdirSync, existsSync, mkdirSync } = require('fs');
const { join, extname, resolve, sep } = require('path');
const os = require('os');
const ROOT = join(__dirname, '..');
function 覓playwright() {
  try { return require(join(ROOT, 'node_modules/playwright-core')); } catch {}
  const npx = join(os.homedir(), '.npm/_npx');
  for (const d of readdirSync(npx)) { const p = join(npx, d, 'node_modules/playwright-core'); if (existsSync(p)) return require(p); }
  throw new Error('未見 playwright-core：於倉內 npm i -D playwright-core（勿提交 package.json 之變）');
}
function 覓headless() {
  const base = join(os.homedir(), 'Library/Caches/ms-playwright');
  const 尋 = (dir, depth) => { if (depth > 3 || !existsSync(dir)) return null;
    for (const e of readdirSync(dir, { withFileTypes: true })) { const p = join(dir, e.name);
      if (e.isFile() && e.name === 'chrome-headless-shell') return p;
      if (e.isDirectory()) { const r = 尋(p, depth + 1); if (r) return r; } } return null; };
  for (const d of readdirSync(base).filter(x => x.startsWith('chromium_headless_shell-')).sort().reverse()) {
    const exe = 尋(join(base, d), 0); if (exe) return exe; }
  throw new Error('未見 chrome-headless-shell：npx playwright install chromium-headless-shell');
}
(async () => {
  const { chromium } = 覓playwright();
  const MIME = { '.html': 'text/html', '.js': 'text/javascript' };
  const server = createServer(async (req, res) => {
    try {
      const raw = decodeURIComponent(req.url.split('?')[0]);
      const p = resolve(ROOT, raw === '/' ? 'index.html' : '.' + raw);
      if (p !== resolve(ROOT) && !p.startsWith(resolve(ROOT) + sep)) { res.writeHead(403); res.end(); return; }
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
  const dataUrl = await page.evaluate(async () => {
    const { 依號 } = await import('/dist/yigui.js');
    const { 白描 } = await import('/dist/baimiao.js');
    const W = 2400, H = 1560;
    const c = document.createElement('canvas'); c.width = W; c.height = H;
    const x = c.getContext('2d');
    x.fillStyle = '#0d1124'; x.fillRect(0, 0, W, H);
    // 八大線之印記（藏地打格之制，淡硃）：邊框四・水平一・梵線（各尊中軸）・對角二
    x.strokeStyle = '#b0402c'; x.globalAlpha = 0.14; x.lineWidth = 2;
    x.strokeRect(60, 60, W - 120, H - 120);
    x.beginPath(); x.moveTo(60, H / 2); x.lineTo(W - 60, H / 2); x.stroke();
    x.beginPath(); x.moveTo(60, 60); x.lineTo(W - 60, H - 60); x.stroke();
    x.beginPath(); x.moveTo(W - 60, 60); x.lineTo(60, H - 60); x.stroke();
    // 三尊：中釋迦（居中略巨，唐卡中尊之尊），左西彌陀、右東藥師（面南觀者之位）
    const 位 = [
      { id: 'mida', cx: W * 0.21, cy: H * 0.56, R: 340 },
      { id: 'shaka', cx: W * 0.5, cy: H * 0.5, R: 420 },
      { id: 'yakushi', cx: W * 0.79, cy: H * 0.56, R: 340 },
    ];
    for (const { cx } of 位) {
      x.beginPath(); x.moveTo(cx, 60); x.lineTo(cx, H - 60); x.stroke();   // 梵線（各尊中軸）
    }
    x.globalAlpha = 1;
    for (const { id, cx, cy, R } of 位) {
      const face = 依號[id].h;
      const c2 = document.createElement('canvas'); c2.width = W; c2.height = H;
      const x2 = c2.getContext('2d');
      x2.translate(cx, cy);
      x2.strokeStyle = '#d8b36a'; x2.fillStyle = '#d8b36a';
      白描(x2, R, face, `${id}|h`);
      x.drawImage(c2, 0, 0);
    }
    return c.toDataURL('image/png');
  });
  mkdirSync(join(ROOT, '圖錄/唐卡試卷'), { recursive: true });
  writeFileSync(join(ROOT, '圖錄/唐卡試卷/橫三世一幀.png'), Buffer.from(dataUrl.split(',')[1], 'base64'));
  console.log('機出 圖錄/唐卡試卷/橫三世一幀.png');
  await browser.close(); server.close();
})().catch(e => { console.error(e); process.exit(1); });
