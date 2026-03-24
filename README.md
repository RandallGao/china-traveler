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
