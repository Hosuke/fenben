'use strict';

const { 合幀 } = require('../../tools/lib/幀具.cjs');

(async () => {
  await 合幀({
    出: '圖錄/風格館/犍陀羅-哈達灰泥期-框飾驗.png',
    幀: async page => {
      page.on('console', m => console.log('[頁]', m.text()));
      return page.evaluate(async () => {
        const 框 = await import('/匠筆-codex/風格館/犍陀羅-哈達灰泥期-框飾層.js');
        const 斷 = (真, 訊) => { console.assert(真, 訊); if (!真) throw new Error(訊); };
        const 數墨 = (ctx, x, y, w, h) => {
          const data = ctx.getImageData(x, y, w, h).data;
          let n = 0;
          for (let i = 3; i < data.length; i += 4) if (data[i]) n++;
          return n;
        };
        斷(typeof 框.景 === 'function' && typeof 框.飾 === 'function', '缺 景/飾 export');
        const 尊位 = 框.尊位;
        斷(JSON.stringify(尊位) === JSON.stringify({
          W: 1800, H: 2500, 頂y: 690, 指: 15, 中x: 900, 座面: 1710,
        }), '尊位未照表原錄');
        斷(尊位.頂y + 68 * 尊位.指 === 尊位.座面, '座面錨失守');

        const 源 = await fetch('/匠筆-codex/風格館/犍陀羅-哈達灰泥期-框飾層.js').then(r => r.text());
        斷(!源.includes('destination-out'), '框飾層不得預鑿尊身洞');
        斷(!/(?:侍者|供養人|象首|主尊)\s*\(/u.test(源), '框飾層疑殘留身形函數');

        const cv = document.createElement('canvas'); cv.width = 尊位.W; cv.height = 尊位.H;
        const ctx = cv.getContext('2d'); const 助 = { W: cv.width, H: cv.height, 尊位 };
        ctx.strokeStyle = '#123456'; ctx.fillStyle = '#654321'; ctx.lineWidth = 7;
        ctx.globalAlpha = .37; ctx.lineCap = 'butt'; ctx.lineJoin = 'bevel';
        const 狀態 = () => [ctx.strokeStyle, ctx.fillStyle, ctx.lineWidth, ctx.globalAlpha,
          ctx.lineCap, ctx.lineJoin, ctx.globalCompositeOperation].join('|');
        const 初 = 狀態();
        await 框.景(ctx, 助); 斷(狀態() === 初, '景未還原 ctx');
        await 框.飾(ctx, 助); 斷(狀態() === 初, '飾未還原 ctx');
        for (const [x, y] of [[0, 0], [1799, 0], [0, 2499], [1799, 2499]]) {
          斷(ctx.getImageData(x, y, 1, 1).data[3] === 0, `透明布角點失守：${x},${y}`);
        }
        const 座頂墨 = 數墨(ctx, 400, 尊位.座面 - 8, 1000, 17);
        const 中堂墨 = 數墨(ctx, 500, 800, 800, 850);
        const 欄內墨 = 數墨(ctx, 430, 2010, 940, 150);
        const 總墨 = 數墨(ctx, 0, 0, cv.width, cv.height);
        斷(座頂墨 > 3000, `座頂未承座面±8px：${座頂墨}`);
        斷(中堂墨 < 2500, `中堂疑有身形：${中堂墨}`);
        // 匠單續密後三格本有菱格／圓花／斜籬；此窗驗淺刻線量，非復以空欄為律。
        斷(欄內墨 > 60000 && 欄內墨 < 90000, `基座三格淺刻線量可疑：${欄內墨}`);
        // 密飾匠單（全席 >=11.5%）後之框層線量窗；舊簡版上限 260000 已不相容。
        斷(總墨 > 620000 && 總墨 < 680000, `框飾線量可疑：${總墨}`);
        console.log(`哈達框飾驗：座頂 ${座頂墨}；中堂 ${中堂墨}；欄內 ${欄內墨}；總墨 ${總墨}；ctx還原✓；透明布✓；無身形✓`);

        const out = document.createElement('canvas'); out.width = cv.width; out.height = cv.height;
        const o = out.getContext('2d'); o.fillStyle = '#0d1124'; o.fillRect(0, 0, out.width, out.height);
        o.drawImage(cv, 0, 0); return out.toDataURL('image/png');
      });
    },
  });
})().catch(error => { console.error(error); process.exitCode = 1; });
