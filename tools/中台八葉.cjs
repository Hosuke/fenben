// 中台八葉 · tools/中台八葉.cjs —— 構圖層第四驗：胎藏中台八葉院九尊一幀
// 排布之制（現圖通例）：胎藏掛幅之向＝上東（金剛界之反）。八葉蓮華：
// 中臺大日（法界定印），四方四佛——上東寶幢・右南開敷華王・下西無量壽・
// 左北天鼓雷音；四隅四菩薩——東南（右上）普賢・西南（右下）文殊・
// 西北（左下）觀音・東北（左上）彌勒。九尊皆庫內胎藏專筆活渲
// （miroku|t 信待核——左手印相候曼荼羅図典覆核，注於卷面）。
// 用法：npm run build 後 node tools/中台八葉.cjs
const { createServer } = require('http');
const { readFile } = require('fs/promises');
const { writeFileSync, readdirSync, existsSync, mkdirSync } = require('fs');
const { join, extname, resolve, sep } = require('path');
const os = require('os');
const assert = require('assert');
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

// ── 葉譜（上東起，順時針）＋誦戒 ──────────────────────────────────────────────
const 葉譜 = [
  'east',     // 上 · 東 寶幢
  'fugen',    // 右上 · 東南 普賢
  'south',    // 右 · 南 開敷華王
  'monju',    // 右下 · 西南 文殊
  'west',     // 下 · 西 無量壽
  'kannon',   // 左下 · 西北 觀音
  'north',    // 左 · 北 天鼓雷音
  'miroku',   // 左上 · 東北 彌勒
];
assert.strictEqual(葉譜.length + 1, 9, '誦戒破：中台八葉九尊之數不合');

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
  const dataUrl = await page.evaluate(async (葉譜) => {
    const { 依號 } = await import('/dist/yigui.js');
    const { 白描 } = await import('/dist/baimiao.js');
    const W = 2000, H = 2080, c = 1000;
    const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
    const x = cv.getContext('2d');
    x.fillStyle = '#0d1124'; x.fillRect(0, 0, W, H);
    const 金 = '#d8b36a', 灰 = '#6b7186', 硃 = '#b0402c';
    // 外郭（淡硃）
    x.strokeStyle = 硃; x.globalAlpha = 0.2; x.lineWidth = 2.5;
    x.strokeRect(70, 70, 1860, 1860);
    x.globalAlpha = 1;
    // 八葉：瓣廓（金淡，雙緣）——尖外基內，瓣間相依
    x.strokeStyle = 金; x.lineWidth = 2.5;
    for (let i = 0; i < 8; i++) {
      const a = -Math.PI / 2 + (Math.PI / 4) * i;
      const 尖 = [c + 880 * Math.cos(a), c + 880 * Math.sin(a)];
      for (const [基r, 張] of [[330, 0.42], [330, 0.30]]) {
        x.globalAlpha = 張 > 0.35 ? 0.5 : 0.28;
        const b1 = [c + 基r * Math.cos(a - 張), c + 基r * Math.sin(a - 張)];
        const b2 = [c + 基r * Math.cos(a + 張), c + 基r * Math.sin(a + 張)];
        const m1 = [c + 700 * Math.cos(a - 張 * 0.9), c + 700 * Math.sin(a - 張 * 0.9)];
        const m2 = [c + 700 * Math.cos(a + 張 * 0.9), c + 700 * Math.sin(a + 張 * 0.9)];
        x.beginPath(); x.moveTo(b1[0], b1[1]);
        x.quadraticCurveTo(m1[0], m1[1], 尖[0], 尖[1]);
        x.quadraticCurveTo(m2[0], m2[1], b2[0], b2[1]);
        x.stroke();
      }
    }
    x.globalAlpha = 1;
    // 蕊心雙環
    x.globalAlpha = 0.5;
    x.beginPath(); x.arc(c, c, 315, 0, 7); x.stroke();
    x.globalAlpha = 0.28;
    x.beginPath(); x.arc(c, c, 298, 0, 7); x.stroke();
    x.globalAlpha = 1;
    const 落 = (id, px, py, R) => {
      const c2 = document.createElement('canvas'); c2.width = W; c2.height = H;
      const x2 = c2.getContext('2d');
      x2.translate(px, py);
      x2.strokeStyle = 金; x2.fillStyle = 金;
      白描(x2, R, 依號[id].t, `${id}|t`);
      x.drawImage(c2, 0, 0);
    };
    // 八葉諸尊（上東起順時針），中臺大日殿後
    葉譜.forEach((id, i) => {
      const a = -Math.PI / 2 + (Math.PI / 4) * i;
      落(id, c + 595 * Math.cos(a), c + 595 * Math.sin(a), 150);
    });
    落('center', c, c, 235);
    // 卷末注記
    x.fillStyle = 灰; x.textAlign = 'center'; x.font = '32px "Songti TC", serif';
    x.fillText('胎藏中台八葉院九尊 · 上東之向（上寶幢・右開敷華王・下無量壽・左天鼓雷音，四隅普文觀彌）', c, 1985);
    x.font = '25px "Songti TC", serif'; x.globalAlpha = 0.7;
    x.fillText('誦戒 1+8＝9 · 瓣形自運候現圖精校 · miroku|t 左手印相候曼荼羅図典覆核（信待核）', c, 2030);
    x.globalAlpha = 1;
    return cv.toDataURL('image/png');
  }, 葉譜);
  mkdirSync(join(ROOT, '圖錄/壇城'), { recursive: true });
  writeFileSync(join(ROOT, '圖錄/壇城/中台八葉院九尊一幀.png'), Buffer.from(dataUrl.split(',')[1], 'base64'));
  console.log('機出 圖錄/壇城/中台八葉院九尊一幀.png（誦戒 9 過）');
  await browser.close(); server.close();
})().catch(e => { console.error(e); process.exit(1); });
