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

const mod = await import('../../src/components/input/switch.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UIInputSwitch module', () => {
  it('exports the UIInputSwitch class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UIInputSwitch, 'function');
  });

  it('declares all expected static properties', () => {
    const props = mod.UIInputSwitch.properties;
    const expected = [
      'checked', 'value', 'name', 'label',
      'help', 'error', 'size', 'background', 'disabled', 'required',
    ];
    for (const key of expected) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
  });

  it('has correct default values', () => {
    const p = mod.UIInputSwitch.properties;
    assert.equal(p.checked.default, false);
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
    const p = mod.UIInputSwitch.properties;
    const bools = ['checked', 'disabled', 'required'];
    for (const key of bools) {
      assert.equal(p[key].type, Boolean, `${key} should be Boolean`);
    }
  });

  it('String properties have correct type', () => {
    const p = mod.UIInputSwitch.properties;
    const strings = ['value', 'name', 'label', 'help', 'error', 'size', 'background'];
    for (const key of strings) {
      assert.equal(p[key].type, String, `${key} should be String`);
    }
  });

  it('all properties reflect', () => {
    const p = mod.UIInputSwitch.properties;
    for (const key of Object.keys(p)) {
      assert.equal(p[key].reflect, true, `${key} should reflect`);
    }
  });

  it('has static styles() with expected CSS selectors', () => {
    const css = mod.UIInputSwitch.styles();
    assert.ok(css.includes('.track'), 'Should include .track styles');
    assert.ok(css.includes('.thumb'), 'Should include .thumb styles');
    assert.ok(css.includes(':host'), 'Should include :host styles');
    assert.ok(css.includes(':host([disabled])'), 'Should include disabled host styles');
    assert.ok(css.includes(':host([checked])'), 'Should include checked host styles');
    assert.ok(css.includes('.help'), 'Should include help styles');
    assert.ok(css.includes('.error-msg'), 'Should include error-msg styles');
    assert.ok(css.includes(':host([error])'), 'Should style the error state');
  });

  it('render outputs correct HTML structure', () => {
    const inst = Object.create(mod.UIInputSwitch.prototype);
    inst.label = 'Notifications';
    inst.help = 'Get notified via email';
    inst.error = '';
    inst.required = true;
    const html = inst.render();
    assert.ok(html.includes('Notifications'), 'Should render label text');
    assert.ok(html.includes('Get notified via email'), 'Should render help text');
    assert.ok(html.includes('*'), 'Should render required asterisk');
    assert.ok(html.includes('part="container"'), 'Should expose container CSS part');
    assert.ok(html.includes('part="track"'), 'Should expose track CSS part');
    assert.ok(html.includes('part="thumb"'), 'Should expose thumb CSS part');
    assert.ok(html.includes('part="help"'), 'Should expose help CSS part');
    assert.ok(html.includes('part="error"'), 'Should expose error CSS part');
  });

  it('render escapes HTML in label, help, and error', () => {
    const inst = Object.create(mod.UIInputSwitch.prototype);
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
    const inst = Object.create(mod.UIInputSwitch.prototype);
    inst.label = 'Toggle';
    inst.help = '';
    inst.error = '';
    inst.required = false;
    const html = inst.render();
    assert.ok(!html.includes(' *'), 'Should not show asterisk when not required');

    inst.required = true;
    const html2 = inst.render();
    assert.ok(html2.includes(' *'), 'Should show asterisk when required');
  });

  it('is registered as ui-input-switch', () => {
    const registered = globalThis.customElements.get('ui-input-switch');
    assert.equal(registered, mod.UIInputSwitch);
  });

  it('has _toggle method', () => {
    assert.equal(typeof mod.UIInputSwitch.prototype._toggle, 'function');
  });

  it('has _onClick method', () => {
    assert.equal(typeof mod.UIInputSwitch.prototype._onClick, 'function');
  });

  it('has _onKeyDown method', () => {
    assert.equal(typeof mod.UIInputSwitch.prototype._onKeyDown, 'function');
  });

  it('has merged _applyStyles method (not separate _applySize/_applyColors)', () => {
    assert.equal(typeof mod.UIInputSwitch.prototype._applyStyles, 'function');
    assert.equal(mod.UIInputSwitch.prototype._applySize, undefined, '_applySize should not exist');
    assert.equal(mod.UIInputSwitch.prototype._applyColors, undefined, '_applyColors should not exist');
  });

  it('has connectedCallback and disconnectedCallback', () => {
    assert.equal(typeof mod.UIInputSwitch.prototype.connectedCallback, 'function');
    assert.equal(typeof mod.UIInputSwitch.prototype.disconnectedCallback, 'function');
  });

  it('has render method that returns a string', () => {
    const inst = Object.create(mod.UIInputSwitch.prototype);
    inst.label = 'Test';
    inst.help = '';
    inst.error = '';
    inst.required = false;
    const html = inst.render();
    assert.equal(typeof html, 'string');
    assert.ok(html.length > 0, 'render should return non-empty string');
  });
});
