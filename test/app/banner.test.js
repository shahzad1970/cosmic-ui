import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

/*
 * Smoke-test for UIAppBanner.
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

const mod = await import('../../src/components/app/banner.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UIAppBanner module', () => {
  it('exports the UIAppBanner class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UIAppBanner, 'function');
  });

  it('is registered as ui-app-banner', () => {
    const ctor = globalThis.customElements.get('ui-app-banner');
    assert.ok(ctor, 'ui-app-banner should be registered');
    assert.equal(ctor, mod.UIAppBanner);
  });

  it('declares expected static properties', () => {
    const props = mod.UIAppBanner.properties;
    for (const key of ['background', 'color', 'elevation']) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
  });

  it('has correct default values', () => {
    const p = mod.UIAppBanner.properties;
    assert.equal(p.background.default, '');
    assert.equal(p.color.default, '');
    assert.equal(p.elevation.default, '');
  });
});
