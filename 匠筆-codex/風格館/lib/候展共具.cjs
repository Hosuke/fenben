'use strict';

// 候展共具：七席候展稿共用之頁內白描筆具。
// 只供匠筆-codex/風格館/*-候展稿.cjs 注入；畫布始終透明，最末始合深底。
// 尊身、印相與各派構圖仍由各席自運，本具惟收重複之線、花葉、紋帶、框與硬驗。

const { 合幀 } = require('../../../tools/lib/幀具.cjs');

const 頁內共具 = String.raw`
(() => {
  const TAU = Math.PI * 2;

  function 守(真, 名, 細) {
    console.assert(真, 名, 細);
    if (!真) throw new Error(名 + (細 === undefined ? '' : '：' + JSON.stringify(細)));
  }

  function 錨斷言(格, 制 = '坐') {
    const 必 = 制 === '立'
      ? { 白毫: 12, 頦: 20, 心窩: 36, 臍: 48, 足底: 120 }
      : { 白毫: 12, 頦: 20, 心窩: 36, 臍: 48, 座面: 68 };
    for (const [名, 值] of Object.entries(必)) 守(格[名] === 值, 'T1419 錨失守：' + 名, { 實: 格[名], 應: 值 });
    return true;
  }

  function 開布(W = 1800, H = 2500, 墨 = '#d8b36a', 地 = '#0d1124') {
    守(Number.isFinite(W) && Number.isFinite(H) && W > 0 && H >= 2400 && H <= 2600, '候展畫幅失守', { W, H });
    const ink = document.createElement('canvas');
    ink.width = W; ink.height = H;
    const x = ink.getContext('2d');
    x.strokeStyle = 墨; x.fillStyle = 墨;
    x.lineCap = 'round'; x.lineJoin = 'round';

    const 筆 = (w = 2, a = 1, 色 = 墨) => {
      x.lineWidth = w; x.strokeStyle = 色; x.fillStyle = 色; x.globalAlpha = a;
    };
    const 復 = () => { x.globalAlpha = 1; x.globalCompositeOperation = 'source-over'; };
    const 線 = (pts, w = 2, close = false, a = 1, 色 = 墨) => {
      if (!pts || pts.length < 2) return;
      筆(w, a, 色); x.beginPath(); x.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) x.lineTo(pts[i][0], pts[i][1]);
      if (close) x.closePath(); x.stroke(); 復();
    };
    const 貝 = (p0, c1, c2, p1, w = 2, a = 1, 色 = 墨) => {
      筆(w, a, 色); x.beginPath(); x.moveTo(...p0); x.bezierCurveTo(...c1, ...c2, ...p1); x.stroke(); 復();
    };
    const 二次 = (p0, c, p1, w = 2, a = 1, 色 = 墨) => {
      筆(w, a, 色); x.beginPath(); x.moveTo(...p0); x.quadraticCurveTo(...c, ...p1); x.stroke(); 復();
    };
    const 圓 = (cx, cy, r, w = 2, a = 1, 色 = 墨) => {
      筆(w, a, 色); x.beginPath(); x.arc(cx, cy, r, 0, TAU); x.stroke(); 復();
    };
    const 橢 = (cx, cy, rx, ry, w = 2, rot = 0, a = 1, 色 = 墨) => {
      筆(w, a, 色); x.beginPath(); x.ellipse(cx, cy, rx, ry, rot, 0, TAU); x.stroke(); 復();
    };
    const 清形 = 落 => {
      x.save(); x.globalCompositeOperation = 'destination-out'; x.beginPath(); 落(x); x.fill(); x.restore(); 復();
    };
    const 鏡雙 = fn => {
      fn(1); x.save(); x.translate(W, 0); x.scale(-1, 1); fn(-1); x.restore();
    };
    const 螺 = (cx, cy, r, turns = 1.35, flip = 1, w = 1.2, a = 1, 色 = 墨) => {
      筆(w, a, 色); x.beginPath();
      for (let k = 0; k <= 32; k++) {
        const t = k / 32, rr = r * (1 - .78 * t), q = flip * turns * TAU * t;
        const px = cx + Math.cos(q) * rr, py = cy + Math.sin(q) * rr;
        if (k) x.lineTo(px, py); else x.moveTo(px, py);
      }
      x.stroke(); 復();
    };
    const 葉 = (cx, cy, len, wid, rot = 0, w = 1.2, a = 1, 色 = 墨, 脈 = true) => {
      x.save(); x.translate(cx, cy); x.rotate(rot); 筆(w, a, 色);
      x.beginPath(); x.moveTo(0, 0);
      x.bezierCurveTo(len * .28, -wid, len * .76, -wid * .72, len, 0);
      x.bezierCurveTo(len * .76, wid * .72, len * .28, wid, 0, 0); x.stroke();
      if (脈) { x.beginPath(); x.moveTo(len * .08, 0); x.lineTo(len * .9, 0); x.stroke(); }
      x.restore(); 復();
    };
    const 花 = (cx, cy, r, n = 8, w = 1.1, a = 1, 色 = 墨) => {
      圓(cx, cy, r * .18, w, a, 色);
      for (let k = 0; k < n; k++) {
        const q = TAU * k / n;
        x.save(); x.translate(cx, cy); x.rotate(q); 筆(w, a, 色);
        x.beginPath(); x.moveTo(r * .24, 0);
        x.bezierCurveTo(r * .46, -r * .2, r * .82, -r * .18, r, 0);
        x.bezierCurveTo(r * .82, r * .18, r * .46, r * .2, r * .24, 0); x.stroke();
        x.restore();
      }
      復();
    };
    const 波列 = (y, amp, step, a = .5, x0 = 80, x1 = W - 80, w = 1) => {
      筆(w, a); x.beginPath(); x.moveTo(x0, y);
      for (let px = x0; px < x1; px += step) {
        x.bezierCurveTo(px + step * .25, y - amp, px + step * .25, y - amp, px + step * .5, y);
        x.bezierCurveTo(px + step * .75, y + amp, px + step * .75, y + amp, px + step, y);
      }
      x.stroke(); 復();
    };
    const 珠橫 = (x0, x1, y, step = 24, r = 5, w = 1.2, a = .8) => {
      線([[x0, y - r - 5], [x1, y - r - 5]], w, false, a);
      線([[x0, y + r + 5], [x1, y + r + 5]], w, false, a);
      for (let px = x0 + step / 2; px < x1; px += step) { 圓(px, y, r, w, a); 圓(px, y, r * .26, w * .65, a * .8); }
    };
    const 菱橫 = (x0, x1, y, step = 30, h = 9, w = 1.1, a = .75) => {
      線([[x0, y - h], [x1, y - h]], w, false, a); 線([[x0, y + h], [x1, y + h]], w, false, a);
      for (let px = x0; px < x1; px += step) {
        線([[px, y], [px + step / 2, y - h * .75], [px + step, y], [px + step / 2, y + h * .75]], w, true, a);
        圓(px + step / 2, y, Math.min(3, h * .28), w * .65, a);
      }
    };
    const 卷草橫 = (x0, x1, y, step = 72, amp = 10, w = 1.2, a = .75) => {
      筆(w, a); x.beginPath(); x.moveTo(x0, y);
      for (let px = x0; px < x1; px += step) {
        x.bezierCurveTo(px + step * .2, y - amp, px + step * .34, y - amp, px + step / 2, y);
        x.bezierCurveTo(px + step * .66, y + amp, px + step * .8, y + amp, px + step, y);
      }
      x.stroke(); 復();
      for (let px = x0 + step * .25, k = 0; px < x1; px += step / 2, k++) 螺(px, y + (k % 2 ? amp * .52 : -amp * .52), amp * .72, 1.15, k % 2 ? 1 : -1, w * .78, a);
    };
    const 框 = (inset = 38, 層 = 4) => {
      for (let k = 0; k < 層; k++) {
        const d = inset + k * 14; 筆(k === 0 ? 3 : 1.1 + (層 - k) * .18, .82 - k * .07);
        x.strokeRect(d, d, W - d * 2, H - d * 2);
      }
      復();
    };
    const 小坐尊 = (cx, base, s = 1, opt = {}) => {
      const a = opt.alpha ?? .82, w = opt.w ?? 1.35;
      圓(cx, base - 92 * s, 29 * s, w, a);
      貝([cx - 20*s,base-102*s],[cx-28*s,base-84*s],[cx-26*s,base-60*s],[cx-16*s,base-48*s],w,a);
      貝([cx + 20*s,base-102*s],[cx+28*s,base-84*s],[cx+26*s,base-60*s],[cx+16*s,base-48*s],w,a);
      橢(cx, base - 32*s, 46*s, 21*s, w, 0, a);
      二次([cx-43*s,base-20*s],[cx,base-4*s],[cx+43*s,base-20*s],w,a);
      二次([cx-34*s,base-43*s],[cx,base-22*s],[cx+34*s,base-43*s],w,a);
      if (opt.冠) for (let q=-2;q<=2;q++) 線([[cx+q*10*s,base-119*s],[cx+q*7*s,base-139*s-(2-Math.abs(q))*5*s],[cx+(q+1)*7*s,base-119*s]],w*.8,false,a);
      if (opt.點睛 !== false) { 圓(cx-8*s,base-95*s,1.2*s,w*.7,a); 圓(cx+8*s,base-95*s,1.2*s,w*.7,a); }
    };
    const 手眼 = (cx, cy, s = 1, rot = 0, flip = 1, opt = {}) => {
      const w = opt.w ?? 1.15, a = opt.alpha ?? .75;
      x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(flip, 1);
      筆(w, a); x.beginPath(); x.moveTo(-17*s,22*s);
      x.bezierCurveTo(-25*s,5*s,-20*s,-19*s,-8*s,-28*s);
      x.bezierCurveTo(1*s,-35*s,15*s,-28*s,18*s,-16*s);
      x.bezierCurveTo(26*s,-8*s,27*s,8*s,18*s,21*s);
      x.bezierCurveTo(8*s,29*s,-7*s,30*s,-17*s,22*s); x.stroke();
      for (let k=0;k<4;k++) { x.beginPath(); x.moveTo((-10+k*7)*s,-22*s); x.quadraticCurveTo((-9+k*7)*s,-43*s,(-5+k*7)*s,-55*s); x.stroke(); }
      x.beginPath(); x.ellipse(1*s,-2*s,7*s,3.5*s,0,0,TAU); x.stroke();
      x.beginPath(); x.arc(1*s,-2*s,1.4*s,0,TAU); x.stroke(); x.restore(); 復();
    };
    const 火環 = (cx, cy, rx, ry, n = 44, w = 1.8, a = .82, lean = .15) => {
      橢(cx, cy, rx, ry, w, 0, a);
      for (let k = 0; k < n; k++) {
        const q = TAU * k / n, px = cx + Math.cos(q) * rx, py = cy + Math.sin(q) * ry;
        const nx = Math.cos(q), ny = Math.sin(q), tx = -ny, ty = nx, h = 34 + (k % 3) * 8;
        貝([px,py],[px+nx*h*.36+tx*h*.18,py+ny*h*.36+ty*h*.18],[px+nx*h*.86+tx*h*lean,py+ny*h*.86+ty*h*lean],[px+nx*h,py+ny*h],w,a);
        貝([px+nx*h,py+ny*h],[px+nx*h*.64-tx*h*.18,py+ny*h*.64-ty*h*.18],[px+nx*h*.34-tx*h*.08,py+ny*h*.34-ty*h*.08],[px,py],w*.72,a*.9);
      }
    };
    const 合成 = () => {
      復();
      const out = document.createElement('canvas'); out.width = W; out.height = H;
      const o = out.getContext('2d'); o.fillStyle = 地; o.fillRect(0, 0, W, H); o.drawImage(ink, 0, 0);
      return out.toDataURL('image/png');
    };
    return { W,H,墨,地,ink,x,筆,復,線,貝,二次,圓,橢,清形,鏡雙,螺,葉,花,波列,珠橫,菱橫,卷草橫,框,小坐尊,手眼,火環,合成,守,錨斷言 };
  }

  window.候展共具 = Object.freeze({ 開布, 守, 錨斷言, TAU });
})();
`;

async function 注入候展共具(page) {
  await page.addScriptTag({ content: 頁內共具 });
}

async function 候展合幀({ 出, 幀 }) {
  return 合幀({
    出,
    幀: async page => {
      await 注入候展共具(page);
      return 幀(page);
    },
  });
}

module.exports = { 候展合幀, 注入候展共具, 頁內共具 };
