// 席 10・粉本線上博物館正式候展稿 —— 東密・唐請來原本期
// 金剛薩埵「五部心観式一葉」
//
// 頭註／說明牌素材（研究性復原；梵書待核）：
// - 所據參攷檔名：met-1975.268.3-kongokai-zuzo-1083.jpg（白描尊像卷）；
//   cleveland-1987.39-ninnokyo-zuzo.jpg（淡界格與群像図像）；commons-kongokai-
//   denshingonin.jpg（多重界道之密）；met-26.118ab-dainichi-nyorai.jpg（蓮座與衣紋旁證）。
// - 目驗三判準：①無肥瘦鐵線、上瞼獨重，尊像居大格而紙素無山水；②尊像／梵號
//   種子位／印相手／三昧耶形以細界線成一葉，主從線差三級；③截金卐繫只縮入
//   條帛衣緣，外欄用連珠與杵帶，精在衣而不以重框代畫。
// - 所據卷：docs/考據/畫風-日本.md「五部心観（園城寺）」及「線質與開臉」；
//   docs/風格館總設計.md「東密室」；尊相只取 dist/yigui.js fugen.k 已核字段
//   （SAT図像抄 図像部巻1 p.1053、Met 44845 一系旁證）。
// - 表法景物：金剛薩埵尊像、月輪與頭光、五佛寶冠、五鈷杵／五鈷鈴、蓮華座；
//   梵號種子位空圈（語密候核）、尊右執杵手與尊左執鈴手（身密別圖）、
//   立杵橫杵三昧耶形、卐繫截金衣緣、連珠／菱花／小五鈷界道。
// - 信級：尊相與執杵鈴、三昧耶形沿庫內已核字段；梵字形未經本席另核，故空圈
//   不落字，明標「研究性復原／梵書待核」，不以假梵字充數。
// - 返工實錄：輪一落 1800×2500 一葉，主尊、空圈、雙手印相與三昧耶形俱成；
//   全幀親見右下三昧耶形之大圓穿上欄、越右外框且被裁，雙手別圖亦偏小。
// - 輪二：三昧耶形 R 由 560 收至 360，器形與兩重圓完整入右下格，雙手別圖放大；
//   再檢杵鈴左右、拇側、空圈未落字及主從線寬。末輪作 `/tmp/fenben-seat10-final-compare.png`
//   與 Met 44845 白描圖巻、Cleveland 1987.39 及尼瓦爾-精密二稿等高並排；無越界、裁切或空圈奪主。
// - T1419 anchors assert：主尊坐像白毫12・頦20・心窩36・臍48・座面68；
//   程序依同一 R 與 yT=-0.565R 換算、逐錨嚴格遞增，數值不改。
// - chirality assert：尊右在畫面左斜執五鈷杵當胸，尊左在畫面右覆執五鈷鈴安股；
//   印相別圖仍按此左右橫列，尊像與手均未負縮放，拇側不橫穿掌面。
// - 對尼瓦爾卷完成度自評：同守帶帶有紋與細部可放大；本席依白描図像正法保留
//   有制素地，以衣緣、界道、手節、器形之密代替林木眷屬，非完成度不足。
// 戒：不改 src/zun/、src/baimiao.ts、src/yigui.ts、src/liangdu.ts 或 dist/；
// 主尊由 fugen|k 專筆活渲，印相手與三昧耶形皆調庫內已核部件。

const { 合幀 } = require('../../tools/lib/幀具.cjs');

(async () => {
  await 合幀({
    出: '圖錄/風格館/東密-唐請來原本期-候展稿.png',
    幀: page => page.evaluate(async () => {
      const { 依號 } = await import('/dist/yigui.js');
      const { 白描, 三昧耶白描 } = await import('/dist/baimiao.js');
      const { 執筆 } = await import('/dist/bi.js');
      const { 五鈷杵, 五鈷鈴, 執杵手, 執鈴手 } =
        await import('/dist/bujian/index.js');
      const { 造線筆, 連珠橫, 菱花橫, 卐繫橫, 蓮瓣橫 } =
        await import('/匠筆-codex/風格館/lib/白描幀具.js');

      const W = 1800, H = 2500;
      const 墨 = '#d8b36a', 地 = '#0d1124';
      const ink = document.createElement('canvas');
      ink.width = W; ink.height = H;
      const x = ink.getContext('2d');
      const p = 造線筆(x, { 墨, 骨: 3.1, 衣: 1.48, 鬚: .68 });
      const { 筆, 復, 線, 貝, 二次, 圓, 橢, 點 } = p;

      // ── 一葉郭與界道：細界線為骨，連珠、菱花、卐繫、小五鈷各守一帶 ─────
      筆(3.6); x.strokeRect(34, 34, W - 68, H - 68);
      筆(1.35, .82); x.strokeRect(52, 52, W - 104, H - 104); x.globalAlpha = 1;
      連珠橫(p, 64, W - 64, 78, { step: 25, r: 5.5, 寬: 1.1, 套心: true });
      連珠橫(p, 64, W - 64, H - 78, { step: 25, r: 5.5, 寬: 1.1, 套心: true });
      卐繫橫(p, 92, W - 92, 126, { cell: 28, h: 9, 寬: .9 });
      卐繫橫(p, 92, W - 92, H - 126, { cell: 28, h: 9, 寬: .9 });
      x.save(); x.translate(77, 166); x.rotate(Math.PI / 2);
      連珠橫(p, 0, H - 332, 0, { step: 25, r: 5, 寬: 1, 套心: true });
      x.restore(); 復();
      x.save(); x.translate(W - 77, 166); x.rotate(Math.PI / 2);
      連珠橫(p, 0, H - 332, 0, { step: 25, r: 5, 寬: 1, 套心: true });
      x.restore(); 復();

      const 小五鈷 = (cx, cy, s = 1, rot = 0, alpha = .86) => {
        x.save(); x.translate(cx, cy); x.rotate(rot);
        線([[-18 * s, 0], [18 * s, 0]], 1.15 * s, false, alpha);
        圓(0, 0, 3.2 * s, .8 * s, alpha);
        for (const d of [-1, 1]) {
          貝([d * 3 * s, 0], [d * 7 * s, -7 * s], [d * 13 * s, -8 * s],
            [d * 18 * s, 0], .9 * s, alpha);
          貝([d * 3 * s, 0], [d * 7 * s, 7 * s], [d * 13 * s, 8 * s],
            [d * 18 * s, 0], .9 * s, alpha);
          線([[d * 8 * s, -5 * s], [d * 8 * s, 5 * s]], .65 * s, false, alpha * .78);
        }
        x.restore(); 復();
      };
      線([[108, 170], [W - 108, 170]], 1.1, false, .7);
      線([[108, 226], [W - 108, 226]], 1.1, false, .7);
      for (let cx = 132; cx < W - 110; cx += 58) 小五鈷(cx, 198, .78, 0, .74);

      // ── 大格與下欄：Cleveland 図像之淡格只定位置，不以格代畫 ───────────
      const 主左 = 118, 主右 = 1682, 主頂 = 252, 主底 = 1592;
      線([[主左, 主頂], [主右, 主頂], [主右, 主底], [主左, 主底], [主左, 主頂]],
        1.55, false, .9);
      線([[1332, 主頂], [1332, 主底]], 1.1, false, .72);
      菱花橫(p, 138, 1310, 286, { step: 34, h: 8, 寬: .78 });
      for (let yy = 412; yy < 1550; yy += 150)
        線([[146, yy], [1304, yy]], .58, false, .18);
      for (let xx = 260; xx < 1300; xx += 170)
        線([[xx, 316], [xx, 1560]], .58, false, .14);

      // ── 主尊：庫內 fugen|k 活渲；不鏡翻、不另造手印 ───────────────────
      let 尊落 = 0;
      const 主cx = 760, 主cy = 965, 主R = 820;
      {
        const c = document.createElement('canvas'); c.width = W; c.height = H;
        const q = c.getContext('2d');
        q.translate(主cx, 主cy); q.strokeStyle = 墨; q.fillStyle = 墨;
        q.lineCap = 'round'; q.lineJoin = 'round';
        白描(q, 主R, 依號.fugen.k, 'fugen|k');
        x.drawImage(c, 0, 0); 尊落++;
      }

      // 截金卐繫只入兩段斜條帛，不越皮肉；細線讓於尊身骨線。
      const 截金斜帶 = (poly, ox, oy, len, angle) => {
        x.save(); x.beginPath(); x.moveTo(poly[0][0], poly[0][1]);
        for (let i = 1; i < poly.length; i++) x.lineTo(poly[i][0], poly[i][1]);
        x.closePath(); x.clip(); x.translate(ox, oy); x.rotate(angle);
        卐繫橫(p, 0, len, 0, { cell: 19, h: 4.5, 寬: .58 });
        x.restore(); 復();
      };
      截金斜帶([[878, 808], [907, 833], [792, 980], [761, 954]],
        764, 957, 210, -.87);
      截金斜帶([[710, 1000], [738, 1026], [655, 1120], [628, 1094]],
        631, 1097, 132, -.82);

      // 七寶繋ぎ縮入兩膝裙面：圓圓相交成四瓣眼，讓於掌、鈴與皮肉。
      const 七寶衣地 = (cx, cy, rx, ry) => {
        x.save(); x.beginPath(); x.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2); x.clip();
        for (let row = 0, yy = cy - ry; yy <= cy + ry; yy += 31, row++) {
          for (let xx = cx - rx + (row % 2) * 15.5; xx <= cx + rx; xx += 31) {
            圓(xx, yy, 15.5, .58, .5);
            圓(xx + 15.5, yy, 15.5, .48, .34);
          }
        }
        x.restore(); 復();
      };
      七寶衣地(610, 1280, 172, 58);
      七寶衣地(914, 1280, 142, 58);

      // ── 梵號・種子位：一圈留空，旁接空白記位欄；不落未核梵字 ─────────
      const 種子落字 = false;
      const scx = 1507, scy = 470, sr = 92;
      圓(scx, scy, sr, 1.45, .9); 圓(scx, scy, sr - 8, .72, .58);
      for (let k = 0; k < 16; k++) {
        const a = Math.PI * 2 * k / 16;
        線([[scx + Math.cos(a) * (sr + 8), scy + Math.sin(a) * (sr + 8)],
          [scx + Math.cos(a) * (sr + 17), scy + Math.sin(a) * (sr + 17)]],
          .72, false, .56);
      }
      蓮瓣橫(p, 1402, 1612, 598, { step: 35, h: 28, 寬: .85, 覆: false });
      線([[1392, 650], [1622, 650], [1622, 1378], [1392, 1378], [1392, 650]],
        1.1, false, .76);
      for (const yy of [810, 970, 1130, 1290])
        線([[1410, yy], [1604, yy]], .72, false, .48);
      for (let yy = 690; yy < 1350; yy += 80) {
        圓(1440, yy, 5.2, .72, .52);
        線([[1462, yy], [1588, yy]], .65, false, .36);
        線([[1462, yy + 14], [1555 + (yy % 3) * 6, yy + 14]], .55, false, .26);
      }
      菱花橫(p, 1404, 1610, 1416, { step: 28, h: 8, 寬: .72 });
      for (let yy = 1470; yy <= 1530; yy += 30)
        for (let xx = 1418; xx <= 1600; xx += 26) 點(xx, yy, 1.5, .38);

      // ── 下欄橫列：尊右執杵手／尊左執鈴手／三昧耶形 ─────────────────
      const rowTop = 1640, rowBot = 2322;
      線([[118, rowTop], [1682, rowTop], [1682, rowBot], [118, rowBot], [118, rowTop]],
        1.7, false, .92);
      for (const xx of [638, 1158]) 線([[xx, rowTop], [xx, rowBot]], 1.0, false, .72);
      for (const [l, r] of [[136, 620], [656, 1140], [1176, 1664]]) {
        蓮瓣橫(p, l, r, 1732, { step: 42, h: 34, 寬: .9, 覆: false });
        菱花橫(p, l, r, 2268, { step: 30, h: 8, 寬: .72 });
      }

      const 印圈 = (cx, cy, r) => {
        圓(cx, cy, r, .88, .48); 圓(cx, cy, r - 10, .58, .3);
        for (let k = 0; k < 12; k++) {
          const a = Math.PI * 2 * k / 12;
          小五鈷(cx + Math.cos(a) * (r + 18), cy + Math.sin(a) * (r + 18),
            .32, a + Math.PI / 2, .5);
        }
      };
      印圈(378, 1990, 185);
      印圈(898, 1990, 185);
      印圈(1418, 1990, 185);

      let 印相數 = 0;
      // 尊右手＝畫面左：杵軸先落，拳背覆軸，拇根居內側。
      {
        const c = document.createElement('canvas'); c.width = W; c.height = H;
        const q = c.getContext('2d'); q.translate(378, 2010);
        q.strokeStyle = 墨; q.fillStyle = 墨; q.lineCap = 'round'; q.lineJoin = 'round';
        const b = 執筆(q, 430); q.lineWidth = b.W_OUT;
        五鈷杵(b, -1.6, 36.4, .2, 4.1);
        執杵手(b, -1.5, 36.45, .2, 4.1);
        x.drawImage(c, 0, 0); 印相數++;
      }
      // 尊左手＝畫面右：鈴柄先落，覆拳逐指裹柄，不作鏡像右手。
      {
        const c = document.createElement('canvas'); c.width = W; c.height = H;
        const q = c.getContext('2d'); q.translate(898, 1995);
        q.strokeStyle = 墨; q.fillStyle = 墨; q.lineCap = 'round'; q.lineJoin = 'round';
        const b = 執筆(q, 430); q.lineWidth = b.W_OUT;
        五鈷鈴(b, 0, 45.0, 6.2, false);
        執鈴手(b, 0, 36.2, 4.8);
        x.drawImage(c, 0, 0); 印相數++;
      }
      // 腕下雲形袖口，明示別圖只取手而非斷肢。
      for (const cx of [378, 898]) {
        二次([cx - 92, 2118], [cx - 58, 2078], [cx - 20, 2118], 1.05, .66);
        二次([cx - 20, 2118], [cx + 18, 2078], [cx + 56, 2118], 1.05, .66);
        二次([cx + 56, 2118], [cx + 82, 2090], [cx + 104, 2118], 1.05, .66);
      }

      let 三昧耶成功 = false;
      {
        const c = document.createElement('canvas'); c.width = W; c.height = H;
        const q = c.getContext('2d');
        q.save(); q.beginPath(); q.rect(1168, rowTop + 14, 500, rowBot - rowTop - 28); q.clip();
        q.translate(1418, 2010);
        q.strokeStyle = 墨; q.fillStyle = 墨; q.lineCap = 'round'; q.lineJoin = 'round';
        三昧耶成功 = 三昧耶白描(q, 360, 'fugen');
        q.restore();
        x.drawImage(c, 0, 0);
      }
      蓮瓣橫(p, 1252, 1584, 2170, { step: 42, h: 36, 寬: 1.0, 覆: false });
      連珠橫(p, 1248, 1588, 2202, { step: 24, r: 4.2, 寬: .72, 套心: true });

      // 頁末細界道；不書題字，以圖自身成完整図像葉。
      for (let cx = 140; cx < W - 120; cx += 52) 小五鈷(cx, 2360, .68, 0, .62);
      線([[116, 2338], [1684, 2338]], .8, false, .56);
      線([[116, 2383], [1684, 2383]], .8, false, .56);

      // ── 機出自證 ─────────────────────────────────────────────────────
      if (W !== 1800 || H !== 2500) throw new Error('破戒：候展稿非 1800×2500');
      if (!依號.fugen || !依號.fugen.k || 依號.fugen.k.信 !== '已核' ||
          依號.fugen.k.印 !== '執杵鈴') throw new Error('破戒：金剛薩埵已核字段不符');
      if (尊落 !== 1 || 印相數 !== 2 || !三昧耶成功) throw new Error('破戒：一尊／雙手／三昧耶形不全');
      if (種子落字 !== false) throw new Error('破戒：未核梵字落入空圈');
      const 錨指 = [12, 20, 36, 48, 68];
      const 錨像素 = 錨指.map(z => 主cy - 主R * .565 + z * 主R * .0145);
      if (錨指.join(',') !== '12,20,36,48,68' ||
          錨像素.some((v, i) => i && v <= 錨像素[i - 1]))
        throw new Error('破戒：T1419 坐像錨失序');
      const 手向 = { 尊右畫面: '左', 尊左畫面: '右', 尊像鏡像: false, 印相鏡像: false };
      if (手向.尊右畫面 !== '左' || 手向.尊左畫面 !== '右' ||
          手向.尊像鏡像 || 手向.印相鏡像) throw new Error('破戒：chirality／杵鈴左右');

      const out = document.createElement('canvas'); out.width = W; out.height = H;
      const o = out.getContext('2d'); o.fillStyle = 地; o.fillRect(0, 0, W, H);
      o.drawImage(ink, 0, 0);
      return out.toDataURL('image/png');
    }),
  });
})().catch(e => { console.error(e); process.exit(1); });
