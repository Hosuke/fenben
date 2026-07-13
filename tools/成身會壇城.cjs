// 成身會壇城 · tools/成身會壇城.cjs —— 構圖層第三驗：金剛界成身會三十七尊一幀
// 排布之制（現圖通例）：掛幅之向＝下東・左南・上西・右北。
// 大圓輪中五解脫輪：中央大日（四波羅蜜繞之——金東寶南法西羯磨北）、
// 下東阿閦（薩王愛喜）、左南寶生（寶光幢笑）、上西彌陀（法利因語）、
// 右北不空成就（業護牙拳）——四親近首者向壇心，餘三順時針〔輪內方位依通例，
// 細位候現圖校〕。內四供居輪間四隅、外四供居外院四隅、四攝居四門。
// 賢劫千佛・外金剛部二十天等外院眷屬未筆（issue #1 候波），故外院唯四供四攝。
// 三十七尊皆庫內已核之筆活渲。用法：npm run build 後 node tools/成身會壇城.cjs
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

// ── 壇譜（誦戒：37 尊之數）───────────────────────────────────────────────────
const 壇譜 = {
  輪: [
    { 佛: 'center', 繞: ['p-kon', 'p-ho', 'p-hou', 'p-katsu'], 位: [0, 0] },      // 中央大日＋四波羅蜜
    { 佛: 'east',   繞: ['fugen', 'k-o', 'k-ai', 'k-ki'],      位: [0, 1] },      // 下東阿閦
    { 佛: 'south',  繞: ['kokuzo', 'k-ko', 'k-do', 'k-sho'],   位: [-1, 0] },     // 左南寶生
    { 佛: 'west',   繞: ['kannon', 'monju', 'miroku', 'k-go'], 位: [0, -1] },     // 上西彌陀
    { 佛: 'north',  繞: ['k-gyo', 'k-gou', 'k-ge', 'k-ken'],   位: [1, 0] },      // 右北不空成就
  ],
  內四供: [['g-ki', -1, 1], ['g-man', -1, -1], ['g-ka', 1, -1], ['g-bu', 1, 1]],   // 嬉鬘歌舞（隅依旋向）
  外四供: [['g-ko', -1, 1], ['g-ke', -1, -1], ['g-to', 1, -1], ['g-zu', 1, 1]],    // 香華燈塗
  四攝: [['s-ko', 0, 1], ['s-saku', -1, 0], ['s-sa', 0, -1], ['s-rei', 1, 0]],     // 鉤索鎖鈴＝東南西北門
};
{
  const 數 = 壇譜.輪.length + 壇譜.輪.reduce((n, w) => n + w.繞.length, 0)
    + 壇譜.內四供.length + 壇譜.外四供.length + 壇譜.四攝.length;
  assert.strictEqual(數, 37, '誦戒破：成身會三十七尊之數不合');
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
  const dataUrl = await page.evaluate(async (壇譜) => {
    const { 依號 } = await import('/dist/yigui.js');
    const { 白描 } = await import('/dist/baimiao.js');
    const W = 2400, H = 2480, c = 1200, cy = 1170;
    const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
    const x = cv.getContext('2d');
    x.fillStyle = '#0d1124'; x.fillRect(0, 0, W, H);
    const 金 = '#d8b36a', 灰 = '#6b7186', 硃 = '#b0402c';
    const 圓 = (cx, cy, r) => { x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.stroke(); };
    const 連珠環 = (cx, cy, r, n, 珠徑) => {
      for (let i = 0; i < n; i++) {
        const a = Math.PI * 2 * i / n;
        圓(cx + r * Math.cos(a), cy + r * Math.sin(a), 珠徑);
      }
    };
    const 月輪 = (cx, cy, r, alpha = 0.42) => {
      x.save(); x.strokeStyle = 金; x.globalAlpha = alpha;
      x.lineWidth = 1.8; 圓(cx, cy, r);
      x.globalAlpha = alpha * 0.72; x.lineWidth = 0.9; 圓(cx, cy, r - 7);
      x.restore();
    };
    const 方連珠 = (a, b, 定, 橫) => {
      const step = 32;
      for (let q = a; q <= b; q += step) 圓(橫 ? q : 定, 橫 ? 定 : q, 4.2);
    };
    const 金剛杵 = (cx, cy, 角, L = 112) => {
      x.save(); x.translate(cx, cy); x.rotate(角);
      x.lineWidth = 1.6; 圓(0, 0, 8); 圓(0, 0, 3);
      for (const s of [-1, 1]) {
        x.beginPath(); x.moveTo(s * 8, 0); x.lineTo(s * 29, 0); x.stroke();
        x.beginPath();
        x.moveTo(s * 24, -9); x.quadraticCurveTo(s * 34, -7, s * 39, 0);
        x.quadraticCurveTo(s * 34, 7, s * 24, 9); x.stroke();
        x.beginPath(); x.moveTo(s * 38, 0); x.lineTo(s * L / 2, 0); x.stroke();
        x.beginPath(); x.moveTo(s * 36, -7); x.quadraticCurveTo(s * 49, -12, s * L / 2, 0); x.stroke();
        x.beginPath(); x.moveTo(s * 36, 7); x.quadraticCurveTo(s * 49, 12, s * L / 2, 0); x.stroke();
      }
      x.restore();
    };
    const 門樓 = (cx, cy, 角) => {
      x.save(); x.translate(cx, cy); x.rotate(角);
      x.lineWidth = 2.2;
      // 丁字門闕：雙柱承兩重出跳橫枋，門洞朝壇心。
      for (const s of [-1, 1]) {
        x.strokeRect(s * 78 - 8, -34, 16, 112);
        x.beginPath(); x.moveTo(s * 104, -66); x.lineTo(s * 104, 70); x.stroke();
        x.beginPath(); x.moveTo(s * 104, -62); x.lineTo(s * 127, -49); x.lineTo(s * 104, -37); x.stroke();
        for (const yy of [-43, -25]) {
          x.beginPath(); x.moveTo(s * 8, yy); x.lineTo(s * 137, yy);
          x.quadraticCurveTo(s * 149, yy, s * 158, yy - 9); x.stroke();
        }
      }
      x.beginPath(); x.moveTo(-146, -50); x.lineTo(146, -50); x.stroke();
      x.beginPath(); x.moveTo(-121, -67); x.lineTo(121, -67); x.stroke();
      x.beginPath(); x.moveTo(-96, -82); x.lineTo(96, -82); x.stroke();
      x.beginPath(); x.moveTo(-85, -82); x.quadraticCurveTo(0, -116, 85, -82); x.stroke();
      x.beginPath(); x.moveTo(-44, 76); x.lineTo(-44, -20); x.lineTo(44, -20); x.lineTo(44, 76); x.stroke();
      x.beginPath(); x.moveTo(0, -116); x.lineTo(0, -132); x.stroke(); 圓(0, -138, 6);
      x.restore();
    };
    const 雜寶 = (kind, cx, cy, s, 角 = 0) => {
      x.save(); x.translate(cx, cy); x.rotate(角); x.lineWidth = 1.35;
      if (kind === '輪') {
        圓(0, 0, s); 圓(0, 0, s * 0.22);
        for (let i = 0; i < 8; i++) {
          const a = Math.PI * i / 4;
          x.beginPath(); x.moveTo(s * 0.25 * Math.cos(a), s * 0.25 * Math.sin(a));
          x.lineTo(s * 0.86 * Math.cos(a), s * 0.86 * Math.sin(a)); x.stroke();
        }
      } else if (kind === '螺') {
        x.beginPath(); x.moveTo(-s * 0.68, s * 0.55);
        x.quadraticCurveTo(-s * 0.9, -s * 0.36, 0, -s * 0.76);
        x.quadraticCurveTo(s * 0.9, -s * 0.34, s * 0.62, s * 0.58);
        x.quadraticCurveTo(0, s * 0.92, -s * 0.68, s * 0.55); x.stroke();
        x.beginPath(); x.arc(0, 0, s * 0.42, 0.2, Math.PI * 2.15); x.stroke();
      } else {
        x.beginPath(); x.moveTo(-s, 0); x.quadraticCurveTo(0, -s * 0.9, s, 0); x.stroke();
        x.beginPath(); x.moveTo(-s, 0); x.quadraticCurveTo(0, s * 0.35, s, 0); x.stroke();
        x.beginPath(); x.moveTo(0, -s * 0.86); x.lineTo(0, s * 1.2); x.stroke();
        if (kind === '蓋') { 圓(0, -s * 1.02, s * 0.13); 圓(0, s * 1.3, s * 0.12); }
        else for (const q of [-0.62, 0, 0.62]) {
          x.beginPath(); x.moveTo(q * s, s * 0.1); x.lineTo(q * s, s * 0.56); x.stroke();
        }
      }
      x.restore();
    };

    // 外金剛牆：方界雙線、連珠帶；四門留闕而以丁字樓與幢幡鎮之。
    x.save(); x.strokeStyle = 硃; x.globalAlpha = 0.48; x.lineWidth = 3;
    x.strokeRect(82, 82, 2236, 2236); x.strokeRect(126, 126, 2148, 2148);
    x.strokeStyle = 金; x.globalAlpha = 0.56; x.lineWidth = 1.2;
    方連珠(176, 2224, 104, true); 方連珠(176, 2224, 2296, true);
    方連珠(176, 2224, 104, false); 方連珠(176, 2224, 2296, false);
    門樓(c, cy - 1080, Math.PI); 門樓(120, cy, Math.PI / 2);
    門樓(c, cy + 1080, 0); 門樓(2280, cy, -Math.PI / 2);
    x.restore();

    // 內外輪界：大圓雙環；方圓四隅各鎮一金剛杵印。
    x.save(); x.strokeStyle = 硃; x.globalAlpha = 0.34; x.lineWidth = 2.6;
    圓(c, cy, 1080); 圓(c, cy, 1057);
    x.strokeStyle = 金; x.globalAlpha = 0.54;
    金剛杵(388, cy - 812, Math.PI / 4); 金剛杵(2012, cy - 812, -Math.PI / 4);
    金剛杵(388, cy + 812, -Math.PI / 4); 金剛杵(2012, cy + 812, Math.PI / 4);
    x.restore();

    // 輪際虛空之雜寶：定序疏布，無隨機，亦不塞滿月輪。
    x.save(); x.strokeStyle = 金; x.globalAlpha = 0.44;
    [
      ['輪', 1836, cy + 636, 22, 0], ['螺', 564, cy + 636, 21, -0.35],
      ['傘', 564, cy - 636, 22, 0.25], ['蓋', 1836, cy - 636, 21, -0.18],
      ['螺', 2076, cy + 370, 18, 0.42], ['輪', 324, cy - 370, 19, 0],
      ['蓋', 830, cy + 876, 18, -0.2], ['傘', 1570, cy - 876, 19, 0.18],
      ['輪', 324, cy + 370, 17, 0], ['螺', 2076, cy - 370, 18, -0.3],
      ['傘', 830, cy - 876, 18, 0.2], ['蓋', 1570, cy + 876, 18, -0.18],
    ].forEach(args => 雜寶(...args));
    x.restore();
    const 落 = (id, px, py, R) => {
      const c2 = document.createElement('canvas'); c2.width = W; c2.height = H;
      const x2 = c2.getContext('2d');
      x2.translate(px, py);
      x2.strokeStyle = 金; x2.fillStyle = 金;
      白描(x2, R, 依號[id].k, `${id}|k`);
      x.drawImage(c2, 0, 0);
    };
    // 五解脫輪：雙輪環＋環上連珠；佛與諸親近各居雙線月輪。
    for (const { 佛, 繞, 位 } of 壇譜.輪) {
      const wx = c + 位[0] * 670, wy = cy + 位[1] * 670;
      x.save(); x.strokeStyle = 金; x.globalAlpha = 0.55; x.lineWidth = 2.2;
      圓(wx, wy, 335); 圓(wx, wy, 323);
      x.globalAlpha = 0.46; x.lineWidth = 1; 連珠環(wx, wy, 329, 68, 3.7);
      x.restore();
      // 向壇心之角（中央輪取向下＝東為首）
      const 首角 = (位[0] === 0 && 位[1] === 0) ? Math.PI / 2 : Math.atan2(cy - wy, c - wx);
      繞.forEach((id, i) => {
        const a = 首角 + (Math.PI / 2) * i;
        const px = wx + 235 * Math.cos(a), py = wy + 235 * Math.sin(a);
        const 波羅蜜 = id.startsWith('p-');
        月輪(px, py, 波羅蜜 ? 95 : 100);
        落(id, px, py, 波羅蜜 ? 136 : 145);
      });
      月輪(wx, wy, 160, 0.5);
      落(佛, wx, wy, 230);
    }
    // 內四供（輪間四隅，圓輪之內）
    for (const [id, dx, dy] of 壇譜.內四供) {
      const px = c + dx * 700 * 0.7071, py = cy + dy * 700 * 0.7071;
      月輪(px, py, 90); 落(id, px, py, 125);
    }
    // 外四供（外院四隅）
    for (const [id, dx, dy] of 壇譜.外四供) {
      const px = c + dx * 930, py = cy + dy * 930;
      月輪(px, py, 84); 落(id, px, py, 116);
    }
    // 四攝（四門：下東・左南・上西・右北）
    for (const [id, dx, dy] of 壇譜.四攝) {
      const px = c + dx * 1080, py = cy + dy * 1080;
      月輪(px, py, 75); 落(id, px, py, 104);
    }
    // 卷末注記
    x.fillStyle = 灰; x.textAlign = 'center'; x.font = '34px "Songti TC", serif';
    x.fillText('金剛界成身會三十七尊 · 五解脫輪之制（下東阿閦・左南寶生・上西彌陀・右北不空成就）', c, 2380);
    x.font = '26px "Songti TC", serif'; x.globalAlpha = 0.7;
    x.fillText('誦戒 5+16+4+4+4+4＝37 · 輪內親近細位依通例候現圖校 · 賢劫千佛外金剛部候波（issue #1）', c, 2428);
    x.globalAlpha = 1;
    return cv.toDataURL('image/png');
  }, 壇譜);
  mkdirSync(join(ROOT, '圖錄/壇城'), { recursive: true });
  writeFileSync(join(ROOT, '圖錄/壇城/成身會三十七尊一幀.png'), Buffer.from(dataUrl.split(',')[1], 'base64'));
  console.log('機出 圖錄/壇城/成身會三十七尊一幀.png（誦戒 37 過）');
  await browser.close(); server.close();
})().catch(e => { console.error(e); process.exit(1); });
