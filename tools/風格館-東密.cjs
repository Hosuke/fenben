// 風格館・東密室首展 · tools/風格館-東密.cjs —— 白描図像手冊頁式：大日金剛界一頁
// 制依 docs/考據/畫風-日本.md：白描図像是自立門類非半成品——密教僧親筆墨線
// 轉寫諸尊，「尊像＋梵號真言＋印・三昧耶形」並列成傳法手冊，本庫直系法統即此；
// 線以無肥瘦鐵線系為正（本庫三等筆即其制）。
// 頁式：雙界線枠・上欄尊像（含月輪）・下欄二格（印相獨幅・三昧耶形）・
// 題記豎行（尊名・印名・器名）・種子字之位（形不確唯記其位——空圈注「種子」）・
// 上緣卷草帶（唐草）。機出 圖錄/風格館/東密-大日一頁.png。
const { 合幀 } = require('./lib/幀具.cjs');

(async () => {
  await 合幀({
    出: '圖錄/風格館/東密-大日一頁.png',
    幀: (page) => page.evaluate(async () => {
      const { 依號 } = await import('/dist/yigui.js');
      const { 白描, 三昧耶白描 } = await import('/dist/baimiao.js');
      const { 執筆 } = await import('/dist/bi.js');
      const { 智拳印 } = await import('/dist/bujian/shouyin.js');
      const { 卷草帶 } = await import('/dist/bujian/jingwu.js');
      const W = 1720, H = 2300;
      const 墨 = '#d8b36a', 灰 = '#6b7186', 硃 = '#b0402c';
      const ink = document.createElement('canvas'); ink.width = W; ink.height = H;
      const x = ink.getContext('2d');
      x.strokeStyle = 墨; x.fillStyle = 墨;

      // ── 界線枠：外粗內細雙線（白描図像頁之郭）─────────────────────────────
      x.lineWidth = 5; x.strokeRect(70, 70, W - 140, H - 140);
      x.lineWidth = 1.8; x.strokeRect(96, 96, W - 192, H - 192);
      // 中欄界（上尊像／下二格）與下欄中分界
      x.beginPath(); x.moveTo(96, 1430); x.lineTo(W - 96, 1430); x.stroke();
      x.beginPath(); x.moveTo(W / 2, 1430); x.lineTo(W / 2, H - 96); x.stroke();

      // ── 上緣卷草帶（唐草——枠外一條）────────────────────────────────────────
      {
        const c2 = document.createElement('canvas'); c2.width = W; c2.height = H;
        const x2 = c2.getContext('2d');
        x2.translate(W / 2, 40);
        x2.strokeStyle = 墨; x2.fillStyle = 墨;
        const b = 執筆(x2, 900);
        b.ctx.lineWidth = b.W_OUT; b.ctx.lineCap = 'round';
        // 執筆 yT 上移之計：帶置 z 使 y≈0（z = 0.565*900/13.05 ≈ 39）
        const zb = (0.565 * 900) / (900 * 0.0145);
        const { 卷草帶: 帶 } = await import('/dist/bujian/jingwu.js');
        帶(b, -58, 58, zb, 1.9, 0.85);
        x.drawImage(c2, 0, 0);
      }

      // ── 上欄：大日如來坐像（center|k 專筆，含月輪）────────────────────────
      {
        const c2 = document.createElement('canvas'); c2.width = W; c2.height = H;
        const x2 = c2.getContext('2d');
        x2.translate(W / 2, 690);
        x2.strokeStyle = 墨; x2.fillStyle = 墨;
        白描(x2, 560, 依號['center'].k, 'center|k');
        x.drawImage(c2, 0, 0);
      }
      // 題記豎行（右上，白描図像之記位）
      x.fillStyle = 灰; x.font = '40px "Songti TC", serif'; x.textAlign = 'center';
      const 豎題 = (txt, tx, ty0, 距 = 46) => { [...txt].forEach((ch, i) => x.fillText(ch, tx, ty0 + i * 距)); };
      豎題('大日如來', W - 175, 210);
      豎題('金剛界智拳印', W - 175, 470, 44);
      x.font = '30px "Songti TC", serif'; x.fillStyle = 硃;
      豎題('現圖為正', 172, 216, 36);
      // 種子字之位：空圈注記（形不確唯記其位，寧缺毋誤）
      x.strokeStyle = 灰; x.lineWidth = 1.6;
      x.beginPath(); x.arc(178, 500, 46, 0, 7); x.stroke();
      x.fillStyle = 灰; x.font = '24px "Songti TC", serif';
      x.fillText('種子之位', 178, 585); x.fillText('（候梵書）', 178, 615);

      // ── 下欄左：智拳印獨幅 ─────────────────────────────────────────────────
      {
        const c2 = document.createElement('canvas'); c2.width = W; c2.height = H;
        const x2 = c2.getContext('2d');
        x2.translate(W / 4 + 48, 1560);
        x2.strokeStyle = 墨; x2.fillStyle = 墨;
        const b1 = 執筆(x2, 640);
        b1.ctx.lineWidth = b1.W_OUT; b1.ctx.lineCap = 'round';
        x2.translate(0, 640 * 0.565 - 640 * 0.0145 * 34);
        智拳印(b1, 0, 36, 2.05, true);
        x.drawImage(c2, 0, 0);
      }
      x.fillStyle = 灰; x.font = '34px "Songti TC", serif';
      豎題('智拳印', 172, 1560, 42);

      // ── 下欄右：五鈷杵三昧耶形 ─────────────────────────────────────────────
      {
        const c2 = document.createElement('canvas'); c2.width = W; c2.height = H;
        const x2 = c2.getContext('2d');
        x2.translate((3 * W) / 4 - 24, 1700);
        x2.strokeStyle = 墨; x2.fillStyle = 墨;
        三昧耶白描(x2, 400, 'east');
        x.drawImage(c2, 0, 0);
      }
      豎題('五鈷金剛杵', W - 172, 1560, 42);

      // ── 頁末小記（手冊之奧書位）────────────────────────────────────────────
      x.fillStyle = 灰; x.textAlign = 'center'; x.font = '26px "Songti TC", serif';
      x.fillText('白描図像頁式 · 尊像／印相／三昧耶形並列之制（畫風-日本卷：本庫直系法統・無肥瘦鐵線）', W / 2, H - 42);

      // 合成深底（蔽法鑿透之處）
      const out = document.createElement('canvas'); out.width = W; out.height = H;
      const xo = out.getContext('2d');
      xo.fillStyle = '#0d1124'; xo.fillRect(0, 0, W, H);
      xo.drawImage(ink, 0, 0);
      return out.toDataURL('image/png');
    }),
  });
})().catch(e => { console.error(e); process.exit(1); });
