'use strict';

const { 合幀 } = require('../../tools/lib/幀具.cjs');

(async () => {
  await 合幀({
    出: '圖錄/風格館/藏地-欽孜-框飾驗.png',
    幀: async page => {
      page.on('console', m => console.log('[頁]', m.text()));
      return page.evaluate(async () => {
        const 框 = await import('/匠筆-codex/風格館/藏地-欽孜-框飾層.js');
        const 主 = await import('/匠筆-主坊/風格館/藏地-欽孜-尊身層.js');
        const 源 = await fetch('/匠筆-codex/風格館/藏地-欽孜-框飾層.js').then(r => r.text());
        const 斷 = (真, 訊) => { console.assert(真, 訊); if (!真) throw new Error(訊); };
        const 數墨 = (ctx, x, y, w, h) => {
          const data = ctx.getImageData(x, y, w, h).data;
          let n = 0;
          for (let i = 3; i < data.length; i += 4) if (data[i]) n++;
          return n;
        };
        斷(typeof 框.景 === 'function' && typeof 框.飾 === 'function', '缺 景/飾 export');
        斷(!/(小坐尊|傳承位|寶帳怙主\s*\(|迦樓羅\s*\(|fillRect\s*\()/.test(源), '疑留身形或鋪底');
        斷(源.includes("globalCompositeOperation = 'destination-out'"), '飾物自蔽淨域未落');
        const 尊位 = 框.尊位;
        斷(JSON.stringify(尊位) === JSON.stringify({
          W: 1800, H: 2500, 頂y: 820, 指: 12, 中x: 900, 座面: 1636,
        }), '尊位未照主坊表原錄');
        斷(尊位.頂y + 68 * 尊位.指 === 尊位.座面, '座面錨失守');
        const cv = document.createElement('canvas'); cv.width = 尊位.W; cv.height = 尊位.H;
        const ctx = cv.getContext('2d'); const 助 = { W: cv.width, H: cv.height, 尊位 };
        ctx.strokeStyle = '#123456'; ctx.fillStyle = '#654321'; ctx.lineWidth = 7;
        ctx.globalAlpha = .37; ctx.lineCap = 'butt'; ctx.lineJoin = 'bevel';
        const 狀態 = () => [ctx.strokeStyle,ctx.fillStyle,ctx.lineWidth,ctx.globalAlpha,ctx.lineCap,ctx.lineJoin,ctx.globalCompositeOperation].join('|');
        const 初 = 狀態();
        框.景(ctx, 助); 斷(狀態() === 初, '景未還原 ctx');
        const 靜域墨 = 數墨(ctx, 620, 880, 560, 820);
        斷(靜域墨 === 0, `主尊靜域受侵：${靜域墨}`);
        框.飾(ctx, 助); 斷(狀態() === 初, '飾未還原 ctx');
        斷(數墨(ctx, 410, 2020, 210, 140) === 0, '屍陀林欄內尚有焰線');
        for (const [x,y] of [[0,0],[1799,0],[0,2499],[1799,2499]]) {
          斷(ctx.getImageData(x,y,1,1).data[3] === 0, `透明布角點失守：${x},${y}`);
        }
        const 座頂墨 = 數墨(ctx, 480, 尊位.座面 - 8, 840, 17);
        const 外焰墨 = 數墨(ctx, 120, 180, 1560, 2140);
        const 總墨 = 數墨(ctx, 0, 0, cv.width, cv.height);
        斷(座頂墨 > 1300, `蓮日輪未承座面±8：${座頂墨}`);
        斷(外焰墨 > 20000, `簡版外焰線量不足：${外焰墨}`);
        斷(總墨 < cv.width * cv.height * .14, `總墨過密：${總墨}`);
        const 合 = document.createElement('canvas'); 合.width = 尊位.W; 合.height = 尊位.H;
        const 合ctx = 合.getContext('2d');
        框.景(合ctx, 助);
        await 主.尊(合ctx, 助);
        const 尊後墨 = 數墨(合ctx, 620, 880, 560, 756);
        框.飾(合ctx, 助);
        const 飾後墨 = 數墨(合ctx, 620, 880, 560, 756);
        斷(尊後墨 > 9000, `合成尊身線量不足：${尊後墨}`);
        斷(飾後墨 >= 尊後墨, `飾層侵蝕主尊：${尊後墨}→${飾後墨}`);
        console.log(`欽孜框飾驗：座面 ${尊位.座面}；座頂 ${座頂墨}；景層靜域 ${靜域墨}；外焰 ${外焰墨}；總墨 ${總墨}；ctx還原✓；透明布✓；無身形✓`);
        const out = document.createElement('canvas'); out.width = cv.width; out.height = cv.height;
        const o = out.getContext('2d'); o.fillStyle = '#0d1124'; o.fillRect(0,0,out.width,out.height);
        o.drawImage(cv,0,0); return out.toDataURL('image/png');
      });
    },
  });
})().catch(error => { console.error(error); process.exitCode = 1; });
