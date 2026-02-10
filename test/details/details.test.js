import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

/*
 * Smoke-test for UIDetails.
 */

// Minimal DOM shims.
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

const mod = await import('../../src/components/details/details.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UIDetails module', () => {
  it('exports the UIDetails class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UIDetails, 'function');
  });

  it('is registered as ui-details', () => {
    const ctor = globalThis.customElements.get('ui-details');
    assert.ok(ctor, 'ui-details should be registered');
    assert.equal(ctor, mod.UIDetails);
  });

  it('declares expected static properties', () => {
    const props = mod.UIDetails.properties;
    for (const key of ['summary', 'open', 'background', 'color', 'size', 'elevation', 'outline', 'flat']) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
  });

  it('has correct default values', () => {
    const p = mod.UIDetails.properties;
    assert.equal(p.summary.default, 'Details');
    assert.equal(p.open.default, false);
    assert.equal(p.background.default, '');
    assert.equal(p.color.default, '');
    assert.equal(p.size.default, '');
    assert.equal(p.elevation.default, '');
    assert.equal(p.outline.default, false);
    assert.equal(p.flat.default, false);
  });

  it('open, outline, flat are Boolean type', () => {
    const p = mod.UIDetails.properties;
    assert.equal(p.open.type, Boolean);
    assert.equal(p.outline.type, Boolean);
    assert.equal(p.flat.type, Boolean);
  });

  it('static styles() returns non-empty CSS', () => {
    const css = mod.UIDetails.styles();
    assert.ok(css.length > 0);
    assert.ok(css.includes(':host'));
  });

  it('styles include summary and chevron rules', () => {
    const css = mod.UIDetails.styles();
    assert.ok(css.includes('summary'));
    assert.ok(css.includes('.chevron'));
  });

  it('styles include chevron rotation on open', () => {
    const css = mod.UIDetails.styles();
    assert.ok(css.includes('details[open] .chevron'));
    assert.ok(css.includes('rotate(180deg)'));
  });

  it('styles include summary hover', () => {
    const css = mod.UIDetails.styles();
    assert.ok(css.includes('summary:hover'));
  });

  it('styles include focus-visible ring', () => {
    const css = mod.UIDetails.styles();
    assert.ok(css.includes('summary:focus-visible'));
    assert.ok(css.includes('--ui-focus-ring'));
  });

  it('render includes native details and summary', () => {
    const inst = Object.create(mod.UIDetails.prototype);
    inst.summary = 'Test';
    inst.open = false;
    const html = mod.UIDetails.prototype.render.call(inst);
    assert.ok(html.includes('<details'));
    assert.ok(html.includes('<summary>'));
    assert.ok(html.includes('<slot>'));
  });

  it('render includes open attribute when open=true', () => {
    const inst = Object.create(mod.UIDetails.prototype);
    inst.summary = 'Test';
    inst.open = true;
    const html = mod.UIDetails.prototype.render.call(inst);
    assert.ok(html.includes('<details open'));
  });

  it('render escapes summary text', () => {
    const inst = Object.create(mod.UIDetails.prototype);
    inst.summary = '<script>';
    inst.open = false;
    const html = mod.UIDetails.prototype.render.call(inst);
    assert.ok(html.includes('&lt;script&gt;'));
    assert.ok(!html.includes('<script>'));
  });
});
