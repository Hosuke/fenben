#!/usr/bin/env node
// 併圖 · tools/併圖.cjs —— 「參攷｜吾作」並排對照圖（展覽館精美程自評五項之具）
// 對照圖含參攷裁片，依零圖片資源鐵律 永不入庫（圖錄/對照/ 已 gitignore）。
// 用：node tools/併圖.cjs <參攷圖> <吾作PNG> <出名.png> [參攷裁 x,y,w,h]
const { execFileSync } = require('child_process');
const [,, 參, 吾, 出, 裁] = process.argv;
if (!出) { console.error('用：node tools/併圖.cjs <參攷> <吾作> <出> [x,y,w,h]'); process.exit(1); }
const py = [
  'import sys',
  'from PIL import Image, ImageDraw',
  'ref, mine, dst = sys.argv[1], sys.argv[2], sys.argv[3]',
  'crop = sys.argv[4] if len(sys.argv) > 4 else None',
  "a = Image.open(ref).convert('RGB')",
  "b = Image.open(mine).convert('RGB')",
  'if crop:',
  "    x, y, w, h = map(int, crop.split(','))",
  '    a = a.crop((x, y, x + w, y + h))',
  'H = 1600',
  'a = a.resize((max(1, int(a.width * H / a.height)), H))',
  'b = b.resize((max(1, int(b.width * H / b.height)), H))',
  "out = Image.new('RGB', (a.width + b.width + 24, H + 80), (13, 17, 36))",
  'out.paste(a, (0, 80)); out.paste(b, (a.width + 24, 80))',
  'd = ImageDraw.Draw(out)',
  "d.text((12, 28), 'CANKAO (ref)', fill=(200, 166, 101))",
  "d.text((a.width + 36, 28), 'WUZUO (mine)', fill=(200, 166, 101))",
  'out.save(dst)',
  "print('bing-chu', dst)",
].join('\n');
execFileSync('python3', ['-', 參, 吾, 出].concat(裁 ? [裁] : []), { input: py, stdio: ['pipe', 'inherit', 'inherit'] });
