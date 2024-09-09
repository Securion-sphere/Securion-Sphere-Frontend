"use client";

import React from "react";
import Image from "next/image";

const LoginPage: React.FC = () => {
  const handleGoogleLogin = () => {
    // Redirect user to Google OAuth authentication
    window.location.href = "/api/auth/google"; // Adjust according to your OAuth flow
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
        }} // Replace with your actual background image path
      >
        {/* Transparent Login Box */}
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-semibold mb-6 text-white">
            Create an account
          </h2>

          <p className="text-white text-center mb-6">
            Enter your email below to create your account
          </p>

          {/* Input Field */}
          <input
            type="email"
            placeholder="name@example.com"
            className="w-full p-2 mb-4 border border-gray-300 rounded bg-white text-gray-900 focus:outline-none"
          />

          {/* Sign in with Email Button */}
          <button className="w-full bg-blue-950 text-white hover:bg-red-600 font-semibold py-2 px-4 rounded transition duration-100">
            Sign In with Email
          </button>

          <div className="flex items-center justify-center my-6">
            <hr className="flex-grow border-white" />
            <span className="mx-2 text-white text-sm">OR CONTINUE WITH</span>
            <hr className="flex-grow border-white" />
          </div>

          {/* Google OAuth Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-blue-950 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded flex items-center justify-center"
          >
            <Image
              src="/assets/icons/google.png"
              alt="Google Icon"
              width={24}
              height={24}
              className="mr-2"
            />
            Sign in with Google
          </button>

          {/* Registration Prompt */}
          <p className="text-sm text-center mt-4 text-white">
            Don&apos;t have an account yet?{" "}
            <a href="/register" className="text-blue-300 hover:underline">
              Register for free
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
