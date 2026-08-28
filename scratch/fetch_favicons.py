import os
import urllib.request
import ssl

def fetch_favicons():
    base_url = "https://project.thelivingblueprint.com"
    target_dir = "/Users/vikasyewle/goelgangalegendcounty/public"
    
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE

    fav_files = {
        "favicon.png": f"{base_url}/assets/images/favicon.png",
        "favicon.ico": f"{base_url}/assets/images/favicon.png", # fallback
        "official-logo.png": f"{base_url}/assets/images/logo.png",
    }

    req_headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }

    for filename, url in fav_files.items():
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
    fetch_favicons()
