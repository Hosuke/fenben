'use strict';

const { 合幀 } = require('../../tools/lib/幀具.cjs');

(async () => {
  await 合幀({
    出: '圖錄/風格館/犍陀羅-斯瓦特餘脈-框飾驗.png',
    幀: async page => {
      page.on('console', m => console.log('[頁]', m.text()));
      return page.evaluate(async () => {
        const 框 = await import('/匠筆-codex/風格館/犍陀羅-斯瓦特餘脈-框飾層.js');
        const 源 = await fetch('/匠筆-codex/風格館/犍陀羅-斯瓦特餘脈-框飾層.js').then(r => r.text());
        const 斷 = (真, 訊) => { console.assert(真, 訊); if (!真) throw new Error(訊); };
        const 數墨 = (ctx, x, y, w, h) => {
          const d = ctx.getImageData(x, y, w, h).data; let n = 0;
          for (let i = 3; i < d.length; i += 4) if (d[i]) n++;
          return n;
        };
        const 數靜域墨 = (ctx, x, y, w, h) => {
          const d = ctx.getImageData(x, y, w, h).data; let n = 0;
          for (let py = 0; py < h; py++) for (let px = 0; px < w; px++) {
            // 頭光連續環帶本屬框層，故靜域零墨驗須扣除此合法之墨。
            const 距方 = (x + px - 900) ** 2 + (y + py - 640) ** 2;
            if (距方 >= 215 ** 2 && 距方 <= 268 ** 2) continue;
            if (d[(py * w + px) * 4 + 3]) n++;
          }
          return n;
        };
        斷(typeof 框.景 === 'function' && typeof 框.飾 === 'function', '缺 景/飾 export');
        斷(JSON.stringify(框.尊位) === JSON.stringify({
          W:1800, H:2500, 頂y:420, 指:12, 中x:900, 足底:1860,
        }), '尊位未照錄');
        斷(框.尊位.頂y + 120 * 框.尊位.指 === 框.尊位.足底, '足底錨失守');
        斷(!/(白描\s*\(|主尊\s*\(|立佛\s*\(|頭\s*\(|手\s*\(|足\s*\()/.test(源), '疑留身形');
        斷(!/fillRect\s*\(/.test(源), '框飾層疑於透明布鋪底');
        斷((源.match(/destination-out/g) || []).length >= 1 && /淨輪廓\(ctx, 蓮廓\)[\s\S]*淨輪廓\(ctx, 座廓\)/.test(源),
          '蓮臺與方座未各自先淨輪廓');
        斷(/const 焰舌譜 = \[[\s\S]*for \(const 舌 of 焰舌譜\)/.test(源), '外緣焰舌未逐骨自運');

        const cv = document.createElement('canvas'); cv.width = 框.尊位.W; cv.height = 框.尊位.H;
        const ctx = cv.getContext('2d'); const 助 = { W:cv.width, H:cv.height, 尊位:框.尊位 };
        ctx.strokeStyle='#123456'; ctx.fillStyle='#654321'; ctx.lineWidth=7; ctx.globalAlpha=.37;
        ctx.lineCap='butt'; ctx.lineJoin='bevel';
        const 狀態 = () => [ctx.strokeStyle,ctx.fillStyle,ctx.lineWidth,ctx.globalAlpha,ctx.lineCap,ctx.lineJoin,ctx.globalCompositeOperation].join('|');
        const 初 = 狀態();
        框.景(ctx, 助); 斷(狀態() === 初, '景未還原 ctx');
        const 靜域 = 數靜域墨(ctx, 660, 470, 480, 1220);
        const 頭光 = 數墨(ctx, 630, 370, 540, 540);
        const 身光 = 數墨(ctx, 410, 220, 980, 1680);
        斷(靜域 === 0, `主尊靜域受侵：${靜域}`);
        斷(頭光 > 4500, `頭光線量不足：${頭光}`);
        斷(身光 > 35000, `身光珠焰線量不足：${身光}`);

        // 另布塞入景墨，專驗飾層 destination-out 是否先清輪廓後自描。
        const ocv = document.createElement('canvas'); ocv.width=cv.width; ocv.height=cv.height;
        const ox = ocv.getContext('2d');
        ox.fillStyle = '#fff'; ox.fillRect(480, 1840, 840, 370);
        框.飾(ox, { W:ocv.width, H:ocv.height, 尊位:框.尊位 });
        const 蓮淨心 = 數墨(ox, 850, 1880, 100, 32);
        const 座淨心 = 數墨(ox, 620, 2104, 560, 46);
        const 座外哨 = 數墨(ox, 480, 1885, 50, 30);
        斷(蓮淨心 < 800, `蓮臺未先淨其輪廓：${蓮淨心}`);
        斷(座淨心 === 0, `方座銘帶未先淨其輪廓：${座淨心}`);
        斷(座外哨 > 1400, `遮蔽實驗哨墨失守：${座外哨}`);

        框.飾(ctx, 助); 斷(狀態() === 初, '飾未還原 ctx');
        const 蓮頂 = 數墨(ctx, 580, 框.尊位.足底 - 8, 640, 17);
        const 蓮臺 = 數墨(ctx, 520, 1850, 760, 198);
        const 方座 = 數墨(ctx, 450, 2028, 900, 199);
        const 空注心 = 數墨(ctx, 610, 2104, 580, 46);
        斷(蓮頂 > 900, `蓮頂未承足底±8：${蓮頂}`);
        斷(蓮臺 > 4500, `蓮臺線量不足：${蓮臺}`);
        斷(方座 > 4500, `方座線量不足：${方座}`);
        斷(空注心 === 0, `銘文空注帶不空：${空注心}`);
        for (const [x,y] of [[0,0],[1799,0],[0,2499],[1799,2499]])
          斷(ctx.getImageData(x,y,1,1).data[3] === 0, `透明布角點失守：${x},${y}`);
        console.log(`斯瓦特框飾驗：靜域 ${靜域}；頭光 ${頭光}；身光珠焰 ${身光}；蓮頂 ${蓮頂}；蓮臺 ${蓮臺}；方座 ${方座}；蓮臺/方座自蔽✓；空注帶空白✓；ctx還原✓；透明布✓；無身形✓`);

        const out = document.createElement('canvas'); out.width=cv.width; out.height=cv.height;
        const o = out.getContext('2d'); o.fillStyle='#0d1124'; o.fillRect(0,0,out.width,out.height);
        o.drawImage(cv,0,0); return out.toDataURL('image/png');
      });
    },
  });
})().catch(error => { console.error(error); process.exitCode = 1; });
