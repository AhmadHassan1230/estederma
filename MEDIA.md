# Estederma: media & open items

## Hero video (Google Flow) — in place

`assets/video/hero.mp4` (the user's Flow export, "Silk satin rippling in breeze", 2nd version: 1920×1080, 10 s, 3.4 MB) loops muted in the hero panel. `assets/video/hero-poster.jpg` is its first frame, shown while it loads. The panel has the same inset and corner radius on all sides, with one rounded notch around the logo; the shape is `shape()` in `pages.js`. To swap the clip, replace the file or change `heroVideo` in `data.js`.

Prompts kept for alternates:

**Prompt B (silk) suits the Atelier direction best.**

**Prompt B (recommended): silk**
> Extreme slow-motion macro of ivory and champagne silk satin rippling gently in a soft breeze, warm diffused daylight, delicate golden highlights travelling along the folds, very shallow depth of field, calm and luxurious, high-end skincare campaign, no objects, no text, seamless 10 second loop.

**Prompt A: silk + vial**
> Ivory silk satin slowly folding around a single amber glass mesotherapy vial with a silver cap that floats in the centre, warm soft daylight, gentle reflections on glass, Cartier-style still-life elegance, pale cream palette, no text, no labels, seamless loop.

**Prompt C: product orbit**
> Slow orbit around an amber glass mesotherapy vial standing on a pale travertine plinth, soft window light, cream backdrop, droplets on glass, high-end Korean skincare campaign, shallow depth of field, no text, no labels, seamless loop.

## Sources

- Product images: extracted from the three Neotiva PDFs (Inesen Bio). The box cutouts are only about 150 px, so they are used small (as the pack on the Eye Glow composite). The large visuals are the brochure scenes.
- Event photos: the 4 posts on @estedermamedical (May 2026, Dec 2025, Jul 2025, Sep 2024).
- Logo: `assets/brand/*.png` are transparent masks cut from the black logo, recoloured in CSS (gold on dark, ink on light).

## To confirm with the client (search `CONFIRM` in data.js)

- Phone, WhatsApp, email: none are published on Instagram (orders go through DM). Each one appears on the site automatically once it is filled in.
- The form endpoint (e.g. Formspree). Until it is set, the form shows a success state but **sends nothing**.
- The founder's name and message. The message on the About page is a draft.
- Event names for Dec 2025 and Sep 2024: the titles were inferred from the photos.
- DMAE Max: the brochure says "sh-Polipeptit-7" on its detail page but "sh-Polipeptit-47" on the cover and in the table. The site uses 47.
- Clinical before/after images from the brochures were left out on purpose.
- KVKK privacy notice page: the footer link is a placeholder.
