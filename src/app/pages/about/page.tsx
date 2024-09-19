"use client";

import React from "react";
import withAuth from "@/app/modules/components/auth/withAuth";

const aboutPage = () => {
  return <div>About page</div>;
};

export default withAuth(aboutPage);
