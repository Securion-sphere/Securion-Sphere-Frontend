"use client";

import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownViewerProps {
  fileUrl: string;
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ fileUrl }) => {
  const [content, setContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(fileUrl);
        if (!response.ok) throw new Error('Failed to fetch content');
        const text = await response.text();
        setContent(text);
      } catch (err) {
        setError('Failed to load markdown content');
        console.error(err);
      }
    };

    fetchContent();
  }, [fileUrl]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="prose max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
};

export default MarkdownViewer;