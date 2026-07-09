import type { 筆具 } from '../bi.js';
export interface 舉身光參 {
    底z?: number;
    頂z?: number;
    半闊?: number;
    淡?: number;
}
export declare function 舉身光(bi: 筆具, 參?: 舉身光參): void;
export declare function 如意雲(bi: 筆具, x: number, z: number, 比?: number, 鏡?: 1 | -1, 淡?: number): void;
