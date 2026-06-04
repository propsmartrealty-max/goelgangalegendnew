import re
import os

article_page_path = "src/pages/ArticlePage.tsx"

if not os.path.exists(article_page_path):
    print(f"Error: {article_page_path} not found.")
    exit(1)

with open(article_page_path, "r", encoding="utf-8") as f:
    content = f.read()

# Define keyword mapping with brand-anchored anchor texts (specific/longer terms first)
link_mappings = [
    ("Goel Ganga Legend County Bavdhan 3BHK", "/3bhk-flats-bavdhan", "Goel Ganga Legend County Bavdhan 3BHK apartments"),
    ("Goel Ganga Legend County Bavdhan 4BHK", "/luxury-4bhk-flats-pune", "Goel Ganga Legend County Bavdhan 4BHK apartments"),
    ("Goel Ganga Legend County Bavdhan 3 BHK", "/3bhk-flats-bavdhan", "Goel Ganga Legend County Bavdhan 3 BHK flats"),
    ("Goel Ganga Legend County Bavdhan 4 BHK", "/luxury-4bhk-flats-pune", "Goel Ganga Legend County Bavdhan 4 BHK flats"),
    ("gated community luxury flats", "/luxury-projects-bavdhan", "Goel Ganga Legend County Bavdhan gated community luxury flats"),
    ("high-rise luxury apartments", "/luxury-projects-bavdhan", "Goel Ganga Legend County Bavdhan high-rise luxury apartments"),
    ("4 BHK premium apartments in Bavdhan", "/luxury-4bhk-flats-pune", "Goel Ganga Legend County Bavdhan premium 4 BHK apartments"),
    ("Bavdhan luxury apartments near Hinjewadi", "/investment-flats-bavdhan-pune", "Goel Ganga Legend County Bavdhan luxury apartments near Hinjewadi IT Park"),
    ("spacious 3 BHK apartments Bavdhan", "/3bhk-flats-bavdhan", "Goel Ganga Legend County Bavdhan spacious 3 BHK apartments"),
    ("3 BHK luxury flats in Bavdhan", "/3bhk-flats-bavdhan", "Goel Ganga Legend County Bavdhan luxury 3 BHK flats"),
    ("luxury 3 BHK flats in Bavdhan", "/3bhk-flats-bavdhan", "Goel Ganga Legend County Bavdhan luxury 3 BHK flats"),
    ("luxury 4 BHK flats in Bavdhan", "/luxury-4bhk-flats-pune", "Goel Ganga Legend County Bavdhan luxury 4 BHK flats"),
    ("luxury homes near Chandani Chowk", "/luxury-apartments-chandni-chowk", "Goel Ganga Legend County Bavdhan luxury homes near Chandni Chowk"),
    ("new luxury projects in Bavdhan", "/luxury-projects-bavdhan", "Goel Ganga Legend County Bavdhan new luxury projects"),
    ("premium flats near Kothrud", "/luxury-flats-kothrud-vs-bavdhan-pune", "Goel Ganga Legend County Bavdhan premium flats near Kothrud"),
    ("luxury 4 BHK flats in Pune", "/luxury-4bhk-flats-pune", "Goel Ganga Legend County Bavdhan Luxury 4 BHK flats"),
    ("combined 4 BHK apartments", "/luxury-4bhk-flats-pune", "Goel Ganga Legend County Bavdhan combined 4 BHK apartments"),
    ("4 BHK flats in Bavdhan", "/luxury-4bhk-flats-pune", "Goel Ganga Legend County Bavdhan 4 BHK flats"),
    ("3.5 BHK flats in Bavdhan", "/3.5-bhk-flats-bavdhan", "Goel Ganga Legend County Bavdhan 3.5 BHK flats"),
    ("3 BHK flats in Bavdhan", "/3bhk-flats-bavdhan", "Goel Ganga Legend County Bavdhan 3 BHK flats"),
    ("2 BHK flats in Bavdhan", "/2bhk-flats-bavdhan-pune", "Goel Ganga Legend County Bavdhan 2 BHK flats"),
    ("luxury duplex homes", "/luxury-4bhk-flats-pune", "Goel Ganga Legend County Bavdhan luxury duplex homes"),
    ("luxury projects in Bavdhan", "/luxury-projects-bavdhan", "Goel Ganga Legend County Bavdhan luxury projects"),
    ("investment in Bavdhan", "/investment-flats-bavdhan-pune", "Goel Ganga Legend County Bavdhan real estate investment"),
    ("schools and hospitals", "/schools-hospitals-near-bavdhan", "Goel Ganga Legend County Bavdhan schools and hospitals"),
    ("schools & hospitals", "/schools-hospitals-near-bavdhan", "Goel Ganga Legend County Bavdhan schools & hospitals"),
    ("RERA compliance", "/rera-legal-compliance-bavdhan", "Goel Ganga Legend County Bavdhan RERA compliance"),
    ("RERA registered", "/rera-legal-compliance-bavdhan", "Goel Ganga Legend County Bavdhan RERA registered"),
    ("Michael Phelps Swimming", "/michael-phelps-swimming-pune", "Goel Ganga Legend County Bavdhan Michael Phelps Swimming Academy"),
    ("Tagda Raho Dhoni", "/tagda-raho-dhoni-pune", "Goel Ganga Legend County Bavdhan Tagda Raho by Dhoni"),
    ("Kharadi vs Bavdhan", "/luxury-flats-kharadi-vs-bavdhan-pune", "Goel Ganga Legend County Bavdhan comparison to Kharadi"),
    ("Koregaon Park vs Bavdhan", "/luxury-homes-koregaon-park-vs-bavdhan", "Goel Ganga Legend County Bavdhan comparison to Koregaon Park"),
    ("Baner vs Bavdhan", "/luxury-apartments-baner-vs-bavdhan", "Goel Ganga Legend County Bavdhan comparison to Baner"),
    ("Kothrud vs Bavdhan", "/luxury-flats-kothrud-vs-bavdhan-pune", "Goel Ganga Legend County Bavdhan comparison to Kothrud"),
    ("sports township", "/sports-township-pune", "Goel Ganga Legend County Bavdhan sports township"),
    ("Stadium Life", "/sports-township-pune-stadium-life", "Goel Ganga Legend County Bavdhan Stadium Life"),
    ("Chandni Chowk", "/luxury-apartments-chandni-chowk", "Goel Ganga Legend County Bavdhan apartments near Chandni Chowk"),
    ("Baner Pashan Link Road", "/luxury-real-estate-baner-pashan-link-road", "Goel Ganga Legend County Bavdhan Baner Pashan Link Road guide"),
    ("West Pune Real Estate Market", "/west-pune-real-estate-market", "Goel Ganga Legend County Bavdhan West Pune real estate market"),
    ("Pune Real Estate Market", "/pune-real-estate-market", "Goel Ganga Legend County Bavdhan Pune real estate market")
]

# Function to replace keywords in a block of text safely (only if not already inside an anchor tag)
def safe_replace(text):
    pattern = r'(<a\b[^>]*>.*?</a>)'
    parts = re.split(pattern, text, flags=re.IGNORECASE)
    
    # Process parts that are NOT anchor tags
    for i in range(len(parts)):
        if i % 2 == 0:
            for keyword, route, anchor_text in link_mappings:
                regex = rf'(?<!/)(?<!">)\b{re.escape(keyword)}\b'
                match = re.search(regex, parts[i], re.IGNORECASE)
                if match:
                    link_html = f'<a href="{route}">{anchor_text}</a>'
                    parts[i] = re.sub(regex, link_html, parts[i], count=1, flags=re.IGNORECASE)
                    break
                    
    return "".join(parts)

# Find all content blocks in ArticlePage.tsx (which are defined as content: `...`)
content_blocks = re.findall(r'(content:\s*`([\s\S]*?)`)', content)
print(f"Found {len(content_blocks)} articles content blocks to enrich.")

modified_content = content
for full_block, block_text in content_blocks:
    # Pre-clean: strip existing internal links to prevent duplicate tag errors
    block_text_clean = re.sub(r'<a href="(/[^"]+)">(.*?)</a>', r'\2', block_text)
    
    enriched_block_text = safe_replace(block_text_clean)
    new_block = f"content: `{enriched_block_text}`"
    modified_content = modified_content.replace(full_block, new_block)

with open(article_page_path, "w", encoding="utf-8") as f:
    f.write(modified_content)

print("ArticlePage.tsx enriched with brand-anchored contextual internal links successfully!")
