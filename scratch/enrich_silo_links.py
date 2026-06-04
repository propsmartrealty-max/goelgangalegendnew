import os
import re

def find_matching_brace(text, start_idx):
    brace_count = 0
    in_single_quote = False
    in_double_quote = False
    in_template_literal = False
    
    i = start_idx
    while i < len(text):
        c = text[i]
        if i > 0 and text[i-1] == '\\':
            i += 1
            continue
            
        if c == "'" and not in_double_quote and not in_template_literal:
            in_single_quote = not in_single_quote
        elif c == '"' and not in_single_quote and not in_template_literal:
            in_double_quote = not in_double_quote
        elif c == '`' and not in_single_quote and not in_double_quote:
            in_template_literal = not in_template_literal
            
        if not in_single_quote and not in_double_quote and not in_template_literal:
            if c == '{':
                brace_count += 1
            elif c == '}':
                brace_count -= 1
                if brace_count == 0:
                    return i
        i += 1
    return -1

def find_matching_bracket(text, start_idx):
    bracket_count = 0
    in_single_quote = False
    in_double_quote = False
    in_template_literal = False
    
    i = start_idx
    while i < len(text):
        c = text[i]
        if i > 0 and text[i-1] == '\\':
            i += 1
            continue
            
        if c == "'" and not in_double_quote and not in_template_literal:
            in_single_quote = not in_single_quote
        elif c == '"' and not in_single_quote and not in_template_literal:
            in_double_quote = not in_double_quote
        elif c == '`' and not in_single_quote and not in_double_quote:
            in_template_literal = not in_template_literal
            
        if not in_single_quote and not in_double_quote and not in_template_literal:
            if c == '[':
                bracket_count += 1
            elif c == ']':
                bracket_count -= 1
                if bracket_count == 0:
                    return i
        i += 1
    return -1

silo_path = "src/data/siloData.ts"
if not os.path.exists(silo_path):
    print(f"Error: {silo_path} not found.")
    exit(1)

with open(silo_path, "r", encoding="utf-8") as f:
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

# Find all occurrences of keys: 'slug-name': {
matches = list(re.finditer(r'\'([a-zA-Z0-9\.\-_]+)\':\s*\{', content))

for idx, match in reversed(list(enumerate(matches))):
    slug = match.group(1)
    if slug == "main":
        continue
        
    start_idx = match.start()
    open_brace_idx = content.find('{', start_idx)
    close_brace_idx = find_matching_brace(content, open_brace_idx)
    
    if close_brace_idx == -1:
        continue
        
    block_text = content[start_idx:close_brace_idx+1]
    content_label_idx = block_text.find("content: [")
    if content_label_idx == -1:
        continue
        
    open_bracket_idx = block_text.find("[", content_label_idx)
    close_bracket_idx = find_matching_bracket(block_text, open_bracket_idx)
    if close_bracket_idx == -1:
        continue
        
    content_array_str = block_text[open_bracket_idx:close_bracket_idx+1]
    
    p_strings = re.findall(r'\'((?:[^\'\\]|\\.)*)\'', content_array_str)
    
    # Pre-clean: strip existing internal links to prevent duplicate tag errors
    p_strings_clean = []
    for p_str in p_strings:
        p_clean = re.sub(r'<a href="(/[^"]+)">(.*?)</a>', r'\2', p_str)
        p_strings_clean.append(p_clean)
    
    # Track routes we have already linked in this silo to avoid duplicate routing
    linked_routes = set()
    linked_routes.add(f"/{slug}")
    
    new_p_strings = []
    for p_clean in p_strings_clean:
        pattern = r'(<a\b[^>]*>.*?</a>)'
        parts = re.split(pattern, p_clean, flags=re.IGNORECASE)
        
        for i in range(len(parts)):
            if i % 2 == 0:  # Outside anchor tags
                # Try to link keywords
                for keyword, route, anchor_text in link_mappings:
                    if route in linked_routes:
                        continue
                    
                    # Exact or word boundary match
                    regex = rf'(?<!/)(?<!">)\b{re.escape(keyword)}\b'
                    match = re.search(regex, parts[i], re.IGNORECASE)
                    if match:
                        link_html = f'<a href="{route}">{anchor_text}</a>'
                        parts[i] = re.sub(regex, link_html, parts[i], count=1, flags=re.IGNORECASE)
                        linked_routes.add(route)
                        break
        
        new_p_strings.append("".join(parts))
        
    # Construct the new content array string
    new_content_array_str = "[\n      " + ",\n      ".join(f"'{p}'" for p in new_p_strings) + "\n    ]"
    
    updated_block = block_text.replace(content_array_str, new_content_array_str)
    content = content.replace(block_text, updated_block)

with open(silo_path, "w", encoding="utf-8") as f:
    f.write(content)

print("siloData.ts enriched with brand-anchored internal links successfully!")
