// 雙塔藥師會正稿（先生 2026-07-14 裁：退役線復活為正本——「這一張其實畫得很好」）。
// 疏簡倚坐十五身（分層之制版）退居 -已退役 檔，其層檔（框飾層/尊身層）存卷不刪。
// 席 5・粉本線上博物館正式候展稿 —— 漢地・明水陸「藥師會水陸式」
//
// 頭註／說明牌素材（研究性復原／待核）：
// - 所據參攷檔名：met-65.29.2-yaoshi-fohui.jpg；commons-mogao172-amituo-jingtubian.jpg；
//   commons-mogao217-xifang-jingtubian.jpg；旁證 commons-dunhuang-juanhua-amituo-jingtu.jpg。
// - 目驗三判準：①中尊、日月大脅侍、十二神將肩肘交疊，頭光相切成堂；②諸天成對
//   列班、冠兵錯落，十五尊榜題逐一全系；③華蓋飛雲居上、共臺欄楯居中、雲腳與
//   樂供蓮池居下，帶帶有紋而不以孤尊加空景充數。
// - 所據卷：docs/考據/畫風-漢地.md「明・宮廷精工與水陸兩脈」；
//   docs/風格館總設計.md「漢地室」及對照筆記；儀軌只取 dist/yigui.js 現有字段。
// - 表法景物：大華蓋（覆護）、飛雲長帶（赴會）、列班雲腳（乘雲承足）、
//   日月二脅侍、十二神將、十五榜題、欄楯、琵琶／橫笛／笙／鼓樂供、蓮池水波。
// - 信級：藥師 h 字段及若干漢傳諸筆尚標待核，故本席明標「研究性復原／待核」；
//   不把敦煌淨土景物偽稱廣勝寺原壁原件，亦不臆造庫外尊容。
// - 返工實錄：輪一由既有精密稿重跑為本席、接入共用三等筆與蓮瓣／連珠，補六對
//   雲腳；輪二以 headless 全幀與局部檢裁切、遮擋、面手、榜題、線寬，十五尊俱未裁切、
//   神將之後線由日月大脅侍真遮；末輪作 `/tmp/fenben-seat5-final-compare.png`
//   與 Met 65.29.2 及尼瓦爾-精密二稿等高並排，榜題全系、雲腳、欄楯、四樂供與蓮池皆可讀。
// - T1419 anchors assert：主尊依坐像格白毫12・頦20・心窩36・臍48・座面68；
//   程序以同一 R/坐像 yT 逐錨換算並檢其嚴格遞增，數值不改。
// - chirality assert：尊像皆活渲庫中原筆，僅景物鏡像；藥師尊右（畫面左）施無畏、
//   尊左（畫面右）仰掌承藥壺，未以負縮放翻尊，拇側與執物關係不另造。
// - 對尼瓦爾卷完成度自評：以「眷屬交疊、帶帶有紋、餘地不空」三項對齊標竿；
//   水陸幅仍以等高列班與榜題成堂為畫派差別，不移植尼瓦爾獸拱。
// 戒：不改 src/zun/、src/baimiao.ts、src/yigui.ts、src/liangdu.ts 或 dist/；
// 十五尊皆由 dist/yigui.js 的現有 h 字段與 dist/baimiao.js 活渲。

const { 合幀 } = require('../../tools/lib/幀具.cjs');

(async () => {
  await 合幀({
    出: '圖錄/風格館/漢地-明水陸-候展稿.png',
    幀: page => page.evaluate(async () => {
      const { 依號 } = await import('/dist/yigui.js');
      const { 白描 } = await import('/dist/baimiao.js');
      const { 造線筆, 連珠橫, 蓮瓣橫 } = await import('/匠筆-codex/風格館/lib/白描幀具.js');

      const W = 2100, H = 2500;
      const 墨 = '#d8b36a', 地 = '#0d1124';
      const ink = document.createElement('canvas');
      ink.width = W; ink.height = H;
      const x = ink.getContext('2d');
      x.strokeStyle = 墨; x.fillStyle = 墨;
      x.lineCap = 'round'; x.lineJoin = 'round';
      const 共筆 = 造線筆(x, { 墨, 骨: 3.2, 衣: 1.55, 鬚: .72 });

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
        fn(); x.save(); x.translate(W, 0); x.scale(-1, 1); fn(); x.restore();
      };

      // ── 回紋欄界：方折螺線直角內收，上下帶承首稿而收進外框 ──────────────
      const 回紋橫 = (x0, x1, y, step = 52, flip = 1) => {
        線([[x0, y - 24], [x1, y - 24]], 1.15, false, .72);
        線([[x0, y + 24], [x1, y + 24]], 1.15, false, .72);
        for (let px = x0; px + step <= x1; px += step) {
          const s = flip;
          線([
            [px, y + s * 18], [px, y - s * 18], [px + 38, y - s * 18],
            [px + 38, y - s * 4], [px + 13, y - s * 4], [px + 13, y + s * 11],
            [px + step, y + s * 11],
          ], 2.05, false, .92);
        }
      };
      筆(3.5); x.strokeRect(50, 50, W - 100, H - 100);
      筆(1.4, .8); x.strokeRect(70, 70, W - 140, H - 140); x.globalAlpha = 1;
      回紋橫(112, W - 112, 116, 52, 1);
      回紋橫(112, W - 112, H - 116, 52, -1);
      線([[92, 160], [92, H - 160]], 1.3, false, .78);
      線([[W - 92, 160], [W - 92, H - 160]], 1.3, false, .78);
      // 回紋內緣細連珠：四邊一氣，不侵榜題與尊像。
      for (let px = 116; px <= W - 116; px += 12) {
        圓(px, 151, 2.8, 1.0, .68);
        圓(px, 151, .82, .62, .6);
        圓(px, H - 151, 2.8, 1.0, .68);
        圓(px, H - 151, .82, .62, .6);
      }
      for (let py = 168; py <= H - 168; py += 12) {
        圓(108, py, 2.8, 1.0, .68);
        圓(108, py, .82, .62, .6);
        圓(W - 108, py, 2.8, 1.0, .68);
        圓(W - 108, py, .82, .62, .6);
      }

      // ── 上段大華蓋：珠網、流蘇、左右披帶俱全；先落為後層 ────────────────
      const 華蓋 = () => {
        貝([700, 398], [778, 302], [1322, 302], [1400, 398], 3.2, .92);
        貝([718, 399], [840, 438], [1260, 438], [1382, 399], 1.3, .72);
        線([[700, 398], [1400, 398]], 2.7, false, .92);
        線([[724, 416], [1376, 416]], 1.1, false, .72);
        for (let px = 735; px <= 1365; px += 45) {
          二次([px - 20, 416], [px, 447], [px + 20, 416], 1.5, .82);
          二次([px - 12, 424], [px, 439], [px + 12, 424], .72, .62);
        }
        // 珠網再密一重：交錯網目與網結珠皆落於原蓋沿之下。
        for (let px = 742; px <= 1358; px += 28) {
          二次([px - 14, 414], [px - 7, 447], [px, 474], 1.12, .72);
          二次([px + 14, 414], [px + 7, 447], [px, 474], 1.12, .72);
          圓(px, 474, 3.1, .92, .72);
          二次([px - 12, 438], [px, 458], [px + 12, 438], .92, .64);
        }
        // 第二網層下舒兩目，仍屬同一重珠網，而非另起垂飾。
        for (let px = 756; px <= 1344; px += 28) {
          二次([px - 14, 474], [px - 7, 496], [px, 516], 1.02, .68);
          二次([px + 14, 474], [px + 7, 496], [px, 516], 1.02, .68);
          圓(px, 516, 2.7, .86, .68);
        }
        // 密網橫結與直貫珠線：同一新增網層內，四行錯位互鉤。
        for (let row = 0; row < 4; row++) {
          const yy = 446 + row * 22, off = row % 2 ? 14 : 0;
          for (let px = 728 + off; px <= 1344; px += 28) {
            二次([px, yy], [px + 14, yy + 9], [px + 28, yy], 1.02, .68);
            圓(px + 14, yy + 9, 2.35, .82, .66);
          }
        }
        for (let px = 735; px <= 1365; px += 18) {
          貝([px, 420], [px - 8, 449], [px + 8, 490], [px, 530], .96, .64);
          for (let py = 442; py <= 520; py += 19) 圓(px, py, 1.9, .76, .62);
        }
        for (const [px, len] of [[760, 92], [850, 132], [950, 158], [1050, 176], [1150, 158], [1250, 132], [1340, 92]]) {
          貝([px - 18, 418], [px - 14, 455], [px + 9, 472 + len * .35], [px, 418 + len], 1.05, .76);
          貝([px + 18, 418], [px + 14, 455], [px - 9, 472 + len * .35], [px, 418 + len], 1.05, .76);
          圓(px, 418 + len, 6.2, 1.15, .82);
          線([[px - 5, 430 + len], [px, 445 + len], [px + 5, 430 + len]], .85, false, .68);
        }
        // 長穗間錯短串，三珠一滴，與既有七長穗相間。
        for (const [px, len] of [[805, 74], [900, 92], [1000, 106], [1100, 106], [1200, 92], [1295, 74]]) {
          貝([px, 432], [px - 7, 452], [px + 7, 470 + len * .22], [px, 442 + len], 1.2, .74);
          貝([px + 5, 434], [px - 1, 453], [px + 12, 470 + len * .22], [px + 5, 440 + len], .76, .6);
          for (let py = 454; py < 432 + len; py += 13) 圓(px, py, 3.0, .92, .7);
          線([[px - 5, 446 + len], [px, 458 + len], [px + 5, 446 + len]], 1.0, false, .66);
        }
        圓(1050, 288, 13, 2.2, .9);
        貝([1036, 278], [1030, 250], [1043, 235], [1050, 215], 1.8, .88);
        貝([1064, 278], [1070, 250], [1057, 235], [1050, 215], 1.8, .88);
        線([[1050, 202], [1050, 184]], 1.5, false, .8);
        // 蓋頂寶珠焰：外焰、內舌與左右火珠俱足。
        貝([1036, 286], [1014, 266], [1024, 235], [1043, 218], 1.05, .72);
        貝([1064, 286], [1086, 266], [1076, 235], [1057, 218], 1.05, .72);
        貝([1043, 218], [1034, 204], [1043, 187], [1050, 174], .92, .7);
        貝([1057, 218], [1066, 204], [1057, 187], [1050, 174], .92, .7);
        貝([1045, 265], [1040, 248], [1047, 232], [1050, 222], .72, .62);
        貝([1055, 265], [1060, 248], [1053, 232], [1050, 222], .72, .62);
        圓(1020, 273, 3.1, .72, .62); 圓(1080, 273, 3.1, .72, .62);
        雙鏡(() => {
          貝([704, 398], [632, 420], [585, 472], [520, 500], 2.4, .84);
          貝([706, 414], [640, 442], [596, 488], [530, 521], 1.05, .66);
          貝([698, 405], [650, 425], [610, 456], [565, 480], 1.18, .66);
          貝([520, 500], [470, 522], [454, 565], [390, 582], 2.0, .8);
          貝([530, 521], [486, 548], [466, 580], [404, 600], .92, .62);
        });
      };
      華蓋();

      // ── 左右飛雲長帶各一：雲頭三渦、長帶二道，不臆造人首鳥身 ──────────
      const 飛雲左 = () => {
        for (const [cx, cy, r, flip] of [[250, 324, 48, 1], [320, 308, 62, -1], [402, 330, 50, 1]]) {
          筆(1.8, .78); x.beginPath();
          for (let k = 0; k <= 30; k++) {
            const t = k / 30, rr = r * (1 - .74 * t), a = flip * Math.PI * 2 * 1.18 * t;
            const px = cx + Math.cos(a) * rr, py = cy + Math.sin(a) * rr;
            if (k) x.lineTo(px, py); else x.moveTo(px, py);
          }
          x.stroke(); x.globalAlpha = 1;
          // 雲頭原渦之內再收一芯線。
          筆(1.18, .66); x.beginPath();
          for (let k = 0; k <= 26; k++) {
            const t = k / 26, rr = r * (.56 - .45 * t), a = flip * Math.PI * 2 * 1.12 * t;
            const px = cx + Math.cos(a) * rr, py = cy + Math.sin(a) * rr;
            if (k) x.lineTo(px, py); else x.moveTo(px, py);
          }
          x.stroke(); x.globalAlpha = 1;
        }
        貝([206, 350], [330, 392], [468, 365], [618, 303], 2.25, .82);
        貝([220, 368], [350, 416], [490, 386], [640, 320], 1.1, .66);
        // 副線遇前列尊身即斷隱，左右兩段仍與帶身平行。
        貝([212, 357], [255, 372], [292, 379], [326, 377], 1.2, .66);
        貝([512, 366], [555, 350], [592, 326], [626, 311], 1.2, .66);
        貝([226, 374], [262, 388], [296, 395], [326, 394], 1.08, .62);
        貝([520, 386], [566, 370], [610, 344], [646, 328], 1.08, .62);
        貝([618, 303], [704, 268], [755, 308], [810, 286], 2.2, .8);
        貝([640, 320], [715, 290], [762, 329], [822, 303], 1.0, .64);
        貝([625, 309], [705, 278], [756, 317], [815, 294], 1.16, .64);
        貝([646, 326], [718, 300], [765, 338], [827, 311], 1.06, .6);
        貝([352, 280], [440, 222], [520, 230], [572, 262], 1.6, .68);
        貝([368, 292], [445, 247], [514, 250], [558, 275], .82, .56);
        貝([359, 286], [441, 232], [518, 240], [566, 268], 1.12, .62);
        貝([374, 298], [447, 256], [511, 260], [553, 281], 1.02, .58);
        // 雲尾散出三小朵，各以雙卷相接。
        for (const [cx, cy, s] of [[154, 346, 1], [116, 320, .78], [170, 284, .66]]) {
          二次([cx - 22 * s, cy + 3 * s], [cx - 10 * s, cy - 18 * s], [cx + 4 * s, cy], 1.12, .66);
          二次([cx + 4 * s, cy], [cx + 17 * s, cy - 15 * s], [cx + 28 * s, cy + 2 * s], 1.12, .66);
          二次([cx - 18 * s, cy + 5 * s], [cx + 3 * s, cy + 16 * s], [cx + 25 * s, cy + 4 * s], 1.0, .6);
          圓(cx + 4 * s, cy + 1 * s, 2.7 * s, .92, .62);
        }
      };
      雙鏡(飛雲左);

      // ── 平臺前層的四樂供位：小蓮承琵琶、橫笛、笙、鼓，寧缺迦陵頻伽人鳥像 ──────
      const 小蓮 = (cx, base, s = 1) => {
        線([[cx - 58 * s, base], [cx + 58 * s, base]], 1.8, false, .82);
        for (let k = -2; k <= 2; k++) {
          const px = cx + k * 23 * s;
          貝([px - 21 * s, base], [px - 17 * s, base - 28 * s], [px - 7 * s, base - 40 * s], [px, base - 44 * s], 1.3, .78);
          貝([px, base - 44 * s], [px + 8 * s, base - 37 * s], [px + 18 * s, base - 22 * s], [px + 21 * s, base], 1.3, .78);
        }
        貝([cx - 62 * s, base + 4 * s], [cx - 40 * s, base + 29 * s], [cx + 40 * s, base + 29 * s], [cx + 62 * s, base + 4 * s], 1.55, .8);
      };
      const 琵琶 = (cx, base, s = 1) => {
        小蓮(cx, base, s);
        貝([cx, base - 47 * s], [cx - 42 * s, base - 70 * s], [cx - 45 * s, base - 126 * s], [cx - 14 * s, base - 145 * s], 1.8, .84);
        貝([cx - 14 * s, base - 145 * s], [cx - 5 * s, base - 157 * s], [cx + 5 * s, base - 157 * s], [cx + 14 * s, base - 145 * s], 1.8, .84);
        貝([cx + 14 * s, base - 145 * s], [cx + 45 * s, base - 126 * s], [cx + 42 * s, base - 70 * s], [cx, base - 47 * s], 1.8, .84);
        線([[cx, base - 150 * s], [cx + 12 * s, base - 238 * s]], 2.1, false, .84);
        線([[cx + 12 * s, base - 238 * s], [cx + 23 * s, base - 260 * s]], 1.5, false, .78);
        for (let q = -1; q <= 1; q++) 線([[cx + q * 5 * s, base - 55 * s], [cx + (10 + q * 4) * s, base - 235 * s]], .72, false, .62);
        for (let yy = base - 132 * s; yy < base - 69 * s; yy += 20 * s) 線([[cx - 31 * s, yy], [cx + 31 * s, yy]], .8, false, .6);
      };
      const 橫笛 = (cx, base, s = 1) => {
        小蓮(cx, base, s);
        線([[cx - 86 * s, base - 142 * s], [cx + 87 * s, base - 170 * s]], 3.0, false, .86);
        線([[cx - 84 * s, base - 133 * s], [cx + 89 * s, base - 161 * s]], 1.0, false, .64);
        for (let k = 0; k < 7; k++) 圓(cx - 50 * s + k * 22 * s, base - (145 + k * 3.55) * s, 3.2 * s, .8, .72);
        貝([cx - 94 * s, base - 153 * s], [cx - 110 * s, base - 170 * s], [cx - 113 * s, base - 188 * s], [cx - 104 * s, base - 199 * s], 1.2, .72);
      };
      const 笙 = (cx, base, s = 1) => {
        小蓮(cx, base, s);
        橢(cx, base - 91 * s, 48 * s, 38 * s, 1.8, 0, .82);
        線([[cx - 42 * s, base - 100 * s], [cx + 42 * s, base - 100 * s]], 1.0, false, .62);
        for (let k = -4; k <= 4; k++) {
          const top = base - (185 + (4 - Math.abs(k)) * 18) * s;
          線([[cx + k * 10 * s, base - 110 * s], [cx + k * 10 * s, top]], 1.7, false, .82);
          二次([cx + (k * 10 - 4) * s, top], [cx + k * 10 * s, top - 9 * s], [cx + (k * 10 + 4) * s, top], .8, .65);
        }
        貝([cx + 44 * s, base - 92 * s], [cx + 78 * s, base - 104 * s], [cx + 91 * s, base - 128 * s], [cx + 108 * s, base - 133 * s], 1.6, .78);
      };
      const 鼓 = (cx, base, s = 1) => {
        小蓮(cx, base, s);
        圓(cx, base - 145 * s, 57 * s, 2.2, .86);
        圓(cx, base - 145 * s, 47 * s, 1.0, .64);
        圓(cx, base - 145 * s, 8 * s, 1.0, .72);
        for (let k = 0; k < 12; k++) {
          const a = Math.PI * 2 * k / 12;
          圓(cx + Math.cos(a) * 42 * s, base - 145 * s + Math.sin(a) * 42 * s, 2.6 * s, .72, .62);
        }
        線([[cx - 60 * s, base - 84 * s], [cx - 78 * s, base - 38 * s]], 1.8, false, .78);
        線([[cx + 60 * s, base - 84 * s], [cx + 78 * s, base - 38 * s]], 1.8, false, .78);
        線([[cx - 86 * s, base - 38 * s], [cx + 86 * s, base - 38 * s]], 1.5, false, .76);
        線([[cx + 52 * s, base - 213 * s], [cx + 102 * s, base - 260 * s]], 1.6, false, .76);
        圓(cx + 105 * s, base - 263 * s, 5 * s, 1.0, .68);
      };
      琵琶(510, 1988, .86);
      橫笛(835, 1988, .9);
      笙(1265, 1988, .86);
      鼓(1585, 1988, .84);

      // ── 尊像遮擋法：後者先落，前像入場前只鑿去其皮肉、甲衣本位下的舊線 ────────
      const 復墨 = () => {
        x.globalCompositeOperation = 'source-over'; x.globalAlpha = 1;
        x.strokeStyle = 墨; x.fillStyle = 墨;
      };
      const 蔽立 = (cx, cy, R, kind = 'god') => {
        const att = kind === 'att';
        x.save(); x.globalCompositeOperation = 'destination-out'; x.fillStyle = '#000';
        x.beginPath();
        x.ellipse(cx, cy - (att ? .57 : .68) * R, (att ? .105 : .09) * R, (att ? .125 : .11) * R, 0, 0, Math.PI * 2);
        x.fill();
        x.beginPath();
        const top = cy - (att ? .43 : .54) * R, bot = cy + (att ? .82 : .56) * R;
        x.moveTo(cx - (att ? .20 : .18) * R, top);
        x.bezierCurveTo(cx - (att ? .29 : .25) * R, cy - .28 * R, cx - (att ? .24 : .20) * R, cy + .15 * R, cx - (att ? .19 : .15) * R, bot);
        x.lineTo(cx + (att ? .19 : .15) * R, bot);
        x.bezierCurveTo(cx + (att ? .24 : .20) * R, cy + .15 * R, cx + (att ? .29 : .25) * R, cy - .28 * R, cx + (att ? .20 : .18) * R, top);
        x.closePath(); x.fill();
        x.beginPath(); x.ellipse(cx, cy - .30 * R, (att ? .28 : .24) * R, (att ? .18 : .15) * R, 0, 0, Math.PI * 2); x.fill();
        x.restore(); 復墨();
      };
      const 蔽坐 = (cx, cy, R) => {
        x.save(); x.globalCompositeOperation = 'destination-out'; x.fillStyle = '#000';
        x.beginPath(); x.ellipse(cx, cy - .405 * R, .095 * R, .115 * R, 0, 0, Math.PI * 2); x.fill();
        x.beginPath(); x.moveTo(cx - .20 * R, cy - .28 * R);
        x.bezierCurveTo(cx - .30 * R, cy - .18 * R, cx - .29 * R, cy + .16 * R, cx - .39 * R, cy + .34 * R);
        x.bezierCurveTo(cx - .30 * R, cy + .47 * R, cx + .30 * R, cy + .47 * R, cx + .39 * R, cy + .34 * R);
        x.bezierCurveTo(cx + .29 * R, cy + .16 * R, cx + .30 * R, cy - .18 * R, cx + .20 * R, cy - .28 * R);
        x.closePath(); x.fill();
        x.beginPath(); x.ellipse(cx, cy + .32 * R, .38 * R, .18 * R, 0, 0, Math.PI * 2); x.fill();
        x.restore(); 復墨();
      };
      const 落次 = new Map();
      const 落尊 = (id, cx, cy, R, mask = null) => {
        if (!依號[id] || !依號[id].h) throw new Error(`缺尊鍵：${id}|h`);
        if (mask === 'god') 蔽立(cx, cy, R, 'god');
        if (mask === 'att') 蔽立(cx, cy, R, 'att');
        if (mask === 'main') 蔽坐(cx, cy, R);
        const c = document.createElement('canvas'); c.width = W; c.height = H;
        const q = c.getContext('2d'); q.translate(cx, cy);
        q.strokeStyle = 墨; q.fillStyle = 墨; q.lineCap = 'round'; q.lineJoin = 'round';
        白描(q, R, 依號[id].h, `${id}|h`);
        x.drawImage(c, 0, 0); 落次.set(id, (落次.get(id) || 0) + 1);
      };

      // 列班雲腳：每一左右對位皆自雲承足；先落後尊，足掌與衣甲仍居前層。
      const 雲腳 = (cx, cy, rr, flip = 1) => {
        筆(1.15, .62); x.beginPath(); x.moveTo(cx - rr, cy);
        for (let k = 0; k < 5; k++) {
          const px = cx - rr + k * rr * .4;
          x.bezierCurveTo(px + rr * .08, cy - rr * (.18 + .03 * (k % 2)),
            px + rr * .25, cy - rr * (.18 + .03 * ((k + 1) % 2)), px + rr * .4, cy);
        }
        x.stroke(); x.globalAlpha = 1;
        貝([cx - rr * .92, cy + 4], [cx - rr * .42, cy + rr * .23],
          [cx + rr * .34, cy + rr * .22], [cx + rr * .92, cy + 3], .85, .48);
        for (let k = -2; k <= 2; k++) {
          const ox = cx + k * rr * .28;
          筆(.78, .46); x.beginPath();
          for (let j = 0; j <= 18; j++) {
            const t = j / 18, rad = rr * .16 * (1 - .72 * t);
            const a = flip * Math.PI * 2 * 1.05 * t;
            const xx = ox + Math.cos(a) * rad, yy = cy - rr * .06 + Math.sin(a) * rad;
            if (j) x.lineTo(xx, yy); else x.moveTo(xx, yy);
          }
          x.stroke(); x.globalAlpha = 1;
          // 每卷內收一芯旋，隨本卷手向，不另添雲團。
          筆(1.02, .54); x.beginPath();
          for (let j = 0; j <= 16; j++) {
            const t = j / 16, rad = rr * (.03 - .02 * t);
            const a = flip * (.45 + Math.PI * 2 * 1.02 * t);
            const xx = ox + Math.cos(a) * rad, yy = cy - rr * .06 + Math.sin(a) * rad;
            if (j) x.lineTo(xx, yy); else x.moveTo(xx, yy);
          }
          x.stroke(); x.globalAlpha = 1;
        }
      };

      // 兩翼各六：鋸齒錯列、步距小於身長，頭光相切；下一尊鑿斷上一尊身線。
      const 左翼 = [
        ['indara', 432, 730, 360], ['haira', 552, 870, 370],
        ['makora', 442, 1010, 365], ['shindara', 568, 1150, 380],
        ['shotora', 460, 1298, 375], ['bikara', 595, 1450, 390],
      ];
      const 右翼 = [
        ['kubira', 1668, 742, 360], ['basara', 1548, 884, 370],
        ['mekira', 1658, 1024, 365], ['antera', 1532, 1166, 380],
        ['anira', 1640, 1312, 375], ['santera', 1505, 1462, 390],
      ];
      for (let i = 0; i < 6; i++) {
        const [lid, lx, ly, lr] = 左翼[i];
        const [rid, rx, ry, rr] = 右翼[i];
        雲腳(lx, ly + lr * .82, lr * .34, 1);
        雲腳(rx, ry + rr * .82, rr * .34, -1);
        落尊(lid, lx, ly, lr, i ? 'god' : null);
        落尊(rid, rx, ry, rr, i ? 'god' : null);
      }

      // 月光、日光放大貼侍，在神將之前；中尊最後落，尺度與遮擋定尊卑。
      落尊('gakko', 760, 1270, 510, 'att');
      落尊('nikko', 1340, 1270, 510, 'att');
      落尊('yakushi', 1050, 1232, 760, 'main');

      // ── 平臺欄楯：三橫、珠頭望柱、斜十字欄格；佛會全眾共據一橫臺 ────────
      const railL = 130, railR = W - 130, yTop = 1798, yMid = 1860, yBot = 1928;
      線([[railL, yTop], [railR, yTop]], 3.0, false, .94);
      線([[railL, yTop + 10], [railR, yTop + 10]], 1.0, false, .7);
      線([[railL, yMid], [railR, yMid]], 2.0, false, .86);
      線([[railL, yBot], [railR, yBot]], 3.0, false, .94);
      for (let px = railL + 20; px <= railR - 20; px += 88) {
        線([[px, yTop - 4], [px, yBot]], 1.75, false, .84);
        圓(px, yTop - 13, 8, 1.55, .86);
        線([[px - 5, yTop - 23], [px, yTop - 31], [px + 5, yTop - 23]], 1.2, false, .78);
        // 望柱珠頭下加頸環，收束柱頭與直材。
        橢(px, yTop - 3, 10, 3.2, 1.08, 0, .68);
        線([[px - 7, yTop + 2], [px + 7, yTop + 2]], .92, false, .62);
        線([[px, yMid], [Math.min(px + 88, railR), yBot]], 1.0, false, .68);
        線([[px, yBot], [Math.min(px + 88, railR), yMid]], 1.0, false, .68);
        // 斜十字格心作小菱點。
        const nx = Math.min(px + 88, railR), dx = (px + nx) / 2, dy = (yMid + yBot) / 2;
        for (const [ox, oy, s] of [[0, 0, 5], [-21, -17, 3.2], [21, -17, 3.2], [-21, 17, 3.2], [21, 17, 3.2]]) {
          線([[dx + ox, dy + oy - s], [dx + ox + s, dy + oy], [dx + ox, dy + oy + s], [dx + ox - s, dy + oy]], 1.08, true, .68);
          圓(dx + ox, dy + oy, s > 4 ? 1.8 : 1.2, .86, .64);
        }
      }
      // 三橫材木紋斷續，長短相間，不作通直第四橫。
      for (const [yy, shift] of [[yTop + 5, 0], [yMid + 5, 29], [yBot - 5, 11]]) {
        for (let px = railL + 12 + shift; px < railR - 18; px += 58) {
          貝([px, yy - 2.5], [px + 8, yy - 5], [px + 19, yy], [Math.min(px + 31, railR), yy - 2.5], .92, .56);
          貝([px + 5, yy + 2.5], [px + 14, yy], [px + 24, yy + 5], [Math.min(px + 39, railR), yy + 2.5], .82, .52);
          if ((px - shift) % 116 < 58) 圓(px + 43, yy, 2.5, .78, .52);
        }
      }
      // 台緣即舞樂供器所居之連續堂帶，方磚、覆蓮、連珠層層相套。
      for (const yy of [1944, 1962, 2058, 2078]) 線([[150, yy], [W - 150, yy]], yy === 1944 || yy === 2078 ? 2.6 : 1.15, false, .86);
      for (let px = 166; px < W - 166; px += 72) {
        線([[px, 1962], [px + 36, 1945], [px + 72, 1962]], 1.05, false, .66);
      }
      連珠橫(共筆, 166, W - 166, 2068, { step: 72, r: 3.2, 寬: .72, 套心: false });
      蓮瓣橫(共筆, 175, W - 175, 2078, { step: 46, h: 52, 寬: 1.0, 覆: false });
      共筆.復();

      // ── 蓮池前帶：水波、荷葉、開蓮接滿下段，不留首稿的大片空紙 ──────────
      x.save(); x.beginPath(); x.rect(108, 2092, W - 216, 256); x.clip();
      for (let row = 0; row < 6; row++) {
        const yy = 2110 + row * 42, off = row % 2 ? 24 : 0;
        for (let px = 125 + off; px < W - 125; px += 96) {
          貝([px, yy], [px + 20, yy - 10], [px + 40, yy - 10], [px + 55, yy], .9, .52);
          貝([px + 55, yy], [px + 70, yy + 10], [px + 84, yy + 10], [px + 96, yy], .9, .52);
        }
        // 原波帶間加一重錯位細波。
        const yy2 = yy + 19, off2 = row % 2 ? 0 : 34;
        for (let px = 105 + off2; px < W - 105; px += 78) {
          貝([px, yy2], [px + 15, yy2 - 7], [px + 29, yy2 - 7], [px + 42, yy2], 1.18, .6);
          貝([px + 42, yy2], [px + 53, yy2 + 7], [px + 66, yy2 + 7], [px + 78, yy2], 1.18, .6);
          // 細副波上下夾行，使「一重」成可讀之水波帶。
          貝([px, yy2 - 4], [px + 15, yy2 - 11], [px + 29, yy2 - 11], [px + 42, yy2 - 4], 1.2, .52);
          貝([px + 42, yy2 - 4], [px + 53, yy2 + 3], [px + 66, yy2 + 3], [px + 78, yy2 - 4], 1.2, .52);
          貝([px, yy2 + 4], [px + 15, yy2 - 3], [px + 29, yy2 - 3], [px + 42, yy2 + 4], 1.2, .52);
          貝([px + 42, yy2 + 4], [px + 53, yy2 + 11], [px + 66, yy2 + 11], [px + 78, yy2 + 4], 1.2, .52);
        }
      }
      const 蓮池花 = (cx, base, s = 1) => {
        貝([cx, base], [cx - 4 * s, base - 38 * s], [cx + 5 * s, base - 65 * s], [cx, base - 93 * s], 1.15, .72);
        for (let k = -2; k <= 2; k++) {
          const px = cx + k * 18 * s;
          貝([px - 20 * s, base - 92 * s], [px - 15 * s, base - 125 * s], [px - 7 * s, base - 140 * s], [px, base - 145 * s], 1.2, .75);
          貝([px, base - 145 * s], [px + 8 * s, base - 137 * s], [px + 16 * s, base - 117 * s], [px + 20 * s, base - 92 * s], 1.2, .75);
          // 開蓮每瓣內收一心線。
          貝([px - 10 * s, base - 96 * s], [px - 7 * s, base - 117 * s], [px - 3 * s, base - 132 * s], [px, base - 139 * s], 1.0, .62);
          貝([px, base - 139 * s], [px + 4 * s, base - 131 * s], [px + 8 * s, base - 113 * s], [px + 10 * s, base - 96 * s], 1.0, .62);
        }
        橢(cx - 58 * s, base - 42 * s, 48 * s, 18 * s, 1.0, -.12, .58);
        橢(cx + 58 * s, base - 30 * s, 48 * s, 18 * s, 1.0, .12, .58);
        // 荷葉由葉臍放射脈線，止於葉緣。
        for (const [lx, ly, rot] of [[cx - 58 * s, base - 42 * s, -.12], [cx + 58 * s, base - 30 * s, .12]]) {
          圓(lx, ly, 2.4 * s, .88, .62);
          for (let k = 0; k < 16; k++) {
            const a = k * Math.PI / 8;
            const dx = (48 * Math.cos(a) * Math.cos(rot) - 18 * Math.sin(a) * Math.sin(rot)) * s;
            const dy = (48 * Math.cos(a) * Math.sin(rot) + 18 * Math.sin(a) * Math.cos(rot)) * s;
            const ex = lx + dx, ey = ly + dy;
            二次([lx, ly], [(lx + ex) / 2, (ly + ey) / 2 - 2.5 * s], [ex, ey], .88, .58);
            const mx = lx + (ex - lx) * .58, my = ly + (ey - ly) * .58;
            線([[mx, my], [lx + (ex - lx) * .88, ey - 2.2 * s]], 1.0, false, .5);
            線([[mx, my], [lx + (ex - lx) * .82, ey + 2.2 * s]], 1.0, false, .5);
          }
        }
      };
      for (const [cx, base, s] of [[250, 2338, .72], [520, 2346, .9], [790, 2335, .72], [1050, 2346, 1.0], [1310, 2335, .72], [1580, 2346, .9], [1850, 2338, .72]]) 蓮池花(cx, base, s);
      // 波間固定散珠沫；兩列錯位，無 random。
      for (let row = 0; row < 5; row++) {
        const py = 2128 + row * 43, off = row % 2 ? 31 : 0;
        for (let px = 142 + off; px < W - 142; px += 30) {
          圓(px, py, row % 3 === 0 ? 3.1 : 2.35, 1.2, .58);
          if ((px + row) % 60 < 30) 圓(px + 10, py - 7, 1.75, 1.0, .52);
          if ((px + row) % 90 < 30) 圓(px - 8, py + 7, 1.45, .92, .5);
        }
      }
      x.restore(); 復墨();

      // ── 榜題成堂：十五尊一尊一牌；真鑿出小牌底，再以同一墨色書名 ───────────
      let 牌數 = 0;
      const 牌鍵 = new Set();
      const 題牌 = (cx, top, id, text, scale = 1) => {
        const ww = 40 * scale, hh = (text.length * 22 + 25) * scale;
        x.save(); x.globalCompositeOperation = 'destination-out'; x.fillStyle = '#000';
        x.fillRect(cx - ww / 2 - 5, top - 20 * scale, ww + 10, hh + 28 * scale); x.restore(); 復墨();
        線([[cx - ww / 2, top], [cx - ww / 2, top + hh], [cx + ww / 2, top + hh], [cx + ww / 2, top]], 1.35, false, .9);
        貝([cx - ww / 2, top], [cx - ww * .72, top - 17 * scale], [cx - ww * .12, top - 23 * scale], [cx, top - 6 * scale], 1.15, .82);
        貝([cx, top - 6 * scale], [cx + ww * .12, top - 23 * scale], [cx + ww * .72, top - 17 * scale], [cx + ww / 2, top], 1.15, .82);
        圓(cx, top - 7 * scale, 2.6 * scale, .75, .72);
        x.save(); x.fillStyle = 墨; x.globalAlpha = .9; x.textAlign = 'center'; x.textBaseline = 'middle';
        x.font = `${Math.round(17 * scale)}px "Songti TC", "STSong", serif`;
        [...text].forEach((ch, i) => x.fillText(ch, cx, top + (18 + i * 21.2) * scale));
        x.restore(); 復墨(); 牌數++; 牌鍵.add(id);
      };
      const 左牌 = [
        ['indara', 142, 530, '因達羅'], ['haira', 142, 680, '波夷羅'], ['makora', 142, 810, '摩虎羅'],
        ['shindara', 142, 970, '真達羅'], ['shotora', 142, 1118, '招杜羅'], ['bikara', 142, 1290, '毘羯羅'],
      ];
      const 右牌 = [
        ['kubira', 1958, 540, '宮毘羅'], ['basara', 1958, 692, '伐折羅'], ['mekira', 1958, 824, '迷企羅'],
        ['antera', 1958, 982, '安底羅'], ['anira', 1958, 1132, '頞儞羅'], ['santera', 1958, 1302, '珊底羅'],
      ];
      for (const [id, px, py, t] of [...左牌, ...右牌]) 題牌(px, py, id, t, .92);
      題牌(690, 650, 'gakko', '月光', 1.05);
      題牌(1410, 650, 'nikko', '日光', 1.05);
      題牌(1178, 598, 'yakushi', '藥師佛', 1.08);

      // 結構自證：可由一次機出獲知尊數、牌數、三段及尺寸之律未破。
      const allIds = [...左翼, ...右翼].map(v => v[0]).concat(['gakko', 'nikko', 'yakushi']);
      if (W !== 2100 || H !== 2500) throw new Error('破戒：精密二稿非 2100×2500');
      if (allIds.length !== 15 || new Set(allIds).size !== 15) throw new Error('破戒：十五尊數或尊鍵重複');
      if (落次.size !== 15 || [...落次.values()].some(n => n !== 1)) throw new Error('破戒：實際落尊非十五尊各一次');
      if (牌數 !== 15 || 牌鍵.size !== 15 || allIds.some(id => !牌鍵.has(id))) throw new Error(`破戒：榜題未與十五尊逐鍵對應（${牌數}）`);
      if (!(760 < 1050 && 1340 > 1050 && 510 > 390 && 760 > 510)) throw new Error('破戒：月日左右或尺度級次有誤');
      const 錨指 = [12, 20, 36, 48, 68];
      const 主R = 760, 主cy = 1232;
      const 錨像素 = 錨指.map(z => 主cy - 主R * .565 + z * 主R * .0145);
      if (錨指.join(',') !== '12,20,36,48,68' || 錨像素.some((v, i) => i && v <= 錨像素[i - 1]))
        throw new Error('破戒：T1419 坐像錨失序');
      const 主尊手 = { 尊右: '畫面左施無畏', 尊左: '畫面右仰掌承藥壺', 尊像鏡像: false };
      if (主尊手.尊像鏡像 || !主尊手.尊右.includes('畫面左') || !主尊手.尊左.includes('畫面右'))
        throw new Error('破戒：藥師手向／chirality');

      const out = document.createElement('canvas'); out.width = W; out.height = H;
      const o = out.getContext('2d'); o.fillStyle = 地; o.fillRect(0, 0, W, H); o.drawImage(ink, 0, 0);
      return out.toDataURL('image/png');
    }),
  });
})().catch(e => { console.error(e); process.exit(1); });
