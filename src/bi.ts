// ─────────────────────────────────────────────────────────────────────────────
// 筆具 · Bi — 白描之共用筆法（格網座標之筆）
//
// 座標：原點為月輪心，+y 向下；單位「指」（自指），1 指 = u = R·0.0145；
// 頂之縱座標微沉（-R·0.565），使坐像安於輪心。
// 骨線 W_OUT 濃而鬚線 W_IN 淡（thin 內轉）——白描雙線之制。
// 逐尊專筆（src/zun/）與通形（baimiao.ts）皆執此筆，格網遂一。
// ─────────────────────────────────────────────────────────────────────────────

export interface 筆具 {
  ctx: CanvasRenderingContext2D;
  R: number;                                  // 月輪半徑（畫布）
  u: number;                                  // 一指之長（畫布）
  Y: (z: number) => number;                   // 縱錨：自頂之指數 → 畫布縱座標
  W_OUT: number;                              // 骨線之寬
  W_IN: number;                               // 鬚線之寬
  P: (pts: Array<[number, number]>, close?: boolean) => void;  // 折線
  A: (x: number, z: number, r: number, a0?: number, a1?: number) => void; // 弧
  Q: (x0: number, z0: number, cx: number, cz: number, x1: number, z1: number) => void; // 二次曲線
  B: (x0: number, z0: number, c1x: number, c1z: number, c2x: number, c2z: number, x1: number, z1: number) => void; // 三次曲線
  E: (x: number, z: number, rx: number, rz: number, rot?: number) => void; // 橢圓
  dot: (x: number, z: number, r: number) => void;              // 實點
  thin: (fn: () => void) => void;             // 以鬚線行之
  dim: (a: number, fn: () => void) => void;   // 以淡墨行之
}

export function 執筆(ctx: CanvasRenderingContext2D, R: number): 筆具 {
  const u = R * 0.0145;
  const yT = -R * 0.565;                // 頂之縱座標（微沉，使坐像安於輪心）
  const Y = (z: number) => yT + z * u;  // 縱錨（指→畫布）
  const W_OUT = R * 0.0285, W_IN = R * 0.0163;
  const P = (pts: Array<[number, number]>, close = false) => {
    ctx.beginPath();
    pts.forEach(([x, z], i) => (i ? ctx.lineTo(x * u, Y(z)) : ctx.moveTo(x * u, Y(z))));
    if (close) ctx.closePath();
    ctx.stroke();
  };
  const A = (x: number, z: number, r: number, a0 = 0, a1 = 7) => {
    ctx.beginPath(); ctx.arc(x * u, Y(z), r * u, a0, a1); ctx.stroke();
  };
  const Q = (x0: number, z0: number, cx: number, cz: number, x1: number, z1: number) => {
    ctx.beginPath(); ctx.moveTo(x0 * u, Y(z0));
    ctx.quadraticCurveTo(cx * u, Y(cz), x1 * u, Y(z1)); ctx.stroke();
  };
  const B = (x0: number, z0: number, c1x: number, c1z: number, c2x: number, c2z: number, x1: number, z1: number) => {
    ctx.beginPath(); ctx.moveTo(x0 * u, Y(z0));
    ctx.bezierCurveTo(c1x * u, Y(c1z), c2x * u, Y(c2z), x1 * u, Y(z1)); ctx.stroke();
  };
  const E = (x: number, z: number, rx: number, rz: number, rot = 0) => {
    ctx.beginPath(); ctx.ellipse(x * u, Y(z), rx * u, rz * u, rot, 0, 7); ctx.stroke();
  };
  const dot = (x: number, z: number, r: number) => { ctx.beginPath(); ctx.arc(x * u, Y(z), r * u, 0, 7); ctx.fill(); };
  const thin = (fn: () => void) => { ctx.save(); ctx.lineWidth = W_IN; fn(); ctx.restore(); };
  const dim = (a: number, fn: () => void) => { ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); };
  return { ctx, R, u, Y, W_OUT, W_IN, P, A, Q, B, E, dot, thin, dim };
}
