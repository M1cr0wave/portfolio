import './PortfolioPage.css';

export default function ProfilePage() {
  return (
    <div className="portfolio-page newsprint-texture">
      <header className="portfolio-masthead font-sans">
        <div className="portfolio-masthead-inner">
          <span className="font-mono">Portfolio · Vol. 1</span>
          <span className="font-mono">New York Edition</span>
        </div>
      </header>

      <section className="portfolio-hero">
        <div className="portfolio-grid">
          <div className="portfolio-col-left">
            <h1 className="portfolio-name font-serif">Nikhil Kanade</h1>
            <p className="portfolio-tagline font-sans">Security Engineer who loves UI/UX</p>
            <div className="portfolio-avatar-wrap">
              <img
                className="portfolio-avatar"
                src="/memoji.png"
                alt="Portrait of Nikhil Kanade"
              />
            </div>
          </div>
          <div className="portfolio-col-right">
            <p className="portfolio-bio font-body">
              <span className="drop-cap" aria-hidden="true">
                I
              </span>
              build and break web systems with a focus on clarity, craft, and responsible disclosure.
              This page is printed in the Newsprint system: sharp grids, editorial type, and motion
              that snaps — no glassmorphism, no soft gradients.
            </p>
            <div className="portfolio-actions">
              <a className="btn-primary font-sans" href="mailto:nikhil@example.com">
                Contact
              </a>
              <a
                className="btn-secondary font-sans"
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="portfolio-inverted" aria-labelledby="how-heading">
        <div className="portfolio-inverted-inner">
          <h2 id="how-heading" className="font-serif">
            How I work
          </h2>
          <ul className="portfolio-steps font-body">
            <li>
              <span className="step-num">01</span>
              <span>Map the surface: routes, caches, auth boundaries, and trust assumptions.</span>
            </li>
            <li>
              <span className="step-num">02</span>
              <span>Reduce noise: minimal repro, tight notes, reproducible steps.</span>
            </li>
            <li>
              <span className="step-num">03</span>
              <span>Ship fixes with empathy for users and operators — documentation is part of the patch.</span>
            </li>
          </ul>
        </div>
      </section>

      <p className="portfolio-footer-strip font-mono">
        Fig. 1 — Portfolio masthead · nikhilkanade
      </p>
    </div>
  );
}
