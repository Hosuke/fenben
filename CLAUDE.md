# 粉本庫工作之律

承 mandala 工作範式（詳彼倉之例與 memory），此倉之要如下。

## 鐵律

- **造像不假手**：落筆（baimiao.js 之筆法、逐尊尊形）必 Fable 5 親筆，不遣
  subagent、不遣 Codex。考據調研可遣 agent 分頭去查，落筆不可。
- **寧缺毋誤**：儀軌字段出典查不實則置 null 並注「待核」，不編造；信未至「已核」
  不得上壇（已核之() 返 null）。
- **零圖片資源**：諸源只作本地參攷與出典引用；參攷圖入 `參攷-local/`
  （gitignore，永不入庫）。
- **載入即誦戒**：量度改動必過誦戒斷言；改斷言本身須有經文出典（T1419 頁碼）。
- **法脈之律**：現圖為正，五部心觀為證（2026-07-03 印可）；異說並陳不強合
  （如常光一丈／一尋、畫塑百二十／百二十五）。

## 工作流

- cc 可直接動手（mandala 之豁免延及此倉）；commit 前必以 staged diff 付 Codex
  審，HIGH 必修而後 commit。
- 逐尊之工按 `gongdan/` 工單行：考據 → 落筆 → 試筆頁（shibi.html）候主人印可
  → 升已核記日期 → 回填 mandala。
- 驗收：`python3 -m http.server` 開 shibi.html 目驗；headless 用 playwright-core
  ＋ chrome-headless-shell（法同 mandala；headless shell 直接 --screenshot 會掛
  在 rAF 循環，必以 playwright 定時截）。

## 回填之制

mandala 以 vendor 方式消費本庫（候接線）：一尊經主人印可，拷 `fenben/*.js` 入
mandala `vendor/fenben/`，mandala 之 funpon.js 轉為薄適配層。id 錨與 mandala
`js/data/deities.js` 一致，不得擅改；舊名別名（GIKI/kosareta/drawFunpon/verify）
為相容而設，勿刪。
