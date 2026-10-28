# Estederma Aesthetics: website

Static site. Content lives in `data.js`, rendering in `main.js` + `pages.js`, styles in `styles.css`.

## Edit → build → deploy

1. Edit content in `data.js` (texts in TR + EN, phone/email at the top under `brand`).
2. Start the dev server (`estederma` launch config, port 5238).
3. Run `node tools/build.mjs`. This:
   - writes every page with its full SEO `<head>`: title, description, canonical, hreflang, Open Graph / Twitter, icons, JSON-LD;
   - prerenders each page's content in headless Chrome, so the HTML already contains the text (good for Google and for slow phones);
   - adds `width`/`height` to every image (no layout shift) and a rich JSON-LD graph per page (Organization/LocalBusiness, WebSite, WebPage subtype, BreadcrumbList, Product);
   - generates `en/` (English pages), `sitemap.xml` (with hreflang + images), `robots.txt`, `site.webmanifest`, the `urun.html` legacy redirect, plus `_headers` (Netlify / Cloudflare) and `.htaccess` (Apache) for caching and security headers;
   - finishes with an **SEO lint** that checks every built page: one `<h1>`, no skipped heading levels, title ≤ 70 and description 70–160 chars, canonical + hreflang, image alt and dimensions. Use `--strict` to fail the build on any warning.
4. Upload the whole folder except `tools/` (the host reads `_headers` or `.htaccess`, whichever it supports).

**Before going live:** set `SITE` at the top of `tools/build.mjs` to the real domain, rebuild, then submit `sitemap.xml` in Google Search Console.

## URLs

| Page | Turkish | English |
|---|---|---|
| Home | `/` | `/en/` |
| About | `/kurumsal.html` | `/en/kurumsal.html` |
| Products | `/urunler.html` | `/en/urunler.html` |
| Product | `/urun-<slug>.html` (8) | `/en/urun-<slug>.html` |
| Contact | `/iletisim.html` | `/en/iletisim.html` |
| Events | `/kongre.html` | `/en/kongre.html` |

Point the host's 404 page at `404.html`.

## QA helpers

- `?qa` disables motion, the curtain and the HCP gate (for screenshots).
- `?raw` forces client rendering even on a prerendered page (the build uses `?qa&raw`).
