'use strict';

// 空尊位驗幀：透明工作布只繪 景→飾，另布於最末合成深底。
const { 合幀 } = require('../../tools/lib/幀具.cjs');

(async () => {
  await 合幀({
    出: '圖錄/風格館/藏地-齊烏崗巴-框飾驗.png',
    幀: async page => {
      page.on('console', m => console.log('[頁]', m.text()));
      return page.evaluate(async () => {
        const 框 = await import('/匠筆-codex/風格館/藏地-齊烏崗巴-框飾層.js');
        const 斷 = (真, 訊) => {
          console.assert(真, 訊);
          if (!真) throw new Error(訊);
        };
        斷(typeof 框.景 === 'function' && typeof 框.飾 === 'function', '框飾層缺 景/飾 export');

        const 尊位 = 框.尊位;
        斷(JSON.stringify(尊位) === JSON.stringify({
          W: 1800, H: 2500, 頂y: 760, 指: 14, 中x: 900, 座面: 1712,
        }), '尊位未照主坊表原錄');

        const cv = document.createElement('canvas');
        cv.width = 尊位.W;
        cv.height = 尊位.H;
        const ctx = cv.getContext('2d');
        const 助 = { W: cv.width, H: cv.height, 尊位 };

        // 以哨兵狀態驗各 export 用畢確實還原 ctx。
        ctx.strokeStyle = '#123456';
        ctx.fillStyle = '#654321';
        ctx.lineWidth = 7;
        ctx.globalAlpha = .37;
        ctx.lineCap = 'butt';
        const 狀態 = () => [ctx.strokeStyle, ctx.fillStyle, ctx.lineWidth, ctx.globalAlpha, ctx.lineCap, ctx.globalCompositeOperation].join('|');
        const 初 = 狀態();
        await 框.景(ctx, 助);
        斷(狀態() === 初, '景(ctx, 助) 未還原 ctx 狀態');
        await 框.飾(ctx, 助);
        斷(狀態() === 初, '飾(ctx, 助) 未還原 ctx 狀態');

        // 工作布四角須透明；深底只能在另布末合。
        const corners = [[0, 0], [cv.width - 1, 0], [0, cv.height - 1], [cv.width - 1, cv.height - 1]];
        for (const [x, y] of corners) {
          斷(ctx.getImageData(x, y, 1, 1).data[3] === 0, `工作布角點不透明：${x},${y}`);
        }
        const data = ctx.getImageData(0, 0, cv.width, cv.height).data;
        let 有墨 = 0;
        for (let i = 3; i < data.length; i += 4) if (data[i]) 有墨++;
        斷(有墨 > 100000 && 有墨 < cv.width * cv.height * .28, `線面密度可疑：${有墨}`);
        console.log(`框飾驗：空尊位；有墨像素 ${有墨}（${(有墨 / (cv.width * cv.height) * 100).toFixed(3)}%）；ctx還原✓；透明布✓`);

        const out = document.createElement('canvas');
        out.width = cv.width;
        out.height = cv.height;
        const o = out.getContext('2d');
        o.fillStyle = '#0d1124';
        o.fillRect(0, 0, out.width, out.height);
        o.drawImage(cv, 0, 0);
        return out.toDataURL('image/png');
      });
    },
  });
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
