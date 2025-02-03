"use client";
import config from "@/config";

import React, { useEffect } from "react";
import Image from "next/image";
import LoginForm from "@/components/auth/LoginForm";
import { useAuth } from "@/context/AuthContext";

const LoginPage = () => {
  const { error, clearError } = useAuth();

  useEffect(() => {
    if (error) {
      alert(error);
      clearError();
    }
  }, [error]);

  const handleGoogleLogin = () => {
    window.location.href = `${config.apiBaseUrl}/auth/google/login`;
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
        style={{
          backgroundImage: "url('/assets/illustrations/blue_sea.jpeg')",
        }}
      >
        {/* Transparent Login Box */}
        <LoginForm onGoogleLogin={handleGoogleLogin} />
      </div>
    </div>
  );
};

export default LoginPage;
