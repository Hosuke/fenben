// 星供壇城 · tools/星供壇城.cjs —— 圈層壇城格網變體第一驗：円曼荼羅構圖一幀
// 制依 docs/考據/橫三世藥師星供.md 題三（世界大百科＋神殿大観二源）：
// 円曼荼羅（天台，法隆寺本系）——第一院中尊（一字金輪佛頂）、第二院上北斗七星
// 下九曜、第三院十二宮、外院二十八宿。誦戒：1+7+9+12+28＝57。
// **諸尊像容多闕待核（考據卷明記），故此卷唯立圈層之格：空圓相＋名候筆，
// 勿臆造尊形**；北斗杓形排列候法隆寺本目驗，初版沿上半弧均布〔自運候典〕。
// 用法：npm run build 後 node tools/星供壇城.cjs
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

// ── 圈層之譜（誦戒於載入）─────────────────────────────────────────────────────
const 譜 = {
  中尊: ['一字金輪'],
  北斗: ['貪狼', '巨門', '祿存', '文曲', '廉貞', '武曲', '破軍'],
  九曜: ['日曜', '月曜', '火曜', '水曜', '木曜', '金曜', '土曜', '羅睺', '計都'],
  十二宮: ['白羊宮', '金牛宮', '雙子宮', '巨蟹宮', '獅子宮', '處女宮', '天秤宮', '天蠍宮', '人馬宮', '磨羯宮', '寶瓶宮', '雙魚宮'],
  廿八宿: ['角', '亢', '氐', '房', '心', '尾', '箕', '斗', '牛', '女', '虛', '危', '室', '壁',
           '奎', '婁', '胃', '昴', '畢', '觜', '參', '井', '鬼', '柳', '星', '張', '翼', '軫'],
};
assert.strictEqual(譜.中尊.length + 譜.北斗.length + 譜.九曜.length + 譜.十二宮.length + 譜.廿八宿.length, 57,
  '誦戒破：星供五十七尊之數不合');

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
  const dataUrl = await page.evaluate(async (譜) => {
    const W = 2300, H = 2400;
    const cx = W / 2, cy = W / 2;
    const c = document.createElement('canvas'); c.width = W; c.height = H;
    const x = c.getContext('2d');
    x.fillStyle = '#0d1124'; x.fillRect(0, 0, W, H);
    const 金 = '#d8b36a', 灰 = '#6b7186', 硃 = '#b0402c';
    // 院界四環（淡硃）
    x.strokeStyle = 硃; x.globalAlpha = 0.18; x.lineWidth = 2;
    for (const r of [420, 690, 910, 1090]) { x.beginPath(); x.arc(cx, cy, r, 0, 7); x.stroke(); }
    x.globalAlpha = 1;
    // 圓相之筆：空相候筆（雙環＋名）
    const 相 = (px, py, r, 名, 記) => {
      x.strokeStyle = 金; x.lineWidth = 3;
      x.beginPath(); x.arc(px, py, r, 0, 7); x.stroke();
      x.lineWidth = 1.2; x.globalAlpha = 0.55;
      x.beginPath(); x.arc(px, py, r * 0.86, 0, 7); x.stroke();
      x.globalAlpha = 1;
      x.fillStyle = 灰; x.textAlign = 'center';
      x.font = `${Math.round(r * 0.30)}px "Songti TC", serif`;
      x.fillText(名, px, py + r * 0.1);
      if (記) { x.font = `${Math.round(r * 0.17)}px "Songti TC", serif`; x.globalAlpha = 0.6; x.fillText(記, px, py + r * 0.38); x.globalAlpha = 1; }
    };
    // 第一院 · 中尊：一字金輪真身活渲（kinrin|h 之筆既成）
    {
      x.strokeStyle = 金; x.lineWidth = 3;
      x.beginPath(); x.arc(cx, cy, 300, 0, 7); x.stroke();
      const { 依號 } = await import('/dist/yigui.js');
      const { 白描 } = await import('/dist/baimiao.js');
      const c2 = document.createElement('canvas'); c2.width = W; c2.height = H;
      const x2 = c2.getContext('2d');
      x2.translate(cx, cy - 130);
      x2.strokeStyle = 金; x2.fillStyle = 金;
      白描(x2, 275, 依號['kinrin'].h, 'kinrin|h');
      x.drawImage(c2, 0, 0);
    }
    // 第二院 · 上北斗七（沿上半弧均布——杓形候法隆寺本目驗）、下九曜
    譜.北斗.forEach((名, i) => {
      const a = Math.PI + (Math.PI / 8) * (i + 1);
      相(cx + 560 * Math.cos(a), cy + 560 * Math.sin(a), 105, 名, '候筆');
    });
    譜.九曜.forEach((名, i) => {
      const a = (Math.PI / 10) * (i + 1);
      相(cx + 560 * Math.cos(a), cy + 560 * Math.sin(a), 84, 名, '候筆');   // 徑84：弦距175之內不相犯
    });
    // 第三院 · 十二宮（自上直下順時針）
    譜.十二宮.forEach((名, i) => {
      const a = -Math.PI / 2 + (Math.PI / 6) * i;
      相(cx + 800 * Math.cos(a), cy + 800 * Math.sin(a), 90, 名, '候筆');
    });
    // 外院 · 二十八宿
    譜.廿八宿.forEach((名, i) => {
      const a = -Math.PI / 2 + (Math.PI * 2 / 28) * i;
      相(cx + 1010 * Math.cos(a), cy + 1010 * Math.sin(a), 62, 名 + '宿');
    });
    // 卷末注記
    x.fillStyle = 灰; x.textAlign = 'center'; x.font = '34px "Songti TC", serif';
    x.fillText('星供曼荼羅（北斗曼荼羅）円制構圖 · 一院中尊／二院上北斗下九曜／三院十二宮／外院廿八宿', cx, W + 40);
    x.font = '26px "Songti TC", serif'; x.globalAlpha = 0.7;
    x.fillText('誦戒 1+7+9+12+28＝57 · 中尊釋迦金輪真身上壇（四源）；餘星像容單源者仍空相候筆· 北斗杓形候法隆寺本目驗', cx, W + 84);
    x.globalAlpha = 1;
    return c.toDataURL('image/png');
  }, 譜);
  mkdirSync(join(ROOT, '圖錄/星供'), { recursive: true });
  writeFileSync(join(ROOT, '圖錄/星供/円曼荼羅構圖一幀.png'), Buffer.from(dataUrl.split(',')[1], 'base64'));
  console.log('機出 圖錄/星供/円曼荼羅構圖一幀.png（誦戒 57 過）');
  await browser.close(); server.close();
})().catch(e => { console.error(e); process.exit(1); });
