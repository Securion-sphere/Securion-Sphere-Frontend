"use client"

import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const withAuth = (WrappedComponent: React.ComponentType) => {
  const ComponentWithAuth = (props: any) => {
    const { user } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    // Add a development bypass flag
    const isDevelopmentBypass = process.env.NEXT_PUBLIC_DEV_AUTH_BYPASS === 'true';

    useEffect(() => {
      const accessToken = localStorage.getItem('AccessToken');
      
      // If development bypass is enabled, skip authentication
      if (isDevelopmentBypass) {
        setLoading(false);
        return;
      }

      // Existing authentication logic
      if (!accessToken) {
        router.push('/auth/login');
        return;
      }

      if (user || accessToken) {
        setLoading(false);
      }
    }, [user, router, isDevelopmentBypass]);

    // Show a loading state until we know whether user is authenticated
    if (loading) {
      return <div>Loading...</div>;
    }

    // Render the component if authenticated or in dev bypass mode
    return <WrappedComponent {...props} />;
  };

  ComponentWithAuth.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return ComponentWithAuth;
};

export default withAuth;