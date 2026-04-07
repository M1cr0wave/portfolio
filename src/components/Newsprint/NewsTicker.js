import './NewsTicker.css';

const DEFAULT_ITEMS = [
  'Infosec Rewind',
  'Web security',
  'Bug bounty',
  'Offensive research',
  'Vol. 1',
];

export default function NewsTicker({ items = DEFAULT_ITEMS }) {
  const loop = [...items, ...items, ...items];
  return (
    <div className="news-ticker font-sans" role="region" aria-label="Headlines ticker">
      <div className="news-ticker-inner">
        <span className="news-ticker-badge font-mono" aria-hidden="true">
          Breaking
        </span>
        <div className="news-ticker-viewport">
          <div className="news-ticker-track" aria-hidden="true">
            {loop.map((label, i) => (
              <span key={`${label}-${i}`} className="news-ticker-item">
                {label}
                <span className="news-ticker-sep"> · </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
