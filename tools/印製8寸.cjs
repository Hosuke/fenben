// 印製8寸 · 三幅600dpi導出（8寸照片＝6×8英寸＝3600×4800px @600dpi，豎式4:3）
// 金剛薩埵1800×2400恰3:4→2×滿幅；杳眇二幅1800×2500→1.92×置中，兩側各72px底色補邊。
const { join } = require('path');
const { readdirSync, existsSync, writeFileSync, mkdirSync } = require('fs');
const { crc32 } = require('zlib');
const ROOT = '/Users/lanchair/Developer/Buddha/Github/fenben';
const 出 = join(ROOT, '圖錄/印製');

function 覓playwright() {
  try { return require(join(ROOT, 'node_modules/playwright-core')); } catch {}
  const npx = join(process.env.HOME, '.npm/_npx');
  if (!existsSync(npx)) throw new Error('no playwright');
  for (const d of readdirSync(npx)) { const p = join(npx, d, 'node_modules/playwright-core'); if (existsSync(p)) return require(p); }
  throw new Error('no playwright');
}
function 覓headless() {
  const base = join(process.env.HOME, 'Library/Caches/ms-playwright');
  if (!existsSync(base)) throw new Error('no headless shell');
  for (const d of readdirSync(base)) if (d.startsWith('chromium_headless_shell')) {
    const p = join(base, d, 'chrome-headless-shell-mac-arm64/chrome-headless-shell');
    if (existsSync(p)) return p;
  }
  throw new Error('no headless shell');
}

function 嵌dpi(buf) {
  const type = Buffer.from('pHYs');
  const data = Buffer.alloc(9);
  data.writeUInt32BE(23622, 0);
  data.writeUInt32BE(23622, 4);
  data[8] = 1;
  const chunk = Buffer.alloc(21);
  chunk.writeUInt32BE(9, 0);
  type.copy(chunk, 4);
  data.copy(chunk, 8);
  chunk.writeUInt32BE(crc32(Buffer.concat([type, data])) >>> 0, 17);
  return Buffer.concat([buf.subarray(0, 33), chunk, buf.subarray(33)]);
}

// 杳眇二幅：入模組、自布3600×4800、置中補邊、destination-over 底色。
async function 出杳眇(page, 名) {
  return page.evaluate(async (名) => {
    const { 景, 飾 } = await import(`/匠筆-codex/風格館/杳眇-${名}-框飾層.js`);
    const { 尊位, 尊, 修 } = await import(`/匠筆-主坊/風格館/杳眇-${名}-尊身層.js`);
    const cv = document.createElement('canvas'); cv.width = 3600; cv.height = 4800;
    const ctx = cv.getContext('2d');
    const 助 = { W: 尊位.W, H: 尊位.H, 尊位 };
    const s = Math.min(3600 / 尊位.W, 4800 / 尊位.H);          // 1.92
    const tx = (3600 - 尊位.W * s) / 2, ty = (4800 - 尊位.H * s) / 2;
    ctx.setTransform(s, 0, 0, s, tx, ty);
    await 景(ctx, 助); await 尊(ctx, 助); await 飾(ctx, 助); await 修(ctx, 助);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = '#0d1124'; ctx.fillRect(0, 0, 3600, 4800);
    // 墨量自驗（縮採樣，免69MP整讀；細線經縮必淡，閾取寬——此驗只防白布，不判密度）
    const 樣 = document.createElement('canvas'); 樣.width = 1200; 樣.height = 1600;
    const q = 樣.getContext('2d'); q.drawImage(cv, 0, 0, 1200, 1600);
    const d = q.getImageData(0, 0, 1200, 1600).data;
    let 墨 = 0;
    for (let i = 0; i < d.length; i += 4) {
      const dr = d[i] - 13, dg = d[i + 1] - 17, db = d[i + 2] - 36;
      if (dr * dr + dg * dg + db * db > 100) 墨++;
    }
    return { png: cv.toDataURL('image/png'), 墨比: (墨 / (1200 * 1600) * 100).toFixed(2), s, tx, ty };
  }, 名);
}

// 金剛薩埵：頁內嵌之 __描 非模組——취其源文而評之，付以 2× 世界變換。
async function 出金剛薩埵(page) {
  return page.evaluate(async () => {
    const txt = await (await fetch('/金剛薩埵.html')).text();
    const a = txt.indexOf('async function __描');
    const b = txt.indexOf('掛觀(cv');
    if (a < 0 || b < 0 || b <= a) throw new Error('金剛薩埵.html 結構異動，覓 __描 不得');
    let src = txt.slice(a, b);
    src = src.slice(0, src.lastIndexOf('}') + 1);
    const 描 = (0, eval)('(' + src + ')');
    const cv = document.createElement('canvas'); cv.width = 3600; cv.height = 4800;
    await 描(cv, [2, 0, 0, 2, 0, 0]);
    const ctx = cv.getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = '#0d1124'; ctx.fillRect(0, 0, 3600, 4800);
    const 樣 = document.createElement('canvas'); 樣.width = 1200; 樣.height = 1600;
    const q = 樣.getContext('2d'); q.drawImage(cv, 0, 0, 1200, 1600);
    const d = q.getImageData(0, 0, 1200, 1600).data;
    let 墨 = 0;
    for (let i = 0; i < d.length; i += 4) {
      const dr = d[i] - 13, dg = d[i + 1] - 17, db = d[i + 2] - 36;
      if (dr * dr + dg * dg + db * db > 100) 墨++;
    }
    return { png: cv.toDataURL('image/png'), 墨比: (墨 / (1200 * 1600) * 100).toFixed(2), s: 2, tx: 0, ty: 0 };
  });
}

(async () => {
  mkdirSync(出, { recursive: true });
  const pw = 覓playwright();
  const browser = await pw.chromium.launch({ executablePath: 覓headless() });
  try {
    const page = await browser.newPage({ viewport: { width: 900, height: 900 } });
    const errs = [];
    page.on('pageerror', e => errs.push(String(e)));
    await page.goto('http://localhost:8000/');

    const 單 = [
      ['星迴虛空藏', () => 出杳眇(page, '星迴虛空藏')],
      ['琉璃地', () => 出杳眇(page, '琉璃地')],
      ['金剛薩埵', () => 出金剛薩埵(page)],
    ];
    for (const [名, 作] of 單) {
      const r = await 作();
      const buf = Buffer.from(r.png.split(',')[1], 'base64');
      const 嵌後 = 嵌dpi(buf);
      const fp = join(出, `${名}-8寸-600dpi.png`);
      writeFileSync(fp, 嵌後);
      console.log(`${名}: 墨比${r.墨比}% 變換[s=${r.s} tx=${r.tx} ty=${r.ty}] ${(嵌後.length / 1048576).toFixed(1)}MB → ${fp}`);
      if (Number(r.墨比) < 0.3) throw new Error(`${名} 墨比異薄，疑白布`);
    }
    if (errs.length) { console.error('pageerror:', errs); process.exitCode = 1; return; }
    console.log('三幅皆出，pageerror 無。');
  } finally {
    await browser.close();
  }
})().catch(e => { console.error(e); process.exit(1); });
