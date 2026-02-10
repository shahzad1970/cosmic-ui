import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

/*
 * Smoke-test for UICardFooter.
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

const mod = await import('../../src/components/card/footer.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UICardFooter module', () => {
  it('exports the UICardFooter class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UICardFooter, 'function');
  });

  it('is registered as ui-card-footer', () => {
    const ctor = globalThis.customElements.get('ui-card-footer');
    assert.ok(ctor, 'ui-card-footer should be registered');
    assert.equal(ctor, mod.UICardFooter);
  });

  it('declares expected static properties', () => {
    const props = mod.UICardFooter.properties;
    for (const key of ['background', 'color', 'size']) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
  });

  it('has correct default values', () => {
    const p = mod.UICardFooter.properties;
    assert.equal(p.background.default, '');
    assert.equal(p.color.default, '');
    assert.equal(p.size.default, '');
  });
});
