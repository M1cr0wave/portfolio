import { useState, useEffect, useRef } from 'react';
import './TableOfContents.css';

export default function TableOfContents({ headings }) {
  const [activeId, setActiveId] = useState(headings[0]?.id || null);
  const observerRef = useRef(null);

  useEffect(() => {
    if (!headings.length) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const topEntry = visible.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b
          );
          setActiveId(topEntry.target.id);
        }
      },
      { rootMargin: '-10% 0% -75% 0%', threshold: 0 }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observerRef.current.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [headings]);

  const handleClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      el.focus({ preventScroll: true });
    }
    setActiveId(id);
  };

  if (!headings.length) return null;

  return (
    <nav className="toc" aria-label="Table of contents">
      <p className="toc-label font-mono">Contents</p>
      <ul className="toc-list">
        {headings.map((h) => (
          <li key={h.id} className={`toc-item toc-level-${h.level}`}>
            <a
              href={`#${h.id}`}
              className={`toc-link font-sans${activeId === h.id ? ' toc-active' : ''}`}
              onClick={(e) => handleClick(e, h.id)}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
