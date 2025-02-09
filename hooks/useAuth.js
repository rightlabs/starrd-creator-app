'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';

export function useAuth({ 
  redirectTo = '/auth/login',
  redirectIfFound = false
} = {}) {
  const router = useRouter();
  const [cookies] = useCookies(['accessToken', 'onboardingStep']);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const hasToken = !!cookies.accessToken;
        
        // Handle onboarding flow
        if (hasToken && cookies.onboardingStep !== 'completed') {
          router.replace('/auth/register/personal');
          return;
        }

        // Redirect authenticated users away from auth pages
        if (hasToken && redirectIfFound) {
          router.replace('/dashboard');
          return;
        }

        // Redirect unauthenticated users to login
        if (!hasToken && !redirectIfFound) {
          router.replace(redirectTo);
          return;
        }

        setIsAuthenticated(hasToken);
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [cookies.accessToken, cookies.onboardingStep, redirectIfFound, redirectTo, router]);

  return { isAuthenticated, isLoading };
}