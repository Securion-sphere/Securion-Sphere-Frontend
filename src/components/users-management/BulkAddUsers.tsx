import React, { useState } from "react";
import axiosInstance from "@/api/axiosInstance";

const BulkAddUsers: React.FC = () => {
  const [emails, setEmails] = useState("");

  const handleAddUsers = async () => {
    const emailList = emails.split("\n").filter(email => email.trim() !== "");
    await axiosInstance.post("/users/bulk-add", { emails: emailList });
    setEmails("");
    // Optionally, refetch users after adding
  };

  return (
    <div>
      <textarea
        value={emails}
        onChange={(e) => setEmails(e.target.value)}
        placeholder="Enter emails separated by new lines"
        className="border p-2 w-full"
        rows={4}
      />
      <button
        onClick={handleAddUsers}
        className="bg-green-500 text-white px-4 py-2 mt-2 rounded"
      >
        Add Users
      </button>
    </div>
  );
};

export default BulkAddUsers;