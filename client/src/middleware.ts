import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./actions/auth.action";

const publicRoutes = ["/", "/signin", "/signup", "/courses"];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const currentUser = await getCurrentUser();



  const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith(route));
  const isAdminRoute = pathname.startsWith('/dashboard');
  const isCourseDetailRoute = /^\/courses\/[^/]+$/.test(pathname);

  const isLectureRoute = /^\/courses\/[^/]+\/lectures(\/[^/]*)?$/.test(pathname);

  if (!currentUser && !isPublicRoute && !isCourseDetailRoute) {
   
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (isLectureRoute && !currentUser) {
 
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (currentUser?.role === 'USER' && isAdminRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher:
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
};
