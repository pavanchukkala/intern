import fs from 'fs';
import path from 'path';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

export default function Page() {
  const filePath = path.join(process.cwd(), 'public', 'blogs', 'index.json');
  const posts = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  return (<div><NavBar/><main className="container mx-auto px-4 py-8">
    <h1 className="text-4xl font-bold mb-8">Kegth Blog</h1>
    <ul>{posts.map(p=>(<li key={p.slug}><a href={`/blog/${p.slug}`}>{p.title}</a></li>))}</ul>
  </main><Footer/></div>);
}