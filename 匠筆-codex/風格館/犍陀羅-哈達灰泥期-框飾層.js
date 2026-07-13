// 犍陀羅-哈達灰泥期・框飾層（灰泥龕密飾成幀）
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

const 拱形 = [
  { 頂: 188, 腰: 576, 腳: 710, 外: 700 },
  { 頂: 235, 腰: 610, 腳: 735, 外: 650 },
  { 頂: 285, 腰: 638, 腳: 755, 外: 600 },
  { 頂: 338, 腰: 666, 腳: 776, 外: 545 },
  { 頂: 394, 腰: 694, 腳: 804, 外: 492 },
];

function 半拱點(側, 層, t) {
  const z = 拱形[層];
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
  for (let j = 0; j < 拱形.length; j++) {
    const z = 拱形[j], 寬 = [4.1, 5.2, 3.8, 3.2, 3.6][j];
    描(寬, p => {
    p.moveTo(900 - z.外, z.腳);
    p.bezierCurveTo(900 - z.外, z.腰, 650, z.頂, 900, z.頂);
    p.bezierCurveTo(1150, z.頂, 900 + z.外, z.腰, 900 + z.外, z.腳);
    });
  }

  // 第一帶・繩紋：雙股逐節錯位，繩結寬窄相間。
  for (const 側 of [-1, 1]) for (let k = 1; k <= 31; k++) {
    const t = k / 32, dt = .012 + (k % 3) * .002;
    const a = 半拱點(側, 0, Math.max(0, t - dt));
    const b = 半拱點(側, 1, Math.min(1, t + dt));
    const c = 半拱點(側, 0, Math.min(1, t + dt));
    const d = 半拱點(側, 1, Math.max(0, t - dt));
    線(...a, ...b, 1.45, .72 + (k % 4) * .035);
    if (k % 2) 線(...c, ...d, 1.15, .62);
  }

  // 第二帶・鋸齒：齒尖交替歸向兩券，不與繩、珠、葉同式。
  for (const 側 of [-1, 1]) for (let k = 1; k <= 27; k++) {
    const t = k / 28;
    const a = 半拱點(側, 1, t), b = 半拱點(側, 2, t);
    const m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    const e = k % 2 ? a : b;
    線(...m, ...e, 1.45, .75 + (k % 5) * .025);
  }

  // 第三帶・連珠梭：珠、橄欖梭相間，尺寸與斜勢逐枚微變。
  for (const 側 of [-1, 1]) for (let k = 1; k <= 25; k++) {
    const t = k / 26;
    const a = 半拱點(側, 2, t), b = 半拱點(側, 3, t);
    const cx = (a[0] + b[0]) / 2, cy = (a[1] + b[1]) / 2;
    const rot = 半拱切(側, 2, t);
    if (k % 2) {
      const r = 4.8 + (k % 4) * .5;
      橢(cx, cy, r, r, 0, 1.65, .86);
      橢(cx, cy, 1.2 + (k % 3) * .16, 1.2, 0, .85, .72);
    } else {
      橢(cx, cy, 3.8 + (k % 5) * .3, 7.5 + (k % 3) * .6,
        rot + (側 * (k % 3 - 1) * .035), 1.7, .86);
    }
  }

  // 第四帶・月桂：葉尖沿券勢交替，葉長寬不等。
  for (const 側 of [-1, 1]) for (let k = 1; k <= 21; k++) {
    const t = k / 22;
    const a0 = 半拱點(側, 3, t), a1 = 半拱點(側, 4, t);
    const a = [(a0[0] + a1[0]) / 2, (a0[1] + a1[1]) / 2];
    const rot = 半拱切(側, 3, t) + (k % 2 ? .7 : -.7);
    const len = 18 + (k % 4) * 1.55, wid = 6.2 + (k % 3) * .65;
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

function 頂角灰泥壁紋(ctx) {
  const { 描 } = 筆具(ctx);
  // 外券以上之薄灰泥殘紋：貼券稍密，向畫幅頂角退疏；左右相位各異，毋作鏡拓。
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(48, 72); ctx.lineTo(1752, 72); ctx.lineTo(1752, 560);
  ctx.lineTo(1600, 710);
  ctx.bezierCurveTo(1600, 576, 1150, 188, 900, 188);
  ctx.bezierCurveTo(650, 188, 200, 576, 200, 710);
  ctx.lineTo(48, 560); ctx.closePath(); ctx.clip();

  for (const [l, r, 種] of [[48, 730, 0], [1070, 1752, 1]]) {
    ctx.save(); ctx.beginPath(); ctx.rect(l, 72, r - l, 488); ctx.clip();
    // 斜刻之節距隨高度放大；第二向另變相位與斜率，僅承既有網紋之意。
    for (let row = 0, y = 548; y > 78; row++, y -= 43 + row * 3.6) {
      const step = 41 + row * 6.4 + 種 * 2.5;
      const lean = .68 + ((row + 種) % 3) * .075;
      for (let x = l - 210 + ((row * 29 + 種 * 17) % 47); x < r + 160; x += step * 2) {
        描(.86 + ((row + 種) % 3) * .08, p => {
          p.moveTo(x, y - 54); p.lineTo(x + 78 / lean, y + 32);
        }, .45 + ((row * 2 + 種) % 4) * .035);
      }
      for (let x = l - 150 + ((row * 17 + 種 * 31) % 53); x < r + 190; x += (step + 9 + (row % 3) * 3) * 2) {
        描(.78 + ((row + 種) % 2) * .1, p => {
          p.moveTo(x, y - 48); p.lineTo(x - 72 * lean, y + 29);
        }, .47 + ((row + 種 * 2) % 4) * .03);
      }
      if (row % 2 === 種) 描(.74 + (row % 3) * .07, p => {
        const inset = 18 + ((row * 37 + 種 * 23) % 81);
        p.moveTo(l + inset, y + 17);
        p.lineTo(r - 24 - ((row * 19 + 種 * 11) % 73), y + 15 + (row % 3 - 1) * 1.7);
      }, .45 + (row % 4) * .028);
    }
    ctx.restore();
  }

  // 拱頂正上只留一小段淡紋，與兩角不連成滿版。
  ctx.save(); ctx.beginPath(); ctx.rect(758, 104, 284, 92); ctx.clip();
  for (let k = -2; k <= 8; k++) {
    const x = 770 + k * (37 + ((k + 5) % 3) * 3);
    描(.78 + ((k + 5) % 3) * .07, p => {
      p.moveTo(x, 108 + ((k + 8) % 4) * 3); p.lineTo(x + 58, 190);
    }, .45 + ((k + 8) % 4) * .035);
    if (k % 2) 描(.74, p => {
      p.moveTo(x + 49, 111); p.lineTo(x - 5, 188);
    }, .48 + ((k + 7) % 3) * .04);
  }
  ctx.restore();
  ctx.restore();
}

function 灰泥背壁(ctx) {
  const { 描, 橢 } = 筆具(ctx);
  頂角灰泥壁紋(ctx);
  // 六片尊外餘壁；中堂 500..1300 × 800..1650 明留靜域。
  const 片 = [
    [48, 760, 188, 1410, 0], [1564, 760, 188, 1410, 1],
    [330, 820, 170, 830, 2], [1300, 820, 170, 830, 3],
    [60, 286, 350, 462, 4], [1390, 286, 350, 462, 5],
  ];
  for (const [x, y, w, h, 種] of 片) {
    ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
    // 菱格斜刻：片片變節距、相位、粗細，疏密不均攤。
    const step = 25 + 種 * 3, lean = .72 + (種 % 3) * .12;
    if (種 === 2 || 種 === 3) {
      // 柱內兩帶承上部之網而下：逐段放大節距，下段故疏；不侵中堂靜域。
      for (let band = 0, top = y; top < y + h; band++, top += 138) {
        const bh = Math.min(146, y + h - top), bs = step + band * 4.35;
        ctx.save(); ctx.beginPath(); ctx.rect(x, top, w, bh); ctx.clip();
        for (let q = -bh + (band % 3) * 7; q < w + bh; q += bs) 描(1.05 + (種 % 2) * .18, p => {
          p.moveTo(x + q, top); p.lineTo(x + q - bh * lean, top + bh);
        }, .62 - band * .012);
        for (let q = -bh + bs / 2 - (band % 2) * 9; q < w + bh; q += bs + 4.5) 描(.95 + (種 % 3) * .12, p => {
          p.moveTo(x + q, top); p.lineTo(x + q + bh / lean, top + bh);
        }, .65 - band * .013);
        ctx.restore();
      }
    } else {
      for (let q = -h; q < w + h; q += step) 描(1.05 + (種 % 2) * .18, p => {
        p.moveTo(x + q, y); p.lineTo(x + q - h * lean, y + h);
      }, .5 + (種 % 3) * .07);
      for (let q = -h + step / 2; q < w + h; q += step + 4) 描(.95 + (種 % 3) * .12, p => {
        p.moveTo(x + q, y); p.lineTo(x + q + h / lean, y + h);
      }, .54 + (種 % 2) * .09);
    }
    // 灰泥分層接縫：節距逐片改，且每三層斷續退讓，非均攤方格。
    for (let row = 0, yy = y + 34 + 種 * 2; yy < y + h; row++, yy += 49 + (row % 4) * 7) {
      const inset = 5 + ((row * 11 + 種 * 7) % 29);
      描(.78 + (row % 3) * .12, p => {
        p.moveTo(x + inset, yy);
        p.lineTo(x + w - 7 - ((row * 5 + 種 * 3) % 23), yy + (row % 2 ? 1.5 : -1.2));
      }, .46 + (row % 4) * .035);
    }
    // 圓花點陣只落於部分菱心；半數四瓣、半數珠眼，各片錯列。
    const dx = step * 2 + 8, dy = step * 1.55;
    for (let row = 0, cy = y + dy * .7; cy < y + h; row++, cy += dy) {
      for (let col = 0, cx = x + dx * .45 + (row % 2) * dx / 2; cx < x + w; col++, cx += dx) {
        if ((row + col + 種) % 3 === 0) continue;
        const r = 3.4 + ((row * 2 + col + 種) % 4) * .55;
        橢(cx, cy, r, r, 0, .85, .56);
        if ((row + 種) % 2) {
          橢(cx - r * .9, cy, r * .5, r * .28, 0, .7, .5);
          橢(cx + r * .9, cy, r * .5, r * .28, 0, .7, .5);
        }
      }
    }
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
  const { 描, 線, 橢 } = 筆具(ctx);
  for (const [y, h, w] of [[690, 122, 4.2], [720, 104, 3], [780, 76, 4]]) {
    線(cx - h, y, cx + h, y, w);
  }
  // 雙層莨苕冠：相鄰葉尺度與張角微差，免同印列陣。
  for (let k = 0; k < 7; k++) 莨苕(ctx, cx - 70 + k * 23.2, 767 - (k % 2) * 4, .66 + (k % 3) * .025);
  for (let k = 0; k < 6; k++) 莨苕(ctx, cx - 59 + k * 23.6, 733 - (k % 2) * 3, .54 + (k % 4) * .018);
  for (let k = 0; k < 9; k++) 莨苕(ctx, cx - 67 + k * 16.8, 701 - (k % 3) * 2.5, .38 + (k % 4) * .014);
  // 柱頭頸圈連珠與小葉鋸口；三層葉冠彼此異節。
  for (let k = 0; k < 13; k++) {
    const x = cx - 66 + k * 11;
    橢(x, 786 + (k % 2) * 1.2, 2.4 + (k % 3) * .22, 2.1, 0, 1.05, .72);
    if (k < 12) 線(x + 3.5, 710, x + 8.8, 720 + (k % 3) * 2, 1.05, .62);
  }
  線(cx - 72, 780, cx - 72, 2132, 4.4);
  線(cx + 72, 780, cx + 72, 2132, 4.4);
  // 深凹槽：每槽雙緣、槽首舌形、槽尾圓收，間距循環微差。
  for (let k = -7; k <= 7; k++) {
    const x = cx + k * 8.6 + (k % 3) * .55;
    描(1.7, p => {
      p.moveTo(x, 805); p.quadraticCurveTo(x - 4.6 - (k % 2), 827, x, 849);
      p.lineTo(x, 2072); p.quadraticCurveTo(x + 4.2 + (k % 3) * .7, 2094, x, 2110);
    }, .67 + ((k + 7) % 4) * .045);
    if (k < 7) 描(1.08, p => {
      p.moveTo(x + 3.4, 852); p.lineTo(x + 3.4, 2068);
    }, .48 + ((k + 8) % 3) * .05);
  }
  for (let y = 838, j = 0; y < 2080; y += 58 + (j++ % 4) * 5) {
    橢(cx - 61, y, 3.8, 2.2, .2, .8, .5);
    橢(cx + 61, y + 7 + (j % 3) * 2, 3.6, 2.1, -.2, .8, .5);
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
  const { 描, 線, 橢 } = 筆具(ctx);
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
  // 榻身三格：只施灰泥淺刻異紋；修層仍循股膝、脛囊、足形蔽去其下紋。
  for (const x of [410, 690, 1110, 1390]) 線(x, 1988, x, 2182, 3.1);
  const 格 = [[410, 690], [690, 1110], [1110, 1390]];
  for (let g = 0; g < 格.length; g++) {
    const [l, r] = 格[g], t = 1998, b = 2172;
    ctx.save(); ctx.beginPath(); ctx.rect(l + 9, t, r - l - 18, b - t); ctx.clip();
    if (g === 0) {
      // 左・菱格：兩向刻線節距交錯，菱心疏點，不作整版複拓。
      for (let k = -8; k < 19; k++) {
        const x0 = l + 12 + k * (28 + (k % 3) * 2.5);
        線(x0, b + 8, x0 + 186, t - 8, 2.12 + (k % 2) * .16, .62 + ((k % 4) + 4) % 4 * .025);
        線(x0 + 6.5, b + 8, x0 + 192.5, t - 8, 1.46 + (k % 3) * .1, .6 + ((k % 4) + 4) % 4 * .025);
        if (k % 2) 線(x0 - 6, b + 8, x0 + 180, t - 8, 1.08, .6 + ((k % 3) + 3) % 3 * .03);
      }
      for (let k = -7; k < 18; k++) {
        const x0 = l + 5 + k * (31 + (k % 4) * 1.8);
        線(x0, t - 7, x0 + 174, b + 7, 2.02 + (k % 3) * .12, .61 + ((k % 5) + 5) % 5 * .022);
        線(x0 + 6, t - 7, x0 + 180, b + 7, 1.38 + (k % 2) * .12, .6 + ((k % 5) + 5) % 5 * .022);
        if (k % 2 === 0) 線(x0 - 6, t - 7, x0 + 168, b + 7, 1.06, .6 + ((k % 4) + 4) % 4 * .03);
      }
      for (let row = 0; row < 4; row++) for (let col = 0; col < 5; col++) {
        if ((row * 2 + col) % 4 === 1) continue;
        橢(l + 35 + col * 51 + (row % 2) * 13, t + 25 + row * 43,
          2.7 + (row + col) % 3 * .45, 2.2 + col % 2 * .35, 0, 1.18, .61 + row * .025);
        if ((row + col) % 3 === 0) 橢(l + 35 + col * 51 + (row % 2) * 13,
          t + 25 + row * 43, 6.2, 4.8, (row - col) * .08, 1.48, .6 + row * .025);
      }
    } else if (g === 1) {
      // 中・圓花：花徑、瓣數、錯列俱異，留出灰泥呼吸隙。
      for (let row = 0; row < 4; row++) for (let col = 0; col < 7; col++) {
        const cx = l + 35 + col * 58 + (row % 2) * 18;
        const cy = t + 25 + row * 43 + (col % 3 - 1) * 2;
        const rr = 12 + ((row * 3 + col) % 4) * 1.4, petals = 5 + (row + col) % 4;
        橢(cx, cy, 3 + (col % 3) * .35, 3, 0, 1.62, .64);
        橢(cx, cy, 6.1 + (row % 2), 5.5 + (col % 2), 0, 1.34, .6 + (col % 3) * .035);
        for (let p = 0; p < petals; p++) {
          const a = p * Math.PI * 2 / petals + (row - col) * .06;
          const px = cx + Math.cos(a) * rr * .66, py = cy + Math.sin(a) * rr * .66;
          橢(px, py, rr * .46, rr * .22, a, 1.74 + (p % 2) * .12, .61 + (p % 4) * .025);
          if ((p + row) % 2 === 0) 線(cx + Math.cos(a) * 6, cy + Math.sin(a) * 6,
            cx + Math.cos(a) * rr, cy + Math.sin(a) * rr, 1.12, .6 + (p % 3) * .035);
        }
        橢(cx, cy, rr + 2.8, rr + 2.2, 0, 1.34 + (row + col) % 2 * .12,
          .6 + (row + col) % 4 * .025);
        橢(cx, cy, rr + 5.8 + row % 2, rr + 5 + col % 2, 0,
          1.18 + (row + col) % 3 * .08, .6 + (row + col) % 3 * .035);
      }
      // 大花隙中另落小珠花，錯位而不連成同印網。
      for (let row = 0; row < 3; row++) for (let col = 0; col < 6; col++) {
        const cx = l + 62 + col * 58 + (row % 2) * 16, cy = t + 47 + row * 43;
        橢(cx, cy, 4.5 + (row + col) % 2, 4.5, 0, 1.08, .6 + col % 3 * .035);
        for (let p = 0; p < 4 + (row + col) % 2; p++) {
          const a = p * Math.PI * 2 / (4 + (row + col) % 2);
          橢(cx + Math.cos(a) * 7, cy + Math.sin(a) * 7, 4.6, 1.7, a, 1.02, .6 + p * .025);
        }
      }
    } else {
      // 右・斜籬：長篾同向、短繫錯節；節距逐欄微變，與左格菱網判然。
      for (let k = -3, x0 = l - 25; x0 < r + 85; k++, x0 += 23 + (k % 4) * 2.7) {
        線(x0, b + 8, x0 + 82 + (k % 3) * 7, t - 8,
          2.24 + (k % 3) * .14, .61 + ((k % 5) + 5) % 5 * .022);
        線(x0 + 6.5, b + 5, x0 + 88.5 + (k % 3) * 7, t - 5,
          1.54 + (k % 2) * .1, .6 + ((k % 4) + 4) % 4 * .03);
        if (k % 2 === 0) 線(x0 - 6, b + 5, x0 + 76 + (k % 3) * 7, t - 5,
          1.1, .6 + ((k % 3) + 3) % 3 * .035);
      }
      for (let row = 0, yy = t + 24; yy < b; row++, yy += 34 + (row % 3) * 5) {
        const inset = 7 + (row * 17) % 31;
        線(l + inset, yy, r - 10 - (row * 11) % 29, yy + (row % 2 ? 4 : -3),
          1.86 + (row % 3) * .12, .6 + (row % 4) * .03);
        線(l + inset + 4, yy + 6, r - 14 - (row * 11) % 29, yy + 6 + (row % 2 ? 4 : -3),
          1.26 + (row % 2) * .1, .6 + (row % 4) * .03);
        if (row % 2) 線(l + inset + 2, yy - 6, r - 12 - (row * 11) % 29,
          yy - 6 + (row % 2 ? 4 : -3), 1.04, .6 + (row % 3) * .035);
        for (let knot = l + 31 + (row % 2) * 14; knot < r - 20; knot += 58 + (row % 3) * 3) {
          橢(knot, yy + (row % 2 ? 2 : -1), 3.2 + row % 3 * .35, 2.1, .18, 1.24, .6 + row % 4 * .03);
        }
      }
    }
    ctx.restore();
  }
  // 下沿斜齒，疏密與傾角循序變化。
  for (let k = 0, x = 425; x < 1378; k++, x += 25 + (k % 4) * 3) {
    const lean = 7 + (k % 5) * 2;
    線(x, 2187, x + (k % 2 ? lean : -lean), 2208, 1.45, .76);
  }
  // 榻座前沿二帶：上層錯瓣連珠，下層雙股繩結；不侵三格空欄。
  線(382, 2234, 1418, 2234, 3.2);
  線(394, 2274, 1406, 2274, 3.8);
  for (let k = 0, x = 410; x <= 1390; k++, x += 17 + (k % 3)) {
    const r = 4.2 + (k % 4) * .42, yy = 2254 + (k % 2 ? 2.4 : -2.4);
    橢(x, yy, r, r * (.72 + (k % 3) * .05), (k % 2 ? .18 : -.18), 1.05, .72);
    if (k % 3 === 0) 橢(x, yy, 1.25, 1.25, 0, .72, .58);
  }
  for (const phase of [0, Math.PI]) 描(1.35, p => {
    for (let x = 398, first = true; x <= 1402; x += 5) {
      const q = (x - 398) / 1004;
      const yy = 2294 + Math.sin(q * Math.PI * 22 + phase) * (7 + 1.7 * Math.sin(q * Math.PI * 3));
      if (first) { p.moveTo(x, yy); first = false; } else p.lineTo(x, yy);
    }
  }, .68);
  線(382, 2314, 1418, 2314, 3.6);
}

export function 景(ctx, 助) {
  驗助(助);
  ctx.save();
  try {
    灰泥背壁(ctx); 拱楣(ctx); 葉幔(ctx); 柱(ctx, 255); 柱(ctx, 1545);
  } finally { ctx.restore(); }
}

export function 飾(ctx, 助) {
  驗助(助);
  ctx.save();
  try { 基座(ctx); } finally { ctx.restore(); }
}
