# China first-time visitor guide (static site)

Standalone Astro project (not the `incrementality-amc` monorepo). Product spec and task plan live in **`docs/`**.

| Document | Purpose |
|----------|---------|
| `docs/URL-STRATEGY.md` | Locked: Astro + chapter-per-page; B-chapter same-page partials. |
| `docs/DESIGN-SPEC.md` | Full design spec. |
| `docs/IMPLEMENTATION-PLAN.md` | Step-by-step build plan (`traveler-guide/` paths in that file mean **this repo root**). |

## Push to your GitHub

1. On GitHub: **New repository** (e.g. `china-traveler-guide`), empty, no README/license if you already have files locally.  
2. In this folder:

```powershell
cd "c:\Users\RandallGao\OneDrive - Pacvue\Documents\GitHub\china-traveler-guide"
git init
git add .
git commit -m "chore: initial import — China visitor guide (Astro scaffold + docs)"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

Replace `YOUR_USERNAME/YOUR_REPO` with your account and repo name. Use a [Personal Access Token](https://github.com/settings/tokens) as the password if Git asks for credentials over HTTPS.

## Decisions

See **`docs/URL-STRATEGY.md`**: **Astro** + **chapter-per-page** URLs; transport chapter uses **same-page** radio/tabs for two partials (no extra URL).

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
