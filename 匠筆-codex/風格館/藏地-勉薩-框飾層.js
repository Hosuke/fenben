// 藏地-勉薩・框飾層——分層之制之一（景）與三（飾）
// 空尊位稿：白度母、雙手、七眼、優鉢羅花與上緣小佛悉歸主坊。

import {
  造線筆,
  連珠橫,
  菱花橫,
  蓮瓣橫,
  轉直,
} from './lib/白描幀具.js';

export const 尊位 = Object.freeze({
  W: 1800,
  H: 2500,
  頂y: 700,
  指: 14,
  中x: 900,
  座面: 1652,
});

const 墨 = '#d8b36a';
const 暗朱 = '#a9533d';
const 冷灰 = '#727b92';
const 青綠 = '#70959a';
const TAU = Math.PI * 2;

function 斷(真, 訊) {
  console.assert(真, 訊);
  if (!真) throw new Error(訊);
}

function 驗助(助) {
  斷(助 && 助.尊位, '藏地-勉薩框飾層：缺 助.尊位');
  斷(助.W === 尊位.W && 助.H === 尊位.H, `畫幅失守：${助.W}×${助.H}`);
  for (const 名 of ['W', 'H', '頂y', '指', '中x', '座面']) {
    斷(助.尊位[名] === 尊位[名], `尊位失守：${名}`);
  }
  斷(尊位.頂y + 68 * 尊位.指 === 尊位.座面, '座面非頂y+68指');
  return 助.尊位;
}

function 空龕(ctx, cx) {
  const 金 = 造線筆(ctx, { 墨, 骨: 2.2, 衣: 1.25, 鬚: .7 });
  const 朱 = 造線筆(ctx, { 墨: 暗朱, 骨: 1.5, 衣: .85, 鬚: .5 });
  // 龕內不落面、身、手、衣或蓮莖；底部短弧亦只是空座標線。
  金.線([[cx - 78, 436], [cx - 78, 302]], 1.45, false, .76);
  金.線([[cx + 78, 436], [cx + 78, 302]], 1.45, false, .76);
  金.貝([cx - 78, 302], [cx - 70, 215], [cx + 70, 215], [cx + 78, 302], 1.7, .84);
  朱.貝([cx - 68, 304], [cx - 60, 236], [cx + 60, 236], [cx + 68, 304], .86, .62);
  金.線([[cx - 94, 436], [cx + 94, 436]], 1.65, false, .82);
  金.線([[cx - 86, 447], [cx + 86, 447]], .82, false, .58);
  for (const s of [-1, 1]) {
    金.線([[cx + s * 86, 444], [cx + s * 86, 294]], .65, false, .5);
    金.線([[cx + s * 91, 304], [cx + s * 69, 304]], .82, false, .62);
  }
  for (let k = 0; k < 16; k++) {
    const q = Math.PI + Math.PI * k / 15;
    金.圓(cx + Math.cos(q) * 85, 307 + Math.sin(q) * 77, 2.6, .56, .48);
  }
  金.貝([cx - 54, 425], [cx - 32, 410], [cx + 32, 410], [cx + 54, 425], .78, .58);
}

function 雜湊(seed, 鹽 = 0) {
  let 數 = (seed ^ Math.imul(鹽 + 1, 0x9e3779b1)) | 0;
  數 = Math.imul(數 ^ 數 >>> 16, 0x7feb352d);
  數 = Math.imul(數 ^ 數 >>> 15, 0x846ca68b);
  return ((數 ^ 數 >>> 16) >>> 0) / 4294967296;
}

function 雲貌(seed) {
  return {
    型: ((seed % 5) + 5) % 5,
    尺度: .68 + 雜湊(seed, 11) * .58,
    縱倍率: .82 + 雜湊(seed, 17) * .34,
    旋角: (雜湊(seed, 23) * 2 - 1) * .42,
    鏡向: 雜湊(seed, 29) < .5 ? -1 : 1,
    線寬: 1.05 + 雜湊(seed, 31) * .8,
    變一: 雜湊(seed, 37) * 2 - 1,
    變二: 雜湊(seed, 41) * 2 - 1,
  };
}

// 五型控制點之實形界（已含種子變形餘裕）；雲包絡再旋縮此界。
const 雲原界 = Object.freeze([
  [-1.34, .76, -.78, .76], // 單頭長尾
  [-1.14, .94, -.98, .86], // 雙頭疊卷
  [-1.62, .76, -.72, .78], // 長尾三流
  [-.98, 1.46, -.88, .98],  // 回首反卷
  [-1.18, 1.08, -1.08, 1.06], // 三疊團雲
]);

function 雲包絡(sx, sy, seed) {
  const 貌 = 雲貌(seed);
  const [左, 右, 頂, 底] = 雲原界[貌.型];
  const cos = Math.cos(貌.旋角), sin = Math.sin(貌.旋角), 角 = [];
  for (const u of [左, 右]) for (const v of [頂, 底]) {
    const x = u * sx * 貌.鏡向 * 貌.尺度;
    const y = v * sy * 貌.尺度 * 貌.縱倍率;
    角.push([cos * x - sin * y, sin * x + cos * y]);
  }
  const 線裕 = 貌.線寬 * .5 * 貌.尺度 * Math.max(1, 貌.縱倍率);
  return {
    左: Math.min(...角.map(p => p[0])) - 線裕,
    右: Math.max(...角.map(p => p[0])) + 線裕,
    頂: Math.min(...角.map(p => p[1])) - 線裕,
    底: Math.max(...角.map(p => p[1])) + 線裕,
    貌,
  };
}

// 勉薩框景之卷雲：頭卷而尾流。五型之頭數、尾長、回勢皆異。
// alpha 不作補償、夾限或分攤；每道子線皆恒等傳入。
function 卷雲(ctx, cx, cy, sx, sy, seed, alpha, 色) {
  const 貌 = 雲貌(seed), { 型, 尺度, 縱倍率, 旋角, 鏡向, 線寬, 變一, 變二 } = 貌;
  const X = n => n * sx, Y = n => n * sy;
  const 畫 = (寬, 造形) => {
    ctx.lineWidth = 寬; ctx.beginPath(); 造形(); ctx.stroke();
  };
  ctx.save();
  ctx.translate(cx, cy); ctx.rotate(旋角); ctx.scale(鏡向 * 尺度, 尺度 * 縱倍率);
  ctx.strokeStyle = 色; ctx.globalAlpha = alpha; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  if (型 === 0) {
    畫(線寬, () => { ctx.moveTo(X(-1.28), Y(.28 + 變二 * .08)); ctx.bezierCurveTo(X(-.8), Y(-.12), X(-.34), Y(-.42 - 變一 * .08), X(.02), Y(-.18)); ctx.bezierCurveTo(X(.28), Y(.02), X(.68), Y(.02), X(.65), Y(-.3)); ctx.bezierCurveTo(X(.62), Y(-.58), X(.3), Y(-.54), X(.31), Y(-.28)); ctx.bezierCurveTo(X(.32), Y(-.08), X(.5), Y(-.08), X(.52), Y(-.22)); });
    畫(線寬 * .58, () => { ctx.moveTo(X(-1.2), Y(.5)); ctx.bezierCurveTo(X(-.7), Y(.68 + 變一 * .06), X(-.2), Y(.45), X(.13), Y(.12)); ctx.moveTo(X(-.94), Y(.06)); ctx.bezierCurveTo(X(-.58), Y(-.26), X(-.18), Y(-.3), X(.08), Y(-.08)); });
  } else if (型 === 1) {
    畫(線寬, () => { ctx.moveTo(X(-1.06), Y(.35)); ctx.bezierCurveTo(X(-.68), Y(-.2), X(-.24), Y(-.3), X(.02), Y(.08)); ctx.bezierCurveTo(X(.23), Y(.4), X(.67), Y(.35), X(.66), Y(.02)); ctx.bezierCurveTo(X(.65), Y(-.24), X(.34), Y(-.22), X(.36), Y(.03)); ctx.moveTo(X(-.48), Y(-.08)); ctx.bezierCurveTo(X(-.32), Y(-.68 - 變一 * .12), X(.12), Y(-.87), X(.4), Y(-.48)); ctx.bezierCurveTo(X(.58), Y(-.2), X(.86), Y(-.35), X(.75), Y(-.62)); ctx.bezierCurveTo(X(.65), Y(-.84), X(.44), Y(-.75), X(.47), Y(-.51)); });
    畫(線寬 * .52, () => { ctx.moveTo(X(-.98), Y(.6)); ctx.bezierCurveTo(X(-.5), Y(.82), X(.12), Y(.65 + 變二 * .08), X(.38), Y(.28)); ctx.moveTo(X(-.82), Y(.13)); ctx.bezierCurveTo(X(-.44), Y(-.08), X(-.12), Y(.02), X(.05), Y(.28)); });
  } else if (型 === 2) {
    畫(線寬, () => { ctx.moveTo(X(-1.54), Y(.18)); ctx.bezierCurveTo(X(-1.0), Y(-.28 - 變一 * .08), X(-.35), Y(-.45), X(.04), Y(-.15)); ctx.bezierCurveTo(X(.3), Y(.06), X(.67), Y(.04), X(.64), Y(-.27)); ctx.bezierCurveTo(X(.62), Y(-.52), X(.34), Y(-.5), X(.36), Y(-.25)); });
    畫(線寬 * .62, () => { ctx.moveTo(X(-1.48), Y(.48)); ctx.bezierCurveTo(X(-.92), Y(.72), X(-.3), Y(.58), X(.15), Y(.2)); ctx.moveTo(X(-1.35), Y(-.08)); ctx.bezierCurveTo(X(-.9), Y(-.45), X(-.28), Y(-.48 - 變二 * .06), X(.1), Y(-.16)); ctx.moveTo(X(-1.18), Y(.18)); ctx.bezierCurveTo(X(-.78), Y(.02), X(-.37), Y(.1), X(-.08), Y(.32)); });
  } else if (型 === 3) {
    畫(線寬, () => { ctx.moveTo(X(-.9), Y(.24)); ctx.bezierCurveTo(X(-.58), Y(-.56), X(-.08), Y(-.65), X(.2), Y(-.2)); ctx.bezierCurveTo(X(.42), Y(.18), X(.75), Y(.12), X(.71), Y(-.23)); ctx.bezierCurveTo(X(.68), Y(-.5), X(.38), Y(-.46), X(.4), Y(-.2)); });
    畫(線寬 * .67, () => { ctx.moveTo(X(-.82), Y(.48)); ctx.bezierCurveTo(X(-.12), Y(.86 + 變一 * .08), X(1.2), Y(.78), X(1.34), Y(.15)); ctx.bezierCurveTo(X(1.43), Y(-.3), X(.72), Y(-.32 - 變二 * .08), X(.34), Y(.2)); ctx.bezierCurveTo(X(.08), Y(.56), X(.48), Y(.66), X(.68), Y(.35)); });
    畫(線寬 * .44, () => { ctx.moveTo(X(-.7), Y(.04)); ctx.bezierCurveTo(X(-.36), Y(-.32), X(-.06), Y(-.28), X(.12), Y(-.05)); });
  } else {
    畫(線寬, () => { ctx.moveTo(X(-1.1), Y(.36)); ctx.bezierCurveTo(X(-.94), Y(-.22), X(-.55), Y(-.36), X(-.34), Y(.03)); ctx.bezierCurveTo(X(-.13), Y(.45), X(.22), Y(.4), X(.25), Y(.02)); ctx.bezierCurveTo(X(.28), Y(-.42), X(.76), Y(-.45), X(.83), Y(-.08)); ctx.bezierCurveTo(X(.9), Y(.29), X(.57), Y(.46), X(.38), Y(.2)); ctx.moveTo(X(-.73), Y(-.06)); ctx.bezierCurveTo(X(-.67), Y(-.74 - 變一 * .1), X(-.16), Y(-.99), X(.08), Y(-.52)); ctx.bezierCurveTo(X(.29), Y(-.12), X(.62), Y(-.3), X(.51), Y(-.61)); ctx.bezierCurveTo(X(.42), Y(-.88), X(.15), Y(-.78), X(.19), Y(-.5)); });
    畫(線寬 * .53, () => { ctx.moveTo(X(-1.04), Y(.67)); ctx.bezierCurveTo(X(-.54), Y(.96), X(.25), Y(.91 + 變二 * .06), X(.72), Y(.47)); ctx.moveTo(X(-.96), Y(.16)); ctx.bezierCurveTo(X(-.62), Y(-.02), X(-.38), Y(.1), X(-.25), Y(.37)); });
  }
  ctx.restore();
}

function 碰橢圓(界, 域) {
  const 近x = Math.max(界.x0, Math.min(域.cx, 界.x1));
  const 近y = Math.max(界.y0, Math.min(域.cy, 界.y1));
  return ((近x - 域.cx) / 域.rx) ** 2 + ((近y - 域.cy) / 域.ry) ** 2 <= 1;
}

function 雲氣地(ctx) {
  const x0 = 174, y0 = 500, x1 = 1626, y1 = 1624, 寬 = x1 - x0, 高 = y1 - y0;
  // 不動尊位契約；只把主坊已定的頭身、盤股與耳際花域作實形靜域。
  const 靜域 = [
    { cx: 900, cy: 806, rx: 104, ry: 148 },
    { cx: 900, cy: 888, rx: 164, ry: 164 },
    { cx: 900, cy: 1190, rx: 218, ry: 234 },
    { cx: 684, cy: 1240, rx: 145, ry: 190 }, // 旋轉 .32 之垂臂橢圓外接界
    { cx: 900, cy: 1522, rx: 380, ry: 126 },
    { cx: 654, cy: 850, rx: 64, ry: 84 },
    { cx: 1146, cy: 850, rx: 64, ry: 84 },
  ];
  const 退密域 = { cx: 900, cy: 1170, rx: 438, ry: 590 };
  const 已落 = [];
  const 落雲 = (x, y, sx, sy, seed, alpha, 容咬 = false) => {
    const 包 = 雲包絡(sx, sy, seed);
    const 界 = { x0: x + 包.左, x1: x + 包.右, y0: y + 包.頂, y1: y + 包.底 };
    if (界.x0 < x0 || 界.x1 > x1 || 界.y0 < y0 || 界.y1 > y1) return false;
    if (靜域.some(域 => 碰橢圓(界, 域))) return false;
    const 靜裕 = (Math.hypot((x - 退密域.cx) / 退密域.rx, (y - 退密域.cy) / 退密域.ry) - 1) * 260;
    const 退密 = .2 + Math.min(1, Math.max(0, 靜裕) / 190) * .8;
    if (雜湊(seed, 47) > 退密) return false;
    if (!容咬 && 已落.some(雲 => Math.hypot(x - 雲.x, y - 雲.y) < 18 + (sx + 雲.sx) * .1)) return false;
    const 色 = [青綠, 墨, 冷灰][Math.floor(雜湊(seed, 53) * 3)];
    卷雲(ctx, x, y, sx, sy, seed, alpha, 色);
    已落.push({ x, y, sx });
    return true;
  };

  // 十八簇各有自定之心、氣眼與旋向；簇內容相咬，簇間留疏氣。
  for (let 簇 = 0; 簇 < 18; 簇++) {
    const 簇x = x0 + 寬 * (.035 + 雜湊(簇, 61) * .93);
    const 簇y = y0 + 高 * (.025 + 雜湊(簇, 67) * .94);
    const 數 = 7 + Math.floor(雜湊(簇, 71) * 7);
    for (let i = 0; i < 數; i++) {
      const 號 = 簇 * 31 + i, 角 = TAU * 雜湊(號, 73), 離 = i === 0 ? 0 : 22 + 雜湊(號, 79) * 76;
      const x = 簇x + Math.cos(角) * 離, y = 簇y + Math.sin(角) * 離 * .62;
      const sx = 42 + 雜湊(號, 83) * 42, sy = 26 + 雜湊(號, 89) * 28;
      const seed = (0x4d534100 + 號 * 97 + 簇 * 13) >>> 0;
      落雲(x, y, sx, sy, seed, .4 + 雜湊(號, 97) * .16, true);
    }
  }
  // 餘雲用二維雜湊投點，不作行列。近靜域者依實距連續退密。
  for (let i = 0; i < 620; i++) {
    const x = x0 + 雜湊(i, 101) * 寬, y = y0 + 雜湊(i, 103) * 高;
    const sx = 36 + 雜湊(i, 107) * 40, sy = 22 + 雜湊(i, 109) * 26;
    const seed = (0x4d534b00 + i * 131) >>> 0;
    落雲(x, y, sx, sy, seed, .36 + 雜湊(i, 113) * .15);
  }
}

function 山水(ctx) {
  const 金 = 造線筆(ctx, { 墨, 骨: 2.3, 衣: 1.2, 鬚: .66 });
  const 灰 = 造線筆(ctx, { 墨: 冷灰, 骨: 1.8, 衣: .95, 鬚: .52 });
  // 遠、中、近三重山廓，各峰以不同折轉生；中心亦有山線，免留人形空洞。
  const 層 = [
    { y: 750, a: .21, 色: 灰, pts: [[166, 860], [260, 806], [322, 838], [410, 760], [486, 701], [552, 775], [642, 716], [724, 777], [812, 732], [900, 790], [1005, 720], [1080, 764], [1172, 704], [1250, 784], [1350, 731], [1442, 812], [1634, 842]] },
    { y: 1010, a: .28, 色: 金, pts: [[162, 1145], [278, 1012], [360, 1085], [474, 884], [570, 1030], [690, 924], [802, 1072], [918, 940], [1030, 1088], [1138, 914], [1244, 1046], [1365, 892], [1470, 1030], [1638, 1118]] },
    { y: 1310, a: .34, 色: 灰, pts: [[162, 1510], [270, 1290], [395, 1372], [520, 1118], [648, 1320], [770, 1192], [894, 1384], [1018, 1210], [1144, 1338], [1280, 1094], [1406, 1310], [1638, 1490]] },
  ];
  for (const row of 層) {
    row.色.線(row.pts, row === 層[2] ? 1.35 : .82, false, row.a);
    for (let i = 1; i < row.pts.length - 1; i += 2) {
      const [x, y] = row.pts[i];
      row.色.線([[x, y], [x - 18 - i * 1.4, y + 54 + (i % 3) * 12]], .52, false, row.a * .72);
      if (i % 4 === 1) row.色.線([[x + 7, y + 8], [x + 38, y + 62], [x + 23, y + 102]], .46, false, row.a * .58);
      if (i % 3 === 0) row.色.貝([x - 4, y + 18], [x - 48, y + 45], [x - 54, y + 82], [x - 76, y + 116], .48, row.a * .55);
      else row.色.貝([x + 3, y + 22], [x + 31, y + 48], [x + 44, y + 72], [x + 57, y + 108], .48, row.a * .55);
    }
  }
  // 谷間水線，長短與波幅不齊，不作平行雨線。
  金.貝([190, 1580], [420, 1534], [622, 1570], [835, 1538], .72, .24);
  灰.貝([956, 1566], [1120, 1518], [1410, 1575], [1610, 1528], .68, .22);
  金.貝([314, 1608], [490, 1582], [720, 1620], [1034, 1588], .52, .19);
}

function 下緣青綠山水(ctx) {
  // 山層另立透明布；近巒只淨後巒之線，不鑿穿既有景筆。
  const 山布 = document.createElement('canvas'); 山布.width = ctx.canvas.width; 山布.height = ctx.canvas.height;
  const 山ctx = 山布.getContext('2d');
  const 層 = [
    { 名: '後', 數: 10, 左: 144, 右: 1656, 腳y: 2152, 高: [92, 142], 寬率: [.78, .92],
      色: 冷灰, alpha: .54, 線寬: 2.3, seed: 0x4d534c10, 皴: 3 },
    { 名: '中', 數: 8, 左: 118, 右: 1682, 腳y: 2228, 高: [154, 218], 寬率: [.8, .94],
      色: 青綠, alpha: .64, 線寬: 2.9, seed: 0x4d534c20, 皴: 3 },
    { 名: '前', 數: 6, 左: 86, 右: 1714, 腳y: 2312, 高: [226, 306], 寬率: [.82, .96],
      色: 墨, alpha: .73, 線寬: 3.5, seed: 0x4d534c30, 皴: 3 },
  ];

  const 造巒 = (row, i) => {
    const 格 = (row.右 - row.左) / row.數, seed = (row.seed + i * 131) >>> 0;
    const cx = row.左 + (i + .5) * 格 + (雜湊(seed, 151) - .5) * 格 * .16;
    const 寬 = 格 * (row.寬率[0] + 雜湊(seed, 157) * (row.寬率[1] - row.寬率[0]));
    const 高 = row.高[0] + 雜湊(seed, 163) * (row.高[1] - row.高[0]);
    const 峰x = cx + (雜湊(seed, 167) - .5) * 寬 * .24;
    const 峰y = row.腳y - 高, 左y = row.腳y + (雜湊(seed, 173) - .5) * 10;
    const 右y = row.腳y + (雜湊(seed, 179) - .5) * 10;
    return { seed, cx, 寬, 高, 峰x, 峰y, 左x: cx - 寬 / 2, 左y, 右x: cx + 寬 / 2, 右y };
  };

  // 巒頂以同高之雙控制點圓轉；一巒自左腳至右腳只落一筆。
  const 巒徑 = (x, 山, 閉 = false) => {
    const { 左x, 左y, 右x, 右y, 峰x, 峰y, 寬, 高, seed } = 山;
    const 左肩 = .27 + 雜湊(seed, 181) * .08, 右肩 = .27 + 雜湊(seed, 191) * .08;
    const 頂寬 = 寬 * (.055 + 雜湊(seed, 193) * .025);
    x.moveTo(左x, 左y);
    x.bezierCurveTo(左x + 寬 * 左肩, 左y - 高 * .22, 峰x - 頂寬, 峰y, 峰x, 峰y);
    x.bezierCurveTo(峰x + 頂寬, 峰y, 右x - 寬 * 右肩, 右y - 高 * .22, 右x, 右y);
    if (閉) { x.lineTo(右x, Math.max(左y, 右y) + 12); x.lineTo(左x, Math.max(左y, 右y) + 12); x.closePath(); }
  };

  const 淨前身 = 山群 => {
    山ctx.save(); 山ctx.globalCompositeOperation = 'destination-out'; 山ctx.globalAlpha = 1;
    山ctx.beginPath();
    for (const 山 of 山群) 巒徑(山ctx, 山, true);
    山ctx.fill(); 山ctx.restore();
  };

  const 落一層 = (row, li) => {
    const 山群 = Array.from({ length: row.數 }, (_, i) => 造巒(row, i));
    if (li) 淨前身(山群);
    山ctx.save(); 山ctx.strokeStyle = row.色; 山ctx.globalAlpha = row.alpha;
    山ctx.lineWidth = row.線寬; 山ctx.lineCap = 'round'; 山ctx.lineJoin = 'round';
    for (const [i, 山] of 山群.entries()) {
      山ctx.beginPath(); 巒徑(山ctx, 山); 山ctx.stroke();
      // 二三短皴順坡下行，止於巒腹；巒腳與鄰巒間悉留白作雲縫。
      for (let k = 0; k < row.皴; k++) {
        const 方 = (i + k + li) % 2 ? 1 : -1;
        const 起y = 山.峰y + 山.高 * (.13 + k * .12);
        const 起x = 山.峰x + 方 * 山.寬 * (.035 + k * .018);
        const 末x = 山.峰x + 方 * 山.寬 * (.18 + k * .045 + 雜湊(山.seed, 211 + k) * .025);
        const 末y = 山.峰y + 山.高 * (.35 + k * .13);
        山ctx.beginPath(); 山ctx.moveTo(起x, 起y);
        山ctx.bezierCurveTo(起x + 方 * 山.寬 * .055, 起y + 山.高 * .055,
          末x - 方 * 山.寬 * .04, 末y - 山.高 * .055, 末x, 末y);
        山ctx.stroke();
      }
    }
    山ctx.restore();
  };

  層.forEach(落一層);
  ctx.drawImage(山布, 0, 0);
}

function 葉廓(筆, 基, 正一, 正二, 梢, 反一, 反二, 寬, alpha) {
  筆.筆(寬, alpha);
  筆.ctx.beginPath();
  筆.ctx.moveTo(...基);
  筆.ctx.bezierCurveTo(...正一, ...正二, ...梢);
  筆.ctx.bezierCurveTo(...反一, ...反二, ...基);
  筆.ctx.stroke();
  筆.ctx.globalAlpha = 1;
}

function 葉簇(ctx, 筆, cx, cy, 向, seed, alpha) {
  const 數 = 5;
  for (let k = 0; k < 數; k++) {
    const q = 向 + (k - (數 - 1) / 2) * .5 + (雜湊(seed, k + 131) - .5) * .28;
    const 長 = 20 + 雜湊(seed, k + 137) * 13, 寬 = 5 + 雜湊(seed, k + 139) * 4;
    const ex = cx + Math.cos(q) * 長, ey = cy + Math.sin(q) * 長, nx = -Math.sin(q) * 寬, ny = Math.cos(q) * 寬;
    葉廓(筆, [cx, cy],
      [cx + (ex - cx) * .42 + nx, cy + (ey - cy) * .42 + ny], [ex + nx * .28, ey + ny * .28], [ex, ey],
      [ex - nx * .28, ey - ny * .28], [cx + (ex - cx) * .42 - nx, cy + (ey - cy) * .42 - ny], .82, alpha);
  }
}

function 花樹(ctx, { x, base, top, lean, sides, 色 = 墨, 透明 = .48 }) {
  const 筆 = 造線筆(ctx, { 墨: 色, 骨: 2, 衣: 1.05, 鬚: .55 });
  筆.貝([x - 7, base], [x - 22, base - 240], [x + lean * .58, top + 180], [x + lean, top], 1.7, 透明);
  筆.貝([x + 5, base], [x - 5, base - 210], [x + lean * .47 + 12, top + 170], [x + lean + 8, top + 4], .72, 透明 * .72);
  // 幹皮紋止於根上一段，不侵樹下留白呼吸域。
  for (let i = 0; i < 11; i++) {
    const t = .2 + i * .061, cx = x + lean * t * .7, cy = base + (top - base) * t;
    const s = i % 2 ? 1 : -1, 長 = 12 + i % 4 * 3;
      筆.線([[cx - 長, cy - s * 5], [cx - 3, cy + s * 2], [cx + 長 * .72, cy + s * 6]], .72, false, 透明);
  }
  for (let i = 0; i < sides.length; i++) {
    const s = sides[i];
    const t = (i + 1) / (sides.length + 1);
    const bx = x + lean * t * .82;
    const by = base + (top - base) * t;
    const ex = bx + s * (72 + i * 11);
    const ey = by - 50 - (i % 3) * 24;
    筆.貝([bx, by], [bx + s * 24, by - 16], [ex - s * 22, ey + 8], [ex, ey], .82, 透明 * .92);
    const q = Math.atan2(ey - by, ex - bx);
    for (let a = 1; a <= 4; a++) {
      const t2 = a / 5, px2 = bx + (ex - bx) * t2, py2 = by + (ey - by) * t2;
      葉簇(ctx, 筆, px2, py2, q + (a % 2 ? .96 : -.96), i * 97 + a * 13, 透明);
    }
    for (let j = 1; j <= 3 + (i % 2); j++) {
      const px = bx + (ex - bx) * j / (4 + i % 2);
      const py = by + (ey - by) * j / (4 + i % 2);
      const d = (j + i) % 2 ? 1 : -1;
      const tq = q + d * .7, tx = px + Math.cos(tq) * (34 + j * 3), ty = py + Math.sin(tq) * (34 + j * 3);
      筆.貝([px, py], [px + Math.cos(tq) * 12, py + Math.sin(tq) * 12],
        [px + Math.cos(tq) * 27, py + Math.sin(tq) * 27], [tx, ty], .58, 透明 * .76);
      葉簇(ctx, 筆, px, py, q + d * .86, i * 41 + j * 7, 透明);
      葉簇(ctx, 筆, tx, ty, tq + d * .22, i * 67 + j * 11, 透明);
    }
    葉簇(ctx, 筆, ex, ey, q, i * 53 + sides.length * 17, 透明);
    if (i % 2 === 0) {
      const petals = 5 + (i % 4);
      for (let k = 0; k < petals; k++) {
        const q2 = TAU * k / petals + i * .17;
        筆.貝([ex, ey], [ex + Math.cos(q2 - .3) * 15, ey + Math.sin(q2 - .3) * 15],
          [ex + Math.cos(q2 + .3) * 17, ey + Math.sin(q2 + .3) * 17],
          [ex + Math.cos(q2) * (22 + i), ey + Math.sin(q2) * (22 + i)], .62, 透明 * .8);
      }
      筆.圓(ex, ey, 3.2, .55, 透明 * .86);
    }
  }
}

function 勉薩景(ctx) {
  山水(ctx);
  雲氣地(ctx);
  下緣青綠山水(ctx);
  花樹(ctx, { x: 274, base: 1630, top: 720, lean: 64, sides: [-1, 1, -1, -1, 1, -1, 1], 色: 墨, 透明: .6 });
  花樹(ctx, { x: 1508, base: 1602, top: 674, lean: -82, sides: [1, -1, 1, -1, -1, 1, 1, -1], 色: 冷灰, 透明: .58 });
  花樹(ctx, { x: 430, base: 1580, top: 1020, lean: -56, sides: [1, 1, -1, 1], 色: 冷灰, 透明: .45 });
  花樹(ctx, { x: 1366, base: 1562, top: 1050, lean: 48, sides: [-1, 1, -1, -1, 1], 色: 墨, 透明: .43 });
  const 龕心 = [258, 472, 686, 900, 1114, 1328, 1542];
  for (const cx of 龕心) 空龕(ctx, cx);
  const 金 = 造線筆(ctx, { 墨, 骨: 2, 衣: 1.05, 鬚: .55 });
  金.線([[154, 464], [1646, 464]], 1.5, false, .7);
  連珠橫(金, 164, 1636, 477, { step: 24, r: 3.4, 寬: .68, 套心: false });
}

function 卷草帶(ctx, x0, x1, y, 反 = 1) {
  const 筆 = 造線筆(ctx, { 墨, 骨: 1.6, 衣: .9, 鬚: .52 });
  筆.ctx.save();
  筆.ctx.strokeStyle = 墨; 筆.ctx.globalAlpha = .56; 筆.ctx.lineWidth = .9;
  筆.ctx.beginPath(); 筆.ctx.moveTo(x0, y);
  const step = 82;
  for (let x = x0, i = 0; x < x1; x += step, i++) {
    const e = Math.min(x + step, x1), d = e - x, a = (9 + i % 3 * 2) * 反;
    筆.ctx.bezierCurveTo(x + d * .22, y - a, x + d * .36, y - a, x + d * .5, y);
    筆.ctx.bezierCurveTo(x + d * .64, y + a, x + d * .8, y + a, e, y);
  }
  筆.ctx.stroke(); 筆.ctx.restore();
  for (let x = x0 + 29, i = 0; x < x1; x += 47, i++) {
    const s = i % 2 ? 1 : -1;
    筆.貝([x, y], [x + 8, y + s * 4], [x + 17, y + s * 16 * 反], [x + 25, y + s * 18 * 反], .55, .44);
    筆.圓(x + 27, y + s * 18 * 反, 3 + i % 3, .48, .42, .2, TAU * .84);
  }
}

function 錦地副列(ctx, x0, x1, y, 型, 反 = 1) {
  const 色 = 型 % 3 === 0 ? 墨 : 型 % 3 === 1 ? 暗朱 : 青綠;
  const 筆 = 造線筆(ctx, { 墨: 色, 骨: 1.2, 衣: .68, 鬚: .42 });
  const alpha = .32 + 型 * .025, step = [31, 36, 42, 34, 47][型];
  筆.線([[x0, y - 4 * 反], [x1, y - 4 * 反]], .46, false, alpha);
  筆.線([[x0, y + 4 * 反], [x1, y + 4 * 反]], .46, false, alpha);
  for (let x = x0 + step * .5, i = 0; x < x1 - step * .35; x += step, i++) {
    if (型 === 0) {
      筆.圓(x, y, 2.2 + i % 2 * .5, .44, alpha);
      筆.線([[x - 9, y + 2 * 反], [x - 4, y - 2 * 反], [x, y], [x + 4, y + 2 * 反], [x + 9, y - 2 * 反]], .42, false, alpha);
    } else if (型 === 1) {
      const h = (3 + i % 3) * 反;
      筆.線([[x - 13, y], [x - 7, y - h], [x, y], [x + 7, y + h], [x + 13, y]], .48, false, alpha);
      if (i % 2 === 0) 筆.圓(x, y, 1.7, .4, alpha);
    } else if (型 === 2) {
      const s = i % 2 ? 1 : -1;
      筆.貝([x - 15, y + s * 2], [x - 8, y - 7 * 反], [x + 2, y - 7 * 反], [x + 7, y], .46, alpha);
      筆.圓(x + 9, y, 4.2, .42, alpha, s > 0 ? .15 : Math.PI, s > 0 ? Math.PI * 1.55 : Math.PI * 2.45);
    } else if (型 === 3) {
      筆.線([[x - 8, y - 4 * 反], [x + 8, y + 4 * 反], [x + 8, y - 4 * 反], [x - 8, y + 4 * 反]], .42, false, alpha);
      筆.圓(x, y, 1.8 + i % 3 * .25, .4, alpha);
    } else {
      const s = i % 2 ? 1 : -1;
      筆.貝([x - 18, y], [x - 9, y - s * 7 * 反], [x - 1, y - s * 7 * 反], [x + 4, y], .45, alpha);
      筆.貝([x + 4, y], [x + 10, y + s * 7 * 反], [x + 17, y + s * 7 * 反], [x + 22, y], .45, alpha);
    }
  }
}

function 四向錦地(ctx, 位, r, 型) {
  const 縮 = r + 18;
  錦地副列(ctx, 縮, 位.W - 縮, r, 型, 1);
  錦地副列(ctx, 縮, 位.W - 縮, 位.H - r, 型, -1);
  轉直(ctx, 縮, 位.H - 縮, r, (a, b, y) => 錦地副列(ctx, a, b, y, 型, 1));
  轉直(ctx, 縮, 位.H - 縮, 位.W - r, (a, b, y) => 錦地副列(ctx, a, b, y, 型, -1));
}

function 外框(ctx, 位) {
  const 金 = 造線筆(ctx, { 墨, 骨: 3.4, 衣: 1.5, 鬚: .72 });
  const 朱 = 造線筆(ctx, { 墨: 暗朱, 骨: 2, 衣: 1.05, 鬚: .58 });
  for (const [r, w, a, 筆] of [
    [28, 3.2, .94, 金], [48, 1.05, .6, 朱], [68, 1.7, .76, 金],
    [96, .92, .55, 金], [126, 1.7, .72, 金], [156, .9, .5, 朱],
  ]) 筆.線([[r, r], [位.W - r, r], [位.W - r, 位.H - r], [r, 位.H - r], [r, r]], w, false, a);
  // 六重界線間有五條錦地；五帶各得一細列，毋使單帶獨厚。
  for (const [r, 型] of [[38, 0], [58, 1], [82, 2], [111, 3], [141, 4]]) 四向錦地(ctx, 位, r, 型);
  連珠橫(金, 86, 1714, 84, { step: 25, r: 4.5, 寬: 1 });
  連珠橫(金, 86, 1714, 2416, { step: 25, r: 4.5, 寬: 1 });
  轉直(ctx, 86, 2414, 84, (a, b, y) => 連珠橫(金, a, b, y, { step: 25, r: 4.5, 寬: 1 }));
  轉直(ctx, 86, 2414, 1716, (a, b, y) => 連珠橫(金, a, b, y, { step: 25, r: 4.5, 寬: 1 }));
  菱花橫(朱, 132, 1668, 122, { step: 33, h: 8, 寬: .82 });
  菱花橫(朱, 132, 1668, 2378, { step: 33, h: 8, 寬: .82 });
  轉直(ctx, 132, 2368, 122, (a, b, y) => 菱花橫(朱, a, b, y, { step: 33, h: 8, 寬: .82 }));
  轉直(ctx, 132, 2368, 1678, (a, b, y) => 菱花橫(朱, a, b, y, { step: 33, h: 8, 寬: .82 }));
  卷草帶(ctx, 166, 1634, 151, 1);
  卷草帶(ctx, 166, 1634, 2349, -1);
  轉直(ctx, 166, 2334, 151, (a, b, y) => 卷草帶(ctx, a, b, y, 1));
  轉直(ctx, 166, 2334, 1649, (a, b, y) => 卷草帶(ctx, a, b, y, -1));
}

function 座欄雜寶(ctx, 筆, cx, cy, 型, alpha) {
  if (型 === 0) { // 法輪
    筆.圓(cx, cy, 37, .82, alpha);
    筆.圓(cx, cy, 28, .68, alpha);
    筆.圓(cx, cy, 6, .62, alpha);
    for (let k = 0; k < 8; k++) {
      const q = TAU * k / 8;
      筆.線([[cx + Math.cos(q) * 7, cy + Math.sin(q) * 7], [cx + Math.cos(q) * 27, cy + Math.sin(q) * 27]], .58, false, alpha);
      筆.貝([cx + Math.cos(q) * 28, cy + Math.sin(q) * 28], [cx + Math.cos(q - .13) * 35, cy + Math.sin(q - .13) * 35],
        [cx + Math.cos(q + .13) * 40, cy + Math.sin(q + .13) * 40], [cx + Math.cos(q) * 43, cy + Math.sin(q) * 43], .48, alpha);
    }
  } else if (型 === 1) { // 右旋螺
    筆.貝([cx - 39, cy + 20], [cx - 43, cy - 18], [cx - 12, cy - 46], [cx + 27, cy - 31], .92, alpha);
    筆.貝([cx + 27, cy - 31], [cx + 50, cy - 20], [cx + 41, cy + 11], [cx + 12, cy + 31], .92, alpha);
    筆.貝([cx + 12, cy + 31], [cx - 8, cy + 43], [cx - 34, cy + 38], [cx - 39, cy + 20], .92, alpha);
    筆.圓(cx + 2, cy - 4, 20, .66, alpha, .15, TAU * .86);
    筆.圓(cx + 3, cy - 4, 10, .56, alpha, .2, TAU * .94);
    for (let k = 0; k < 4; k++) 筆.貝([cx - 32 + k * 10, cy + 18 + k * 3], [cx - 20 + k * 8, cy + 6], [cx - 8 + k * 7, cy + 9], [cx + 3 + k * 6, cy + 22], .48, alpha);
  } else if (型 === 2) { // 寶傘
    筆.圓(cx, cy - 48, 4, .58, alpha);
    筆.線([[cx, cy - 44], [cx, cy + 48]], .82, false, alpha);
    筆.貝([cx - 48, cy - 10], [cx - 34, cy - 44], [cx + 34, cy - 44], [cx + 48, cy - 10], 1.02, alpha);
    筆.貝([cx - 48, cy - 10], [cx - 26, cy + 4], [cx + 26, cy + 4], [cx + 48, cy - 10], .72, alpha);
    for (const dx of [-30, -15, 15, 30]) 筆.線([[cx, cy - 36], [cx + dx, cy - 8]], .48, false, alpha);
    for (const dx of [-40, 0, 40]) {
      筆.貝([cx + dx, cy - 7], [cx + dx - 5, cy + 4], [cx + dx + 5, cy + 12], [cx + dx, cy + 23], .48, alpha);
      筆.圓(cx + dx, cy + 27, 3, .44, alpha);
    }
    筆.線([[cx - 10, cy + 48], [cx + 10, cy + 48]], .62, false, alpha);
  } else if (型 === 3) { // 寶蓋
    筆.圓(cx, cy - 51, 3.5, .54, alpha);
    筆.線([[cx, cy - 47], [cx, cy + 42]], .76, false, alpha);
    筆.貝([cx - 34, cy - 35], [cx - 19, cy - 49], [cx + 19, cy - 49], [cx + 34, cy - 35], .82, alpha);
    筆.線([[cx - 42, cy - 31], [cx + 42, cy - 31]], .88, false, alpha);
    筆.貝([cx - 43, cy - 28], [cx - 28, cy - 12], [cx + 28, cy - 12], [cx + 43, cy - 28], .72, alpha);
    筆.貝([cx - 39, cy - 8], [cx - 24, cy + 7], [cx + 24, cy + 7], [cx + 39, cy - 8], .72, alpha);
    for (const dx of [-34, -17, 17, 34]) 筆.貝([cx + dx, cy - 20], [cx + dx - 4, cy + 3], [cx + dx + 4, cy + 20], [cx + dx, cy + 38], .46, alpha);
    筆.圓(cx, cy + 47, 5, .5, alpha, 0, Math.PI);
  } else { // 捲草
    筆.貝([cx - 54, cy + 25], [cx - 18, cy + 7], [cx - 23, cy - 28], [cx + 2, cy - 35], .9, alpha);
    筆.貝([cx + 2, cy - 35], [cx + 32, cy - 44], [cx + 47, cy - 13], [cx + 25, cy + 4], .9, alpha);
    筆.貝([cx + 25, cy + 4], [cx + 6, cy + 18], [cx + 23, cy + 39], [cx + 53, cy + 27], .9, alpha);
    for (const [dx, dy, q] of [[-37, 14, -2.5], [-18, -7, -2.1], [8, -28, -.6], [33, -13, .2], [29, 21, .75]]) {
      const ex = cx + dx + Math.cos(q) * 24, ey = cy + dy + Math.sin(q) * 24;
      筆.貝([cx + dx, cy + dy], [cx + dx + Math.cos(q - .5) * 11, cy + dy + Math.sin(q - .5) * 11],
        [ex + Math.cos(q + 1.2) * 7, ey + Math.sin(q + 1.2) * 7], [ex, ey], .54, alpha);
      筆.貝([ex, ey], [ex + Math.cos(q - 1.2) * 7, ey + Math.sin(q - 1.2) * 7],
        [cx + dx + Math.cos(q + .5) * 11, cy + dy + Math.sin(q + .5) * 11], [cx + dx, cy + dy], .54, alpha);
    }
  }
}

function 座欄枝錦(筆, cx, cy, 半寬, 型, alpha) {
  // 雜寶四傍以疏枝成錦地；種子定向，五欄不復拓。
  for (const s of [-1, 1]) {
    for (let r = 0; r < 4; r++) {
      const sy = cy - 57 + r * 38 + ((型 + r) % 2) * 5;
      const sx = cx + s * (半寬 - 12), ex = cx + s * (46 + (r % 2) * 4), ey = sy + ((型 + r) % 3 - 1) * 8;
      筆.貝([sx, sy], [sx - s * 13, sy - 12], [ex + s * 12, ey + 11], [ex, ey], .58, alpha);
      for (let k = 0; k < 2; k++) {
        const t = .34 + k * .34, px = sx + (ex - sx) * t, py = sy + (ey - sy) * t;
        const q = (s < 0 ? 0 : Math.PI) + (k ? 1 : -1) * (.7 + 型 * .04), 長 = 14 + (型 + r + k) % 3 * 3;
        const tx = px + Math.cos(q) * 長, ty = py + Math.sin(q) * 長, nx = -Math.sin(q) * 4, ny = Math.cos(q) * 4;
        葉廓(筆, [px, py],
          [px + (tx - px) * .45 + nx, py + (ty - py) * .45 + ny], [tx + nx * .2, ty + ny * .2], [tx, ty],
          [tx - nx * .2, ty - ny * .2], [px + (tx - px) * .45 - nx, py + (ty - py) * .45 - ny], .5, alpha);
      }
      if (r % 2 === 型 % 2) 筆.圓(sx - s * 5, sy - 2, 4 + (型 + r) % 2, .48, alpha, .12, TAU * .82);
    }
  }
}

function 座欄錦地(ctx, S) {
  const 筆 = 造線筆(ctx, { 墨, 骨: 1.8, 衣: .92, 鬚: .52 });
  const y0 = S + 177, y1 = S + 343, alpha = .72;
  const 欄x = (i, y) => {
    const t = (y - (S + 155)) / 210, 左 = 490 + 40 * t, 右 = 1310 - 40 * t;
    return 左 + (右 - 左) * i / 5;
  };
  筆.線([[欄x(0, y0), y0], [欄x(5, y0), y0]], .72, false, alpha);
  筆.線([[欄x(0, y0 + 7), y0 + 7], [欄x(5, y0 + 7), y0 + 7]], .54, false, alpha);
  筆.線([[欄x(0, y1), y1], [欄x(5, y1), y1]], .72, false, alpha);
  筆.線([[欄x(0, y1 - 7), y1 - 7], [欄x(5, y1 - 7), y1 - 7]], .54, false, alpha);
  for (let i = 0; i <= 5; i++) {
    const xa = 欄x(i, y0), xb = 欄x(i, y1), 傾 = xb - xa, 法x = 3.5 / Math.hypot(傾, y1 - y0) * (y1 - y0);
    筆.線([[xa - 法x, y0], [xb - 法x, y1]], .6, false, alpha);
    筆.線([[xa + 法x, y0], [xb + 法x, y1]], .6, false, alpha);
    for (let y = y0 + 14; y < y1 - 8; y += 23) {
      const t = (y - y0) / (y1 - y0), px = xa + (xb - xa) * t;
      筆.圓(px, y, 2.35, .48, alpha);
    }
  }
  for (let i = 0; i < 5; i++) {
    const cy = S + 258, cx = (欄x(i, cy) + 欄x(i + 1, cy)) / 2;
    const 半寬 = (欄x(i + 1, cy) - 欄x(i, cy)) / 2;
    座欄枝錦(筆, cx, cy, 半寬, i, alpha);
    for (let x = 欄x(i, y0) + 13; x < 欄x(i + 1, y0) - 8; x += 19) 筆.圓(x, y0 + 7, 2, .46, alpha);
    for (let x = 欄x(i, y1) + 13; x < 欄x(i + 1, y1) - 8; x += 19) 筆.圓(x, y1 - 7, 2, .46, alpha);
    座欄雜寶(ctx, 筆, cx, cy, i, alpha);
  }
}

function 蓮座(ctx, 位) {
  const 金 = 造線筆(ctx, { 墨, 骨: 4.2, 衣: 2.1, 鬚: .95 });
  const 朱 = 造線筆(ctx, { 墨: 暗朱, 骨: 2.4, 衣: 1.2, 鬚: .62 });
  const S = 位.座面, x0 = 458, x1 = 1342;
  // 座頂承線即座面；上下偏差為零，落在主人所許 ±8px 內。
  金.線([[x0, S], [x1, S]], 4.2, false, .98);
  金.貝([x0, S], [590, S + 52], [1210, S + 52], [x1, S], 1.6, .72);
  金.貝([x0 + 14, S + 92], [620, S + 126], [1180, S + 126], [x1 - 14, S + 92], 2, .82);
  蓮瓣橫(金, x0 + 12, x1 - 12, S + 91, { step: 59, h: 88, 寬: 1.55 });
  蓮瓣橫(朱, x0 + 20, x1 - 20, S + 105, { step: 63, h: 48, 寬: .88, 覆: true });
  金.線([[x0 + 8, S + 118], [x1 - 8, S + 118]], 1.85, false, .78);
  連珠橫(金, x0 + 25, x1 - 25, S + 137, { step: 24, r: 3.5, 寬: .68 });
  // 座毯、垂緣與五欄錦地仍屬座飾；不畫獅面、人身或供養者。
  金.線([[490, S + 155], [1310, S + 155], [1270, S + 365], [530, S + 365], [490, S + 155]], 1.8, false, .82);
  座欄錦地(ctx, S);
  卷草帶(ctx, 540, 1260, S + 346, -1);
  金.線([[512, S + 382], [1288, S + 382]], 2.2, false, .82);
  斷(S === 1652, `蓮座座面失守：${S}`);
}

function 勉薩飾(ctx, 位) {
  外框(ctx, 位);
  蓮座(ctx, 位);
}

export function 景(ctx, 助) {
  驗助(助);
  ctx.save();
  try { 勉薩景(ctx); } finally { ctx.restore(); }
}

export function 飾(ctx, 助) {
  const 位 = 驗助(助);
  ctx.save();
  try { 勉薩飾(ctx, 位); } finally { ctx.restore(); }
}
