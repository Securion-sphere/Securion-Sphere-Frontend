"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/app/context/AuthContext';

const CallbackPage = () => {
  const { login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      login(token);
      router.push('/'); // Redirect to home after login
    }
  }, [login, router]);

  return <div>Logging you in...</div>;
};

export default CallbackPage;
