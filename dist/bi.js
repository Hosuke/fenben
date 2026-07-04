// ─────────────────────────────────────────────────────────────────────────────
// 筆具 · Bi — 白描之共用筆法（格網座標之筆）
//
// 座標：原點為月輪心，+y 向下；單位「指」（自指），1 指 = u = R·0.0145；
// 頂之縱座標微沉（-R·0.565），使坐像安於輪心。
// 骨線 W_OUT 濃而鬚線 W_IN 淡（thin 內轉）——白描雙線之制。
// 逐尊專筆（src/zun/）與通形（baimiao.ts）皆執此筆，格網遂一。
// ─────────────────────────────────────────────────────────────────────────────
export function 執筆(ctx, R) {
    const u = R * 0.0145;
    const yT = -R * 0.565; // 頂之縱座標（微沉，使坐像安於輪心）
    const Y = (z) => yT + z * u; // 縱錨（指→畫布）
    const W_OUT = R * 0.0285, W_IN = R * 0.0163;
    const P = (pts, close = false) => {
        ctx.beginPath();
        pts.forEach(([x, z], i) => (i ? ctx.lineTo(x * u, Y(z)) : ctx.moveTo(x * u, Y(z))));
        if (close)
            ctx.closePath();
        ctx.stroke();
    };
    const A = (x, z, r, a0 = 0, a1 = 7) => {
        ctx.beginPath();
        ctx.arc(x * u, Y(z), r * u, a0, a1);
        ctx.stroke();
    };
    const Q = (x0, z0, cx, cz, x1, z1) => {
        ctx.beginPath();
        ctx.moveTo(x0 * u, Y(z0));
        ctx.quadraticCurveTo(cx * u, Y(cz), x1 * u, Y(z1));
        ctx.stroke();
    };
    const B = (x0, z0, c1x, c1z, c2x, c2z, x1, z1) => {
        ctx.beginPath();
        ctx.moveTo(x0 * u, Y(z0));
        ctx.bezierCurveTo(c1x * u, Y(c1z), c2x * u, Y(c2z), x1 * u, Y(z1));
        ctx.stroke();
    };
    const E = (x, z, rx, rz, rot = 0) => {
        ctx.beginPath();
        ctx.ellipse(x * u, Y(z), rx * u, rz * u, rot, 0, 7);
        ctx.stroke();
    };
    const dot = (x, z, r) => { ctx.beginPath(); ctx.arc(x * u, Y(z), r * u, 0, 7); ctx.fill(); };
    const thin = (fn) => { ctx.save(); ctx.lineWidth = W_IN; fn(); ctx.restore(); };
    const dim = (a, fn) => { ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); };
    return { ctx, R, u, Y, W_OUT, W_IN, P, A, Q, B, E, dot, thin, dim };
}
