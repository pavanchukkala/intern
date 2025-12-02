import fs from "fs";
import path from "path";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import MarkdownRenderer from "@/components/MarkdownRenderer";

// Optional: extract first heading for SEO
function extractTitle(md) {
  const match = md.match(/^#\s+(.*)/m);
  return match ? match[1].trim() : "Kegth Blog";
}

function extractDescription(md) {
  const line = md.split("\n").find(l => l.trim() && !l.startsWith("#"));
  return line ? line.slice(0, 150) : "Article from Kegth blog.";
}

export async function generateMetadata({ params }) {
  const slug = params.slug;
  const filePath = path.join(process.cwd(), "public", "blogs", `${slug}.md`);

  try {
    const md = fs.readFileSync(filePath, "utf-8");
    const title = extractTitle(md);
    const description = extractDescription(md);

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "article",
        url: `https://kegth.com/blog/${slug}`,
        images: [
          {
            url: "/default-og.png",
            width: 1200,
            height: 630
          }
        ]
      }
    };
  } catch {
    return {
      title: "Not Found",
      description: "This article does not exist."
    };
  }
}

export default function Page({ params }) {
  const slug = params.slug;
  const filePath = path.join(process.cwd(), "public", "blogs", `${slug}.md`);

  let md = "";
  try {
    md = fs.readFileSync(filePath, "utf-8");
  } catch {
    md = "# Not Found\n\nThe requested article was not found.";
  }

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-gray-900">
      <NavBar />

      {/* Progress Bar */}
      <div
        id="progress-bar"
        className="fixed top-0 left-0 h-1 bg-black dark:bg-white opacity-80 transition-all z-50"
      />

      <main className="container mx-auto px-4 py-12">
        <article className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">

          {/* Title extracted automatically */}
          {md.startsWith("# ") && (
            <h1 className="text-4xl font-extrabold mb-6 leading-tight tracking-tight">
              {extractTitle(md)}
            </h1>
          )}

          <MarkdownRenderer md={md} />
        </article>
      </main>

      <Footer />

      {/* Scroll progress script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            const bar = document.getElementById('progress-bar');
            window.addEventListener('scroll', () => {
              const h = document.documentElement;
              const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
              bar.style.width = scrolled + '%';
            });
          `
        }}
      />
    </div>
  );
}
