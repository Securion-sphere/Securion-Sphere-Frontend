// loginpage.tsx
"use client";

import React from 'react';
import Image from 'next/image';
import { useAuth } from '@/app/context/AuthContext';
import config from '@/config';

const LoginPage = () => {
  const { login } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      // Redirect to backend for Google login
      window.location.href = `${config.apiBaseUrl}/auth/google/login`;
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Panel */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white">
        <div className="mb-4">
          <Image
            src="/assets/images/SecurionSphere_logo.png"
            alt="SecurionSphere Logo"
            width={480}
            height={480}
          />
        </div>
      </div>

      {/* Right Panel (Login Form) */}
      <div
        className="flex-1 flex justify-center items-center bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/illustrations/blue_sea.jpeg')" }}
      >
        <button onClick={handleGoogleLogin} className="bg-blue-500 text-white px-4 py-2">
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
