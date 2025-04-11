import { NextRequest, NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;
const SUPPORTED_LOCALES = ["en", "uz", "ru"];
const DEFAULT_LOCALE = "uz";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Check if the request is for the admin page (with or without locale prefix)
  if (pathname.endsWith("/admin")) {
    // Get the admin secret from environment variables
    const adminSecret = process.env.ADMIN_SECRET;
    const requestSecret = req.nextUrl.searchParams.get("secret");

    // If no admin secret is set or request secret doesn't match, redirect to home
    if (!adminSecret || requestSecret !== adminSecret) {
      const locale = pathname.startsWith("/")
        ? pathname.split("/")[1]
        : DEFAULT_LOCALE;
      return NextResponse.redirect(new URL(`/${locale}`, req.url));
    }
  }

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
    "/((?!api|_next|.*\\..*).*)",
  ],
};

export function adminMiddleware(request: NextRequest) {
  // Check if the request is for the admin page
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Get the admin email from environment variables
    const adminEmail = process.env.ADMIN_EMAIL;

    // Get the user's email from the request headers (you'll need to set this up with your auth provider)
    const userEmail = request.headers.get("x-user-email");

    // If no admin email is set or user email doesn't match admin email, redirect to home
    if (!adminEmail || userEmail !== adminEmail) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const adminConfig = {
  matcher: "/admin/:path*",
};
