// 風格館・犍陀羅室首展 · tools/風格館-犍陀羅.cjs —— 釋迦說法・貴霜龕式一幀
// 制依 docs/風格館總設計.md 犍陀羅室：科林斯柱雙分龕、支提拱楣（葱形）冠首、
// 菩提樹冠出頭光上、束帛座（中板刻雙鹿法輪——說法圖座前之刻）、素圈頭光、連珠帶天地欄、
// 三環同軸（頭光・拱楣・樹冠層層相套於中軸）。
// 機出 圖錄/風格館/犍陀羅-釋迦說法龕.png
const { 合幀 } = require('./lib/幀具.cjs');

(async () => {
  await 合幀({
    出: '圖錄/風格館/犍陀羅-釋迦說法龕.png',
    幀: (page) => page.evaluate(async () => {
      const { 依號 } = await import('/dist/yigui.js');
      const { 白描 } = await import('/dist/baimiao.js');
      const { 執筆 } = await import('/dist/bi.js');
      const { 菩提樹, 連珠帶 } = await import('/dist/bujian/jingwu.js');
      const W = 1800, H = 2400;
      const 墨 = '#d8b36a', 灰 = '#6b7186';
      const ink = document.createElement('canvas'); ink.width = W; ink.height = H;
      const x = ink.getContext('2d');
      x.strokeStyle = 墨; x.fillStyle = 墨;

      const 景 = (f, R = 700, cy = 1150) => {
        const c2 = document.createElement('canvas'); c2.width = W; c2.height = H;
        const x2 = c2.getContext('2d');
        x2.translate(W / 2, cy);
        x2.strokeStyle = 墨; x2.fillStyle = 墨;
        const b = 執筆(x2, R);
        b.ctx.lineWidth = b.W_OUT; b.ctx.lineCap = 'round';
        f(b, x2);
        x.drawImage(c2, 0, 0);
      };

      // ── 連珠帶天地欄（bead-and-reel：珠梭相間以簡珠列代）──────────────────
      for (const yy of [150, H - 150]) {
        const c2 = document.createElement('canvas'); c2.width = W; c2.height = H;
        const x2 = c2.getContext('2d');
        x2.translate(W / 2, yy);
        x2.strokeStyle = 墨; x2.fillStyle = 墨;
        const b = 執筆(x2, 900);
        b.ctx.lineWidth = b.W_OUT; b.ctx.lineCap = 'round';
        const zb = (0.565 * 900) / (900 * 0.0145);
        連珠帶(b, -56, 56, zb, 0.75, 0.6);
        x.drawImage(c2, 0, 0);
      }
      x.lineWidth = 3; x.strokeRect(90, 96, W - 180, H - 192);

      // ── 科林斯柱二（縱槽柱身・莨苕渦卷柱頭・柱礎）────────────────────────
      {
        const c2 = document.createElement('canvas'); c2.width = W; c2.height = H;
        const x2 = c2.getContext('2d');
        x2.strokeStyle = 墨; x2.fillStyle = 墨;
        x2.lineWidth = 3.4; x2.lineCap = 'round';
        for (const cxp of [300, W - 300]) {
          // 柱身縱槽（四線）：柱高 420-2060
          for (const dx of [-34, -12, 12, 34]) {
            x2.beginPath(); x2.moveTo(cxp + dx, 500); x2.lineTo(cxp + dx, 2020); x2.stroke();
          }
          // 柱礎二段
          x2.lineWidth = 4.5;
          x2.beginPath(); x2.moveTo(cxp - 52, 2020); x2.lineTo(cxp + 52, 2020); x2.stroke();
          x2.beginPath(); x2.moveTo(cxp - 62, 2060); x2.lineTo(cxp + 62, 2060); x2.stroke();
          // 柱頭：頂板＋莨苕葉二層（波狀齒緣）＋四角渦卷
          x2.beginPath(); x2.moveTo(cxp - 64, 434); x2.lineTo(cxp + 64, 434); x2.stroke();
          x2.lineWidth = 3;
          for (const [ly, lw] of [[500, 46], [468, 56]]) {
            x2.beginPath();
            x2.moveTo(cxp - lw, ly);
            for (let k = 0; k < 6; k++) {
              const px = cxp - lw + ((2 * lw) / 6) * (k + 0.5);
              x2.quadraticCurveTo(px - 8, ly - 22, px, ly - 10);
              x2.quadraticCurveTo(px + 8, ly - 18, px + (2 * lw) / 6 / 2 + 2, ly - 2);
            }
            x2.stroke();
          }
          for (const d of [-1, 1]) {
            x2.beginPath();
            x2.arc(cxp + d * 50, 448, 13, Math.PI * 0.2, Math.PI * 1.7);
            x2.stroke();
            x2.beginPath();
            x2.arc(cxp + d * 50, 448, 6, Math.PI * 0.4, Math.PI * 1.9);
            x2.stroke();
          }
        }
        x.drawImage(c2, 0, 0);
      }

      // ── 支提拱楣（葱形 ogee 拱，冠於頭光之上，兩肩起於柱頭）──────────────
      {
        const c2 = document.createElement('canvas'); c2.width = W; c2.height = H;
        const x2 = c2.getContext('2d');
        x2.strokeStyle = 墨; x2.lineWidth = 4; x2.lineCap = 'round';
        for (const off of [0, 26]) {
          x2.beginPath();
          x2.moveTo(364 - off, 500);
          x2.bezierCurveTo(430 - off, 300 - off * 1.2, 700, 260 - off, W / 2, 210 - off);
          x2.bezierCurveTo(W - 700, 260 - off, W - 430 + off, 300 - off * 1.2, W - 364 + off, 500);
          x2.stroke();
        }
        x.drawImage(c2, 0, 0);
      }

      // ── 菩提樹冠（拱楣之上，中軸）────────────────────────────────────────
      景(b => 菩提樹(b, 0, -36.5, 2.3, 0.55), 700, 1150);

      // ── 雙獅束帛座（方座覆帛扇褶，兩端蹲獅鬃卷）───────────────────────────
      {
        const c2 = document.createElement('canvas'); c2.width = W; c2.height = H;
        const x2 = c2.getContext('2d');
        x2.strokeStyle = 墨; x2.lineWidth = 3.4; x2.lineCap = 'round';
        const top = 1462, bot = 1900, l = 500, r = W - 500;
        x2.beginPath(); x2.moveTo(l, top); x2.lineTo(r, top); x2.stroke();
        x2.beginPath(); x2.moveTo(l - 14, bot); x2.lineTo(r + 14, bot); x2.stroke();
        // 束帛扇褶（放射懸鏈弧，分左右二組讓中板）
        for (const d of [-1, 1]) {
          for (let k = 0; k < 4; k++) {
            const px = W / 2 + d * (150 + ((r - l) / 2 - 150) * (k / 3) + 8);
            x2.beginPath(); x2.moveTo(W / 2 + d * (120 + k * 24), top + 4);
            x2.quadraticCurveTo(W / 2 + d * (135 + k * 42), (top + bot) / 2 + 20, px, bot - 4);
            x2.stroke();
          }
        }
        // 中板界線二豎
        x2.beginPath(); x2.moveTo(W / 2 - 118, top + 4); x2.lineTo(W / 2 - 118, bot - 4); x2.stroke();
        x2.beginPath(); x2.moveTo(W / 2 + 118, top + 4); x2.lineTo(W / 2 + 118, bot - 4); x2.stroke();
        x.drawImage(c2, 0, 0);
      }

      // ── 座前中板：雙鹿法輪浮雕（說法圖座前之刻）──────────────────────────
      {
        const { 雙鹿法輪 } = await import('/dist/bujian/jingwu.js');
        景(b => 雙鹿法輪(b, 0, 94.5, 1.55, 0.7), 700, 1150);
      }

      // ── 中尊：釋迦說法（素圈頭光在筆內；通肩厚褶即其衣）───────────────────
      {
        const c2 = document.createElement('canvas'); c2.width = W; c2.height = H;
        const x2 = c2.getContext('2d');
        x2.translate(W / 2, 1150);
        x2.strokeStyle = 墨; x2.fillStyle = 墨;
        白描(x2, 700, 依號['shaka'].h, 'shaka|h');
        x.drawImage(c2, 0, 0);
      }

      x.fillStyle = 灰; x.textAlign = 'center'; x.font = '28px "Songti TC", serif';
      x.fillText('犍陀羅室 · 釋迦說法龕式——科林斯柱・支提拱楣・菩提樹冠・束帛座板刻雙鹿法輪・連珠帶欄（三環同軸）', W / 2, H - 60);

      const out = document.createElement('canvas'); out.width = W; out.height = H;
      const xo = out.getContext('2d');
      xo.fillStyle = '#0d1124'; xo.fillRect(0, 0, W, H);
      xo.drawImage(ink, 0, 0);
      return out.toDataURL('image/png');
    }),
  });
})().catch(e => { console.error(e); process.exit(1); });
