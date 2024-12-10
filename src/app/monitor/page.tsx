"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const MonitorPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (window.location.pathname === "/monitor") {
      router.push("/monitor/dashboard");
    }
  }, [router]);

  return (
    <div></div>
  );
};

export default MonitorPage;
