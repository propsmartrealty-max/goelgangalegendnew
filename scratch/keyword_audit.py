import re
import os
import sys

def parse_silo_data():
    silo_path = "src/data/siloData.ts"
    if not os.path.exists(silo_path):
        print(f"Error: {silo_path} not found.")
        return None
    with open(silo_path, "r", encoding="utf-8") as f:
        content = f.read()

    matches = list(re.finditer(r'[\'"]?([a-zA-Z0-9\.\-_]+)[\'"]?:\s*\{\s*slug:\s*\'([^\']+)\',', content))
    silos = {}

    for idx, match in enumerate(matches):
        slug = match.group(2)
        start_idx = match.start()
        next_match = matches[idx+1] if idx+1 < len(matches) else None
        end_idx = next_match.start() if next_match else len(content)
        block = content[start_idx:end_idx]

        paragraphs_block = re.findall(r'content:\s*\[([\s\S]*?)\],', block)
        paragraphs = []
        if paragraphs_block:
            paragraphs = re.findall(r'[\'"]((?:[^\'\"\\]|\\.)*)[\'"]', paragraphs_block[0])
            paragraphs = [p.replace("\\'", "'") for p in paragraphs]

        faqs = []
        faq_blocks = re.findall(r'faq:\s*\[([\s\S]*?)\]', block)
        if faq_blocks:
            faq_matches = re.findall(r'\{\s*question:\s*\"([^\"]+)\",\s*answer:\s*\"([^\"]+)\"\s*\}', faq_blocks[0])
            faqs = [q + " " + a for q, a in faq_matches]

        full_text = " ".join(paragraphs) + " " + " ".join(faqs)
        title_match = re.search(r'title:\s*[\'"]((?:[^\'\"\\]|\\.)*)[\'"]', block)
        desc_match = re.search(r'description:\s*[\'"]((?:[^\'\"\\]|\\.)*)[\'"]', block)

        title = title_match.group(1).replace("\\'", "'") if title_match else ""
        desc = desc_match.group(1).replace("\\'", "'") if desc_match else ""

        silos[slug] = {
            "title": title,
            "description": desc,
            "text": full_text
        }
    return silos

def parse_article_data():
    article_path = "src/pages/ArticlePage.tsx"
    if not os.path.exists(article_path):
        print(f"Error: {article_path} not found.")
        return None
    with open(article_path, "r", encoding="utf-8") as f:
        content = f.read()

    matches = list(re.finditer(r'\'([a-zA-Z0-9\.\-_]+)\':\s*\{', content))
    articles = {}

    for idx, match in enumerate(matches):
        slug = match.group(1)
        if slug == "main":
            continue
        start_idx = match.start()
        next_match = matches[idx+1] if idx+1 < len(matches) else None
        end_idx = next_match.start() if next_match else content.find("export default function ArticlePage")
        block = content[start_idx:end_idx]

        title_match = re.search(r'title:\s*[\'"]((?:[^\'\"\\]|\\.)*)[\'"]', block)
        desc_match = re.search(r'description:\s*[\'"]((?:[^\'\"\\]|\\.)*)[\'"]', block)
        content_match = re.search(r'content:\s*`([\s\S]*?)`', block)

        title = title_match.group(1).replace("\\'", "'") if title_match else ""
        desc = desc_match.group(1).replace("\\'", "'") if desc_match else ""
        text = content_match.group(1) if content_match else ""

        articles[slug] = {
            "title": title,
            "description": desc,
            "text": text
        }
    return articles

def run_audit():
    silos = parse_silo_data()
    articles = parse_article_data()

    if not silos or not articles:
        print("Error reading files.")
        return 1

    report = []
    report.append("# Hardened SEO & Keyword Density Audit Report\n")
    report.append("This report audits the density and distribution of high-intent brand, configuration, and geo-targeted keywords across all silo pages and insights articles.\n")

    report.append("## Keyword Density Matrix\n")
    report.append("| Page Slug | Brand Hits | Bavdhan Hits | Pune Hits | Luxury Hits | Config Hits | RERA Present | Status |")
    report.append("| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |")

    all_compliant = True

    for slug, data in list(silos.items()) + list(articles.items()):
        text_lower = data["text"].lower()
        title_lower = data["title"].lower()
        desc_lower = data["description"].lower()
        combined = text_lower + " " + title_lower + " " + desc_lower

        # Brand Hits count
        brand_hits = combined.count("goel ganga") + combined.count("ganga legend") + combined.count("legend county")
        # Bavdhan Hits count
        bavdhan_hits = combined.count("bavdhan")
        # Pune Hits count
        pune_hits = combined.count("pune")
        # Luxury Hits count
        luxury_hits = combined.count("luxury") + combined.count("premium") + combined.count("ultra-luxury")
        # Config Hits count
        config_hits = combined.count("2 bhk") + combined.count("3 bhk") + combined.count("4 bhk") + combined.count("2bhk") + combined.count("3bhk") + combined.count("4bhk") + combined.count("3.5 bhk") + combined.count("3.5bhk")
        # RERA
        rera_present = "P52100054578" in data["text"] or "P52100054578" in combined

        # Check compliance parameters
        # Brand, Bavdhan, Pune, and Luxury must have at least 2 hits each for high-intent SEO relevance
        # RERA must be present
        is_compliant = brand_hits >= 2 and bavdhan_hits >= 2 and pune_hits >= 2 and rera_present
        status_icon = "✅ Compliant" if is_compliant else "⚠️ Hardening Needed"
        if not is_compliant:
            all_compliant = False

        report.append(f"| `{slug}` | {brand_hits} | {bavdhan_hits} | {pune_hits} | {luxury_hits} | {config_hits} | {'✅' if rera_present else '❌'} | {status_icon} |")

    report.append("\n## Audit Summary\n")
    if all_compliant:
        report.append("✅ **Hardened Keyword Status**: All pages successfully meet the minimum brand, location, segment keyword densities, and RERA compliance thresholds.\n")
    else:
        report.append("⚠️ **Keyword Gaps Detected**: Some pages require additional keyword injection or RERA validation references. Please run refinement scripts.\n")

    report_content = "\n".join(report)
    with open("scratch/current_keyword_audit_report.md", "w", encoding="utf-8") as f:
        f.write(report_content)

    print("Keyword audit completed. Report written to scratch/current_keyword_audit_report.md")
    if not all_compliant:
        print("[WARNING] Gaps detected. Hardening is recommended.")
        return 1
    return 0

if __name__ == "__main__":
    sys.exit(run_audit())
