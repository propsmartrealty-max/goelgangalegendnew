import os
import re

def clean_file(file_path):
    print(f"Cleaning: {file_path}")
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Step 1: Strip all <a> tags, leaving the text content inside them intact.
    # Matches <a href="...">Text</a> or <a href=\"...\">Text</a>
    cleaned = re.sub(r'<a\b[^>]*>(.*?)</a>', r'\1', content)

    # Step 2: Loop to continuously deduplicate adjacent and nearby repeating patterns
    old_len = 0
    iteration = 0
    while len(cleaned) != old_len and iteration < 20:
        old_len = len(cleaned)
        iteration += 1
        
        # A. Deduplicate adjacent exact repeats of "Goel Ganga Legend County Bavdhan"
        cleaned = re.sub(
            r'(Goel Ganga Legend County Bavdhan)\s+(Goel Ganga Legend County Bavdhan)',
            r'\1',
            cleaned,
            flags=re.IGNORECASE
        )
        
        # B. Deduplicate adjacent exact repeats of "Ganga Legend County"
        cleaned = re.sub(
            r'(Ganga Legend County)\s+(Ganga Legend County)',
            r'\1',
            cleaned,
            flags=re.IGNORECASE
        )
        
        # C. Deduplicate repeats of "Goel Ganga Legend County Bavdhan apartments near"
        cleaned = re.sub(
            r'(Goel Ganga Legend County Bavdhan apartments near)\s+(Goel Ganga Legend County Bavdhan apartments near)',
            r'\1',
            cleaned,
            flags=re.IGNORECASE
        )
        
        # D. Deduplicate repeats of "Goel Ganga Legend County Bavdhan schools and hospitals"
        cleaned = re.sub(
            r'(Goel Ganga Legend County Bavdhan schools and hospitals)\s+(Goel Ganga Legend County Bavdhan schools and hospitals)',
            r'\1',
            cleaned,
            flags=re.IGNORECASE
        )
        
        # E. Deduplicate consecutive "Academy"
        cleaned = re.sub(
            r'\b(Academy)\b(?:\s+\b\1\b)+',
            r'\1',
            cleaned,
            flags=re.IGNORECASE
        )
        
        # F. Deduplicate consecutive "apartments near"
        cleaned = re.sub(
            r'\b(apartments near)\b(?:\s+\b\1\b)+',
            r'\1',
            cleaned,
            flags=re.IGNORECASE
        )

        # G. Clean up specific weird leftovers like "Goel Ganga Legend County Bavdhan Goel Ganga Legend County Bavdhan"
        cleaned = re.sub(
            r'Goel Ganga Legend County Bavdhan\s+Goel Ganga Legend County Bavdhan',
            'Goel Ganga Legend County Bavdhan',
            cleaned,
            flags=re.IGNORECASE
        )

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(cleaned)
    print(f"Cleaned {file_path} in {iteration} iterations.")

def main():
    silo_path = "src/data/siloData.ts"
    article_path = "src/pages/ArticlePage.tsx"
    
    clean_file(silo_path)
    clean_file(article_path)

if __name__ == "__main__":
    main()
