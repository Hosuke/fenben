'use strict';

// 空尊位驗幀：透明工作布依次繪景、飾，深底只在另布末合。
const { 合幀 } = require('../../tools/lib/幀具.cjs');

(async () => {
  await 合幀({
    出: '圖錄/風格館/藏地-噶瑪嘎孜-框飾驗.png',
    幀: async page => {
      page.on('console', m => console.log('[頁]', m.text()));
      return page.evaluate(async () => {
        const 框 = await import('/匠筆-codex/風格館/藏地-噶瑪嘎孜-框飾層.js');
        const 源 = await fetch('/匠筆-codex/風格館/藏地-噶瑪嘎孜-框飾層.js').then(r => r.text());
        const 斷 = (真, 訊) => { console.assert(真, 訊); if (!真) throw new Error(訊); };
        const 數墨 = (ctx, x, y, w, h) => {
          const d = ctx.getImageData(x, y, w, h).data; let n = 0;
          for (let i = 3; i < d.length; i += 4) if (d[i]) n++;
          return n;
        };
        const 數白 = (ctx, x, y, w, h) => {
          const d = ctx.getImageData(x, y, w, h).data; let n = 0;
          for (let i = 0; i < d.length; i += 4)
            if (d[i] > 245 && d[i+1] > 245 && d[i+2] > 245 && d[i+3]) n++;
          return n;
        };
        斷(typeof 框.景 === 'function' && typeof 框.飾 === 'function', '缺 景/飾 export');
        斷(JSON.stringify(框.尊位) === JSON.stringify({
          W:1800, H:2500, 頂y:560, 指:11, 中x:900, 足底:1880,
        }), '尊位未照錄');
        斷(框.尊位.頂y + 120 * 框.尊位.指 === 框.尊位.足底, '足底錨失守');
        斷(!/(白描\s*\(|主尊\s*\(|十一面\s*\(|千手\s*\(|八主臂\s*\(|手眼\s*\()/.test(源), '疑留身形');
        斷(!/fillRect\s*\(/.test(源), '框飾層疑於透明布鋪底');
        斷(/淨域\(ctx, 蓮廓\)[\s\S]*淨域\(ctx, 水廓\)/.test(源),
          '蓮臺與水帶未各自先淨其域');

        const cv = document.createElement('canvas'); cv.width=框.尊位.W; cv.height=框.尊位.H;
        const ctx = cv.getContext('2d'); const 助={ W:cv.width, H:cv.height, 尊位:框.尊位 };
        ctx.strokeStyle='#123456'; ctx.fillStyle='#654321'; ctx.lineWidth=7; ctx.globalAlpha=.37;
        ctx.lineCap='butt'; ctx.lineJoin='bevel';
        const 狀態=()=>[ctx.strokeStyle,ctx.fillStyle,ctx.lineWidth,ctx.globalAlpha,ctx.lineCap,ctx.lineJoin,ctx.globalCompositeOperation].join('|');
        const 初=狀態();
        框.景(ctx, 助); 斷(狀態() === 初, '景未還原 ctx');
        const 靜域 = 數墨(ctx, 430, 330, 940, 1570);
        const 天際 = 數墨(ctx, 70, 105, 1660, 200);
        const 光環 = 數墨(ctx, 270, 190, 1260, 1840);
        斷(靜域 === 0, `主尊靜域受侵：${靜域}`);
        斷(天際 > 1800, `天際山雲線量不足：${天際}`);
        斷(光環 > 9000, `外環身光線量不足：${光環}`);

        // 景墨哨布驗兩件各自 destination-out；非以透明空布冒充自蔽。
        const ocv=document.createElement('canvas'); ocv.width=cv.width; ocv.height=cv.height;
        const ox=ocv.getContext('2d'); ox.fillStyle='#fff'; ox.fillRect(300,1860,1200,320);
        框.飾(ox, { W:ocv.width, H:ocv.height, 尊位:框.尊位 });
        const 蓮淨心=數白(ox, 760,1920,280,105);
        const 水淨心=數白(ox, 760,2070,280,80);
        const 域外哨=數白(ox, 300,1870,100,260);
        斷(蓮淨心 < 120, `蓮臺未先淨其域：${蓮淨心}`);
        斷(水淨心 < 120, `水帶未先淨其域：${水淨心}`);
        斷(域外哨 > 18000, `自蔽實驗域外哨墨失守：${域外哨}`);

        框.飾(ctx, 助); 斷(狀態() === 初, '飾未還原 ctx');
        const 蓮頂=數墨(ctx, 510,框.尊位.足底-8,780,17);
        const 蓮臺=數墨(ctx, 480,1880,840,181);
        const 水帶=數墨(ctx, 330,2060,1140,101);
        斷(蓮頂 > 1000, `蓮頂未承足底±8：${蓮頂}`);
        斷(蓮臺 > 8500, `仰覆蓮線量不足：${蓮臺}`);
        斷(水帶 > 7000, `水紋帶線量不足：${水帶}`);
        for (const [x,y] of [[0,0],[1799,0],[0,2499],[1799,2499]])
          斷(ctx.getImageData(x,y,1,1).data[3] === 0, `透明布角點失守：${x},${y}`);
        console.log(`噶瑪嘎孜框飾驗：靜域 ${靜域}；天際 ${天際}；外環 ${光環}；蓮頂 ${蓮頂}；仰覆蓮 ${蓮臺}；水帶 ${水帶}；蓮臺/水帶各自淨域✓；ctx還原✓；透明布✓；無身形✓`);

        const out=document.createElement('canvas'); out.width=cv.width; out.height=cv.height;
        const o=out.getContext('2d'); o.fillStyle='#0d1124'; o.fillRect(0,0,out.width,out.height);
        o.drawImage(cv,0,0); return out.toDataURL('image/png');
      });
    },
  });
})().catch(error => { console.error(error); process.exitCode=1; });
