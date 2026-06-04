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

def refine_silos():
    silo_path = "src/data/siloData.ts"
    if not os.path.exists(silo_path):
        print(f"Error: {silo_path} not found.")
        return

    with open(silo_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Highly-optimized, 248-word paragraph to append to get word count past 800-1,000+ words
    para_addition = (
        "Beyond the elite sports infrastructure, Goel Ganga Legend County Bavdhan is planned to offer a self-sustaining luxury lifestyle for modern families. "
        "The secure gated estate features a state-of-the-art multi-level clubhouse, a fully equipped health gymnasium, indoor games rooms, children\\'s play zones, "
        "dedicated senior citizen pavilions, and landscaped reflexology pathways. Ecological responsibility is engineered directly into the project layout, "
        "incorporating high-efficiency rainwater harvesting networks, organic waste treatment converters, solar-powered common area lighting, and modern sewage treatment facilities. "
        "Unlike many standalone projects in West Pune that face water security issues, this 30-acre planned development benefits from PMC municipal water supply connections alongside "
        "independent filtration systems. Strategically located just off the Mumbai-Bangalore Highway bypass, the project offers unparalleled transit benefits, "
        "reducing daily commute times to the Rajiv Gandhi Infotech Park in Hinjewadi to under 20 minutes, while Baner and Wakad office hubs are accessible within 15 minutes. "
        "To guarantee absolute legal trust and transparency, the entire development is fully registered under MahaRERA number P52100054578, with pre-approved home loan lines "
        "from leading national banks including SBI, HDFC, and ICICI. This clean legal status, combined with premium sports amenities and proximity to Ryan International School "
        "and Chellaram Hospital, ensures Ganga Legend County stands as a highly stable, high-yield investment asset yielding up to 4.2% in rental income while promising long-term "
        "capital appreciation in Pune\\'s primary future growth corridor."
    )

    # 1. First, correct the two descriptions that are too long
    # sports-township-pune
    old_sports_desc = "description: 'Experience Pune\\'s premier sports-first township. Legend County in Bavdhan features 9+ international sports academies including Michael Phelps Swimming and Tagda Raho by Dhoni.',"
    new_sports_desc = "description: 'Experience the premier sports township in Bavdhan, Pune. Goel Ganga Legend County features Dhoni\\'s Tagda Raho and Michael Phelps Swimming Academy.',"
    if old_sports_desc in content:
        content = content.replace(old_sports_desc, new_sports_desc)
    else:
        # Fallback regex replace for sports description
        content = re.sub(r"description:\s*'Experience Pune\\'s premier sports-first township\..*?Tagda Raho by Dhoni\.',", new_sports_desc, content)

    # luxury-real-estate-baner-pashan-link-road
    old_baner_desc = "description: 'Find the best luxury real estate in Baner Pashan Link Road market. Compare high-end residential prices and congestion with Ganga Legend County\\'s 30-acre sports sanctuary.',"
    new_baner_desc = "description: 'Explore luxury real estate on Baner Pashan Link Road. Compare high-end prices and congestion with Ganga Legend County\\'s premium sports sanctuary.',"
    if old_baner_desc in content:
        content = content.replace(old_baner_desc, new_baner_desc)
    else:
        # Fallback regex replace for baner description
        content = re.sub(r"description:\s*'Find the best luxury real estate in Baner Pashan Link Road market\..*?sports sanctuary\.',", new_baner_desc, content)

    # 2. Iterate and expand content lists using bracket parsing
    # Find all occurrences of keys: 'slug-name': {
    matches = list(re.finditer(r'\'([a-zA-Z0-9\.\-_]+)\':\s*\{', content))
    
    for idx, match in reversed(list(enumerate(matches))):
        slug = match.group(1)
        if slug == "main":
            continue
            
        start_idx = match.start()
        # Find matching closing brace of the silo object
        open_brace_idx = content.find('{', start_idx)
        close_brace_idx = find_matching_brace(content, open_brace_idx)
        
        if close_brace_idx == -1:
            print(f"Warning: Could not find closing brace for silo '{slug}'")
            continue
            
        block_text = content[start_idx:close_brace_idx+1]
        
        # Locate content list: content: [
        content_label_idx = block_text.find("content: [")
        if content_label_idx == -1:
            continue
            
        open_bracket_idx = block_text.find("[", content_label_idx)
        close_bracket_idx = find_matching_bracket(block_text, open_bracket_idx)
        
        if close_bracket_idx == -1:
            print(f"Warning: Could not find closing bracket in silo '{slug}'")
            continue
            
        content_array_str = block_text[open_bracket_idx:close_bracket_idx+1]
        
        # Check if our new paragraph is already in the array
        if "Beyond the elite sports infrastructure, Goel Ganga Legend County Bavdhan" not in content_array_str:
            # Append the new paragraph inside the bracket
            new_content_array_str = content_array_str.rstrip().rstrip("]").rstrip().rstrip(",") + ",\n      '" + para_addition + "'\n    ]"
            updated_block = block_text.replace(content_array_str, new_content_array_str)
            content = content.replace(block_text, updated_block)
            block_text = updated_block

        # If it is one of the low word-count silos, append the final closing paragraph to cross the 800-word mark
        if slug in ['sports-township-pune', 'michael-phelps-swimming-pune', 'tagda-raho-dhoni-pune', 'schools-hospitals-near-bavdhan', 'rera-legal-compliance-bavdhan', 'sports-township-pune-stadium-life', 'luxury-apartments-chandni-chowk']:
            para_final = (
                "Our customer relationship office is open daily for walkthrough sessions, show apartment inspections, and layout counseling. "
                "Contact our team today to view available inventory charts, download complete pricing models, check configuration floor plans, "
                "and receive active payment schemes tailored specifically for your investment budget. "
                "We look forward to welcoming you to the Legend County sports sanctuary."
            )
            # Re-read bracket string in block_text in case it was updated above
            content_label_idx = block_text.find("content: [")
            open_bracket_idx = block_text.find("[", content_label_idx)
            close_bracket_idx = find_matching_bracket(block_text, open_bracket_idx)
            content_array_str_current = block_text[open_bracket_idx:close_bracket_idx+1]
            
            if "Our customer relationship office is open daily" not in content_array_str_current:
                new_content_array_str = content_array_str_current.rstrip().rstrip("]").rstrip().rstrip(",") + ",\n      '" + para_final + "'\n    ]"
                updated_block = block_text.replace(content_array_str_current, new_content_array_str)
                content = content.replace(block_text, updated_block)

    with open(silo_path, "w", encoding="utf-8") as f:
        f.write(content)

    print("Silo content & description refinement complete.")

def refine_articles():
    article_path = "src/pages/ArticlePage.tsx"
    if not os.path.exists(article_path):
        print(f"Error: {article_path} not found.")
        return

    with open(article_path, "r", encoding="utf-8") as f:
        content = f.read()

    # RERA statement to add to articles for compliance verification
    rera_text = (
        "\\n\\n<h2>MahaRERA Registration & Legal Trust</h2>\\n"
        "<p>To ensure total transparency, Goel Ganga Legend County Bavdhan is registered under MahaRERA number <strong>P52100054578</strong>. "
        "Sanctioned plans and title clearances can be verified directly on the MahaRERA portal, giving buyers absolute peace of mind.</p>"
    )

    # Find matches of 'slug': {
    matches = list(re.finditer(r'\'([a-zA-Z0-9\.\-_]+)\':\s*\{', content))
    
    for idx, match in reversed(list(enumerate(matches))):
        slug = match.group(1)
        if slug == "main":
            continue
            
        start_idx = match.start()
        open_brace_idx = content.find('{', start_idx)
        close_brace_idx = find_matching_brace(content, open_brace_idx)
        
        if close_brace_idx == -1:
            print(f"Warning: Could not find closing brace for article '{slug}'")
            continue
            
        block_text = content[start_idx:close_brace_idx+1]

        # Locate backtick content template: content: `...`
        content_label_idx = block_text.find("content: `")
        if content_label_idx == -1:
            continue
            
        open_backtick_idx = block_text.find("`", content_label_idx)
        # Find matching backtick (handling escaped ones)
        close_backtick_idx = -1
        i = open_backtick_idx + 1
        while i < len(block_text):
            if block_text[i] == '`' and block_text[i-1] != '\\':
                close_backtick_idx = i
                break
            i += 1
            
        if close_backtick_idx == -1:
            print(f"Warning: Could not find closing backtick for article '{slug}'")
            continue
            
        article_body_str = block_text[open_backtick_idx:close_backtick_idx+1]

        # Check if RERA number is already inside the article content
        if "P52100054578" not in article_body_str:
            # Append RERA verification block to the end of the content body before the final backtick
            new_article_body_str = article_body_str[:-1].rstrip() + rera_text + "`"
            updated_block = block_text.replace(article_body_str, new_article_body_str)
            content = content.replace(block_text, updated_block)

    with open(article_path, "w", encoding="utf-8") as f:
        f.write(content)

    print("Insights articles RERA verification injection complete.")

if __name__ == "__main__":
    refine_silos()
    refine_articles()
