// ─────────────────────────────────────────────────────────────────────────────
// 回填之具 · tools/回填.cjs —— mandala 巡倉所執之拷貝工序（契約見 docs/回填契約.md）
//
// 用法：node tools/回填.cjs [mandala倉根]      （默認 ../mandala）
// 工序：①驗 dist/牒.json 在（build 未行則拒）②dist/ 逐檔拷 <mandala>/vendor/fenben/dist/
// （機出不改一字）③覆寫 vendor/fenben/來源.md（溯源：版・時・上壇數）。
// 拷全庫而閘在讀端：mandala 只以 上壇之()（或讀牒之上壇字段）取尊，
// 候審待核之筆雖在貨中而不上壇——寧缺毋誤之律行於讀端，巡倉遂可無腦定期跑。
// ─────────────────────────────────────────────────────────────────────────────
const { readFileSync, writeFileSync, mkdirSync, readdirSync, copyFileSync, existsSync, statSync, rmSync, realpathSync } = require('fs');
const { join, resolve, sep } = require('path');
const { execSync } = require('child_process');

const ROOT = join(__dirname, '..');
const 壇根 = resolve(process.argv[2] || join(ROOT, '../mandala'));

const 牒路 = join(ROOT, 'dist/牒.json');
if (!existsSync(牒路)) { console.error('無牒：先 npm run build（牒隨 build 機出）'); process.exit(1); }
// 壇根強驗（此後有 rm 之舉，錨必確鑿）：deities.js 為兩倉尊號之錨，必在
if (!existsSync(join(壇根, 'js/data/deities.js'))) {
  console.error(`壇根不似 mandala 倉（無 js/data/deities.js）：${壇根}`); process.exit(1);
}
const 牒 = JSON.parse(readFileSync(牒路, 'utf8'));

// 溯源於回填之時取（巡倉 pull 後樹淨，HEAD 即出貨之版——牒不載版戳之故）
let 版 = 'unknown';
try { 版 = execSync('git describe --always --dirty', { cwd: ROOT }).toString().trim(); } catch { /* 無 git 亦可回填 */ }
if (版.endsWith('-dirty')) console.warn('⚠ 粉本樹不淨：溯源之版帶 dirty——正式回填當自乾淨之 HEAD 行之');

// 整拷之義：先刪後拷——dist 已亡之檔勿殘於 vendor（Codex 審所正）。
// 刪前驗實路徑：vendor/fenben 若為 symlink 出壇外，拒刪（破壞性操作之戒）
const 的 = join(壇根, 'vendor/fenben/dist');
{
  const 壇實 = realpathSync(壇根);
  let 探 = join(壇根, 'vendor/fenben');
  if (!existsSync(探)) 探 = join(壇根, 'vendor');
  if (existsSync(探)) {
    const 實 = realpathSync(探);
    if (實 !== 壇實 && !實.startsWith(壇實 + sep)) {
      console.error(`拒刪：${探} 實路徑出壇外（${實}）`); process.exit(1);
    }
  }
}
rmSync(的, { recursive: true, force: true });
const 拷 = (自, 至) => {
  mkdirSync(至, { recursive: true });
  for (const e of readdirSync(自)) {
    const s = join(自, e), d = join(至, e);
    if (statSync(s).isDirectory()) 拷(s, d);
    else copyFileSync(s, d);
  }
};
拷(join(ROOT, 'dist'), 的);

writeFileSync(join(壇根, 'vendor/fenben/來源.md'), [
  '# vendor/fenben —— 粉本庫機出（勿手改）',
  '',
  `- 來源：github.com/Hosuke/fenben 版 ${版}（回填於 ${new Date().toISOString()}）`,
  `- 面數：${牒.總數}｜可上壇：${牒.上壇數}｜候審：${牒.候審數}`,
  '- 回填工序：fenben 倉 `node tools/回填.cjs <此倉根>`（契約：fenben docs/回填契約.md）',
  '- 上壇之閘在讀端：`const 上 = 上壇之(id, 側); if (上) 白描(ctx, R, 上.面, 上.鍵);`',
  '  （dist/baimiao.js；返 null 者守 mandala 現行佔位，勿逕畫候審待核之筆）',
  '',
].join('\n'));

console.log(`回填訖：dist → ${的}（版 ${版}，上壇 ${牒.上壇數}/${牒.總數}）`);
