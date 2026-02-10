import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

/*
 * Smoke-test for UICardHeader.
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

const mod = await import('../../src/components/card/header.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UICardHeader module', () => {
  it('exports the UICardHeader class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UICardHeader, 'function');
  });

  it('is registered as ui-card-header', () => {
    const ctor = globalThis.customElements.get('ui-card-header');
    assert.ok(ctor, 'ui-card-header should be registered');
    assert.equal(ctor, mod.UICardHeader);
  });

  it('declares expected static properties', () => {
    const props = mod.UICardHeader.properties;
    for (const key of ['background', 'color', 'size', 'border']) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
  });

  it('has correct default values', () => {
    const p = mod.UICardHeader.properties;
    assert.equal(p.background.default, '');
    assert.equal(p.color.default, '');
    assert.equal(p.size.default, '');
    assert.equal(p.border.default, false);
  });

  it('border is Boolean type', () => {
    assert.equal(mod.UICardHeader.properties.border.type, Boolean);
  });
});
