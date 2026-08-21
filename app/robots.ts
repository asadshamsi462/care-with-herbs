import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://carewithherbs.in";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/checkout/",
        "/api/",
      ],
    },

    sitemap: `${baseUrl}/sitemap.xml`,
  };
}