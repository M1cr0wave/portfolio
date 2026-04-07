import './BlogSquare.css';
import { Link } from 'react-router-dom';

const STATUS_LABEL = {
  'Done': null,
  'In progress': 'In Progress',
  'Not started': 'Coming Soon',
};

export default function BlogSquare({ id, title, excerpt, image, status, publishDate }) {
  const isPublished = status === 'Done';

  const formattedDate =
    publishDate && isPublished
      ? new Intl.DateTimeFormat('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }).format(new Date(publishDate + 'T12:00:00'))
      : null;

  const badge = STATUS_LABEL[status];

  return (
    <article className={`blog-square hard-shadow-hover${isPublished ? '' : ' is-preview'}`}>
      <div className="blog-square-media">
        {image ? (
          <img className="image" src={image} alt={title} />
        ) : (
          <span className="image-placeholder" aria-hidden="true" />
        )}
      </div>

      <div className="content">
        <div className="blog-square-meta">
          {badge && (
            <span className={`status-badge font-mono status-${status === 'In progress' ? 'progress' : 'soon'}`}>
              {badge}
            </span>
          )}
          {formattedDate && (
            <time className="publish-date font-mono" dateTime={publishDate}>
              {formattedDate}
            </time>
          )}
        </div>

        <h3 className="title font-serif">{title}</h3>

        {excerpt && <p className="description font-body">{excerpt}</p>}

        {isPublished && (
          <Link className="link btn-primary font-sans" to={`/blog/${id}`}>
            Read
          </Link>
        )}
      </div>
    </article>
  );
}
