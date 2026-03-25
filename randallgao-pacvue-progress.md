# china-traveler — agent progress

## 2026-03-25

- **User intent:** Follow gstack-style execution on the Astro guide repo.
- **Done:** Moved implementation forward per `docs/IMPLEMENTATION-PLAN.md` Tasks 3–6 (structure + stubs):
  - `BaseLayout.astro`, `GuideNav.astro` (appendix secondary nav), footer disclaimer (spec §12 tone).
  - Content collections `guide` + `partials`; chapter routes with `trailingSlash: 'always'`.
  - `transport.mdx` + `TransportBranch.astro` + `transport-branch.ts` + two B partials (same URL).
  - Placeholder copy for all chapters; before-land early connectivity pointers; payments comparison table; rail weak fallback.
  - Fixed `docs/URL-STRATEGY.md` broken `docs/superpowers/...` links.
  - `.gitignore`: ignore `.agents/skills/gstack/node_modules/`.
  - Dev deps: `@astrojs/mdx@3`, `@astrojs/check@0.9`; scripts: `npm run check`.
  - CI: `.github/workflows/ci.yml` (Node 20, `check` + `build`).
  - README: local dev / content paths / gstack note.
- **Verify:** `npm run build` and `npm run check` — 0 errors.
- **Next (pre–content pass):** `site` in `astro.config` when domain known, Task 7 OG tags optional, `npm audit` triage.

## 2026-03-25 (content pass)

- Filled **first-draft English** for all guide chapters + both B partials; removed `_Content stub_` markers.
- **Appendix** reworked to stay inside four-block template (checklist inside Step by step).
- Added **curated official links** (Alipay, WeChat Pay, UnionPay, 12306 English, State Council EN portal) where appropriate; metro/bus left as search guidance.
- `npm run check` + `npm run build`: clean.
- **Next:** Set `site` + per-page OG (Task 7), city-specific metro deep links if you lock v1 cities, editorial review of rail/wallet steps against live 12306/app flows.

## 2026-03-25 (Task 7 SEO)

- `PUBLIC_SITE_URL` in `.env` / env → `site` in `astro.config.mjs`; conditional `@astrojs/sitemap`.
- `BaseLayout`: canonical, `og:*`, `twitter:card`, `article:modified_time` from `lastReviewed`.
- Chapter + transport pages pass `lastReviewed`; `.env.example`; `.gitignore` `.env`.
- CI sets `PUBLIC_SITE_URL` + `PUBLIC_BASE_PATH=/` so sitemap path is exercised.

## 2026-03-25 (高德 + GitHub Pages)

- Content: recommend **高德地图 Amap** (`amap.com`, download link) for Shanghai maps/offline; cross-links use **relative** `../chapter/` for `base` compatibility.
- `astro.config`: `PUBLIC_BASE_PATH` for GitHub Project Pages; `robots.txt` route; `GuideNav` + index use `BASE_URL` / `Astro.url.pathname`.
- Workflow **deploy-github-pages.yml**: build + `upload-pages-artifact` + `deploy-pages`.

## 2026-03-25 (Shanghai-first)

- Locked narrative to **first city Shanghai**: nav title, home meta, before-land (PVG vs SHA), payments (metro QR test), rail (station table), connectivity (airport link).
- **B partials:** Shanghai Metro (Line 2 / airports / rush / exits), general path (Didi, taxi, buses, Bund walking, Hongqiao HSR).
- **Transport UI:** branch legend + labels are Shanghai-only (`Metro-first` vs `Taxis, buses & ride-hail first`).
- Verify live URLs: `service.shmetro.com/en`, `shairport.com` / `shairport.com/ensh`, `12306.cn/en`, `unionpayintl.com/en`, `english.shanghai.gov.cn`.

## 2026-03-25 (gstack-style QA)

- `npm run check` + `npm run build`: 0 diagnostics; 7 static routes.
- **gstack browse** on `astro preview :4173`: home + `/transport/` 200, no console errors; radio toggle `metro` ↔ `general` updates panel visibility (`hidden` toggles as expected).
- **Base-path build:** `PUBLIC_SITE_URL=https://owner.github.io` + `PUBLIC_BASE_PATH=/china-traveler/` → `robots.txt` `Sitemap:` and sitemap `<loc>` include `/china-traveler/…`.
- **npm audit:** 4 issues (esbuild/vite chain; fix forces Astro major bump) — note for later, not blocking static deploy.
- **Content:** `connectivity.md` State Council link updated to `https://english.www.gov.cn/` (verified 200).

## 2026-03-25 (Cursor skill: frontend-design)

- **Source:** User draft at `~/Desktop/SKILL.md` (name `frontend-design`).
- **Created:** `.cursor/skills/frontend-design/SKILL.md` — YAML `description` rewritten third-person + trigger terms; body structured (design thinking, guidelines, anti-patterns); omitted `license: LICENSE.txt` (file not in repo).
- **Note:** For a **personal** copy, duplicate the folder to `~/.cursor/skills/frontend-design/`.
