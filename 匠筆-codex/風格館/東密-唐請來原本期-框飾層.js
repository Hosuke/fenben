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
const 分明 = alpha => alpha;

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
  ctx.globalAlpha = 分明(alpha);
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
  ctx.globalAlpha = 分明(alpha);
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function 橢(ctx, x, y, rx, ry, 寬 = 1, alpha = 1) {
  ctx.save();
  ctx.strokeStyle = 墨; ctx.lineWidth = 寬; ctx.globalAlpha = 分明(alpha);
  ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2); ctx.stroke();
  ctx.restore();
}

function 帶副列(ctx, x0, x1, y, seed = 0) {
  let i = 0;
  for (let x = x0 + 7; x < x1 - 11; x += 17 + ((i + seed) % 5)) {
    const 揚 = ((i * 3 + seed) % 5 - 2) * .42;
    const 長 = 7 + (i + seed) % 4;
    描線(ctx, [[x, y + 揚], [x + 長 * .45, y - 揚 * .7], [x + 長, y + 揚 * .35]],
      .38 + (i % 3) * .055, .24 + (i % 5) * .045);
    i++;
  }
}

function 連珠帶(ctx, x0, x1, y, seed = 0) {
  描線(ctx, [[x0, y - 12], [x1, y - 12]], .72, .48);
  描線(ctx, [[x0, y + 12], [x1, y + 12]], .72, .48);
  描線(ctx, [[x0 + 2, y - 8], [x1 - 2, y - 8]], .46, .26);
  描線(ctx, [[x0 + 2, y + 8], [x1 - 2, y + 8]], .46, .26);
  let i = 0;
  for (let x = x0 + 12; x < x1 - 8; x += 22 + ((i + seed) % 4)) {
    const r = 4.2 + ((i * 7 + seed) % 5) * .42;
    橢(ctx, x, y, r, r * (i % 3 === 0 ? .9 : 1), .74 + (i % 3) * .08, .54 + (i % 4) * .05);
    圓(ctx, x - .45, y + .35, .72 + (i % 3) * .12, .4, .24);
    if ((i + seed) % 3 === 1) 圓(ctx, x + .8, y - .5, 1.15 + (i % 2) * .35, .5, .42);
    i++;
  }
  帶副列(ctx, x0 + 2, x1 - 2, y - 4.5, seed + 101);
  帶副列(ctx, x0 + 2, x1 - 2, y + 4.5, seed + 103);
}

function 卍繫帶(ctx, x0, x1, y, seed = 0) {
  描線(ctx, [[x0, y - 11], [x1, y - 11]], .7, .42);
  描線(ctx, [[x0, y + 11], [x1, y + 11]], .7, .42);
  描線(ctx, [[x0 + 2, y - 7], [x1 - 2, y - 7]], .46, .26);
  描線(ctx, [[x0 + 2, y + 7], [x1 - 2, y + 7]], .46, .26);
  let i = 0;
  for (let x = x0 + 5; x < x1 - 24; x += 29 + ((i + seed) % 3)) {
    const h = 5.8 + ((i + seed) % 4) * .55;
    const w = 11 + ((i * 5 + seed) % 4);
    描線(ctx, [[x, y], [x + w, y], [x + w, y - h], [x + w * .45, y - h],
      [x + w * .45, y + h], [x + w * 1.55, y + h], [x + w * 1.55, y]],
    .62 + (i % 3) * .07, .48 + (i % 4) * .055);
    const 繫x = x + w * 1.72 + 2;
    描線(ctx, [[繫x, y - 3.2], [繫x, y + 3.2]], .44, .26);
    i++;
  }
  帶副列(ctx, x0 + 2, x1 - 2, y - 4.5, seed + 107);
  帶副列(ctx, x0 + 2, x1 - 2, y + 4.5, seed + 109);
}

function 小五鈷(ctx, cx, cy, s = 1, rot = 0, alpha = .72, variant = 0) {
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot);
  描線(ctx, [[-18 * s, 0], [18 * s, 0]], .95 * s, alpha);
  圓(ctx, 0, 0, (2.7 + variant * .18) * s, .7 * s, alpha);
  for (const d of [-1, 1]) {
    ctx.save();
    ctx.strokeStyle = 墨; ctx.lineWidth = .72 * s; ctx.globalAlpha = 分明(alpha);
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
  描線(ctx, [[x0 + 2, y - 18], [x1 - 2, y - 18]], .48, .28);
  描線(ctx, [[x0 + 2, y + 18], [x1 - 2, y + 18]], .48, .28);
  let i = 0;
  for (let x = x0 + 23; x < x1 - 20; x += 53 + ((i + seed) % 5)) {
    小五鈷(ctx, x, y, .7 + ((i + seed) % 4) * .025,
      ((i % 5) - 2) * .012, .53 + (i % 4) * .045, (i + seed) % 3);
    i++;
  }
  帶副列(ctx, x0 + 2, x1 - 2, y - 11, seed + 113);
  帶副列(ctx, x0 + 2, x1 - 2, y + 11, seed + 127);
}

function 菱花帶(ctx, x0, x1, y, seed = 0) {
  描線(ctx, [[x0, y - 12], [x1, y - 12]], .7, .42);
  描線(ctx, [[x0, y + 12], [x1, y + 12]], .7, .42);
  描線(ctx, [[x0 + 2, y - 8], [x1 - 2, y - 8]], .46, .26);
  描線(ctx, [[x0 + 2, y + 8], [x1 - 2, y + 8]], .46, .26);
  let i = 0;
  for (let x = x0 + 12; x < x1 - 12; x += 27 + ((i + seed) % 4)) {
    const w = 8 + ((i * 3 + seed) % 4), h = 6 + ((i + seed) % 3);
    描線(ctx, [[x - w, y], [x, y - h], [x + w, y], [x, y + h], [x - w, y]],
      .62 + (i % 3) * .06, .42 + (i % 4) * .05);
    圓(ctx, x, y, .68 + (i % 3) * .1, .4, .24);
    if ((i + seed) % 2) 圓(ctx, x, y, 1.2 + (i % 3) * .25, .45, .36);
    i++;
  }
  帶副列(ctx, x0 + 2, x1 - 2, y - 4.5, seed + 131);
  帶副列(ctx, x0 + 2, x1 - 2, y + 4.5, seed + 137);
}

function 蓮瓣帶(ctx, x0, x1, y, seed = 0, 覆 = false) {
  描線(ctx, [[x0, y], [x1, y]], .76, .5);
  let i = 0;
  for (let x = x0 + 12; x < x1 - 12; x += 29 + ((i + seed) % 4)) {
    const w = 13 + (i % 3), h = (19 + (i + seed) % 5) * (覆 ? -1 : 1);
    ctx.save(); ctx.strokeStyle = 墨; ctx.lineWidth = .58 + (i % 4) * .06;
    ctx.globalAlpha = 分明(.43 + (i % 5) * .045); ctx.beginPath();
    ctx.moveTo(x - w, y); ctx.bezierCurveTo(x - w * .66, y + h * .58, x - w * .2, y + h, x, y + h);
    ctx.bezierCurveTo(x + w * .22, y + h, x + w * .7, y + h * .54, x + w, y);
    ctx.moveTo(x - w * .43, y + h * .12); ctx.quadraticCurveTo(x, y + h * .74, x + w * .4, y + h * .12);
    ctx.stroke(); ctx.restore(); i++;
  }
}

function 雲貌(seed) {
  const 雜湊 = 鹽 => {
    let 數 = (seed ^ Math.imul(鹽, 0x45d9f3b)) | 0;
    數 = Math.imul(數 ^ 數 >>> 16, 0x45d9f3b);
    數 = Math.imul(數 ^ 數 >>> 16, 0x45d9f3b);
    return ((數 ^ 數 >>> 16) >>> 0) / 4294967296;
  };
  return {
    型: ((seed % 5) + 5) % 5,
    尺度: .55 + 雜湊(11) * 1.15,
    旋角: (雜湊(23) * 2 - 1) * .35,
    鏡向: seed % 2 === 0 ? -1 : 1,
    線寬: 3.65 + 雜湊(37) * 1.45,
    縱倍率: .88 + 雜湊(41) * .24,
  };
}

// 各型控制點凸包；Bézier 全形不出此界，旋縮後另加圓頭線寬之裕。
const 雲原界 = Object.freeze([
  [-.58, .5, -.5, .5],
  [-.62, .49, -.68, .58],
  [-1.18, .51, -.42, .45],
  [-.53, .79, -.47, .55],
  [-.68, .59, -.71, .61],
]);

function 雲包絡(sx, sy, seed) {
  const 貌 = 雲貌(seed);
  const [左, 右, 頂, 底] = 雲原界[貌.型];
  const cos = Math.cos(貌.旋角), sin = Math.sin(貌.旋角);
  const 點列 = [];
  for (const u of [左, 右]) for (const v of [頂, 底]) {
    const x = u * sx * 貌.鏡向 * 貌.尺度;
    const y = v * sy * 貌.尺度 * 貌.縱倍率;
    點列.push([cos * x - sin * y, sin * x + cos * y]);
  }
  const 線裕 = 貌.線寬 * .5 * 貌.尺度 * Math.max(1, 貌.縱倍率);
  return {
    左: Math.min(...點列.map(點 => 點[0])) - 線裕,
    右: Math.max(...點列.map(點 => 點[0])) + 線裕,
    頂: Math.min(...點列.map(點 => 點[1])) - 線裕,
    底: Math.max(...點列.map(點 => 點[1])) + 線裕,
    貌,
  };
}

// 唐卷所見之雲鉤：種子各定異型、尺度、仰俯與鏡向，不作整塊複拓。
function 雲鉤(ctx, cx, cy, sx, sy, seed, alpha, 貌 = 雲貌(seed)) {
  const { 型, 尺度, 旋角, 鏡向, 線寬, 縱倍率 } = 貌;
  const X = 數 => 數 * sx;
  const Y = 數 => 數 * sy;

  ctx.save();
  ctx.translate(cx, cy); ctx.rotate(旋角);
  ctx.scale(鏡向 * 尺度, 尺度 * 縱倍率);
  ctx.strokeStyle = 墨; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.globalAlpha = 分明(alpha);

  if (型 === 0) { // 單鉤短雲：一頭一尾，收得俏利。
    ctx.lineWidth = 線寬; ctx.beginPath();
    ctx.moveTo(X(-.58), Y(.18));
    ctx.bezierCurveTo(X(-.38), Y(-.34), X(-.06), Y(-.5), X(.17), Y(-.18));
    ctx.bezierCurveTo(X(.32), Y(.04), X(.5), Y(.04), X(.48), Y(-.17));
    ctx.bezierCurveTo(X(.46), Y(-.37), X(.24), Y(-.34), X(.25), Y(-.14));
    ctx.bezierCurveTo(X(.25), Y(.02), X(.39), Y(.03), X(.4), Y(-.09)); ctx.stroke();
    ctx.lineWidth = 線寬 * .56; ctx.beginPath();
    ctx.moveTo(X(-.5), Y(.25)); ctx.bezierCurveTo(X(-.28), Y(.5), X(.02), Y(.38), X(.17), Y(.12));
    ctx.moveTo(X(-.41), Y(.05)); ctx.bezierCurveTo(X(-.2), Y(-.2), X(.02), Y(-.23), X(.13), Y(-.08));
    ctx.stroke();
  } else if (型 === 1) { // 雙鉤疊雲：兩頭上下相衔。
    ctx.lineWidth = 線寬; ctx.beginPath();
    ctx.moveTo(X(-.62), Y(.26));
    ctx.bezierCurveTo(X(-.38), Y(-.18), X(-.08), Y(-.28), X(.08), Y(.02));
    ctx.bezierCurveTo(X(.23), Y(.28), X(.49), Y(.25), X(.48), Y(.01));
    ctx.bezierCurveTo(X(.47), Y(-.18), X(.27), Y(-.17), X(.28), Y(.01));
    ctx.moveTo(X(-.35), Y(-.04));
    ctx.bezierCurveTo(X(-.24), Y(-.56), X(.04), Y(-.68), X(.2), Y(-.39));
    ctx.bezierCurveTo(X(.33), Y(-.14), X(.49), Y(-.24), X(.43), Y(-.43));
    ctx.bezierCurveTo(X(.38), Y(-.58), X(.25), Y(-.54), X(.27), Y(-.4)); ctx.stroke();
    ctx.lineWidth = 線寬 * .5; ctx.beginPath();
    ctx.moveTo(X(-.57), Y(.39)); ctx.bezierCurveTo(X(-.29), Y(.58), X(.04), Y(.45), X(.19), Y(.19));
    ctx.moveTo(X(-.48), Y(.13)); ctx.bezierCurveTo(X(-.23), Y(-.05), X(-.04), Y(.02), X(.08), Y(.18));
    ctx.stroke();
  } else if (型 === 2) { // 長尾飛雲：尾身逾頭寬三倍。
    ctx.lineWidth = 線寬; ctx.beginPath();
    ctx.moveTo(X(-1.18), Y(.17));
    ctx.bezierCurveTo(X(-.72), Y(-.2), X(-.12), Y(-.42), X(.2), Y(-.13));
    ctx.bezierCurveTo(X(.34), Y(.01), X(.51), Y(.02), X(.49), Y(-.17));
    ctx.bezierCurveTo(X(.47), Y(-.37), X(.28), Y(-.36), X(.29), Y(-.17));
    ctx.bezierCurveTo(X(.3), Y(-.03), X(.42), Y(-.02), X(.42), Y(-.12)); ctx.stroke();
    ctx.lineWidth = 線寬 * .62; ctx.beginPath();
    ctx.moveTo(X(-1.11), Y(.3)); ctx.bezierCurveTo(X(-.66), Y(.45), X(-.15), Y(.38), X(.16), Y(.09));
    ctx.moveTo(X(-1.02), Y(.02)); ctx.bezierCurveTo(X(-.62), Y(-.32), X(-.16), Y(-.34), X(.12), Y(-.1));
    ctx.stroke();
  } else if (型 === 3) { // 回首雲：尾先放而後向頭部反卷。
    ctx.lineWidth = 線寬; ctx.beginPath();
    ctx.moveTo(X(-.53), Y(.18));
    ctx.bezierCurveTo(X(-.36), Y(-.4), X(-.03), Y(-.47), X(.15), Y(-.16));
    ctx.bezierCurveTo(X(.29), Y(.08), X(.48), Y(.07), X(.46), Y(-.15));
    ctx.bezierCurveTo(X(.44), Y(-.34), X(.25), Y(-.33), X(.26), Y(-.14)); ctx.stroke();
    ctx.lineWidth = 線寬 * .68; ctx.beginPath();
    ctx.moveTo(X(-.48), Y(.27));
    ctx.bezierCurveTo(X(-.05), Y(.55), X(.63), Y(.49), X(.72), Y(.12));
    ctx.bezierCurveTo(X(.79), Y(-.18), X(.37), Y(-.18), X(.17), Y(.12));
    ctx.bezierCurveTo(X(.02), Y(.36), X(.27), Y(.4), X(.37), Y(.22)); ctx.stroke();
    ctx.lineWidth = 線寬 * .45; ctx.beginPath();
    ctx.moveTo(X(-.4), Y(.05)); ctx.bezierCurveTo(X(-.16), Y(-.2), X(.02), Y(-.18), X(.12), Y(-.04));
    ctx.stroke();
  } else { // 三疊團雲：三團錯落，不共一印。
    ctx.lineWidth = 線寬; ctx.beginPath();
    ctx.moveTo(X(-.68), Y(.27));
    ctx.bezierCurveTo(X(-.57), Y(-.15), X(-.32), Y(-.27), X(-.18), Y(.03));
    ctx.bezierCurveTo(X(-.04), Y(.31), X(.18), Y(.29), X(.2), Y(.02));
    ctx.bezierCurveTo(X(.22), Y(-.29), X(.51), Y(-.31), X(.55), Y(-.04));
    ctx.bezierCurveTo(X(.59), Y(.22), X(.39), Y(.34), X(.26), Y(.17)); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(X(-.48), Y(-.02));
    ctx.bezierCurveTo(X(-.45), Y(-.55), X(-.12), Y(-.71), X(.04), Y(-.4));
    ctx.bezierCurveTo(X(.18), Y(-.12), X(.38), Y(-.24), X(.32), Y(-.45));
    ctx.bezierCurveTo(X(.27), Y(-.62), X(.1), Y(-.57), X(.12), Y(-.39)); ctx.stroke();
    ctx.lineWidth = 線寬 * .52; ctx.beginPath();
    ctx.moveTo(X(-.63), Y(.4)); ctx.bezierCurveTo(X(-.34), Y(.61), X(.12), Y(.59), X(.38), Y(.31));
    ctx.moveTo(X(-.61), Y(.14)); ctx.bezierCurveTo(X(-.39), Y(.02), X(-.25), Y(.1), X(-.17), Y(.25));
    ctx.stroke();
  }
  ctx.restore();
}

function 雲氣地(ctx, x0, y0, x1, y1, 避讓 = []) {
  const 寬 = x1 - x0, 高 = y1 - y0;
  const 區種 = (Math.imul(x0 | 0, 73856093) ^ Math.imul(y0 | 0, 19349663) ^
    Math.imul(x1 | 0, 83492791) ^ (y1 | 0)) >>> 0;
  const 雜湊 = (號, 鹽 = 0) => {
    let 數 = (區種 ^ Math.imul(號 + 1, 0x9e3779b1) ^ Math.imul(鹽 + 7, 0x85ebca6b)) | 0;
    數 = Math.imul(數 ^ 數 >>> 16, 0x7feb352d);
    數 = Math.imul(數 ^ 數 >>> 15, 0x846ca68b);
    return ((數 ^ 數 >>> 16) >>> 0) / 4294967296;
  };
  const 呼吸域 = [
    { cx: x0 + 寬 * .22, cy: y0 + 高 * .56, rx: 寬 * .105, ry: 高 * .105 },
    { cx: x0 + 寬 * .8, cy: y0 + 高 * .63, rx: 寬 * .11, ry: 高 * .12 },
  ];
  const 已落 = [];
  let 次序 = 0;

  const 落雲 = (x, y, sx, sy, seed, alpha, 容咬 = false) => {
    const 包絡 = 雲包絡(sx, sy, seed);
    const 界 = { x0: x + 包絡.左, x1: x + 包絡.右, y0: y + 包絡.頂, y1: y + 包絡.底 };
    if (界.x0 < x0 || 界.x1 > x1 || 界.y0 < y0 || 界.y1 > y1) return false;
    if (呼吸域.some(域 => {
      const 近x = Math.max(界.x0, Math.min(域.cx, 界.x1));
      const 近y = Math.max(界.y0, Math.min(域.cy, 界.y1));
      return ((近x - 域.cx) / 域.rx) ** 2 + ((近y - 域.cy) / 域.ry) ** 2 <= 1;
    })) return false;
    const 犯 = 避讓.some(域 => 域.r == null
      ? 界.x1 >= 域.x0 && 界.x0 <= 域.x1 && 界.y1 >= 域.y0 && 界.y0 <= 域.y1
      : (() => {
        const 近x = Math.max(界.x0, Math.min(域.cx, 界.x1));
        const 近y = Math.max(界.y0, Math.min(域.cy, 界.y1));
        return Math.hypot(近x - 域.cx, 近y - 域.cy) <= 域.r;
      })());
    if (犯) return false;
    if (!容咬 && 已落.some(雲 => Math.hypot(x - 雲.x, y - 雲.y) < 20 + (sx + 雲.sx) * .09)) return false;
    雲鉤(ctx, x, y, sx, sy, seed, alpha, 包絡.貌);
    已落.push({ x, y, sx }); 次序++;
    return true;
  };

  // 題帶之下先置密簇：簇心與簇內偏移皆由雜湊定，每簇三至五朵相咬。
  const 簇數 = Math.max(7, Math.round(寬 / 110));
  for (let 簇 = 0; 簇 < 簇數; 簇++) {
    const 簇x = x0 + 寬 * (.035 + 雜湊(簇, 1) * .93);
    const 簇y = y0 + 高 * (.025 + 雜湊(簇, 2) * .24);
    const 朵數 = 3 + Math.floor(雜湊(簇, 3) * 3);
    for (let 朵 = 0; 朵 < 朵數; 朵++) {
      const 角 = 雜湊(簇 * 7 + 朵, 4) * Math.PI * 2;
      const 離 = 朵 === 0 ? 0 : 18 + 雜湊(簇 * 7 + 朵, 5) * 38;
      const x = 簇x + Math.cos(角) * 離;
      const y = 簇y + Math.sin(角) * 離 * .58;
      const sx = 48 + 雜湊(簇 * 7 + 朵, 6) * 30;
      const sy = 22 + 雜湊(簇 * 7 + 朵, 7) * 15;
      const seed = (區種 + 簇 * 53 + 朵 * 17 + 次序 * 11) >>> 0;
      落雲(x, y, sx, sy, seed, .58 + 雜湊(seed, 8) * .12, true);
    }
  }

  // 餘處用雜湊投點，以中心至靜域之餘裕減其落墨率，不設 row/col 步進。
  // α 如實後，以更多異型小雲自結構交疊成密，不借墨深虛增。
  const 候選數 = Math.ceil(寬 * 高 / 260);
  for (let i = 0; i < 候選數; i++) {
    const x = x0 + 雜湊(i, 11) * 寬;
    const y = y0 + 雜湊(i, 12) * 高;
    const 縱位 = (y - y0) / 高;
    const 靜裕 = 避讓.reduce((近, 域) => {
      if (域.r != null) return Math.min(近, Math.hypot(x - 域.cx, y - 域.cy) - 域.r);
      const dx = Math.max(域.x0 - x, 0, x - 域.x1);
      const dy = Math.max(域.y0 - y, 0, y - 域.y1);
      return Math.min(近, Math.hypot(dx, dy));
    }, Infinity);
    const 退密 = Number.isFinite(靜裕) ? .34 + Math.min(1, Math.max(0, 靜裕) / 155) * .66 : 1;
    const 落率 = (縱位 < .3 ? .88 : 縱位 < .58 ? .68 : .76) * 退密;
    if (雜湊(i, 13) > 落率) continue;
    const sx = 38 + 雜湊(i, 14) * 34;
    const sy = 18 + 雜湊(i, 15) * 16;
    const seed = (區種 + i * 97 + Math.floor(雜湊(i, 16) * 89)) >>> 0;
    落雲(x, y, sx, sy, seed, .55 + 雜湊(i, 17) * .14);
  }
}

function 龕環二重(ctx, cx, cy, r, seed) {
  // 龕一、龕二之環內側另收一列細珠，與外側瓣尖錯位，不犯三角紋。
  const innerBeads = 64 + seed % 5;
  for (let k = 0; k < innerBeads; k++) {
    const a = Math.PI * 2 * (k + .5) / innerBeads;
    const rr = r + 5 + ((k + seed) % 3 - 1) * .45;
    圓(ctx, cx + Math.cos(a) * rr, cy + Math.sin(a) * rr,
      1.35 + (k + seed) % 3 * .13, .42, .28);
  }
  // 內連珠環：珠徑、扁圓與間步略異。
  圓(ctx, cx, cy, r + 10, .72, .52); 圓(ctx, cx, cy, r + 29, .72, .55);
  const beads = 42 + seed % 4;
  for (let k = 0; k < beads; k++) {
    const a = Math.PI * 2 * (k + .12 * (seed % 3)) / beads;
    const rr = r + 19 + ((k * 5 + seed) % 3 - 1) * .8;
    橢(ctx, cx + Math.cos(a) * rr, cy + Math.sin(a) * rr,
      3.3 + (k + seed) % 4 * .36, 2.9 + (k * 3 + seed) % 3 * .32,
      .62 + k % 3 * .07, .53 + k % 4 * .045);
  }
  // 外蓮瓣環：逐瓣歪斜、高低不同，不複拓一瓣。
  const petals = 34 + seed % 5;
  for (let k = 0; k < petals; k++) {
    const a = Math.PI * 2 * k / petals;
    const base = r + 35 + (k + seed) % 3;
    const h = 22 + (k * 7 + seed) % 9, half = .055 + (k + seed) % 3 * .004;
    const p0 = [cx + Math.cos(a - half) * base, cy + Math.sin(a - half) * base];
    const p1 = [cx + Math.cos(a) * (base + h), cy + Math.sin(a) * (base + h)];
    const p2 = [cx + Math.cos(a + half) * base, cy + Math.sin(a + half) * base];
    ctx.save(); ctx.strokeStyle = 墨; ctx.lineWidth = .64 + k % 4 * .07;
    ctx.globalAlpha = 分明(.52 + k % 5 * .035); ctx.beginPath(); ctx.moveTo(...p0);
    ctx.quadraticCurveTo(cx + Math.cos(a - half * .28) * (base + h * .82),
      cy + Math.sin(a - half * .28) * (base + h * .82), ...p1);
    ctx.quadraticCurveTo(cx + Math.cos(a + half * .3) * (base + h * .8),
      cy + Math.sin(a + half * .3) * (base + h * .8), ...p2);
    ctx.moveTo(...p0); ctx.quadraticCurveTo(cx + Math.cos(a) * (base + h * .58),
      cy + Math.sin(a) * (base + h * .58), ...p2);
    ctx.stroke(); ctx.restore();
  }
  圓(ctx, cx, cy, r + 66, .78, .57);
}

function 素題帶(ctx, x0, x1, y0, y1) {
  描線(ctx, [[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]], 1.05, .7);
  描線(ctx, [[x0 + 7, y0 + 7], [x1 - 7, y0 + 7], [x1 - 7, y1 - 7],
    [x0 + 7, y1 - 7], [x0 + 7, y0 + 7]], .55, .46);
  描線(ctx, [[x0 + 12, y0 + 13], [x1 - 12, y0 + 13]], .46, .27);
  描線(ctx, [[x0 + 12, y1 - 13], [x1 - 12, y1 - 13]], .46, .27);
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
    ctx.globalAlpha = 分明(.58 + (i % 4) * .055); ctx.beginPath();
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
      ctx.save(); ctx.strokeStyle = 墨; ctx.lineWidth = (1.28 + Math.abs(off) / 45) * s; ctx.globalAlpha = 分明(alpha);
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
  // Cleveland 図像所見淡界格今收於外郭與題帶，不以直線網格壓雲鉤。
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
  描線(ctx, [[1400, 658], [1614, 658], [1614, 1370], [1400, 1370], [1400, 658]], .52, .3);
  描線(ctx, [[1406, 664], [1608, 664], [1608, 1364], [1406, 1364], [1406, 664]], .44, .26);
  for (const [y, a] of [[806, .42], [965, .37], [1127, .45], [1288, .34]])
    描線(ctx, [[1410, y], [1604, y]], .62, a);
  for (let y = 690, i = 0; y < 1350; y += 79 + (i++ % 3)) {
    圓(ctx, 1440, y, 4.5 + (i % 3) * .5, .62, .45);
    for (const a of [0, Math.PI / 2, Math.PI, Math.PI * 1.5])
      橢(ctx, 1440 + Math.cos(a) * 5.2, y + Math.sin(a) * 5.2,
        1.5, 1.05, .4, .27);
    描線(ctx, [[1462, y], [1588 - (i % 4) * 9, y]], .58, .3 + (i % 3) * .04);
    描線(ctx, [[1462, y + 14], [1548 + (i % 5) * 8, y + 14]], .5, .21 + (i % 2) * .05);
  }
  // 龕外餘地以雲氣成界；居景層，尊身層之既定靜域自行蔽之。
  // 上下素題帶之內不落雲線，俟典方題。
  雲氣地(ctx, 172, 392, 1276, 1570, [
    { cx: 740, cy: 970, r: 330 }, { cx: 740, cy: 1390, r: 395 },
    { x0: 214, y0: 316, x1: 1268, y1: 366 },
    { x0: 34, y0: 34, x1: 205, y1: 2466 },
    { x0: 1595, y0: 34, x1: 1766, y1: 2466 },
  ]);
  雲氣地(ctx, 154, 1792, 1650, 2210, [
    { cx: 378, cy: 2010, r: 252 }, { cx: 898, cy: 2010, r: 252 },
    { cx: 1418, cy: 2010, r: 252 }, { x0: 188, y0: 2204, x1: 1612, y1: 2242 },
    { x0: 34, y0: 34, x1: 205, y1: 2466 },
    { x0: 1595, y0: 34, x1: 1766, y1: 2466 },
  ]);
  ctx.restore();
}

export function 飾(ctx, 助) {
  驗助(助);
  ctx.save();
  // 外緣三重界帶：連珠・金剛杵列・卍斷紋，四邊皆足。
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
  for (const [x, rot, seed] of [[126, Math.PI / 2, 41], [1674, -Math.PI / 2, 43]]) {
    ctx.save(); ctx.translate(x, rot > 0 ? 250 : 2250); ctx.rotate(rot);
    卍繫帶(ctx, 0, 2000, 0, seed); ctx.restore();
  }
  for (const [x, rot, seed] of [[180, Math.PI / 2, 47], [1620, -Math.PI / 2, 49]]) {
    ctx.save(); ctx.translate(x, rot > 0 ? 274 : 2226); ctx.rotate(rot);
    五鈷帶(ctx, 0, 1952, 0, seed); ctx.restore();
  }

  // 主格額帶、右欄托座各異紋；不以衣緣截金代框飾。
  菱花帶(ctx, 138, 1310, 286, 73);
  蓮瓣帶(ctx, 1402, 1612, 598, 79, false);
  菱花帶(ctx, 1404, 1610, 1416, 83);
  for (let y = 1468, row = 0; y <= 1530; y += 29 + row++ % 2) {
    for (let x = 1418, col = 0; x <= 1600; x += 25 + (col++ + row) % 3) {
      圓(ctx, x, y, 1.15 + ((row * 5 + col) % 4) * .24, .46, .28 + (col % 3) * .06);
    }
  }

  // 上下橫題帶：雙素框留白，不擅落未核題記。
  素題帶(ctx, 214, 1268, 316, 366);
  素題帶(ctx, 188, 1612, 2204, 2242);

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
  龕環二重(ctx, 378, 2010, 185, 5);
  龕環二重(ctx, 898, 2010, 185, 11);
  獨立五鈷杵(ctx, 1418, 2010, .98);
  ctx.restore();
}
