// 純觀共具：世界變換重繪、滾輪／捏合縮放、拖曳平移、雙觸／雙擊復位。
// 重繪(ctx, 變換) 之「變換」為 Canvas 2D 六值陣列 [縮, 0, 0, 縮, 平x, 平y]；
// 呼方於透明布上自畫，觀具只理視野與手勢。
export function 掛觀(canvas, 重繪, 選項 = {}) {
  if (location.protocol === 'file:') {
    const x = canvas.getContext('2d');
    const 行 = [
      '此頁須經 http 開啟',
      '倉根執行：python3 -m http.server 8000',
      '而後開 http://localhost:8000/本頁名',
    ];
    x.fillStyle = '#d8b36a';
    x.font = '20px sans-serif';
    x.textAlign = 'center';
    x.textBaseline = 'middle';
    行.forEach((字, i) => x.fillText(字, canvas.width / 2, canvas.height / 2 + (i - 1) * 32));
    return;
  }
  const 世 = { W: 選項.寬 ?? canvas.width, H: 選項.高 ?? canvas.height };
  let 縮 = 1, 平x = 0, 平y = 0;
  const dpr = () => Math.min(window.devicePixelRatio || 1, 3);

  function 復位() {
    const d = dpr(), vw = innerWidth * d, vh = innerHeight * d;
    縮 = Math.min(vw / 世.W, vh / 世.H) * 0.96;
    平x = (vw - 世.W * 縮) / 2; 平y = (vh - 世.H * 縮) / 2;
  }

  let 繪中 = false, 待繪 = false, 前影 = null, 前T = null;
  async function 繪() {
    if (繪中) { 待繪 = true; return; }
    繪中 = true;
    const d = dpr();
    canvas.width = Math.round(innerWidth * d); canvas.height = Math.round(innerHeight * d);
    const __T = [縮, 0, 0, 縮, 平x, 平y];
    try {
      await 重繪(canvas.getContext('2d'), __T);
      const 新影 = await createImageBitmap(canvas);
      前影?.close();
      前影 = 新影;
      前T = { 縮: __T[0], 平x: __T[4], 平y: __T[5] };
    } catch (e) { console.error(e); }
    繪中 = false;
    if (待繪) { 待繪 = false; 繪(); }
  }

  // 手勢間之速覽：以前影點陣即時變換，靜止後乃精繪。
  let 繪計 = 0;
  function 速覽() {
    clearTimeout(繪計);
    繪計 = setTimeout(繪, 140);
    if (!前影 || !前T) return;
    const x = canvas.getContext('2d');
    x.setTransform(1, 0, 0, 1, 0, 0);
    x.clearRect(0, 0, canvas.width, canvas.height);
    const k = 縮 / 前T.縮;
    x.setTransform(k, 0, 0, k, 平x - 前T.平x * k, 平y - 前T.平y * k);
    x.drawImage(前影, 0, 0);
    x.setTransform(1, 0, 0, 1, 0, 0);
  }

  canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    const d = dpr(), mx = e.clientX * d, my = e.clientY * d;
    const 率 = Math.exp(-e.deltaY * 0.0016);
    const 新 = Math.min(Math.max(縮 * 率, 0.05), 512);
    平x = mx - (mx - 平x) * (新 / 縮); 平y = my - (my - 平y) * (新 / 縮);
    縮 = 新; 速覽();
  }, { passive: false });

  // 觸與鼠一體：指 Map 追多點——一指拖、二指捏（向捏合中點縮放＋隨中點平移）、
  // 觸屏雙觸復位（iOS 無 dblclick 可恃）。
  let 拖 = null, 捏 = null, 多指 = 0;
  const 指 = new Map();
  let 觸前 = 0, 觸前x = 0, 觸前y = 0;
  canvas.addEventListener('pointerdown', (e) => {
    try { canvas.setPointerCapture(e.pointerId); } catch {}
    指.set(e.pointerId, { x: e.clientX, y: e.clientY, x0: e.clientX, y0: e.clientY });
    多指 = Math.max(多指, 指.size);
    if (指.size === 2) {
      const [a, b] = [...指.values()];
      捏 = { 距: Math.hypot(a.x - b.x, a.y - b.y), 中x: (a.x + b.x) / 2, 中y: (a.y + b.y) / 2 };
      拖 = null; canvas.classList.remove('拖');
    } else if (指.size === 1) { 拖 = { x: e.clientX, y: e.clientY }; canvas.classList.add('拖'); }
    else 拖 = null;
  });
  canvas.addEventListener('pointermove', (e) => {
    const p = 指.get(e.pointerId);
    if (p) { p.x = e.clientX; p.y = e.clientY; }
    if (捏 && 指.size >= 2) {
      const [a, b] = [...指.values()];
      const 距 = Math.hypot(a.x - b.x, a.y - b.y), 中x = (a.x + b.x) / 2, 中y = (a.y + b.y) / 2;
      if (捏.距 > 8 && 距 > 8) {
        // 錨於舊中點之世界點：平' = 新中*d − (舊中*d − 平)·k，縮平一式合成無漂移。
        const d = dpr();
        const 新 = Math.min(Math.max(縮 * (距 / 捏.距), 0.05), 512), k = 新 / 縮;
        平x = 中x * d - (捏.中x * d - 平x) * k;
        平y = 中y * d - (捏.中y * d - 平y) * k;
        縮 = 新; 速覽();
      }
      捏 = { 距, 中x, 中y };
    } else if (拖 && p) {
      const d = dpr();
      平x += (e.clientX - 拖.x) * d; 平y += (e.clientY - 拖.y) * d;
      拖 = { x: e.clientX, y: e.clientY }; 速覽();
    }
  });
  const 指收 = (e) => {
    const p = 指.get(e.pointerId);
    指.delete(e.pointerId);
    try { canvas.releasePointerCapture(e.pointerId); } catch {}
    if (指.size >= 2) {
      // 三指落二指（或對換）：以現存前二指重建基準，防驟跳。
      const [a, b] = [...指.values()];
      捏 = { 距: Math.hypot(a.x - b.x, a.y - b.y), 中x: (a.x + b.x) / 2, 中y: (a.y + b.y) / 2 };
    } else 捏 = null;
    if (指.size === 1) { const [q] = [...指.values()]; 拖 = { x: q.x, y: q.y }; }
    else if (指.size === 0) {
      拖 = null; canvas.classList.remove('拖');
      if (e.type === 'pointerup' && e.pointerType === 'touch' && p && 多指 === 1
          && Math.hypot(e.clientX - p.x0, e.clientY - p.y0) < 12) {
        const 今 = e.timeStamp;
        if (今 - 觸前 < 320 && Math.hypot(e.clientX - 觸前x, e.clientY - 觸前y) < 30) { 觸前 = 0; 復位(); 繪(); }
        else { 觸前 = 今; 觸前x = e.clientX; 觸前y = e.clientY; }
      } else 觸前 = 0; // 拖・捏・cancel 之末不留雙觸伏筆。
      多指 = 0;
    }
  };
  canvas.addEventListener('pointerup', 指收);
  canvas.addEventListener('pointercancel', 指收);
  canvas.addEventListener('dblclick', () => { 復位(); 繪(); });

  // resize（含 iOS 地址欄伸縮・轉屏）：保視野中心與縮率，不復位打斷觀圖。
  // 自持幕尺寸（canvas.width 於 繪中 滯後，連發 resize 倚之則中心逐次漂移）。
  let 幕w = Math.round(innerWidth * dpr()), 幕h = Math.round(innerHeight * dpr());
  addEventListener('resize', () => {
    const d = dpr(), vw = Math.round(innerWidth * d), vh = Math.round(innerHeight * d);
    const cx = (幕w / 2 - 平x) / 縮, cy = (幕h / 2 - 平y) / 縮;
    平x = vw / 2 - cx * 縮; 平y = vh / 2 - cy * 縮;
    幕w = vw; 幕h = vh;
    繪();
  });

  // iOS Safari 頁級雙指手勢之防（毋令整頁被捏縮）。
  for (const t of ['gesturestart', 'gesturechange', 'gestureend'])
    document.addEventListener(t, (e) => e.preventDefault());

  復位(); 繪();
}
