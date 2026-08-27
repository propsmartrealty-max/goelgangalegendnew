// Cloudflare Pages Function: /google-property-feed.xml
// High-Speed V8 Edge Real Estate Property Listing Feed Streamer

export const onRequestGet = async () => {
  const siteUrl = "https://www.goelgangalegend.com";

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<listings xmlns="http://www.google.com/schemas/sitemap-realestate/1.0">
  
  <listing>
    <listing_id>GGLC-3BHK-GRAND</listing_id>
    <project_name>Goel Ganga Legend County</project_name>
    <developer>Goel Ganga Developments</developer>
    <rera_registration_number>P52100054578</rera_registration_number>
    <title>Luxury 3 BHK Grand Residence in Bavdhan Pune</title>
    <description>3 BHK luxury apartment with 1,124 sq. ft. carpet area, double-aspect balcony overlooking NDA hills, and 12.5-acre sports arena with Michael Phelps Swimming.</description>
    <property_type>Apartment</property_type>
    <listing_type>For Sale</listing_type>
    <status>Active</status>
    <price currency="INR">17700000</price>
    <price_display>₹1.77 Cr*</price_display>
    <bedrooms>3</bedrooms>
    <bathrooms>3</bathrooms>
    <balconies>2</balconies>
    <floor_size unit="SQFT">1124</floor_size>
    <super_built_up_area unit="SQFT">1550</super_built_up_area>
    <furnishing>Unfurnished</furnishing>
    <facing>East</facing>
    <possession_year>2026</possession_year>
    <url>${siteUrl}/3bhk-flats-bavdhan</url>
    <virtual_tour_url>${siteUrl}/#cinema</virtual_tour_url>
    <address>
      <street_address>NDA Road, Near Chandni Chowk, Bavdhan</street_address>
      <locality>Bavdhan Budruk</locality>
      <city>Pune</city>
      <state>Maharashtra</state>
      <postal_code>411021</postal_code>
      <country>IN</country>
      <latitude>18.5158</latitude>
      <longitude>73.7819</longitude>
    </address>
    <photos>
      <photo url="${siteUrl}/hero-aerial.webp" caption="Goel Ganga Legend County 30-Acre Sports Township Aerial View" />
      <photo url="${siteUrl}/floorplan-3bhk.webp" caption="3 BHK Grand Floor Plan Layout (1,124 Sq.Ft.)" />
      <photo url="${siteUrl}/amenities-pool.webp" caption="Olympic Competition Pool - Michael Phelps Swimming Academy" />
    </photos>
    <features>
      <feature>Olympic Size Swimming Pool</feature>
      <feature>Michael Phelps Swimming Academy</feature>
      <feature>MS Dhoni Tagda Raho Fitness Protocol</feature>
      <feature>South United Football Academy</feature>
      <feature>PMC Municipal Water Supply</feature>
      <feature>Double-Aspect Hill View Balconies</feature>
    </features>
  </listing>

  <listing>
    <listing_id>GGLC-3.5BHK-ELITE</listing_id>
    <project_name>Goel Ganga Legend County</project_name>
    <developer>Goel Ganga Developments</developer>
    <rera_registration_number>P52100054578</rera_registration_number>
    <title>3.5 BHK Elite Residence + Work-From-Home Study in Bavdhan Pune</title>
    <description>3.5 BHK luxury apartment with 1,380 sq. ft. carpet area, private WFH study lounge, and dual master balconies.</description>
    <property_type>Apartment</property_type>
    <listing_type>For Sale</listing_type>
    <status>Active</status>
    <price currency="INR">21000000</price>
    <price_display>₹2.10 Cr*</price_display>
    <bedrooms>3.5</bedrooms>
    <bathrooms>3</bathrooms>
    <balconies>2</balconies>
    <floor_size unit="SQFT">1380</floor_size>
    <super_built_up_area unit="SQFT">1890</super_built_up_area>
    <furnishing>Unfurnished</furnishing>
    <facing>North-East</facing>
    <possession_year>2026</possession_year>
    <url>${siteUrl}/3.5-bhk-flats-bavdhan</url>
    <virtual_tour_url>${siteUrl}/#cinema</virtual_tour_url>
    <address>
      <street_address>NDA Road, Near Chandni Chowk, Bavdhan</street_address>
      <locality>Bavdhan Budruk</locality>
      <city>Pune</city>
      <state>Maharashtra</state>
      <postal_code>411021</postal_code>
      <country>IN</country>
      <latitude>18.5158</latitude>
      <longitude>73.7819</longitude>
    </address>
    <photos>
      <photo url="${siteUrl}/hero-aerial.webp" caption="Goel Ganga Legend County Aerial View" />
      <photo url="${siteUrl}/floorplan-3.5bhk.webp" caption="3.5 BHK Elite Series Floor Plan Layout (1,380 Sq.Ft.)" />
    </photos>
    <features>
      <feature>Private Work-From-Home Study</feature>
      <feature>12.5-Acre Sports Township Arena</feature>
      <feature>Michael Phelps Swimming Academy</feature>
      <feature>PMC Municipal Water Supply</feature>
    </features>
  </listing>

  <listing>
    <listing_id>GGLC-4BHK-DUPLEX</listing_id>
    <project_name>Goel Ganga Legend County</project_name>
    <developer>Goel Ganga Developments</developer>
    <rera_registration_number>P52100054578</rera_registration_number>
    <title>4 BHK Sky Duplex Penthouse in Bavdhan Pune</title>
    <description>Palatial 4 BHK double-height sky duplex with 2,150 sq. ft. carpet area and private open-air sky terrace.</description>
    <property_type>Penthouse</property_type>
    <listing_type>For Sale</listing_type>
    <status>Active</status>
    <price currency="INR">26500000</price>
    <price_display>₹2.65 Cr*</price_display>
    <bedrooms>4</bedrooms>
    <bathrooms>4</bathrooms>
    <balconies>3</balconies>
    <floor_size unit="SQFT">2150</floor_size>
    <super_built_up_area unit="SQFT">2950</super_built_up_area>
    <furnishing>Unfurnished</furnishing>
    <facing>North</facing>
    <possession_year>2026</possession_year>
    <url>${siteUrl}/luxury-4bhk-flats-pune</url>
    <virtual_tour_url>${siteUrl}/#cinema</virtual_tour_url>
    <address>
      <street_address>NDA Road, Near Chandni Chowk, Bavdhan</street_address>
      <locality>Bavdhan Budruk</locality>
      <city>Pune</city>
      <state>Maharashtra</state>
      <postal_code>411021</postal_code>
      <country>IN</country>
      <latitude>18.5158</latitude>
      <longitude>73.7819</longitude>
    </address>
    <photos>
      <photo url="${siteUrl}/hero-aerial.webp" caption="Goel Ganga Legend County Sky Duplex Tower View" />
    </photos>
    <features>
      <feature>Private Open-Air Sky Terrace</feature>
      <feature>Double-Height Great Room</feature>
      <feature>Unobstructed NDA Hill Views</feature>
    </features>
  </listing>

</listings>`;

  return new Response(xml.trim(), {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      'Access-Control-Allow-Origin': '*'
    }
  });
};
