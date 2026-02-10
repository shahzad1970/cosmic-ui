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

const mod = await import('../../src/components/input/radio-group.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UIInputRadioGroup module', () => {
  it('exports the UIInputRadioGroup class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UIInputRadioGroup, 'function');
  });

  it('declares all expected static properties', () => {
    const props = mod.UIInputRadioGroup.properties;
    const expected = [
      'value', 'name', 'label', 'help', 'error',
      'size', 'background', 'disabled', 'required',
    ];
    for (const key of expected) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
  });

  it('has correct default values', () => {
    const p = mod.UIInputRadioGroup.properties;
    assert.equal(p.value.default, '');
    assert.equal(p.name.default, '');
    assert.equal(p.label.default, '');
    assert.equal(p.help.default, '');
    assert.equal(p.error.default, '');
    assert.equal(p.size.default, '');
    assert.equal(p.background.default, '');
    assert.equal(p.disabled.default, false);
    assert.equal(p.required.default, false);
  });

  it('Boolean properties have correct type', () => {
    const p = mod.UIInputRadioGroup.properties;
    assert.equal(p.disabled.type, Boolean);
    assert.equal(p.required.type, Boolean);
  });

  it('String properties have correct type', () => {
    const p = mod.UIInputRadioGroup.properties;
    const strings = ['value', 'name', 'label', 'help', 'error', 'size', 'background'];
    for (const key of strings) {
      assert.equal(p[key].type, String, `${key} should be String`);
    }
  });

  it('all properties reflect', () => {
    const p = mod.UIInputRadioGroup.properties;
    for (const key of Object.keys(p)) {
      assert.equal(p[key].reflect, true, `${key} should reflect`);
    }
  });

  it('has static styles() with expected CSS selectors', () => {
    const css = mod.UIInputRadioGroup.styles();
    assert.ok(css.includes('.radios'), 'Should include .radios styles');
    assert.ok(css.includes('.label'), 'Should include .label styles');
    assert.ok(css.includes(':host'), 'Should include :host styles');
    assert.ok(css.includes(':host([disabled])'), 'Should include disabled host styles');
    assert.ok(css.includes(':host([label])'), 'Should show label when attribute present');
    assert.ok(css.includes('.help'), 'Should include help styles');
    assert.ok(css.includes('.error-msg'), 'Should include error-msg styles');
    assert.ok(css.includes(':host([error])'), 'Should style the error state');
  });

  it('render outputs correct HTML structure', () => {
    const inst = Object.create(mod.UIInputRadioGroup.prototype);
    inst.label = 'Choose one';
    inst.help = 'Pick your favourite';
    inst.error = '';
    inst.required = true;
    const html = inst.render();
    assert.ok(html.includes('Choose one'), 'Should render label text');
    assert.ok(html.includes('Pick your favourite'), 'Should render help text');
    assert.ok(html.includes('*'), 'Should render required asterisk');
    assert.ok(html.includes('part="label"'), 'Should expose label CSS part');
    assert.ok(html.includes('part="radios"'), 'Should expose radios CSS part');
    assert.ok(html.includes('part="help"'), 'Should expose help CSS part');
    assert.ok(html.includes('part="error"'), 'Should expose error CSS part');
    assert.ok(html.includes('<slot>'), 'Should include default slot');
  });

  it('render escapes HTML in label, help, and error', () => {
    const inst = Object.create(mod.UIInputRadioGroup.prototype);
    inst.label = '<script>alert("x")</script>';
    inst.help = '<b>bold</b>';
    inst.error = '<img>';
    inst.required = false;
    const html = inst.render();
    assert.ok(!html.includes('<script>'), 'Should escape label HTML');
    assert.ok(!html.includes('<b>'), 'Should escape help HTML');
    assert.ok(!html.includes('<img>'), 'Should escape error HTML');
    assert.ok(html.includes('&lt;script>'), 'Should HTML-encode opening angle brackets');
  });

  it('render shows asterisk only when required is true', () => {
    const inst = Object.create(mod.UIInputRadioGroup.prototype);
    inst.label = 'Group';
    inst.help = '';
    inst.error = '';
    inst.required = false;
    const html = inst.render();
    assert.ok(!html.includes(' *'), 'Should not show asterisk when not required');

    inst.required = true;
    const html2 = inst.render();
    assert.ok(html2.includes(' *'), 'Should show asterisk when required');
  });

  it('is registered as ui-input-radio-group', () => {
    const registered = globalThis.customElements.get('ui-input-radio-group');
    assert.equal(registered, mod.UIInputRadioGroup);
  });

  it('has _syncChildren method', () => {
    assert.equal(typeof mod.UIInputRadioGroup.prototype._syncChildren, 'function');
  });

  it('has _onRadioSelect method', () => {
    assert.equal(typeof mod.UIInputRadioGroup.prototype._onRadioSelect, 'function');
  });

  it('has _onRadioNav method', () => {
    assert.equal(typeof mod.UIInputRadioGroup.prototype._onRadioNav, 'function');
  });

  it('has connectedCallback and disconnectedCallback', () => {
    assert.equal(typeof mod.UIInputRadioGroup.prototype.connectedCallback, 'function');
    assert.equal(typeof mod.UIInputRadioGroup.prototype.disconnectedCallback, 'function');
  });

  it('has _applySize method', () => {
    assert.equal(typeof mod.UIInputRadioGroup.prototype._applySize, 'function');
  });

  it('has render method that returns a string', () => {
    const inst = Object.create(mod.UIInputRadioGroup.prototype);
    inst.label = 'Test';
    inst.help = '';
    inst.error = '';
    inst.required = false;
    const html = inst.render();
    assert.equal(typeof html, 'string');
    assert.ok(html.length > 0, 'render should return non-empty string');
  });
});
