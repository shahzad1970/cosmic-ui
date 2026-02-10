import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

/*
 * Smoke-tests for UIText.
 *
 * Validates module resolution, class shape, properties, defaults,
 * rendering, and style logic without a real browser DOM.
 */

// Minimal DOM shims
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

const mod = await import('../../src/components/text/text.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

const { UIText } = mod ?? {};

/* ================================================================== */
/*  Module basics                                                      */
/* ================================================================== */

describe('UIText module', () => {
  it('exports the UIText class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof UIText, 'function');
  });

  it('is registered as ui-text', () => {
    assert.equal(globalThis.customElements.get('ui-text'), UIText);
  });

  it('declares expected static properties', () => {
    const props = UIText.properties;
    for (const key of ['type', 'block', 'display', 'size', 'color', 'weight', 'bold', 'align', 'transform', 'leading', 'spacing', 'wrap', 'indent', 'margin', 'padding', 'decoration', 'muted', 'mono', 'italic', 'underline', 'strike', 'truncate', 'nowrap', 'selectable', 'break', 'lines', 'font']) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
  });

  it('does not have tag, heading, or paragraph properties', () => {
    const props = UIText.properties;
    for (const key of ['tag', 'level', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p']) {
      assert.ok(!(key in props), `Should not have property: ${key}`);
    }
  });

  it('display defaults to empty string', () => {
    assert.equal(UIText.properties.display.default, '');
  });

  it('display is String type', () => {
    assert.equal(UIText.properties.display.type, String);
  });

  it('has correct default values for style properties', () => {
    const p = UIText.properties;
    assert.equal(p.type.default, '');
    assert.equal(p.block.default, false);
    assert.equal(p.display.default, '');
    assert.equal(p.size.default, '');
    assert.equal(p.color.default, '');
    assert.equal(p.weight.default, '');
    assert.equal(p.bold.default, false);
    assert.equal(p.align.default, '');
    assert.equal(p.transform.default, '');
    assert.equal(p.leading.default, '');
    assert.equal(p.spacing.default, '');
    assert.equal(p.wrap.default, '');
    assert.equal(p.indent.default, '');
    assert.equal(p.margin.default, '');
    assert.equal(p.padding.default, '');
    assert.equal(p.decoration.default, '');
    assert.equal(p.muted.default, false);
    assert.equal(p.mono.default, false);
    assert.equal(p.italic.default, false);
    assert.equal(p.underline.default, false);
    assert.equal(p.strike.default, false);
    assert.equal(p.truncate.default, false);
    assert.equal(p.nowrap.default, false);
    assert.equal(p.selectable.default, true);
    assert.equal(p.break.default, '');
    assert.equal(p.lines.default, 0);
    assert.equal(p.font.default, '');
  });
});

/* ================================================================== */
/*  Removed APIs                                                       */
/* ================================================================== */

describe('UIText removed APIs', () => {
  it('does not have _tagAttrs', () => {
    assert.equal(UIText._tagAttrs, undefined);
  });

  it('does not have _blockTags', () => {
    assert.equal(UIText._blockTags, undefined);
  });

  it('does not have _allowedTags', () => {
    assert.equal(UIText._allowedTags, undefined);
  });

  it('does not have _resolveTag method', () => {
    assert.equal(UIText.prototype._resolveTag, undefined);
  });

  it('does not have _rerender method', () => {
    assert.equal(UIText.prototype._rerender, undefined);
  });
});

/* ================================================================== */
/*  Type attribute                                                     */
/* ================================================================== */

describe('UIText type', () => {
  it('_validTypes includes heading and paragraph', () => {
    for (const t of ['heading', 'paragraph']) {
      assert.ok(UIText._validTypes.has(t), `Missing valid type: ${t}`);
    }
  });

  it('_validTypes does not include h1-h6, p, or arbitrary values', () => {
    for (const t of ['h1', 'h2', 'p', 'div', 'span', 'section', '']) {
      assert.ok(!UIText._validTypes.has(t), `Should not be valid: ${t}`);
    }
  });

  it('does not have _headingSizes (no level support)', () => {
    assert.equal(UIText._headingSizes, undefined);
  });

  it('does not have a level property', () => {
    assert.ok(!('level' in UIText.properties));
  });

  it('render() returns h2 for type heading', () => {
    const html = UIText.prototype.render.call({ type: 'heading' });
    assert.equal(html, '<h2><slot></slot></h2>');
  });

  it('render() returns p for type paragraph', () => {
    const html = UIText.prototype.render.call({ type: 'paragraph' });
    assert.equal(html, '<p><slot></slot></p>');
  });

  it('render() returns plain slot for empty type', () => {
    const html = UIText.prototype.render.call({ type: '' });
    assert.equal(html, '<slot></slot>');
  });

  it('render() returns plain slot for invalid type', () => {
    const html = UIText.prototype.render.call({ type: 'div' });
    assert.equal(html, '<slot></slot>');
  });

  it('render() is case-insensitive for type', () => {
    assert.equal(UIText.prototype.render.call({ type: 'Heading' }), '<h2><slot></slot></h2>');
    assert.equal(UIText.prototype.render.call({ type: 'PARAGRAPH' }), '<p><slot></slot></p>');
  });
});

/* ================================================================== */
/*  Weight helpers                                                     */
/* ================================================================== */

describe('UIText weights', () => {
  it('maps named weights to numeric values', () => {
    const w = UIText._weights;
    assert.equal(w.thin, 100);
    assert.equal(w.extralight, 200);
    assert.equal(w.light, 300);
    assert.equal(w.normal, 400);
    assert.equal(w.medium, 500);
    assert.equal(w.semibold, 600);
    assert.equal(w.bold, 700);
    assert.equal(w.extrabold, 800);
    assert.equal(w.black, 900);
  });
});

/* ================================================================== */
/*  Leading helpers                                                    */
/* ================================================================== */

describe('UIText leadings', () => {
  it('maps named line-heights to numeric values', () => {
    const l = UIText._leadings;
    assert.equal(l.none, '1');
    assert.equal(l.tight, '1.25');
    assert.equal(l.snug, '1.375');
    assert.equal(l.normal, '1.6');
    assert.equal(l.relaxed, '1.75');
    assert.equal(l.loose, '2');
  });
});

/* ================================================================== */
/*  Spacing helpers                                                    */
/* ================================================================== */

describe('UIText spacings', () => {
  it('maps named letter-spacings to em values', () => {
    const s = UIText._spacings;
    assert.equal(s.tighter, '-0.05em');
    assert.equal(s.tight, '-0.025em');
    assert.equal(s.normal, '0em');
    assert.equal(s.wide, '0.025em');
    assert.equal(s.wider, '0.05em');
    assert.equal(s.widest, '0.1em');
  });
});

/* ================================================================== */
/*  Break helpers                                                      */
/* ================================================================== */

describe('UIText breaks', () => {
  it('maps named break values to CSS word-break values', () => {
    const b = UIText._breaks;
    assert.equal(b.all, 'break-all');
    assert.equal(b.words, 'break-word');
    assert.equal(b.keep, 'keep-all');
  });
});

/* ================================================================== */
/*  Styles & render                                                    */
/* ================================================================== */

describe('UIText styles & render', () => {
  it('static styles() returns non-empty CSS', () => {
    const css = UIText.styles();
    assert.ok(css.length > 0);
    assert.ok(css.includes(':host'));
  });

  it('styles use --_display var defaulting to inline', () => {
    const css = UIText.styles();
    assert.ok(css.includes('--_display'));
    assert.ok(css.includes('inline'));
  });

  it('styles include block shorthand rule', () => {
    const css = UIText.styles();
    assert.ok(css.includes(':host([block])'));
  });

  it('styles include bold shorthand rule', () => {
    const css = UIText.styles();
    assert.ok(css.includes(':host([bold])'));
  });

  it('styles include strike rule', () => {
    const css = UIText.styles();
    assert.ok(css.includes(':host([strike])'));
    assert.ok(css.includes('line-through'));
  });

  it('styles include selectable=false rule', () => {
    const css = UIText.styles();
    assert.ok(css.includes('user-select'));
    assert.ok(css.includes(':host([selectable="false"])'));
  });

  it('does not have heading or paragraph CSS selectors', () => {
    const css = UIText.styles();
    assert.ok(!css.includes(':host([heading])'));
    assert.ok(!css.includes(':host([paragraph])'));
  });

  it('styles include truncate ellipsis rule', () => {
    const css = UIText.styles();
    assert.ok(css.includes('text-overflow'));
    assert.ok(css.includes('ellipsis'));
  });

  it('styles include muted colour rule', () => {
    const css = UIText.styles();
    assert.ok(css.includes(':host([muted])'));
    assert.ok(css.includes('--ui-text-muted'));
  });

  it('styles include mono font rule', () => {
    const css = UIText.styles();
    assert.ok(css.includes(':host([mono])'));
    assert.ok(css.includes('monospace'));
  });

  it('styles include italic rule', () => {
    const css = UIText.styles();
    assert.ok(css.includes(':host([italic])'));
  });

  it('styles include underline rule', () => {
    const css = UIText.styles();
    assert.ok(css.includes(':host([underline])'));
  });

  it('styles include nowrap rule', () => {
    const css = UIText.styles();
    assert.ok(css.includes(':host([nowrap])'));
  });

  it('styles include type block rule', () => {
    const css = UIText.styles();
    assert.ok(css.includes(':host([type])'));
  });

  it('styles include lines clamp rule', () => {
    const css = UIText.styles();
    assert.ok(css.includes(':host([lines])'));
    assert.ok(css.includes('-webkit-box-orient'));
  });

  it('styles include semantic element reset', () => {
    const css = UIText.styles();
    assert.ok(css.includes('h2, p'));
  });

  it('render() returns only a slot when type is empty (no wrapper element)', () => {
    const html = UIText.prototype.render.call({ type: '' });
    assert.equal(html, '<slot></slot>');
  });

  it('render() wraps slot in h2 when type is heading', () => {
    const html = UIText.prototype.render.call({ type: 'heading' });
    assert.equal(html, '<h2><slot></slot></h2>');
  });

  it('render() wraps slot in p when type is paragraph', () => {
    const html = UIText.prototype.render.call({ type: 'paragraph' });
    assert.equal(html, '<p><slot></slot></p>');
  });
});
