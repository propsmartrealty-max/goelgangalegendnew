import requests
import sys

def ping_sitemaps():
    sitemap_url = "https://goelgangalegend.com/sitemap.xml"
    
    # We can ping Ask.com which supports XML sitemap pings
    endpoints = [
        ("Ask.com", f"http://submissions.ask.com/ping?sitemap={sitemap_url}"),
    ]
    
    print("Notifying alternative search engines of sitemap update...")
    
    for name, url in endpoints:
        try:
            response = requests.get(url, timeout=10)
            print(f"Pinging {name}: {response.status_code}")
        except Exception as e:
            print(f"Failed to ping {name}: {e}")

if __name__ == "__main__":
    ping_sitemaps()
