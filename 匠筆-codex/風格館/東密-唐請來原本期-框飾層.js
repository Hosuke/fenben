// 東密-唐請來原本期・框飾層（簡版先行）
// 透明布；景→尊→飾。此檔不畫主尊、小尊、侍者、手或衣上紋樣。

export const 尊位 = Object.freeze({
  W: 1800,
  H: 2500,
  頂y: 680,
  指: 14,
  中x: 740,
  座面: 1632,
});

const 墨 = '#d8b36a';

function 驗助(助) {
  if (!助 || !助.尊位) throw new Error('東密框飾層：缺 助.尊位');
  for (const 名 of ['W', 'H', '頂y', '指', '中x', '座面']) {
    if (助.尊位[名] !== 尊位[名]) throw new Error(`尊位失守：${名}`);
  }
  if (尊位.頂y + 68 * 尊位.指 !== 尊位.座面) throw new Error('座面錨失守');
}

function 描線(ctx, 點列, 寬 = 1, alpha = 1, close = false) {
  ctx.save();
  ctx.strokeStyle = 墨;
  ctx.lineWidth = 寬;
  ctx.globalAlpha = alpha;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(...點列[0]);
  for (let i = 1; i < 點列.length; i++) ctx.lineTo(...點列[i]);
  if (close) ctx.closePath();
  ctx.stroke();
  ctx.restore();
}

function 圓(ctx, x, y, r, 寬 = 1, alpha = 1) {
  ctx.save();
  ctx.strokeStyle = 墨;
  ctx.lineWidth = 寬;
  ctx.globalAlpha = alpha;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function 橢(ctx, x, y, rx, ry, 寬 = 1, alpha = 1) {
  ctx.save();
  ctx.strokeStyle = 墨; ctx.lineWidth = 寬; ctx.globalAlpha = alpha;
  ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2); ctx.stroke();
  ctx.restore();
}

function 連珠帶(ctx, x0, x1, y, seed = 0) {
  描線(ctx, [[x0, y - 12], [x1, y - 12]], .72, .48);
  描線(ctx, [[x0, y + 12], [x1, y + 12]], .72, .48);
  let i = 0;
  for (let x = x0 + 12; x < x1 - 8; x += 22 + ((i + seed) % 4)) {
    const r = 4.2 + ((i * 7 + seed) % 5) * .42;
    橢(ctx, x, y, r, r * (i % 3 === 0 ? .9 : 1), .74 + (i % 3) * .08, .54 + (i % 4) * .05);
    if ((i + seed) % 3 === 1) 圓(ctx, x + .8, y - .5, 1.15 + (i % 2) * .35, .5, .42);
    i++;
  }
}

function 卍繫帶(ctx, x0, x1, y, seed = 0) {
  描線(ctx, [[x0, y - 11], [x1, y - 11]], .7, .42);
  描線(ctx, [[x0, y + 11], [x1, y + 11]], .7, .42);
  let i = 0;
  for (let x = x0 + 5; x < x1 - 24; x += 29 + ((i + seed) % 3)) {
    const h = 5.8 + ((i + seed) % 4) * .55;
    const w = 11 + ((i * 5 + seed) % 4);
    描線(ctx, [[x, y], [x + w, y], [x + w, y - h], [x + w * .45, y - h],
      [x + w * .45, y + h], [x + w * 1.55, y + h], [x + w * 1.55, y]],
    .62 + (i % 3) * .07, .48 + (i % 4) * .055);
    i++;
  }
}

function 小五鈷(ctx, cx, cy, s = 1, rot = 0, alpha = .72, variant = 0) {
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot);
  描線(ctx, [[-18 * s, 0], [18 * s, 0]], .95 * s, alpha);
  圓(ctx, 0, 0, (2.7 + variant * .18) * s, .7 * s, alpha);
  for (const d of [-1, 1]) {
    ctx.save();
    ctx.strokeStyle = 墨; ctx.lineWidth = .72 * s; ctx.globalAlpha = alpha;
    ctx.beginPath(); ctx.moveTo(d * 3 * s, 0);
    ctx.bezierCurveTo(d * 7 * s, -7 * s, d * (12 + variant) * s, -8 * s, d * 18 * s, 0);
    ctx.moveTo(d * 3 * s, 0);
    ctx.bezierCurveTo(d * 7 * s, 7 * s, d * (13 - variant * .4) * s, 8 * s, d * 18 * s, 0);
    ctx.stroke(); ctx.restore();
  }
  ctx.restore();
}

function 五鈷帶(ctx, x0, x1, y, seed = 0) {
  描線(ctx, [[x0, y - 24], [x1, y - 24]], .76, .5);
  描線(ctx, [[x0, y + 24], [x1, y + 24]], .76, .5);
  let i = 0;
  for (let x = x0 + 23; x < x1 - 20; x += 53 + ((i + seed) % 5)) {
    小五鈷(ctx, x, y, .7 + ((i + seed) % 4) * .025,
      ((i % 5) - 2) * .012, .53 + (i % 4) * .045, (i + seed) % 3);
    i++;
  }
}

function 菱花帶(ctx, x0, x1, y, seed = 0) {
  描線(ctx, [[x0, y - 12], [x1, y - 12]], .7, .42);
  描線(ctx, [[x0, y + 12], [x1, y + 12]], .7, .42);
  let i = 0;
  for (let x = x0 + 12; x < x1 - 12; x += 27 + ((i + seed) % 4)) {
    const w = 8 + ((i * 3 + seed) % 4), h = 6 + ((i + seed) % 3);
    描線(ctx, [[x - w, y], [x, y - h], [x + w, y], [x, y + h], [x - w, y]],
      .62 + (i % 3) * .06, .42 + (i % 4) * .05);
    if ((i + seed) % 2) 圓(ctx, x, y, 1.2 + (i % 3) * .25, .45, .36);
    i++;
  }
}

function 蓮瓣帶(ctx, x0, x1, y, seed = 0, 覆 = false) {
  描線(ctx, [[x0, y], [x1, y]], .76, .5);
  let i = 0;
  for (let x = x0 + 12; x < x1 - 12; x += 29 + ((i + seed) % 4)) {
    const w = 13 + (i % 3), h = (19 + (i + seed) % 5) * (覆 ? -1 : 1);
    ctx.save(); ctx.strokeStyle = 墨; ctx.lineWidth = .58 + (i % 4) * .06;
    ctx.globalAlpha = .43 + (i % 5) * .045; ctx.beginPath();
    ctx.moveTo(x - w, y); ctx.bezierCurveTo(x - w * .66, y + h * .58, x - w * .2, y + h, x, y + h);
    ctx.bezierCurveTo(x + w * .22, y + h, x + w * .7, y + h * .54, x + w, y);
    ctx.moveTo(x - w * .43, y + h * .12); ctx.quadraticCurveTo(x, y + h * .74, x + w * .4, y + h * .12);
    ctx.stroke(); ctx.restore(); i++;
  }
}

function 座前仰蓮(ctx) {
  const y = 尊位.座面;
  描線(ctx, [[170, y], [1288, y]], 3, .96);
  let i = 0;
  for (let x = 182; x < 1280; x += 49 + (i % 4) * 2) {
    const w = 24 + (i % 3) * 2.5;
    const h = 39 + (i % 5) * 2.2;
    const lean = ((i % 5) - 2) * 1.4;
    ctx.save(); ctx.strokeStyle = 墨; ctx.lineWidth = .74 + (i % 3) * .09;
    ctx.globalAlpha = .58 + (i % 4) * .055; ctx.beginPath();
    ctx.moveTo(x - w, y); ctx.bezierCurveTo(x - w * .72, y + h * .54, x - w * .28, y + h, x + lean, y + h + 4);
    ctx.bezierCurveTo(x + w * .28, y + h, x + w * .74, y + h * .48, x + w, y);
    ctx.moveTo(x - w * .45, y + 4); ctx.quadraticCurveTo(x + lean, y + h * .72, x + w * .42, y + 4);
    ctx.stroke(); ctx.restore(); i++;
  }
  描線(ctx, [[188, y + 50], [1270, y + 50]], 1.15, .72);
  菱花帶(ctx, 210, 1248, y + 70, 41);
}

function 圓龕環飾(ctx, cx, cy, r, 型) {
  圓(ctx, cx, cy, r, .92, .53);
  圓(ctx, cx, cy, r - 10, .58, .32);
  const n = 型 === 2 ? 16 : 型 === 1 ? 18 : 15;
  for (let k = 0; k < n; k++) {
    const a = Math.PI * 2 * k / n;
    const rr = r + 17 + ((k * 3 + 型) % 4);
    const x = cx + Math.cos(a) * rr;
    const y = cy + Math.sin(a) * rr;
    if (型 === 0) {
      圓(ctx, x, y, 3.2 + (k % 4) * .55, .58 + (k % 3) * .06, .4 + (k % 5) * .04);
      if (k % 3 === 1) 描線(ctx, [[x + Math.cos(a) * 6, y + Math.sin(a) * 6],
        [x + Math.cos(a) * 13, y + Math.sin(a) * 13]], .52, .38);
    } else if (型 === 1) {
      const tang = a + Math.PI / 2;
      ctx.save(); ctx.translate(x, y); ctx.rotate(tang);
      描線(ctx, [[-7 - k % 2, 0], [0, -5 - k % 3], [7 + k % 2, 0], [0, 5 + k % 3], [-7 - k % 2, 0]],
        .58 + (k % 4) * .05, .42 + (k % 3) * .05);
      ctx.restore();
    } else {
      小五鈷(ctx, x, y, .29 + (k % 4) * .012, a + Math.PI / 2 + ((k % 3) - 1) * .018,
        .42 + (k % 5) * .04, k % 3);
    }
  }
}

function 獨立五鈷杵(ctx, cx, cy, s = 1) {
  ctx.save(); ctx.translate(cx, cy); ctx.strokeStyle = 墨; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  描線(ctx, [[0, -52 * s], [0, 52 * s]], 3.1 * s, .92);
  橢(ctx, 0, 0, 22 * s, 15 * s, 2.1 * s, .9);
  橢(ctx, 0, -40 * s, 14 * s, 8 * s, 1.5 * s, .82);
  橢(ctx, 0, 40 * s, 14 * s, 8 * s, 1.5 * s, .82);
  for (const d of [-1, 1]) {
    const base = d * 50 * s, tip = d * 142 * s;
    描線(ctx, [[0, base], [0, tip]], 1.8 * s, .9);
    for (const [off, bend, alpha] of [[-23, -36, .82], [-12, -24, .88], [12, 24, .86], [23, 36, .78]]) {
      ctx.save(); ctx.strokeStyle = 墨; ctx.lineWidth = (1.28 + Math.abs(off) / 45) * s; ctx.globalAlpha = alpha;
      ctx.beginPath(); ctx.moveTo(off * .42 * s, base);
      ctx.bezierCurveTo(off * s, base + d * 28 * s, bend * s, tip - d * 37 * s, 0, tip);
      ctx.stroke(); ctx.restore();
    }
  }
  // 杵腰各瓣不同，免成機械複拓。
  for (let k = 0; k < 8; k++) {
    const a = Math.PI * 2 * k / 8;
    描線(ctx, [[Math.cos(a) * 23 * s, Math.sin(a) * 15 * s],
      [Math.cos(a) * (31 + k % 3) * s, Math.sin(a) * (20 + (k + 1) % 3) * s]],
    (.72 + k % 3 * .08) * s, .58 + k % 4 * .05);
  }
  ctx.restore();
}

export function 景(ctx, 助) {
  驗助(助);
  ctx.save();
  // 橫卷頁之大格與右側梵號欄；紙素為地，不鋪底。
  描線(ctx, [[118, 252], [1682, 252], [1682, 1632], [118, 1632], [118, 252]], 1.45, .86);
  描線(ctx, [[1332, 252], [1332, 1632]], 1.05, .66);
  // Cleveland 図像所見淡界格：只定頁法，不描出人物輪廓。
  for (let y = 412, i = 0; y < 1570; y += 149 + (i++ % 3))
    描線(ctx, [[146, y], [1304, y]], .52 + (i % 2) * .06, .12 + (i % 3) * .025);
  for (let x = 258, i = 0; x < 1300; x += 168 + (i++ % 4) * 2)
    描線(ctx, [[x, 316], [x, 1585]], .5 + (i % 2) * .05, .1 + (i % 3) * .018);
  圓(ctx, 1507, 470, 92, 1.35, .86);
  圓(ctx, 1507, 470, 84, .68, .54);
  for (let k = 0; k < 16; k++) {
    const a = Math.PI * 2 * k / 16;
    const r0 = 101 + (k % 3);
    描線(ctx, [[1507 + Math.cos(a) * r0, 470 + Math.sin(a) * r0],
      [1507 + Math.cos(a) * (r0 + 7 + k % 2), 470 + Math.sin(a) * (r0 + 7 + k % 2)]],
    .58 + (k % 4) * .05, .42 + (k % 3) * .06);
  }
  描線(ctx, [[1392, 650], [1622, 650], [1622, 1378], [1392, 1378], [1392, 650]], 1.02, .7);
  for (const [y, a] of [[806, .42], [965, .37], [1127, .45], [1288, .34]])
    描線(ctx, [[1410, y], [1604, y]], .62, a);
  for (let y = 690, i = 0; y < 1350; y += 79 + (i++ % 3)) {
    圓(ctx, 1440, y, 4.5 + (i % 3) * .5, .62, .45);
    描線(ctx, [[1462, y], [1588 - (i % 4) * 9, y]], .58, .3 + (i % 3) * .04);
    描線(ctx, [[1462, y + 14], [1548 + (i % 5) * 8, y + 14]], .5, .21 + (i % 2) * .05);
  }
  ctx.restore();
}

export function 飾(ctx, 助) {
  驗助(助);
  ctx.save();
  // 鐵線雙框。
  描線(ctx, [[34, 34], [1766, 34], [1766, 2466], [34, 2466], [34, 34]], 3.4, 1);
  描線(ctx, [[52, 52], [1748, 52], [1748, 2448], [52, 2448], [52, 52]], 1.3, .78);
  連珠帶(ctx, 66, 1734, 78, 3);
  卍繫帶(ctx, 92, 1708, 126, 7);
  五鈷帶(ctx, 108, 1692, 198, 11);
  連珠帶(ctx, 66, 1734, 2422, 19);
  卍繫帶(ctx, 92, 1708, 2374, 23);
  五鈷帶(ctx, 108, 1692, 2328, 29);

  // 側帶逐珠略異；先轉布再繪，save/restore 不洩狀態。
  ctx.save(); ctx.translate(78, 234); ctx.rotate(Math.PI / 2);
  連珠帶(ctx, 0, 2032, 0, 31); ctx.restore();
  ctx.save(); ctx.translate(1722, 234); ctx.rotate(Math.PI / 2);
  連珠帶(ctx, 0, 2032, 0, 37); ctx.restore();

  // 主格額帶、右欄托座各異紋；不以衣緣截金代框飾。
  菱花帶(ctx, 138, 1310, 286, 73);
  蓮瓣帶(ctx, 1402, 1612, 598, 79, false);
  菱花帶(ctx, 1404, 1610, 1416, 83);
  for (let y = 1468, row = 0; y <= 1530; y += 29 + row++ % 2) {
    for (let x = 1418, col = 0; x <= 1600; x += 25 + (col++ + row) % 3) {
      圓(ctx, x, y, 1.15 + ((row * 5 + col) % 4) * .24, .46, .28 + (col % 3) * .06);
    }
  }

  // 座頂緣即主尊臀底之線，嚴承座面 y=1632。
  座前仰蓮(ctx);

  // 下欄三圓龕框：第一、二龕候主坊補手圖；第三龕候留器物。
  描線(ctx, [[118, 1718], [1682, 1718], [1682, 2288], [118, 2288], [118, 1718]], 1.6, .9);
  for (const x of [638, 1158]) 描線(ctx, [[x, 1718], [x, 2288]], 1, .68);
  菱花帶(ctx, 138, 618, 1752, 47);
  連珠帶(ctx, 658, 1138, 1752, 53);
  五鈷帶(ctx, 1178, 1662, 1752, 59);
  菱花帶(ctx, 138, 618, 2252, 61);
  卍繫帶(ctx, 658, 1138, 2252, 67);
  連珠帶(ctx, 1178, 1662, 2252, 71);
  圓龕環飾(ctx, 378, 2010, 185, 0);
  圓龕環飾(ctx, 898, 2010, 185, 1);
  圓龕環飾(ctx, 1418, 2010, 185, 2);
  獨立五鈷杵(ctx, 1418, 2010, .98);
  ctx.restore();
}
