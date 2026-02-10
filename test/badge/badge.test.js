import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

/*
 * Smoke-tests for UIBadge.
 *
 * Validates module resolution and class shape without a DOM.
 */

// Provide minimal DOM shims so the module can load in Node.
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

const mod = await import('../../src/components/badge/badge.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UIBadge module', () => {
  it('exports the UIBadge class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UIBadge, 'function');
  });

  it('is registered as ui-badge', () => {
    assert.equal(globalThis.customElements.get('ui-badge'), mod.UIBadge);
  });

  it('declares expected static properties', () => {
    const props = mod.UIBadge.properties;
    for (const key of ['background', 'color', 'size', 'pill', 'outline', 'circle', 'pulse', 'bounce', 'shake', 'ping']) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
  });

  it('has correct default values', () => {
    const p = mod.UIBadge.properties;
    assert.equal(p.background.default, '');
    assert.equal(p.color.default, '');
    assert.equal(p.size.default, '');
    assert.equal(p.pill.default, false);
    assert.equal(p.outline.default, false);
    assert.equal(p.circle.default, false);
    assert.equal(p.pulse.default, false);
    assert.equal(p.bounce.default, false);
    assert.equal(p.shake.default, false);
    assert.equal(p.ping.default, false);
  });
});
