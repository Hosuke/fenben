'use strict';

const { 合幀 } = require('../../tools/lib/幀具.cjs');

(async () => {
  await 合幀({
    出: '圖錄/風格館/漢地-唐吳家樣-框飾驗.png',
    幀: async page => {
      page.on('console', m => console.log('[頁]', m.text()));
      return page.evaluate(async () => {
        const 框 = await import('/匠筆-codex/風格館/漢地-唐吳家樣-框飾層.js');
        const 源 = await fetch('/匠筆-codex/風格館/漢地-唐吳家樣-框飾層.js').then(r => r.text());
        const 斷 = (真, 訊) => { console.assert(真, 訊); if (!真) throw new Error(訊); };
        const 數墨 = (ctx, x, y, w, h) => {
          const d = ctx.getImageData(x, y, w, h).data; let n = 0;
          for (let i = 3; i < d.length; i += 4) if (d[i]) n++;
          return n;
        };
        const 數靜域墨 = (ctx, x, y, w, h) => {
          const d = ctx.getImageData(x, y, w, h).data; let n = 0;
          for (let py = 0; py < h; py++) for (let px = 0; px < w; px++) {
            // 頭光唐草環帶本屬景層；循斯瓦特驗式，靜域零墨扣除此合法之墨。
            const 距方 = (x + px - 900) ** 2 + (y + py - 640) ** 2;
            if (距方 >= 202 ** 2 && 距方 <= 276 ** 2) continue;
            if (d[(py * w + px) * 4 + 3]) n++;
          }
          return n;
        };

        斷(typeof 框.景 === 'function' && typeof 框.飾 === 'function', '缺 景/飾 export');
        斷(JSON.stringify(框.尊位) === JSON.stringify({
          W:1800, H:2500, 頂y:420, 指:12, 中x:900, 足底:1860,
        }), '尊位未照錄');
        斷(框.尊位.頂y + 120 * 框.尊位.指 === 框.尊位.足底, '足底錨失守');
        斷(!/(?<![\p{L}\p{N}_])(?:白描|主尊|立佛|佛身|頭|手|足)\s*\(/u.test(源), '疑留身形函數');
        斷(!/\.fillRect\s*\(/u.test(源), '框飾層疑於透明布鋪底');
        斷((源.match(/destination-out/g) || []).length >= 2 &&
          /淨輪廓\(ctx, 蓮廓\)[\s\S]*淨輪廓\(ctx, 階廓\)/.test(源), '蓮臺與素階未各自先淨輪廓');
        斷(/候典/.test(源) && /唐草頭光/.test(源) && /鈴鐸/.test(源), '寶蓋／唐草候典註或結構不足');

        const cv = document.createElement('canvas'); cv.width = 框.尊位.W; cv.height = 框.尊位.H;
        const ctx = cv.getContext('2d'); const 助 = { W:cv.width, H:cv.height, 尊位:框.尊位 };
        ctx.strokeStyle='#123456'; ctx.fillStyle='#654321'; ctx.lineWidth=7; ctx.globalAlpha=.37;
        ctx.lineCap='butt'; ctx.lineJoin='bevel';
        const 狀態 = () => [ctx.strokeStyle,ctx.fillStyle,ctx.lineWidth,ctx.globalAlpha,
          ctx.lineCap,ctx.lineJoin,ctx.globalCompositeOperation].join('|');
        const 初 = 狀態();
        框.景(ctx, 助); 斷(狀態() === 初, '景未還原 ctx');
        const 靜域 = 數靜域墨(ctx, 660, 440, 480, 1430);
        const 寶蓋 = 數墨(ctx, 480, 50, 840, 360);
        const 蓋心偏 = Math.abs(((() => {
          const d = ctx.getImageData(840, 50, 121, 330).data; let sum = 0, n = 0;
          for (let py=0; py<330; py++) for (let px=0; px<121; px++)
            if (d[(py*121+px)*4+3]) { sum += 840 + px; n++; }
          return n ? sum / n : 0;
        })()) - 900);
        const 頭光 = 數墨(ctx, 620, 360, 560, 560);
        const 身光 = 數墨(ctx, 410, 220, 980, 1690);
        斷(靜域 === 0, `主尊靜域受侵：${靜域}`);
        斷(寶蓋 > 9000, `寶蓋線量不足：${寶蓋}`);
        斷(蓋心偏 < 4, `蓋心未對中軸：偏 ${蓋心偏.toFixed(2)}`);
        斷(頭光 > 8000, `頭光唐草線量不足：${頭光}`);
        斷(身光 > 25000, `身光連珠線量不足：${身光}`);

        // 另布塞入景墨，專驗飾層 destination-out 是否各自清域後自描。
        const ocv = document.createElement('canvas'); ocv.width=cv.width; ocv.height=cv.height;
        const ox = ocv.getContext('2d'); ox.fillStyle='#fff'; ox.fillRect(440, 1835, 920, 340);
        框.飾(ox, { W:ocv.width, H:ocv.height, 尊位:框.尊位 });
        const 蓮淨心 = 數墨(ox, 840, 1885, 120, 30);
        const 階淨心 = 數墨(ox, 600, 2080, 600, 50);
        const 域外哨 = 數墨(ox, 440, 1885, 70, 30);
        斷(蓮淨心 < 850, `蓮臺未先淨其域：${蓮淨心}`);
        斷(階淨心 === 0, `素階面不空：${階淨心}`);
        斷(域外哨 > 1800, `遮蔽實驗哨墨失守：${域外哨}`);

        框.飾(ctx, 助); 斷(狀態() === 初, '飾未還原 ctx');
        const 蓮頂 = 數墨(ctx, 560, 框.尊位.足底 - 8, 680, 17);
        const 蓮臺 = 數墨(ctx, 510, 1840, 780, 210);
        const 素階 = 數墨(ctx, 440, 2038, 920, 130);
        const 階面 = 數墨(ctx, 600, 2080, 600, 50);
        斷(蓮頂 > 1000, `蓮頂未承足底±8：${蓮頂}`);
        斷(蓮臺 > 5000, `仰覆蓮線量不足：${蓮臺}`);
        斷(素階 > 2500, `素階線量不足：${素階}`);
        斷(階面 === 0, `素階面不空：${階面}`);
        for (const [x,y] of [[0,0],[1799,0],[0,2499],[1799,2499]])
          斷(ctx.getImageData(x,y,1,1).data[3] === 0, `透明布角點失守：${x},${y}`);

        console.log(`唐吳家樣框飾驗：靜域 ${靜域}；寶蓋 ${寶蓋}；蓋心偏 ${蓋心偏.toFixed(2)}；頭光唐草 ${頭光}；身光連珠 ${身光}；蓮頂 ${蓮頂}；仰覆蓮 ${蓮臺}；素階 ${素階}；蓮臺/素階自蔽✓；階面空白✓；ctx還原✓；透明布✓；無身形✓`);
        const out = document.createElement('canvas'); out.width=cv.width; out.height=cv.height;
        const o = out.getContext('2d'); o.fillStyle='#0d1124'; o.fillRect(0,0,out.width,out.height);
        o.drawImage(cv,0,0); return out.toDataURL('image/png');
      });
    },
  });
})().catch(error => { console.error(error); process.exitCode = 1; });
