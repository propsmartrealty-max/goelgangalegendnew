import os
from datetime import datetime

items = [
    {
        "title": "Is Bavdhan the Best Real Estate Investment in Pune for 2026?",
        "link": "https://www.goelgangalegend.com/insights/bavdhan-real-estate-investment-2026",
        "description": "An in-depth analysis of Bavdhan's infrastructure growth, metro connectivity, and why sports townships are driving massive ROI.",
        "date": "Thu, 14 May 2026 10:00:00 +0530",
        "image": "https://www.goelgangalegend.com/hero-aerial.webp"
    },
    {
        "title": "Cost of Living in Bavdhan Pune: A Comprehensive 2026 Guide",
        "link": "https://www.goelgangalegend.com/insights/cost-of-living-bavdhan-pune",
        "description": "Explore the cost of living, top schools, healthcare, and lifestyle amenities in Bavdhan, Pune's most sought-after residential hub.",
        "date": "Thu, 14 May 2026 11:00:00 +0530",
        "image": "https://www.goelgangalegend.com/gallery-clubhouse.webp"
    },
    {
        "title": "Bavdhan vs Hinjewadi: Where Should You Buy a Flat in Pune?",
        "link": "https://www.goelgangalegend.com/insights/bavdhan-vs-hinjewadi-real-estate",
        "description": "A detailed real estate comparison between Bavdhan and Hinjewadi for homebuyers and investors looking at ROI, lifestyle, and connectivity.",
        "date": "Thu, 14 May 2026 12:00:00 +0530",
        "image": "https://www.goelgangalegend.com/interior-luxury.webp"
    },
    {
        "title": "Why Sports Townships Generate 20% Higher ROI in Pune",
        "link": "https://www.goelgangalegend.com/insights/roi-sports-townships-pune",
        "description": "Discover why integrated sports townships in Pune, featuring international academies, are outperforming standalone residential buildings in rental yields and capital growth.",
        "date": "Thu, 14 May 2026 13:00:00 +0530",
        "image": "https://www.goelgangalegend.com/gallery-football.webp"
    },
    {
        "title": "Baner Pashan Link Road Market: The Ultimate Luxury Residential Guide for Pune West",
        "link": "https://www.goelgangalegend.com/insights/baner-pashan-link-road-real-estate-guide",
        "description": "A deep-dive analysis of the Baner Pashan Link Road market, property rates, congestion index, and why luxury buyers are shifting to nearby premium townships.",
        "date": "Wed, 03 Jun 2026 09:00:00 +0530",
        "image": "https://www.goelgangalegend.com/hero-aerial.webp"
    },
    {
        "title": "RERA Checklist for Buying a Luxury Flat in Pune 2026",
        "link": "https://www.goelgangalegend.com/insights/rera-checklist-buying-home-pune-2026",
        "description": "Essential MahaRERA compliance checklist for luxury home buyers in Pune: title verification, carpet area validation, and escrow protection.",
        "date": "Wed, 03 Jun 2026 10:00:00 +0530",
        "image": "https://www.goelgangalegend.com/master-layout.webp"
    },
    {
        "title": "Luxury Amenities Trends in Pune Real Estate: 2026 Report",
        "link": "https://www.goelgangalegend.com/insights/luxury-amenities-trends-pune-real-estate",
        "description": "How 30-acre sports townships with Olympic-sized pools and branded academies are replacing traditional apartment amenities in Pune.",
        "date": "Wed, 03 Jun 2026 11:00:00 +0530",
        "image": "https://www.goelgangalegend.com/amenities-pool.webp"
    },
    {
        "title": "Pune Metro Line 3: Hinjewadi-Shivajinagar Metro Impact on Bavdhan Property",
        "link": "https://www.goelgangalegend.com/insights/pune-metro-line-3-impact-bavdhan-property",
        "description": "Track the progress of Pune Metro Line 3 and how feeder lines to Chandni Chowk and Bavdhan drive property capital appreciation.",
        "date": "Wed, 03 Jun 2026 12:00:00 +0530",
        "image": "https://www.goelgangalegend.com/hero-aerial.webp"
    },
    {
        "title": "Chandni Chowk Flyover Impact: Commute Times to Baner & Kothrud in 2026",
        "link": "https://www.goelgangalegend.com/insights/chandni-chowk-flyover-impact-bavdhan-real-estate",
        "description": "An analysis of traffic index patterns, travel times, and connectivity benefits in Bavdhan following the multi-level Chandni Chowk flyover completion.",
        "date": "Wed, 03 Jun 2026 13:00:00 +0530",
        "image": "https://www.goelgangalegend.com/hero-aerial.webp"
    },
    {
        "title": "NRI Investment Guide: Buying Luxury Real Estate in Pune West",
        "link": "https://www.goelgangalegend.com/insights/nri-investment-guide-pune-luxury-real-estate",
        "description": "Complete guide for NRIs investing in Pune residential property: taxation, rental yields, capital repatriation, and RERA security.",
        "date": "Wed, 03 Jun 2026 14:00:00 +0530",
        "image": "https://www.goelgangalegend.com/interior-luxury.webp"
    }
]

rss_xml = f"""<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" 
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:content="http://purl.org/rss/1.0/modules/content/">
<channel>
  <title>Goel Ganga Legend County Insights — Pune Real Estate Market Analysis</title>
  <link>https://www.goelgangalegend.com</link>
  <description>Official research insights, infrastructure updates, and market intelligence for Goel Ganga Legend County, Bavdhan, Pune.</description>
  <atom:link href="https://www.goelgangalegend.com/feed.xml" rel="self" type="application/rss+xml" />
  <language>en-in</language>
  <copyright>2026 Goel Ganga Developments</copyright>
  <lastBuildDate>{datetime.now().strftime("%a, %d %b %Y %H:%M:%S +0530")}</lastBuildDate>
"""

for item in items:
    rss_xml += f"""
  <item>
    <title><![CDATA[{item['title']}]]></title>
    <link>{item['link']}</link>
    <guid isPermaLink="true">{item['link']}</guid>
    <description><![CDATA[{item['description']}]]></description>
    <content:encoded><![CDATA[<p>{item['description']}</p><p>Read the full market monograph and download official floor plans at <a href="{item['link']}">Goel Ganga Legend County</a>.</p>]]></content:encoded>
    <dc:creator>Goel Ganga Research Team</dc:creator>
    <pubDate>{item['date']}</pubDate>
    <enclosure url="{item['image']}" type="image/webp" length="150000" />
  </item>"""

rss_xml += """
</channel>
</rss>
"""

with open("public/feed.xml", "w", encoding="utf-8") as f:
    f.write(rss_xml)

print("Enhanced Google News & RSS 2.0 feed generated successfully at public/feed.xml")
