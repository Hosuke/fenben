import { 大日金剛界 } from './center-k.js';
import { 金剛薩埵 } from './fugen-k.js';
import { 金剛薩埵合筆 } from './fugen2-k.js';
import { 阿閦如來 } from './east-k.js';
import { 寶生如來 } from './south-k.js';
import { 阿彌陀如來 } from './west-k.js';
import { 不空成就如來 } from './north-k.js';
import { 金剛王 } from './k-o-k.js';
import { 金剛愛 } from './k-ai-k.js';
import { 金剛喜 } from './k-ki-k.js';
export const 落筆簿 = {
    'center|k': 大日金剛界,
    'fugen|k': 金剛薩埵,
    'fugen2|k': 金剛薩埵合筆, // 合筆實驗（匠骨吾筆），僅圖錄陳列不入壇
    'east|k': 阿閦如來,
    'south|k': 寶生如來,
    'west|k': 阿彌陀如來,
    'north|k': 不空成就如來,
    'k-o|k': 金剛王,
    'k-ai|k': 金剛愛,
    'k-ki|k': 金剛喜,
    // 餘尊候親筆逐尊登簿
};
// 候審筆：儀軌信雖已核（字段出典俱足），**筆**未經主人過目者——
// 陳列頁當現朱界候審，主人印可乃摘（候審之律，勿使新筆僭已核之章）
export const 候審筆 = new Set([
    'east|k', 'south|k', 'west|k', 'north|k',
    'k-o|k', 'k-ai|k', 'k-ki|k',
]);
