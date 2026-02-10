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

const mod = await import('../../src/components/layout/split.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UILayoutSplit module', () => {
  it('exports the UILayoutSplit class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UILayoutSplit, 'function');
  });

  it('declares expected static properties', () => {
    const props = mod.UILayoutSplit.properties;
    for (const key of ['vertical', 'position', 'min', 'max', 'gutterSize',
                        'disabled', 'width', 'height', 'full']) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
  });

  it('has correct default values', () => {
    const p = mod.UILayoutSplit.properties;
    assert.equal(p.vertical.default, false);
    assert.equal(p.position.default, '50');
    assert.equal(p.min.default, '10');
    assert.equal(p.max.default, '90');
    assert.equal(p.gutterSize.default, '6');
    assert.equal(p.disabled.default, false);
    assert.equal(p.full.default, false);
  });

  it('properties have correct types', () => {
    const p = mod.UILayoutSplit.properties;
    assert.equal(p.vertical.type, Boolean);
    assert.equal(p.position.type, String);
    assert.equal(p.min.type, String);
    assert.equal(p.max.type, String);
    assert.equal(p.gutterSize.type, String);
    assert.equal(p.disabled.type, Boolean);
    assert.equal(p.full.type, Boolean);
  });

  it('all properties reflect', () => {
    const p = mod.UILayoutSplit.properties;
    for (const key of Object.keys(p)) {
      assert.notEqual(p[key].reflect, false, `${key} should reflect`);
    }
  });

  it('gutter-size uses kebab-case attribute', () => {
    assert.equal(mod.UILayoutSplit.properties.gutterSize.attribute, 'gutter-size');
  });

  it('has static styles()', () => {
    const css = mod.UILayoutSplit.styles();
    assert.ok(css.includes(':host'), 'Should include :host selector');
    assert.ok(css.includes('flex'), 'Should include flex display');
    assert.ok(css.includes('.gutter'), 'Should include gutter styles');
    assert.ok(css.includes('.panel'), 'Should include panel styles');
    assert.ok(css.includes(':host([vertical])'), 'Should include vertical styles');
    assert.ok(css.includes(':host([disabled])'), 'Should include disabled styles');
    assert.ok(css.includes('col-resize'), 'Should include col-resize cursor');
    assert.ok(css.includes('row-resize'), 'Should include row-resize cursor');
    assert.ok(css.includes(':host([full])'), 'Should include full styles');
  });

  it('render() returns two panels with a gutter', () => {
    const instance = Object.create(mod.UILayoutSplit.prototype);
    const html = instance.render();
    assert.ok(html.includes('panel-a'), 'Should render panel A');
    assert.ok(html.includes('panel-b'), 'Should render panel B');
    assert.ok(html.includes('gutter'), 'Should render gutter');
    assert.ok(html.includes('slot'), 'Should include slots');
  });

  it('has drag handler methods', () => {
    assert.equal(typeof mod.UILayoutSplit.prototype._onPointerDown, 'function');
    assert.equal(typeof mod.UILayoutSplit.prototype._onPointerMove, 'function');
    assert.equal(typeof mod.UILayoutSplit.prototype._onPointerUp, 'function');
  });

  it('has _assignSlots method', () => {
    assert.equal(typeof mod.UILayoutSplit.prototype._assignSlots, 'function');
  });

  it('has _applyLayout and _applyPosition methods', () => {
    assert.equal(typeof mod.UILayoutSplit.prototype._applyLayout, 'function');
    assert.equal(typeof mod.UILayoutSplit.prototype._applyPosition, 'function');
  });

  it('is registered as ui-layout-split custom element', () => {
    assert.equal(globalThis.customElements.get('ui-layout-split'), mod.UILayoutSplit);
  });
});
