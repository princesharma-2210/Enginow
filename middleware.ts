import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = [
  '/',
  '/about',
  '/contact',
  '/jobs',
  '/training',
  '/courses',
  '/learn',
  '/blog',
];

export default clerkMiddleware((reqOrContext: NextRequest | any) => {
  // If it's a raw NextRequest, use it directly
  const request: NextRequest = 'nextUrl' in reqOrContext ? reqOrContext : reqOrContext.request;
  const auth = 'auth' in reqOrContext ? reqOrContext.auth : reqOrContext.auth || {};

  // Safety check
  if (!request?.nextUrl) {
    return NextResponse.next();
  }

  const path = request.nextUrl.pathname;

  // Allow access to public routes
  if (publicRoutes.some(route => path === route || path.startsWith(route + '/'))) {
    return NextResponse.next();
  }

  // Redirect to sign-in if not authenticated
  if (!auth.userId) {
    const signInUrl = `/sign-in?redirect_url=${encodeURIComponent(request.url)}`;
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/dashboard',
    '/training/enroll/:programId*',
    '/job/enroll/:jobId*',
    '/courses/enroll:courseId*',

    // Exclude static files & API routes
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
