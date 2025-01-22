"use client";

import React from "react";
import { useRouter } from "next/navigation";

const Sidebar = () => {
    const router = useRouter();
  
    return (
      <aside className="w-1/4 self-stretch bg-white shadow-lg p-6">
        <h1 className="text-xl font-bold mb-6">Monitor & Control</h1>
        <div></div>
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => router.push("/monitor")}
              className="text-blue-600 font-medium"
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              onClick={() => router.push("/monitor/labs")}
              className="text-blue-600 font-medium"
            >
              Labs
            </button>
          </li>
          <li>
            <button
              onClick={() => router.push("/monitor/create-lab")}
              className="text-blue-600 font-medium"
            >
              Create Labs
            </button>
          </li>
          <li>
            <button
              onClick={() => router.push("/monitor/learning-modules")}
              className="text-blue-600 font-medium"
            >
              Learning Modules
            </button>
          </li>
          <li>
            <button
              onClick={() => router.push("/monitor/users-management")}
              className="text-blue-600 font-medium"
            >
              Users Management
            </button>
          </li>
        </ul>
        <hr className="my-6" />
      </aside>
    );
  };

  export default Sidebar;