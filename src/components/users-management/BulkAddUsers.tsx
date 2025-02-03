import React, { useState, useRef } from "react";
import axiosInstance from "@/api/axiosInstance";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BulkUploadResponse {
  success: string[];
  failed: Array<{
    email: string;
    reason: string;
  }>;
}

interface BulkAddUsersProps {
  isOpen: boolean;
  onClose: () => void;
}

const BulkAddUsers: React.FC<BulkAddUsersProps> = ({ isOpen, onClose }) => {
  const [selectedRole, setSelectedRole] = useState<string>("student");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<BulkUploadResponse | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [emails, setEmails] = useState("");

  const handleAddUsers = async () => {
    const emailList = emails.split("\n").filter((email) => email.trim() !== "");
    await axiosInstance.post("/users/bulk-add", { emails: emailList });
    setEmails("");
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && !selectedFile.name.endsWith(".csv")) {
      setError("Please upload a CSV file");
      return;
    }
    setFile(selectedFile || null);
    setError(null);
    setResult(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("role", selectedRole);

      const response = await axiosInstance.post<BulkUploadResponse>(
        "/users/bulk-add-csv",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      setResult(response.data);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setFile(null);
    } catch (err) {
      setError("Failed to upload users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="space-y-4 p-8 border rounded-2xl bg-white w-full max-w-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 w-8 h-8 text-2xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold">Add Users</h2>
        <hr className="my-6" />
        <h3 className="text-lg font-semibold">Add Users by email</h3>
        <div className="flex flex-col">
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
        <hr className="my-6" />
        <h3 className="text-lg font-semibold">Add Users with .csv file</h3>
        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="file"
              onChange={handleFileChange}
              accept=".csv"
              ref={fileInputRef}
              className="block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100"
            />
          </div>

          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="supervisor">Supervisor</SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={handleUpload}
            disabled={!file || loading}
            className="bg-green-500 hover:bg-green-600 rounded-xl"
          >
            {loading ? "Uploading..." : "Upload"}
          </Button>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {result && (
          <div className="mt-4 space-y-2">
            <div className="text-green-600">
              Successfully added: {result.success.length} users
            </div>
            {result.failed.length > 0 && (
              <div className="text-red-600">
                <div>Failed to add:</div>
                <ul className="list-disc pl-5">
                  {result.failed.map((fail, index) => (
                    <li key={index}>
                      {fail.email} - {fail.reason}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BulkAddUsers;