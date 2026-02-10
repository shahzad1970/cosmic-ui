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

const mod = await import('../../src/components/layout/container.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UILayoutContainer module', () => {
  it('exports the UILayoutContainer class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UILayoutContainer, 'function');
  });

  it('declares expected static properties', () => {
    const props = mod.UILayoutContainer.properties;
    for (const key of ['maxWidth', 'padding', 'align', 'width', 'size']) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
  });

  it('has correct default values', () => {
    const p = mod.UILayoutContainer.properties;
    assert.equal(p.maxWidth.default, '');
    assert.equal(p.padding.default, '');
    assert.equal(p.align.default, '');
    assert.equal(p.width.default, '');
    assert.equal(p.size.default, '');
  });

  it('properties have correct types', () => {
    const p = mod.UILayoutContainer.properties;
    assert.equal(p.maxWidth.type, String);
    assert.equal(p.padding.type, String);
    assert.equal(p.align.type, String);
    assert.equal(p.width.type, String);
    assert.equal(p.size.type, String);
  });

  it('all properties reflect', () => {
    const p = mod.UILayoutContainer.properties;
    for (const key of Object.keys(p)) {
      assert.notEqual(p[key].reflect, false, `${key} should reflect`);
    }
  });

  it('max-width uses kebab-case attribute', () => {
    assert.equal(mod.UILayoutContainer.properties.maxWidth.attribute, 'max-width');
  });

  it('has static styles()', () => {
    const css = mod.UILayoutContainer.styles();
    assert.ok(css.includes(':host'), 'Should include :host selector');
    assert.ok(css.includes('block'), 'Should include block display');
    assert.ok(css.includes('max-width'), 'Should include max-width');
    assert.ok(css.includes('margin-left: auto'), 'Should center with auto margins');
    assert.ok(css.includes('margin-right: auto'), 'Should center with auto margins');
    assert.ok(css.includes('padding'), 'Should include default padding');
  });

  it('render() returns a default slot', () => {
    const instance = Object.create(mod.UILayoutContainer.prototype);
    const html = instance.render();
    assert.ok(html.includes('<slot></slot>'), 'Should render default slot');
  });

  it('has named size presets', () => {
    const map = mod.UILayoutContainer._sizeMap;
    assert.equal(map.small, '640px');
    assert.equal(map.medium, '960px');
    assert.equal(map.large, '1200px');
    assert.equal(map['x-large'], '1400px');
    assert.equal(map.full, '100%');
  });

  it('has _applyLayout method', () => {
    assert.equal(typeof mod.UILayoutContainer.prototype._applyLayout, 'function');
  });

  it('is registered as ui-layout-container custom element', () => {
    assert.equal(globalThis.customElements.get('ui-layout-container'), mod.UILayoutContainer);
  });
});
