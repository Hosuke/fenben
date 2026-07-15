// 杳眇-琉璃地 · 框飾層（金繩界道之格網——景也，非身形；匠筆候單）
// 契約：滅點＝(900, 980)（地平線上，藥師座之所在）；界道簿 export 供尊身層誦戒。
export const 尊位 = { W: 1800, H: 2500, 滅點: [900, 980], 地平: 980 };

const { W, H, 地平 } = 尊位;
const [滅點甲, 滅點乙] = 尊位.滅點;
const 金 = [224, 192, 105];
const 琉璃 = [190, 220, 232];

// 底端雖有出畫者，亦當實錄：其繩自虛邊進畫，方得透視之正。
export const 界道簿 = Array.from({ length: 17 }, (_, 序) => [-400 + 序 * 162.5, H]);

function 色([赤, 綠, 藍], 透) {
  return `rgba(${赤},${綠},${藍},${透})`;
}

function 繩甲(底甲, 乙) {
  return 滅點甲 + (底甲 - 滅點甲) * ((乙 - 滅點乙) / (H - 滅點乙));
}

// 十三橫道：首隙最窄，每隙乘 1.32；末道留 26px 於畫內，俾雙線與珠串可見。
const 橫道乙 = (() => {
  const 比 = 1.32;
  const 數 = 13;
  const 總 = H - 26 - 地平;
  const 首隙 = 總 * (比 - 1) / (比 ** 數 - 1);
  let 乙 = 地平;
  return Array.from({ length: 數 }, (_, 序) => (乙 += 首隙 * 比 ** 序));
})();

function 畫線(ctx, 點列, 寬, 墨) {
  ctx.beginPath();
  ctx.moveTo(...點列[0]);
  for (let 序 = 1; 序 < 點列.length; 序++) ctx.lineTo(...點列[序]);
  ctx.lineWidth = 寬;
  ctx.strokeStyle = 墨;
  ctx.stroke();
}

function 畫琉璃紋(ctx) {
  // 只取近景三帶。每一縱格自有一二斷紋，相位固定，不借亂數。
  for (let 帶 = 9; 帶 < 12; 帶++) {
    const 上 = 橫道乙[帶];
    const 下 = 橫道乙[帶 + 1];
    for (let 格 = 0; 格 < 界道簿.length - 1; 格++) {
      const 紋數 = 1 + ((格 + 帶) % 3 === 0 ? 1 : 0);
      for (let 紋 = 0; 紋 < 紋數; 紋++) {
        const 份 = 紋數 === 1 ? 0.52 : 0.36 + 紋 * 0.29;
        const 乙 = 上 + (下 - 上) * 份;
        const 左界 = 繩甲(界道簿[格][0], 乙);
        const 右界 = 繩甲(界道簿[格 + 1][0], 乙);
        const 寬 = 右界 - 左界;
        const 錯 = 0.12 + ((格 * 2 + 帶 + 紋) % 3) * 0.03;
        const 首 = 左界 + 寬 * (0.15 + ((格 + 紋) % 4) * 0.035);
        const 尾 = 右界 - 寬 * (0.12 + ((格 + 帶) % 5) * 0.025);
        if (尾 > 0 && 首 < W) 畫線(ctx, [[Math.max(0, 首), 乙], [Math.min(W, 尾), 乙]], 0.72, 色(琉璃, 錯));
      }
    }
  }
}

function 畫縱金繩(ctx) {
  for (const [底甲] of 界道簿) {
    // 滅點至 1150 處，珠已密至不可分，故收為一絲；近座者漸隱，毋令光刺目。
    畫線(ctx, [[滅點甲, 滅點乙], [繩甲(底甲, 1020), 1020]], 0.7, 色(金, 0.08));
    畫線(ctx, [[繩甲(底甲, 1020), 1020], [繩甲(底甲, 1060), 1060]], 0.7, 色(金, 0.25));
    畫線(ctx, [[繩甲(底甲, 1060), 1060], [繩甲(底甲, 1100), 1100]], 0.7, 色(金, 0.42));
    畫線(ctx, [[繩甲(底甲, 1100), 1100], [繩甲(底甲, 1150), 1150]], 0.7, 色(金, 0.5));
    const 斜 = (底甲 - 滅點甲) / (H - 滅點乙);
    let 乙 = H;
    while (乙 >= 1150) {
      const 近 = (乙 - 滅點乙) / (H - 滅點乙);
      const 徑 = 0.55 + 1.95 * 近;
      ctx.beginPath();
      ctx.arc(繩甲(底甲, 乙), 乙, 徑 / 2, 0, Math.PI * 2);
      ctx.fillStyle = 色(金, 0.48 + 0.32 * 近);
      ctx.fill();
      const 珠距 = 3.5 + 24.5 * 近;
      乙 -= 珠距 / Math.sqrt(1 + 斜 * 斜);
    }
  }
}

function 畫橫金繩(ctx) {
  for (let 序 = 0; 序 < 橫道乙.length; 序++) {
    const 乙 = 橫道乙[序];
    畫線(ctx, [[0, 乙], [W, 乙]], 0.9, 色(金, 0.65));
    畫線(ctx, [[0, 乙 + 2.8], [W, 乙 + 2.8]], 0.72, 色(金, 0.25));
    if (序 >= 橫道乙.length - 2) {
      const 近 = (乙 - 地平) / (H - 地平);
      const 珠距 = 20 + 10 * 近;
      const 徑 = 1.55 + 0.95 * 近;
      const 起 = (序 % 2) * 珠距 / 2;
      ctx.fillStyle = 色(金, 0.72);
      for (let 甲 = 起; 甲 <= W; 甲 += 珠距) {
        ctx.beginPath();
        ctx.arc(甲, 乙, 徑 / 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
}

function 畫地平微光(ctx) {
  畫線(ctx, [[0, 地平 + 0.5], [W, 地平 + 0.5]], 0.8, 色(金, 0.68));
  畫線(ctx, [[0, 地平 + 2.5], [W, 地平 + 2.5]], 0.65, 色(金, 0.38));
  for (const [距, 透] of [[5.5, 0.24], [8.5, 0.16], [11.5, 0.09]])
    畫線(ctx, [[0, 地平 + 距], [W, 地平 + 距]], 0.6, 色(琉璃, 透));
}

// 七寶花火的固定「籽」：[橫道序, 縱道序]，共十一處，悉在 y > 1900。
const 七寶籽 = [[11, 2], [11, 5], [11, 8], [11, 11], [11, 14], [12, 3], [12, 5], [12, 7], [12, 9], [12, 11], [12, 13]];

function 畫七寶之芒(ctx) {
  for (let 序 = 0; 序 < 七寶籽.length; 序++) {
    const [橫, 縱] = 七寶籽[序];
    const 乙 = 橫道乙[橫];
    const 甲 = 繩甲(界道簿[縱][0], 乙);
    const 長 = 5.2 + (序 % 3) * 1.1;
    const 短 = 長 * 0.54;
    ctx.beginPath();
    ctx.moveTo(甲, 乙 - 長); ctx.lineTo(甲, 乙 - 短);
    ctx.moveTo(甲 + 短, 乙); ctx.lineTo(甲 + 長, 乙);
    ctx.moveTo(甲, 乙 + 短); ctx.lineTo(甲, 乙 + 長);
    ctx.moveTo(甲 - 長, 乙); ctx.lineTo(甲 - 短, 乙);
    ctx.lineWidth = 0.8;
    ctx.strokeStyle = 色(金, 0.84);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(甲, 乙, 1.15, 0, Math.PI * 2);
    ctx.fillStyle = 色(金, 0.9);
    ctx.fill();
  }
}

export function 景(ctx, 助) {
  ctx.save();
  try {
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    // 此裁乃虛實之戒：凡線寬與抗鋸齒皆不得溢入地平之上。
    ctx.beginPath();
    ctx.rect(0, 地平, W, H - 地平);
    ctx.clip();
    畫琉璃紋(ctx);
    畫縱金繩(ctx);
    畫橫金繩(ctx);
    畫地平微光(ctx);
    畫七寶之芒(ctx);
  } finally {
    ctx.restore();
  }
}
export function 飾(ctx, 助) { /* 無飾 */ }
