export interface 筆具 {
    ctx: CanvasRenderingContext2D;
    R: number;
    u: number;
    Y: (z: number) => number;
    W_OUT: number;
    W_IN: number;
    P: (pts: Array<[number, number]>, close?: boolean) => void;
    A: (x: number, z: number, r: number, a0?: number, a1?: number) => void;
    Q: (x0: number, z0: number, cx: number, cz: number, x1: number, z1: number) => void;
    B: (x0: number, z0: number, c1x: number, c1z: number, c2x: number, c2z: number, x1: number, z1: number) => void;
    E: (x: number, z: number, rx: number, rz: number, rot?: number) => void;
    dot: (x: number, z: number, r: number) => void;
    thin: (fn: () => void) => void;
    dim: (a: number, fn: () => void) => void;
}
export declare function 執筆(ctx: CanvasRenderingContext2D, R: number): 筆具;
