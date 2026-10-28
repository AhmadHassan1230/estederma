#!/usr/bin/env node
/* Estederma — static build.
 *
 *   node tools/build.mjs            (needs the dev server on http://localhost:5238 and Google Chrome)
 *
 * 1. Writes every page (TR at the root, EN under /en/) with a complete SEO <head>:
 *    unique title/description, canonical, hreflang, Open Graph/Twitter, icons, JSON-LD.
 * 2. Prerenders header/main/footer by loading each page in headless Chrome (?qa&raw)
 *    and injecting the rendered markup, so crawlers and slow phones get real HTML.
 *    At runtime main.js sees data-prerendered and only binds behaviour.
 * 3. Writes sitemap.xml, robots.txt, site.webmanifest and the legacy urun.html redirect.
 *
 * Edit SITE below once the real domain is known.
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { execFile } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const SITE = 'https://estederma.com';   // production domain, canonical host without www (no trailing slash)
const DEV = 'http://localhost:5238';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const V = Date.now().toString(36);          // cache-busting version for css/js

/* ── load site data ── */
const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'data.js'), 'utf8'), ctx);
const D = ctx.window.ESD;
const L = (v, lang) => (v && typeof v === 'object' && !Array.isArray(v) && ('tr' in v || 'en' in v)) ? (v[lang] ?? v.tr) : v;
const strip = s => String(s).replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
const esc = s => strip(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const clip = (s, n = 158) => { s = strip(s); return s.length <= n ? s : s.slice(0, s.lastIndexOf(' ', n - 1)) + '…'; };
const abs = p => `${SITE}/${p}`.replace(/\/index\.html$/, '/');

/* ── intrinsic image sizes (PNG / JPEG / WebP headers) so every <img> gets width+height: no layout shift ── */
const SIZES = new Map();
function imgSize(rel) {
  if (SIZES.has(rel)) return SIZES.get(rel);
  let out = null;
  try {
    const b = fs.readFileSync(path.join(ROOT, rel));
    if (b.readUInt32BE(0) === 0x89504e47) out = [b.readUInt32BE(16), b.readUInt32BE(20)];
    else if (b[0] === 0xff && b[1] === 0xd8) {
      for (let i = 2; i < b.length;) { if (b[i] !== 0xff) { i++; continue; } const m = b[i + 1]; if (m >= 0xc0 && m <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(m)) { out = [b.readUInt16BE(i + 7), b.readUInt16BE(i + 5)]; break; } i += 2 + b.readUInt16BE(i + 2); }
    } else if (b.toString('ascii', 0, 4) === 'RIFF' && b.toString('ascii', 8, 12) === 'WEBP') {
      const t = b.toString('ascii', 12, 16);
      if (t === 'VP8 ') out = [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff];
      else if (t === 'VP8L') { const v = b.readUInt32LE(21); out = [(v & 0x3fff) + 1, ((v >> 14) & 0x3fff) + 1]; }
      else if (t === 'VP8X') out = [b.readUIntLE(24, 3) + 1, b.readUIntLE(27, 3) + 1];
    }
  } catch { /* missing file: reported by the link check */ }
  SIZES.set(rel, out); return out;
}
const addDims = html => html.replace(/<img\b([^>]*?)(\/?)>/g, (m, attrs, slash) => {
  if (/\bwidth=/.test(attrs)) return m;
  const src = (attrs.match(/\bsrc="([^"]+)"/) || [])[1];
  if (!src || /^(https?:|data:)/.test(src)) return m;
  const d = imgSize(src.split('?')[0]);
  return d ? `<img${attrs} width="${d[0]}" height="${d[1]}"${slash}>` : m;
});

/* keyword-led product titles (hand-written: auto-trimmed ones cut mid-phrase) */
const PTITLE = {
  'rh-collagen': { tr: 'Cilt Yenileyici Kolajen Jel', en: 'Skin-Renewing Collagen Gel' },
  'eye-glow': { tr: 'Göz Çevresi Mezoterapisi', en: 'Eye-Area Mesotherapy' },
  'lift-face': { tr: 'Yüz Germe Mezoterapisi', en: 'Face-Lift Mesotherapy' },
  'glow-face': { tr: 'Leke ve Aydınlatma Mezoterapisi', en: 'Brightening Mesotherapy' },
  'dmae-max': { tr: 'Sıkılaştırıcı Lifting Mezoterapi', en: 'Firming Lifting Mesotherapy' },
  'nad-pro': { tr: 'Hücresel Enerji Mezoterapisi', en: 'Cellular Energy Mesotherapy' },
  'hair-growth': { tr: 'Saç Dökülmesi Mezoterapisi', en: 'Hair-Loss Mesotherapy' },
  'vital-plus': { tr: 'Nemlendirici Cilt Güçlendirici', en: 'Hydrating Skin Booster' }
};

/* ── page list ── */
const B = D.brand;
const PAGES = [
  { file: 'index.html', page: 'home', priority: '1.0',
    title: { tr: 'Estederma | Neotiva Medikal Estetik Ürünleri — Kliniklere Özel', en: 'Estederma | Neotiva Medical Aesthetic Products for Clinics' },
    desc: { tr: 'Estederma, Kore’de üretilen Neotiva Rh Collagen, mezoterapi ve Vital+ ürünlerini Türkiye’deki hekim ve kliniklere sunar. Ankara, Türkiye geneli kargo.', en: 'Estederma supplies Korean-made Neotiva Rh Collagen, mesotherapy and Vital+ products to physicians and clinics across Türkiye. Ankara, nationwide shipping.' } },
  { file: 'kurumsal.html', page: 'about', priority: '0.8', crumb: { tr: 'Kurumsal', en: 'About' },
    title: { tr: 'Kurumsal | Estederma — Ankara Medikal Estetik Distribütörü', en: 'About Estederma — Medical Aesthetics Distributor, Ankara' },
    desc: { tr: 'Estederma Limited Şirketi, Inesen Bio’nun Neotiva serisini Türkiye’deki kliniklerle buluşturan Ankara merkezli medikal estetik distribütörüdür.', en: 'Estederma Limited Şirketi is an Ankara-based medical aesthetics distributor bringing Inesen Bio’s Neotiva range to clinics across Türkiye.' } },
  { file: 'urunler.html', page: 'products', priority: '0.9', crumb: { tr: 'Ürünler', en: 'Products' },
    title: { tr: 'Neotiva Ürünleri: Rh Collagen, Mezoterapi, Vital+ | Estederma', en: 'Neotiva Products: Rh Collagen, Mesotherapy, Vital+ | Estederma' },
    desc: { tr: 'Neotiva Rh Collagen, Eye Glow, Lift Face, Glow Face, DMAE Max, NAD+ Pro, Hair Growth ve Vital+: içerikler, endikasyonlar ve mezoterapi protokolü.', en: 'Neotiva Rh Collagen, Eye Glow, Lift Face, Glow Face, DMAE Max, NAD+ Pro, Hair Growth and Vital+: ingredients, indications and mesotherapy protocol.' } },
  { file: 'iletisim.html', page: 'contact', priority: '0.8', crumb: { tr: 'İletişim', en: 'Contact' },
    title: { tr: 'İletişim | Estederma — Yenimahalle, Ankara', en: 'Contact | Estederma — Yenimahalle, Ankara' },
    desc: { tr: `Estederma iletişim: ${B.phone} · ${B.email} · Yenimahalle, Ankara. Neotiva ürün bilgisi, fiyat listesi ve partnerlik için bize ulaşın.`, en: `Contact Estederma: ${B.phone} · ${B.email} · Yenimahalle, Ankara. Neotiva product information, price lists and partnerships.` } },
  { file: 'kongre.html', page: 'events', priority: '0.5', crumb: { tr: 'Kongre & Etkinlikler', en: 'Congresses & Events' },
    title: { tr: 'Kongre ve Etkinlikler | Estederma — Medikal Estetik', en: 'Congresses & Events | Estederma — Medical Aesthetics' },
    desc: { tr: 'Estederma’nın katıldığı medikal estetik kongreleri (Full Face 2026 dahil) ve Neotiva ürünleri için düzenlediği uygulamalı hekim eğitimleri.', en: 'Medical aesthetics congresses Estederma attends, including Full Face 2026, and the hands-on Neotiva physician trainings it organises.' } },
  ...D.products.map(p => ({
    file: `urun-${p.slug}.html`, page: 'product', slug: p.slug, priority: '0.8', product: p,
    crumb: { tr: p.name, en: p.name },
    title: { tr: `${p.name}: ${PTITLE[p.slug].tr} | Estederma`, en: `${p.name}: ${PTITLE[p.slug].en} | Estederma` },
    desc: { tr: clip(L(p.intro, 'tr')), en: clip(L(p.intro, 'en')) }
  })),
  { file: '404.html', page: 'notfound', noindex: true, base: '/',
    title: { tr: 'Sayfa bulunamadı | Estederma', en: 'Page not found | Estederma' },
    desc: { tr: 'Aradığınız sayfa bulunamadı. Estederma ana sayfasına, ürünlere veya iletişim sayfasına dönebilirsiniz.', en: 'The page you are looking for could not be found. Return to the Estederma home page, products or contact page.' } }
];

/* ── structured data ── */
const PHONE = B.phone.replace(/\s/g, '');
const ORG = {
  '@type': ['Organization', 'LocalBusiness'], '@id': `${SITE}/#org`,
  name: 'Estederma Aesthetics', legalName: B.legal, alternateName: 'Estederma', url: `${SITE}/`,
  description: 'Medical aesthetics distributor in Ankara supplying Neotiva (Inesen Bio, Korea) products to physicians and clinics in Türkiye.',
  logo: { '@type': 'ImageObject', url: `${SITE}/assets/brand/icon-512.png`, width: 512, height: 512 },
  image: `${SITE}/assets/brand/og-image.jpg`,
  email: B.email, telephone: PHONE, hasMap: B.address.mapLink,
  address: { '@type': 'PostalAddress', streetAddress: 'Batı Sitesi Mah. 2331 Sok. Çoşkun Irmak İş Mrk. No:3/212', addressLocality: 'Yenimahalle', addressRegion: 'Ankara', postalCode: '06930', addressCountry: 'TR' },
  areaServed: { '@type': 'Country', name: 'Türkiye' },
  knowsAbout: ['Mesotherapy', 'Polynucleotides', 'PDRN', 'Recombinant collagen', 'Exosomes', 'Skin boosters', 'Medical aesthetics'],
  brand: { '@type': 'Brand', name: 'Neotiva' },
  sameAs: [B.instagramUrl],
  contactPoint: [{ '@type': 'ContactPoint', contactType: 'sales', telephone: PHONE, email: B.email, areaServed: 'TR', availableLanguage: ['Turkish', 'English'] }]
};
const WEBPAGE = { home: 'WebPage', about: 'AboutPage', products: 'CollectionPage', contact: 'ContactPage', events: 'CollectionPage', product: 'ItemPage' };
function jsonLd(pg, lang, url) {
  if (!url) return '';
  const graph = [ORG];
  const home = lang === 'en' ? `${SITE}/en/` : `${SITE}/`;
  graph.push({ '@type': 'WebSite', '@id': `${SITE}/#website-${lang}`, url: home, name: 'Estederma Aesthetics', inLanguage: lang, publisher: { '@id': `${SITE}/#org` } });
  const page = {
    '@type': WEBPAGE[pg.page] || 'WebPage', '@id': `${url}#webpage`, url, name: strip(L(pg.title, lang)), description: strip(L(pg.desc, lang)),
    inLanguage: lang, isPartOf: { '@id': `${SITE}/#website-${lang}` }, about: { '@id': `${SITE}/#org` },
    primaryImageOfPage: { '@type': 'ImageObject', url: `${SITE}/assets/brand/og-image.jpg`, width: 1200, height: 630 },
    potentialAction: { '@type': 'ReadAction', target: [url] }
  };
  if (pg.crumb) {
    const items = [{ name: lang === 'en' ? 'Home' : 'Ana Sayfa', item: home }];
    if (pg.page === 'product') items.push({ name: lang === 'en' ? 'Products' : 'Ürünler', item: lang === 'en' ? `${SITE}/en/urunler.html` : `${SITE}/urunler.html` });
    items.push({ name: L(pg.crumb, lang), item: url });
    page.breadcrumb = { '@id': `${url}#breadcrumb` };
    graph.push({ '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`, itemListElement: items.map((x, i) => ({ '@type': 'ListItem', position: i + 1, name: x.name, item: x.item })) });
  }
  graph.push(page);
  if (pg.page === 'products') graph.push({ '@type': 'ItemList', '@id': `${url}#list`, itemListElement: D.products.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE}/${lang === 'en' ? 'en/' : ''}urun-${p.slug}.html`, name: p.name })) });
  if (pg.product) {
    const p = pg.product;
    page.mainEntity = { '@id': `${url}#product` };
    graph.push({
      '@type': 'Product', '@id': `${url}#product`, name: p.name, url, sku: p.slug, mainEntityOfPage: { '@id': `${url}#webpage` },
      description: strip(L(p.intro, lang)),
      image: [p.scene, p.pack].filter(Boolean).map(i => `${SITE}/${i}`),
      brand: { '@type': 'Brand', name: 'Neotiva' },
      manufacturer: { '@type': 'Organization', name: 'Inesen Bio Co., Ltd.', url: 'https://www.inesenbio.com', address: { '@type': 'PostalAddress', addressLocality: 'Seoul', addressCountry: 'KR' } },
      category: strip(L(p.complex, lang)), countryOfOrigin: { '@type': 'Country', name: 'South Korea' },
      audience: { '@type': 'Audience', audienceType: lang === 'en' ? 'Healthcare professionals' : 'Sağlık profesyonelleri' },
      additionalProperty: (p.specs || []).map(([k, v]) => ({ '@type': 'PropertyValue', name: strip(L(k, lang)), value: strip(L(v, lang)) })),
      seller: { '@id': `${SITE}/#org` }
    });
  }
  return `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}</script>`;
}

/* ── document template ── */
function doc(pg, lang, frag) {
  const en = lang === 'en';
  const url = pg.noindex ? null : abs((en ? 'en/' : '') + pg.file);
  const trUrl = abs(pg.file), enUrl = abs('en/' + pg.file);
  const base = pg.base || (en ? '../' : null);
  const p = pg.product;
  const bodyStyle = p ? ` style="--acc:${p.acc};--deep:${p.deep}"` : '';
  const ogImg = `${SITE}/assets/brand/og-image.jpg`;   // JPEG: WebP previews fail on LinkedIn / some WhatsApp versions
  const pre = frag ? ` data-prerendered="${lang}"` : '';
  const heroPreload = pg.page === 'home'
    ? `\n  <link rel="preload" as="image" href="assets/video/hero-poster.webp" fetchpriority="high">`
    : (p && p.scene ? `\n  <link rel="preload" as="image" href="${p.scene}" fetchpriority="high">` : '');
  return `<!doctype html>
<html lang="${lang}" data-lang="${lang}"${pre}>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">${base ? `\n  <base href="${base}">` : ''}
  <title>${esc(L(pg.title, lang))}</title>
  <meta name="description" content="${esc(L(pg.desc, lang))}">
  <meta name="robots" content="${pg.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}">${url ? `
  <link rel="canonical" href="${url}">
  <link rel="alternate" hreflang="tr" href="${trUrl}">
  <link rel="alternate" hreflang="en" href="${enUrl}">
  <link rel="alternate" hreflang="x-default" href="${trUrl}">` : ''}
  <meta property="og:type" content="${p ? 'product' : 'website'}">
  <meta property="og:site_name" content="Estederma Aesthetics">
  <meta property="og:locale" content="${en ? 'en_US' : 'tr_TR'}">
  <meta property="og:locale:alternate" content="${en ? 'tr_TR' : 'en_US'}">
  <meta property="og:title" content="${esc(L(pg.title, lang))}">
  <meta property="og:description" content="${esc(L(pg.desc, lang))}">${url ? `\n  <meta property="og:url" content="${url}">` : ''}
  <meta property="og:image" content="${ogImg}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${esc(L(pg.title, lang))}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(L(pg.title, lang))}">
  <meta name="twitter:description" content="${esc(L(pg.desc, lang))}">
  <meta name="twitter:image" content="${ogImg}">
  <meta name="twitter:image:alt" content="${esc(L(pg.title, lang))}">
  <meta name="author" content="Estederma Aesthetics">
  <meta name="application-name" content="Estederma">
  <meta name="geo.region" content="TR-06">
  <meta name="geo.placename" content="Yenimahalle, Ankara">
  <meta name="theme-color" content="#FFFFFF">
  <meta name="format-detection" content="telephone=no">
  <link rel="icon" type="image/png" sizes="32x32" href="assets/brand/favicon-32.png">
  <link rel="icon" type="image/png" sizes="64x64" href="assets/brand/favicon-64.png">
  <link rel="apple-touch-icon" href="assets/brand/apple-touch-icon.png">
  <link rel="manifest" href="site.webmanifest">
  <link rel="sitemap" type="application/xml" href="sitemap.xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,28,400;0,28,500;1,28,400&family=Instrument+Sans:wght@400;500&display=swap">${heroPreload}
  <link rel="stylesheet" href="styles.css?v=${V}">
  ${jsonLd(pg, lang, url)}
</head>
<body data-page="${pg.page}"${pg.slug ? ` data-slug="${pg.slug}"` : ''}${bodyStyle}>
  <a class="skip" href="#main">${en ? 'Skip to content' : 'İçeriğe geç'}</a>
  <div class="curtain" aria-hidden="true"><span class="curtain-mark"></span></div>
  <header class="site-header" id="site-header">${frag ? addDims(frag.header) : ''}</header>
  <main id="main" tabindex="-1">${frag ? addDims(frag.main) : ''}</main>
  <footer class="site-footer" id="site-footer">${frag ? addDims(frag.footer) : ''}</footer>
  <script src="assets/vendor/gsap.min.js" defer></script>
  <script src="assets/vendor/ScrollTrigger.min.js" defer></script>
  <script src="assets/vendor/lenis.min.js" defer></script>
  <script src="data.js?v=${V}" defer></script>
  <script src="main.js?v=${V}" defer></script>
  <script src="pages.js?v=${V}" defer></script>
</body>
</html>
`;
}

/* ── prerender through headless Chrome ── */
const dump = url => new Promise((resolve, reject) => execFile(CHROME,
  ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--window-size=1440,900', '--virtual-time-budget=5000', '--dump-dom', url],
  { maxBuffer: 32 * 1024 * 1024, timeout: 60000 }, (err, out) => err ? reject(err) : resolve(out)));
function fragments(html) {
  const header = html.match(/<header[^>]*id="site-header"[^>]*>([\s\S]*?)<\/header>\s*<main/);
  const main = html.match(/<main[^>]*id="main"[^>]*>([\s\S]*?)<\/main>\s*<footer/);
  const footer = html.match(/<footer[^>]*id="site-footer"[^>]*>([\s\S]*?)<\/footer>/);
  if (!header || !main || !footer) throw new Error('fragment not found');
  return { header: header[1], main: main[1], footer: footer[1] };
}

async function build() {
  fs.mkdirSync(path.join(ROOT, 'en'), { recursive: true });
  const out = (pg, lang) => path.join(ROOT, lang === 'en' ? 'en' : '', pg.file);
  const jobs = PAGES.flatMap(pg => ['tr', 'en'].map(lang => ({ pg, lang })));

  // pass 1: empty shells, so the dev server can render each page with JS
  for (const { pg, lang } of jobs) fs.writeFileSync(out(pg, lang), doc(pg, lang, null));

  // pass 2: render + inject (4 at a time)
  const queue = [...jobs];
  const worker = async () => {
    for (let j; (j = queue.shift());) {
      const rel = (j.lang === 'en' ? 'en/' : '') + j.pg.file;
      let html;
      for (let attempt = 1; ; attempt++) {                       // headless Chrome occasionally hangs: retry
        try { html = await dump(`${DEV}/${rel}?qa&raw`); break; }
        catch (e) { if (attempt >= 3) throw e; process.stdout.write(`↻ retry ${rel}\n`); }
      }
      const frag = fragments(html);
      if (!frag.main.trim()) throw new Error(`empty render: ${rel}`);
      fs.writeFileSync(out(j.pg, j.lang), doc(j.pg, j.lang, frag));
      process.stdout.write(`✓ ${rel}\n`);
    }
  };
  await Promise.all([worker(), worker(), worker(), worker()]);

  // legacy product URLs (urun.html?p=slug) → new static pages
  fs.writeFileSync(path.join(ROOT, 'urun.html'), `<!doctype html>
<html lang="tr"><head><meta charset="utf-8"><meta name="robots" content="noindex">
<title>Estederma</title>
<script>var p=new URLSearchParams(location.search).get('p');location.replace(p?'urun-'+p.replace(/[^a-z0-9-]/g,'')+'.html':'urunler.html');</script>
<meta http-equiv="refresh" content="0; url=urunler.html"></head><body></body></html>
`);

  // sitemap with hreflang alternates
  const today = new Date().toISOString().slice(0, 10);
  const urls = PAGES.filter(p => !p.noindex).flatMap(pg => ['tr', 'en'].map(lang => {
    const loc = abs((lang === 'en' ? 'en/' : '') + pg.file);
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <priority>${lang === 'en' ? (pg.priority * 0.8).toFixed(1) : pg.priority}</priority>${pg.product ? [pg.product.scene, pg.product.pack].filter(Boolean).map(i => `
    <image:image><image:loc>${SITE}/${i}</image:loc><image:title>${esc(pg.product.name)}</image:title></image:image>`).join('') : ''}
    <xhtml:link rel="alternate" hreflang="tr" href="${abs(pg.file)}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${abs('en/' + pg.file)}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(pg.file)}"/>
  </url>`;
  }));
  fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join('\n')}
</urlset>
`);
  fs.writeFileSync(path.join(ROOT, 'robots.txt'), `User-agent: *
Allow: /
Disallow: /tools/
Disallow: /urun.html

Sitemap: ${SITE}/sitemap.xml
`);
  fs.writeFileSync(path.join(ROOT, 'site.webmanifest'), JSON.stringify({
    name: 'Estederma Aesthetics', short_name: 'Estederma', lang: 'tr', start_url: '/', display: 'browser',
    background_color: '#FFFFFF', theme_color: '#FFFFFF',
    icons: [{ src: '/assets/brand/icon-192.png', sizes: '192x192', type: 'image/png' }, { src: '/assets/brand/icon-512.png', sizes: '512x512', type: 'image/png' }]
  }, null, 2) + '\n');
  fs.writeFileSync(path.join(ROOT, '_headers'), `# Netlify / Cloudflare Pages
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
/*.html
  Cache-Control: public, max-age=0, must-revalidate
/
  Cache-Control: public, max-age=0, must-revalidate
/assets/*
  Cache-Control: public, max-age=31536000, immutable
/*.css
  Cache-Control: public, max-age=31536000, immutable
/*.js
  Cache-Control: public, max-age=31536000, immutable
`);
  fs.writeFileSync(path.join(ROOT, '.htaccess'), `# Apache
ErrorDocument 404 /404.html
DirectoryIndex index.html
AddDefaultCharset UTF-8
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json application/xml image/svg+xml
</IfModule>
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/html "access plus 0 seconds"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType video/mp4 "access plus 1 year"
</IfModule>
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
# Force https and the canonical host (estederma.com, no www)
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{HTTPS} off [OR]
  RewriteCond %{HTTP_HOST} ^www\\.estederma\\.com$ [NC]
  RewriteRule ^(.*)$ https://estederma.com/$1 [R=301,L]
</IfModule>
`);
  console.log(`\nBuilt ${jobs.length} pages + sitemap.xml, robots.txt, site.webmanifest (v=${V})`);
}

/* ── SEO lint: reports problems on the built files (run with --strict to fail the build) ── */
function lint() {
  const warn = [];
  for (const { pg, lang } of PAGES.flatMap(pg => ['tr', 'en'].map(lang => ({ pg, lang })))) {
    const rel = (lang === 'en' ? 'en/' : '') + pg.file;
    const h = fs.readFileSync(path.join(ROOT, rel), 'utf8');
    const w = m => warn.push(`${rel}: ${m}`);
    const title = (h.match(/<title>([^<]*)/) || [])[1] || '', desc = (h.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
    if (title.length > 70) w(`title ${title.length} chars (>70)`);
    if (title.length < 20) w(`title too short (${title.length})`);
    if (desc.length > 160) w(`description ${desc.length} chars (>160)`);
    if (desc.length < 70) w(`description too short (${desc.length})`);
    if (!pg.noindex && !/rel="canonical"/.test(h)) w('no canonical');
    if (!pg.noindex && (h.match(/hreflang="/g) || []).length !== 3) w('hreflang set incomplete');
    const body = h.slice(h.indexOf('<body'));
    const heads = [...body.matchAll(/<h([1-6])\b/g)].map(m => +m[1]);
    if (heads.filter(n => n === 1).length !== 1) w(`${heads.filter(n => n === 1).length} <h1> (need exactly 1)`);
    heads.forEach((n, i) => { if (i && n > heads[i - 1] + 1) w(`heading level jumps h${heads[i - 1]} → h${n}`); });
    for (const m of body.matchAll(/<img\b[^>]*>/g)) {
      if (!/\balt=/.test(m[0])) w(`img without alt: ${m[0].slice(0, 70)}`);
      if (!/\bwidth=/.test(m[0]) || !/\bheight=/.test(m[0])) w(`img without width/height: ${m[0].slice(0, 70)}`);
    }
    if (!/<main\b/.test(body) || !/<nav\b/.test(body)) w('missing <main> or <nav>');
  }
  console.log(warn.length ? `\nSEO lint — ${warn.length} warning(s):\n  ${warn.join('\n  ')}` : '\nSEO lint — all checks passed (titles, descriptions, canonical, hreflang, single h1, heading order, image alt + dimensions).');
  if (warn.length && process.argv.includes('--strict')) process.exit(1);
}

build().then(lint).catch(e => { console.error(e); process.exit(1); });
