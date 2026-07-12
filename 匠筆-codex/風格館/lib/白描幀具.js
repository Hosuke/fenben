// 風格館共用白描幀具·ESM
//
// 候展席生成器在 `page.evaluate` 內以 HTTP import 此檔；只封裝三等筆之
// canvas 原語與跨室通用紋樣，不封裝任何尊容或儀軌。諸尊仍由 dist/
// 之已核筆活渲；未核表法不因 helper 而自生。

export function 造線筆(ctx, {
  墨 = '#d8b36a',
  骨 = 2.4,
  衣 = 1.65,
  鬚 = 0.9,
} = {}) {
  const 寬 = { 骨, 衣, 鬚 };
  const 筆 = (w = 寬.衣, a = 1) => {
    ctx.lineWidth = w;
    ctx.strokeStyle = 墨;
    ctx.fillStyle = 墨;
    ctx.globalAlpha = a;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };
  const 復 = () => {
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = 墨;
    ctx.fillStyle = 墨;
  };
  const 線 = (pts, w = 寬.衣, close = false, a = 1) => {
    if (!pts.length) return;
    筆(w, a); ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
    if (close) ctx.closePath(); ctx.stroke(); ctx.globalAlpha = 1;
  };
  const 貝 = (p0, c1, c2, p1, w = 寬.衣, a = 1) => {
    筆(w, a); ctx.beginPath(); ctx.moveTo(...p0);
    ctx.bezierCurveTo(...c1, ...c2, ...p1); ctx.stroke(); ctx.globalAlpha = 1;
  };
  const 二次 = (p0, c, p1, w = 寬.衣, a = 1) => {
    筆(w, a); ctx.beginPath(); ctx.moveTo(...p0);
    ctx.quadraticCurveTo(...c, ...p1); ctx.stroke(); ctx.globalAlpha = 1;
  };
  const 圓 = (cx, cy, r, w = 寬.衣, a = 1, a0 = 0, a1 = Math.PI * 2) => {
    筆(w, a); ctx.beginPath(); ctx.arc(cx, cy, r, a0, a1); ctx.stroke(); ctx.globalAlpha = 1;
  };
  const 橢 = (cx, cy, rx, ry, w = 寬.衣, rot = 0, a = 1) => {
    筆(w, a); ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, rot, 0, Math.PI * 2);
    ctx.stroke(); ctx.globalAlpha = 1;
  };
  const 點 = (cx, cy, r, a = 1) => {
    筆(寬.鬚, a); ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = 1;
  };
  const 鏡 = (axisX, fn) => {
    fn(1); ctx.save(); ctx.translate(axisX * 2, 0); ctx.scale(-1, 1); fn(-1); ctx.restore();
  };
  const 蔽 = fn => {
    ctx.save(); ctx.globalCompositeOperation = 'destination-out'; ctx.fillStyle = '#000'; fn();
    ctx.restore(); 復();
  };
  return { ctx, 墨, 寬, 筆, 復, 線, 貝, 二次, 圓, 橢, 點, 鏡, 蔽 };
}

export function 連珠橫(筆, x0, x1, y, { step = 24, r = 5, 寬 = 1.2, 套心 = true } = {}) {
  const { 線, 圓 } = 筆;
  線([[x0, y - r - 5], [x1, y - r - 5]], 寬);
  線([[x0, y + r + 5], [x1, y + r + 5]], 寬);
  for (let x = x0 + step / 2; x < x1; x += step) {
    圓(x, y, r, 寬);
    if (套心) 圓(x, y, r * .28, Math.max(.55, 寬 * .62));
  }
}

export function 菱花橫(筆, x0, x1, y, { step = 32, h = 10, 寬 = 1.15 } = {}) {
  const { 線, 圓 } = 筆;
  線([[x0, y - h], [x1, y - h]], 寬);
  線([[x0, y + h], [x1, y + h]], 寬);
  for (let x = x0; x + step <= x1 + .1; x += step) {
    線([[x, y], [x + step / 2, y - h * .72], [x + step, y],
      [x + step / 2, y + h * .72]], 寬, true);
    圓(x + step / 2, y, Math.min(3.2, h * .24), Math.max(.55, 寬 * .62));
  }
}

// 東密截金紋之白描轉寫：卐字不作大符號，惟縮入條帛成細密織緣。
export function 卐繫橫(筆, x0, x1, y, { cell = 26, h = 10, 寬 = 1.05 } = {}) {
  const { 線 } = 筆;
  線([[x0, y - h - 4], [x1, y - h - 4]], 寬);
  線([[x0, y + h + 4], [x1, y + h + 4]], 寬);
  for (let x = x0; x + cell <= x1; x += cell) {
    線([[x, y], [x + cell * .28, y], [x + cell * .28, y - h],
      [x + cell * .72, y - h], [x + cell * .72, y + h],
      [x + cell, y + h], [x + cell, y]], 寬);
    線([[x, y + h], [x + cell * .48, y + h], [x + cell * .48, y - h],
      [x + cell, y - h]], Math.max(.55, 寬 * .72));
  }
}

export function 蓮瓣橫(筆, x0, x1, base, { step = 44, h = 34, 寬 = 1.25, 覆 = false } = {}) {
  const { 貝 } = 筆;
  const s = 覆 ? -1 : 1;
  for (let x = x0 + step / 2; x < x1; x += step) {
    貝([x - step * .48, base], [x - step * .38, base - s * h * .7],
      [x - step * .16, base - s * h], [x, base - s * h], 寬);
    貝([x, base - s * h], [x + step * .16, base - s * h],
      [x + step * .38, base - s * h * .7], [x + step * .48, base], 寬);
    貝([x - step * .23, base], [x - step * .17, base - s * h * .48],
      [x - step * .08, base - s * h * .7], [x, base - s * h * .76], Math.max(.55, 寬 * .68));
    貝([x, base - s * h * .76], [x + step * .08, base - s * h * .7],
      [x + step * .17, base - s * h * .48], [x + step * .23, base], Math.max(.55, 寬 * .68));
  }
}

// 變寬之線由短線相套而成：中段寬、兩頭收鋒，可供蘭葉描長帶共用。
export function 提按貝(筆, p0, c1, c2, p1, {
  最細 = .75, 最寬 = 4.2, steps = 30, alpha = 1,
} = {}) {
  const { ctx, 墨 } = 筆;
  const at = t => {
    const s = 1 - t;
    return [
      s * s * s * p0[0] + 3 * s * s * t * c1[0] + 3 * s * t * t * c2[0] + t * t * t * p1[0],
      s * s * s * p0[1] + 3 * s * s * t * c1[1] + 3 * s * t * t * c2[1] + t * t * t * p1[1],
    ];
  };
  for (let i = 0; i < steps; i++) {
    const a = at(i / steps), b = at((i + 1) / steps);
    const t = (i + .5) / steps;
    const envelope = Math.sin(Math.PI * t) ** .72;
    ctx.beginPath(); ctx.moveTo(...a); ctx.lineTo(...b);
    ctx.strokeStyle = 墨; ctx.globalAlpha = alpha;
    ctx.lineWidth = 最細 + (最寬 - 最細) * envelope;
    ctx.lineCap = 'round'; ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

export function 轉直(ctx, y0, y1, x, fn) {
  ctx.save(); ctx.translate(x, y0); ctx.rotate(Math.PI / 2); fn(0, y1 - y0, 0); ctx.restore();
}
