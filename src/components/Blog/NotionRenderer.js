import './NotionRenderer.css';

// ── Helpers ────────────────────────────────────────────────────────────────

function RichText({ content }) {
  if (!content?.length) return null;
  return content.map((span, i) => {
    let el = span.text;
    if (span.code) {
      el = <code key={i} className="inline-code">{el}</code>;
    } else if (span.bold && span.italic) {
      el = <strong key={i}><em>{el}</em></strong>;
    } else if (span.bold) {
      el = <strong key={i}>{el}</strong>;
    } else if (span.italic) {
      el = <em key={i}>{el}</em>;
    } else if (span.strikethrough) {
      el = <del key={i}>{el}</del>;
    } else {
      el = <span key={i}>{el}</span>;
    }
    if (span.href) {
      return (
        <a
          key={i}
          href={span.href}
          className="editorial-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          {el}
        </a>
      );
    }
    return el;
  });
}

// ── Public helpers ─────────────────────────────────────────────────────────

export function extractHeadings(blocks) {
  return (blocks || [])
    .filter((b) => ['heading_1', 'heading_2', 'heading_3'].includes(b.type))
    .map((b) => ({
      id: b.headingId,
      level: parseInt(b.type.split('_')[1], 10),
      text: b.text,
    }));
}

// ── Renderer ───────────────────────────────────────────────────────────────

export default function NotionRenderer({ blocks }) {
  if (!blocks?.length) {
    return (
      <div className="notion-empty">
        <p className="font-body">This article is coming soon.</p>
      </div>
    );
  }

  const rendered = [];
  let bulBuffer = [];
  let numBuffer = [];

  const flushBul = () => {
    if (!bulBuffer.length) return;
    rendered.push(
      <ul key={`bul-${rendered.length}`} className="notion-bul-list font-body">
        {bulBuffer}
      </ul>
    );
    bulBuffer = [];
  };

  const flushNum = () => {
    if (!numBuffer.length) return;
    rendered.push(
      <ol key={`num-${rendered.length}`} className="notion-num-list font-body">
        {numBuffer}
      </ol>
    );
    numBuffer = [];
  };

  blocks.forEach((block, i) => {
    if (block.type !== 'bulleted_list_item') flushBul();
    if (block.type !== 'numbered_list_item') flushNum();

    switch (block.type) {
      case 'paragraph':
        rendered.push(
          <p key={i} className="notion-paragraph font-body">
            <RichText content={block.content} />
          </p>
        );
        break;

      case 'heading_1':
        rendered.push(
          <h2
            key={i}
            id={block.headingId}
            className="notion-h1 font-serif"
            tabIndex={-1}
          >
            <RichText content={block.content} />
          </h2>
        );
        break;

      case 'heading_2':
        rendered.push(
          <h3
            key={i}
            id={block.headingId}
            className="notion-h2 font-serif"
            tabIndex={-1}
          >
            <RichText content={block.content} />
          </h3>
        );
        break;

      case 'heading_3':
        rendered.push(
          <h4
            key={i}
            id={block.headingId}
            className="notion-h3 font-serif"
            tabIndex={-1}
          >
            <RichText content={block.content} />
          </h4>
        );
        break;

      case 'bulleted_list_item':
        bulBuffer.push(
          <li key={i} className="notion-list-item font-body">
            <RichText content={block.content} />
          </li>
        );
        break;

      case 'numbered_list_item':
        numBuffer.push(
          <li key={i} className="notion-list-item font-body">
            <RichText content={block.content} />
          </li>
        );
        break;

      case 'code':
        rendered.push(
          <pre key={i} className="notion-code font-mono" data-language={block.language}>
            <code>{block.content?.map((s) => s.text).join('')}</code>
          </pre>
        );
        break;

      case 'quote':
        rendered.push(
          <blockquote key={i} className="notion-quote font-body">
            <RichText content={block.content} />
          </blockquote>
        );
        break;

      case 'callout':
        rendered.push(
          <div key={i} className="notion-callout font-body">
            {block.icon && <span className="callout-icon" aria-hidden="true">{block.icon}</span>}
            <div className="callout-body">
              <RichText content={block.content} />
            </div>
          </div>
        );
        break;

      case 'image':
        rendered.push(
          <figure key={i} className="notion-image">
            <img src={block.url} alt={block.caption || ''} loading="lazy" />
            {block.caption && (
              <figcaption className="font-mono">{block.caption}</figcaption>
            )}
          </figure>
        );
        break;

      case 'divider':
        rendered.push(<hr key={i} className="notion-divider" />);
        break;

      default:
        break;
    }
  });

  // Flush remaining list buffers
  flushBul();
  flushNum();

  return <div className="notion-content">{rendered}</div>;
}
