export const 節之 = (x, z, d = 0) => ({ x, z, d });
// 沿肢取樣：t∈[0,1] 得軸上點與該處半徑、軸向單位向量（畫面投影）
export function 沿(l, t) {
    const x = l.a.x + (l.b.x - l.a.x) * t;
    const z = l.a.z + (l.b.z - l.a.z) * t;
    const r = l.ra + (l.rb - l.ra) * t;
    const dx = l.b.x - l.a.x, dz = l.b.z - l.a.z;
    const n = Math.hypot(dx, dz) || 1;
    return { x, z, r, ux: dx / n, uz: dz / n };
}
// 肢面點：t 沿軸、s∈[-1,1] 橫越（-1 左緣 +1 右緣，垂軸方向）——衣紋錨點之源
export function 肢面(l, t, s) {
    const p = 沿(l, t);
    return [p.x + -p.uz * p.r * s, p.z + p.ux * p.r * s];
}
// 輪廓：膠囊之兩緣線（限t0..t1段）——肢體外形自體積出，一筆一緣
export function 輪廓(bi, 筆, l, t0 = 0, t1 = 1, 側 = 0) {
    const { M, C, S } = 筆;
    const 畫緣 = (s) => {
        const p0 = 肢面(l, t0, s), p1 = 肢面(l, t0 + (t1 - t0) / 3, s), p2 = 肢面(l, t0 + (2 * (t1 - t0)) / 3, s), p3 = 肢面(l, t1, s);
        M(p0[0], p0[1]);
        C(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
        S();
    };
    if (側 === 0 || 側 === -1)
        畫緣(-1);
    if (側 === 0 || 側 === 1)
        畫緣(1);
}
// 環褶：繞肢之褶（褶隨體轉）——弧之鼓向由肢之淺深梯度定：
// 近觀者之端，褶弧向遠端鼓（衣紋包裹圓柱之視覺律）。幅=橫越比例（0..1），
// 垂=弧矢高（指），正值向 b 端鼓、負值向 a 端鼓；不給則自淺深推。
export function 環褶(bi, 筆, l, t, 幅 = 0.92, 垂) {
    const { M, Qk, S } = 筆;
    const p = 沿(l, t);
    const e0 = 肢面(l, t, -幅), e1 = 肢面(l, t, 幅);
    const 矢 = 垂 !== undefined ? 垂 : (l.b.d - l.a.d) * 0.35 + p.r * 0.42;
    const cx = p.x + p.ux * 矢, cz = p.z + p.uz * 矢;
    M(e0[0], e0[1]);
    Qk(cx, cz, e1[0], e1[1]);
    S();
}
// 遮擋序：以節深比先後（深小者先畫＝在後，深大者後畫＝在前）
export function 序(...諸) {
    諸.slice().sort((a, b) => a.d - b.d).forEach(x => x.畫());
}
