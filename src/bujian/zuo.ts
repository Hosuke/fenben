// ─────────────────────────────────────────────────────────────────────────────
// 部件 · 蓮華座——仰蓮二重，前列瓣尖有重郭，側瓣外傾有勢
//
// 出典：現図成身會諸尊皆蓮華座住月輪（儀軌層 座 字段；SAT図像抄 巻1 p.1052
// 成身會中央輪五尊皆坐仰蓮，瓣肥而有重郭，二列相錯）。坐像座面＝頂下 68 指
// （T1419 p.0941c23–0942a01：陰藏下加四指為盤線，又四指為座面）。
// 律：衣線藏回（蓮瓣結構線不施出鋒）；座面之緣僅露兩側（中為趺坐所掩）。親筆。
// ─────────────────────────────────────────────────────────────────────────────
import type { 筆具 } from '../bi.js';
import { 運筆 } from '../bi.js';

export interface 蓮座參 {
  座面?: number;    // 座面之緣 z（默認 68.4，微沉半分以承趺坐下緣）
  闊比?: number;    // 橫向縮放（他格網之尊備用）
}

export function 蓮華座(bi: 筆具, 參: 蓮座參 = {}): void {
  const { 座面 = 68.4, 闊比 = 1 } = 參;
  const 沉 = 座面 - 68.4;                 // 隨座面整體平移
  const { ctx, u, Y } = bi;
  const { M, C, Qk, S, 衣 } = 運筆(bi);
  const 瓣 = (px: number, tipZ: number, baseZ: number, hw: number, 傾 = 0, 重郭 = true) => {
    const tx = px + 傾;
    M(px - hw, baseZ); C(px - hw * 0.9, baseZ - (baseZ - tipZ) * 0.62, tx - hw * 0.36, tipZ + 0.5, tx, tipZ);
    C(tx + hw * 0.36, tipZ + 0.5, px + hw * 0.9, baseZ - (baseZ - tipZ) * 0.62, px + hw, baseZ); S();
    if (重郭) {
      M(px - hw * 0.45, baseZ - 2.0);
      C(px - hw * 0.36, baseZ - (baseZ - tipZ) * 0.66, tx - hw * 0.18, tipZ + 1.4, tx, tipZ + 1.0);
      C(tx + hw * 0.18, tipZ + 1.4, px + hw * 0.36, baseZ - (baseZ - tipZ) * 0.66, px + hw * 0.45, baseZ - 2.0); S();
    }
  };
  衣(() => {
    // 座面之緣：僅露兩側（中為趺坐所掩）
    bi.dim(0.7, () => {
      ctx.beginPath(); ctx.ellipse(0, Y(座面), 23.5 * 闊比 * u, 1.5 * u, 0, -Math.PI * 0.22, Math.PI * 0.24); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(0, Y(座面), 23.5 * 闊比 * u, 1.5 * u, 0, Math.PI * 0.76, Math.PI * 1.22); ctx.stroke();
    });
    for (const [px, tipZ, k] of [[-19.2, 68.2, -1.3], [-9.6, 68.5, -0.5], [0, 68.9, 0], [9.6, 68.5, 0.5], [19.2, 68.2, 1.3]] as const)
      瓣(px * 闊比, tipZ + 沉, 74.8 + 沉, 4.5 * 闊比, k * 闊比);
    for (const px of [-14.4, -4.8, 4.8, 14.4]) 瓣(px * 闊比, 70.7 + 沉, 76.5 + 沉, 4.2 * 闊比, px * 0.04 * 闊比, false);
    // 承底一線
    bi.dim(0.8, () => { M(-13.5 * 闊比, 77.6 + 沉); Qk(0, 78.8 + 沉, 13.5 * 闊比, 77.6 + 沉); S(); });
  });
}
