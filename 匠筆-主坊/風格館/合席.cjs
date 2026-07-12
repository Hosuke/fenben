// 合席 · 匠筆-主坊/風格館/合席.cjs —— 風格館三層合成之具（分層之制 docs/風格館分層之制.md）
// 繪序即蔽序：景(Codex)→尊(主坊)→飾(Codex)→修(主坊)；畫於透明布，末合深底。
// 用法：node 匠筆-主坊/風格館/合席.cjs <席名> [--格網] [--獨尊]
//   --格網  疊 T1419 錨線（淡朱，自校用，勿以此稿交）
//   --獨尊  只繪尊身層（框飾層未到或單驗尊身時）
const { 合幀 } = require('../../tools/lib/幀具.cjs');
const 席 = process.argv[2];
const 格網 = process.argv.includes('--格網');
const 獨尊 = process.argv.includes('--獨尊');
if (!席) { console.error('用法：node 合席.cjs <席名> [--格網] [--獨尊]'); process.exit(1); }
// 席名只許字・數・連字符（防 ../ 逸出圖錄）
if (!/^[\p{L}\p{N}\-]+$/u.test(席)) { console.error(`席名不法：${席}`); process.exit(1); }
const 出名 = 格網 ? (獨尊 ? `圖錄/風格館/${席}-尊身格網校.png` : `圖錄/風格館/${席}-格網校.png`)
  : 獨尊 ? `圖錄/風格館/${席}-尊身校.png`
  : `圖錄/風格館/${席}-候展稿.png`;
合幀({
  出: 出名,
  幀: async (page) => {
    page.on('console', m => console.log('[頁]', m.text()));
    return await page.evaluate(async ({ 席, 格網, 獨尊 }) => {
      const 主 = await import(`/匠筆-主坊/風格館/${encodeURIComponent(席)}-尊身層.js`);
      let 框 = {};
      if (!獨尊) {
        // 常規出正式候展稿：框飾層載入失敗或缺 景/飾 export 皆即敗，不出殘圖
        框 = await import(`/匠筆-codex/風格館/${encodeURIComponent(席)}-框飾層.js`);
        if (typeof 框.景 !== 'function' || typeof 框.飾 !== 'function')
          throw new Error(`框飾層缺 景/飾 export：${席}（單驗尊身請用 --獨尊）`);
      }
      const 尊位 = 主.尊位 ?? 框.尊位; // 主坊定其工：主坊檔之尊位為正
      const W = 尊位?.W ?? 1800, H = 尊位?.H ?? 2500;
      const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
      const x = cv.getContext('2d');
      const 助 = { W, H, 尊位 };
      if (框.景) await 框.景(x, 助);
      await 主.尊(x, 助);
      if (框.飾) await 框.飾(x, 助);
      if (!獨尊 && 主.修) await 主.修(x, 助); // 修=合成終審之筆，獨尊校稿不混入
      if (格網 && 尊位) {
        x.save(); x.strokeStyle = 'rgba(200,60,60,0.55)'; x.lineWidth = 1.5;
        const 錨 = { 白毫: 12, 頦: 20, 心窩: 36, 臍: 48, 盤線: 64, 座面: 68 };
        x.font = '22px serif'; x.fillStyle = 'rgba(200,60,60,0.8)';
        for (const [名, 指數] of Object.entries(錨)) {
          const y = 尊位.頂y + 指數 * 尊位.指;
          x.beginPath(); x.moveTo(60, y); x.lineTo(W - 60, y); x.stroke();
          x.fillText(`${名} ${指數}`, 70, y - 6);
        }
        x.beginPath(); x.moveTo(尊位.中x, 60); x.lineTo(尊位.中x, H - 60); x.stroke();
        x.restore();
      }
      const 出 = document.createElement('canvas'); 出.width = W; 出.height = H;
      const o = 出.getContext('2d');
      o.fillStyle = '#0d1124'; o.fillRect(0, 0, W, H); o.drawImage(cv, 0, 0);
      return 出.toDataURL('image/png');
    }, { 席, 格網, 獨尊 });
  },
});
