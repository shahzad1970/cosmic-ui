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

const mod = await import('../../src/components/input/textarea.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UIInputTextarea module', () => {
  it('exports the UIInputTextarea class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UIInputTextarea, 'function');
  });

  it('declares all expected static properties', () => {
    const props = mod.UIInputTextarea.properties;
    const expected = [
      'value', 'placeholder', 'name', 'label', 'help', 'error',
      'size', 'background', 'color', 'rows',
      'minlength', 'maxlength',
      'disabled', 'readonly', 'required', 'autoresize',
    ];
    for (const key of expected) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
  });

  it('has correct default values', () => {
    const p = mod.UIInputTextarea.properties;
    assert.equal(p.value.default, '');
    assert.equal(p.placeholder.default, '');
    assert.equal(p.name.default, '');
    assert.equal(p.label.default, '');
    assert.equal(p.help.default, '');
    assert.equal(p.error.default, '');
    assert.equal(p.rows.default, 3);
    assert.equal(p.disabled.default, false);
    assert.equal(p.readonly.default, false);
    assert.equal(p.required.default, false);
    assert.equal(p.autoresize.default, false);
  });

  it('String properties have correct type', () => {
    const p = mod.UIInputTextarea.properties;
    const strings = ['value', 'placeholder', 'name', 'label', 'help', 'error', 'size', 'background', 'color'];
    for (const key of strings) {
      assert.equal(p[key].type, String, `${key} should be String`);
    }
  });

  it('Boolean properties have correct type', () => {
    const p = mod.UIInputTextarea.properties;
    const bools = ['disabled', 'readonly', 'required', 'autoresize'];
    for (const key of bools) {
      assert.equal(p[key].type, Boolean, `${key} should be Boolean`);
    }
  });

  it('Number properties have correct type', () => {
    const p = mod.UIInputTextarea.properties;
    const nums = ['rows', 'minlength', 'maxlength'];
    for (const key of nums) {
      assert.equal(p[key].type, Number, `${key} should be Number`);
    }
  });

  it('all properties reflect', () => {
    const p = mod.UIInputTextarea.properties;
    for (const key of Object.keys(p)) {
      assert.equal(p[key].reflect, true, `${key} should reflect`);
    }
  });

  it('has static styles() with expected CSS', () => {
    const css = mod.UIInputTextarea.styles();
    assert.ok(css.includes('.textarea'), 'Should include textarea styles');
    assert.ok(css.includes('.label'), 'Should include label styles');
    assert.ok(css.includes(':host'), 'Should include host styles');
    assert.ok(css.includes(':host([disabled])'), 'Should include disabled styles');
    assert.ok(css.includes(':host([error])'), 'Should include error styles');
    assert.ok(css.includes(':host([autoresize])'), 'Should include autoresize styles');
    assert.ok(css.includes('.help'), 'Should include help styles');
    assert.ok(css.includes('.error-msg'), 'Should include error-msg styles');
  });

  it('has a render method', () => {
    assert.equal(typeof mod.UIInputTextarea.prototype.render, 'function');
  });

  it('render() returns HTML with textarea, label, help, and error elements', () => {
    const inst = Object.create(mod.UIInputTextarea.prototype);
    Object.assign(inst, {
      placeholder: 'Write here', name: 'msg', label: 'Message',
      help: 'Max 500 chars', error: '', value: 'Hello',
      rows: 4, disabled: false, readonly: false, required: false,
      minlength: 0, maxlength: 500,
    });
    const html = inst.render();
    assert.ok(html.includes('<textarea'), 'Should include textarea');
    assert.ok(html.includes('class="label"'), 'Should include label');
    assert.ok(html.includes('class="help"'), 'Should include help');
    assert.ok(html.includes('class="error-msg"'), 'Should include error-msg');
    assert.ok(html.includes('placeholder="Write here"'), 'Should include placeholder attr');
    assert.ok(html.includes('name="msg"'), 'Should include name attr');
    assert.ok(html.includes('rows="4"'), 'Should include rows attr');
    assert.ok(html.includes('maxlength="500"'), 'Should include maxlength attr');
    assert.ok(html.includes('Message'), 'Should include label text');
    assert.ok(html.includes('Max 500 chars'), 'Should include help text');
  });

  it('render() includes required indicator and aria-invalid', () => {
    const inst = Object.create(mod.UIInputTextarea.prototype);
    Object.assign(inst, {
      placeholder: '', name: '', label: 'Email', help: '',
      error: 'Required', value: '', rows: 3,
      disabled: false, readonly: false, required: true,
      minlength: 0, maxlength: 0,
    });
    const html = inst.render();
    assert.ok(html.includes('required'), 'Should include required attr');
    assert.ok(html.includes('aria-invalid="true"'), 'Should include aria-invalid');
    assert.ok(html.includes(' *'), 'Should include asterisk for required');
  });

  it('render() includes readonly and disabled attributes', () => {
    const inst = Object.create(mod.UIInputTextarea.prototype);
    Object.assign(inst, {
      placeholder: '', name: '', label: '', help: '', error: '',
      value: '', rows: 3, disabled: true, readonly: true,
      required: false, minlength: 0, maxlength: 0,
    });
    const html = inst.render();
    assert.ok(html.includes('disabled'), 'Should include disabled');
    assert.ok(html.includes('readonly'), 'Should include readonly');
  });

  it('render() escapes HTML in label and value', () => {
    const inst = Object.create(mod.UIInputTextarea.prototype);
    Object.assign(inst, {
      placeholder: '', name: '', label: '<b>Bold</b>',
      help: '', error: '', value: '<script>alert(1)</script>',
      rows: 3, disabled: false, readonly: false, required: false,
      minlength: 0, maxlength: 0,
    });
    const html = inst.render();
    assert.ok(!html.includes('<b>Bold</b>'), 'Should escape label HTML');
    assert.ok(!html.includes('<script>alert'), 'Should escape value HTML');
  });

  it('is registered as ui-input-textarea', () => {
    const registered = globalThis.customElements.get('ui-input-textarea');
    assert.equal(registered, mod.UIInputTextarea);
  });

  it('has focus, blur, selectAll methods', () => {
    const proto = mod.UIInputTextarea.prototype;
    assert.equal(typeof proto.focus, 'function');
    assert.equal(typeof proto.blur, 'function');
    assert.equal(typeof proto.selectAll, 'function');
  });

  it('has _applyStyles method (merged size + colors)', () => {
    assert.equal(typeof mod.UIInputTextarea.prototype._applyStyles, 'function');
  });

  it('has _autoResize method', () => {
    assert.equal(typeof mod.UIInputTextarea.prototype._autoResize, 'function');
  });

  it('has _syncValue method', () => {
    assert.equal(typeof mod.UIInputTextarea.prototype._syncValue, 'function');
  });

  it('has _attachListeners method', () => {
    assert.equal(typeof mod.UIInputTextarea.prototype._attachListeners, 'function');
  });
});
