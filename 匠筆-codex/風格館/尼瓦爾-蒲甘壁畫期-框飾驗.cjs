'use strict';

const { 合幀 } = require('../../tools/lib/幀具.cjs');

(async () => {
  await 合幀({
    出: '圖錄/風格館/尼瓦爾-蒲甘壁畫期-框飾驗.png',
    幀: async page => {
      page.on('console', m => console.log('[頁]', m.text()));
      return page.evaluate(async () => {
        const 框 = await import('/匠筆-codex/風格館/尼瓦爾-蒲甘壁畫期-框飾層.js');
        const 斷 = (真, 訊) => { console.assert(真, 訊); if (!真) throw new Error(訊); };
        const 數墨 = (ctx, x, y, w, h) => {
          const data = ctx.getImageData(x, y, w, h).data;
          let n = 0;
          for (let i = 3; i < data.length; i += 4) if (data[i]) n++;
          return n;
        };
        const 數尖拱墨 = (ctx, 中x) => {
          const x0 = 中x - 80, y0 = 580, w = 160, h = 190;
          const data = ctx.getImageData(x0, y0, w, h).data;
          let n = 0;
          for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
            if (y0 + y >= 580 + Math.abs(x0 + x - 中x) * 1.72
              && data[(y * w + x) * 4 + 3]) n++;
          }
          return n;
        };
        斷(typeof 框.景 === 'function' && typeof 框.飾 === 'function', '缺 景/飾 export');
        const 尊位 = 框.尊位;
        斷(JSON.stringify(尊位) === JSON.stringify({
          W: 1800, H: 2500, 頂y: 690, 指: 15, 中x: 900, 座面: 1710,
        }), '尊位未照表原錄');
        斷(尊位.頂y + 68 * 尊位.指 === 尊位.座面, '座面錨失守');

        const cv = document.createElement('canvas'); cv.width = 尊位.W; cv.height = 尊位.H;
        const ctx = cv.getContext('2d');
        const 助 = { W: cv.width, H: cv.height, 尊位 };
        ctx.strokeStyle = '#123456'; ctx.fillStyle = '#654321'; ctx.lineWidth = 7;
        ctx.globalAlpha = .37; ctx.lineCap = 'butt'; ctx.lineJoin = 'bevel';
        const 狀態 = () => [ctx.strokeStyle, ctx.fillStyle, ctx.lineWidth, ctx.globalAlpha,
          ctx.lineCap, ctx.lineJoin, ctx.globalCompositeOperation].join('|');
        const 初 = 狀態();
        await 框.景(ctx, 助); 斷(狀態() === 初, '景未還原 ctx');
        const 尖拱墨 = 數尖拱墨(ctx, 900);
        const 左葉幕墨 = 數尖拱墨(ctx, 740), 右葉幕墨 = 數尖拱墨(ctx, 1060);
        const 中堂墨 = 數墨(ctx, 600, 820, 600, 760);
        斷(尖拱墨 > 100, `尖拱淨空疑遭硬清除：${尖拱墨}`);
        斷(尖拱墨 * 2 < 左葉幕墨 + 右葉幕墨,
          `尖拱淨空不顯：中${尖拱墨}/左${左葉幕墨}/右${右葉幕墨}`);
        斷(中堂墨 > 9000, `中堂過空，疑預鑿主尊人形洞：${中堂墨}`);
        await 框.飾(ctx, 助); 斷(狀態() === 初, '飾未還原 ctx');
        for (const [x, y] of [[0, 0], [1799, 0], [0, 2499], [1799, 2499]]) {
          斷(ctx.getImageData(x, y, 1, 1).data[3] === 0, `透明布角點失守：${x},${y}`);
        }
        const 座頂墨 = 數墨(ctx, 420, 尊位.座面 - 4, 960, 9);
        const 格內墨 = 數墨(ctx, 190, 2040, 1420, 180);
        const 上三帶 = 數墨(ctx, 54, 60, 1692, 110);
        const 左三帶 = 數墨(ctx, 54, 60, 110, 2380);
        斷(座頂墨 > 1800, `座頂未承 y=1710：${座頂墨}`);
        斷(格內墨 < 12000, `底欄空格疑有身形：${格內墨}`);
        斷(上三帶 > 23000 && 左三帶 > 30000,
          `四向紋帶線量不足：上${上三帶}/左${左三帶}`);
        console.log(`框飾驗：尖拱 ${尖拱墨}／左葉幕 ${左葉幕墨}／右葉幕 ${右葉幕墨}；中堂 ${中堂墨}；座頂 ${座頂墨}；底欄空格 ${格內墨}；上帶 ${上三帶}／左帶 ${左三帶}；ctx還原✓；透明布✓`);

        const out = document.createElement('canvas'); out.width = cv.width; out.height = cv.height;
        const o = out.getContext('2d'); o.fillStyle = '#0d1124'; o.fillRect(0, 0, out.width, out.height);
        o.drawImage(cv, 0, 0); return out.toDataURL('image/png');
      });
    },
  });
})().catch(error => { console.error(error); process.exitCode = 1; });
