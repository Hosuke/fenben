// ─────────────────────────────────────────────────────────────────────────────
// 譜牒機出 · tools/牒.cjs —— 隨貨之單：dist/牒.json
//
// 用法：npm run build 自動綴行（tsc 之後）。逐鍵錄 信・筆・候審・上壇，
// mandala 巡倉讀此牒即知何尊可收，勿須解 TS 模塊之內情（回填契約之約）。
// 牒為純內容清單，**無版戳無時戳**——輸出決定於源，build 冪等（Codex 審所正：
// 版戳於 commit 前生成必訛，時戳徒生無義 diff）；溯源歸回填工序之來源.md。
// ─────────────────────────────────────────────────────────────────────────────
const { writeFileSync } = require('fs');
const { join } = require('path');

(async () => {
  const { 儀軌 } = await import('../dist/yigui.js');
  const { 落筆簿, 候審筆 } = await import('../dist/zun/index.js');
  const 條目 = [];
  for (const g of 儀軌) {
    for (const 側 of ['t', 'k']) {
      const f = g[側];
      if (!f) continue;
      const 鍵 = `${g.id}|${側}`;
      const 筆 = Object.prototype.hasOwnProperty.call(落筆簿, 鍵) && typeof 落筆簿[鍵] === 'function';
      const 審 = 候審筆.has(鍵);
      條目.push({
        鍵, 尊: f.尊, 形: f.形, 印: f.印, 信: f.信,
        筆, 候審: 審,
        上壇: f.信 === '已核' && 筆 && !審,
      });
    }
  }
  const 牒 = {
    庫: 'fenben',
    總數: 條目.length,
    上壇數: 條目.filter(x => x.上壇).length,
    候審數: 條目.filter(x => x.候審).length,
    條目,
  };
  writeFileSync(join(__dirname, '../dist/牒.json'), JSON.stringify(牒, null, 1) + '\n');
  console.log(`牒出：${條目.length} 面，上壇 ${牒.上壇數}，候審 ${牒.候審數}`);
})().catch(e => { console.error(e); process.exit(1); });
