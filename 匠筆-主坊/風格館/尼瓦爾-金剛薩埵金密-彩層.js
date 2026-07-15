// 尼瓦爾-金剛薩埵金密 · 彩層三稿（主坊親筆・逐域填彩——真勾勒填彩）
// 先生評二彩：「通篇大部分都是紅色，明明線條規劃出許多複雜精密的區域」——
// 中的。三稿與 Codex 合作（先生之訓，如框架結構透視之例）：
//   匠造分區具（線稿閉域偵測：實戰六千五百餘域，46.9ms，吾親復跑其驗）；
//   吾執配色律（docs/考據/金密逐域配色案.md）——逐域各得其色。
// 補課四理仍奉（研色-總綱補課節）：大域破色值場（莫內之振動入域）、
// 小域平塗如寶（碎則亂）、罩染二層、邊沉有色相、顆粒簇撒。
// 律不移：色深護金 luma≤120（亮屑豁免——點也非場）；籽定無亂數；
// 面制一次而快取，一印 destination-over 居線下——線骨恆上。
import { 分區, 敷色 } from '../../匠筆-codex/風格館/尼瓦爾-金剛薩埵金密-分區具.js';

export const 彩律 = Object.freeze({ 場明度限: 120 });

export const 色譜 = {
  朱地: [150, 58, 45],
  朱變: [[138, 42, 58], [168, 74, 38], [128, 64, 40], [104, 40, 60], [180, 92, 52]],
  胭脂: [120, 32, 52],
  胭沉: [90, 26, 44],
  靛玄: [40, 48, 62],
  靛亮: [52, 56, 78],
  靛變: [[34, 42, 66], [52, 56, 78], [46, 44, 70], [30, 38, 56]],
  石青: [58, 80, 118],
  青變: [[46, 92, 130], [66, 64, 124], [40, 60, 100], [84, 104, 150]],
  石綠: [62, 78, 62],
  綠變: [[52, 88, 70], [76, 90, 54], [44, 64, 52], [88, 104, 72]],
  赭: [128, 64, 40],
  赭變: [[112, 56, 36], [150, 78, 46], [96, 48, 34]],
  暖罩: [160, 100, 55],
  冷罩: [60, 40, 90],
  深屑: [60, 20, 16],
  亮屑: [235, 205, 160],
};
Object.freeze(色譜);
for (const v of Object.values(色譜)) { Object.freeze(v); if (Array.isArray(v[0])) for (const c of v) Object.freeze(c); }

const 斷 = (c, m) => { console.assert(c, m); if (!c) throw new Error(m); };
const 明度 = ([r, g, b]) => r * 0.299 + g * 0.587 + b * 0.114;
const 染 = ([r, g, b], α) => `rgba(${r},${g},${b},${α})`;
const 籽 = (gx, gy) => {
  let t = (Math.imul(gx | 0, 73856093) ^ Math.imul(gy | 0, 19349663)) >>> 0;
  t = Math.imul(t ^ (t >>> 16), 2246822519) >>> 0;
  t = Math.imul(t ^ (t >>> 13), 3266489917) >>> 0;
  return ((t ^ (t >>> 16)) >>> 0) / 4294967296;
};

const W = 1800, H = 2400;
const 心 = { 左: 147, 上: 147, 右: 1653, 下: 2253 };

// 族簿：每族基色與變列——配域之所本
const 族簿 = [
  { 名: '朱', 基: 色譜.朱地, 變: 色譜.朱變 },                    // 0
  { 名: '靛', 基: 色譜.靛玄, 變: 色譜.靛變 },                    // 1
  { 名: '青', 基: 色譜.石青, 變: 色譜.青變 },                    // 2
  { 名: '綠', 基: 色譜.石綠, 變: 色譜.綠變 },                    // 3
  { 名: '胭', 基: 色譜.胭脂, 變: [色譜.胭沉, [138, 42, 58], [104, 40, 60]] }, // 4
  { 名: '赭', 基: 色譜.赭, 變: 色譜.赭變 },                      // 5
];
const 寶輪 = [2, 3, 4, 0];                                       // 框帶嵌寶之輪替（族號）
const 虹輪 = [1, 2, 3, 4];                                       // torana 虹帶之輪替
const 點彩輪 = [4, 3, 2];                                        // 背屏花眼之點彩

let 面快取 = null;

// 配域：一區歸一族一色（大域取基色候後理破色；小域取定變如寶）
function 配域(區, 判尊) {
  const [cx, cy] = 區.心, 積 = 區.積, h = 籽(cx, cy);
  const [bx0, by0, bx1, by1] = 區.界;
  const 挑 = (族號, 亮偏 = 0) => {
    const 族 = 族簿[族號];
    if (積 > 2500) return { 族號, 色: 族.基 };
    const 列 = [族.基, ...族.變];
    return { 族號, 色: 列[(Math.floor(h * 7) + 亮偏) % 列.length] };
  };
  // 環域之辨（審所正——環繞之區質心反在央，不可以心斷之）：
  // 觸畫布之緣者＝外環，留虛；界域幾攬全心者＝框帶環地，靛之。
  if (bx0 <= 1 && by0 <= 1 && bx1 >= W - 2 && by1 >= H - 2) return null;           // 外環——留虛
  if (bx1 - bx0 > 1450 && by1 - by0 > 2050) return 挑(1);                           // 框帶環地——靛
  if (cx < 34 || cx > W - 34 || cy < 34 || cy > H - 34) return null;               // 框外余白——留虛
  if (cx < 心.左 || cx > 心.右 || cy < 心.上 || cy > 心.下)
    return 積 < 400 ? 挑(寶輪[Math.floor(h * 4)]) : 挑(1);                          // 框帶：小域嵌寶、帶地靛
  if (cy >= 258 && cy <= 495 && cx >= 150 && cx <= 1650) {                          // 上欄五龕
    const k = Math.min(4, Math.floor((cx - 150) / 300));
    const 格左 = 150 + 300 * k;
    if (cx < 格左 + 13 || cx > 格左 + 287) return 挑(0);                            // 龕間柱——朱
    return 挑(k % 2 ? 3 : 2);
  }
  if (判尊(cx, cy)) {                                                               // 中尊域：靛族
    if (cy < 1050) return { 族號: 1, 色: 色譜.靛亮 };                               // 首光domain身亮
    return 挑(1);
  }
  if (cy >= 1690 && cy <= 1845 && cx >= 320 && cx <= 1480)                          // 蓮座帶：瓣綠靛相間
    return 挑(Math.floor(cx / 96) % 2 ? 1 : 3, 1);
  if (cy > 1845 && cy <= 2075 && cx >= 315 && cx <= 1485) {                         // 須彌台七格
    if (積 < 800) return 挑(5);                                                     // 獸面象面——赭
    const k = Math.min(6, Math.floor((cx - 315) / ((1485 - 315) / 7)));
    return 挑(k % 2 ? 4 : 2);
  }
  if (cy > 2075 && cy <= 2255)                                                      // 下欄供養帶
    return 積 < 3000 ? 挑([0, 2, 4, 3][Math.floor(h * 4)]) : 挑(1);
  // 中堂餘域：torana 虹帶（長薄之域）・花眼點彩・朱地
  const bw = 區.界[2] - 區.界[0], bh = 區.界[3] - 區.界[1];
  const 薄 = 積 / Math.max(1, bw * bh);
  if (積 > 1500 && (bw > 500 || bh > 500) && 薄 < 0.25) return 挑(虹輪[Math.floor(h * 4)]);
  if (積 < 1200 && h < 0.3) return 挑(點彩輪[Math.floor(h * 10) % 3]);
  return 挑(0);
}

async function 制面(描) {
  for (const 名 of ['朱地', '胭脂', '胭沉', '靛玄', '靛亮', '石青', '石綠', '赭', '暖罩', '冷罩', '深屑'])
    斷(明度(色譜[名]) <= 彩律.場明度限, `色奪金！${名}`);
  for (const 族 of 族簿) for (const 色 of 族.變) 斷(明度(色) <= 彩律.場明度限, `變色奪金！${族.名}`);

  // ── 一・線落離屏，付分區具 ──────────────────────────────────────────
  const 線布 = document.createElement('canvas');
  線布.width = W; 線布.height = H;
  await 描(線布, [1, 0, 0, 1, 0, 0]);
  const { 標圖, 區數, 區表 } = await 分區(線布);
  斷(區數 > 1000 && 區數 < 30000, `域數失度：${區數}`);

  // ── 二・逐域配色（尊域以 Path2D 判之——域形錄自蔽域，機轉頁無出口可契）─
  const 尊路 = new Path2D();
  尊路.ellipse(900, 925, 132, 118, 0, 0, 2 * Math.PI);
  尊路.moveTo(720, 1015); 尊路.bezierCurveTo(630, 1060, 610, 1240, 632, 1405);
  尊路.bezierCurveTo(560, 1455, 500, 1540, 480, 1650); 尊路.bezierCurveTo(630, 1718, 1170, 1718, 1320, 1650);
  尊路.bezierCurveTo(1300, 1540, 1240, 1455, 1168, 1405); 尊路.bezierCurveTo(1190, 1240, 1170, 1060, 1080, 1015);
  尊路.bezierCurveTo(1025, 985, 775, 985, 720, 1015); 尊路.closePath();
  const 判ctx = 線布.getContext('2d');
  判ctx.setTransform(1, 0, 0, 1, 0, 0);               // 描後歸元——isPointInPath 依CTM，不歸則尊域挪移（審所正）
  const 判尊 = (px, py) => 判ctx.isPointInPath(尊路, px, py);

  const 區族 = new Int8Array(區數 + 1).fill(-1);
  const 圖 = 敷色(標圖, 區表, (區) => {
    const 得 = 配域(區, 判尊);
    if (!得) return [0, 0, 0, 0];
    區族[區.序] = 得.族號;
    return [得.色[0], 得.色[1], 得.色[2], 255];
  }, W, H);

  // ── 三・後理：大域破色與值場（域心亮緣沉；粗細二頻之籽——washy非噪）───
  const 積表 = new Int32Array(區數 + 1), 心x = new Int32Array(區數 + 1),
        心y = new Int32Array(區數 + 1), 半表 = new Float32Array(區數 + 1);
  for (const 區 of 區表) {
    積表[區.序] = 區.積; 心x[區.序] = 區.心[0]; 心y[區.序] = 區.心[1];
    半表[區.序] = Math.max(24, Math.hypot(區.界[2] - 區.界[0], 區.界[3] - 區.界[1]) / 2);
  }
  const px = 圖.data;
  for (let y = 0, p = 0; y < H; y++) {
    for (let x = 0; x < W; x++, p++) {
      const lab = 標圖[p];
      if (!lab || 積表[lab] <= 2500 || 區族[lab] < 0) continue;
      const o = p * 4;
      const 族 = 族簿[區族[lab]];
      const 粗 = 籽((x >> 3) + lab, y >> 3), 細 = 籽(x, y + lab);
      const t = 粗 * 0.7 + 細 * 0.3;
      if (t < 0.5) {                                                     // 破色：向族變潛混
        const 變 = 族.變[Math.floor(t * 11) % 族.變.length];
        const k = 0.22 + t * 0.3;
        px[o] += (變[0] - px[o]) * k; px[o + 1] += (變[1] - px[o + 1]) * k; px[o + 2] += (變[2] - px[o + 2]) * k;
      }
      const d = Math.hypot(x - 心x[lab], y - 心y[lab]) / 半表[lab];       // 值場：心亮緣沉
      const v = 1.05 - 0.13 * Math.min(d, 1.25);
      px[o] *= v; px[o + 1] *= v; px[o + 2] *= v;
    }
  }

  // ── 四・成面：putImageData 後施罩染・邊沉・顆粒（全幅之氣）──────────
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const q = c.getContext('2d');
  斷(!!q, '離屏畫布不得其境');
  q.putImageData(圖, 0, 0);

  q.save();
  q.beginPath(); q.rect(心.左, 心.上, 心.右 - 心.左, 心.下 - 心.上); q.clip();
  let g = q.createLinearGradient(心.左, 心.上, 心.右, 心.下);              // 罩染：上左暖
  g.addColorStop(0, 染(色譜.暖罩, 0.07)); g.addColorStop(0.55, 染(色譜.暖罩, 0));
  q.fillStyle = g; q.fillRect(心.左, 心.上, 心.右 - 心.左, 心.下 - 心.上);
  g = q.createLinearGradient(心.右, 心.下, 心.左, 心.上);                  // 罩染：下右冷
  g.addColorStop(0, 染(色譜.冷罩, 0.08)); g.addColorStop(0.5, 染(色譜.冷罩, 0));
  q.fillStyle = g; q.fillRect(心.左, 心.上, 心.右 - 心.左, 心.下 - 心.上);
  const 寬 = 62;                                                           // 邊沉：影有色相
  for (const [x0, y0, x1, y1, rx, ry, rw, rh] of [
    [心.左, 0, 心.左 + 寬, 0, 心.左, 心.上, 寬, 心.下 - 心.上],
    [心.右, 0, 心.右 - 寬, 0, 心.右 - 寬, 心.上, 寬, 心.下 - 心.上],
    [0, 心.上, 0, 心.上 + 寬, 心.左, 心.上, 心.右 - 心.左, 寬],
    [0, 心.下, 0, 心.下 - 寬, 心.左, 心.下 - 寬, 心.右 - 心.左, 寬],
  ]) {
    const eg = q.createLinearGradient(x0, y0, x1, y1);
    eg.addColorStop(0, 染(色譜.胭沉, 0.34)); eg.addColorStop(1, 染(色譜.胭沉, 0));
    q.fillStyle = eg; q.fillRect(rx, ry, rw, rh);
  }
  for (const [ax, ay] of [[心.左, 心.上], [心.右, 心.上], [心.左, 心.下], [心.右, 心.下]]) {
    const cg = q.createRadialGradient(ax, ay, 0, ax, ay, 170);
    cg.addColorStop(0, 染(色譜.冷罩, 0.16)); cg.addColorStop(1, 染(色譜.冷罩, 0));
    q.fillStyle = cg; q.beginPath(); q.arc(ax, ay, 170, 0, 2 * Math.PI); q.fill();
  }
  let 屑數 = 0;                                                            // 顆粒：簇撒
  for (let gy = 心.上 + 3; gy < 心.下 - 3; gy += 6) {
    for (let gx = 心.左 + 3; gx < 心.右 - 3; gx += 6) {
      const h = 籽(gx, gy);
      const 簇 = 籽(Math.floor(gx / 48), Math.floor(gy / 48)) > 0.55 ? 1.8 : 0.6;
      if (h > 1 - 0.035 * 簇) q.fillStyle = 染(色譜.深屑, 0.11);
      else if (h < 0.02 * 簇) q.fillStyle = 染(色譜.亮屑, 0.09);
      else continue;
      const s = 0.9 + 籽(gx + 5, gy) * 1.1;
      q.fillRect(gx + 籽(gx + 1, gy) * 4, gy + 籽(gx, gy + 1) * 4, s, s);
      屑數++;
    }
  }
  q.restore();

  斷(屑數 > 2000 && 屑數 < 15000, `礦末失度：${屑數}`);
  console.log(`金剛薩埵金密三彩✓ 逐域填彩${區數}域・破色值場入域・罩染二層・邊沉有色相・礦末${屑數}粒；場明度≤${彩律.場明度限}護金`);
  return c;
}

export async function 彩(x, 描) {
  斷(typeof 描 === 'function', '彩須得描——viewer 付線稿之函');
  面快取 ??= await 制面(描);
  x.save();
  x.globalAlpha = 1;
  x.globalCompositeOperation = 'destination-over';   // 面一印居線下——線骨恆上
  x.drawImage(面快取, 0, 0, W, H);
  x.restore();
}
