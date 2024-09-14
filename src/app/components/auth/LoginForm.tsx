import React from 'react';
import Image from 'next/image';

const LoginForm = ({ onGoogleLogin }: { onGoogleLogin: () => void }) => {
  return (
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
        onClick={onGoogleLogin}
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
  );
};

export default LoginForm;
