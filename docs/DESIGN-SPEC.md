# Design spec: English self-service guide for first-time visitors to China

> Snapshot copied from project planning (2026-03-24). Edit this file as the product source of truth in **this** repo.

**Status:** Approved for implementation planning  
**Last updated:** 2026-03-24 (§3.1 E callouts, §5.2 label, §10 Before-you-land exception, §14 URL strategy)  
**Audience:** First-time foreign tourists, pre-arrival through 72 hours on the ground  

---

## 1. Product intent

Build an **English static web guide** that helps visitors complete **payment, local transport, and rail booking** with minimal confusion—optimized for:

- **~80% of users** understanding what to do **on first read**, without precision-chasing every edge case.
- **Sustainable maintenance** by a small team (including solo): content changes often; the system must stay easy to edit.

This is **not** a personalized rule engine, a forum, or a booking platform. It is **guided documentation** with **one explicit branch** and **light inline fallbacks**.

---

## 2. Scope (v1)

### 2.1 In scope (main narrative)

| Track | Requirement | Notes |
|-------|----------------|-------|
| **A — Payments** | **Mandatory** | Prerequisite for nearly everything else. |
| **B — Local transport** | **Mandatory** | First practical need after landing. |
| **C — High-speed rail / 12306** | **Mandatory** | High frequency and high “stuck” rate; needs a clear default path. |
| **E — Mobile connectivity** | **Minimal** | Only: **whether you need it** + **two high-level path types**. No carrier/plan recommendations, no deep how-to. |

### 2.2 Out of main narrative (appendix only)

| Track | Treatment |
|-------|-----------|
| **D — Attractions / events ticketing** | **Not** part of the primary journey/progress. Ship as **principles + checklist** only (no deep walkthrough in v1). |

### 2.3 Non-goals (v1)

- User accounts, saved progress sync, or CMS (unless added later by explicit decision).
- “Most accurate for every city” branching beyond the **single B-chapter branch** defined below.
- Video-heavy or screenshot-heavy tutorials as the primary teaching mode.
- Legal, visa, or tax advice; financial product endorsement.

---

## 3. Information architecture

### 3.1 Chapter order (unified main line)

1. **Before you land** — What to do in advance (timeboxed, realistic).
2. **A — Set up one mobile wallet first** — Neutral primary path; see §4.
3. **B — Getting around (first city)** — **Same-page branch** (radio or tabs); see §5.
4. **C — Trains (12306 / rail)** — Single main procedure + **weak** counter/fallback block at end; see §6.
5. **E — Staying online (minimal)** — Need vs not + two path labels only.
6. **Appendix — Tickets & events (D)** — Principles + checklist; linked from nav but **not** shown as a core “step” in the main journey.

Narrative principle: **pay → move → travel farther**; **E** stays short and optional-feeling; **D** does not dilute the main line.

**E and reading order (do not implement as “connectivity is last priority”):** The **chapter order above stays fixed** (E after C), but **in the actual copy**, connectivity must be **called out early** in **Before you land** and again in the **after-landing** introduction to practical steps. Many users effectively need **network access first** as a prerequisite for **maps, ride-hailing, and sometimes payment or SMS**. The full E chapter remains minimal and placed late; the **early mentions** are cross-cutting reminders (and pointers forward to E), not a second E chapter.

### 3.2 Branching policy (summary)

| Topic | Branch? | Implementation |
|-------|---------|----------------|
| Domestic phone number | **No** top-level quiz | Use **inline** “If you don’t have …” notes / collapsible details where needed. |
| Alipay vs WeChat Pay | **No** parallel wizards | **One wallet first** + comparison table (§4). |
| First city: metro-heavy vs other | **Yes** (only strong branch) | **Same URL**, **radio or tabs** swapping **only** the B-chapter content block (§5). |
| 12306 vs counter | **Weak** | One **C** chapter; counter/station fallback as **final subsection** or callout, not a second route tree. |

---

## 4. Payments (A): “one wallet first” (neutral)

### 4.1 Primary storyline

- Headline intent: **Set up one mobile wallet first** (do **not** bind the product to a single app brand as “the only way”).
- Body: one coherent **step-by-step** for getting to a **first successful payment** (exact sub-steps are content work; spec only defines structure).

### 4.2 Secondary: comparison table (not a second path)

After the main steps, include a **small comparison table** (not a competing wizard):

| Column / row concept | Purpose |
|----------------------|---------|
| **Alipay** | When it helps, what it pairs with (transport, merchants). |
| **WeChat Pay** | Same, without implying it must be first. |
| **Card / cash fallback** | Honest limitations and where cash or card still matters. |

Rules:

- Avoid implying regulatory guarantees; link out for official app/help pages.
- Prefer **stable wording** over naming every short-lived campaign.

---

## 5. Transport (B): same-page metro vs general transport path

### 5.1 UX

- **Do not** use two URLs for the branch in v1.
- Use **radio buttons or tabs** on the **same page** as the rest of the guide (or same chapter anchor), switching **only** the **B-chapter content region**.

### 5.2 Labels (exact product copy can vary slightly; meaning must stay)

- **Option 1:** `Shanghai / Metro-heavy city` (represents strong metro QR coverage, typical major hub experience).
- **Option 2:** `Other city / General transport path` (non-metro-first scenarios: buses, taxis, walking transfers, station staff—**not** framed as a “worse” or purely fallback tier).

### 5.3 Content rules

- **A** and **C** chapters do not depend on this choice; only **B** body copy (and possibly short cross-links) changes.
- Keep both variants **roughly equal length** to avoid implying one is “normal” and the other is an afterthought.

### 5.4 Implementation note (static generator)

- Implement as **two partials/includes** (e.g. `b-metro-heavy.md` / `b-general-transport.md`) included from the B page template, toggled with **minimal client-side JS** (or CSS-only if feasible). The spec allows either; default expectation is **small JS** for radio/tab behavior.

---

## 6. Rail (C): single chapter + weak fallback

- **Primary:** App / 12306-style **default** sequence (content to be written carefully, with “official/trusted links”).
- **Weak branch:** Near the end, a **short** section such as “Station counter / backup plan” — not a full alternate wizard, not a separate top-level journey step.

---

## 7. Mobile connectivity (E): minimal

Two parts only:

1. **Do you need local data/voice?** — Simple decision criteria (e.g. maps, messengers, payment SMS) in plain language.
2. **Two path types** — e.g. “on-arrival SIM-style setup” vs “bring-your-own connectivity” **as categories**, without endorsing specific vendors or plans.

No deep setup guides in v1.

---

## 8. Appendix D (tickets & events)

- **Principles** (honesty about fragmentation: mini-programs, platforms, ID requirements at a high level).
- **Checklist** (what to verify before paying: refund rules, ID, show time, official channel).
- **No** step-by-step purchase flows in v1.

---

## 9. Implementation approach (approved)

### 9.1 Stack: static site generator (**Option 2**)

Use **Astro** or **Eleventy** (either acceptable; pick one at implementation time with the same constraints):

| Requirement | Why |
|-------------|-----|
| **One content file per chapter** | Easier editing, review, and diffs. |
| **Partials for branch blocks** | B-chapter variants and reused callouts stay DRY. |
| **Room for growth** | City-specific pages (e.g. Beijing), English SEO pages, and structured metadata without rewriting from scratch. |
| **Solo-maintainable** | More structure than raw HTML, less operational burden than a SPA or backend. |

**Not selected for v1:** “Plain static HTML only” as the primary approach (user explicitly chose generator-based workflow for maintainability).

### 9.2 Hosting and build

- Target: **static hosting** (any CDN/pages provider). No server requirement for v1.
- Build output should be **crawlable** English pages with sensible titles and meta descriptions (SEO details belong in the implementation plan).

---

## 10. Content template (every chapter)

**Every chapter** (including appendix pages that use narrative sections) MUST use the same **four blocks** in order:

1. **What this helps you do** — Outcome-oriented; 2–5 sentences max where possible.
2. **Step by step** — Numbered steps; primary teaching surface.
3. **If this fails** — Short troubleshooting: common blockers, what to try next, when to ask staff (no shame language).
4. **Official / trusted links** — Primary sources, app help, railway operator, etc. Prefer links over copying volatile UI text.

Optional **Last reviewed** line per chapter (date) is recommended for trust and maintainer discipline.

**Exception — Before you land:** This chapter behaves as a **hub / overview**. It should **still map** to the four blocks so structure stays consistent, but **“Step by step” may read as a pre-trip checklist** (grouped or numbered checks) rather than a rigid procedure identical to A/B/C. Avoid duplicating long sections that belong in later chapters; use short summaries and links forward.

---

## 11. Maintenance principles (mandatory)

1. **Text-first steps** — **Do not** rely on screenshots to convey procedure. Optional images are allowed sparingly for orientation; the guide must remain usable if images are removed or outdated.
2. **Four-block structure** — As in §10; prevents content from drifting into unstructured blobs.
3. **Volatile facts** — Link to official sources; avoid hard-coding amounts, fee tables, or screenshot-based “click here” instructions.
4. **Neutrality on wallets** — Do not reintroduce “pick Alipay vs WeChat” as a branching journey; keep **one wallet first** + table.

---

## 12. Trust, safety, and liability

- Clear **disclaimer**: not legal, immigration, or financial advice; procedures change; users must follow live app and venue rules.
- **No** guarantee of acceptance of foreign cards or ID at every gate—phrase as “typically / often / check current rules”.
- **E** must not read as medical, security, or surveillance advice; stay factual and minimal.

---

## 13. Suggested repository layout (informative)

Exact names can change during implementation; intent:

- `src/content` or equivalent: **one file per main chapter** (`before-land.md`, `payments.md`, `transport.md`, `rail.md`, `connectivity.md`, `appendix-tickets.md`).
- `src/partials` or generator equivalent: **`b-metro-heavy`**, **`b-general-transport`**, shared callouts.
- Shared layout: nav order matches §3.1; appendix linked but visually secondary.

---

## 14. Open decisions (for implementation / content phase)

- **Astro vs Eleventy:** choose based on team familiarity and i18n/SEO plugin ecosystem; both satisfy this spec.
- **URL strategy (resolve in implementation plan before build):** **single long-form page + in-page anchors** vs **one URL per chapter** (multi-page). Tradeoffs: SEO (indexable chapter URLs vs one pillar page), anchor sharing, analytics events, and how Astro/Eleventy routes and `content/` files are organized. **B-chapter** behavior (same-page radio/tabs) is independent of this choice but must stay consistent with the chosen pattern.
- **Exact official link set:** curated list per chapter during content authoring.
- **Analytics / privacy:** if added later, must not contradict “static, trustworthy” positioning (decision deferred unless required).

---

## 15. Approval log

| Date | Decision |
|------|----------|
| 2026-03-24 | Approved: unified main line; v1 scope A+B+C+E minimal; D appendix; Option 2 SSG; B-chapter same-page radio/tabs; payment = one wallet first + table; four-block template; text-first maintenance. |
| 2026-03-24 | Spec tweaks: E early callouts in Before you land / after landing; B label `General transport path`; Before-you-land four-block exception; open decision URL strategy (long-form vs chapter-per-page). |
