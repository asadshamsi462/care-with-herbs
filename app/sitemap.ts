import type { MetadataRoute } from "next";

const products = [
  "amla-powder",
  "amla-reetha-shikakai-mix",
  "arjuna-chal-powder",
  "gurehal-powder",
  "jamun-powder",
  "karela-powder",
  "konch-powder",
  "neem-powder",
  "safed-musli-powder",
  "satawari-powder",
  "triphala-powder",
  "ashwagandha-powder",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://carewithherbs.in";

  const productUrls = products.map((slug) => ({
    url: `${baseUrl}/product/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },

    ...productUrls,
  ];
}
