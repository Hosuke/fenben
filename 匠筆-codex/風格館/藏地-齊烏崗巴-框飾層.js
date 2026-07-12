// 藏地-齊烏崗巴・框飾層——分層之制之一（景）與三（飾）
// 【所留】二十二龕棋盤級次、中央大龕拱背光、外裝裱多重紋帶、肥蓮前緣、八輻輪與七供。
// 【所刪】主尊、二十二小尊及其耳面臂衣、小蓮座、所有人形負形；雙鹿亦不留身形。
// 【改製】龕內全空，逐龕惟存柱・楣・尖拱三件；背幕改作互不複拓的連續經緯線。
// 【自評】格線共享整數邊界；中央五拱同源；蓮座側緣共指拱尖滅點；座面實落 y=1712。
// 【加密】據 Met 1991.74 與 CMA 1970.156：大龕內增十二道異紋座背，二十二龕各施淡織幕；框珠加芯、枋面添短波，蓮瓣加雙弧而座沿列珠。

import {
  造線筆,
  連珠橫,
  菱花橫,
  轉直,
} from './lib/白描幀具.js';

export const 尊位 = Object.freeze({
  W: 1800,
  H: 2500,
  頂y: 760,
  指: 14,
  中x: 900,
  座面: 1712,
});

const 墨 = '#d8b36a';
const 暗朱 = '#a9533d';
const 冷灰 = '#727b92';
const TAU = Math.PI * 2;

function 斷(真, 訊) {
  console.assert(真, 訊);
  if (!真) throw new Error(訊);
}

function 驗助(助) {
  斷(助 && 助.尊位, '藏地-齊烏崗巴框飾層：缺 助.尊位');
  const { W, H, 尊位: 位 } = 助;
  斷(W === 1800 && H === 2500, `畫幅失守：${W}×${H}`);
  for (const 名 of ['W', 'H', '頂y', '指', '中x']) {
    斷(位[名] === 尊位[名], `尊位失守：${名}=${位[名]}（應 ${尊位[名]}）`);
  }
  const 座面 = 位.座面 ?? 位.頂y + 68 * 位.指;
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

function 矩(ctx, x, y, w, h, 寬 = 1.3, 透明 = 1, 色 = 墨) {
  描路(ctx, 色, 寬, 透明, p => p.rect(x, y, w, h));
}

function 弧點(p0, c1, c2, p1, t) {
  const s = 1 - t;
  return [
    s * s * s * p0[0] + 3 * s * s * t * c1[0] + 3 * s * t * t * c2[0] + t * t * t * p1[0],
    s * s * s * p0[1] + 3 * s * s * t * c1[1] + 3 * s * t * t * c2[1] + t * t * t * p1[1],
  ];
}

function 螺(ctx, cx, cy, r, 轉 = 1, 寬 = 1, 透明 = .7, 色 = 墨) {
  描路(ctx, 色, 寬, 透明, p => {
    for (let k = 0; k <= 28; k++) {
      const t = k / 28;
      const rr = r * (1 - .8 * t);
      const q = 轉 * TAU * 1.18 * t;
      const x = cx + Math.cos(q) * rr;
      const y = cy + Math.sin(q) * rr;
      if (k) p.lineTo(x, y); else p.moveTo(x, y);
    }
  });
}

function 棋盤骨格(ctx, 筆) {
  const { 線 } = 筆;
  const X = [144, 360, 576, 792, 1008, 1224, 1440, 1656];
  const Y = [460, 855, 1250, 1645, 2040];

  // 每帶先畫一枚大框，再各畫共享分隔線一次，免相鄰龕共邊重描發粗。
  矩(ctx, X[0], 164, X[7] - X[0], 272, 2.8, .94);
  矩(ctx, X[0], 2064, X[7] - X[0], 272, 2.8, .94);
  for (let k = 1; k < 7; k++) {
    線([[X[k], 164], [X[k], 436]], 1.8, false, .82);
    線([[X[k], 2064], [X[k], 2336]], 1.8, false, .82);
  }

  矩(ctx, 144, Y[0], 252, Y[4] - Y[0], 2.8, .92);
  矩(ctx, 1404, Y[0], 252, Y[4] - Y[0], 2.8, .92);
  for (let k = 1; k < 4; k++) {
    線([[144, Y[k]], [396, Y[k]]], 1.8, false, .8);
    線([[1404, Y[k]], [1656, Y[k]]], 1.8, false, .8);
  }

  let 龕數 = 0;
  for (let k = 0; k < 7; k++) {
    空龕(ctx, X[k], 164, 216, 272, 龕數++);
  }
  for (let k = 0; k < 4; k++) {
    空龕(ctx, 144, Y[k], 252, 395, 龕數++);
    空龕(ctx, 1404, Y[k], 252, 395, 龕數++);
  }
  for (let k = 0; k < 7; k++) {
    空龕(ctx, X[k], 2064, 216, 272, 龕數++);
  }
  斷(龕數 === 22, `棋盤龕數失守：${龕數}`);
}

function 空龕(ctx, x0, y0, w, h, i) {
  const 金 = 造線筆(ctx, { 墨, 骨: 2.5, 衣: 1.35, 鬚: .72 });
  const { 線, 貝, 圓 } = 金;
  const pad = w * (.115 + .008 * (i % 4));
  const L = x0 + pad;
  const R = x0 + w - pad;
  const C = (L + R) / 2;
  const base = y0 + h * (.87 + .01 * ((2 * i + 1) % 3));
  const spring = y0 + h * (.38 + .015 * ((3 * i + 1) % 4));
  const apex = y0 + h * (.085 + .012 * ((2 * i + 2) % 5));
  const 柱距 = 4.4 + (i % 3) * 1.2;
  const cap = 9 + (i % 3) * 2;

  // 龕內淡織幕先落，柱楣尖拱後落；逐龕改相位、節距與斜向，毋成同印複拓。
  ctx.save();
  const 幕L = L + 7, 幕R = R - 7, 幕C = (幕L + 幕R) / 2;
  const 幕頂 = apex + 9, 幕升 = spring - 幕頂;
  ctx.beginPath();
  ctx.moveTo(幕L, base - 8);
  ctx.lineTo(幕L, spring);
  ctx.bezierCurveTo(幕L, spring - .36 * 幕升, 幕C - .23 * w, 幕頂 + .14 * 幕升, 幕C, 幕頂);
  ctx.bezierCurveTo(幕C + .23 * w, 幕頂 + .14 * 幕升, 幕R, spring - .36 * 幕升, 幕R, spring);
  ctx.lineTo(幕R, base - 8);
  ctx.closePath();
  ctx.clip();
  if (i % 2 === 0) {
    const step = 18 + (i % 5) * 3;
    const slant = (i % 4 < 2 ? 1 : -1) * (28 + (i % 3) * 7);
    for (let x = L - h + (i * 11) % step; x < R + h; x += step) {
      線([[x, base + 8], [x + slant, apex - 8]], .52 + (i % 3) * .06, false, .18 + (i % 4) * .025);
    }
    for (let y = apex + 17 + (i * 7) % 19; y < base; y += 27 + (i % 4) * 3) {
      線([[L - 8, y], [R + 8, y + (i % 3 - 1) * 4]], .48, false, .13 + (i % 3) * .02);
    }
  } else {
    const step = 15 + (i % 6) * 2;
    for (let x = L + 5 + (i * 9) % step; x < R; x += step) {
      const sway = ((x / step + i) % 3 - 1) * 4;
      貝([x, apex - 4], [x + sway, apex + h * .28], [x - sway, base - h * .24], [x, base + 5], .5 + (i % 4) * .05, .16 + (i % 5) * .018);
    }
    for (let y = apex + 22 + (i * 5) % 17; y < base; y += 34 + (i % 3) * 4) {
      線([[L, y], [R, y]], .45, false, .105 + (i % 4) * .015);
    }
  }
  ctx.restore();

  // 柱：雙豎柱身、柱礎、柱頭；龕內不落任何身形或小座。
  for (const x of [L, R]) {
    線([[x - 柱距 / 2, spring + 6], [x - 柱距 / 2, base]], 1.25, false, .84);
    線([[x + 柱距 / 2, spring + 6], [x + 柱距 / 2, base]], 1.25, false, .84);
    線([[x - cap, base], [x + cap, base]], 1.7, false, .88);
    線([[x - cap * .75, base - 7], [x + cap * .75, base - 7]], .9, false, .66);
    線([[x - cap, spring + 7], [x + cap, spring + 7]], 1.55, false, .86);
    線([[x - cap * .72, spring + 14], [x + cap * .72, spring + 14]], .9, false, .64);
  }

  // 數式輪換僅改柱身分節，不在龕內複拓花臉。
  if (i % 3 === 0) {
    for (const x of [L, R]) for (let y = spring + 34; y < base - 15; y += 27 + (i % 4)) {
      線([[x - 柱距 / 2 - 3, y], [x + 柱距 / 2 + 3, y]], .75, false, .54);
    }
  } else if (i % 3 === 1) {
    for (const x of [L, R]) {
      線([[x - 柱距 / 2, spring + 24], [x + 柱距 / 2, base - 12]], .68, false, .48);
      線([[x + 柱距 / 2, spring + 24], [x - 柱距 / 2, base - 12]], .68, false, .48);
    }
  } else {
    for (const x of [L, R]) for (let y = spring + 33; y < base - 14; y += 31) {
      圓(x, y, 2.3, .65, .5);
    }
  }

  // 楣：兩道橫樑與上檐，和柱頭有明確承接。
  線([[L - cap - 4, spring + 2], [R + cap + 4, spring + 2]], 1.8, false, .9);
  線([[L - cap + 2, spring - 6], [R + cap - 2, spring - 6]], 1.05, false, .68);
  線([[L - cap - 1, y0 + 24], [R + cap + 1, y0 + 24]], 1.3, false, .72);
  線([[L - cap + 5, y0 + 31], [R + cap - 5, y0 + 31]], .8, false, .52);

  // 尖拱：左右二弧於 apex 相交；偶數龕加同源內拱，不另造圓拱。
  const rise = spring - apex;
  const 畫拱 = (縮, 寬, 透明) => {
    const l = L + 縮;
    const r = R - 縮;
    const c = (l + r) / 2;
    貝([l, spring], [l + .02 * w, spring - .36 * rise], [c - .23 * w, apex + .14 * rise], [c, apex], 寬, 透明);
    貝([c, apex], [c + .23 * w, apex + .14 * rise], [r - .02 * w, spring - .36 * rise], [r, spring], 寬, 透明);
  };
  畫拱(0, 1.9, .92);
  if (i % 3 !== 1) 畫拱(8 + (i % 2) * 2, .82, .58);
}

function 畫背幕(ctx, 位) {
  const 金 = 造線筆(ctx, { 墨, 骨: 2.3, 衣: 1.15, 鬚: .65 });
  const 灰 = 造線筆(ctx, { 墨: 冷灰, 骨: 1.5, 衣: .85, 鬚: .55 });
  const 左X = [450, 478, 515, 557, 604, 651, 693];
  const 右X = [1108, 1146, 1191, 1233, 1278, 1314, 1350];

  // 左右兩幅各條皆為一筆連續曲線；節距、振幅、轉折互異，無逐格花印。
  for (let i = 0; i < 左X.length; i++) {
    const x = 左X[i];
    金.貝([x, 1118], [x - 18 - i * 2, 1350], [x + 30 - i * 3, 1670], [x - 8 + i * 2, 1970], .72 + i * .055, .28 + i * .025);
  }
  for (let i = 0; i < 右X.length; i++) {
    const x = 右X[i];
    灰.貝([x, 1118], [x + 32 - i * 3, 1360], [x - 20 + i * 2, 1665], [x + 10 - i * 2, 1970], .68 + i * .05, .26 + i * .026);
  }

  const 左緯 = [1162, 1240, 1336, 1450, 1576, 1715, 1860, 1952];
  for (let i = 0; i < 左緯.length; i++) {
    const y = 左緯[i];
    金.貝([438, y], [505 + i * 9, y - 20 - i * 2], [605 - i * 5, y + 31 - i], [712, y + (i % 2 ? 13 : -9)], .72, .24 + i * .018);
  }
  const 右緯 = [1144, 1225, 1318, 1426, 1551, 1689, 1838, 1944];
  for (let i = 0; i < 右緯.length; i++) {
    const y = 右緯[i];
    灰.貝([1088, y + (i % 2 ? -11 : 8)], [1172 + i * 4, y + 27 - i], [1289 - i * 8, y - 18 - i * 2], [1362, y], .7, .23 + i * .019);
  }

  // 拱額上方另三筆折枝式經線，仍不用可複製花 stamp。
  金.貝([520, 1070], [520, 780], [650, 560], [位.中x, 500], .78, .26);
  灰.貝([位.中x, 500], [1118, 555], [1288, 785], [1280, 1070], .74, .25);
  金.貝([612, 1090], [650, 780], [760, 620], [位.中x, 566], .68, .22);
  灰.貝([位.中x, 566], [1050, 620], [1150, 785], [1188, 1090], .66, .21);
}

function 座背織帶(ctx) {
  const 金 = 造線筆(ctx, { 墨, 骨: 1.7, 衣: .92, 鬚: .52 });
  const 朱 = 造線筆(ctx, { 墨: 暗朱, 骨: 1.5, 衣: .82, 鬚: .48 });
  const 灰 = 造線筆(ctx, { 墨: 冷灰, 骨: 1.35, 衣: .76, 鬚: .44 });
  const x0 = 560, x1 = 1240, y0 = 1150;
  const 高 = [46, 52, 42, 50, 48, 44, 54, 40, 56, 46, 44, 40];
  let y = y0;

  ctx.save();
  ctx.beginPath();
  ctx.rect(x0, y0, x1 - x0, 562);
  ctx.clip();
  for (let i = 0; i < 高.length; i++) {
    const h = 高[i];
    const mid = y + h / 2;
    const 筆 = [金, 朱, 灰][i % 3];
    筆.線([[x0, y], [x1, y]], 1.05 + (i % 3) * .15, false, .48 + (i % 4) * .055);

    if (i % 4 === 0) {
      const step = 43 + i * 1.4;
      for (let x = x0 - step / 2 + (i * 13) % step; x < x1 + step; x += step) {
        const tip = mid - h * (.3 + (i % 3) * .025);
        筆.貝([x - step * .46, mid + h * .25], [x - step * .34, mid - h * .1], [x - step * .13, tip], [x, tip], .68, .44);
        筆.貝([x, tip], [x + step * .13, tip], [x + step * .34, mid - h * .1], [x + step * .46, mid + h * .25], .68, .44);
      }
    } else if (i % 4 === 1) {
      const step = 23 + (i % 5) * 2;
      for (let x = x0 + step / 2 + (i * 7) % step; x < x1; x += step) {
        筆.圓(x, mid, 4 + (i % 3) * .55, .7, .45);
        筆.點(x, mid, 1.05 + (i % 2) * .2, .5);
      }
      筆.線([[x0, mid - 9], [x1, mid - 9]], .48, false, .25);
      筆.線([[x0, mid + 9], [x1, mid + 9]], .48, false, .25);
    } else if (i % 4 === 2) {
      const step = 13 + (i % 5) * 2;
      const lean = 17 + (i % 4) * 3;
      for (let x = x0 - h + (i * 9) % step; x < x1 + h; x += step) {
        筆.線([[x, y + h - 5], [x + lean, y + 5]], .5, false, .27 + (i % 3) * .035);
      }
      筆.線([[x0, mid], [x1, mid]], .42, false, .2);
    } else {
      // 素帶只留不等距雙緣與一道偏心緯線，與相鄰繁帶相換氣。
      筆.線([[x0, y + 8 + i % 3], [x1, y + 8 + i % 3]], .58, false, .31);
      筆.線([[x0, y + h - 7 - i % 2], [x1, y + h - 7 - i % 2]], .46, false, .23);
      筆.線([[x0, mid + (i % 5 - 2)], [x1, mid + (i % 5 - 2)]], .38, false, .16);
    }
    y += h;
  }
  金.線([[x0, 1712], [x1, 1712]], 1.35, false, .62);
  ctx.restore();
  斷(y === 1712, `座背織帶未抵座面：${y}`);
}

function 大龕拱(ctx, 位) {
  const C = 位.中x;
  const A = 34 * 位.指;
  const yA = 位.頂y - 22 * 位.指;
  const ySpring = 位.頂y + 25 * 位.指;
  const yFoot = 位.座面 + 20 * 位.指;
  const 層 = [
    [0, 4.1, .95, 墨],
    [14, 1.25, .7, 暗朱],
    [28, 2.3, .83, 墨],
    [49, 1.05, .62, 冷灰],
    [70, 2.55, .82, 墨],
  ];

  for (const [d, w, a, 色] of 層) {
    const Ad = A - d;
    const apex = yA + d;
    const rise = ySpring - apex;
    const left0 = [C - Ad, ySpring];
    const left1 = [C - Ad, ySpring - .56 * rise];
    const left2 = [C - .3 * Ad, apex + .1 * rise];
    const top = [C, apex];
    const right2 = [C + .3 * Ad, apex + .1 * rise];
    const right1 = [C + Ad, ySpring - .56 * rise];
    const right0 = [C + Ad, ySpring];
    描路(ctx, 色, w, a, p => {
      p.moveTo(C - Ad, yFoot - d * .12);
      p.lineTo(...left0);
      p.bezierCurveTo(...left1, ...left2, ...top);
      p.bezierCurveTo(...right2, ...right1, ...right0);
      p.lineTo(C + Ad, yFoot - d * .12);
    });
  }

  // 連珠嚴循第二道主拱之 cubic 取點，不以另枚橢圓冒充同軸。
  const d = 28;
  const Ad = A - d;
  const apex = yA + d;
  const rise = ySpring - apex;
  const L = [[C - Ad, ySpring], [C - Ad, ySpring - .56 * rise], [C - .3 * Ad, apex + .1 * rise], [C, apex]];
  const R = [[C, apex], [C + .3 * Ad, apex + .1 * rise], [C + Ad, ySpring - .56 * rise], [C + Ad, ySpring]];
  const 金 = 造線筆(ctx, { 墨, 骨: 2, 衣: 1, 鬚: .62 });
  for (let k = 1; k < 19; k++) {
    const p = 弧點(...L, k / 19);
    金.圓(p[0], p[1], 3.6 + (k % 4 === 0 ? .8 : 0), .82, .58);
  }
  for (let k = 1; k < 19; k++) {
    const p = 弧點(...R, k / 19);
    金.圓(p[0], p[1], 3.6 + (k % 5 === 0 ? .7 : 0), .82, .58);
  }

  斷(C - A === 424 && C + A === 1376, '中央大龕橫界失守');
  斷(yA === 452 && ySpring === 1110 && yFoot === 1992, '中央大龕縱界失守');
}

function 卷草帶(ctx, x0, x1, y, 反 = 1) {
  描路(ctx, 墨, 1.05, .6, p => {
    p.moveTo(x0, y);
    const step = 78;
    for (let x = x0; x < x1; x += step) {
      const e = Math.min(x + step, x1);
      const d = e - x;
      p.bezierCurveTo(x + d * .22, y - 11 * 反, x + d * .35, y - 11 * 反, x + d * .5, y);
      p.bezierCurveTo(x + d * .65, y + 11 * 反, x + d * .78, y + 11 * 反, e, y);
    }
  });
  let i = 0;
  for (let x = x0 + 20; x < x1 - 10; x += 39, i++) {
    螺(ctx, x, y + (i % 2 ? 5 : -5) * 反, 6.4 + (i % 4) * .45, i % 2 ? -1 : 1, .72, .48);
  }
  // 枋面短波貼主蔓分枝，波幅與長短交錯，免只見一條空曠正弦。
  描路(ctx, 墨, .58, .39, p => {
    for (let x = x0 + 9, k = 0; x + 28 < x1; x += 41, k++) {
      const yy = y + (k % 2 ? 7 : -7) * 反;
      p.moveTo(x, yy);
      p.quadraticCurveTo(x + 7, yy - (7 + k % 3) * 反, x + 15, yy);
      p.quadraticCurveTo(x + 22, yy + (5 + k % 2) * 反, x + 28, yy + 1.5 * 反);
    }
  });
}

function 連珠芯橫(ctx, x0, x1, y, step = 25) {
  const 金 = 造線筆(ctx, { 墨, 骨: 1, 衣: .7, 鬚: .48 });
  for (let x = x0 + step / 2; x < x1; x += step) 金.點(x, y, 1.15, .67);
}

function 外框(ctx) {
  const 金 = 造線筆(ctx, { 墨, 骨: 2.8, 衣: 1.25, 鬚: .7 });
  const 朱 = 造線筆(ctx, { 墨: 暗朱, 骨: 2, 衣: 1.05, 鬚: .62 });
  for (const [r, w, a, 色] of [
    [28, 3.2, .96, 墨], [42, 1.1, .64, 暗朱], [58, 1.7, .78, 墨],
    [80, 1.05, .62, 冷灰], [116, 1.9, .76, 墨], [148, 1.15, .58, 暗朱],
  ]) 矩(ctx, r, r, 1800 - 2 * r, 2500 - 2 * r, w, a, 色);

  連珠橫(金, 96, 1704, 80, { step: 25, r: 4.8, 寬: 1.05 });
  連珠橫(金, 96, 1704, 2420, { step: 25, r: 4.8, 寬: 1.05 });
  轉直(ctx, 96, 2404, 80, (a, b, y) => 連珠橫(金, a, b, y, { step: 25, r: 4.8, 寬: 1.05 }));
  轉直(ctx, 96, 2404, 1720, (a, b, y) => 連珠橫(金, a, b, y, { step: 25, r: 4.8, 寬: 1.05 }));
  連珠芯橫(ctx, 96, 1704, 80);
  連珠芯橫(ctx, 96, 1704, 2420);
  轉直(ctx, 96, 2404, 80, (a, b, y) => 連珠芯橫(ctx, a, b, y));
  轉直(ctx, 96, 2404, 1720, (a, b, y) => 連珠芯橫(ctx, a, b, y));

  卷草帶(ctx, 136, 1664, 116, 1);
  卷草帶(ctx, 136, 1664, 2384, -1);
  轉直(ctx, 136, 2364, 116, (a, b, y) => 卷草帶(ctx, a, b, y, 1));
  轉直(ctx, 136, 2364, 1684, (a, b, y) => 卷草帶(ctx, a, b, y, -1));

  菱花橫(朱, 164, 1636, 148, { step: 32, h: 8, 寬: .88 });
  菱花橫(朱, 164, 1636, 2352, { step: 32, h: 8, 寬: .88 });
  轉直(ctx, 164, 2336, 148, (a, b, y) => 菱花橫(朱, a, b, y, { step: 32, h: 8, 寬: .88 }));
  轉直(ctx, 164, 2336, 1652, (a, b, y) => 菱花橫(朱, a, b, y, { step: 32, h: 8, 寬: .88 }));
}

function 蓮座前緣(ctx, 位) {
  const 金 = 造線筆(ctx, { 墨, 骨: 4, 衣: 2.2, 鬚: 1.05 });
  const { 線, 貝 } = 金;
  const VP = [位.中x, 位.頂y - 22 * 位.指];
  const S = 位.座面;
  const 半寬 = y => 24 * 位.指 * (y - VP[1]) / (S - VP[1]);
  const back = { y: S, a: 半寬(S) };
  const front = { y: S + 10 * 位.指, a: 半寬(S + 10 * 位.指) };

  // 硬座面線與深度側線；兩側延長皆通過同一 VP=(900,452)。
  線([[位.中x - back.a, back.y], [位.中x + back.a, back.y]], 4.1, false, .98);
  線([[位.中x - back.a, back.y], [位.中x - front.a, front.y]], 2.4, false, .88);
  線([[位.中x + back.a, back.y], [位.中x + front.a, front.y]], 2.4, false, .88);
  線([[位.中x - front.a, front.y], [位.中x + front.a, front.y]], 3.6, false, .92);
  貝([位.中x - back.a, S], [位.中x - 210, S + 50], [位.中x + 210, S + 50], [位.中x + back.a, S], 2.1, .72);

  const 上base = S + 84;
  const 上a = 半寬(上base) - 10;
  const 上數 = 11;
  for (let k = 0; k < 上數; k++) {
    const t = (k + .5) / 上數;
    const cx = 位.中x - 上a + 2 * 上a * t;
    const width = 2 * 上a / 上數 * .94;
    const arch = 1 - ((cx - 位.中x) / 上a) ** 2;
    const baseY = 上base + 16 * arch;
    const tipY = S + 24 + 14 * (1 - arch);
    貝([cx - width / 2, baseY], [cx - width * .4, baseY - 42], [cx - width * .18, tipY + 10], [cx, tipY], 1.75, .88);
    貝([cx, tipY], [cx + width * .18, tipY + 10], [cx + width * .4, baseY - 42], [cx + width / 2, baseY], 1.75, .88);
    貝([cx - width * .2, baseY - 5], [cx - width * .14, baseY - 31], [cx - width * .07, tipY + 19], [cx, tipY + 9], .82, .58);
    貝([cx, tipY + 9], [cx + width * .07, tipY + 19], [cx + width * .14, baseY - 31], [cx + width * .2, baseY - 5], .82, .58);
  }

  const 下base = S + 92;
  const 下a = 半寬(下base) - 2;
  const 下數 = 12;
  for (let k = 0; k < 下數; k++) {
    const t = (k + .5) / 下數;
    const cx = 位.中x - 下a + 2 * 下a * t;
    const width = 2 * 下a / 下數 * .95;
    const arch = 1 - ((cx - 位.中x) / 下a) ** 2;
    const baseY = 下base + 12 * arch;
    const tipY = front.y - 13 - 8 * arch;
    貝([cx - width / 2, baseY], [cx - width * .36, baseY + 30], [cx - width * .18, tipY - 8], [cx, tipY], 1.45, .78);
    貝([cx, tipY], [cx + width * .18, tipY - 8], [cx + width * .36, baseY + 30], [cx + width / 2, baseY], 1.45, .78);
    貝([cx - width * .2, baseY + 3], [cx - width * .13, baseY + 21], [cx - width * .06, tipY - 10], [cx, tipY - 4], .72, .5);
    貝([cx, tipY - 4], [cx + width * .06, tipY - 10], [cx + width * .13, baseY + 21], [cx + width * .2, baseY + 3], .72, .5);
  }

  // 座沿連珠置於硬座深度內；尊身先落，故此列為前緣末筆。
  for (let x = 位.中x - 315; x <= 位.中x + 315; x += 30) {
    金.圓(x, S + 11, 3.7, .78, .65);
    金.點(x, S + 11, 1.05, .7);
  }

  const 左交 = (位.中x - back.a - VP[0]) * (front.y - VP[1])
    - (位.中x - front.a - VP[0]) * (back.y - VP[1]);
  const 右交 = (位.中x + back.a - VP[0]) * (front.y - VP[1])
    - (位.中x + front.a - VP[0]) * (back.y - VP[1]);
  斷(Math.abs(左交) < 1e-6 && Math.abs(右交) < 1e-6, '蓮座側線未共滅點');
  斷(S === 1712 && back.a === 336, '蓮座座面錨失守');
}

function 座前供物(ctx, 位) {
  const 金 = 造線筆(ctx, { 墨, 骨: 2.8, 衣: 1.5, 鬚: .78 });
  const { 線, 貝, 圓, 橢, 二次 } = 金;
  const wheelY = 1956;
  圓(位.中x, wheelY, 40, 2.7, .92);
  圓(位.中x, wheelY, 31, 1.25, .7);
  圓(位.中x, wheelY, 7, 1.8, .82);
  for (let k = 0; k < 8; k++) {
    const q = TAU * k / 8;
    線([
      [位.中x + Math.cos(q) * 8, wheelY + Math.sin(q) * 8],
      [位.中x + Math.cos(q) * 30, wheelY + Math.sin(q) * 30],
    ], 1.35, false, .74);
  }

  const bowlY = 2020;
  for (let k = 0; k < 7; k++) {
    const cx = 位.中x - 258 + k * 86;
    橢(cx, bowlY, 27, 7.5, 1.35, 0, .74);
    貝([cx - 24, bowlY], [cx - 20, bowlY + 24], [cx + 20, bowlY + 24], [cx + 24, bowlY], 1.35, .72);
    線([[cx - 14, bowlY + 22], [cx + 14, bowlY + 22]], 1.05, false, .62);
    二次([cx - 19, bowlY - 1], [cx, bowlY - 7 - (k % 3) * 2], [cx + 19, bowlY - 1], .78, .48);
  }
  斷(bowlY + 24 < 2064, '七供侵底龕');
}

export async function 景(ctx, 助) {
  const 位 = 驗助(助);
  ctx.save();
  try {
    const 金 = 造線筆(ctx, { 墨, 骨: 2.8, 衣: 1.35, 鬚: .72 });
    畫背幕(ctx, 位);
    座背織帶(ctx);
    棋盤骨格(ctx, 金);
    大龕拱(ctx, 位);
  } finally {
    ctx.restore();
  }
}

export async function 飾(ctx, 助) {
  const 位 = 驗助(助);
  ctx.save();
  try {
    外框(ctx);
    蓮座前緣(ctx, 位);
    座前供物(ctx, 位);
  } finally {
    ctx.restore();
  }
}
