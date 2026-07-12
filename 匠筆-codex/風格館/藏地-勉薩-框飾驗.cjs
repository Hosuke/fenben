'use strict';

const { 合幀 } = require('../../tools/lib/幀具.cjs');

(async () => {
  await 合幀({
    出: '圖錄/風格館/藏地-勉薩-框飾驗.png',
    幀: async page => {
      page.on('console', m => console.log('[頁]', m.text()));
      return page.evaluate(async () => {
        const 框 = await import('/匠筆-codex/風格館/藏地-勉薩-框飾層.js');
        const 源 = await fetch('/匠筆-codex/風格館/藏地-勉薩-框飾層.js').then(r => r.text());
        const 斷 = (真, 訊) => { console.assert(真, 訊); if (!真) throw new Error(訊); };
        const 數墨 = (ctx, x, y, w, h) => {
          const data = ctx.getImageData(x, y, w, h).data;
          let n = 0;
          for (let i = 3; i < data.length; i += 4) if (data[i]) n++;
          return n;
        };
        斷(typeof 框.景 === 'function' && typeof 框.飾 === 'function', '缺 景/飾 export');
        斷(!/(小坐尊|傳承坐尊|手眼|清形|destination-out)/.test(源), '框飾層疑留身形或預清形筆');
        const 尊位 = 框.尊位;
        斷(JSON.stringify(尊位) === JSON.stringify({
          W: 1800, H: 2500, 頂y: 700, 指: 14, 中x: 900, 座面: 1652,
        }), '尊位未照表原錄');
        斷(尊位.頂y + 68 * 尊位.指 === 尊位.座面, '座面錨失守');
        const cv = document.createElement('canvas'); cv.width = 尊位.W; cv.height = 尊位.H;
        const ctx = cv.getContext('2d'); const 助 = { W: cv.width, H: cv.height, 尊位 };
        ctx.strokeStyle = '#123456'; ctx.fillStyle = '#654321'; ctx.lineWidth = 7;
        ctx.globalAlpha = .37; ctx.lineCap = 'butt'; ctx.lineJoin = 'bevel';
        const 狀態 = () => [ctx.strokeStyle, ctx.fillStyle, ctx.lineWidth, ctx.globalAlpha,
          ctx.lineCap, ctx.lineJoin, ctx.globalCompositeOperation].join('|');
        const 初 = 狀態();
        框.景(ctx, 助); 斷(狀態() === 初, '景未還原 ctx');
        框.飾(ctx, 助); 斷(狀態() === 初, '飾未還原 ctx');
        for (const [x, y] of [[0, 0], [1799, 0], [0, 2499], [1799, 2499]]) {
          斷(ctx.getImageData(x, y, 1, 1).data[3] === 0, `透明布角點失守：${x},${y}`);
        }
        const 座頂墨 = 數墨(ctx, 460, 尊位.座面 - 8, 880, 17);
        const 七龕墨 = 數墨(ctx, 150, 190, 1500, 260);
        const 中景墨 = 數墨(ctx, 620, 650, 560, 850);
        const 左樹墨 = 數墨(ctx, 150, 650, 420, 1000);
        const 右樹墨 = 數墨(ctx, 1230, 650, 420, 1000);
        const data = ctx.getImageData(0, 0, cv.width, cv.height).data;
        let 總墨 = 0;
        for (let i = 3; i < data.length; i += 4) if (data[i]) 總墨++;
        斷(座頂墨 > 1500, `座頂未承座面±8：${座頂墨}`);
        斷(七龕墨 > 3500, `七空龕線量不足：${七龕墨}`);
        斷(中景墨 > 3500, `中央景線過空，疑預留身形洞：${中景墨}`);
        斷(左樹墨 > 4500 && 右樹墨 > 4500, `花樹線量不足：左${左樹墨}/右${右樹墨}`);
        斷(總墨 > 145000 && 總墨 < cv.width * cv.height * .16, `總線面密度可疑：${總墨}`);
        const 龕心 = [258, 472, 686, 900, 1114, 1328, 1542];
        const 龕內 = 龕心.map(cx => 數墨(ctx, cx - 48, 270, 96, 130));
        斷(龕內.every(n => n < 120), `七龕內疑有身形：${龕內.join('/')}`);
        console.log(`勉薩框飾驗：座面 ${尊位.座面}；座頂 ${座頂墨}；七龕內 ${龕內.join('/')}；中景 ${中景墨}；花樹 ${左樹墨}/${右樹墨}；總墨 ${總墨}；無身形筆✓；ctx還原✓；透明布✓`);
        const out = document.createElement('canvas'); out.width = cv.width; out.height = cv.height;
        const o = out.getContext('2d'); o.fillStyle = '#0d1124'; o.fillRect(0, 0, out.width, out.height);
        o.drawImage(cv, 0, 0); return out.toDataURL('image/png');
      });
    },
  });
})().catch(error => { console.error(error); process.exitCode = 1; });
