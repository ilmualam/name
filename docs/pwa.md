# Standalone baby names PWA

The baby names repository now contains its own PWA for `https://name.ilmualam.com/`. No runtime dependency on another repository is needed. The original [ilmualam/pwa repository](https://github.com/ilmualam/pwa) has now been reviewed and its IlmuAlam branding assets imported locally. See [the source merge record](pwa-source-merge.md).

- `manifest.webmanifest`: Malay app identity, standalone display, `/` start URL and scope, green theme, 192/512 PNG icons, a separate maskable icon, and shortcuts to search and combine names.
- `asset/pwa/client.js`: deferred root-worker registration, install button, browser-menu fallback instructions, offline notice, update notification and user-controlled activation. Initial installation does not reload the page. Only the tab accepting an update reloads itself; saved shortlist choices persist locally.
- `asset/pwa/sw.template.js`: worker source. `node tools/build.mjs` produces root `sw.js` with a content-derived release hash and explicit precache list. Do not edit the generated worker directly.
- `asset/pwa/icons/`: Original IlmuAlam 192/512 PNG app icons and Apple touch icon imported from the PWA repo, plus a padded maskable safe-zone variant derived from its 512 PNG. The valid source PNG favicon replaces the temporary crescent. The source MIT license is retained.
- `offline.html`: noindex fallback for an uncached navigation while offline. Online missing URLs retain real HTTP 404 responses.

## Offline behavior

After a successful first online visit and worker installation, the complete app and all 3,254 dataset entries are cached. Search, gender/letter/source/syllable/theme filters, pagination, shortlist and two-name combining work offline. Clipboard support still depends on browser permission. WhatsApp sharing and external websites need connectivity.

The worker serves cached app HTML and listed assets from a matching release, so an older worker does not mix newly deployed HTML with older cached JavaScript/data. `/`, `/index.html` and `/asset/index.html` map to the cached app document. Other navigations use the network, with an offline 503 fallback on failure. Unlisted assets, cross-origin requests, worker update checks and non-GET requests are not cached. Only caches starting with `ilmu-name-` are removed during activation; unrelated applications' caches are preserved.

Updates wait until the visitor accepts **Kemas kini**, or all tabs using the old release close. A release hash changes when app HTML, the worker template or a precached asset changes. The worker registers with `updateViaCache: 'none'`; the client checks for updates on a visible tab at most hourly. The manifest itself remains stable in identity, so updates do not create a separate installed app.

Offline storage is best effort: browsers may evict it, private browsing may restrict it, and a failed/unfinished initial installation cannot provide offline operation. Saved choices are browser-local and not synchronized between devices or origins. Installing this subdomain's PWA does not transfer an installation or local storage from another domain.

## Build and test

```sh
node tools/build.mjs
node tools/validate.mjs
python tools/preview.py
```

Use the preview at localhost rather than opening HTML through `file://`. Deployment needs HTTPS. The existing Pages workflow publishes the root manifest, worker, fallback, client and icons through `_site`; the template/test scripts are not deployed.

`tools/check-pwa.cjs` uses a disposable server/browser profile. Set `PUPPETEER_MODULE` to an installed `puppeteer-core` path and `CHROME_PATH` if Chrome is elsewhere, then run `node tools/check-pwa.cjs`.

The test checks browser manifest/installability, complete precache, no reload on first activation, offline search/save/combine, alternate page URL, offline fallback, online 404, POST bypass, waiting update followed by one user-approved reload, and preservation of unrelated caches. Offline navigation tests also disconnect the fixture transport because page-level CDP offline emulation can leave service-worker requests online.

## Production checks

After deployment, verify `/manifest.webmanifest` returns a manifest JSON MIME type and `/sw.js` returns JavaScript at the root; confirm worker scope `/`. Open once online, wait for installation, then test offline reload. Verify app installation on target Android/iOS/desktop browsers and update behavior with a subsequent release. Keep existing SEO, compression, live TTFB and field CWV checks in [seo-audit.md](seo-audit.md).

References: [MDN installability](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable), [MDN service workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers).
