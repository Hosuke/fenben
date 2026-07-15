// 杳眇-破暗地藏 · 彩層（主坊親筆・設色程第三筆）
// 一幅一色主：珠暖——明珠既是全幅唯一光源，彩亦唯珠所及：
// 珠暖大場（光至環七之末而盡——光盡處即暗淵之始）、
// 六空輪冷暈（候度之眾在光中猶寒——暖場中六點月白）、
// 人間線微光（上緣一線人間，身後漸遠之冷）。
// 暗淵永無彩：畫底之黑不受一色——「愈下愈黑至於無筆」，彩亦如之。
import { 尊位, 環r簿, 輪簿 } from './杳眇-破暗地藏-尊身層.js';
import { 尊位 as 框位 } from '../../匠筆-codex/風格館/杳眇-破暗地藏-框飾層.js';

export const 色譜 = {
  珠暖: [232, 190, 120],
  月白: [190, 215, 230],
};
export const 彩律 = { 峰α: 0.22 };

const 斷 = (c, m) => { console.assert(c, m); if (!c) throw new Error(m); };
// 染即戒：一切色停必經此手——峰α之律無可繞。
const 染 = ([r, g, b], α) => {
  斷(Number.isFinite(α) && α >= 0 && α <= 彩律.峰α, `彩奪線！α${α}逾${彩律.峰α}`);
  return `rgba(${r},${g},${b},${α})`;
};

export function 彩(x, 助) {
  const { W, H } = 尊位;
  const 珠心 = 框位.珠心;

  // ── 誦戒：契約 ───────────────────────────────────────────────────────
  斷(W === 1800 && H === 2500, '破暗布非1800×2500！');
  斷(珠心[0] === 840 && 珠心[1] === 1030, `珠心失約：${珠心}`);
  斷(Array.isArray(環r簿) && 環r簿.length === 7, `環r簿非七：${環r簿 && 環r簿.length}`);
  斷(Array.isArray(輪簿) && 輪簿.length === 6, `輪簿非六：${輪簿 && 輪簿.length}`);

  let 場數 = 0;

  x.save();
  x.globalAlpha = 1;
  x.globalCompositeOperation = 'destination-over';   // 線骨恆上，結構所保

  // ── 一・六空輪冷暈（候度之眾在光中猶寒——destination-over 逆序：
  //    先落者居前，故冷暈先於暖場，方懸於暖場之上而同在線下）──────────
  for (const [環序, a] of 輪簿) {
    const r = 環r簿[環序];
    const px = 珠心[0] + Math.cos(a) * r, py = 珠心[1] + Math.sin(a) * r;
    const g = x.createRadialGradient(px, py, 0, px, py, 44);
    g.addColorStop(0, 染(色譜.月白, 0.07));
    g.addColorStop(1, 染(色譜.月白, 0));
    x.fillStyle = g;
    x.beginPath(); x.arc(px, py, 44, 0, 2 * Math.PI); x.fill();
    場數++;
  }

  // ── 二・珠暖大場（光至環七之末而盡——光盡處即暗淵之始）───────────────
  {
    const 外r = 環r簿[6];
    const g = x.createRadialGradient(珠心[0], 珠心[1], 0, 珠心[0], 珠心[1], 外r);
    g.addColorStop(0, 染(色譜.珠暖, 0.18));
    g.addColorStop(0.35, 染(色譜.珠暖, 0.07));
    g.addColorStop(1, 染(色譜.珠暖, 0));
    x.fillStyle = g;
    x.beginPath(); x.arc(珠心[0], 珠心[1], 外r, 0, 2 * Math.PI); x.fill();
    場數++;
  }

  // ── 三・人間線微光（上緣一線人間，身後漸遠之冷）─────────────────────
  {
    const g = x.createLinearGradient(0, 0, 0, 320);
    g.addColorStop(0, 染(色譜.月白, 0.06));
    g.addColorStop(1, 染(色譜.月白, 0));
    x.fillStyle = g;
    x.fillRect(0, 0, W, 320);
    場數++;
  }

  x.restore();

  // ── 誦戒：場數之驗（珠1輪6線1＝八場；暗淵永無彩——畫底不受一色）──────
  斷(場數 === 8, `色場非八：${場數}`);
  console.log(`破暗初彩✓ 八場：珠暖大場・六空輪冷暈・人間線微光；暗淵無彩；峰α≤${彩律.峰α}`);
}
