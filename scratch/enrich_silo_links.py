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

# Define keyword mapping
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
    
    # We want to parse the array of strings and enrich them
    p_strings = re.findall(r'\'((?:[^\'\\]|\\.)*)\'', content_array_str)
    
    # Track routes we have already linked in this silo to avoid duplicate routing
    linked_routes = set()
    
    # Also find existing links in the content strings
    for p_str in p_strings:
        links_found = re.findall(r'href="([^"]+)"', p_str)
        for link in links_found:
            linked_routes.add(link)
            
    # Also, we never link to our own self-slug
    linked_routes.add(f"/{slug}")
    
    new_p_strings = []
    for p_str in p_strings:
        p_clean = p_str
        
        # Split text into parts inside/outside existing anchor tags to avoid double nesting
        pattern = r'(<a\b[^>]*>.*?</a>)'
        parts = re.split(pattern, p_clean, flags=re.IGNORECASE)
        
        for i in range(len(parts)):
            if i % 2 == 0:  # Outside anchor tags
                # Try to link keywords
                for keyword, route in link_mappings:
                    if route in linked_routes:
                        continue
                    
                    # Exact or word boundary match (case insensitive, handle boundaries carefully)
                    regex = rf'(?<!/)(?<!">)\b{re.escape(keyword)}\b'
                    match = re.search(regex, parts[i], re.IGNORECASE)
                    if match:
                        matched_text = match.group(0)
                        link_html = f'<a href="{route}">{matched_text}</a>'
                        parts[i] = re.sub(regex, link_html, parts[i], count=1, flags=re.IGNORECASE)
                        linked_routes.add(route)
                        # We break here to only link one keyword per segment or per search
                        break
        
        new_p_strings.append("".join(parts))
        
    # Construct the new content array string
    new_content_array_str = "[\n      " + ",\n      ".join(f"'{p}'" for p in new_p_strings) + "\n    ]"
    
    updated_block = block_text.replace(content_array_str, new_content_array_str)
    content = content.replace(block_text, updated_block)

with open(silo_path, "w", encoding="utf-8") as f:
    f.write(content)

print("siloData.ts enriched with internal links successfully!")
