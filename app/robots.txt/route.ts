export async function GET(request: Request) {
  const host =
    request.headers.get("x-forwarded-host") ||
    request.headers.get("host") ||
    "secondlist.vercel.app";
  const proto = request.headers.get("x-forwarded-proto") || "https";

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
    ? process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")
    : `${proto}://${host}`;

  const robots = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${baseUrl}/sitemap.xml
`;

  return new Response(robots, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
