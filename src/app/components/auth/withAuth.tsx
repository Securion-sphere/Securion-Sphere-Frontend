"use client"

import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const withAuth = (WrappedComponent: React.ComponentType) => {
  const ComponentWithAuth = (props: any) => {
    const { user } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
      const accessToken = localStorage.getItem('AccessToken');
      
      // If no token in localStorage, redirect to login
      if (!accessToken) {
        router.push('/auth/login');
        return;
      }

      // If token exists, we assume user is authenticated and stop loading
      if (user || accessToken) {
        setLoading(false); // Stop loading once we have a token or user
      }
    }, [user, router]);

    // Show a loading state until we know whether user is authenticated
    if (loading) {
      return <div>Loading...</div>;
    }

    // Render the component if authenticated (user exists or token is found)
    return <WrappedComponent {...props} />;
  };

  ComponentWithAuth.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return ComponentWithAuth;
};

export default withAuth;
