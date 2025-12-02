import fs from "fs";
import path from "path";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import SearchBar from "./SearchBar";

export const metadata = {
  title: "Kegth Blog",
  description: "Kegth blog - career, internships, tech"
};

export default function Page({ searchParams }) {
  const filePath = path.join(process.cwd(), "public", "blogs", "index.json");
  const posts = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const activeTag = searchParams.tag;

  const filteredPosts = activeTag
    ? posts.filter(p => p.tags?.includes(activeTag))
    : posts;

  const allTags = Array.from(
    new Set(posts.flatMap(p => p.tags || []))
  );

  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-800">
      <NavBar />

      <main className="container mx-auto px-4 py-10">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Kegth Blog Library
          </h1>
          <p className="mt-2 text-gray-600">
            In-depth guides, internship tips and industry insights.
          </p>
        </header>

        <div className="flex gap-8">
          {/* LEFT SECTION */}
          <div className="flex-1">
            <SearchBar />

            <div id="grid" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map(p => (
                <div
                  key={p.slug}
                  data-title={p.title}
                  data-tags={(p.tags || []).join(" ")}
                >
                  <BlogCard post={p} />
                </div>
              ))}
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="w-80 hidden lg:block">
            {/* Filters */}
            <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-lg mb-2">Filters</h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <a
                    key={tag}
                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                    className={`px-3 py-1 rounded-full text-sm border ${
                      activeTag === tag
                        ? "bg-black text-white border-black"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    {tag}
                  </a>
                ))}
              </div>
            </div>

            {/* Featured Posts */}
            <div className="mt-6 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-lg">Featured</h3>
              {posts
                .filter(p => p.featured)
                .slice(0, 3)
                .map(fp => (
                  <div key={fp.slug} className="mt-4">
                    <a
                      href={`/blog/${fp.slug}`}
                      className="text-sm font-medium hover:underline"
                    >
                      {fp.title}
                    </a>
                    <p className="text-xs text-gray-500 mt-1">
                      {fp.excerpt.slice(0, 80)}...
                    </p>
                  </div>
                ))}
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
