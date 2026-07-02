import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

const isProtectedRoute = createRouteMatcher([
  '/(en|zu|af|xh)/profile(.*)',
  '/(en|zu|af|xh)/matches(.*)',
  '/(en|zu|af|xh)/admin(.*)'
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
  
  // White-labeling logic: Extract tenant domain from the request
  const hostname = req.headers.get("host") || "";
  let tenantConfig = "default";
  
  // For example: if (hostname.includes("schoolname.bursaryfinder.co.za"))
  // We can attach a custom header to pass the tenant context to the Next.js app
  const response = intlMiddleware(req);
  response.headers.set('x-tenant-domain', hostname);
  
  return response;
});

export const config = {
  // Match only internationalized pathnames and api routes, avoiding static files
  matcher: [
    '/((?!.*\\..*|_next).*)', 
    '/', 
    '/(api|trpc)(.*)',
    '/__clerk/:path*'
  ],
};
