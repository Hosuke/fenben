'use strict';

const { 合幀 } = require('../../tools/lib/幀具.cjs');

(async () => {
  await 合幀({
    出: '圖錄/風格館/尼瓦爾-thyasaphu摺頁期-框飾驗.png',
    幀: async page => page.evaluate(async () => {
      const 框 = await import('/匠筆-codex/風格館/尼瓦爾-thyasaphu摺頁期-框飾層.js');
      const 斷 = (真, 訊) => { console.assert(真, 訊); if (!真) throw new Error(訊); };
      const 尊位 = 框.尊位;
      斷(JSON.stringify(尊位) === JSON.stringify({
        W: 2200, H: 2500, 頂y: 700, 指: 13, 中x: 560, 座面: 1584,
      }), '尊位未照表原錄');
      斷(尊位.頂y + 68 * 尊位.指 === 尊位.座面, '座面錨失守');
      斷(typeof 框.景 === 'function' && typeof 框.飾 === 'function', '缺 景/飾 export');
      const 源 = await fetch('/匠筆-codex/風格館/尼瓦爾-thyasaphu摺頁期-框飾層.js').then(r => r.text());
      斷(!源.includes('destination-out'), '框飾層不得預鑿尊身洞');

      const cv = document.createElement('canvas');
      cv.width = 尊位.W; cv.height = 尊位.H;
      const ctx = cv.getContext('2d');
      const 助 = { W: cv.width, H: cv.height, 尊位 };
      const 初 = [ctx.strokeStyle, ctx.fillStyle, ctx.lineWidth, ctx.globalAlpha,
        ctx.lineCap, ctx.lineJoin, ctx.globalCompositeOperation].join('|');
      await 框.景(ctx, 助);
      await 框.飾(ctx, 助);
      const 末 = [ctx.strokeStyle, ctx.fillStyle, ctx.lineWidth, ctx.globalAlpha,
        ctx.lineCap, ctx.lineJoin, ctx.globalCompositeOperation].join('|');
      斷(末 === 初, 'ctx 狀態未還原');
      for (const [x, y] of [[0, 0], [2199, 0], [0, 2499], [2199, 2499]]) {
        斷(ctx.getImageData(x, y, 1, 1).data[3] === 0, '透明布角點失守');
      }
      const 座線 = ctx.getImageData(185, 尊位.座面 - 3, 755, 7).data;
      let 座墨 = 0;
      for (let i = 3; i < 座線.length; i += 4) if (座線[i]) 座墨++;
      斷(座墨 > 600, `座頂緣未承座面：${座墨}`);

      // 左頁尊身域只許淡紙纖維穿行；若誤留實線尊輪廓，高 alpha 墨量會陡增。
      const 身域 = ctx.getImageData(205, 390, 710, 尊位.座面 - 390).data;
      let 強墨 = 0;
      for (let i = 3; i < 身域.length; i += 4) if (身域[i] > 90) 強墨++;
      斷(強墨 < 9000, `左頁疑殘留尊身實線：強墨 ${強墨}`);

      // 右頁量度格中心線須在對頁對應中軸 x=中x+1100，五錨橫線皆有朱墨。
      const 對頁中x = 尊位.中x + 1100;
      for (const n of [12, 20, 36, 48, 68]) {
        const px = ctx.getImageData(1240, 尊位.頂y + n * 尊位.指 - 2, 770, 5).data;
        let n墨 = 0;
        for (let i = 3; i < px.length; i += 4) if (px[i]) n墨++;
        斷(n墨 > 650, `右頁 ${n} 指錨線不足：${n墨}`);
      }
      const 中線 = ctx.getImageData(對頁中x - 2, 尊位.頂y, 5, 尊位.座面 - 尊位.頂y + 1).data;
      let 中墨 = 0;
      for (let i = 3; i < 中線.length; i += 4) if (中線[i]) 中墨++;
      斷(中墨 > 800, `右頁中央梵線不足：${中墨}`);

      const out = document.createElement('canvas');
      out.width = cv.width; out.height = cv.height;
      const o = out.getContext('2d');
      o.fillStyle = '#0d1124'; o.fillRect(0, 0, out.width, out.height); o.drawImage(cv, 0, 0);
      console.log(`thyāsaphu 框飾驗：${cv.width}×${cv.height}；座面 ${尊位.座面}；左身域強墨 ${強墨}；右格五錨／中線✓；透明布✓；ctx還原✓`);
      return out.toDataURL('image/png');
    }),
  });
})().catch(error => { console.error(error); process.exitCode = 1; });
