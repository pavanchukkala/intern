import fs from "fs";
import path from "path";
import matter from "gray-matter";
import MarkdownRenderer from "../../../components/MarkdownRenderer";
import Link from "next/link";

type Props = { params: { slug: string } };

function getAllBlogSlugs() {
  const blogDir = path.join(process.cwd(), "public", "blogs");
  if (!fs.existsSync(blogDir)) return [];
  return fs.readdirSync(blogDir)
    .filter(f => f.endsWith(".md"))
    // stable ordering: alphabetical by filename (you can change to date if you add frontmatter.date)
    .sort((a, b) => a.localeCompare(b))
    .map(f => f.replace(/\.md$/, ""));
}

export default function BlogPage({ params }: Props) {
  const blogDir = path.join(process.cwd(), "public", "blogs");
  const filePath = path.join(blogDir, `${params.slug}.md`);
  if (!fs.existsSync(filePath)) {
    return <div className="p-10 text-center text-xl">Blog not found.</div>;
  }

  // read raw file and parse frontmatter
  let raw = fs.readFileSync(filePath, "utf8");
  raw = raw.replace(/\r\n/g, "\n");
  const parsed = matter(raw);
  let body: string = parsed.content || "";
  // remove first H1 if present so we don't duplicate title
  const titleMatch = body.match(/^\s*#\s+(.*)/m);
  const title = titleMatch ? titleMatch[1].trim() : (parsed.data.title || params.slug);
  if (titleMatch) body = body.replace(/^\s*#\s+.*(\n|$)/, "");

  // defensive convert escaped newline sequences if any
  if (body.includes("\\n")) body = body.replace(/\\n/g, "\n");

  // compute previous and next
  const slugs = getAllBlogSlugs();
  const idx = slugs.indexOf(params.slug);
  const prev = idx > 0 ? slugs[idx - 1] : null;
  const next = idx >= 0 && idx < slugs.length - 1 ? slugs[idx + 1] : null;

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-4xl w-full px-6 py-10">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/blog" className="text-sm hover:underline">← Back to Blog</Link>
          <div className="text-sm text-muted-foreground">Read time: ~10–15 mins</div>
        </div>

        <h1 className="text-4xl font-bold mb-6">{title}</h1>

        <MarkdownRenderer content={body} />

        {/* prev/next navigation */}
        <nav className="mt-12 border-t pt-6 flex items-center justify-between gap-4">
          {prev ? (
            <Link href={`/blog/${prev}`} className="flex-1 border rounded p-4 hover:shadow">
              <div className="text-xs text-muted-foreground">Previous</div>
              <div className="font-semibold truncate">{prev.replace(/-/g, ' ')}</div>
            </Link>
          ) : <div />}

          {next ? (
            <Link href={`/blog/${next}`} className="flex-1 border rounded p-4 text-right hover:shadow">
              <div className="text-xs text-muted-foreground">Next</div>
              <div className="font-semibold truncate">{next.replace(/-/g, ' ')}</div>
            </Link>
          ) : <div />}
        </nav>
      </div>
    </div>
  );
}
