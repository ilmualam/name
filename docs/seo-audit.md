# SEO, performance and accessibility audit

Audit date: **9 October 2026**, Asia/Kuala_Lumpur. Target: **https://name.ilmualam.com/**. Changes are local; no GitHub push, deployment or DNS change was performed.

## PWA follow-up — 9 October 2026

A standalone PWA is now included; details are in [pwa.md](pwa.md). The original [IlmuAlam PWA assets have been integrated](pwa-source-merge.md) locally; the tested root worker remains the single active worker. Chrome manifest/installability and offline/update/cache regression checks passed. A fresh local compressed mobile Lighthouse run with the PWA enabled scored **98 performance** and **100 accessibility, best practices, SEO and agentic browsing**. FCP and LCP were **1.1 s**, TBT **10 ms**, CLS **0**; no zero-score binary audit failures. These are local lab results; the earlier 99 performance result below predates the PWA. See [the PWA report](reports/pwa-summary.json).

## Implemented

- Consistent subdomain canonical, Open Graph URL, title, description, locale and structured data. Local 1200×630 social card and IlmuAlam PNG favicon replace missing and remote assets.
- Root homepage, `robots.txt`, canonical-only `sitemap.xml`, standard lowercase plural `llms.txt`, `CNAME`, `.nojekyll`, and a noindex HTTP-404 page.
- WebSite, WebPage, WebApplication and FAQPage schema with visible matching FAQ answers. Removed an unsupported 4.8/312 aggregate rating, incorrect favicon-as-screenshot and obsolete Blogger URLs. FAQ schema does not guarantee a Google rich result.
- Removed blocking Google Fonts and unused preconnects. System fonts, inline application CSS, deferred application script, and initialization after the first rendering opportunity reduce loading work. Offscreen name cards use content visibility to avoid unnecessary early layout.
- Name-combiner options are created on focus rather than thousands of options during initial loading and each gender switch; batched DOM insertion. Search remains debounced; results remain paginated at 20 cards.
- Main landmark, one H1, logical headings, skip link, native filter buttons, pressed states, labeled inputs, live result count, pagination names/current state, Arabic language/direction, keyboard focus, reduced-motion support, and improved contrast.
- Fixed the existing dropdown filter bug: inline change handlers referenced a private function. The filter function now has the required public entry point.
- Saved shortlist persists locally when storage is available; removal uses native buttons and safe DOM text. Generated card text is escaped. WhatsApp windows use noopener/noreferrer. Combined-name copy no longer claims success after a failed clipboard write.
- Twenty readable static name examples, Malay usage guide and factual FAQ support no-JavaScript browsing and agent access. Interactive features still need JavaScript.
- Build and validation scripts, scoped Pages artifact and an Actions workflow. Legacy alternate scripts remain in the repo but are excluded from the published artifact.

## Dataset limitations

The supplied JSON has **3,254 rows**, **3,176 distinct spellings** and a December 2025 dataset update label. Repeated spellings and transliteration variants remain intact. Counts were verified; individual translations, Arabic spellings, gender assignments and source labels were not religiously or linguistically verified.

The dataset has no per-entry verse or hadith citation. Claims that every name is sahih, directly Quranic or individually reviewed were removed from metadata, schema and introductory copy. The UI and `llms.txt` explain that source categories are dataset labels. Combined meanings concatenate strings and do not validate a new Arabic phrase. An editorial dataset review remains necessary before making stronger accuracy claims.

## Verification

Lighthouse 13.5.0, local Chrome, mobile simulated throttling and desktop preset. Local HTTP is treated as a trustworthy development context, not a production HTTPS check. See [reports/summary.json](reports/summary.json) for recorded values and environments.

| Category | Original mobile | Optimized mobile, compressed preview | Optimized desktop, uncompressed preview |
| --- | ---: | ---: | ---: |
| Performance | 84 | 99 | 99 |
| Accessibility | 87 | 100 | 100 |
| Best practices | 96 | 100 | 100 |
| SEO | 100 | 100 | 100 |
| Agentic browsing | 50 | 100 | 100 |

| Metric | Optimized mobile, compressed preview | Optimized desktop, uncompressed preview |
| --- | ---: | ---: |
| FCP | 1.2 s | 0.4 s |
| LCP | 1.7 s | 0.6 s |
| TBT | 20 ms | 0 ms |
| CLS | 0 | 0 |

Mobile compressed preview had no zero-score binary audit failures. The uncompressed optimized mobile preview scored 96, with LCP 2.7 s, FCP 1.2 s, TBT 20 ms and CLS 0. This difference makes production transfer compression important. Preview caching is 600 seconds and gzip is enabled; production headers remain unverified.

Lighthouse reported a local root-document response duration of 180 ms on the compressed mobile run. That is not the deployed subdomain's TTFB. Browser regression runs measured local navigation TTFB around 4–5 ms and maximum sampled interaction durations of 96–104 ms; these are unthrottled local observations, not field INP or a guarantee for all interactions.

Automated browser checks passed: search, gender selection/pressed state, initial-letter and theme filters, pagination, shortlist persistence/removal, two-name combining, mobile horizontal overflow, no-JavaScript examples and guide, and no console errors or failed resource requests. Build validation passed schema/visible-FAQ consistency, dataset counts, JavaScript syntax, local references, image dimensions and crawl-file consistency. These checks do not replace a full manual accessibility audit or assistive-technology testing.

## Required live checks after deployment

1. Configure GitHub Pages/custom domain/DNS and enforce HTTPS as described in the README. Verify `/`, `/robots.txt`, `/sitemap.xml`, `/llms.txt` and the favicon/social asset return 200; unknown paths return 404.
2. Confirm compressed HTML/JS/JSON transfer and response/cache headers on the actual domain. GitHub Pages controls response headers; a local file cannot impose arbitrary headers on it. Use an appropriate CDN/host configuration if production transfer or caching is inadequate.
3. Run mobile and desktop PageSpeed/Lighthouse on the deployed domain. TTFB depends on real hosting, network, redirects and geography. Inspect actual LCP and CPU costs; local scores vary between runs.
4. Verify the domain in Google Search Console and submit `https://name.ilmualam.com/sitemap.xml`. Check indexing/canonical selection and the rendered page. Preserve any existing indexed URL through a permanent redirect if the previous host permits it; do not delete the old page before migration is reviewed.
5. Review field LCP, INP and CLS once CrUX/Search Console has enough traffic. Field passing requires the 75th percentile of real visits; Lighthouse load audits use TBT and do not measure field INP. No analytics endpoint or new tracking service was silently added.
6. Audit the name dataset with qualified language/religious references before claiming authenticity. Update sitemap `lastmod` only when page content actually changes.

## References

- [Google Web Vitals: field vs lab metrics](https://web.dev/articles/vitals)
- [Lighthouse scoring](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring)
- [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [llms.txt proposal](https://llmstxt.org/) — describes content access; it is not a ranking guarantee.
- [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [GitHub Pages custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)

Source integration follow-up: offline/installability/update regression passed again with the imported branding. The final compressed mobile Lighthouse run scored 99 performance; accessibility, best practices, SEO and agentic browsing were 100, 100, 100, 100. See [the integration report](reports/pwa-merged-summary.json).
