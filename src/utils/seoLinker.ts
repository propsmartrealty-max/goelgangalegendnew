const keywordLinks: Record<string, string> = {
  // Brand & Master
  "goel ganga legend county bavdhan": "",
  "goel ganga legend county": "",
  "ganga legend county": "",

  // Configuration Silos
  "goel ganga legend county bavdhan 3bhk": "3bhk-flats-bavdhan",
  "goel ganga legend county bavdhan 3 bhk": "3bhk-flats-bavdhan",
  "goel ganga legend county bavdhan 4bhk": "luxury-4bhk-flats-pune",
  "goel ganga legend county bavdhan 4 bhk": "luxury-4bhk-flats-pune",
  "goel ganga legend county bavdhan 3.5 bhk": "3.5-bhk-flats-bavdhan",
  "goel ganga legend county bavdhan 2 bhk": "2bhk-flats-bavdhan-pune",
  "4 bhk premium apartments in bavdhan": "luxury-4bhk-flats-pune",
  "bavdhan luxury apartments near hinjewadi": "investment-flats-bavdhan-pune",
  "spacious 3 bhk apartments bavdhan": "3bhk-flats-bavdhan",
  "3.5 bhk flats in bavdhan": "3.5-bhk-flats-bavdhan",
  "3.5 bhk in bavdhan": "3.5-bhk-flats-bavdhan",
  "3 bhk luxury flats in bavdhan": "3bhk-flats-bavdhan",
  "luxury 3 bhk flats in bavdhan": "3bhk-flats-bavdhan",
  "3 bhk flats in bavdhan": "3bhk-flats-bavdhan",
  "3 bhk apartments in bavdhan": "3bhk-flats-bavdhan",
  "3 bhk in bavdhan": "3bhk-flats-bavdhan",
  "2 bhk flats in bavdhan": "2bhk-flats-bavdhan-pune",
  "2 bhk apartments in bavdhan": "2bhk-flats-bavdhan-pune",
  "2 bhk in bavdhan": "2bhk-flats-bavdhan-pune",
  "luxury 4 bhk flats in pune": "luxury-4bhk-flats-pune",
  "luxury 4 bhk flats in bavdhan": "luxury-4bhk-flats-pune",
  "luxury 4 bhk flats": "luxury-4bhk-flats-pune",
  "4 bhk flats in pune": "luxury-4bhk-flats-pune",
  "4 bhk flats in bavdhan": "luxury-4bhk-flats-pune",
  "4 bhk in bavdhan": "luxury-4bhk-flats-pune",
  "combined 4 bhk apartments": "luxury-4bhk-flats-pune",
  "luxury duplex homes": "luxury-4bhk-flats-pune",
  "5 bhk flats in pune": "luxury-5bhk-duplex-penthouse-flats-pune",
  "5 bhk flats in bavdhan": "luxury-5bhk-duplex-penthouse-flats-pune",
  "5 bhk luxury duplex": "luxury-5bhk-duplex-penthouse-flats-pune",
  "luxury duplex pune": "luxury-5bhk-duplex-penthouse-flats-pune",
  "luxury duplex in pune": "luxury-5bhk-duplex-penthouse-flats-pune",
  "penthouse in pune": "luxury-5bhk-duplex-penthouse-flats-pune",
  "penthouse in bavdhan": "luxury-5bhk-duplex-penthouse-flats-pune",
  "luxury residences in pune": "luxury-residences-pune-west",
  "luxury residences pune": "luxury-residences-pune-west",
  "pune real estate luxury properties": "luxury-residences-pune-west",
  "luxury property pune west": "luxury-residences-pune-west",
  "premium estate homes": "luxury-residences-pune-west",
  
  // Theme & Infrastructure Silos
  "sports residences in pune": "sports-township-pune",
  "integrated sports township": "sports-township-pune",
  "sports township in pune": "sports-township-pune",
  "sports township": "sports-township-pune",
  "michael phelps swimming academy": "michael-phelps-swimming-pune",
  "michael phelps swimming": "michael-phelps-swimming-pune",
  "tagda raho by ms dhoni": "tagda-raho-dhoni-pune",
  "tagda raho dhoni": "tagda-raho-dhoni-pune",
  "tagda raho": "tagda-raho-dhoni-pune",
  "apartments near chandni chowk": "luxury-apartments-chandni-chowk",
  "luxury apartments near chandni chowk": "luxury-apartments-chandni-chowk",
  "luxury homes near chandani chowk": "luxury-apartments-chandni-chowk",
  "flats near chandni chowk": "luxury-apartments-chandni-chowk",
  "schools near bavdhan": "schools-hospitals-near-bavdhan",
  "hospitals near bavdhan": "schools-hospitals-near-bavdhan",
  "schools and hospitals": "schools-hospitals-near-bavdhan",
  "schools & hospitals": "schools-hospitals-near-bavdhan",
  "rera legal compliance": "rera-legal-compliance-bavdhan",
  "rera compliance": "rera-legal-compliance-bavdhan",
  "rera registered": "rera-legal-compliance-bavdhan",
  
  // Geo-targeted Silos
  "pune real estate market": "pune-real-estate-market",
  "real estate market in pune": "pune-real-estate-market",
  "west pune real estate market": "west-pune-real-estate-market",
  "west pune real estate": "west-pune-real-estate-market",
  "luxury real estate baner pashan link road": "luxury-real-estate-baner-pashan-link-road",
  "baner pashan link road": "luxury-real-estate-baner-pashan-link-road",
  "luxury flats in kharadi": "luxury-flats-kharadi-vs-bavdhan-pune",
  "kharadi vs bavdhan": "luxury-flats-kharadi-vs-bavdhan-pune",
  "koregaon park vs bavdhan": "luxury-homes-koregaon-park-vs-bavdhan",
  "luxury homes in koregaon park": "luxury-homes-koregaon-park-vs-bavdhan",
  "baner vs bavdhan": "luxury-apartments-baner-vs-bavdhan",
  "luxury apartments in baner": "luxury-apartments-baner-vs-bavdhan",
  "kothrud vs bavdhan": "luxury-flats-kothrud-vs-bavdhan-pune",
  "luxury flats in kothrud": "luxury-flats-kothrud-vs-bavdhan-pune",
  "luxury projects in bavdhan": "luxury-projects-bavdhan",
  "gated community luxury flats": "luxury-projects-bavdhan",
  "high-rise luxury apartments": "luxury-projects-bavdhan",
  "new luxury projects in bavdhan": "luxury-projects-bavdhan",
  "premium flats near kothrud": "luxury-flats-kothrud-vs-bavdhan-pune",
  "investment in bavdhan": "investment-flats-bavdhan-pune",
  "luxury 3 bhk flats in pune": "luxury-3bhk-flats-pune",
  "best investment property pune": "best-investment-property-pune",
  "best investment property": "best-investment-property-pune",
  "sports township pune stadium life": "sports-township-pune-stadium-life",
  "stadium life": "sports-township-pune-stadium-life",

  // Insights / MOFU Guides
  "bavdhan real estate investment": "insights/bavdhan-real-estate-investment-2026",
  "cost of living in bavdhan": "insights/cost-of-living-bavdhan-pune",
  "bavdhan vs hinjewadi": "insights/bavdhan-vs-hinjewadi-real-estate",
  "roi sports townships": "insights/roi-sports-townships-pune",
  "baner pashan link road guide": "insights/baner-pashan-link-road-real-estate-guide",
  "pune luxury real estate demographics": "insights/pune-luxury-real-estate-demographics-2026",
  "pune metro line 3": "insights/pune-metro-line-3-bavdhan-connector",
  "chandni chowk traffic": "insights/post-chandni-chowk-traffic-index-bavdhan",
  "top international schools in pune west": "insights/top-international-schools-pune-west-bavdhan",
  "bavdhan to hinjewadi it park commute guide": "insights/bavdhan-to-hinjewadi-it-park-commute-guide",
  "bavdhan to hinjewadi commute": "insights/bavdhan-to-hinjewadi-it-park-commute-guide"
};

// Sort keywords by length in descending order to avoid matching substrings first
const sortedKeywords = Object.keys(keywordLinks).sort((a, b) => b.length - a.length);

const normalize = (s: string) => s.replace(/^\/+|\/+$/g, "").toLowerCase();

/**
 * Dynamically injects internal contextual links into plain text segments of HTML string.
 * It prevents self-linking and duplicates per page run.
 * 
 * @param htmlText The source HTML content string
 * @param currentSlug The slug of the page requesting linking
 * @returns HTML string with injected anchor links
 */
export function injectInternalLinks(htmlText: string, currentSlug: string): string {
  if (!htmlText) return htmlText;

  // Split by HTML tags to prevent replacing text inside tag parameters (like class, style, href)
  const parts = htmlText.split(/(<[^>]+>)/g);
  const linkedSlugs = new Set<string>();

  let insideAnchor = false;

  for (let j = 0; j < parts.length; j++) {
    if (j % 2 === 1) {
      // HTML tag element
      const tag = parts[j].toLowerCase();
      if (tag.startsWith('<a') && !tag.endsWith('/>')) {
        insideAnchor = true;
      } else if (tag === '</a>') {
        insideAnchor = false;
      }
      continue;
    }

    // Plain text element
    if (insideAnchor) {
      continue;
    }

    let text = parts[j];
    
    // Find the first match of any keyword in this text segment
    for (const keyword of sortedKeywords) {
      const targetSlug = keywordLinks[keyword];
      
      // Skip if linking to itself
      if (normalize(targetSlug) === normalize(currentSlug)) {
        continue;
      }

      // Skip if this target slug was already linked on the page
      if (linkedSlugs.has(targetSlug)) {
        continue;
      }

      const escapedKeyword = keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      // Look for keyword matching whole words
      const regex = new RegExp('\\b(' + escapedKeyword + ')\\b', 'i');
      const match = text.match(regex);

      if (match && match.index !== undefined) {
        const matchedText = match[1];
        const finalUrl = targetSlug === "" ? "/" : `/${targetSlug}`;
        const replacement = `<a href="${finalUrl}"><strong>${matchedText}</strong></a>`;
        
        // Replace first match only
        text = text.slice(0, match.index) + replacement + text.slice(match.index + matchedText.length);
        linkedSlugs.add(targetSlug);
        
        // Limit to 1 link injection per segment to prevent over-linking
        break;
      }
    }
    parts[j] = text;
  }

  return parts.join("");
}
