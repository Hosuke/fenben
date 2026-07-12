'use strict';

const { 合幀 } = require('../../tools/lib/幀具.cjs');

(async () => {
  await 合幀({
    出: '圖錄/風格館/東密-唐請來原本期-框飾驗.png',
    幀: async page => {
      page.on('console', m => console.log('[頁]', m.text()));
      return page.evaluate(async () => {
        const 框 = await import('/匠筆-codex/風格館/東密-唐請來原本期-框飾層.js');
        const 斷 = (真, 訊) => { if (!真) throw new Error(訊); };
        const 源 = await fetch('/匠筆-codex/風格館/東密-唐請來原本期-框飾層.js').then(r => r.text());
        斷(!/(?<![\p{L}\p{N}_])(?:白描|執杵手|執鈴手|執筆)\s*\(/u.test(源), '框飾層殘留身形／手圖函數');
        斷(!源.includes('destination-out'), '框飾層不應自挖人形洞');
        斷(!/\.fillRect\s*\(/u.test(源), '框飾層疑於透明工作布鋪底');
        斷(typeof 框.景 === 'function' && typeof 框.飾 === 'function', '缺 景/飾 export');
        斷(JSON.stringify(框.尊位) === JSON.stringify({
          W: 1800, H: 2500, 頂y: 680, 指: 14, 中x: 740, 座面: 1632,
        }), '尊位未照錄');
        斷(框.尊位.頂y + 68 * 框.尊位.指 === 框.尊位.座面, '座面錨失守');

        const cv = document.createElement('canvas');
        cv.width = 框.尊位.W; cv.height = 框.尊位.H;
        const ctx = cv.getContext('2d');
        const 助 = { W: cv.width, H: cv.height, 尊位: 框.尊位 };
        ctx.strokeStyle = '#123456'; ctx.fillStyle = '#654321'; ctx.lineWidth = 7;
        ctx.globalAlpha = .37; ctx.lineCap = 'butt'; ctx.lineJoin = 'bevel';
        const 狀態 = () => [ctx.strokeStyle, ctx.fillStyle, ctx.lineWidth, ctx.globalAlpha,
          ctx.lineCap, ctx.lineJoin, ctx.globalCompositeOperation].join('|');
        const 初 = 狀態();
        await 框.景(ctx, 助); 斷(狀態() === 初, '景未還原 ctx');
        await 框.飾(ctx, 助); 斷(狀態() === 初, '飾未還原 ctx');

        for (const [x, y] of [[0, 0], [1799, 0], [0, 2499], [1799, 2499]]) {
          斷(ctx.getImageData(x, y, 1, 1).data[3] === 0, '透明布角點失守');
        }
        const 座帶 = ctx.getImageData(160, 框.尊位.座面 - 4, 1140, 9).data;
        let 座墨 = 0;
        for (let i = 3; i < 座帶.length; i += 4) if (座帶[i]) 座墨++;
        斷(座墨 > 1000, `座頂未承座面：${座墨}`);
        const 數墨 = (x, y, w, h) => {
          const d = ctx.getImageData(x, y, w, h).data; let n = 0;
          for (let i = 3; i < d.length; i += 4) if (d[i]) n++;
          return n;
        };
        const 左龕心 = 數墨(298, 1930, 160, 160);
        const 中龕心 = 數墨(818, 1930, 160, 160);
        const 右龕心 = 數墨(1338, 1930, 160, 160);
        斷(左龕心 < 24 && 中龕心 < 24, `前二龕疑殘留手圖：${左龕心}/${中龕心}`);
        斷(右龕心 > 900, `第三龕五鈷杵缺失：${右龕心}`);
        const 有墨 = 數墨(0, 0, cv.width, cv.height);
        斷(有墨 > 70000 && 有墨 < cv.width * cv.height * .12, `框飾線量可疑：${有墨}`);

        const out = document.createElement('canvas'); out.width = cv.width; out.height = cv.height;
        const o = out.getContext('2d'); o.fillStyle = '#0d1124'; o.fillRect(0, 0, out.width, out.height);
        o.drawImage(cv, 0, 0);
        console.log(`框飾驗：座面 ${框.尊位.座面}；座帶墨 ${座墨}；前二龕心 ${左龕心}/${中龕心}；第三器物 ${右龕心}；總墨 ${有墨}；無身形函數✓；ctx還原✓；透明布✓`);
        return out.toDataURL('image/png');
      });
    },
  });
})().catch(error => { console.error(error); process.exitCode = 1; });
