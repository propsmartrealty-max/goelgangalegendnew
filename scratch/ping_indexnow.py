import requests
import json

from index_legend import SITE_URLS

data = {
    "host": "goelgangalegend.com",
    "key": "76ac4b2ed3bea703a08b1ccfca84ed3bea703a08b1ccfca84",
    "keyLocation": "https://goelgangalegend.com/76ac4b2ed3bea703a08b1ccfca84ed3bea703a08b1ccfca84.txt",
    "urlList": SITE_URLS
}

print("Pinging IndexNow (Bing/Yandex)...")
try:
    response = requests.post("https://api.indexnow.org/indexnow", json=data, timeout=10)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"IndexNow failed: {e}")
