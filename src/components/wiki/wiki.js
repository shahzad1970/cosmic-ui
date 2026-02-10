import { UIComponent } from '../../core/ui-component.js';
import { resolveSize, resolveColor } from '../../core/ui-utils.js';

/**
 * `<ui-wiki>` — Fetch and render a Markdown (.md) file.
 *
 * Loads a Markdown document from a URL and renders it as styled HTML
 * inside the Shadow DOM. Includes a lightweight built-in Markdown parser
 * (no external dependencies) that supports headings, paragraphs, lists,
 * code blocks, blockquotes, tables, images, links, and inline formatting.
 *
 * @element ui-wiki
 *
 * @attr {String}  src        - URL of the .md file to fetch (required)
 * @attr {String}  background - Container background colour
 * @attr {String}  color      - Text colour
 * @attr {String}  size       - Base font size (named keyword or CSS length)
 * @attr {String}  padding    - Container padding (default "1.5em")
 * @attr {Boolean} nocache    - Bypass internal fetch cache
 * @attr {Boolean} toc        - Show a table-of-contents sidebar
 *
 * @fires ui-load  — Emitted after Markdown is successfully loaded and rendered.
 *                   detail: { src, markdown }
 * @fires ui-error — Emitted when the fetch fails.
 *                   detail: { src, error }
 *
 * @slot (default) - Fallback / loading content shown until the .md loads
 *
 * @example
 *   <ui-wiki src="/docs/readme.md"></ui-wiki>
 *
 *   <ui-wiki src="/guides/setup.md" toc background="gray-50">
 *     <ui-spinner></ui-spinner>
 *   </ui-wiki>
 */

/* ── Internal fetch cache ──────────────────────────────────────────── */
/** @type {Map<string, Promise<string>>} */
const _cache = new Map();

export class UIWiki extends UIComponent {
  static properties = {
    src:        { type: String,  default: '',      reflect: true },
    background: { type: String,  default: '',      reflect: true },
    color:      { type: String,  default: '',      reflect: true },
    size:       { type: String,  default: '',      reflect: true },
    padding:    { type: String,  default: '',      reflect: true },
    nocache:    { type: Boolean, default: false,    reflect: true },
    toc:        { type: Boolean, default: false,    reflect: true },
  };

  static styles() {
    return /* css */ `
      :host {
        display: block;
        line-height: 1.7;
        word-wrap: break-word;
        overflow-wrap: break-word;
      }

      .wiki {
        font-family: var(--ui-font, system-ui, -apple-system, sans-serif);
      }

      /* ── Layout: TOC + content ────────────────────────────── */
      .wiki--toc {
        display: grid;
        grid-template-columns: 15em 1fr;
        gap: 2em;
        align-items: start;
      }

      .toc {
        position: sticky;
        top: 1em;
        max-height: calc(100vh - 2em);
        overflow-y: auto;
        padding: 1em;
        border-right: 1px solid var(--ui-border-color, #e5e7eb);
        font-size: 0.85em;
      }

      .toc-title {
        font-weight: 700;
        margin-bottom: 0.5em;
        font-size: 0.8em;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--ui-text-muted, #6b7280);
      }

      .toc a {
        display: block;
        text-decoration: none;
        color: var(--ui-text-muted, #6b7280);
        padding: 0.2em 0;
        transition: color 0.15s;
      }
      .toc a:hover {
        color: var(--ui-text-color, #111827);
      }

      .toc .toc-h2 { padding-left: 0; }
      .toc .toc-h3 { padding-left: 1em; }
      .toc .toc-h4 { padding-left: 2em; }

      /* ── Content styles ───────────────────────────────────── */
      .content h1,
      .content h2,
      .content h3,
      .content h4,
      .content h5,
      .content h6 {
        margin: 1.25em 0 0.5em;
        line-height: 1.3;
        font-weight: 600;
      }

      .content h1 { font-size: 2em; border-bottom: 1px solid var(--ui-border-color, #e5e7eb); padding-bottom: 0.3em; }
      .content h2 { font-size: 1.5em; border-bottom: 1px solid var(--ui-border-color, #e5e7eb); padding-bottom: 0.25em; }
      .content h3 { font-size: 1.25em; }
      .content h4 { font-size: 1em; }
      .content h5 { font-size: 0.875em; }
      .content h6 { font-size: 0.85em; color: var(--ui-text-muted, #6b7280); }

      .content p {
        margin: 0 0 1em;
      }

      .content a {
        color: var(--ui-indigo-600, #4f46e5);
        text-decoration: none;
      }
      .content a:hover {
        text-decoration: underline;
      }

      .content img {
        max-width: 100%;
        height: auto;
        border-radius: var(--ui-radius, 0.375em);
      }

      /* Inline code */
      .content code {
        background: var(--ui-gray-100, #f3f4f6);
        color: var(--ui-rose-600, #e11d48);
        padding: 0.15em 0.4em;
        border-radius: 0.25em;
        font-size: 0.875em;
        font-family: var(--ui-font-mono, "SF Mono", "Fira Code", monospace);
      }

      /* Fenced code blocks */
      .content pre {
        background: var(--ui-gray-900, #111827);
        color: var(--ui-gray-100, #f3f4f6);
        padding: 1em 1.25em;
        border-radius: var(--ui-radius, 0.375em);
        overflow-x: auto;
        font-size: 0.85em;
        line-height: 1.6;
        margin: 0 0 1em;
      }

      .content pre code {
        background: none;
        color: inherit;
        padding: 0;
        border-radius: 0;
        font-size: inherit;
      }

      /* Block quotes */
      .content blockquote {
        border-left: 4px solid var(--ui-indigo-400, #818cf8);
        margin: 0 0 1em;
        padding: 0.5em 1em;
        color: var(--ui-text-muted, #6b7280);
        background: var(--ui-gray-50, #f9fafb);
        border-radius: 0 var(--ui-radius, 0.375em) var(--ui-radius, 0.375em) 0;
      }

      .content blockquote p:last-child {
        margin-bottom: 0;
      }

      /* Lists */
      .content ul,
      .content ol {
        margin: 0 0 1em;
        padding-left: 1.5em;
      }

      .content li {
        margin-bottom: 0.25em;
      }

      .content li > ul,
      .content li > ol {
        margin-bottom: 0;
        margin-top: 0.25em;
      }

      /* Task list */
      .content li.task-item {
        list-style: none;
        margin-left: -1.5em;
      }

      .content li.task-item input[type="checkbox"] {
        margin-right: 0.5em;
        pointer-events: none;
      }

      /* Tables */
      .content table {
        width: 100%;
        border-collapse: collapse;
        margin: 0 0 1em;
        font-size: 0.9em;
      }

      .content th,
      .content td {
        border: 1px solid var(--ui-border-color, #e5e7eb);
        padding: 0.5em 0.75em;
        text-align: left;
      }

      .content th {
        background: var(--ui-gray-100, #f3f4f6);
        font-weight: 600;
      }

      .content tr:nth-child(even) {
        background: var(--ui-gray-50, #f9fafb);
      }

      /* Horizontal rule */
      .content hr {
        border: none;
        border-top: 1px solid var(--ui-border-color, #e5e7eb);
        margin: 2em 0;
      }

      /* ── Loading state ────────────────────────────────────── */
      .wiki--loading .content { display: none; }
      .wiki--loaded  ::slotted(*) { display: none; }
      .wiki--error   .content { display: none; }

      @media (max-width: 768px) {
        .wiki--toc {
          grid-template-columns: 1fr;
        }
        .toc {
          position: static;
          max-height: none;
          border-right: none;
          border-bottom: 1px solid var(--ui-border-color, #e5e7eb);
          padding: 0 0 0.75em;
          margin-bottom: 1em;
        }
      }
    `;
  }

  constructor() {
    super();
    /** @type {string} Raw markdown source after fetch. */
    this._markdown = '';
    /** @type {{ level: number, text: string, id: string }[]} Headings extracted for TOC. */
    this._headings = [];
  }

  render() {
    const tocClass = this.toc ? ' wiki--toc' : '';
    const tocHtml = this.toc ? `<nav class="toc" part="toc"><div class="toc-title">Contents</div></nav>` : '';
    return `<div class="wiki${tocClass}">${tocHtml}<div class="content" part="content"></div></div><slot></slot>`;
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.src) this._startLoad();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);

    if (name === 'src' && this._initialised && oldVal !== newVal) {
      this._startLoad();
    }

    if (this._initialised && ['background', 'color', 'size', 'padding'].includes(name)) {
      this._applyStyles();
    }
  }

  _update() {
    super._update();
    this._applyStyles();
    // Re-render content if we already fetched markdown
    if (this._markdown) this._renderMarkdown();
  }

  /* ------------------------------------------------------------------ */
  /*  Styling                                                            */
  /* ------------------------------------------------------------------ */

  _applyStyles() {
    const vars = {};

    if (this._background) {
      vars['--_bg'] = resolveColor(this._background) || this._background;
      vars['background'] = 'var(--_bg)';
    }

    if (this._color) {
      vars['--_color'] = resolveColor(this._color) || this._color;
      vars['color'] = 'var(--_color)';
    }

    if (this._size) {
      const sz = resolveSize(this._size);
      if (sz) vars['font-size'] = sz;
    }

    if (this._padding) {
      const pd = resolveSize(this._padding);
      vars['padding'] = pd || this._padding;
    }

    this._setDynamicVars(vars);
  }

  /* ------------------------------------------------------------------ */
  /*  Fetching                                                           */
  /* ------------------------------------------------------------------ */

  _startLoad() {
    const src = this.src;
    if (!src) return;
    this._fetchContent(src);
  }

  async _fetchContent(src) {
    const wrapper = this.shadowRoot?.querySelector('.wiki');
    if (wrapper) {
      wrapper.classList.remove('wiki--loaded', 'wiki--error');
      wrapper.classList.add('wiki--loading');
    }

    try {
      let promise;
      if (!this.nocache && _cache.has(src)) {
        promise = _cache.get(src);
      } else {
        promise = fetch(src).then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
          return res.text();
        });
        if (!this.nocache) _cache.set(src, promise);
      }

      const markdown = await promise;

      // Guard: if src changed while fetching, abort
      if (this.src !== src) return;

      this._markdown = markdown;
      this._renderMarkdown();

      if (wrapper) {
        wrapper.classList.remove('wiki--loading');
        wrapper.classList.add('wiki--loaded');
      }

      this.emit('ui-load', { src, markdown });
    } catch (err) {
      _cache.delete(src);
      if (wrapper) {
        wrapper.classList.remove('wiki--loading');
        wrapper.classList.add('wiki--error');
      }
      this.emit('ui-error', { src, error: err });
    }
  }

  /* ------------------------------------------------------------------ */
  /*  Markdown → HTML                                                    */
  /* ------------------------------------------------------------------ */

  /** Parse the stored markdown and inject rendered HTML into .content. */
  _renderMarkdown() {
    const container = this.shadowRoot?.querySelector('.content');
    if (!container) return;

    const html = UIWiki.parseMarkdown(this._markdown);
    container.innerHTML = html;

    // Build TOC from rendered headings
    if (this.toc) this._buildTOC(container);
  }

  /** Build a table-of-contents from the rendered headings. */
  _buildTOC(container) {
    const tocNav = this.shadowRoot?.querySelector('.toc');
    if (!tocNav) return;

    const headings = container.querySelectorAll('h1, h2, h3, h4');
    this._headings = [];

    const links = [];
    headings.forEach((h, i) => {
      const level = parseInt(h.tagName[1], 10);
      const text = h.textContent;
      const id = `heading-${i}`;
      h.id = id;
      this._headings.push({ level, text, id });
      links.push(`<a href="#${id}" class="toc-h${level}">${this._esc(text)}</a>`);
    });

    // Keep the title, replace links
    tocNav.innerHTML = `<div class="toc-title">Contents</div>${links.join('')}`;

    // Handle TOC clicks → smooth-scroll within shadow DOM
    tocNav.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (!a) return;
      e.preventDefault();
      const id = a.getAttribute('href')?.slice(1);
      const target = container.querySelector(`#${id}`);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  _esc(s) {
    return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* ------------------------------------------------------------------ */
  /*  Public API                                                         */
  /* ------------------------------------------------------------------ */

  /** Programmatically reload the markdown (bypasses cache). */
  reload() {
    _cache.delete(this.src);
    this._fetchContent(this.src);
  }

  /** Clear the internal fetch cache. */
  static clearCache() {
    _cache.clear();
  }

  /* ------------------------------------------------------------------ */
  /*  Static Markdown parser                                             */
  /* ------------------------------------------------------------------ */

  /**
   * Convert a Markdown string into HTML.
   *
   * Supports: headings, paragraphs, bold, italic, strikethrough,
   * inline code, code blocks (fenced ```), blockquotes, unordered
   * and ordered lists (with nesting), task lists, links, images,
   * horizontal rules, and GFM-style tables.
   *
   * @param {string} md — Raw Markdown text
   * @returns {string}  HTML string
   */
  static parseMarkdown(md) {
    if (!md) return '';

    const lines = md.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
    const blocks = [];

    let i = 0;
    while (i < lines.length) {
      const line = lines[i];

      // ── Fenced code block ──
      const fenceMatch = line.match(/^(`{3,}|~{3,})\s*(.*)?$/);
      if (fenceMatch) {
        const fence = fenceMatch[1][0];
        const fenceLen = fenceMatch[1].length;
        const lang = (fenceMatch[2] || '').trim();
        const codeLines = [];
        i++;
        while (i < lines.length) {
          const closingMatch = lines[i].match(new RegExp(`^${fence === '`' ? '`' : '~'}{${fenceLen},}\\s*$`));
          if (closingMatch) { i++; break; }
          codeLines.push(lines[i]);
          i++;
        }
        const escaped = UIWiki._escHtml(codeLines.join('\n'));
        const langAttr = lang ? ` class="language-${lang}"` : '';
        blocks.push(`<pre><code${langAttr}>${escaped}</code></pre>`);
        continue;
      }

      // ── Horizontal rule ──
      if (/^(\*{3,}|-{3,}|_{3,})\s*$/.test(line)) {
        blocks.push('<hr>');
        i++;
        continue;
      }

      // ── Heading (ATX) ──
      const headingMatch = line.match(/^(#{1,6})\s+(.+?)(?:\s+#+)?\s*$/);
      if (headingMatch) {
        const level = headingMatch[1].length;
        const text = UIWiki._inlineFormat(headingMatch[2]);
        blocks.push(`<h${level}>${text}</h${level}>`);
        i++;
        continue;
      }

      // ── Blockquote ──
      if (line.match(/^>\s?/)) {
        const quoteLines = [];
        while (i < lines.length && lines[i].match(/^>\s?/)) {
          quoteLines.push(lines[i].replace(/^>\s?/, ''));
          i++;
        }
        const inner = UIWiki.parseMarkdown(quoteLines.join('\n'));
        blocks.push(`<blockquote>${inner}</blockquote>`);
        continue;
      }

      // ── Table ──
      if (i + 1 < lines.length && /^\|/.test(line) && /^\|[\s-:|]+\|/.test(lines[i + 1])) {
        const tableLines = [];
        while (i < lines.length && /^\|/.test(lines[i])) {
          tableLines.push(lines[i]);
          i++;
        }
        blocks.push(UIWiki._parseTable(tableLines));
        continue;
      }

      // ── Unordered list ──
      if (/^(\s*)([-*+])\s/.test(line)) {
        const result = UIWiki._parseList(lines, i, 'ul');
        blocks.push(result.html);
        i = result.end;
        continue;
      }

      // ── Ordered list ──
      if (/^(\s*)\d+[.)]\s/.test(line)) {
        const result = UIWiki._parseList(lines, i, 'ol');
        blocks.push(result.html);
        i = result.end;
        continue;
      }

      // ── Blank line ──
      if (line.trim() === '') {
        i++;
        continue;
      }

      // ── Paragraph (collect consecutive non-blank lines) ──
      const paraLines = [];
      while (i < lines.length && lines[i].trim() !== '' && !UIWiki._isBlockStart(lines, i)) {
        paraLines.push(lines[i]);
        i++;
      }
      if (paraLines.length > 0) {
        blocks.push(`<p>${UIWiki._inlineFormat(paraLines.join('\n'))}</p>`);
      }
    }

    return blocks.join('\n');
  }

  /**
   * Detect whether the current line starts a block-level construct
   * (heading, list, fence, hr, blockquote, table).
   */
  static _isBlockStart(lines, i) {
    const line = lines[i];
    if (/^#{1,6}\s/.test(line)) return true;
    if (/^(\*{3,}|-{3,}|_{3,})\s*$/.test(line)) return true;
    if (/^(`{3,}|~{3,})/.test(line)) return true;
    if (/^>\s?/.test(line)) return true;
    if (/^\s*[-*+]\s/.test(line)) return true;
    if (/^\s*\d+[.)]\s/.test(line)) return true;
    if (/^\|/.test(line) && i + 1 < lines.length && /^\|[\s-:|]+\|/.test(lines[i + 1])) return true;
    return false;
  }

  /** Parse a GFM-style table from the collected lines. */
  static _parseTable(tableLines) {
    const parseRow = (row) =>
      row.replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim());

    const headers = parseRow(tableLines[0]);
    // tableLines[1] is the separator — skip it
    const rows = tableLines.slice(2).map(parseRow);

    const thCells = headers.map((h) => `<th>${UIWiki._inlineFormat(h)}</th>`).join('');
    const bodyRows = rows
      .map((cols) => {
        const tds = cols.map((c) => `<td>${UIWiki._inlineFormat(c)}</td>`).join('');
        return `<tr>${tds}</tr>`;
      })
      .join('\n');

    return `<table><thead><tr>${thCells}</tr></thead><tbody>${bodyRows}</tbody></table>`;
  }

  /**
   * Parse an ordered or unordered list starting at line index `start`.
   * Supports nesting by comparing leading whitespace.
   */
  static _parseList(lines, start, type) {
    const items = [];
    let i = start;
    const baseIndent = (lines[start].match(/^(\s*)/)?.[1] ?? '').length;
    const listPattern = type === 'ul' ? /^(\s*)([-*+])\s(.*)$/ : /^(\s*)(\d+[.)])\s(.*)$/;

    while (i < lines.length) {
      const line = lines[i];
      if (line.trim() === '') { i++; continue; }

      const indent = (line.match(/^(\s*)/)?.[1] ?? '').length;
      if (indent < baseIndent) break;

      const match = line.match(listPattern);
      if (match && indent === baseIndent) {
        let text = match[3];

        // Check for task list items
        const taskMatch = text.match(/^\[([xX ])\]\s(.*)/);
        let taskClass = '';
        let taskPrefix = '';
        if (taskMatch) {
          const checked = taskMatch[1].toLowerCase() === 'x';
          taskClass = ' class="task-item"';
          taskPrefix = `<input type="checkbox"${checked ? ' checked' : ''}>`;
          text = taskMatch[2];
        }

        i++;

        // Gather continuation lines (indented further or sub-lists)
        const subLines = [];
        while (i < lines.length) {
          const subLine = lines[i];
          if (subLine.trim() === '') {
            // Only include blank line if followed by more indented content
            if (i + 1 < lines.length && (lines[i + 1].match(/^(\s*)/)?.[1] ?? '').length > baseIndent) {
              subLines.push(subLine);
              i++;
              continue;
            }
            break;
          }
          const subIndent = (subLine.match(/^(\s*)/)?.[1] ?? '').length;
          if (subIndent <= baseIndent) break;
          subLines.push(subLine);
          i++;
        }

        let subHtml = '';
        if (subLines.length > 0) {
          // Check if sub-lines form a nested list
          const firstSub = subLines.find((l) => l.trim() !== '');
          if (firstSub && (/^\s*[-*+]\s/.test(firstSub) || /^\s*\d+[.)]\s/.test(firstSub))) {
            const subType = /^\s*\d+[.)]\s/.test(firstSub) ? 'ol' : 'ul';
            const result = UIWiki._parseList(subLines, 0, subType);
            subHtml = result.html;
          } else {
            subHtml = UIWiki._inlineFormat(subLines.map((l) => l.trim()).join(' '));
          }
        }

        items.push(`<li${taskClass}>${taskPrefix}${UIWiki._inlineFormat(text)}${subHtml}</li>`);
        continue;
      }

      // Non-matching line at same or deeper indent — break
      if (indent <= baseIndent) break;
      i++;
    }

    return { html: `<${type}>${items.join('\n')}</${type}>`, end: i };
  }

  /**
   * Apply inline Markdown formatting to a string.
   *
   * Handles: images, links, bold, italic, strikethrough, inline code.
   */
  static _inlineFormat(text) {
    if (!text) return '';

    // Escape HTML first (except for our own generated tags)
    let s = UIWiki._escHtml(text);

    // Inline code (backticks) — do first so content inside is protected
    s = s.replace(/`([^`]+?)`/g, '<code>$1</code>');

    // Images: ![alt](url)
    s = s.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');

    // Links: [text](url)
    s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

    // Bold + italic: ***text*** or ___text___
    s = s.replace(/(\*{3}|_{3})(?!\s)(.+?)(?<!\s)\1/g, '<strong><em>$2</em></strong>');

    // Bold: **text** or __text__
    s = s.replace(/(\*{2}|_{2})(?!\s)(.+?)(?<!\s)\1/g, '<strong>$2</strong>');

    // Italic: *text* or _text_
    s = s.replace(/(\*|_)(?!\s)(.+?)(?<!\s)\1/g, '<em>$2</em>');

    // Strikethrough: ~~text~~
    s = s.replace(/~~(.+?)~~/g, '<del>$1</del>');

    // Line breaks: two trailing spaces + newline → <br>
    s = s.replace(/ {2,}\n/g, '<br>');

    // Newlines inside paragraphs → space
    s = s.replace(/\n/g, ' ');

    return s;
  }

  /** Escape HTML special characters. */
  static _escHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
}

customElements.define('ui-wiki', UIWiki);
