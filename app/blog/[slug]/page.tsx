import fs from 'fs';
import path from 'path';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import MarkdownRenderer from '@/components/MarkdownRenderer';

export default function Page({ params }) {
  const slug = params.slug;
  const filePath = path.join(process.cwd(), 'public', 'blogs', `${slug}.md`);
  let md = '';
  try {
    md = fs.readFileSync(filePath, 'utf-8');
  } catch (e) {
    md = '# Not Found\n\nThe requested article was not found.';
  }

  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="container mx-auto px-4 py-12">
        <article className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded shadow">
          <MarkdownRenderer md={md} />
        </article>
      </main>
      <Footer />
    </div>
  );
}