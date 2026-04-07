import React from 'react';
import './BlogFooter.css';

export default function BlogFooter({ publishDate }) {
  // Use the Notion publish date when available; fall back to today
  const dateObj = publishDate
    ? new Date(publishDate + 'T12:00:00') // noon avoids TZ-shift to previous day
    : new Date();

  const printed = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj);

  return (
    <footer className="footer font-sans">
      <p className="name">Nikhil Kanade</p>
      <p className="edition font-mono">Edition: Vol 1.0 · Printed digitally</p>
      <p className="date font-mono">{printed}</p>
    </footer>
  );
}
