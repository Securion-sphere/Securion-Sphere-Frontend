import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Prism as SyntaxHighlighter,
  SyntaxHighlighterProps,
} from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/esm/styles/prism";
import MarkdownSidebar from "@/components/learning-material/MarkDownSidebar";
import { Header } from "@/app/interface/markdown";

interface MarkdownViewerProps {
  fileUrl: string;
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ fileUrl }) => {
  const [content, setContent] = useState<string>("");
  const [headers, setHeaders] = useState<Header[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      if (!fileUrl) {
        setError("No file URL provided.");
        return;
      }
      try {
        const response = await fetch(fileUrl);
        if (!response.ok) throw new Error("Failed to fetch content");
        const text = await response.text();
        setContent(text);
        extractHeaders(text);
      } catch (err) {
        setError("Failed to load markdown content");
        console.error(err);
      }
    };

    fetchContent();
  }, [fileUrl]);

  const extractHeaders = (markdown: string) => {
    const headers: Header[] = [];
    const lines = markdown.split("\n");
    lines.forEach((line) => {
      const headerMatch = line.match(/^(#{1,6})\s+(.*)/);
      if (headerMatch) {
        const level = headerMatch[1].length;
        const text = headerMatch[2];
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        headers.push({ id, text, level });
      }
    });
    setHeaders(headers);
  };

  if (error) {
    return <div className="text-red-500 p-4 bg-red-50 rounded-md">{error}</div>;
  }

  return (
    <div className="flex">
      <MarkdownSidebar headers={headers} />
      <div className="prose prose-slate max-w-none dark:prose-invert flex-grow p-6">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ node, ...props }) => {
              const text = String(props.children ?? "");
              return (
                <h1
                  id={text.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                  className="text-3xl font-bold mb-4 mt-6"
                  {...props}
                />
              );
            },
            h2: ({ node, ...props }) => {
              const text = String(props.children ?? "");
              return (
                <h2
                  id={text.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                  className="text-2xl font-bold mb-3 mt-5"
                  {...props}
                />
              );
            },
            h3: ({ node, ...props }) => {
              const text = String(props.children ?? "");
              return (
                <h3
                  id={text.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                  className="text-xl font-bold mb-2 mt-4"
                  {...props}
                />
              );
            },
            // Custom link styles
            a: ({ node, ...props }) => (
              <a
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                {...props}
              />
            ),
            // Custom code block with syntax highlighting
            code({
              inline,
              className,
              children,
              ...props
            }: JSX.IntrinsicElements["code"] & { inline?: boolean }) {
              const match = /language-(\w+)/.exec(className || "");
              const language = match ? match[1] : "";

              return !inline && match ? (
                <SyntaxHighlighter
                  style={nord}
                  language={language}
                  PreTag="div"
                  className="rounded-md my-4"
                  showLineNumbers
                  {...(props as SyntaxHighlighterProps)} // Typecasting the props
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code
                  className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5"
                  {...props}
                >
                  {children}
                </code>
              );
            },
            // Custom blockquote styles
            blockquote: ({ node, ...props }) => (
              <blockquote
                className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 my-4 italic"
                {...props}
              />
            ),
            // Custom list styles
            ul: ({ node, ...props }) => (
              <ul className="list-disc pl-6 my-4" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className="list-decimal pl-6 my-4" {...props} />
            ),
            // Custom table styles
            table: ({ node, ...props }) => (
              <div className="overflow-x-auto my-4">
                <table
                  className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
                  {...props}
                />
              </div>
            ),
            th: ({ node, ...props }) => (
              <th
                className="px-4 py-2 bg-gray-50 dark:bg-gray-800"
                {...props}
              />
            ),
            td: ({ node, ...props }) => (
              <td className="px-4 py-2 border-t" {...props} />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default MarkdownViewer;
