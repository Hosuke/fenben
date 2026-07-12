// 犍陀羅-哈達灰泥期・框飾層（簡版先行）
// 身形全歸主坊：本檔只繪龕柱拱楣、葉幔與基座欄。

export const 尊位 = Object.freeze({
  W: 1800,
  H: 2500,
  頂y: 690,
  指: 15,
  中x: 900,
  座面: 1710,
});

const 墨 = '#d9b66f';

function 斷(真, 訊) {
  console.assert(真, 訊);
  if (!真) throw new Error(訊);
}

function 驗助(助) {
  斷(助 && 助.尊位, '哈達灰泥期框飾層：缺 助.尊位');
  for (const 名 of ['W', 'H', '頂y', '指', '中x', '座面']) {
    斷(助.尊位[名] === 尊位[名], `尊位失守：${名}`);
  }
  斷(尊位.座面 === 尊位.頂y + 68 * 尊位.指, '座面非頂y+68指');
}

function 筆具(ctx) {
  const 描 = (寬, 落, alpha = 1) => {
    ctx.save();
    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = 墨; ctx.fillStyle = 墨; ctx.globalAlpha = alpha;
    ctx.lineWidth = 寬; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.beginPath(); 落(ctx); ctx.stroke();
    ctx.restore();
  };
  const 線 = (x0, y0, x1, y1, 寬 = 3.2, alpha = 1) =>
    描(寬, p => { p.moveTo(x0, y0); p.lineTo(x1, y1); }, alpha);
  const 貝 = (a, b, c, d, 寬 = 3.2, alpha = 1) =>
    描(寬, p => { p.moveTo(...a); p.bezierCurveTo(...b, ...c, ...d); }, alpha);
  const 橢 = (cx, cy, rx, ry, rot = 0, 寬 = 2.2, alpha = 1) =>
    描(寬, p => p.ellipse(cx, cy, rx, ry, rot, 0, Math.PI * 2), alpha);
  return { 描, 線, 貝, 橢 };
}

function 三貝(p0, p1, p2, p3, t) {
  const q = 1 - t;
  return [
    q ** 3 * p0[0] + 3 * q ** 2 * t * p1[0] + 3 * q * t ** 2 * p2[0] + t ** 3 * p3[0],
    q ** 3 * p0[1] + 3 * q ** 2 * t * p1[1] + 3 * q * t ** 2 * p2[1] + t ** 3 * p3[1],
  ];
}

function 半拱點(側, 層, t) {
  const z = [
    { 頂: 235, 腰: 610, 腳: 735, 外: 650 },
    { 頂: 285, 腰: 638, 腳: 755, 外: 600 },
    { 頂: 338, 腰: 666, 腳: 776, 外: 545 },
  ][層];
  return 三貝([900, z.頂], [900 + 側 * 250, z.頂],
    [900 + 側 * z.外, z.腰], [900 + 側 * z.外, z.腳], t);
}

function 半拱切(側, 層, t) {
  const a = 半拱點(側, 層, Math.max(0, t - .004));
  const b = 半拱點(側, 層, Math.min(1, t + .004));
  return Math.atan2(b[1] - a[1], b[0] - a[0]);
}

function 拱楣(ctx) {
  const { 描, 線, 橢 } = 筆具(ctx);
  const 層 = [
    { 頂: 235, 腰: 610, 腳: 735, 外: 650, 寬: 5.2 },
    { 頂: 285, 腰: 638, 腳: 755, 外: 600, 寬: 3.8 },
    { 頂: 338, 腰: 666, 腳: 776, 外: 545, 寬: 3.2 },
  ];
  for (const z of 層) 描(z.寬, p => {
    p.moveTo(900 - z.外, z.腳);
    p.bezierCurveTo(900 - z.外, z.腰, 650, z.頂, 900, z.頂);
    p.bezierCurveTo(1150, z.頂, 900 + z.外, z.腰, 900 + z.外, z.腳);
  });
  // 外券楔石，只作分割，不複拓另帶。
  for (let k = 0; k < 9; k++) {
    const t = (k + 1) / 10;
    const x = 250 + t * 650;
    const y = 735 - Math.sin(t * Math.PI / 2) * 500;
    線(x, y, x + 28, y + 39, 2.1, .82);
    線(1800 - x, y, 1772 - x, y + 39, 2.1, .82);
  }
  // 中券珠梭：珠、橄欖梭相間，尺寸與斜勢逐枚微變，非複拓同印。
  for (const 側 of [-1, 1]) for (let k = 1; k <= 15; k++) {
    const t = k / 16;
    const a = 半拱點(側, 1, t), b = 半拱點(側, 2, t);
    const cx = (a[0] + b[0]) / 2, cy = (a[1] + b[1]) / 2;
    const rot = 半拱切(側, 1, t);
    if (k % 2) {
      const r = 5.2 + (k % 4) * .55;
      橢(cx, cy, r, r, 0, 1.8, .88);
      橢(cx, cy, 1.35 + (k % 3) * .16, 1.35, 0, .9, .76);
    } else {
      橢(cx, cy, 4.2 + (k % 5) * .35, 8.2 + (k % 3) * .7,
        rot + (側 * (k % 3 - 1) * .035), 1.7, .86);
    }
  }
  // 內券月桂：葉尖沿券勢交替，葉長寬不等，不與葉幔或珠梭同模。
  for (const 側 of [-1, 1]) for (let k = 1; k <= 13; k++) {
    const t = k / 14, a = 半拱點(側, 2, t);
    const rot = 半拱切(側, 2, t) + (k % 2 ? .68 : -.68);
    const len = 20 + (k % 4) * 1.8, wid = 6.8 + (k % 3) * .7;
    ctx.save(); ctx.translate(a[0], a[1]); ctx.rotate(rot);
    描(1.55, p => {
      p.moveTo(-len / 2, 0);
      p.quadraticCurveTo(0, -wid, len / 2, 0);
      p.quadraticCurveTo(0, wid, -len / 2, 0);
      p.moveTo(-len * .36, 0); p.lineTo(len * .4, 0);
    }, .78);
    ctx.restore();
  }
}

function 莨苕(ctx, cx, cy, s, flip = 1) {
  const { 描, 線 } = 筆具(ctx);
  ctx.save(); ctx.translate(cx, cy); ctx.scale(s, s * flip);
  描(2.1 / s, p => {
    p.moveTo(-17, 17); p.bezierCurveTo(-23, 1, -13, -25, 0, -38);
    p.bezierCurveTo(13, -25, 23, 1, 17, 17);
    p.bezierCurveTo(8, 5, -8, 5, -17, 17);
  }, .84);
  線(0, 12, 0, -30, 1.1 / s, .72);
  ctx.restore();
}

function 柱(ctx, cx) {
  const { 描, 線 } = 筆具(ctx);
  for (const [y, h, w] of [[690, 122, 4.2], [720, 104, 3], [780, 76, 4]]) {
    線(cx - h, y, cx + h, y, w);
  }
  // 雙層莨苕冠：相鄰葉尺度與張角微差，免同印列陣。
  for (let k = 0; k < 7; k++) 莨苕(ctx, cx - 70 + k * 23.2, 767 - (k % 2) * 4, .66 + (k % 3) * .025);
  for (let k = 0; k < 6; k++) 莨苕(ctx, cx - 59 + k * 23.6, 733 - (k % 2) * 3, .54 + (k % 4) * .018);
  線(cx - 72, 780, cx - 72, 2132, 4.4);
  線(cx + 72, 780, cx + 72, 2132, 4.4);
  for (let k = -3; k <= 3; k++) {
    const x = cx + k * 18;
    描(1.7, p => {
      p.moveTo(x, 804); p.quadraticCurveTo(x - 7, 830, x, 852);
      p.lineTo(x, 2070); p.quadraticCurveTo(x + 7, 2094, x, 2112);
    }, .76);
  }
  for (const [y, h, w] of [[2132, 82, 3.2], [2160, 108, 3.8], [2192, 132, 4.4]]) {
    線(cx - h, y, cx + h, y, w);
  }
}

function 葉幔(ctx) {
  const { 描, 貝 } = 筆具(ctx);
  for (const 側 of [-1, 1]) {
    貝([900 + 側 * 42, 690], [900 + 側 * 120, 545], [900 + 側 * 250, 420], [900 + 側 * 345, 365], 3.2, .84);
    for (let k = 0; k < 6; k++) {
      const cx = 900 + 側 * (92 + k * 52), cy = 570 - k * 39 + (k % 2) * 17;
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(側 * (.55 - k * .07));
      描(2.2, p => {
        p.moveTo(0, -43); p.bezierCurveTo(25, -22, 25, 23, 0, 48);
        p.bezierCurveTo(-25, 23, -25, -22, 0, -43); p.closePath();
        p.moveTo(0, -35); p.lineTo(0, 39);
      }, .78);
      ctx.restore();
    }
  }
}

function 基座(ctx) {
  const { 描, 線 } = 筆具(ctx);
  const y = 尊位.座面;
  線(430, y, 1370, y, 5.4);
  線(408, y + 34, 1392, y + 34, 3.4);
  線(390, y + 78, 1410, y + 78, 4.2);
  // 座頂交股帶：兩股相位相反，振幅緩變；不複用拱楣三種紋。
  for (const phase of [0, Math.PI]) 描(1.65, p => {
    for (let x = 420, first = true; x <= 1380; x += 6) {
      const q = (x - 420) / 960;
      const yy = y + 55 + Math.sin(q * Math.PI * 12 + phase) * (8 + 2 * Math.sin(q * Math.PI));
      if (first) { p.moveTo(x, yy); first = false; } else p.lineTo(x, yy);
    }
  }, .8);
  // 覆帛輪廓；內部空白留予主坊交腳與遮蔽修筆。
  for (let k = 0; k < 7; k++) {
    const x0 = 404 + k * 142;
    描(2.2, p => {
      p.moveTo(x0, y + 96);
      p.quadraticCurveTo(x0 + 65 + (k % 3) * 6,
        y + 166 + (k % 4) * 9, x0 + 142, y + 96 + (k % 2) * 4);
    }, .86);
  }
  線(390, 1988, 1410, 1988, 4.2);
  線(410, 2182, 1390, 2182, 4.6);
  線(386, 2214, 1414, 2214, 3.4);
  // 三格欄僅留空框，供養人全歸主坊。
  for (const x of [410, 690, 1110, 1390]) 線(x, 1988, x, 2182, 3.1);
  // 下沿斜齒，疏密與傾角循序變化；欄心仍全空。
  for (let k = 0, x = 425; x < 1378; k++, x += 25 + (k % 4) * 3) {
    const lean = 7 + (k % 5) * 2;
    線(x, 2187, x + (k % 2 ? lean : -lean), 2208, 1.45, .76);
  }
}

export function 景(ctx, 助) {
  驗助(助);
  ctx.save();
  try {
    拱楣(ctx); 葉幔(ctx); 柱(ctx, 255); 柱(ctx, 1545);
  } finally { ctx.restore(); }
}

export function 飾(ctx, 助) {
  驗助(助);
  ctx.save();
  try { 基座(ctx); } finally { ctx.restore(); }
}
