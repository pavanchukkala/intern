import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import rehypeRaw from "rehype-raw";
import remarkToc from "remark-toc";
import remarkSlug from "remark-slug";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {vscDarkPlus} from 'react-syntax-highlighter/dist/esm/styles/prism';

type Props = {
  content: string;
};

function CodeBlock({node, inline, className, children, ...props}: any) {
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

export default function MarkdownRenderer({content}: Props) {
  return (
    <article className="kegth-markdown">
      <ReactMarkdown
        children={content}
        remarkPlugins={[remarkGfm, remarkSlug, [remarkToc, {heading: "Table of contents"}]]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        components={{
          code: CodeBlock,
          img: ({node, ...props}: any) => (
            <figure className="md-figure">
              <img {...props} loading="lazy" />
              {props.alt && <figcaption>{props.alt}</figcaption>}
            </figure>
          ),
          blockquote: ({node, ...props}: any) => <blockquote className="md-blockquote" {...props} />,
          h1: ({node, ...props}: any) => <h1 className="md-h1" {...props} />,
          h2: ({node, ...props}: any) => <h2 className="md-h2" {...props} />,
          h3: ({node, ...props}: any) => <h3 className="md-h3" {...props} />,
          table: ({node, ...props}: any) => (
            <div className="md-table-wrap"><table {...props} /></div>
          )
        }}
      />

      <style jsx>{`
        .kegth-markdown { max-width: 820px; margin: 0 auto; padding: 28px; font-family: Inter, sans-serif; line-height: 1.75; color: #0f1724; }
        .md-h1 { font-size: 2.3rem; margin-top: 1.5rem; margin-bottom: 1rem; }
        .md-h2 { font-size: 1.7rem; margin-top: 1.3rem; margin-bottom: 0.8rem; }
        .md-h3 { font-size: 1.25rem; margin-top: 1rem; margin-bottom: 0.5rem; }
        p { margin: 0.9rem 0; }
        .md-blockquote { border-left: 4px solid #0b69ff; padding: 12px 16px; background: #f7faff; border-radius: 6px; margin: 1.2rem 0; }
        .md-figure img { max-width: 100%; border-radius: 8px; }
        .md-figure figcaption { font-size: 0.9rem; opacity: 0.7; margin-top: 0.3rem; }
        pre { border-radius: 8px; padding: 12px; overflow: auto; }
        code { background: #f2f2f2; padding: 3px 6px; border-radius: 4px; }
        .md-table-wrap { overflow:auto; margin: 1rem 0; }
      `}</style>
    </article>
  );
}
