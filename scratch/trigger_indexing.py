import urllib.request
import json
import os
import sys

# Trigger the GitHub Actions workflow via repository dispatch
def trigger_webhook():
    # Retrieve configuration from environment or prompt
    token = os.environ.get("GITHUB_TOKEN")
    repo = "vikasyewle-prog/goelgangalegend"
    
    if not token:
        print("[ERROR] GITHUB_TOKEN environment variable not set.")
        print("Please set it in your terminal:")
        print("  export GITHUB_TOKEN=\"your_github_personal_access_token\"")
        sys.exit(1)
        
    url = f"https://api.github.com/repos/{repo}/dispatches"
    
    headers = {
        "Accept": "application/vnd.github+json",
        "Authorization": f"Bearer {token}",
        "User-Agent": "Python-Urllib-Trigger-Script",
        "Content-Type": "application/json"
    }
    
    body = {
        "event_type": "trigger-indexing"
    }
    
    req = urllib.request.Request(
        url,
        data=json.dumps(body).encode('utf-8'),
        headers=headers,
        method="POST"
    )
    
    import ssl
    context = ssl._create_unverified_context()
    try:
        print(f"Sending webhook trigger to GitHub repository: {repo}...")
        with urllib.request.urlopen(req, context=context) as response:
            status = response.status
            if status == 204:
                print("✅ Success! Webhook trigger sent successfully. The GitHub Action workflow has started.")
            else:
                print(f"Response status: {status}")
    except Exception as e:
        print("❌ Error triggering webhook:", str(e))
        print("Please ensure your GITHUB_TOKEN has 'contents: read/write' and 'metadata' permissions.")
        sys.exit(1)

if __name__ == "__main__":
    trigger_webhook()
