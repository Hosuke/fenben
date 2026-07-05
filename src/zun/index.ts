// ─────────────────────────────────────────────────────────────────────────────
// 落筆簿 · Zun — 逐尊親筆之登記（粉本庫之心）
//
// 每尊一檔，置本目錄（如 fugen-k.ts 金剛薩埵），export 一筆：(筆具, 面) => void；
// 於此登簿，鍵＝'尊號|側'（尊號承 mandala deities.js，側 t 胎藏／k 金剛界）。
// 白描總門（baimiao.ts）先查此簿：有專筆用專筆，無則退通形。
// 專筆可先呼通形為底，再施持物・莊嚴之專相；亦可全然自運。
//
// 律：落筆必依格網（筆具之 Y/u 皆自指）、依儀軌（面之字段帶出典）；
// 造像不假手，簿中之筆皆親筆。精度之的：當代犍陀羅之工。
// ─────────────────────────────────────────────────────────────────────────────
import type { 筆具 } from '../bi.js';
import type { 面 } from '../yigui.js';
import { 大日金剛界 } from './center-k.js';
import { 金剛薩埵 } from './fugen-k.js';
import { 金剛薩埵合筆 } from './fugen2-k.js';
import { 阿閦如來 } from './east-k.js';
import { 寶生如來 } from './south-k.js';
import { 阿彌陀如來 } from './west-k.js';
import { 不空成就如來 } from './north-k.js';

export type 筆 = (bi: 筆具, mian: 面) => void;

export const 落筆簿: Record<string, 筆> = {
  'center|k': 大日金剛界,
  'fugen|k': 金剛薩埵,
  'fugen2|k': 金剛薩埵合筆,   // 合筆實驗（匠骨吾筆），僅圖錄陳列不入壇
  'east|k': 阿閦如來,
  'south|k': 寶生如來,
  'west|k': 阿彌陀如來,
  'north|k': 不空成就如來,
  // 餘尊候親筆逐尊登簿
};

// 候審筆：儀軌信雖已核（字段出典俱足），**筆**未經主人過目者——
// 陳列頁當現朱界候審，主人印可乃摘（候審之律，勿使新筆僭已核之章）
export const 候審筆 = new Set<string>(['east|k', 'south|k', 'west|k', 'north|k']);
