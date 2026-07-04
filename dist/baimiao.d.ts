import { type 筆具 } from './bi.js';
import type { 面 } from './yigui.js';
export declare function 白描(ctx: CanvasRenderingContext2D, R: number, face: 面, 鍵?: string): void;
export declare function 通形(bi: 筆具, face: 面): void;
export { 白描 as drawFunpon, 白描 as default };
