import os
import re
from datetime import datetime

def generate_google_image_sitemap():
    base_dir = "/Users/vikasyewle/goelgangalegendcounty"
    site_url = "https://www.goelgangalegend.com"
    today = datetime.now().strftime("%Y-%m-%d")

    # 1. Read Silos
    silo_path = os.path.join(base_dir, "src/data/siloData.ts")
    with open(silo_path, "r", encoding="utf-8") as f:
        silo_content = f.read()

    silo_matches = list(re.finditer(r'[\'"]?([a-zA-Z0-9\.\-_]+)[\'"]?:\s*\{\s*slug:\s*\'([^\']+)\',', silo_content))
    silos = []

    for idx, match in enumerate(silo_matches):
        slug = match.group(2)
        start_idx = match.start()
        next_match = silo_matches[idx+1] if idx+1 < len(silo_matches) else None
        end_idx = next_match.start() if next_match else len(silo_content)
        block_text = silo_content[start_idx:end_idx]

        title_m = re.search(r'title:\s*[\'"]((?:[^\'\"\\]|\\.)*)[\'"]', block_text)
        desc_m = re.search(r'description:\s*[\'"]((?:[^\'\"\\]|\\.)*)[\'"]', block_text)

        title = title_m.group(1).replace("\\'", "'") if title_m else "Goel Ganga Legend County Bavdhan"
        description = desc_m.group(1).replace("\\'", "'") if desc_m else "Luxury apartments in Bavdhan, Pune"

        img = f"{site_url}/hero-aerial.webp"
        if "3bhk" in slug:
            img = f"{site_url}/floorplan-3bhk.webp"
        elif "3.5" in slug:
            img = f"{site_url}/floorplan-3.5bhk.webp"
        elif "sports" in slug or "swimming" in slug or "dhoni" in slug:
            img = f"{site_url}/gallery-football.webp"

        silos.append({
            "loc": f"{site_url}/{slug}",
            "lastmod": today,
            "changefreq": "weekly",
            "priority": "0.9",
            "image": img,
            "title": title,
            "caption": description
        })

    # 2. Read Articles
    article_path = os.path.join(base_dir, "src/pages/ArticlePage.tsx")
    with open(article_path, "r", encoding="utf-8") as f:
        article_content = f.read()

    art_matches = list(re.finditer(r'\'([a-zA-Z0-9\.\-_]+)\':\s*\{', article_content))
    articles = []

    for idx, match in enumerate(art_matches):
        slug = match.group(1)
        if slug == "main":
            continue
        start_idx = match.start()
        next_match = art_matches[idx+1] if idx+1 < len(art_matches) else None
        end_idx = next_match.start() if next_match else article_content.find("export default function ArticlePage")
        block_text = article_content[start_idx:end_idx]

        title_m = re.search(r'title:\s*[\'"]((?:[^\'\"\\]|\\.)*)[\'"]', block_text)
        desc_m = re.search(r'description:\s*[\'"]((?:[^\'\"\\]|\\.)*)[\'"]', block_text)
        img_m = re.search(r'image:\s*[\'"]((?:[^\'\"\\]|\\.)*)[\'"]', block_text)

        title = title_m.group(1).replace("\\'", "'") if title_m else "Legend County Market Insights"
        description = desc_m.group(1).replace("\\'", "'") if desc_m else "Pune luxury real estate analysis"
        img_rel = img_m.group(1) if img_m else "/hero-aerial.webp"
        img = f"{site_url}{img_rel}" if img_rel.startswith("/") else f"{site_url}/{img_rel}"

        articles.append({
            "loc": f"{site_url}/insights/{slug}",
            "lastmod": today,
            "changefreq": "weekly",
            "priority": "0.8",
            "image": img,
            "title": title,
            "caption": description
        })

    # Generate Google Image XML Sitemap
    xml_lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
        '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
        '  <url>',
        f'    <loc>{site_url}/</loc>',
        f'    <lastmod>{today}</lastmod>',
        '    <changefreq>daily</changefreq>',
        '    <priority>1.0</priority>',
        '    <image:image>',
        f'      <image:loc>{site_url}/hero-aerial.webp</image:loc>',
        '      <image:title>Goel Ganga Legend County Bavdhan Pune</image:title>',
        '      <image:caption>30-Acre Luxury Sports Township in Bavdhan near Chandni Chowk</image:caption>',
        '    </image:image>',
        '    <image:image>',
        f'      <image:loc>{site_url}/amenities-pool.webp</image:loc>',
        '      <image:title>Michael Phelps Swimming Academy Pool</image:title>',
        '      <image:caption>Olympic-grade swimming pool at Goel Ganga Legend County</image:caption>',
        '    </image:image>',
        '    <image:image>',
        f'      <image:loc>{site_url}/gallery-clubhouse.webp</image:loc>',
        '      <image:title>Legend County Luxury Clubhouse</image:title>',
        '      <image:caption>State-of-the-art wellness and sports clubhouse</image:caption>',
        '    </image:image>',
        '  </url>'
    ]

    for item in silos + articles:
        safe_title = item['title'].replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace('"', "&quot;")
        safe_cap = item['caption'].replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace('"', "&quot;")
        xml_lines.append('  <url>')
        xml_lines.append(f'    <loc>{item["loc"]}</loc>')
        xml_lines.append(f'    <lastmod>{item["lastmod"]}</lastmod>')
        xml_lines.append(f'    <changefreq>{item["changefreq"]}</changefreq>')
        xml_lines.append(f'    <priority>{item["priority"]}</priority>')
        xml_lines.append('    <image:image>')
        xml_lines.append(f'      <image:loc>{item["image"]}</image:loc>')
        xml_lines.append(f'      <image:title>{safe_title}</image:title>')
        xml_lines.append(f'      <image:caption>{safe_cap}</image:caption>')
        xml_lines.append('    </image:image>')
        xml_lines.append('  </url>')

    xml_lines.append('</urlset>')

    sitemap_path = os.path.join(base_dir, "public/sitemap.xml")
    with open(sitemap_path, "w", encoding="utf-8") as f:
        f.write("\n".join(xml_lines) + "\n")

    print(f"Generated Google Image Sitemap with {len(silos) + len(articles) + 1} URLs at {sitemap_path}")

if __name__ == "__main__":
    generate_google_image_sitemap()
