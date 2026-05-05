// @ts-check
'use strict';

/**
 * Build-time Notion fetch script (Notion SDK v5+).
 *
 * Runs via `npm run prebuild` (before `npm run build`) and `npm run fetch-notion`.
 *
 * - Reads NOTION_TOKEN from .env.local (local dev) or the system environment (Vercel).
 * - Queries the Blog Website data source.
 * - Fetches page blocks for "Done" and "In progress" entries.
 * - Downloads cover images and inline images to public/blog-images/.
 * - Writes src/data/blogs.json — the static data the React app imports at build time.
 *
 * "Not started" entries are intentionally excluded from the output.
 *
 * Vercel setup:
 *   Project Settings → Environment Variables → NOTION_TOKEN = <your integration token>
 *   Build command must be `npm run build` (set in vercel.json — already done).
 */

const path = require('path');
const { Client } = require('@notionhq/client');
const https = require('https');
const http = require('http');
const fs = require('fs');
const { URL } = require('url');

// ── Config ────────────────────────────────────────────────────────────────────

const TOKEN = process.env.NOTION_TOKEN;
// This is the "Blog Website" data source ID confirmed via the Notion API
const DATA_SOURCE_ID =
  process.env.NOTION_DATABASE_ID || '2fe86979-da7d-8036-8a26-000b8501a625';

// Only these statuses are included in the published site
const INCLUDE_STATUSES = new Set(['Done', 'In progress']);

// ── Bail early without token ──────────────────────────────────────────────────

if (!TOKEN) {
  console.warn(
    '[notion] NOTION_TOKEN not set — using existing src/data/blogs.json as-is.'
  );
  process.exit(0);
}

// ── Paths ─────────────────────────────────────────────────────────────────────

const ROOT = path.join(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'src', 'data');
const IMG_DIR = path.join(ROOT, 'public', 'blog-images');

[DATA_DIR, IMG_DIR].forEach((d) => fs.mkdirSync(d, { recursive: true }));

// ── Notion client (v5) ────────────────────────────────────────────────────────

const notion = new Client({ auth: TOKEN });

// ── Utilities ─────────────────────────────────────────────────────────────────

function slugify(text) {
  return (text || '')
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')   // strip non-alphanumeric (removes emojis too)
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function serializeRichText(rich) {
  if (!Array.isArray(rich)) return [];
  return rich
    .filter((s) => s.plain_text)
    .map((span) => ({
      text: span.plain_text,
      bold: !!span.annotations?.bold,
      italic: !!span.annotations?.italic,
      code: !!span.annotations?.code,
      strikethrough: !!span.annotations?.strikethrough,
      href: span.href || null,
    }));
}

async function downloadFile(rawUrl, dest) {
  return new Promise((resolve, reject) => {
    const attempt = (url, hops) => {
      if (hops > 8) return reject(new Error('Too many redirects'));
      let parsed;
      try {
        parsed = new URL(url);
      } catch {
        return reject(new Error(`Invalid URL: ${url}`));
      }
      const mod = parsed.protocol === 'https:' ? https : http;
      mod
        .get(url, (res) => {
          if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            res.resume();
            attempt(res.headers.location, hops + 1);
            return;
          }
          if (res.statusCode !== 200) {
            res.resume();
            return reject(new Error(`HTTP ${res.statusCode}`));
          }
          const stream = fs.createWriteStream(dest);
          res.pipe(stream);
          stream.on('finish', () => { stream.close(); resolve(dest); });
          stream.on('error', (err) => { fs.unlink(dest, () => {}); reject(err); });
        })
        .on('error', reject);
    };
    attempt(rawUrl, 0);
  });
}

async function fetchAllBlocks(blockId) {
  const blocks = [];
  let cursor;
  do {
    // blocks.children.list is unchanged in v5
    const res = await notion.blocks.children.list({
      block_id: blockId,
      ...(cursor ? { start_cursor: cursor } : {}),
    });
    blocks.push(...res.results);
    cursor = res.has_more ? res.next_cursor : undefined;
  } while (cursor);
  return blocks;
}

async function serializeBlock(block, slug) {
  const t = block.type;
  const data = block[t];
  if (!data) return null;

  if (t === 'paragraph') {
    return { type: 'paragraph', content: serializeRichText(data.rich_text) };
  }

  if (['heading_1', 'heading_2', 'heading_3'].includes(t)) {
    const rt = data.rich_text || [];
    const plainText = rt.map((r) => r.plain_text).join('');
    return {
      type: t,
      headingId: slugify(plainText),
      text: plainText,
      content: serializeRichText(rt),
    };
  }

  if (t === 'bulleted_list_item' || t === 'numbered_list_item') {
    return { type: t, content: serializeRichText(data.rich_text) };
  }

  if (t === 'code') {
    return {
      type: 'code',
      language: data.language || 'text',
      content: serializeRichText(data.rich_text),
    };
  }

  if (t === 'quote') {
    return { type: 'quote', content: serializeRichText(data.rich_text) };
  }

  if (t === 'callout') {
    return {
      type: 'callout',
      icon: data.icon?.emoji || null,
      content: serializeRichText(data.rich_text),
    };
  }

  if (t === 'image') {
    const isFile = data.type === 'file';
    const rawUrl = isFile ? data.file?.url : data.external?.url;
    const caption = (data.caption || []).map((r) => r.plain_text).join('');
    if (!rawUrl) return null;

    if (isFile) {
      const ext = (rawUrl.split('?')[0].split('.').pop() || 'jpg').toLowerCase();
      const safeExt = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif'].includes(ext)
        ? ext
        : 'jpg';
      const filename = `${slug}-img-${block.id.replace(/-/g, '').slice(0, 8)}.${safeExt}`;
      const dest = path.join(IMG_DIR, filename);
      try {
        await downloadFile(rawUrl, dest);
        return { type: 'image', url: `/blog-images/${filename}`, caption };
      } catch (e) {
        console.warn(`  ⚠ Inline image failed (${block.id}): ${e.message}`);
        return null;
      }
    }
    return { type: 'image', url: rawUrl, caption };
  }

  if (t === 'divider') return { type: 'divider' };

  return null; // unsupported block type — skip
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`[notion] Querying data source ${DATA_SOURCE_ID}…`);

  // v5: dataSources.query with data_source_id (not database_id)
  const res = await notion.dataSources.query({
    data_source_id: DATA_SOURCE_ID,
    sorts: [{ property: 'Publish Date', direction: 'descending' }],
  });

  console.log(`[notion] ${res.results.length} total entries found.`);

  const blogs = [];

  for (const page of res.results) {
    const props = page.properties;

    const titleRt = props.Title?.title || [];
    const title = titleRt.map((t) => t.plain_text).join('').trim() || 'Untitled';
    const slug = slugify(title);
    const status = props.Status?.status?.name || null;

    // Exclude "Not started" — they should not appear on the site
    if (!INCLUDE_STATUSES.has(status)) {
      console.log(`[notion] ↷ Skipping "${title}" (${status})`);
      continue;
    }

    const publishDate = props['Publish Date']?.date?.start || null;

    // Cover image (Notion "files" property named "image" or "Image")
    let image = null;
    const imgProp = props.image || props.Image;
    if (imgProp?.type === 'files' && imgProp.files.length > 0) {
      const f = imgProp.files[0];
      const rawUrl = f.type === 'external' ? f.external?.url : f.file?.url;
      if (rawUrl) {
        const ext = (rawUrl.split('?')[0].split('.').pop() || 'jpg').toLowerCase();
        const safeExt = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif'].includes(ext)
          ? ext
          : 'jpg';
        const filename = `${slug}-cover.${safeExt}`;
        const dest = path.join(IMG_DIR, filename);
        try {
          await downloadFile(rawUrl, dest);
          image = `/blog-images/${filename}`;
          console.log(`  ✓ Cover saved: ${filename}`);
        } catch (e) {
          console.warn(`  ⚠ Cover download failed for "${title}": ${e.message}`);
        }
      }
    }

    // Fetch page blocks and serialize
    let blocks = [];
    let excerpt = '';

    console.log(`  ↓ Fetching blocks for "${title}"…`);
    const rawBlocks = await fetchAllBlocks(page.id);
    const serialized = await Promise.all(rawBlocks.map((b) => serializeBlock(b, slug)));
    blocks = serialized.filter(Boolean);

    const firstPara = blocks.find(
      (b) => b.type === 'paragraph' && b.content?.length > 0
    );
    if (firstPara) {
      const full = firstPara.content.map((s) => s.text).join('');
      excerpt = full.length > 180 ? full.slice(0, 177) + '…' : full;
    }

    blogs.push({ id: page.id, title, slug, status, publishDate, image, excerpt, blocks });
    console.log(`[notion] ✓ "${title}" (${status}) — ${blocks.length} blocks`);
  }

  const outPath = path.join(DATA_DIR, 'blogs.json');
  fs.writeFileSync(outPath, JSON.stringify(blogs, null, 2));
  console.log(
    `\n[notion] Done — ${blogs.length} entries written to src/data/blogs.json`
  );
}

main().catch((err) => {
  console.error('[notion] Fatal error:', err);
  process.exit(1);
});
