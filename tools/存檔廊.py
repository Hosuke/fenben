#!/usr/bin/env python3
# 存檔廊 · tools/存檔廊.py —— 歷代稿存檔（主人 2026-07-13 令：凡完整之嘗試皆記，不抹去）
# 自 git 史掘各席候展稿（含已退役）歷代版本，去重（blob），出縮圖入 圖錄/存檔/，
# 生成 存檔.html。ID＝<席>-<commit短碼>：主人指某幅，以其 ID `git show` 即得全圖。
import subprocess, glob, io, html, os
from PIL import Image

def run(*a, 容路徑缺=False):
    r = subprocess.run(a, capture_output=True)
    if r.returncode != 0:
        err = r.stderr.decode(errors='replace')
        if 容路徑缺 and ('exists on disk, but not in' in err or 'does not exist in' in err):
            return b''                                          # --follow 舊路徑於彼卷本無——預期而過
        raise SystemExit(f"git 命令敗：{' '.join(a)}\n{err[:400]}")
    return r.stdout

條目 = {}   # 席 -> [(id, date, thumb, sha)]
seen_blobs = set()
files = sorted(glob.glob('圖錄/風格館/*-候展稿.png') + glob.glob('圖錄/風格館/*-候展稿-已退役.png'))
for f in files:
    席 = f.split('/')[-1].replace('-候展稿-已退役.png', '（退役線）').replace('-候展稿.png', '')
    log = run('git', '-c', 'core.quotepath=false', 'log', '--format=@%h %H %cs', '--name-status', '--follow', '--', f).decode().strip()
    if not log: continue
    卷路 = []                                            # [(h, H, date, 彼卷之路)]
    當 = None
    for line in log.splitlines():
        line = line.rstrip()
        if line.startswith('@'):
            h, H, date = line[1:].split(); 當 = [h, H, date]; continue
        if not line or 當 is None: continue
        parts = line.split('\t')
        if parts[0].startswith(('R', 'C')) and len(parts) == 3:  # rename/copy：本卷新路
            卷路.append((*當, parts[2].strip('\"'))); 當 = None
        elif parts[0] in ('A', 'M') and len(parts) == 2:
            卷路.append((*當, parts[1].strip('\"'))); 當 = None
    for h, H, date, 路 in 卷路:
        blob = run('git', 'rev-parse', f'{H}:{路}', 容路徑缺=True).decode().strip()
        if not blob: continue
        out = f'圖錄/存檔/{席}-{h}.jpg'
        if (席, blob) in seen_blobs:
            if os.path.exists(out): os.remove(out)
            continue
        seen_blobs.add((席, blob))
        data = run('git', 'show', blob)
        if len(data) < 1000: continue
        try:
            im = Image.open(io.BytesIO(data)).convert('RGB')
        except Exception:
            continue
        im.thumbnail((720, 1000))
        im.save(out, quality=82)
        鍵 = 席.replace('（退役線）', '')
        條目.setdefault(鍵, []).append((f'{席}-{h}', date, out, h))
        print('存', out)

卡s = []
for 席 in sorted(條目):
    卡s.append(f'<h2>{html.escape(席)}</h2><div class="網">')
    for _id, date, thumb, h in sorted(條目[席], key=lambda e: e[1]):
        卡s.append(
            f'<figure><a href="{html.escape(thumb)}" target="_blank">'
            f'<img src="{html.escape(thumb)}" loading="lazy" alt="{html.escape(_id)}"></a>'
            f'<figcaption><b>ID: {html.escape(_id)}</b><small>{date} · 全圖可以 ID 溯取</small></figcaption></figure>')
    卡s.append('</div>')

卡文 = '\n'.join(卡s)
頁 = f"""<!DOCTYPE html><html lang="zh-Hant"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>歷代稿存檔廊 · 粉本</title>
<style>
body{{background:#0d1124;color:#d8c9a3;font-family:'Songti TC','Noto Serif TC',serif;margin:0;padding:2rem 4vw 6rem}}
h1{{font-size:1.6rem;letter-spacing:.3em;border-bottom:1px solid #3a4166;padding-bottom:.6rem}}
p.序{{color:#8a90ad;max-width:52em;line-height:1.9}}
h2{{margin-top:2.8rem;font-size:1.1rem;letter-spacing:.2em;color:#c8ab6a}}
.網{{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:1.2rem}}
figure{{margin:0;border:1px solid #2a3050;padding:.5rem;border-radius:4px}}
img{{width:100%;height:auto;display:block}}
figcaption{{padding-top:.5rem;font-size:.8rem;line-height:1.6}}
figcaption b{{display:block;color:#d8b36a;font-weight:600}}
figcaption small{{color:#8a90ad}}
a.歸{{color:#c8ab6a;text-decoration:none}}
</style></head><body>
<a class="歸" href="index.html">← 歸展覽館</a>
<h1>歷代稿存檔廊</h1>
<p class="序">主人之令（2026-07-13）：凡完整之嘗試皆值一記，不必抹去。此廊自倉史掘出諸席歷代全稿——
每一稿皆一次完整之嘗試，各具其時之風。各幀有 <b>ID</b>（席名＋卷碼）：指某幅告知其 ID，
即可自倉史溯取全圖為參，或據以再精。縮圖藏 圖錄/存檔/，全圖永存於卷。
退役之世系亦以「退役線」與原線同圖並陳，俾其可見。</p>
{卡文}
</body></html>"""
open('存檔.html', 'w').write(頁)
print('頁成 存檔.html；凡', sum(len(v) for v in 條目.values()), '稿')
