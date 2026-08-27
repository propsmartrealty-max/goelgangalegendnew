// Cloudflare Pages Function: /api/admin/leads
// Secure Edge Lead Ledger & CSV Export Endpoint

interface Env {
  DB?: {
    prepare: (query: string) => {
      all: () => Promise<{ results: Record<string, unknown>[] }>;
      bind: (...args: unknown[]) => {
        all: () => Promise<{ results: Record<string, unknown>[] }>;
      };
    };
  };
  ADMIN_API_KEY?: string;
}

const DEFAULT_ADMIN_KEY = 'gglc_edge_admin_2026';

export const onRequestGet = async (context: {
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

  const format = url.searchParams.get('format') || 'json';

  let leads: Record<string, unknown>[] = [];

  // Query Cloudflare D1 if available
  if (env.DB) {
    try {
      const { results } = await env.DB.prepare(
        'SELECT * FROM leads ORDER BY captured_at DESC LIMIT 500'
      ).all();
      leads = results || [];
    } catch (dbErr) {
      console.error('D1 query error:', dbErr);
    }
  }

  if (format === 'csv') {
    const headers = ['Lead ID', 'Name', 'Phone', 'Email', 'Source', 'Configuration', 'City', 'Country', 'Captured At'];
    const rows = leads.map(l => [
      `"${l.id || ''}"`,
      `"${l.name || ''}"`,
      `"${l.phone || ''}"`,
      `"${l.email || ''}"`,
      `"${l.source || ''}"`,
      `"${l.configuration || ''}"`,
      `"${l.city || ''}"`,
      `"${l.country || ''}"`,
      `"${l.captured_at || ''}"`
    ].join(','));

    const csvContent = [headers.join(','), ...rows].join('\n');

    return new Response(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="gglc_leads_${Date.now()}.csv"`,
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  return new Response(
    JSON.stringify({
      success: true,
      total_leads: leads.length,
      storage_engine: env.DB ? 'Cloudflare D1 SQL' : 'Edge Webhook Mirror',
      leads,
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }
  );
};
