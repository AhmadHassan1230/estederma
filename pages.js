/* Estederma "Atelier" — page renderers + page motion. */
(() => {
  const { D, C, L, U, lang, REDUCED, PRE, ROMAN, bySlug, href, lock, chapter, jewel } = window.ESDK;
  const main = document.getElementById('main');
  const page = document.body.dataset.page;
  const CH = C.chapters[lang];

  const T = {
    tr: { discover: 'Keşfedin', explore: 'Formülü keşfedin', products: 'Ürünler', viewAll: 'Tüm etkinlikler', follow: 'Instagram’da takip edin', specsBtn: 'Teknik özellikler', fiveVials: '5 ml × 5 flakon', vitalPack: '2,5 mL × 3 enjektör', rhPack: 'Jel · Mezoterapi', contents: 'Kutu içeriği', origin: 'Menşei', maker: 'Üretici', korea: 'Kore', indications: 'Endikasyonlar', areas: 'Uygulama alanları', results: 'Sonuçların görülme süresi', cmp: ['Ürün', 'İçerik', 'Ana içerikler', 'Etkiler'], foundIn: 'Bulunduğu formüller', mapOpen: 'Haritada aç', formTitle: ['Partnerlik ve', '<i>bilgi talebi</i>'], values: 'Değerlerimiz', clinicalNote: 'Klinik not', benefits: 'Faydalar',
      lk: { actives: ['Ana <i>içerikler</i>'], complexes: ['Altı <i>kompleks</i>'], protocol: ['Tedavi <i>protokolü</i>'], care: ['Tedavi sonrası <i>bakım</i>'], specs: ['Ürün <i>özellikleri</i>'], related: ['Diğer <i>formüller</i>'], use: ['Kullanım <i>alanları</i>'] } },
    en: { discover: 'Discover', explore: 'Discover the formula', products: 'Products', viewAll: 'All events', follow: 'Follow on Instagram', specsBtn: 'Specifications', fiveVials: '5 ml × 5 vials', vitalPack: '2.5 mL × 3 syringes', rhPack: 'Gel · Mesotherapy', contents: 'Contents', origin: 'Origin', maker: 'Manufacturer', korea: 'Korea', indications: 'Indications', areas: 'Treatment areas', results: 'Time to results', cmp: ['Product', 'Contents', 'Key ingredients', 'Effects'], foundIn: 'Found in', mapOpen: 'Open in Maps', formTitle: ['Partnership &amp;', '<i>information</i>'], values: 'Our values', clinicalNote: 'Clinical note', benefits: 'Benefits',
      lk: { actives: ['Key <i>ingredients</i>'], complexes: ['Six <i>complexes</i>'], protocol: ['Treatment <i>protocol</i>'], care: ['<i>Aftercare</i>'], specs: ['Product <i>specifications</i>'], related: ['Other <i>formulas</i>'], use: ['Where to <i>treat</i>'] } }
  }[lang];

  const vars = p => `--acc:${p.acc};--deep:${p.deep}`;
  const packLabel = p => p.line === 'meso' ? T.fiveVials : p.line === 'vital' ? T.vitalPack : T.rhPack;
  const nameLock = (p, tag = 'h3', cls = '') => `<${tag} class="lock ${cls}" data-lock data-manual><span class="ln"><span class="lni" lang="en"><i>Neotiva</i> ${p.short}</span></span></${tag}>`;
  const asH1 = html => html.replace('<h2', '<h1').replace(/<\/h2>$/, '</h1>');
  const phead = (n, label, lockLines, body) => `
    <section class="phead">
      <div class="wrap">
        ${chapter(n, label, 'center')}
        ${asH1(lock(lockLines, 'md')).replace('data-lock', 'data-lock data-manual')}
        ${body ? `<p class="body" data-hero>${body}</p>` : ''}
      </div>
    </section>`;
  const object = p => `
    <a class="object" href="${href(p)}" style="${vars(p)}">
      <div data-img>${jewel(p)}</div>
      <div class="meta"><h3>${p.short}</h3>${p.no ? `<span class="no">${p.no}</span>` : ''}</div>
      <span class="caps cx">${L(p.complex)}</span>
    </a>`;
  const scienceIndex = list => `
    <div class="idx">
      ${list.map(a => `
        <div class="idx-row" data-follow="${a.in[0]}">
          <h3>${lang === 'en' ? a.en : a.n}</h3>
          <p>${L(a.d)}</p>
          <div class="in">${a.in.map(s => `<a lang="en" href="${href(bySlug(s))}">${bySlug(s).short}</a>`).join('')}</div>
        </div>`).join('')}
    </div>`;

  /* generic intro for inner page heads */
  const headIntro = () => {
    if (REDUCED) return null;
    const lines = document.querySelectorAll('.phead .lni, .p-hero .lni');
    const fades = document.querySelectorAll('[data-hero], .phead .chapter, .p-hero-copy > :not(h1)');
    const media = document.querySelector('.p-hero .p-media');
    gsap.set(lines, { yPercent: 105 });
    gsap.set(fades, { opacity: 0, y: 16 });
    if (media) gsap.set(media, { clipPath: 'inset(0 0 100% 0)' });
    return () => {
      const tl = gsap.timeline();
      if (media) tl.to(media, { clipPath: 'inset(0 0 0% 0)', duration: 1.8, ease: 'expo.inOut' }, 0)
        .fromTo(media.querySelector('img, .obj'), { scale: 1.12 }, { scale: 1, duration: 2.6, ease: 'expo.out' }, 0);
      tl.to(lines, { yPercent: 0, duration: 1.8, ease: 'expo.out', stagger: .14 }, media ? .5 : 0)
        .to(fades, { opacity: 1, y: 0, duration: 1.6, ease: 'expo.out', stagger: .07 }, '<.3');
    };
  };

  /* follower thumbnail for science rows */
  function initFollow() {
    if (REDUCED || !matchMedia('(hover:hover)').matches) return;
    const rows = document.querySelectorAll('[data-follow]');
    if (!rows.length) return;
    const f = document.createElement('div'); f.className = 'follow'; document.body.appendChild(f);
    const qx = gsap.quickTo(f, 'x', { duration: .7, ease: 'power3' }), qy = gsap.quickTo(f, 'y', { duration: .7, ease: 'power3' });
    addEventListener('mousemove', e => { qx(e.clientX + 140); qy(e.clientY); });
    rows.forEach(r => {
      r.addEventListener('mouseenter', () => { f.innerHTML = jewel(bySlug(r.dataset.follow)); gsap.to(f, { opacity: 1, scale: 1, duration: .6, ease: 'expo.out' }); });
      r.addEventListener('mouseleave', () => gsap.to(f, { opacity: 0, scale: .9, duration: .5, ease: 'expo.out' }));
    });
  }

  /* ═════════════ HOME ═════════════ */
  function home() {
    const H = D.home, b = D.brand, P = D.products;
    const heroMedia = b.heroVideo
      ? `<video muted autoplay loop playsinline preload="metadata" poster="assets/video/hero-poster.webp" aria-hidden="true" tabindex="-1"><source src="assets/video/hero-720.mp4" type="video/mp4" media="(max-width: 900px)"><source src="${b.heroVideo}" type="video/mp4"></video>`
      : `<img src="assets/video/hero-poster.webp" alt="" fetchpriority="high">`;

    main.innerHTML = `
      <section class="hero" data-tone="dark">
        <div class="hero-frame"><div class="hero-bg">${heroMedia}</div></div>
        <div class="hero-in">${asH1(lock(C.hero.lock, 'center')).replace('data-lock', 'data-lock data-manual')}<p class="hero-sub" data-h>${L(C.hero.sub)}</p></div>
      </section>

      <section class="sec intro-simple">
        <div class="wrap narrow center">
          <h2 class="prose-lg" data-reveal>${L(H.statement)}</h2>
          <div class="actions mt-m" data-reveal style="justify-content:center"><a class="btn" href="urunler.html">${U.nav.products}</a><a class="tlink" href="kurumsal.html">${U.nav.about}</a></div>
        </div>
      </section>

      <section class="sec" style="padding-top:0">
        <div class="wrap">
          <div class="mosaic">
            ${[
              [D.lines[0], 'rh-collagen', 'assets/products/rh-collagen-scene.webp', 'a'],
              [D.lines[1], 'urunler.html#mezoterapi', 'assets/products/lift-face-scene.webp', 'b'],
              [D.lines[2], 'vital-plus', 'assets/products/vital-scene.webp', 'c']
            ].map(([l, to, img, cls], i) => `
              <a class="tile ${cls}" href="${to.includes('.html') ? to : href(bySlug(to))}">
                <div class="frame" data-img><img class="par" src="${img}" alt="${l.name}" loading="lazy" decoding="async" data-parallax="8"></div>
                <div class="tile-cap"><span class="caps">0${i + 1} — ${L(l.kicker)}</span><h2 lang="en">${l.name.replace('Neotiva ', '<i>Neotiva</i> ')}</h2></div>
              </a>`).join('')}
          </div>
        </div>
      </section>

      <section class="partner" data-tone="dark">
        <div class="partner-bg"><img class="par" src="assets/products/vital-scene.webp" alt="" loading="lazy" decoding="async" data-parallax="12"></div>
        <div class="wrap partner-in simple">
          <div>${lock(C.partner.lock, 'md', 'h2')}<div class="actions mt-m" data-reveal><a class="btn light" href="iletisim.html">${U.cta}</a><a class="tlink" href="${D.brand.dmUrl}" target="_blank" rel="noopener">${U.dm}</a></div></div>
        </div>
      </section>`;
  }

  function homeMotion() {
    const hero = document.querySelector('.hero');
    const bg = hero.querySelector('.hero-bg');
    const lines = hero.querySelectorAll('.lni');
    const fades = hero.querySelectorAll('[data-h]');


    // The hero "cutout": a silk panel with the same padding and corner radius on every side,
    // plus one rounded notch cut down into its top edge, holding the logo.
    const frame = hero.querySelector('.hero-frame');
    const hs = { open: REDUCED ? 1 : 0, s: 0 };
    const brand = document.querySelector('#site-header .brand');
    const shape = () => {
      const W = hero.clientWidth, H = hero.clientHeight, mob = W <= 900, k = hs.open, s = hs.s;
      const lerp = (a, b, t) => a + (b - a) * t;
      const pad = mob ? 10 : Math.min(22, Math.max(12, W * .014));
      const m = lerp(W * .1, pad, k) + s * 30;                 // same inset on all four sides
      const T = lerp(H * .14, pad, k) + s * 30, B = H - T;     // bottom mirrors top
      const R = mob ? 18 : 26;
      const br = brand.getBoundingClientRect();
      const cx = W / 2;
      // a soft U around the round emblem: semicircular floor, S-curved shoulders into the panel edge
      const nw = (br.width / 2 + (mob ? 13 : 18)) * k;          // notch half-width
      const nb = lerp(T, br.bottom + (mob ? 11 : 15), k);       // notch floor
      const rb = Math.max(0, Math.min(nw, nb - T - 4));          // floor radius (a full semicircle when deep enough)
      const vy = nb - rb;                                         // where the straight sides meet the floor arc
      const f = Math.min((mob ? 20 : 34) * k, Math.max(0, vy - T)); // shoulder size
      const notch = nw > 4 && nb > T + 6
        ? [`L ${cx - nw - f} ${T}`, `C ${cx - nw - f * .3} ${T} ${cx - nw} ${T + f * .3} ${cx - nw} ${T + f}`, `L ${cx - nw} ${vy}`,
           `A ${rb} ${rb} 0 0 0 ${cx - nw + rb} ${nb}`, `L ${cx + nw - rb} ${nb}`, `A ${rb} ${rb} 0 0 0 ${cx + nw} ${vy}`,
           `L ${cx + nw} ${T + f}`, `C ${cx + nw} ${T + f * .3} ${cx + nw + f * .3} ${T} ${cx + nw + f} ${T}`]
        : [];
      const d = [
        `M ${m} ${T + R}`, `A ${R} ${R} 0 0 1 ${m + R} ${T}`,
        ...notch,
        `L ${W - m - R} ${T}`, `A ${R} ${R} 0 0 1 ${W - m} ${T + R}`,
        `L ${W - m} ${B - R}`, `A ${R} ${R} 0 0 1 ${W - m - R} ${B}`,
        `L ${m + R} ${B}`, `A ${R} ${R} 0 0 1 ${m} ${B - R}`,
        'Z'
      ].join(' ');
      frame.style.clipPath = `path('${d}')`;
    };
    document.fonts && document.fonts.ready.then(shape);
    shape();
    addEventListener('resize', shape);

    const vid = hero.querySelector('video');
    if (vid && REDUCED && !ESDK.QA) vid.pause();
    if (REDUCED) return null;
    gsap.to(hs, { s: 1, ease: 'none', onUpdate: shape, scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
    gsap.set(lines, { yPercent: 105 });
    gsap.set(fades, { opacity: 0 });
    gsap.set(bg, { scale: 1.14 });
    gsap.to(bg, { yPercent: 14, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to(hero.querySelector('.hero-in'), { yPercent: -18, opacity: 0, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
    return () => {
      gsap.timeline()
        .to(hs, { open: 1, duration: 2.2, ease: 'expo.inOut', onUpdate: shape }, 0)
        .to(bg, { scale: 1, duration: 3.2, ease: 'expo.out' }, 0)
        .to(lines, { yPercent: 0, duration: 2, ease: 'expo.out', stagger: .16 }, .2)
        .to(fades, { opacity: 1, duration: 1.6, ease: 'power2.out', stagger: .1 }, .9);
    };
  }

  /* ═════════════ ABOUT ═════════════ */
  function about() {
    const A_ = D.about, F = D.founder;
    main.innerHTML = `
      ${phead('—', U.nav.about, C.about.lock)}

      <section class="sec tight founder-compact" id="kurucu-mesaji">
        <div class="wrap fc">
          <div class="fc-head">
            ${chapter('I', U.nav.founder)}
            <div class="mt-s">${lock(C.founder.lock, 'xs')}</div>
            <div class="sign" data-reveal><b>${F.name || 'Estederma'}</b><span class="caps" style="color:var(--ink-3)">${L(F.role)}</span></div>
          </div>
          <blockquote data-stagger>${L(F.message).map(p => `<p>${p}</p>`).join('')}</blockquote>
        </div>
      </section>
      <section class="sec" style="padding-top:clamp(40px,5vw,80px)">
        <div class="wrap split">
          <div class="frame" style="aspect-ratio:4/5" data-img><img class="par" src="assets/editorial/portrait-hands.webp" alt="" data-parallax="8"></div>
          <div style="align-self:center">
            <p class="prose-lg" data-reveal>${L(A_.intro)[0]}</p>
            <p class="body mt-m" data-reveal>${L(A_.intro)[1]}</p>
            <p class="caps mt-m" style="color:var(--ink-3)" data-reveal>${U.clinicsOnly} · ${U.shipping} · Ankara</p>
          </div>
        </div>
      </section>

      <section class="sec" style="padding-top:0">
        <div class="wrap">
          <div class="p-sec-head">${chapter('II', T.values)}${lock(C.values.lock, 'sm')}</div>
          <div class="vlist" data-stagger>
            ${A_.values.map((v, i) => `<div class="vrow"><span class="n">${ROMAN[i]}</span><h3>${L(v.t)}</h3><p>${L(v.d)}</p></div>`).join('')}
          </div>
        </div>
      </section>

      <section class="sec bone">
        <div class="wrap maker">
          <div class="frame" data-img><img src="assets/products/meso-lineup-scene.webp" alt="Neotiva" loading="lazy" decoding="async"></div>
          <div data-reveal>
            ${chapter('III', L(A_.maker.eyebrow))}
            <h2 class="lock xs" style="margin:34px 0 10px"><span class="ln"><span class="lni" lang="en">Inesen Bio</span></span></h2>
            <p class="caps" style="color:var(--ink-3)">${L(A_.maker.place)} · ${U.madeIn}</p>
            <p class="body mt-s">${L(A_.maker.body)}</p>
            <div class="mt-m"><a class="tlink" href="urunler.html">${T.products}</a></div>
          </div>
        </div>
      </section>

`;
  }

  /* ═════════════ PRODUCTS ═════════════ */
  function products() {
    const P = D.productsPage, rh = bySlug('rh-collagen'), vt = bySlug('vital-plus');
    const meso = D.products.filter(p => p.line === 'meso');
    const line = (l, p, img, flip, n) => `
      <section class="sec" id="${p.slug}" style="${vars(p)}">
        <div class="wrap line ${flip ? 'flip' : ''}">
          <div class="frame line-media" data-img><img class="par" src="${img}" alt="${p.name}" loading="lazy" decoding="async" data-parallax="8"></div>
          <div class="line-copy" data-reveal>
            ${chapter(n, L(l.kicker))}
            <h2 class="lock sm" data-lock><span class="ln"><span class="lni"><i>Neotiva</i></span></span> <span class="ln"><span class="lni" lang="en">${p.short}</span></span></h2>
            <p class="body">${L(l.d)}</p>
            <p class="caps ing">${(p.actives ? p.actives.map(a => L(a.n)) : p.complexes.flatMap(c => lang === 'en' ? c.ingEn : c.ing)).slice(0, 6).join(' · ')}</p>
            <a class="tlink" href="${href(p)}">${T.explore}</a>
          </div>
        </div>
      </section>`;

    main.innerHTML = `
      ${phead('—', T.products, C.products.lock, L(P.hero.body))}
      ${line(D.lines[0], rh, rh.scene, false, 'I')}

      <section class="sec paper" id="mezoterapi">
        <div class="wrap">
          <div class="p-sec-head">${chapter('II', '<span lang="en">Premium Meso Solution</span>')}<div>${lock(C.meso.lock, 'sm')}<p class="body mt-s" data-reveal>${L({ tr: 'Altı formül, tek bir protokol mantığı. Her biri 5 ml × 5 flakon; yüz, göz çevresi ve saçlı deri için ayrı ayrı formüle edildi.', en: 'Six formulas, one protocol logic. Each 5 ml × 5 vials, formulated separately for the face, eye area and scalp.' })}</p></div></div>
          <div class="objects">${meso.map(object).join('')}</div>

          <div class="mt-l">
            <div class="p-sec-head" style="margin-bottom:0"><span class="caps" style="color:var(--ink-3)">${L(P.protocol.eyebrow)}</span><div>${lock(C.protocol.lock, 'xs')}<p class="body mt-s" data-reveal>${L(P.protocol.body)}</p></div></div>
            <div class="phases" data-stagger>
              ${P.protocol.phases.map((f, i) => `<div class="phase"><span class="n">${ROMAN[i]}</span><h3>${L(f.t)}</h3><p class="s">${L(f.s)} — ${L(f.i)}</p></div>`).join('')}
            </div>
          </div>

          <div class="cmp mt-l" data-stagger>
            <div class="cmp-row head caps">${T.cmp.map(h => `<span>${h}</span>`).join('')}</div>
            ${meso.map(p => `<a class="cmp-row" href="${href(p)}"><span class="nm">${p.short}</span><span>${T.fiveVials}</span><span>${L(p.specs[1][1])}</span><span>${L(p.specs[2][1])}</span></a>`).join('')}
          </div>
        </div>
      </section>

      ${line(D.lines[2], vt, 'assets/products/vital-syringe-scene.webp', true, 'III')}

      <section class="sec" style="padding-top:0">
        <div class="wrap">
          <div class="p-sec-head">${chapter('IV', CH[2])}${lock(C.science.lock, 'sm')}</div>
          ${scienceIndex(P.actives.list)}
        </div>
      </section>`;
  }

  /* ═════════════ PRODUCT ═════════════ */
  function product() {
    const p = bySlug(document.body.dataset.slug || new URLSearchParams(location.search).get('p'));
    if (!p) { location.replace('urunler.html'); return; }
    document.body.setAttribute('style', vars(p));
    const isMeso = p.line === 'meso';
    const line = D.lines.find(l => l.id === p.line);
    const ben = L(p.benefits);
    const others = isMeso
      ? [1, 2, 3].map(k => { const m = D.products.filter(x => x.line === 'meso'); return m[(m.indexOf(p) + k) % m.length]; })
      : D.products.filter(x => x.slug !== p.slug && ['rh-collagen', 'vital-plus', 'lift-face', 'glow-face'].includes(x.slug)).slice(0, 3);
    const heroMedia = p.scene
      ? `<div class="frame jewel p-media"><img src="${p.scene}" alt="${p.name}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover"></div>`
      : jewel(p, 'p-media');
    const specsJewel = `<div class="jewel" data-img style="background:${p.bg ? `url(${p.bg}) center/cover` : 'var(--bone)'}"><img class="obj" src="${p.pack}" alt="${p.name}" loading="lazy" decoding="async"></div>`;
    let ch = 0; const next = () => ROMAN[ch++];

    main.innerHTML = `
      <section class="p-hero">
        ${heroMedia}
        <div class="p-hero-copy">
          <nav class="crumbs caps" aria-label="${lang === 'en' ? 'Breadcrumb' : 'Gezinti yolu'}"><a href="urunler.html">${T.products}</a><span>—</span><a href="urunler.html#${isMeso ? 'mezoterapi' : p.slug}"><span lang="en">${isMeso ? 'Premium Meso Solution' : line.name}</span></a></nav>
          <span class="caps" style="color:var(--deep)">${L(p.complex)}</span>
          <h1 class="lock" data-lock data-manual style="margin-top:28px"><span class="ln"><span class="lni"><i>Neotiva</i></span></span> <span class="ln"><span class="lni" lang="en">${p.short}</span></span></h1>
          <p class="lead">${L(p.title)}</p>
          <dl class="p-facts">
            <div><dt class="caps">${T.contents}</dt><dd>${packLabel(p)}</dd></div>
            <div><dt class="caps">${T.origin}</dt><dd>${T.korea}</dd></div>
            <div><dt class="caps">${T.maker}</dt><dd>Inesen Bio</dd></div>
          </dl>
          <div class="actions"><a class="btn" href="iletisim.html">${U.inquire}</a><a class="tlink" href="#teknik">${T.specsBtn}</a></div>
        </div>
      </section>

      <section class="sec">
        <div class="wrap narrow center">
          ${chapter(next(), C.formula[lang], 'center')}
          <h2 class="prose-lg mt-m" data-reveal>${L(p.intro)}</h2>
          <div class="phases" style="text-align:center" data-stagger>
            ${ben.slice(0, 3).map((b, i) => `<div class="phase"><span class="n">${ROMAN[i]}</span><p class="benefit">${b}</p></div>`).join('')}
          </div>
        </div>
      </section>

      <section class="sec" style="padding-top:0">
        <div class="wrap">
          <div class="p-sec-head">${chapter(next(), `<span lang="en">${p.name}</span>`)}${lock(p.complexes ? T.lk.complexes : T.lk.actives, 'sm')}</div>
          ${p.complexes ? `
            <div class="idx cx-list">${p.complexes.map((c, i) => `
              <div class="idx-row"><span class="n" style="font-family:var(--display);font-style:italic;color:var(--deep);font-size:20px">${String(i + 1).padStart(2, '0')}</span>
                <div><h3>${L(c.t)}</h3><span class="caps ing">${(lang === 'en' ? c.ingEn : c.ing).join(' · ')}</span></div>
                <div><p>${L(c.d)}</p><small>${c.ref}</small></div></div>`).join('')}
            </div>` : `
            <div class="idx ing-list">${p.actives.map((a, i) => `
              <div class="idx-row"><span class="n">${String(i + 1).padStart(2, '0')}</span>
                <h3>${L(a.n)}${a.dose ? `<span class="dose">${lang === 'en' ? a.dose.replace(',', '.') : '%' + a.dose.replace('%', '')}</span>` : ''}</h3>
                <p>${L(a.t)}</p></div>`).join('')}
            </div>`}
        </div>
      </section>

      <section class="sec tight paper">
        <div class="wrap">
          <blockquote class="claim" data-reveal>“${L(p.claim)}”</blockquote>
          <span class="caps claim-cite" data-reveal>${T.clinicalNote} — ${p.name}</span>
        </div>
      </section>

      <section class="sec">
        <div class="wrap">
          <div class="p-sec-head">${chapter(next(), `<span lang="en">${p.name}</span>`)}${lock(T.lk.use, 'sm')}</div>
          <div class="dual">
            ${p.indications ? `<div><span class="caps" style="color:var(--ink-3)">${T.indications}</span><ul class="plist mt-s" data-stagger>${L(p.indications).map(x => `<li>${x}</li>`).join('')}</ul></div>` : `<div><span class="caps" style="color:var(--ink-3)">${T.benefits}</span><ul class="plist mt-s" data-stagger>${ben.map(x => `<li>${x}</li>`).join('')}</ul></div>`}
            <div><span class="caps" style="color:var(--ink-3)">${T.areas}</span><ul class="plist mt-s" data-stagger>${L(p.areas).map(x => `<li>${x}</li>`).join('')}</ul></div>
          </div>
        </div>
      </section>

      <section class="sec bone">
        <div class="wrap">
          <div class="p-sec-head">${chapter(next(), `<span lang="en">${p.name}</span>`)}${lock(T.lk.protocol, 'sm')}</div>
          <div class="steps" data-stagger>
            ${p.protocol.steps.map(s => `<div class="step"><span class="caps k">${L(s.k)}</span><div class="v">${L(s.v)}</div><div class="bar"></div></div>`).join('')}
          </div>
          ${p.results ? `<div class="results" data-stagger>${p.results.map(r => `<div><b>${L(r.k)}</b><span>${L(r.v)}</span></div>`).join('')}</div>` : ''}
          ${p.protocol.note ? `<p class="body mt-m" data-reveal>${L(p.protocol.note)}</p>` : ''}
        </div>
      </section>

      ${p.aftercare ? `
      <section class="sec">
        <div class="wrap">
          <div class="p-sec-head">${chapter(next(), `<span lang="en">${p.name}</span>`)}${lock(T.lk.care, 'sm')}</div>
          <ol class="care narrow" style="margin:0 0 0 auto;max-width:none" data-stagger>${L(p.aftercare).map((x, i) => `<li><span class="n">${ROMAN[i]}</span><span>${x}</span></li>`).join('')}</ol>
        </div>
      </section>` : ''}

      <section class="sec paper" id="teknik">
        <div class="wrap specs">
          ${specsJewel}
          <div>
            ${chapter(next(), `<span lang="en">${p.name}</span>`)}
            <div class="mt-s">${lock(T.lk.specs, 'xs')}</div>
            <dl class="mt-m" data-stagger>${p.specs.map(([k, v]) => `<div class="spec-row"><dt class="caps">${L(k)}</dt><dd>${L(v)}</dd></div>`).join('')}</dl>
            <div class="actions mt-m" data-reveal><a class="btn" href="iletisim.html">${U.inquire}</a></div>
          </div>
        </div>
      </section>

      <section class="sec">
        <div class="wrap">
          <div class="p-sec-head">${chapter(next(), '<span lang="en">Neotiva</span>')}${lock(T.lk.related, 'sm')}</div>
          <div class="objects" style="margin-top:0">${others.map(object).join('')}</div>
        </div>
      </section>`;
  }

  function productMotion() {
    if (!REDUCED) gsap.utils.toArray('.step .bar').forEach((b, i) => gsap.fromTo(b, { scaleX: 0 }, { scaleX: 1, duration: 1.8, delay: i * .2, ease: 'expo.inOut', scrollTrigger: { trigger: b, start: 'top 90%' } }));
    return headIntro();
  }

  /* ═════════════ EVENTS ═════════════ */
  function events() {
    main.innerHTML = `
      ${phead('—', U.nav.events, C.eventsPage.lock, L(D.eventsPage.hero.body))}
      <section class="sec" style="padding-top:clamp(40px,5vw,80px)">
        <div class="wrap">
          ${D.events.map(e => `
            <article class="ev">
              <div class="frame" data-img><img class="par" src="${e.img.replace(/\.jpg$/, '.webp')}" alt="${L(e.t)}" loading="lazy" decoding="async" style="object-position:${e.pos}" data-parallax="8"></div>
              <div data-reveal>
                <span class="d">${L(e.date)}</span>
                <h2>${L(e.t)}</h2>
                <p class="body">${L(e.d)}</p>
              </div>
            </article>`).join('')}
          <div class="mt-l center"><a class="tlink" href="${D.brand.instagramUrl}" target="_blank" rel="noopener">${T.follow}</a></div>
        </div>
      </section>`;
  }

  /* ═════════════ CONTACT ═════════════ */
  function contact() {
    const Cp = D.contactPage, F = Cp.form[lang], b = D.brand;
    const tel = b.phone.replace(/[^\d+]/g, '');
    const row = (label, inner) => `<div class="crow"><h2 class="caps">${label}</h2>${inner}</div>`;
    main.innerHTML = `
      ${phead('—', U.nav.contact, C.contact.lock, L(Cp.hero.body))}
      <section class="sec" style="padding-top:clamp(24px,3vw,48px)">
        <div class="wrap contact-simple">
          <div class="cdetails">
            ${row(F.email, `<a class="cbig" href="mailto:${b.email}">${b.email}</a>`)}
            ${row(F.phone, `<a class="cbig" href="tel:${tel}">${b.phone}</a>`)}
            ${row(U.address, `<address><a class="cbig addr" href="${b.address.mapLink}" target="_blank" rel="noopener">${b.address.lines.join('<br>')}</a></address>`)}
            <div class="cactions">
              <a class="btn" href="mailto:${b.email}">${F.email}</a>
              <a class="btn alt" href="tel:${tel}">${F.phone}</a>
              ${b.whatsapp ? `<a class="btn alt" href="https://wa.me/${b.whatsapp}" target="_blank" rel="noopener">WhatsApp</a>` : ''}
              <a class="tlink" href="${b.dmUrl}" target="_blank" rel="noopener">${U.dm}</a>
            </div>
          </div>
          <div class="map"><iframe title="${U.address} — Google Maps" src="${b.address.map}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
        </div>
      </section>`;
  }

  /* ═════════════ 404 ═════════════ */
  function notFound() {
    main.innerHTML = `
      ${phead('404', lang === 'en' ? 'Page not found' : 'Sayfa bulunamadı', lang === 'en' ? ['This page', '<i>does not exist</i>'] : ['Aradığınız sayfa', '<i>bulunamadı</i>'],
        lang === 'en' ? 'The link may be outdated. You can continue from one of the pages below.' : 'Bağlantı eskimiş olabilir. Aşağıdaki sayfalardan devam edebilirsiniz.')}
      <section class="sec" style="padding-top:0">
        <div class="wrap center"><div class="actions" style="justify-content:center">
          <a class="btn" href="index.html">${U.nav.home}</a><a class="tlink" href="urunler.html">${U.nav.products}</a><a class="tlink" href="iletisim.html">${U.nav.contact}</a>
        </div></div>
      </section>`;
  }

  /* ═════════════ route ═════════════ */
  const routes = {
    home: [home, homeMotion],
    about: [about, headIntro],
    products: [products, () => { initFollow(); return headIntro(); }],
    product: [product, productMotion],
    events: [events, headIntro],
    contact: [contact, headIntro],
    notfound: [notFound, headIntro]
  };
  const [render, motion] = routes[page] || routes.home;
  if (!PRE) render();
  document.querySelectorAll('main section').forEach((sec, i) => {
    const h = sec.querySelector('h1, h2');
    if (!h) return;
    if (!h.id) h.id = 'h-' + (sec.id || i);
    sec.setAttribute('aria-labelledby', h.id);
  });
  ESDK.boot(motion);
})();
