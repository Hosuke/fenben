// 藥師唐卡 · tools/藥師唐卡.cjs —— 構圖層第二驗：藥師十五尊一幀（機出 圖錄/）
// 基本式依鎌倉藥師曼荼羅（文化遺產線上 507368 明文）：三尊＋十二神將左右各六。
// 中尊藥師坐（舉身光），日光＝觀者右・月光＝觀者左（ja.wiki 薬師三尊，考據卷）；
// 十二將左右各六依名序分列（**排布無定式，自運候典**——逐重圖式闕，勿臆造）。
// 幀施八大線之印記（藏地打格之制）。用法：npm run build 後 node tools/藥師唐卡.cjs
const { createServer } = require('http');
const { readFile } = require('fs/promises');
const { writeFileSync, readdirSync, existsSync, mkdirSync } = require('fs');
const { join, extname, resolve, sep } = require('path');
const os = require('os');
const ROOT = join(__dirname, '..');
function 覓playwright() {
  try { return require(join(ROOT, 'node_modules/playwright-core')); } catch {}
  const npx = join(os.homedir(), '.npm/_npx');
  if (existsSync(npx)) for (const d of readdirSync(npx)) { const p = join(npx, d, 'node_modules/playwright-core'); if (existsSync(p)) return require(p); }
  throw new Error('未見 playwright-core：於倉內 npm i -D playwright-core（勿提交 package.json 之變）');
}
function 覓headless() {
  const base = join(os.homedir(), 'Library/Caches/ms-playwright');
  const 尋 = (dir, depth) => { if (depth > 3 || !existsSync(dir)) return null;
    for (const e of readdirSync(dir, { withFileTypes: true })) { const p = join(dir, e.name);
      if (e.isFile() && e.name === 'chrome-headless-shell') return p;
      if (e.isDirectory()) { const r = 尋(p, depth + 1); if (r) return r; } } return null; };
  if (existsSync(base)) for (const d of readdirSync(base).filter(x => x.startsWith('chromium_headless_shell-')).sort().reverse()) {
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
    const { 執筆 } = await import('/dist/bi.js');
    const { 舉身光, 如意雲 } = await import('/dist/bujian/jing.js');
    const W = 2000, H = 2300;
    const c = document.createElement('canvas'); c.width = W; c.height = H;
    const x = c.getContext('2d');
    x.fillStyle = '#0d1124'; x.fillRect(0, 0, W, H);
    // 八大線之印記（淡硃）：邊框・水平・中軸梵線・對角
    x.strokeStyle = '#b0402c'; x.globalAlpha = 0.14; x.lineWidth = 2;
    x.strokeRect(60, 60, W - 120, H - 120);
    x.beginPath(); x.moveTo(60, H / 2); x.lineTo(W - 60, H / 2); x.stroke();
    x.beginPath(); x.moveTo(W / 2, 60); x.lineTo(W / 2, H - 60); x.stroke();
    x.beginPath(); x.moveTo(60, 60); x.lineTo(W - 60, H - 60); x.stroke();
    x.beginPath(); x.moveTo(W - 60, 60); x.lineTo(60, H - 60); x.stroke();
    x.globalAlpha = 1;
    const 落 = (id, cx, cy, R, 光) => {
      const face = 依號[id].h;
      const c2 = document.createElement('canvas'); c2.width = W; c2.height = H;
      const x2 = c2.getContext('2d');
      x2.translate(cx, cy);
      x2.strokeStyle = '#d8b36a'; x2.fillStyle = '#d8b36a';
      const b0 = 執筆(x2, R);
      b0.ctx.lineWidth = b0.W_OUT; b0.ctx.lineCap = 'round';
      if (光) 舉身光(b0);
      白描(x2, R, face, `${id}|h`);
      x.drawImage(c2, 0, 0);
    };
    // 中尊藥師（坐，舉身光）；日光＝觀者右・月光＝觀者左（立）
    落('yakushi', W * 0.5, H * 0.42, 620, true);
    落('gakko', W * 0.305, H * 0.585, 350);
    落('nikko', W * 0.695, H * 0.585, 350);
    // 十二神將左右各六（名序分列：右列宮毘羅→珊底羅、左列因達羅→毘羯羅——自運候典）
    const 右列 = ['kubira', 'basara', 'mekira', 'antera', 'anira', 'santera'];
    const 左列 = ['indara', 'haira', 'makora', 'shindara', 'shotora', 'bikara'];
    for (let i = 0; i < 6; i++) {
      const cy = H * (0.16 + i * 0.143);
      落(左列[i], W * 0.107, cy, 168);
      落(右列[i], W * 0.893, cy, 168);
    }
    // 如意雲：上界二朵（讓中尊光尖）
    {
      const c3 = document.createElement('canvas'); c3.width = W; c3.height = H;
      const x3 = c3.getContext('2d');
      x3.translate(W / 2, H * 0.42);
      x3.strokeStyle = '#d8b36a'; x3.fillStyle = '#d8b36a';
      const b3 = 執筆(x3, 620);
      b3.ctx.lineWidth = b3.W_OUT; b3.ctx.lineCap = 'round';
      如意雲(b3, -44, -32, 2.3, 1);
      如意雲(b3, 44, -32, 2.3, -1);
      x.drawImage(c3, 0, 0);
    }
    return c.toDataURL('image/png');
  });
  mkdirSync(join(ROOT, '圖錄/唐卡試卷'), { recursive: true });
  writeFileSync(join(ROOT, '圖錄/唐卡試卷/藥師十五尊一幀.png'), Buffer.from(dataUrl.split(',')[1], 'base64'));
  console.log('機出 圖錄/唐卡試卷/藥師十五尊一幀.png');
  await browser.close(); server.close();
})().catch(e => { console.error(e); process.exit(1); });
