import Link from 'next/link';

export default function BlogCard({post}){
  const tags = (post.tags||[]).join(', ');
  return (
    <article data-title={post.title.toLowerCase()} data-tags={tags} className="bg-white dark:bg-gray-800 rounded shadow overflow-hidden">
      <div className="p-4">
        <h3 className="text-xl font-semibold"><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3>
        <p className="text-sm text-gray-600 mt-2">{post.excerpt}</p>
        <div className="mt-4">
          <Link href={`/blog/${post.slug}`} className="text-indigo-600">Read more →</Link>
        </div>
      </div>
    </article>
  );
}