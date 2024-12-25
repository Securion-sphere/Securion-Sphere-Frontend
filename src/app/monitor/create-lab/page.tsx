"use client";

import React, { useState } from "react";
import withAuth from "@/components/auth/withAuth";

const CreateLabPage = () => {
  const [labName, setLabName] = useState<string>("");
  const [labDescription, setLabDescription] = useState<string>("");
  const [labPoint, setLabPoint] = useState<number>(0);
  const [assignee, setAssignee] = useState<string>("");
  const [availableFrom, setAvailableFrom] = useState<string>("");
  const [closeOn, setCloseOn] = useState<string>("");

  const handlePointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/^0+/, "");
    setLabPoint(value === "" ? 0 : parseInt(value, 10));
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !labName ||
      !labDescription ||
      !assignee ||
      !availableFrom ||
      !closeOn
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const labData = {
      labName,
      labDescription,
      labPoint,
      assignee,
      availableFrom,
      closeOn,
    };

    console.log("Lab data submitted:", labData);
    alert("Lab created successfully!");

    // Reset form
    setLabName("");
    setLabDescription("");
    setLabPoint(0);
    setAssignee("");
    setAvailableFrom("");
    setCloseOn("");
  };

  return (
    <div className="flex flex-col h-full bg-gray-100">
      <main className="py-8">
        <div className="text-gray-700 max-w-5xl mx-auto p-6">
          <h1 className="text-2xl font-bold mb-4 text-center">
            Basic Configuration
          </h1>
          <p className="mb-4 text-center text-xl">
            Create the lab with a customized environment from your preferred
            choices.
          </p>
          <form onSubmit={handleSave} className="space-y-6">
            {/* Lab Name */}
            <div>
              <label
                className="block text-gray-700 text-xl font-bold"
                htmlFor="labName"
              >
                Lab Name
              </label>
              <input
                type="text"
                id="labName"
                placeholder="Enter your lab's name"
                value={labName}
                onChange={(e) => setLabName(e.target.value)}
                className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Lab Description */}
            <div>
              <label
                className="block text-gray-700 text-xl font-bold"
                htmlFor="labDescription"
              >
                Lab Description
              </label>
              <textarea
                id="labDescription"
                value={labDescription}
                placeholder="Describe about your lab"
                onChange={(e) => setLabDescription(e.target.value)}
                className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                rows={4}
                required
              />
            </div>

            {/* Lab Points */}
            <div>
              <label
                className="block text-gray-700 text-xl font-bold"
                htmlFor="labPoint"
              >
                Lab Points
              </label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="0"
                pattern="[0-9]*"
                id="labPoint"
                value={labPoint || ""}
                onChange={handlePointChange}
                min="0"
                className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Assignee */}
            <div>
              <label
                className="block text-gray-700 text-xl font-bold"
                htmlFor="assignee"
              >
                Assignee <span className="text-red-500">*</span>
              </label>
              <select className="w-full border border-gray-300 rounded-md p-2">
                <option>
                  Which your student&apos;s group are you going to assign?
                </option>
              </select>
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Available From */}
              <div>
                <label
                  className="block text-gray-700 text-xl font-bold"
                  htmlFor="availableFrom"
                >
                  Available From
                </label>
                <input
                  type="date"
                  id="availableFrom"
                  value={availableFrom}
                  onChange={(e) => setAvailableFrom(e.target.value)}
                  className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* Close on */}
              <div>
                <label
                  className="block text-gray-700 text-xl font-bold"
                  htmlFor="closeOn"
                >
                  Close on
                </label>
                <input
                  type="date"
                  id="closeOn"
                  value={closeOn}
                  onChange={(e) => setCloseOn(e.target.value)}
                  className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>

            {/* Lab's Template */}
            <div className="mt-8 pt-6">
              <h2 className="text-2xl font-bold mb-2 text-center">
                Choose your lab’s template
              </h2>
              <p className="text-xl text-gray-600 mb-4 text-center">
                Choose the template of your choice to generate the playground.
              </p>
              <div className="grid grid-row-2 gap-4">
                <div>
                  <label className="block text-xl font-bold mb-1">
                    Type of attack <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full border border-gray-300 rounded-md p-2">
                    <option>Choose a type of attack to generate</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xl font-bold mb-1">
                    Template <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full border border-gray-300 rounded-md p-2">
                    <option>Choose a template</option>
                  </select>
                </div>
              </div>

              {/* File Upload */}
              <div className="mt-6">
                <label className="block text-xl font-bold mb-2">
                  Upload .tar docker image file
                </label>
                <input
                  type="file"
                  accept=".tar"
                  className="block w-full border border-gray-300 rounded-md p-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                />
              </div>
            </div>

            {/* Advanced Setting */}
            <div className="mt-8 pt-6">
              <h2 className="text-2xl font-bold mb-2 text-center">
                Advance Setting (Optional)
              </h2>
              <p className="text-xl text-gray-600 mb-4 text-center">
                Customize your challenge’s environment by yourself.
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-xl font-bold mb-1">
                    Category
                  </label>
                  <select className="w-full border border-gray-300 rounded-md p-2">
                    <option>
                      Choose a web application category to generate your
                      template
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block text-xl font-bold mb-1">
                    Language
                  </label>
                  <select className="w-full border border-gray-300 rounded-md p-2">
                    <option>
                      Specify a programming language for your challenge
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block text-xl font-bold mb-1">DBMS</label>
                  <select className="w-full border border-gray-300 rounded-md p-2">
                    <option>Specify a dbms for your challenge</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => console.log("Cancel clicked")}
                className="px-6 py-2 border border-gray-300 rounded-2xl bg-white hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-2xl hover:bg-blue-700"
              >
                Create Lab
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default withAuth(CreateLabPage);
