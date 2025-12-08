import fs from "fs";
import path from "path";
import MarkdownRenderer from "../../../components/MarkdownRenderer";

export default function BlogPage({ params }) {
  const blogPath = path.join(process.cwd(), "public", "blogs", `${params.slug}.md`);

  if (!fs.existsSync(blogPath)) {
    return <div className="p-10 text-center text-xl">Blog not found.</div>;
  }

  // Read markdown file
  let content = fs.readFileSync(blogPath, "utf-8");

  // Normalize line breaks (prevents \n\n literal text)
  content = content.replace(/\r\n/g, "\n");

  // Extract title (first H1 only)
  const titleMatch = content.match(/^#\s+(.*)/);
  const title = titleMatch ? titleMatch[1].trim() : params.slug;

  // Remove the first H1 from markdown so it's not duplicated
  const cleanedContent = content.replace(/^#\s+.*\n?/, "");

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-4xl w-full px-6 py-10">
        <h1 className="text-4xl font-bold mb-8">{title}</h1>

        {/* Render actual markdown content */}
        <MarkdownRenderer content={cleanedContent} />
      </div>
    </div>
  );
}
