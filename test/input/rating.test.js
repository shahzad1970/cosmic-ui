import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

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

const mod = await import('../../src/components/input/rating.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UIInputRating module', () => {
  it('exports the UIInputRating class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UIInputRating, 'function');
  });

  it('declares all expected static properties', () => {
    const props = mod.UIInputRating.properties;
    const expected = ['value', 'max', 'name', 'label', 'help', 'error', 'size', 'color', 'disabled', 'readonly', 'required'];
    for (const key of expected) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
  });

  it('has correct default values', () => {
    const p = mod.UIInputRating.properties;
    assert.equal(p.value.default, 0);
    assert.equal(p.max.default, 5);
    assert.equal(p.name.default, '');
    assert.equal(p.label.default, '');
    assert.equal(p.help.default, '');
    assert.equal(p.error.default, '');
    assert.equal(p.size.default, '');
    assert.equal(p.color.default, 'amber-400');
    assert.equal(p.disabled.default, false);
    assert.equal(p.readonly.default, false);
    assert.equal(p.required.default, false);
  });

  it('Number properties have correct type', () => {
    const p = mod.UIInputRating.properties;
    assert.equal(p.value.type, Number);
    assert.equal(p.max.type, Number);
  });

  it('Boolean properties have correct type', () => {
    const p = mod.UIInputRating.properties;
    const bools = ['disabled', 'readonly', 'required'];
    for (const key of bools) {
      assert.equal(p[key].type, Boolean, `${key} should be Boolean`);
    }
  });

  it('String properties have correct type', () => {
    const p = mod.UIInputRating.properties;
    const strings = ['name', 'label', 'help', 'error', 'size', 'color'];
    for (const key of strings) {
      assert.equal(p[key].type, String, `${key} should be String`);
    }
  });

  it('all properties reflect', () => {
    const p = mod.UIInputRating.properties;
    for (const key of Object.keys(p)) {
      assert.equal(p[key].reflect, true, `${key} should reflect`);
    }
  });

  it('has static styles() with expected CSS', () => {
    const css = mod.UIInputRating.styles();
    assert.ok(css.includes('.stars'), 'Should include stars styles');
    assert.ok(css.includes('.star'), 'Should include star styles');
    assert.ok(css.includes('data-active'), 'Should include active state');
    assert.ok(css.includes(':host'), 'Should include host styles');
  });

  it('has a render method', () => {
    assert.equal(typeof mod.UIInputRating.prototype.render, 'function');
  });

  it('is registered as ui-input-rating', () => {
    const registered = globalThis.customElements.get('ui-input-rating');
    assert.equal(registered, mod.UIInputRating);
  });

  it('has _updateHover method', () => {
    assert.equal(typeof mod.UIInputRating.prototype._updateHover, 'function');
  });
});
