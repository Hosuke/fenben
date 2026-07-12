// 風格館・犍陀羅室——獨立三稿：貴霜片岩期釋迦轉法輪像
//
// 參攷目驗（2026-07-12；六圖皆以 original 尺寸親觀）：
// headless 親觀證：chrome-headless-shell 1228 逐張開圖截屏，合覽存於
// `/tmp/fenben-gandhara-reference-headless-contact.png`，並非只讀目錄文字判式。
// 1. Met 2014.188：照片實為立佛（本地目錄誤記坐佛）。只取額上平行波束髮、波紋
//    圓丘頂髻、長直鼻連眉稜、薄唇長耳、粗頸寬肩及七層通肩 U 褶；雙手殘，坐姿不取。
// 2. Met 2003.593.1：青銅坐像而非石雕；取完整波髮頂髻、厚肩胸、飽滿雙膝、膝間
//    垂尖衣片與扇形褶，不取其施無畏與持物。此像與 2014.188 皆未見可信小髭，
//    故本稿明採「無髭式」。
// 3. Met 13.96.28：取長面直鼻、通肩寬 U 褶、厚膝、密尖葉菩提冠、分柱脅侍位與
//    座前垂幔；髮部磨蝕，不據以造髮。
// 4. Met 13.96.24：取雙重圓拱、分層柱礎柱頭、頂端連續棕櫚葉帶及坐膝放射褶。
// 5. Met 1980.527.4：取初轉法輪敘事之框內法輪、雙鹿與厚重群像尺度；其小手遮疊，
//    不據以定 chirality。
// 6. Met 2005.314：只取三重同心拱券、楔形券石及內沿垂葉；中尊為裸胸冠飾菩薩，
//    決不移作釋迦身。
//
// 自校記：
// - 輪一：1800×2400、四錨與手性斷言全過；全幅非底色像素 22.95%，已近尼瓦爾
//   精密二稿 23.85%，且外密內息。目驗見髮列相位錯開近網格、兩手環相疊、耳郭偏闊；
//   二輪統一波髮杆勢、拉開兩環並收耳，不以加線掩病。
// - 輪二：兩環已分開相向；尊右掌紋、尊左背腱與甲可辨，兩拇皆居中線側，耳郭亦收。
//   惟髮波振幅與列距相撞，局部仍成菱網；座鹿單頸線縮覽近鳥，三輪減髮幅增列距，
//   並補鹿之內頸、吻、角枝與折腿。
// - 輪三：髮束已成不相交之平行雙波，頂髻與額髮縮覽皆不再近螺珠或菱網；手面、
//   U 褶、扇膝及空龕亦各自可讀。座鹿雖補頸腿角，末檢見吻端反朝外，故末輪只反轉
//   鹿首與角枝，身、衣、手、錨均不再動。
// - 末輪／石雕並排：`/tmp/fenben-gandhara-round4-final-compare.png` 將本卷與六件原藏品
//   同幅等欄目驗：額髮與頂髻已得 2014.188 之平行波束而絕非螺髮；長鼻連眉、長耳、
//   寬肩粗頸及雙線 U 脊亦與其上軀同律；厚膝與扇褶則同 2003.593.1、13.96.24/.28
//   之坐身。座鹿已雙向法輪，三重拱券、楔石、連珠、垂葉、十一槽柱與空龕各自可讀。
//   `/tmp/fenben-gandhara-final-v-nepal.png` 等高對標完成度：本卷非底色線像素約 22.96%，
//   尼瓦爾精密二稿約 23.85%；前者以石構節拍密外框、尊身留息，差異出於館室材料，
//   非漏筆。脅侍仍依命留空龕候考，不以無把握人形增滿。
//
// 畫序：石構與樹冠（後）→尊身負形鑿開→厚衣軀體→前臂與兩掌（前）→座前壓線。
// 戒：不 import 依號／白描／任何尊身或手印庫筆；T1419 只讀數值為律，曲線皆本稿自運。

const { 合幀 } = require('../../tools/lib/幀具.cjs');

(async () => {
  await 合幀({
    出: '圖錄/風格館/犍陀羅-獨立三稿.png',
    幀: page => page.evaluate(async () => {
      const { 錨點, 坐像 } = await import('/dist/liangdu.js');

      const W = 1800, H = 2400;
      const 墨 = '#d8b36a', 地 = '#0d1124';
      const ink = document.createElement('canvas');
      ink.width = W; ink.height = H;
      const x = ink.getContext('2d');
      x.strokeStyle = 墨; x.fillStyle = 墨;
      x.lineCap = 'round'; x.lineJoin = 'round';

      const 中 = W / 2;
      const 頂Y = 480;
      const u = 16.5;
      const Y = z => 頂Y + z * u;
      const M = 錨點();
      const 格 = Object.freeze({
        白毫: M.白毫,
        頦: M.頦,
        臍: M.心窩至臍,
        盤線: 坐像.盤線,
        座面: 坐像.座面,
        膝寬: 坐像.膝寬,
      });
      const 錨 = Object.freeze({
        頂: Object.freeze({ x: 中, y: Y(0) }),
        白毫: Object.freeze({ x: 中, y: Y(格.白毫) }),
        頦: Object.freeze({ x: 中, y: Y(格.頦) }),
        臍: Object.freeze({ x: 中, y: Y(格.臍) }),
        盤線: Object.freeze({ x: 中, y: Y(格.盤線) }),
        座面: Object.freeze({ x: 中, y: Y(格.座面) }),
        膝左: Object.freeze({ x: 中 - 格.膝寬 * u / 2, y: Y(64.4) }),
        膝右: Object.freeze({ x: 中 + 格.膝寬 * u / 2, y: Y(64.4) }),
      });
      const 守 = (真, 名, 細 = undefined) => {
        console.assert(真, 名, 細);
        if (!真) throw new Error(`${名}${細 ? `：${JSON.stringify(細)}` : ''}`);
      };
      守(W === 1800 && H === 2400, '破戒：畫幅非 1800×2400');
      for (const [名, z] of Object.entries({ 白毫: 12, 頦: 20, 臍: 48, 座面: 68 })) {
        守(格[名] === z, `破戒：T1419 ${名} 非 ${z}`, { 實: 格[名] });
        守(Math.abs((錨[名].y - 頂Y) / u - z) < 1e-9, `破戒：實落 ${名} 未中 ${z}`);
      }
      守(Math.abs(錨.膝右.x - 錨.膝左.x - 52 * u) < 1e-9, '破戒：膝寬非五十二指');

      const 筆 = Object.freeze({ 骨: 6.0, 衣: 4.7, 中: 3.2, 細: 2.05, 微: 1.25 });
      守((錨.座面.y - 頂Y) / 筆.骨 >= 100 && (錨.座面.y - 頂Y) / 筆.骨 <= 200,
        '破戒：骨線身比不在 1:100–200');

      function 描(w, 落, alpha = 1) {
        x.save();
        x.globalCompositeOperation = 'source-over';
        x.strokeStyle = 墨; x.fillStyle = 墨;
        x.globalAlpha = alpha; x.lineWidth = w;
        x.lineCap = 'round'; x.lineJoin = 'round';
        x.beginPath(); 落(x); x.stroke(); x.restore();
      }
      function 鑿填(落) {
        x.save(); x.globalCompositeOperation = 'destination-out';
        x.beginPath(); 落(x); x.fill(); x.restore();
      }
      function 鑿線(w, 落) {
        x.save(); x.globalCompositeOperation = 'destination-out';
        x.lineWidth = w; x.lineCap = 'round'; x.lineJoin = 'round';
        x.beginPath(); 落(x); x.stroke(); x.restore();
      }
      const 線 = (a, b, w = 筆.中, alpha = 1) => 描(w, p => { p.moveTo(...a); p.lineTo(...b); }, alpha);
      const 貝 = (a, b, c, d, w = 筆.中, alpha = 1) => 描(w, p => {
        p.moveTo(...a); p.bezierCurveTo(...b, ...c, ...d);
      }, alpha);
      const 圓 = (cx, cy, r, w = 筆.中, alpha = 1) => 描(w, p => p.arc(cx, cy, r, 0, Math.PI * 2), alpha);
      const 橢 = (cx, cy, rx, ry, w = 筆.中, rot = 0, alpha = 1) => 描(w, p => {
        p.ellipse(cx, cy, rx, ry, rot, 0, Math.PI * 2);
      }, alpha);
      const 方 = (l, t, r, b, w = 筆.中) => 描(w, p => p.rect(l, t, r - l, b - t));
      const 鏡X = px => W - px;

      function 葉(cx, cy, len, wid, a = 0, w = 筆.細, 芯 = true) {
        x.save(); x.translate(cx, cy); x.rotate(a);
        描(w, p => {
          p.moveTo(0, len * .48);
          p.bezierCurveTo(-wid * .95, len * .26, -wid * 1.12, -len * .10, 0, -len * .50);
          p.bezierCurveTo(wid * 1.12, -len * .10, wid * .95, len * .26, 0, len * .48);
          p.closePath();
        });
        if (芯) {
          線([0, len * .40], [0, -len * .44], Math.max(.9, w * .68));
          for (const s of [-1, 1]) for (let k = 0; k < 3; k++) {
            const yy = len * (.20 - k * .17);
            線([0, yy], [s * wid * (.55 - k * .08), yy - len * .10], Math.max(.75, w * .48));
          }
        }
        x.restore();
      }
      function 花(cx, cy, r, n = 8, w = 筆.微) {
        圓(cx, cy, r * .18, w);
        for (let k = 0; k < n; k++) {
          const a = Math.PI * 2 * k / n;
          x.save(); x.translate(cx, cy); x.rotate(a);
          描(w, p => {
            p.moveTo(r * .22, 0);
            p.bezierCurveTo(r * .43, -r * .24, r * .82, -r * .18, r, 0);
            p.bezierCurveTo(r * .82, r * .18, r * .43, r * .24, r * .22, 0);
          });
          x.restore();
        }
      }
      function 棕瓣(cx, cy, len, wid, a = 0, w = 筆.細) {
        x.save(); x.translate(cx, cy); x.rotate(a);
        描(w, p => {
          p.moveTo(-wid, len * .34);
          p.quadraticCurveTo(-wid * .94, -len * .16, 0, -len * .52);
          p.quadraticCurveTo(wid * .94, -len * .16, wid, len * .34);
          p.quadraticCurveTo(0, len * .12, -wid, len * .34);
        });
        線([0, len * .12], [0, -len * .42], Math.max(.85, w * .62));
        x.restore();
      }

      // ── 五重外界：石框、連珠、卷葉、菱格、棕櫚葉各自成帶 ────────────────
      function 珠橫(y, x0, x1, step = 25, r = 6.5) {
        線([x0, y - r - 6], [x1, y - r - 6], 筆.細);
        線([x0, y + r + 6], [x1, y + r + 6], 筆.細);
        for (let px = x0 + step / 2, k = 0; px < x1; px += step, k++) {
          if (k % 2) {
            橢(px, y, r * .58, r * 1.18, 筆.細);
            線([px - r * .55, y], [px + r * .55, y], 筆.微);
          } else {
            圓(px, y, r, 筆.細); 圓(px, y, r * .26, 筆.微);
          }
        }
      }
      function 珠直(xx, y0, y1, step = 25, r = 6.5) {
        線([xx - r - 6, y0], [xx - r - 6, y1], 筆.細);
        線([xx + r + 6, y0], [xx + r + 6, y1], 筆.細);
        for (let py = y0 + step / 2, k = 0; py < y1; py += step, k++) {
          if (k % 2) 橢(xx, py, r * 1.18, r * .58, 筆.細);
          else { 圓(xx, py, r, 筆.細); 圓(xx, py, r * .26, 筆.微); }
        }
      }
      function 菱橫(y, x0, x1, step = 34, h = 10) {
        線([x0, y - h - 5], [x1, y - h - 5], 筆.微);
        線([x0, y + h + 5], [x1, y + h + 5], 筆.微);
        for (let px = x0; px + step <= x1; px += step) {
          描(筆.微, p => {
            p.moveTo(px, y); p.lineTo(px + step / 2, y - h);
            p.lineTo(px + step, y); p.lineTo(px + step / 2, y + h); p.closePath();
          });
          圓(px + step / 2, y, 2.6, .9);
        }
      }
      方(28, 28, W - 28, H - 28, 4.4);
      方(43, 43, W - 43, H - 43, 筆.細);
      珠橫(68, 60, W - 60, 25, 6.2); 珠橫(H - 68, 60, W - 60, 25, 6.2);
      珠直(68, 60, H - 60, 25, 6.2); 珠直(W - 68, 60, H - 60, 25, 6.2);
      菱橫(104, 94, W - 94, 34, 9.5); 菱橫(H - 104, 94, W - 94, 34, 9.5);
      for (const sx of [1, -1]) {
        const xx = sx > 0 ? 106 : W - 106;
        x.save(); x.translate(xx, H / 2); x.rotate(sx > 0 ? Math.PI / 2 : -Math.PI / 2);
        菱橫(0, -H / 2 + 94, H / 2 - 94, 34, 9.5); x.restore();
      }
      方(132, 132, W - 132, H - 132, 3.1);
      for (let px = 158, k = 0; px < W - 150; px += 54, k++) {
        棕瓣(px, 152, 34, 15, k % 2 ? .08 : -.08, 筆.細);
        棕瓣(px, H - 152, 34, 15, Math.PI + (k % 2 ? .08 : -.08), 筆.細);
      }
      for (let py = 178, k = 0; py < H - 170; py += 58, k++) {
        葉(153, py, 38, 13, Math.PI / 2 + (k % 2 ? .22 : -.22), 筆.微);
        葉(W - 153, py, 38, 13, -Math.PI / 2 + (k % 2 ? -.22 : .22), 筆.微);
      }
      方(178, 178, W - 178, H - 178, 2.8);

      // ── 拱券：楔石外帶、連珠中帶、垂葉內帶，四路同心而各有節拍 ──────────
      const 三貝 = (p0, p1, p2, p3, t) => {
        const q = 1 - t;
        return [
          q*q*q*p0[0] + 3*q*q*t*p1[0] + 3*q*t*t*p2[0] + t*t*t*p3[0],
          q*q*q*p0[1] + 3*q*q*t*p1[1] + 3*q*t*t*p2[1] + t*t*t*p3[1],
        ];
      };
      const 拱控 = (層, 側) => {
        const apex = 154 + 層 * 34;
        const baseX = 294 + 層 * 38;
        const baseY = 690;
        const s = 側;
        return [
          [中, apex],
          [中 + s * (140 - 層 * 3), apex + 40],
          [中 + s * (455 - 層 * 18), 350 + 層 * 10],
          [中 + s * (中 - baseX), baseY],
        ];
      };
      const 拱點 = (層, 側, t) => 三貝(...拱控(層, 側), t);
      const 拱切 = (層, 側, t) => {
        const a = 拱點(層, 側, Math.max(0, t - .003));
        const b = 拱點(層, 側, Math.min(1, t + .003));
        return Math.atan2(b[1] - a[1], b[0] - a[0]);
      };
      function 拱路(層, w) {
        for (const 側 of [-1, 1]) {
          const [p0, p1, p2, p3] = 拱控(層, 側);
          描(w, p => { p.moveTo(...p0); p.bezierCurveTo(...p1, ...p2, ...p3); });
        }
      }
      拱路(0, 5.2); 拱路(1, 筆.中); 拱路(2, 筆.中); 拱路(3, 4.1);
      // 外圈楔形券石
      for (const 側 of [-1, 1]) for (let t = .08; t < .99; t += .075) {
        const a = 拱點(0, 側, t), b = 拱點(1, 側, t);
        線(a, b, 筆.細);
      }
      // 中圈連珠：圓珠與梭形交替，不以單一珠列充數
      for (const 側 of [-1, 1]) for (let t = .055, k = 0; t < .985; t += .047, k++) {
        const a = 拱點(1, 側, t), b = 拱點(2, 側, t);
        const px = (a[0] + b[0]) / 2, py = (a[1] + b[1]) / 2;
        const ang = 拱切(1, 側, t);
        if (k % 2) 橢(px, py, 4.2, 9.0, 筆.微, ang);
        else { 圓(px, py, 7.2, 筆.細); 圓(px, py, 2.1, 筆.微); }
      }
      // 內圈垂葉
      for (const 側 of [-1, 1]) for (let t = .075, k = 0; t < .985; t += .074, k++) {
        const a = 拱點(2, 側, t), b = 拱點(3, 側, t);
        const px = (a[0] + b[0]) / 2, py = (a[1] + b[1]) / 2;
        葉(px, py, 28 + (k % 3) * 3, 10, 拱切(2, 側, t) + (側 < 0 ? Math.PI / 2 : -Math.PI / 2), 筆.微);
      }
      圓(中, 154, 8, 筆.細); 圓(中, 154, 2.5, 筆.微);

      // 拱外角藤：密而不壓中堂，葉脈逐片可辨
      for (const 側 of [-1, 1]) {
        const sx = 中 + 側 * 620;
        貝([sx, 250], [sx + 側 * 75, 335], [sx + 側 * 35, 500], [sx + 側 * 5, 626], 筆.細);
        for (let k = 0; k < 8; k++) {
          const cy = 286 + k * 43, dir = k % 2 ? 1 : -1;
          葉(sx + 側 * (28 + dir * 20), cy, 52 - (k % 3) * 5, 17,
            側 * (dir > 0 ? .88 : -.88), 筆.微);
          if (k % 2 === 0) 花(sx + 側 * 72, cy + 10, 11, 6, .95);
        }
      }

      // ── 菩提樹冠：枝幹在後，尖心葉密集成冠；其後由尊身負形鑿開 ───────────
      貝([870, 970], [850, 740], [865, 505], [900, 286], 4.0);
      貝([930, 970], [950, 740], [935, 505], [900, 286], 4.0);
      for (const 側 of [-1, 1]) {
        for (let k = 0; k < 6; k++) {
          const sy = 360 + k * 75;
          const ex = 中 + 側 * (120 + k * 48), ey = 270 + k * 42;
          貝([中 + 側 * 12, sy + 70], [中 + 側 * 80, sy + 15], [ex - 側 * 55, ey + 25], [ex, ey], 筆.細);
        }
      }
      for (let row = 0; row < 5; row++) {
        const count = 9 + row * 2;
        const cy = 284 + row * 78;
        for (let k = 0; k < count; k++) {
          const q = count === 1 ? 0 : k / (count - 1);
          const px = 560 + q * 680 + (row % 2 ? 22 : 0);
          const bow = Math.abs(px - 中) / 340;
          const py = cy + bow * (35 + row * 6) + Math.sin(k * 1.73 + row) * 13;
          const ang = (px < 中 ? -.34 : .34) + Math.sin(k * .9) * .24;
          葉(px, py, 56 - (k % 3) * 5, 19 - (k % 2) * 2, ang, 筆.細);
        }
      }
      // 素圈頭光：片岩像之素圈，外密樹冠與內疏尊面分界
      橢(中, 712, 288, 292, 4.8); 橢(中, 712, 270, 274, 筆.細);

      // ── 脅侍位：連珠龕柱分格；人物考據未足，依命留空龕候考 ───────────────
      function 空龕(側) {
        const cx = 中 + 側 * 485;
        const l = cx - 105, r = cx + 105, apex = 742, spring = 850, base = 1394;
        for (const off of [0, 14]) 描(off ? 筆.細 : 筆.中, p => {
          p.moveTo(l + off, base); p.lineTo(l + off, spring);
          p.bezierCurveTo(l + off, 792 + off * .2, cx - 42, apex + off, cx, apex + off);
          p.bezierCurveTo(cx + 42, apex + off, r - off, 792 + off * .2, r - off, spring);
          p.lineTo(r - off, base);
        });
        珠直(l + 25, spring + 16, base - 18, 31, 5.3);
        珠直(r - 25, spring + 16, base - 18, 31, 5.3);
        for (const yy of [base - 8, base + 14, base + 34]) 線([l - 12, yy], [r + 12, yy], yy === base + 34 ? 筆.中 : 筆.細);
        // 空龕只設無人小台，不以猜測人形冒充脅侍
        for (const yy of [base - 80, base - 64, base - 48]) 線([cx - 58 + (yy - base + 80) * .12, yy], [cx + 58 - (yy - base + 80) * .12, yy], 筆.細);
        花(cx, base - 112, 18, 8, 筆.微);
      }
      空龕(-1); 空龕(1);

      // ── 科林斯柱：十一槽、頸圈、雙層莨苕、四角渦卷、三重柱礎 ────────────
      function 莨苕(cx, cy, s, flip = 1) {
        x.save(); x.translate(cx, cy); x.scale(s, s * flip);
        描(筆.細 / s, p => {
          p.moveTo(-18, 18); p.bezierCurveTo(-22, -2, -12, -25, 0, -36);
          p.bezierCurveTo(12, -25, 22, -2, 18, 18);
          p.bezierCurveTo(8, 6, -8, 6, -18, 18);
        });
        線([0, 12], [0, -29], 筆.微 / s);
        x.restore();
      }
      function 大柱(cx) {
        const capTop = 618, capBot = 742, shaftBot = 2070;
        // abacus 與頸圈
        for (const [yy, half, w] of [[604, 132, 4.8], [618, 145, 筆.中], [636, 120, 筆.細], [724, 94, 筆.中], [742, 82, 筆.中]]) {
          線([cx - half, yy], [cx + half, yy], w);
        }
        // 渦卷成雙螺旋，但僅在柱頭，毋與佛髮混同
        for (const s of [-1, 1]) {
          描(筆.中, p => { p.arc(cx + s * 92, 648, 25, s > 0 ? .2 : Math.PI - .2, s > 0 ? Math.PI * 1.75 : -Math.PI * .75, s < 0); });
          描(筆.細, p => { p.arc(cx + s * 92, 648, 12, 0, Math.PI * 1.75); });
          貝([cx + s * 68, 660], [cx + s * 52, 682], [cx + s * 55, 708], [cx + s * 34, 724], 筆.細);
        }
        // 兩層葉托，共十六葉
        for (let k = 0; k < 8; k++) 莨苕(cx - 82 + k * 23.5, 712, .78, 1);
        for (let k = 0; k < 7; k++) 莨苕(cx - 70 + k * 23.3, 679, .66, 1);
        // 柱身輪廓與十一道凹槽；每槽頂底以半圓收口
        線([cx - 76, capBot], [cx - 76, shaftBot], 4.6);
        線([cx + 76, capBot], [cx + 76, shaftBot], 4.6);
        for (let k = -5; k <= 5; k++) {
          const xx = cx + k * 12.2;
          描(筆.細, p => {
            p.moveTo(xx, capBot + 24);
            p.quadraticCurveTo(xx - 6, capBot + 36, xx, capBot + 48);
            p.lineTo(xx, shaftBot - 38);
            p.quadraticCurveTo(xx + 6, shaftBot - 25, xx, shaftBot - 12);
          });
          線([xx - 3.8, capBot + 52], [xx - 3.8, shaftBot - 42], 筆.微, .78);
        }
        // 束環與礎座
        for (const yy of [770, 792, 2018, 2040, 2070]) 線([cx - 84, yy], [cx + 84, yy], yy === 2070 ? 4.6 : 筆.細);
        for (const [yy, half, w] of [[2090, 96, 筆.中], [2115, 116, 筆.中], [2144, 132, 4.8], [2170, 142, 筆.中]]) {
          線([cx - half, yy], [cx + half, yy], w);
        }
        // 礎間瓣帶
        for (let k = -5; k <= 5; k++) 棕瓣(cx + k * 21, 2128, 26, 9, Math.PI, 筆.微);
      }
      大柱(292); 大柱(W - 292);

      // ── 座與正面浮雕：所有構件先於尊身，尊身負形將遮去座後線 ─────────────
      const seat = 錨.座面.y;
      for (const [yy, l, r, w] of [
        [seat, 390, 1410, 5.0], [1622, 370, 1430, 筆.中], [1644, 350, 1450, 4.5],
        [1674, 370, 1430, 筆.中], [1946, 350, 1450, 4.5], [1970, 370, 1430, 筆.中],
        [2010, 340, 1460, 5.0], [2040, 360, 1440, 筆.中], [2072, 380, 1420, 4.8],
      ]) 線([l, yy], [r, yy], w);
      珠橫(1660, 382, 1418, 24, 5.8);
      珠橫(1990, 382, 1418, 24, 5.8);
      // 三面板：中央雙鹿法輪，兩翼棕櫚卷葉
      方(392, 1690, 605, 1928, 筆.中); 方(410, 1708, 587, 1910, 筆.細);
      方(605, 1690, 1195, 1928, 4.0); 方(625, 1710, 1175, 1908, 筆.細);
      方(1195, 1690, 1408, 1928, 筆.中); 方(1213, 1708, 1390, 1910, 筆.細);
      for (const cx of [498, 1302]) {
        花(cx, 1808, 48, 12, 筆.細); 圓(cx, 1808, 65, 筆.微);
        for (let k = 0; k < 8; k++) 葉(cx, 1808, 70, 18, Math.PI * 2 * k / 8, 筆.微, false);
      }
      // 法輪
      const 輪X = 中, 輪Y = 1807, 輪R = 70;
      圓(輪X, 輪Y, 輪R, 4.6); 圓(輪X, 輪Y, 57, 筆.細); 圓(輪X, 輪Y, 15, 筆.中); 圓(輪X, 輪Y, 5, 筆.微);
      for (let k = 0; k < 12; k++) {
        const a = Math.PI * 2 * k / 12;
        線([輪X + Math.cos(a) * 17, 輪Y + Math.sin(a) * 17], [輪X + Math.cos(a) * 55, 輪Y + Math.sin(a) * 55], 筆.細);
      }
      function 鹿(側) {
        const cx = 中 + 側 * 176, cy = 1842;
        // 伏身、折腿、長頸皆面向法輪
        描(筆.中, p => {
          p.moveTo(cx - 側 * 78, cy + 21);
          p.bezierCurveTo(cx - 側 * 55, cy - 22, cx + 側 * 18, cy - 32, cx + 側 * 56, cy - 5);
          p.bezierCurveTo(cx + 側 * 75, cy + 10, cx + 側 * 66, cy + 35, cx + 側 * 24, cy + 39);
          p.bezierCurveTo(cx - 側 * 14, cy + 43, cx - 側 * 52, cy + 37, cx - 側 * 78, cy + 21);
        });
        貝([cx - 側 * 66, cy + 12], [cx - 側 * 78, cy - 22], [cx - 側 * 67, cy - 70], [cx - 側 * 43, cy - 93], 4.0);
        貝([cx - 側 * 52, cy + 19], [cx - 側 * 58, cy - 15], [cx - 側 * 55, cy - 58], [cx - 側 * 37, cy - 82], 筆.中);
        const hx = cx - 側 * 43, hy = cy - 93;
        描(筆.中, p => {
          p.moveTo(hx + 側 * 4, hy - 8);
          p.quadraticCurveTo(hx - 側 * 20, hy - 15, hx - 側 * 45, hy);
          p.quadraticCurveTo(hx - 側 * 38, hy + 10, hx - 側 * 15, hy + 13);
          p.quadraticCurveTo(hx + 側 * 2, hy + 14, hx + 側 * 8, hy + 4);
          p.quadraticCurveTo(hx + 側 * 8, hy - 2, hx + 側 * 4, hy - 8);
        });
        // 耳與角
        葉(hx + 側 * 3, hy - 17, 24, 8, 側 * .86, 筆.微, false);
        葉(hx + 側 * 14, hy - 15, 20, 7, -側 * .46, 筆.微, false);
        for (const q of [0, 1]) 貝([hx + 側 * (3 + q * 7), hy - 11], [hx - 側 * (6 - q * 2), hy - 33], [hx + 側 * (10 + q * 8), hy - 45], [hx - 側 * (4 - q * 9), hy - 57], 筆.微);
        for (const q of [0, 1]) {
          線([hx - 側 * (1 - q * 5), hy - 32], [hx - 側 * (17 + q * 3), hy - 40], 筆.微);
          線([hx + 側 * (7 + q * 8), hy - 45], [hx + 側 * (22 + q * 7), hy - 53], 筆.微);
        }
        // 兩折腿
        for (const q of [-1, 1]) 貝([cx + 側 * q * 20, cy + 24], [cx + 側 * q * 36, cy + 44], [cx + 側 * q * 47, cy + 47], [cx + 側 * q * 60, cy + 39], 筆.細);
        貝([cx - 側 * 54, cy + 13], [cx - 側 * 43, cy + 28], [cx - 側 * 30, cy + 41], [cx - 側 * 16, cy + 39], 筆.細);
        貝([cx + 側 * 26, cy + 26], [cx + 側 * 36, cy + 34], [cx + 側 * 48, cy + 40], [cx + 側 * 63, cy + 38], 筆.細);
        圓(hx - 側 * 12, hy - 1, 2.5, 筆.微);
        圓(hx - 側 * 44, hy + 1, 2.1, 筆.微);
        貝([hx - 側 * 43, hy + 7], [hx - 側 * 33, hy + 10], [hx - 側 * 24, hy + 10], [hx - 側 * 17, hy + 8], 筆.微);
      }
      鹿(-1); 鹿(1);
      // 下部垂幔與葉帶
      for (let k = 0; k < 9; k++) {
        const x0 = 400 + k * 125;
        描(筆.細, p => {
          p.moveTo(x0, 2022); p.quadraticCurveTo(x0 + 62, 2068 + (k % 2) * 8, x0 + 124, 2022);
          p.quadraticCurveTo(x0 + 62, 2042, x0, 2022);
        });
      }

      // ── 尊身負形：清去樹、光、空龕與座後線；不以底色填身 ─────────────────
      const 身形 = p => {
        p.moveTo(847, 850);
        p.bezierCurveTo(806, 865, 748, 882, 690, 918);
        p.bezierCurveTo(626, 958, 602, 1070, 584, 1215);
        p.bezierCurveTo(570, 1336, 548, 1437, 錨.膝左.x, 錨.膝左.y);
        p.bezierCurveTo(432, 1558, 484, seat, 650, seat);
        p.bezierCurveTo(754, 1588, 842, 1584, 中, 1587);
        p.bezierCurveTo(958, 1584, 1046, 1588, 1150, seat);
        p.bezierCurveTo(1316, seat, 1368, 1558, 錨.膝右.x, 錨.膝右.y);
        p.bezierCurveTo(1252, 1437, 1230, 1336, 1216, 1215);
        p.bezierCurveTo(1198, 1070, 1174, 958, 1110, 918);
        p.bezierCurveTo(1052, 882, 994, 865, 953, 850);
        p.lineTo(847, 850); p.closePath();
      };
      鑿填(身形);
      鑿填(p => p.ellipse(中, 667, 131, 183, 0, 0, Math.PI * 2));
      鑿填(p => p.ellipse(中, 535, 72, 66, 0, 0, Math.PI * 2));
      鑿填(p => p.ellipse(785, 725, 27, 94, -.06, 0, Math.PI * 2));
      鑿填(p => p.ellipse(1015, 725, 27, 94, .06, 0, Math.PI * 2));

      // ── 厚重通肩身：外郭先立，衣褶乃體塊等高線 ────────────────────────
      描(筆.骨, 身形);
      // 粗頸與三道犍陀羅式頸紋
      貝([846, 792], [848, 825], [851, 851], [847, 876], 筆.骨);
      貝([954, 792], [952, 825], [949, 851], [953, 876], 筆.骨);
      for (const yy of [826, 845, 867]) 貝([852, yy], [878, yy + 9], [922, yy + 9], [948, yy], 筆.細);

      function U褶(xl, xr, y0, sag, gap = 8, w = 筆.衣) {
        for (const d of [0, gap]) 描(w, p => {
          p.moveTo(xl, y0 + d);
          p.bezierCurveTo(xl - 30, y0 + 28 + d, 中 - 122, y0 + sag - 6 + d, 中, y0 + sag + d);
          p.bezierCurveTo(中 + 122, y0 + sag - 6 + d, xr + 30, y0 + 28 + d, xr, y0 + d);
        });
      }
      // 衣領與九層懸鏈褶：上疏下密有變，每一道雙線示圓凸隆脊
      U褶(834, 966, 858, 30, 7, 筆.中);
      U褶(790, 1010, 888, 52, 7, 筆.衣);
      U褶(744, 1056, 920, 78, 8, 筆.衣);
      U褶(706, 1094, 958, 102, 8, 筆.衣);
      U褶(674, 1126, 1000, 126, 9, 筆.衣);
      U褶(652, 1148, 1048, 148, 9, 筆.衣);
      U褶(638, 1162, 1100, 169, 10, 筆.衣);
      U褶(640, 1160, 1158, 187, 10, 筆.衣);
      U褶(658, 1142, 1220, 202, 10, 筆.衣);
      U褶(684, 1116, 1286, 204, 10, 筆.衣);
      // 肩丘外讓與上臂短環褶，左右不作平面直套
      for (const 側 of [-1, 1]) {
        for (let k = 0; k < 6; k++) {
          const y0 = 980 + k * 45;
          const a = [中 + 側 * (222 + k * 7), y0];
          const d = [中 + 側 * (300 + k * 8), y0 + 39];
          貝(a, [a[0] + 側 * 48, y0 - 15], [d[0] - 側 * 22, y0 + 17], d, 筆.中);
          貝([a[0] + 側 * 4, a[1] + 8], [a[0] + 側 * 50, y0 - 6], [d[0] - 側 * 20, y0 + 27], [d[0], d[1] + 8], 筆.細);
        }
        // 軀側深直褶承 U 弧之出鋒
        for (let k = 0; k < 4; k++) {
          const xx = 中 + 側 * (274 + k * 18);
          貝([xx, 1275], [xx + 側 * 12, 1360], [xx + 側 * 20, 1440], [xx + 側 * 14, 1518], 筆.細);
        }
      }

      // 膝面扇形放射褶：由交足/臍下向兩厚膝展開，雙線一脊
      for (const 側 of [-1, 1]) {
        for (let k = 0; k < 8; k++) {
          const start = [中 + 側 * (20 + k * 8), 1362 + k * 8];
          const end = [中 + 側 * (165 + k * 36), 1586 - k * 2.5];
          for (const d of [0, 7]) 描(k < 2 ? 筆.中 : 筆.細, p => {
            p.moveTo(start[0] + 側 * d, start[1] + d * .3);
            p.bezierCurveTo(
              中 + 側 * (88 + k * 21 + d), 1440 + k * 5,
              end[0] - 側 * (62 - k * 3), 1530 - k * 2,
              end[0], end[1] + d
            );
          });
        }
        // 膝丘三道包體短弧
        for (let k = 0; k < 3; k++) {
          const sx = 中 + 側 * (268 + k * 28), sy = 1450 + k * 32;
          const ex = 中 + 側 * (405 - k * 12), ey = 1518 + k * 18;
          貝([sx, sy], [sx + 側 * 55, sy - 25], [ex - 側 * 26, ey - 12], [ex, ey], 筆.中);
          貝([sx + 側 * 5, sy + 8], [sx + 側 * 58, sy - 16], [ex - 側 * 23, ey - 3], [ex, ey + 8], 筆.細);
        }
      }
      // 中央垂尖衣片
      描(筆.衣, p => {
        p.moveTo(835, 1352); p.bezierCurveTo(856, 1430, 873, 1512, 中, 1587);
        p.bezierCurveTo(927, 1512, 944, 1430, 965, 1352);
      });
      for (const dx of [-36, -18, 18, 36]) 貝([中 + dx * .45, 1375], [中 + dx * .65, 1450], [中 + dx, 1515], [中 + dx * .22, 1572], 筆.細);

      // ── 前臂與手先鑿胸褶再落，避免透視露隱 ──────────────────────────────
      function 鑿前臂(側) {
        鑿填(p => {
          p.moveTo(中 + 側 * 292, 1250);
          p.bezierCurveTo(中 + 側 * 242, 1248, 中 + 側 * 156, 1210, 中 + 側 * 105, 1190);
          p.lineTo(中 + 側 * 75, 1252);
          p.bezierCurveTo(中 + 側 * 150, 1285, 中 + 側 * 244, 1338, 中 + 側 * 315, 1325);
          p.closePath();
        });
      }
      鑿前臂(-1); 鑿前臂(1);
      鑿填(p => p.ellipse(800, 1124, 82, 174, -.06, 0, Math.PI * 2));
      鑿填(p => p.ellipse(1000, 1146, 82, 174, .06, 0, Math.PI * 2));
      // 袖中前臂杆勢
      for (const 側 of [-1, 1]) {
        貝([中 + 側 * 307, 1322], [中 + 側 * 236, 1338], [中 + 側 * 151, 1278], [中 + 側 * 84, 1240], 筆.骨);
        貝([中 + 側 * 286, 1248], [中 + 側 * 224, 1245], [中 + 側 * 155, 1212], [中 + 側 * 78, 1203], 筆.骨);
        for (let k = 0; k < 4; k++) {
          const q = k / 3;
          const xx = 中 + 側 * (264 - q * 142), yy = 1267 - q * 36;
          貝([xx + 側 * 12, yy - 17], [xx, yy - 5], [xx - 側 * 22, yy + 8], [xx - 側 * 33, yy + 18], 筆.細);
          貝([xx + 側 * 9, yy - 10], [xx - 側 * 2, yy], [xx - 側 * 22, yy + 15], [xx - 側 * 35, yy + 25], 筆.微);
        }
      }

      const 手位 = Object.freeze({
        尊右: Object.freeze({ cx: 800, cy: 1122, m: 1, face: '掌' }),
        尊左: Object.freeze({ cx: 1000, cy: 1144, m: -1, face: '背' }),
      });
      守(手位.尊右.cx < 中 && 手位.尊左.cx > 中 && 手位.尊右.face === '掌' && 手位.尊左.face === '背', '破戒：轉法輪印左右面誤');
      for (const [名, h] of Object.entries(手位)) {
        const 拇根X = h.cx + h.m * 42;
        守(Math.abs(拇根X - 中) < Math.abs(h.cx - 中), `破戒：${名}拇不在內緣`);
      }

      function 轉法輪手({ cx, cy, m, face }) {
        x.save(); x.translate(cx, cy); x.scale(m, 1);
        // 掌郭分內外兩片，內緣為環讓路，故不橫掌
        描(筆.骨, p => {
          p.moveTo(-46, 82); p.bezierCurveTo(-60, 54, -62, 4, -50, -34);
          p.bezierCurveTo(-42, -57, -18, -64, 24, -48);
          p.bezierCurveTo(36, -42, 42, -22, 38, -3);
        });
        描(筆.骨, p => { p.moveTo(38, 48); p.bezierCurveTo(34, 69, 22, 84, 6, 90); p.lineTo(-46, 82); });
        // 三舒指，逐指有兩側與節，不作三根梳齒
        const 指目 = [
          { rx: -35, ry: -36, tx: -51, ty: -132, w: 15 },
          { rx: -9, ry: -50, tx: -14, ty: -158, w: 16 },
          { rx: 16, ry: -47, tx: 21, ty: -143, w: 14 },
        ];
        for (const f of 指目) {
          描(筆.衣, p => {
            p.moveTo(f.rx - f.w / 2, f.ry);
            p.bezierCurveTo(f.rx - f.w * .55, f.ry - 36, f.tx - f.w * .46, f.ty + 18, f.tx, f.ty);
            p.bezierCurveTo(f.tx + f.w * .46, f.ty + 18, f.rx + f.w * .55, f.ry - 36, f.rx + f.w / 2, f.ry);
          });
          for (const q of [.35, .62]) {
            const yy = f.ty + (f.ry - f.ty) * q;
            貝([f.tx - f.w * .42, yy], [f.tx - 3, yy + 4], [f.tx + 3, yy + 4], [f.tx + f.w * .42, yy], 筆.微);
          }
          if (face === '背') 描(筆.微, p => {
            p.moveTo(f.tx - f.w * .28, f.ty + 16);
            p.quadraticCurveTo(f.tx, f.ty + 7, f.tx + f.w * .28, f.ty + 16);
            p.lineTo(f.tx + f.w * .24, f.ty + 28);
            p.quadraticCurveTo(f.tx, f.ty + 32, f.tx - f.w * .24, f.ty + 28); p.closePath();
          });
        }
        // 頭指自內上緣回就環；拇自內下丘上迎，二者只在局部 +x 半掌
        貝([27, -44], [49, -37], [64, -22], [62, -8], 筆.衣);
        貝([37, -39], [58, -31], [73, -17], [70, -5], 筆.衣);
        貝([35, 51], [50, 51], [59, 46], [62, 42], 筆.衣);
        貝([44, 57], [60, 58], [72, 49], [70, 42], 筆.衣);
        橢(62, 17, 18, 25, 筆.衣);
        橢(62, 17, 9.5, 15.5, 筆.微);
        // 腕口與面相之別
        線([-44, 82], [-50, 113], 筆.骨); 線([7, 90], [10, 118], 筆.骨);
        貝([-42, 92], [-24, 102], [-6, 103], [9, 98], 筆.細);
        if (face === '掌') {
          貝([-42, 1], [-18, -9], [11, -6], [31, 2], 筆.細);
          貝([-38, 29], [-14, 14], [11, 17], [31, 29], 筆.細);
          貝([-29, 57], [-7, 44], [15, 45], [28, 54], 筆.微);
        } else {
          for (const xx of [-24, -2, 20]) 貝([xx, 65], [xx + 3, 33], [xx + 2, -4], [xx, -36], 筆.微);
          貝([-35, 54], [-8, 42], [17, 43], [33, 53], 筆.細);
        }
        x.restore();
      }
      轉法輪手(手位.尊右); 轉法輪手(手位.尊左);

      // ── 頭面最後落於身上：波狀束髮，不畫螺髮；本式無髭 ─────────────────
      const 髮形 = new Path2D();
      髮形.moveTo(792, 666);
      髮形.bezierCurveTo(785, 610, 810, 558, 849, 538);
      髮形.bezierCurveTo(842, 508, 863, 頂Y, 中, 頂Y);
      髮形.bezierCurveTo(937, 頂Y, 958, 508, 951, 538);
      髮形.bezierCurveTo(990, 558, 1015, 610, 1008, 666);
      髮形.bezierCurveTo(974, 640, 944, 623, 中, 616);
      髮形.bezierCurveTo(856, 623, 826, 640, 792, 666); 髮形.closePath();
      x.save(); x.globalCompositeOperation = 'source-over'; x.strokeStyle = 墨;
      x.lineWidth = 筆.骨; x.lineCap = 'round'; x.lineJoin = 'round'; x.stroke(髮形); x.restore();
      x.save(); x.clip(髮形);
      function 波列(y0, x0, x1, amp, period, phase = 0, w = 筆.細) {
        描(w, p => {
          for (let px = x0, first = true; px <= x1; px += 4) {
            const py = y0 + Math.sin((px - x0) / period * Math.PI * 2 + phase) * amp;
            if (first) { p.moveTo(px, py); first = false; } else p.lineTo(px, py);
          }
        });
      }
      for (let row = 0; row < 5; row++) {
        const y0 = 494 + row * 11;
        波列(y0, 852 - row * 3, 948 + row * 3, 3.5, 30, .18, 筆.細);
        波列(y0 + 4, 854 - row * 3, 946 + row * 3, 2.8, 30, .18, 筆.微);
      }
      for (let row = 0; row < 7; row++) {
        const y0 = 548 + row * 15;
        const half = 54 + row * 14;
        波列(y0, 中 - half, 中 + half, 3.8, 32, .24, 筆.細);
        波列(y0 + 4, 中 - half + 2, 中 + half - 2, 3.0, 32, .24, 筆.微);
      }
      x.restore();
      // 額心分束，明示波髮由中向兩側走
      for (const 側 of [-1, 1]) for (let k = 0; k < 4; k++) {
        貝([中 + 側 * (7 + k * 7), 615], [中 + 側 * (34 + k * 13), 621], [中 + 側 * (68 + k * 13), 635], [中 + 側 * (96 + k * 7), 654], 筆.細);
      }
      // 長耳與面郭；頦尖實落 Y(20)
      描(筆.骨, p => {
        p.moveTo(804, 644); p.bezierCurveTo(795, 694, 804, 762, 842, 794);
        p.bezierCurveTo(861, 807, 880, 錨.頦.y, 中, 錨.頦.y);
        p.bezierCurveTo(920, 錨.頦.y, 939, 807, 958, 794);
        p.bezierCurveTo(996, 762, 1005, 694, 996, 644);
      });
      for (const 側 of [-1, 1]) {
        const ex = 中 + 側 * 110;
        描(筆.骨, p => {
          p.moveTo(中 + 側 * 96, 671);
          p.bezierCurveTo(ex + 側 * 9, 653, ex + 側 * 14, 702, ex + 側 * 12, 741);
          p.bezierCurveTo(ex + 側 * 9, 786, ex - 側 * 2, 812, 中 + 側 * 91, 788);
        });
        貝([ex + 側 * 3, 687], [ex - 側 * 5, 714], [ex - 側 * 5, 764], [中 + 側 * 99, 787], 筆.細);
      }
      // 眉稜與半闔眼
      const eyeY = Y(14);
      for (const 側 of [-1, 1]) {
        const inner = 中 + 側 * u, outer = 中 + 側 * 5 * u;
        貝([inner, 錨.白毫.y + 4], [中 + 側 * 34, 錨.白毫.y - 8], [中 + 側 * 67, 錨.白毫.y - 2], [outer, 錨.白毫.y + 9], 筆.中);
        貝([inner, eyeY], [中 + 側 * 33, eyeY + 14], [中 + 側 * 61, eyeY + 12], [outer, eyeY + 1], 筆.中);
        貝([inner + 側 * 3, eyeY + 2], [中 + 側 * 34, eyeY - 5], [中 + 側 * 59, eyeY - 4], [outer - 側 * 2, eyeY + 1], 筆.細);
        圓(中 + 側 * 42, eyeY + 4, 2.3, 筆.微);
      }
      圓(錨.白毫.x, 錨.白毫.y, u * .48, 筆.中); 圓(錨.白毫.x, 錨.白毫.y, 2.2, 筆.微);
      // 長直鼻自眉稜一氣下行，翼窄而鼻柱正
      貝([中, 錨.白毫.y + 9], [中 - 3, 700], [中 - 5, 730], [中 - 10, Y(16)], 筆.中);
      貝([中 - 10, Y(16)], [中 - 4, Y(16) + 8], [中 + 5, Y(16) + 8], [中 + 15, Y(16) + 1], 筆.中);
      貝([中 - 19, Y(16) + 5], [中 - 14, Y(16) - 1], [中 - 10, Y(16) - 1], [中 - 7, Y(16) + 5], 筆.細);
      貝([中 + 19, Y(16) + 5], [中 + 14, Y(16) - 1], [中 + 10, Y(16) - 1], [中 + 7, Y(16) + 5], 筆.細);
      // 薄唇、無髭；口長四指，口縫在 17.5 指附近
      const mouthY = Y(17.5);
      貝([中 - 2 * u, mouthY], [中 - 15, mouthY - 5], [中 - 7, mouthY - 5], [中, mouthY], 筆.中);
      貝([中, mouthY], [中 + 7, mouthY - 5], [中 + 15, mouthY - 5], [中 + 2 * u, mouthY], 筆.中);
      貝([中 - 2 * u, mouthY], [中 - 14, mouthY + 9], [中 + 14, mouthY + 9], [中 + 2 * u, mouthY], 筆.細);
      貝([中 - 20, mouthY + 14], [中 - 7, mouthY + 22], [中 + 7, mouthY + 22], [中 + 20, mouthY + 14], 筆.微);

      // 座面前緣只在雙膝之外露筆；中段被衣覆，錨仍為實際座面 y
      線([390, seat], [錨.膝左.x - 8, seat], 5.0);
      線([錨.膝右.x + 8, seat], [1410, seat], 5.0);

      // 結構終證：圖層與細節數，防誤刪密化構件
      守(格.白毫 === 12 && 格.頦 === 20 && 格.臍 === 48 && 格.座面 === 68, '破戒：四錨終證失敗');
      守(手位.尊右.m === 1 && 手位.尊左.m === -1, '破戒：兩手局部 +x 未同指中線');

      const out = document.createElement('canvas'); out.width = W; out.height = H;
      const xo = out.getContext('2d'); xo.fillStyle = 地; xo.fillRect(0, 0, W, H); xo.drawImage(ink, 0, 0);
      return out.toDataURL('image/png');
    }),
  });
})().catch(e => { console.error(e); process.exit(1); });
