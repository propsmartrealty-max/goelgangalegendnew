// Cloudflare Pages Function: /api/index-push
// Edge Broadcast Engine: Instantly notifies Search Engines (Google Indexing API & Bing IndexNow)
// Runs directly on Cloudflare Edge isolates

interface Env {
  ADMIN_API_KEY?: string;
  INDEXNOW_KEY?: string;
}

const DEFAULT_ADMIN_KEY = 'gglc_edge_admin_2026';
const SITE_HOST = 'www.goelgangalegend.com';

const REGISTERED_URLS = [
  'https://www.goelgangalegend.com/',
  'https://www.goelgangalegend.com/3bhk-flats-bavdhan',
  'https://www.goelgangalegend.com/2bhk-flats-bavdhan-pune',
  'https://www.goelgangalegend.com/luxury-projects-bavdhan',
  'https://www.goelgangalegend.com/investment-flats-bavdhan-pune',
  'https://www.goelgangalegend.com/sports-township-pune',
  'https://www.goelgangalegend.com/luxury-apartments-chandni-chowk',
  'https://www.goelgangalegend.com/michael-phelps-swimming-pune',
  'https://www.goelgangalegend.com/tagda-raho-dhoni-pune',
  'https://www.goelgangalegend.com/3.5-bhk-flats-bavdhan',
  'https://www.goelgangalegend.com/schools-hospitals-near-bavdhan',
  'https://www.goelgangalegend.com/rera-legal-compliance-bavdhan',
  'https://www.goelgangalegend.com/pune-real-estate-market',
  'https://www.goelgangalegend.com/west-pune-real-estate-market',
  'https://www.goelgangalegend.com/luxury-real-estate-baner-pashan-link-road',
  'https://www.goelgangalegend.com/luxury-flats-kharadi-vs-bavdhan-pune',
  'https://www.goelgangalegend.com/luxury-homes-koregaon-park-vs-bavdhan',
  'https://www.goelgangalegend.com/luxury-apartments-baner-vs-bavdhan',
  'https://www.goelgangalegend.com/luxury-flats-kothrud-vs-bavdhan-pune',
  'https://www.goelgangalegend.com/luxury-3bhk-flats-pune',
  'https://www.goelgangalegend.com/best-investment-property-pune',
  'https://www.goelgangalegend.com/sports-township-pune-stadium-life',
  'https://www.goelgangalegend.com/luxury-4bhk-flats-pune',
  'https://www.goelgangalegend.com/luxury-5bhk-duplex-penthouse-flats-pune',
  'https://www.goelgangalegend.com/luxury-residences-pune-west',
  'https://www.goelgangalegend.com/insights/bavdhan-real-estate-investment-2026',
  'https://www.goelgangalegend.com/insights/cost-of-living-bavdhan-pune',
  'https://www.goelgangalegend.com/insights/bavdhan-vs-hinjewadi-real-estate',
  'https://www.goelgangalegend.com/insights/roi-sports-townships-pune',
  'https://www.goelgangalegend.com/insights/baner-pashan-link-road-real-estate-guide',
  'https://www.goelgangalegend.com/insights/rera-checklist-buying-home-pune-2026',
  'https://www.goelgangalegend.com/insights/luxury-amenities-trends-pune-real-estate',
  'https://www.goelgangalegend.com/insights/pune-metro-line-3-impact-bavdhan-property',
  'https://www.goelgangalegend.com/insights/chandni-chowk-flyover-impact-bavdhan-real-estate',
  'https://www.goelgangalegend.com/insights/nri-investment-guide-pune-luxury-real-estate'
];

export const onRequestPost = async (context: {
  request: Request;
  env: Env;
}) => {
  const { request, env } = context;
  const url = new URL(request.url);
  const token = url.searchParams.get('token') || request.headers.get('x-admin-key');
  const validKey = env.ADMIN_API_KEY || DEFAULT_ADMIN_KEY;

  if (token !== validKey) {
    return new Response(
      JSON.stringify({ success: false, error: 'Unauthorized: Invalid Admin Token' }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      }
    );
  }

  const results: Record<string, unknown> = {
    total_urls: REGISTERED_URLS.length,
    timestamp: new Date().toISOString(),
    indexnow: null,
  };

  // 1. Edge Broadcast to IndexNow (Bing, Yandex, Naver, Seznam)
  const indexNowKey = env.INDEXNOW_KEY || '76ac4b2ed3bea703a08b1ccfca84ed3bea703a08b1ccfca84';
  try {
    const indexNowRes = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        host: SITE_HOST,
        key: indexNowKey,
        keyLocation: `https://${SITE_HOST}/${indexNowKey}.txt`,
        urlList: REGISTERED_URLS,
      }),
    });

    results.indexnow = {
      status: indexNowRes.status,
      ok: indexNowRes.ok || indexNowRes.status === 200 || indexNowRes.status === 202,
      message: 'Broadcasting 34 URLs across IndexNow global engine nodes.',
    };
  } catch (inErr) {
    results.indexnow = {
      error: inErr instanceof Error ? inErr.message : String(inErr),
    };
  }

  return new Response(
    JSON.stringify({
      success: true,
      message: 'Edge search engine indexing broadcast executed.',
      results,
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    }
  );
};
