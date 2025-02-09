// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const authToken = request.cookies.get('accessToken')?.value;
  const onboardingStep = request.cookies.get('onboardingStep')?.value;
  const path = request.nextUrl.pathname;

  // Define routes
  const protectedRoutes = [
    '/dashboard',
    '/media-kit',
    '/complete-media-kit',
    '/edit-media-kit',
    '/growth-trends',
    '/media-kit-analytics',
    '/inbox',
    '/profile',
    '/send-feedback',
    '/welcome',
  ];

  const authRoutes = ['/auth/login', '/auth/register'];
  
  // Social connect page is not in onboardingPaths since it's optional
  const onboardingPaths = {
    1: '/auth/register/personal',
    2: '/auth/register/profession',
    4: '/auth/register/congratulations'
  };

  // 1. Check if user is authenticated and trying to access main auth routes
  if (authToken && authRoutes.some(route => path === route)) {
    if (onboardingStep && onboardingStep !== 'completed') {
      return NextResponse.redirect(new URL(onboardingPaths[onboardingStep], request.url));
    }
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 2. Allow public routes
  if (path === '/') {
    return NextResponse.next();
  }

  // 3. No auth token -> redirect to register
  if (!authToken) {
    if (authRoutes.some(route => path === route)) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/auth/register', request.url));
  }

  // 4. Always allow access to social connect page if authenticated
  if (path === '/auth/register/connect-socials') {
    return NextResponse.next();
  }

  // 5. Handle onboarding paths
  const currentStepNumber = parseInt(onboardingStep);
  const isOnboardingPath = Object.values(onboardingPaths).includes(path);

  if (isOnboardingPath) {
    // Allow access to congratulations page after profession (step 2)
    if (path === '/auth/register/congratulations' && currentStepNumber >= 2) {
      return NextResponse.next();
    }

    // For other onboarding paths, check step number
    const attemptedStepNumber = parseInt(
      Object.entries(onboardingPaths).find(([, routePath]) => routePath === path)?.[0]
    );

    if (attemptedStepNumber <= currentStepNumber) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL(onboardingPaths[currentStepNumber], request.url));
  }

  // 6. Handle protected routes during onboarding
  if (onboardingStep && onboardingStep !== 'completed') {
    if (protectedRoutes.some(route => path.startsWith(route))) {
      return NextResponse.redirect(new URL(onboardingPaths[currentStepNumber], request.url));
    }
  }

  // 7. Completed onboarding
  if (onboardingStep === 'completed') {
    if (isOnboardingPath) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    
    if (protectedRoutes.some(route => path.startsWith(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|favicon.ico).*)',
  ]
};