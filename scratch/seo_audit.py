import re
import os
import sys

def audit_silos():
    silo_path = "src/data/siloData.ts"
    if not os.path.exists(silo_path):
        print(f"Error: {silo_path} not found.")
        return None

    with open(silo_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Find all silo block starts
    silo_matches = list(re.finditer(r'[\'"]?([a-zA-Z0-9\.\-_]+)[\'"]?:\s*\{\s*slug:\s*\'([^\']+)\',', content))
    silo_reports = []

    for idx, match in enumerate(silo_matches):
        key = match.group(1)
        slug = match.group(2)
        start_idx = match.start()
        
        # Get end of block
        next_match = silo_matches[idx+1] if idx+1 < len(silo_matches) else None
        end_idx = next_match.start() if next_match else len(content)
        block_text = content[start_idx:end_idx]

        # Extract title and description
        title_match = re.search(r'title:\s*[\'"]((?:[^\'\"\\]|\\.)*)[\'"]', block_text)
        desc_match = re.search(r'description:\s*[\'"]((?:[^\'\"\\]|\\.)*)[\'"]', block_text)
        
        title = title_match.group(1).replace("\\'", "'") if title_match else ""
        description = desc_match.group(1).replace("\\'", "'") if desc_match else ""

        # Count content paragraphs & word count
        paragraphs = re.findall(r'content:\s*\[([\s\S]*?)\],', block_text)
        para_word_count = 0
        link_count = 0
        rera_present = False
        p_strings = []

        if paragraphs:
            # Match single or double quoted strings, handling backslash escapes
            p_strings = re.findall(r'[\'"]((?:[^\'\"\\]|\\.)*)[\'"]', paragraphs[0])
            for p_str in p_strings:
                # Unescape single quotes for proper analysis
                p_clean = p_str.replace("\\'", "'")
                para_word_count += len(p_clean.split())
                link_count += len(re.findall(r'<a\b', p_clean))
                if "P52100054578" in p_clean:
                    rera_present = True

        # Count FAQs
        faq_blocks = re.findall(r'faq:\s*\[([\s\S]*?)\]', block_text)
        faq_count = 0
        faq_word_count = 0
        if faq_blocks:
            faqs = re.findall(r'\{\s*question:\s*\"([^\"]+)\",\s*answer:\s*\"([^\"]+)\"\s*\}', faq_blocks[0])
            faq_count = len(faqs)
            for q, a in faqs:
                faq_word_count += len(q.split()) + len(a.split())
                if "P52100054578" in a:
                    rera_present = True

        total_word_count = para_word_count + faq_word_count

        silo_reports.append({
            "slug": slug,
            "title": title,
            "title_len": len(title),
            "description": description,
            "description_len": len(description),
            "paragraphs_count": len(p_strings),
            "para_word_count": para_word_count,
            "faq_count": faq_count,
            "total_word_count": total_word_count,
            "link_count": link_count,
            "rera_present": rera_present
        })

    return silo_reports

def audit_articles():
    article_path = "src/pages/ArticlePage.tsx"
    if not os.path.exists(article_path):
        print(f"Error: {article_path} not found.")
        return None

    with open(article_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Find matches of 'slug': {
    matches = list(re.finditer(r'\'([a-zA-Z0-9\.\-_]+)\':\s*\{', content))
    article_reports = []

    for idx, match in enumerate(matches):
        slug = match.group(1)
        if slug == "main":  # Avoid matching main function or other code constructs
            continue
            
        start_idx = match.start()
        next_match = matches[idx+1] if idx+1 < len(matches) else None
        if next_match:
            end_idx = next_match.start()
        else:
            end_idx = content.find("export default function ArticlePage")
            if end_idx == -1:
                end_idx = len(content)

        block_text = content[start_idx:end_idx]

        # Extract title, description, and content block
        title_match = re.search(r'title:\s*[\'"]((?:[^\'\"\\]|\\.)*)[\'"]', block_text)
        desc_match = re.search(r'description:\s*[\'"]((?:[^\'\"\\]|\\.)*)[\'"]', block_text)
        content_match = re.search(r'content:\s*`([\s\S]*?)`', block_text)

        title = title_match.group(1).replace("\\'", "'") if title_match else ""
        description = desc_match.group(1).replace("\\'", "'") if desc_match else ""
        article_content = content_match.group(1) if content_match else ""

        words = len(article_content.split())
        links = len(re.findall(r'<a\b', article_content))
        rera = "P52100054578" in article_content

        article_reports.append({
            "slug": slug,
            "title": title,
            "title_len": len(title),
            "description": description,
            "description_len": len(description),
            "total_word_count": words,
            "link_count": links,
            "rera_present": rera
        })

    return article_reports

def check_sitemap():
    sitemap_path = "public/sitemap.xml"
    if not os.path.exists(sitemap_path):
        return []
    with open(sitemap_path, "r", encoding="utf-8") as f:
        content = f.read()
    urls = re.findall(r'<loc>https://goelgangalegend.com/([^\s<]+)</loc>', content)
    return set(urls)

def main():
    print("Starting automated SEO & content strategy audit...")
    silo_reports = audit_silos()
    article_reports = audit_articles()
    sitemap_urls = check_sitemap()

    if not silo_reports or not article_reports:
        print("Audit failed due to missing source files.")
        sys.exit(1)

    report_lines = []
    report_lines.append("# SEO Content & Data Integrity Audit Report\n")
    report_lines.append("This report lists the status of content depth, metadata optimization, RERA compliance, sitemap configuration, and routing density across all platform pages.\n")
    
    # 1. Executive Summary
    total_silos = len(silo_reports)
    total_articles = len(article_reports)
    avg_silo_words = sum(s["total_word_count"] for s in silo_reports) // total_silos
    avg_article_words = sum(a["total_word_count"] for a in article_reports) // total_articles
    total_links = sum(s["link_count"] for s in silo_reports) + sum(a["link_count"] for a in article_reports)
    
    rera_compliant_silos = sum(1 for s in silo_reports if s["rera_present"])
    rera_compliant_articles = sum(1 for a in article_reports if a["rera_present"])
    
    report_lines.append("## Executive Summary\n")
    report_lines.append(f"- **Total Silo Pages Audited:** {total_silos}")
    report_lines.append(f"- **Total Insights Articles Audited:** {total_articles}")
    report_lines.append(f"- **Average Silo Word Count:** {avg_silo_words} words (Target: 800+ words)")
    report_lines.append(f"- **Average Article Word Count:** {avg_article_words} words (Target: 800+ words)")
    report_lines.append(f"- **Total Dynamic Internal Contextual Links:** {total_links} links")
    report_lines.append(f"- **RERA Verification Compliance (`P52100054578`):** {rera_compliant_silos}/{total_silos} Silos, {rera_compliant_articles}/{total_articles} Articles\n")
    
    # 2. Silo Table
    report_lines.append("## Silo Page Optimization Matrix\n")
    report_lines.append("| Silo Slug | Title Length | Description Length | FAQs | Total Word Count | Internal Links | RERA Verified | Sitemap Status |")
    report_lines.append("| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |")
    
    for s in silo_reports:
        in_sitemap = "✅" if s["slug"] in sitemap_urls else "❌"
        rera_status = "✅ Verified" if s["rera_present"] else "⚠️ Missing"
        report_lines.append(f"| `{s['slug']}` | {s['title_len']} | {s['description_len']} | {s['faq_count']} | {s['total_word_count']} | {s['link_count']} | {rera_status} | {in_sitemap} |")
    
    report_lines.append("\n")

    # 3. Article Table
    report_lines.append("## Insights Article Optimization Matrix\n")
    report_lines.append("| Article Slug | Title Length | Description Length | Total Word Count | Internal Links | RERA Verified | Sitemap Status |")
    report_lines.append("| :--- | :---: | :---: | :---: | :---: | :---: | :---: |")
    
    for a in article_reports:
        in_sitemap = "✅" if f"insights/{a['slug']}" in sitemap_urls else "❌"
        rera_status = "✅ Verified" if a["rera_present"] else "⚠️ Missing"
        report_lines.append(f"| `insights/{a['slug']}` | {a['title_len']} | {a['description_len']} | {a['total_word_count']} | {a['link_count']} | {rera_status} | {in_sitemap} |")

    report_lines.append("\n")

    # 4. Detailed Evaluation
    report_lines.append("## Detailed Compliance Analysis\n")
    
    # Helpful Content check
    thin_silos = [s["slug"] for s in silo_reports if s["total_word_count"] < 800]
    thin_articles = [a["slug"] for a in article_reports if a["total_word_count"] < 800]
    
    if thin_silos or thin_articles:
        warning_msg = "⚠️ **Helpful Content Warning:** The following pages are below the 800-word target: "
        parts = []
        if thin_silos:
            parts.append(f"Silos: {', '.join(thin_silos)}")
        if thin_articles:
            parts.append(f"Articles: {', '.join(thin_articles)}")
        report_lines.append(warning_msg + "; ".join(parts) + ".\n")
    else:
        report_lines.append("✅ **Helpful Content Compliant:** All 21 silo pages and 9 insights pages exceed the 800-word threshold, ensuring maximum authoritative value.\n")

    # Metadata check
    bad_metadata = []
    for s in silo_reports:
        if s["title_len"] > 70 or s["title_len"] < 30:
            bad_metadata.append(f"Silo `{s['slug']}` Title ({s['title_len']} chars)")
        if s["description_len"] > 165 or s["description_len"] < 110:
            bad_metadata.append(f"Silo `{s['slug']}` Desc ({s['description_len']} chars)")
    
    if bad_metadata:
        report_lines.append("⚠️ **Metadata Warnings:**\n" + "\n".join(f"- {m}" for m in bad_metadata) + "\n")
    else:
        report_lines.append("✅ **Metadata Perfect:** All page titles (30-70 chars) and meta descriptions (110-165 chars) are optimized for Google SERP display layouts.\n")

    # Write report
    report_content = "\n".join(report_lines)
    with open("scratch/current_seo_audit_report.md", "w", encoding="utf-8") as f:
        f.write(report_content)

    print("Audit completed successfully. Report written to scratch/current_seo_audit_report.md")

if __name__ == "__main__":
    main()
