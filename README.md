# Islamic Baby Names Generator

Malay-language name discovery tool for **https://name.ilmualam.com/**.

The maintained page is `asset/index.html`. The build synchronizes its inline application styles from `asset/css/baby-name.min.css` and writes a matching root `index.html`. Runtime is `asset/js/app.js`; data is `asset/data/names-full.json`. Legacy `baby-names.js` and `baby-namesv1.js` are retained as original files but are not loaded or deployed.

## Build and preview

Requires Node.js 22+ and Python 3 for the optional preview server. No npm packages are needed to build or validate.

```sh
node tools/build.mjs
node tools/validate.mjs
python tools/preview.py
```

Open http://127.0.0.1:8767/. The preview serves `_site`, uses gzip and 10-minute caching to approximate static CDN delivery, and returns real HTTP 404 responses. Its headers do not prove the production configuration.

Browser regression checks additionally require `puppeteer-core` and Chrome. Set `PUPPETEER_MODULE` to its installed module path if necessary, `CHROME_PATH` to your Chrome executable and optionally `TEST_URL` to the preview URL, then run `node tools/check-browser.cjs`.

## GitHub Pages deployment

The workflow builds and validates `_site` on pushes to `main`; it can also be triggered manually. In repository **Settings → Pages**, choose **GitHub Actions** as the publishing source and set the custom domain to `name.ilmualam.com`. A `CNAME` file alone does not configure the custom domain for an Actions deployment.

After adding the domain in GitHub, configure DNS: host `name`, type `CNAME`, target `ilmualam.github.io` (no `/name` path). Enable **Enforce HTTPS** once the certificate is available. These are deployment instructions; DNS and repository settings have not been changed by this local optimization.

Root `robots.txt`, `sitemap.xml` and `llms.txt` are included in the artifact. The sitemap lists the canonical homepage; fragments and the duplicate `/asset/index.html` are not separate sitemap pages. Keep the source page's canonical URL at the subdomain homepage.

See [the audit and remaining live checks](docs/seo-audit.md). Search indexing, rankings and field Core Web Vitals cannot be guaranteed by local Lighthouse results.

## Progressive web app

This repository includes a standalone PWA with `manifest.webmanifest`, a generated root `sw.js`, install/update UI and complete offline name data. Once the initial cache succeeds, search, filters, shortlist and combining names work offline. WhatsApp and external links require internet.

The build derives the worker cache version from the app and offline assets. Edit `asset/pwa/sw.template.js` for worker behavior, then rebuild. Existing cache releases wait for a user-approved update; unrelated origin caches are preserved. Read [PWA behavior and verification](docs/pwa.md).

To run the disposable installability/offline/update regression suite, set `PUPPETEER_MODULE` if needed and run `node tools/check-pwa.cjs`. No app is installed into your actual browser profile by this test.

Original branding was imported from [ilmualam/pwa](https://github.com/ilmualam/pwa) and the PWA functionality adapted to this subdomain. See [the integration record](docs/pwa-source-merge.md) for imported assets, worker changes and license attribution.
