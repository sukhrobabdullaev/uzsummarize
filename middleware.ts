import { NextRequest, NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;
const SUPPORTED_LOCALES = ["en", "uz", "ru"];
const DEFAULT_LOCALE = "uz";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip static files, API routes, or already-locale-prefixed routes
  if (
    PUBLIC_FILE.test(pathname) ||
    pathname.startsWith("/api") ||
    SUPPORTED_LOCALES.some((locale) => pathname.startsWith(`/${locale}`))
  ) {
    return NextResponse.next();
  }

  // Redirect to default locale
  const url = req.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - static files
     * - API routes
     */
    "/((?!api|_next|.*\\..*).*)"
  ],
};
