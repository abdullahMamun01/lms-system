
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./actions/auth.action";

// This function can be marked `async` if using `await` inside
const public_routes = ["/", "/signin", "/signup"];

export async function middleware(request: NextRequest) {
  const currentUser = await getCurrentUser();
  const pathname = request.nextUrl.pathname;
  console.log(pathname , ' path' , )
  const isPublicRoute = public_routes.some((route) => route === pathname) 
  const adminRoutes = pathname.startsWith('/dashboard')
    console.log(adminRoutes , currentUser?.role)
  if (!currentUser && !isPublicRoute){
    return NextResponse.redirect(new URL("/signin", request.url));
  }else if(currentUser && currentUser.role === 'USER' && adminRoutes){
    return NextResponse.redirect(new URL("/", request.url));
  }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher:
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
};