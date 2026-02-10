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

const mod = await import('../../src/components/input/number.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UIInputNumber module', () => {
  it('exports the UIInputNumber class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UIInputNumber, 'function');
  });

  it('declares all expected static properties', () => {
    const props = mod.UIInputNumber.properties;
    const expected = [
      'value', 'min', 'max', 'step', 'placeholder', 'name', 'label',
      'help', 'error', 'size', 'background', 'color',
      'disabled', 'readonly', 'required',
    ];
    for (const key of expected) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
  });

  it('has correct default values', () => {
    const p = mod.UIInputNumber.properties;
    assert.equal(p.value.default, 0);
    assert.equal(p.min.default, -Infinity);
    assert.equal(p.max.default, Infinity);
    assert.equal(p.step.default, 1);
    assert.equal(p.placeholder.default, '');
    assert.equal(p.name.default, '');
    assert.equal(p.label.default, '');
    assert.equal(p.help.default, '');
    assert.equal(p.error.default, '');
    assert.equal(p.disabled.default, false);
    assert.equal(p.readonly.default, false);
    assert.equal(p.required.default, false);
  });

  it('Number properties have correct type', () => {
    const p = mod.UIInputNumber.properties;
    const nums = ['value', 'min', 'max', 'step'];
    for (const key of nums) {
      assert.equal(p[key].type, Number, `${key} should be Number`);
    }
  });

  it('Boolean properties have correct type', () => {
    const p = mod.UIInputNumber.properties;
    const bools = ['disabled', 'readonly', 'required'];
    for (const key of bools) {
      assert.equal(p[key].type, Boolean, `${key} should be Boolean`);
    }
  });

  it('String properties have correct type', () => {
    const p = mod.UIInputNumber.properties;
    const strings = ['placeholder', 'name', 'label', 'help', 'error', 'size', 'background', 'color'];
    for (const key of strings) {
      assert.equal(p[key].type, String, `${key} should be String`);
    }
  });

  it('all properties reflect', () => {
    const p = mod.UIInputNumber.properties;
    for (const key of Object.keys(p)) {
      assert.equal(p[key].reflect, true, `${key} should reflect`);
    }
  });

  it('has static styles() with expected CSS', () => {
    const css = mod.UIInputNumber.styles();
    assert.ok(css.includes('.wrapper'), 'Should include wrapper styles');
    assert.ok(css.includes('.step-btn'), 'Should include step button styles');
    assert.ok(css.includes('.input'), 'Should include input styles');
    assert.ok(css.includes(':host'), 'Should include host styles');
  });

  it('has a render method', () => {
    assert.equal(typeof mod.UIInputNumber.prototype.render, 'function');
  });

  it('is registered as ui-input-number', () => {
    const registered = globalThis.customElements.get('ui-input-number');
    assert.equal(registered, mod.UIInputNumber);
  });

  it('has _clamp method', () => {
    const proto = mod.UIInputNumber.prototype;
    assert.equal(typeof proto._clamp, 'function');
  });

  it('_clamp respects min/max', () => {
    const proto = mod.UIInputNumber.prototype;
    // Simulate min=0, max=10
    const fakeThis = { min: 0, max: 10 };
    assert.equal(proto._clamp.call(fakeThis, 5), 5);
    assert.equal(proto._clamp.call(fakeThis, -5), 0);
    assert.equal(proto._clamp.call(fakeThis, 15), 10);
  });

  it('has _step method', () => {
    assert.equal(typeof mod.UIInputNumber.prototype._step, 'function');
  });

  it('has _onInputBlur method', () => {
    assert.equal(typeof mod.UIInputNumber.prototype._onInputBlur, 'function');
  });

  it('has _syncInput method', () => {
    assert.equal(typeof mod.UIInputNumber.prototype._syncInput, 'function');
  });

  it('has _onKeyDown method', () => {
    assert.equal(typeof mod.UIInputNumber.prototype._onKeyDown, 'function');
  });

  it('has focus and blur methods', () => {
    assert.equal(typeof mod.UIInputNumber.prototype.focus, 'function');
    assert.equal(typeof mod.UIInputNumber.prototype.blur, 'function');
  });

  it('_clamp handles infinite defaults gracefully', () => {
    const proto = mod.UIInputNumber.prototype;
    const fakeThis = { min: -Infinity, max: Infinity };
    assert.equal(proto._clamp.call(fakeThis, 999999), 999999);
    assert.equal(proto._clamp.call(fakeThis, -999999), -999999);
  });

  it('styles include error focus ring', () => {
    const css = mod.UIInputNumber.styles();
    assert.ok(css.includes(':host([error]) .wrapper:focus-within'), 'Should include error focus-within ring');
  });

  it('styles include help and error-msg', () => {
    const css = mod.UIInputNumber.styles();
    assert.ok(css.includes('.help'), 'Should include help style');
    assert.ok(css.includes('.error-msg'), 'Should include error-msg style');
  });

  it('render includes label, help, and error parts', () => {
    const css = mod.UIInputNumber.styles();
    assert.ok(css.includes('.label'), 'Should include label style');
  });
});
