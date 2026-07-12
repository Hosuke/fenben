// 尼瓦爾-thyasaphu摺頁期 · 尊身層（主坊親筆・一稿）—— 分層之制 層二
// thyāsaphu 畫稿簿一開：左頁尊像（釋迦禪定・尼瓦爾開臉・偏袒右肩・簿稿斜線影），
// 右頁以同一尊身函數淡描於量度格內（粉本簿「一稿兩用」之本義自注）。
// 所據：docs/考據/畫風-南傳尼瓦爾.md（thyāsaphu 摺頁簿・粉本簿為諸地共同制度）；
// 印相禪定（簿稿通例，非儀軌斷言——工作擇定候核）。
// 格網：頂y=700 指=13 中x=560（左頁）→ 白毫856 頦960 心窩1168 臍1324 盤線1532 座面1584。
export const 尊位 = { W: 2200, H: 2500, 頂y: 700, 指: 13, 中x: 560, 座面: 1584 };

const 墨 = '#d8b36a';

function 具(x) {
  const 路 = (pts) => { x.beginPath(); x.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) x.lineTo(pts[i][0], pts[i][1]); };
  const 線 = (pts, w = 1.3, α = 1) => { x.save(); x.globalAlpha = α; x.strokeStyle = 墨; x.lineWidth = w; x.lineCap = 'round'; x.lineJoin = 'round'; 路(pts); x.stroke(); x.restore(); };
  const 貝 = (p0, c1, c2, p1, w = 1.3, α = 1) => { x.save(); x.globalAlpha = α; x.strokeStyle = 墨; x.lineWidth = w; x.lineCap = 'round'; x.beginPath(); x.moveTo(p0[0], p0[1]); x.bezierCurveTo(c1[0], c1[1], c2[0], c2[1], p1[0], p1[1]); x.stroke(); x.restore(); };
  const 弧 = (cx, cy, r, a0, a1, w = 1.3, ccw = false, α = 1) => { x.save(); x.globalAlpha = α; x.strokeStyle = 墨; x.lineWidth = w; x.lineCap = 'round'; x.beginPath(); x.arc(cx, cy, r, a0, a1, ccw); x.stroke(); x.restore(); };
  // 指：三節折脊（承康提尊身層之法）
  const 指 = (bx, by, ln, wd, ang, curl, { 甲 = false, 節紋 = true } = {}) => {
    const a0 = ang, a1 = ang + curl * 0.45, a2 = ang + curl;
    const l1 = ln * 0.44, l2 = ln * 0.33, l3 = ln * 0.23;
    const p0 = [bx, by];
    const p1 = [p0[0] + Math.cos(a0) * l1, p0[1] + Math.sin(a0) * l1];
    const p2 = [p1[0] + Math.cos(a1) * l2, p1[1] + Math.sin(a1) * l2];
    const p3 = [p2[0] + Math.cos(a2) * l3, p2[1] + Math.sin(a2) * l3];
    const 脊 = [p0, p1, p2, p3], 寬s = [wd * 0.5, wd * 0.46, wd * 0.38, wd * 0.24];
    for (const s of [-1, 1]) {
      const pts = 脊.map((p, i) => {
        const a = i === 0 ? a0 : (i === 1 ? a1 : (i === 2 ? (a1 + a2) / 2 : a2));
        return [p[0] + Math.cos(a + Math.PI / 2) * 寬s[i] * s, p[1] + Math.sin(a + Math.PI / 2) * 寬s[i] * s];
      });
      貝(pts[0], pts[1], pts[2], pts[3], 1.7);
    }
    弧(p3[0], p3[1], 寬s[3], a2 + Math.PI / 2, a2 - Math.PI / 2, 1.7, true);
    if (節紋) for (const [pp, aa, ww] of [[p1, a1, 寬s[1]], [p2, (a1 + a2) / 2, 寬s[2]]]) {
      const n = [Math.cos(aa + Math.PI / 2), Math.sin(aa + Math.PI / 2)];
      貝([pp[0] - n[0] * ww * 0.8, pp[1] - n[1] * ww * 0.8], [pp[0] - n[0] * ww * 0.2, pp[1] - n[1] * ww * 0.2 + 2],
        [pp[0] + n[0] * ww * 0.2, pp[1] + n[1] * ww * 0.2 + 2], [pp[0] + n[0] * ww * 0.8, pp[1] + n[1] * ww * 0.8], 0.9, 0.75);
    }
    if (甲) { const n = [Math.cos(a2 + Math.PI / 2), Math.sin(a2 + Math.PI / 2)], t = [Math.cos(a2), Math.sin(a2)];
      const qx = p3[0] - t[0] * 寬s[3] * 1.4, qy = p3[1] - t[1] * 寬s[3] * 1.4;
      貝([qx - n[0] * 寬s[3] * 0.7, qy - n[1] * 寬s[3] * 0.7], [p3[0] - n[0] * 寬s[3] * 0.6, p3[1] - n[1] * 寬s[3] * 0.6],
        [p3[0] + n[0] * 寬s[3] * 0.6, p3[1] + n[1] * 寬s[3] * 0.6], [qx + n[0] * 寬s[3] * 0.7, qy + n[1] * 寬s[3] * 0.7], 0.95, 0.85);
    }
    return { p1, p2, p3 };
  };
  const 蔽 = (fn) => { x.save(); x.globalCompositeOperation = 'destination-out'; x.globalAlpha = 1; x.fillStyle = '#000'; x.beginPath(); fn(); x.fill(); x.restore(); };
  return { 線, 貝, 弧, 指, 蔽, ctx: x };
}

// ── 身（一函數兩用：левый頁全相、右頁淡描於格）────────────────────────
function 身(x, 筆, cx, Y, u, { 淡 = false } = {}) {
  const { 線, 貝, 弧, 指, 蔽 } = 筆;
  const K = 淡 ? 0.34 : 1;         // 淡描之率
  const 線k = (pts, w, a=1) => 線(pts, w, a * K);
  const 貝k = (p0,c1,c2,p1,w,a=1) => 貝(p0,c1,c2,p1,w,a*K);
  const 弧k = (Cx,Cy,r,a0,a1,w,ccw=false,a=1) => 弧(Cx,Cy,r,a0,a1,w,ccw,a*K);
  const 頸底 = Y.頦 + 40, 膝半 = 26 * u;

  if (!淡) { // 左頁自蔽其形（右頁淡描浮於格上，不蔽）
    蔽(() => { x.ellipse(cx, 780, 74, 96, 0, 0, 2 * Math.PI); });
    蔽(() => { x.ellipse(cx, 905, 104, 168, 0, 0, 2 * Math.PI); });
    蔽(() => { x.ellipse(cx, 1190, 218, 232, 0, 0, 2 * Math.PI); });
    蔽(() => { x.ellipse(cx, 1500, 366, 142, 0, 0, 2 * Math.PI); });
  }

  // 髻與螺髮
  {
    const 顱頂 = Y.頦 - 260 + 26, 髻頂 = 顱頂 - 58;
    貝k([cx - 38, 顱頂 + 2], [cx - 26, 髻頂 + 10], [cx + 26, 髻頂 + 10], [cx + 38, 顱頂 + 2], 2.2);
    弧k(cx, 髻頂 - 4, 9, 0, 2 * Math.PI, 1.4);
    貝k([cx - 74, Y.白毫 - 44], [cx - 70, 顱頂 - 8], [cx + 70, 顱頂 - 8], [cx + 74, Y.白毫 - 44], 2.2);
    if (!淡) {
      const 行 = [{ yc: 顱頂 + 4, r: 38, n: 7 }, { yc: 顱頂 + 18, r: 52, n: 9 }, { yc: 顱頂 + 32, r: 62, n: 10 }, { yc: 顱頂 + 46, r: 68, n: 11 }];
      for (const { yc, r, n } of 行) for (let i = 0; i < n; i++) {
        const t = (i + 0.5) / n, a = Math.PI + t * Math.PI;
        弧(cx + Math.cos(a) * r, yc + Math.sin(a) * r * 0.38, 3.7, -0.4, Math.PI * 1.5, 0.95);
      }
    } else { 線k([[cx - 66, Y.白毫 - 52], [cx + 66, Y.白毫 - 52]], 0.9, 0.8); }
  }
  // 面（尼瓦爾開臉：杏目微睜・眉長挑・唇滿）
  {
    貝k([cx - 74, Y.白毫 - 40], [cx - 78, Y.白毫 + 46], [cx - 50, Y.頦 - 12], [cx - 16, Y.頦 + 3], 2.2);
    貝k([cx + 74, Y.白毫 - 40], [cx + 78, Y.白毫 + 46], [cx + 50, Y.頦 - 12], [cx + 16, Y.頦 + 3], 2.2);
    貝k([cx - 16, Y.頦 + 3], [cx - 7, Y.頦 + 7], [cx + 7, Y.頦 + 7], [cx + 16, Y.頦 + 3], 2.2);
    弧k(cx, Y.白毫, 4.6, 0, Math.PI * 1.8, 1.3);
    貝k([cx - 9, Y.白毫 - 9], [cx - 32, Y.白毫 - 24], [cx - 56, Y.白毫 - 23], [cx - 72, Y.白毫 - 6], 1.6);
    貝k([cx + 9, Y.白毫 - 9], [cx + 32, Y.白毫 - 24], [cx + 56, Y.白毫 - 23], [cx + 72, Y.白毫 - 6], 1.6);
    for (const s of [-1, 1]) {
      const ex = cx + s * 38, ey = Y.白毫 + 17;
      貝k([ex - s * 26, ey + 1], [ex - s * 11, ey - 10], [ex + s * 13, ey - 10], [ex + s * 26, ey - 1], 1.7);
      貝k([ex - s * 22, ey + 4], [ex - s * 8, ey + 7], [ex + s * 10, ey + 7], [ex + s * 23, ey + 2], 1.0, 0.85);
      if (!淡) 弧(ex + s * 1, ey + 1, 5.4, 0.12 * Math.PI, 0.88 * Math.PI, 1.2);
    }
    線k([[cx - 6, Y.白毫 + 4], [cx - 7, Y.白毫 + 44]], 1.2); 線k([[cx + 6, Y.白毫 + 4], [cx + 7, Y.白毫 + 44]], 1.2);
    貝k([cx - 7, Y.白毫 + 44], [cx - 14, Y.白毫 + 50], [cx - 15, Y.白毫 + 57], [cx - 8, Y.白毫 + 60], 1.4);
    貝k([cx + 7, Y.白毫 + 44], [cx + 14, Y.白毫 + 50], [cx + 15, Y.白毫 + 57], [cx + 8, Y.白毫 + 60], 1.4);
    貝k([cx - 8, Y.白毫 + 60], [cx - 3, Y.白毫 + 63], [cx + 3, Y.白毫 + 63], [cx + 8, Y.白毫 + 60], 1.4);
    貝k([cx - 17, Y.白毫 + 74], [cx - 6, Y.白毫 + 70], [cx + 6, Y.白毫 + 70], [cx + 17, Y.白毫 + 74], 1.4);
    貝k([cx - 13, Y.白毫 + 83], [cx - 6, Y.白毫 + 89], [cx + 6, Y.白毫 + 89], [cx + 13, Y.白毫 + 83], 1.3);
    for (const s of [-1, 1]) {
      const ax = cx + s * 78;
      貝k([ax, Y.白毫 - 24], [ax + s * 17, Y.白毫 - 26], [ax + s * 19, Y.白毫 + 20], [ax + s * 13, Y.白毫 + 40], 1.8);
      貝k([ax + s * 13, Y.白毫 + 40], [ax + s * 10, Y.白毫 + 64], [ax + s * 8, Y.白毫 + 82], [ax + s * 2, Y.頦 + 8], 1.8);
    }
  }
  // 頸肩軀（偏袒右肩）
  {
    線k([[cx - 32, Y.頦 + 6], [cx - 37, 頸底]], 2.0); 線k([[cx + 32, Y.頦 + 6], [cx + 37, 頸底]], 2.0);
    for (const [dy, hw] of [[12, 27], [22, 31]]) 貝k([cx - hw, Y.頦 + dy], [cx - hw * 0.4, Y.頦 + dy + 5], [cx + hw * 0.4, Y.頦 + dy + 5], [cx + hw, Y.頦 + dy], 1.0, 0.9);
    貝k([cx - 37, 頸底], [cx - 86, 頸底 + 4], [cx - 124, 頸底 + 14], [cx - 144, 頸底 + 38], 2.2);
    貝k([cx + 37, 頸底], [cx + 86, 頸底 + 4], [cx + 124, 頸底 + 14], [cx + 144, 頸底 + 38], 2.2);
    貝k([cx - 144, 頸底 + 38], [cx - 168, 頸底 + 86], [cx - 173, 頸底 + 146], [cx - 167, 頸底 + 204], 2.2);
    貝k([cx + 144, 頸底 + 38], [cx + 168, 頸底 + 88], [cx + 175, 頸底 + 152], [cx + 167, 頸底 + 214], 2.2);
    貝k([cx - 37, 頸底 + 2], [cx + 16, 頸底 + 24], [cx + 80, 頸底 + 48], [cx + 128, 頸底 + 60], 1.8); // 偏袒衣緣
    if (!淡) { // 簿稿斜線影（thyāsaphu 素描之意，僅左頁）
      for (let j = 0; j < 9; j++) {
        const t = j / 8, x0 = cx - 30 + t * 128, y0 = 頸底 + 34 + t * 26;
        線([[x0, y0], [x0 - 44 - 8 * Math.sin(t * 3), y0 + 62 + 6 * t]], 0.75, 0.35);
      }
    }
    貝k([cx - 167, 頸底 + 204], [cx - 136, Y.臍 - 24], [cx - 128, Y.臍 + 2], [cx - 136, Y.臍 + 40], 2.0);
    貝k([cx + 167, 頸底 + 214], [cx + 138, Y.臍 - 20], [cx + 130, Y.臍 + 6], [cx + 138, Y.臍 + 44], 2.0);
    弧k(cx, Y.臍 - 2, 5.6, 0, Math.PI * 1.5, 1.0, false, 0.8);
    貝k([cx - 130, Y.臍 + 26], [cx - 52, Y.臍 + 38], [cx + 52, Y.臍 + 40], [cx + 132, Y.臍 + 28], 1.3, 0.9);
  }
  // 禪定印（右掌覆左掌、二拇相拄——承康提之法而縮）
  {
    const LCy = Y.臍 + 118;
    if (!淡) 蔽(() => { x.ellipse(cx + 6, LCy + 2, 128, 60, 0, 0, 2 * Math.PI); });
    貝k([cx - 167, 頸底 + 204], [cx - 158, Y.臍 + 26], [cx - 130, Y.臍 + 84], [cx - 84, LCy + 6], 2.1);
    貝k([cx + 167, 頸底 + 214], [cx + 158, Y.臍 + 30], [cx + 128, Y.臍 + 88], [cx + 80, LCy + 2], 2.1);
    for (let i = 0; i < 4; i++) { // 下左手四梢自右掌下微露
      const tx = cx - 96 - i * 20, ty = LCy + 18 + i * 2.6, r = 8.4 - i * 0.9;
      貝k([tx + 2, ty - r - 2], [tx - r - 2, ty - 3], [tx - r + 1, ty + 4], [tx - 2, ty + 6], 1.4);
      貝k([tx + 2, ty - r - 2], [tx + r + 4, ty - r + 1], [cx - 76 + i * 2, LCy + 10 + i * 4], [cx - 72 + i * 2, LCy + 12 + i * 4], 1.4);
    }
    貝k([cx - 118, LCy + 30], [cx - 46, LCy + 40], [cx + 48, LCy + 42], [cx + 118, LCy + 32], 1.9); // 左掌下緣
    貝k([cx - 92, LCy - 5], [cx - 56, LCy + 20], [cx + 16, LCy + 26], [cx + 76, LCy + 16], 1.9);   // 右掌舟底
    const 列 = [[16, -14, 62, 0.16], [12, -2, 68, 0.10], [9, 9, 62, 0.06], [7, 18, 51, 0.02]];
    for (let i = 0; i < 4; i++) { const [ox, oy, ln, curl] = 列[i];
      if (!淡) 指(cx + ox, LCy - 20 + oy, ln, 14 - i, 0.05 + i * 0.05, -curl - 0.14);
      else 線k([[cx + ox, LCy - 20 + oy], [cx + ox + ln * 0.94, LCy - 24 + oy + 6]], 1.1, 0.8); }
    // 二拇相拄
    貝k([cx - 74, LCy - 12], [cx - 56, LCy - 30], [cx - 28, LCy - 38], [cx - 4, LCy - 37], 1.7);
    貝k([cx - 66, LCy - 2], [cx - 46, LCy - 20], [cx - 24, LCy - 29], [cx - 4, LCy - 29], 1.5);
    貝k([cx + 76, LCy - 7], [cx + 56, LCy - 25], [cx + 30, LCy - 36], [cx + 6, LCy - 36], 1.7);
    貝k([cx + 70, LCy + 3], [cx + 50, LCy - 15], [cx + 26, LCy - 27], [cx + 6, LCy - 27], 1.5);
    弧k(cx - 5, LCy - 33, 4.4, -Math.PI * 0.5, Math.PI * 0.6, 1.3);
    弧k(cx + 7, LCy - 32, 4.2, Math.PI * 0.4, Math.PI * 1.6, 1.3);
  }
  // 盤坐
  {
    貝k([cx - 136, Y.臍 + 40], [cx - 208, Y.臍 + 74], [cx - 276, Y.盤線 - 72], [cx - 膝半 + 20, Y.盤線 - 46], 2.2);
    貝k([cx + 138, Y.臍 + 44], [cx + 210, Y.臍 + 78], [cx + 278, Y.盤線 - 70], [cx + 膝半 - 20, Y.盤線 - 44], 2.2);
    貝k([cx - 膝半 + 20, Y.盤線 - 46], [cx - 膝半 - 5, Y.盤線 - 28], [cx - 膝半 - 7, Y.盤線 + 2], [cx - 膝半 + 10, Y.座面 - 10], 2.2);
    貝k([cx + 膝半 - 20, Y.盤線 - 44], [cx + 膝半 + 5, Y.盤線 - 26], [cx + 膝半 + 7, Y.盤線 + 2], [cx + 膝半 - 10, Y.座面 - 10], 2.2);
    貝k([cx - 膝半 + 10, Y.座面 - 10], [cx - 160, Y.座面], [cx - 48, Y.座面 + 2], [cx, Y.座面], 2.0);
    貝k([cx + 膝半 - 10, Y.座面 - 10], [cx + 160, Y.座面 + 2], [cx + 48, Y.座面 + 3], [cx, Y.座面], 2.0);
    貝k([cx - 膝半 + 48, Y.盤線 - 22], [cx - 120, Y.盤線 + 4], [cx + 48, Y.盤線 + 7], [cx + 膝半 - 70, Y.盤線 - 32], 1.7);
    貝k([cx + 膝半 - 48, Y.盤線 - 16], [cx + 112, Y.盤線 + 10], [cx - 56, Y.盤線 + 13], [cx - 膝半 + 72, Y.盤線 - 25], 1.7);
    if (!淡) { const fx = cx + 168, fy = Y.盤線 - 40;
      x.save(); x.translate(fx, fy); x.rotate(-0.2);
      蔽(() => { x.ellipse(0, 0, 58, 24, 0, 0, 2 * Math.PI); });
      貝([-50, 5], [-40, -14], [28, -18], [48, -5], 1.8);
      貝([-50, 5], [-35, 16], [26, 18], [48, -5], 1.8);
      for (let i = 0; i < 5; i++) 弧(44 - i * 14, -7 - Math.max(0, i - 1), 5.4 - i * 0.6, Math.PI * 0.85, Math.PI * 2.2, 1.1);
      x.restore(); }
  }
}

// ── 尊 ──────────────────────────────────────────────────────────────
export async function 尊(x, 助) {
  const { 頂y, 指: u, 中x: cx } = 尊位;
  const Y = { 白毫: 頂y + 12 * u, 頦: 頂y + 20 * u, 心窩: 頂y + 36 * u, 臍: 頂y + 48 * u, 盤線: 頂y + 64 * u, 座面: 頂y + 68 * u };
  const 斷 = (c, m) => { console.assert(c, m); if (!c) throw new Error(m); };
  斷(Y.白毫 === 856 && Y.頦 === 960 && Y.心窩 === 1168 && Y.臍 === 1324 && Y.盤線 === 1532 && Y.座面 === 1584, 'T1419 錨破！');
  const 筆 = 具(x);
  身(x, 筆, cx, Y, u, { 淡: false });          // 左頁全相
  身(x, 筆, cx + 1100, Y, u, { 淡: true });     // 右頁淡描於量度格（與框格共軸 1660）
  // チ：禪定二拇梢會於中軸（左頁）
  斷(Math.abs((cx - 6) - cx) < 20 && Math.abs((cx + 8) - cx) < 20, 'チ破：二拇不相拄');
  console.log(`身二描（左全右淡）；錨驗 白毫${Y.白毫} 頦${Y.頦} 心窩${Y.心窩} 臍${Y.臍} 盤線${Y.盤線} 座面${Y.座面}`);
}

export async function 修(x, 助) { }
