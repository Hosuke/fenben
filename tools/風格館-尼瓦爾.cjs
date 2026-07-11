// 風格館・尼瓦爾室首展 · tools/風格館-尼瓦爾.cjs —— 金剛薩埵・paubha 式一幀
// 制依 docs/風格館總設計.md 尼瓦爾室：torana 龕（雙柱三重枋・葱形拱・頂獸面
// kirtimukha・肩摩羯）、上欄五方佛列龕（庫五佛真身小渲）、中尊獨大居軸、
// 獅象須彌座、頭光背光雙暈（連珠一周）、下欄火壇寶瓶、連珠緣框。
// 金剛薩埵乃 Vajrācārya 傳承本尊——杵鈴正是 paubha 中尊程式。
// 機出 圖錄/風格館/尼瓦爾-金剛薩埵paubha.png
const { 合幀 } = require('./lib/幀具.cjs');

(async () => {
  await 合幀({
    出: '圖錄/風格館/尼瓦爾-金剛薩埵paubha.png',
    幀: (page) => page.evaluate(async () => {
      const { 依號 } = await import('/dist/yigui.js');
      const { 白描 } = await import('/dist/baimiao.js');
      const { 執筆 } = await import('/dist/bi.js');
      const { 連珠帶, 火焰帶, 雙鹿法輪 } = await import('/dist/bujian/jingwu.js');
      const W = 1800, H = 2400;
      const 墨 = '#d8b36a', 灰 = '#6b7186';
      const ink = document.createElement('canvas'); ink.width = W; ink.height = H;
      const x = ink.getContext('2d');
      x.strokeStyle = 墨; x.fillStyle = 墨;

      // ── 連珠緣框（雙線夾珠一周之簡：上下帶＋雙框）─────────────────────────
      x.lineWidth = 4; x.strokeRect(70, 70, W - 140, H - 140);
      x.lineWidth = 2; x.strokeRect(108, 108, W - 216, H - 216);
      for (const yy of [89, H - 89]) {
        const c2 = document.createElement('canvas'); c2.width = W; c2.height = H;
        const x2 = c2.getContext('2d');
        x2.translate(W / 2, yy);
        x2.strokeStyle = 墨; x2.fillStyle = 墨;
        const b = 執筆(x2, 900);
        b.ctx.lineWidth = b.W_OUT; b.ctx.lineCap = 'round';
        const zb = (0.565 * 900) / (900 * 0.0145);
        連珠帶(b, -60, 60, zb, 0.62, 0.65);
        x.drawImage(c2, 0, 0);
      }

      // ── 上欄五方佛列龕（五格界線＋五佛真身小渲）───────────────────────────
      {
        x.lineWidth = 2.4;
        x.beginPath(); x.moveTo(108, 470); x.lineTo(W - 108, 470); x.stroke();
        for (let k = 1; k < 5; k++) {
          const px = 108 + ((W - 216) / 5) * k;
          x.beginPath(); x.moveTo(px, 108); x.lineTo(px, 470); x.stroke();
        }
        const 五佛 = ['east', 'south', 'center', 'west', 'north'];   // 中格大日
        for (let k = 0; k < 5; k++) {
          const cx = 108 + ((W - 216) / 5) * (k + 0.5);
          const c2 = document.createElement('canvas'); c2.width = W; c2.height = H;
          const x2 = c2.getContext('2d');
          x2.translate(cx, 272);
          x2.strokeStyle = 墨; x2.fillStyle = 墨;
          白描(x2, 235, 依號[五佛[k]].k, `${五佛[k]}|k`);
          x.drawImage(c2, 0, 0);
        }
      }

      // ── torana 龕：雙柱・三重枋・葱形拱・頂 kirtimukha・肩摩羯 ────────────
      {
        const c2 = document.createElement('canvas'); c2.width = W; c2.height = H;
        const x2 = c2.getContext('2d');
        x2.strokeStyle = 墨; x2.fillStyle = 墨; x2.lineCap = 'round';
        const L = 430, R = W - 430, capY = 1000;
        x2.lineWidth = 3.4;
        // 柱（雙線）與柱頭三重枋
        for (const cxp of [L, R]) {
          for (const dx of [-16, 16]) {
            x2.beginPath(); x2.moveTo(cxp + dx, capY); x2.lineTo(cxp + dx, 1980); x2.stroke();
          }
          for (const [dy, w] of [[0, 44], [-26, 56], [-52, 68]]) {
            x2.beginPath(); x2.moveTo(cxp - w, capY + dy); x2.lineTo(cxp + w, capY + dy); x2.stroke();
          }
        }
        // 葱形拱二層（內素外緣）：自柱頭內緣起，中弧外凸收頂尖
        for (const off of [0, 30]) {
          x2.lineWidth = off ? 2.4 : 3.6;
          x2.beginPath();
          x2.moveTo(L + 16 - off, capY - 52);
          x2.bezierCurveTo(L + 60 - off, 800 - off, 640 - off, 760 - off, W / 2, 700 - off * 1.4);
          x2.bezierCurveTo(W - 640 + off, 760 - off, W - (L + 60) + off, 800 - off, W - L - 16 + off, capY - 52);
          x2.stroke();
        }
        // 頂 kirtimukha 獸面：闊口橫弧・上齒列・雙獠牙下勾・同心雙目・焰眉、無下顎
        const gy = 655;
        x2.lineWidth = 3;
        x2.beginPath(); x2.moveTo(W / 2 - 64, gy); x2.quadraticCurveTo(W / 2, gy + 26, W / 2 + 64, gy); x2.stroke();   // 闊口
        for (let k = -3; k <= 3; k++) {   // 上齒小方列
          x2.strokeRect(W / 2 + k * 16 - 5, gy + 2 + Math.abs(k) * 2.4, 10, 12);
        }
        for (const d of [-1, 1]) {
          x2.beginPath(); x2.moveTo(W / 2 + d * 58, gy + 6); x2.quadraticCurveTo(W / 2 + d * 66, gy + 30, W / 2 + d * 52, gy + 42); x2.stroke();   // 獠牙下勾
          x2.beginPath(); x2.arc(W / 2 + d * 30, gy - 30, 13, 0, 7); x2.stroke();   // 目外圈
          x2.fillStyle = 墨; x2.beginPath(); x2.arc(W / 2 + d * 30, gy - 30, 5, 0, 7); x2.fill();
          x2.beginPath(); x2.moveTo(W / 2 + d * 12, gy - 48);   // 焰眉上卷
          x2.quadraticCurveTo(W / 2 + d * 40, gy - 66, W / 2 + d * 58, gy - 50);
          x2.quadraticCurveTo(W / 2 + d * 66, gy - 42, W / 2 + d * 76, gy - 52); x2.stroke();
          // 口角珠鏈沿拱內緣垂
          for (let k = 0; k < 4; k++) {
            x2.beginPath(); x2.arc(W / 2 + d * (72 + k * 22), gy + 14 + k * 26, 4.5, 0, 7); x2.stroke();
          }
        }
        // 肩摩羯二（吻上卷如象鼻・體魚形・尾卷草）
        for (const d of [-1, 1]) {
          const mx = W / 2 + d * 428, my = 862;
          const m = (a, b) => [mx + d * a, my + b];
          x2.lineWidth = 3;
          x2.beginPath(); x2.moveTo(...m(-10, -10));
          x2.bezierCurveTo(...m(30, -34), ...m(58, -30), ...m(64, -6));    // 頭背
          x2.bezierCurveTo(...m(66, 10), ...m(52, 18), ...m(40, 14));      // 頷回
          x2.stroke();
          // 吻上卷（象鼻式螺回）
          x2.beginPath(); x2.moveTo(...m(64, -6));
          x2.bezierCurveTo(...m(88, -18), ...m(96, -44), ...m(76, -52));
          x2.bezierCurveTo(...m(62, -56), ...m(58, -42), ...m(68, -38));
          x2.stroke();
          x2.fillStyle = 墨; x2.beginPath(); x2.arc(mx + d * 44, my - 16, 3.6, 0, 7); x2.fill();   // 目
          // 尾卷草二回
          x2.beginPath(); x2.moveTo(...m(-10, -10));
          x2.bezierCurveTo(...m(-38, -26), ...m(-56, -8), ...m(-40, 6));
          x2.bezierCurveTo(...m(-30, 14), ...m(-22, 6), ...m(-28, -2));
          x2.stroke();
        }
        x.drawImage(c2, 0, 0);
      }

      // ── 中尊：金剛薩埵（fugen|k 專筆，月輪頭光其筆自有）──────────────────
      {
        const c2 = document.createElement('canvas'); c2.width = W; c2.height = H;
        const x2 = c2.getContext('2d');
        x2.translate(W / 2, 1310);
        x2.strokeStyle = 墨; x2.fillStyle = 墨;
        白描(x2, 660, 依號['fugen'].k, 'fugen|k');
        x.drawImage(c2, 0, 0);
      }

      // ── 獅象須彌座：上下枋・束腰格・獅象交替正面像 ────────────────────────
      {
        const c2 = document.createElement('canvas'); c2.width = W; c2.height = H;
        const x2 = c2.getContext('2d');
        x2.strokeStyle = 墨; x2.fillStyle = 墨; x2.lineCap = 'round';
        const top = 1716, bot = 1900, L2 = 470, R2 = W - 470;
        x2.lineWidth = 3.6;
        for (const yy of [top, top + 16, bot - 16, bot]) {
          x2.beginPath(); x2.moveTo(L2, yy); x2.lineTo(R2, yy); x2.stroke();
        }
        x2.lineWidth = 2.4;
        const n = 5;
        for (let k = 0; k <= n; k++) {
          const px = L2 + ((R2 - L2) / n) * k;
          x2.beginPath(); x2.moveTo(px, top + 16); x2.lineTo(px, bot - 16); x2.stroke();
        }
        // 格中獅象交替（正面簡體：象＝扇耳垂鼻；獅＝渦鬃圓目）
        for (let k = 0; k < n; k++) {
          const cx = L2 + ((R2 - L2) / n) * (k + 0.5), cy = (top + bot) / 2 + 8;
          if (k % 2 === 0) {   // 象
            x2.beginPath(); x2.arc(cx, cy - 12, 22, 0, 7); x2.stroke();               // 首
            for (const d of [-1, 1]) {                                                 // 扇耳
              x2.beginPath(); x2.arc(cx + d * 32, cy - 12, 16, Math.PI * (d > 0 ? 1.5 : 0.5) - 1.1, Math.PI * (d > 0 ? 1.5 : 0.5) + 1.1); x2.stroke();
            }
            x2.beginPath(); x2.moveTo(cx, cy + 2); x2.quadraticCurveTo(cx - 11, cy + 26, cx + 6, cy + 36); x2.stroke();   // 垂鼻 S
            for (const d of [-1, 1]) { x2.beginPath(); x2.moveTo(cx + d * 11, cy + 6); x2.lineTo(cx + d * 18, cy + 20); x2.stroke(); }   // 牙
          } else {             // 雪獅
            for (let j = 0; j < 8; j++) {                                              // 渦鬃一周
              const a = (j / 8) * Math.PI * 2;
              x2.beginPath(); x2.arc(cx + Math.cos(a) * 26, cy - 8 + Math.sin(a) * 26, 9, a, a + 4.4); x2.stroke();
            }
            x2.beginPath(); x2.arc(cx, cy - 8, 17, 0, 7); x2.stroke();
            x2.fillStyle = 墨;
            x2.beginPath(); x2.arc(cx - 7, cy - 12, 3, 0, 7); x2.fill();
            x2.beginPath(); x2.arc(cx + 7, cy - 12, 3, 0, 7); x2.fill();
            x2.beginPath(); x2.moveTo(cx - 7, cy + 1); x2.quadraticCurveTo(cx, cy + 6, cx + 7, cy + 1); x2.stroke();
            for (const d of [-1, 1]) { x2.beginPath(); x2.moveTo(cx + d * 18, cy + 12); x2.lineTo(cx + d * 18, cy + 32); x2.stroke(); }  // 前肢
          }
        }
        x.drawImage(c2, 0, 0);
      }

      // ── 下欄：火壇居中（火焰帶三舌）・寶瓶滿枝二側 ────────────────────────
      {
        const c2 = document.createElement('canvas'); c2.width = W; c2.height = H;
        const x2 = c2.getContext('2d');
        x2.strokeStyle = 墨; x2.fillStyle = 墨; x2.lineCap = 'round'; x2.lineWidth = 3;
        const gy = 2258;
        // 火壇：方壇雙線＋火三舌
        x2.strokeRect(W / 2 - 60, gy - 36, 120, 40);
        x2.strokeRect(W / 2 - 48, gy - 28, 96, 24);
        for (const [dx, hh] of [[-26, 34], [0, 52], [26, 34]]) {
          x2.beginPath(); x2.moveTo(W / 2 + dx - 12, gy - 36);
          x2.quadraticCurveTo(W / 2 + dx - 16, gy - 36 - hh * 0.6, W / 2 + dx, gy - 36 - hh);
          x2.quadraticCurveTo(W / 2 + dx + 14, gy - 36 - hh * 0.5, W / 2 + dx + 10, gy - 36);
          x2.stroke();
        }
        // 寶瓶滿枝二（framing 火壇）
        for (const d of [-1, 1]) {
          const vx = W / 2 + d * 330, vy = gy - 8;
          x2.beginPath(); x2.moveTo(vx - 26, vy - 40);
          x2.bezierCurveTo(vx - 40, vy - 20, vx - 34, vy - 2, vx - 14, vy);
          x2.lineTo(vx + 14, vy);
          x2.bezierCurveTo(vx + 34, vy - 2, vx + 40, vy - 20, vx + 26, vy - 40);
          x2.stroke();
          x2.beginPath(); x2.moveTo(vx - 16, vy - 44); x2.lineTo(vx + 16, vy - 44); x2.stroke();   // 侈口
          x2.beginPath(); x2.moveTo(vx - 20, vy - 26); x2.lineTo(vx + 20, vy - 26); x2.stroke();   // 腹箍
          // 蓮枝三歧
          x2.beginPath(); x2.moveTo(vx, vy - 44); x2.lineTo(vx, vy - 78); x2.stroke();
          x2.beginPath(); x2.moveTo(vx - 3, vy - 76); x2.quadraticCurveTo(vx - 10, vy - 88, vx - 2, vy - 94); x2.stroke();
          x2.beginPath(); x2.moveTo(vx + 3, vy - 76); x2.quadraticCurveTo(vx + 10, vy - 88, vx + 2, vy - 94); x2.stroke();
          for (const dd of [-1, 1]) {
            x2.beginPath(); x2.moveTo(vx + dd * 4, vy - 56);
            x2.quadraticCurveTo(vx + dd * 26, vy - 66, vx + dd * 30, vy - 84); x2.stroke();
          }
        }
        x.drawImage(c2, 0, 0);
      }

      x.fillStyle = 灰; x.textAlign = 'center'; x.font = '28px "Songti TC", serif';
      x.fillText('尼瓦爾室 · 金剛薩埵 paubha 式——torana 葱形拱（kirtimukha 獸面・肩摩羯）・上欄五方佛・獅象須彌座・火壇寶瓶・連珠緣', W / 2, H - 40);

      const out = document.createElement('canvas'); out.width = W; out.height = H;
      const xo = out.getContext('2d');
      xo.fillStyle = '#0d1124'; xo.fillRect(0, 0, W, H);
      xo.drawImage(ink, 0, 0);
      return out.toDataURL('image/png');
    }),
  });
})().catch(e => { console.error(e); process.exit(1); });
