// ─────────────────────────────────────────────────────────────────────────────
// 圖錄機出 · tools/圖錄.cjs —— 逐尊出圖入 圖錄/<尊號-側>/（全身＋局部）
//
// 用法：npm run build 之後  node tools/圖錄.cjs
// 逐尊配置在下方 圖錄目；產物視同 dist 機出（隨源可再生，非圖片資源）。
// 依賴同 tools/首圖.cjs：playwright-core ＋ chrome-headless-shell（環境工具鏈）。
// ─────────────────────────────────────────────────────────────────────────────
const { createServer } = require('http');
const { readFile } = require('fs/promises');
const { writeFileSync, readdirSync, existsSync, mkdirSync } = require('fs');
const { join, extname, resolve, sep } = require('path');
const os = require('os');

const ROOT = join(__dirname, '..');

// ── 逐尊之目：鍵＝'尊號|側'，局部各繫格網座標框 [x0,z0,x1,z1] ────────────────
const 圖錄目 = {
  'center|k': {
    夾: 'center-k',
    局部: { '智拳印': [-18, 28, 18, 50], '開臉': [-11, 0, 11, 26] },
  },
  'fugen|k': {
    夾: 'fugen-k',
    局部: { '執杵': [-12, 29, 9, 45], '執鈴': [8, 50, 24, 66], '開臉': [-11, 0, 11, 26] },
  },
  'fugen2|k': {
    夾: 'fugen2-k', 據: 'fugen|k',
    局部: { '執杵': [-14, 26, 8, 44], '執鈴': [12, 50, 28, 66], '開臉': [-8, 0, 14, 26] },
  },
  'east|k': {
    夾: 'east-k',
    局部: { '觸地印': [-26, 50, 0, 70], '握衣端': [-2, 44, 14, 60], '開臉': [-11, 0, 11, 26] },
  },
  'south|k': {
    夾: 'south-k',
    局部: { '與願印': [-26, 50, 0, 70], '開臉': [-11, 0, 11, 26] },
  },
  'west|k': {
    夾: 'west-k',
    局部: { '定印': [-12, 48, 12, 66], '開臉': [-11, 0, 11, 26] },
  },
  'north|k': {
    夾: 'north-k',
    局部: { '施無畏印': [-22, 28, 0, 50], '開臉': [-11, 0, 11, 26] },
  },
};

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
  await page.waitForTimeout(300);

  for (const [鍵, 配] of Object.entries(圖錄目)) {
    const [id, side] = 鍵.split('|');
    const [fid, fside] = (配.據 ?? 鍵).split('|');
    const 夾 = join(ROOT, '圖錄', 配.夾);
    mkdirSync(夾, { recursive: true });

    // ── 全身：紺紙金泥＋淡硃格線（量度錨線，粉本之印記）──
    const 全身 = await page.evaluate(async ({ id, side, fid, fside, size }) => {
      const { 依號 } = await import('/dist/yigui.js');
      const { 白描 } = await import('/dist/baimiao.js');
      const face = 依號[fid][fside];
      const c = document.createElement('canvas');
      c.width = c.height = size;
      const x = c.getContext('2d');
      x.fillStyle = '#0d1124'; x.fillRect(0, 0, size, size);
      const R = size * 0.465, cx = size / 2, cy = size * 0.472;
      const u = R * 0.0145, yT = cy - R * 0.565, Yz = z => yT + z * u;
      // 硃線錨線
      x.strokeStyle = '#b0402c'; x.fillStyle = '#8a7448';
      x.lineWidth = Math.max(1.2, R * 0.0035);
      const anchors = [[12, '白毫'], [20, '頦'], [36, '心窩'], [48, '臍'], [64, '盤線'], [68, '座面']];
      x.globalAlpha = 0.16;
      for (const [z] of anchors) { x.beginPath(); x.moveTo(cx - R * 0.66, Yz(z)); x.lineTo(cx + R * 0.66, Yz(z)); x.stroke(); }
      x.beginPath(); x.moveTo(cx, Yz(-6)); x.lineTo(cx, Yz(82)); x.stroke();
      x.globalAlpha = 0.42;
      x.font = `${Math.round(R * 0.028)}px "Songti TC", serif`;
      x.textAlign = 'right'; x.textBaseline = 'middle';
      for (const [z, name] of anchors) x.fillText(`${name} ${z}`, cx - R * 0.68, Yz(z));
      x.globalAlpha = 1;
      // 本尊：畫於別紙（透明畫布）乃貼合——蔽法（destination-out）鑿處露底紙，
      // 不傷底色錨線
      const c2 = document.createElement('canvas');
      c2.width = c2.height = size;
      const x2 = c2.getContext('2d');
      x2.translate(cx, cy);
      x2.strokeStyle = '#d8b36a'; x2.fillStyle = '#d8b36a';
      白描(x2, R, face, `${id}|${side}`);
      x.drawImage(c2, 0, 0);
      return c.toDataURL('image/png');
    }, { id, side, fid, fside, size: 1600 });
    writeFileSync(join(夾, '全身.png'), Buffer.from(全身.split(',')[1], 'base64'));
    console.log('機出', 配.夾 + '/全身.png');

    // ── 局部：自 2400 大圖裁格網框 ──
    for (const [名, 框] of Object.entries(配.局部)) {
      const dataUrl = await page.evaluate(async ({ id, side, fid, fside, size, 框 }) => {
        const { 依號 } = await import('/dist/yigui.js');
        const { 白描 } = await import('/dist/baimiao.js');
        const face = 依號[fid][fside];
        const c = document.createElement('canvas');
        c.width = c.height = size;
        const x = c.getContext('2d');
        x.fillStyle = '#0d1124'; x.fillRect(0, 0, size, size);
        const c2 = document.createElement('canvas');
        c2.width = c2.height = size;
        const x2 = c2.getContext('2d');
        x2.translate(size / 2, size / 2);
        x2.strokeStyle = '#d8b36a'; x2.fillStyle = '#d8b36a';
        白描(x2, size / 2, face, `${id}|${side}`);
        x.drawImage(c2, 0, 0);
        const R = size / 2, u = R * 0.0145, yT = R - R * 0.565;
        const [x0, z0, x1, z1] = 框;
        const px = R + x0 * u, py = yT + z0 * u, pw = (x1 - x0) * u, ph = (z1 - z0) * u;
        const out = document.createElement('canvas');
        const k = 900 / Math.max(pw, ph);
        out.width = Math.round(pw * k); out.height = Math.round(ph * k);
        out.getContext('2d').drawImage(c, px, py, pw, ph, 0, 0, out.width, out.height);
        return out.toDataURL('image/png');
      }, { id, side, fid, fside, size: 2400, 框 });
      writeFileSync(join(夾, `局部-${名}.png`), Buffer.from(dataUrl.split(',')[1], 'base64'));
      console.log('機出', 配.夾 + `/局部-${名}.png`);
    }
  }

  await browser.close(); server.close();
  console.log('圖錄機出畢');
})().catch(e => { console.error(e); process.exit(1); });
