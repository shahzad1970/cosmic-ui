import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

/*
 * Smoke-test for UICard.
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

const mod = await import('../../src/components/card/card.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UICard module', () => {
  it('exports the UICard class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UICard, 'function');
  });

  it('is registered as ui-card', () => {
    const ctor = globalThis.customElements.get('ui-card');
    assert.ok(ctor, 'ui-card should be registered');
    assert.equal(ctor, mod.UICard);
  });

  it('declares expected static properties', () => {
    const props = mod.UICard.properties;
    for (const key of ['background', 'color', 'size', 'elevation', 'outline', 'flat', 'clickable']) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
  });

  it('has correct default values', () => {
    const p = mod.UICard.properties;
    assert.equal(p.background.default, '');
    assert.equal(p.color.default, '');
    assert.equal(p.size.default, '');
    assert.equal(p.elevation.default, '');
    assert.equal(p.outline.default, false);
    assert.equal(p.flat.default, false);
    assert.equal(p.clickable.default, false);
  });

  it('has Boolean type for toggle properties', () => {
    const p = mod.UICard.properties;
    assert.equal(p.outline.type, Boolean);
    assert.equal(p.flat.type, Boolean);
    assert.equal(p.clickable.type, Boolean);
  });
});
