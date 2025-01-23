"use client";

import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const ComponentWithAuth = (props: P) => {
    const { user } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    const isDevelopmentBypass = process.env.NEXT_PUBLIC_DEV_AUTH_BYPASS === 'true';

    useEffect(() => {
      const accessToken = localStorage.getItem('AccessToken');

      if (isDevelopmentBypass) {
        setLoading(false);
        return;
      }

      if (!accessToken) {
        router.push('/auth/login');
        return;
      }

      if (user || accessToken) {
        setLoading(false);
      }
    }, [user, router, isDevelopmentBypass]);

    if (loading) {
      return <div>Loading...</div>;
    }

    // Forward all props to the wrapped component
    return <WrappedComponent {...props} />;
  };

  ComponentWithAuth.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return ComponentWithAuth;
};

export default withAuth;
