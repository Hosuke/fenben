import { 運筆 } from '../bi.js';
import { 如來坐身 } from './rulai.js';
import { 法輪 } from '../bujian/sanmaya.js';
export const 一字金輪 = (bi) => {
    如來坐身(bi, '定印', { 月輪: false, 定印式: '法界' });
    // 掌上金輪：八輻輪寶立於定印二掌之上（「golden wheel on the lap」）
    const 筆 = 運筆(bi);
    const { M, Qk, S, 細 } = 筆;
    法輪(bi, 0, 54.6, 0.62); // 輪立於定印二掌之上（掌面 z≈56.8）
    細(() => {
        // 輪轂之下與掌之交代：托線一道（輪不懸空）
        M(-1.6, 56.85);
        Qk(0, 57.35, 1.6, 56.85);
        S();
    });
};
