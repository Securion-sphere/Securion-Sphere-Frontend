import React, { useState } from "react";
import LabDetail from "../components/LabDetail";
import Labs, { Lab } from "../components/Labs";

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-600 mt-8">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-white">© 2024 SecurionSphere</p>
      </div>
    </footer>
  );
};

export default Footer;
