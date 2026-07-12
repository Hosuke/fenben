// 已退役候展原稿：留作舊輸出追溯；正式席改由景／尊／飾分層合成。
// 粉本線上博物館・席二——犍陀羅／斯瓦特餘脈・釋迦立像執衣角式
// （研究性復原／期段歸屬待核）
//
// 【頭註／製展牌素材】
// 參攷親見：
// - 參攷-local/風格館/犍陀羅/met-2014.188.jpg：立佛實物；取平行波髮、長面直鼻、
//   素圈頭光、厚肩粗頸、通肩衣之層疊 U 褶、衣下軀體及足下承座。
// - met-13.96.28.jpg：取菩提葉背冠、柱頭莨苕、廊柱與供養眾之淺浮雕層次。
// - met-13.96.24.jpg：取雙龕拱、分層柱礎、連續葉帶；met-1980.527.4.jpg 只校群像
//   位階尺度；met-2005.314.jpg 只校券石密度；met-2003.593.1.jpg 只校波髮束。
// - 完成度標尺：圖錄/風格館/尼瓦爾-精密二稿.png；末輪與六參攷並排目驗。
//
// 三條可目驗判準：
// 1. 立身由肩峰、胸丘、腰收、膝與踝讀出，衣褶如等高線繞體，不是直筒內填平行線。
// 2. 素圈頭光不施火焰；額髮為平行波束非螺珠；通肩 U 褶由胸腹轉為下裳縱褶。
// 3. 尊左手在畫面右執衣角，拇生身側、四指自外側收握；尊右施無畏手逐指三節、
//    掌丘可讀，兩手不以符號代之；雙足實踏有分層承座。
//
// 所據卷：docs/風格館總設計.md「犍陀羅室」及「對照筆記」；CLAUDE.md
// 「精度之的：當代犍陀羅之工」；docs/造像標準.md 九章。總設計明記犍陀羅室
// 「此室無專卷」；本地亦無畫風-犍陀羅.md。故「斯瓦特餘脈」作策展期段標識，
// 此幀不偽稱 met-2014.188 為斯瓦特原件；右手無畏姿採犍陀羅立佛通式，信級待核。
//
// 表法／景物：素圈頭光（佛光初形）・通肩大衣（僧伽梨）・尊左執衣角・無畏手・
// 雙足承座・三重支提券・楔形券石・bead-and-reel 帶・月桂／莨苕葉帶・科林斯槽柱・
// 菩提葉背冠・兩側供養浮雕・座下禮拜人與法輪花格。供養人只作龕式語彙，不定尊號。
//
// 返工實錄：
// - 輪一：1800×2500 機出，五錨與兩手手性 assert 全過；全幅見素圈、波髮、十一層
//   雙線 U 褶、下裳縱褶、槽柱與足座。目驗發現尊右掌被後鑿斷腕、尊左拳吞衣角入口，
//   雙足縮覽近鞋楦；二輪補腕兩側與腕紋、重接拳上拳下衣角，並補趾縫與足弓。
// - 輪二：補回尊右掌至前臂之腕兩側及三道腕紋，衣角在拳上、拳下各自重接；雙足
//   加趾縫、足弓與踝紋。重生後無畏掌不再懸浮，執衣角與足底承座縮覽均可讀。
// - 末輪：主線目驗指出四側供養人仍近圓頭梯形；遂逐一補顴頦、波髮、眉眼鼻唇耳、
//   頸肩肘轉、逐掌、胯腿足及 U／縱褶；座下兩圓頭占位直接刪去，改以有據花格。
//   再補菩提旁枝、葉脈花節及三座面花格、調三級線寬。chrome-headless-shell 合成
//   `/tmp/fenben-seats12-final-compare.png` 與 met-2014.188、13.96.24、尼瓦爾精密二稿
//   同幅；全身裁切、掌腕、拳衣角、趾與足底線皆親見。
//
// Assert：T1419 白毫12・頦20・心窩36・臍48・足底120 均由 dist/liangdu.js 讀值／
// 由縱剖誦戒後實落。尊右無畏掌在畫面左，拇根在掌之身側（畫面右）；尊左執衣角
// 掌在畫面右，拇根在身側（畫面左），指梢止於衣角外緣、不橫穿掌面。
//
// 對尼瓦爾卷完成度自評：末輪同幅並排已達正式陳列閾；主尊長衣具十一層雙線 U 脊、
// 下裳發散縱褶、兩袖轉折與衣角雙緣，四侍皆非占位；三重紋券、槽柱、旁枝與承座
// 自成多層。paubha 以卷草織紋取密，本幀以長衣隆脊與石構浮雕取密，不混其制。
// 畫幅縱 2500，重跑輸出穩定。

const { 合幀 } = require('../../tools/lib/幀具.cjs');

(async () => {
  await 合幀({
    出: '圖錄/風格館/犍陀羅-斯瓦特餘脈-候展稿-已退役.png',
    幀: page => page.evaluate(async () => {
      const { 錨點 } = await import('/dist/liangdu.js');
      const { 造線筆, 連珠橫, 菱花橫, 轉直 } = await import('/匠筆-codex/風格館/lib/白描幀具.js');

      const W = 1800, H = 2500;
      const 墨 = '#d9b66f', 地 = '#0c1124';
      const ink = document.createElement('canvas'); ink.width = W; ink.height = H;
      const x = ink.getContext('2d'); x.strokeStyle = 墨; x.fillStyle = 墨;
      x.lineCap = 'round'; x.lineJoin = 'round';
      const 中 = W / 2, 頂Y = 260, u = 15.5, Y = z => 頂Y + z * u;
      const M = 錨點();
      const 格 = Object.freeze({ 白毫: M.白毫, 頦: M.頦, 心窩: M.喉至心窩, 臍: M.心窩至臍, 足底: M.足踵 });
      const 錨 = Object.freeze({
        白毫: Object.freeze({ x: 中, y: Y(格.白毫) }),
        頦: Object.freeze({ x: 中, y: Y(格.頦) }),
        心窩: Object.freeze({ x: 中, y: Y(格.心窩) }),
        臍: Object.freeze({ x: 中, y: Y(格.臍) }),
        足底: Object.freeze({ x: 中, y: Y(格.足底) }),
      });
      const 守 = (真, 名, 細 = undefined) => {
        console.assert(真, 名, 細);
        if (!真) throw new Error(`${名}${細 ? `：${JSON.stringify(細)}` : ''}`);
      };
      for (const [名, z] of Object.entries({ 白毫: 12, 頦: 20, 心窩: 36, 臍: 48, 足底: 120 })) {
        守(格[名] === z, `破戒：T1419 ${名} 非 ${z}`, { 實: 格[名] });
        守(Math.abs((錨[名].y - 頂Y) / u - z) < 1e-9, `破戒：實落 ${名} 未中 ${z}`);
      }
      守(W === 1800 && H === 2500, '破戒：畫幅非 1800×2500');

      const 筆 = Object.freeze({ 骨: 7.9, 衣: 5.75, 中: 4.18, 細: 2.56, 微: 1.5 });
      const 共筆 = 造線筆(x, { 墨, 骨: 筆.骨, 衣: 筆.中, 鬚: 筆.微 });
      function 描(w, 落, alpha = 1) {
        x.save(); x.globalCompositeOperation = 'source-over'; x.strokeStyle = 墨; x.fillStyle = 墨;
        x.globalAlpha = alpha; x.lineWidth = w; x.lineCap = 'round'; x.lineJoin = 'round';
        x.beginPath(); 落(x); x.stroke(); x.restore();
      }
      function 鑿填(落) { x.save(); x.globalCompositeOperation = 'destination-out'; x.beginPath(); 落(x); x.fill(); x.restore(); }
      const 線 = (a, b, w = 筆.中, alpha = 1) => 共筆.線([a, b], w, false, alpha);
      const 貝 = (a, b, c, d, w = 筆.中, alpha = 1) => 共筆.貝(a, b, c, d, w, alpha);
      const 圓 = (cx, cy, r, w = 筆.中, alpha = 1) => 共筆.圓(cx, cy, r, w, alpha);
      const 橢 = (cx, cy, rx, ry, w = 筆.中, rot = 0, alpha = 1) => 共筆.橢(cx, cy, rx, ry, w, rot, alpha);
      const 方 = (l, t, r, b, w = 筆.中) => 描(w, p => p.rect(l, t, r - l, b - t));

      function 葉(cx, cy, len, wid, a = 0, w = 筆.細, 脈 = true) {
        x.save(); x.translate(cx, cy); x.rotate(a);
        描(w, p => { p.moveTo(0, -len / 2); p.bezierCurveTo(wid, -len * .26, wid * 1.05, len * .18, 0, len / 2); p.bezierCurveTo(-wid * 1.05, len * .18, -wid, -len * .26, 0, -len / 2); p.closePath(); });
        if (脈) {
          線([0, -len * .42], [0, len * .42], Math.max(.65, w * .56));
          for (const s of [-1, 1]) for (let k = 0; k < 3; k++) {
            const yy = -len * .18 + k * len * .18;
            線([0, yy], [s * wid * (.64 - k * .08), yy + len * .11], Math.max(.52, w * .42));
          }
        }
        x.restore();
      }
      function 花(cx, cy, r, n = 8, w = 筆.微) {
        圓(cx, cy, r * .18, w);
        for (let k = 0; k < n; k++) {
          const a = k * Math.PI * 2 / n; x.save(); x.translate(cx, cy); x.rotate(a);
          描(w, p => { p.moveTo(r * .22, 0); p.quadraticCurveTo(r * .66, -r * .25, r, 0); p.quadraticCurveTo(r * .66, r * .25, r * .22, 0); }); x.restore();
        }
      }
      function 波線(y, x0, x1, amp, period, phase = 0, w = 筆.細) {
        描(w, p => { let first = true; for (let px = x0; px <= x1; px += 4) { const py = y + Math.sin((px - x0) / period * Math.PI * 2 + phase) * amp; if (first) { p.moveTo(px, py); first = false; } else p.lineTo(px, py); } });
      }

      // 外框：共用 helper 實際負責珠帶與菱花帶；兩側以同筆旋轉復用。
      方(28, 28, W - 28, H - 28, 4.4); 方(46, 46, W - 46, H - 46, 筆.細);
      連珠橫(共筆, 58, W - 58, 70, { step: 27, r: 5.8, 寬: 筆.細 });
      連珠橫(共筆, 58, W - 58, H - 70, { step: 27, r: 5.8, 寬: 筆.細 });
      轉直(x, 58, H - 58, 70, (a, b, yy) => 連珠橫(共筆, a, b, yy, { step: 27, r: 5.8, 寬: 筆.細 }));
      轉直(x, 58, H - 58, W - 70, (a, b, yy) => 連珠橫(共筆, a, b, yy, { step: 27, r: 5.8, 寬: 筆.細 }));
      方(98, 98, W - 98, H - 98, 筆.中);
      菱花橫(共筆, 112, W - 112, 121, { step: 34, h: 11, 寬: 筆.微 });
      菱花橫(共筆, 112, W - 112, H - 121, { step: 34, h: 11, 寬: 筆.微 });
      for (let py = 156, k = 0; py < H - 150; py += 49, k++) {
        葉(121, py, 37, 12, Math.PI / 2 + (k % 2 ? .2 : -.2), 筆.微);
        葉(W - 121, py, 37, 12, -Math.PI / 2 + (k % 2 ? -.2 : .2), 筆.微);
      }
      方(151, 151, W - 151, H - 151, 2.7);

      // 三重券：外楔石、中珠梭、內葉帶。
      const 三貝 = (p0, p1, p2, p3, t) => { const q = 1 - t; return [q*q*q*p0[0] + 3*q*q*t*p1[0] + 3*q*t*t*p2[0] + t*t*t*p3[0], q*q*q*p0[1] + 3*q*q*t*p1[1] + 3*q*t*t*p2[1] + t*t*t*p3[1]]; };
      const 拱控 = (層, 側) => {
        const apex = 150 + 層 * 35, spring = 690, bx = 248 + 層 * 36;
        return [[中, apex], [中 + 側 * (170 - 層 * 4), apex + 34], [中 + 側 * (505 - 層 * 19), 393 + 層 * 11], [中 + 側 * (中 - bx), spring]];
      };
      const 拱點 = (層, 側, t) => 三貝(...拱控(層, 側), t);
      const 拱切 = (層, 側, t) => { const a = 拱點(層, 側, Math.max(0, t - .003)), b = 拱點(層, 側, Math.min(1, t + .003)); return Math.atan2(b[1] - a[1], b[0] - a[0]); };
      function 拱路(層, w) { for (const 側 of [-1, 1]) { const [a, b, c, d] = 拱控(層, 側); 描(w, p => { p.moveTo(...a); p.bezierCurveTo(...b, ...c, ...d); }); } }
      for (const [層, w] of [[0, 5], [1, 筆.中], [2, 筆.中], [3, 4]]) 拱路(層, w);
      for (const 側 of [-1, 1]) for (let t = .055; t < .985; t += .067) 線(拱點(0, 側, t), 拱點(1, 側, t), 筆.細);
      for (const 側 of [-1, 1]) for (let t = .045, k = 0; t < .985; t += .044, k++) {
        const a = 拱點(1, 側, t), b = 拱點(2, 側, t), px = (a[0] + b[0]) / 2, py = (a[1] + b[1]) / 2;
        if (k % 2) 橢(px, py, 4, 8, 筆.微, 拱切(1, 側, t)); else { 圓(px, py, 6.5, 筆.細); 圓(px, py, 2, 筆.微); }
      }
      for (const 側 of [-1, 1]) for (let t = .06; t < .985; t += .062) {
        const a = 拱點(2, 側, t), b = 拱點(3, 側, t), px = (a[0] + b[0]) / 2, py = (a[1] + b[1]) / 2;
        葉(px, py, 27, 8.5, 拱切(2, 側, t) + (側 < 0 ? Math.PI / 2 : -Math.PI / 2), 筆.微);
      }
      圓(中, 150, 8, 筆.細); 圓(中, 150, 2.2, 筆.微);

      // 背冠菩提葉與素圈頭光。
      for (const 側 of [-1, 1]) {
        貝([中 + 側 * 20, 758], [中 + 側 * 70, 600], [中 + 側 * 185, 420], [中 + 側 * 300, 330], 筆.中);
        for (let k = 0; k < 8; k++) {
          const cx = 中 + 側 * (52 + k * 49), cy = 590 - k * 34 + (k % 2) * 22;
          葉(cx, cy, 78 - k * 3, 25 - k, 側 * (.6 - k * .055), 筆.細);
        }
      }
      橢(中, 505, 250, 265, 4.4); 橢(中, 505, 235, 250, 筆.細);

      // 背冠旁枝續落柱間，承 met-13.96.28 菩提葉冠之語彙；尊身稍後負形鑿開。
      for (const 側 of [-1, 1]) {
        for (let track = 0; track < 3; track++) {
          const bx = 中 + 側 * (370 + track * 46);
          貝([bx, 425 + track * 34], [bx + 側 * 35, 790], [bx - 側 * 34, 1320], [bx + 側 * 18, 1965], 筆.細, .92);
          貝([bx + 側 * 8, 434 + track * 34], [bx + 側 * 43, 790], [bx - 側 * 26, 1320], [bx + 側 * 26, 1962], 筆.微, .78);
          for (let k = 0; k < 26; k++) {
            const py = 495 + k * 57, dir = (k + track) % 2 ? 1 : -1;
            const px = bx + 側 * (Math.sin(k * .71 + track) * 17 + dir * 12);
            葉(px + 側 * dir * 20, py, 43 - (k % 3) * 4, 13 - (k % 2), 側 * (dir > 0 ? .78 : -.78), 筆.微);
            if ((k + track) % 6 === 0) 花(px - 側 * dir * 20, py + 12, 8, 6, .75);
          }
        }
      }

      function 莨苕(cx, cy, s) {
        x.save(); x.translate(cx, cy); x.scale(s, s);
        描(筆.細 / s, p => { p.moveTo(-17, 17); p.bezierCurveTo(-22, 0, -12, -25, 0, -37); p.bezierCurveTo(12, -25, 22, 0, 17, 17); p.bezierCurveTo(8, 5, -8, 5, -17, 17); });
        線([0, 12], [0, -30], 筆.微 / s); x.restore();
      }
      function 柱(cx) {
        const top = 650, shaft = 780, bottom = 2230;
        for (const [yy, half, w] of [[634, 132, 4.5], [650, 143, 筆.中], [670, 118, 筆.細], [754, 94, 筆.中], [780, 78, 4]]) 線([cx - half, yy], [cx + half, yy], w);
        for (const s of [-1, 1]) { 描(筆.中, p => p.arc(cx + s * 88, 685, 24, 0, Math.PI * 1.75)); 描(筆.細, p => p.arc(cx + s * 88, 685, 11, 0, Math.PI * 1.8)); }
        for (let k = 0; k < 8; k++) 莨苕(cx - 79 + k * 22.5, 746, .74);
        for (let k = 0; k < 7; k++) 莨苕(cx - 68 + k * 22.6, 713, .62);
        線([cx - 72, shaft], [cx - 72, bottom], 4.5); 線([cx + 72, shaft], [cx + 72, bottom], 4.5);
        for (let k = -5; k <= 5; k++) {
          const xx = cx + k * 11.7;
          描(筆.細, p => { p.moveTo(xx, shaft + 22); p.quadraticCurveTo(xx - 5, shaft + 35, xx, shaft + 48); p.lineTo(xx, bottom - 34); p.quadraticCurveTo(xx + 5, bottom - 21, xx, bottom - 9); });
          線([xx - 3.5, shaft + 52], [xx - 3.5, bottom - 40], 筆.微, .72);
        }
        for (const yy of [810, 832, bottom - 54, bottom - 29, bottom]) 線([cx - 82, yy], [cx + 82, yy], yy === bottom ? 4.4 : 筆.細);
        for (const [yy, half, w] of [[2250, 95, 筆.中], [2275, 114, 筆.中], [2302, 132, 4.5], [2328, 143, 筆.中]]) 線([cx - half, yy], [cx + half, yy], w);
        for (let k = -5; k <= 5; k++) 葉(cx + k * 22, 2290, 25, 8, Math.PI, 筆.微, false);
      }
      柱(255); 柱(W - 255);

      // 兩側供養浮雕置於尊後，頭光相切而體量遞降。
      function 供養(側, cy, s = 1) {
        const cx = 中 + 側 * 485, sy = s;
        橢(cx, cy - 118 * sy, 57 * sy, 70 * sy, 筆.細);
        // 顴頦面、波髮、耳與五官。
        描(筆.中, p => {
          p.moveTo(cx - 35 * sy, cy - 149 * sy);
          p.bezierCurveTo(cx - 42 * sy, cy - 122 * sy, cx - 34 * sy, cy - 90 * sy, cx - 15 * sy, cy - 74 * sy);
          p.bezierCurveTo(cx - 6 * sy, cy - 67 * sy, cx - 3 * sy, cy - 64 * sy, cx, cy - 64 * sy);
          p.bezierCurveTo(cx + 3 * sy, cy - 64 * sy, cx + 6 * sy, cy - 67 * sy, cx + 15 * sy, cy - 74 * sy);
          p.bezierCurveTo(cx + 34 * sy, cy - 90 * sy, cx + 42 * sy, cy - 122 * sy, cx + 35 * sy, cy - 149 * sy);
        });
        for (let k = 0; k < 4; k++) 貝([cx - (34 - k * 3) * sy, cy - (154 - k * 9) * sy], [cx - 15 * sy, cy - (165 - k * 9) * sy], [cx + 15 * sy, cy - (165 - k * 9) * sy], [cx + (34 - k * 3) * sy, cy - (154 - k * 9) * sy], 筆.微);
        for (const h of [-1, 1]) {
          貝([cx + h * 5 * sy, cy - 124 * sy], [cx + h * 13 * sy, cy - 130 * sy], [cx + h * 24 * sy, cy - 129 * sy], [cx + h * 29 * sy, cy - 124 * sy], 筆.微);
          貝([cx + h * 5 * sy, cy - 115 * sy], [cx + h * 14 * sy, cy - 110 * sy], [cx + h * 23 * sy, cy - 111 * sy], [cx + h * 29 * sy, cy - 115 * sy], 筆.微);
          圓(cx + h * 18 * sy, cy - 114 * sy, 1.2 * sy, Math.max(.55, 筆.微 * sy));
          貝([cx + h * 36 * sy, cy - 130 * sy], [cx + h * 47 * sy, cy - 124 * sy], [cx + h * 45 * sy, cy - 98 * sy], [cx + h * 34 * sy, cy - 90 * sy], 筆.微);
        }
        貝([cx, cy - 120 * sy], [cx - 2 * sy, cy - 109 * sy], [cx - 3 * sy, cy - 101 * sy], [cx - 7 * sy, cy - 96 * sy], 筆.微);
        貝([cx - 13 * sy, cy - 86 * sy], [cx - 5 * sy, cy - 81 * sy], [cx + 5 * sy, cy - 81 * sy], [cx + 13 * sy, cy - 86 * sy], 筆.微);
        // 頸肩、肘、合掌、胯膝足均具轉折。
        線([cx - 17 * sy, cy - 64 * sy], [cx - 20 * sy, cy - 43 * sy], 筆.細); 線([cx + 17 * sy, cy - 64 * sy], [cx + 20 * sy, cy - 43 * sy], 筆.細);
        描(筆.中, p => {
          p.moveTo(cx - 20 * sy, cy - 43 * sy); p.bezierCurveTo(cx - 63 * sy, cy - 35 * sy, cx - 78 * sy, cy + 12 * sy, cx - 72 * sy, cy + 74 * sy);
          p.bezierCurveTo(cx - 66 * sy, cy + 122 * sy, cx - 53 * sy, cy + 160 * sy, cx - 42 * sy, cy + 193 * sy);
          p.lineTo(cx - 17 * sy, cy + 193 * sy); p.lineTo(cx, cy + 91 * sy); p.lineTo(cx + 17 * sy, cy + 193 * sy); p.lineTo(cx + 42 * sy, cy + 193 * sy);
          p.bezierCurveTo(cx + 53 * sy, cy + 160 * sy, cx + 66 * sy, cy + 122 * sy, cx + 72 * sy, cy + 74 * sy);
          p.bezierCurveTo(cx + 78 * sy, cy + 12 * sy, cx + 63 * sy, cy - 35 * sy, cx + 20 * sy, cy - 43 * sy);
        });
        for (const h of [-1, 1]) {
          貝([cx + h * 50 * sy, cy - 20 * sy], [cx + h * 72 * sy, cy + 7 * sy], [cx + h * 60 * sy, cy + 39 * sy], [cx + h * 30 * sy, cy + 56 * sy], 筆.細);
          貝([cx + h * 58 * sy, cy - 9 * sy], [cx + h * 65 * sy, cy + 13 * sy], [cx + h * 52 * sy, cy + 34 * sy], [cx + h * 26 * sy, cy + 47 * sy], 筆.微);
          描(筆.細, p => {
            p.moveTo(cx + h * 4 * sy, cy + 55 * sy); p.lineTo(cx + h * 9 * sy, cy + 4 * sy);
            p.bezierCurveTo(cx + h * 11 * sy, cy - 10 * sy, cx + h * 23 * sy, cy - 11 * sy, cx + h * 25 * sy, cy + 3 * sy);
            p.lineTo(cx + h * 25 * sy, cy + 45 * sy); p.lineTo(cx + h * 8 * sy, cy + 60 * sy);
          });
          for (const q of [14, 27, 40]) 線([cx + h * 9 * sy, cy + q * sy], [cx + h * 23 * sy, cy + (q - 1) * sy], Math.max(.5, 筆.微 * sy));
          貝([cx + h * 17 * sy, cy + 193 * sy], [cx + h * 25 * sy, cy + 202 * sy], [cx + h * 45 * sy, cy + 207 * sy], [cx + h * 57 * sy, cy + 202 * sy], 筆.細);
          貝([cx + h * 57 * sy, cy + 202 * sy], [cx + h * 53 * sy, cy + 211 * sy], [cx + h * 30 * sy, cy + 213 * sy], [cx + h * 17 * sy, cy + 207 * sy], 筆.微);
        }
        for (let k = 0; k < 4; k++) {
          const yy = cy + (8 + k * 28) * sy, half = (56 - k * 4) * sy;
          貝([cx - half, yy], [cx - half * .55, yy + 18 * sy], [cx + half * .55, yy + 18 * sy], [cx + half, yy], 筆.細);
        }
        for (const h of [-1, 1]) for (let k = 0; k < 3; k++) 貝([cx + h * (8 + k * 11) * sy, cy + 88 * sy], [cx + h * (11 + k * 14) * sy, cy + 124 * sy], [cx + h * (15 + k * 18) * sy, cy + 158 * sy], [cx + h * (18 + k * 20) * sy, cy + 191 * sy], 筆.微);
      }
      供養(-1, 1065, .83); 供養(1, 1090, .79); 供養(-1, 1515, .62); 供養(1, 1530, .60);

      // 足下承座先落後層；足底線即 120 指。
      const foot = 錨.足底.y;
      for (const [yy, l, r, w] of [[foot + 7, 420, 1380, 5], [foot + 34, 395, 1405, 筆.中], [foot + 63, 375, 1425, 4.2], [2295, 360, 1440, 4.4], [2322, 385, 1415, 筆.中]]) 線([l, yy], [r, yy], w);
      連珠橫(共筆, 410, 1390, foot + 49, { step: 26, r: 5.4, 寬: 筆.細 });
      方(400, foot + 82, 680, 2278, 筆.細); 方(680, foot + 82, 1120, 2278, 筆.細); 方(1120, foot + 82, 1400, 2278, 筆.細);
      for (const cx of [540, 1260]) {
        花(cx, foot + 156, 42, 10, 筆.細); 圓(cx, foot + 156, 59, 筆.微);
        for (const 側 of [-1, 1]) {
          貝([cx + 側 * 12, foot + 205], [cx + 側 * 42, foot + 187], [cx + 側 * 74, foot + 181], [cx + 側 * 100, foot + 166], 筆.微);
          for (let k = 0; k < 4; k++) 葉(cx + 側 * (36 + k * 20), foot + 191 - k * 7, 24, 8, 側 * .72, 筆.微);
        }
      }
      菱花橫(共筆, 410, 670, foot + 100, { step: 32, h: 8, 寬: 筆.微 });
      菱花橫(共筆, 1130, 1390, foot + 100, { step: 32, h: 8, 寬: 筆.微 });
      花(中, foot + 156, 48, 12, 筆.細); 圓(中, foot + 156, 66, 筆.微);

      // 主尊負形與衣身外郭；下緣至踝，雙足另鑿另落。
      const 身 = p => {
        p.moveTo(823, 602); p.bezierCurveTo(752, 615, 680, 645, 635, 712);
        p.bezierCurveTo(596, 770, 592, 900, 578, 1065);
        p.bezierCurveTo(564, 1250, 546, 1500, 520, 1775);
        p.bezierCurveTo(515, 1840, 550, 1905, 650, 1950);
        p.bezierCurveTo(742, 1988, 820, 1998, 中, 2002);
        p.bezierCurveTo(980, 1998, 1058, 1988, 1150, 1950);
        p.bezierCurveTo(1250, 1905, 1285, 1840, 1280, 1775);
        p.bezierCurveTo(1254, 1500, 1236, 1250, 1222, 1065);
        p.bezierCurveTo(1208, 900, 1204, 770, 1165, 712);
        p.bezierCurveTo(1120, 645, 1048, 615, 977, 602); p.closePath();
      };
      鑿填(身); 鑿填(p => p.ellipse(中, 500, 119, 150, 0, 0, Math.PI * 2));
      鑿填(p => p.ellipse(中, 333, 76, 70, 0, 0, Math.PI * 2));
      // 雙足負形。
      for (const 側 of [-1, 1]) 鑿填(p => p.ellipse(中 + 側 * 122, foot - 55, 124, 65, 0, 0, Math.PI * 2));
      描(筆.骨, 身);

      // 粗頸三紋與肩胸，衣下身勢先立。
      貝([830, 596], [834, 635], [838, 665], [834, 692], 筆.骨); 貝([970, 596], [966, 635], [962, 665], [966, 692], 筆.骨);
      for (const yy of [631, 651, 674]) 貝([840, yy], [870, yy + 8], [930, yy + 8], [960, yy], 筆.細);
      for (const 側 of [-1, 1]) {
        貝([中 + 側 * 15, 708], [中 + 側 * 70, 688], [中 + 側 * 145, 703], [中 + 側 * 205, 742], 筆.中);
        貝([中 + 側 * 20, 782], [中 + 側 * 82, 760], [中 + 側 * 158, 780], [中 + 側 * 210, 826], 筆.細);
        貝([中 + 側 * 18, 910], [中 + 側 * 74, 892], [中 + 側 * 148, 908], [中 + 側 * 205, 952], 筆.微);
      }
      橢(中, 錨.臍.y, 8, 5, 筆.微);

      function U褶(xl, xr, y0, sag, gap = 8, w = 筆.衣) {
        for (const d of [0, gap]) 貝([xl, y0 + d], [xl - 25, y0 + 28 + d], [中 - 112, y0 + sag - 5 + d], [中, y0 + sag + d], w);
        for (const d of [0, gap]) 貝([中, y0 + sag + d], [中 + 112, y0 + sag - 5 + d], [xr + 25, y0 + 28 + d], [xr, y0 + d], w);
      }
      U褶(835, 965, 690, 30, 7, 筆.中);
      U褶(790, 1010, 724, 50, 7); U褶(748, 1052, 762, 75, 8);
      U褶(710, 1090, 806, 98, 8); U褶(682, 1118, 856, 120, 9);
      U褶(660, 1140, 912, 143, 9); U褶(646, 1154, 974, 163, 10);
      U褶(642, 1158, 1042, 181, 10); U褶(650, 1150, 1116, 196, 10);
      U褶(666, 1134, 1196, 206, 10); U褶(690, 1110, 1282, 211, 10);

      // 下裳縱褶由腹胯發散，凸處疏、腿間密。
      for (const 側 of [-1, 1]) {
        for (let k = 0; k < 10; k++) {
          const sx = 中 + 側 * (30 + k * 18), sy = 1320 + k * 9;
          const ex = 中 + 側 * (92 + k * 33), ey = 1945 - k * 2;
          貝([sx, sy], [sx + 側 * 38, 1490 + k * 4], [ex - 側 * 22, 1780 + k * 3], [ex, ey], k < 3 ? 筆.衣 : 筆.細);
          貝([sx + 側 * 7, sy + 8], [sx + 側 * 45, 1498 + k * 4], [ex - 側 * 16, 1788 + k * 3], [ex + 側 * 6, ey + 5], 筆.微);
        }
        for (let k = 0; k < 7; k++) {
          const y0 = 820 + k * 58;
          const a = [中 + 側 * (222 + k * 6), y0], d = [中 + 側 * (298 + k * 9), y0 + 46];
          貝(a, [a[0] + 側 * 50, y0 - 12], [d[0] - 側 * 20, y0 + 22], d, 筆.中);
          貝([a[0] + 側 * 4, a[1] + 8], [a[0] + 側 * 52, y0 - 4], [d[0] - 側 * 17, y0 + 30], [d[0], d[1] + 8], 筆.微);
        }
      }
      // 衣角明確自尊左肩（畫面右）垂至左手與下緣。
      貝([1010, 642], [1080, 870], [1160, 1030], [1220, 1120], 筆.骨);
      貝([1022, 646], [1090, 862], [1170, 1018], [1231, 1115], 筆.細);
      貝([1220, 1120], [1248, 1390], [1255, 1670], [1190, 1935], 筆.骨);
      貝([1231, 1115], [1260, 1388], [1268, 1665], [1202, 1938], 筆.細);

      // 尊右無畏臂（畫面左）：肘轉、腕節，掌先鑿後落。
      鑿填(p => { p.moveTo(664, 720); p.bezierCurveTo(620, 770, 590, 870, 570, 970); p.bezierCurveTo(560, 1018, 548, 1038, 528, 1028); p.lineTo(486, 990); p.bezierCurveTo(520, 930, 540, 805, 598, 735); p.closePath(); });
      貝([662, 720], [620, 772], [590, 868], [570, 970], 筆.骨); 貝([598, 735], [540, 808], [520, 928], [486, 990], 筆.骨);
      for (let k = 0; k < 5; k++) 貝([610 - k * 16, 770 + k * 45], [588 - k * 17, 785 + k * 45], [560 - k * 15, 798 + k * 45], [538 - k * 10, 812 + k * 45], 筆.細);
      const 右手 = Object.freeze({ cx: 512, cy: 832, 掌心X: 512, 拇根X: 551 });
      守(右手.cx < 中 && 右手.拇根X > 右手.掌心X && 右手.拇根X < 中, '破戒：尊右無畏手拇根未在身側');
      鑿填(p => p.ellipse(右手.cx, 右手.cy, 82, 109, -.03, 0, Math.PI * 2));
      描(筆.骨, p => { p.moveTo(456, 884); p.bezierCurveTo(438, 846, 442, 785, 458, 746); p.bezierCurveTo(470, 718, 500, 710, 535, 728); p.bezierCurveTo(563, 743, 577, 783, 570, 830); p.bezierCurveTo(565, 874, 548, 914, 520, 932); p.bezierCurveTo(490, 943, 466, 924, 456, 884); });
      const fingers = [
        { rx: 463, tx: 455, top: 650, w: 13 }, { rx: 487, tx: 484, top: 626, w: 14 },
        { rx: 512, tx: 512, top: 620, w: 15 }, { rx: 537, tx: 540, top: 642, w: 13 },
      ];
      for (const f of fingers) {
        描(筆.衣, p => { p.moveTo(f.rx - f.w / 2, 756); p.bezierCurveTo(f.rx - f.w * .55, 716, f.tx - f.w * .45, f.top + 20, f.tx, f.top); p.bezierCurveTo(f.tx + f.w * .45, f.top + 20, f.rx + f.w * .55, 716, f.rx + f.w / 2, 756); });
        for (const q of [.38, .68]) { const yy = f.top + (756 - f.top) * q; 線([f.tx - f.w * .42, yy], [f.tx + f.w * .42, yy + 1], 筆.微); }
      }
      // 拇自身側（+x）向掌內彎，梢止於食指根，不橫掌。
      貝([552, 750], [582, 766], [585, 805], [560, 826], 筆.衣); 貝([560, 754], [576, 772], [576, 800], [558, 814], 筆.微);
      for (const xx of [474, 498, 522, 544]) 貝([xx, 858], [xx + 2, 836], [xx + 2, 812], [xx, 788], 筆.微);
      貝([463, 884], [490, 866], [532, 866], [556, 883], 筆.細);
      // 手掌負形曾斷去腕口，二輪重接至前臂，腕節不再懸浮。
      貝([466, 902], [472, 932], [480, 964], [486, 990], 筆.骨);
      貝([531, 918], [538, 948], [536, 990], [528, 1028], 筆.骨);
      for (const yy of [924, 942, 962]) 貝([474, yy], [489, yy + 6], [514, yy + 7], [532, yy + 2], 筆.細);

      // 尊左手執衣角（畫面右）：內側拇扣布，外四指捲握。
      const 左手 = Object.freeze({ cx: 1232, cy: 1138, 掌心X: 1232, 拇根X: 1198, 指側X: 1271 });
      守(左手.cx > 中 && 左手.拇根X < 左手.掌心X && 左手.指側X > 左手.掌心X, '破戒：尊左執衣角手 chirality 誤');
      鑿填(p => p.ellipse(左手.cx, 左手.cy, 76, 70, .05, 0, Math.PI * 2));
      描(筆.骨, p => { p.moveTo(1176, 1112); p.bezierCurveTo(1193, 1082, 1234, 1076, 1266, 1096); p.bezierCurveTo(1291, 1112, 1298, 1148, 1276, 1177); p.bezierCurveTo(1254, 1200, 1208, 1202, 1182, 1170); p.bezierCurveTo(1168, 1152, 1165, 1128, 1176, 1112); });
      貝([1192, 1110], [1172, 1128], [1180, 1154], [1208, 1158], 筆.衣);
      貝([1200, 1117], [1185, 1130], [1190, 1146], [1211, 1149], 筆.微);
      for (let k = 0; k < 4; k++) {
        const yy = 1096 + k * 17;
        貝([1252 + k * 3, yy], [1277 + k * 2, yy + 3], [1282 + k * 2, yy + 20], [1269 + k * 2, yy + 31], 筆.衣);
        線([1259 + k * 3, yy + 14], [1277 + k * 2, yy + 17], 筆.微);
      }
      貝([1195, 1170], [1215, 1187], [1251, 1190], [1274, 1174], 筆.細);
      // 被握衣角自拳下垂三層，端止於衣身，不穿掌。
      貝([1193, 1074], [1202, 1091], [1212, 1105], [1220, 1118], 筆.骨);
      貝([1205, 1070], [1213, 1088], [1223, 1102], [1231, 1115], 筆.細);
      for (let k = 0; k < 3; k++) 貝([1210 + k * 12, 1170], [1225 + k * 15, 1230], [1240 + k * 18, 1280], [1260 + k * 14, 1326], k === 0 ? 筆.衣 : 筆.細);

      // 雙足先鑿後畫：踝節、趺面、五趾，足底實落 120 指。
      for (const 側 of [-1, 1]) {
        const cx = 中 + 側 * 122;
        貝([cx - 側 * 50, 1932], [cx - 側 * 60, 1994], [cx - 側 * 68, 2050], [cx - 側 * 66, foot - 34], 筆.骨);
        貝([cx + 側 * 44, 1932], [cx + 側 * 54, 1994], [cx + 側 * 60, 2050], [cx + 側 * 58, foot - 36], 筆.骨);
        描(筆.骨, p => { p.moveTo(cx - 側 * 66, foot - 34); p.bezierCurveTo(cx - 側 * 43, foot - 58, cx + 側 * 22, foot - 55, cx + 側 * 80, foot - 28); p.bezierCurveTo(cx + 側 * 105, foot - 16, cx + 側 * 100, foot, cx + 側 * 74, foot); p.lineTo(cx - 側 * 63, foot); p.bezierCurveTo(cx - 側 * 72, foot - 8, cx - 側 * 72, foot - 22, cx - 側 * 66, foot - 34); });
        for (let k = 0; k < 5; k++) {
          const tx = cx + 側 * (35 + k * 15), ty = foot - 27 + k * 3;
          貝([tx - 側 * 8, ty], [tx - 側 * 2, ty - 10], [tx + 側 * 8, ty - 9], [tx + 側 * 13, ty], 筆.微);
          貝([tx + 側 * 4, ty + 2], [tx + 側 * 6, ty + 9], [tx + 側 * 5, foot - 8], [tx + 側 * 3, foot - 4], 筆.微);
        }
        for (const yy of [1968, 1988, 2011]) 貝([cx - 47, yy], [cx - 18, yy + 7], [cx + 18, yy + 7], [cx + 47, yy], 筆.細);
        貝([cx - 側 * 52, foot - 18], [cx - 側 * 20, foot - 31], [cx + 側 * 24, foot - 30], [cx + 側 * 54, foot - 17], 筆.細);
      }

      // 頭面與波髮最後；頦為單一圓弧實落。
      const 面 = p => { p.moveTo(808, 395); p.bezierCurveTo(796, 438, 807, 498, 839, 535); p.bezierCurveTo(858, 557, 880, 錨.頦.y, 中, 錨.頦.y); p.bezierCurveTo(920, 錨.頦.y, 942, 557, 961, 535); p.bezierCurveTo(993, 498, 1004, 438, 992, 395); };
      描(筆.骨, 面);
      描(筆.骨, p => { p.moveTo(800, 409); p.bezierCurveTo(783, 352, 812, 302, 850, 288); p.bezierCurveTo(850, 270, 866, 頂Y, 中, 頂Y); p.bezierCurveTo(934, 頂Y, 950, 270, 950, 288); p.bezierCurveTo(988, 302, 1017, 352, 1000, 409); });
      for (let row = 0; row < 5; row++) 波線(268 + row * 12, 856 - row * 3, 944 + row * 3, 3.1, 29, .3, row % 2 ? 筆.微 : 筆.細);
      for (let row = 0; row < 8; row++) { const half = 45 + row * 15; 波線(322 + row * 14, 中 - half, 中 + half, 3.5, 31, .23, row % 2 ? 筆.微 : 筆.細); }
      for (const 側 of [-1, 1]) {
        for (let k = 0; k < 5; k++) 貝([中 + 側 * (12 + k * 14), 390], [中 + 側 * (43 + k * 15), 397], [中 + 側 * (76 + k * 16), 413], [中 + 側 * (101 + k * 9), 438], k % 2 ? 筆.微 : 筆.細);
        const ex = 中 + 側 * 108;
        描(筆.骨, p => { p.moveTo(中 + 側 * 96, 425); p.bezierCurveTo(ex + 側 * 13, 410, ex + 側 * 14, 468, ex + 側 * 8, 516); p.bezierCurveTo(ex + 側 * 5, 550, ex - 側 * 2, 570, 中 + 側 * 90, 540); });
        貝([ex + 側 * 3, 440], [ex - 側 * 4, 466], [ex - 側 * 5, 510], [中 + 側 * 97, 535], 筆.細);
      }
      const eyeY = Y(14);
      for (const 側 of [-1, 1]) {
        const inner = 中 + 側 * u, outer = 中 + 側 * 5 * u;
        貝([inner, 錨.白毫.y + 5], [中 + 側 * 37, 錨.白毫.y - 7], [中 + 側 * 65, 錨.白毫.y - 1], [outer, 錨.白毫.y + 9], 筆.中);
        貝([inner, eyeY], [中 + 側 * 36, eyeY + 13], [中 + 側 * 62, eyeY + 12], [outer, eyeY + 1], 筆.中);
        貝([inner + 側 * 3, eyeY + 2], [中 + 側 * 36, eyeY - 4], [中 + 側 * 60, eyeY - 3], [outer - 側 * 2, eyeY + 1], 筆.微);
      }
      圓(錨.白毫.x, 錨.白毫.y, u * .46, 筆.中); 圓(錨.白毫.x, 錨.白毫.y, 2, 筆.微);
      貝([中, 錨.白毫.y + 10], [中 - 3, 492], [中 - 5, 520], [中 - 10, Y(16)], 筆.中);
      貝([中 - 10, Y(16)], [中 - 3, Y(16) + 8], [中 + 6, Y(16) + 8], [中 + 16, Y(16) + 2], 筆.中);
      const mouthY = Y(17.5);
      貝([中 - 2 * u, mouthY], [中 - 16, mouthY - 5], [中 - 8, mouthY - 5], [中, mouthY], 筆.中);
      貝([中, mouthY], [中 + 8, mouthY - 5], [中 + 16, mouthY - 5], [中 + 2 * u, mouthY], 筆.中);
      貝([中 - 2 * u, mouthY], [中 - 15, mouthY + 9], [中 + 15, mouthY + 9], [中 + 2 * u, mouthY], 筆.細);
      // 點睛殿後。
      for (const 側 of [-1, 1]) 圓(中 + 側 * 42, eyeY + 4, 2.2, 筆.微);

      守(格.白毫 === 12 && 格.頦 === 20 && 格.心窩 === 36 && 格.臍 === 48 && 格.足底 === 120, '破戒：立像五錨終證失敗');
      守(右手.拇根X > 右手.掌心X && 左手.拇根X < 左手.掌心X, '破戒：兩手 chirality 終證失敗');
      const out = document.createElement('canvas'); out.width = W; out.height = H;
      const xo = out.getContext('2d'); xo.fillStyle = 地; xo.fillRect(0, 0, W, H); xo.drawImage(ink, 0, 0);
      return out.toDataURL('image/png');
    }),
  });
})().catch(e => { console.error(e); process.exit(1); });
