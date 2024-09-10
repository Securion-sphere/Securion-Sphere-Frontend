"use client";

import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ProtectedPage = () => {
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

  return <div>Welcome to the protected page!</div>;
};

export default ProtectedPage;
