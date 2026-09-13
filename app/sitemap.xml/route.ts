import { INITIAL_PRODUCTS, CATEGORIES } from "@/lib/mock-data";

export async function GET(request: Request) {
  const host =
    request.headers.get("x-forwarded-host") ||
    request.headers.get("host") ||
    "secondlist.vercel.app";
  const proto = request.headers.get("x-forwarded-proto") || "https";

  // Use explicit env if set, otherwise auto-match the domain being requested by Google
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
    ? process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")
    : `${proto}://${host}`;

  const currentDate = new Date().toISOString();

  const urls: { loc: string; lastmod: string; changefreq: string; priority: string }[] = [
    { loc: `${baseUrl}`, lastmod: currentDate, changefreq: "daily", priority: "1.0" },
    { loc: `${baseUrl}/search`, lastmod: currentDate, changefreq: "daily", priority: "0.9" },
    { loc: `${baseUrl}/sell`, lastmod: currentDate, changefreq: "monthly", priority: "0.8" },
    { loc: `${baseUrl}/saved`, lastmod: currentDate, changefreq: "weekly", priority: "0.5" },
  ];

  // Category URLs
  CATEGORIES.forEach((cat) => {
    urls.push({
      loc: `${baseUrl}/search?category=${encodeURIComponent(cat.name)}`,
      lastmod: currentDate,
      changefreq: "daily",
      priority: "0.8",
    });
  });

  // Product URLs
  INITIAL_PRODUCTS.forEach((prod) => {
    urls.push({
      loc: `${baseUrl}/product/${prod.id}`,
      lastmod: currentDate,
      changefreq: "weekly",
      priority: "0.8",
    });
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
