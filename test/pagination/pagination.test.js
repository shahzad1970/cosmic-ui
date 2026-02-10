import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

/*
 * Tests for UIPagination.
 */

// Provide minimal DOM shims so the module can load in Node.
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

const mod = await import('../../src/components/pagination/pagination.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UIPagination module', () => {
  it('exports the UIPagination class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UIPagination, 'function');
  });

  it('is registered as ui-pagination', () => {
    const ctor = globalThis.customElements.get('ui-pagination');
    assert.ok(ctor, 'ui-pagination should be registered');
    assert.equal(ctor, mod.UIPagination);
  });

  it('declares all 8 static properties', () => {
    const props = mod.UIPagination.properties;
    for (const key of ['total', 'current', 'siblings', 'background', 'color', 'size', 'disabled', 'compact']) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
    assert.equal(Object.keys(props).length, 8, 'Should have exactly 8 properties');
  });

  it('has correct default values', () => {
    const p = mod.UIPagination.properties;
    assert.equal(p.total.default, 1);
    assert.equal(p.current.default, 1);
    assert.equal(p.siblings.default, 1);
    assert.equal(p.background.default, 'indigo-500');
    assert.equal(p.color.default, '');
    assert.equal(p.size.default, '');
    assert.equal(p.disabled.default, false);
    assert.equal(p.compact.default, false);
  });

  it('total, current, siblings are Number type', () => {
    const p = mod.UIPagination.properties;
    assert.equal(p.total.type, Number);
    assert.equal(p.current.type, Number);
    assert.equal(p.siblings.type, Number);
  });

  it('disabled and compact are Boolean type', () => {
    const p = mod.UIPagination.properties;
    assert.equal(p.disabled.type, Boolean);
    assert.equal(p.compact.type, Boolean);
  });

  it('all properties reflect', () => {
    const p = mod.UIPagination.properties;
    for (const key of Object.keys(p)) {
      assert.equal(p[key].reflect, true, `${key} should reflect`);
    }
  });

  it('does not override attributeChangedCallback', () => {
    const own = Object.getOwnPropertyDescriptor(mod.UIPagination.prototype, 'attributeChangedCallback');
    assert.equal(own, undefined, 'Should not have own attributeChangedCallback');
  });

  it('has merged _applyStyles method (not separate methods)', () => {
    assert.equal(typeof mod.UIPagination.prototype._applyStyles, 'function');
    assert.equal(mod.UIPagination.prototype._applySize, undefined, 'Should not have _applySize');
    assert.equal(mod.UIPagination.prototype._applyColors, undefined, 'Should not have _applyColors');
  });

  it('has _update that calls _applyStyles', () => {
    assert.equal(typeof mod.UIPagination.prototype._update, 'function');
  });

  it('uses named _onPageClick handler (not handleEvent)', () => {
    assert.equal(typeof mod.UIPagination.prototype._onPageClick, 'function');
    assert.equal(mod.UIPagination.prototype.handleEvent, undefined, 'Should not use handleEvent pattern');
  });

  it('event listener bound in constructor, added in connectedCallback', () => {
    assert.equal(typeof mod.UIPagination.prototype.connectedCallback, 'function');
    assert.equal(typeof mod.UIPagination.prototype.disconnectedCallback, 'function');
  });

  /* ── Styles ── */

  it('static styles() returns non-empty CSS', () => {
    const css = mod.UIPagination.styles();
    assert.ok(css.length > 0);
    assert.ok(css.includes(':host'));
  });

  it('styles include disabled state', () => {
    const css = mod.UIPagination.styles();
    assert.ok(css.includes(':host([disabled])'));
    assert.ok(css.includes('pointer-events: none'));
  });

  it('styles include active button styling', () => {
    const css = mod.UIPagination.styles();
    assert.ok(css.includes('button.active'));
    assert.ok(css.includes('--_active-bg'));
  });

  it('styles include ellipsis and compact-label classes', () => {
    const css = mod.UIPagination.styles();
    assert.ok(css.includes('.ellipsis'));
    assert.ok(css.includes('.compact-label'));
  });

  it('styles include focus-visible ring', () => {
    const css = mod.UIPagination.styles();
    assert.ok(css.includes('focus-visible'));
    assert.ok(css.includes('--ui-focus-ring'));
  });

  it('styles include arrow SVG sizing', () => {
    const css = mod.UIPagination.styles();
    assert.ok(css.includes('.arrow svg'));
  });

  /* ── _getRange() logic ── */

  it('_getRange returns [1] for 1-page total', () => {
    const inst = Object.create(mod.UIPagination.prototype);
    inst.total = 1; inst.current = 1; inst.siblings = 1;
    assert.deepEqual(inst._getRange(), [1]);
  });

  it('_getRange returns [1,2,3] for 3 pages, current=2', () => {
    const inst = Object.create(mod.UIPagination.prototype);
    inst.total = 3; inst.current = 2; inst.siblings = 1;
    assert.deepEqual(inst._getRange(), [1, 2, 3]);
  });

  it('_getRange returns all pages when total <= 2*siblings+3', () => {
    const inst = Object.create(mod.UIPagination.prototype);
    inst.total = 5; inst.current = 3; inst.siblings = 1;
    assert.deepEqual(inst._getRange(), [1, 2, 3, 4, 5]);
  });

  it('_getRange shows right ellipsis when current is near start', () => {
    const inst = Object.create(mod.UIPagination.prototype);
    inst.total = 20; inst.current = 1; inst.siblings = 1;
    const range = inst._getRange();
    assert.equal(range[0], 1);
    assert.ok(range.includes('…'), 'Should have ellipsis');
    assert.equal(range[range.length - 1], 20);
  });

  it('_getRange shows left ellipsis when current is near end', () => {
    const inst = Object.create(mod.UIPagination.prototype);
    inst.total = 20; inst.current = 20; inst.siblings = 1;
    const range = inst._getRange();
    assert.equal(range[0], 1);
    assert.ok(range.includes('…'), 'Should have ellipsis');
    assert.equal(range[range.length - 1], 20);
  });

  it('_getRange shows both ellipses when current is in the middle', () => {
    const inst = Object.create(mod.UIPagination.prototype);
    inst.total = 20; inst.current = 10; inst.siblings = 1;
    const range = inst._getRange();
    assert.equal(range[0], 1);
    assert.equal(range[range.length - 1], 20);
    // Filter ellipses
    const ellipses = range.filter(x => x === '…');
    assert.equal(ellipses.length, 2, 'Should have two ellipses');
  });

  it('_getRange respects siblings count', () => {
    const inst = Object.create(mod.UIPagination.prototype);
    inst.total = 30; inst.current = 15; inst.siblings = 3;
    const range = inst._getRange();
    // Should include pages 12-18 around current=15
    for (let i = 12; i <= 18; i++) {
      assert.ok(range.includes(i), `Should include page ${i}`);
    }
  });

  it('_getRange clamps current to [1, total]', () => {
    const inst = Object.create(mod.UIPagination.prototype);
    inst.total = 5; inst.current = 99; inst.siblings = 1;
    const range = inst._getRange();
    // Should clamp to last page area
    assert.equal(range[range.length - 1], 5);
    assert.ok(!range.includes(99));
  });

  /* ── render() ── */

  it('render() includes prev/next arrow buttons', () => {
    const inst = Object.create(mod.UIPagination.prototype);
    inst.total = 10; inst.current = 5; inst.compact = false; inst.siblings = 1;
    const html = inst.render();
    assert.ok(html.includes('aria-label="Previous page"'));
    assert.ok(html.includes('aria-label="Next page"'));
    assert.ok(html.includes('<svg'));
  });

  it('render() marks active page with active class and aria-current', () => {
    const inst = Object.create(mod.UIPagination.prototype);
    inst.total = 5; inst.current = 3; inst.compact = false; inst.siblings = 1;
    const html = inst.render();
    assert.ok(html.includes('class="active"'));
    assert.ok(html.includes('aria-current="page"'));
  });

  it('render() disables prev button on first page', () => {
    const inst = Object.create(mod.UIPagination.prototype);
    inst.total = 5; inst.current = 1; inst.compact = false; inst.siblings = 1;
    const html = inst.render();
    // The prev button should have disabled and data-page="0"
    assert.ok(html.includes('data-page="0"'));
  });

  it('render() disables next button on last page', () => {
    const inst = Object.create(mod.UIPagination.prototype);
    inst.total = 5; inst.current = 5; inst.compact = false; inst.siblings = 1;
    const html = inst.render();
    // The next button should have disabled and data-page="6"
    assert.ok(html.includes('data-page="6"'));
  });

  it('compact mode shows current/total label instead of page buttons', () => {
    const inst = Object.create(mod.UIPagination.prototype);
    inst.total = 10; inst.current = 3; inst.compact = true; inst.siblings = 1;
    const html = inst.render();
    assert.ok(html.includes('compact-label'));
    assert.ok(html.includes('3 / 10'));
    // Should not have ellipsis or page number buttons
    assert.ok(!html.includes('ellipsis'));
  });

  it('compact mode still has prev/next arrows', () => {
    const inst = Object.create(mod.UIPagination.prototype);
    inst.total = 10; inst.current = 5; inst.compact = true; inst.siblings = 1;
    const html = inst.render();
    assert.ok(html.includes('aria-label="Previous page"'));
    assert.ok(html.includes('aria-label="Next page"'));
  });

  it('renders ellipsis spans for truncated ranges', () => {
    const inst = Object.create(mod.UIPagination.prototype);
    inst.total = 50; inst.current = 25; inst.compact = false; inst.siblings = 1;
    const html = inst.render();
    assert.ok(html.includes('class="ellipsis"'));
  });
});
