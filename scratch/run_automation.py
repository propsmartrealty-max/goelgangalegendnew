import subprocess
import os
import sys

def run_script(script_name, ignore_errors=False):
    print(f"\n=========================================")
    print(f" Running: {script_name}")
    print(f"=========================================")
    try:
        # Run script using the current Python executable
        result = subprocess.run([sys.executable, f"scratch/{script_name}"], capture_output=True, text=True)
        print(result.stdout)
        if result.stderr:
            print("Errors/Warnings:", result.stderr)
        if result.returncode != 0 and not ignore_errors:
            print(f"Error: {script_name} failed with return code {result.returncode}")
            sys.exit(result.returncode)
    except Exception as e:
        print(f"Exception running {script_name}: {e}")
        if not ignore_errors:
            sys.exit(1)

def main():
    # 1. Validate data integrity
    run_script("validate_data.py")
    
    # 2. Regenerate RSS feed
    run_script("generate_rss.py")
    
    # 3. Search Engine Indexing (Bypassed if BYPASS_INDEXING=1 or running in a CI/CD Git webhook environment)
    is_ci = any(os.environ.get(x) for x in ["CI", "CF_PAGES", "GITHUB_ACTIONS"])
    if os.environ.get("BYPASS_INDEXING") == "1" or is_ci:
        print("\n=========================================")
        print(" [INFO] Bypassing Google and Bing Indexing (CI/CD Git Webhook or Manual Bypass active)")
        print("=========================================")
    else:
        # Ping Bing IndexNow (ignore network/CORS issues)
        run_script("ping_indexnow.py", ignore_errors=True)
        
        # Ping alternative search engines with sitemap
        run_script("ping_sitemaps.py", ignore_errors=True)
        
        # Google Indexing (Gracefully bypassed/ignored if 403 or unauthorized)
        print("\n=========================================")
        print(" Running Google Indexing API Submission")
        print("=========================================")
        try:
            result = subprocess.run([sys.executable, "scratch/index_legend.py"], capture_output=True, text=True)
            stdout = result.stdout
            print(stdout)
            if "429" in stdout or "Quota exceeded" in stdout:
                print("[INFO] Google Indexing: 429 Daily Quota Limit Exceeded. Gracefully bypassed Google indexing daily limits.")
            elif "403" in stdout or "PERMISSION_DENIED" in stdout:
                print("[INFO] Google Indexing: 403 PERMISSION_DENIED received. Bypassing Google indexing automatically.")
                print("[INFO] Please verify and add 'goelganga@eminent-bond-433313-m2.iam.gserviceaccount.com' as an Owner in your GSC Property.")
            elif result.returncode != 0:
                print(f"[WARNING] Google Indexing script failed with code {result.returncode}. Bypassed.")
            else:
                print("[SUCCESS] Google Indexing completed successfully.")
        except Exception as e:
            print(f"[WARNING] Bypassing Google indexing due to script error: {e}")

if __name__ == "__main__":
    main()
