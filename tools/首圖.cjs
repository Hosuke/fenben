// ─────────────────────────────────────────────────────────────────────────────
// 首圖機出 · tools/首圖.cjs —— 正式立軸／方版之導出（紺紙金泥，硃線打格）
//
// 用法：npm run build 之後
//   node tools/首圖.cjs 1600 1600 docs/首圖-金剛界大日如來.png
//   node tools/首圖.cjs 2160 2880 立軸.png
//
// 依賴（不入 package.json，屬驗收工具鏈，見 CLAUDE.md）：
//   playwright-core（自本機解析：全局或 ~/.npm/_npx 快取）
//   chrome-headless-shell（~/Library/Caches/ms-playwright/）
// 產物視同 dist 機出：隨源可再生，非圖片資源（造像標準七章之注）。
// ─────────────────────────────────────────────────────────────────────────────
const { createServer } = require('http');
const { readFile } = require('fs/promises');
const { writeFileSync, readdirSync, existsSync } = require('fs');
const { join, extname } = require('path');
const os = require('os');

const ROOT = join(__dirname, '..');

function 覓playwright() {
  try { return require('playwright-core'); } catch { /* 續覓 npx 快取 */ }
  const npx = join(os.homedir(), '.npm/_npx');
  if (existsSync(npx)) {
    for (const d of readdirSync(npx)) {
      const p = join(npx, d, 'node_modules/playwright-core');
      if (existsSync(p)) return require(p);
    }
  }
  throw new Error('未見 playwright-core：於倉內 npm i -D playwright-core（勿提交 package.json 之變）');
}
function 覓headless() {
  // 平台無關：於 ms-playwright 快取內遞歸尋 chrome-headless-shell 執行檔
  const base = process.platform === 'darwin'
    ? join(os.homedir(), 'Library/Caches/ms-playwright')
    : join(os.homedir(), '.cache/ms-playwright');
  const 名 = process.platform === 'win32' ? 'chrome-headless-shell.exe' : 'chrome-headless-shell';
  const 尋 = (dir, depth) => {
    if (depth > 3 || !existsSync(dir)) return null;
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, e.name);
      if (e.isFile() && e.name === 名) return p;
      if (e.isDirectory()) { const r = 尋(p, depth + 1); if (r) return r; }
    }
    return null;
  };
  const dirs = existsSync(base)
    ? readdirSync(base).filter(d => d.startsWith('chromium_headless_shell-')).sort().reverse()
    : [];
  for (const d of dirs) { const exe = 尋(join(base, d), 0); if (exe) return exe; }
  throw new Error('未見 chrome-headless-shell：npx playwright install chromium-headless-shell');
}

const [W, H, outfile] = [Number(process.argv[2]) || 1600, Number(process.argv[3]) || 1600,
  process.argv[4] || 'docs/首圖-金剛界大日如來.png'];

(async () => {
  const { chromium } = 覓playwright();
  const MIME = { '.html': 'text/html', '.js': 'text/javascript' };
  const { resolve, sep } = require('path');
  const server = createServer(async (req, res) => {
    try {
      const raw = decodeURIComponent(req.url.split('?')[0]);
      const p = resolve(ROOT, raw === '/' ? 'index.html' : '.' + raw);
      if (p !== resolve(ROOT) && !p.startsWith(resolve(ROOT) + sep)) { // 圍欄：不得出倉
        res.writeHead(403); res.end(); return;
      }
      const body = await readFile(p);                 // 先讀後答，缺檔不致斷頭
      res.writeHead(200, { 'content-type': MIME[extname(p)] || 'application/octet-stream' });
      res.end(body);
    } catch { res.writeHead(404); res.end(); }
  }).listen(0, '127.0.0.1');                          // 只聽環回，不見於域網
  await new Promise(r => server.once('listening', r));

  const browser = await chromium.launch({ executablePath: 覓headless() });
  const page = await browser.newPage();
  page.on('pageerror', e => console.log('[pageerror]', e.message));
  await page.goto(`http://127.0.0.1:${server.address().port}/index.html`);

  const dataUrl = await page.evaluate(async ({ W, H }) => {
    const { 依號 } = await import('/dist/yigui.js');
    const { 白描 } = await import('/dist/baimiao.js');
    const face = 依號['center'].k;

    const c = document.createElement('canvas');
    c.width = W; c.height = H;
    const x = c.getContext('2d');

    // ── 紺紙：底色與幽光 ──
    x.fillStyle = '#0d1124'; x.fillRect(0, 0, W, H);
    let g = x.createRadialGradient(W * 0.72, -H * 0.08, 0, W * 0.72, -H * 0.08, H * 0.75);
    g.addColorStop(0, 'rgba(20,26,56,0.9)'); g.addColorStop(1, 'rgba(20,26,56,0)');
    x.fillStyle = g; x.fillRect(0, 0, W, H);
    g = x.createRadialGradient(0, H, 0, 0, H, H * 0.7);
    g.addColorStop(0, 'rgba(16,20,44,0.9)'); g.addColorStop(1, 'rgba(16,20,44,0)');
    x.fillStyle = g; x.fillRect(0, 0, W, H);

    // ── 散金（定數而布，非亂數——連裝飾亦可再生）──
    let seed = 20260704;
    const rnd = () => (seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
    for (let i = 0; i < 130; i++) {
      const px = rnd() * W, py = rnd() * H, r = 0.7 + rnd() * 1.9;
      x.globalAlpha = 0.10 + rnd() * 0.35;
      x.fillStyle = rnd() > 0.5 ? '#d8b36a' : '#8a7448';
      x.beginPath(); x.arc(px, py, r, 0, 7); x.fill();
    }
    x.globalAlpha = 1;

    // ── 佈局：月輪心 ──
    const R = Math.min(W, H) * 0.465;
    const cx = W / 2, cy = H * 0.472;
    const u = R * 0.0145, yT = cy - R * 0.565;
    const Yz = z => yT + z * u;

    // ── 硃線打格：量度錨線（白毫12・頦20・心窩36・臍48・盤線64・座面68）──
    x.strokeStyle = '#b0402c'; x.fillStyle = '#8a7448';
    x.lineWidth = Math.max(1.2, R * 0.0035);
    const span = R * 0.66;
    const anchors = [[12, '白毫'], [20, '頦'], [36, '心窩'], [48, '臍'], [64, '盤線'], [68, '座面']];
    x.globalAlpha = 0.16;
    for (const [z] of anchors) {
      x.beginPath(); x.moveTo(cx - span, Yz(z)); x.lineTo(cx + span, Yz(z)); x.stroke();
    }
    x.beginPath(); x.moveTo(cx, Yz(-6)); x.lineTo(cx, Yz(82)); x.stroke(); // 中線
    x.globalAlpha = 0.42;
    x.font = `${Math.round(R * 0.028)}px "Songti TC", serif`;
    x.textAlign = 'right'; x.textBaseline = 'middle';
    for (const [z, name] of anchors) x.fillText(`${name} ${z}`, cx - span - R * 0.02, Yz(z));
    x.globalAlpha = 1;

    // ── 白描本尊 ──
    x.save();
    x.translate(cx, cy);
    x.strokeStyle = '#d8b36a'; x.fillStyle = '#d8b36a';
    白描(x, R, face, 'center|k');
    x.restore();

    // ── 豎題・側注・鈐印 ──
    const tx = W * 0.895, ts = Math.round(W * 0.052);
    x.fillStyle = '#f2d9a4';
    x.textAlign = 'center'; x.textBaseline = 'middle';
    x.font = `600 ${ts}px "Songti TC", "Noto Serif TC", serif`;
    const 題 = '金剛界大日如來';
    for (let i = 0; i < 題.length; i++) x.fillText(題[i], tx, H * 0.075 + i * ts * 1.28);
    x.fillStyle = '#7a7f9a';
    const ss = Math.round(ts * 0.34);
    x.font = `${ss}px "Songti TC", serif`;
    const 注 = '智拳印・十搩度';
    for (let i = 0; i < 注.length; i++) x.fillText(注[i], tx - ts * 0.85, H * 0.082 + i * ss * 1.3);
    const sy = H * 0.075 + 題.length * ts * 1.28 + ts * 0.15, sw = ts * 0.92;
    x.save();
    x.translate(tx, sy); x.rotate(-0.05);
    x.fillStyle = '#b0402c';
    x.beginPath(); x.roundRect(-sw / 2, 0, sw, sw * 1.7, sw * 0.08); x.fill();
    x.fillStyle = '#f3e6d8';
    x.font = `600 ${sw * 0.62}px "Songti TC", serif`;
    x.fillText('粉', 0, sw * 0.47); x.fillText('本', 0, sw * 1.22);
    x.restore();

    // ── 卷尾一行 ──
    x.fillStyle = '#7a7f9a'; x.globalAlpha = 0.9;
    x.font = `${Math.round(W * 0.0165)}px "Songti TC", serif`;
    x.textAlign = 'center';
    x.fillText('粉 本 fenben ・ 量 度 出 《 造 像 量 度 經 解 》 T1419 ・ 程 序 白 描 ， 非 圖 片', W / 2, H * 0.962);
    x.globalAlpha = 1;

    return c.toDataURL('image/png');
  }, { W, H });

  writeFileSync(join(ROOT, outfile), Buffer.from(dataUrl.split(',')[1], 'base64'));
  await browser.close(); server.close();
  console.log('機出', outfile, `${W}×${H}`);
})().catch(e => { console.error(e); process.exit(1); });
