const THEME_KEY = "china-traveler-theme";

function currentTheme(root: HTMLElement): "light" | "dark" {
  return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

function syncUi(btn: HTMLButtonElement, root: HTMLElement) {
  const dark = currentTheme(root) === "dark";
  btn.setAttribute("aria-pressed", dark ? "true" : "false");
  btn.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
}

export function initThemeToggle() {
  const btn = document.getElementById("theme-toggle-btn");
  if (!(btn instanceof HTMLButtonElement)) {
    return;
  }
  const root = document.documentElement;

  btn.addEventListener("click", function onThemeClick() {
    const next = currentTheme(root) === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    root.style.colorScheme = next;
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* storage unavailable */
    }
    syncUi(btn, root);
  });

  syncUi(btn, root);
}
