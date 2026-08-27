# Goel Ganga Legend County — Ultra Edge Platform

High-performance real estate portal for **Goel Ganga Legend County Bavdhan, Pune**, built with React 19, Vite 8, React Router v7, and optimized for **Cloudflare Ultra Edge (Pages + Edge Functions + Anycast CDN)**.

---

## 🚀 Cloudflare Pages Deployment Guide

### 1. Cloudflare Pages Dashboard Setup
1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/) and navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
2. Select repository: `vikasyewle-prog/goelgangalegend`.
3. Configure Build Settings:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/` (default)
4. Environment Variables (optional):
   - `NODE_VERSION`: `20`
   - `BYPASS_INDEXING`: `1` (automatically handled in Cloudflare CI/CD builds)

### 2. Edge Routing & Security Configuration
The repository includes pre-configured Cloudflare Edge rules:
- `public/_redirects`: Guarantees seamless single-page application (SPA) routing for all 24 programmatic silos and 10 insights articles without 404 errors.
- `public/_headers`: Enforces TLS 1.3, Strict-Transport-Security (HSTS Preload), XSS protections, MIME sniffing prevention, and immutable caching for hashed assets (`/assets/*`).
- `functions/api/lead.ts`: Cloudflare Pages Edge Function running on global V8 isolates to capture and enrich lead submissions with edge geolocation before webhook dispatch.

### 3. Custom Domain & DNS
1. Add custom domain: `goelgangalegend.com` & `www.goelgangalegend.com`.
2. Cloudflare automatically handles SSL/TLS certificates and enables HTTP/3 (QUIC) + 0-RTT connection resumption.

---

## 🛠 Local Development & Build Commands

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Run automated validation & production build
npm run build

# Preview production build locally
npm run preview
```

---

## 📊 SEO & Data Validation Pipeline

The project includes an automated pre-build and post-build data integrity suite:
- `scratch/validate_data.py`: Validates HTML tag pairings, RERA compliance (`P52100054578`), and internal link graph consistency.
- `scratch/validate_schemas.py`: Verifies Schema.org JSON-LD graph structures (Breadcrumbs, Product, ApartmentComplex, RealEstateListing).
- `scratch/seo_audit.py`: Generates the SEO audit matrix for word counts, metadata lengths, and indexing compliance.
