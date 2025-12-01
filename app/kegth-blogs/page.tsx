
import Link from 'next/link';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Kegth Blogs Library',
  description: 'Merged blog library for Kegth - rich SEO content'
};

export default async function Page() {
  const res = await fetch('/blogs/index.json');
  const posts = await res.json();

  return (
    <div>
      <NavBar />
      <main className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold">Kegth Blog Library</h1>
          <p className="mt-2 text-gray-600">Search and explore our expanded blog collection.</p>
        </header>

        <div className="mb-6">
          <input id="search" placeholder="Search posts..." className="w-full p-3 border rounded" onChange={() => {}} />
          <p className="text-sm text-gray-500 mt-2">Client-side search available below.</p>
        </div>

        <ul className="grid md:grid-cols-2 gap-6">
          {posts.map((p) => (
            <li key={p.slug} className="bg-white dark:bg-gray-800 p-6 rounded shadow">
              <h2 className="text-2xl font-semibold"><Link href={`/kegth-blogs/${p.slug}`}>{p.title}</Link></h2>
              <p className="mt-2 text-gray-600">{p.excerpt}</p>
              <div className="mt-4"><Link href={`/kegth-blogs/${p.slug}`} className="text-indigo-600">Read more →</Link></div>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
      <script dangerouslySetInnerHTML={{__html: `
        // simple client-side search
        const input = document.getElementById('search');
        input.addEventListener('input', function(e){
          const q = e.target.value.toLowerCase();
          const items = document.querySelectorAll('ul > li');
          items.forEach(li=>{
            const t = li.querySelector('h2').innerText.toLowerCase();
            li.style.display = t.includes(q) ? 'block' : 'none';
          });
        });
      `}} />
    </div>
  );
}
