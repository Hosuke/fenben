import type { 筆具, 運筆具 } from '../bi.js';
export interface 立菩薩相參 {
    臂: (bi: 筆具, 筆: 運筆具) => void;
    冠?: ((bi: 筆具) => void) | '無';
    髻?: '寶髻' | '天髻' | '無';
    胸瓔滴z?: number;
    月輪?: boolean;
    條帛?: boolean;
}
export declare function 立菩薩身(呼bi: 筆具, 參: 立菩薩相參): void;
