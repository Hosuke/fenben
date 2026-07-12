// 尼瓦爾-蒲甘壁畫期・框飾層（景／飾）
// 身形全歸主坊：本檔不畫主尊、小尊、侍者或手印圖示。

import { 造線筆, 連珠橫, 菱花橫, 蓮瓣橫, 轉直 } from './lib/白描幀具.js';

export const 尊位 = Object.freeze({
  W: 1800,
  H: 2500,
  頂y: 690,
  指: 15,
  中x: 900,
  座面: 1710,
});

const 墨 = '#d8b36a';
const TAU = Math.PI * 2;

function 斷(真, 訊) {
  console.assert(真, 訊);
  if (!真) throw new Error(訊);
}

function 驗助(助) {
  斷(助 && 助.尊位, '蒲甘框飾層：缺 助.尊位');
  for (const 名 of ['W', 'H', '頂y', '指', '中x', '座面']) {
    斷(助.尊位[名] === 尊位[名], `尊位失守：${名}`);
  }
  斷(尊位.座面 === 尊位.頂y + 68 * 尊位.指, '座面非頂y+68指');
}

function 菩提葉(筆, cx, cy, s, rot = 0, a = .64) {
  const { ctx } = 筆;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rot);
  筆.筆(1, a);
  ctx.beginPath();
  ctx.moveTo(0, s * .68);
  ctx.bezierCurveTo(-s * .5, s * .22, -s * .48, -s * .34, 0, -s * .18);
  ctx.bezierCurveTo(s * .48, -s * .34, s * .5, s * .22, 0, s * .68);
  ctx.moveTo(0, -s * .18); ctx.lineTo(0, s * .86);
  for (let j = 0; j < 4; j++) {
    const y = -s * .04 + j * s * .13;
    ctx.moveTo(0, y); ctx.lineTo(-s * (.28 - j * .035), y - s * .1);
    ctx.moveTo(0, y); ctx.lineTo(s * (.28 - j * .035), y - s * .1);
  }
  ctx.stroke();
  ctx.restore();
}

function 入髻頂尖拱淨空(x, y) {
  // 尖拱自蕾珠頂起，向下漸披；只退整葉，留葉尖自然參差收口。
  const 離中 = Math.abs(x - 尊位.中x);
  return y >= 580 + 離中 * 1.72 && y <= 770 && 離中 <= 80;
}

function 畫樹冠(筆) {
  const { 貝 } = 筆;
  for (const [sx, sy, ex, ey] of [
    [880, 1320, 270, 420], [890, 1160, 520, 350], [895, 980, 720, 330],
    [920, 1320, 1530, 420], [910, 1160, 1280, 350], [905, 980, 1080, 330],
  ]) 貝([sx, sy], [sx, sy - 260], [ex + (ex < 900 ? 130 : -130), ey + 90], [ex, ey], 1.35, .5);

  for (let row = 0; row < 13; row++) {
    const y = 334 + row * 43;
    const inset = 185 + Math.abs(row - 5) * 22;
    for (let x = inset + (row % 2) * 20, k = 0; x <= 1800 - inset; x += 40, k++) {
      const 葉y = y + Math.sin(k * 1.31 + row) * 10;
      if (入髻頂尖拱淨空(x, 葉y)) continue;
      菩提葉(筆, x, 葉y, 27 + (k % 4) * 3,
        ((k + row) % 5 - 2) * .1, .55);
    }
  }
}

function 畫乾壁(筆) {
  // 兩套錯位裂網遍過中堂；主坊尊身層自行 destination-out 蔽身，框層不預鑿人形洞。
  for (let layer = 0; layer < 2; layer++) {
    const cols = layer ? 21 : 25, rows = layer ? 23 : 27;
    const cw = 1440 / cols, rh = 1540 / rows;
    for (let row = 0; row < rows; row++) for (let col = 0; col < cols; col++) {
      const n = 41 + layer * 997 + row * cols + col;
      const x = 180 + (col + .18) * cw + Math.sin(n * 1.71) * cw * .18;
      const y = 350 + (row + .45) * rh + Math.cos(n * 1.37) * rh * .18;
      const q = Math.sin(n * 2.13) * .92;
      const len = cw * (.72 + (n % 4) * .08);
      const mx = x + Math.cos(q) * len * .46, my = y + Math.sin(q) * len * .46;
      const ex = x + Math.cos(q + Math.sin(n) * .22) * len;
      const ey = y + Math.sin(q + Math.sin(n) * .22) * len;
      筆.線([[x, y], [mx, my], [ex, ey]], .56, false, layer ? .12 : .17);
      if (n % 3 === 0) {
        const b = q + (n % 2 ? .9 : -.84);
        筆.線([[mx, my], [mx + Math.cos(b) * len * .34, my + Math.sin(b) * len * .34]],
          .5, false, .12);
      }
    }
  }
}

function 葉片(筆, cx, cy, len, rot, a = .42) {
  const { ctx } = 筆;
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot); 筆.筆(.76, a);
  ctx.beginPath(); ctx.moveTo(-len * .45, 0);
  ctx.bezierCurveTo(-len * .12, -len * .2, len * .28, -len * .19, len * .55, 0);
  ctx.bezierCurveTo(len * .25, len * .18, -len * .16, len * .2, -len * .45, 0);
  ctx.moveTo(-len * .34, 0); ctx.lineTo(len * .48, 0); ctx.stroke(); ctx.restore();
}

function 畫側林(筆, flip) {
  const baseX = flip > 0 ? 220 : 1580;
  for (let stem = 0; stem < 5; stem++) {
    const x = baseX + flip * stem * 70;
    筆.貝([x, 1905], [x - flip * (24 + stem * 3), 1500],
      [x + flip * (40 - stem * 4), 1060], [x + flip * ((stem % 2) * 46), 690],
      .72, .31 + stem * .018);
  }
  for (let row = 0; row < 17; row++) for (let col = 0; col < 6; col++) {
    const cx = baseX + flip * (18 + col * 60 + (row % 2) * 17);
    const cy = 720 + row * 68 + (col % 2) * 13;
    const rot = flip > 0 ? ((row + col) % 2 ? -.48 : Math.PI + .48)
      : ((row + col) % 2 ? Math.PI + .48 : -.48);
    葉片(筆, cx, cy, 30 + (row + col) % 4 * 5, rot, .34 + (col % 3) * .035);
    if ((row + col) % 4 === 0) {
      筆.圓(cx + flip * 12, cy - 11, 4 + row % 3, .66, .36);
      for (let p = 0; p < 5; p++) {
        const q = TAU * p / 5;
        筆.圓(cx + flip * 12 + Math.cos(q) * 9, cy - 11 + Math.sin(q) * 9, 3.2, .55, .3);
      }
    }
  }
}

function 畫卷葉帶(筆, x0, x1, y) {
  筆.線([[x0, y - 13], [x1, y - 13]], .72, false, .62);
  筆.線([[x0, y + 13], [x1, y + 13]], .72, false, .62);
  for (let x = x0 + 10, k = 0; x < x1 - 10; x += 39, k++) {
    const s = k % 2 ? 1 : -1;
    筆.貝([x - 10, y], [x, y - s * 13], [x + 18, y - s * 13], [x + 29, y], .68, .55);
    筆.圓(x + 10, y - s * 5, 3 + k % 3, .52, .45);
  }
}

export async function 景(ctx, 助) {
  驗助(助);
  ctx.save();
  try {
    const 筆 = 造線筆(ctx, { 墨, 骨: 2.1, 衣: 1.25, 鬚: .68 });
    畫乾壁(筆);
    畫樹冠(筆);
    畫側林(筆, 1);
    畫側林(筆, -1);
  } finally {
    ctx.restore();
  }
}

function 畫框帶(筆) {
  const { ctx, 線 } = 筆;
  for (const d of [34, 48, 166]) {
    筆.筆(d === 34 ? 2.8 : 1.1, .78);
    ctx.strokeRect(d, d, 1800 - 2 * d, 2500 - 2 * d);
  }
  連珠橫(筆, 66, 1734, 82, { step: 25, r: 5.2, 寬: 1 });
  連珠橫(筆, 66, 1734, 2418, { step: 25, r: 5.2, 寬: 1 });
  轉直(ctx, 66, 2434, 82, (a, b, y) => 連珠橫(筆, a, b, y, { step: 25, r: 5.2, 寬: 1 }));
  轉直(ctx, 66, 2434, 1718, (a, b, y) => 連珠橫(筆, a, b, y, { step: 25, r: 5.2, 寬: 1 }));
  菱花橫(筆, 112, 1688, 124, { step: 34, h: 8, 寬: .86 });
  菱花橫(筆, 112, 1688, 2376, { step: 34, h: 8, 寬: .86 });
  轉直(ctx, 112, 2388, 124,
    (a, b, y) => 菱花橫(筆, a, b, y, { step: 34, h: 8, 寬: .86 }));
  轉直(ctx, 112, 2388, 1676,
    (a, b, y) => 菱花橫(筆, a, b, y, { step: 34, h: 8, 寬: .86 }));
  // 第三帶用交替卷葉，不與連珠／菱花同印複拓。
  畫卷葉帶(筆, 116, 1684, 148);
  畫卷葉帶(筆, 116, 1684, 2352);
  轉直(ctx, 116, 2384, 148, (a, b, y) => 畫卷葉帶(筆, a, b, y));
  轉直(ctx, 116, 2384, 1652, (a, b, y) => 畫卷葉帶(筆, a, b, y));
  // 內主堂頂帶：花蔓另成一式，與下欄及外框三帶皆異。
  線([[170, 202], [1630, 202]], 1.2, false, .72);
  線([[170, 326], [1630, 326]], 1.2, false, .72);
  for (let x = 185, k = 0; x < 1615; x += 58, k++) {
    const y = 264 + Math.sin(k * 1.27) * 18;
    筆.貝([x - 26, 264], [x - 10, y - 20], [x + 10, y + 20], [x + 26, 264], .75, .56);
    筆.圓(x, y, 4 + k % 3, .58, .5);
    葉片(筆, x - 14, y, 24 + k % 4 * 2, k % 2 ? -.5 : Math.PI + .5, .46);
  }
  線([[170, 338], [1630, 338]], 1.8, false, .78);
  線([[170, 1930], [1630, 1930]], 1.8, false, .78);
}

function 畫空底欄(筆) {
  const { 線 } = 筆;
  const x0 = 170, x1 = 1630, y0 = 1970, y1 = 2290, 格數 = 7;
  線([[x0, y0], [x1, y0], [x1, y1], [x0, y1]], 2, true, .84);
  連珠橫(筆, x0, x1, y0 + 26, { step: 23, r: 4.2, 寬: .85 });
  菱花橫(筆, x0, x1, y1 - 25, { step: 31, h: 7, 寬: .8 });
  for (let k = 1; k < 格數; k++) {
    const x = x0 + (x1 - x0) * k / 格數;
    線([[x, y0 + 48], [x, y1 - 48]], 1.35, false, .72);
  }
}

function 畫蓮座(筆) {
  const { 線 } = 筆;
  const x0 = 430, x1 = 1370;
  // 座頂緣即臀底錨，不上浮：y=1710。
  線([[x0, 尊位.座面], [x1, 尊位.座面]], 2.8, false, .95);
  蓮瓣橫(筆, x0, x1, 尊位.座面 + 92, { step: 62, h: 92, 寬: 1.45 });
  // 蒲甘／尼瓦爾轉承的前緣以卷雲瓣內芯增層，不以一排尖瓣示意了事。
  for (let x = x0 + 31, k = 0; x < x1; x += 62, k++) {
    const s = k % 2 ? 1 : -1;
    筆.貝([x - 24, 1789], [x - 18, 1748], [x + 4, 1742], [x + 20, 1768], .86, .7);
    筆.貝([x + 20, 1768], [x + 34, 1790], [x + 5, 1808], [x - 8, 1792], .86, .7);
    筆.圓(x + s * 5, 1778, 7, .64, .54, s > 0 ? 0 : Math.PI, s > 0 ? Math.PI * 1.6 : Math.PI * 2.6);
  }
  蓮瓣橫(筆, x0, x1, 尊位.座面 + 108, { step: 62, h: 58, 寬: 1.05, 覆: true });
  線([[x0 - 22, 1818], [x1 + 22, 1818]], 1.8, false, .86);
  菱花橫(筆, x0 - 22, x1 + 22, 1850, { step: 36, h: 9, 寬: .88 });
}

export async function 飾(ctx, 助) {
  驗助(助);
  ctx.save();
  try {
    const 筆 = 造線筆(ctx, { 墨, 骨: 2.3, 衣: 1.35, 鬚: .72 });
    畫框帶(筆);
    畫蓮座(筆);
    畫空底欄(筆);
  } finally {
    ctx.restore();
  }
}
