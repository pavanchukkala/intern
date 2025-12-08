import fs from "fs";
import path from "path";
import MarkdownRenderer from "../../../components/MarkdownRenderer";

export default function BlogPage({ params }) {
  const blogDir = path.join(process.cwd(), "public", "blogs");
  const filePath = path.join(blogDir, `${params.slug}.md`);

  let content = "";
  try {
    content = fs.readFileSync(filePath, "utf-8");
  } catch (err) {
    return (
      <div className="p-10 text-center text-xl">
        Blog not found.
      </div>
    );
  }

  // Extract title (first H1)
  const titleMatch = content.match(/^#\s+(.*)/);
  const title = titleMatch ? titleMatch[1] : params.slug;

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-4xl w-full px-6 py-10">
        <h1 className="text-4xl font-bold mb-8">{title}</h1>
        <MarkdownRenderer content={content} />
      </div>
    </div>
  );
}
