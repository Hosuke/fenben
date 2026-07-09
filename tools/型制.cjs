// ─────────────────────────────────────────────────────────────────────────────
// 型制機出 · tools/型制.cjs —— dist/型制.json（三昧耶器三維放樣之據）
//
// 隨 build 綴行（牒之後）。純內容清單無時戳（冪等，同牒之制）。
// 壇側讀此 JSON 放樣，勿深 import 模塊（回填契約）。
// ─────────────────────────────────────────────────────────────────────────────
const { writeFileSync } = require('fs');
const { join } = require('path');

(async () => {
  const { 型制表 } = await import('../dist/bujian/xingzhi.js');
  const 出 = {
    庫: 'fenben',
    制: '座標與 sanmaya 器筆局部座標同系（z 向下正，器心原點）；徑＝全寬；比例為準縮放隨壇',
    條數: 型制表.length,
    條目: 型制表,
  };
  writeFileSync(join(__dirname, '../dist/型制.json'), JSON.stringify(出, null, 1) + '\n');
  console.log(`型制出：${型制表.length} 器`);
})().catch(e => { console.error(e); process.exit(1); });
