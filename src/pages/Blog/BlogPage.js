import { useParams, Navigate } from 'react-router-dom';
import './BlogPage.css';
import BlogTitle from '../../components/Blog/BlogTitle';
import BlogFooter from '../../components/Layout/BlogFooter';
import Separator from '../../components/UI/Separator';
import TableOfContents from '../../components/Blog/TableOfContents';
import NotionRenderer, { extractHeadings } from '../../components/Blog/NotionRenderer';
import blogs from '../../data/blogs.json';

export default function BlogPage() {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === id);

  if (!blog) return <Navigate to="/" replace />;

  if (blog.status !== 'Done') {
    return (
      <div className="blog-page newsprint-texture">
        <div className="blog-coming-soon">
          <p className="blog-coming-soon-label font-mono">Coming Soon</p>
          <h1 className="blog-coming-soon-title font-serif">{blog.title}</h1>
          <p className="blog-coming-soon-body font-body">
            This article is still being written. Check back later.
          </p>
        </div>
      </div>
    );
  }

  const headings = extractHeadings(blog.blocks || []);

  return (
    <div className="blog-page newsprint-texture">
      <BlogTitle title={blog.title} />

      <div className="blog-content-wrap">
        <aside className="blog-toc-col" aria-label="Article navigation">
          <TableOfContents headings={headings} />
        </aside>

        <main className="blog-article-col">
          <NotionRenderer blocks={blog.blocks} />
          <Separator />
          <BlogFooter publishDate={blog.publishDate} />
        </main>
      </div>
    </div>
  );
}
