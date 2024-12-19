'use client'
import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Document, Page } from 'react-pdf';

// Component to display the PDF
const ViewPdfPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pdfUrl = searchParams.get('pdfUrl'); // Get the PDF URL from the query params

  if (!pdfUrl) {
    console.log("No pdf url found");
    return <p>No PDF URL provided.</p>;
  }

  return (
    <div className="flex justify-center items-center p-8">
      <div className="w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-4">Learning Material</h1>

        {/* PDF Viewer */}
        <Document file={pdfUrl}>
          <Page pageNumber={1} />
        </Document>
      </div>
    </div>
  );
};

export default ViewPdfPage;
