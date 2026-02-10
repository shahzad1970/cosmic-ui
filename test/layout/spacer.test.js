import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

// Minimal DOM shims for Node.
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

const mod = await import('../../src/components/layout/spacer.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UILayoutSpacer module', () => {
  it('exports the UILayoutSpacer class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UILayoutSpacer, 'function');
  });

  it('declares expected static properties', () => {
    const props = mod.UILayoutSpacer.properties;
    assert.ok('size' in props, 'Missing property: size');
  });

  it('has correct default values', () => {
    const p = mod.UILayoutSpacer.properties;
    assert.equal(p.size.default, '');
  });

  it('properties have correct types', () => {
    const p = mod.UILayoutSpacer.properties;
    assert.equal(p.size.type, String);
  });

  it('all properties reflect', () => {
    const p = mod.UILayoutSpacer.properties;
    for (const key of Object.keys(p)) {
      assert.notEqual(p[key].reflect, false, `${key} should reflect`);
    }
  });

  it('has static styles()', () => {
    const css = mod.UILayoutSpacer.styles();
    assert.ok(css.includes(':host'), 'Should include :host selector');
    assert.ok(css.includes('flex'), 'Should include flex properties');
    assert.ok(css.includes(':host([size])'), 'Should include sized state');
  });

  it('render() returns empty string', () => {
    const instance = Object.create(mod.UILayoutSpacer.prototype);
    const html = instance.render();
    assert.equal(html, '', 'Should render nothing');
  });

  it('has _applySize method', () => {
    assert.equal(typeof mod.UILayoutSpacer.prototype._applySize, 'function');
  });

  it('is registered as ui-layout-spacer custom element', () => {
    assert.equal(globalThis.customElements.get('ui-layout-spacer'), mod.UILayoutSpacer);
  });
});
