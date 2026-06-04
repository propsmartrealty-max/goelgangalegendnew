import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  image?: string;
  faq?: { question: string; answer: string }[];
  robots?: string;
}

export default function SEO({ title, description, keywords, canonical, image, faq, robots }: SEOProps) {
  const siteUrl = 'https://goelgangalegend.com';
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl;
  const ogImage = image || `${siteUrl}/hero-aerial.webp`;

  const reviewsData = [
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Vikram Mehta"
      },
      "datePublished": "2026-05-18",
      "reviewBody": "Moving to Legend County was the best decision for my family. My kids are now part of the football academy, and the 3-minute commute to Chandni Chowk saves me an hour every day.",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      }
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Anjali Sharma"
      },
      "datePublished": "2026-05-19",
      "reviewBody": "The Tagda Raho center is incredible. Having professional-grade functional training equipment within the township is something I haven't seen anywhere else in Pune.",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      }
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Rahul Deshpande"
      },
      "datePublished": "2026-05-20",
      "reviewBody": "Bavdhan is a goldmine for appreciation. With the sports-first theme, Legend County stands out from the generic projects in the area. High rental yield potential.",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      }
    }
  ];

  const isHome = !canonical || canonical === '/';
  const isBhk3 = canonical === '/3bhk-flats-bavdhan';
  const isBhk35 = canonical === '/3.5-bhk-flats-bavdhan';
  const isArticle = canonical?.startsWith('/insights/');
  const isSilo = canonical && !isHome && !isArticle;

  // 1. Dynamic Breadcrumb List Schema
  const getBreadcrumbsSchema = () => {
    if (isHome) return null;

    const itemListElement = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl
      }
    ];

    if (isArticle) {
      itemListElement.push({
        "@type": "ListItem",
        "position": 2,
        "name": "Insights",
        "item": `${siteUrl}/#blog`
      });
      itemListElement.push({
        "@type": "ListItem",
        "position": 3,
        "name": title,
        "item": fullCanonical
      });
    } else {
      itemListElement.push({
        "@type": "ListItem",
        "position": 2,
        "name": title,
        "item": fullCanonical
      });
    }

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": itemListElement
    };
  };

  // 2. Product / Offer Schema (Configuration Pages only)
  const getProductSchema = () => {
    if (isBhk3) {
      return {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": "3 BHK Luxe Apartment - Goel Ganga Legend County",
        "image": [`${siteUrl}/floorplan-3bhk.webp`],
        "description": "Premium 3 BHK Luxe residence in Bavdhan, Pune. 1124 Sq.Ft. usable carpet area with sports views.",
        "sku": "GGLC-3BHK-LUXE",
        "brand": {
          "@type": "Brand",
          "name": "Goel Ganga Developments"
        },
        "offers": {
          "@type": "Offer",
          "url": fullCanonical,
          "priceCurrency": "INR",
          "price": "17700000",
          "availability": "https://schema.org/InStock",
          "priceValidUntil": "2027-12-31"
        },
        "additionalProperty": [
          { "@type": "PropertyValue", "name": "Structure", "value": "Earthquake Resistant RCC" },
          { "@type": "PropertyValue", "name": "Flooring", "value": "800x800 Vitrified Tiles" },
          { "@type": "PropertyValue", "name": "Security", "value": "3-Tier with Digital Locks" }
        ]
      };
    }

    if (isBhk35) {
      return {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": "3.5 BHK Premium Apartment - Goel Ganga Legend County",
        "image": [`${siteUrl}/floorplan-3.5bhk.webp`],
        "description": "Spacious 3.5 BHK Premium residence in Bavdhan, Pune. Elite living with an extra room for home office/yoga.",
        "sku": "GGLC-3.5BHK-PREMIUM",
        "brand": {
          "@type": "Brand",
          "name": "Goel Ganga Developments"
        },
        "offers": {
          "@type": "Offer",
          "url": fullCanonical,
          "priceCurrency": "INR",
          "price": "21000000",
          "availability": "https://schema.org/InStock",
          "priceValidUntil": "2027-12-31"
        },
        "additionalProperty": [
          { "@type": "PropertyValue", "name": "Structure", "value": "Earthquake Resistant RCC" },
          { "@type": "PropertyValue", "name": "Flooring", "value": "800x800 Vitrified Tiles" },
          { "@type": "PropertyValue", "name": "Security", "value": "3-Tier with Digital Locks" }
        ]
      };
    }

    return null;
  };

  // 3. RealEstateListing Schema (Silo pages only)
  const getRealEstateListingSchema = () => {
    if (!isSilo) return null;
    return {
      "@context": "https://schema.org",
      "@type": "RealEstateListing",
      "name": title,
      "description": description,
      "url": fullCanonical,
      "image": ogImage,
      "brand": {
        "@type": "Brand",
        "name": "Goel Ganga Developments",
        "url": "https://goelganga.com"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Sr. No. 34, Bavdhan Budruk",
        "addressLocality": "Pune",
        "addressRegion": "Maharashtra",
        "postalCode": "411021",
        "addressCountry": "IN"
      },
      "about": {
        "@type": "ApartmentComplex",
        "name": "Goel Ganga Legend County Bavdhan",
        "url": siteUrl,
        "description": "Experience Pune's premier 30-acre sports township. Luxury 2, 3 & 3.5 BHK flats in Bavdhan with 9+ international sports academies.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Sr. No. 34, Bavdhan Budruk, Near Chandni Chowk",
          "addressLocality": "Pune",
          "addressRegion": "Maharashtra",
          "postalCode": "411021",
          "addressCountry": "IN"
        }
      },
      "amenityFeature": [
        { "@type": "LocationFeatureSpecification", "name": "12.5 Acre Sports Arena", "value": "true" },
        { "@type": "LocationFeatureSpecification", "name": "Michael Phelps Swimming Academy", "value": "true" },
        { "@type": "LocationFeatureSpecification", "name": "3-tier Security", "value": "true" }
      ]
    };
  };

  // 4. LocalBusiness Schema (Home page only)
  const getLocalBusinessSchema = () => {
    if (!isHome) return null;
    return {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "RealEstateAgent"],
      "name": "Goel Ganga Legend County Bavdhan",
      "image": ogImage,
      "description": "Experience Pune's premier 30-acre sports township. Luxury 3 & 3.5 BHK flats in Bavdhan with 9+ international sports academies.",
      "@id": `${siteUrl}/#localbusiness`,
      "url": siteUrl,
      "telephone": "+917744009295",
      "priceRange": "₹1.77 Cr - ₹2.10 Cr",
      "hasMap": "https://maps.app.goo.gl/vL7k5ZndB2tVNDBf7",
      "areaServed": [
        {
          "@type": "AdministrativeArea",
          "name": "Bavdhan"
        },
        {
          "@type": "AdministrativeArea",
          "name": "Pune"
        },
        {
          "@type": "AdministrativeArea",
          "name": "West Pune"
        },
        {
          "@type": "AdministrativeArea",
          "name": "Kothrud"
        },
        {
          "@type": "AdministrativeArea",
          "name": "Baner"
        },
        {
          "@type": "AdministrativeArea",
          "name": "Pashan Link Road"
        },
        {
          "@type": "AdministrativeArea",
          "name": "Oxford Golf Resort"
        },
        {
          "@type": "AdministrativeArea",
          "name": "Hinjewadi"
        }
      ],
      "knowsAbout": [
        "Real Estate in Pune",
        "Flats in Bavdhan Pune",
        "Luxury apartments near Chandni Chowk",
        "Sports township in Pune",
        "Premium properties in West Pune"
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Sr. No. 34, Bavdhan Budruk, Near Chandni Chowk",
        "addressLocality": "Pune",
        "addressRegion": "Maharashtra",
        "postalCode": "411021",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 18.512876,
        "longitude": 73.771961
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "520"
      },
      "review": reviewsData,
      "memberOf": {
        "@id": `${siteUrl}/#organization`
      },
      "amenityFeature": [
        { "@type": "LocationFeatureSpecification", "name": "Michael Phelps Swimming Academy", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Tagda Raho by MS Dhoni", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "South United Football Academy", "value": true }
      ],
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "09:00",
        "closes": "19:00"
      },
      "currenciesAccepted": "INR",
      "paymentAccepted": "Cheque, Credit Card, Wire Transfer",
      "sameAs": [
        "https://www.facebook.com/goelgangadevelopments",
        "https://www.instagram.com/goelgangadevelopments",
        "https://www.linkedin.com/company/goel-ganga-developments",
        "https://www.youtube.com/@GoelGangaDevelopments",
        "https://twitter.com/goelgangapune",
        "https://maps.app.goo.gl/vL7k5ZndB2tVNDBf7",
        "https://en.wikipedia.org/wiki/Pune",
        "https://en.wikipedia.org/wiki/Bavdhan"
      ]
    };
  };

  // 5. Organization Schema (Home page only)
  const getOrganizationSchema = () => {
    if (!isHome) return null;
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      "name": "Goel Ganga Developments",
      "url": siteUrl,
      "logo": `${siteUrl}/logo.webp`,
      "sameAs": [
        "https://www.facebook.com/goelgangadevelopments",
        "https://www.instagram.com/goelgangadevelopments",
        "https://www.linkedin.com/company/goel-ganga-developments",
        "https://www.youtube.com/@GoelGangaDevelopments",
        "https://twitter.com/goelgangapune"
      ]
    };
  };

  // 6. WebSite Schema (Home page only)
  const getWebSiteSchema = () => {
    if (!isHome) return null;
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      "name": "Goel Ganga Legend County Bavdhan",
      "url": siteUrl,
      "publisher": {
        "@id": `${siteUrl}/#organization`
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${siteUrl}/?s={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    };
  };

  // 7. ApartmentComplex Schema (Home and BHK config pages)
  const getApartmentComplexSchema = () => {
    if (!isHome && !isBhk3 && !isBhk35) return null;
    return {
      "@context": "https://schema.org",
      "@type": "ApartmentComplex",
      "@id": `${siteUrl}/#apartmentcomplex`,
      "name": "Goel Ganga Legend County Bavdhan",
      "description": "Experience Pune's premier 30-acre sports township. Luxury 2, 3 & 3.5 BHK flats in Bavdhan with 9+ international sports academies.",
      "url": siteUrl,
      "brand": {
        "@id": `${siteUrl}/#organization`
      },
      "hasMap": "https://maps.app.goo.gl/vL7k5ZndB2tVNDBf7",
      "numberOfBedrooms": "2, 3, 3.5",
      "priceRange": "₹1.77 Cr - ₹2.10 Cr",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Sr. No. 34, Bavdhan Budruk, Near Chandni Chowk",
        "addressLocality": "Pune",
        "addressRegion": "Maharashtra",
        "postalCode": "411021",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 18.512876,
        "longitude": 73.771961
      },
      "telephone": "+917744009295",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "520"
      },
      "review": reviewsData,
      "numberOfAccommodationUnits": {
        "@type": "QuantitativeValue",
        "value": 1000,
        "unitText": "Apartments"
      },
      "amenityFeature": [
        { "@type": "LocationFeatureSpecification", "name": "Michael Phelps Swimming Academy", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Tagda Raho by MS Dhoni", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "South United Football Academy", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Clubhouse", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Gymnasium", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Tennis Courts", "value": true }
      ]
    };
  };

  // 8. SiteNavigationElement Schema (Home page only)
  const getSiteNavigationSchema = () => {
    if (!isHome) return null;
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "SiteNavigationElement",
          "@id": `${siteUrl}/#nav-about`,
          "name": "About Project",
          "url": `${siteUrl}/#about`
        },
        {
          "@type": "SiteNavigationElement",
          "@id": `${siteUrl}/#nav-amenities`,
          "name": "Township Amenities",
          "url": `${siteUrl}/#amenities`
        },
        {
          "@type": "SiteNavigationElement",
          "@id": `${siteUrl}/#nav-sports`,
          "name": "Sports Academies",
          "url": `${siteUrl}/#sports`
        },
        {
          "@type": "SiteNavigationElement",
          "@id": `${siteUrl}/#nav-floorplans`,
          "name": "Configurations & Floor Plans",
          "url": `${siteUrl}/#floorplans`
        },
        {
          "@type": "SiteNavigationElement",
          "@id": `${siteUrl}/#nav-location`,
          "name": "Location & Connectivity",
          "url": `${siteUrl}/#location`
        },
        {
          "@type": "SiteNavigationElement",
          "@id": `${siteUrl}/#nav-contact`,
          "name": "Contact Partner",
          "url": `${siteUrl}/#contact`
        }
      ]
    };
  };

  // 9. VideoObject Schema (Home page only)
  const getVideoSchema = () => {
    if (!isHome) return null;
    return {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      "@id": `${siteUrl}/#video`,
      "name": "Goel Ganga Legend County Bavdhan — Official 2026 Cinematic Walkthrough",
      "description": "Cinematic walkthrough of Pune's premier 30-acre sports township. Experience the Michael Phelps Swimming Academy and Dhoni's Tagda Raho center.",
      "thumbnailUrl": [
        `${siteUrl}/hero-aerial.webp`
      ],
      "uploadDate": "2026-06-03T09:00:00+05:30",
      "duration": "PT2M15S",
      "contentUrl": `${siteUrl}/hero-aerial.webp`,
      "embedUrl": `${siteUrl}/#cinema`,
      "publisher": {
        "@id": `${siteUrl}/#organization`
      },
      "interactionStatistic": {
        "@type": "InteractionCounter",
        "interactionType": { "@type": "WatchAction" },
        "userInteractionCount": 12500
      }
    };
  };

  const breadcrumbsSchema = getBreadcrumbsSchema();
  const productSchema = getProductSchema();
  const realEstateSchema = getRealEstateListingSchema();
  const localBusinessSchema = getLocalBusinessSchema();
  const organizationSchema = getOrganizationSchema();
  const websiteSchema = getWebSiteSchema();
  const apartmentComplexSchema = getApartmentComplexSchema();
  const siteNavigationSchema = getSiteNavigationSchema();
  const videoSchema = getVideoSchema();

  // Consolidate all schemas into a single semantic @graph definition for deepest web data integration
  const getConsolidatedSchema = () => {
    const graph: any[] = [];

    if (breadcrumbsSchema) graph.push(breadcrumbsSchema);
    if (productSchema) graph.push(productSchema);
    if (realEstateSchema) graph.push(realEstateSchema);
    if (localBusinessSchema) graph.push(localBusinessSchema);
    if (organizationSchema) graph.push(organizationSchema);
    if (websiteSchema) graph.push(websiteSchema);
    if (apartmentComplexSchema) graph.push(apartmentComplexSchema);
    if (videoSchema) graph.push(videoSchema);

    if (siteNavigationSchema) {
      if (siteNavigationSchema["@graph"]) {
        graph.push(...siteNavigationSchema["@graph"]);
      } else {
        graph.push(siteNavigationSchema);
      }
    }

    if (faq && faq.length > 0) {
      graph.push({
        "@type": "FAQPage",
        "mainEntity": faq.map((item) => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer
          }
        }))
      });
    }

    if (graph.length === 0) return null;

    // Remove separate @context properties from individual nodes to conform with the single parent @context
    const cleanedGraph = graph.map(node => {
      const { "@context": context, ...rest } = node;
      return rest;
    });

    return {
      "@context": "https://schema.org",
      "@graph": cleanedGraph
    };
  };

  const consolidatedSchema = getConsolidatedSchema();

  const robotsMeta = robots || 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robotsMeta} />
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Goel Ganga Legend County" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@goelgangapune" />
      <meta name="twitter:creator" content="@goelgangapune" />

      {/* Consolidated Semantic Graph Schema */}
      {consolidatedSchema && (
        <script type="application/ld+json">
          {JSON.stringify(consolidatedSchema)}
        </script>
      )}
    </Helmet>
  );
}
