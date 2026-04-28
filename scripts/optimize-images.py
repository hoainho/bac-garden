#!/usr/bin/env python3
"""
Compress restaurant images to WebP at 3 sizes:
  thumb  — 600 px wide  (dish cards on mobile, gallery)
  card   — 1200 px wide (dish cards desktop, story section)
  hero   — 1920 px wide (hero slideshow, featured full-bleed)

Output: public/images/optimized/{size}/{filename}.webp
"""
import os
import sys
import time
from pathlib import Path
from PIL import Image

SRC_DIR  = Path(__file__).parent.parent / "public" / "images"
OUT_BASE = SRC_DIR / "optimized"

SIZES = {
    "thumb": (600,  600,  78),
    "card":  (1200, 1200, 82),
    "hero":  (1920, 1920, 85),
}

EXTENSIONS = {".jpg", ".jpeg", ".png"}

def resize_and_save(img: Image.Image, out_path: Path, max_w: int, max_h: int, quality: int):
    w, h = img.size
    ratio = min(max_w / w, max_h / h, 1.0)
    new_w = max(1, int(w * ratio))
    new_h = max(1, int(h * ratio))
    resized = img.resize((new_w, new_h), Image.LANCZOS)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    resized.save(out_path, "WEBP", quality=quality, method=6)
    return out_path.stat().st_size

def main():
    sources = sorted(p for p in SRC_DIR.iterdir()
                     if p.is_file() and p.suffix.lower() in EXTENSIONS
                     and "optimized" not in str(p))

    if not sources:
        print("No source images found in", SRC_DIR)
        sys.exit(1)

    print(f"Processing {len(sources)} images → WebP (3 sizes each)\n")
    total_orig = 0
    total_out  = 0
    t_start    = time.time()

    for src in sources:
        orig_size = src.stat().st_size
        total_orig += orig_size
        print(f"  {src.name} ({orig_size // 1024 // 1024}MB)", end="", flush=True)

        try:
            img = Image.open(src).convert("RGB")
        except Exception as e:
            print(f"  ✗ SKIP ({e})")
            continue

        file_total = 0
        for size_name, (max_w, max_h, quality) in SIZES.items():
            out_path = OUT_BASE / size_name / (src.stem + ".webp")
            if out_path.exists():
                file_total += out_path.stat().st_size
                continue
            saved = resize_and_save(img, out_path, max_w, max_h, quality)
            file_total += saved

        total_out += file_total
        ratio = (1 - file_total / orig_size) * 100
        print(f"  →  {file_total // 1024}KB total  ({ratio:.0f}% saved)")

    elapsed = time.time() - t_start
    print(f"\nDone in {elapsed:.1f}s")
    print(f"Original total : {total_orig // 1024 // 1024} MB")
    print(f"Optimized total: {total_out  // 1024 // 1024} MB  ({(1 - total_out/total_orig)*100:.0f}% reduction)")

if __name__ == "__main__":
    main()
