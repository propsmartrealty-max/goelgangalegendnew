// Cloudflare Pages Function: /api/r2-upload
// Authenticated Direct Upload Endpoint to Cloudflare R2 Object Storage
// Enables zero-maintenance deployment of 4K drone footage, high-res floor plans, and PDFs

interface Env {
  MEDIA_BUCKET?: {
    put: (key: string, value: ReadableStream | ArrayBuffer | string, options?: { httpMetadata?: { contentType?: string } }) => Promise<any>;
  };
  ADMIN_TOKEN?: string;
}

export const onRequestPost = async (context: {
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

  const filename = url.searchParams.get('filename');
  if (!filename) {
    return new Response(JSON.stringify({ error: 'Missing filename query parameter' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (!env.MEDIA_BUCKET) {
    return new Response(JSON.stringify({
      success: false,
      message: 'Cloudflare R2 MEDIA_BUCKET binding is not configured in this environment.',
      note: 'Bind an R2 bucket named MEDIA_BUCKET in Cloudflare Pages Settings -> Functions -> R2 Bucket Bindings.'
    }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const contentType = request.headers.get('content-type') || 'application/octet-stream';
    const body = request.body;

    if (!body) {
      return new Response(JSON.stringify({ error: 'Empty request body' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await env.MEDIA_BUCKET.put(filename, body, {
      httpMetadata: { contentType }
    });

    return new Response(JSON.stringify({
      success: true,
      filename,
      publicUrl: `https://www.goelgangalegend.com/api/media/${filename}`,
      message: 'Asset successfully uploaded to Cloudflare R2 Edge Storage.'
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
