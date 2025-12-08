"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import rehypeRaw from "rehype-raw";
import remarkToc from "remark-toc";
import remarkSlug from "remark-slug";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

function CodeBlock({ node, inline, className, children, ...props }: any) {
  const match = /language-(\w+)/.exec(className || "");
  return !inline && match ? (
    <SyntaxHighlighter style={vscDarkPlus} language={match[1]} PreTag="div" {...props}>
      {String(children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
}

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <article className="kegth-markdown">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkSlug, remarkToc]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        components={{
          code: CodeBlock,
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
