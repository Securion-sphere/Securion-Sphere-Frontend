import React from "react";
import Image from "next/image";

const LoginForm = ({ onGoogleLogin }: { onGoogleLogin: () => void }) => {
  return (
    <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-lg w-96">
      <h2 className="text-2xl font-semibold mb-6 text-white">
        Login an account
      </h2>

      <p className="text-white text-left mb-6">
        Sign in with Google (KMITL accounts only).
      </p>

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
    </div>
  );
};

export default LoginForm;
