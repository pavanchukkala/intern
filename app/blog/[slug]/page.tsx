// Server component: reads markdown from disk and passes plain string to client renderer
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import MarkdownRenderer from "../../../components/MarkdownRenderer";

type Props = {
  params: { slug: string };
};

export default function BlogPage({ params }: Props) {
  const blogPath = path.join(process.cwd(), "public", "blogs", `${params.slug}.md`);

  if (!fs.existsSync(blogPath)) {
    return <div className="p-10 text-center text-xl">Blog not found.</div>;
  }

  // Read markdown file as raw string
  let raw = fs.readFileSync(blogPath, "utf8");

  // Normalize CRLF -> LF (safe guard)
  raw = raw.replace(/\r\n/g, "\n");

  // Parse frontmatter and body reliably (removes YAML frontmatter)
  const parsed = matter(raw);
  let body: string = parsed.content || "";

  // If the md file begins with an H1 that you still want as the page title,
  // extract and remove it so MarkdownRenderer does not show it twice.
  const titleMatch = body.match(/^\s*#\s+(.*)/m);
  const title = titleMatch ? titleMatch[1].trim() : parsed.data.title || params.slug;
  if (titleMatch) {
    // remove only the first H1 line
    body = body.replace(/^\s*#\s+.*(\n|$)/, "");
  }

  // Defensive fix: if body contains literal backslash-n characters (i.e. "\n"),
  // convert them into actual newlines. This resolves cases where content was double-escaped.
  // NOTE: This will convert sequences like "\\n" -> "\n"
  if (body.includes("\\n")) {
    body = body.replace(/\\n/g, "\n");
  }

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-4xl w-full px-6 py-10">
        <h1 className="text-4xl font-bold mb-8">{title}</h1>
        {/* Pass raw markdown body as a plain string to client renderer */}
        <MarkdownRenderer content={body} />
      </div>
    </div>
  );
}
