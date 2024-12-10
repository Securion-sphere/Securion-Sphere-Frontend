'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import withAuth from '@/app/components/auth/withAuth'

interface Module {
  id: number;
  title: string;
  description: string;
  content: string;
  pdfUrl: string;
}

const LearningModules = () => {
  const router = useRouter(); // Correct way to get the router instance

  // Mocked learning modules data with content
  const [modules, setModules] = useState<Module[]>([
    { 
      id: 1, 
      title: 'Introduction to Penetration Testing', 
      description: 'Learn the basics of penetration testing and ethical hacking.',
      content: 'This module covers the fundamental concepts of penetration testing, including...',
      pdfUrl: 'https://eledu.ssru.ac.th/thanatyod_ja/pluginfile.php/1761/block_html/content/PrintMath2560%20-Edit.pdf', // PDF URL
    },
    { 
      id: 2, 
      title: 'Web Application Security', 
      description: 'Deep dive into web application security vulnerabilities and exploits.',
      content: 'In this module, we explore common web application vulnerabilities...',
      pdfUrl: '/path/to/web-application-security.pdf', // PDF URL
    },
    { 
      id: 3, 
      title: 'Advanced Exploitation Techniques', 
      description: 'Master advanced techniques for exploiting systems and applications.',
      content: 'This advanced module covers exploit development, privilege escalation...',
      pdfUrl: '/path/to/advanced-exploitation-techniques.pdf', // PDF URL
    },
  ]);

  const [selectedModule, setSelectedModule] = useState<number | null>(null);

  const handleEdit = (moduleId: number) => {
    // Logic to handle editing a module (e.g., navigate to an edit page)
    alert(`Edit module with ID: ${moduleId}`);
  };

  const handleDelete = (moduleId: number) => {
    // Logic to handle deleting a module
    setModules(modules.filter(module => module.id !== moduleId));
    alert(`Deleted module with ID: ${moduleId}`);
  };

  const handleModuleClick = (moduleId: number) => {
    const learning_module = modules.find(mod => mod.id === moduleId);
    if (learning_module) {
      // Redirect to the PDF viewing page, passing the PDF URL as a query param
      router.push(`/monitor/view-pdf?pdfUrl=${encodeURIComponent(learning_module.pdfUrl)}`);
    }
  };

  const handleUploadNewMaterial = () => {
    // Redirect to the upload new material page
    router.push('/monitor/learning-modules/upload');
  };

  return (
    <div className="text-gray-700">
      <h1 className="text-2xl font-bold mb-4">Learning Modules</h1>
      <p>Welcome to the Learning Modules</p>

      <div className="mt-8">
        <ul className="space-y-4">
          {modules.map((module) => (
            <li key={module.id} className="border-b border-gray-300 pb-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2
                    className="text-xl font-semibold cursor-pointer hover:text-blue-600"
                    onClick={() => handleModuleClick(module.id)} // Handle click to toggle content
                  >
                    {module.title}
                  </h2>
                  <p className="text-sm text-gray-600">{module.description}</p>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleEdit(module.id)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(module.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Toggleable content for the module */}
              {selectedModule === module.id && (
                <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-md">
                  <h3 className="text-lg font-semibold">Module Content</h3>
                  <p>{module.content}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Upload New Material Button */}
      <div className="mt-8 text-center">
        <button
          onClick={handleUploadNewMaterial}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          + Upload New Material
        </button>
      </div>
    </div>
  );
}

export default withAuth(LearningModules);
