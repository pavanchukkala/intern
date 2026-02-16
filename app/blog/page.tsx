import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

function getAllBlogs() {
  const blogDir = path.join(process.cwd(), "public", "blogs");
  if (!fs.existsSync(blogDir)) return [];

  return fs.readdirSync(blogDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const fullPath = path.join(blogDir, file);
      const raw = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(raw);

      // Extract title from first H1 if no frontmatter title
      let title = data.title;
      if (!title) {
        const match = content.match(/^#\s+(.*)/);
        title = match ? match[1].trim() : file.replace(/\.md$/, "");
      }

      // Create short excerpt for preview
      const excerpt = content
        .replace(/^#\s+.*\n?/, "")       // remove title
        .replace(/\n+/g, " ")
        .slice(0, 160) + "...";

      return {
        slug: file.replace(".md", ""),
        title,
        excerpt,
        image: data.image || `https://placehold.co/800x400?text=${encodeURIComponent(title)}`,
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title)); // alphabetical
}

export default function BlogIndexPage() {
  const blogs = getAllBlogs();

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-10">Explore All Blogs</h1>

      {blogs.length === 0 && (
        <div className="text-muted-foreground">No blogs found.</div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <Link
            key={blog.slug}
            href={`/blog/${blog.slug}`}
            className="group border rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white dark:bg-neutral-900"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-40 object-cover"
            />

            <div className="p-5">
              <h2 className="text-xl font-semibold group-hover:underline mb-2">
                {blog.title}
              </h2>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {blog.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <div id="7SAD1569931DB11B66E" data-7pub="7SAD1569931DB11B66E"></div>
                      <script src="https://code.adclickppc.com/7s-banner-ad.js"></script>
                      <script>
                      (function() {
                        initBannerAd(['7SAD1569931DB11B66E', 'banner',  1])
                        }())
                      </script>
    </div>
  );
}
