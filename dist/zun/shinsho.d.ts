import type { 筆具, 運筆具 } from '../bi.js';
export interface 神將相參 {
    臂: (bi: 筆具, 筆: 運筆具) => void;
    冠識?: (bi: 筆具, 筆: 運筆具) => void;
}
/** 蔽方：多邊形鑿域（destination-out）——械杆貫頭光、拳覆柄之屬先鑿後筆 */
export declare function 蔽方(bi: 筆具, 點: ReadonlyArray<readonly [number, number]>): void;
/** 武拳：神將之拳（甲手短碩，郭閉三稜）——θ 轉拳向，鏡 反手。先鑿足印再落筆 */
export declare function 武拳(bi: 筆具, 筆: 運筆具, cx: number, cz: number, 參?: {
    比?: number;
    鏡?: 1 | -1;
    轉?: number;
    蔽?: boolean;
}): void;
/** 舉臂：屈肘上舉之臂（執械高揚）——d=-1 尊右（觀者左）。拳另呼武拳（先械後拳） */
export declare function 舉臂(bi: 筆具, 筆: 運筆具, d: -1 | 1): {
    拳: [number, number];
};
/** 叉腰臂：肘外張拳按胯——d=1 尊左（觀者右）。拳內建（按胯小拳） */
export declare function 叉腰臂(bi: 筆具, 筆: 運筆具, d: -1 | 1): void;
/** 垂臂：自然垂於體側之臂（握械垂杆／空拳）——微弓外張，肘節腕環自具；
 *  拳另呼武拳（轉≈π 拳背向前） */
export declare function 垂臂(bi: 筆具, 筆: 運筆具, d: -1 | 1): {
    拳: [number, number];
};
/** 執植臂：垂肘外探，拳握植地之杆（鉾・矛・鉞之屬）——杆軸 x≈d·16.35。
 *  內建蔽方鑿杆（臂在杆前），故必先落杆後呼此臂 */
export declare function 執植臂(bi: 筆具, 筆: 運筆具, d: -1 | 1): {
    拳: [number, number];
};
/** 胸前臂：肘垂於側，前臂橫舉當胸（兩手合執一械之半）——腕止於所給之點 */
export declare function 胸前臂(bi: 筆具, 筆: 運筆具, d: -1 | 1, 腕: readonly [number, number]): void;
export declare function 神將身(呼bi: 筆具, 參: 神將相參): void;
