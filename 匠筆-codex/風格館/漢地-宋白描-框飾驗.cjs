'use strict';

const { 合幀 } = require('../../tools/lib/幀具.cjs');

(async () => {
  await 合幀({
    出: '圖錄/風格館/漢地-宋白描-框飾驗.png',
    幀: async page => {
      page.on('console', m => console.log('[頁]', m.text()));
      return page.evaluate(async () => {
        const 框 = await import('/匠筆-codex/風格館/漢地-宋白描-框飾層.js');
        const 源 = await fetch('/匠筆-codex/風格館/漢地-宋白描-框飾層.js').then(r => r.text());
        const 斷 = (真, 訊) => { console.assert(真, 訊); if (!真) throw new Error(訊); };
        const 數墨 = (ctx, x, y, w, h) => {
          const d = ctx.getImageData(x, y, w, h).data; let n = 0;
          for (let i = 3; i < d.length; i += 4) if (d[i]) n++;
          return n;
        };

        斷(typeof 框.景 === 'function' && typeof 框.飾 === 'function', '缺 景/飾 export');
        斷(JSON.stringify(框.尊位) === JSON.stringify({
          W:1800, H:2500, 頂y:640, 指:11, 中x:940, 座面:1400,
        }), '尊位未照錄');
        斷(!/光背|頭光|身光/.test(源), '維摩席不得設光背');
        斷(!/(?:人物|文殊|維摩|天女|侍者)[^\n]{0,12}(?:輪廓|面|手|足|衣)/u.test(源), '框飾層疑留人物筆');
        斷(!/\.fillRect\s*\(/u.test(源), '框飾層疑於透明布鋪底');
        斷((源.match(/destination-out/g) || []).length >= 1 &&
          (源.match(/淨域\(ctx, 榻廓\)/g) || []).length === 1 &&
          (源.match(/淨域\(ctx, 几廓\)/g) || []).length === 1, '榻几未各自先淨域');
        斷(/圓錢紋/.test(源) && /雙履並置/.test(源), '圓紋鏤空或雙履未增補');

        const cv = document.createElement('canvas'); cv.width=框.尊位.W; cv.height=框.尊位.H;
        const ctx = cv.getContext('2d'); const 助={ W:cv.width, H:cv.height, 尊位:框.尊位 };
        ctx.strokeStyle='#123456'; ctx.fillStyle='#654321'; ctx.lineWidth=7; ctx.globalAlpha=.37;
        ctx.lineCap='butt'; ctx.lineJoin='bevel';
        const 狀態=()=>[ctx.strokeStyle,ctx.fillStyle,ctx.lineWidth,ctx.globalAlpha,
          ctx.lineCap,ctx.lineJoin,ctx.globalCompositeOperation].join('|');
        const 初=狀態();
        框.景(ctx,助); 斷(狀態()===初,'景未還原 ctx');
        框.飾(ctx,助); 斷(狀態()===初,'飾未還原 ctx');

        const 維摩上空=數墨(ctx,700,600,480,630);
        const 天女域=數墨(ctx,220,500,320,1380);
        const 榻面=數墨(ctx,520,1392,1060,17);
        const 榻木=數墨(ctx,540,1220,1030,690);
        const 足几墨=數墨(ctx,790,1925,322,87);
        const 圓紋=數墨(ctx,590,1278,930,88);
        const 雙履=數墨(ctx,810,1845,270,85);
        const 淡雲=數墨(ctx,80,290,1640,240);
        const 地平=數墨(ctx,70,1960,1660,48);
        斷(維摩上空===0,`維摩上空受侵：${維摩上空}`);
        斷(天女域===0,`天女靜域受侵：${天女域}`);
        斷(榻面>2400,`榻面未承1400±8：${榻面}`);
        斷(榻木>18000,`大榻線量不足：${榻木}`);
        斷(足几墨>1600,`足几線量不足：${足几墨}`);
        斷(圓紋>9000,`欄板圓紋鏤空不足：${圓紋}`);
        斷(雙履>1800,`几上雙履線量不足：${雙履}`);
        斷(淡雲>1200,`榻後淡雲紋帶不足：${淡雲}`);
        斷(地平>1400,`地平淡線不足：${地平}`);

        // 另布塞墨，以實證榻、几各先 destination-out 後自描。
        const ocv=document.createElement('canvas'); ocv.width=cv.width; ocv.height=cv.height;
        const ox=ocv.getContext('2d'); ox.fillStyle='#fff'; ox.fillRect(500,1180,1100,860);
        框.飾(ox,{ W:ocv.width,H:ocv.height,尊位:框.尊位 });
        const 榻淨心=數墨(ox,990,1600,110,120);
        const 几淨心=數墨(ox,880,1950,140,42);
        const 域外哨=數墨(ox,510,1930,200,60);
        斷(榻淨心===0,`大榻未先淨域：${榻淨心}`);
        斷(几淨心<260,`足几未先淨域：${几淨心}`);
        斷(域外哨>9000,`遮蔽實驗哨墨失守：${域外哨}`);
        for(const [x,y] of [[0,0],[1799,0],[0,2499],[1799,2499]])
          斷(ctx.getImageData(x,y,1,1).data[3]===0,`透明布角點失守：${x},${y}`);

        console.log(`宋白描框飾驗：榻面1400±8 ${榻面}；維摩上空 ${維摩上空}；天女域 ${天女域}；大榻 ${榻木}；圓紋鏤空 ${圓紋}；足几 ${足几墨}；雙履 ${雙履}；淡雲 ${淡雲}；地平 ${地平}；榻几自蔽✓；二靜域淨✓；無身形✓；ctx還原✓；透明布✓`);
        const out=document.createElement('canvas'); out.width=cv.width; out.height=cv.height;
        const o=out.getContext('2d'); o.fillStyle='#0d1124'; o.fillRect(0,0,out.width,out.height);
        o.drawImage(cv,0,0); return out.toDataURL('image/png');
      });
    },
  });
})().catch(error => { console.error(error); process.exitCode=1; });
