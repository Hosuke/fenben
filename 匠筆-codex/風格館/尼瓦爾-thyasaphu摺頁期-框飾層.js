// 尼瓦爾-thyāsaphu 摺頁期・框飾層（景／飾）
// 只留簿葉版式、摺線、紙紋、量度格與座飾；一切尊身由主坊親筆補入。

export const 尊位 = Object.freeze({
  W: 2200,
  H: 2500,
  頂y: 700,
  指: 13,
  中x: 560,
  座面: 1584,
});

const 墨 = '#d8b36a';
const 朱 = '#a85b52';
const 冷墨 = '#82909c';
const TAU = Math.PI * 2;

function 斷(真, 訊) {
  console.assert(真, 訊);
  if (!真) throw new Error(訊);
}

function 驗助(助) {
  斷(助 && 助.尊位, 'thyāsaphu 框飾層：缺 助.尊位');
  for (const 名 of ['W', 'H', '頂y', '指', '中x', '座面']) {
    斷(助.尊位[名] === 尊位[名], `尊位失守：${名}`);
  }
  斷(尊位.頂y + 68 * 尊位.指 === 尊位.座面, '座面非頂y+68指');
}

function 描(ctx, 色, 寬, 透明, 落) {
  ctx.save();
  ctx.strokeStyle = 色;
  ctx.lineWidth = 寬;
  ctx.globalAlpha = 透明;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  落(ctx);
  ctx.stroke();
  ctx.restore();
}

function 紙頁(ctx, P, 種) {
  // 手工簿葉之外緣不作死直板；三重摺線各有輕重。
  描(ctx, 墨, 2.1, .9, p => {
    p.moveTo(P.l + 15, P.t);
    p.bezierCurveTo(P.l + 250, P.t - 9, P.r - 270, P.t + 8, P.r - 12, P.t + 1);
    p.lineTo(P.r, P.b - 18);
    p.bezierCurveTo(P.r - 250, P.b + 9, P.l + 260, P.b - 8, P.l + 9, P.b - 2);
    p.closePath();
  });
  for (const d of [13, 27]) 描(ctx, 墨, d === 13 ? 1.05 : .68, d === 13 ? .54 : .36,
    p => p.rect(P.l + d, P.t + d, P.r - P.l - d * 2, P.b - P.t - d * 2));

  // 紙面經緯分段錯開；線不封閉、不結成另一量度格。
  ctx.save();
  ctx.beginPath();
  ctx.rect(P.l + 34, P.t + 34, P.r - P.l - 68, P.b - P.t - 68);
  ctx.clip();
  for (let y = P.t + 42, k = 0; y < P.b - 38; y += 9, k++) {
    const 缺 = P.l + 130 + ((k * (47 + 種)) % 620);
    for (const [a, b] of [[P.l + 42, 缺 - 18], [缺 + 28, P.r - 42]]) {
      描(ctx, k % 7 ? 冷墨 : 墨, .46, k % 7 ? .105 : .15, p => {
        p.moveTo(a, y);
        p.bezierCurveTo(a + 150, y + Math.sin(k * .7) * 2.5,
          b - 130, y - Math.cos(k * .43) * 2.2, b, y);
      });
    }
  }
  for (let x = P.l + 46, k = 0; x < P.r - 42; x += 17, k++) {
    const 缺 = P.t + 170 + ((k * (71 + 種)) % 1440);
    for (const [a, b] of [[P.t + 42, 缺 - 24], [缺 + 34, P.b - 42]]) {
      描(ctx, k % 5 ? 冷墨 : 墨, .42, k % 5 ? .09 : .13, p => {
        p.moveTo(x, a);
        p.bezierCurveTo(x + Math.sin(k) * 2, a + 170,
          x - Math.cos(k * .6) * 2, b - 160, x, b);
      });
    }
  }
  ctx.restore();
}

function 角摺(ctx, x, y, sx, sy) {
  描(ctx, 墨, .86, .45, p => {
    p.moveTo(x, y + sy * 70); p.lineTo(x + sx * 70, y); p.lineTo(x, y); p.closePath();
    p.moveTo(x + sx * 16, y + sy * 55); p.lineTo(x + sx * 55, y + sy * 16);
  });
  for (let k = 1; k < 5; k++) 描(ctx, 冷墨, .42, .24,
    p => { p.moveTo(x + sx * k * 9, y); p.lineTo(x, y + sy * k * 9); });
}

function 頁帶(ctx, P, y, 型) {
  描(ctx, 墨, .72, .42, p => {
    p.moveTo(P.l + 74, y - 28); p.lineTo(P.r - 74, y - 28);
    p.moveTo(P.l + 74, y + 28); p.lineTo(P.r - 74, y + 28);
  });
  const x0 = P.l + 86, x1 = P.r - 86;
  if (型 === 0) {
    // 不等卷草：卷徑、轉向、葉尖逐節變化，非同印複拓。
    for (let x = x0, k = 0; x < x1; x += 58 + (k % 3) * 7, k++) {
      const r = 12 + (k % 4) * 2.2;
      描(ctx, k % 3 ? 墨 : 朱, .7 + (k % 2) * .16, .5, p => {
        p.moveTo(x, y + Math.sin(k) * 7);
        p.bezierCurveTo(x + 14, y - 21, x + 40, y - 20 + (k % 2) * 7, x + 49, y + 2);
        p.arc(x + 35, y + 3, r, -.05, TAU * (.72 + (k % 3) * .04));
        p.moveTo(x + 16, y - 10); p.quadraticCurveTo(x + 5, y - 24, x - 1, y - 8 - (k % 3) * 3);
      });
    }
  } else if (型 === 1) {
    for (let x = x0, k = 0; x < x1; x += 42 + (k % 4) * 3, k++) {
      const w = 14 + (k % 3) * 3, h = 12 + (k % 5);
      描(ctx, k % 5 === 0 ? 朱 : 墨, .68, .48, p => {
        p.moveTo(x, y); p.lineTo(x + w, y - h); p.lineTo(x + 2 * w, y);
        p.lineTo(x + w, y + h); p.closePath();
        if (k % 2) p.arc(x + w, y, 2.2 + k % 3, 0, TAU);
      });
    }
  } else if (型 === 2) {
    for (let x = x0, k = 0; x < x1; x += 31 + (k % 3) * 2, k++) {
      const r = 4 + (k % 4) * .65;
      描(ctx, k % 7 === 0 ? 朱 : 墨, .62, .5, p => {
        p.arc(x, y + Math.sin(k * .9) * 2, r, 0, TAU);
        p.arc(x + 13, y - 5 + (k % 2) * 10, 1.4 + (k % 3) * .35, 0, TAU);
      });
    }
  } else {
    描(ctx, 墨, .72, .48, p => {
      p.moveTo(x0, y);
      for (let x = x0, k = 0; x < x1; x += 38 + (k++ % 3) * 6) {
        p.quadraticCurveTo(x + 13, y - 18 - (k % 4) * 2, x + 28, y);
        p.quadraticCurveTo(x + 42, y + 15 + (k % 3) * 3, x + 55, y);
      }
    });
  }
}

export function 景(ctx, 助) {
  ctx.save();
  try {
    驗助(助);
    const 左 = { l: 105, r: 1072, t: 230, b: 2270 };
    const 右 = { l: 1128, r: 2095, t: 230, b: 2270 };
    紙頁(ctx, 左, 3);
    紙頁(ctx, 右, 11);
    for (const [x, w, a] of [[1082, .8, .4], [1092, 1.4, .66], [1100, 2.2, .9], [1108, 1.4, .66], [1118, .8, .4]]) {
      描(ctx, 墨, w, a, p => { p.moveTo(x, 212); p.lineTo(x, 2288); });
    }
    for (let y = 286, k = 0; y < 2230; y += 61, k++) {
      for (const x of [1090, 1110]) 描(ctx, 墨, .62, .43,
        p => p.ellipse(x, y, 3.2 + k % 2, 4.2, 0, 0, TAU));
      描(ctx, 墨, .48, .32, p => {
        p.moveTo(1090, y); p.quadraticCurveTo(1100, y + (k % 2 ? 8 : -8), 1110, y);
      });
    }
    角摺(ctx, 左.l + 2, 左.t + 2, 1, 1);
    角摺(ctx, 左.l + 2, 左.b - 2, 1, -1);
    角摺(ctx, 右.r - 2, 右.t + 2, -1, 1);
    角摺(ctx, 右.r - 2, 右.b - 2, -1, -1);
    頁帶(ctx, 左, 330, 0);
    頁帶(ctx, 左, 2170, 1);
    頁帶(ctx, 右, 330, 2);
    頁帶(ctx, 右, 2170, 3);

    // 右頁只留量度格與朱字，不留任何淡身形。
    const gx0 = 1296;
    const gy0 = 尊位.頂y;
    const u = 尊位.指;
    for (let n = 0; n <= 68; n++) {
      const y = gy0 + n * u;
      描(ctx, n >= 0 && [12, 20, 36, 48, 68].includes(n) ? 朱 : 墨,
        n % 4 === 0 ? .78 : .42, n % 4 === 0 ? .46 : .22,
        p => { p.moveTo(gx0, y); p.lineTo(2024, y); });
    }
    for (let n = 0; n <= 56; n++) {
      const x = gx0 + n * u;
      描(ctx, n === 28 ? 朱 : 墨, n % 4 === 0 ? .78 : .42, n % 4 === 0 ? .42 : .2,
        p => { p.moveTo(x, gy0); p.lineTo(x, 尊位.座面); });
    }
    ctx.save();
    ctx.fillStyle = 朱;
    ctx.globalAlpha = .82;
    ctx.font = '26px serif';
    for (const n of [12, 20, 36, 48, 68]) ctx.fillText(String(n), 1248, gy0 + n * u + 8);
    ctx.restore();
  } finally {
    ctx.restore();
  }
}

export function 飾(ctx, 助) {
  ctx.save();
  try {
    驗助(助);
    // 座頂緣即臀底錨；其後諸層只向下承，不侵尊身。
    const x0 = 178, x1 = 942, y0 = 尊位.座面;
    描(ctx, 墨, 2.65, .98, p => { p.moveTo(x0 + 12, y0); p.lineTo(x1 - 12, y0); });
    描(ctx, 墨, 1.12, .68, p => {
      p.moveTo(x0, y0 + 18); p.quadraticCurveTo(560, y0 + 31, x1, y0 + 18);
      p.lineTo(x1 - 18, y0 + 65); p.quadraticCurveTo(560, y0 + 78, x0 + 18, y0 + 65); p.closePath();
    });

    // 第一帶：卷雲瓣各自變形、內芯轉向互異。
    for (let x = x0 + 18, k = 0; x < x1 - 28; x += 48 + (k % 3) * 4, k++) {
      const w = 38 + (k % 4) * 2, h = 30 + (k % 3) * 4;
      描(ctx, k % 5 === 0 ? 朱 : 墨, .82 + (k % 2) * .12, .68, p => {
        p.moveTo(x, y0 + 64);
        p.bezierCurveTo(x + 4, y0 + 32 - (k % 2) * 4, x + w - 4, y0 + 31 + (k % 3) * 3, x + w, y0 + 64);
        p.bezierCurveTo(x + w * .76, y0 + 49, x + w * .24, y0 + 50 + h * .08, x, y0 + 64);
        p.moveTo(x + 8, y0 + 60);
        p.bezierCurveTo(x + w * .32, y0 + 44, x + w * .73, y0 + 43, x + w - 7, y0 + 58);
        p.arc(x + w * (.44 + (k % 2) * .12), y0 + 54, 4 + k % 3, 0, TAU * .78, k % 2 === 0);
      });
    }

    const 帶頂 = y0 + 82;
    for (const y of [帶頂, 帶頂 + 48, 帶頂 + 102, 帶頂 + 172, 帶頂 + 225]) {
      描(ctx, 墨, y === 帶頂 + 225 ? 1.75 : .86, y === 帶頂 + 225 ? .86 : .56,
        p => { p.moveTo(x0 - (y - 帶頂) * .08, y); p.lineTo(x1 + (y - 帶頂) * .08, y); });
    }

    // 第二帶：疏密珠與小花交錯，逐珠半徑不一。
    for (let x = x0 + 9, k = 0; x < x1 - 2; x += 25 + (k % 4) * 3, k++) {
      描(ctx, k % 6 === 0 ? 朱 : 墨, .66, .58, p => {
        const r = 3.5 + (k % 5) * .45;
        p.arc(x, 帶頂 + 24 + Math.sin(k) * 2.4, r, 0, TAU);
        if (k % 3 === 1) {
          for (let q = 0; q < 4; q++) {
            const a = q * Math.PI / 2 + k * .17;
            p.moveTo(x + Math.cos(a) * 6, 帶頂 + 24 + Math.sin(a) * 6);
            p.quadraticCurveTo(x + Math.cos(a + .35) * 10,
              帶頂 + 24 + Math.sin(a + .35) * 10,
              x + Math.cos(a) * 12, 帶頂 + 24 + Math.sin(a) * 12);
          }
        }
      });
    }

    // 第三帶：菱格內紋逐格異筆，毋整帶同印。
    for (let x = x0 + 5, k = 0; x < x1 - 35; x += 39 + (k % 3) * 3, k++) {
      const w = 29 + (k % 4) * 2, cy = 帶頂 + 75;
      描(ctx, k % 7 === 0 ? 朱 : 墨, .7, .58, p => {
        p.moveTo(x, cy); p.lineTo(x + w * .5, cy - 17 - k % 3); p.lineTo(x + w, cy);
        p.lineTo(x + w * .5, cy + 17 + (k + 1) % 3); p.closePath();
        if (k % 3 === 0) p.arc(x + w * .5, cy, 3 + k % 4, 0, TAU);
        else if (k % 3 === 1) { p.moveTo(x + 6, cy); p.lineTo(x + w - 6, cy); }
        else { p.moveTo(x + w * .5, cy - 10); p.lineTo(x + w * .5, cy + 10); }
      });
    }

    // 第四帶：不等波瓣收座；末緣仍在左頁內。
    描(ctx, 墨, .84, .62, p => {
      p.moveTo(x0 - 7, 帶頂 + 137);
      let x = x0 - 7;
      for (let k = 0; x < x1; k++) {
        const w = 31 + (k % 4) * 4, h = 20 + (k % 3) * 4;
        p.quadraticCurveTo(x + w * .5, 帶頂 + 137 + h, x + w, 帶頂 + 137);
        x += w;
      }
    });
    描(ctx, 朱, .68, .44, p => {
      p.moveTo(x0 - 18, 帶頂 + 198);
      let x = x0 - 18;
      for (let k = 0; x < x1 + 18; k++) {
        const w = 42 + (k % 3) * 5;
        p.quadraticCurveTo(x + w * .28, 帶頂 + 181 - (k % 2) * 4,
          x + w * .52, 帶頂 + 198);
        p.quadraticCurveTo(x + w * .78, 帶頂 + 216 + (k % 3) * 3,
          x + w, 帶頂 + 198);
        x += w;
      }
    });
  } finally {
    ctx.restore();
  }
}
