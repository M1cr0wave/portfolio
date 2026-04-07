import './BlogList.css';
import BlogSquare from './BlogSquare';
import allBlogs from '../../data/blogs.json';

const blogs = allBlogs.filter((b) => b.status !== 'Not started');

export default function BlogList() {
  return (
    <div className="blog-list-wrap">
      <p className="blog-list-kicker font-mono">Latest dispatches</p>
      <div className="blog-list">
        {blogs.map((blog) => (
          <BlogSquare
            key={blog.id}
            id={blog.id}
            title={blog.title}
            excerpt={blog.excerpt}
            image={blog.image}
            status={blog.status}
            publishDate={blog.publishDate}
          />
        ))}
      </div>
    </div>
  );
}
