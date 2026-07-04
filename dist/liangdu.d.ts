export declare const 單位: {
    readonly 麥: number;
    readonly 足: number;
    readonly 指: 1;
    readonly 搩: 12;
    readonly 肘: 24;
    readonly 尋: 96;
};
export interface 段目 {
    段: string;
    指: number;
}
export declare const 縱剖: readonly 段目[];
export declare const 橫剖: readonly 段目[];
export declare const 坐像: {
    readonly 盤線: 64;
    readonly 座面: 68;
    readonly 膝寬: 52;
    readonly 踵距: 4;
};
export declare const 搩度: {
    readonly 佛: 10;
    readonly 菩薩: 10;
    readonly 佛母: 9;
    readonly 忿怒: 8;
    readonly 矮身: 6;
};
export type 尊格 = keyof typeof 搩度;
export type 搩度數 = (typeof 搩度)[尊格];
export declare function 錨點(): Record<string, number>;
export declare function 誦戒(): void;
export { 誦戒 as verify };
