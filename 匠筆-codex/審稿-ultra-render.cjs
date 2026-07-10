// 審稿 ultra：以 TypeScript 記憶內 emit + Playwright 截逐尊 before/after。
// 深色紙與格線只落在輸出布；白描永遠先畫於透明別紙，免 destination-out 鑿穿底色。
const { createHash } = require('crypto');
const { createServer } = require('http');
const { existsSync, mkdirSync, readdirSync, writeFileSync } = require('fs');
const { join, relative, resolve, sep } = require('path');
const os = require('os');
const ts = require('typescript');

const ROOT = resolve(__dirname, '..');
const 圖根 = join(__dirname, '審稿-ultra-圖');
const 階段 = process.argv[2];
const 指定鍵 = process.argv.slice(3);
const 禁鍵 = new Set(['gozanze|k', 'senju|h']);
const 部件鍵 = new Set(['component|法界定印', 'component|橫拄指合掌', 'component|覆手合掌']);
const 尺寸 = 1600;

if (!['before', 'after'].includes(階段)) {
  console.error('用法：node 匠筆-codex/審稿-ultra-render.cjs <before|after> [尊鍵 ...]');
  process.exit(2);
}

function 覓playwright() {
  try { return require(join(ROOT, 'node_modules/playwright-core')); } catch {}
  const npx = join(os.homedir(), '.npm/_npx');
  if (existsSync(npx)) {
    for (const d of readdirSync(npx).sort().reverse()) {
      const p = join(npx, d, 'node_modules/playwright-core');
      if (existsSync(p)) return require(p);
    }
  }
  throw new Error('未見 playwright-core（node_modules 或 ~/.npm/_npx）');
}

function 覓headless() {
  const base = process.platform === 'darwin'
    ? join(os.homedir(), 'Library/Caches/ms-playwright')
    : join(os.homedir(), '.cache/ms-playwright');
  const 名 = process.platform === 'win32' ? 'chrome-headless-shell.exe' : 'chrome-headless-shell';
  const 尋 = (dir, depth) => {
    if (depth > 4 || !existsSync(dir)) return null;
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, e.name);
      if (e.isFile() && e.name === 名) return p;
      if (e.isDirectory()) { const hit = 尋(p, depth + 1); if (hit) return hit; }
    }
    return null;
  };
  if (existsSync(base)) {
    const dirs = readdirSync(base).filter(d => d.startsWith('chromium_headless_shell-')).sort().reverse();
    for (const d of dirs) { const hit = 尋(join(base, d), 0); if (hit) return hit; }
  }
  throw new Error('未見 ~/Library/Caches/ms-playwright 內 chrome-headless-shell');
}

function 記憶編譯() {
  const configPath = join(ROOT, 'tsconfig.json');
  const config = ts.readConfigFile(configPath, ts.sys.readFile);
  if (config.error) throw new Error(ts.formatDiagnostics([config.error], 格式主機));
  const 虛擬根 = join(ROOT, '.審稿-ultra-memory-build');
  const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, ROOT, {
    outDir: 虛擬根,
    declaration: false,
    noEmit: false,
    sourceMap: false,
    inlineSourceMap: false,
    incremental: false,
  }, configPath);
  const program = ts.createProgram(parsed.fileNames, parsed.options);
  const 模組 = new Map();
  const emitted = program.emit(undefined, (fileName, data) => {
    const rel = relative(虛擬根, fileName).split(sep).join('/');
    模組.set(`/__build/${rel}`, data);
  });
  const diagnostics = [...ts.getPreEmitDiagnostics(program), ...emitted.diagnostics]
    .filter(d => d.category === ts.DiagnosticCategory.Error);
  if (diagnostics.length) throw new Error(ts.formatDiagnosticsWithColorAndContext(diagnostics, 格式主機));
  const hash = createHash('sha256');
  for (const file of parsed.fileNames.slice().sort()) {
    hash.update(relative(ROOT, file));
    hash.update(ts.sys.readFile(file) || '');
  }
  return { 模組, sourceDigest: hash.digest('hex') };
}

const 格式主機 = {
  getCanonicalFileName: f => f,
  getCurrentDirectory: () => ROOT,
  getNewLine: () => '\n',
};

function 起伺服器(模組) {
  const html = `<!doctype html><meta charset="utf-8"><style>
    html,body{margin:0;background:#060812} body{padding:32px;width:max-content}
    canvas{display:block;width:${尺寸}px;height:${尺寸}px}
  </style><canvas id="out" width="${尺寸}" height="${尺寸}"></canvas>`;
  const server = createServer((req, res) => {
    const url = decodeURIComponent((req.url || '/').split('?')[0]);
    if (url === '/') {
      res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
      res.end(html);
      return;
    }
    const body = 模組.get(url);
    if (body !== undefined) {
      res.writeHead(200, { 'content-type': 'text/javascript; charset=utf-8' });
      res.end(body);
      return;
    }
    res.writeHead(404); res.end();
  });
  return server;
}

(async () => {
  const { 模組, sourceDigest } = 記憶編譯();
  const server = 起伺服器(模組);
  server.listen(0, '127.0.0.1');
  await new Promise(r => server.once('listening', r));
  const port = server.address().port;

  const { chromium } = 覓playwright();
  const browser = await chromium.launch({ executablePath: 覓headless() });
  const page = await browser.newPage({ viewport: { width: 尺寸 + 64, height: 尺寸 + 64 }, deviceScaleFactor: 1 });
  page.on('pageerror', e => console.error('[pageerror]', e.message));
  await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'load' });

  const 全鍵 = await page.evaluate(async () => {
    const { 落筆簿 } = await import('/__build/zun/index.js');
    return Object.keys(落筆簿);
  });
  const 可審鍵 = [...全鍵.filter(k => !禁鍵.has(k)), ...部件鍵];
  const 鍵列 = 指定鍵.length ? 指定鍵 : 可審鍵;
  for (const key of 鍵列) {
    if (!可審鍵.includes(key)) throw new Error(`非可審鍵或受排除：${key}`);
  }

  const outDir = join(圖根, 階段);
  mkdirSync(outDir, { recursive: true });
  for (const key of 鍵列) {
    await page.evaluate(async ({ key, size }) => {
      const [id, side] = key.split('|');

      const out = document.getElementById('out');
      out.width = out.height = size;
      const x = out.getContext('2d');
      x.setTransform(1, 0, 0, 1, 0, 0);
      x.clearRect(0, 0, size, size);
      x.fillStyle = '#0d1124';
      x.fillRect(0, 0, size, size);

      const R = size * 0.465, cx = size / 2, cy = size * 0.472;
      const u = R * 0.0145, yT = cy - R * 0.565, Y = z => yT + z * u;
      const anchors = [[12, '白毫'], [20, '頦'], [36, '心窩'], [48, '臍'], [64, '盤線'], [68, '座面']];
      x.save();
      x.strokeStyle = '#b0402c'; x.fillStyle = '#9f8a58'; x.lineWidth = 1.4;
      x.globalAlpha = 0.18;
      for (const [z] of anchors) {
        x.beginPath(); x.moveTo(cx - R * 0.69, Y(z)); x.lineTo(cx + R * 0.69, Y(z)); x.stroke();
      }
      x.beginPath(); x.moveTo(cx, Y(-8)); x.lineTo(cx, Y(84)); x.stroke();
      x.globalAlpha = 0.52; x.font = '20px "Songti TC", serif'; x.textAlign = 'right'; x.textBaseline = 'middle';
      for (const [z, name] of anchors) x.fillText(`${name} ${z}`, cx - R * 0.705, Y(z));
      x.restore();

      // 白描只落透明別紙。destination-out 在此僅抹墨，不可能鑿穿深紙或格線。
      const ink = document.createElement('canvas');
      ink.width = ink.height = size;
      const pen = ink.getContext('2d');
      pen.translate(cx, cy);
      pen.strokeStyle = '#d8b36a'; pen.fillStyle = '#d8b36a';
      if (id === 'component') {
        const { 執筆 } = await import('/__build/bi.js');
        const 部件 = await import('/__build/bujian/index.js');
        const ratios = { 法界定印: 6.4, 橫拄指合掌: 6.2, 覆手合掌: 6.2 };
        const fn = 部件[side];
        if (typeof fn !== 'function') throw new Error(`未見部件：${side}`);
        fn(執筆(pen, R), 0, 39, ratios[side]);
      } else {
        const { 白描 } = await import('/__build/baimiao.js');
        const { 依號 } = await import('/__build/yigui.js');
        const faceId = id === 'fugen2' ? 'fugen' : id;
        const face = 依號[faceId] && 依號[faceId][side];
        if (!face) throw new Error(`未見儀軌面：${key}`);
        白描(pen, R, face, key);
      }
      x.drawImage(ink, 0, 0);
    }, { key, size: 尺寸 });

    const file = `${key.replace('|', '-')}.png`;
    await page.locator('#out').screenshot({ path: join(outDir, file), animations: 'disabled' });
    console.log(`${階段} ${key} -> ${relative(ROOT, join(outDir, file))}`);
  }

  writeFileSync(join(圖根, `manifest-${階段}.json`), JSON.stringify({
    phase: 階段,
    renderedAt: new Date().toISOString(),
    sourceDigest,
    canvas: { width: 尺寸, height: 尺寸, R: 尺寸 * 0.465, cy: 尺寸 * 0.472 },
    transparentInkThenComposite: true,
    keys: 鍵列,
  }, null, 2) + '\n');
  await browser.close();
  await new Promise(r => server.close(r));
})().catch(err => { console.error(err); process.exitCode = 1; });
