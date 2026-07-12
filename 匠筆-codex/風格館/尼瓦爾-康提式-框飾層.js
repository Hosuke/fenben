// 尼瓦爾-康提式・框飾層——分層之制之一（景）與三（飾）
// 【所留】多重外框紋帶、120/124 指異制並陳注欄、疏密植物織幕、康提蓮座與方臺。
// 【所刪】主尊頭面髮髻、鐘形大衣、衣浪、膝足、雙臂手印與瞳；舊頭頸／鐘衣／手印三處人形清形全刪。
// 【改製】植物逐叢異枝、異葉、異花而不鏡拓；頂光改同心素雙圈，斷筆避讓主坊 siraspata 七舌焰。
// 【追記・合席修】座頂仰蓮上沿落 y=1760、承膝左右各餘百餘；上下各二重橫帶，四帶異紋不複拓。
// 【追記・分層補筆】中幅上緣 y=182..296、座下 y=2160..2290 各置二重橫帶；卷草波、連珠夾點、細鋸齒、素線四式各守一帶，止於注欄內側。
// 【自評】景無人形洞且枝蔓橫過舊衣區；尊位座面錨仍為 y=1756，框座自 y=1760 連續下承。

import {
  造線筆,
  連珠橫,
  菱花橫,
  轉直,
} from './lib/白描幀具.js';

export const 尊位 = Object.freeze({
  W: 1800,
  H: 2500,
  頂y: 600,
  指: 17,
  中x: 900,
  座面: 1756,
});

const 墨 = '#d8b36a';
const 暗朱 = '#a9533d';
const 葉青 = '#718d78';
const 冷灰 = '#778198';
const TAU = Math.PI * 2;

function 斷(真, 訊) {
  console.assert(真, 訊);
  if (!真) throw new Error(訊);
}

function 驗助(助) {
  斷(助 && 助.尊位, '尼瓦爾-康提式框飾層：缺 助.尊位');
  const { W, H, 尊位: 位 } = 助;
  斷(W === 1800 && H === 2500, `畫幅失守：${W}×${H}`);
  for (const 名 of ['W', 'H', '頂y', '指', '中x']) {
    斷(位[名] === 尊位[名], `尊位失守：${名}=${位[名]}（應 ${尊位[名]}）`);
  }
  const 座面 = 位.座面 ?? 位.頂y + 68 * 位.指;
  斷(座面 === 位.頂y + 68 * 位.指, `座面非頂y+68指：${座面}`);
  斷(座面 === 尊位.座面, `座面錨失守：${座面}`);
  return { ...位, 座面 };
}

function 描路(ctx, 色, 寬, 透明, 落) {
  ctx.save();
  ctx.strokeStyle = 色;
  ctx.lineWidth = 寬;
  ctx.globalAlpha = 透明;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  落(ctx);
  ctx.stroke();
  ctx.restore();
}

function 矩(ctx, x, y, w, h, 寬 = 1.25, 透明 = 1, 色 = 墨) {
  描路(ctx, 色, 寬, 透明, p => p.rect(x, y, w, h));
}

function 三次點(p0, c1, c2, p1, t) {
  const s = 1 - t;
  return [
    s ** 3 * p0[0] + 3 * s * s * t * c1[0] + 3 * s * t * t * c2[0] + t ** 3 * p1[0],
    s ** 3 * p0[1] + 3 * s * s * t * c1[1] + 3 * s * t * t * c2[1] + t ** 3 * p1[1],
  ];
}

function 亂源(seed) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 0x100000000;
  };
}

function 葉片(ctx, cx, cy, 長, 闊, 轉, 型 = 0, 透明 = .55, 色 = 葉青) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(轉);
  const 肩 = 型 % 3 === 0 ? .22 : 型 % 3 === 1 ? .35 : .47;
  const 尖 = 型 % 2 ? 長 * .58 : 長 * .72;
  描路(ctx, 色, 型 % 4 === 0 ? 1.12 : .82, 透明, p => {
    p.moveTo(-長 * .48, 0);
    p.bezierCurveTo(-長 * 肩, -闊, 長 * .18, -闊 * (型 % 2 ? .72 : 1.08), 長 * .5, 0);
    p.bezierCurveTo(長 * .15, 闊 * (型 % 3 ? .82 : 1.12), -長 * .28, 闊, -長 * .48, 0);
    p.moveTo(-長 * .4, 0);
    p.lineTo(尖, 0);
    if (型 % 3 === 2) {
      p.moveTo(-長 * .08, 0);
      p.lineTo(長 * .06, -闊 * .68);
      p.moveTo(長 * .12, 0);
      p.lineTo(長 * .27, 闊 * .55);
    }
  });
  ctx.restore();
}

function 花朵(ctx, cx, cy, 半徑, 瓣數, 轉 = 0, 透明 = .58, 色 = 墨) {
  const 變 = 1 + ((瓣數 * 7 + Math.round(cx + cy)) % 5) * .035;
  for (let k = 0; k < 瓣數; k++) {
    const q = 轉 + TAU * k / 瓣數;
    const 長 = 半徑 * (k % 3 === 0 ? 變 : k % 3 === 1 ? .86 : .94);
    const 闊 = 半徑 * (瓣數 > 7 ? .22 : .3);
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(q);
    描路(ctx, 色, k % 4 === 0 ? .92 : .72, 透明, p => {
      p.moveTo(2, 0);
      p.bezierCurveTo(長 * .28, -闊, 長 * .76, -闊 * .62, 長, 0);
      p.bezierCurveTo(長 * .72, 闊 * .66, 長 * .27, 闊, 2, 0);
    });
    ctx.restore();
  }
  描路(ctx, 色, .78, 透明 * .9, p => p.arc(cx, cy, Math.max(2.4, 半徑 * .14), 0, TAU));
}

function 畫折枝(ctx, 配) {
  const {
    seed, x, base, h, lean, 節, 密 = .55, 色 = 葉青, 側偏 = 1,
  } = 配;
  const rand = 亂源(seed);
  const p0 = [x, base];
  const c1 = [x + (rand() - .5) * 58, base - h * (.27 + rand() * .08)];
  const c2 = [x + lean * .58 + (rand() - .5) * 72, base - h * (.67 + rand() * .08)];
  const p1 = [x + lean, base - h];
  描路(ctx, 色, 1.35 + rand() * .75, 密, p => {
    p.moveTo(...p0);
    p.bezierCurveTo(...c1, ...c2, ...p1);
  });
  描路(ctx, 墨, .66, 密 * .48, p => {
    p.moveTo(x + 7, base - 5);
    p.bezierCurveTo(c1[0] + 5, c1[1], c2[0] - 4, c2[1], p1[0] + 3, p1[1] + 2);
  });

  for (let j = 0; j < 節; j++) {
    const t = .11 + (j + .35 + rand() * .5) / (節 + 1) * .82;
    const [bx, by] = 三次點(p0, c1, c2, p1, t);
    const side = ((j + seed) % 3 === 0 ? -1 : 1) * 側偏;
    const branch = 42 + rand() * 82 + (j % 4) * 7;
    const rise = 24 + rand() * 52;
    const ex = bx + side * branch;
    const ey = by - rise;
    描路(ctx, 色, .68 + rand() * .38, 密 * (.78 + rand() * .18), p => {
      p.moveTo(bx, by);
      p.bezierCurveTo(bx + side * branch * .27, by - 5 - rand() * 18,
        ex - side * branch * .28, ey + 8 + rand() * 13, ex, ey);
    });
    const q = Math.atan2(ey - by, ex - bx);
    葉片(ctx, bx + (ex - bx) * (.38 + rand() * .16), by + (ey - by) * .45,
      27 + rand() * 25, 6 + rand() * 7, q + (side > 0 ? -.28 : Math.PI + .28),
      (seed + j) % 5, 密 * (.78 + rand() * .18), 色);
    if (j % 2 === seed % 2 || rand() > .7) {
      葉片(ctx, ex - side * (8 + rand() * 15), ey + 4 + rand() * 9,
        24 + rand() * 28, 6 + rand() * 7, q + (side > 0 ? .22 : Math.PI - .22),
        (seed + j * 2 + 1) % 6, 密 * (.74 + rand() * .2), 色);
    }
    if ((j + seed) % 3 === 1 || (節 < 7 && j === 節 - 1)) {
      花朵(ctx, ex + side * (2 + rand() * 8), ey - 4 - rand() * 8,
        7 + rand() * 7, 5 + ((seed + j) % 5), rand() * .7, 密 * .94, j % 4 ? 墨 : 暗朱);
    }
  }
}

function 畫橫枝(ctx, { seed, x0, x1, y, 起伏, 節, 透明 = .35, 色 = 葉青 }) {
  const rand = 亂源(seed);
  const p0 = [x0, y + (rand() - .5) * 起伏];
  const c1 = [x0 + (x1 - x0) * .31, y - 起伏 * (.5 + rand())];
  const c2 = [x0 + (x1 - x0) * .69, y + 起伏 * (.35 + rand())];
  const p1 = [x1, y + (rand() - .5) * 起伏];
  描路(ctx, 色, .72 + rand() * .45, 透明, p => {
    p.moveTo(...p0);
    p.bezierCurveTo(...c1, ...c2, ...p1);
  });
  for (let j = 0; j < 節; j++) {
    const t = .06 + (j + .25 + rand() * .55) / 節 * .88;
    const [bx, by] = 三次點(p0, c1, c2, p1, t);
    const up = (j + seed) % 2 ? 1 : -1;
    const rot = (up > 0 ? .52 : -.52) + (rand() - .5) * .45;
    葉片(ctx, bx, by + up * (4 + rand() * 7), 31 + rand() * 28, 7 + rand() * 7,
      rot, (seed + j) % 7, 透明 * (.78 + rand() * .3), 色);
    if ((j + 2 * seed) % 4 === 0) {
      花朵(ctx, bx + (rand() - .5) * 18, by - up * (7 + rand() * 9),
        6 + rand() * 6, 5 + ((j + seed) % 4), rand(), 透明 * .96, j % 3 ? 墨 : 暗朱);
    }
  }
}

function 畫植物織幕(ctx) {
  // 每叢各有獨立種子、枝數、傾勢與色階；左右只守重量，不作逐筆鏡印。
  const 叢 = [
    { seed: 1709, x: 372, base: 1715, h: 1190, lean: -76, 節: 11, 密: .58, 側偏: 1 },
    { seed: 811, x: 486, base: 1660, h: 875, lean: 58, 節: 8, 密: .47, 色: 墨, 側偏: -1 },
    { seed: 2441, x: 603, base: 1605, h: 620, lean: -92, 節: 6, 密: .38, 側偏: 1 },
    { seed: 3907, x: 716, base: 1698, h: 470, lean: 78, 節: 5, 密: .31, 色: 冷灰, 側偏: -1 },
    { seed: 1201, x: 1418, base: 1708, h: 1080, lean: 64, 節: 10, 密: .55, 側偏: -1 },
    { seed: 635, x: 1300, base: 1638, h: 760, lean: -46, 節: 7, 密: .44, 色: 墨, 側偏: 1 },
    { seed: 3199, x: 1186, base: 1588, h: 560, lean: 86, 節: 6, 密: .36, 側偏: -1 },
    { seed: 451, x: 1068, base: 1702, h: 430, lean: -70, 節: 4, 密: .29, 色: 冷灰, 側偏: 1 },
  ];
  for (const 配 of 叢) 畫折枝(ctx, 配);

  // 上緣分作不等兩簇，髻頂靜區 x=800..1000/y=450..650 不落植物。
  畫橫枝(ctx, { seed: 901, x0: 348, x1: 766, y: 318, 起伏: 52, 節: 7, 透明: .43 });
  畫橫枝(ctx, { seed: 1417, x0: 370, x1: 786, y: 455, 起伏: 38, 節: 6, 透明: .38, 色: 墨 });
  畫橫枝(ctx, { seed: 2659, x0: 1018, x1: 1435, y: 286, 起伏: 46, 節: 8, 透明: .46, 色: 墨 });
  畫橫枝(ctx, { seed: 3301, x0: 1032, x1: 1410, y: 502, 起伏: 33, 節: 5, 透明: .36 });

  // 三筆穿越舊鐘衣區，令空尊驗幀不呈人形清洞；日後自為尊身遮住。
  畫橫枝(ctx, { seed: 509, x0: 420, x1: 1390, y: 1085, 起伏: 58, 節: 11, 透明: .24, 色: 冷灰 });
  畫橫枝(ctx, { seed: 2081, x0: 360, x1: 1450, y: 1338, 起伏: 72, 節: 13, 透明: .27 });
  畫橫枝(ctx, { seed: 3761, x0: 430, x1: 1372, y: 1552, 起伏: 44, 節: 9, 透明: .25, 色: 墨 });

  // 幕之經線皆不等距、不封人物外廓，只將疏密叢簇織成一體。
  for (const [x, y0, y1, bend, a, 色] of [
    [350, 548, 1724, 36, .19, 冷灰], [541, 718, 1710, -28, .16, 葉青],
    [686, 1120, 1690, 42, .14, 墨], [1118, 1080, 1706, -33, .15, 冷灰],
    [1264, 790, 1718, 27, .17, 葉青], [1438, 602, 1722, -40, .2, 墨],
  ]) {
    描路(ctx, 色, .62, a, p => {
      p.moveTo(x, y0);
      p.bezierCurveTo(x + bend, y0 + (y1 - y0) * .31,
        x - bend * .7, y0 + (y1 - y0) * .69, x + bend * .12, y1);
    });
  }
}

function 畫素圈頭光(ctx, 位) {
  const C = 位.中x;
  const cy = 830;
  const 焰域 = (x, y) => x > 800 && x < 1000 && y < 650;
  const 圓避焰 = (r, 寬, 透明, 色) => {
    描路(ctx, 色, 寬, 透明, p => {
      let 開 = false;
      for (let k = 0; k <= 360; k++) {
        const q = TAU * k / 360;
        const x = C + Math.cos(q) * r;
        const y = cy + Math.sin(q) * r;
        if (焰域(x, y)) { 開 = false; continue; }
        if (!開) { p.moveTo(x, y); 開 = true; } else p.lineTo(x, y);
      }
    });
  };

  // Kandyan 判準：同心素雙圈；中央 y<650 斷筆，全空予主坊七舌焰。
  圓避焰(260, 1.55, .72, 暗朱);
  圓避焰(286, 2.15, .86, 墨);

  // 圈外細點一周；等距而不連珠成第三圈，焰域仍留空。
  for (let k = 0; k < 72; k++) {
    const q = TAU * (k + .5) / 72;
    const x = C + Math.cos(q) * 298;
    const y = cy + Math.sin(q) * 298;
    if (焰域(x, y)) continue;
    描路(ctx, k % 9 === 0 ? 暗朱 : 墨, .66, .54, p => {
      p.arc(x, y, k % 6 === 0 ? 2.5 : 1.75, 0, TAU);
    });
  }

  斷(C === 900 && cy === 830, `素圈頭光中軸失守：${C},${cy}`);
}

function 畫邊花蔓(ctx, { seed, x0, x1, y, 反 = 1, 色 = 葉青 }) {
  const rand = 亂源(seed);
  const 幅 = x1 - x0;
  描路(ctx, 色, .84, .55, p => {
    p.moveTo(x0, y);
    p.bezierCurveTo(x0 + 幅 * .21, y - 13 * 反, x0 + 幅 * .31, y + 19 * 反, x0 + 幅 * .48, y);
    p.bezierCurveTo(x0 + 幅 * .63, y - 22 * 反, x0 + 幅 * .82, y + 11 * 反, x1, y - 3 * 反);
  });
  const 位 = [.035, .093, .162, .239, .306, .391, .472, .548, .631, .711, .803, .875, .948];
  for (let k = 0; k < 位.length; k++) {
    const t = 位[k] + (rand() - .5) * .016;
    const x = x0 + 幅 * t;
    const yy = y + Math.sin((t * 3.7 + rand() * .4) * Math.PI) * 13 * 反;
    葉片(ctx, x, yy, 23 + rand() * 22, 5 + rand() * 7,
      (k % 2 ? .44 : Math.PI - .44) * 反, k + seed, .48 + rand() * .12, 色);
    if ((k + seed) % 3 === 0) 花朵(ctx, x + (k % 2 ? 9 : -9), yy - 8 * 反,
      5 + rand() * 5, 5 + ((k + seed) % 5), rand(), .52, k % 4 ? 墨 : 暗朱);
  }
}

function 畫外框(ctx) {
  const 金 = 造線筆(ctx, { 墨, 骨: 3.2, 衣: 1.2, 鬚: .68 });
  const 朱 = 造線筆(ctx, { 墨: 暗朱, 骨: 2.2, 衣: 1.05, 鬚: .58 });
  for (const [r, w, a, 色] of [
    [28, 3.1, .94, 墨], [43, 1.0, .58, 暗朱], [58, 1.75, .76, 墨],
    [82, .86, .52, 冷灰], [112, 1.8, .72, 墨], [148, 1.05, .56, 暗朱],
  ]) 矩(ctx, r, r, 尊位.W - 2 * r, 尊位.H - 2 * r, w, a, 色);

  連珠橫(金, 70, 1730, 76, { step: 23, r: 5.1, 寬: 1.05 });
  連珠橫(金, 70, 1730, 2424, { step: 23, r: 5.1, 寬: 1.05 });
  菱花橫(朱, 92, 1708, 111, { step: 31, h: 8.4, 寬: .9 });
  菱花橫(朱, 92, 1708, 2389, { step: 31, h: 8.4, 寬: .9 });
  轉直(ctx, 70, 2430, 76, (a, b, y) => 連珠橫(金, a, b, y, { step: 23, r: 5.1, 寬: 1.05 }));
  轉直(ctx, 70, 2430, 1724, (a, b, y) => 連珠橫(金, a, b, y, { step: 23, r: 5.1, 寬: 1.05 }));
  轉直(ctx, 92, 2408, 111, (a, b, y) => 菱花橫(朱, a, b, y, { step: 31, h: 8.4, 寬: .9 }));
  轉直(ctx, 92, 2408, 1689, (a, b, y) => 菱花橫(朱, a, b, y, { step: 31, h: 8.4, 寬: .9 }));
}

function 畫中幅橫帶(ctx) {
  // Coomaraswamy 橫帶連環：四帶各異紋，不以上下鏡拓充數。
  // 帶端 x=350..1450，與左右注欄 x=171..334／1466..1629 留縫，絕不穿欄。
  const x0 = 350;
  const x1 = 1450;
  const w = x1 - x0;

  // 上一・卷草波（y=182..230）。
  矩(ctx, x0, 182, w, 48, .82, .58, 墨);
  描路(ctx, 葉青, .9, .58, p => {
    p.moveTo(x0 + 10, 206);
    for (let x = x0 + 10, k = 0; x < x1 - 10; x += 44, k++) {
      const end = Math.min(x + 44, x1 - 10);
      const span = end - x;
      const lift = k % 2 ? 14 : -14;
      p.bezierCurveTo(x + span * .24, 206 + lift, x + span * .76, 206 + lift, end, 206);
    }
  });
  // 上二・連珠夾點（y=250..296）：珠間另夾小點，與外框舊連珠有別。
  矩(ctx, x0, 250, w, 46, .82, .58, 暗朱);
  for (let x = x0 + 14, k = 0; x <= x1 - 14; x += 28, k++) {
    描路(ctx, k % 5 ? 墨 : 暗朱, .72, .62, p => p.arc(x, 273, 4.2, 0, TAU));
    if (x + 14 <= x1 - 10) 描路(ctx, 冷灰, .64, .52, p => p.arc(x + 14, 273, 1.45, 0, TAU));
  }

  // 下一・細鋸齒（y=2160..2210）。
  矩(ctx, x0, 2160, w, 50, .86, .6, 墨);
  描路(ctx, 暗朱, .76, .62, p => {
    p.moveTo(x0 + 10, 2198);
    for (let x = x0 + 10, k = 0; x < x1 - 10; x += 18, k++) {
      p.lineTo(Math.min(x + 9, x1 - 10), 2172 + (k % 2 ? 2 : 0));
      p.lineTo(Math.min(x + 18, x1 - 10), 2198);
    }
  });

  // 下二・素線（y=2240..2290），只以線距成節，不置任何母題。
  矩(ctx, x0, 2240, w, 50, .92, .64, 冷灰);
  for (const [y, 線寬, a, 色] of [[2252, .7, .46, 暗朱], [2265, 1.55, .7, 墨], [2278, .7, .46, 暗朱]]) {
    描路(ctx, 色, 線寬, a, p => { p.moveTo(x0 + 10, y); p.lineTo(x1 - 10, y); });
  }

  斷(182 >= 170 && 296 <= 330, '中幅上緣橫帶逸出 y=170..330');
  斷(2160 >= 2150 && 2290 <= 2330, '座下橫帶逸出 y=2150..2330');
  斷(x0 > 334 && x1 < 1466, '中幅橫帶侵入兩側注欄');
}

function 描字(ctx, 字, x, y, { 尺寸 = 18, 色 = 墨, 透明 = .74, 對齊 = 'left' } = {}) {
  ctx.save();
  ctx.font = `500 ${尺寸}px "Noto Serif CJK TC", "Songti TC", serif`;
  ctx.textAlign = 對齊;
  ctx.textBaseline = 'alphabetic';
  ctx.strokeStyle = 色;
  ctx.lineWidth = Math.max(.72, 尺寸 / 19);
  ctx.globalAlpha = 透明;
  ctx.lineJoin = 'round';
  ctx.strokeText(字, x, y);
  ctx.restore();
}

function 畫刻尺(ctx, { x, y0, y1, n, 向, 題, 副題 }) {
  描路(ctx, 墨, 1.4, .72, p => {
    p.moveTo(x, y0);
    p.lineTo(x, y1);
  });
  for (let k = 0; k <= n; k++) {
    const y = y0 + (y1 - y0) * k / n;
    const major = k % 12 === 0;
    const len = major ? 18 : k % 4 === 0 ? 11 : 6;
    描路(ctx, major ? 墨 : 冷灰, major ? 1.18 : .7, major ? .72 : .5, p => {
      p.moveTo(x, y);
      p.lineTo(x + 向 * len, y);
    });
  }
  描字(ctx, 題, x + 向 * 4, y0 - 38, { 尺寸: 19, 對齊: 向 < 0 ? 'right' : 'left', 透明: .82 });
  描字(ctx, 副題, x + 向 * 4, y0 - 14, { 尺寸: 14, 色: 冷灰, 對齊: 向 < 0 ? 'right' : 'left', 透明: .7 });
}

function 畫異制注欄(ctx) {
  const y0 = 530;
  const y1 = 1690;
  矩(ctx, 171, 430, 163, 1308, 1.25, .62, 暗朱);
  矩(ctx, 1466, 430, 163, 1308, 1.25, .62, 暗朱);
  矩(ctx, 180, 439, 145, 1290, .72, .42, 冷灰);
  矩(ctx, 1475, 439, 145, 1290, .72, .42, 冷灰);

  畫刻尺(ctx, {
    x: 307, y0, y1, n: 120, 向: -1,
    題: 'T1419・120 指', 副題: '十搩・每搩十二指',
  });
  畫刻尺(ctx, {
    x: 1493, y0, y1, n: 124, 向: 1,
    題: '124 指・異制', 副題: 'Śāriputra / Bimbamāna',
  });

  const 左 = ['畫像 120 指格', '白毫十二・頦二十', '心窩三十六', '臍四十八・座六十八', '錨只屬本制'];
  const 右 = ['錫蘭上品 124 指', '另列四指，不拆補', '不投影入尊身', '共源異流', '嚴禁互混'];
  for (let k = 0; k < 左.length; k++) 描字(ctx, 左[k], 188, 1510 + k * 38, { 尺寸: 15, 透明: .72 });
  for (let k = 0; k < 右.length; k++) 描字(ctx, 右[k], 1484, 1510 + k * 38, { 尺寸: 15, 透明: .72 });
  斷(120 === 10 * 12 && 124 === 10 * 12 + 4, '120/124 指異制刻數失守');
}

function 畫蓮座方臺(ctx, 位) {
  const 金 = 造線筆(ctx, { 墨, 骨: 4.1, 衣: 1.9, 鬚: .82 });
  const { 線, 貝, 圓 } = 金;
  const S = 位.座面;
  const VP = [位.中x, 1450];
  const 膝半 = 26 * 位.指;
  const 座頂 = S + 4;
  const 座半 = 550;

  // 主尊臀底錨仍為 S=1756；可見仰蓮帶上沿只隔四像素，座自此連續下承。
  線([[位.中x - 座半, 座頂], [位.中x + 座半, 座頂]], 4.15, false, .96);
  貝([位.中x - 座半, 座頂], [位.中x - 280, 座頂 + 22], [位.中x + 280, 座頂 + 22], [位.中x + 座半, 座頂], 1.55, .64);
  斷(位.中x - 膝半 === 458 && 位.中x + 膝半 === 1342, '膝寬 52 指失守');
  斷(458 - (位.中x - 座半) >= 100 && 位.中x + 座半 - 1342 >= 100, '蓮座承膝餘量未滿百像素');

  const 上base = 座頂 + 74;
  const 上半 = 574;
  const 上數 = 12;
  for (let k = 0; k < 上數; k++) {
    const t = (k + .5) / 上數;
    const cx = 位.中x - 上半 + 2 * 上半 * t;
    const ww = 2 * 上半 / 上數 * (.94 + (k % 3) * .025);
    const arch = 1 - ((cx - 位.中x) / 上半) ** 2;
    const baseY = 上base + 9 * arch;
    const tipY = 座頂 + (1 - arch) * 15 + (k % 2) * 3;
    貝([cx - ww / 2, baseY], [cx - ww * .42, baseY - 48], [cx - ww * .17, tipY + 15], [cx, tipY], 1.8, .86);
    貝([cx, tipY], [cx + ww * .17, tipY + 15], [cx + ww * .42, baseY - 48], [cx + ww / 2, baseY], 1.8, .86);
    貝([cx - ww * .19, baseY - 3], [cx - ww * .12, baseY - 31], [cx - ww * .06, tipY + 20], [cx, tipY + 10], .76, .54);
    if (k % 3 === 1) 圓(cx, baseY - 18, 2.7, .65, .45);
  }

  線([[310, 座頂 + 78], [1490, 座頂 + 78]], 2.1, false, .78);
  線([[296, 座頂 + 94], [1504, 座頂 + 94]], .92, false, .55);
  const 下base = 座頂 + 98;
  const 下半 = 604;
  const 下數 = 13;
  for (let k = 0; k < 下數; k++) {
    const t = (k + .5) / 下數;
    const cx = 位.中x - 下半 + 2 * 下半 * t;
    const ww = 2 * 下半 / 下數 * (.91 + (k % 4) * .018);
    const arch = 1 - ((cx - 位.中x) / 下半) ** 2;
    const baseY = 下base + 8 * arch;
    const tipY = 座頂 + 142 - 14 * arch + (k % 3) * 3;
    貝([cx - ww / 2, baseY], [cx - ww * .38, baseY + 31], [cx - ww * .16, tipY - 9], [cx, tipY], 1.48, .76);
    貝([cx, tipY], [cx + ww * .16, tipY - 9], [cx + ww * .38, baseY + 31], [cx + ww / 2, baseY], 1.48, .76);
  }

  const back = { y: 座頂 + 150, a: 604 };
  const 半寬 = y => back.a * (y - VP[1]) / (back.y - VP[1]);
  const front = { y: 座頂 + 198, a: 半寬(座頂 + 198) };
  線([[位.中x - back.a, back.y], [位.中x + back.a, back.y]], 3.35, false, .9);
  線([[位.中x - back.a, back.y], [位.中x - front.a, front.y]], 2.15, false, .82);
  線([[位.中x + back.a, back.y], [位.中x + front.a, front.y]], 2.15, false, .82);
  線([[位.中x - front.a, front.y], [位.中x + front.a, front.y]], 3.7, false, .94);
  for (const y of [座頂 + 165, 座頂 + 182]) {
    const a = 半寬(y);
    線([[位.中x - a, y], [位.中x + a, y]], .86, false, .54);
  }
  // 方臺前身保持正視垂線；臺面全部深度側棱則共 VP。
  const footY = 座頂 + 280;
  線([[位.中x - front.a, front.y], [位.中x - front.a, footY]], 2.3, false, .82);
  線([[位.中x + front.a, front.y], [位.中x + front.a, footY]], 2.3, false, .82);
  線([[位.中x - front.a, footY], [位.中x + front.a, footY]], 3.3, false, .9);
  for (const y of [座頂 + 220, 座頂 + 242, 座頂 + 266]) 線([[位.中x - front.a, y], [位.中x + front.a, y]], y === 座頂 + 242 ? 1.45 : .82, false, .58);
  連珠橫(金, 位.中x - front.a + 18, 位.中x + front.a - 18, 座頂 + 250, { step: 28, r: 4.2, 寬: .86, 套心: false });
  菱花橫(造線筆(ctx, { 墨: 暗朱, 骨: 2, 衣: 1, 鬚: .55 }),
    位.中x - front.a + 23, 位.中x + front.a - 23, 座頂 + 270, { step: 34, h: 8, 寬: .78 });

  const 左交 = (位.中x - back.a - VP[0]) * (front.y - VP[1])
    - (位.中x - front.a - VP[0]) * (back.y - VP[1]);
  const 右交 = (位.中x + back.a - VP[0]) * (front.y - VP[1])
    - (位.中x + front.a - VP[0]) * (back.y - VP[1]);
  斷(Math.abs(左交) < 1e-6 && Math.abs(右交) < 1e-6, '方臺側棱未共滅點');
  斷(S === 1756 && 座頂 >= 1754 && 座頂 <= 1766 && front.a > back.a, '座面、座頂或方臺透視失守');
}

export async function 景(ctx, 助) {
  const 位 = 驗助(助);
  ctx.save();
  try {
    畫植物織幕(ctx);
    畫素圈頭光(ctx, 位);
  } finally {
    ctx.restore();
  }
}

export async function 飾(ctx, 助) {
  const 位 = 驗助(助);
  ctx.save();
  try {
    畫外框(ctx);
    畫中幅橫帶(ctx);
    畫異制注欄(ctx);
    畫蓮座方臺(ctx, 位);
  } finally {
    ctx.restore();
  }
}
