# China first-time visitor guide (static site)

Standalone Astro project (not the `incrementality-amc` monorepo). Product spec and task plan live in **`docs/`**.

| Document | Purpose |
|----------|---------|
| `docs/URL-STRATEGY.md` | Locked: Astro + chapter-per-page; B-chapter same-page partials. |
| `docs/DESIGN-SPEC.md` | Full design spec. |
| `docs/IMPLEMENTATION-PLAN.md` | Step-by-step build plan (`traveler-guide/` paths in that file mean **this repo root**). |

## Push to your GitHub

**Important:** The remote URL must be your **real** GitHub username and **exact** repository name (as shown on the repo’s GitHub page). Placeholder text like `你的用户名` or `YOUR_USERNAME` will **not** work — GitHub will return “repository not found”.

1. In the browser: create the repo first — **GitHub → New repository** → name it (e.g. `china-traveler-guide`) → create **without** adding a README if you already committed locally.  
2. Copy the HTTPS URL from the green **Code** button (looks like `https://github.com/someuser/china-traveler-guide.git`).  
3. In PowerShell (skip `git init` / `commit` if you already did them):

```powershell
cd "c:\Users\RandallGao\OneDrive - Pacvue\Documents\GitHub\china-traveler-guide"
git branch -M main
git remote remove origin 2>$null   # only if you added a wrong URL earlier
git remote add origin https://github.com/ACTUAL_LOGIN/ACTUAL_REPO_NAME.git
git remote -v
git push -u origin main
```

Example: if your profile is `https://github.com/janesmith` and the repo is `china-traveler-guide`, use:

`https://github.com/janesmith/china-traveler-guide.git`

HTTPS password prompt: use a [Personal Access Token](https://github.com/settings/tokens) (classic, scope `repo`), not your GitHub account password.

## Decisions

See **`docs/URL-STRATEGY.md`**: **Astro** + **chapter-per-page** URLs; transport chapter uses **same-page** radio/tabs for two partials (no extra URL).

## Local development

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static site → dist/
npm run check     # astro check (types + content collections)
npm run preview   # serve dist/
```

**Content layout:** chapters in `src/content/guide/` (Markdown + `transport.mdx`); B-branch partials in `src/content/partials/`. Use the four-block heading pattern from `docs/IMPLEMENTATION-PLAN.md` (`What this helps` → `Step by step` → `If this fails` → `Official / trusted links`).

**Optional gstack:** local skills under `.agents/skills/gstack/` — run `./setup --host codex` there if the headless `browse` CLI is missing.

**Maps & addresses:** the guide recommends **[高德地图 (Amap)](https://www.amap.com/)** for Shanghai navigation and offline packs (see [Before you land](src/content/guide/before-land.md)).

### Deploy & SEO

**Environment variables**

| Variable | When needed | Example |
|----------|-------------|---------|
| `PUBLIC_SITE_URL` | Production | `https://YOURNAME.github.io` or `https://guide.example.com` (origin only, no repo path) |
| `PUBLIC_BASE_PATH` | GitHub **Project** Pages only | `/china-traveler/` (must match repo name, slashes as shown) |

```bash
cp .env.example .env
# Edit .env, then:
npm run build
```

With `PUBLIC_SITE_URL` set, you get **canonical**, **Open Graph / Twitter**, **`article:modified_time`**, **`sitemap-index.xml`**, and **`robots.txt`** (with `Sitemap:` when `site` is set). Omit both URL vars for a local-only build (relative links in dev use `base: /`).

**GitHub Actions → GitHub Pages**

1. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.  
2. Push to `main`: workflow **Deploy GitHub Pages** builds with `PUBLIC_SITE_URL=https://<owner>.github.io` and `PUBLIC_BASE_PATH=/<repo>/`.  
3. Site URL: `https://<owner>.github.io/<repo>/`  

If you use a **user site** repo (`<username>.github.io`) with content at the root, set `PUBLIC_SITE_URL` to `https://<username>.github.io` and **do not** set `PUBLIC_BASE_PATH` (or set it to `/`). For a **custom domain**, set `PUBLIC_SITE_URL` to `https://your.domain` and `PUBLIC_BASE_PATH` to `/` unless the site is in a subdirectory.

## Prerequisites

- **Node.js 20+** and **npm** (npm ships with Node).

### Windows: `npm` / `node` is not recognized

That means Node is **not installed** or **not on your PATH** (a new terminal often fixes it after install).

**Option A — Installer (simplest)**  

1. Download **LTS** from [https://nodejs.org/](https://nodejs.org/).  
2. Run the installer and enable **“Add to PATH”** (default).  
3. **Close and reopen** PowerShell, Windows Terminal, or Cursor’s integrated terminal.  
4. Check:

```powershell
node -v
npm -v
```

**Option B — winget (needs admin / UAC once)**  

In **PowerShell as Administrator**:

```powershell
winget install OpenJS.NodeJS.LTS --accept-package-agreements --accept-source-agreements
```

Then open a **new** terminal and run `node -v` / `npm -v`.

**If it still fails:** Search “Environment Variables” → **Path** → confirm an entry like `C:\Program Files\nodejs\` exists, or reinstall Node and restart the machine once.

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Verify

After `npm run build`, output is in `dist/`. Add `@astrojs/check` later if you want `astro check` in CI.
