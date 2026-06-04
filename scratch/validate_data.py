import re
import os
import sys

# Define all valid slugs
VALID_SILOS = {
    '3bhk-flats-bavdhan',
    '2bhk-flats-bavdhan-pune',
    'luxury-projects-bavdhan',
    'investment-flats-bavdhan-pune',
    'sports-township-pune',
    'luxury-apartments-chandni-chowk',
    'michael-phelps-swimming-pune',
    'tagda-raho-dhoni-pune',
    '3.5-bhk-flats-bavdhan',
    'schools-hospitals-near-bavdhan',
    'rera-legal-compliance-bavdhan',
    'pune-real-estate-market',
    'west-pune-real-estate-market',
    'luxury-real-estate-baner-pashan-link-road',
    'luxury-flats-kharadi-vs-bavdhan-pune',
    'luxury-homes-koregaon-park-vs-bavdhan',
    'luxury-apartments-baner-vs-bavdhan',
    'luxury-flats-kothrud-vs-bavdhan-pune',
    'luxury-3bhk-flats-pune',
    'best-investment-property-pune',
    'sports-township-pune-stadium-life',
    'luxury-4bhk-flats-pune'
}

VALID_INSIGHTS = {
    'bavdhan-real-estate-investment-2026',
    'cost-of-living-bavdhan-pune',
    'bavdhan-vs-hinjewadi-real-estate',
    'roi-sports-townships-pune',
    'baner-pashan-link-road-real-estate-guide',
    'pune-luxury-real-estate-demographics-2026',
    'pune-metro-line-3-bavdhan-connector',
    'post-chandni-chowk-traffic-index-bavdhan',
    'top-international-schools-pune-west-bavdhan',
    'bavdhan-to-hinjewadi-it-park-commute-guide'
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
