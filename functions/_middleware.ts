// Cloudflare Pages Edge Middleware: Zero-JS HTMLRewriter SEO & Social Preview Hydration
// Automatically hydrates <title>, <meta>, <link rel="canonical">, and Open Graph tags at the Cloudflare Edge

interface PageMeta {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  image: string;
  type: string;
}

const META_REGISTRY: Record<string, PageMeta> = {
  "/3bhk-flats-bavdhan": {
    "title": "Luxury 3 BHK Flats in Bavdhan Pune | Stadium Life at Legend County",
    "description": "Luxury 3 BHK flats in Bavdhan starting \u20b91.77 Cr*. Discover Goel Ganga Legend County, Pune's premier 30-acre sports township with 9+ international academies.",
    "keywords": "3 BHK flats in Bavdhan, luxury flats in Bavdhan, 3 BHK Pune, Goel Ganga Legend County 3BHK, Goel Ganga Bavdhan 3BHK, premium homes Bavdhan, family apartments Bavdhan",
    "canonical": "https://goelgangalegend.com/3bhk-flats-bavdhan",
    "image": "https://goelgangalegend.com/floorplan-3bhk.webp",
    "type": "website"
  },
  "/2bhk-flats-bavdhan-pune": {
    "title": "Premium 2 BHK Flats in Bavdhan Pune | High ROI Investment",
    "description": "Explore premium 2 BHK flats in Bavdhan at Goel Ganga Legend County. 30-acre sports township with high rental yield potential and world-class amenities.",
    "keywords": "2 BHK in Bavdhan, buy 2 BHK in Bavdhan, Goel Ganga Legend County 2BHK price, premium flats Bavdhan, smart homes Bavdhan",
    "canonical": "https://goelgangalegend.com/2bhk-flats-bavdhan-pune",
    "image": "https://goelgangalegend.com/hero-aerial.webp",
    "type": "website"
  },
  "/luxury-projects-bavdhan": {
    "title": "Top Residential Projects in Bavdhan Pune | Goel Ganga Legend County",
    "description": "Goel Ganga Legend County is the top residential project in Bavdhan, Pune. Featuring 9+ international sports academies and luxury 3 & 3.5 BHK homes.",
    "keywords": "best project in Bavdhan, top residential project Bavdhan, luxury gated community Bavdhan, Goel Ganga Legend County reviews, premium township Bavdhan",
    "canonical": "https://goelgangalegend.com/luxury-projects-bavdhan",
    "image": "https://goelgangalegend.com/hero-aerial.webp",
    "type": "website"
  },
  "/investment-flats-bavdhan-pune": {
    "title": "Real Estate Investment in Bavdhan, Pune | High ROI Property",
    "description": "Looking for the best investment in Bavdhan? Goel Ganga Legend County offers high ROI flats with excellent rental potential near Hinjewadi and Kothrud.",
    "keywords": "real estate investment Bavdhan, property investment Pune West, high ROI flats Bavdhan, buy flat in Bavdhan, appreciation property Bavdhan",
    "canonical": "https://goelgangalegend.com/investment-flats-bavdhan-pune",
    "image": "https://goelgangalegend.com/hero-aerial.webp",
    "type": "website"
  },
  "/sports-township-pune": {
    "title": "Pune's Largest Sports Township | Goel Ganga Legend County",
    "description": "Experience the premier sports township in Bavdhan, Pune. Goel Ganga Legend County features Dhoni's Tagda Raho and Michael Phelps Swimming Academy.",
    "keywords": "sports township Pune, Goel Ganga Legend County sports, football academy Pune, swimming academy Bavdhan, sports amenities Bavdhan, tennis court Bavdhan",
    "canonical": "https://goelgangalegend.com/sports-township-pune",
    "image": "https://goelgangalegend.com/gallery-football.webp",
    "type": "website"
  },
  "/luxury-apartments-chandni-chowk": {
    "title": "Luxury Apartments near Chandni Chowk, Pune | Legend County",
    "description": "Find premium luxury apartments near Chandni Chowk at Goel Ganga Legend County. 30-acre township with world-class amenities and unparalleled connectivity.",
    "keywords": "luxury apartments near Chandni Chowk, premium flats Bavdhan, Goel Ganga Legend County location, flats near Chandni Chowk, Bavdhan near Highway",
    "canonical": "https://goelgangalegend.com/luxury-apartments-chandni-chowk",
    "image": "https://goelgangalegend.com/hero-aerial.webp",
    "type": "website"
  },
  "/michael-phelps-swimming-pune": {
    "title": "Michael Phelps Swimming Academy in Pune | Legend County Bavdhan",
    "description": "Looking for professional swimming coaching in Pune? Legend County features the Michael Phelps Swimming Academy with Olympic-grade infrastructure and expert coaching.",
    "keywords": "Michael Phelps Swimming Academy Pune, swimming classes Bavdhan, professional swimming coaching Pune, swimming pool Bavdhan",
    "canonical": "https://goelgangalegend.com/michael-phelps-swimming-pune",
    "image": "https://goelgangalegend.com/gallery-football.webp",
    "type": "website"
  },
  "/tagda-raho-dhoni-pune": {
    "title": "Tagda Raho by MS Dhoni in Pune | Goel Ganga Legend County",
    "description": "Experience Tagda Raho by MS Dhoni at Legend County, Bavdhan. The first-of-its-kind functional fitness ecosystem in West Pune using traditional Indian equipment.",
    "keywords": "Tagda Raho MS Dhoni Pune, functional fitness Bavdhan, Dhoni gym Pune, strength training Bavdhan, gymnasium Bavdhan",
    "canonical": "https://goelgangalegend.com/tagda-raho-dhoni-pune",
    "image": "https://goelgangalegend.com/gallery-football.webp",
    "type": "website"
  },
  "/3.5-bhk-flats-bavdhan": {
    "title": "Luxury 3.5 BHK Flats in Bavdhan Pune | Premium Stadium Life Homes",
    "description": "Luxury 3.5 BHK flats in Bavdhan starting \u20b92.10 Cr*. Experience high-performance living in Pune's premier sports township near Ryan International School.",
    "keywords": "3.5 BHK flats in Bavdhan, 4 BHK Bavdhan, home office flats Pune, luxury 3.5 BHK Pune, spacious apartments Pune, flats near Ryan International School, property near MIT College Pune, flats near Chellaram Hospital Bavdhan",
    "canonical": "https://goelgangalegend.com/3.5-bhk-flats-bavdhan",
    "image": "https://goelgangalegend.com/floorplan-3.5bhk.webp",
    "type": "website"
  },
  "/schools-hospitals-near-bavdhan": {
    "title": "Top Schools & Hospitals near Bavdhan Pune | Legend County",
    "description": "Explore the best schools like Ryan International and hospitals like Chellaram near Goel Ganga Legend County, Bavdhan. The perfect location for family-first living.",
    "keywords": "schools in Bavdhan, hospitals in Bavdhan, Ryan International School Pune, MIT College Bavdhan, Chellaram Hospital Pune, flats near schools Bavdhan, property near hospitals Pune West",
    "canonical": "https://goelgangalegend.com/schools-hospitals-near-bavdhan",
    "image": "https://goelgangalegend.com/hero-aerial.webp",
    "type": "website"
  },
  "/rera-legal-compliance-bavdhan": {
    "title": "RERA & Legal Compliance | Goel Ganga Legend County Bavdhan Pune",
    "description": "Verify the legal compliance and RERA status of Goel Ganga Legend County, Bavdhan. RERA No: P52100054578. Sanctioned sports township plans.",
    "keywords": "Goel Ganga Legend County RERA, RERA P52100054578, legal status Bavdhan project, title clear flats Bavdhan, sanctioned plans Pune township",
    "canonical": "https://goelgangalegend.com/rera-legal-compliance-bavdhan",
    "image": "https://goelgangalegend.com/hero-aerial.webp",
    "type": "website"
  },
  "/pune-real-estate-market": {
    "title": "Pune Real Estate | Luxury Projects & Market Trends",
    "description": "Explore Pune Real Estate and luxury housing trends. Discover premier developments in Pune's high-performance western corridor starting at \u20b91.77 Cr*.",
    "keywords": "Pune Real Estate, luxury residential projects in Pune, property market Pune, top developers in Pune, high end real estate Pune, Pune housing market",
    "canonical": "https://goelgangalegend.com/pune-real-estate-market",
    "image": "https://goelgangalegend.com/hero-aerial.webp",
    "type": "website"
  },
  "/west-pune-real-estate-market": {
    "title": "West Pune Real Estate Market | Premier Luxury Housing Corridor",
    "description": "Analyze the West Pune Real Estate Market. Discover why Bavdhan, Kothrud, and Baner are West Pune's prime luxury corridors with high capital appreciation.",
    "keywords": "West Pune Real Estate Market, property in West Pune, real estate investment West Pune, luxury homes West Pune, West Pune growth corridor",
    "canonical": "https://goelgangalegend.com/west-pune-real-estate-market",
    "image": "https://goelgangalegend.com/hero-aerial.webp",
    "type": "website"
  },
  "/luxury-real-estate-baner-pashan-link-road": {
    "title": "Luxury Real Estate in Baner Pashan Link Road Market | Elite Homes",
    "description": "Explore luxury real estate on Baner Pashan Link Road. Compare high-end prices and congestion with Ganga Legend County's premium sports sanctuary.",
    "keywords": "luxury real estate Baner Pashan Link Road market, high end luxury Baner Pashan Link Road, Baner Pashan Link Road residential projects, properties near Baner Pashan Link Road",
    "canonical": "https://goelgangalegend.com/luxury-real-estate-baner-pashan-link-road",
    "image": "https://goelgangalegend.com/hero-aerial.webp",
    "type": "website"
  },
  "/luxury-flats-kharadi-vs-bavdhan-pune": {
    "title": "Kharadi vs Bavdhan | Best Luxury IT Real Estate Corridor Pune",
    "description": "Looking at luxury flats in Kharadi? Compare Kharadi vs Bavdhan real estate prices, water security, congestion, and sports amenities at Ganga Legend County.",
    "keywords": "Kharadi vs Bavdhan, luxury flats in Kharadi, real estate Kharadi, flats in Bavdhan Pune, properties in Pune West",
    "canonical": "https://goelgangalegend.com/luxury-flats-kharadi-vs-bavdhan-pune",
    "image": "https://goelgangalegend.com/hero-aerial.webp",
    "type": "website"
  },
  "/luxury-homes-koregaon-park-vs-bavdhan": {
    "title": "Koregaon Park vs Bavdhan | Luxury Home Investment Pune",
    "description": "Compare luxury homes in Koregaon Park with Bavdhan. Analyze price bubbles, infrastructure maturity, and sports facilities at Goel Ganga Legend County.",
    "keywords": "Koregaon Park vs Bavdhan, luxury homes Koregaon Park, real estate Koregaon Park, luxury flats in Bavdhan, properties in Pune West",
    "canonical": "https://goelgangalegend.com/luxury-homes-koregaon-park-vs-bavdhan",
    "image": "https://goelgangalegend.com/hero-aerial.webp",
    "type": "website"
  },
  "/luxury-apartments-baner-vs-bavdhan": {
    "title": "Baner vs Bavdhan | Luxury Apartments & Investment Comparison",
    "description": "Analyze Baner vs Bavdhan property rates, water security, and congestion. Discover why Goel Ganga Legend County is the best luxury choice in West Pune.",
    "keywords": "Baner vs Bavdhan, luxury apartments in Baner, real estate Baner, flats in Bavdhan Pune, properties in Pune West",
    "canonical": "https://goelgangalegend.com/luxury-apartments-baner-vs-bavdhan",
    "image": "https://goelgangalegend.com/hero-aerial.webp",
    "type": "website"
  },
  "/luxury-flats-kothrud-vs-bavdhan-pune": {
    "title": "Kothrud vs Bavdhan | Best Luxury Real Estate Comparison Pune",
    "description": "Compare luxury flats in Kothrud with Bavdhan. Analyze property rates, congestion, and sports amenities at Goel Ganga Legend County near Kothrud.",
    "keywords": "Kothrud vs Bavdhan, luxury flats in Kothrud, real estate Kothrud, flats in Bavdhan Pune, properties in Pune West",
    "canonical": "https://goelgangalegend.com/luxury-flats-kothrud-vs-bavdhan-pune",
    "image": "https://goelgangalegend.com/hero-aerial.webp",
    "type": "website"
  },
  "/luxury-3bhk-flats-pune": {
    "title": "Luxury 3 BHK Flats in Pune | Goel Ganga Legend County Bavdhan",
    "description": "Discover premium luxury 3 BHK flats in Pune West at Goel Ganga Legend County Bavdhan. 30-acre sports township near Chandni Chowk with high appreciation.",
    "keywords": "luxury 3 BHK flats in Pune, premium 3 BHK Pune, buy 3 BHK apartment Pune, Goel Ganga Legend County 3BHK, luxury flats in West Pune",
    "canonical": "https://goelgangalegend.com/luxury-3bhk-flats-pune",
    "image": "https://goelgangalegend.com/floorplan-3bhk.webp",
    "type": "website"
  },
  "/best-investment-property-pune": {
    "title": "Best Investment Property in Pune | High ROI Gated Community",
    "description": "Looking for the best investment property in Pune? Goel Ganga Legend County Bavdhan offers high ROI luxury flats with high rental yields near Hinjewadi.",
    "keywords": "best investment property Pune, property investment Pune, real estate investment Pune, high yield property Pune, best ROI property Pune, investment flats Pune",
    "canonical": "https://goelgangalegend.com/best-investment-property-pune",
    "image": "https://goelgangalegend.com/hero-aerial.webp",
    "type": "website"
  },
  "/sports-township-pune-stadium-life": {
    "title": "Stadium Life at Legend County | Gated Sports Township Pune",
    "description": "Discover Stadium Life at Goel Ganga Legend County Bavdhan. Premium sports township featuring Michael Phelps Swimming, Dhoni's Tagda Raho, and South United Football.",
    "keywords": "Stadium Life Bavdhan, Goel Ganga Legend County, sports township Pune, gated community Bavdhan, premium flats West Pune, Dhoni fitness Pune, Michael Phelps swimming Pune",
    "canonical": "https://goelgangalegend.com/sports-township-pune-stadium-life",
    "image": "https://goelgangalegend.com/gallery-football.webp",
    "type": "website"
  },
  "/luxury-4bhk-flats-pune": {
    "title": "Luxury 4 BHK Flats in Pune | Spacious Combined Homes Bavdhan",
    "description": "Explore luxury 4 BHK duplex and combined flats in Bavdhan, Pune at Goel Ganga Legend County starting \u20b92.90 Cr*. Enjoy 12.5 acres of premium sports academies.",
    "keywords": "luxury 4 BHK flats in Pune, 4 BHK flats in Bavdhan, combined apartments Pune West, Legend County duplex, premium 4 BHK Pune West",
    "canonical": "https://goelgangalegend.com/luxury-4bhk-flats-pune",
    "image": "https://goelgangalegend.com/hero-aerial.webp",
    "type": "website"
  },
  "/luxury-5bhk-duplex-penthouse-flats-pune": {
    "title": "5 BHK Luxury Duplex & Penthouse in Pune | Legend County",
    "description": "Bespoke 5 BHK combined duplex and penthouse residences in Bavdhan, Pune starting from \u20b93.40 Cr*. High-rise luxury at Goel Ganga Legend County with sports features.",
    "keywords": "5 BHK flats in Pune, luxury duplex Pune, penthouse in Pune Bavdhan, combined apartments West Pune, duplex penthouses near Chandni Chowk, luxury residences Pune",
    "canonical": "https://goelgangalegend.com/luxury-5bhk-duplex-penthouse-flats-pune",
    "image": "https://goelgangalegend.com/hero-aerial.webp",
    "type": "website"
  },
  "/luxury-residences-pune-west": {
    "title": "Luxury Residences in Pune West | Premium Gated Community",
    "description": "Explore the finest luxury residences in Pune West at Goel Ganga Legend County. 30-acre sports township in Bavdhan featuring premium amenities and global academies.",
    "keywords": "luxury residences in Pune, Pune real estate luxury properties, luxury property Pune West, premium estate homes Bavdhan, elite gated community Pune",
    "canonical": "https://goelgangalegend.com/luxury-residences-pune-west",
    "image": "https://goelgangalegend.com/hero-aerial.webp",
    "type": "website"
  },
  "/insights/bavdhan-real-estate-investment-2026": {
    "title": "Is Bavdhan the Best Real Estate Investment in Pune for 2026? | Legend County Insights",
    "description": "An in-depth analysis of Bavdhan's infrastructure growth, metro connectivity, and why sports townships are driving massive ROI.",
    "keywords": "Pune Real Estate, Bavdhan Real Estate, Goel Ganga Legend County, Sports Township Pune",
    "canonical": "https://goelgangalegend.com/insights/bavdhan-real-estate-investment-2026",
    "image": "https://goelgangalegend.com/hero-aerial.webp",
    "type": "article"
  },
  "/insights/cost-of-living-bavdhan-pune": {
    "title": "Cost of Living in Bavdhan Pune: A Comprehensive 2026 Guide | Legend County Insights",
    "description": "Explore the cost of living, top schools, healthcare, and lifestyle amenities in Bavdhan, Pune's most sought-after residential hub.",
    "keywords": "Pune Real Estate, Bavdhan Real Estate, Goel Ganga Legend County, Sports Township Pune",
    "canonical": "https://goelgangalegend.com/insights/cost-of-living-bavdhan-pune",
    "image": "https://goelgangalegend.com/gallery-clubhouse.webp",
    "type": "article"
  },
  "/insights/bavdhan-vs-hinjewadi-real-estate": {
    "title": "Bavdhan vs Hinjewadi: Where Should You Buy a Flat in Pune? | Legend County Insights",
    "description": "A detailed real estate comparison between Bavdhan and Hinjewadi for homebuyers and investors looking at ROI, lifestyle, and connectivity.",
    "keywords": "Pune Real Estate, Bavdhan Real Estate, Goel Ganga Legend County, Sports Township Pune",
    "canonical": "https://goelgangalegend.com/insights/bavdhan-vs-hinjewadi-real-estate",
    "image": "https://goelgangalegend.com/interior-luxury.webp",
    "type": "article"
  },
  "/insights/roi-sports-townships-pune": {
    "title": "Why Sports Townships Generate 20% Higher ROI in Pune | Legend County Insights",
    "description": "Discover why integrated sports townships in Pune, featuring international academies, are outperforming standalone residential buildings in rental yields and capital growth.",
    "keywords": "Pune Real Estate, Bavdhan Real Estate, Goel Ganga Legend County, Sports Township Pune",
    "canonical": "https://goelgangalegend.com/insights/roi-sports-townships-pune",
    "image": "https://goelgangalegend.com/gallery-football.webp",
    "type": "article"
  },
  "/insights/baner-pashan-link-road-real-estate-guide": {
    "title": "Baner Pashan Link Road Market: The Ultimate Luxury Residential Guide for Pune West | Legend County Insights",
    "description": "A deep-dive analysis of the Baner Pashan Link Road market, property rates, congestion index, and why luxury buyers are shifting to nearby premium townships.",
    "keywords": "Pune Real Estate, Bavdhan Real Estate, Goel Ganga Legend County, Sports Township Pune",
    "canonical": "https://goelgangalegend.com/insights/baner-pashan-link-road-real-estate-guide",
    "image": "https://goelgangalegend.com/interior-luxury.webp",
    "type": "article"
  },
  "/insights/pune-luxury-real-estate-demographics-2026": {
    "title": "Under-40 Homebuyers: Tech Wealth Reshaping Pune Luxury Real Estate | Legend County Insights",
    "description": "An analysis of why tech-savvy professionals under 40 represent 55% of Pune's luxury real estate sales, and how they prioritize wellness-first sports townships.",
    "keywords": "Pune Real Estate, Bavdhan Real Estate, Goel Ganga Legend County, Sports Township Pune",
    "canonical": "https://goelgangalegend.com/insights/pune-luxury-real-estate-demographics-2026",
    "image": "https://goelgangalegend.com/interior-luxury.webp",
    "type": "article"
  },
  "/insights/pune-metro-line-3-bavdhan-connector": {
    "title": "Pune Metro Line 3: Hinjewadi-Shivajinagar Metro Progress & Bavdhan Connectivity | Legend County Insights",
    "description": "Track the progress of Pune Metro Line 3 (Hinjewadi-Shivajinagar) and how the planned connector and feeder services benefit Goel Ganga Legend County Bavdhan residents.",
    "keywords": "Pune Real Estate, Bavdhan Real Estate, Goel Ganga Legend County, Sports Township Pune",
    "canonical": "https://goelgangalegend.com/insights/pune-metro-line-3-bavdhan-connector",
    "image": "https://goelgangalegend.com/hero-aerial.webp",
    "type": "article"
  },
  "/insights/post-chandni-chowk-traffic-index-bavdhan": {
    "title": "Post-Chandni Chowk Traffic Index: Commute Times to Baner & Kothrud in 2026 | Legend County Insights",
    "description": "An analysis of traffic index patterns, travel times, and connectivity benefits in Bavdhan following the multi-level Chandni Chowk flyover completion.",
    "keywords": "Pune Real Estate, Bavdhan Real Estate, Goel Ganga Legend County, Sports Township Pune",
    "canonical": "https://goelgangalegend.com/insights/post-chandni-chowk-traffic-index-bavdhan",
    "image": "https://goelgangalegend.com/hero-aerial.webp",
    "type": "article"
  },
  "/insights/top-international-schools-pune-west-bavdhan": {
    "title": "Top International Schools in Pune West: Family Relocation Guide to Bavdhan | Legend County Insights",
    "description": "A comprehensive directory of top schools, universities, and healthcare facilities near Bavdhan, Pune West, for families planning to relocate.",
    "keywords": "Pune Real Estate, Bavdhan Real Estate, Goel Ganga Legend County, Sports Township Pune",
    "canonical": "https://goelgangalegend.com/insights/top-international-schools-pune-west-bavdhan",
    "image": "https://goelgangalegend.com/gallery-clubhouse.webp",
    "type": "article"
  },
  "/insights/bavdhan-to-hinjewadi-it-park-commute-guide": {
    "title": "Bavdhan to Hinjewadi IT Park Commute Guide: Best Housing for IT Professionals | Legend County Insights",
    "description": "A comprehensive connectivity and commute analysis between Bavdhan and Hinjewadi IT Park for software engineers, tech managers, and real estate investors in 2026.",
    "keywords": "Pune Real Estate, Bavdhan Real Estate, Goel Ganga Legend County, Sports Township Pune",
    "canonical": "https://goelgangalegend.com/insights/bavdhan-to-hinjewadi-it-park-commute-guide",
    "image": "https://goelgangalegend.com/hero-aerial.webp",
    "type": "article"
  }
};

export const onRequest = async (context: { request: Request; next: () => Promise<Response> }) => {
  const url = new URL(context.request.url);
  const pathname = url.pathname.replace(/\/+$/, '') || '/';

  // 1. Edge Canonical Redirect: non-www apex to www.goelgangalegend.com (301 Permanent)
  if (url.hostname === 'goelgangalegend.com') {
    return Response.redirect(`https://www.goelgangalegend.com${url.pathname}${url.search}`, 301);
  }

  // 2. Pass through static assets, images, and API functions with zero overhead
  if (
    pathname.startsWith('/assets/') ||
    pathname.startsWith('/api/') ||
    pathname.endsWith('.webp') ||
    pathname.endsWith('.png') ||
    pathname.endsWith('.jpg') ||
    pathname.endsWith('.svg') ||
    pathname.endsWith('.xml') ||
    pathname.endsWith('.json') ||
    pathname.endsWith('.txt') ||
    pathname.endsWith('.js') ||
    pathname.endsWith('.css')
  ) {
    return context.next();
  }

  // 2. Fetch the standard response from Cloudflare Pages origin
  const response = await context.next();
  const contentType = response.headers.get('content-type') || '';

  // Only rewrite HTML responses
  if (!contentType.includes('text/html')) {
    return response;
  }

  const meta = META_REGISTRY[pathname];
  if (!meta) {
    return response;
  }

  // 3. Cloudflare Streaming HTMLRewriter - Sub-millisecond stream transformations
  const rewriter = new HTMLRewriter()
    .on('title', {
      element(element) {
        element.setInnerContent(meta.title);
      },
    })
    .on('meta[name="description"]', {
      element(element) {
        element.setAttribute('content', meta.description);
      },
    })
    .on('meta[name="keywords"]', {
      element(element) {
        element.setAttribute('content', meta.keywords);
      },
    })
    .on('link[rel="canonical"]', {
      element(element) {
        element.setAttribute('href', meta.canonical);
      },
    })
    .on('meta[property="og:title"]', {
      element(element) {
        element.setAttribute('content', meta.title);
      },
    })
    .on('meta[property="og:description"]', {
      element(element) {
        element.setAttribute('content', meta.description);
      },
    })
    .on('meta[property="og:url"]', {
      element(element) {
        element.setAttribute('content', meta.canonical);
      },
    })
    .on('meta[property="og:image"]', {
      element(element) {
        element.setAttribute('content', meta.image);
      },
    })
    .on('meta[property="og:type"]', {
      element(element) {
        element.setAttribute('content', meta.type);
      },
    })
    .on('head', {
      element(element) {
        // Inject Twitter Cards & Verified Canonical Links
        element.append(
          `<meta name="twitter:card" content="summary_large_image" />\n` +
          `<meta name="twitter:title" content="${meta.title.replace(/"/g, '&quot;')}" />\n` +
          `<meta name="twitter:description" content="${meta.description.replace(/"/g, '&quot;')}" />\n` +
          `<meta name="twitter:image" content="${meta.image}" />\n` +
          `<meta name="twitter:site" content="@goelgangapune" />`,
          { html: true }
        );
      },
    });

  return rewriter.transform(response);
};
