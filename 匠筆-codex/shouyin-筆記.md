# 手印廿七式 · 自校筆記

## 文獻取用

- 已讀 `docs/考據/手印體系.md` 與 `匠筆-codex/goal-shouyin.md`。
- 六種拳、常用九印依卷中逐指法題註。
- 十二合掌於卷中列名，僅「歸命＝金剛合掌，十指頭交叉右壓左」具明確逐指；其餘題註以〔待核〕標出，畫形依名稱作可辨示意，不偽作定本文。
- 未參照 `src/bujian/` 畫法；只讀取截圖工具 `tools/圖錄.cjs` 之 Playwright/headless 尋址方式。

## 第一版待驗

- 需逐卡檢查：五指數、拇指二節與餘指三節是否清楚。
- 需逐卡檢查：交叉與覆手處是否已用紺色遮斷後手線。
- 需逐卡檢查：智拳印須為右大指端拄左頭指端，不從「右小指握」坊說。

## 第一輪截圖（round1）

- 截圖：`匠筆-codex/selfcheck/shouyin-round1-full.png`，另逐卡 `round1-card-01.png` 至 `round1-card-27.png`。
- 27 cards / 27 canvases 渲染成功，無 `pageerror`。
- 所見：忿怒拳、期剋印之豎指起筆過高，似離拳；已把指根下接至拳頂，並於拳頂加短節線。
- 所見：與願印掌形可見，但五指方向偏上，不合「舒展下垂」；已改為掌外向、五指向下。
- 所見：智拳印右大指端已抵左頭指端，未採「右小指握」坊說。

## 第二輪截圖（round2）

- 截圖：`匠筆-codex/selfcheck/shouyin-round2-full.png`，另逐卡 `round2-card-01.png` 至 `round2-card-27.png`。
- 27 cards / 27 canvases 渲染成功，無 `pageerror`。
- 復看改處：忿怒拳兩豎指已接拳頂；期剋印頭指如鈎且自拳頂起；與願印五指已下垂。
- 復看遮斷：歸命、反叉、內縛、外縛、智拳印、說法印之交疊處均以紺色遮後線再覆前線。
- 殘留：十二合掌除歸命外仍按本卷列名作圖，題註保持〔待核〕；不作定本文斷言。

## 第二稿：何所學・何所改

- 依 `src/bujian/zhi.ts` 之 `畫指` 學蔽法：指身、掌面、拳節塊面皆先以 `globalCompositeOperation='destination-out'` 鑿閉郭，再勒輪廓；`maskStroke` 亦改為真鑿線，不再以紺色假蓋。
- 依 `src/bi.ts` 之 `運筆` 學三等筆：輪廓用骨線，掌紋與內結構用衣線，節紋、細小校線用細線；仍保留第一稿自家骨架與廿七式題註。
- 透視改法：指節線不作等分，近根、中節、遠梢作遞縮；指梢寬度隨遠端細收，定印、覆掌、橫掌、觸地等傾側掌面加縱向壓縮，使掌面有轉側之意。
- 畫序遵後先前後：交叉、內外縛、智拳、說法、覆手等處先落遠手，後落近手；近手閉郭鑿去先落之線，使被掩線真斷。
- 觀主坊成品：以 `匠筆-codex/shouyin-驗.cjs mainref /shouyin.html` 截 `匠筆-codex/selfcheck/shouyin-mainref-full.png`，只取遮擋與線階之法，不改抄其手型。

## 第二稿自驗

- 第三輪截圖（round3）：`匠筆-codex/selfcheck/shouyin-round3-full.png`，另逐卡 `round3-card-01.png` 至 `round3-card-27.png`；27 cards / 27 canvases，無 page error。
- 第三輪目視：歸命、反叉、內縛、智拳印、說法印之交疊處，後線被近指閉郭鑿斷；拳與掌仍可讀，智拳印仍為右大指端拄左頭指端。
- 第四輪截圖（round4）：`匠筆-codex/selfcheck/shouyin-round4-full.png`，另逐卡 `round4-card-01.png` 至 `round4-card-27.png`；27 cards / 27 canvases，無 page error。
- 第四輪目視：覆手向下、覆手、法界定印、觸地印、金剛合掌等卡之遮擋與線階仍穩；十二合掌之〔待核〕朱注照舊。
