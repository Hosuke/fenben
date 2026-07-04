// ─────────────────────────────────────────────────────────────────────────────
// 骨架層 · Gujia — 2.5D 立骨（粉本庫之骨，造像標準 9.4）
//
// 造像次第之律：打格→立骨（先裸身）→頭面→身軀→衣帶→嚴飾→點睛殿後——
// 五地工序考據所定（藏地炭稿先裸身 Jackson p.70、日本骨描き、漢地畫訣三源合證，
// 詳 docs/畫風考.md）。此層即「立骨」之數字身：
//   節＝關節（格網 x/z ＋ 深 d：向觀者為正，惟定遮擋序與環褶之向，不作透視）；
//   肢＝兩節間之膠囊（半徑漸變）——輪廓線與環褶（褶隨體轉）皆自體積取樣，
//   非手擺座標。體積近似而筆意親運：骨架給「勢」，筆鋒給「生」。
// 律：關節錨繫格網（liangdu 錨點）；多面多臂之尊非骨架不落筆。親筆。
// ─────────────────────────────────────────────────────────────────────────────
import type { 筆具, 運筆具 } from './bi.js';

// 節：格網座標＋淺深（d 向觀者為正，單位亦指）
export interface 節 { x: number; z: number; d: number }
export const 節之 = (x: number, z: number, d = 0): 節 => ({ x, z, d });

// 肢：自節 a 至節 b 之膠囊。弓＝軸之彎矢（指，正值向軸左法向鼓——臂股之天然
// 微彎）；肉＝肌腹之隆（指，半徑於中段加此數之弧——二頭肌股肉之曲，
// 文藝復興—犍陀羅之採：形自體積出，非直管）
export interface 肢 { a: 節; b: 節; ra: number; rb: number; 弓?: number; 肉?: number }

// 沿肢取樣：t∈[0,1] 得軸上點（二次曲軸）、該處半徑（含肌腹）、軸向單位向量
export function 沿(l: 肢, t: number): { x: number; z: number; r: number; ux: number; uz: number } {
  const dx = l.b.x - l.a.x, dz = l.b.z - l.a.z;
  const n0 = Math.hypot(dx, dz) || 1;
  const 弓 = l.弓 ?? 0;
  // 控點：中點沿左法向（-dz,dx）偏弓矢
  const cx = (l.a.x + l.b.x) / 2 + (-dz / n0) * 弓;
  const cz = (l.a.z + l.b.z) / 2 + (dx / n0) * 弓;
  const s = 1 - t;
  const x = s * s * l.a.x + 2 * s * t * cx + t * t * l.b.x;
  const z = s * s * l.a.z + 2 * s * t * cz + t * t * l.b.z;
  const r = l.ra + (l.rb - l.ra) * t + (l.肉 ?? 0) * Math.sin(Math.PI * t);
  const tx = 2 * s * (cx - l.a.x) + 2 * t * (l.b.x - cx);
  const tz = 2 * s * (cz - l.a.z) + 2 * t * (l.b.z - cz);
  const n = Math.hypot(tx, tz) || 1;
  return { x, z, r, ux: tx / n, uz: tz / n };
}

// 肢面點：t 沿軸、s∈[-1,1] 橫越（-1 左緣 +1 右緣，垂軸方向）——衣紋錨點之源
export function 肢面(l: 肢, t: number, s: number): [number, number] {
  const p = 沿(l, t);
  return [p.x + -p.uz * p.r * s, p.z + p.ux * p.r * s];
}

// 輪廓：膠囊之兩緣線（限t0..t1段）——肢體外形自體積出（曲軸＋肌腹），
// 逐段折線密取樣，一筆一緣
export function 輪廓(bi: 筆具, 筆: 運筆具, l: 肢, t0 = 0, t1 = 1, 側: -1 | 1 | 0 = 0): void {
  const { M, L, S } = 筆;
  const 畫緣 = (s: -1 | 1) => {
    const N = 14;
    const p0 = 肢面(l, t0, s);
    M(p0[0], p0[1]);
    for (let i = 1; i <= N; i++) {
      const p = 肢面(l, t0 + ((t1 - t0) * i) / N, s);
      L(p[0], p[1]);
    }
    S();
  };
  if (側 === 0 || 側 === -1) 畫緣(-1);
  if (側 === 0 || 側 === 1) 畫緣(1);
}

// 環褶：繞肢之褶（褶隨體轉）——弧之鼓向由肢之淺深梯度定：
// 近觀者之端，褶弧向遠端鼓（衣紋包裹圓柱之視覺律）。幅=橫越比例（0..1），
// 垂=弧矢高（指），正值向 b 端鼓、負值向 a 端鼓；不給則自淺深推。
export function 環褶(bi: 筆具, 筆: 運筆具, l: 肢, t: number, 幅 = 0.92, 垂?: number): void {
  const { M, Qk, S } = 筆;
  const p = 沿(l, t);
  const e0 = 肢面(l, t, -幅), e1 = 肢面(l, t, 幅);
  const 矢 = 垂 !== undefined ? 垂 : (l.b.d - l.a.d) * 0.35 + p.r * 0.42;
  const cx = p.x + p.ux * 矢, cz = p.z + p.uz * 矢;
  M(e0[0], e0[1]); Qk(cx, cz, e1[0], e1[1]); S();
}

// 遮擋序：以節深比先後（深小者先畫＝在後，深大者後畫＝在前）
export function 序(...諸: Array<{ d: number; 畫: () => void }>): void {
  諸.slice().sort((a, b) => a.d - b.d).forEach(x => x.畫());
}
