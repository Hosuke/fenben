'use strict';

const { existsSync, readdirSync } = require('fs');
const { join, resolve } = require('path');
const os = require('os');

const 根 = resolve(__dirname, '../..');
const 站 = 'http://localhost:8000';

function 覓playwright() {
  const 倉裝 = join(根, 'node_modules/playwright-core');
  if (existsSync(倉裝)) return require(倉裝);
  const npx = join(os.homedir(), '.npm/_npx');
  if (existsSync(npx)) {
    for (const 室 of readdirSync(npx).sort().reverse()) {
      const 候 = join(npx, 室, 'node_modules/playwright-core');
      if (existsSync(候)) return require(候);
    }
  }
  throw new Error('未見 playwright-core（repo node_modules 或 ~/.npm/_npx）');
}

function 覓headless() {
  const 基 = join(os.homedir(), 'Library/Caches/ms-playwright');
  if (existsSync(基)) {
    const 室列 = readdirSync(基)
      .filter(名 => 名.startsWith('chromium_headless_shell-'))
      .sort().reverse();
    for (const 室 of 室列) {
      const 候 = join(基, 室, 'chrome-headless-shell-mac-arm64', 'chrome-headless-shell');
      if (existsSync(候)) return 候;
    }
  }
  throw new Error('未見 chrome-headless-shell-mac-arm64');
}

async function 主() {
  const { chromium } = 覓playwright();
  const browser = await chromium.launch({ executablePath: 覓headless(), headless: true });
  try {
    const page = await browser.newPage();
    await page.goto(`${站}/favicon.ico`, { waitUntil: 'load' });
    const 結 = await page.evaluate(async () => {
      const 斷 = (真, 訊) => { if (!真) throw new Error(訊); };
      const { 分區, 敷色 } = await import('/匠筆-codex/風格館/尼瓦爾-金剛薩埵金密-分區具.js?分區驗=1');

      // 合成試：「回」字兩重閉框另加閉圓；開弧之缺口不應另斷一區。
      const 合W = 180;
      const 合H = 140;
      const 合布 = document.createElement('canvas');
      合布.width = 合W;
      合布.height = 合H;
      const h = 合布.getContext('2d');
      h.strokeStyle = '#000';
      h.lineWidth = 3;
      h.lineCap = 'butt';
      h.lineJoin = 'miter';
      h.strokeRect(10.5, 10.5, 90, 110);
      h.strokeRect(35.5, 39.5, 40, 46);
      h.beginPath();
      h.arc(140, 35, 15, 0, Math.PI * 2);
      h.stroke();
      h.beginPath();
      h.arc(140, 101, 18, Math.PI * .22, Math.PI * 1.78);
      h.stroke();

      const 合 = await 分區(合布, { 閾: 24, 微域: 1 });
      斷(合.區數 === 4, `合成試區數應為 4，實得 ${合.區數}`);
      let 合零 = 0;
      for (let p = 0; p < 合.標圖.length; p++) {
        const 序 = 合.標圖[p];
        斷(序 >= 0 && 序 <= 合.區數, `合成試標圖越界：${序}`);
        if (序 === 0) 合零++;
      }
      let 合積 = 0;
      for (let i = 0; i < 合.區表.length; i++) {
        const 區 = 合.區表[i];
        斷(區.序 === i + 1, `合成試區號不連續：${區.序}`);
        合積 += 區.積;
      }
      斷(合積 + 合零 === 合W * 合H,
        `合成試像素不守恆：區 ${合積} + 界 ${合零} != ${合W * 合H}`);

      // 實戰試：照原頁切出 __描，以間接 eval 得函，落於原寸透明布。
      const 回 = await fetch('/金剛薩埵.html');
      斷(回.ok, `未能 fetch /金剛薩埵.html：HTTP ${回.status}`);
      const 源 = await 回.text();
      const 始 = 源.indexOf('async function __描');
      const 掛 = 源.indexOf('掛觀(cv', 始);
      斷(始 >= 0 && 掛 > 始, '未能定位 __描／掛觀(cv');
      const 函前 = 源.slice(始, 掛);
      const 終 = 函前.lastIndexOf('}');
      斷(終 >= 0, '未能定位 __描 尾括號');
      const 函源 = 函前.slice(0, 終 + 1);
      const __描 = (0, eval)(`(${函源})`);
      斷(typeof __描 === 'function', '__描 eval 後非函式');

      const W = 1800;
      const H = 2400;
      const cv = document.createElement('canvas');
      cv.width = W;
      cv.height = H;
      await __描(cv, [1, 0, 0, 1, 0, 0]);
      const t0 = performance.now();
      const 實 = await 分區(cv);
      const 耗時 = performance.now() - t0;
      斷(實.區數 >= 4000 && 實.區數 <= 12000, `實戰區數越限：${實.區數}`);
      let 最大 = 0;
      for (let i = 0; i < 實.區表.length; i++) {
        const 區 = 實.區表[i];
        if (區.積 > 最大) 最大 = 區.積;
      }
      斷(最大 < W * H / 2, `最大區逾全布之半，疑線未成界：${最大}`);
      const 最大三區 = 實.區表.slice().sort((a, b) => b.積 - a.積 || a.序 - b.序).slice(0, 3);

      // 敷色試：區號乘法雜湊後，只取三色之一。
      const 三色 = [
        [201, 61, 50, 255],
        [32, 126, 178, 255],
        [238, 182, 41, 255],
      ];
      const 彩 = 敷色(實.標圖, 實.區表,
        區 => 三色[(Math.imul(區.序, 0x9e3779b1) >>> 0) % 三色.length], W, H);
      let 透明 = 0;
      for (let a = 3; a < 彩.data.length; a += 4) if (彩.data[a] === 0) 透明++;
      斷(透明 < W * H, '敷色結果全透明');
      const 透明比 = 透明 / (W * H);
      斷(透明比 < .05, `敷色透明比過高：${(透明比 * 100).toFixed(3)}%`);

      return { 合區數: 合.區數, 區數: 實.區數, 最大, 最大三區, 耗時, 透明比 };
    });

    console.log('分區驗：綠');
    console.log(`合成試：區數 ${結.合區數}`);
    console.log(`實戰試：區數 ${結.區數}；最大區積 ${結.最大}`);
    console.log(`最大三區：${結.最大三區.map(區 =>
      `#${區.序} 積 ${區.積} 界 [${區.界.join(',')}]`).join('；')}`);
    console.log(`分區耗時：${結.耗時.toFixed(1)} ms`);
    console.log(`敷色透明比：${(結.透明比 * 100).toFixed(3)}%`);
  } finally {
    await browser.close();
  }
}

主().catch(錯 => {
  console.error(錯 && 錯.stack || 錯);
  process.exitCode = 1;
});
