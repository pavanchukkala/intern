import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import MarkdownRenderer from '@/components/MarkdownRenderer';

export default async function Page({ params }) {
  const slug = params.slug;
  const res = await fetch(`/blogs/${slug}.md`);
  const md = await res.text();

  return (
    <div>
      <NavBar />
      <main className="container mx-auto px-4 py-8">
        <article>
          <MarkdownRenderer md={md} />
        </article>
      </main>
      <Footer />
    </div>
  );
}