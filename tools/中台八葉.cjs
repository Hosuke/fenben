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
    const 圓 = (cx, cy, r) => { x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.stroke(); };
    const 線 = (x1, y1, x2, y2) => { x.beginPath(); x.moveTo(x1, y1); x.lineTo(x2, y2); x.stroke(); };
    const 方連珠 = (定, 橫) => {
      for (let q = 132; q <= 1868; q += 28) {
        if (Math.abs(q - c) < 130) continue;
        圓(橫 ? q : 定, 橫 ? 定 : q, 4.1);
      }
    };
    const 三鈷杵 = (cx, cy, 角, L = 126) => {
      x.save(); x.translate(cx, cy); x.rotate(角); x.lineWidth = 1.7;
      圓(0, 0, 9); 圓(0, 0, 3.2);
      for (const s of [-1, 1]) {
        線(s * 9, 0, s * 31, 0);
        x.beginPath(); x.moveTo(s * 25, -10); x.quadraticCurveTo(s * 36, -8, s * 41, 0);
        x.quadraticCurveTo(s * 36, 8, s * 25, 10); x.stroke();
        線(s * 40, 0, s * L / 2, 0);
        x.beginPath(); x.moveTo(s * 38, -8); x.quadraticCurveTo(s * 54, -15, s * L / 2, 0); x.stroke();
        x.beginPath(); x.moveTo(s * 38, 8); x.quadraticCurveTo(s * 54, 15, s * L / 2, 0); x.stroke();
      }
      x.restore();
    };
    const 門闕 = (cx, cy, 角) => {
      x.save(); x.translate(cx, cy); x.rotate(角); x.lineWidth = 2;
      for (const s of [-1, 1]) {
        x.strokeRect(s * 62 - 7, 22, 14, 82);
        線(s * 84, 10, s * 84, 100);
        線(s * 98, 20, s * 98, 92);
        x.beginPath(); x.moveTo(s * 98, 24); x.lineTo(s * 116, 34); x.lineTo(s * 98, 45); x.stroke();
      }
      線(-116, 18, 116, 18); 線(-94, 2, 94, 2);
      x.beginPath(); x.moveTo(-76, 2); x.quadraticCurveTo(0, -25, 76, 2); x.stroke();
      x.beginPath(); x.moveTo(-34, 104); x.lineTo(-34, 48); x.lineTo(34, 48); x.lineTo(34, 104); x.stroke();
      線(0, -25, 0, -38); 圓(0, -44, 5);
      x.restore();
    };
    const 雜寶 = (kind, cx, cy, s, 角 = 0) => {
      x.save(); x.translate(cx, cy); x.rotate(角); x.lineWidth = 1.35;
      if (kind === '輪') {
        圓(0, 0, s); 圓(0, 0, s * 0.23);
        for (let i = 0; i < 8; i++) {
          const a = Math.PI * i / 4;
          線(s * 0.28 * Math.cos(a), s * 0.28 * Math.sin(a), s * 0.86 * Math.cos(a), s * 0.86 * Math.sin(a));
        }
      } else if (kind === '螺') {
        x.beginPath(); x.moveTo(-s * 0.68, s * 0.54);
        x.quadraticCurveTo(-s * 0.9, -s * 0.36, 0, -s * 0.76);
        x.quadraticCurveTo(s * 0.9, -s * 0.34, s * 0.62, s * 0.58);
        x.quadraticCurveTo(0, s * 0.9, -s * 0.68, s * 0.54); x.stroke();
        x.beginPath(); x.arc(0, 0, s * 0.42, 0.2, Math.PI * 2.15); x.stroke();
      } else if (kind === '珠') {
        x.beginPath(); x.moveTo(0, -s); x.lineTo(s * 0.74, 0); x.lineTo(0, s); x.lineTo(-s * 0.74, 0); x.closePath(); x.stroke();
        圓(0, 0, s * 0.22); 線(0, s, 0, s * 1.38);
      } else {
        x.beginPath(); x.moveTo(-s, 0); x.quadraticCurveTo(0, -s * 0.9, s, 0); x.stroke();
        x.beginPath(); x.moveTo(-s, 0); x.quadraticCurveTo(0, s * 0.35, s, 0); x.stroke();
        線(0, -s * 0.86, 0, s * 1.2); 圓(0, s * 1.3, s * 0.11);
      }
      x.restore();
    };

    // 蓮外方界：雙線留四門，線間連珠；四隅各鎮三鈷杵印。
    x.save(); x.strokeStyle = 硃; x.globalAlpha = 0.46; x.lineWidth = 2.7;
    for (const q of [62, 98]) {
      線(q, q, c - 132, q); 線(c + 132, q, W - q, q);
      線(q, H - 142 - q, c - 132, H - 142 - q); 線(c + 132, H - 142 - q, W - q, H - 142 - q);
      線(q, q, q, c - 132); 線(q, c + 132, q, H - 142 - q);
      線(W - q, q, W - q, c - 132); 線(W - q, c + 132, W - q, H - 142 - q);
    }
    x.strokeStyle = 金; x.globalAlpha = 0.58; x.lineWidth = 1.2;
    方連珠(80, true); 方連珠(1858, true); 方連珠(80, false); 方連珠(1920, false);
    門闕(c, 68, 0); 門闕(c, 1870, Math.PI);
    門闕(68, c, -Math.PI / 2); 門闕(1932, c, Math.PI / 2);
    三鈷杵(222, 222, Math.PI / 4); 三鈷杵(1778, 222, -Math.PI / 4);
    三鈷杵(222, 1718, -Math.PI / 4); 三鈷杵(1778, 1718, Math.PI / 4);
    x.restore();

    // 方界內、蓮葉外之虛空，雜寶定序疏點（禁 random）。
    x.save(); x.strokeStyle = 金; x.globalAlpha = 0.43;
    [
      ['輪', 1535, 265, 19, 0], ['螺', 465, 265, 19, -0.32],
      ['蓋', 1735, 520, 19, 0.18], ['珠', 265, 520, 18, -0.12],
      ['螺', 1735, 1480, 18, 0.35], ['輪', 265, 1480, 18, 0],
      ['珠', 1535, 1735, 18, 0.12], ['蓋', 465, 1735, 19, -0.18],
    ].forEach(args => 雜寶(...args));
    x.restore();

    // 八葉實畫：外廓、內緣、主脈與支脈，瓣尖另作反卷一勾。
    const 畫瓣 = (a) => {
      x.save(); x.translate(c, c); x.rotate(a); x.strokeStyle = 金;
      x.globalAlpha = 0.56; x.lineWidth = 2.7;
      x.beginPath(); x.moveTo(266, -112);
      x.bezierCurveTo(455, -255, 760, -250, 874, -30);
      x.quadraticCurveTo(905, 0, 874, 30);
      x.bezierCurveTo(760, 250, 455, 255, 266, 112); x.stroke();
      x.globalAlpha = 0.3; x.lineWidth = 1.45;
      x.beginPath(); x.moveTo(291, -91);
      x.bezierCurveTo(485, -217, 745, -208, 849, -26);
      x.quadraticCurveTo(875, 0, 849, 26);
      x.bezierCurveTo(745, 208, 485, 217, 291, 91); x.stroke();
      x.globalAlpha = 0.42; x.lineWidth = 1.35;
      // 脈繞尊而行，葉腹中央留白承像；尊筆雖無填，亦不令脈線透身。
      x.beginPath(); x.moveTo(286, 0); x.quadraticCurveTo(335, -2, 388, 0); x.stroke();
      x.beginPath(); x.moveTo(790, 0); x.quadraticCurveTo(822, -1, 848, 0); x.stroke();
      for (const s of [-1, 1]) {
        x.beginPath(); x.moveTo(338, 0); x.quadraticCurveTo(505, s * 202, 690, s * 158);
        x.quadraticCurveTo(770, s * 126, 830, s * 48); x.stroke();
        x.beginPath(); x.moveTo(405, s * 92); x.quadraticCurveTo(505, s * 176, 615, s * 184); x.stroke();
      }
      x.globalAlpha = 0.62; x.lineWidth = 1.8;
      x.beginPath(); x.moveTo(849, -23); x.quadraticCurveTo(915, -16, 884, 19);
      x.quadraticCurveTo(860, 38, 872, 2); x.stroke();
      x.restore();
    };
    for (let i = 0; i < 8; i++) 畫瓣(-Math.PI / 2 + (Math.PI / 4) * i);

    // 蓮心、蓮瓣之間：蕊絲放射，絲端綴珠；不掩諸尊。
    x.save(); x.strokeStyle = 金; x.globalAlpha = 0.5; x.lineWidth = 1.25;
    for (let i = 0; i < 64; i++) {
      const a = Math.PI * 2 * i / 64;
      const r1 = 286 + (i % 2) * 5, r2 = 330 + (i % 3) * 7;
      x.beginPath(); x.moveTo(c + r1 * Math.cos(a), c + r1 * Math.sin(a));
      x.quadraticCurveTo(c + (r2 - 12) * Math.cos(a + 0.025), c + (r2 - 12) * Math.sin(a + 0.025), c + r2 * Math.cos(a), c + r2 * Math.sin(a)); x.stroke();
      if (i % 2 === 0) 圓(c + (r2 + 5) * Math.cos(a), c + (r2 + 5) * Math.sin(a), 3.5);
    }
    x.globalAlpha = 0.58; x.lineWidth = 2.5; 圓(c, c, 286);
    x.globalAlpha = 0.3; x.lineWidth = 1.35; 圓(c, c, 273);
    x.restore();
    const 落 = (id, px, py, R) => {
      const c2 = document.createElement('canvas'); c2.width = W; c2.height = H;
      const x2 = c2.getContext('2d');
      x2.translate(px, py);
      x2.strokeStyle = 金; x2.fillStyle = 金;
      白描(x2, R, 依號[id].t, `${id}|t`);
      x.drawImage(c2, 0, 0);
    };
    // 八葉諸尊（上東起順時針）：方位與原譜不移，僅同率放大至約七成葉腹。
    葉譜.forEach((id, i) => {
      const a = -Math.PI / 2 + (Math.PI / 4) * i;
      落(id, c + 595 * Math.cos(a), c + 595 * Math.sin(a), 255);
    });
    落('center', c, c, 310);
    // 卷末注記
    x.fillStyle = 灰; x.textAlign = 'center'; x.font = '32px "Songti TC", serif';
    x.fillText('胎藏中台八葉院九尊 · 上東之向（上寶幢・右開敷華王・下無量壽・左天鼓雷音，四隅普文觀彌）', c, 1985);
    x.font = '25px "Songti TC", serif'; x.globalAlpha = 0.7;
    x.fillText('誦戒 1+8＝9 · 八葉實畫・金剛牆四門 · miroku|t 左手印相候曼荼羅図典覆核（信待核）', c, 2030);
    x.globalAlpha = 1;
    return cv.toDataURL('image/png');
  }, 葉譜);
  mkdirSync(join(ROOT, '圖錄/壇城'), { recursive: true });
  writeFileSync(join(ROOT, '圖錄/壇城/中台八葉院九尊一幀.png'), Buffer.from(dataUrl.split(',')[1], 'base64'));
  console.log('機出 圖錄/壇城/中台八葉院九尊一幀.png（誦戒 9 過）');
  await browser.close(); server.close();
})().catch(e => { console.error(e); process.exit(1); });
