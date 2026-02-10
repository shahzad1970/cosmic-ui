import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

/* ── Minimal DOM shim ────────────────────────────────────────────────── */
if (typeof globalThis.HTMLElement === 'undefined') {
  globalThis.HTMLElement = class HTMLElement {};
  globalThis.CSSStyleSheet = undefined;
  globalThis.CustomEvent = class CustomEvent extends Event {
    constructor(type, opts = {}) { super(type, opts); this.detail = opts.detail ?? null; }
  };
  globalThis.customElements = {
    _reg: new Map(),
    define(name, ctor) { this._reg.set(name, ctor); },
    get(name) { return this._reg.get(name); },
  };
}

const mod = await import('../../src/components/wiki/wiki.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

/* ── Module export ─────────────────────────────────────────────────── */
describe('UIWiki module', () => {
  it('exports the UIWiki class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UIWiki, 'function');
  });

  it('is registered as ui-wiki', () => {
    assert.equal(customElements.get('ui-wiki'), mod.UIWiki);
  });

  it('declares expected static properties', () => {
    const props = mod.UIWiki.properties;
    for (const key of ['src', 'background', 'color', 'size', 'padding', 'nocache', 'toc']) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
  });

  it('has correct default values', () => {
    const p = mod.UIWiki.properties;
    assert.equal(p.src.default, '');
    assert.equal(p.background.default, '');
    assert.equal(p.color.default, '');
    assert.equal(p.size.default, '');
    assert.equal(p.padding.default, '');
    assert.equal(p.nocache.default, false);
    assert.equal(p.toc.default, false);
  });

  it('properties have correct types', () => {
    const p = mod.UIWiki.properties;
    assert.equal(p.src.type, String);
    assert.equal(p.background.type, String);
    assert.equal(p.color.type, String);
    assert.equal(p.size.type, String);
    assert.equal(p.padding.type, String);
    assert.equal(p.nocache.type, Boolean);
    assert.equal(p.toc.type, Boolean);
  });

  it('all properties reflect', () => {
    const p = mod.UIWiki.properties;
    for (const key of Object.keys(p)) {
      assert.notEqual(p[key].reflect, false, `${key} should reflect`);
    }
  });

  it('has static styles()', () => {
    const css = mod.UIWiki.styles();
    assert.ok(css.includes(':host'), 'Should include :host selector');
    assert.ok(css.includes('display: block'), 'Should be block-level');
  });

  it('styles include .content heading rules', () => {
    const css = mod.UIWiki.styles();
    assert.ok(css.includes('.content h1'), 'Should style h1');
    assert.ok(css.includes('.content h2'), 'Should style h2');
    assert.ok(css.includes('.content pre'), 'Should style pre');
  });

  it('styles include .toc rules', () => {
    const css = mod.UIWiki.styles();
    assert.ok(css.includes('.toc'), 'Should have TOC styles');
    assert.ok(css.includes('.toc-title'), 'Should style TOC title');
  });

  it('styles include table rules', () => {
    const css = mod.UIWiki.styles();
    assert.ok(css.includes('.content table'), 'Should style tables');
    assert.ok(css.includes('.content th'), 'Should style th');
  });

  it('styles include blockquote rules', () => {
    const css = mod.UIWiki.styles();
    assert.ok(css.includes('.content blockquote'), 'Should style blockquotes');
  });

  it('styles include code block rules', () => {
    const css = mod.UIWiki.styles();
    assert.ok(css.includes('.content pre code'), 'Should style code in pre');
  });

  it('styles include responsive media query', () => {
    const css = mod.UIWiki.styles();
    assert.ok(css.includes('@media'), 'Should have responsive breakpoint');
  });

  it('render() includes .content container', () => {
    const instance = Object.create(mod.UIWiki.prototype);
    instance.toc = false;
    const html = instance.render();
    assert.ok(html.includes('class="content"'), 'Should have .content div');
    assert.ok(html.includes('<slot>'), 'Should include a <slot>');
  });

  it('render() includes TOC nav when toc is true', () => {
    const instance = Object.create(mod.UIWiki.prototype);
    instance.toc = true;
    const html = instance.render();
    assert.ok(html.includes('class="toc"'), 'Should have .toc nav');
    assert.ok(html.includes('wiki--toc'), 'Should add toc class to wrapper');
  });

  it('render() omits TOC nav when toc is false', () => {
    const instance = Object.create(mod.UIWiki.prototype);
    instance.toc = false;
    const html = instance.render();
    assert.ok(!html.includes('class="toc"'), 'Should not have .toc nav');
  });

  it('has reload() method', () => {
    assert.equal(typeof mod.UIWiki.prototype.reload, 'function');
  });

  it('has static clearCache() method', () => {
    assert.equal(typeof mod.UIWiki.clearCache, 'function');
  });

  it('has _fetchContent method', () => {
    assert.equal(typeof mod.UIWiki.prototype._fetchContent, 'function');
  });

  it('has _renderMarkdown method', () => {
    assert.equal(typeof mod.UIWiki.prototype._renderMarkdown, 'function');
  });

  it('has _buildTOC method', () => {
    assert.equal(typeof mod.UIWiki.prototype._buildTOC, 'function');
  });

  it('has _applyStyles method', () => {
    assert.equal(typeof mod.UIWiki.prototype._applyStyles, 'function');
  });

  it('has _esc method', () => {
    assert.equal(typeof mod.UIWiki.prototype._esc, 'function');
    const instance = Object.create(mod.UIWiki.prototype);
    assert.equal(instance._esc('<b>"hi"</b>'), '&lt;b&gt;&quot;hi&quot;&lt;/b&gt;');
    assert.equal(instance._esc(null), '');
    assert.equal(instance._esc(undefined), '');
  });
});

/* ── Markdown parser ──────────────────────────────────────────────── */
describe('UIWiki.parseMarkdown', () => {
  const parse = mod.UIWiki.parseMarkdown;

  it('returns empty string for empty input', () => {
    assert.equal(parse(''), '');
    assert.equal(parse(null), '');
    assert.equal(parse(undefined), '');
  });

  /* ── Headings ───────────────────────────────────────────── */
  it('parses ATX headings h1–h6', () => {
    assert.ok(parse('# Title').includes('<h1>Title</h1>'));
    assert.ok(parse('## Sub').includes('<h2>Sub</h2>'));
    assert.ok(parse('### Third').includes('<h3>Third</h3>'));
    assert.ok(parse('#### Fourth').includes('<h4>Fourth</h4>'));
    assert.ok(parse('##### Fifth').includes('<h5>Fifth</h5>'));
    assert.ok(parse('###### Sixth').includes('<h6>Sixth</h6>'));
  });

  it('strips trailing # from headings', () => {
    assert.ok(parse('## Hello ##').includes('<h2>Hello</h2>'));
  });

  /* ── Paragraphs ─────────────────────────────────────────── */
  it('wraps plain text in <p>', () => {
    const html = parse('Hello world');
    assert.ok(html.includes('<p>Hello world</p>'));
  });

  it('merges consecutive lines into one paragraph', () => {
    const html = parse('line one\nline two');
    assert.ok(html.includes('<p>'));
    assert.ok(html.includes('line one'));
    assert.ok(html.includes('line two'));
  });

  /* ── Bold / Italic / Strikethrough ──────────────────────── */
  it('parses bold with **', () => {
    const html = parse('**bold text**');
    assert.ok(html.includes('<strong>bold text</strong>'));
  });

  it('parses italic with *', () => {
    const html = parse('*italic text*');
    assert.ok(html.includes('<em>italic text</em>'));
  });

  it('parses strikethrough with ~~', () => {
    const html = parse('~~deleted~~');
    assert.ok(html.includes('<del>deleted</del>'));
  });

  it('parses bold-italic with ***', () => {
    const html = parse('***both***');
    assert.ok(html.includes('<strong><em>both</em></strong>'));
  });

  /* ── Inline code ────────────────────────────────────────── */
  it('parses inline code', () => {
    const html = parse('Use `console.log()` here');
    assert.ok(html.includes('<code>console.log()</code>'));
  });

  /* ── Links ──────────────────────────────────────────────── */
  it('parses links', () => {
    const html = parse('[Google](https://google.com)');
    assert.ok(html.includes('<a href="https://google.com"'));
    assert.ok(html.includes('>Google</a>'));
  });

  /* ── Images ─────────────────────────────────────────────── */
  it('parses images', () => {
    const html = parse('![alt text](image.png)');
    assert.ok(html.includes('<img src="image.png" alt="alt text">'));
  });

  /* ── Fenced code blocks ─────────────────────────────────── */
  it('parses fenced code blocks with ```', () => {
    const md = '```js\nconst x = 1;\n```';
    const html = parse(md);
    assert.ok(html.includes('<pre>'));
    assert.ok(html.includes('<code class="language-js">'));
    assert.ok(html.includes('const x = 1;'));
  });

  it('parses fenced code blocks without language', () => {
    const md = '```\nhello\n```';
    const html = parse(md);
    assert.ok(html.includes('<pre><code>hello</code></pre>'));
  });

  it('escapes HTML inside code blocks', () => {
    const md = '```\n<div>test</div>\n```';
    const html = parse(md);
    assert.ok(html.includes('&lt;div&gt;'));
    assert.ok(!html.includes('<div>test</div>'));
  });

  /* ── Blockquotes ────────────────────────────────────────── */
  it('parses blockquotes', () => {
    const html = parse('> quoted text');
    assert.ok(html.includes('<blockquote>'));
    assert.ok(html.includes('quoted text'));
  });

  it('handles multi-line blockquotes', () => {
    const html = parse('> line 1\n> line 2');
    assert.ok(html.includes('<blockquote>'));
    assert.ok(html.includes('line 1'));
    assert.ok(html.includes('line 2'));
  });

  /* ── Unordered lists ────────────────────────────────────── */
  it('parses unordered lists with -', () => {
    const html = parse('- item 1\n- item 2');
    assert.ok(html.includes('<ul>'));
    assert.ok(html.includes('<li>item 1</li>'));
    assert.ok(html.includes('<li>item 2</li>'));
  });

  it('parses unordered lists with *', () => {
    const html = parse('* alpha\n* beta');
    assert.ok(html.includes('<ul>'));
    assert.ok(html.includes('<li>alpha</li>'));
  });

  /* ── Ordered lists ──────────────────────────────────────── */
  it('parses ordered lists', () => {
    const html = parse('1. first\n2. second');
    assert.ok(html.includes('<ol>'));
    assert.ok(html.includes('<li>first</li>'));
    assert.ok(html.includes('<li>second</li>'));
  });

  /* ── Task lists ─────────────────────────────────────────── */
  it('parses task list items', () => {
    const html = parse('- [x] done\n- [ ] todo');
    assert.ok(html.includes('class="task-item"'));
    assert.ok(html.includes('checked'));
    assert.ok(html.includes('type="checkbox"'));
  });

  /* ── Horizontal rules ──────────────────────────────────── */
  it('parses horizontal rules (---)', () => {
    const html = parse('---');
    assert.ok(html.includes('<hr>'));
  });

  it('parses horizontal rules (***)', () => {
    const html = parse('***');
    assert.ok(html.includes('<hr>'));
  });

  it('parses horizontal rules (___)', () => {
    const html = parse('___');
    assert.ok(html.includes('<hr>'));
  });

  /* ── Tables ─────────────────────────────────────────────── */
  it('parses GFM tables', () => {
    const md = '| Name | Age |\n|------|-----|\n| Alice | 30 |\n| Bob | 25 |';
    const html = parse(md);
    assert.ok(html.includes('<table>'));
    assert.ok(html.includes('<thead>'));
    assert.ok(html.includes('<th>Name</th>'));
    assert.ok(html.includes('<th>Age</th>'));
    assert.ok(html.includes('<td>Alice</td>'));
    assert.ok(html.includes('<td>30</td>'));
  });

  /* ── HTML escaping ──────────────────────────────────────── */
  it('escapes HTML in paragraphs', () => {
    const html = parse('<script>alert("xss")</script>');
    assert.ok(!html.includes('<script>'));
    assert.ok(html.includes('&lt;script&gt;'));
  });

  /* ── Mixed content ──────────────────────────────────────── */
  it('handles mixed content correctly', () => {
    const md = '# Title\n\nSome text.\n\n- item\n\n> quote';
    const html = parse(md);
    assert.ok(html.includes('<h1>Title</h1>'));
    assert.ok(html.includes('<p>Some text.</p>'));
    assert.ok(html.includes('<ul>'));
    assert.ok(html.includes('<blockquote>'));
  });

  it('handles Windows line endings (\\r\\n)', () => {
    const md = '# Title\r\n\r\nParagraph.';
    const html = parse(md);
    assert.ok(html.includes('<h1>Title</h1>'));
    assert.ok(html.includes('<p>Paragraph.</p>'));
  });
});

/* ── Static helpers ───────────────────────────────────────────────── */
describe('UIWiki static helpers', () => {
  it('_escHtml escapes special characters', () => {
    const escaped = mod.UIWiki._escHtml('<div class="x">&');
    assert.ok(escaped.includes('&lt;'));
    assert.ok(escaped.includes('&gt;'));
    assert.ok(escaped.includes('&quot;'));
    assert.ok(escaped.includes('&amp;'));
  });

  it('_inlineFormat handles bold', () => {
    const html = mod.UIWiki._inlineFormat('**test**');
    assert.ok(html.includes('<strong>test</strong>'));
  });

  it('_inlineFormat handles italic', () => {
    const html = mod.UIWiki._inlineFormat('*test*');
    assert.ok(html.includes('<em>test</em>'));
  });

  it('_inlineFormat handles images before links', () => {
    const html = mod.UIWiki._inlineFormat('![pic](a.png) and [link](b.html)');
    assert.ok(html.includes('<img src="a.png"'));
    assert.ok(html.includes('<a href="b.html"'));
  });

  it('_isBlockStart detects headings', () => {
    assert.ok(mod.UIWiki._isBlockStart(['## Heading'], 0));
  });

  it('_isBlockStart detects fenced code', () => {
    assert.ok(mod.UIWiki._isBlockStart(['```js'], 0));
  });

  it('_isBlockStart detects horizontal rules', () => {
    assert.ok(mod.UIWiki._isBlockStart(['---'], 0));
  });

  it('_isBlockStart detects blockquotes', () => {
    assert.ok(mod.UIWiki._isBlockStart(['> text'], 0));
  });

  it('_isBlockStart detects lists', () => {
    assert.ok(mod.UIWiki._isBlockStart(['- item'], 0));
    assert.ok(mod.UIWiki._isBlockStart(['1. item'], 0));
  });

  it('_isBlockStart returns false for plain text', () => {
    assert.ok(!mod.UIWiki._isBlockStart(['just text'], 0));
  });

  it('_parseTable produces valid HTML', () => {
    const lines = ['| A | B |', '|---|---|', '| 1 | 2 |'];
    const html = mod.UIWiki._parseTable(lines);
    assert.ok(html.includes('<table>'));
    assert.ok(html.includes('</table>'));
    assert.ok(html.includes('<th>A</th>'));
    assert.ok(html.includes('<td>1</td>'));
  });
});
