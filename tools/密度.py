#!/usr/bin/env python3
# 密度 · tools/密度.py —— 線像素比之尺（展覽館精美程之標）
# 法：全幅計「距底色 RGB(13,17,36) 歐氏距 >24（平方>576）」之像素，比＝墨/全幅。
# 底線重錨（2026-07-13）：程令原引 22.37% 乃前世佚法之數，何閾不可復現；
# 尺既定此法，底線＝藏地-精密二稿 同尺實測 **13.28%**（「達精密二稿之標」義不變）。
# 用：python3 tools/密度.py <png...>
import sys
from PIL import Image
BG = (13, 17, 36)
def 密度(p):
    im = Image.open(p).convert('RGB')
    px = im.tobytes(); n = len(px) // 3; ink = 0
    for i in range(0, len(px), 3):
        dr = px[i] - BG[0]; dg = px[i+1] - BG[1]; db = px[i+2] - BG[2]
        if dr*dr + dg*dg + db*db > 576: ink += 1
    return ink / n * 100
for p in sys.argv[1:]:
    print(f"{密度(p):6.2f}%  {p}")
