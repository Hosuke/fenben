// 印製 · 分檔位高清導出（承印製8寸.cjs而廣之；皆headless向量重渲，非點陣放大）
// 檔位：8寸600（6×8英寸）・8寸1200・20寸600（16×20英寸＝50.8×40.6cm）・鴻幅（原比例×6，唐卡裱裝）
// 有布者置中補邊（底色#0d1124渾然無痕）；鴻幅無布，依原比例滿幅。
// 用法：node tools/印製.cjs [檔位尾…]（無參則四檔全出；如 `node tools/印製.cjs 鴻幅`）
const { join } = require('path');
const { readdirSync, existsSync, writeFileSync, mkdirSync } = require('fs');
const { crc32 } = require('zlib');
const ROOT = '/Users/lanchair/Developer/Buddha/Github/fenben';
const 出 = join(ROOT, '圖錄/印製');

const 檔位簿 = [
  { 尾: '8寸-600dpi',  布: [3600, 4800],   dpi: 600 },
  { 尾: '8寸-1200dpi', 布: [7200, 9600],   dpi: 1200 },
  { 尾: '20寸-600dpi', 布: [9600, 12000],  dpi: 600 },
  { 尾: '鴻幅',        布: null, 倍: 6,    dpi: 600 },
];
const 單子 = [
  { 名: '星迴虛空藏', 種: '杳眇' },
  { 名: '琉璃地',     種: '杳眇' },
  { 名: '金剛薩埵',   種: '頁' },
];

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

// PNG pHYs 之嵌：簽名8＋IHDR整塊25＝偏移33後插入。
function 嵌dpi(buf, dpi) {
  const ppm = Math.round(dpi / 0.0254);
  const type = Buffer.from('pHYs');
  const data = Buffer.alloc(9);
  data.writeUInt32BE(ppm, 0);
  data.writeUInt32BE(ppm, 4);
  data[8] = 1;
  const chunk = Buffer.alloc(21);
  chunk.writeUInt32BE(9, 0);
  type.copy(chunk, 4);
  data.copy(chunk, 8);
  chunk.writeUInt32BE(crc32(Buffer.concat([type, data])) >>> 0, 17);
  return Buffer.concat([buf.subarray(0, 33), chunk, buf.subarray(33)]);
}

// 杳眇之流：入模組、自布、置中、destination-over 底色；墨比縮採自驗（只防白布）。
async function 出杳眇(page, 名, 布, 倍) {
  return page.evaluate(async ({ 名, 布, 倍 }) => {
    const { 景, 飾 } = await import(`/匠筆-codex/風格館/杳眇-${名}-框飾層.js`);
    const { 尊位, 尊, 修 } = await import(`/匠筆-主坊/風格館/杳眇-${名}-尊身層.js`);
    const [BW, BH] = 布 ?? [尊位.W * 倍, 尊位.H * 倍];
    const cv = document.createElement('canvas'); cv.width = BW; cv.height = BH;
    const ctx = cv.getContext('2d');
    const 助 = { W: 尊位.W, H: 尊位.H, 尊位 };
    const s = Math.min(BW / 尊位.W, BH / 尊位.H);
    const tx = (BW - 尊位.W * s) / 2, ty = (BH - 尊位.H * s) / 2;
    ctx.setTransform(s, 0, 0, s, tx, ty);
    await 景(ctx, 助); await 尊(ctx, 助); await 飾(ctx, 助); await 修(ctx, 助);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = '#0d1124'; ctx.fillRect(0, 0, BW, BH);
    const 樣 = document.createElement('canvas'); 樣.width = 1200; 樣.height = 1600;
    const q = 樣.getContext('2d'); q.drawImage(cv, 0, 0, 1200, 1600);
    const d = q.getImageData(0, 0, 1200, 1600).data;
    let 墨 = 0;
    for (let i = 0; i < d.length; i += 4) {
      const dr = d[i] - 13, dg = d[i + 1] - 17, db = d[i + 2] - 36;
      if (dr * dr + dg * dg + db * db > 100) 墨++;
    }
    return { png: cv.toDataURL('image/png'), 墨比: (墨 / (1200 * 1600) * 100).toFixed(2), 寬: BW, 高: BH };
  }, { 名, 布, 倍 });
}

// 金剛薩埵：頁內嵌之 __描 非模組——取其源文而評之，付以世界變換（1800×2400恰3:4）。
async function 出金剛薩埵(page, 布, 倍) {
  return page.evaluate(async ({ 布, 倍 }) => {
    const txt = await (await fetch('/金剛薩埵.html')).text();
    const a = txt.indexOf('async function __描');
    const b = txt.indexOf('掛觀(cv');
    if (a < 0 || b < 0 || b <= a) throw new Error('金剛薩埵.html 結構異動，覓 __描 不得');
    let src = txt.slice(a, b);
    src = src.slice(0, src.lastIndexOf('}') + 1);
    const 描 = (0, eval)('(' + src + ')');
    const W = 1800, H = 2400;
    const [BW, BH] = 布 ?? [W * 倍, H * 倍];
    const cv = document.createElement('canvas'); cv.width = BW; cv.height = BH;
    const s = Math.min(BW / W, BH / H);
    const tx = (BW - W * s) / 2, ty = (BH - H * s) / 2;
    await 描(cv, [s, 0, 0, s, tx, ty]);
    const ctx = cv.getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = '#0d1124'; ctx.fillRect(0, 0, BW, BH);
    const 樣 = document.createElement('canvas'); 樣.width = 1200; 樣.height = 1600;
    const q = 樣.getContext('2d'); q.drawImage(cv, 0, 0, 1200, 1600);
    const d = q.getImageData(0, 0, 1200, 1600).data;
    let 墨 = 0;
    for (let i = 0; i < d.length; i += 4) {
      const dr = d[i] - 13, dg = d[i + 1] - 17, db = d[i + 2] - 36;
      if (dr * dr + dg * dg + db * db > 100) 墨++;
    }
    return { png: cv.toDataURL('image/png'), 墨比: (墨 / (1200 * 1600) * 100).toFixed(2), 寬: BW, 高: BH };
  }, { 布, 倍 });
}

(async () => {
  const 揀 = process.argv.slice(2);
  const 不識 = 揀.filter(尾 => !檔位簿.some(f => f.尾 === 尾));
  if (不識.length) throw new Error(`檔位不識：${不識.join(' ')}（可用：${檔位簿.map(f => f.尾).join(' ')}）`);
  const 檔位 = 揀.length ? 檔位簿.filter(f => 揀.includes(f.尾)) : 檔位簿;
  mkdirSync(出, { recursive: true });
  const pw = 覓playwright();
  const browser = await pw.chromium.launch({ executablePath: 覓headless() });
  try {
    for (const { 名, 種 } of 單子) {
      for (const { 尾, 布, 倍, dpi } of 檔位) {
        // 大布之渲各據一頁，渲畢即閉，免積憶而殞。
        const page = await browser.newPage({ viewport: { width: 900, height: 900 } });
        const errs = [];
        page.on('pageerror', e => errs.push(String(e)));
        await page.goto('http://localhost:8000/');
        const r = 種 === '杳眇' ? await 出杳眇(page, 名, 布 ?? null, 倍 ?? 1)
                                : await 出金剛薩埵(page, 布 ?? null, 倍 ?? 1);
        const buf = 嵌dpi(Buffer.from(r.png.split(',')[1], 'base64'), dpi);
        if (Number(r.墨比) < 0.3) throw new Error(`${名}-${尾} 墨比異薄，疑白布`);
        if (errs.length) throw new Error(`${名}-${尾} pageerror: ${errs.join('; ')}`);
        const fp = join(出, `${名}-${尾}.png`);
        writeFileSync(fp, buf);
        console.log(`${名}-${尾}: ${r.寬}×${r.高} @${dpi}dpi 墨比${r.墨比}% ${(buf.length / 1048576).toFixed(1)}MB`);
        await page.close();
      }
    }
  } finally {
    await browser.close();
  }
  console.log('諸檔皆出，pageerror 無。');
})().catch(e => { console.error(e); process.exit(1); });
