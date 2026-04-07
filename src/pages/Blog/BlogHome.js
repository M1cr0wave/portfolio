import './BlogHome.css';
import DecryptedText from '../../blocks/TextAnimations/DecryptedText/DecryptedText';
import BlogList from '../../components/Blog/BlogList';
import NewsTicker from '../../components/Newsprint/NewsTicker';

export default function BlogHome() {
  const today = new Date();
  const dateTime = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const dateLabel = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(today);

  return (
    <div className="blog-home newsprint-texture">
      <header className="blog-masthead font-sans">
        <div className="blog-masthead-inner">
          <span className="blog-meta font-mono">Nikhil Kanade</span>
          <span className="blog-meta-divider" aria-hidden="true">
            |
          </span>
          <time className="blog-meta font-mono" dateTime={dateTime}>
            {dateLabel}
          </time>
        </div>
      </header>

      <NewsTicker />

      <section className="blog-hero">
        <div className="blog-hero-grid">
          <div className="blog-hero-main">
            <h1 className="blog-hero-title font-serif">
              <DecryptedText
                text="INFOSEC REWIND"
                speed={100}
                maxIterations={20}
                characters="01!?$"
                className="revealed"
                parentClassName="all-letters"
                encryptedClassName="encrypted"
                animateOn="view"
                revealDirection="center"
              />
            </h1>
            <p className="blog-hero-lead font-body">
              <span className="drop-cap font-serif" aria-hidden="true">
                T
              </span>
              he storage for my{' '}
              <span className="text-accent">abrupt</span> cybersecurity knowledge — notes,
              writeups, and experiments in web security.
            </p>
          </div>
          <aside className="blog-hero-rail font-sans" aria-label="Section index">
            <p className="blog-rail-label font-mono">Index</p>
            <ul className="blog-rail-list">
              <li>01 — Essays</li>
              <li>02 — Labs</li>
              <li>03 — Archive</li>
            </ul>
          </aside>
        </div>
      </section>

      <div className="blog-ornament font-serif" aria-hidden="true">
        &#x2727; &#x2727; &#x2727;
      </div>

      <BlogList />
    </div>
  );
}
