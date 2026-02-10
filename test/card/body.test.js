import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

/*
 * Smoke-test for UICardBody.
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

const mod = await import('../../src/components/card/body.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UICardBody module', () => {
  it('exports the UICardBody class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UICardBody, 'function');
  });

  it('is registered as ui-card-body', () => {
    const ctor = globalThis.customElements.get('ui-card-body');
    assert.ok(ctor, 'ui-card-body should be registered');
    assert.equal(ctor, mod.UICardBody);
  });

  it('declares expected static properties', () => {
    const props = mod.UICardBody.properties;
    for (const key of ['background', 'color', 'size']) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
  });

  it('has correct default values', () => {
    const p = mod.UICardBody.properties;
    assert.equal(p.background.default, '');
    assert.equal(p.color.default, '');
    assert.equal(p.size.default, '');
  });
});
