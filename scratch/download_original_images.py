import os
import urllib.request
import ssl

def download_images():
    base_url = "https://project.thelivingblueprint.com"
    target_dir = "/Users/vikasyewle/goelgangalegendcounty/public"
    
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE

    images_to_download = {
        # Hero & Aerial
        "hero-aerial.webp": f"{base_url}/assets/images/hero-slider/1.jpg",
        "hero-longevity.png": f"{base_url}/assets/images/hero-slider/2.png",
        "about-architecture.png": f"{base_url}/assets/images/about-thumb.png",
        "cinema-thumb.jpg": f"{base_url}/assets/images/main-video-thumb.jpg",
        "rera-qr-official.jpg": f"{base_url}/assets/images/rera-qr.jpg",
        "ggc-official-logo.png": f"{base_url}/assets/images/ggc-logo.png",
        "tlb-official-logo.png": f"{base_url}/assets/images/tlb-logo.png",

        # 7 Pillars
        "pillar-air.jpg": f"{base_url}/assets/images/pillars/air.jpg",
        "pillar-water.jpg": f"{base_url}/assets/images/pillars/water.jpg",
        "pillar-light.jpg": f"{base_url}/assets/images/pillars/light.jpg",
        "pillar-nature.jpg": f"{base_url}/assets/images/pillars/nature.jpg",
        "pillar-materials.jpg": f"{base_url}/assets/images/pillars/materials.jpg",
        "pillar-sound.jpg": f"{base_url}/assets/images/pillars/sound.jpg",
        "pillar-energy.jpg": f"{base_url}/assets/images/pillars/energy.jpg",

        # Outdoor
        "outdoor-1.jpg": f"{base_url}/assets/images/outdoor-1.jpg",
        "outdoor-2.jpg": f"{base_url}/assets/images/outdoor-2.jpg",
        "outdoor-3.jpg": f"{base_url}/assets/images/outdoor-3.jpg",
        "outdoor-4.jpg": f"{base_url}/assets/images/outdoor-4.jpg",

        # Indoor
        "indoor-1.jpg": f"{base_url}/assets/images/indoor-1.jpg",
        "indoor-2.jpg": f"{base_url}/assets/images/indoor-2.jpg",
        "indoor-3.jpg": f"{base_url}/assets/images/indoor-3.jpg",
    }

    req_headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }

    for filename, url in images_to_download.items():
        out_path = os.path.join(target_dir, filename)
        try:
            req = urllib.request.Request(url, headers=req_headers)
            with urllib.request.urlopen(req, context=ctx, timeout=15) as resp:
                data = resp.read()
                with open(out_path, 'wb') as f:
                    f.write(data)
                print(f"[OK] Downloaded {filename} ({len(data)} bytes) from {url}")
        except Exception as e:
            print(f"[ERR] Failed to download {url}: {e}")

if __name__ == "__main__":
    download_images()
