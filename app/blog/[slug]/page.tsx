import fs from 'fs';
import path from 'path';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

export default function Page({ params }) {
  const slug=params.slug;
  const filePath=path.join(process.cwd(),'public','blogs',`${slug}.md`);
  const md=fs.readFileSync(filePath,'utf-8');
  return (<div><NavBar/><main className="container mx-auto px-4 py-8">
    <MarkdownRenderer md={md}/>
  </main><Footer/></div>);
}