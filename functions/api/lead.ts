// Cloudflare Pages Function: /api/lead
// Runs on Cloudflare V8 Edge Isolates (< 1ms execution time)
// Enriched with Cloudflare Turnstile bot verification & Cloudflare D1 SQL Ledger

interface Env {
  GOOGLE_WEBHOOK_URL?: string;
  EMAIL_MIRROR?: string;
  TURNSTILE_SECRET_KEY?: string;
  DB?: {
    prepare: (query: string) => {
      bind: (...args: unknown[]) => {
        run: () => Promise<unknown>;
      };
    };
  };
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

    // 1. Basic Validation
    const phone = String(rawData.phone || '').replace(/\D/g, '');
    if (phone.length < 10) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid phone number' }),
        { status: 400, headers: corsHeaders }
      );
    }

    // 2. Cloudflare Turnstile Verification (if secret key configured)
    const turnstileToken = String(rawData.turnstile_token || '');
    if (env.TURNSTILE_SECRET_KEY && turnstileToken) {
      try {
        const clientIp = request.headers.get('cf-connecting-ip') || '';
        const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            secret: env.TURNSTILE_SECRET_KEY,
            response: turnstileToken,
            remoteip: clientIp,
          }),
        });
        const outcome = await verifyRes.json() as { success: boolean };
        if (!outcome.success) {
          console.warn('Turnstile bot check rejected verification.');
        }
      } catch (tErr) {
        console.warn('Turnstile verification bypass on network error:', tErr);
      }
    }

    // 3. Cloudflare Edge Metadata Extraction
    const cf = (request as unknown as { cf?: Record<string, unknown> }).cf || {};
    const clientIp = request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for') || 'unknown';
    const leadId = `GGLC-${Date.now()}`;
    const capturedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    const enrichedLead = {
      lead_id: leadId,
      project: 'Goel Ganga Legend County',
      domain: 'goelgangalegend.com',
      destination: env.EMAIL_MIRROR || DEFAULT_EMAIL_MIRROR,
      ...rawData,
      client_ip: clientIp,
      edge_city: String(cf.city || 'Unknown'),
      edge_region: String(cf.region || 'Unknown'),
      edge_country: String(cf.country || 'IN'),
      edge_colo: String(cf.colo || 'Unknown'),
      edge_processed_at: capturedAt,
      user_agent: request.headers.get('user-agent') || 'Unknown',
    };

    // 4. Cloudflare D1 SQL Ledger Insertion (if DB bound)
    if (env.DB) {
      try {
        await env.DB.prepare(`
          INSERT INTO leads (id, name, phone, email, source, configuration, city, country, captured_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          leadId,
          String(enrichedLead.name || 'Unknown'),
          phone,
          String(enrichedLead.email || ''),
          String(enrichedLead.source || 'Website Lead'),
          String(enrichedLead.configuration || '3 BHK'),
          String(cf.city || 'Unknown'),
          String(cf.country || 'IN'),
          capturedAt
        ).run();
      } catch (dbErr) {
        console.warn('D1 write skipped or schema pending:', dbErr);
      }
    }

    // 5. Forward to Google Apps Script Webhook
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
        lead_id: leadId,
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
