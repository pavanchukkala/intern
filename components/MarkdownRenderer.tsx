"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none prose-img:rounded-lg prose-img:shadow-lg prose-headings:scroll-mt-20 prose-headings:font-bold prose-p:text-[17px] prose-p:leading-7 prose-li:text-[17px] prose-li:leading-7 prose-table:text-[16px] prose-pre:bg-neutral-900 prose-pre:text-neutral-100 prose-strong:font-semibold">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSanitize]}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
