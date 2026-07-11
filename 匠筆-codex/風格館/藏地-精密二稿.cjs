// 風格館・藏地室首展精密二稿 —— 釋迦說法唐卡背屏式一幀
//
// 參攷目驗（2026-07-12；chrome-headless-shell 逐張開本地原圖截屏）：
// 1. Cleveland 1970.156 綠度母：中央六拏具背屏幾乎撐滿全幅，四旁林木花果層疊；
//    拱、柱、獸座、蓮瓣與須彌台帶帶另紋，頂出三塔，證密度源於結構與交疊。
// 2. Cleveland 1973.69 寶飾說法佛：上欄九尊各居火焰龕，四邊敘事小格包圍中堂；
//    說法大尊與聞法眾尺度懸殊而肩肘交疊，座毯衣地皆滿花紋，幀內無閒白。
// 3. Cleveland 1989.104 大日金剛薩埵：中尊獨大，上列坐尊分居頭光，四脅侍貼身；
//    下欄七小尊列龕，巨蓮座上下兩層異向卷瓣，最宜取其上、中、下三界級次。
// 4. Cleveland 1993.4 無我母曼荼羅：頂底各十四龕成行，側緣圓龕相續；中央方城外
//    多重蓮環、卷草環、尸林環逐圈異紋，角隙亦鋪小花，示「一帶一紋」之尺度。
// 5. Met 1987.16 智慧空行母曼荼羅：上欄傳承坐像與下欄護法供養相對鎖邊；輪外
//    火焰、蓮瓣、卷草、敘事諸環密接，主輪雖繁而中心仍以尺度和素地最醒。
// 6. Met 1991.74 不空成就佛：中尊前出、八菩薩分兩翼擠列，背屏作橫彩帶層層上拱；
//    座下另列六小龕與供具，雙層蓮座及脅侍把下半封實，正補首稿下三分之空。
//
// headless 自校記：
// - 輪一／骨架：`/tmp/fenben-tibet-round1.png` 全幅縮覽，六龕、主屏、垂帳、
//   護法供養、蓮池三界俱成，下三分已封；惟四護法小而浮，遂放大、補怒相衣紋，
//   並加左右分龕檐座，使下列不靠散像自稱為列。
// - 輪二／局部：`/tmp/fenben-tibet-round2-top.png`、`-middle.png`、`-lower2.png`
//   放大驗之：內素、連珠內點、卷草渦葉、外焰皆可逐帶循；垂帳格花止於蓮臺下，
//   七碗、雙瓶與蓮池無相壓。所見屏頂左右取樣同落一點成結，遂刪一側頂紋；護法
//   口相亦由緩弧改怒勢。另裁屏內暗紋、校正左右火舌外向，免紋越屏與一側焰內翻。
// - 輪三／參攷並排：`/tmp/fenben-tibet-round3-final-compare.png` 以候選、六參攷及
//   主坊首稿八格等高並觀。候選已同 1989.104／1991.74 得中尊獨大與上下列鎖邊，
//   同兩曼荼羅得環環異紋，同 1970.156 得背屏外花樹滿地；白描不借色域，故密度以
//   線階與交疊轉譯，不摹獸柱或敘事格。並排仍見兩側雲地偏淡、雙鹿與帳底相疊，
//   末補寶相花地和交疊雲帶，法輪鹿苑下移至護法列中央；重照確認中景不再成空紙、
//   雙鹿八輻縮覽可辨，而尊身素地與粗線仍為全幀最醒。較首稿，上空與下空皆已除。
//
// 戒：中尊只由 dist/yigui.js 依號['shaka'].h + dist/baimiao.js 的 shaka|h
// 活渲，尊身一線不改。上欄六像亦只用庫中 center/east/south/shaka/west/north
// 專筆；其餘背屏、景物、座毯、護法與供養皆另層加於尊外。

const { 合幀 } = require('../../tools/lib/幀具.cjs');

(async () => {
  await 合幀({
    出: '圖錄/風格館/藏地-精密二稿.png',
    幀: page => page.evaluate(async () => {
      const { 依號 } = await import('/dist/yigui.js');
      const { 白描 } = await import('/dist/baimiao.js');
      const { 執筆 } = await import('/dist/bi.js');
      const { 雙鹿法輪, 供水碗列 } = await import('/dist/bujian/jingwu.js');

      const W = 2000, H = 2600;
      const 墨 = '#d8b36a', 硃 = '#b0402c', 灰 = '#6b7186', 地 = '#0d1124';
      const ink = document.createElement('canvas');
      ink.width = W; ink.height = H;
      const x = ink.getContext('2d');
      x.strokeStyle = 墨; x.fillStyle = 墨;
      x.lineCap = 'round'; x.lineJoin = 'round';

      const 筆 = (w = 2, a = 1) => {
        x.lineWidth = w; x.strokeStyle = 墨; x.fillStyle = 墨; x.globalAlpha = a;
      };
      const 線 = (pts, w = 2, close = false, a = 1) => {
        筆(w, a); x.beginPath(); x.moveTo(pts[0][0], pts[0][1]);
        for (let i = 1; i < pts.length; i++) x.lineTo(pts[i][0], pts[i][1]);
        if (close) x.closePath(); x.stroke(); x.globalAlpha = 1;
      };
      const 圓 = (cx, cy, r, w = 2, a = 1) => {
        筆(w, a); x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.stroke(); x.globalAlpha = 1;
      };
      const 橢 = (cx, cy, rx, ry, w = 2, rot = 0, a = 1) => {
        筆(w, a); x.beginPath(); x.ellipse(cx, cy, rx, ry, rot, 0, Math.PI * 2); x.stroke(); x.globalAlpha = 1;
      };
      const 貝 = (p0, c1, c2, p1, w = 2, a = 1) => {
        筆(w, a); x.beginPath(); x.moveTo(...p0); x.bezierCurveTo(...c1, ...c2, ...p1);
        x.stroke(); x.globalAlpha = 1;
      };
      const 二次 = (p0, c, p1, w = 2, a = 1) => {
        筆(w, a); x.beginPath(); x.moveTo(...p0); x.quadraticCurveTo(...c, ...p1);
        x.stroke(); x.globalAlpha = 1;
      };
      const 雙鏡 = fn => {
        fn(1); x.save(); x.translate(W, 0); x.scale(-1, 1); fn(-1); x.restore();
      };
      const 葉 = (cx, cy, len, wid, a, w = 1.35, alpha = 1) => {
        x.save(); x.translate(cx, cy); x.rotate(a); 筆(w, alpha);
        x.beginPath(); x.moveTo(0, 0);
        x.bezierCurveTo(len * .28, -wid, len * .78, -wid * .7, len, 0);
        x.bezierCurveTo(len * .76, wid * .68, len * .28, wid, 0, 0); x.stroke();
        x.beginPath(); x.moveTo(len * .08, 0); x.lineTo(len * .88, 0); x.stroke();
        x.restore(); x.globalAlpha = 1;
      };
      const 花 = (cx, cy, r, n = 8, w = 1.2, alpha = 1) => {
        圓(cx, cy, r * .19, w, alpha);
        for (let k = 0; k < n; k++) {
          const a = Math.PI * 2 * k / n;
          x.save(); x.translate(cx, cy); x.rotate(a); 筆(w, alpha);
          x.beginPath(); x.moveTo(r * .24, 0);
          x.bezierCurveTo(r * .48, -r * .2, r * .82, -r * .18, r, 0);
          x.bezierCurveTo(r * .8, r * .2, r * .48, r * .2, r * .24, 0); x.stroke();
          x.restore();
        }
        x.globalAlpha = 1;
      };
      const 螺 = (cx, cy, r, turns = 1.45, flip = 1, w = 1.25, alpha = 1) => {
        筆(w, alpha); x.beginPath();
        const n = 34;
        for (let k = 0; k <= n; k++) {
          const t = k / n, rr = r * (1 - .76 * t);
          const a = flip * turns * Math.PI * 2 * t;
          const px = cx + Math.cos(a) * rr, py = cy + Math.sin(a) * rr;
          if (k) x.lineTo(px, py); else x.moveTo(px, py);
        }
        x.stroke(); x.globalAlpha = 1;
      };

      // ── 外景：山石以層臺輪廓、短弧皴帶；樹葉逐片落脈 ────────────────────
      const 山群 = (cx, base, s = 1, flip = 1, alpha = .62) => {
        x.save(); x.translate(cx, base); x.scale(flip * s, s);
        const ridges = [
          [[-145, 0], [-118, -72], [-82, -94], [-54, -176], [-18, -132], [18, -236], [58, -158], [91, -196], [126, -82], [154, -38], [170, 0]],
          [[-152, -12], [-116, -48], [-70, -68], [-20, -104], [28, -78], [78, -110], [128, -54], [166, -22]],
          [[-156, -4], [-92, -25], [-42, -34], [18, -22], [72, -44], [132, -18], [170, -5]],
        ];
        for (let r = 0; r < ridges.length; r++) {
          const p = ridges[r]; 筆(2.15 - r * .35, alpha);
          x.beginPath(); x.moveTo(...p[0]);
          for (let i = 1; i < p.length; i++) {
            const [px, py] = p[i], [qx, qy] = p[i - 1];
            x.quadraticCurveTo((qx + px) / 2, Math.min(qy, py) - 9, px, py);
          }
          x.stroke();
        }
        for (const [px, py, len, rot] of [[-94,-52,56,-.25],[-54,-116,52,.1],[-10,-158,65,-.18],[34,-194,54,.2],[76,-117,57,-.1],[118,-56,43,.18]]) {
          x.save(); x.translate(px, py); x.rotate(rot); 筆(1.05, alpha * .86);
          for (let j = 0; j < 4; j++) {
            x.beginPath(); x.moveTo(-len / 2 + j * 5, j * 8);
            x.quadraticCurveTo(0, -8 + j * 8, len / 2 - j * 3, j * 8); x.stroke();
          }
          x.restore();
        }
        x.restore(); x.globalAlpha = 1;
      };
      const 雲 = (cx, cy, s = 1, flip = 1, alpha = .55) => {
        x.save(); x.translate(cx, cy); x.scale(flip * s, s); 筆(1.7, alpha);
        x.beginPath(); x.moveTo(-64, 9);
        x.bezierCurveTo(-80, -12, -56, -33, -34, -17);
        x.bezierCurveTo(-22, -48, 21, -50, 34, -17);
        x.bezierCurveTo(57, -34, 79, -8, 62, 12);
        x.bezierCurveTo(34, 22, -18, 22, -64, 9); x.stroke();
        螺(-48, -3, 13, 1.35, 1, 1.0, alpha);
        螺(48, -2, 12, 1.35, -1, 1.0, alpha);
        貝([58, 10], [96, 4], [126, 24], [167, 6], 1.1, alpha * .9);
        貝([54, 17], [91, 22], [119, 37], [148, 24], .9, alpha * .75);
        x.restore(); x.globalAlpha = 1;
      };
      const 樹 = (cx, base, h, spread, lean = 0, alpha = .58) => {
        貝([cx - 8, base], [cx - 22, base - h * .35], [cx + lean * h - 16, base - h * .72], [cx + lean * h, base - h], 2.0, alpha);
        貝([cx + 8, base], [cx - 4, base - h * .36], [cx + lean * h + 13, base - h * .7], [cx + lean * h + 9, base - h], 1.5, alpha);
        for (let k = 1; k < 8; k++) {
          const yy = base - h * (.25 + k * .075), xx = cx + lean * h * (.25 + k * .075);
          const d = k % 2 ? 1 : -1;
          貝([xx, yy], [xx + d * spread * .2, yy - 28], [xx + d * spread * .62, yy - 34], [xx + d * spread, yy - 76], 1.15, alpha);
          for (let j = 1; j <= 4; j++) {
            const px = xx + d * spread * j / 5, py = yy - 76 * j / 5 - Math.sin(j) * 6;
            葉(px, py, 38 - j * 2, 11, d > 0 ? -.58 : Math.PI + .58, 1.05, alpha);
            if ((j + k) % 3 === 0) 花(px + d * 18, py - 8, 8, 6, .85, alpha);
          }
        }
        const tx = cx + lean * h + 5, ty = base - h;
        for (let k = 0; k < 9; k++) {
          const a = -Math.PI * .92 + k * Math.PI * .23;
          葉(tx, ty, spread * .78, spread * .15, a, 1.05, alpha);
        }
        for (let k = 0; k < 5; k++) 圓(tx + (k - 2) * 12, ty + 18 + (k % 2) * 7, 5, .9, alpha);
      };

      // 中景先落；後以背屏負形清去侵屏之線。
      雙鏡(() => {
        山群(292, 1758, 1.18, 1, .64);
        山群(438, 1518, .9, -1, .52);
        山群(255, 1170, .72, 1, .43);
        樹(240, 1605, 590, 120, .035, .56);
        樹(430, 1450, 460, 105, -.04, .5);
        樹(310, 1055, 360, 92, .035, .45);
        雲(295, 666, .9, 1, .5);
        雲(365, 955, .72, -1, .4);
        雲(246, 1325, .62, 1, .37);
      });
      // 餘隙鋪寶相花地並添交疊雲帶：低於主景線階，卻不令中景成空紙。
      雙鏡(() => {
        for (let yy=590,row=0; yy<1660; yy+=74,row++) {
          for (let xx=196+(row%2)*39; xx<520; xx+=78) {
            花(xx,yy,7.2,6,.72,.3); 圓(xx,yy,12.2,.58,.22);
          }
        }
        雲(430,620,.66,-1,.58);
        雲(238,800,.76,1,.54);
        雲(455,1088,.58,-1,.5);
        雲(228,1450,.66,1,.49);
        for (let yy=720;yy<1580;yy+=164) {
          貝([176,yy],[260,yy-32],[382,yy+36],[520,yy-12],.86,.28);
          貝([190,yy+18],[292,yy-4],[410,yy+50],[505,yy+16],.68,.22);
        }
      });

      // ── 背屏曲線：兩側三次曲線於頂相合，座後以淺弧收底 ───────────────────
      const B = (p0, c1, c2, p3, t) => {
        const q = 1 - t;
        return [q*q*q*p0[0] + 3*q*q*t*c1[0] + 3*q*t*t*c2[0] + t*t*t*p3[0],
          q*q*q*p0[1] + 3*q*q*t*c1[1] + 3*q*t*t*c2[1] + t*t*t*p3[1]];
      };
      const Bd = (p0, c1, c2, p3, t) => {
        const q = 1 - t;
        return [3*q*q*(c1[0]-p0[0]) + 6*q*t*(c2[0]-c1[0]) + 3*t*t*(p3[0]-c2[0]),
          3*q*q*(c1[1]-p0[1]) + 6*q*t*(c2[1]-c1[1]) + 3*t*t*(p3[1]-c2[1])];
      };
      const archGeom = (half, top, base, side) => {
        const p0 = [1000 + side * half, base], p3 = [1000, top];
        const c1 = [1000 + side * half * 1.05, base - 520];
        const c2 = [1000 + side * half * .78, top + 126];
        return { p0, c1, c2, p3 };
      };
      const archPath = (half, top, base, w = 2, alpha = 1) => {
        const L = archGeom(half, top, base, -1), R = archGeom(half, top, base, 1);
        筆(w, alpha); x.beginPath(); x.moveTo(...L.p0);
        x.bezierCurveTo(...L.c1, ...L.c2, ...L.p3);
        x.bezierCurveTo(...R.c2, ...R.c1, ...R.p0);
        x.quadraticCurveTo(1000, base + 116, ...L.p0); x.stroke(); x.globalAlpha = 1;
      };
      const archFillPath = (half, top, base) => {
        const L = archGeom(half, top, base, -1), R = archGeom(half, top, base, 1);
        x.beginPath(); x.moveTo(...L.p0); x.bezierCurveTo(...L.c1, ...L.c2, ...L.p3);
        x.bezierCurveTo(...R.c2, ...R.c1, ...R.p0); x.quadraticCurveTo(1000, base + 116, ...L.p0); x.closePath();
      };
      const archSamples = (half, top, base, n, fn) => {
        for (const side of [-1, 1]) {
          const g = archGeom(half, top, base, side);
          // 左右曲線共一頂點：只許一側落頂紋，免火舌、卷渦重筆成結。
          const last = side < 0 ? n : n - 1;
          for (let k = 0; k <= last; k++) {
            const t = k / n, p = B(g.p0, g.c1, g.c2, g.p3, t), d = Bd(g.p0, g.c1, g.c2, g.p3, t);
            const dl = Math.hypot(...d) || 1, tx = d[0] / dl, ty = d[1] / dl;
            let nx = -ty, ny = tx;
            if ((side < 0 && nx > 0) || (side > 0 && nx < 0)) { nx *= -1; ny *= -1; }
            fn(p[0], p[1], tx, ty, nx, ny, side, k, n);
          }
        }
      };

      // 清出背屏素地，使山樹止於屏後；八大線稍後另覆，故梵線仍在。
      x.save(); x.globalCompositeOperation = 'destination-out'; x.fillStyle = '#000';
      archFillPath(525, 492, 1816); x.fill(); x.restore();
      x.strokeStyle = 墨; x.fillStyle = 墨;

      // 屏內暗紋只置尊身外圍；裁於背屏負形內，中心留息使庫尊最醒。
      x.save(); archFillPath(500, 516, 1790); x.clip();
      for (let yy = 710, row = 0; yy < 1640; yy += 58, row++) {
        for (let xx = 610 + (row % 2) * 30; xx <= 1390; xx += 60) {
          const ex = (xx - 1000) / 355, ey = (yy - 1170) / 510;
          if (ex * ex + ey * ey < 1) continue;
          花(xx, yy, 8.5, 6, .8, .22); 圓(xx, yy, 14, .7, .18);
        }
      }
      x.restore();

      // 內素環：兩道無紋界，先給尊身一圈清淨地。
      archPath(355, 640, 1698, 2.8, .84);
      archPath(376, 620, 1722, 1.3, .7);

      // 連珠環：雙界之間，每珠內復一點。
      archPath(404, 586, 1750, 1.35, .7); archPath(435, 560, 1776, 1.35, .7);
      archSamples(420, 574, 1762, 24, (px, py, tx, ty) => {
        圓(px, py, 6.4, 1.35, .78); 圓(px, py, 1.55, .72, .7);
      });
      for (let px = 604; px <= 1396; px += 28) { 圓(px, 1812, 5.6, 1.05, .68); 圓(px, 1812, 1.3, .65, .6); }

      // 卷草環：主莖雙界，渦卷交替，附尖桃葉。
      archPath(454, 538, 1799, 1.25, .72); archPath(480, 516, 1828, 1.25, .72);
      archSamples(467, 527, 1813, 19, (px, py, tx, ty, nx, ny, side, k) => {
        const angle = Math.atan2(ty, tx);
        x.save(); x.translate(px, py); x.rotate(angle); 筆(1.15, .82);
        x.beginPath(); x.moveTo(-17, 0); x.bezierCurveTo(-8, -12, 8, 12, 17, 0); x.stroke();
        螺(k % 2 ? 5 : -5, k % 2 ? -2 : 2, 8, 1.28, k % 2 ? 1 : -1, .92, .77);
        葉(k % 2 ? -2 : 2, 0, 13, 4.5, k % 2 ? -.75 : Math.PI + .75, .8, .68);
        x.restore();
      });
      筆(1.2, .72); x.beginPath(); x.moveTo(548, 1842);
      for (let px = 548; px < 1452; px += 72) {
        x.bezierCurveTo(px + 18, 1826, px + 36, 1858, px + 72, 1842);
      } x.stroke(); x.globalAlpha = 1;
      for (let px = 584, k = 0; px < 1435; px += 72, k++) 螺(px, 1842, 10, 1.35, k % 2 ? 1 : -1, .9, .62);

      // 火焰外緣：每舌沿曲線外翻，外凸主弧與內凹回勾相合。
      archPath(510, 490, 1850, 2.2, .78);
      archSamples(510, 490, 1850, 28, (px, py, tx, ty, nx, ny, side, k) => {
        x.save(); x.transform(tx, ty, nx, ny, px, py); 筆(1.45, .84);
        const dir = k % 2 ? 1 : -1;
        x.beginPath(); x.moveTo(-10, 0);
        x.bezierCurveTo(-2, 8, -3 + dir * 4, 20, dir * 4, 30);
        x.bezierCurveTo(14 + dir * 2, 15, 10, 7, 10, 0); x.stroke();
        x.beginPath(); x.moveTo(dir * 3, 24); x.quadraticCurveTo(-dir * 2, 15, dir * 5, 8); x.stroke();
        x.restore();
      });

      // 屏肩寶珠與四隅飛雲，把外火環接入中景。
      for (const d of [-1, 1]) {
        const jx = 1000 + d * 522, jy = 978;
        圓(jx, jy, 17, 1.7, .72); 圓(jx, jy, 6, 1.0, .68);
        二次([jx - 10, jy - 18], [jx, jy - 43], [jx + 10, jy - 18], 1.5, .72);
        雲(jx + d * 26, jy - 68, .46, d, .46);
      }

      // ── 座毯垂帳：滿菱格、小花、卷草、珠帶；只在庫尊蓮臺下方 ───────────
      const 幔Path = () => {
        x.beginPath(); x.moveTo(555, 1544); x.lineTo(1445, 1544); x.lineTo(1404, 1874);
        x.quadraticCurveTo(1280, 1844, 1172, 1894);
        x.quadraticCurveTo(1000, 1962, 828, 1894);
        x.quadraticCurveTo(720, 1844, 596, 1874); x.closePath();
      };
      筆(2.5, .84); 幔Path(); x.stroke();
      x.save(); 幔Path(); x.clip();
      // 斜格交織；每格中心落小四瓣花。
      for (let q = -900; q < 1200; q += 42) 線([[q,1515],[q+620,1965]], .82, false, .48);
      for (let q = 600; q < 2700; q += 42) 線([[q,1515],[q-620,1965]], .82, false, .48);
      for (let yy = 1600, row = 0; yy < 1900; yy += 58, row++) {
        for (let xx = 610 + (row % 2) * 34; xx < 1410; xx += 68) 花(xx, yy, 7, 4, .72, .5);
      }
      x.restore();
      線([[572,1582],[1428,1582]], 1.3, false, .74);
      for (let px = 592; px <= 1408; px += 24) 圓(px, 1563, 4.7, .9, .65);
      // 幔下卷草與流蘇。
      筆(1.25, .72); x.beginPath(); x.moveTo(620, 1848);
      for (let px = 620; px < 1380; px += 76) {
        x.bezierCurveTo(px + 22, 1818, px + 50, 1878, px + 76, 1848);
      } x.stroke();
      for (let px = 642, k = 0; px < 1380; px += 76, k++) {
        螺(px, 1848, 11, 1.35, k % 2 ? 1 : -1, .9, .65);
        線([[px,1862],[px+(k%2?5:-5),1892]], .9, false, .62);
        圓(px+(k%2?5:-5),1897,3.4,.8,.6);
      }

      // ── 上緣六傳承龕：先清龕面，再畫多重檐、蓮托、雲與庫像 ────────────
      const 上Ids = [['center','k'],['east','k'],['south','k'],['shaka','h'],['west','k'],['north','k']];
      const cellW = 264, cellTop = 166, cellBottom = 506;
      const centers = [302, 581, 860, 1140, 1419, 1698];
      const 龕形 = (cx, inset = 0) => {
        const hw = cellW / 2 - inset;
        x.beginPath(); x.moveTo(cx - hw, cellBottom - inset);
        x.lineTo(cx - hw, cellTop + 108 + inset);
        x.bezierCurveTo(cx - hw + 10, cellTop + 38 + inset, cx - 62, cellTop + 15 + inset, cx, cellTop + inset);
        x.bezierCurveTo(cx + 62, cellTop + 15 + inset, cx + hw - 10, cellTop + 38 + inset, cx + hw, cellTop + 108 + inset);
        x.lineTo(cx + hw, cellBottom - inset);
      };
      x.save(); x.globalCompositeOperation = 'destination-out'; x.fillStyle = '#000';
      for (const cx of centers) { 龕形(cx, 6); x.closePath(); x.fill(); }
      x.restore(); x.strokeStyle = 墨; x.fillStyle = 墨;
      線([[160,510],[1840,510]], 3.0, false, .9);
      線([[160,526],[1840,526]], 1.3, false, .72);
      for (let i = 0; i < centers.length; i++) {
        const cx = centers[i];
        筆(2.0, .88); 龕形(cx, 0); x.stroke();
        筆(1.05, .64); 龕形(cx, 13); x.stroke();
        筆(.85, .54); 龕形(cx, 23); x.stroke();
        // 頂焰三葉、左右垂珠與下檐連珠。
        for (const d of [-1, 0, 1]) {
          二次([cx + d * 28 - 9, cellTop + 25], [cx + d * 28, cellTop - 2 - Math.abs(d) * 5], [cx + d * 28 + 9, cellTop + 25], 1.0, .58);
        }
        for (const d of [-1, 1]) {
          線([[cx + d * 106, 258],[cx + d * 106, 462]], .8, false, .5);
          for (let yy = 278; yy < 454; yy += 29) 圓(cx + d * 106, yy, 3.4, .75, .54);
        }
        for (let px = cx - 112; px <= cx + 112; px += 22) { 圓(px, 486, 4.2, .8, .62); 圓(px,486,1.1,.55,.55); }
        // 雲托座下，左右尾與鄰龕相咬。
        雲(cx, 469, .43, i % 2 ? -1 : 1, .52);
        if (i < centers.length - 1) 線([[cx + cellW/2 + 7,190],[cx + cellW/2 + 7,512]], 1.2, false, .62);
      }
      // 上檐仰覆瓣帶。
      線([[158,146],[1842,146]], 1.8, false, .76); 線([[158,160],[1842,160]], 1.0, false, .62);
      for (let px = 170, k = 0; px < 1840; px += 30, k++) {
        二次([px-14,158],[px, k%2 ? 140 : 134],[px+14,158], .9, .58);
        二次([px-9,158],[px, k%2 ? 148 : 144],[px+9,158], .65, .48);
      }

      // ── 下界蓮池先落：水紋四重、荷葉花莖交疊，封滿下三分 ────────────────
      const 波列 = (y, amp, step, alpha) => {
        筆(1.05, alpha); x.beginPath(); x.moveTo(168, y);
        for (let px = 168; px < 1832; px += step) {
          x.quadraticCurveTo(px + step/4, y - amp, px + step/2, y);
          x.quadraticCurveTo(px + step*3/4, y + amp, px + step, y);
        } x.stroke(); x.globalAlpha = 1;
      };
      線([[160,2164],[1840,2164]], 2.2, false, .78);
      線([[160,2440],[1840,2440]], 2.2, false, .78);
      for (const [yy,aa,ss,al] of [[2200,9,62,.55],[2250,8,54,.5],[2310,10,68,.52],[2375,8,58,.48],[2422,7,52,.44]]) 波列(yy,aa,ss,al);
      const 荷葉 = (cx, cy, rx, ry, rot = 0, alpha = .67) => {
        x.save(); x.translate(cx,cy); x.rotate(rot); 筆(1.35,alpha);
        x.beginPath(); x.moveTo(-rx,0); x.bezierCurveTo(-rx*.7,-ry,rx*.62,-ry,rx,0);
        x.bezierCurveTo(rx*.68,ry,-rx*.7,ry,-rx,0); x.stroke();
        x.beginPath(); x.moveTo(0,0); x.lineTo(rx*.82,-2); x.stroke();
        for (const a of [-.75,-.35,.35,.75]) 線([[0,0],[Math.cos(a)*rx*.76,Math.sin(a)*ry*.72]], .75, false, alpha*.82);
        x.restore();
      };
      const 蓮 = (cx, base, s = 1, alpha = .75) => {
        貝([cx,base],[cx-8*s,base-50*s],[cx+8*s,base-92*s],[cx,base-128*s],1.3,alpha);
        for (let k = -2; k <= 2; k++) {
          const px = cx + k * 17 * s, tip = base - 154*s - Math.abs(k)*9*s;
          二次([cx + k*8*s,base-126*s],[px,tip],[cx + k*24*s,base-126*s],1.2,alpha);
          二次([cx + k*12*s,base-126*s],[px,tip+13*s],[cx + k*20*s,base-126*s],.72,alpha*.72);
        }
        二次([cx-54*s,base-126*s],[cx,base-96*s],[cx+54*s,base-126*s],1.4,alpha);
      };
      for (const [cx,cy,rx,ry,rot] of [[240,2320,72,28,-.12],[390,2405,82,30,.08],[620,2280,70,27,-.05],[790,2400,83,31,.12],[1210,2400,83,31,-.12],[1380,2280,70,27,.05],[1610,2405,82,30,-.08],[1760,2320,72,28,.12],[1010,2328,92,33,0]]) 荷葉(cx,cy,rx,ry,rot);
      for (const [cx,base,s] of [[245,2410,.75],[540,2440,.9],[760,2388,.72],[1000,2440,1.02],[1240,2388,.72],[1460,2440,.9],[1755,2410,.75]]) 蓮(cx,base,s,.68);

      // 寶瓶滿枝二，瓶腹、口沿、箍帶、蓮枝逐層落線。
      const 寶瓶 = (cx, base, s = 1) => {
        筆(1.8,.82); x.beginPath(); x.moveTo(cx-29*s,base-70*s);
        x.bezierCurveTo(cx-50*s,base-47*s,cx-42*s,base-5*s,cx-18*s,base);
        x.lineTo(cx+18*s,base); x.bezierCurveTo(cx+42*s,base-5*s,cx+50*s,base-47*s,cx+29*s,base-70*s); x.stroke();
        線([[cx-20*s,base-76*s],[cx+20*s,base-76*s]],1.7,false,.8);
        線([[cx-26*s,base-48*s],[cx+26*s,base-48*s]],1.0,false,.65);
        for (let px = cx-16*s; px <= cx+16*s; px += 8*s) 圓(px,base-61*s,2.2*s,.65,.56);
        貝([cx,base-77*s],[cx-5*s,base-118*s],[cx+7*s,base-146*s],[cx,base-182*s],1.25,.7);
        for (const d of [-1,1]) {
          貝([cx+d*3*s,base-103*s],[cx+d*29*s,base-126*s],[cx+d*42*s,base-154*s],[cx+d*56*s,base-175*s],1.1,.68);
          葉(cx+d*32*s,base-146*s,38*s,10*s,d>0?-.72:Math.PI+.72,.9,.64);
          花(cx+d*58*s,base-180*s,12*s,7,.9,.65);
        }
        花(cx,base-190*s,15*s,8,1.0,.68);
      };
      寶瓶(445,2410,.92); 寶瓶(1555,2410,.92);

      // ── 下緣護法四龕：匿名護法只示護持之位，不另立考據尊號 ─────────────
      const 護法 = (cx, base, s = 1, flip = 1) => {
        // 先清火龕內景，保小像輪廓清楚。
        x.save(); x.globalCompositeOperation='destination-out'; x.fillStyle='#000';
        x.beginPath(); x.ellipse(cx,base-92*s,72*s,116*s,0,0,Math.PI*2); x.fill(); x.restore();
        x.strokeStyle=墨; x.fillStyle=墨;
        // 火周二十四舌。
        for (let k=0;k<22;k++) {
          const a=Math.PI*2*k/22, px=cx+Math.cos(a)*74*s, py=base-92*s+Math.sin(a)*116*s;
          const tx=-Math.sin(a), ty=Math.cos(a), nx=Math.cos(a), ny=Math.sin(a);
          筆(1.0,.7); x.beginPath(); x.moveTo(px-tx*7*s,py-ty*7*s);
          x.bezierCurveTo(px+nx*8*s,py+ny*8*s,px+nx*18*s-tx*4*s,py+ny*18*s-ty*4*s,px+nx*24*s,py+ny*24*s);
          x.bezierCurveTo(px+nx*13*s+tx*6*s,py+ny*13*s+ty*6*s,px+tx*7*s,py+ty*7*s,px+tx*7*s,py+ty*7*s); x.stroke();
        }
        橢(cx,base-92*s,67*s,110*s,1.15,0,.72);
        // 冠、三目、怒髮、軀幹、雙臂與踏蓮。
        圓(cx,base-142*s,25*s,1.8,.88);
        for (let k=-2;k<=2;k++) 二次([cx+k*9*s-6*s,base-164*s],[cx+k*9*s,base-(190-Math.abs(k)*7)*s],[cx+k*9*s+6*s,base-164*s],1.05,.78);
        二次([cx-21*s,base-148*s],[cx,base-158*s],[cx+21*s,base-148*s],1.0,.72);
        for (const ex of [-9,0,9]) 橢(cx+ex*s,base-(145+(ex===0?7:0))*s,3.3*s,1.7*s,.82,0,.82);
        線([[cx-18*s,base-157*s],[cx-7*s,base-161*s]],1.0,false,.78);
        線([[cx+18*s,base-157*s],[cx+7*s,base-161*s]],1.0,false,.78);
        二次([cx-9*s,base-129*s],[cx,base-138*s],[cx+9*s,base-129*s],1.0,.76);
        線([[cx-4*s,base-127*s],[cx-1*s,base-118*s]],.8,false,.68);
        線([[cx+4*s,base-127*s],[cx+1*s,base-118*s]],.8,false,.68);
        貝([cx-24*s,base-116*s],[cx-48*s,base-92*s],[cx-45*s,base-42*s],[cx-31*s,base-18*s],1.8,.86);
        貝([cx+24*s,base-116*s],[cx+48*s,base-92*s],[cx+45*s,base-42*s],[cx+31*s,base-18*s],1.8,.86);
        二次([cx-31*s,base-18*s],[cx,base-36*s],[cx+31*s,base-18*s],1.5,.82);
        二次([cx-30*s,base-100*s],[cx,base-76*s],[cx+30*s,base-100*s],1.2,.75);
        for(let q=-3;q<=3;q++) 圓(cx+q*8*s,base-91*s,2.2*s,.68,.64);
        for(let q=-2;q<=2;q++) {
          二次([cx+q*13*s-8*s,base-70*s],[cx+q*13*s,base-48*s],[cx+q*13*s+8*s,base-70*s],.75,.58);
        }
        // 兩臂分持金剛與鉞形線器。
        for (const d of [-1,1]) {
          貝([cx+d*23*s,base-105*s],[cx+d*46*s,base-105*s],[cx+d*50*s,base-72*s],[cx+d*58*s,base-58*s],1.3,.78);
          圓(cx+d*59*s,base-54*s,6*s,1.0,.74);
        }
        const vx=cx-58*s*flip, vy=base-90*s;
        線([[vx,vy+36*s],[vx,vy-34*s]],1.25,false,.76);
        for (const q of [-1,1]) {
          二次([vx-12*s,vy+q*27*s],[vx,vy+q*37*s],[vx+12*s,vy+q*27*s],.9,.7);
        }
        const ax=cx+58*s*flip, ay=base-76*s;
        線([[ax,ay+28*s],[ax,ay-30*s]],1.15,false,.72);
        二次([ax-15*s,ay-25*s],[ax,ay-43*s],[ax+15*s,ay-25*s],1.0,.72);
        二次([ax-15*s,ay-25*s],[ax,ay-12*s],[ax+15*s,ay-25*s],.8,.65);
        二次([cx-52*s,base-8*s],[cx,base-26*s],[cx+52*s,base-8*s],1.5,.82);
        for(let k=-3;k<=3;k++) 二次([cx+k*15*s-9*s,base-8*s],[cx+k*15*s,base-25*s],[cx+k*15*s+9*s,base-8*s],.85,.68);
      };
      護法(275,2128,.98,1); 護法(520,2120,.86,-1); 護法(1480,2120,.86,1); 護法(1725,2128,.98,-1);
      // 四龕各有檐座，中央留予法輪與七供；列意不靠浮像自明。
      for (const [a,b] of [[164,646],[1354,1836]]) {
        線([[a,2134],[b,2134]],1.8,false,.76); 線([[a,2152],[b,2152]],1.0,false,.62);
        for(let px=a+18;px<b;px+=28){
          二次([px-13,2151],[px,2132],[px+13,2151],.82,.61);
          圓(px,2147,2.1,.58,.5);
        }
      }
      線([[397,1882],[397,2152]],.9,false,.48); 線([[1603,1882],[1603,2152]],.9,false,.48);

      // ── 庫景活渲：雙鹿法輪居中、七供碗一字列 ───────────────────────────
      const 庫景 = f => {
        const c = document.createElement('canvas'); c.width=W; c.height=H;
        const y = c.getContext('2d'); y.translate(W/2,1200); y.strokeStyle=墨; y.fillStyle=墨;
        const b=執筆(y,730); b.ctx.lineWidth=b.W_OUT; b.ctx.lineCap='round'; f(b);
        x.drawImage(c,0,0);
      };
      庫景(b => 雙鹿法輪(b,0,119.2,2.4,.86));
      庫景(b => 供水碗列(b,0,125.2,7,4.75,1.48,.78));
      // 供案雙層花瓣帶把法輪、七供與池面接成一體。
      線([[670,2142],[1330,2142]],1.8,false,.78); 線([[650,2160],[1350,2160]],1.0,false,.65);
      for(let px=668;px<1340;px+=34){
        二次([px-16,2159],[px,2138],[px+16,2159],.9,.64);
        二次([px-10,2159],[px,2147],[px+10,2159],.65,.54);
      }

      // ── 八大線淡硃：四邊、梵線、水平與對角二；景成後仍可循線校格 ───────
      x.save(); x.strokeStyle=硃; x.globalAlpha=.13; x.lineWidth=2;
      x.strokeRect(160,150,1680,2300);
      x.beginPath(); x.moveTo(1000,150); x.lineTo(1000,2450); x.stroke();
      x.beginPath(); x.moveTo(160,1300); x.lineTo(1840,1300); x.stroke();
      x.beginPath(); x.moveTo(160,150); x.lineTo(1840,2450); x.stroke();
      x.beginPath(); x.moveTo(1840,150); x.lineTo(160,2450); x.stroke(); x.restore();

      // ── 上欄庫像逐尊活渲；每像獨立透明層，專筆鍵完整保留 ───────────────
      for (let i=0;i<上Ids.length;i++) {
        const [id,side]=上Ids[i], c=document.createElement('canvas'); c.width=W; c.height=H;
        const y=c.getContext('2d'); y.translate(centers[i],340); y.strokeStyle=墨; y.fillStyle=墨;
        白描(y,185,依號[id][side],`${id}|${side}`); x.drawImage(c,0,0);
      }

      // ── 中尊釋迦：唯一主尊活渲，R、格、印、衣與尊身一線不動 ─────────────
      {
        const c=document.createElement('canvas'); c.width=W; c.height=H;
        const y=c.getContext('2d'); y.translate(W/2,1175); y.strokeStyle=墨; y.fillStyle=墨;
        白描(y,850,依號['shaka'].h,'shaka|h'); x.drawImage(c,0,0);
      }

      // ── 貢夏三色緣：外寬帶散雜寶；內二細帶密貼，轉角方正 ───────────────
      筆(3.4,.96); x.strokeRect(28,28,W-56,H-56);
      筆(1.3,.72); x.strokeRect(42,42,W-84,H-84);
      筆(2.0,.86); x.strokeRect(94,94,W-188,H-188);
      筆(1.2,.72); x.strokeRect(112,112,W-224,H-224);
      筆(1.2,.72); x.strokeRect(128,128,W-256,H-256);
      筆(2.2,.88); x.strokeRect(150,150,W-300,H-300);
      const 雜寶 = (px,py,rot,k) => {
        x.save(); x.translate(px,py); x.rotate(rot); 筆(1.0,.72);
        if(k%3===0){ 圓(0,3,5.2,.95,.72); 圓(0,3,1.3,.6,.6); 二次([-5,-3],[0,-15],[5,-3],.9,.68); }
        else if(k%3===1){ 線([[-6,0],[0,-7],[6,0],[0,7]],.95,true,.68); 圓(0,0,1.3,.55,.6); }
        else { 圓(-5,2,2.5,.8,.66); 圓(5,2,2.5,.8,.66); 二次([-7,-3],[0,-11],[7,-3],.85,.64); }
        x.restore();
      };
      for(let px=58,k=0;px<W-58;px+=42,k++) { 雜寶(px,68,0,k); if(px<420||px>1580) 雜寶(px,H-68,Math.PI,k+1); }
      for(let py=70,k=0;py<H-70;py+=44,k++) { 雜寶(68,py,-Math.PI/2,k+2); 雜寶(W-68,py,Math.PI/2,k); }
      // 內二細帶各置微瓣／連珠，示黃紅二緣並非一線。
      for(let px=156;px<1845;px+=30){
        二次([px-14,143],[px,128],[px+14,143],.7,.5);
        二次([px-14,H-143],[px,H-128],[px+14,H-143],.7,.5);
      }
      for(let py=162;py<2440;py+=28){ 圓(140,py,3.2,.65,.48); 圓(W-140,py,3.2,.65,.48); }

      x.fillStyle=灰; x.globalAlpha=.95; x.textAlign='center';
      x.font='27px "Songti TC", "STSong", serif';
      x.fillText('藏地室 · 釋迦說法唐卡式——背屏四帶・六尊傳承列・護法供養列・座毯滿紋・雙鹿法輪七供蓮池・貢夏三色緣',W/2,H-48);
      x.globalAlpha=1;

      const out=document.createElement('canvas'); out.width=W; out.height=H;
      const xo=out.getContext('2d'); xo.fillStyle=地; xo.fillRect(0,0,W,H); xo.drawImage(ink,0,0);
      return out.toDataURL('image/png');
    }),
  });
})().catch(e => { console.error(e); process.exit(1); });
