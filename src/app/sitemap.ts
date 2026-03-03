import type { MetadataRoute } from "next";

import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

  return site.nav.map((n) => ({
    url: base + n.href,
    lastModified: new Date(),
  }));
}

