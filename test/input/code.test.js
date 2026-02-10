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

const mod = await import('../../src/components/input/code.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UIInputCode module', () => {
  it('exports the UIInputCode class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UIInputCode, 'function');
  });

  it('declares all expected static properties', () => {
    const props = mod.UIInputCode.properties;
    const expected = [
      'value', 'language', 'height', 'size', 'dark', 'label',
      'placeholder', 'lineNumbers', 'wrap', 'readonly', 'disabled', 'tabSize',
    ];
    for (const key of expected) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
  });

  it('has correct default values', () => {
    const p = mod.UIInputCode.properties;
    assert.equal(p.value.default, '');
    assert.equal(p.language.default, 'json');
    assert.equal(p.height.default, '12em');
    assert.equal(p.size.default, '');
    assert.equal(p.dark.default, true);
    assert.equal(p.label.default, '');
    assert.equal(p.placeholder.default, '');
    assert.equal(p.lineNumbers.default, true);
    assert.equal(p.wrap.default, false);
    assert.equal(p.readonly.default, false);
    assert.equal(p.disabled.default, false);
    assert.equal(p.tabSize.default, 2);
  });

  it('String properties have correct type', () => {
    const p = mod.UIInputCode.properties;
    const strings = ['value', 'language', 'height', 'size', 'label', 'placeholder'];
    for (const key of strings) {
      assert.equal(p[key].type, String, `${key} should be String`);
    }
  });

  it('Boolean properties have correct type', () => {
    const p = mod.UIInputCode.properties;
    const bools = ['dark', 'lineNumbers', 'wrap', 'readonly', 'disabled'];
    for (const key of bools) {
      assert.equal(p[key].type, Boolean, `${key} should be Boolean`);
    }
  });

  it('Number properties have correct type', () => {
    const p = mod.UIInputCode.properties;
    assert.equal(p.tabSize.type, Number, 'tabSize should be Number');
  });

  it('value does not reflect to attribute', () => {
    const p = mod.UIInputCode.properties;
    assert.equal(p.value.reflect, false, 'value should not reflect');
  });

  it('lineNumbers uses custom attribute name', () => {
    const p = mod.UIInputCode.properties;
    assert.equal(p.lineNumbers.attribute, 'line-numbers');
  });

  it('tabSize uses custom attribute name', () => {
    const p = mod.UIInputCode.properties;
    assert.equal(p.tabSize.attribute, 'tab-size');
  });

  it('has static styles() with expected CSS', () => {
    const css = mod.UIInputCode.styles();
    assert.ok(css.includes('.frame'), 'Should include frame styles');
    assert.ok(css.includes('.label'), 'Should include label styles');
    assert.ok(css.includes('.textarea'), 'Should include textarea styles');
    assert.ok(css.includes('.loading'), 'Should include loading styles');
    assert.ok(css.includes('.error'), 'Should include error styles');
    assert.ok(css.includes('.CodeMirror'), 'Should include CodeMirror overrides');
    assert.ok(css.includes(':host'), 'Should include host styles');
    assert.ok(css.includes(':host([dark])'), 'Should include dark theme styles');
    assert.ok(css.includes(':host([disabled])'), 'Should include disabled styles');
  });

  it('has a render method', () => {
    assert.equal(typeof mod.UIInputCode.prototype.render, 'function');
  });

  it('render() returns HTML with textarea, loading and error elements', () => {
    const inst = Object.create(mod.UIInputCode.prototype);
    inst._value = '';
    inst._label = 'Test';
    inst._placeholder = 'Type here';
    inst._readonly = false;
    const html = inst.render();
    assert.ok(html.includes('<textarea'), 'Should include textarea');
    assert.ok(html.includes('class="loading"'), 'Should include loading overlay');
    assert.ok(html.includes('class="error'), 'Should include error overlay');
    assert.ok(html.includes('class="label"'), 'Should include label');
    assert.ok(html.includes('class="frame"'), 'Should include frame');
  });

  it('render() escapes label HTML', () => {
    const inst = Object.create(mod.UIInputCode.prototype);
    inst._value = '';
    inst._label = '<script>alert("xss")</script>';
    inst._placeholder = '';
    inst._readonly = false;
    const html = inst.render();
    assert.ok(!html.includes('<script>alert'), 'Should escape script tags in label');
    assert.ok(html.includes('&lt;script>'), 'Should contain escaped opening bracket');
  });

  it('render() includes placeholder attribute when set', () => {
    const inst = Object.create(mod.UIInputCode.prototype);
    inst._value = '';
    inst._label = '';
    inst._placeholder = 'Enter code';
    inst._readonly = false;
    const html = inst.render();
    assert.ok(html.includes('placeholder="Enter code"'), 'Should include placeholder');
  });

  it('render() includes readonly attribute when set', () => {
    const inst = Object.create(mod.UIInputCode.prototype);
    inst._value = '';
    inst._label = '';
    inst._placeholder = '';
    inst._readonly = true;
    const html = inst.render();
    assert.ok(html.includes('readonly'), 'Should include readonly');
  });

  it('is registered as ui-input-code', () => {
    const registered = globalThis.customElements.get('ui-input-code');
    assert.equal(registered, mod.UIInputCode);
  });

  it('has _bootstrap method', () => {
    assert.equal(typeof mod.UIInputCode.prototype._bootstrap, 'function');
  });

  it('has _destroyEditor method', () => {
    assert.equal(typeof mod.UIInputCode.prototype._destroyEditor, 'function');
  });

  it('has _sync method', () => {
    assert.equal(typeof mod.UIInputCode.prototype._sync, 'function');
  });

  it('has _resolveMode method', () => {
    assert.equal(typeof mod.UIInputCode.prototype._resolveMode, 'function');
  });

  it('_resolveMode resolves json correctly', () => {
    const inst = Object.create(mod.UIInputCode.prototype);
    inst._language = 'json';
    const mode = inst._resolveMode();
    assert.deepEqual(mode, { name: 'javascript', json: true });
  });

  it('_resolveMode resolves javascript correctly', () => {
    const inst = Object.create(mod.UIInputCode.prototype);
    inst._language = 'javascript';
    assert.equal(inst._resolveMode(), 'javascript');
    inst._language = 'js';
    assert.equal(inst._resolveMode(), 'javascript');
  });

  it('_resolveMode resolves css correctly', () => {
    const inst = Object.create(mod.UIInputCode.prototype);
    inst._language = 'css';
    assert.equal(inst._resolveMode(), 'css');
  });

  it('_resolveMode resolves html/htmlmixed correctly', () => {
    const inst = Object.create(mod.UIInputCode.prototype);
    inst._language = 'html';
    assert.equal(inst._resolveMode(), 'htmlmixed');
    inst._language = 'htmlmixed';
    assert.equal(inst._resolveMode(), 'htmlmixed');
  });

  it('_resolveMode resolves xml correctly', () => {
    const inst = Object.create(mod.UIInputCode.prototype);
    inst._language = 'xml';
    assert.equal(inst._resolveMode(), 'xml');
  });

  it('_resolveMode returns unknown language as-is', () => {
    const inst = Object.create(mod.UIInputCode.prototype);
    inst._language = 'python';
    assert.equal(inst._resolveMode(), 'python');
  });

  it('has _applyDynamicVars method', () => {
    assert.equal(typeof mod.UIInputCode.prototype._applyDynamicVars, 'function');
  });

  it('has _injectCmCss method', () => {
    assert.equal(typeof mod.UIInputCode.prototype._injectCmCss, 'function');
  });

  it('has _setStatus method', () => {
    assert.equal(typeof mod.UIInputCode.prototype._setStatus, 'function');
  });

  it('has static _loadCodeMirror method', () => {
    assert.equal(typeof mod.UIInputCode._loadCodeMirror, 'function');
  });

  it('has static _cmPromise and _cmCssText fields', () => {
    assert.ok('_cmPromise' in mod.UIInputCode, 'Should have _cmPromise');
    assert.ok('_cmCssText' in mod.UIInputCode, 'Should have _cmCssText');
  });
});
