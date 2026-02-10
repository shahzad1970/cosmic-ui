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

const mod = await import('../../src/components/layout/stack.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UILayoutStack module', () => {
  it('exports the UILayoutStack class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UILayoutStack, 'function');
  });

  it('declares expected static properties', () => {
    const props = mod.UILayoutStack.properties;
    for (const key of ['direction', 'horizontal', 'gap', 'align', 'justify',
                        'wrap', 'inline', 'reverse', 'padding',
                        'width', 'height', 'grow', 'center', 'full']) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
  });

  it('has correct default values', () => {
    const p = mod.UILayoutStack.properties;
    assert.equal(p.direction.default, '');
    assert.equal(p.horizontal.default, false);
    assert.equal(p.gap.default, '');
    assert.equal(p.align.default, '');
    assert.equal(p.justify.default, '');
    assert.equal(p.wrap.default, false);
    assert.equal(p.inline.default, false);
    assert.equal(p.reverse.default, false);
    assert.equal(p.padding.default, '');
    assert.equal(p.grow.default, false);
    assert.equal(p.center.default, false);
    assert.equal(p.full.default, false);
  });

  it('properties have correct types', () => {
    const p = mod.UILayoutStack.properties;
    assert.equal(p.direction.type, String);
    assert.equal(p.horizontal.type, Boolean);
    assert.equal(p.gap.type, String);
    assert.equal(p.align.type, String);
    assert.equal(p.justify.type, String);
    assert.equal(p.wrap.type, Boolean);
    assert.equal(p.inline.type, Boolean);
    assert.equal(p.reverse.type, Boolean);
    assert.equal(p.grow.type, Boolean);
    assert.equal(p.center.type, Boolean);
    assert.equal(p.full.type, Boolean);
  });

  it('all properties reflect', () => {
    const p = mod.UILayoutStack.properties;
    for (const key of Object.keys(p)) {
      assert.notEqual(p[key].reflect, false, `${key} should reflect`);
    }
  });

  it('has static styles()', () => {
    const css = mod.UILayoutStack.styles();
    assert.ok(css.includes(':host'), 'Should include :host selector');
    assert.ok(css.includes('flex'), 'Should include flex display');
    assert.ok(css.includes(':host([horizontal])'), 'Should include horizontal styles');
    assert.ok(css.includes(':host([wrap])'), 'Should include wrap styles');
    assert.ok(css.includes(':host([grow])'), 'Should include grow styles');
    assert.ok(css.includes(':host([full])'), 'Should include full styles');
    assert.ok(css.includes(':host([inline])'), 'Should include inline styles');
    assert.ok(css.includes(':host([reverse]'), 'Should include reverse styles');
  });

  it('render() returns a default slot', () => {
    const instance = Object.create(mod.UILayoutStack.prototype);
    const html = instance.render();
    assert.ok(html.includes('<slot></slot>'), 'Should render default slot');
  });

  it('has justify shorthand map', () => {
    const map = mod.UILayoutStack._justifyMap;
    assert.equal(map.between, 'space-between');
    assert.equal(map.around, 'space-around');
    assert.equal(map.evenly, 'space-evenly');
    assert.equal(map.start, 'flex-start');
    assert.equal(map.end, 'flex-end');
    assert.equal(map.center, 'center');
  });

  it('has align shorthand map', () => {
    const map = mod.UILayoutStack._alignMap;
    assert.equal(map.start, 'flex-start');
    assert.equal(map.end, 'flex-end');
    assert.equal(map.center, 'center');
    assert.equal(map.stretch, 'stretch');
    assert.equal(map.baseline, 'baseline');
  });

  it('has _applyLayout method', () => {
    assert.equal(typeof mod.UILayoutStack.prototype._applyLayout, 'function');
  });

  it('is registered as ui-layout-stack custom element', () => {
    assert.equal(globalThis.customElements.get('ui-layout-stack'), mod.UILayoutStack);
  });
});
