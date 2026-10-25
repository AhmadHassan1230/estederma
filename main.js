/* Estederma — shared kit: i18n, header/menu/footer, smooth scroll, curtain, reveals, HCP gate. */
(() => {
  const D = window.ESD, C = D.copy;
  const qs = new URLSearchParams(location.search);
  const QA = qs.has('qa');
  const REDUCED = QA || matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Language comes from the page itself (/en/ files carry data-lang="en"), so every language has its own URL.
  const lang = document.documentElement.dataset.lang === 'en' ? 'en' : 'tr';
  document.documentElement.lang = lang;
  if (QA) document.documentElement.classList.add('is-qa');
  // Pages are prerendered at build time (tools/build.mjs). If the markup is already there, keep it and only bind behaviour.
  const PRE = document.documentElement.dataset.prerendered === lang && !qs.has('raw');
  const TOUCH = matchMedia('(hover: none), (max-width: 900px)').matches;

  const L = v => {
    if (v == null) return '';
    if (typeof v === 'object' && !Array.isArray(v) && ('tr' in v || 'en' in v)) return v[lang] ?? v.tr;
    return v;
  };
  const U = D.ui[lang];
  const page = document.body.dataset.page;
  const bySlug = s => D.products.find(p => p.slug === s);
  const href = p => `urun-${p.slug}.html`;
  const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];

  /* lockup: array of lines (caps + <i>italic</i>) */
  const lock = (lines, cls = '') => `<h2 class="lock ${cls}" data-lock>${L(lines).map(l => `<span class="ln"><span class="lni">${l}</span></span>`).join(' ')}</h2>`;
  const chapter = (n, label, cls = '') => `<div class="chapter ${cls}"><span class="num">${n}</span><span class="caps">${label}</span></div>`;

  /* jewel = silk backdrop + pack object (or a full scene) */
  const slide = p => {
    if (p.slug === 'rh-collagen') return { bg: p.scene, obj: p.pack, dark: true, bgCss: 'background-size:185% auto;background-position:50% 4%;background-color:#7d0b26' };
    if (p.slug === 'vital-plus') return { bg: 'assets/products/vital-bg.webp', obj: p.pack, dark: true };
    return { bg: p.bg, obj: p.pack, dark: ['nad-pro', 'hair-growth'].includes(p.slug) };
  };
  const jewel = (p, cls = '') => {
    const s = slide(p);
    return `<div class="jewel ${cls}" style="background-image:url(${s.bg});${s.bgCss || ''}">${s.obj ? `<img class="obj" src="${s.obj}" alt="${p.name}" loading="lazy">` : ''}</div>`;
  };

  /* ── header + menu ── */
  function renderHeader() {
    const el = document.getElementById('site-header');
    const cur = { about: 'about', products: 'products', product: 'products', contact: 'contact' }[page];
    const items = [
      ['index.html', U.nav.home, 'assets/editorial/portrait-glass.webp'],
      ['kurumsal.html', U.nav.about, 'assets/editorial/portrait-hands.webp'],
      ['urunler.html', U.nav.products, 'assets/products/lift-face-scene.webp'],
      ['kongre.html', U.nav.events, 'assets/ig/ig1.webp'],
      ['iletisim.html', U.nav.contact, 'assets/products/eye-glow-bg.webp']
    ];
    el.dataset.tone = 'light';
    if (!PRE) el.innerHTML = `
      <div class="wrap head-in">
        <button class="menu-btn" aria-expanded="false" aria-controls="mnav" aria-label="${U.menu}"><span class="burger" aria-hidden="true"><i></i><i></i></span><span class="lbl">${U.menu}</span></button>
        <a class="brand" href="index.html" aria-label="Estederma Aesthetics — ${U.nav.home}"><span class="mask-emblem" aria-hidden="true"></span></a>
        <div class="head-r">
          <a class="hl ${cur === 'about' ? 'is-active' : ''}" href="kurumsal.html">${U.nav.about}</a>
          <a class="hl ${cur === 'products' ? 'is-active' : ''}" href="urunler.html">${U.nav.products}</a>
          <a class="hl ${cur === 'contact' ? 'is-active' : ''}" href="iletisim.html">${U.nav.contact}</a>
          <div class="lang" role="group" aria-label="Language">
            <button data-lang="tr" class="${lang === 'tr' ? 'is-on' : ''}" aria-pressed="${lang === 'tr'}" lang="tr" aria-label="Türkçe">TR</button><span aria-hidden="true">/</span><button data-lang="en" class="${lang === 'en' ? 'is-on' : ''}" aria-pressed="${lang === 'en'}" lang="en" aria-label="English">EN</button>
          </div>
        </div>
      </div>
      <div class="mnav" id="mnav">
        <div class="mnav-in">
          <nav class="mnav-links" aria-label="Menu">
            ${items.map(([h, t, img], i) => `<a class="mlink" href="${h}" data-img="${img}"><span class="mn">${ROMAN[i]}</span><span class="mt">${t}</span></a>`).join('')}
          </nav>
          <div class="mnav-img frame"><img src="${items[0][2]}" alt="" loading="lazy" decoding="async"></div>
        </div>
        <div class="mnav-foot caps">
          <span>${D.brand.address.lines.join(' · ')}</span>
          <a href="${D.brand.instagramUrl}" target="_blank" rel="noopener"><span lang="en">Instagram</span> — @${D.brand.instagram}</a>
        </div>
      </div>`;

    el.querySelectorAll('[data-lang]').forEach(b => b.addEventListener('click', () => {
      if (b.dataset.lang === lang) return;
      const file = (location.pathname.split('/').pop() || 'index.html') + location.hash;
      go(b.dataset.lang === 'en' ? 'en/' + file : file);   // relative to the site root (EN pages use <base href="../">)
    }));

    const img = el.querySelector('.mnav-img img');
    el.querySelectorAll('.mlink').forEach(a => a.addEventListener('mouseenter', () => {
      if (img.getAttribute('src') === a.dataset.img) return;
      gsap.to(img, { opacity: 0, duration: .25, onComplete: () => { img.src = a.dataset.img; gsap.to(img, { opacity: 1, duration: .6 }); } });
    }));

    const btn = el.querySelector('.menu-btn'), panel = el.querySelector('.mnav');
    let open = false;
    btn.addEventListener('click', () => {
      open = !open;
      btn.setAttribute('aria-expanded', open);
      btn.querySelector('.lbl').textContent = open ? U.close : U.menu;
      btn.setAttribute('aria-label', open ? U.close : U.menu);
      document.body.style.overflow = open ? 'hidden' : '';
      el.classList.toggle('menu-open', open);
      open ? lenis && lenis.stop() : lenis && lenis.start();
      if (open) panel.style.visibility = 'visible';
      gsap.to(panel, { clipPath: open ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)', duration: 1, ease: 'expo.inOut', onComplete: () => { if (!open) panel.style.visibility = 'hidden'; } });
      if (open && !REDUCED) gsap.fromTo(panel.querySelectorAll('.mlink .mt'), { yPercent: 110 }, { yPercent: 0, duration: 1.2, ease: 'expo.out', stagger: .06, delay: .35 });
    });
  }

  /* ── footer ── */
  function renderFooter() {
    const b = D.brand;
    const extra = [
      b.phone && `<a href="tel:${b.phone.replace(/[^\d+]/g, '')}">${b.phone}</a>`,
      b.email && `<a href="mailto:${b.email}">${b.email}</a>`,
      b.whatsapp && `<a href="https://wa.me/${b.whatsapp}" target="_blank" rel="noopener">WhatsApp</a>`
    ].filter(Boolean).join('');
    if (PRE) return;
    document.getElementById('site-footer').innerHTML = `
      ${page === 'contact' || page === 'home' ? '' : `
      <section class="f-cta" data-chapter="${ROMAN[4]}">
        <div class="wrap">
          ${chapter('V', C.chapters[lang][4], 'center')}
          <div class="mt-m">${lock(C.cta.lock, 'md center')}</div>
          <p class="body" style="margin:40px auto 0" data-reveal>${L(D.home.cta.body)}</p>
          <div class="actions" data-reveal>
            <a class="btn" href="iletisim.html">${U.cta}</a>
            <a class="tlink" href="${b.dmUrl}" target="_blank" rel="noopener">${U.dm}</a>
          </div>
        </div>
      </section>`}
      <div class="f-main">
        <div class="wrap">
          <div class="f-top">
            <span class="mask-lockup" aria-label="Estederma Aesthetics"></span>
            <p>${L({ tr: 'Kore biyoteknolojisinin rejeneratif formülleri, Türkiye’deki kliniklerle.', en: 'Regenerative formulas from Korean biotechnology, for clinics in Türkiye.' })}</p>
          </div>
          <div class="f-cols">
            <div><span class="caps">${U.nav.about}</span>
              <a href="kurumsal.html">${U.nav.about}</a><a href="kurumsal.html#kurucu-mesaji">${U.nav.founder}</a><a href="kongre.html">${U.nav.events}</a><a href="iletisim.html">${U.nav.contact}</a></div>
            <div><span class="caps">${U.nav.products}</span>
              ${D.products.map(p => `<a href="${href(p)}" lang="en">${p.short}</a>`).join('')}</div>
            <div><span class="caps">${U.address}</span>
              <p>${b.address.lines.join('<br>')}</p><p>${U.clinicsOnly} · ${U.shipping}</p>${extra}</div>
            <div><span class="caps">${U.follow}</span>
              <a href="${b.instagramUrl}" target="_blank" rel="noopener">Instagram — @${b.instagram}</a><a href="${b.dmUrl}" target="_blank" rel="noopener">${U.dm}</a>
              <div class="mt-s"><a class="btn" href="iletisim.html">${U.cta}</a></div></div>
          </div>
          <div class="f-bottom">
            <span>© ${new Date().getFullYear()} ${b.legal}</span>
            <span>${U.footerNote}</span>
            <a href="#">${U.kvkk}</a>
          </div>
        </div>
      </div>`;
  }

  /* ── smooth scroll ── */
  let lenis = null;
  function initScroll() {
    gsap.registerPlugin(ScrollTrigger);
    if (REDUCED || TOUCH || typeof Lenis === 'undefined') return;   // native scrolling on phones/tablets
    lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  const scrollTo = target => lenis ? lenis.scrollTo(target, { offset: -40, duration: 1.6 }) : document.querySelector(target)?.scrollIntoView();

  /* ── header behaviour ── */
  function initHeader() {
    const el = document.getElementById('site-header');
    const syncTone = () => {
      const sec = [...document.querySelectorAll('main [data-tone]')].find(s => { const r = s.getBoundingClientRect(); return r.top <= 46 && r.bottom > 46; });
      el.dataset.tone = sec ? sec.dataset.tone : 'light';
    };
    let last = 0;
    const onScroll = y => {
      el.classList.toggle('is-scrolled', y > 40);
      if (!el.classList.contains('menu-open')) el.classList.toggle('is-hidden', y > last && y > 500);
      last = y;
      syncTone();
    };
    if (lenis) lenis.on('scroll', e => onScroll(e.scroll)); else addEventListener('scroll', () => onScroll(scrollY), { passive: true });
    ScrollTrigger.addEventListener('refresh', syncTone);
    onScroll(scrollY);
  }

  /* ── curtain ── */
  const curtain = document.querySelector('.curtain');
  function go(url) {
    if (REDUCED || !curtain) { location.href = url; return; }
    curtain.style.animation = 'none';
    curtain.style.visibility = 'visible';
    gsap.fromTo(curtain, { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: .8, ease: 'expo.inOut', onComplete: () => { location.href = url; } });
    gsap.fromTo(curtain.firstElementChild, { opacity: 0 }, { opacity: 1, duration: .5, delay: .35 });
  }
  function revealCurtain(cb) {
    let fired = false;
    const done = () => { if (!fired) { fired = true; cb(); } };
    if (!curtain) return done();
    curtain.style.animation = 'none';
    if (REDUCED) { curtain.style.visibility = 'hidden'; return done(); }
    // failsafe on a plain timer: if animation frames are throttled (background tab, slow device, crawler), never leave the page covered
    setTimeout(() => { if (getComputedStyle(curtain).visibility !== 'hidden') { gsap.killTweensOf(curtain); curtain.style.clipPath = 'inset(0 0 100% 0)'; curtain.style.visibility = 'hidden'; } done(); }, 2600);
    const first = !sessionStorage.getItem('esd-seen');
    sessionStorage.setItem('esd-seen', '1');
    const tl = gsap.timeline({ onComplete: () => { curtain.style.visibility = 'hidden'; } });
    if (first) tl.fromTo(curtain.firstElementChild, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: .6, ease: 'power2.out' });
    tl.to(curtain.firstElementChild, { opacity: 0, duration: .3 }, first ? '+=.1' : 0)
      .to(curtain, { clipPath: 'inset(0 0 100% 0)', duration: .9, ease: 'expo.inOut' }, '<.05')
      .add(done, '<.35');
  }
  function bindLinks() {
    document.addEventListener('click', e => {
      const a = e.target.closest('a[href]');
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
      const h = a.getAttribute('href');
      if (!h || h.startsWith('mailto:') || h.startsWith('tel:') || h === '#') return;
      if (h.startsWith('#')) { e.preventDefault(); scrollTo(h); return; }
      const u = new URL(a.href, location.href);
      if (u.origin !== location.origin) return;
      if (u.pathname === location.pathname && u.search === location.search && u.hash) { e.preventDefault(); scrollTo(u.hash); return; }
      e.preventDefault();
      go(a.href);
    });
    addEventListener('pageshow', e => { if (e.persisted && curtain) { gsap.set(curtain, { clipPath: 'inset(0 0 100% 0)' }); curtain.style.visibility = 'hidden'; } });
  }

  /* ── reveals: slow, soft ── */
  function initReveals(scope = document) {
    if (REDUCED) return;
    scope.querySelectorAll('[data-lock]:not([data-manual])').forEach(el => {
      gsap.from(el.querySelectorAll('.lni'), { yPercent: 105, duration: 1.6, ease: 'expo.out', stagger: .12, scrollTrigger: { trigger: el, start: 'top 88%' } });
    });
    scope.querySelectorAll('[data-reveal]').forEach(el => {
      gsap.from(el, { y: 24, opacity: 0, duration: 1.6, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 90%' } });
    });
    scope.querySelectorAll('[data-stagger]').forEach(el => {
      gsap.from(el.children, { y: 30, opacity: 0, duration: 1.6, ease: 'expo.out', stagger: .1, scrollTrigger: { trigger: el, start: 'top 88%' } });
    });
    scope.querySelectorAll('.chapter').forEach(el => {
      if (el.closest('.phead, .coll, .p-hero')) return;
      gsap.from(el, { opacity: 0, duration: 1.4, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 92%' } });
    });
    scope.querySelectorAll('[data-img]').forEach(el => {
      const img = el.querySelector('img, .obj');
      gsap.fromTo(el, { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 1.8, ease: 'expo.inOut', scrollTrigger: { trigger: el, start: 'top 86%' } });
      if (img && !img.classList.contains('obj')) gsap.fromTo(img, { scale: 1.12 }, { scale: 1, duration: 2.4, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 86%' } });
    });
    if (!TOUCH) scope.querySelectorAll('[data-parallax]').forEach(el => {
      const amt = parseFloat(el.dataset.parallax) || 8;
      gsap.fromTo(el, { yPercent: -amt / 2 }, { yPercent: amt / 2, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
  }

  /* ── HCP gate ── */
  function gate() {
    if (QA || localStorage.getItem('esd-hcp') === '1') return;
    const g = U.gate;
    const el = document.createElement('div');
    el.className = 'gate';
    el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-labelledby', 'gate-t');
    el.innerHTML = `<div class="gate-card">
      <span class="mask-emblem"></span>
      <p class="caps">${g.eyebrow}</p>
      <h2 id="gate-t">${g.title}</h2>
      <p>${g.body}</p>
      <div class="actions"><button class="btn" data-yes>${g.yes}</button><a class="tlink" href="${lang === 'en' ? 'en/' : ''}index.html">${g.no}</a></div>
    </div>`;
    document.body.appendChild(el);
    lenis && lenis.stop();
    el.querySelector('[data-yes]').focus();
    if (!REDUCED) { gsap.from(el, { opacity: 0, duration: .8 }); gsap.from(el.firstElementChild, { y: 24, opacity: 0, duration: 1.4, ease: 'expo.out', delay: .3 }); }
    el.querySelector('[data-yes]').addEventListener('click', () => {
      localStorage.setItem('esd-hcp', '1');
      lenis && lenis.start();
      gsap.to(el, { opacity: 0, duration: .6, onComplete: () => el.remove() });
    });
  }

  /* EN pages: point internal page links at /en/ (relative to <base href="../">) */
  function localizeLinks() {
    if (lang !== 'en') return;
    document.querySelectorAll('a[href]').forEach(a => {
      const h = a.getAttribute('href');
      if (/^[a-z0-9-]+\.html(#.*)?$/i.test(h)) a.setAttribute('href', 'en/' + h);
    });
  }

  /* ── boot ── */
  function boot(pageMotion) {
    renderHeader();
    renderFooter();
    localizeLinks();
    initScroll();
    bindLinks();
    const intro = pageMotion ? pageMotion() : null;
    initReveals();
    initHeader();
    if (location.hash) setTimeout(() => scrollTo(location.hash), 700);
    // headless QA captures: shift content instead of scrolling (headless doesn't paint scrolled frames)
    if (QA && (qs.get('y') || qs.get('to'))) setTimeout(() => { const y = qs.get('to') ? -(document.querySelector(qs.get('to')).getBoundingClientRect().top + (+qs.get('y') || 0)) : -qs.get('y'); ['main', 'site-footer'].forEach(id => { document.getElementById(id).style.transform = `translateY(${y}px)`; }); document.getElementById('site-header').classList.add('is-scrolled'); }, 900);
    revealCurtain(() => {
      intro && intro();
      if (page === 'product') gate();
    });
    addEventListener('load', () => ScrollTrigger.refresh());
  }

  window.ESDK = { D, C, L, U, lang, QA, REDUCED, PRE, TOUCH, ROMAN, bySlug, href, lock, chapter, slide, jewel, boot, go, get lenis() { return lenis; } };
})();
