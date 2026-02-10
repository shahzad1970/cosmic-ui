import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

/*
 * Smoke-test for UICardMedia.
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

const mod = await import('../../src/components/card/media.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UICardMedia module', () => {
  it('exports the UICardMedia class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UICardMedia, 'function');
  });

  it('is registered as ui-card-media', () => {
    const ctor = globalThis.customElements.get('ui-card-media');
    assert.ok(ctor, 'ui-card-media should be registered');
    assert.equal(ctor, mod.UICardMedia);
  });

  it('declares expected static properties', () => {
    const props = mod.UICardMedia.properties;
    assert.ok('height' in props, 'Missing property: height');
  });

  it('has correct default values', () => {
    const p = mod.UICardMedia.properties;
    assert.equal(p.height.default, '');
  });
});
