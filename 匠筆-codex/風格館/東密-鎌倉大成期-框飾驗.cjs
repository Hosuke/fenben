'use strict';

const { 合幀 } = require('../../tools/lib/幀具.cjs');

(async () => {
  await 合幀({
    出: '圖錄/風格館/東密-鎌倉大成期-框飾驗.png',
    幀: async page => {
      page.on('console', m => console.log('[頁]', m.text()));
      return page.evaluate(async () => {
        const 框 = await import('/匠筆-codex/風格館/東密-鎌倉大成期-框飾層.js');
        const 源 = await fetch('/匠筆-codex/風格館/東密-鎌倉大成期-框飾層.js').then(r => r.text());
        const 斷 = (真, 訊) => { console.assert(真, 訊); if (!真) throw new Error(訊); };
        const 數墨 = (ctx, x, y, w, h) => {
          const d = ctx.getImageData(x, y, w, h).data; let n = 0;
          for (let i = 3; i < d.length; i += 4) if (d[i]) n++;
          return n;
        };
        斷(typeof 框.景 === 'function' && typeof 框.飾 === 'function', '缺 景/飾 export');
        斷(!/(白描\s*\(|童子頭|握手|額前手|destination-out|fillRect\s*\()/.test(源), '疑留身形、手圖、清洞或鋪底');
        斷(JSON.stringify(框.尊位) === JSON.stringify({
          W:1800, H:2500, 頂y:640, 指:13, 中x:900, 座面:1524,
        }), '尊位未照錄');
        斷(框.尊位.頂y + 68 * 框.尊位.指 === 框.尊位.座面, '座面錨失守');

        const cv = document.createElement('canvas'); cv.width = 框.尊位.W; cv.height = 框.尊位.H;
        const ctx = cv.getContext('2d'); const 助 = { W:cv.width, H:cv.height, 尊位:框.尊位 };
        ctx.strokeStyle='#123456'; ctx.fillStyle='#654321'; ctx.lineWidth=7; ctx.globalAlpha=.37;
        ctx.lineCap='butt'; ctx.lineJoin='bevel';
        const 狀態 = () => [ctx.strokeStyle,ctx.fillStyle,ctx.lineWidth,ctx.globalAlpha,ctx.lineCap,ctx.lineJoin,ctx.globalCompositeOperation].join('|');
        const 初 = 狀態();
        框.景(ctx, 助); 斷(狀態() === 初, '景未還原 ctx');
        const 靜域 = 數墨(ctx, 640, 700, 521, 751);
        const 焰域 = 數墨(ctx, 360, 280, 1081, 1291);
        const 焰外 = 數墨(ctx, 0, 0, 360, 2500) + 數墨(ctx, 1441, 0, 359, 2500)
          + 數墨(ctx, 360, 0, 1081, 280) + 數墨(ctx, 360, 1571, 1081, 929);
        斷(靜域 === 0, `主尊靜域受侵：${靜域}`);
        斷(焰域 > 7000, `迦樓羅焰線量不足：${焰域}`);
        斷(焰外 === 0, `迦樓羅焰越界：${焰外}`);

        框.飾(ctx, 助); 斷(狀態() === 初, '飾未還原 ctx');
        const 座頂 = 數墨(ctx, 560, 1516, 680, 17);
        const 石層 = 數墨(ctx, 390, 1524, 1020, 377);
        const 左石頂 = 數墨(ctx, 345, 2080, 250, 45);
        const 右石頂 = 數墨(ctx, 1205, 2096, 250, 45);
        const 左心 = 數墨(ctx, 框.尊位.中x - 430 - 3, 2078, 7, 9);
        const 右心 = 數墨(ctx, 框.尊位.中x + 430 - 3, 2078, 7, 9);
        斷(座頂 > 800, `瑟瑟座未承座面±8：${座頂}`);
        斷(石層 > 9000, `瑟瑟座石層不足：${石層}`);
        斷(左石頂 > 350 && 右石頂 > 350, `二童子立石不足：${左石頂}/${右石頂}`);
        斷(左心 > 0 && 右心 > 0, `二童子立石未中 x±430：${左心}/${右心}`);
        for (const [x,y] of [[0,0],[1799,0],[0,2499],[1799,2499]])
          斷(ctx.getImageData(x,y,1,1).data[3] === 0, `透明布角點失守：${x},${y}`);
        console.log(`鎌倉框飾驗：靜域 ${靜域}；焰域 ${焰域}；焰外 ${焰外}；座頂 ${座頂}；石層 ${石層}；立石 ${左石頂}/${右石頂}（中x±430✓）；ctx還原✓；透明布✓；無身形✓`);
        const out = document.createElement('canvas'); out.width=cv.width; out.height=cv.height;
        const o = out.getContext('2d'); o.fillStyle='#0d1124'; o.fillRect(0,0,out.width,out.height);
        o.drawImage(cv,0,0); return out.toDataURL('image/png');
      });
    },
  });
})().catch(error => { console.error(error); process.exitCode = 1; });
