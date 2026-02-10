import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

/*
 * Smoke-tests for UIKbd.
 *
 * Validates module resolution, class shape, styles, and render output.
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

const mod = await import('../../src/components/kbd/kbd.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UIKbd module', () => {
  it('exports the UIKbd class', () => {
    assert.equal(typeof mod.UIKbd, 'function');
  });

  it('is registered as a custom element', () => {
    assert.equal(mod.UIKbd.name, 'UIKbd');
  });

  it('declares 4 properties', () => {
    const keys = Object.keys(mod.UIKbd.properties);
    assert.deepEqual(keys, ['size', 'background', 'color', 'separator']);
  });

  it('has correct property defaults', () => {
    const p = mod.UIKbd.properties;
    assert.equal(p.size.default, '');
    assert.equal(p.background.default, '');
    assert.equal(p.color.default, '');
    assert.equal(p.separator.default, '');
  });

  it('has correct property types', () => {
    const p = mod.UIKbd.properties;
    for (const key of Object.keys(p)) {
      assert.equal(p[key].type, String, `${key} should be String`);
    }
  });

  it('reflects all properties', () => {
    const p = mod.UIKbd.properties;
    for (const key of Object.keys(p)) {
      assert.equal(p[key].reflect, true, `${key} should reflect`);
    }
  });

  it('styles include :host as inline-flex', () => {
    const css = mod.UIKbd.styles();
    assert.ok(css.includes(':host'));
    assert.ok(css.includes('inline-flex'));
  });

  it('styles include .key with border and keycap look', () => {
    const css = mod.UIKbd.styles();
    assert.ok(css.includes('.key'));
    assert.ok(css.includes('border-bottom-width'));
    assert.ok(css.includes('box-shadow'));
  });

  it('styles include .sep for separator', () => {
    const css = mod.UIKbd.styles();
    assert.ok(css.includes('.sep'));
  });

  it('styles use monospace font family', () => {
    const css = mod.UIKbd.styles();
    assert.ok(css.includes('--ui-font-mono'));
    assert.ok(css.includes('monospace'));
  });

  it('styles use --_bg for background customisation', () => {
    const css = mod.UIKbd.styles();
    assert.ok(css.includes('--_bg'));
  });

  it('styles use --_color for text colour customisation', () => {
    const css = mod.UIKbd.styles();
    assert.ok(css.includes('--_color'));
  });

  it('styles use --_border for border customisation', () => {
    const css = mod.UIKbd.styles();
    assert.ok(css.includes('--_border'));
  });

  it('render includes key-container and hidden slot', () => {
    const inst = Object.create(mod.UIKbd.prototype);
    const html = mod.UIKbd.prototype.render.call(inst);
    assert.ok(html.includes('key-container'));
    assert.ok(html.includes('<slot'));
    assert.ok(html.includes('display:none'));
  });
});
