"use client";

import React from "react";
import EditLabPage from "./EditLabPage";
import withAuth from "@/components/auth/withAuth";

const EditLabPageWrapper = (props: { params: { lab_id: number } }) => {
  return <EditLabPage {...props} />;
};

export default withAuth(EditLabPageWrapper);
