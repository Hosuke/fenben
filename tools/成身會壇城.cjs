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
    const W = 2400, H = 2480, c = 1200;
    const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
    const x = cv.getContext('2d');
    x.fillStyle = '#0d1124'; x.fillRect(0, 0, W, H);
    const 金 = '#d8b36a', 灰 = '#6b7186', 硃 = '#b0402c';
    // 外院方郭（雙線）＋大圓輪（雙環）——淡硃打格之制
    x.strokeStyle = 硃; x.globalAlpha = 0.2; x.lineWidth = 2.5;
    x.strokeRect(100, 100, 2200, 2200); x.strokeRect(128, 128, 2144, 2144);
    x.beginPath(); x.arc(c, c, 1000, 0, 7); x.stroke();
    x.beginPath(); x.arc(c, c, 972, 0, 7); x.stroke();
    x.globalAlpha = 1;
    const 落 = (id, px, py, R) => {
      const c2 = document.createElement('canvas'); c2.width = W; c2.height = H;
      const x2 = c2.getContext('2d');
      x2.translate(px, py);
      x2.strokeStyle = 金; x2.fillStyle = 金;
      白描(x2, R, 依號[id].k, `${id}|k`);
      x.drawImage(c2, 0, 0);
    };
    // 五解脫輪：輪環（金淡）＋佛居中＋四親近（首者向壇心，餘三順時針）
    for (const { 佛, 繞, 位 } of 壇譜.輪) {
      const wx = c + 位[0] * 640, wy = c + 位[1] * 640;
      x.strokeStyle = 金; x.globalAlpha = 0.35; x.lineWidth = 2.5;
      x.beginPath(); x.arc(wx, wy, 310, 0, 7); x.stroke();
      x.globalAlpha = 1;
      // 向壇心之角（中央輪取向下＝東為首）
      const 首角 = (位[0] === 0 && 位[1] === 0) ? Math.PI / 2 : Math.atan2(c - wy, c - wx);
      繞.forEach((id, i) => {
        const a = 首角 + (Math.PI / 2) * i;
        落(id, wx + 205 * Math.cos(a), wy + 205 * Math.sin(a), 100);
      });
      落(佛, wx, wy, 185);
    }
    // 內四供（輪間四隅，圓輪之內）
    for (const [id, dx, dy] of 壇譜.內四供) 落(id, c + dx * 680 * 0.7071, c + dy * 680 * 0.7071, 110);
    // 外四供（外院四隅）
    for (const [id, dx, dy] of 壇譜.外四供) 落(id, c + dx * 930, c + dy * 930, 110);
    // 四攝（四門：下東・左南・上西・右北）
    for (const [id, dx, dy] of 壇譜.四攝) 落(id, c + dx * 1085, c + dy * 1085, 105);
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
