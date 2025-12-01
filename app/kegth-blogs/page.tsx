import fs from "fs";
import path from "path";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Kegth Blog Library",
  description: "Merged blog library for Kegth - rich SEO content",
};

export default function Page() {
  // Read index.json directly from public folder
  const filePath = path.join(process.cwd(), "public", "blogs", "index.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const posts = JSON.parse(jsonData);

  return (
    <div>
      <NavBar />
      <main className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold">Kegth Blog Library</h1>
          <p className="mt-2 text-gray-600">
            Search and explore our expanded blog collection.
          </p>
        </header>

        <input
          id="search"
          placeholder="Search posts..."
          className="w-full p-3 border rounded mb-6"
        />

        <ul className="grid md:grid-cols-2 gap-6" id="post-list">
          {posts.map((p) => (
            <li
              key={p.slug}
              className="bg-white dark:bg-gray-800 p-6 rounded shadow"
              data-title={p.title.toLowerCase()}
            >
              <h2 className="text-2xl font-semibold">
                <a href={`/kegth-blogs/${p.slug}`}>{p.title}</a>
              </h2>
              <p className="mt-2 text-gray-600">{p.excerpt}</p>
              <a
                href={`/kegth-blogs/${p.slug}`}
                className="text-indigo-600 inline-block mt-4"
              >
                Read more →
              </a>
            </li>
          ))}
        </ul>
      </main>
      <Footer />

      <script
        dangerouslySetInnerHTML={{
          __html: `
            const input = document.getElementById('search');
            input.addEventListener('input', function(e){
              const value = e.target.value.toLowerCase();
              const items = document.querySelectorAll('#post-list li');
              items.forEach(li=>{
                const title = li.getAttribute('data-title');
                li.style.display = title.includes(value) ? '' : 'none';
              });
            });
          `,
        }}
      />
    </div>
  );
}
