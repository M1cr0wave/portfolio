import './BlogTitle.css';

export default function BlogTitle({ title }) {
  const segment = `${title} — `;

  return (
    <div className="blog-title-block">
      <h1 className="blog-rolling-heading">
        <span className="sr-only">{title}</span>
        <div className="blog-rolling-viewport">
          <div className="blog-rolling-track" aria-hidden="true">
            <span className="blog-rolling-chunk font-serif">{segment}</span>
            <span className="blog-rolling-chunk font-serif">{segment}</span>
          </div>
        </div>
      </h1>
    </div>
  );
}
