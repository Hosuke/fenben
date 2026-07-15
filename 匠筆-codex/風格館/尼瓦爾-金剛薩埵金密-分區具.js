// 線稿閉域分區具：界墨歸零，透明地依四向連通立區。

export async function 分區(線布, 選項 = {}) {
  const W = 線布.width | 0;
  const H = 線布.height | 0;
  const 像素數 = W * H;
  if (W <= 0 || H <= 0 || !Number.isSafeInteger(像素數)) throw new RangeError('線布尺寸不合法');

  const 閾值 = 選項.閾 === undefined ? 24 : Number(選項.閾);
  const 微域值 = 選項.微域 === undefined ? 9 : Number(選項.微域);
  if (!Number.isFinite(閾值) || 閾值 < 0 || 閾值 > 255) throw new RangeError('閾須在 0–255');
  if (!Number.isFinite(微域值) || 微域值 < 0) throw new RangeError('微域須為非負數');
  const 微域 = Math.ceil(微域值);

  const ctx = 線布.getContext('2d', { willReadFrequently: true });
  if (!ctx) throw new TypeError('線布未得 2D context');
  const 像 = ctx.getImageData(0, 0, W, H).data;
  const 標圖 = new Int32Array(像素數);
  const 佇列 = new Int32Array(像素數);

  // -1 為界；0 為未訪透明地；-2 為已訪而不立區之微域。
  for (let p = 0, a = 3; p < 像素數; p++, a += 4) {
    if (像[a] >= 閾值) 標圖[p] = -1;
  }

  const 區表 = [];
  let 區數 = 0;
  for (let 種 = 0; 種 < 像素數; 種++) {
    if (標圖[種] !== 0) continue;

    const 序 = 區數 + 1;
    let 首 = 0;
    let 尾 = 1;
    let 積 = 0;
    let x0 = W;
    let y0 = H;
    let x1 = -1;
    let y1 = -1;
    let x和 = 0;
    let y和 = 0;
    佇列[0] = 種;
    標圖[種] = 序;

    while (首 < 尾) {
      const p = 佇列[首++];
      const y = (p / W) | 0;
      const x = p - y * W;
      積++;
      x和 += x;
      y和 += y;
      if (x < x0) x0 = x;
      if (x > x1) x1 = x;
      if (y < y0) y0 = y;
      if (y > y1) y1 = y;

      let q;
      if (x > 0 && 標圖[q = p - 1] === 0) {
        標圖[q] = 序;
        佇列[尾++] = q;
      }
      if (x + 1 < W && 標圖[q = p + 1] === 0) {
        標圖[q] = 序;
        佇列[尾++] = q;
      }
      if (y > 0 && 標圖[q = p - W] === 0) {
        標圖[q] = 序;
        佇列[尾++] = q;
      }
      if (y + 1 < H && 標圖[q = p + W] === 0) {
        標圖[q] = 序;
        佇列[尾++] = q;
      }
    }

    if (積 < 微域) {
      for (let i = 0; i < 尾; i++) 標圖[佇列[i]] = -2;
      continue;
    }

    區數 = 序;
    區表.push({
      序,
      積,
      界: [x0, y0, x1, y1],
      心: [Math.round(x和 / 積), Math.round(y和 / 積)],
    });
  }

  for (let p = 0; p < 像素數; p++) {
    if (標圖[p] < 0) 標圖[p] = 0;
  }
  return { 標圖, 區數, 區表 };
}

export function 敷色(標圖, 區表, 配色, W, H) {
  W |= 0;
  H |= 0;
  const 像素數 = W * H;
  if (W <= 0 || H <= 0 || 標圖.length !== 像素數) throw new RangeError('標圖尺寸不合');
  if (typeof 配色 !== 'function') throw new TypeError('配色須為函式');

  const 色表 = new Uint8ClampedArray((區表.length + 1) * 4);
  for (let i = 0; i < 區表.length; i++) {
    const 區 = 區表[i];
    const 色 = 配色(區);
    if (!色 || 色.length < 4) throw new TypeError(`第 ${區.序} 區未得 RGBA`);
    const o = 區.序 * 4;
    色表[o] = 色[0];
    色表[o + 1] = 色[1];
    色表[o + 2] = 色[2];
    色表[o + 3] = 色[3];
  }

  // 負號暫記本輪新得之區號；掃描時只取正號，故一輪恰膨脹一像素。
  const 延標 = new Int32Array(標圖);
  for (let 輪 = 0; 輪 < 2; 輪++) {
    for (let y = 0, p = 0; y < H; y++) {
      for (let x = 0; x < W; x++, p++) {
        if (延標[p] !== 0) continue;
        let 序 = 0;
        if (x > 0 && 延標[p - 1] > 0) 序 = 延標[p - 1];
        else if (y > 0 && 延標[p - W] > 0) 序 = 延標[p - W];
        else if (x + 1 < W && 延標[p + 1] > 0) 序 = 延標[p + 1];
        else if (y + 1 < H && 延標[p + W] > 0) 序 = 延標[p + W];
        if (序) 延標[p] = -序;
      }
    }
    for (let p = 0; p < 像素數; p++) {
      if (延標[p] < 0) 延標[p] = -延標[p];
    }
  }

  const 圖 = new ImageData(W, H);
  const 像 = 圖.data;
  for (let p = 0, o = 0; p < 像素數; p++, o += 4) {
    const 序 = 延標[p];
    if (!序) continue;
    const c = 序 * 4;
    像[o] = 色表[c];
    像[o + 1] = 色表[c + 1];
    像[o + 2] = 色表[c + 2];
    像[o + 3] = 色表[c + 3];
  }
  return 圖;
}
