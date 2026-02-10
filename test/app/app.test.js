import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

/*
 * Smoke-test for UIApp.
 *
 * Validates module resolution and class shape without a DOM.
 */

// Minimal DOM shims (shared with button tests).
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

const mod = await import('../../src/components/app/app.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UIApp module', () => {
  it('exports the UIApp class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UIApp, 'function');
  });

  it('is registered as ui-app', () => {
    const ctor = globalThis.customElements.get('ui-app');
    assert.ok(ctor, 'ui-app should be registered');
    assert.equal(ctor, mod.UIApp);
  });

  it('declares the page property', () => {
    const props = mod.UIApp.properties;
    assert.ok('page' in props, 'Missing property: page');
    assert.equal(props.page.default, false);
  });

  it('declares the navOpen property', () => {
    const props = mod.UIApp.properties;
    assert.ok('navOpen' in props, 'Missing property: navOpen');
    assert.equal(props.navOpen.default, false);
    assert.equal(props.navOpen.attribute, 'nav-open');
  });
});
