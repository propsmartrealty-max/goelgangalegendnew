import requests
from google.oauth2 import service_account
from google.auth.transport.requests import Request
import json
import os

# Configuration
ENDPOINT = "https://indexing.googleapis.com/v3/urlNotifications:publish"
JSON_KEY_FILE = "google-credentials.json" # User must provide this
SITE_URLS = [
    "https://goelgangalegend.com/",
    # Core Configurations & Infrastructure Silos
    "https://goelgangalegend.com/3bhk-flats-bavdhan",
    "https://goelgangalegend.com/2bhk-flats-bavdhan-pune",
    "https://goelgangalegend.com/luxury-projects-bavdhan",
    "https://goelgangalegend.com/investment-flats-bavdhan-pune",
    "https://goelgangalegend.com/sports-township-pune",
    "https://goelgangalegend.com/luxury-apartments-chandni-chowk",
    "https://goelgangalegend.com/michael-phelps-swimming-pune",
    "https://goelgangalegend.com/tagda-raho-dhoni-pune",
    "https://goelgangalegend.com/3.5-bhk-flats-bavdhan",
    "https://goelgangalegend.com/schools-hospitals-near-bavdhan",
    "https://goelgangalegend.com/rera-legal-compliance-bavdhan",
    
    # New Corridors and Comparative Silos
    "https://goelgangalegend.com/pune-real-estate-market",
    "https://goelgangalegend.com/west-pune-real-estate-market",
    "https://goelgangalegend.com/luxury-real-estate-baner-pashan-link-road",
    "https://goelgangalegend.com/luxury-flats-kharadi-vs-bavdhan-pune",
    "https://goelgangalegend.com/luxury-homes-koregaon-park-vs-bavdhan",
    "https://goelgangalegend.com/luxury-apartments-baner-vs-bavdhan",
    "https://goelgangalegend.com/luxury-flats-kothrud-vs-bavdhan-pune",
    "https://goelgangalegend.com/luxury-3bhk-flats-pune",
    "https://goelgangalegend.com/best-investment-property-pune",
    "https://goelgangalegend.com/sports-township-pune-stadium-life",
    "https://goelgangalegend.com/luxury-4bhk-flats-pune",
    
    # Insights Articles (MOFU Content)
    "https://goelgangalegend.com/insights/bavdhan-real-estate-investment-2026",
    "https://goelgangalegend.com/insights/cost-of-living-bavdhan-pune",
    "https://goelgangalegend.com/insights/bavdhan-vs-hinjewadi-real-estate",
    "https://goelgangalegend.com/insights/roi-sports-townships-pune",
    "https://goelgangalegend.com/insights/baner-pashan-link-road-real-estate-guide",
    "https://goelgangalegend.com/insights/pune-luxury-real-estate-demographics-2026",
    "https://goelgangalegend.com/insights/pune-metro-line-3-bavdhan-connector",
    "https://goelgangalegend.com/insights/post-chandni-chowk-traffic-index-bavdhan",
    "https://goelgangalegend.com/insights/top-international-schools-pune-west-bavdhan"
]

def get_access_token():
    if not os.path.exists(JSON_KEY_FILE):
        print(f"Error: {JSON_KEY_FILE} not found. Please upload service account credentials.")
        return None
    
    scopes = ["https://www.googleapis.com/auth/indexing"]
    credentials = service_account.Credentials.from_service_account_file(JSON_KEY_FILE, scopes=scopes)
    credentials.refresh(Request())
    return credentials.token

def index_urls():
    token = get_access_token()
    if not token:
        return

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {token}"
    }

    for url in SITE_URLS:
        body = {
            "url": url,
            "type": "URL_UPDATED"
        }
        try:
            response = requests.post(ENDPOINT, data=json.dumps(body), headers=headers, timeout=10)
            print(f"Indexing {url}: {response.status_code} - {response.text}")
        except requests.exceptions.RequestException as e:
            print(f"Failed to index {url} due to error: {e}")

if __name__ == "__main__":
    index_urls()
