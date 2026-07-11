// 風格館・藏地室首展 · tools/風格館-藏地.cjs —— 釋迦說法・唐卡式一幀
// 制依 docs/風格館總設計.md 藏地室：八大線先行（梵線＝T1419 梵絣同源）、
// 三界縱分（上日月祥雲・中主尊山石・下蓮池七供）、中尊獨大、
// 三色織錦緣（貢夏虹門——三重框線內二細外一寬）、座前雙鹿法輪（說法印
// 正應初轉法輪）、寶蓋覆頂。景滿而尊尊——唐卡非光身佛像。
// 機出 圖錄/風格館/藏地-釋迦說法唐卡.png
const { 合幀 } = require('./lib/幀具.cjs');

(async () => {
  await 合幀({
    出: '圖錄/風格館/藏地-釋迦說法唐卡.png',
    幀: (page) => page.evaluate(async () => {
      const { 依號 } = await import('/dist/yigui.js');
      const { 白描 } = await import('/dist/baimiao.js');
      const { 執筆 } = await import('/dist/bi.js');
      const { 舉身光, 如意雲, 寶蓋, 雙鹿法輪, 蓮池, 日月, 供水碗列, 山石, 卷草帶 }
        = await import('/dist/bujian/jingwu.js').then(async m => ({ ...await import('/dist/bujian/jing.js'), ...m }));
      const W = 2000, H = 2600;
      const 墨 = '#d8b36a', 硃 = '#b0402c', 灰 = '#6b7186';
      const ink = document.createElement('canvas'); ink.width = W; ink.height = H;
      const x = ink.getContext('2d');
      x.strokeStyle = 墨; x.fillStyle = 墨;

      // ── 打格八大線（淡硃：邊框四・梵線・水平・對角二）────────────────────
      x.save();
      x.strokeStyle = 硃; x.globalAlpha = 0.13; x.lineWidth = 2;
      x.strokeRect(150, 150, W - 300, H - 300);
      x.beginPath(); x.moveTo(W / 2, 150); x.lineTo(W / 2, H - 150); x.stroke();
      x.beginPath(); x.moveTo(150, H / 2); x.lineTo(W - 150, H / 2); x.stroke();
      x.beginPath(); x.moveTo(150, 150); x.lineTo(W - 150, H - 150); x.stroke();
      x.beginPath(); x.moveTo(W - 150, 150); x.lineTo(150, H - 150); x.stroke();
      x.restore();

      // ── 三色織錦緣（貢夏虹門：內二細貼・外一寬）───────────────────────────
      x.lineWidth = 8; x.strokeRect(60, 60, W - 120, H - 120);
      x.lineWidth = 2.2; x.strokeRect(120, 120, W - 240, H - 240);
      x.lineWidth = 2.2; x.strokeRect(136, 136, W - 272, H - 272);

      // 景之筆（與尊同格：R 660，translate 同心）
      const 景 = (f) => {
        const c2 = document.createElement('canvas'); c2.width = W; c2.height = H;
        const x2 = c2.getContext('2d');
        x2.translate(W / 2, 1230);
        x2.strokeStyle = 墨; x2.fillStyle = 墨;
        const b = 執筆(x2, 730);
        b.ctx.lineWidth = b.W_OUT; b.ctx.lineCap = 'round';
        f(b);
        x.drawImage(c2, 0, 0);
      };

      // ── 上界：日月・祥雲（雲托日月，天際之表）────────────────────────────
      景(b => {
        日月(b, -40, 40, -20, 1.3, 0.6);
        如意雲(b, -33, -14, 2.2, 1, 0.5);
        如意雲(b, 33, -14, 2.2, -1, 0.5);
      });
      // ── 寶蓋覆頂（蓋心對梵線）────────────────────────────────────────────
      景(b => 寶蓋(b, 0, -9.5, 1.4, 0.7));
      // ── 中景山石（青綠山之簡，左右對稱托兩際）────────────────────────────
      景(b => { 山石(b, -44, 54, 1.9, 1, 0.45); 山石(b, 44, 54, 1.9, -1, 0.45); });

      // ── 中尊：釋迦說法（舉身光先落）──────────────────────────────────────
      景(b => 舉身光(b, { 淡: 0.5 }));
      {
        const c2 = document.createElement('canvas'); c2.width = W; c2.height = H;
        const x2 = c2.getContext('2d');
        x2.translate(W / 2, 1230);
        x2.strokeStyle = 墨; x2.fillStyle = 墨;
        白描(x2, 730, 依號['shaka'].h, 'shaka|h');
        x.drawImage(c2, 0, 0);
      }

      // ── 下界：雙鹿法輪（座前壇上）・七供碗・蓮池 ──────────────────────────
      景(b => {
        雙鹿法輪(b, 0, 84, 1.6, 0.75);
        供水碗列(b, 0, 91.5, 7, 3.8, 1.25, 0.6);
        蓮池(b, -33, 96, 13, 1.35, 0.5);
        蓮池(b, 33, 96, 13, 1.35, 0.5);
      });

      // ── 內框卷草緣（上下二帶）────────────────────────────────────────────
      景(b => {
        const zTop = (1160 - 178) / (660 * 0.0145) * -1 + 0.565 * 660 / (660 * 0.0145);
        void zTop;
      });
      {
        // 卷草帶以 px 位鋪之：另起小筆置於帶心
        for (const yy of [178, H - 178]) {
          const c2 = document.createElement('canvas'); c2.width = W; c2.height = H;
          const x2 = c2.getContext('2d');
          x2.translate(W / 2, yy);
          x2.strokeStyle = 墨; x2.fillStyle = 墨;
          const b = 執筆(x2, 900);
          b.ctx.lineWidth = b.W_OUT; b.ctx.lineCap = 'round';
          const zb = (0.565 * 900) / (900 * 0.0145);
          卷草帶(b, -62, 62, zb, 1.7, 0.5);
          x.drawImage(c2, 0, 0);
        }
      }

      // ── 說明牌小記 ────────────────────────────────────────────────────────
      x.fillStyle = 灰; x.textAlign = 'center'; x.font = '30px "Songti TC", serif';
      x.fillText('藏地室 · 釋迦說法唐卡式——八大線（梵線＝T1419 梵絣）・三界縱分・寶蓋日月祥雲・雙鹿法輪七供蓮池・貢夏三色緣', W / 2, H - 84);

      const out = document.createElement('canvas'); out.width = W; out.height = H;
      const xo = out.getContext('2d');
      xo.fillStyle = '#0d1124'; xo.fillRect(0, 0, W, H);
      xo.drawImage(ink, 0, 0);
      return out.toDataURL('image/png');
    }),
  });
})().catch(e => { console.error(e); process.exit(1); });
