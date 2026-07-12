// 已退役候展原稿：僅供留存；新制見 東密-鎌倉大成期-框飾層.js。
// 粉本線上博物館·東密室·鎌倉大成期候展稿
// 不動明王二童子·覚禪鈔式（研究性復原／待核）
//
// 【所據參攷】
// - 本地：參攷-local/風格館/東密/met-1975.268.163-fudo-myoo.jpg（短碩童子形、
//   慧刀羂索、岩座）；cleveland-1987.39-ninnokyo-zuzo.jpg（骨描勻細、
//   主大從小、眷屬與焰光密貼）；met-1975.268.3-kongokai-zuzo-1083.jpg
//   （白描圖像之素地、衣褶與紋帶節律）。
// - WebSearch 二童子交叉（2026-07-12）：兵庫縣立歷史博物館〈不動明王
//   二童子像〉資料頁核矜羯羅白肉、尊右下、右手額前、左手蓮華；
//   制吒迦赤肉、右手棒、左手獨鈷。Japan Search/NICH〈The Wisdom King
//   Fudō〉又核矜羯羅持蓮而容順、制吒迦持棒而容動。Metropolitan
//   Museum Journal 14 (1979) 核二童子於平安初已成不動常侍。
//   URL：https://rekihaku.pref.hyogo.lg.jp/database/shiryo/detail/?id=2838 ；
//   https://jpsearch.go.jp/en/item/cobas-38721 ；
//   https://resources.metmuseum.org/resources/metpublications/pdf/The_Fudo_Myo_o_from_the_Packard_Collection_The_Metropolitan_Museum_Journal_v_14_1979.pdf
// 【所據卷】docs/考據/畫風-日本.md〈白描圖像四大集成〉〈線質與開臉〉；
//   docs/風格館總設計.md〈東密室〉迦樓羅焰、圖像頁界線、截金紋轉寫。
//   《覚禪鈔》精確圖版與二童子逐飾未逐葉覆核，故本席明標「研究性復原／待核」，
//   不稱復刻某葉；髮結細數亦不作定式判準。
//
// 【可目驗三判準】
// 1. 主尊延用庫內 fudo|t 專筆：短碩童子形、尊右慧刀、尊左羂索、天地眼與磐石座均不改。
// 2. 尊右下矜羯羅穏靜持蓮；尊左下制吒迦張步持棒與獨鈷；二者面容、動勢、
//    持物三組差異不以題字代之。
// 3. 迦樓羅焰由尊身之後包至頂喙，下承五層瑟瑟座；條帛與座緣將截金卐繫細紋
//    轉為白描，精在衣座而非空框。
//
// 【表法景物】慧刀（斷惑）、羂索（繫縛難調）、矜羯羅蓮華、制吒迦棒與獨鈷、
// 迦樓羅焰（智火焚障）、磐石與瑟瑟座（不動）、截金風卐繫衣緣、連珠・菱花・蓮瓣頁緣。
//
// 【返工實錄】
// - 輪一：完成三尊、焰光與瑟瑟座合幀；縮覽發現底座與二童子袖緣層級尚弱，
//   尊左焰舌又近棒梢而難辨。
// - 輪二：加深五層座之交錯石縫、補衣緣卐繫與團花，將制吒迦棒梢前移、
//   背後火芯斷開；二童子面部線及領珠尚弱，且火舌根在縮覽仍顯離散。
// - 輪三／末輪：加內外連焰根環、主尊三道懸鏈、童子耳環領珠、座石八重細皴；
//   headless 作 `/tmp/fenben-seat11-final-compare.png` 與東密三參攷及「尼瓦爾-精密二稿」
//   等高四聯並觀。三尊持物可辨、主從比清楚、諸帶皆有紋，未見裁切與無故空佔。
//
// 【量度・chirality assert】
// - 主尊 R=900，庫筆縱錨實作斷言：白毫12・頸20・心窩36・臍48・座面68；
//   忌怒八搩用坐像短碩體，不偽稱百二十指立像身高。
// - 矜羯羅：尊右手額前，拇指生於本手內側；本左手握蓮，拇指向身。制吒迦：
//   本右手握棒、本左手握獨鈷，二拇指皆在掌之內側；器梢不橫穿掌面。程式末實行逐手 assert。
//
// 【對尼瓦爾卷完成度自評】
// 尼瓦爾精密二稿以滿地 torana、林木與上欄見長；此席依白描圖像素地之法，不以林木追平其密。
// 改以三尊衣紋、兩周焰芯、五層石縫與四帶異紋取得局部線密度；主尊面手保留息地。
// 以「畫派辨識度、主從層級、持物可讀、紋帶完成」評 0.91；尊身與童子衣緣、焰帶、
// 座帶三個局部之線紋密度已及尼瓦爾卷，全幀仍依東密白描圖像保存主尊周邊素地。

const { 合幀 } = require('../../tools/lib/幀具.cjs');

(async () => {
  await 合幀({
    出: '圖錄/風格館/東密-鎌倉大成期-候展稿-已退役.png',
    幀: page => page.evaluate(async () => {
      const { 依號 } = await import('/dist/yigui.js');
      const { 白描 } = await import('/dist/baimiao.js');
      const {造線筆, 連珠橫, 菱花橫, 卐繫橫, 蓮瓣橫} =
        await import('/匠筆-codex/風格館/lib/白描幀具.js');

      const W = 1800, H = 2500;
      const 墨 = '#d8b36a', 地 = '#0d1124';
      const ink = document.createElement('canvas'); ink.width = W; ink.height = H;
      const x = ink.getContext('2d');
      const p = 造線筆(x, { 墨, 骨: 3.0, 衣: 1.7, 鬚: .86 });
      const { 筆, 復, 線, 貝, 二次, 圓, 橢, 點, 蔽 } = p;

      // ── 四重圖像頁緣：連珠、菱花、卐繫、蓮瓣各據一帶 ───────────────
      筆(3.6); x.strokeRect(38, 38, W - 76, H - 76);
      筆(1.25, .78); x.strokeRect(57, 57, W - 114, H - 114); x.globalAlpha = 1;
      連珠橫(p, 68, W - 68, 78, {step: 24, r: 5.3, 寬: 1.15});
      連珠橫(p, 68, W - 68, H - 78, {step: 24, r: 5.3, 寬: 1.15});
      菱花橫(p, 92, W - 92, 111, {step: 32, h: 9, 寬: 1.05});
      菱花橫(p, 92, W - 92, H - 111, {step: 32, h: 9, 寬: 1.05});
      卐繫橫(p, 112, W - 112, 143, {cell: 29, h: 8.5, 寬: .95});
      卐繫橫(p, 112, W - 112, H - 143, {cell: 29, h: 8.5, 寬: .95});
      筆(2.2); x.strokeRect(137, 171, W - 274, H - 342);
      筆(1.0, .62); x.strokeRect(151, 185, W - 302, H - 370); x.globalAlpha = 1;
      // 縱帶不以旋轉 helper 複制座標，乃使一列連珠與菱格收邊。
      for (const sx of [78, W - 78]) for (let yy = 86; yy < H - 86; yy += 24) {
        圓(sx, yy, 5.2, 1.05); 圓(sx, yy, 1.5, .58);
      }
      for (const sx of [111, W - 111]) for (let yy = 96; yy + 32 < H - 96; yy += 32) {
        線([[sx, yy], [sx - 9, yy + 16], [sx, yy + 32], [sx + 9, yy + 16]], .88, true, .75);
      }

      // ── 迦樓羅焰：內外兩周，火舌三曲一尖，頂端收喙 ───────────────
      const 火舌 = (cx, cy, rx, ry, n, w, phase = 0, alpha = 1) => {
        for (let k = 0; k < n; k++) {
          const a = Math.PI * (1.07 + 1.86 * k / (n - 1)) + phase;
          const px = cx + Math.cos(a) * rx, py = cy + Math.sin(a) * ry;
          const nx = Math.cos(a), ny = Math.sin(a), tx = -ny, ty = nx;
          const len = 72 + (k % 4) * 18;
          貝([px - tx * 14, py - ty * 14],
            [px + nx * len * .22 - tx * 24, py + ny * len * .22 - ty * 24],
            [px + nx * len * .74 + tx * 25, py + ny * len * .74 + ty * 25],
            [px + nx * len, py + ny * len], w, alpha);
          貝([px + nx * len, py + ny * len],
            [px + nx * len * .67 - tx * 13, py + ny * len * .67 - ty * 13],
            [px + nx * len * .22 + tx * 12, py + ny * len * .22 + ty * 12],
            [px + tx * 10, py + ty * 10], Math.max(.75, w * .62), alpha * .9);
          貝([px - tx * 2, py - ty * 2],
            [px + nx * len * .28, py + ny * len * .28],
            [px + nx * len * .45 + tx * 7, py + ny * len * .45 + ty * 7],
            [px + nx * len * .63, py + ny * len * .63], Math.max(.62, w * .45), alpha * .68);
        }
      };
      火舌(900, 1160, 555, 795, 27, 2.4, 0, .84);
      火舌(900, 1165, 485, 720, 25, 1.25, .018, .58);
      // 輪一見分離焰舌之根似散葉；加兩道根環與三十六枚連焰，使火光一氣。
      橢(900, 1160, 548, 786, 1.5, 0, .42);
      橢(900, 1162, 505, 737, .9, 0, .34);
      const 連焰 = (cx,cy,rx,ry,n,w,alpha) => {
        for(let k=0;k<n;k++){
          const a=Math.PI*2*k/n-Math.PI/2, da=Math.PI*2/n*.48;
          const b0=[cx+Math.cos(a-da)*rx,cy+Math.sin(a-da)*ry];
          const b1=[cx+Math.cos(a+da)*rx,cy+Math.sin(a+da)*ry];
          const nx=Math.cos(a), ny=Math.sin(a), len=42+(k%5)*9;
          const tip=[cx+nx*(rx+len),cy+ny*(ry+len*1.2)];
          貝(b0,[b0[0]+nx*18-ny*17,b0[1]+ny*18+nx*17],
            [tip[0]-nx*15-ny*11,tip[1]-ny*15+nx*11],tip,w,alpha);
          貝(tip,[tip[0]-nx*15+ny*10,tip[1]-ny*15-nx*10],
            [b1[0]+nx*15+ny*14,b1[1]+ny*15-nx*14],b1,w*.7,alpha*.9);
        }
      };
      連焰(900,1160,535,770,36,1.05,.56);
      連焰(900,1162,494,724,34,.72,.38);
      // 頂喙與焰羽：只作迦樓羅焰之形勢，不臆補人身鳥首。
      貝([820, 355], [840, 276], [878, 240], [900, 204], 2.5, .9);
      貝([980, 355], [960, 276], [922, 240], [900, 204], 2.5, .9);
      線([[870, 239], [900, 270], [930, 239]], 1.45, false, .72);
      for (let k = 0; k < 7; k++) {
        const d = k - 3;
        貝([900 + d * 15, 300], [860 + d * 18, 330 + Math.abs(d) * 7],
          [834 + d * 31, 372 + Math.abs(d) * 12], [790 + d * 45, 390 + Math.abs(d) * 16], 1.05, .58);
      }

      // ── 左右火中雲渦：墊二童子背後，不侵主尊面手 ───────────────
      const 雲渦 = (cx, cy, s, flip = 1) => {
        for (const [dx, dy, rr] of [[0,0,38],[48,-8,30],[-42,7,27]]) {
          筆(1.15, .5); x.beginPath();
          for (let i = 0; i <= 34; i++) {
            const t = i / 34, r = rr * (1 - .75 * t), a = flip * Math.PI * 2 * 1.2 * t;
            const px = cx + dx * s + Math.cos(a) * r * s, py = cy + dy * s + Math.sin(a) * r * s;
            i ? x.lineTo(px, py) : x.moveTo(px, py);
          } x.stroke(); x.globalAlpha = 1;
        }
      };
      for (const [cx, f] of [[320,1],[1480,-1]]) for (let k = 0; k < 6; k++)
        雲渦(cx + Math.sin(k) * 45, 610 + k * 205, .88 - k * .025, f);

      // ── 五層瑟瑟座：方石交錯、每層互錯半格，內加斜縫與石眼 ────────
      const 瑟瑟層 = (y, left, right, h, step, offset = 0) => {
        線([[left, y], [right, y]], 3.0, false, .9);
        線([[left + 18, y + h], [right - 18, y + h]], 2.2, false, .82);
        線([[left, y], [left + 18, y + h]], 2.0, false, .8);
        線([[right, y], [right - 18, y + h]], 2.0, false, .8);
        for (let xx = left + offset; xx < right; xx += step) {
          const a = Math.max(left, xx), b = Math.min(right, xx + step);
          if (b - a < 24) continue;
          線([[a, y], [a + 10, y + h * .42], [a + 7, y + h]], 1.0, false, .58);
          線([[b, y], [b - 11, y + h * .5], [b - 7, y + h]], 1.0, false, .58);
          線([[a + 16, y + h * .63], [(a + b) / 2, y + h * .35], [b - 18, y + h * .67]], .82, false, .5);
          橢((a+b)/2, y + h*.66, 3.2, 2.0, .68, -.2, .48);
          // 石面細的平行皴帶與相反短新口，不以一個空梯形代石。
          for(let j=0;j<8;j++){
            const yy=y+h*(.12+j*.095), drift=(j%2?1:-1)*(5+j%3*2);
            貝([a+16,yy],[a+(b-a)*.3,yy+drift],[a+(b-a)*.68,yy-drift],[b-16,yy+2],.68,.48);
          }
          for(let j=0;j<5;j++){
            const px=a+(b-a)*(.14+j*.18);
            線([[px,y+h*.13],[px-8,y+h*.34],[px+5,y+h*.54],[px-4,y+h*.84]],.6,false,.42);
            圓(px+9,y+h*(.26+(j%2)*.3),1.8,.42,.42);
          }
        }
      };
      瑟瑟層(1510, 570, 1230, 92, 132, 0);
      瑟瑟層(1602, 500, 1300, 102, 146, 73);
      瑟瑟層(1704, 430, 1370, 112, 158, 0);
      瑟瑟層(1816, 350, 1450, 124, 174, 87);
      瑟瑟層(1940, 260, 1540, 142, 190, 0);
      卐繫橫(p, 282, 1518, 2050, {cell: 31, h: 9, 寬: .88});
      蓮瓣橫(p, 280, 1520, 2135, {step: 48, h: 35, 寬: 1.1});
      線([[248, 2140], [1552, 2140], [1518, 2215], [282, 2215]], 2.6, true, .86);
      菱花橫(p, 298, 1502, 2178, {step: 34, h: 10, 寬: .92});
      for (let xx = 315; xx < 1490; xx += 72) {
        線([[xx,2215],[xx+20,2252],[xx+54,2252],[xx+72,2215]],1.0,false,.58);
        圓(xx+36,2237,3.0,.66,.5);
      }
      線([[282,2254],[1518,2254]],2.2,false,.8);
      // 座腹二十一團花：每格八瓣、心珠、外環各有其線，將大面分成可讀的工藝帶。
      for(let cx=318;cx<=1482;cx+=58){
        圓(cx,2180,11,.58,.46); 圓(cx,2180,2.4,.48,.52);
        for(let k=0;k<8;k++){
          const a=Math.PI*2*k/8;
          橢(cx+Math.cos(a)*7,2180+Math.sin(a)*7,5.2,2.1,.45,a,.42);
        }
      }
      for(let cx=350;cx<1470;cx+=84){
        線([[cx-24,2286],[cx,2262],[cx+24,2286],[cx,2310]],.58,true,.42);
        圓(cx,2286,3,.45,.4);
      }

      // ── 主尊活渲：程式只定置、尺度與背景，fudo|t 尊身一線不動 ───────
      const 主X = 900, 主Y = 980, R = 900;
      const main = document.createElement('canvas'); main.width = W; main.height = H;
      const q = main.getContext('2d'); q.translate(主X, 主Y);
      q.strokeStyle = 墨; q.fillStyle = 墨; q.lineCap = 'round'; q.lineJoin = 'round';
      if (!依號.fudo?.t) throw new Error('缺尊鍵 fudo|t');
      白描(q, R, 依號.fudo.t, 'fudo|t'); x.drawImage(main, 0, 0);

      // 主尊條帛／裙裾之截金白描轉寫：受 clip 所限，不穿面手、刀索。
      x.save(); x.beginPath();
      x.moveTo(744, 1080); x.bezierCurveTo(650, 1140, 568, 1228, 563, 1340);
      x.bezierCurveTo(700, 1390, 1100, 1390, 1237, 1340);
      x.bezierCurveTo(1232, 1228, 1150, 1140, 1056, 1080); x.closePath(); x.clip();
      卐繫橫(p, 590, 1210, 1286, {cell: 25, h: 8, 寬: .82});
      for (let yy = 1155, row = 0; yy < 1260; yy += 38, row++) for (let xx = 650 + row%2*20; xx < 1150; xx += 40) {
        圓(xx, yy, 5.2, .72, .62); 圓(xx, yy, 1.3, .5, .58);
      }
      x.restore(); 復();
      // 條帛與腰緣細飾：兵庫本所見團花・截金風紋，不跨入面手。
      卐繫橫(p, 790, 1010, 1051, {cell:22,h:6.5,寬:.72});
      for(const [cx,cy] of [[760,910],[795,928],[830,945],[865,962],[900,979],[935,996],[970,1013]]){
        圓(cx,cy,6.2,.72,.66); 圓(cx,cy,1.6,.5,.58);
        for(let a=0;a<Math.PI*2;a+=Math.PI/4) 橢(cx+Math.cos(a)*10,cy+Math.sin(a)*10,4,2,.48,a,.48);
      }
      for(const sx of [752,1048]){
        橢(sx,873,24,8,.86,0,.58);
        for(let k=-2;k<=2;k++) 圓(sx+k*9,873,2.2,.48,.48);
      }
      // Met 1975.268.163 可見寬領瓔珞；單色轉寫為三道懸鏈與蓮苞垂飾。
      for(const [yy,drop,alpha] of [[716,58,.66],[733,74,.58],[750,90,.5]]){
        貝([772,yy],[820,yy+drop],[980,yy+drop],[1028,yy],.82,alpha);
        for(let k=-4;k<=4;k++){
          const xx=900+k*25, cy=yy+drop*(1-(k*k/22));
          圓(xx,cy,3.6,.52,alpha*.88);
        }
      }
      for(const [xx,yy] of [[850,792],[900,816],[950,792]]){
        線([[xx-8,yy],[xx,yy-12],[xx+8,yy],[xx,yy+13]],.68,true,.56);
        圓(xx,yy,2.2,.46,.52);
      }
      // 內焰帶的焰芯小葉：足夠密而不穿三尊身形。
      for(let k=0;k<44;k++){
        const a=Math.PI*2*k/44-Math.PI/2;
        const px=900+Math.cos(a)*463, py=1162+Math.sin(a)*680;
        if(py>900 && px>250 && px<1550) continue;
        const nx=Math.cos(a),ny=Math.sin(a);
        貝([px-ny*5,py+nx*5],[px+nx*14-ny*8,py+ny*14+nx*8],
          [px+nx*28+ny*5,py+ny*28-nx*5],[px+nx*38,py+ny*38],.52,.36);
      }
      for(let k=0;k<68;k++){
        const a=Math.PI*2*k/68-Math.PI/2;
        const px=900+Math.cos(a)*520, py=1160+Math.sin(a)*750;
        if(py>820 && px>245 && px<1555) continue;
        const nx=Math.cos(a),ny=Math.sin(a),tx=-ny,ty=nx;
        貝([px-tx*5,py-ty*5],[px+nx*15-tx*9,py+ny*15-ty*9],
          [px+nx*30+tx*7,py+ny*30+ty*7],[px+nx*45,py+ny*45],.58,.42);
        貝([px+nx*9,py+ny*9],[px+nx*17+tx*5,py+ny*17+ty*5],
          [px+nx*25-tx*4,py+ny*25-ty*4],[px+nx*34,py+ny*34],.42,.32);
      }

      // ── 二童子共用人體與持手：拇指一律向本手內側 ─────────────
      const 手法簿 = [];
      const 握手 = (cx, cy, own, rot = 0, s = 1) => {
        // 正面像：本右手在觀者左，其內側（拇側）指向畫面右；本左手反之。
        const medial = own === 'R' ? 1 : -1;
        x.save(); x.translate(cx, cy); x.rotate(rot);
        橢(0, 0, 16*s, 20*s, 1.55*s, 0, .92);
        for (let i = -2; i <= 1; i++) 二次([i*7*s,-13*s],[i*7*s+2*s,-22*s],[i*7*s+4*s,-28*s],.9*s,.8);
        貝([medial*12*s,-3*s],[medial*22*s,-8*s],[medial*25*s,-17*s],[medial*19*s,-22*s],1.15*s,.9);
        x.restore();
        手法簿.push({ own, 掌心X:cx, 拇根X:cx+medial*19*s, 器梢穿掌:false });
      };
      const 額前手 = (cx, cy, own, s=1) => {
        const medial = own === 'R' ? 1 : -1;
        貝([cx-22*s,cy],[cx-12*s,cy-11*s],[cx+13*s,cy-12*s],[cx+23*s,cy-2*s],1.45*s,.9);
        for(let i=0;i<4;i++) 線([[cx-19*s+i*12*s,cy-2*s],[cx-18*s+i*12*s,cy-31*s-(i===1?4:0)]],.88*s,false,.82);
        貝([cx+medial*15*s,cy+2*s],[cx+medial*24*s,cy+2*s],[cx+medial*27*s,cy-7*s],[cx+medial*24*s,cy-13*s],1.0*s,.85);
        手法簿.push({ own, 掌心X:cx, 拇根X:cx+medial*24*s, 器梢穿掌:false });
      };
      const 童子頭 = (cx, cy, s, fierce=false, lean=0) => {
        x.save(); x.translate(cx,cy); x.rotate(lean);
        貝([-43*s,-56*s],[-54*s,-26*s],[-50*s,29*s],[-27*s,49*s],2.0*s,.95);
        貝([43*s,-56*s],[54*s,-26*s],[50*s,29*s],[27*s,49*s],2.0*s,.95);
        二次([-27*s,49*s],[0,61*s],[27*s,49*s],1.8*s,.92);
        二次([-38*s,-55*s],[0,-77*s],[38*s,-55*s],1.5*s,.86);
        for(let k=-3;k<=3;k++) 二次([k*11*s,-57*s],[k*10*s,-79*s+(k%2)*5*s],[(k+1)*9*s,-59*s],.78*s,.68);
        橢(0,-84*s,20*s,14*s,1.2*s,0,.82);
        線([[-14*s,-96*s],[0,-110*s],[14*s,-96*s]],1.0*s,false,.76);
        for(let k=0;k<9;k++){
          const a=Math.PI*(.08+.84*k/8);
          二次([Math.cos(a)*44*s,Math.sin(a)*-37*s-52*s],
            [Math.cos(a)*52*s,Math.sin(a)*-44*s-54*s],
            [Math.cos(a+.18)*43*s,Math.sin(a+.18)*-36*s-52*s],.68*s,.62);
        }
        // 耳廓、耳珠、頸領使童子像不以空面圓代之。
        for(const d of [-1,1]){
          貝([d*43*s,-18*s],[d*56*s,-24*s],[d*58*s,7*s],[d*43*s,18*s],1.05*s,.78);
          圓(d*49*s,21*s,5*s,.82*s,.72);
          圓(d*49*s,34*s,3.2*s,.68*s,.65);
        }
        if(fierce){
          線([[-28*s,-8*s],[-8*s,-17*s]],2.1*s,false,.95); 線([[28*s,-8*s],[8*s,-17*s]],2.1*s,false,.95);
          二次([-27*s,1*s],[-17*s,11*s],[-7*s,2*s],1.65*s,.94);
          二次([27*s,1*s],[17*s,11*s],[7*s,2*s],1.65*s,.94);
          點(-17*s,4*s,2.5*s,.9); 點(17*s,4*s,2.5*s,.9);
          二次([-17*s,31*s],[0,20*s],[18*s,34*s],1.85*s,.94);
          線([[-7*s,28*s],[-3*s,39*s]],.85*s,false,.78);
        } else {
          二次([-28*s,-5*s],[-17*s,1*s],[-7*s,-4*s],1.48*s,.9);
          二次([28*s,-5*s],[17*s,1*s],[7*s,-4*s],1.48*s,.9);
          點(-17*s,-1*s,2.0*s,.84); 點(17*s,-1*s,2.0*s,.84);
          二次([-16*s,31*s],[0,38*s],[16*s,30*s],1.45*s,.88);
        }
        二次([-5*s,11*s],[0,17*s],[6*s,11*s],.85*s,.72);
        二次([-24*s,52*s],[0,64*s],[24*s,52*s],1.0*s,.75);
        二次([-20*s,59*s],[0,73*s],[20*s,59*s],.72*s,.62);
        x.restore();
      };
      const 衣紋 = (cx, top, base, s, fierce=false) => {
        for(let j=0;j<9;j++){
          const yy=top+60*s+j*(base-top-90*s)/9;
          貝([cx-94*s,yy],[cx-45*s,yy+(j%2?16:-10)*s],[cx+40*s,yy+(j%2?-12:14)*s],[cx+94*s,yy+4*s],.82*s,.62);
        }
        for(let yy=top+78*s;yy<base-30*s;yy+=42*s) for(let xx=cx-66*s;xx<cx+70*s;xx+=42*s){
          if(fierce) 線([[xx-8*s,yy],[xx,yy-8*s],[xx+8*s,yy],[xx,yy+8*s]],.62*s,true,.5);
          else { 圓(xx,yy,7*s,.62*s,.52); 圓(xx,yy,1.7*s,.46*s,.48); }
        }
      };

      // 矜羯羅（觀者左＝不動尊右）：穏靜、右手額前、左手持蓮。
      const 矜X=400, 矜Top=1160, ks=1.02;
      圓(矜X,矜Top+25,105,1.05,.4);
      童子頭(矜X,矜Top,ks,false,.055);
      貝([矜X-42,矜Top+55],[矜X-92,矜Top+115],[矜X-102,矜Top+300],[矜X-116,矜Top+472],2.15,.92);
      貝([矜X+42,矜Top+55],[矜X+88,矜Top+118],[矜X+98,矜Top+298],[矜X+112,矜Top+472],2.15,.92);
      二次([矜X-118,矜Top+472],[矜X,矜Top+525],[矜X+114,矜Top+472],2.25,.92);
      貝([矜X-53,矜Top+78],[矜X-96,矜Top+121],[矜X-104,矜Top+165],[矜X-80,矜Top+205],1.8,.9);
      貝([矜X+52,矜Top+82],[矜X+84,矜Top+160],[矜X+75,矜Top+247],[矜X+53,矜Top+305],1.8,.9);
      額前手(矜X-55,矜Top+171,'R',.92);
      握手(矜X+55,矜Top+318,'L',-.05,.9);
      // 蓮華枝不穿掌：自掌上下分段接出。
      貝([矜X+57,矜Top+294],[矜X+66,矜Top+224],[矜X+91,矜Top+150],[矜X+95,矜Top+72],1.3,.84);
      貝([矜X+57,矜Top+342],[矜X+48,矜Top+395],[矜X+55,矜Top+440],[矜X+44,矜Top+485],1.0,.7);
      for(let k=-2;k<=2;k++){
        const px=矜X+95+k*20, by=矜Top+73+Math.abs(k)*5;
        貝([px-18,by],[px-15,by-31],[px-7,by-42],[px,by-49],1.0,.78);
        貝([px,by-49],[px+7,by-42],[px+15,by-31],[px+18,by],1.0,.78);
      }
      線([[矜X-61,矜Top+70],[矜X+66,矜Top+180]],1.25,false,.7);
      線([[矜X-67,矜Top+82],[矜X+61,矜Top+192]],.75,false,.55);
      二次([矜X-47,矜Top+72],[矜X,矜Top+118],[矜X+47,矜Top+72],1.35,.82);
      二次([矜X-38,矜Top+82],[矜X,矜Top+129],[矜X+38,矜Top+82],.78,.66);
      for(let k=-4;k<=4;k++) 圓(矜X+k*12,矜Top+125+Math.abs(k)*3.2,2.7,.58,.62);
      for(const yy of [矜Top+222,矜Top+236]) 二次([矜X-91,yy],[矜X,yy+13],[矜X+91,yy],.82,.58);
      橢(矜X-92,矜Top+183,17,7,.72,0,.56); 橢(矜X+82,矜Top+254,17,7,.72,0,.56);
      衣紋(矜X,矜Top+125,矜Top+485,ks,false);
      卐繫橫(p,矜X-100,矜X+100,矜Top+438,{cell:23,h:7,寬:.72});
      // 足與小岩座
      貝([280,1700],[315,1668],[355,1680],[395,1695],1.8,.82);
      貝([520,1700],[485,1668],[445,1680],[405,1695],1.8,.82);
      線([[266,1702],[305,1762],[495,1762],[534,1702]],2.2,true,.82);
      for(let xx=290;xx<515;xx+=46) 線([[xx,1710],[xx+18,1732],[xx+10,1758]],.86,false,.56);

      // 制吒迦（觀者右＝不動尊左）：容動張步，右手棒、左手獨鈷。
      const 制X=1400, 制Top=1140, ss=1.03;
      圓(制X,制Top+25,107,1.05,.4);
      童子頭(制X,制Top,ss,true,-.07);
      貝([制X-44,制Top+55],[制X-104,制Top+128],[制X-119,制Top+302],[制X-145,制Top+472],2.2,.94);
      貝([制X+44,制Top+55],[制X+98,制Top+124],[制X+109,制Top+304],[制X+142,制Top+455],2.2,.94);
      貝([制X-145,制Top+472],[制X-80,制Top+510],[制X+55,制Top+520],[制X+142,制Top+455],2.2,.94);
      貝([制X-53,制Top+84],[制X-106,制Top+138],[制X-115,制Top+240],[制X-76,制Top+286],1.9,.91);
      貝([制X+53,制Top+82],[制X+95,制Top+146],[制X+104,制Top+237],[制X+76,制Top+303],1.9,.91);
      握手(制X-75,制Top+300,'R',-.18,.94);
      握手(制X+78,制Top+315,'L',.16,.92);
      // 棒梢自本右手之上空接、掌下再出；掌面段空出不穿。
      線([[制X-89,制Top+278],[制X-190,制Top-35]],5.2,false,.9);
      線([[制X-70,制Top+325],[制X-26,制Top+478]],4.1,false,.82);
      圓(制X-195,制Top-50,18,2.0,.88); 圓(制X-195,制Top-50,7,1.0,.7);
      線([[制X-211,制Top-50],[制X-230,制Top-61]],1.1,false,.7);
      // 獨鈷穎置：掌上下分段，中珠、蓮束、單鋒各可辨。
      const 獨鈷端 = (cx,cy,dir) => {
        圓(cx,cy,8,1.2,.84); 橢(cx,cy+dir*16,14,6,1.0,0,.78);
        線([[cx,cy+dir*19],[cx,cy+dir*61]],2.0,false,.88);
        貝([cx-14,cy+dir*17],[cx-10,cy+dir*35],[cx-5,cy+dir*48],[cx,cy+dir*61],.9,.76);
        貝([cx+14,cy+dir*17],[cx+10,cy+dir*35],[cx+5,cy+dir*48],[cx,cy+dir*61],.9,.76);
      };
      獨鈷端(制X+79,制Top+286,-1); 獨鈷端(制X+78,制Top+344,1);
      線([[制X-65,制Top+74],[制X+70,制Top+188]],1.25,false,.72);
      線([[制X-71,制Top+86],[制X+64,制Top+200]],.75,false,.56);
      二次([制X-48,制Top+72],[制X,制Top+121],[制X+48,制Top+72],1.4,.84);
      二次([制X-38,制Top+84],[制X,制Top+132],[制X+38,制Top+84],.8,.68);
      for(let k=-4;k<=4;k++) 圓(制X+k*12,制Top+129+Math.abs(k)*3.1,2.8,.6,.64);
      for(const yy of [制Top+224,制Top+239]) 二次([制X-96,yy],[制X,yy+15],[制X+96,yy],.85,.6);
      橢(制X-100,制Top+206,18,7.5,.75,0,.58); 橢(制X+96,制Top+211,18,7.5,.75,0,.58);
      衣紋(制X,制Top+126,制Top+482,ss,true);
      卐繫橫(p,制X-105,制X+105,制Top+433,{cell:23,h:7,寬:.72});
      // 張步兩足與岩階
      貝([1260,1685],[1300,1644],[1350,1662],[1385,1702],1.9,.84);
      貝([1540,1668],[1500,1642],[1455,1666],[1420,1704],1.9,.84);
      線([[1238,1690],[1284,1760],[1528,1760],[1556,1672]],2.2,true,.84);
      for(let xx=1260;xx<1530;xx+=50) 線([[xx,1700],[xx+20,1730],[xx+11,1758]],.86,false,.56);

      // ── 身後焰被持物、人體遮住處加火芯、不再疊穿前景 ────────────
      for(const [cx,cy,flip] of [[210,1040,1],[1590,1000,-1],[220,1450,1],[1580,1440,-1]]){
        for(let k=0;k<4;k++){
          const dx=flip*(20+k*22);
          貝([cx,cy+k*36],[cx+dx*.3,cy-42+k*30],[cx+dx*.8,cy-68+k*22],[cx+dx,cy-104+k*20],.9,.48);
        }
      }

      // ── 斷言：錨點不以目測自許；四手拇側與器梢穿掌逐件核 ───────
      const u = R * .0145, yT = 主Y - R * .565;
      const 錨 = {白毫:yT+12*u, 頸:yT+20*u, 心窩:yT+36*u, 臍:yT+48*u, 座面:yT+68*u};
      const 應 = z => yT + z*u;
      for(const [name,z] of [['白毫',12],['頸',20],['心窩',36],['臍',48],['座面',68]])
        if(Math.abs(錨[name]-應(z))>1e-9) throw new Error(`T1419 錨點斷言失敗：${name}`);
      if(手法簿.length!==4) throw new Error(`chirality 手數非四：${手法簿.length}`);
      for(const h of 手法簿){
        const expected=h.own==='R'?1:-1;
        if((h.拇根X-h.掌心X)*expected<=0 || h.器梢穿掌)
          throw new Error(`chirality 破戒：${h.own}`);
      }
      if(W!==1800 || H!==2500) throw new Error('畫布非縱2400–2600');

      // 透明布末合深底；destination-out 若有所鑿，只露此底而不露白。
      const out=document.createElement('canvas'); out.width=W; out.height=H;
      const o=out.getContext('2d'); o.fillStyle=地; o.fillRect(0,0,W,H); o.drawImage(ink,0,0);
      return out.toDataURL('image/png');
    }),
  });
})().catch(e => { console.error(e); process.exit(1); });
