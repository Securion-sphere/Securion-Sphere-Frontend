"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const MonitorPage = () => {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.supervisor) {
      router.push("/");
    } else if (window.location.pathname === "/monitor") {
      router.push("/monitor/dashboard");
    }
  }, [router, user]);

  return <div></div>;
};

export default MonitorPage;
