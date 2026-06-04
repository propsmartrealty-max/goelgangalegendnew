import re
import os

article_page_path = "src/pages/ArticlePage.tsx"

if not os.path.exists(article_page_path):
    print(f"Error: {article_page_path} not found.")
    exit(1)

with open(article_page_path, "r", encoding="utf-8") as f:
    content = f.read()

# Define keyword mapping
# Ordered by specificity (longer keywords first) to avoid partial matching conflicts
link_mappings = [
    ("Baner Pashan Link Road", "/luxury-real-estate-baner-pashan-link-road"),
    ("West Pune Real Estate Market", "/west-pune-real-estate-market"),
    ("Pune Real Estate Market", "/pune-real-estate-market"),
    ("3.5 BHK flats in Bavdhan", "/3.5-bhk-flats-bavdhan"),
    ("3 BHK flats in Bavdhan", "/3bhk-flats-bavdhan"),
    ("2 BHK flats in Bavdhan", "/2bhk-flats-bavdhan-pune"),
    ("luxury projects in Bavdhan", "/luxury-projects-bavdhan"),
    ("investment in Bavdhan", "/investment-flats-bavdhan-pune"),
    ("schools and hospitals", "/schools-hospitals-near-bavdhan"),
    ("schools & hospitals", "/schools-hospitals-near-bavdhan"),
    ("RERA compliance", "/rera-legal-compliance-bavdhan"),
    ("RERA registered", "/rera-legal-compliance-bavdhan"),
    ("Michael Phelps Swimming", "/michael-phelps-swimming-pune"),
    ("Tagda Raho Dhoni", "/tagda-raho-dhoni-pune"),
    ("Kharadi vs Bavdhan", "/luxury-flats-kharadi-vs-bavdhan-pune"),
    ("Koregaon Park vs Bavdhan", "/luxury-homes-koregaon-park-vs-bavdhan"),
    ("Baner vs Bavdhan", "/luxury-apartments-baner-vs-bavdhan"),
    ("Kothrud vs Bavdhan", "/luxury-flats-kothrud-vs-bavdhan-pune"),
    ("sports township", "/sports-township-pune"),
    ("Stadium Life", "/sports-township-pune-stadium-life"),
    ("Chandni Chowk", "/luxury-apartments-chandni-chowk")
]

# Function to replace keywords in a block of text safely (only if not already inside an anchor tag)
def safe_replace(text):
    # Split text into parts outside and inside anchor tags
    # We find all <a>...</a> blocks
    pattern = r'(<a\b[^>]*>.*?</a>)'
    parts = re.split(pattern, text, flags=re.IGNORECASE)
    
    # Process parts that are NOT anchor tags
    for i in range(len(parts)):
        # Even indices are outside anchor tags, odd indices are inside
        if i % 2 == 0:
            for keyword, route in link_mappings:
                # We want to replace the first occurrence of each keyword in this text segment
                # and make sure it is not part of another word. Let's use word boundaries.
                # Since we might have HTML tags like <strong>, we handle boundaries carefully.
                regex = rf'(?<!/)(?<!">)\b{re.escape(keyword)}\b'
                # Find if the keyword is present
                match = re.search(regex, parts[i])
                if match:
                    # Let's replace the first match only
                    link_html = f'<a href="{route}">{keyword}</a>'
                    parts[i] = re.sub(regex, link_html, parts[i], count=1)
                    # Once a keyword is linked in this segment, we don't link it again in the same segment
                    break
                    
    return "".join(parts)

# Find all content blocks in ArticlePage.tsx (which are defined as content: `...`)
# We find content: `[\s\S]*?`
content_blocks = re.findall(r'(content:\s*`([\s\S]*?)`)', content)
print(f"Found {len(content_blocks)} articles content blocks to enrich.")

modified_content = content
for full_block, block_text in content_blocks:
    enriched_block_text = safe_replace(block_text)
    new_block = f"content: `{enriched_block_text}`"
    modified_content = modified_content.replace(full_block, new_block)

with open(article_page_path, "w", encoding="utf-8") as f:
    f.write(modified_content)

print("ArticlePage.tsx enriched with contextual internal linking successfully!")
