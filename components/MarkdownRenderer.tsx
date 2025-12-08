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
  // Defensive: if the content still contains visible backslash-n sequences,
  // convert them before rendering (this is safe and idempotent).
  if (typeof content === "string" && content.includes("\\n")) {
    content = content.replace(/\\n/g, "\n");
  }

  return (
    <article className="kegth-markdown">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkSlug, [remarkToc, { heading: "Table of contents" }]]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        components={{
          code: CodeBlock,
          img: ({ node, ...props }: any) => (
            <figure className="md-figure">
              <img {...props} loading="lazy" />
              {props.alt && <figcaption>{props.alt}</figcaption>}
            </figure>
          ),
          blockquote: ({ node, ...props }: any) => <blockquote className="md-blockquote" {...props} />,
          h1: ({ node, ...props }: any) => <h1 className="md-h1" {...props} />,
          h2: ({ node, ...props }: any) => <h2 className="md-h2" {...props} />,
          h3: ({ node, ...props }: any) => <h3 className="md-h3" {...props} />,
          table: ({ node, ...props }: any) => <div className="md-table-wrap"><table {...props} /></div>,
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
