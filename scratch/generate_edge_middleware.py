import os
import re
import json

def generate_middleware():
    base_dir = "/Users/vikasyewle/goelgangalegendcounty"
    site_url = "https://goelgangalegend.com"

    # 1. Read Silos
    silo_path = os.path.join(base_dir, "src/data/siloData.ts")
    with open(silo_path, "r", encoding="utf-8") as f:
        silo_content = f.read()

    silo_matches = list(re.finditer(r'[\'"]?([a-zA-Z0-9\.\-_]+)[\'"]?:\s*\{\s*slug:\s*\'([^\']+)\',', silo_content))
    meta_db = {}

    for idx, match in enumerate(silo_matches):
        key = match.group(1)
        slug = match.group(2)
        start_idx = match.start()
        next_match = silo_matches[idx+1] if idx+1 < len(silo_matches) else None
        end_idx = next_match.start() if next_match else len(silo_content)
        block_text = silo_content[start_idx:end_idx]

        title_m = re.search(r'title:\s*[\'"]((?:[^\'\"\\]|\\.)*)[\'"]', block_text)
        desc_m = re.search(r'description:\s*[\'"]((?:[^\'\"\\]|\\.)*)[\'"]', block_text)
        kw_m = re.search(r'keywords:\s*[\'"]((?:[^\'\"\\]|\\.)*)[\'"]', block_text)

        title = title_m.group(1).replace("\\'", "'") if title_m else ""
        description = desc_m.group(1).replace("\\'", "'") if desc_m else ""
        keywords = kw_m.group(1).replace("\\'", "'") if kw_m else ""

        # Default image for silos
        img = f"{site_url}/hero-aerial.webp"
        if "3bhk" in slug:
            img = f"{site_url}/floorplan-3bhk.webp"
        elif "3.5" in slug:
            img = f"{site_url}/floorplan-3.5bhk.webp"
        elif "sports" in slug or "swimming" in slug or "dhoni" in slug:
            img = f"{site_url}/gallery-football.webp"

        meta_db[f"/{slug}"] = {
            "title": title,
            "description": description,
            "keywords": keywords,
            "canonical": f"{site_url}/{slug}",
            "image": img,
            "type": "website"
        }

    # 2. Read Articles
    article_path = os.path.join(base_dir, "src/pages/ArticlePage.tsx")
    with open(article_path, "r", encoding="utf-8") as f:
        article_content = f.read()

    art_matches = list(re.finditer(r'\'([a-zA-Z0-9\.\-_]+)\':\s*\{', article_content))
    for idx, match in enumerate(art_matches):
        slug = match.group(1)
        if slug == "main":
            continue
        start_idx = match.start()
        next_match = art_matches[idx+1] if idx+1 < len(art_matches) else None
        end_idx = next_match.start() if next_match else article_content.find("export default function ArticlePage")
        block_text = article_content[start_idx:end_idx]

        title_m = re.search(r'title:\s*[\'"]((?:[^\'\"\\]|\\.)*)[\'"]', block_text)
        desc_m = re.search(r'description:\s*[\'"]((?:[^\'\"\\]|\\.)*)[\'"]', block_text)
        img_m = re.search(r'image:\s*[\'"]((?:[^\'\"\\]|\\.)*)[\'"]', block_text)

        title = (title_m.group(1).replace("\\'", "'") if title_m else "") + " | Legend County Insights"
        description = desc_m.group(1).replace("\\'", "'") if desc_m else ""
        img_rel = img_m.group(1) if img_m else "/hero-aerial.webp"
        img = f"{site_url}{img_rel}" if img_rel.startswith("/") else f"{site_url}/{img_rel}"

        meta_db[f"/insights/{slug}"] = {
            "title": title,
            "description": description,
            "keywords": "Pune Real Estate, Bavdhan Real Estate, Goel Ganga Legend County, Sports Township Pune",
            "canonical": f"{site_url}/insights/{slug}",
            "image": img,
            "type": "article"
        }

    print(f"Loaded {len(meta_db)} routes into edge metadata database.")

    # 3. Generate TypeScript Middleware code
    db_json = json.dumps(meta_db, indent=2)

    middleware_code = f"""// Cloudflare Pages Edge Middleware: Zero-JS HTMLRewriter SEO & Social Preview Hydration
// Automatically hydrates <title>, <meta>, <link rel="canonical">, and Open Graph tags at the Cloudflare Edge

interface PageMeta {{
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  image: string;
  type: string;
}}

const META_REGISTRY: Record<string, PageMeta> = {db_json};

export const onRequest = async (context: {{ request: Request; next: () => Promise<Response> }}) => {{
  const url = new URL(context.request.url);
  const pathname = url.pathname.replace(/\\/+$/, '') || '/';

  // 1. Edge Canonical Redirect: non-www apex to www.goelgangalegend.com (301 Permanent)
  if (url.hostname === 'goelgangalegend.com') {{
    return Response.redirect(`https://www.goelgangalegend.com${{url.pathname}}${{url.search}}`, 301);
  }}

  // 2. Pass through static assets, images, and API functions with zero overhead
  if (
    pathname.startsWith('/assets/') ||
    pathname.startsWith('/api/') ||
    pathname.endsWith('.webp') ||
    pathname.endsWith('.png') ||
    pathname.endsWith('.jpg') ||
    pathname.endsWith('.svg') ||
    pathname.endsWith('.xml') ||
    pathname.endsWith('.json') ||
    pathname.endsWith('.txt') ||
    pathname.endsWith('.js') ||
    pathname.endsWith('.css')
  ) {{
    return context.next();
  }}

  // 2. Fetch the standard response from Cloudflare Pages origin
  const response = await context.next();
  const contentType = response.headers.get('content-type') || '';

  // Only rewrite HTML responses
  if (!contentType.includes('text/html')) {{
    return response;
  }}

  const meta = META_REGISTRY[pathname];
  if (!meta) {{
    return response;
  }}

  // 3. Cloudflare Streaming HTMLRewriter - Sub-millisecond stream transformations
  const rewriter = new HTMLRewriter()
    .on('title', {{
      element(element) {{
        element.setInnerContent(meta.title);
      }},
    }})
    .on('meta[name="description"]', {{
      element(element) {{
        element.setAttribute('content', meta.description);
      }},
    }})
    .on('meta[name="keywords"]', {{
      element(element) {{
        element.setAttribute('content', meta.keywords);
      }},
    }})
    .on('link[rel="canonical"]', {{
      element(element) {{
        element.setAttribute('href', meta.canonical);
      }},
    }})
    .on('meta[property="og:title"]', {{
      element(element) {{
        element.setAttribute('content', meta.title);
      }},
    }})
    .on('meta[property="og:description"]', {{
      element(element) {{
        element.setAttribute('content', meta.description);
      }},
    }})
    .on('meta[property="og:url"]', {{
      element(element) {{
        element.setAttribute('content', meta.canonical);
      }},
    }})
    .on('meta[property="og:image"]', {{
      element(element) {{
        element.setAttribute('content', meta.image);
      }},
    }})
    .on('meta[property="og:type"]', {{
      element(element) {{
        element.setAttribute('content', meta.type);
      }},
    }})
    .on('head', {{
      element(element) {{
        // Inject Twitter Cards & Verified Canonical Links
        element.append(
          `<meta name="twitter:card" content="summary_large_image" />\\n` +
          `<meta name="twitter:title" content="${{meta.title.replace(/"/g, '&quot;')}}" />\\n` +
          `<meta name="twitter:description" content="${{meta.description.replace(/"/g, '&quot;')}}" />\\n` +
          `<meta name="twitter:image" content="${{meta.image}}" />\\n` +
          `<meta name="twitter:site" content="@goelgangapune" />`,
          {{ html: true }}
        );
      }},
    }});

  return rewriter.transform(response);
}};
"""

    middleware_path = os.path.join(base_dir, "functions/_middleware.ts")
    with open(middleware_path, "w", encoding="utf-8") as f:
        f.write(middleware_code)
    print("Generated functions/_middleware.ts successfully.")

if __name__ == "__main__":
    generate_middleware()
