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

const SITE = 'https://www.estederma.com';   // CONFIRM — real production domain (no trailing slash)
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

/* ── page list ── */
const B = D.brand;
const PAGES = [
  { file: 'index.html', page: 'home', priority: '1.0',
    title: { tr: 'Estederma | Neotiva Medikal Estetik Ürünleri — Kliniklere Özel', en: 'Estederma | Neotiva Medical Aesthetic Products — For Clinics' },
    desc: { tr: 'Estederma, Kore’de üretilen Neotiva Rh Collagen, mezoterapi serisi ve Vital+ cilt güçlendiricisini Türkiye’deki hekim ve kliniklere sunar. Ankara merkezli, Türkiye geneli kargo.', en: 'Estederma supplies Korean-made Neotiva Rh Collagen, the mesotherapy line and the Vital+ skin booster to physicians and clinics across Türkiye. Based in Ankara, nationwide shipping.' } },
  { file: 'kurumsal.html', page: 'about', priority: '0.8', crumb: { tr: 'Kurumsal', en: 'About' },
    title: { tr: 'Kurumsal | Estederma — Ankara Medikal Estetik Distribütörü', en: 'About | Estederma — Medical Aesthetics Distributor in Ankara' },
    desc: { tr: 'Estederma Limited Şirketi: Inesen Bio’nun Neotiva serisini Türkiye’deki kliniklerle buluşturan Ankara merkezli medikal estetik distribütörü. Kurucu mesajı ve değerlerimiz.', en: 'Estederma Limited Şirketi is an Ankara-based medical aesthetics distributor bringing Inesen Bio’s Neotiva range to clinics in Türkiye. Founder’s message and values.' } },
  { file: 'urunler.html', page: 'products', priority: '0.9', crumb: { tr: 'Ürünler', en: 'Products' },
    title: { tr: 'Neotiva Ürünleri: Rh Collagen, Mezoterapi Serisi, Vital+ | Estederma', en: 'Neotiva Products: Rh Collagen, Mesotherapy Line, Vital+ | Estederma' },
    desc: { tr: 'Neotiva Rh Collagen, Eye Glow, Lift Face, Glow Face, DMAE Max, NAD+ Pro, Hair Growth ve Vital+: içerikler, endikasyonlar ve üç fazlı mezoterapi protokolü.', en: 'Neotiva Rh Collagen, Eye Glow, Lift Face, Glow Face, DMAE Max, NAD+ Pro, Hair Growth and Vital+: ingredients, indications and the three-phase mesotherapy protocol.' } },
  { file: 'iletisim.html', page: 'contact', priority: '0.8', crumb: { tr: 'İletişim', en: 'Contact' },
    title: { tr: 'İletişim | Estederma — Yenimahalle, Ankara', en: 'Contact | Estederma — Yenimahalle, Ankara' },
    desc: { tr: `Estederma ile iletişime geçin: ${B.phone} · ${B.email} · ${B.address.lines.join(', ')}. Ürün bilgisi, fiyat listesi ve partnerlik.`, en: `Contact Estederma: ${B.phone} · ${B.email} · ${B.address.lines.join(', ')}. Product information, price lists and partnership.` } },
  { file: 'kongre.html', page: 'events', priority: '0.5', crumb: { tr: 'Kongre & Etkinlikler', en: 'Congresses & Events' },
    title: { tr: 'Kongre ve Etkinlikler | Estederma', en: 'Congresses & Events | Estederma' },
    desc: { tr: 'Estederma’nın katıldığı medikal estetik kongreleri ve düzenlediği uygulamalı hekim eğitimleri.', en: 'Medical aesthetics congresses Estederma attends and the hands-on physician trainings it organises.' } },
  ...D.products.map(p => ({
    file: `urun-${p.slug}.html`, page: 'product', slug: p.slug, priority: '0.8', product: p,
    crumb: { tr: p.name, en: p.name },
    title: { tr: `${p.name} — ${strip(L(p.complex, 'tr'))} | Estederma`, en: `${p.name} — ${strip(L(p.complex, 'en'))} | Estederma` },
    desc: { tr: clip(L(p.intro, 'tr')), en: clip(L(p.intro, 'en')) }
  })),
  { file: '404.html', page: 'notfound', noindex: true, base: '/',
    title: { tr: 'Sayfa bulunamadı | Estederma', en: 'Page not found | Estederma' },
    desc: { tr: 'Aradığınız sayfa bulunamadı.', en: 'The page you are looking for could not be found.' } }
];

/* ── structured data ── */
const ORG = {
  '@type': 'Organization', '@id': `${SITE}/#org`,
  name: 'Estederma Aesthetics', legalName: B.legal, url: `${SITE}/`,
  logo: `${SITE}/assets/brand/icon-512.png`, image: `${SITE}/assets/brand/og-image.jpg`,
  email: B.email, telephone: B.phone.replace(/\s/g, ''),
  address: { '@type': 'PostalAddress', streetAddress: 'Batı Sitesi Mah. 2331 Sok. Çoşkun Irmak İş Mrk. No:3/212', addressLocality: 'Yenimahalle', addressRegion: 'Ankara', addressCountry: 'TR' },
  areaServed: { '@type': 'Country', name: 'Türkiye' },
  sameAs: [B.instagramUrl],
  contactPoint: [{ '@type': 'ContactPoint', contactType: 'sales', telephone: B.phone.replace(/\s/g, ''), email: B.email, areaServed: 'TR', availableLanguage: ['Turkish', 'English'] }]
};
function jsonLd(pg, lang, url) {
  const graph = [];
  const home = lang === 'en' ? `${SITE}/en/` : `${SITE}/`;
  if (pg.page === 'home' || pg.page === 'contact' || pg.page === 'about') graph.push(ORG);
  if (pg.page === 'home') graph.push({ '@type': 'WebSite', '@id': `${home}#website`, url: home, name: 'Estederma Aesthetics', inLanguage: lang === 'en' ? 'en' : 'tr', publisher: { '@id': `${SITE}/#org` } });
  if (pg.crumb) {
    const items = [{ name: lang === 'en' ? 'Home' : 'Ana Sayfa', item: home }];
    if (pg.page === 'product') items.push({ name: lang === 'en' ? 'Products' : 'Ürünler', item: lang === 'en' ? `${SITE}/en/urunler.html` : `${SITE}/urunler.html` });
    items.push({ name: L(pg.crumb, lang), item: url });
    graph.push({ '@type': 'BreadcrumbList', itemListElement: items.map((x, i) => ({ '@type': 'ListItem', position: i + 1, name: x.name, item: x.item })) });
  }
  if (pg.page === 'products') graph.push({ '@type': 'ItemList', itemListElement: D.products.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE}/${lang === 'en' ? 'en/' : ''}urun-${p.slug}.html`, name: p.name })) });
  if (pg.product) {
    const p = pg.product;
    graph.push({
      '@type': 'Product', name: p.name, url,
      description: strip(L(p.intro, lang)),
      image: [p.scene, p.pack].filter(Boolean).map(i => `${SITE}/${i}`),
      brand: { '@type': 'Brand', name: 'Neotiva' },
      manufacturer: { '@type': 'Organization', name: 'Inesen Bio Co., Ltd.', address: { '@type': 'PostalAddress', addressLocality: 'Seoul', addressCountry: 'KR' } },
      category: strip(L(p.complex, lang)),
      countryOfOrigin: 'KR'
    });
  }
  return graph.length ? `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}</script>` : '';
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
  <meta property="og:image:alt" content="Estederma Aesthetics">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(L(pg.title, lang))}">
  <meta name="twitter:description" content="${esc(L(pg.desc, lang))}">
  <meta name="twitter:image" content="${ogImg}">
  <meta name="theme-color" content="#FFFFFF">
  <meta name="format-detection" content="telephone=no">
  <link rel="icon" type="image/png" sizes="32x32" href="assets/brand/favicon-32.png">
  <link rel="icon" type="image/png" sizes="64x64" href="assets/brand/favicon-64.png">
  <link rel="apple-touch-icon" href="assets/brand/apple-touch-icon.png">
  <link rel="manifest" href="site.webmanifest">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,28,400;0,28,500;1,28,400&family=Instrument+Sans:wght@400;500&display=swap">${heroPreload}
  <link rel="stylesheet" href="styles.css?v=${V}">
  ${jsonLd(pg, lang, url)}
</head>
<body data-page="${pg.page}"${pg.slug ? ` data-slug="${pg.slug}"` : ''}${bodyStyle}>
  <a class="skip" href="#main">${en ? 'Skip to content' : 'İçeriğe geç'}</a>
  <div class="curtain" aria-hidden="true"><span class="curtain-mark"></span></div>
  <header class="site-header" id="site-header">${frag ? frag.header : ''}</header>
  <main id="main" tabindex="-1">${frag ? frag.main : ''}</main>
  <footer class="site-footer" id="site-footer">${frag ? frag.footer : ''}</footer>
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
      const html = await dump(`${DEV}/${rel}?qa&raw`);
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
    <priority>${lang === 'en' ? (pg.priority * 0.8).toFixed(1) : pg.priority}</priority>
    <xhtml:link rel="alternate" hreflang="tr" href="${abs(pg.file)}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${abs('en/' + pg.file)}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(pg.file)}"/>
  </url>`;
  }));
  fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
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
  console.log(`\nBuilt ${jobs.length} pages + sitemap.xml, robots.txt, site.webmanifest (v=${V})`);
}

build().catch(e => { console.error(e); process.exit(1); });
