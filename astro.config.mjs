import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// Production: set PUBLIC_SITE_URL (origin, e.g. https://YOURNAME.github.io) and, for GitHub
// Project Pages, PUBLIC_BASE_PATH (e.g. /china-traveler/). See README “Deploy”.
const site = process.env.PUBLIC_SITE_URL?.trim() || undefined;
const base =
  process.env.PUBLIC_BASE_PATH?.trim() && process.env.PUBLIC_BASE_PATH.trim() !== "/"
    ? ensureLeadingSlash(process.env.PUBLIC_BASE_PATH.trim())
    : "/";

function ensureLeadingSlash(p) {
  const withSlash = p.startsWith("/") ? p : `/${p}`;
  return withSlash.endsWith("/") ? withSlash : `${withSlash}/`;
}

// https://astro.build/config
export default defineConfig({
  site,
  base,
  compressHTML: true,
  trailingSlash: "always",
  integrations: [mdx(), ...(site ? [sitemap()] : [])],
});
