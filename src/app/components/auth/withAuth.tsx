"use client"

import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const withAuth = (WrappedComponent: React.ComponentType) => {
  const ComponentWithAuth = (props: any) => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.push('/auth/login');
      }
    }, [user, router]);

    if (!user) {
      return <div>Redirecting to login...</div>;
    }

    // If user is authenticated, render the wrapped component
    return <WrappedComponent {...props} />;
  };

  // Assign a display name to the HOC for better debugging
  ComponentWithAuth.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return ComponentWithAuth;
};

export default withAuth;
