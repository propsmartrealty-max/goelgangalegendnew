// Cloudflare Pages Function: /api/lead
// Runs on Cloudflare V8 Edge Isolates (< 1ms execution time)

interface Env {
  GOOGLE_WEBHOOK_URL?: string;
  EMAIL_MIRROR?: string;
}

const DEFAULT_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbyeBBq1zKvx5Cmu3wpgdzuhSw0z465b3iQyH_mPeTJKNAlFBAlm41DBNPkZYBLXimv2/exec';
const DEFAULT_EMAIL_MIRROR = 'propsmartrealty@gmail.com';

export const onRequestOptions = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
};

export const onRequestPost = async (context: {
  request: Request;
  env: Env;
}) => {
  const { request, env } = context;

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  try {
    const rawData = await request.json() as Record<string, unknown>;

    // Basic Validation
    const phone = String(rawData.phone || '').replace(/\D/g, '');
    if (phone.length < 10) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid phone number' }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Cloudflare Edge Metadata Extraction
    const cf = (request as unknown as { cf?: Record<string, unknown> }).cf || {};
    const clientIp = request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for') || 'unknown';

    const enrichedLead = {
      project: 'Goel Ganga Legend County',
      domain: 'goelgangalegend.com',
      destination: env.EMAIL_MIRROR || DEFAULT_EMAIL_MIRROR,
      ...rawData,
      client_ip: clientIp,
      edge_city: cf.city || 'Unknown',
      edge_region: cf.region || 'Unknown',
      edge_country: cf.country || 'IN',
      edge_colo: cf.colo || 'Unknown',
      edge_processed_at: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      user_agent: request.headers.get('user-agent') || 'Unknown',
    };

    // Forward to Google Apps Script Webhook
    const webhookUrl = env.GOOGLE_WEBHOOK_URL || DEFAULT_WEBHOOK_URL;
    let upstreamSuccess = false;
    let upstreamStatus = 0;

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enrichedLead),
      });
      upstreamStatus = response.status;
      upstreamSuccess = response.ok || response.status === 302 || response.status === 200;
    } catch (err) {
      console.error('Upstream webhook error:', err);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Lead captured and processed by Cloudflare Ultra Edge.',
        upstream_dispatched: upstreamSuccess,
        upstream_status: upstreamStatus,
        lead_id: `GGLC-${Date.now()}`,
      }),
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error('Edge lead handler failure:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Failed to process lead at edge',
        details: error instanceof Error ? error.message : String(error),
      }),
      { status: 500, headers: corsHeaders }
    );
  }
};
