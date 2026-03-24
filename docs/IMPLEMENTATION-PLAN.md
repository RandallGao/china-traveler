# China first-time visitor guide — implementation plan

> **Standalone repository:** This plan originally assumed a parent monorepo with a `traveler-guide/` subfolder. **Here, the Astro site lives at the repo root** — treat every `traveler-guide/` path below as `./` (e.g. `traveler-guide/package.json` → `package.json`).

> **For agentic workers:** REQUIRED SUB-SKILL: Use @superpowers:subagent-driven-development (recommended) or @superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a static English guide site (payments → transport → rail; minimal connectivity; appendix tickets) using an SSG, with one in-page B-chapter branch (radio/tabs) and content structured for solo maintenance.

**Architecture:** **Astro** (locked in `docs/URL-STRATEGY.md`) renders Markdown/partials into static HTML. **Chapter-per-page URLs** give each spec chapter its own route and title; the transport page embeds two partials toggled by client JS. Content follows the spec’s four-block template with **Before you land** as checklist-style hub and **early connectivity callouts** in hub + post-landing intros.

**Tech Stack:** Node 20+, Astro 4.x (preferred) *or* Eleventy 3.x; Markdown; minimal vanilla JS for B-toggle; static hosting (any).

**Spec:** `docs/DESIGN-SPEC.md`

---

## File structure (target)

All paths relative to repo root unless noted.

| Path | Responsibility |
|------|----------------|
| `traveler-guide/package.json` | Scripts: `dev`, `build`, `preview`, `check` (if Astro). |
| `traveler-guide/README.md` | Dev, deploy, content editing conventions. |
| `traveler-guide/docs/URL-STRATEGY.md` | **Task 1** output: chosen URL model + rationale (short ADR). |
| `traveler-guide/src/layouts/BaseLayout.astro` | HTML shell, meta, nav, footer disclaimer slot. |
| `traveler-guide/src/components/GuideNav.astro` | Ordered links per spec §3.1 (appendix secondary). |
| `traveler-guide/src/components/ChapterSections.astro` *(or MD layout)* | Renders four blocks from content (headings or props). |
| `traveler-guide/src/components/TransportBranch.astro` | Radio/tab UI + two slots for partial content. |
| `traveler-guide/src/scripts/transport-branch.ts` *(or inline)* | Toggles visibility of metro vs general panels (progressive enhancement: both in DOM or one shown via CSS). |
| `traveler-guide/src/content/docs/en/before-land.md` | Hub chapter; checklist-style “Step by step”; early E callouts. |
| `traveler-guide/src/content/docs/en/payments.md` | A: one wallet + comparison table blocks. |
| `traveler-guide/src/content/docs/en/transport.md` | B: wrapper + imports/includes `b-metro-heavy`, `b-general-transport`. |
| `traveler-guide/src/content/docs/en/partials/b-metro-heavy.md` | B variant 1 body (four blocks inside or subheadings). |
| `traveler-guide/src/content/docs/en/partials/b-general-transport.md` | B variant 2 body. |
| `traveler-guide/src/content/docs/en/rail.md` | C + weak counter section. |
| `traveler-guide/src/content/docs/en/connectivity.md` | E minimal. |
| `traveler-guide/src/content/docs/en/appendix-tickets.md` | D. |
| `traveler-guide/public/` | Optional tiny assets; avoid screenshot debt. |

*Adjust `src/content/...` to match the scaffold (e.g. Astro Content Collections may use `src/content/config.ts` and different folders). The **intent** is one logical file per chapter + two B partials.*

---

### Task 1: Lock URL strategy and generator choice

**Files:**
- Create: `traveler-guide/docs/URL-STRATEGY.md`

- [ ] **Step 1: Write the decision doc**

Record an explicit choice:

| Option | When it wins |
|--------|----------------|
| **Chapter-per-page** | Distinct titles/meta per chapter, shareable URLs, analytics per section, matches “one MD per chapter” mental model; **recommended default** for future city/SEO pages. |
| **Single long-form + anchors** | Fewer routes, one scroll narrative; needs strong sticky nav and `id` hygiene. |

**Decision template** (fill in):

```markdown
# URL strategy

## Decision
- Model: [ chapter-per-page | single long-form ]
- SSG: [ Astro | Eleventy ]

## Rationale
(3–6 sentences: SEO, nav, B-chapter same-page toggle still applies either way.)

## Consequences
- Routes: (list or describe)
- Content files: (how MD maps to HTML)
```

- [ ] **Step 2: Commit**

```bash
git add traveler-guide/docs/URL-STRATEGY.md
git commit -m "docs(traveler-guide): record URL strategy and SSG choice"
```

---

### Task 2: Scaffold the site

**Files:**
- Create: `traveler-guide/` (entire subtree from CLI)

- [ ] **Step 1: Create Astro project** (skip if Eleventy chosen in Task 1—use `npm create @11ty/eleventy-base-blog` or official minimal starter instead)

```bash
cd "c:\Users\RandallGao\OneDrive - Pacvue\Documents\GitHub\incrementality-amc"
npm create astro@latest traveler-guide -- --template minimal --install --typescript strict --git false
```

- [ ] **Step 2: Verify dev server**

```bash
cd traveler-guide
npm run dev
```

Expected: server starts; default page loads (browser optional).

- [ ] **Step 3: Verify production build**

```bash
npm run build
```

Expected: exit code 0; `dist/` populated.

- [ ] **Step 4: Commit**

```bash
git add traveler-guide
git commit -m "feat(traveler-guide): scaffold Astro static site"
```

---

### Task 3: Base layout, nav, and global accessibility

**Files:**
- Create/modify: `traveler-guide/src/layouts/BaseLayout.astro`, `traveler-guide/src/components/GuideNav.astro`
- Modify: root page / routing per Task 1 (e.g. `src/pages/index.astro` redirect or hub)

- [ ] **Step 1: Implement `BaseLayout.astro`**

Include: `<html lang="en">`, viewport, placeholder `<title>`, slot for main, footer with short disclaimer (spec §12).

- [ ] **Step 2: Implement `GuideNav.astro`**

Ordered links: Before you land → Payments → Transport → Rail → Connectivity → Appendix (D). Appendix styled secondary (e.g. smaller or separated).

- [ ] **Step 3: Run build**

```bash
cd traveler-guide && npm run build
```

Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add traveler-guide/src
git commit -m "feat(traveler-guide): base layout and guide navigation"
```

---

### Task 4: Chapter routes and four-block content shape

**Files:**
- Create: one route per chapter per URL-STRATEGY.md (e.g. `src/pages/before-land.astro`, `payments.astro`, …) **or** dynamic `[...slug].astro` driven by content collection
- Create: Markdown (or MDX) sources with **consistent headings**:

```markdown
---
title: "…"
description: "…"
lastReviewed: 2026-03-24
---

## What this helps you do
…

## Step by step
…

## If this fails
…

## Official / trusted links
…
```

- [ ] **Step 1: Add placeholder MD for all six content areas** (empty prose is OK; headings required).

- [ ] **Step 2: Wire each page to render MD through layout** (Astro `Content` collection or `import.meta.glob`—match scaffold).

- [ ] **Step 3: Before you land** — In MD, make **Step by step** a **checklist** (bullet or numbered checks) and add 1–2 short paragraphs in **What this helps** mentioning **connectivity before payments/maps/rides** with a forward link to Connectivity (spec §3.1).

- [ ] **Step 4: Payments** — Under **Step by step**, use neutral **“Set up one mobile wallet first”**; add **## Comparison: Alipay, WeChat Pay, cards & cash** (or table in MD) after main steps (spec §4).

- [ ] **Step 5: Build**

```bash
npm run build
```

- [ ] **Step 6: Commit**

```bash
git add traveler-guide
git commit -m "feat(traveler-guide): chapter pages and four-block content skeleton"
```

---

### Task 5: Transport page — same-page branch (radio/tabs)

**Files:**
- Create: `traveler-guide/src/components/TransportBranch.astro`
- Create: `traveler-guide/src/content/docs/en/partials/b-metro-heavy.md`, `b-general-transport.md`
- Create/modify: `traveler-guide/src/pages/transport.astro` (or equivalent)
- Create: `traveler-guide/src/scripts/transport-branch.ts` (optional; may use `client:load` on a tiny island)

- [ ] **Step 1: Add two labeled controls** (radio recommended for a11y)

Labels (spec §5.2):

- `Shanghai / Metro-heavy city`
- `Other city / General transport path`

- [ ] **Step 2: Render partial A/B in two panels**; default one selected (e.g. metro-heavy).

- [ ] **Step 3: Implement toggle** — On change, show one panel, hide the other (`hidden` attribute or CSS class). No second URL.

- [ ] **Step 4: Build and manual check** — Open `/transport`, switch tabs, confirm no full navigation.

- [ ] **Step 5: Commit**

```bash
git add traveler-guide
git commit -m "feat(traveler-guide): transport branch toggle with partials"
```

---

### Task 6: Rail, connectivity, appendix copy stubs + weak C fallback

**Files:**
- Modify: `rail.md`, `connectivity.md`, `appendix-tickets.md`

- [ ] **Step 1: Rail** — End **Step by step** (or final subsection under **If this fails**) with short **station counter / backup plan** block (spec §6).

- [ ] **Step 2: Connectivity** — Only “need it?” + two path types; no vendors (spec §7).

- [ ] **Step 3: Appendix** — Principles + checklist only (spec §8).

- [ ] **Step 4: Commit**

```bash
git add traveler-guide/src/content
git commit -m "content(traveler-guide): rail weak fallback and E/D stubs"
```

---

### Task 7: SEO metadata and polish

**Files:**
- Modify: `BaseLayout.astro`, per-page frontmatter usage, optional `sitemap` integration later

- [ ] **Step 1: Per-page `<title>` and meta description** from frontmatter.

- [ ] **Step 2: Optional Open Graph tags** (title + description only; YAGNI on images).

- [ ] **Step 3: `npm run build`**

- [ ] **Step 4: Commit**

```bash
git add traveler-guide
git commit -m "feat(traveler-guide): per-page SEO metadata"
```

---

### Task 8: Documentation and repo hygiene

**Files:**
- Create/modify: `traveler-guide/README.md`
- Optional: one line in repo root `README.md` if it exists pointing to `traveler-guide/`

- [ ] **Step 1: Document** `npm run dev`, `npm run build`, deploy (e.g. static upload to any host), and **content rules** (four blocks, text-first, `lastReviewed`).

- [ ] **Step 2: Add `traveler-guide/` to root `.gitignore` only if needed** (do **not** ignore `node_modules` incorrectly—ensure `node_modules` is ignored inside `traveler-guide/`).

- [ ] **Step 3: Commit**

```bash
git add traveler-guide/README.md
git commit -m "docs(traveler-guide): README for dev and content conventions"
```

---

## Verification (no separate test suite required for v1)

| Check | Command / action |
|-------|------------------|
| Build | `cd traveler-guide && npm run build` → exit 0 |
| Type/template | `cd traveler-guide && npx astro check` (if Astro) → no errors |
| Manual | Nav order; B toggle; appendix secondary; mobile viewport readable |

---

## Plan review loop

After you implement: if @superpowers:plan-document-reviewer is available, run one review pass with context: this plan path + spec path. Otherwise human review.

---

## Execution handoff

**Plan file in this repo:** `docs/IMPLEMENTATION-PLAN.md`.

**Two execution options:**

1. **Subagent-driven (recommended)** — Fresh subagent per task, review between tasks. Use @superpowers:subagent-driven-development.

2. **Inline execution** — Same session, batch with checkpoints. Use @superpowers:executing-plans.

**Which approach do you want?**
