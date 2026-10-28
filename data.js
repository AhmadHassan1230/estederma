/* Estederma Aesthetics — all site content (TR first, EN second).
   Every text field is either a plain string or { tr, en }.
   Items marked CONFIRM are placeholders to check with the client. */

window.ESD = {
  brand: {
    legal: 'Estederma Limited Şirketi',
    name: 'Estederma Aesthetics',
    instagram: 'estedermamedical',
    instagramUrl: 'https://www.instagram.com/estedermamedical/',
    dmUrl: 'https://ig.me/m/estedermamedical',
    address: {
      lines: ['Batı Sitesi Mah. 2331 Sok.', 'Çoşkun Irmak İş Mrk. No:3/212', 'Yenimahalle / Ankara'],
      map: 'https://www.google.com/maps?q=Bat%C4%B1+Sitesi+Mah.+2331+Sok.+Co%C5%9Fkun+Irmak+%C4%B0%C5%9F+Merkezi+Yenimahalle+Ankara&output=embed',
      mapLink: 'https://maps.google.com/?q=Bat%C4%B1+Sitesi+Mah.+2331+Sok.+Co%C5%9Fkun+Irmak+%C4%B0%C5%9F+Merkezi+Yenimahalle+Ankara'
    },
    phone: '+90 543 509 80 17',
    whatsapp: '',   // CONFIRM — digits only, e.g. 905XXXXXXXXX
    email: 'estedermabilgi@gmail.com',
    formEndpoint: '', // CONFIRM — e.g. a Formspree URL. Empty = form shows success without sending.
    heroVideo: 'assets/video/hero.mp4'   // Google Flow loop goes here, e.g. 'assets/video/hero.mp4' (see MEDIA.md)
  },

  founder: {
    name: '',  // CONFIRM — founder name not published on Instagram
    role: { tr: 'Kurucu, Estederma', en: 'Founder, Estederma' },
    // CONFIRM — draft message written from the brand's positioning; replace with the founder's own words
    message: {
      tr: [
        'Estederma’yı tek bir inançla kurduk: Hekimin elindeki ürün, ancak arkasındaki bilim kadar güçlüdür.',
        'Bu yüzden portföyümüze yalnızca formülünü, üretim kalitesini ve klinik karşılığını yakından tanıdığımız ürünleri alıyoruz. Kore biyoteknolojisinin rejeneratif estetikteki birikimini Türkiye’deki kliniklerle buluştururken; doğru ürünü, doğru protokolle ve kesintisiz destekle sunmayı görev biliyoruz.',
        'Kongrelerde, eğitimlerde ve her siparişte aynı özeni göstermeye devam edeceğiz. Bize güvenen tüm hekimlerimize teşekkür ederiz.'
      ],
      en: [
        'We founded Estederma on a single belief: a product in a physician’s hands is only as strong as the science behind it.',
        'That is why our portfolio only includes products whose formulation, manufacturing quality and clinical value we know closely. As we bring Korea’s expertise in regenerative aesthetics to clinics across Türkiye, our duty is to deliver the right product, with the right protocol and continuous support.',
        'We will keep bringing the same care to every congress, every training and every order. Thank you to every physician who trusts us.'
      ]
    }
  },

  ui: {
    tr: {
      nav: { home: 'Ana Sayfa', about: 'Kurumsal', founder: 'Kurucu Mesajı', products: 'Ürünler', events: 'Kongre & Etkinlikler', contact: 'İletişim' },
      cta: 'Partner Olun',
      menu: 'Menü', close: 'Kapat',
      explore: 'Ürünü incele', allProducts: 'Tüm ürünler', inquire: 'Bilgi & Sipariş', dm: 'Instagram’dan yazın',
      scroll: 'Kaydırın',
      clinicsOnly: 'Kliniklere özel', shipping: 'Türkiye geneli kargo', orderDm: 'Sipariş & Bilgi: Instagram DM',
      madeIn: 'Kore’de üretilmiştir',
      footerNote: 'Bu sitedeki ürün bilgileri yalnızca sağlık profesyonellerine yöneliktir.',
      rights: 'Tüm hakları saklıdır.',
      kvkk: 'KVKK Aydınlatma Metni',
      address: 'Adres', follow: 'Takip edin', write: 'Bize yazın',
      gate: {
        eyebrow: 'Sağlık profesyonelleri için',
        title: 'Bu bölüm hekim ve kliniklere yöneliktir.',
        body: 'Ürün içerikleri, uygulama protokolleri ve teknik bilgiler yalnızca sağlık profesyonellerinin bilgilendirilmesi amacıyla sunulmaktadır.',
        yes: 'Sağlık profesyoneliyim', no: 'Ana sayfaya dön'
      }
    },
    en: {
      nav: { home: 'Home', about: 'About', founder: 'Founder’s Message', products: 'Products', events: 'Congresses & Events', contact: 'Contact' },
      cta: 'Become a Partner',
      menu: 'Menu', close: 'Close',
      explore: 'View product', allProducts: 'All products', inquire: 'Inquire & Order', dm: 'Message us on Instagram',
      scroll: 'Scroll',
      clinicsOnly: 'For clinics only', shipping: 'Shipping across Türkiye', orderDm: 'Orders & info: Instagram DM',
      madeIn: 'Made in Korea',
      footerNote: 'Product information on this site is intended for healthcare professionals only.',
      rights: 'All rights reserved.',
      kvkk: 'Privacy Notice (KVKK)',
      address: 'Address', follow: 'Follow', write: 'Write to us',
      gate: {
        eyebrow: 'For healthcare professionals',
        title: 'This section is intended for physicians and clinics.',
        body: 'Ingredients, treatment protocols and technical information are provided solely to inform healthcare professionals.',
        yes: 'I am a healthcare professional', no: 'Back to home'
      }
    }
  },

  home: {
    statement: {
      tr: 'Estederma; Kore biyoteknolojisinin en yeni rejeneratif formüllerini, güvenilir tedarik, bilimsel eğitim ve kesintisiz destekle Türkiye’deki kliniklere taşır.',
      en: 'Estederma brings the latest regenerative formulations from Korean biotechnology to clinics in Türkiye — with reliable supply, scientific training and continuous support.'
    },
    pillars: [
      { t: { tr: 'Kliniklere özel', en: 'For clinics only' }, d: { tr: 'Portföyümüz yalnızca hekimlere ve kliniklere sunulur; her sipariş doğrudan bizimle ilerler.', en: 'Our portfolio is offered exclusively to physicians and clinics; every order is handled directly by us.' } },
      { t: { tr: 'Türkiye geneli kargo', en: 'Nationwide shipping' }, d: { tr: 'Ankara’daki merkezimizden Türkiye’nin her iline güvenli ve hızlı gönderim.', en: 'Safe, fast delivery from our Ankara base to every province in Türkiye.' } },
      { t: { tr: 'Hekim eğitimleri', en: 'Physician training' }, d: { tr: 'Uzman eğitmen hekimlerle uygulamalı eğitimler ve ürün protokolleri.', en: 'Hands-on training with expert physician trainers, plus product protocols.' } }
    ],
    cta: {
      title: { tr: 'Kliniğiniz için<br><em>Neotiva.</em>', en: 'Neotiva for<br><em>your clinic.</em>' },
      body: { tr: 'Ürün bilgisi, fiyat listesi ve partnerlik koşulları için bize ulaşın.', en: 'Contact us for product information, price lists and partnership terms.' }
    }
  },

  about: {
    hero: {
      eyebrow: { tr: 'Kurumsal', en: 'About' },
      title: { tr: 'Estetiğin bilimine<br><em>adanmış bir distribütör.</em>', en: 'A distributor devoted<br><em>to the science of aesthetics.</em>' }
    },
  intro: {
      tr: [
        'Estederma Limited Şirketi, Ankara merkezli bir medikal estetik distribütörüdür. Kore’nin önde gelen biyoteknoloji üreticilerinden Inesen Bio’nun Neotiva serisini Türkiye’deki hekim ve kliniklerle buluşturur.',
        'Polinükleotid, PDRN, rekombinant kolajen ve eksozom gibi yeni nesil aktiflerle geliştirilen formülleri; doğru bilgi, uygulama protokolleri ve eğitimle birlikte sunarız. Siparişten eğitime kadar her adımda hekimin yanında olmak, çalışma biçimimizin özüdür.'
      ],
      en: [
        'Estederma Limited Şirketi is a medical aesthetics distributor based in Ankara. We bring the Neotiva range by Inesen Bio — one of Korea’s leading biotechnology manufacturers — to physicians and clinics across Türkiye.',
        'We supply formulations built on next-generation actives such as polynucleotides, PDRN, recombinant collagen and exosomes, together with accurate information, treatment protocols and training. Standing beside the physician at every step, from order to training, is the core of how we work.'
      ]
    },
    values: [
      { t: { tr: 'Bilimsel temel', en: 'Scientific basis' }, d: { tr: 'Portföyümüzdeki her ürünün içeriğini, etki mekanizmasını ve klinik dayanağını şeffafça paylaşırız.', en: 'We openly share the ingredients, mechanism of action and clinical basis of every product we carry.' } },
      { t: { tr: 'Hekimle iş birliği', en: 'Partnership with physicians' }, d: { tr: 'Ürünlerimizi yalnızca sağlık profesyonellerine sunar, uygulamada birlikte öğreniriz.', en: 'We supply healthcare professionals only, and we keep learning with them in practice.' } },
      { t: { tr: 'Güvenilir tedarik', en: 'Reliable supply' }, d: { tr: 'Orijinal ürün, düzenli stok ve Türkiye geneli hızlı gönderim.', en: 'Genuine products, consistent stock and fast nationwide delivery.' } },
      { t: { tr: 'Sürekli eğitim', en: 'Continuous education' }, d: { tr: 'Kongreler ve uygulamalı eğitimlerle protokolleri sahaya taşırız.', en: 'Through congresses and hands-on training we bring protocols into practice.' } }
    ],
    maker: {
      eyebrow: { tr: 'Üretici', en: 'Manufacturer' },
      name: 'Inesen Bio Co., Ltd.',
      place: { tr: 'Seul, Güney Kore', en: 'Seoul, South Korea' },
      body: { tr: 'Neotiva serisi, Seul merkezli Inesen Bio tarafından Kore’de üretilir. Mezoterapi solüsyonları, rekombinant kolajen jeli ve önceden doldurulmuş cilt güçlendiricileri tek bir rejenerasyon felsefesi altında geliştirilir.', en: 'The Neotiva range is manufactured in Korea by Seoul-based Inesen Bio. Its mesotherapy solutions, recombinant collagen gel and prefilled skin booster are developed under a single philosophy of regeneration.' }
    }
  },

  productsPage: {
    hero: {
      eyebrow: { tr: 'Ürünler', en: 'Products' },
      title: { tr: 'Neotiva.<br><em>Premium meso solution.</em>', en: 'Neotiva.<br><em>Premium meso solution.</em>' },
      body: { tr: 'Inesen Bio tarafından Kore’de üretilen Neotiva; rekombinant kolajen, polinükleotid, PDRN ve biyomimetik peptitleri bir araya getiren rejeneratif bir estetik serisidir.', en: 'Made in Korea by Inesen Bio, Neotiva is a regenerative aesthetic range that combines recombinant collagen, polynucleotides, PDRN and biomimetic peptides.' }
    },
    protocol: {
      eyebrow: { tr: 'Mezoterapi protokolü', en: 'Mesotherapy protocol' },
      title: { tr: 'Üç fazlı yaklaşım.', en: 'A three-phase approach.' },
      body: { tr: 'Gözle görülür gençleşme etkisi için en az 6 seans (3 ay) mezoterapi uygulaması önerilir. Olgun ciltler, aynı canlandırma etkisi için genç ciltlere kıyasla daha kısa aralıklarla tedavi gerektirir.', en: 'At least 6 sessions (3 months) of mesotherapy are recommended for a visible rejuvenating effect. Mature skin requires shorter intervals than younger skin for the same revitalising effect.' },
      phases: [
        { n: { tr: 'Faz 1', en: 'Phase 1' }, t: { tr: 'Başlangıç', en: 'Initiation' }, s: { tr: '4 seans', en: '4 sessions' }, i: { tr: '7–15 gün arayla', en: '7–15 days apart' } },
        { n: { tr: 'Faz 2', en: 'Phase 2' }, t: { tr: 'Onarım', en: 'Repair' }, s: { tr: '2 seans', en: '2 sessions' }, i: { tr: '1 ay arayla', en: '1 month apart' } },
        { n: { tr: 'Faz 3', en: 'Phase 3' }, t: { tr: 'İdame', en: 'Maintenance' }, s: { tr: '1 seans', en: '1 session' }, i: { tr: '2–6 ayda bir', en: 'every 2–6 months' } }
      ]
    },
    actives: {
      eyebrow: { tr: 'Aktif içerikler', en: 'Key actives' },
      title: { tr: 'Formüllerin<br><em>arkasındaki bilim.</em>', en: 'The science<br><em>behind the formulas.</em>' },
      list: [
        { n: 'Polinükleotid (PN)', en: 'Polynucleotides (PN)', d: { tr: 'Fibroblast aktivitesini ve doku rejenerasyonunu destekler, mikrodolaşımı güçlendirir.', en: 'Supports fibroblast activity and tissue regeneration, and strengthens microcirculation.' }, in: ['rh-collagen', 'eye-glow', 'lift-face', 'nad-pro', 'vital-plus'] },
        { n: 'PDRN', en: 'PDRN', d: { tr: 'Polideoksiribonükleotit; cilt yenilenmesini stimüle eder ve iyileşme sürecini hızlandırır.', en: 'Polydeoxyribonucleotide; stimulates skin renewal and speeds up healing.' }, in: ['glow-face'] },
        { n: 'Rh Kolajen', en: 'Rh Collagen', d: { tr: 'Rekombinant hümanize kolajen; doğal insan kolajenini taklit ederek cilt yapısını ve sıkılığını destekler.', en: 'Recombinant humanised collagen; mimics native human collagen to support skin structure and firmness.' }, in: ['rh-collagen', 'lift-face'] },
        { n: 'Eksozomlar', en: 'Exosomes', d: { tr: 'Yenilenme sinyallerini taşıyarak dormant folikülleri aktive eder ve hücresel onarımı stimüle eder.', en: 'Carry renewal signals that activate dormant follicles and stimulate cellular repair.' }, in: ['hair-growth'] },
        { n: 'NAD⁺', en: 'NAD⁺', d: { tr: 'Hücresel enerji (ATP) üretimi için temel koenzim; DNA onarımını ve cilt canlılığını destekler.', en: 'Essential coenzyme for cellular energy (ATP); supports DNA repair and skin vitality.' }, in: ['nad-pro'] },
        { n: 'Hyalüronik Asit', en: 'Hyaluronic Acid', d: { tr: 'Derin nemlendirme sağlar, cildin viskoelastik özelliklerini ve dolgunluğunu iyileştirir.', en: 'Provides deep hydration and improves the skin’s viscoelasticity and plumpness.' }, in: ['rh-collagen', 'glow-face', 'dmae-max', 'vital-plus'] },
        { n: 'Biyomimetik Peptitler', en: 'Biomimetic Peptides', d: { tr: 'Asetil Heksapeptit-8 gibi peptitler mimik çizgilerini yumuşatır, kolajen üretimini destekler.', en: 'Peptides such as Acetyl Hexapeptide-8 soften expression lines and support collagen production.' }, in: ['lift-face', 'glow-face', 'dmae-max', 'nad-pro', 'hair-growth', 'vital-plus'] },
        { n: 'Traneksamik Asit & Glutatyon', en: 'Tranexamic Acid & Glutathione', d: { tr: 'Melanin üretimini baskılayarak pigmentasyonu azaltır, güçlü antioksidan koruma sağlar.', en: 'Reduce pigmentation by suppressing melanin production and provide strong antioxidant protection.' }, in: ['glow-face', 'nad-pro', 'vital-plus'] }
      ]
    }
  },

  eventsPage: {
    hero: {
      eyebrow: { tr: 'Kongre & Etkinlikler', en: 'Congresses & Events' },
      title: { tr: 'Bilgiyi<br><em>sahaya taşıyoruz.</em>', en: 'Bringing knowledge<br><em>into practice.</em>' },
      body: { tr: 'Medikal estetik kongrelerinde yer alıyor, eğitmen hekimlerle uygulamalı eğitimler düzenliyoruz. En güncel etkinliklerimizi Instagram’da paylaşıyoruz.', en: 'We take part in medical aesthetics congresses and organise hands-on training with physician trainers. Our latest events are shared on Instagram.' }
    }
  },

  // Sourced from @estedermamedical posts. Titles marked CONFIRM are inferred from photos.
  events: [
    { date: { tr: 'Mayıs 2026', en: 'May 2026' }, img: 'assets/ig/ig0.jpg', pos: '50% 30%',
      t: 'Full Face 2026',
      d: { tr: 'Medikal estetiğin önde gelen buluşmalarından Full Face 2026’da sektörün yeniliklerini yerinde takip ettik ve hekimlerle bir araya geldik.', en: 'At Full Face 2026, one of the leading meetings in medical aesthetics, we followed the latest innovations first-hand and met with physicians.' } },
    { date: { tr: 'Aralık 2025', en: 'December 2025' }, img: 'assets/ig/ig1.jpg', pos: '50% 55%',
      t: { tr: 'Medikal Estetik Kongresi', en: 'Medical Aesthetics Congress' }, // CONFIRM event name
      d: { tr: 'Yılın son kongresinde iş ortaklarımız ve hekimlerle buluşarak yeni dönem ürün ve protokollerini konuştuk.', en: 'At the final congress of the year we met partners and physicians to discuss the coming season’s products and protocols.' } },
    { date: { tr: 'Temmuz 2025', en: 'July 2025' }, img: 'assets/ig/ig2.jpg', pos: '50% 40%',
      t: { tr: 'Uygulamalı Hekim Eğitimi', en: 'Hands-on Physician Training' },
      d: { tr: 'Estederma ailesi olarak eğitmen hekim Dr. Volkan Arpacı’ya ve eğitimimize katılan tüm hekimlerimize teşekkür ederiz.', en: 'On behalf of the Estederma family, we thank trainer Dr. Volkan Arpacı and every physician who joined our training.' } },
    { date: { tr: 'Eylül 2024', en: 'September 2024' }, img: 'assets/ig/ig3.jpg', pos: '50% 35%',
      t: { tr: 'Kongre Standı', en: 'Congress Stand' }, // CONFIRM event name
      d: { tr: 'Kongre standımızda meslektaşlarımızı ağırladık; rejeneratif mezoterapi ve eksozom çözümlerini birebir tanıttık.', en: 'We welcomed colleagues at our congress stand and presented regenerative mesotherapy and exosome solutions one-to-one.' } }
  ],

  contactPage: {
    hero: {
      eyebrow: { tr: 'İletişim', en: 'Contact' },
      title: { tr: 'Partnerimiz<br><em>olun.</em>', en: 'Become<br><em>a partner.</em>' },
      body: { tr: 'Ürün bilgisi, fiyat listesi, eğitim ve partnerlik için bizi arayın ya da yazın. Ekibimiz en kısa sürede dönüş yapacaktır.', en: 'Call or write to us for product information, price lists, training and partnership. Our team will get back to you shortly.' }
    },
    form: {
      tr: { name: 'Ad Soyad', title: 'Unvan', titles: ['Hekim', 'Klinik yöneticisi', 'Eczacı', 'Diğer'], clinic: 'Klinik / Kurum', city: 'Şehir', phone: 'Telefon', email: 'E-posta', interest: 'İlgilendiğiniz ürünler', msg: 'Mesajınız', consent: 'KVKK Aydınlatma Metni’ni okudum, kişisel verilerimin iletişim amacıyla işlenmesini kabul ediyorum.', send: 'Gönder', sent: 'Teşekkürler. Talebiniz alındı, en kısa sürede size dönüş yapacağız.', required: 'Lütfen zorunlu alanları doldurun.' },
      en: { name: 'Full name', title: 'Title', titles: ['Physician', 'Clinic manager', 'Pharmacist', 'Other'], clinic: 'Clinic / Institution', city: 'City', phone: 'Phone', email: 'Email', interest: 'Products of interest', msg: 'Your message', consent: 'I have read the Privacy Notice and consent to my personal data being processed for contact purposes.', send: 'Send', sent: 'Thank you. Your request has been received and we will get back to you shortly.', required: 'Please fill in the required fields.' }
    }
  },

  lines: [
    { id: 'rh', name: 'Neotiva Rh Collagen', slug: 'rh-collagen', color: '#8E1030', ink: '#FBEFEF',
      img: 'assets/products/rh-collagen-scene.webp',
      kicker: { tr: 'Cilt yenileyici & aydınlatıcı jel', en: 'Skin-renewing & brightening gel' },
      d: { tr: 'Rekombinant hümanize kolajen, süksinik asit, polinükleotid ve hyalüronik asit ile yüz, boyun, dekolte ve el cildine hafif lifting etkili yenilenme.', en: 'Recombinant humanised collagen, succinic acid, polynucleotides and hyaluronic acid — renewal with a subtle lifting effect for the face, neck, décolleté and hands.' },
      tags: ['Rh Kolajen', 'Süksinik Asit', 'PN', 'HA'] },
    { id: 'meso', name: 'Neotiva Premium Meso Solution', slug: 'urunler.html#mezoterapi', color: '#E9E0D2', ink: '#1A1816',
      img: 'assets/products/meso-lineup-scene.webp',
      kicker: { tr: '6 formüllü mezoterapi serisi', en: 'Six-formula mesotherapy line' },
      d: { tr: 'Eye Glow, Lift Face, Glow Face, DMAE Max, NAD+ Pro ve Hair Growth — her biri 5 ml × 5 flakon, tek bir endikasyona odaklı.', en: 'Eye Glow, Lift Face, Glow Face, DMAE Max, NAD+ Pro and Hair Growth — each 5 ml × 5 vials, focused on a single indication.' },
      tags: ['Eye Glow', 'Lift Face', 'Glow Face', 'DMAE Max', 'NAD+ Pro', 'Hair Growth'] },
    { id: 'vital', name: 'Neotiva Vital+', slug: 'vital-plus', color: '#0C5F64', ink: '#EAF7F6',
      img: 'assets/products/vital-scene.webp',
      kicker: { tr: 'Gelişmiş çoklu aktif dermal biyomühendislik', en: 'Advanced multi-active dermal bioengineering' },
      d: { tr: '2,5 mL önceden doldurulmuş enjektörde, altı aktif kompleksi bir araya getiren nemlendirici cilt güçlendirici.', en: 'A hydrating skin booster in a 2.5 mL prefilled syringe, combining six active complexes.' },
      tags: ['HA + Trehaloz', 'PN', 'Bakır Tripeptit-1', 'Peptitler'] }
  ],

  products: [
    /* ───────────── RH COLLAGEN ───────────── */
    {
      slug: 'rh-collagen', line: 'rh', name: 'Neotiva Rh Collagen', short: 'Rh Collagen',
      acc: '#9E1233', deep: '#5E0A1E', tint: '#F4E7E8', onAcc: 'light',
      scene: 'assets/products/rh-collagen-scene.webp', pack: 'assets/products/rh-collagen-pack.webp', sceneWide: true,
      complex: { tr: 'Cilt yenileyici & aydınlatıcı jel', en: 'Skin-renewing & brightening gel' },
      title: { tr: 'Yüz, boyun, dekolte ve eller için yenileyici kolajen jel', en: 'A renewing collagen gel for the face, neck, décolleté and hands' },
      intro: { tr: 'Neotiva Rh Collagen; yüz, boyun, dekolte ve el cildini canlandırarak daha genç ve parlak bir görünüm sağlar, skar ve çatlak görünümünü azaltmaya yardımcı olur. Hafif bir lifting etkisiyle yüz konturlarını belirginleştirir; ince çizgi ve kırışıklıkları azaltarak cilde daha genç bir görünüm verir.', en: 'Neotiva Rh Collagen revitalises the skin of the face, neck, décolleté and hands for a younger, more radiant look, and helps reduce the appearance of scars and stretch marks. With a subtle lifting effect it defines facial contours and softens fine lines and wrinkles for a more youthful appearance.' },
      benefits: { tr: ['Cilt yenileme & aydınlatma', 'Hafif lifting & kontur', 'Skar ve çatlak görünümünde azalma'], en: ['Skin renewal & brightening', 'Subtle lifting & contour', 'Reduced appearance of scars and stretch marks'] },
      actives: [
        { n: { tr: 'Rh Kolajen', en: 'Rh Collagen' }, t: { tr: 'Rekombinant hümanize kolajen, doğal insan kolajenini taklit eder ve cildi yeniler.', en: 'Recombinant humanised collagen mimics native human collagen and renews the skin.' } },
        { n: { tr: 'Süksinik Asit', en: 'Succinic Acid' }, t: { tr: 'Akne oluşumunu azaltmaya, tahriş olmuş cildi yatıştırmaya ve genel cilt dokusunu iyileştirmeye yardımcı olur.', en: 'Helps reduce breakouts, soothe irritated skin and improve overall texture.' } },
        { n: { tr: 'Polinükleotid', en: 'Polynucleotides' }, t: { tr: 'Medikal düzey PN, fibroblast büyümesini destekleyerek yara iyileşmesini ve kolajen sentezini stimüle eder.', en: 'Medical-grade PN supports fibroblast growth, stimulating wound healing and collagen synthesis.' } },
        { n: { tr: 'Hyalüronik Asit', en: 'Hyaluronic Acid' }, t: { tr: 'Medikal düzey HA kırışıklık ve ince çizgi görünümünü azaltır, elastikiyeti artırır ve yara iyileşmesini destekler.', en: 'Medical-grade HA reduces the appearance of wrinkles and fine lines, improves elasticity and supports healing.' } }
      ],
      areas: { tr: ['Yüz', 'Boyun', 'Dekolte', 'Eller'], en: ['Face', 'Neck', 'Décolleté', 'Hands'] },
      protocol: {
        steps: [
          { k: { tr: 'Seans 1', en: 'Session 1' }, v: { tr: 'Başlangıç', en: 'Start' } },
          { k: { tr: 'Seans 2', en: 'Session 2' }, v: { tr: '1 ay sonra', en: 'After 1 month' } },
          { k: { tr: 'Booster', en: 'Booster' }, v: { tr: '4 ay sonra', en: 'After 4 months' } }
        ],
        note: { tr: 'Mezoterapi yoluyla, bir ay arayla iki seans uygulanır. Sonuçlar yaş ve yaşam tarzına bağlı olarak genellikle 6–12 ay kalıcılık gösterir. En iyi sonuç için 4 ay sonra bir hatırlatma seansı önerilir.', en: 'Applied by mesotherapy in two sessions one month apart. Results typically last 6–12 months depending on age and lifestyle. A booster session after 4 months is recommended for best results.' }
      },
      claim: { tr: 'Sonuçlar, yaş ve yaşam tarzına bağlı olarak 6–12 ay kalıcılık gösterir.', en: 'Results typically last 6 to 12 months, depending on age and lifestyle.' },
      specs: [
        [{ tr: 'Form', en: 'Form' }, { tr: 'Cilt yenileyici & aydınlatıcı jel', en: 'Skin-renewing & brightening gel' }],
        [{ tr: 'Uygulama', en: 'Application' }, { tr: 'Mezoterapi', en: 'Mesotherapy' }],
        [{ tr: 'Ana içerikler', en: 'Key ingredients' }, { tr: 'Rh Kolajen, Süksinik Asit, Polinükleotid, Hyalüronik Asit', en: 'Rh Collagen, Succinic Acid, Polynucleotides, Hyaluronic Acid' }],
        [{ tr: 'Kalıcılık', en: 'Duration' }, { tr: '6–12 ay', en: '6–12 months' }],
        [{ tr: 'Üretici', en: 'Manufacturer' }, 'Inesen Bio Co., Ltd. · Made in Korea']
      ]
    },

    /* ───────────── MESO LINE ───────────── */
    {
      slug: 'eye-glow', line: 'meso', name: 'Neotiva Eye Glow', short: 'Eye Glow', no: '01',
      acc: '#E8DDBA', deep: '#77622F', tint: '#F6F1E3', onAcc: 'dark',
      bg: 'assets/products/eye-glow-bg.webp', pack: 'assets/products/eye-glow-pack.webp', box: 'assets/products/eye-glow-box.webp', vial: 'assets/products/eye-glow-vial.webp',
      complex: { tr: 'Periorbital ışıltı kompleksi', en: 'Periorbital radiance complex' },
      title: { tr: 'Göz çevresi ve yüz için aydınlatıcı & canlandırıcı formül', en: 'A brightening & revitalising formula for the eye area and face' },
      intro: { tr: 'Koyu halkaları, şişliği ve ince çizgileri azaltmak için göz çevresine özel tasarlanmış ışıltı verici bir formül. Polinükleotitler, Niasinamid ve Askorbil Glikozit kombinasyonuyla bu hafif yapıdaki solüsyon, hassas periorbital bölgeyi yeniler ve güçlendirir.', en: 'A radiance formula designed specifically for the eye area to reduce dark circles, puffiness and fine lines. With polynucleotides, niacinamide and ascorbyl glucoside, this lightweight solution renews and strengthens the delicate periorbital area.' },
      benefits: { tr: ['Işıltı & antioksidan koruma', 'Güçlü cilt bariyeri & nem', 'Yaşlanma karşıtı etki & onarım'], en: ['Radiance & antioxidant protection', 'Stronger barrier & hydration', 'Anti-ageing & repair'] },
      actives: [
        { n: { tr: 'Polinükleotitler', en: 'Polynucleotides' }, dose: '0,5%', t: { tr: 'Hücresel yenilenmeyi stimüle eder, mikrodolaşımı güçlendirir ve cildi pürüzsüzleştirir.', en: 'Stimulates cellular renewal, strengthens microcirculation and smooths the skin.' } },
        { n: { tr: 'Niasinamid', en: 'Niacinamide' }, t: { tr: 'Koyu halkaları ve pigmentasyonu azaltır, bariyer fonksiyonunu destekler, inflamasyonu yatıştırır.', en: 'Reduces dark circles and pigmentation, supports barrier function and calms inflammation.' } },
        { n: { tr: 'Askorbil Glikozit', en: 'Ascorbyl Glucoside' }, t: { tr: 'Cildi aydınlatan, oksidatif strese karşı koruyan stabil bir C vitamini formu.', en: 'A stable form of vitamin C that brightens and protects against oxidative stress.' } }
      ],
      indications: { tr: ['Koyu halkalar ve şişlik', 'İnce çizgiler ve kaz ayakları', 'Yorgun ve mat göz altları', 'Kuruluk ve ton kaybı'], en: ['Dark circles and puffiness', 'Fine lines and crow’s feet', 'Tired, dull under-eyes', 'Dryness and loss of tone'] },
      areas: { tr: ['Göz altı bölgesi', 'Kaz ayakları', 'Göz kapağı kıvrımı (çok yüzeysel)', 'Tüm yüz, boyun ve eller (opsiyonel)'], en: ['Under-eye area', 'Crow’s feet', 'Eyelid crease (very superficial)', 'Full face, neck and hands (optional)'] },
      protocol: {
        steps: [
          { k: { tr: 'Başlangıç kürü', en: 'Initial course' }, v: { tr: '3–5 seans · 10–14 gün arayla', en: '3–5 sessions · 10–14 days apart' } },
          { k: { tr: 'İdame', en: 'Maintenance' }, v: { tr: 'Tek seans · 6–8 haftada bir', en: 'Single session · every 6–8 weeks' } }
        ]
      },
      aftercare: { tr: ['12 saat boyunca bölgeye dokunulmamalı, masaj yapılmamalıdır.', '24–48 saat makyaj, sauna ve yoğun egzersizden kaçınılmalıdır.', 'Yatıştırıcı veya ödem karşıtı kremler kullanılmalıdır.'], en: ['Do not touch or massage the area for 12 hours.', 'Avoid make-up, sauna and intense exercise for 24–48 hours.', 'Use soothing or anti-oedema creams as recommended.'] },
      claim: { tr: 'Hassas ciltler için güvenli, agresif olmayan yapısını korurken göz çevresinde daha pürüzsüz, eşit tonlu ve aydınlık bir görünüm.', en: 'Safe and non-aggressive for sensitive skin, while leaving the eye area visibly smoother, more even and brighter.' },
      specs: [
        [{ tr: 'Kutu içeriği', en: 'Contents' }, { tr: '5 ml × 5 flakon', en: '5 ml × 5 vials' }],
        [{ tr: 'Ana içerikler', en: 'Key ingredients' }, { tr: 'Polinükleotit (%0,5), Niasinamid, Askorbil Glikozit', en: 'Polynucleotides (0.5%), Niacinamide, Ascorbyl Glucoside' }],
        [{ tr: 'Etkiler', en: 'Effects' }, { tr: 'Işıltı, bariyer & nem, onarım', en: 'Radiance, barrier & hydration, repair' }],
        [{ tr: 'Üretici', en: 'Manufacturer' }, 'Inesen Bio Co., Ltd. · Made in Korea']
      ]
    },
    {
      slug: 'lift-face', line: 'meso', name: 'Neotiva Lift Face', short: 'Lift Face', no: '02',
      acc: '#A88FD0', deep: '#4E347F', tint: '#EFEAF7', onAcc: 'dark',
      scene: 'assets/products/lift-face-scene.webp', bg: 'assets/products/lift-face-bg.webp', pack: 'assets/products/lift-face-pack.webp', box: 'assets/products/lift-face-box.webp', vial: 'assets/products/lift-face-vial.webp',
      complex: { tr: 'Gelişmiş yaşlanma karşıtı kompleks', en: 'Advanced anti-ageing complex' },
      title: { tr: 'Yüz konturu ve elastikiyeti için sıkılaştırıcı & yenileyici formül', en: 'A firming & renewing formula for facial contour and elasticity' },
      intro: { tr: 'Cilt elastikiyetini artırmak, ince çizgileri azaltmak ve yüze konturlarını geri kazandırmak için geliştirilmiş yüksek performanslı bir mezoterapi formülü. Yaşlanma belirtileri, sıkılık kaybı veya yorgunluk görülen ciltler için idealdir.', en: 'A high-performance mesotherapy formula developed to improve elasticity, reduce fine lines and restore facial contour. Ideal for skin showing signs of ageing, loss of firmness or fatigue.' },
      benefits: { tr: ['Yaşlanma karşıtı etki', 'Kırışıklıklarda azalma', 'Cilt onarımı & kolajen üretimi'], en: ['Anti-ageing effect', 'Fewer wrinkles', 'Skin repair & collagen production'] },
      actives: [
        { n: { tr: 'Asetil Heksapeptit-8', en: 'Acetyl Hexapeptide-8' }, t: { tr: 'Mimik çizgilerini azaltan, dinamik kırışıklıkları yumuşatan kas gevşetici peptit.', en: 'A muscle-relaxing peptide that reduces expression lines and softens dynamic wrinkles.' } },
        { n: { tr: 'Rh Kolajen', en: 'Rh Collagen' }, t: { tr: 'Cilt yapısını destekler, sıkılığı ve nem tutma kapasitesini artırır.', en: 'Supports skin structure, improving firmness and moisture retention.' } },
        { n: { tr: 'Polinükleotid (PN)', en: 'Polynucleotides (PN)' }, t: { tr: 'Hücre yenilenmesini stimüle eder, cildi pürüzsüzleştirir, iyileşmeyi destekler.', en: 'Stimulates cell renewal, smooths the skin and supports healing.' } },
        { n: { tr: 'Adenozin', en: 'Adenosine' }, t: { tr: 'Kolajen üretimini artıran ve elastikiyeti geliştiren güçlü bir yaşlanma karşıtı ajan.', en: 'A powerful anti-ageing agent that boosts collagen and improves elasticity.' } }
      ],
      indications: { tr: ['Sarkmış cilt ve yüz gevşekliği', 'İnce çizgiler ve kırışıklıklar', 'Hacim ve ton kaybı', 'Mat veya yorgun görünüm'], en: ['Sagging skin and facial laxity', 'Fine lines and wrinkles', 'Loss of volume and tone', 'Dull or tired appearance'] },
      areas: { tr: ['Yanaklar', 'Göz çevresi (infraorbital enjeksiyondan kaçınılmalı)', 'Çene hattı', 'Nazolabial oluklar', 'Alın ve şakaklar (yüzeysel teknik)', 'Boyun ve eller'], en: ['Cheeks', 'Eye area (avoid direct infraorbital injection)', 'Jawline', 'Nasolabial folds', 'Forehead and temples (superficial technique)', 'Neck and hands'] },
      protocol: {
        steps: [
          { k: { tr: 'Başlangıç kürü', en: 'Initial course' }, v: { tr: '4–6 seans · 7–14 gün arayla', en: '4–6 sessions · 7–14 days apart' } },
          { k: { tr: 'İdame', en: 'Maintenance' }, v: { tr: 'Gerektikçe tek seans · 4–6 haftada bir', en: 'Single session as needed · every 4–6 weeks' } }
        ]
      },
      aftercare: { tr: ['24–48 saat makyaj, güneş, sauna ve yoğun aktiviteden kaçınılmalıdır.', 'Yatıştırıcı/iyileştirici krem kullanılmalıdır.', 'Hastalar hafif ödem, kızarıklık ve morarma olasılığı hakkında bilgilendirilmelidir.'], en: ['Avoid make-up, sun, sauna and intense activity for 24–48 hours.', 'Use a soothing/healing cream as recommended.', 'Inform patients about possible mild oedema, redness and bruising.'] },
      claim: { tr: 'Doğal yüz ifadelerini değiştirmeden gözle görülür lifting etkisi, sıkılaşma ve daha genç bir görünüm.', en: 'A visible lifting effect, firmer skin and a younger look — without changing natural facial expression.' },
      specs: [
        [{ tr: 'Kutu içeriği', en: 'Contents' }, { tr: '5 ml × 5 flakon', en: '5 ml × 5 vials' }],
        [{ tr: 'Ana içerikler', en: 'Key ingredients' }, { tr: 'Asetil Heksapeptit-8, Rh Kolajen, Polinükleotit, Adenozin', en: 'Acetyl Hexapeptide-8, Rh Collagen, Polynucleotides, Adenosine' }],
        [{ tr: 'Etkiler', en: 'Effects' }, { tr: 'Yaşlanma karşıtı, kırışıklıkta azalma, kolajen üretimi', en: 'Anti-ageing, wrinkle reduction, collagen production' }],
        [{ tr: 'Üretici', en: 'Manufacturer' }, 'Inesen Bio Co., Ltd. · Made in Korea']
      ]
    },
    {
      slug: 'glow-face', line: 'meso', name: 'Neotiva Glow Face', short: 'Glow Face', no: '03',
      acc: '#EBA3B4', deep: '#963A55', tint: '#F9EAEE', onAcc: 'dark',
      scene: 'assets/products/glow-face-scene.webp', bg: 'assets/products/glow-face-bg.webp', pack: 'assets/products/glow-face-pack.webp', box: 'assets/products/glow-face-box.webp', vial: 'assets/products/glow-face-vial.webp',
      complex: { tr: 'Leke karşıtı ve ışıltı veren kompleks', en: 'Anti-pigment radiance complex' },
      title: { tr: 'Aydınlık ve eşit tonlu cilt için aydınlatıcı & nemlendirici formül', en: 'A brightening & hydrating formula for luminous, even-toned skin' },
      intro: { tr: 'Cildi derinlemesine nemlendirmek, berraklığı artırmak ve pigmentasyonu azaltmak için tasarlanmış gelişmiş bir cilt canlandırıcı mezoterapi solüsyonu. Mat, ton eşitsizliği olan veya fotohasarlı ciltler için idealdir.', en: 'An advanced revitalising mesotherapy solution designed to deeply hydrate, improve clarity and reduce pigmentation. Ideal for dull, uneven or photo-damaged skin.' },
      benefits: { tr: ['Nemlendirme & bariyer desteği', 'Aydınlatma & pigmentasyon kontrolü', 'Hücresel yenilenme & yaşlanma karşıtı etki'], en: ['Hydration & barrier support', 'Brightening & pigment control', 'Cellular renewal & anti-ageing'] },
      actives: [
        { n: { tr: 'PDRN', en: 'PDRN' }, t: { tr: 'Cilt yenilenmesini stimüle eder, pürüzsüzleştirir ve iyileşmeyi hızlandırır.', en: 'Stimulates renewal, smooths the skin and speeds up healing.' } },
        { n: { tr: 'Hyalüronik Asit', en: 'Hyaluronic Acid' }, t: { tr: 'Derinlemesine nemlendirir; pürüzsüz ve dolgun bir görünüm sağlar.', en: 'Hydrates deeply for a smoother, plumper look.' } },
        { n: { tr: 'Niasinamid', en: 'Niacinamide' }, t: { tr: 'Cildi aydınlatır, kızarıklığı azaltır ve bariyeri güçlendirir.', en: 'Brightens, reduces redness and strengthens the barrier.' } },
        { n: { tr: 'Glutatyon', en: 'Glutathione' }, t: { tr: 'Detoksifiye eden ve pigmentasyonun azalmasına yardımcı olan güçlü antioksidan.', en: 'A powerful detoxifying antioxidant that helps reduce pigmentation.' } },
        { n: { tr: 'Peptitler', en: 'Peptides' }, t: { tr: 'sh-Oligopeptit-5, sh-Oktapeptit-4, sh-Dekapeptit-7, Nikotinoil Tripeptit-1, Kaffeoil sh-Dekapeptit-9 — kolajeni ve sıkılığı destekler.', en: 'sh-Oligopeptide-5, sh-Octapeptide-4, sh-Decapeptide-7, Nicotinoyl Tripeptide-1, Caffeoyl sh-Decapeptide-9 — support collagen and firmness.' } },
        { n: { tr: 'Traneksamik Asit', en: 'Tranexamic Acid' }, t: { tr: 'Melanin üretimini azaltarak dirençli hiperpigmentasyona etkili şekilde müdahale eder.', en: 'Reduces melanin production to target stubborn hyperpigmentation.' } }
      ],
      indications: { tr: ['Ton eşitsizliği ve pigmentasyon', 'Susuz, mat veya yorgun cilt', 'İnce çizgiler ve elastikiyet kaybı', 'Akne sonrası renk değişiklikleri ve fotohasar'], en: ['Uneven tone and pigmentation', 'Dehydrated, dull or tired skin', 'Fine lines and loss of elasticity', 'Post-acne discolouration and photodamage'] },
      areas: { tr: ['Yüz (yanaklar, alın, perioral bölge)', 'Boyun ve dekolte (opsiyonel)', 'Eller'], en: ['Face (cheeks, forehead, perioral area)', 'Neck and décolleté (optional)', 'Hands'] },
      protocol: {
        steps: [
          { k: { tr: 'Başlangıç kürü', en: 'Initial course' }, v: { tr: '4–6 seans · 10–14 gün arayla', en: '4–6 sessions · 10–14 days apart' } },
          { k: { tr: 'İdame', en: 'Maintenance' }, v: { tr: 'Tek seans · 4–6 haftada bir', en: 'Single session · every 4–6 weeks' } }
        ]
      },
      aftercare: { tr: ['24–48 saat makyaj ve güneşten kaçınılmalıdır.', 'Gerektiğinde iyileştirici veya yatıştırıcı krem uygulanmalıdır.', 'Hafif eritem, şişlik veya noktasal morarma görülebilir.'], en: ['Avoid make-up and sun for 24–48 hours.', 'Apply a healing or soothing cream as needed.', 'Mild erythema, swelling or pinpoint bruising may occur.'] },
      claim: { tr: 'Yalnızca birkaç seans sonrasında gözle görülür parlaklık, eşit ton ve daha pürüzsüz bir cilt dokusu.', en: 'Visible radiance, a more even tone and smoother texture after only a few sessions.' },
      specs: [
        [{ tr: 'Kutu içeriği', en: 'Contents' }, { tr: '5 ml × 5 flakon', en: '5 ml × 5 vials' }],
        [{ tr: 'Ana içerikler', en: 'Key ingredients' }, { tr: 'PDRN, Hyalüronik Asit, Niasinamid, Glutatyon, Peptitler, Traneksamik Asit', en: 'PDRN, Hyaluronic Acid, Niacinamide, Glutathione, Peptides, Tranexamic Acid' }],
        [{ tr: 'Etkiler', en: 'Effects' }, { tr: 'Nem & bariyer, aydınlatma, hücresel yenilenme', en: 'Hydration & barrier, brightening, cellular renewal' }],
        [{ tr: 'Üretici', en: 'Manufacturer' }, 'Inesen Bio Co., Ltd. · Made in Korea']
      ]
    },
    {
      slug: 'dmae-max', line: 'meso', name: 'Neotiva DMAE Max', short: 'DMAE Max', no: '04',
      acc: '#8FD0DA', deep: '#256F7B', tint: '#E7F4F6', onAcc: 'dark',
      scene: 'assets/products/dmae-max-scene.webp', bg: 'assets/products/dmae-max-bg.webp', pack: 'assets/products/dmae-max-pack.webp', box: 'assets/products/dmae-max-box.webp',
      complex: { tr: 'Sıkılaştırıcı & lifting kompleksi', en: 'Firming & lifting complex' },
      title: { tr: 'Yorgun ve olgun ciltler için lifting & antioksidan formül', en: 'A lifting & antioxidant formula for tired, mature skin' },
      intro: { tr: 'Yaşlanmış veya yorgun cildi sıkılaştırmak, toparlamak ve yeniden canlandırmak için tasarlanmış bir mezoterapi solüsyonu. Elastikiyet kaybı, sarkma veya matlık görülen ciltler için idealdir; hızlı sıkılaşma ve uzun vadeli hücresel yenilenme sağlar.', en: 'A mesotherapy solution designed to firm, tone and revitalise aged or tired skin. Ideal for loss of elasticity, sagging or dullness — delivering rapid firming and long-term cellular renewal.' },
      benefits: { tr: ['Sıkılaştırma & lifting', 'Yenileyici & yaşlanma karşıtı etki', 'Nemlendirme & dolgunlaştırma', 'Kolajen üretimi & onarım'], en: ['Firming & lifting', 'Renewing & anti-ageing', 'Hydration & plumping', 'Collagen production & repair'] },
      actives: [
        { n: { tr: 'DMAE', en: 'DMAE' }, dose: '3%', t: { tr: 'Dimetilaminoetanol; gözle görülür lifting etkisi sağlar, sıkılığı artırır ve sarkmayla mücadele eder.', en: 'Dimethylaminoethanol; gives a visible lifting effect, improves firmness and fights sagging.' } },
        { n: { tr: 'sh-Polipeptit-47', en: 'sh-Polypeptide-47' }, t: { tr: 'Kolajen ve elastin sentezini stimüle eder, yenilenme döngüsünü destekler.', en: 'Stimulates collagen and elastin synthesis and supports the renewal cycle.' } }, // CONFIRM — brochure detail page says “-7”, cover & table say “-47”
        { n: { tr: 'sh-Polipeptit-123', en: 'sh-Polypeptide-123' }, t: { tr: 'Fibroblastları stimüle ederek kolajen ve elastin üretimini destekler.', en: 'Stimulates fibroblasts to support collagen and elastin production.' } },
        { n: { tr: 'Hyalüronik Asit', en: 'Hyaluronic Acid' }, dose: '1,5%', t: { tr: 'Elastikiyet ve yumuşaklık için derin nemlendirme ve pürüzsüzleştirme.', en: 'Deep hydration and smoothing for elasticity and softness.' } }
      ],
      indications: { tr: ['Cilt gevşekliği ve erken dönem sarkma', 'Mat, yorgun görünüm', 'İnce çizgiler ve ton kaybı', '30 yaş üzeri önleyici bakım'], en: ['Laxity and early sagging', 'Dull, tired appearance', 'Fine lines and loss of tone', 'Preventive care for patients over 30'] },
      areas: { tr: ['Çene hattı ve yanaklar', 'Alt yüz bölgesi', 'Alın', 'Boyun ve dekolte (opsiyonel)'], en: ['Jawline and cheeks', 'Lower face', 'Forehead', 'Neck and décolleté (optional)'] },
      protocol: {
        steps: [
          { k: { tr: 'Başlangıç kürü', en: 'Initial course' }, v: { tr: '4 seans · 10–14 gün arayla', en: '4 sessions · 10–14 days apart' } },
          { k: { tr: 'İdame', en: 'Maintenance' }, v: { tr: 'Tek seans · 6–8 haftada bir', en: 'Single session · every 6–8 weeks' } }
        ]
      },
      aftercare: { tr: ['24 saat aktif yüz masajı ve makyajdan kaçınılmalıdır.', '48 saat doğrudan güneş, buhar banyosu ve saunadan kaçınılmalıdır.', 'İşlem sonrası antioksidan ve yatıştırıcı kremler kullanılmalıdır.'], en: ['Avoid active facial massage and make-up for 24 hours.', 'Avoid direct sun, steam rooms and sauna for 48 hours.', 'Use antioxidant and soothing creams after treatment.'] },
      claim: { tr: 'Doğal ifadeyi değiştirmeden yüz konturlarını yeniden belirginleştirir; daha sıkı ve yenilenmiş bir görünüm.', en: 'Redefines facial contours without altering natural expression, for a visibly firmer, renewed look.' },
      specs: [
        [{ tr: 'Kutu içeriği', en: 'Contents' }, { tr: '5 ml × 5 flakon', en: '5 ml × 5 vials' }],
        [{ tr: 'Ana içerikler', en: 'Key ingredients' }, { tr: 'DMAE (%3), sh-Polipeptit-47, sh-Polipeptit-123, Hyalüronik Asit (%1,5)', en: 'DMAE (3%), sh-Polypeptide-47, sh-Polypeptide-123, Hyaluronic Acid (1.5%)' }],
        [{ tr: 'Etkiler', en: 'Effects' }, { tr: 'Sıkılaştırma, lifting, nem, kolajen üretimi', en: 'Firming, lifting, hydration, collagen production' }],
        [{ tr: 'Üretici', en: 'Manufacturer' }, 'Inesen Bio Co., Ltd. · Made in Korea']
      ]
    },
    {
      slug: 'nad-pro', line: 'meso', name: 'Neotiva NAD+ Pro', short: 'NAD+ Pro', no: '05',
      acc: '#D2671F', deep: '#8A3A0C', tint: '#F7EADF', onAcc: 'light',
      scene: 'assets/products/nad-pro-scene.webp', bg: 'assets/products/nad-pro-bg.webp', pack: 'assets/products/nad-pro-pack.webp', box: 'assets/products/nad-pro-duo.webp',
      complex: { tr: 'Hücresel enerji artırıcı kompleks', en: 'Cellular energy complex' },
      title: { tr: 'Ciltte derinlemesine canlanma için hücre enerjisini artıran & onarıcı formül', en: 'An energising & repairing formula for deep skin revitalisation' },
      intro: { tr: 'Cilt hücrelerinin enerji düzeyini artırmak, metabolik aktiviteyi yeniden canlandırmak ve ton, doku ve dayanıklılığı iyileştirmek için tasarlanmış ileri teknoloji bir mezoterapi solüsyonu. Yoğun canlandırmaya ihtiyaç duyan yorgun, yaşlanmış ciltler için idealdir.', en: 'An advanced mesotherapy solution designed to raise skin-cell energy, reactivate metabolic activity and improve tone, texture and resilience. Ideal for tired, aged skin in need of intensive revitalisation.' },
      benefits: { tr: ['Hücresel enerji & metabolizma', 'Ton, doku ve elastikiyet', 'Antioksidan & yaşlanma karşıtı koruma'], en: ['Cellular energy & metabolism', 'Tone, texture & elasticity', 'Antioxidant & anti-ageing protection'] },
      actives: [
        { n: { tr: 'NAD⁺', en: 'NAD⁺' }, t: { tr: 'Nikotinamid Adenin Dinükleotid; ATP üretimi için temel koenzim — DNA onarımını destekler, cilt canlılığını artırır.', en: 'Nicotinamide adenine dinucleotide; an essential coenzyme for ATP — supports DNA repair and boosts vitality.' } },
        { n: { tr: 'Polinükleotitler (PN)', en: 'Polynucleotides (PN)' }, t: { tr: 'Yenilenmeyi destekler, mikrodolaşımı iyileştirir, fibroblast aktivitesini stimüle eder.', en: 'Supports renewal, improves microcirculation and stimulates fibroblasts.' } },
        { n: { tr: 'Traneksamik Asit', en: 'Tranexamic Acid' }, t: { tr: 'Pigmentasyonu azaltır, cildi aydınlatır ve tonu eşitler.', en: 'Reduces pigmentation, brightens and evens tone.' } },
        { n: { tr: 'Glutatyon', en: 'Glutathione' }, t: { tr: 'Hücreleri detoksifiye eden, oksidatif strese karşı koruyan antioksidan.', en: 'An antioxidant that detoxifies cells and protects against oxidative stress.' } },
        { n: { tr: 'Peptitler & Vitaminler', en: 'Peptides & Vitamins' }, t: { tr: 'Elastikiyeti ve nemi artırır, onarımı destekler.', en: 'Improve elasticity and hydration, and support repair.' } }
      ],
      indications: { tr: ['Kronik yorgun veya mat cilt', 'Ton ve elastikiyet kaybı', 'Postinflamatuar renk değişiklikleri', 'Oksidatif strese maruz kalmış cilt', '30 yaş üzeri önleyici/onarıcı bakım'], en: ['Chronically tired or dull skin', 'Loss of tone and elasticity', 'Post-inflammatory discolouration', 'Skin exposed to oxidative stress', 'Preventive/reparative care over 30'] },
      areas: { tr: ['Tam yüz gençleştirme', 'Boyun ve dekolte', 'Göz ve ağız çevresi (dikkatli uygulama)'], en: ['Full-face rejuvenation', 'Neck and décolleté', 'Eye and mouth area (with care)'] },
      protocol: {
        steps: [
          { k: { tr: 'Başlangıç kürü', en: 'Initial course' }, v: { tr: '4–6 seans · 10–14 gün arayla', en: '4–6 sessions · 10–14 days apart' } },
          { k: { tr: 'İdame', en: 'Maintenance' }, v: { tr: 'Tek seans · 6–8 haftada bir', en: 'Single session · every 6–8 weeks' } }
        ]
      },
      aftercare: { tr: ['24–48 saat doğrudan güneş, makyaj ve saunadan kaçınılmalıdır.', 'Antioksidan içerikli ve hafif bakım ürünleri kullanılmalıdır.', 'Hafif kızarıklık veya şişlik görülebilir.'], en: ['Avoid direct sun, make-up and sauna for 24–48 hours.', 'Use antioxidant-rich, lightweight aftercare.', 'Mild redness or swelling may occur.'] },
      claim: { tr: 'Cildi içeriden canlandırır; hücresel enerji mekanizmalarını yeniden aktive ederek ton, doku ve ışıltıda gözle görülür iyileşme.', en: 'Revitalises from within, reactivating cellular energy for visible improvement in tone, texture and glow.' },
      specs: [
        [{ tr: 'Kutu içeriği', en: 'Contents' }, { tr: '5 ml × 5 flakon', en: '5 ml × 5 vials' }],
        [{ tr: 'Ana içerikler', en: 'Key ingredients' }, { tr: 'NAD+, Polinükleotit, Traneksamik Asit, Glutatyon, Peptitler ve Vitaminler', en: 'NAD+, Polynucleotides, Tranexamic Acid, Glutathione, Peptides & Vitamins' }],
        [{ tr: 'Etkiler', en: 'Effects' }, { tr: 'Hücresel onarım, aydınlatma, antioksidan koruma', en: 'Cellular repair, brightening, antioxidant protection' }],
        [{ tr: 'Üretici', en: 'Manufacturer' }, 'Inesen Bio Co., Ltd. · Made in Korea']
      ]
    },
    {
      slug: 'hair-growth', line: 'meso', name: 'Neotiva Hair Growth', short: 'Hair Growth', no: '06',
      acc: '#21418F', deep: '#142A66', tint: '#E6EAF4', onAcc: 'light',
      scene: 'assets/products/hair-growth-scene.webp', bg: 'assets/products/hair-growth-bg.webp', pack: 'assets/products/hair-growth-pack.webp', box: 'assets/products/hair-growth-box.webp', vial: 'assets/products/hair-growth-vial.webp',
      complex: { tr: 'Folikül yenileyici & saç onarım solüsyonu', en: 'Follicle-renewing & hair repair solution' },
      title: { tr: 'Saçlı deri ve saç folikülleri için canlandırıcı & güçlendirici formül', en: 'A revitalising & strengthening formula for scalp and follicles' },
      intro: { tr: 'Saç foliküllerini uyarmak, saçlı deri sağlığını iyileştirmek ve daha kalın, güçlü saçları desteklemek için tasarlanmış gelişmiş bir mezoterapi solüsyonu. Saç incelmesi, zayıflamış foliküller veya stres, yaşlanma ya da hormonal değişimlere bağlı dökülme yaşayan hastalar için idealdir.', en: 'An advanced mesotherapy solution designed to stimulate follicles, improve scalp health and support thicker, stronger hair. Ideal for thinning hair, weakened follicles or hair loss linked to stress, ageing or hormonal change.' },
      benefits: { tr: ['Folikül yenilenmesi & saç büyümesi', 'Saç güçlendirme & keratin üretimi', 'Büyüme stimülasyonu & folikül onarımı'], en: ['Follicle renewal & hair growth', 'Strengthening & keratin production', 'Growth stimulation & follicle repair'] },
      actives: [
        { n: { tr: 'Eksozomlar', en: 'Exosomes' }, t: { tr: 'Yenilenme sinyallerini taşıyarak dormant folikülleri aktive eder, hücresel onarımı stimüle eder.', en: 'Carry renewal signals that activate dormant follicles and stimulate cellular repair.' } },
        { n: { tr: 'Biotin', en: 'Biotin' }, t: { tr: 'Keratin yapısını güçlendirir, sağlıklı büyümeyi destekler, dökülmeyi azaltmaya yardımcı olur.', en: 'Strengthens keratin, supports healthy growth and helps reduce shedding.' } },
        { n: { tr: 'Kök Hücre Kaynaklı Kompleks', en: 'Stem-Cell Conditioned Media' }, t: { tr: 'Büyüme faktörleri ve sitokinler açısından zengin; folikül yenilenmesini ve saçlı deri mikro çevresini destekler.', en: 'Rich in growth factors and cytokines; supports follicle renewal and the scalp micro-environment.' } },
        { n: { tr: 'Dekspantenol', en: 'Dexpanthenol' }, t: { tr: 'Provitamin B5; saçlı deriyi nemlendirir, inflamasyonu azaltır, kökleri besler.', en: 'Provitamin B5; hydrates the scalp, reduces inflammation and nourishes roots.' } },
        { n: { tr: 'Peptitler', en: 'Peptides' }, t: { tr: 'Ekstraselüler matriksi uyarır; folikül gücünü ve tel kalınlığını artırır.', en: 'Stimulate the extracellular matrix, improving follicle strength and shaft thickness.' } }
      ],
      indications: { tr: ['Saç incelmesi', 'Saç dökülmesi', 'Zayıflamış foliküller', 'Saçlı deri yorgunluğu'], en: ['Thinning hair', 'Hair loss', 'Weakened follicles', 'Scalp fatigue'] },
      areas: { tr: ['Ön saç çizgisi', 'Temporal bölgeler', 'Vertex / tepe bölgesi', 'Ciddi seyrelme görülen bölgeler'], en: ['Frontal hairline', 'Temporal areas', 'Vertex / crown', 'Areas of significant thinning'] },
      protocol: {
        steps: [
          { k: { tr: 'Başlangıç kürü', en: 'Initial course' }, v: { tr: '4–6 seans · 7–14 gün arayla', en: '4–6 sessions · 7–14 days apart' } },
          { k: { tr: 'İdame', en: 'Maintenance' }, v: { tr: 'Yanıta göre tek seans · 4–8 haftada bir', en: 'Single session by response · every 4–8 weeks' } }
        ],
        note: { tr: 'MTS ile uygulamada haftada 2 kez önerilir; aşırı yuvarlama veya bastırma yapılmamalıdır.', en: 'With MTS, twice weekly is recommended; avoid excessive rolling or pressure.' }
      },
      aftercare: { tr: ['6–12 saat saçlı deri yıkanmamalıdır.', '48 saat sauna, aşırı terleme ve diğer saç uygulamalarından kaçınılmalıdır.', 'Hafif ve tahriş etmeyen saçlı deri ürünleri kullanılmalıdır.'], en: ['Do not wash the scalp for 6–12 hours.', 'Avoid sauna, heavy sweating and other hair treatments for 48 hours.', 'Use gentle, non-irritating scalp products.'] },
      claim: { tr: 'İnaktif folikülleri yeniden aktive eder, anajen fazı uzatır ve saçı kökten güçlendirir.', en: 'Reactivates dormant follicles, extends the anagen phase and strengthens hair from the root.' },
      specs: [
        [{ tr: 'Kutu içeriği', en: 'Contents' }, { tr: '5 ml × 5 flakon', en: '5 ml × 5 vials' }],
        [{ tr: 'Ana içerikler', en: 'Key ingredients' }, { tr: 'Eksozom, Biotin, Kök hücre koşullandırılmış medyası, Dekspantenol, Peptitler', en: 'Exosomes, Biotin, Stem-cell conditioned media, Dexpanthenol, Peptides' }],
        [{ tr: 'Etkiler', en: 'Effects' }, { tr: 'Folikül yenilenmesi, güçlendirme, büyüme stimülasyonu', en: 'Follicle renewal, strengthening, growth stimulation' }],
        [{ tr: 'Üretici', en: 'Manufacturer' }, 'Inesen Bio Co., Ltd. · Made in Korea']
      ]
    },

    /* ───────────── VITAL+ ───────────── */
    {
      slug: 'vital-plus', line: 'vital', name: 'Neotiva Vital+', short: 'Vital+',
      acc: '#0E7479', deep: '#0A4A4E', tint: '#E2F0EF', onAcc: 'light',
      scene: 'assets/products/vital-scene.webp', pack: 'assets/products/vital-pack.webp', portrait: 'assets/editorial/portrait-glass.webp',
      complex: { tr: 'Gelişmiş çoklu aktif dermal biyomühendislik', en: 'Advanced multi-active dermal bioengineering' },
      title: { tr: 'Altı aktif kompleksi bir araya getiren nemlendirici cilt güçlendirici', en: 'A hydrating skin booster uniting six active complexes' },
      intro: { tr: 'Neotiva Vital+; derin nemlendirme, hücresel yenilenme ve biyomimetik peptitleri bir araya getiren gelişmiş bir cilt güçlendiricidir. Sinerjik formülü dermis tabakasında etki göstererek cilt kalitesini ve elastikiyeti artırır, yorgunluk belirtilerini azaltır ve cilde sağlıklı, canlı ve ışıltılı bir görünüm kazandırır.', en: 'Neotiva Vital+ is an advanced skin booster that combines deep hydration, cellular renewal and biomimetic peptides. Its synergistic formula works in the dermis to improve skin quality and elasticity, reduce signs of fatigue and give the skin a healthy, vibrant glow.' },
      benefits: { tr: ['Derin nem & ECM desteği', 'Dermal yeniden yapılanma', 'Peptit bazlı kırışıklık bakımı'], en: ['Deep hydration & ECM support', 'Dermal remodelling', 'Peptide-based wrinkle care'] },
      complexes: [
        { t: { tr: 'Nemlendirme ve Hücre Dışı Matriks Desteği', en: 'Hydration & Extracellular Matrix Support' }, ing: ['Hyalüronik Asit', 'Trehaloz'], ingEn: ['Hyaluronic Acid', 'Trehalose'],
          d: { tr: 'Yüksek molekül ağırlıklı HA hacim ve viskoelastikiyet kazandırır; Trehaloz hücresel yapıları korur ve stres altında nem dengesini stabilize eder.', en: 'High-molecular-weight HA adds volume and viscoelasticity; trehalose protects cell structures and stabilises hydration under stress.' }, ref: 'Chmielewski R. et al. Int J Mol Sci. 2025;26(7):3217' },
        { t: { tr: 'Hücresel Yenilenme ve Dermal Yeniden Yapılanma', en: 'Cellular Renewal & Dermal Remodelling' }, ing: ['Polinükleotidler', 'Bakır Tripeptit-1'], ingEn: ['Polynucleotides', 'Copper Tripeptide-1'],
          d: { tr: 'Yabani somon kaynaklı farmasötik sınıf PN fibroblast proliferasyonunu destekler; Bakır Tripeptit-1 kolajen, elastin ve GAG sentezini artırır.', en: 'Pharmaceutical-grade PN from wild salmon supports fibroblast proliferation; copper tripeptide-1 boosts collagen, elastin and GAG synthesis.' }, ref: 'Cong R. et al. Nature Communications, 2025' },
        { t: { tr: 'Peptit Bazlı Yaşlanma Karşıtı Bakım', en: 'Peptide-Based Anti-Ageing Care' }, ing: ['Asetil Heksapeptit-8', 'Asetil Tetrapeptit-5'], ingEn: ['Acetyl Hexapeptide-8', 'Acetyl Tetrapeptide-5'],
          d: { tr: 'SNAP-25 modülasyonuyla mimik çizgilerinin görünümünü azaltır (botoks benzeri etki); mikrodolaşımı ve drenajı destekler.', en: 'Reduces the appearance of expression lines through SNAP-25 modulation (a botox-like effect) and supports microcirculation and drainage.' }, ref: 'Kang S. et al. J Soc Cosmet Sci Korea. 2023;49(4):365–373' },
        { t: { tr: 'Aydınlatıcı Etki ve Antioksidan Koruma', en: 'Brightening & Antioxidant Protection' }, ing: ['Niasinamid', 'Glutatyon'], ingEn: ['Niacinamide', 'Glutathione'],
          d: { tr: 'Niasinamid bariyeri güçlendirir ve pigmentasyonu düzenler; Glutatyon serbest radikalleri nötralize eder ve melanin sentezini baskılar.', en: 'Niacinamide strengthens the barrier and regulates pigmentation; glutathione neutralises free radicals and suppresses melanin synthesis.' }, ref: 'J Cosmet Dermatol 2021;20(6):1867–1874' },
        { t: { tr: 'Hücresel Koruma ve Metabolik Aktivasyon', en: 'Cellular Protection & Metabolic Activation' }, ing: ['Süksinik Asit', 'Trehaloz'], ingEn: ['Succinic Acid', 'Trehalose'],
          d: { tr: 'Süksinik Asit mitokondriyal aktiviteyi ve hücresel metabolizmayı destekler; Trehaloz hücreleri çevresel ve ozmotik strese karşı korur.', en: 'Succinic acid supports mitochondrial activity and cellular metabolism; trehalose protects cells from environmental and osmotic stress.' }, ref: 'Papurina T. et al. Biochem Biophys Rep. 2023' },
        { t: { tr: 'Mikrodolaşım ve Ödem Karşıtı Kompleks', en: 'Microcirculation & Anti-Oedema Complex' }, ing: ['Kafein', 'Escin', 'Asetil Tetrapeptit-5'], ingEn: ['Caffeine', 'Escin', 'Acetyl Tetrapeptide-5'],
          d: { tr: 'Kafein dolaşımı destekler ve sıvı retansiyonunu azaltır; Escin kılcal damar duvarlarını güçlendirir. Göz altı şişkinliğinde 15. günde gönüllülerin %70’inde iyileşme gözlenmiştir.', en: 'Caffeine supports circulation and reduces fluid retention; escin strengthens capillary walls. Under-eye puffiness improved in 70% of volunteers by day 15.' }, ref: 'Matriskin Laboratories, Technical Dossier, 2017' }
      ],
      areas: { tr: ['Yanaklar (nem + rejenerasyon)', 'Alın (ince çizgiler)', 'Nazolabial bölge', 'Boyun / dekolte (opsiyonel)', 'Eller'], en: ['Cheeks (hydration + regeneration)', 'Forehead (fine lines)', 'Nasolabial area', 'Neck / décolleté (optional)', 'Hands'] },
      protocol: {
        steps: [
          { k: { tr: 'Başlangıç', en: 'Initial' }, v: { tr: '3–4 işlem · 2–3 hafta arayla', en: '3–4 treatments · 2–3 weeks apart' } },
          { k: { tr: 'Koruyucu', en: 'Maintenance' }, v: { tr: 'Her 2–3 ayda bir işlem', en: 'One treatment every 2–3 months' } }
        ],
        note: { tr: 'Önde gelen bir Avrupalı hekim tarafından önerilen protokol.', en: 'Protocol recommended by a leading European physician.' }
      },
      results: [
        { k: { tr: '2–5 gün', en: '2–5 days' }, v: { tr: 'Nem kaynaklı ışıltılı görünüm', en: 'Hydration-driven glow' } },
        { k: { tr: '2–3 hafta', en: '2–3 weeks' }, v: { tr: 'Cilt kalitesinde iyileşme', en: 'Improved skin quality' } },
        { k: { tr: 'Kür sonu', en: 'After the course' }, v: { tr: 'Tam etki', en: 'Full effect' } }
      ],
      aftercare: { tr: ['Uygulama bölgesine dokunmayın, masaj yapmayın.', '12–24 saat makyaj yapmayın; sauna, sıcak banyo, yoğun egzersiz ve alkolden kaçının.', 'Nazik temizleyici ve HA, pantenol, seramid içeren nemlendirici kullanın.', 'İlk 48 saat retinoid, AHA/BHA, C vitamini ve eksfoliasyondan kaçının.'], en: ['Do not touch or massage the treated area.', 'No make-up for 12–24 hours; avoid sauna, hot baths, intense exercise and alcohol.', 'Use a gentle cleanser and a moisturiser with HA, panthenol and ceramides.', 'Avoid retinoids, AHA/BHA, vitamin C and exfoliation for the first 48 hours.'] },
      claim: { tr: 'Dermis tabakasında etki gösteren sinerjik formül; gözle görülür ve uzun süre kalıcı iyileşme.', en: 'A synergistic formula acting in the dermis, for visible, long-lasting improvement.' },
      specs: [
        [{ tr: 'Türü', en: 'Type' }, { tr: 'Nemlendirici cilt güçlendirici', en: 'Hydrating skin booster' }],
        [{ tr: 'Hacim', en: 'Volume' }, { tr: '2,5 mL önceden doldurulmuş enjektör', en: '2.5 mL prefilled syringe' }],
        [{ tr: 'Form', en: 'Form' }, { tr: 'Steril, şeffaf hidrojel', en: 'Sterile, transparent hydrogel' }],
        [{ tr: 'Ambalaj', en: 'Packaging' }, { tr: '3 enjektör / kutu', en: '3 syringes / box' }],
        [{ tr: 'İğne', en: 'Needle' }, { tr: 'Kutu içeriğine dahil değildir', en: 'Not included' }],
        [{ tr: 'Saklama', en: 'Storage' }, { tr: '2–25 °C, doğrudan güneş ışığından koruyunuz', en: '2–25 °C, away from direct sunlight' }],
        [{ tr: 'Raf ömrü', en: 'Shelf life' }, { tr: 'Üretimden itibaren 36 ay', en: '36 months from manufacture' }]
      ]
    }
  ]
};

/* Atelier direction — headline lockups (caps + <i>italic</i>, one array item per line) and chapter names. */
window.ESD.copy = {
  chapters: {
    tr: ['Kurum', 'Koleksiyon', 'Bilim', 'Buluşmalar', 'İletişim'],
    en: ['The House', 'Collection', 'Science', 'Encounters', 'Contact']
  },
  hero: {
    lock: { tr: ['Estederma', '<i>Medikal Estetik</i> Ürünleri'], en: ['Estederma', '<i>Medical Aesthetic</i> Products'] },
    sub: { tr: 'Rejenerasyonun zarif bilimi', en: 'The refined science of regeneration' }
  },
  intro: {
    lock: { tr: ['Kore biyoteknolojisi,', '<i>kliniğinizde.</i>'], en: ['Korean biotechnology,', '<i>in your clinic.</i>'] },
    stats: [
      { n: '08', t: { tr: 'Rejeneratif formül', en: 'Regenerative formulas' } },
      { n: '03', t: { tr: 'Ürün serisi', en: 'Product lines' } },
      { n: '81', t: { tr: 'İle güvenli gönderim', en: 'Provinces served' } },
      { n: '%100', t: { tr: 'Kliniklere özel', en: 'For clinics only' } }
    ]
  },
  lines: { lock: { tr: ['Üç seri,', '<i>tek bir felsefe</i>'], en: ['Three lines,', '<i>one philosophy</i>'] },
    body: { tr: 'Rekombinant kolajen jelden altı formüllü mezoterapi serisine ve önceden doldurulmuş cilt güçlendiriciye; her seri farklı bir klinik ihtiyaca yanıt verir.', en: 'From a recombinant collagen gel to a six-formula mesotherapy line and a prefilled skin booster — each line answers a different clinical need.' } },
  carousel: { lock: { tr: ['Premium', '<i>meso solution</i>'], en: ['Premium', '<i>meso solution</i>'] },
    body: { tr: 'Altı formül, tek protokol mantığı. Her biri 5 ml × 5 flakon.', en: 'Six formulas, one protocol logic. Each 5 ml × 5 vials.' } },
  collection: { tr: 'Sekiz formül, sekiz ipek.', en: 'Eight formulas, eight silks.' },
  science: { lock: { tr: ['Formüllerin', '<i>arkasındaki bilim</i>'], en: ['The science', '<i>behind the formulas</i>'] },
    body: { tr: 'Polinükleotidden NAD⁺’ya; Neotiva formülleri, yayımlanmış klinik çalışmalarla desteklenen yeni nesil aktiflerle geliştirilir.', en: 'From polynucleotides to NAD⁺ — Neotiva formulas are built on next-generation actives backed by published clinical research.' } },
  events: { lock: { tr: ['Sahada,', '<i>hekimlerle</i>'], en: ['In the field,', '<i>with physicians</i>'] } },
  partner: { lock: { tr: ['Kliniğiniz için', '<i>Neotiva</i>'], en: ['Neotiva for', '<i>your clinic</i>'] },
    perks: [
      { t: { tr: 'Doğrudan tedarik', en: 'Direct supply' }, d: { tr: 'Orijinal ürün, düzenli stok, Türkiye geneli hızlı gönderim.', en: 'Genuine products, steady stock, fast nationwide delivery.' } },
      { t: { tr: 'Hekim eğitimleri', en: 'Physician training' }, d: { tr: 'Uygulamalı eğitimler ve ürün protokolleri.', en: 'Hands-on training and product protocols.' } },
      { t: { tr: 'Teknik destek', en: 'Technical support' }, d: { tr: 'Formül, endikasyon ve uygulama sorularınıza hızlı yanıt.', en: 'Quick answers on formulas, indications and application.' } }
    ] },
  cta: { lock: { tr: ['Kliniğiniz için', '<i>Neotiva</i>'], en: ['Neotiva for', '<i>your clinic</i>'] } },
  about: { lock: { tr: ['Estederma kurumsal:', '<i>medikal estetik distribütörü</i>'], en: ['About Estederma:', '<i>medical aesthetics distributor</i>'] } },
  values: { lock: { tr: ['Çalışma', '<i>biçimimiz</i>'], en: ['How', '<i>we work</i>'] } },
  founder: { lock: { tr: ['Kurucu', '<i>mesajı</i>'], en: ['A word from', '<i>the founder</i>'] } },
  products: { lock: { tr: ['Neotiva', '<i>rejeneratif estetik ürünleri</i>'], en: ['Neotiva', '<i>regenerative aesthetic products</i>'] } },
  protocol: { lock: { tr: ['Üç fazlı', '<i>protokol</i>'], en: ['A three-phase', '<i>protocol</i>'] } },
  meso: { lock: { tr: ['Altı', '<i>formül</i>'], en: ['Six', '<i>formulas</i>'] } },
  eventsPage: { lock: { tr: ['Kongre', '<i>&amp; etkinlikler</i>'], en: ['Congresses', '<i>&amp; events</i>'] } },
  contact: { lock: { tr: ['Estederma', '<i>iletişim</i>'], en: ['Contact', '<i>Estederma</i>'] } },
  formula: { tr: 'Formül', en: 'The formula' }
};
