# 粉本庫工作之律

此倉為如法造像標準庫（TypeScript，文言 API，漢字標識符有意為之）。
繪製 session 開工前，先讀畢此卷與 `docs/造像標準.md`。

## 鐵律

- **造像不假手**：落筆（`src/zun/` 逐尊之筆、`src/baimiao.ts` 通形）必親筆，
  不遣 subagent、不遣 Codex。考據調研可遣 agent 分頭去查，落筆不可。
- **寧缺毋誤**：儀軌字段出典查不實則置 null 並注待核，不編造；信未至「已核」
  不得上壇（`已核之()` 返 null，陳列頁現朱界候審）。「已核」之判：形・搩度・
  面臂・印・座五字段皆有出典（≥2 源交叉）方可。
- **零圖片資源**：諸源只作本地參攷與出典引用；參攷圖入 `參攷-local/`
  （gitignore，永不入庫）。此律禁**外來圖像**；自庫機出之圖（README 首圖，
  `tools/首圖.cjs` 可再生）視同 dist 產物，不在此禁（2026-07-04 主人裁）。
- **類型即律，載入即誦戒**：形類・印名・信級皆閉集聯合，新印新形先擴類型再填數據；
  量度數值（`liangdu.ts`）皆繫 T1419 頁碼，一字不得動，誦戒斷言破則是數據錯。
- **法脈之律**：現圖為正，五部心觀為證；異說並陳不強合。

## 精度之的：當代犍陀羅之工

示意圖標之筆（現通形之水準）**不合格**。逐尊落筆之判準：

- **骨**：解剖立於格網之內——肩有峰、肘有轉、腕有節，非直線接橢圓；
- **衣**：褶皺有起伏頓挫、疏密聚散，如犍陀羅之衣紋能見身體之勢；
- **手**：結印逐指逐節，依儀軌「印法」字段之逐指描述，指有三節、掌有丘壑；
- **面**：開臉依相好（上瞼長弓垂目、眉如初月、鼻高唇靜），非簡筆符號；
- **嚴**：寶冠瓔珞臂釧逐件有結構，非圈點示意。
- 落筆線數不設限——一尊數百筆是常態；筆筆有據，寧多勿苟。

## 逐尊之法（繪製 session 之工序）

1. **考據**：先查 `docs/三十七尊.md` 認尊；於 `src/yigui.ts` 立該尊條目，
   字段皆繫出典（≥2 源），信＝待核。查不實之字段置 null。
2. **落筆**：`src/zun/<尊號>-<側>.ts`（如 `fugen-k.ts`）export 一筆
   `(bi: 筆具, mian: 面) => void`；於 `src/zun/index.ts` 落筆簿登記
   `'尊號|側'`。可先呼 `通形` 為底再施專相，亦可全然自運。筆具之 Y/u 皆自指，
   格網錨點見 `liangdu.ts`（白毫12・頦20・心窩36・臍48・盤線64・座面68、膝寬52）。
3. **驗**：`npm run build`（tsc 過即類型誦戒過）；`python3 -m http.server`
   開 `index.html` 目驗；headless 截圖終審（下法）自校兩輪以上——落筆者自報
   如法不可信，必親見其圖。**手印掛接並遣 Codex 數值審**（算前臂末端與腕柱
   之距與角差：距≤1.5指且角差≤30°乃謂相接——目審氣韻，碼審連續，
   2026-07-09 釋迦說法印一役立此律）。
4. **候審**：commit 後該尊在陳列頁現朱界「候審」，候主人過目。
5. **升核**：主人印可且出典俱足，信升「已核」，鈐印上壇。

## 驗收工具

- headless：playwright-core ＋ chrome-headless-shell
  （`~/Library/Caches/ms-playwright/chromium_headless_shell-*/…/chrome-headless-shell`）；
  headless shell 直接 `--screenshot` 會掛在 rAF，必以 playwright 定時截。
- 本地預覽：倉根 `python3 -m http.server`，開 `index.html`（先 build）。
- `dist/` 為機出，隨 commit 同步（`npm run build`），**勿手改**。

## commit 紀律

commit 前必以 staged diff 付 Codex 審（HIGH 必修而後 commit）：
```
git diff --cached | codex exec --sandbox read-only \
  --output-last-message /tmp/codex-review-result.txt \
  "Review this staged diff for bugs, security, edge cases. Classical-Chinese identifiers are intentional. file:line format. Say LGTM if clean."
```

## 回填 mandala 之制

一尊經印可，拷 `dist/` 入 mandala `vendor/fenben/`，mandala 之 funpon.js 轉薄
適配層（舊名別名 verify/GIKI/kosareta/drawFunpon 已備，勿刪）。尊號承 mandala
`js/data/deities.js` 之錨，不得擅改。
