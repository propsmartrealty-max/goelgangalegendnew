import os
from PIL import Image

public_dir = "/Users/vikasyewle/goelgangalegendcounty/public"
png_files = [f for f in os.listdir(public_dir) if f.endswith(".png")]

print(f"Found {len(png_files)} PNG files to convert.")

for png_file in png_files:
    png_path = os.path.join(public_dir, png_file)
    webp_name = os.path.splitext(png_file)[0] + ".webp"
    webp_path = os.path.join(public_dir, webp_name)
    
    print(f"Converting {png_file} to {webp_name}...")
    try:
        with Image.open(png_path) as img:
            # WebP supports RGBA, so we can convert directly
            img.save(webp_path, "WEBP", quality=85)
        
        orig_size = os.path.getsize(png_path)
        new_size = os.path.getsize(webp_path)
        reduction = (orig_size - new_size) / orig_size * 100
        print(f"Saved: {webp_name} | Size: {orig_size/1024:.1f}KB -> {new_size/1024:.1f}KB ({reduction:.1f}% reduction)")
    except Exception as e:
        print(f"Failed to convert {png_file}: {e}")

print("Conversion complete!")
