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

const mod = await import('../../src/components/input/otp.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UIInputOTP module', () => {
  it('exports the UIInputOTP class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UIInputOTP, 'function');
  });

  it('declares all expected static properties', () => {
    const props = mod.UIInputOTP.properties;
    const expected = ['length', 'value', 'name', 'label', 'help', 'error', 'size', 'background', 'disabled', 'required', 'masked'];
    for (const key of expected) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
  });

  it('has correct default values', () => {
    const p = mod.UIInputOTP.properties;
    assert.equal(p.length.default, 6);
    assert.equal(p.value.default, '');
    assert.equal(p.name.default, '');
    assert.equal(p.label.default, '');
    assert.equal(p.help.default, '');
    assert.equal(p.error.default, '');
    assert.equal(p.size.default, '');
    assert.equal(p.background.default, '');
    assert.equal(p.disabled.default, false);
    assert.equal(p.required.default, false);
    assert.equal(p.masked.default, false);
  });

  it('Number properties have correct type', () => {
    const p = mod.UIInputOTP.properties;
    assert.equal(p.length.type, Number);
  });

  it('Boolean properties have correct type', () => {
    const p = mod.UIInputOTP.properties;
    const bools = ['disabled', 'required', 'masked'];
    for (const key of bools) {
      assert.equal(p[key].type, Boolean, `${key} should be Boolean`);
    }
  });

  it('String properties have correct type', () => {
    const p = mod.UIInputOTP.properties;
    const strings = ['value', 'name', 'label', 'help', 'error', 'size', 'background'];
    for (const key of strings) {
      assert.equal(p[key].type, String, `${key} should be String`);
    }
  });

  it('all properties reflect', () => {
    const p = mod.UIInputOTP.properties;
    for (const key of Object.keys(p)) {
      assert.equal(p[key].reflect, true, `${key} should reflect`);
    }
  });

  it('has static styles() with expected CSS', () => {
    const css = mod.UIInputOTP.styles();
    assert.ok(css.includes('.boxes'), 'Should include boxes styles');
    assert.ok(css.includes('.box'), 'Should include box styles');
    assert.ok(css.includes('data-filled'), 'Should include filled state');
    assert.ok(css.includes(':host'), 'Should include host styles');
  });

  it('has a render method', () => {
    assert.equal(typeof mod.UIInputOTP.prototype.render, 'function');
  });

  it('is registered as ui-input-otp', () => {
    const registered = globalThis.customElements.get('ui-input-otp');
    assert.equal(registered, mod.UIInputOTP);
  });

  it('has input handler methods', () => {
    const proto = mod.UIInputOTP.prototype;
    assert.equal(typeof proto._onInput, 'function');
    assert.equal(typeof proto._onKeyDown, 'function');
    assert.equal(typeof proto._onPaste, 'function');
  });

  it('has _onFocus method', () => {
    assert.equal(typeof mod.UIInputOTP.prototype._onFocus, 'function');
  });

  it('has _getBoxes and _collectValue methods', () => {
    const proto = mod.UIInputOTP.prototype;
    assert.equal(typeof proto._getBoxes, 'function');
    assert.equal(typeof proto._collectValue, 'function');
  });

  it('has focus and blur methods', () => {
    assert.equal(typeof mod.UIInputOTP.prototype.focus, 'function');
    assert.equal(typeof mod.UIInputOTP.prototype.blur, 'function');
  });

  it('uses merged _applyStyles (no separate _applySize/_applyColors)', () => {
    const proto = mod.UIInputOTP.prototype;
    assert.equal(typeof proto._applyStyles, 'function');
    assert.equal(proto._applySize, undefined, 'Should not have separate _applySize');
    assert.equal(proto._applyColors, undefined, 'Should not have separate _applyColors');
  });

  it('styles include error focus ring', () => {
    const css = mod.UIInputOTP.styles();
    assert.ok(css.includes(':host([error]) .box:focus'), 'Should include error focus ring');
  });

  it('styles include help and error-msg', () => {
    const css = mod.UIInputOTP.styles();
    assert.ok(css.includes('.help'), 'Should include help style');
    assert.ok(css.includes('.error-msg'), 'Should include error-msg style');
  });
});
