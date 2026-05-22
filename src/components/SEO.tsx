import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  image?: string;
  faq?: { question: string; answer: string }[];
}

export default function SEO({ title, description, keywords, canonical, image, faq }: SEOProps) {
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
      "name": "Goel Ganga Legend County",
      "image": ogImage,
      "description": "Experience Pune's premier 30-acre sports township. Luxury 3 & 3.5 BHK flats in Bavdhan with 9+ international sports academies.",
      "@id": `${siteUrl}/#localbusiness`,
      "url": siteUrl,
      "telephone": "+912067654321",
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
        "latitude": 18.5126,
        "longitude": 73.7667
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "520"
      },
      "review": reviewsData,
      "memberOf": {
        "@type": "Organization",
        "name": "Goel Ganga Developments"
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
      "name": "Goel Ganga Developments",
      "url": siteUrl,
      "logo": `${siteUrl}/logo.webp`,
      "sameAs": [
        "https://www.facebook.com/goelgangadevelopments",
        "https://www.instagram.com/goelgangadevelopments"
      ]
    };
  };

  // 6. WebSite Schema (Home page only)
  const getWebSiteSchema = () => {
    if (!isHome) return null;
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Goel Ganga Legend County",
      "url": siteUrl,
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
      "name": "Goel Ganga Legend County",
      "description": "Experience Pune's premier 30-acre sports township. Luxury 2, 3 & 3.5 BHK flats in Bavdhan with 9+ international sports academies.",
      "url": siteUrl,
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
        "latitude": 18.5126,
        "longitude": 73.7667
      },
      "telephone": "+912067654321",
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

  const breadcrumbsSchema = getBreadcrumbsSchema();
  const productSchema = getProductSchema();
  const realEstateSchema = getRealEstateListingSchema();
  const localBusinessSchema = getLocalBusinessSchema();
  const organizationSchema = getOrganizationSchema();
  const websiteSchema = getWebSiteSchema();
  const apartmentComplexSchema = getApartmentComplexSchema();
  const siteNavigationSchema = getSiteNavigationSchema();

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:type" content="website" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Breadcrumb Schema */}
      {breadcrumbsSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbsSchema)}
        </script>
      )}

      {/* Google Product & Offer Schema */}
      {productSchema && (
        <script type="application/ld+json">
          {JSON.stringify(productSchema)}
        </script>
      )}

      {/* Real Estate Schema */}
      {realEstateSchema && (
        <script type="application/ld+json">
          {JSON.stringify(realEstateSchema)}
        </script>
      )}

      {/* LocalBusiness Schema */}
      {localBusinessSchema && (
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      )}

      {/* Organization Schema */}
      {organizationSchema && (
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      )}

      {/* WebSite Schema */}
      {websiteSchema && (
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
      )}

      {/* ApartmentComplex Schema */}
      {apartmentComplexSchema && (
        <script type="application/ld+json">
          {JSON.stringify(apartmentComplexSchema)}
        </script>
      )}

      {/* SiteNavigationElement Schema */}
      {siteNavigationSchema && (
        <script type="application/ld+json">
          {JSON.stringify(siteNavigationSchema)}
        </script>
      )}

      {/* FAQ Schema */}
      {faq && faq.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faq.map((item) => ({
              "@type": "Question",
              "name": item.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
              }
            }))
          })}
        </script>
      )}
    </Helmet>
  );
}
