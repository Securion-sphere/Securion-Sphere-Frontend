"use client";

import React from "react";
import EditModulePage from "./EditModulePage";
import withAuth from "@/app/components/auth/withAuth";

const EditModulePageWrapper = (props: any) => {
  return <EditModulePage {...props} />;
};

export default withAuth(EditModulePageWrapper);
