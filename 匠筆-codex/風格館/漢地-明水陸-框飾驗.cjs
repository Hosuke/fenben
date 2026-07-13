'use strict';

const { 合幀 } = require('../../tools/lib/幀具.cjs');

(async () => {
  await 合幀({
    出: '圖錄/風格館/漢地-明水陸-框飾驗.png',
    幀: async page => {
      page.on('console', m => console.log('[頁]', m.text()));
      return page.evaluate(async () => {
        const 框 = await import('/匠筆-codex/風格館/漢地-明水陸-框飾層.js');
        const 源 = await fetch('/匠筆-codex/風格館/漢地-明水陸-框飾層.js').then(r => r.text());
        const 斷 = (真, 訊) => { console.assert(真, 訊); if (!真) throw new Error(訊); };
        const 數墨 = (ctx, x, y, w, h) => {
          const d = ctx.getImageData(x, y, w, h).data; let n = 0;
          for (let i = 3; i < d.length; i += 4) if (d[i]) n++;
          return n;
        };
        const 數非法景墨 = (ctx, x, y, w, h) => {
          const d = ctx.getImageData(x, y, w, h).data; let n = 0;
          for (let py = 0; py < h; py++) for (let px = 0; px < w; px++) {
            if (!d[(py * w + px) * 4 + 3]) continue;
            const X = x + px, Y = y + py;
            const 主圓 = Math.abs(Math.hypot(X - 900, Y - 660) - 204) <= 19;
            const 左圓 = Math.abs(Math.hypot(X - 430, Y - 980) - 114) <= 17;
            const 右圓 = Math.abs(Math.hypot(X - 1370, Y - 980) - 114) <= 17;
            const 外橢 = Math.abs(Math.hypot((X - 900) / 340, (Y - 790) / 460) - 1) <= .046;
            if (!(主圓 || 左圓 || 右圓 || 外橢)) n++;
          }
          return n;
        };

        斷(typeof 框.景 === 'function' && typeof 框.飾 === 'function', '缺 景/飾 export');
        斷(JSON.stringify(框.尊位) === JSON.stringify({
          W:1800, H:2500, 頂y:520, 指:12, 中x:900, 座面:1144,
        }), '尊位未照錄');
        斷(!/(?:白描\s*\(|依號\s*\[|\/dist\/(?:yigui|baimiao)\.js)/u.test(源), '框飾層疑引入尊身筆');
        斷(!/\.fillRect\s*\(/u.test(源), '框飾層疑於透明布鋪底');
        斷((源.match(/destination-out/g) || []).length >= 1, '缺 destination-out 淨域');
        for (const 名 of ['雲帶','身光','圓光','寶蓋','須彌座','踏几','側蓮座','供桌','地界'])
          斷(new RegExp(`function ${名}\\([^]*?淨(?:域|矩)\\(ctx,`).test(源), `${名} 未先淨其域`);
        斷(/一段\(362, \.46\)[\s\S]*一段\(430, \.34/.test(源), '上方二段淡雲或 alpha 失守');
        斷(/薰爐/.test(源) && (源.match(/花瓶\(ctx,/g) || []).length === 3,
          '供桌薰爐一／花瓶二失守');

        const cv = document.createElement('canvas'); cv.width=框.尊位.W; cv.height=框.尊位.H;
        const ctx = cv.getContext('2d'); const 助={ W:cv.width,H:cv.height,尊位:框.尊位 };
        ctx.strokeStyle='#123456'; ctx.fillStyle='#654321'; ctx.lineWidth=7; ctx.globalAlpha=.37;
        ctx.lineCap='butt'; ctx.lineJoin='bevel';
        const 狀態=()=>[ctx.strokeStyle,ctx.fillStyle,ctx.lineWidth,ctx.globalAlpha,
          ctx.lineCap,ctx.lineJoin,ctx.globalCompositeOperation].join('|');
        const 初=狀態();
        框.景(ctx,助); 斷(狀態()===初,'景未還原 ctx');

        const 寶蓋=數墨(ctx,500,105,800,220);
        const 雲帶=數墨(ctx,70,326,1660,158);
        const 主頭光=數墨(ctx,675,435,450,450);
        const 身光=數墨(ctx,545,315,710,950);
        const 左頭光=數墨(ctx,295,845,270,270);
        const 右頭光=數墨(ctx,1235,845,270,270);
        斷(寶蓋>3000,`寶蓋線量不足：${寶蓋}`);
        斷(雲帶>2200,`二段淡雲線量不足：${雲帶}`);
        斷(主頭光>5000,`主尊頭光不足：${主頭光}`);
        斷(身光>9500,`主尊身光不足：${身光}`);
        斷(左頭光>2200 && 右頭光>2200,`側二頭光不足：${左頭光}/${右頭光}`);

        const 景主靜=數非法景墨(ctx,680,500,440,640);
        const 景左靜=數非法景墨(ctx,300,860,260,440);
        const 景右靜=數非法景墨(ctx,1240,860,260,440);
        const 景左翼=數非法景墨(ctx,180,1560,440,580);
        const 景右翼=數非法景墨(ctx,1180,1560,440,580);
        const 景垂足=數非法景墨(ctx,760,1300,280,178);
        斷(景主靜===0 && 景左靜===0 && 景右靜===0 &&
          景左翼===0 && 景右翼===0 && 景垂足===0,
          `景侵靜域：主${景主靜} 左${景左靜} 右${景右靜} 左翼${景左翼} 右翼${景右翼} 垂足${景垂足}`);

        const acv=document.createElement('canvas'); acv.width=cv.width; acv.height=cv.height;
        const ax=acv.getContext('2d');
        框.飾(ax,助);
        框.飾(ctx,助); 斷(狀態()===初,'飾未還原 ctx');
        const 座面=數墨(ax,630,1136,540,17);
        const 須彌座=數墨(ax,625,1135,550,275);
        const 踏几面=數墨(ax,750,1472,300,17);
        const 踏几足=數墨(ax,748,1478,304,90);
        const 左蓮頂=數墨(ax,290,1302,280,17);
        const 右蓮頂=數墨(ax,1230,1302,280,17);
        const 側蓮=數墨(ax,285,1300,1230,180);
        const 桌面=數墨(ax,628,1612,544,22);
        const 供桌=數墨(ax,625,1400,550,412);
        const 地界=數墨(ax,70,2112,1660,17);
        斷(座面>1450,`須彌座面未承1144±8：${座面}`);
        斷(須彌座>10500,`束腰壺門須彌座不足：${須彌座}`);
        斷(踏几面>700,`踏几面未承1480±8：${踏几面}`);
        斷(踏几足>2200,`踏几足不足：${踏几足}`);
        斷(左蓮頂>600 && 右蓮頂>600,`側蓮頂未承1310±8：${左蓮頂}/${右蓮頂}`);
        斷(側蓮>8500,`側二仰覆蓮不足：${側蓮}`);
        斷(桌面>1500 && 供桌>12000,`供桌／供物不足：${桌面}/${供桌}`);
        斷(地界>500,`地界線不足：${地界}`);

        // 飾層不得侵人物預留位；承面錨帶本身自靜域下緣起，不列入上空。
        const 飾主靜=數墨(ax,680,500,440,637);
        const 飾左靜=數墨(ax,300,860,260,441);
        const 飾右靜=數墨(ax,1240,860,260,441);
        const 飾左翼=數墨(ax,180,1560,440,581);
        const 飾右翼=數墨(ax,1180,1560,440,581);
        const 飾垂足=數墨(ax,760,1300,280,178);
        斷(飾主靜===0 && 飾左靜===0 && 飾右靜===0 &&
          飾左翼===0 && 飾右翼===0 && 飾垂足<12,
          `飾侵靜域：主${飾主靜} 左${飾左靜} 右${飾右靜} 左翼${飾左翼} 右翼${飾右翼} 垂足${飾垂足}`);

        // 預塞墨，實證各器物清域後自描；域外哨須仍在。
        const ocv=document.createElement('canvas'); ocv.width=cv.width; ocv.height=cv.height;
        const ox=ocv.getContext('2d'); ox.fillStyle='#fff';
        ox.fillRect(628,1136,544,274); ox.fillRect(748,1479,304,90);
        ox.fillRect(288,1301,284,177); ox.fillRect(1228,1301,284,177);
        ox.fillRect(628,1402,544,408); ox.fillRect(20,2200,100,100);
        框.飾(ox,{ W:ocv.width,H:ocv.height,尊位:框.尊位 });
        const 座淨心=數墨(ox,820,1270,160,55);
        const 几淨心=數墨(ox,840,1500,120,35);
        const 左蓮淨心=數墨(ox,365,1372,120,24);
        const 右蓮淨心=數墨(ox,1315,1372,120,24);
        const 桌淨心=數墨(ox,780,1710,240,55);
        const 域外哨=數墨(ox,20,2200,100,100);
        斷(座淨心<1200 && 几淨心<650 && 左蓮淨心<900 && 右蓮淨心<900 && 桌淨心<1800,
          `器物自淨失守：座${座淨心} 几${几淨心} 左蓮${左蓮淨心} 右蓮${右蓮淨心} 桌${桌淨心}`);
        斷(域外哨===10000,`遮蔽域外哨失守：${域外哨}`);

        for(const [x,y] of [[0,0],[1799,0],[0,2499],[1799,2499]])
          斷(ctx.getImageData(x,y,1,1).data[3]===0,`透明布角點失守：${x},${y}`);

        console.log(`明水陸框飾驗：座面1144±8 ${座面}；踏几1480±8 ${踏几面}；側蓮1310±8 ${左蓮頂}/${右蓮頂}；寶蓋 ${寶蓋}；二段淡雲 ${雲帶}；主頭/身光 ${主頭光}/${身光}；側二頭光 ${左頭光}/${右頭光}；須彌座 ${須彌座}；踏几 ${踏几足}；側二蓮 ${側蓮}；供桌供物 ${供桌}；地界 ${地界}；諸靜域淨✓；諸物自淨✓；ctx還原✓；透明布✓；無身形✓`);
        const out=document.createElement('canvas'); out.width=cv.width; out.height=cv.height;
        const o=out.getContext('2d'); o.fillStyle='#0d1124'; o.fillRect(0,0,out.width,out.height);
        o.drawImage(cv,0,0); return out.toDataURL('image/png');
      });
    },
  });
})().catch(error => { console.error(error); process.exitCode=1; });
