import React, { useState, useRef } from "react";
import axiosInstance from "@/api/axiosInstance";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { BulkUploadResponse } from "@/app/interface/bulk-upload-response";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    try {
      const emailList = emails
        .split("\n")
        .filter((email) => email.trim() !== "");

      const response = await axiosInstance.post("/user/email-add", {
        emails: emailList,
        role: selectedRole,
      });

      if (response.data.results) {
        const summary = response.data.results
          .map(
            (result: { email: string; status: string }) =>
              `${result.email}: ${result.status}`,
          )
          .join("\n");

        alert(`Results:\n${summary}`);
      }

      setEmails("");
    } catch (error) {
      console.error("Failed to add users:", error);
      alert("Failed to add users. Please try again.");
    }
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
        "/user/bulk-add-csv",
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
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="mt-20 space-y-6 p-8 border rounded-xl bg-white w-full max-w-2xl relative shadow-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 w-8 h-8 text-2xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold">Add Users</h2>
        <hr className="my-6" />

        {/* Add Users by Email */}
        <h3 className="text-lg font-semibold">Add Users by Email</h3>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <textarea
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
              placeholder="Enter emails separated by new lines"
              className="border p-2 w-full rounded-xl"
              rows={4}
            />
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-[180px] rounded-xl">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent className="bg-white rounded-xl">
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="supervisor">Supervisor</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <button
            onClick={handleAddUsers}
            className="bg-[#0aaefd] text-white px-4 py-2 mt-2 rounded-xl hover:bg-[#0078d7] transition"
          >
            Add Users
          </button>
        </div>

        <hr className="my-6" />

        {/* Add Users via CSV */}
        <h3 className="text-lg font-semibold">Add Users with .csv file</h3>
        <div className="flex gap-4 items-center">
          <input
            type="file"
            onChange={handleFileChange}
            accept=".csv"
            ref={fileInputRef}
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <Button
            onClick={handleUpload}
            disabled={!file || loading}
            className="bg-[#0aaefd] hover:bg-[#003465] rounded-xl cursor-pointer text-white px-4 py-2 transition"
          >
            {loading ? "Uploading..." : "Upload"}
          </Button>
        </div>

        {/* Error Message */}
        {error && (
          <Alert variant="destructive" className="rounded-xl">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Upload Results */}
        {result && (
          <div className="mt-6 space-y-4">
            {/* Summary Section */}
            <div className="flex gap-4">
              <Alert
                variant="default"
                className="rounded-xl bg-green-50 border-green-500 text-green-700 flex-1"
              >
                <AlertTitle>Successful</AlertTitle>
                <AlertDescription>
                  {result.summary.successful} users added successfully.
                </AlertDescription>
              </Alert>
              <Alert
                variant="destructive"
                className="rounded-xl bg-red-50 border-red-500 text-red-700 flex-1"
              >
                <AlertTitle>Failed</AlertTitle>
                <AlertDescription>
                  {result.summary.failed} users failed to add.
                </AlertDescription>
              </Alert>
            </div>

            {/* Successful Uploads */}
            {result.results.some((r) => r.status.startsWith("Success")) && (
              <Alert
                variant="default"
                className="bg-green-50 rounded-xl border border-green-200"
              >
                <AlertTitle className="text-green-700">
                  Successful Uploads
                </AlertTitle>
                <AlertDescription className="mt-2 text-green-600 space-y-1 max-h-40 overflow-y-auto">
                  {result.results
                    .filter((r) => r.status.startsWith("Success"))
                    .map((r, i) => (
                      <div key={i} className="text-sm">
                        {r.email}
                      </div>
                    ))}
                </AlertDescription>
              </Alert>
            )}

            {/* Failed Uploads */}
            {result.results.some((r) => r.status.startsWith("Failed")) && (
              <Alert
                variant="destructive"
                className="rounded-xl border border-red-200"
              >
                <AlertTitle className="text-red-700">Failed Uploads</AlertTitle>
                <AlertDescription className="mt-2 text-red-600 space-y-1 max-h-40 overflow-y-auto">
                  {result.results
                    .filter((r) => r.status.startsWith("Failed"))
                    .map((r, i) => (
                      <div key={i} className="text-sm">
                        {r.email}: {r.status.replace("Failed: ", "")}
                      </div>
                    ))}
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BulkAddUsers;
