// 風格館・漢地室首展 · tools/風格館-漢地.cjs —— 藥師佛會・淨土變式一幀
// 制依 docs/風格館總設計.md 漢地室：三段縱疊（上華蓋寶樹飛雲・中佛會・
// 下蓮池平臺欄楯）、中軸對稱主大從小、榜題牌（寶寧寺水陸成堂之制）、
// 對摺鏡像複用（雙樹雙雲欄楯左右段——敦煌刺孔粉本之法即本庫之法）。
// 一鋪十五尊：藥師三尊＋十二神將（元壁畫廣勝寺藥師佛會之格局，
// 庫中漢傳諸筆悉數上牆）。機出 圖錄/風格館/漢地-藥師佛會淨土變.png
const { 合幀 } = require('./lib/幀具.cjs');

(async () => {
  await 合幀({
    出: '圖錄/風格館/漢地-藥師佛會淨土變.png',
    幀: (page) => page.evaluate(async () => {
      const { 依號 } = await import('/dist/yigui.js');
      const { 白描 } = await import('/dist/baimiao.js');
      const { 執筆 } = await import('/dist/bi.js');
      const { 舉身光, 如意雲 } = await import('/dist/bujian/jing.js');
      const { 寶蓋, 寶樹, 欄楯, 蓮池, 榜題牌 } = await import('/dist/bujian/jingwu.js');
      const W = 2100, H = 2500;
      const 墨 = '#d8b36a', 灰 = '#6b7186';
      const ink = document.createElement('canvas'); ink.width = W; ink.height = H;
      const x = ink.getContext('2d');
      x.strokeStyle = 墨; x.fillStyle = 墨;

      // 回紋欄界（上下二帶——明水陸幅式之欄）＋外框
      x.lineWidth = 3.5; x.strokeRect(70, 70, W - 140, H - 140);
      {
        x.lineWidth = 2.2;
        for (const yy of [108, H - 130]) {
          const 元 = 52, n = Math.floor((W - 280) / 元);
          for (let k = 0; k < n; k++) {
            const px = 140 + k * 元;
            x.beginPath();
            x.moveTo(px, yy + 22); x.lineTo(px, yy); x.lineTo(px + 38, yy);
            x.lineTo(px + 38, yy + 14); x.lineTo(px + 12, yy + 14); x.lineTo(px + 12, yy + 30);
            x.lineTo(px + 元, yy + 30);
            x.stroke();
          }
        }
      }

      const 落 = (id, cx, cy, R, 光) => {
        const c2 = document.createElement('canvas'); c2.width = W; c2.height = H;
        const x2 = c2.getContext('2d');
        x2.translate(cx, cy);
        x2.strokeStyle = 墨; x2.fillStyle = 墨;
        if (光) {
          const b0 = 執筆(x2, R);
          b0.ctx.lineWidth = b0.W_OUT; b0.ctx.lineCap = 'round';
          舉身光(b0, { 淡: 0.5 });
        }
        白描(x2, R, 依號[id].h, `${id}|h`);
        x.drawImage(c2, 0, 0);
      };
      const 景 = (f, cx, cy, R = 700) => {
        const c2 = document.createElement('canvas'); c2.width = W; c2.height = H;
        const x2 = c2.getContext('2d');
        x2.translate(cx, cy);
        x2.strokeStyle = 墨; x2.fillStyle = 墨;
        const b = 執筆(x2, R);
        b.ctx.lineWidth = b.W_OUT; b.ctx.lineCap = 'round';
        f(b);
        x.drawImage(c2, 0, 0);
      };

      // ── 上段虛空：華蓋・雙寶樹・如意雲（對稱鏡像之布）─────────────────────
      景(b => 寶蓋(b, 0, -14, 1.9, 0.65), W / 2, 1185, 700);
      景(b => { 寶樹(b, -35, 34, 17, 1.7, 0.5); 寶樹(b, 35, 34, 17, 1.7, 0.5); }, W / 2, 1185, 700);
      景(b => { 如意雲(b, -46, -16, 3.0, 1, 0.45); 如意雲(b, 46, -16, 3.0, -1, 0.45); }, W / 2, 1185, 700);

      // ── 中段佛會：藥師三尊（中坐二立脅侍）──────────────────────────────────
      落('yakushi', W / 2, 1195, 640, true);
      落('gakko', W * 0.298, 1310, 352);
      落('nikko', W * 0.702, 1310, 352);
      // 榜題牌三（成堂之制，各尊肩側）
      景(b => 榜題牌(b, -31, 4, 3.2, 10, 0.55), W / 2, 1195, 640);
      景(b => 榜題牌(b, -17.5, 8, 3.4, 10, 0.55), W * 0.298, 1310, 352);
      景(b => 榜題牌(b, 17.5, 8, 3.4, 10, 0.55), W * 0.702, 1310, 352);
      x.fillStyle = 灰; x.textAlign = 'center';
      x.font = '36px "Songti TC", serif';
      const 豎 = (t, tx, ty, 距 = 40) => [...t].forEach((ch, i) => x.fillText(ch, tx, ty + i * 距));
      豎('藥師佛', W / 2 - 640 * 0.0145 * 31, 1195 - 640 * 0.565 + 640 * 0.0145 * 5.5);
      x.font = '28px "Songti TC", serif';
      豎('月光', W * 0.298 - 352 * 0.0145 * 17.5, 1310 - 352 * 0.565 + 352 * 0.0145 * 9.4, 32);
      豎('日光', W * 0.702 + 352 * 0.0145 * 17.5, 1310 - 352 * 0.565 + 352 * 0.0145 * 9.4, 32);

      // ── 十二神將分列左右（各六，成堂帶榜位）───────────────────────────────
      const 右列 = ['kubira', 'basara', 'mekira', 'antera', 'anira', 'santera'];
      const 左列 = ['indara', 'haira', 'makora', 'shindara', 'shotora', 'bikara'];
      for (let i = 0; i < 6; i++) {
        const cy = 330 + i * 362;
        落(左列[i], 205, cy, 148);
        落(右列[i], W - 205, cy, 148);
      }

      // ── 下段蓮池平臺：欄楯二段（讓中央蓮池）・池水蓮花 ────────────────────
      景(b => {
        欄楯(b, -54, -13, 82, 4.4, 4.6, 0.6);
        欄楯(b, 13, 54, 82, 4.4, 4.6, 0.6);
        蓮池(b, 0, 88, 16, 1.7, 0.55);
      }, W / 2, 1195, 640);

      x.fillStyle = 灰; x.textAlign = 'center'; x.font = '30px "Songti TC", serif';
      x.fillText('漢地室 · 藥師佛會淨土變式——三段縱疊（華蓋寶樹飛雲／佛會成鋪／欄楯蓮池）・榜題成堂・對摺鏡像（刺孔粉本之法）', W / 2, H - 52);

      const out = document.createElement('canvas'); out.width = W; out.height = H;
      const xo = out.getContext('2d');
      xo.fillStyle = '#0d1124'; xo.fillRect(0, 0, W, H);
      xo.drawImage(ink, 0, 0);
      return out.toDataURL('image/png');
    }),
  });
})().catch(e => { console.error(e); process.exit(1); });
