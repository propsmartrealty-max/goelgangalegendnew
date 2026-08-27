// Cloudflare Pages Function: /api/media/:name
// Cloudflare R2 Object Storage Media Bridge with Edge Immutable Caching
// Enables zero-egress 4K floor plan & brochure streaming for Googlebot & Image Search

interface Env {
  MEDIA_BUCKET?: {
    get: (key: string) => Promise<{
      body: ReadableStream;
      httpMetadata?: { contentType?: string };
      writeHttpMetadata: (headers: Headers) => void;
    } | null>;
  };
}

export const onRequestGet = async (context: {
  request: Request;
  params: { name?: string };
  env: Env;
}) => {
  const { params, env } = context;
  const assetName = params.name;

  if (!assetName) {
    return new Response('Asset not specified', { status: 400 });
  }

  // 1. Fetch from Cloudflare R2 if binding is present
  if (env.MEDIA_BUCKET) {
    try {
      const object = await env.MEDIA_BUCKET.get(assetName);
      if (object) {
        const headers = new Headers();
        object.writeHttpMetadata(headers);
        headers.set('etag', `"${assetName}"`);
        headers.set('Cache-Control', 'public, max-age=31536000, immutable');
        headers.set('Access-Control-Allow-Origin', '*');

        return new Response(object.body, { headers });
      }
    } catch (r2Err) {
      console.warn('R2 read fallback:', r2Err);
    }
  }

  // 2. Fallback redirect to public asset
  return Response.redirect(`https://www.goelgangalegend.com/${assetName}`, 302);
};
