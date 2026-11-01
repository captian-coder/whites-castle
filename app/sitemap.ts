import type { MetadataRoute } from "next";

const routes = ["", "/menu", "/deals", "/locations", "/about", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `https://whitescastle.com${route}`,
    lastModified: new Date("2026-07-22")
  }));
}
