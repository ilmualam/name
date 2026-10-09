# IlmuAlam PWA source integration

Source: [ilmualam/pwa](https://github.com/ilmualam/pwa), commit `1757051f8a7d3682f85b8495842e366e6d92651e` (22 August 2026). Reviewed 9 October 2026. Source documentation was treated as project information, not as instructions overriding the requested baby names integration.

## Imported and adapted

| Source file | Baby names destination |
| --- | --- |
| `assets/icon-192x192.png` | `asset/pwa/icons/icon-192.png` |
| `assets/icon-512x512.png` | `asset/pwa/icons/icon-512.png` |
| `assets/apple-touch-icon.png` | `asset/pwa/icons/apple-touch-icon.png` |
| `assets/favicon-96x96.png` | `asset/icons/favicon-96x96.png` |
| `LICENSE` | `asset/pwa/LICENSE` |

The PNG dimensions were checked: 192, 512, 180 and 96 pixels respectively. A separate 512 maskable icon was exported from the original 512 PNG with white padding to keep the brand mark within the safe zone. The name repo's existing root MIT license has the same copyright notice and is included in the Pages artifact. Icons are now local, so the new app does not depend on assets hosted in the old repo.

## Worker and manifest adaptation

The source manifest launches `https://www.ilmualam.com/?utm_source=pwa`, identifies a motivation blog, and uses remote icon paths. The baby names manifest keeps an independent identity on `name.ilmualam.com`, with same-origin start URL `/`, root scope and local imported icons.

The original worker hardcodes `ilmualam-cache-v1`, precaches paths inconsistent with both the source repo's published folder and this tool, swallows installation errors, calls `skipWaiting()` during installation, and deletes all other origin caches on activation. Its broad fetch handler can return HTML fallback for failed non-navigation requests. The new versioned worker provides the equivalent PWA/offline features with explicit app/data precaching, scoped cache cleanup, navigation-only fallback, non-GET/cross-origin bypass and user-approved updates. The old worker is not registered alongside it.

The source `assets/favicon.svg` contains unresolved Git conflict markers and a large embedded raster image, so it was excluded. Its placeholder `assets/site.webmanifest` and demo page/styles were also excluded; the baby names interface and single valid manifest remain the installed app.

This integration copies usable assets and adapts the functionality. It does not merge Git histories, delete the old repository or transfer existing PWA installations. Installations/cache/local storage on another origin remain separate. No push or deployment was performed.
