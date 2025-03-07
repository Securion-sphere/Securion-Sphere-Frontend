"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
) => {
  const ComponentWithAuth = (props: P) => {
    const { user, loading } = useAuth();
    const router = useRouter();
    const isDevelopmentBypass =
      process.env.NEXT_PUBLIC_DEV_AUTH_BYPASS === "true";

    useEffect(() => {
      if (loading) return; // Wait until loading completes

      const accessToken = localStorage.getItem("accessToken");

      if (isDevelopmentBypass) {
        return;
      }

      if (!accessToken) {
        router.push("/auth/login");
      }
    }, [user, router, isDevelopmentBypass, loading]);

    if (loading) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  ComponentWithAuth.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return ComponentWithAuth;
};

export default withAuth;
