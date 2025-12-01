import fs from 'fs';
import path from 'path';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
export const metadata = { title: 'Kegth Blog', description: 'Kegth blog - career, internships, tech' };

export default function Page() {
  const filePath = path.join(process.cwd(), 'public', 'blogs', 'index.json');
  const posts = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="container mx-auto px-4 py-10">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-extrabold">Kegth Blog Library</h1>
          <p className="mt-2 text-gray-600">In-depth guides, internship tips, and industry insights.</p>
        </header>

        <div className="flex gap-6">
          <div className="flex-1">
            <div className="mb-6">
              <input id="search" placeholder="Search posts..." className="w-full p-3 border rounded" />
            </div>

            <div id="grid" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map(p => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </div>

          <aside className="w-80 hidden lg:block">
            <div className="p-4 bg-white rounded shadow">
              <h3 className="font-semibold mb-2">Filters</h3>
              <div className="flex flex-wrap gap-2">
                {Array.from(new Set(posts.flatMap(p => p.tags || []))).map(tag => (
                  <a key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`} className="px-3 py-1 bg-gray-100 rounded text-sm">{tag}</a>
                ))}
              </div>
            </div>
            <div className="mt-4 p-4 bg-white rounded shadow">
              <h3 className="font-semibold">Featured</h3>
              {posts.filter(p => p.featured).slice(0,3).map(fp => (
                <div key={fp.slug} className="mt-3">
                  <a href={`/blog/${fp.slug}`} className="text-sm font-medium">{fp.title}</a>
                  <p className="text-xs text-gray-500">{fp.excerpt.slice(0,80)}...</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </main>
      <Footer />

      <script dangerouslySetInnerHTML={{__html: `
        const input = document.getElementById('search');
        input.addEventListener('input', function(e){
          const q = e.target.value.toLowerCase();
          document.querySelectorAll('#grid > *').forEach(card => {
            const title = card.getAttribute('data-title') || '';
            const tags = card.getAttribute('data-tags') || '';
            const txt = (title+' '+tags).toLowerCase();
            card.style.display = txt.includes(q) ? '' : 'none';
          });
        });
      `}} />
    </div>
  );
}
