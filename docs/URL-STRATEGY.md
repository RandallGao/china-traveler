# URL strategy & static site stack

**Status:** Locked for v1 implementation  
**Related spec:** `docs/superpowers/specs/2026-03-24-china-traveler-guide-design.md`  
**Related plan:** `docs/superpowers/plans/2026-03-24-china-traveler-guide.md`

---

## Decision

| Area | Choice |
|------|--------|
| **SSG** | **Astro** |
| **URL model** | **Chapter-per-page** (one HTML URL per spec chapter) |
| **Transport (B)** | **Same page** as the rest of the Transport chapter: **radio or tabs** swap only the **B body partials** (`b-metro-heavy` / `b-general-transport`). **No** second URL for the branch. |

---

## Rationale

### Why Astro (not Eleventy)

- The spec already requires **client-side UI** for the B-chapter toggle. Astro handles **small islands of behavior** without turning the project into a full SPA.
- **Layouts, slots, and content collections** (or Markdown-driven pages) map cleanly to **one file per chapter**, partials for B variants, and future **city or topic pages** (e.g. Beijing, SEO landing pages).
- Stays **light**: static output, no app server for v1.

### Why chapter-per-page (not one long scroll)

- **SEO:** Each chapter gets its own **title, description, and canonical URL** (payments, transport, rail, etc.).
- **Analytics / instrumentation:** Page views and funnels align with **real sections** without fragile scroll-depth hacks.
- **Growth:** Adding **regional variants** or **topic pages** is a matter of new routes + content files, not splitting a megapage.
- **Maintenance:** Editors work on **one scoped Markdown file** per chapter; diffs and review stay focused.

### Why B stays same-page (radio / tabs)

- Matches the spec: **one strong branch**, **no** extra navigation depth and **no** separate URLs for metro vs general path.
- Avoids implying “two different trips” while still swapping **substantive** copy via partials.

---

## Consequences

### Routes (v1 target)

| URL (example) | Source (example) | Notes |
|----------------|------------------|--------|
| `/` | `index.astro` | Hub / pointer to “Before you land” or merged hub. |
| `/before-land/` | content + layout | Overview hub; checklist-style steps (spec §10 exception). |
| `/payments/` | `payments` chapter | One wallet first + comparison table. |
| `/transport/` | `transport` chapter + **TransportBranch** | **Only this page** hosts the radio/tab + two partials. |
| `/rail/` | `rail` chapter | Main 12306-style path + weak counter fallback block. |
| `/connectivity/` | `connectivity` chapter | Minimal E; early callouts live in **Before you land** + intros (spec §3.1). |
| `/appendix/tickets/` *(or `/appendix-tickets/`)* | appendix | Secondary nav; not a “core step” in the journey UI. |

Exact slugs can be adjusted in implementation; **one primary URL per chapter** is the invariant.

### Content ↔ build

- **One primary Markdown (or MDX) document per chapter** under `src/content/` or co-located with pages—implementation detail locked when layouts are added.
- **Partials:** `b-metro-heavy` and `b-general-transport` are **included only** on `/transport/`.
- **Long-form alternative (rejected for v1):** A single page with anchors would simplify routing but **hurts SEO granularity, analytics, and future city pages**; not chosen.

### What this decision does *not* imply

- **No** requirement for a Node server in production (output is static).
- **No** multi-page wizard for Alipay vs WeChat (still **one wallet** narrative + table on `/payments/`).

---

## Change control

If product requirements shift (e.g. mandatory single-page export for a third-party embed), revisit this document and the spec **before** restructuring routes.

**Last updated:** 2026-03-24
