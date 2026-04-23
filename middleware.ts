import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * After a new deploy, HTML that still references old `/_next/static/chunks/*` hashes
 * causes 404s and broken hydration. Prefer fresh HTML on **document navigations** while
 * leaving static assets (chunks, images) to Next/Vercel immutable caching.
 */
export function middleware(request: NextRequest) {
  const dest = request.headers.get("sec-fetch-dest");
  const accept = request.headers.get("accept") ?? "";
  const isDocumentNavigation =
    dest === "document" || (dest === null && accept.includes("text/html"));

  if (!isDocumentNavigation) {
    return NextResponse.next();
  }

  const res = NextResponse.next();
  res.headers.set(
    "Cache-Control",
    "private, no-cache, no-store, max-age=0, must-revalidate",
  );
  return res;
}

export const config = {
  matcher: [
    "/((?!api/|_next/static|_next/image|img/|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
