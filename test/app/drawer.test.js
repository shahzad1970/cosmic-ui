import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

/*
 * Smoke-test for UIAppDrawer.
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

const mod = await import('../../src/components/app/drawer.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UIAppDrawer module', () => {
  it('exports the UIAppDrawer class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UIAppDrawer, 'function');
  });

  it('is registered as ui-app-drawer', () => {
    const ctor = globalThis.customElements.get('ui-app-drawer');
    assert.ok(ctor, 'ui-app-drawer should be registered');
    assert.equal(ctor, mod.UIAppDrawer);
  });

  it('declares expected static properties', () => {
    const props = mod.UIAppDrawer.properties;
    for (const key of ['background', 'color', 'width', 'elevation', 'open']) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
  });

  it('has correct default values', () => {
    const p = mod.UIAppDrawer.properties;
    assert.equal(p.background.default, '');
    assert.equal(p.color.default, '');
    assert.equal(p.width.default, '16rem');
    assert.equal(p.elevation.default, '');
    assert.equal(p.open.default, true);
  });
});
