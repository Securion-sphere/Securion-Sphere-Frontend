"use client";

import React, { useState } from "react";
import withAuth from "@/app/components/auth/withAuth";

const CreateLabPage = () => {
  const [labName, setLabName] = useState('');
  const [labDescription, setLabDescription] = useState('');

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate the form fields
    if (!labName || !labDescription) {
      alert("Please fill in all required fields.");
      return;
    }

    // Prepare the data for submission
    const labData = {
      labName,
      labDescription,
    };

    console.log("Lab data submitted:", labData);

    // Simulate a save operation
    alert("Lab created successfully!");

    // Optionally reset the form
    setLabName('');
    setLabDescription('');
  };

  return (
    <div className="flex flex-col h-full bg-gray-100">
      <main className="p-8">
        <div className="text-gray-700">
          <h1 className="text-2xl font-bold mb-4">Basic Configuration</h1>
          <p className="mb-4">
            Create the lab with a customized environment from your preferred choices.
          </p>
          <form onSubmit={handleSave} className="space-y-6">
            {/* Lab Name */}
            <div>
              <label className="block text-gray-700" htmlFor="labName">
                Lab Name
              </label>
              <input
                type="text"
                id="labName"
                value={labName}
                onChange={(e) => setLabName(e.target.value)}
                className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Lab Description */}
            <div>
              <label className="block text-gray-700" htmlFor="labDescription">
                Lab Description
              </label>
              <textarea
                id="labDescription"
                value={labDescription}
                onChange={(e) => setLabDescription(e.target.value)}
                className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                rows={4}
                required
              />
            </div>

            {/* Lab's Template */}
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-2">Choose your lab’s template</h2>
              <p className="text-sm text-gray-600 mb-4">
                Choose the template of your choice to generate the playground.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Type of attack <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full border border-gray-300 rounded-md p-2">
                    <option>Choose a type of attack to generate</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Template <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full border border-gray-300 rounded-md p-2">
                    <option>Choose a template</option>
                  </select>
                </div>
              </div>

              {/* File Upload */}
              <div className="mt-6">
                <label className="block text-sm font-medium mb-2">
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
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-2">Advance Setting (Optional)</h2>
              <p className="text-sm text-gray-600 mb-4">
                Customize your challenge’s environment by yourself.
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select className="w-full border border-gray-300 rounded-md p-2">
                    <option>
                      Choose a web application category to generate your template
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Language</label>
                  <select className="w-full border border-gray-300 rounded-md p-2">
                    <option>Specify a programming language for your challenge</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">DBMS</label>
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
                className="px-6 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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
