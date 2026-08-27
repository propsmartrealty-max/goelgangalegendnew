// Cloudflare Pages Function: /api/r2-list
// Authenticated Endpoint to list objects stored in Cloudflare R2 bucket

interface Env {
  MEDIA_BUCKET?: {
    list: (options?: { prefix?: string; limit?: number }) => Promise<{
      objects: Array<{
        key: string;
        size: number;
        uploaded: Date;
        httpMetadata?: { contentType?: string };
      }>;
      truncated: boolean;
    }>;
  };
  ADMIN_TOKEN?: string;
}

export const onRequestGet = async (context: {
  request: Request;
  env: Env;
}) => {
  const { request, env } = context;
  const url = new URL(request.url);
  const token = url.searchParams.get('token');
  const validToken = env.ADMIN_TOKEN || 'gglc_edge_admin_2026';

  if (token !== validToken) {
    return new Response(JSON.stringify({ error: 'Unauthorized: Invalid Admin Token' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (!env.MEDIA_BUCKET) {
    return new Response(JSON.stringify({
      success: true,
      bucketConfigured: false,
      message: 'R2 MEDIA_BUCKET binding is optional. Public static assets are served from Edge CDN.',
      objects: []
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const listResult = await env.MEDIA_BUCKET.list({ limit: 100 });
    return new Response(JSON.stringify({
      success: true,
      bucketConfigured: true,
      count: listResult.objects.length,
      objects: listResult.objects.map((obj) => ({
        key: obj.key,
        sizeBytes: obj.size,
        uploadedAt: obj.uploaded,
        url: `https://www.goelgangalegend.com/api/media/${obj.key}`
      }))
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
