import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

/*
 * Smoke-tests for UIInput.
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

const mod = await import('../../src/components/input/input.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UIInput module', () => {
  it('exports the UIInput class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UIInput, 'function');
  });

  it('declares all expected static properties', () => {
    const props = mod.UIInput.properties;
    const expected = [
      'type', 'value', 'placeholder', 'name', 'label', 'help', 'error',
      'prefix', 'suffix', 'size', 'background', 'color',
      'disabled', 'readonly', 'required', 'clearable', 'toggleable',
      'pattern', 'minlength', 'maxlength', 'min', 'max', 'step', 'autocomplete',
    ];
    for (const key of expected) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
  });

  it('has correct default values', () => {
    const p = mod.UIInput.properties;
    assert.equal(p.type.default, 'text');
    assert.equal(p.value.default, '');
    assert.equal(p.placeholder.default, '');
    assert.equal(p.name.default, '');
    assert.equal(p.label.default, '');
    assert.equal(p.help.default, '');
    assert.equal(p.error.default, '');
    assert.equal(p.prefix.default, '');
    assert.equal(p.suffix.default, '');
    assert.equal(p.disabled.default, false);
    assert.equal(p.readonly.default, false);
    assert.equal(p.required.default, false);
    assert.equal(p.clearable.default, false);
    assert.equal(p.toggleable.default, false);
  });

  it('String properties have correct type', () => {
    const p = mod.UIInput.properties;
    const strings = ['type', 'value', 'placeholder', 'name', 'label', 'help', 'error',
                     'prefix', 'suffix', 'size', 'background', 'color', 'pattern', 'autocomplete'];
    for (const key of strings) {
      assert.equal(p[key].type, String, `${key} should be String`);
    }
  });

  it('Boolean properties have correct type', () => {
    const p = mod.UIInput.properties;
    const bools = ['disabled', 'readonly', 'required', 'clearable', 'toggleable'];
    for (const key of bools) {
      assert.equal(p[key].type, Boolean, `${key} should be Boolean`);
    }
  });

  it('Number properties have correct type', () => {
    const p = mod.UIInput.properties;
    const nums = ['minlength', 'maxlength', 'min', 'max', 'step'];
    for (const key of nums) {
      assert.equal(p[key].type, Number, `${key} should be Number`);
    }
  });

  it('all properties reflect', () => {
    const p = mod.UIInput.properties;
    for (const key of Object.keys(p)) {
      assert.equal(p[key].reflect, true, `${key} should reflect`);
    }
  });

  it('has static styles() with expected CSS', () => {
    const css = mod.UIInput.styles();
    assert.ok(css.includes('.wrapper'), 'Should include wrapper styles');
    assert.ok(css.includes('.input'), 'Should include native input styles');
    assert.ok(css.includes('.label'), 'Should include label styles');
    assert.ok(css.includes('.prefix'), 'Should include prefix styles');
    assert.ok(css.includes('.suffix'), 'Should include suffix styles');
    assert.ok(css.includes('.help'), 'Should include help text styles');
    assert.ok(css.includes('.error-msg'), 'Should include error message styles');
    assert.ok(css.includes('.clear-btn'), 'Should include clear button styles');
    assert.ok(css.includes('.toggle-btn'), 'Should include toggle button styles');
    assert.ok(css.includes(':host([disabled])'), 'Should include disabled styles');
    assert.ok(css.includes(':host([error])'), 'Should include error state styles');
    assert.ok(css.includes('.focused'), 'Should include focused state styles');
    assert.ok(css.includes('::placeholder'), 'Should include placeholder styles');
  });

  it('render() includes native input element', () => {
    const instance = Object.create(mod.UIInput.prototype);
    instance.type = 'text'; instance.value = ''; instance.placeholder = '';
    instance.name = ''; instance.label = ''; instance.help = ''; instance.error = '';
    instance.prefix = ''; instance.suffix = ''; instance.disabled = false;
    instance.readonly = false; instance.required = false; instance.pattern = '';
    instance.minlength = 0; instance.maxlength = 0; instance.min = 0;
    instance.max = 0; instance.step = 0; instance.autocomplete = '';
    instance._passwordVisible = false;

    const html = instance.render();
    assert.ok(html.includes('<input'), 'Should render <input>');
    assert.ok(html.includes('type="text"'), 'Should have type attribute');
    assert.ok(html.includes('class="input"'), 'Should have .input class');
  });

  it('render() includes label', () => {
    const instance = Object.create(mod.UIInput.prototype);
    Object.assign(instance, {
      type: 'text', value: '', placeholder: '', name: '',
      label: 'Email', help: '', error: '', prefix: '', suffix: '',
      disabled: false, readonly: false, required: false, pattern: '',
      minlength: 0, maxlength: 0, min: 0, max: 0, step: 0,
      autocomplete: '', _passwordVisible: false,
    });

    const html = instance.render();
    assert.ok(html.includes('Email'), 'Should include label text');
    assert.ok(html.includes('class="label"'), 'Should have label element');
  });

  it('render() marks required with asterisk', () => {
    const instance = Object.create(mod.UIInput.prototype);
    Object.assign(instance, {
      type: 'text', value: '', placeholder: '', name: '',
      label: 'Name', help: '', error: '', prefix: '', suffix: '',
      disabled: false, readonly: false, required: true, pattern: '',
      minlength: 0, maxlength: 0, min: 0, max: 0, step: 0,
      autocomplete: '', _passwordVisible: false,
    });

    const html = instance.render();
    assert.ok(html.includes(' *'), 'Should include required asterisk');
    assert.ok(html.includes('required'), 'Input should have required attribute');
  });

  it('render() includes prefix and suffix text', () => {
    const instance = Object.create(mod.UIInput.prototype);
    Object.assign(instance, {
      type: 'number', value: '100', placeholder: '', name: '',
      label: '', help: '', error: '', prefix: '$', suffix: '.00',
      disabled: false, readonly: false, required: false, pattern: '',
      minlength: 0, maxlength: 0, min: 0, max: 0, step: 0,
      autocomplete: '', _passwordVisible: false,
    });

    const html = instance.render();
    assert.ok(html.includes('$'), 'Should include prefix text');
    assert.ok(html.includes('.00'), 'Should include suffix text');
  });

  it('render() includes help and error text', () => {
    const instance = Object.create(mod.UIInput.prototype);
    Object.assign(instance, {
      type: 'text', value: '', placeholder: '', name: '',
      label: '', help: 'Enter your name', error: 'Name is required', prefix: '', suffix: '',
      disabled: false, readonly: false, required: false, pattern: '',
      minlength: 0, maxlength: 0, min: 0, max: 0, step: 0,
      autocomplete: '', _passwordVisible: false,
    });

    const html = instance.render();
    assert.ok(html.includes('Enter your name'), 'Should include help text');
    assert.ok(html.includes('Name is required'), 'Should include error text');
    assert.ok(html.includes('aria-invalid="true"'), 'Should mark input as invalid');
  });

  it('render() switches password to text when toggled', () => {
    const instance = Object.create(mod.UIInput.prototype);
    Object.assign(instance, {
      type: 'password', value: '', placeholder: '', name: '',
      label: '', help: '', error: '', prefix: '', suffix: '',
      disabled: false, readonly: false, required: false, pattern: '',
      minlength: 0, maxlength: 0, min: 0, max: 0, step: 0,
      autocomplete: '', _passwordVisible: true,
    });

    const html = instance.render();
    assert.ok(html.includes('type="text"'), 'Should show text type when toggled');
    assert.ok(html.includes('Hide password'), 'Should show hide label');
  });

  it('render() includes clear button markup', () => {
    const instance = Object.create(mod.UIInput.prototype);
    Object.assign(instance, {
      type: 'text', value: 'hello', placeholder: '', name: '',
      label: '', help: '', error: '', prefix: '', suffix: '',
      disabled: false, readonly: false, required: false, pattern: '',
      minlength: 0, maxlength: 0, min: 0, max: 0, step: 0,
      autocomplete: '', _passwordVisible: false,
    });

    const html = instance.render();
    assert.ok(html.includes('clear-btn'), 'Should have clear button');
    assert.ok(html.includes('has-value'), 'Clear button should have has-value class when value exists');
  });

  it('render() includes default slot', () => {
    const instance = Object.create(mod.UIInput.prototype);
    Object.assign(instance, {
      type: 'text', value: '', placeholder: '', name: '',
      label: '', help: '', error: '', prefix: '', suffix: '',
      disabled: false, readonly: false, required: false, pattern: '',
      minlength: 0, maxlength: 0, min: 0, max: 0, step: 0,
      autocomplete: '', _passwordVisible: false,
    });

    const html = instance.render();
    assert.ok(html.includes('<slot>'), 'Should include default slot');
  });

  it('render() passes through validation attributes', () => {
    const instance = Object.create(mod.UIInput.prototype);
    Object.assign(instance, {
      type: 'text', value: '', placeholder: '', name: '',
      label: '', help: '', error: '', prefix: '', suffix: '',
      disabled: false, readonly: false, required: false,
      pattern: '[A-Z]+', minlength: 3, maxlength: 20,
      min: 0, max: 0, step: 0, autocomplete: '',
      _passwordVisible: false,
    });

    const html = instance.render();
    assert.ok(html.includes('pattern="[A-Z]+"'), 'Should include pattern');
    assert.ok(html.includes('minlength="3"'), 'Should include minlength');
    assert.ok(html.includes('maxlength="20"'), 'Should include maxlength');
  });

  it('has focus, blur, selectAll, clear methods', () => {
    assert.equal(typeof mod.UIInput.prototype.focus, 'function');
    assert.equal(typeof mod.UIInput.prototype.blur, 'function');
    assert.equal(typeof mod.UIInput.prototype.selectAll, 'function');
    assert.equal(typeof mod.UIInput.prototype.clear, 'function');
  });

  it('has checkValidity method and validationMessage getter', () => {
    assert.equal(typeof mod.UIInput.prototype.checkValidity, 'function');
    const desc = Object.getOwnPropertyDescriptor(mod.UIInput.prototype, 'validationMessage');
    assert.ok(desc && typeof desc.get === 'function');
  });

  it('is registered as ui-input custom element', () => {
    const ctor = globalThis.customElements.get('ui-input');
    assert.ok(ctor, 'Should be registered');
    assert.equal(ctor, mod.UIInput);
  });
});
