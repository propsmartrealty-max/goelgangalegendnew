import re
import os
import sys

# Define all valid slugs
VALID_SILOS = {
    'goel-ganga-legend-county-3bhk-flats-bavdhan',
    'goel-ganga-legend-county-2bhk-flats-bavdhan-pune',
    'goel-ganga-legend-county-luxury-projects-bavdhan',
    'goel-ganga-legend-county-investment-flats-bavdhan-pune',
    'goel-ganga-legend-county-sports-township-pune',
    'goel-ganga-legend-county-luxury-apartments-chandni-chowk',
    'goel-ganga-legend-county-michael-phelps-swimming-pune',
    'goel-ganga-legend-county-tagda-raho-dhoni-pune',
    'goel-ganga-legend-county-3.5-bhk-flats-bavdhan',
    'goel-ganga-legend-county-schools-hospitals-near-bavdhan',
    'goel-ganga-legend-county-rera-legal-compliance-bavdhan',
    'goel-ganga-legend-county-pune-real-estate-market',
    'goel-ganga-legend-county-west-pune-real-estate-market',
    'goel-ganga-legend-county-luxury-real-estate-baner-pashan-link-road',
    'goel-ganga-legend-county-luxury-flats-kharadi-vs-bavdhan-pune',
    'goel-ganga-legend-county-luxury-homes-koregaon-park-vs-bavdhan',
    'goel-ganga-legend-county-luxury-apartments-baner-vs-bavdhan',
    'goel-ganga-legend-county-luxury-flats-kothrud-vs-bavdhan-pune',
    'goel-ganga-legend-county-luxury-3bhk-flats-pune',
    'goel-ganga-legend-county-best-investment-property-pune',
    'goel-ganga-legend-county-sports-township-pune-stadium-life',
    'goel-ganga-legend-county-luxury-4bhk-flats-pune',
    'goel-ganga-legend-county-luxury-5bhk-duplex-penthouse-flats-pune',
    'goel-ganga-legend-county-luxury-residences-pune-west'
}

VALID_INSIGHTS = {
    'goel-ganga-legend-county-bavdhan-real-estate-investment-2026',
    'goel-ganga-legend-county-cost-of-living-bavdhan-pune',
    'goel-ganga-legend-county-bavdhan-vs-hinjewadi-real-estate',
    'goel-ganga-legend-county-roi-sports-townships-pune',
    'goel-ganga-legend-county-baner-pashan-link-road-real-estate-guide',
    'goel-ganga-legend-county-pune-luxury-real-estate-demographics-2026',
    'goel-ganga-legend-county-pune-metro-line-3-bavdhan-connector',
    'goel-ganga-legend-county-post-chandni-chowk-traffic-index-bavdhan',
    'goel-ganga-legend-county-top-international-schools-pune-west-bavdhan',
    'goel-ganga-legend-county-bavdhan-to-hinjewadi-it-park-commute-guide'
}

VALID_HASHES = {'#about', '#amenities', '#floor-plans', '#location', '#contact'}

def check_html_tags(text, context=""):
    errors = []
    
    # Check for simple links
    links = re.findall(r'href=["\']([^"\']+)["\']', text)
    for link in links:
        if link.startswith('/insights/'):
            slug = link.replace('/insights/', '')
            if slug not in VALID_INSIGHTS:
                errors.append(f"Invalid insights link: '{link}' in {context}")
        elif link.startswith('/'):
            slug = link.lstrip('/')
            if slug and slug not in VALID_SILOS:
                errors.append(f"Invalid silo link: '{link}' in {context}")
        elif link.startswith('#'):
            if link not in VALID_HASHES:
                errors.append(f"Invalid anchor link: '{link}' in {context}")
        elif link.startswith('mailto:') or link.startswith('tel:') or link.startswith('https://') or link.startswith('http://'):
            pass
        else:
            errors.append(f"Suspicious relative link format: '{link}' in {context}")
            
    # Check tag pairings for standard formatting inline and block elements
    # Since texts might have nested HTML, let's count tags carefully
    for tag in ['strong', 'em', 'a', 'p', 'h2', 'li', 'ul', 'ol', 'table', 'tr', 'td', 'th', 'blockquote']:
        open_count = len(re.findall(rf'<{tag}\b', text))
        close_count = len(re.findall(rf'</{tag}>', text))
        if open_count != close_count:
            errors.append(f"Mismatched tag <{tag}>: opened {open_count} times, closed {close_count} times in {context}")
            
    # Check RERA formatting: P52100054578
    reras = re.findall(r'P521000\d{5}', text)
    for rera in reras:
        if rera != 'P52100054578':
            errors.append(f"Incorrect RERA number: '{rera}' in {context}")
            
    return errors

def validate_silo_data():
    errors = []
    silo_data_path = "src/data/siloData.ts"
    if not os.path.exists(silo_data_path):
        print(f"Error: {silo_data_path} not found.")
        return 1
        
    with open(silo_data_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    # Find all keys under export const siloData = { ... }
    # Silos are '3bhk-flats-bavdhan': { slug: '...', heading: '...', ... }
    matches = re.finditer(r'[\'"]?([a-zA-Z0-9\.\-_]+)[\'"]?:\s*\{\s*slug:\s*\'([^\']+)\',', content)
    silos_found = 0
    
    for match in matches:
        silos_found += 1
        key = match.group(1)
        slug = match.group(2)
        
        if slug not in VALID_SILOS:
            errors.append(f"Silo key '{key}' has unregistered slug '{slug}' in siloData.ts")
            
        # Parse the block between this key and next key (or end of object)
        start_idx = match.start()
        # Find next block or end
        next_match = re.search(r'\n\s*(\w+):\s*\{\s*slug:', content[start_idx+1:])
        block_end = len(content) if not next_match else start_idx + 1 + next_match.start()
        block_text = content[start_idx:block_end]
        
        # Check content paragraph strings
        paragraphs = re.findall(r'content:\s*\[([\s\S]*?)\],', block_text)
        for block_p in paragraphs:
            # Match strings inside quotes
            p_strings = re.findall(r'\'([^\']+)\'', block_p)
            for i, p_str in enumerate(p_strings):
                p_errors = check_html_tags(p_str, f"Silo {slug} -> Content Para {i+1}")
                errors.extend(p_errors)
                
        # Check FAQs
        faq_blocks = re.findall(r'faq:\s*\[([\s\S]*?)\]', block_text)
        for faq_b in faq_blocks:
            faqs = re.findall(r'\{\s*question:\s*\"([^\"]+)\",\s*answer:\s*\"([^\"]+)\"\s*\}', faq_b)
            for i, (q, a) in enumerate(faqs):
                a_errors = check_html_tags(a, f"Silo {slug} -> FAQ {i+1} answer")
                errors.extend(a_errors)
                
    print(f"Parsed {silos_found} silos in siloData.ts")
    return errors

def validate_article_page():
    errors = []
    article_page_path = "src/pages/ArticlePage.tsx"
    if not os.path.exists(article_page_path):
        print(f"Error: {article_page_path} not found.")
        return 1
        
    with open(article_page_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    # Find all articlesData blocks
    articles = re.findall(r'\'([^\']+)\':\s*\{\s*title:[\s\S]*?content:\s*`([\s\S]*?)`\s*\}', content)
    print(f"Found {len(articles)} article definitions in ArticlePage.tsx")
    
    for slug, article_content in articles:
        if slug not in VALID_INSIGHTS:
            errors.append(f"Article has unregistered slug '{slug}' in ArticlePage.tsx")
            
        html_errors = check_html_tags(article_content, f"Article {slug}")
        errors.extend(html_errors)
        
    return errors

if __name__ == '__main__':
    print("Starting Deep Data Hardening Validation...")
    silo_errors = validate_silo_data()
    article_errors = validate_article_page()
    
    all_errors = silo_errors + article_errors
    if all_errors:
        print("\n--- VALIDATION ERRORS FOUND ---")
        for err in all_errors:
            print(f"[ERROR] {err}")
        sys.exit(1)
    else:
        print("\n--- VALIDATION PASSED SUCCESSFULLY ---")
        print("All HTML tags are properly paired, RERA numbers match, and internal links are 100% correct.")
        sys.exit(0)
