# 設計 Brief · 粉本陳列三頁（交 claude.ai 跑，貼回即接線）

> 主人於 claude.ai 跑此 brief，產出三頁之新 HTML/CSS/互動；貼回倉後 cc 接線驗收。
> **鐵律**：下方「不可斷之契約」一節，一字不可違——違則畫不出來（canvas 是代碼
> 實時繪的，非圖片）。美學可大改，數據流與繪製調用不可改。

## 一 · 這是什麼

「粉本」是**如法造像的程序白描庫**——佛像諸尊、手印、三昧耶形（法器）**全部由
JavaScript 實時繪製到 `<canvas>`**（金泥線 `#d8b36a` 描於紺紙 `#0d1124`），非圖片。
三頁共一套視覺：
- `index.html` — 諸尊陳列（金剛界三十七尊＋胎藏五佛，圓月輪內坐像，帶「已核／候審／
  候筆」三種信級狀態，點開有詳覽 dialog 載儀軌與出典）
- `shouyin.html` — 手印譜（廿七式，卡片網格，每卡：canvas＋印名＋逐指法＋出典＋朱色注）
- `sanmaya.html` — 三昧耶譜（三十七尊法器，同手印譜之卡式，分五節）

目標讀者：學習如法造像的人。要能**看清細節**、**對照出典**、**莊重耐讀**——
像一部數字化的古經摺本，不是網頁 app。

## 二 · 不可斷之契約（違則畫面全空）

1. **保留每頁的 `<script type="module">` 整塊**——它 `import` 自 `./dist/*.js`：
   - `index.html`：`import { 依號, 已核之 } from './dist/yigui.js'`；
     `import { 白描 } from './dist/baimiao.js'`；`import { 候審筆 } from './dist/zun/index.js'`。
     繪製調用：`白描(ctx, R, face, 鍵)`（ctx 已 translate 到 canvas 中心、strokeStyle=金泥）。
   - `shouyin.html`：`import { 執筆 } from './dist/bi.js'`；
     `import { 手印目 } from './dist/bujian/shouyin.js'`。每條 `{鍵,名,梵,類,法,典,注,展比,筆}`，
     繪製：`const bi=執筆(ctx,R); 條.筆(bi, 0, 39, 條.展比)`。
   - `sanmaya.html`：`import { 三昧耶目 } from './dist/bujian/sanmaya.js'`。每條
     `{鍵,尊,器,類,法,典,注,展比,筆}`，繪製：`條.筆(bi, 0, 37, 條.展比)`。
2. **canvas 繪製要點**：`canvas.width=canvas.height=尺寸*dpr; ctx.scale(dpr,dpr);
   ctx.translate(尺寸/2,尺寸/2); ctx.strokeStyle=ctx.fillStyle=金泥色;`——**放大即用大
   尺寸重繪，勿用 CSS 拉伸小 canvas**（會糊；矢量重繪則永清）。
3. 數據皆繁體中文欄位（`名/類/法/典/注/尊/器/信/形/印/印法/持物`…），照用勿改名。
4. 純靜態、零外部依賴（GitHub Pages 直開）；**不可引 CDN、不可引字體檔**（用系統
   襯線 fallback 串）；一切 CSS/JS 內聯或同倉相對路徑。
5. 三頁互通導航（諸尊陳列／手印譜／三昧耶譜）。

## 三 · 必加之功能（主人痛點）

- **點圖放大**：任一 canvas 點擊 → 開一 lightbox/overlay，**於其中以大尺寸（如視口
  之 80%，≥720px）重新調用該尊之繪製函數**，線條依然銳利；overlay 內可看題註全文
  （名・逐指法／形制・出典・朱注）。ESC 或點背景關閉。這是本次最要的功能。
- 響應式：手機一列、平板二列、桌面三四列；卡片不塞不擠。
- 可選：局部再放大（滾輪 zoom）／深色本已是主色，勿改亮底。

## 四 · 美學方向（可大膽，但守紺紙金泥之魂）

- 氣質：**古經摺本 × 當代畫廊**——留白足、字距疏、線框細、金泥為唯一亮色。
  現版太「表格化」，要更像一頁頁可品的摺葉。
- 題字用直排或大字襯線皆可；卷首可有一段引言（現有文案可留可潤）。
- 信級狀態（已核鈐朱印／候審朱虛界／候筆虛月輪）之視覺語言要清晰而不喧賓。
- 動效克制：入場淡入可，勿滿屏浮動。

## 五 · 交付與貼回

產出三個完整 HTML 檔（`index.html` / `shouyin.html` / `sanmaya.html`），
每檔含新 CSS（內聯）＋原樣保留的 `<script type="module">`（只改 DOM 生成與樣式，
不改 import 與繪製調用）。貼回倉根覆蓋原檔；cc 跑 `npm run build` 後 headless 截圖驗收
（確認 canvas 有畫、放大清晰、三頁導航通），有斷契約處 cc 修。
