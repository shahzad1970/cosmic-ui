import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

/*
 * Smoke-test for UIAppNavHeader.
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

const mod = await import('../../src/components/app/nav-header.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UIAppNavHeader module', () => {
  it('exports the UIAppNavHeader class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UIAppNavHeader, 'function');
  });

  it('is registered as ui-app-nav-header', () => {
    const ctor = globalThis.customElements.get('ui-app-nav-header');
    assert.ok(ctor, 'ui-app-nav-header should be registered');
    assert.equal(ctor, mod.UIAppNavHeader);
  });

  it('declares expected static properties', () => {
    const props = mod.UIAppNavHeader.properties;
    for (const key of ['background', 'color']) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
  });

  it('has correct default values', () => {
    const p = mod.UIAppNavHeader.properties;
    assert.equal(p.background.default, '');
    assert.equal(p.color.default, '');
  });
});
