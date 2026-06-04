import datetime

# The core articles and silos to force-feed to Google
items = [
    {
        "title": "Is Bavdhan the Best Real Estate Investment in Pune for 2026?",
        "link": "https://goelgangalegend.com/insights/bavdhan-real-estate-investment-2026",
        "description": "An in-depth analysis of Bavdhan's infrastructure growth, metro connectivity, and why sports townships are driving massive ROI.",
        "date": "2026-05-14T10:00:00+05:30"
    },
    {
        "title": "Cost of Living in Bavdhan Pune: A Comprehensive 2026 Guide",
        "link": "https://goelgangalegend.com/insights/cost-of-living-bavdhan-pune",
        "description": "Explore the cost of living, top schools, healthcare, and lifestyle amenities in Bavdhan, Pune's most sought-after residential hub.",
        "date": "2026-05-14T11:00:00+05:30"
    },
    {
        "title": "Bavdhan vs Hinjewadi: Where Should You Buy a Flat in Pune?",
        "link": "https://goelgangalegend.com/insights/bavdhan-vs-hinjewadi-real-estate",
        "description": "A detailed real estate comparison between Bavdhan and Hinjewadi for homebuyers and investors looking at ROI, lifestyle, and connectivity.",
        "date": "2026-05-14T12:00:00+05:30"
    },
    {
        "title": "Why Sports Townships Generate 20% Higher ROI in Pune",
        "link": "https://goelgangalegend.com/insights/roi-sports-townships-pune",
        "description": "Discover why integrated sports townships in Pune, featuring international academies, are outperforming standalone residential buildings in rental yields and capital growth.",
        "date": "2026-05-14T13:00:00+05:30"
    },
    {
        "title": "Baner Pashan Link Road Market: The Ultimate Luxury Residential Guide for Pune West",
        "link": "https://goelgangalegend.com/insights/baner-pashan-link-road-real-estate-guide",
        "description": "A deep-dive analysis of the Baner Pashan Link Road market, property rates, congestion index, and why luxury buyers are shifting to nearby premium townships.",
        "date": "2026-06-03T09:00:00+05:30"
    },
    {
        "title": "Under-40 Homebuyers: Tech Wealth Reshaping Pune Luxury Real Estate",
        "link": "https://goelgangalegend.com/insights/pune-luxury-real-estate-demographics-2026",
        "description": "An analysis of why tech-savvy professionals under 40 represent 55% of Pune's luxury real estate sales, and how they prioritize wellness-first sports townships.",
        "date": "2026-06-03T09:00:00+05:30"
    },
    {
        "title": "Pune Metro Line 3: Hinjewadi-Shivajinagar Metro Progress & Bavdhan Connectivity",
        "link": "https://goelgangalegend.com/insights/pune-metro-line-3-bavdhan-connector",
        "description": "Track the progress of Pune Metro Line 3 (Hinjewadi-Shivajinagar) and how the planned connector and feeder services benefit Goel Ganga Legend County Bavdhan residents.",
        "date": "2026-06-03T09:00:00+05:30"
    },
    {
        "title": "Post-Chandni Chowk Traffic Index: Commute Times to Baner & Kothrud in 2026",
        "link": "https://goelgangalegend.com/insights/post-chandni-chowk-traffic-index-bavdhan",
        "description": "An analysis of traffic index patterns, travel times, and connectivity benefits in Bavdhan following the multi-level Chandni Chowk flyover completion.",
        "date": "2026-06-03T09:00:00+05:30"
    },
    {
        "title": "Top International Schools in Pune West: Family Relocation Guide to Bavdhan",
        "link": "https://goelgangalegend.com/insights/top-international-schools-pune-west-bavdhan",
        "description": "A comprehensive directory of top schools, universities, and healthcare facilities near Bavdhan, Pune West, for families planning to relocate.",
        "date": "2026-06-03T09:00:00+05:30"
    }
]

rss_xml = f"""<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Goel Ganga Legend County Insights</title>
  <link>https://goelgangalegend.com</link>
  <description>Latest real estate market analysis, ROI insights, and news from Pune's premier sports township in Bavdhan.</description>
  <atom:link href="https://goelgangalegend.com/feed.xml" rel="self" type="application/rss+xml" />
  <language>en-us</language>
"""

for item in items:
    rss_xml += f"""
  <item>
    <title>{item['title']}</title>
    <link>{item['link']}</link>
    <description>{item['description']}</description>
    <pubDate>{item['date']}</pubDate>
    <guid>{item['link']}</guid>
  </item>"""

rss_xml += """
</channel>
</rss>
"""

with open("public/feed.xml", "w") as f:
    f.write(rss_xml)

print("RSS feed generated successfully at public/feed.xml")
