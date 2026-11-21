# abc-anpi — adamnormand.com

Static rebuild of adamnormand.com (previously WordPress with the HT SmartScreen theme), for GitHub Pages. No build step, no framework.

## Files

| Path | Purpose |
|---|---|
| `index.html` | Home: full-screen photo slideshow with captions |
| `booking/index.html` | Redirect to Contact, so old booking links still work |
| `contact/index.html` | Contact Me: email, phone and a message form that opens a pre-filled email |
| `assets/site.css` | All styles |
| `assets/site.js` | Slide list (photo, title, place, date) and slideshow controls |
| `assets/img/` | Logo, contact photo and the 26 slide photos (original filenames) |
| `favicon.svg`, `404.html`, `.nojekyll` | Site plumbing |

## Editing slides

Open `assets/site.js` and edit the `SLIDES` list. Each line is
`['file.jpg', 'Title', 'City, Province', 'YYYY-MM-DD', 'optional longer text']`.
Put the photo in `assets/img/` with the same file name. Photos around 1200–1500 px wide, under 500 KB, work best.

## Publishing

1. Settings → Pages → Build and deployment → Deploy from a branch → `main` / root.
2. Check the site at `https://adamnormand.github.io/abc-anpi/`.
3. When ready to switch the domain: add a `CNAME` file containing `adamnormand.com`, set the custom domain in Settings → Pages, then change DNS:

```
@    A     185.199.108.153
@    A     185.199.109.153
@    A     185.199.110.153
@    A     185.199.111.153
@    AAAA  2606:50c0:8000::153
@    AAAA  2606:50c0:8001::153
@    AAAA  2606:50c0:8002::153
@    AAAA  2606:50c0:8003::153
www  CNAME adamnormand.github.io
```

Remove the old A/AAAA/CNAME records on `@` and `www` that point to the WordPress host. Leave MX, SPF/TXT, DKIM and SRV records untouched. Turn on Enforce HTTPS once the certificate is issued.

## What changed from the WordPress site

- Booking (Bookly) plugin removed: appointments are arranged by email or phone. `/booking/` redirects to Contact.
- Contact Form 7 replaced with a form that opens a pre-filled email to info@adamnormand.com. No server, no reCAPTCHA.
- Dropped: RSS feed link (no blog), Pinterest icon (it pointed to YouTube), Twitter timeline widget, search box.
- Fixed: envelope icon now a working `mailto:` link.
- Footer reads "Updated November 2026".
