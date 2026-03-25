import type { APIRoute } from "astro";

/** Sitemap URL respects `site` + `base` from astro.config. */
export const GET: APIRoute = () => {
  const site = import.meta.env.SITE as string | undefined;
  const base = import.meta.env.BASE_URL;
  const lines = ["User-agent: *", "Allow: /", ""];

  if (site) {
    const path = `${base}sitemap-index.xml`.replace(/^\/+/, "");
    const sitemapUrl = new URL(path, site.endsWith("/") ? site : `${site}/`).href;
    lines.push(`Sitemap: ${sitemapUrl}`);
  }

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
