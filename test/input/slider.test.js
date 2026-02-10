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

const mod = await import('../../src/components/input/slider.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UIInputSlider module', () => {
  it('exports the UIInputSlider class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UIInputSlider, 'function');
  });

  it('declares all expected static properties', () => {
    const props = mod.UIInputSlider.properties;
    const expected = [
      'value', 'min', 'max', 'step', 'name', 'label',
      'help', 'error', 'size', 'background',
      'disabled', 'required', 'showvalue',
    ];
    for (const key of expected) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
  });

  it('has correct default values', () => {
    const p = mod.UIInputSlider.properties;
    assert.equal(p.value.default, 50);
    assert.equal(p.min.default, 0);
    assert.equal(p.max.default, 100);
    assert.equal(p.step.default, 1);
    assert.equal(p.name.default, '');
    assert.equal(p.label.default, '');
    assert.equal(p.help.default, '');
    assert.equal(p.error.default, '');
    assert.equal(p.size.default, '');
    assert.equal(p.background.default, '');
    assert.equal(p.disabled.default, false);
    assert.equal(p.required.default, false);
    assert.equal(p.showvalue.default, false);
  });

  it('Number properties have correct type', () => {
    const p = mod.UIInputSlider.properties;
    const nums = ['value', 'min', 'max', 'step'];
    for (const key of nums) {
      assert.equal(p[key].type, Number, `${key} should be Number`);
    }
  });

  it('Boolean properties have correct type', () => {
    const p = mod.UIInputSlider.properties;
    const bools = ['disabled', 'required', 'showvalue'];
    for (const key of bools) {
      assert.equal(p[key].type, Boolean, `${key} should be Boolean`);
    }
  });

  it('String properties have correct type', () => {
    const p = mod.UIInputSlider.properties;
    const strings = ['name', 'label', 'help', 'error', 'size', 'background'];
    for (const key of strings) {
      assert.equal(p[key].type, String, `${key} should be String`);
    }
  });

  it('all properties reflect', () => {
    const p = mod.UIInputSlider.properties;
    for (const key of Object.keys(p)) {
      assert.equal(p[key].reflect, true, `${key} should reflect`);
    }
  });

  it('has static styles() with expected CSS selectors', () => {
    const css = mod.UIInputSlider.styles();
    assert.ok(css.includes('.slider'), 'Should include slider styles');
    assert.ok(css.includes('.label'), 'Should include label styles');
    assert.ok(css.includes(':host'), 'Should include host styles');
    assert.ok(css.includes(':host([disabled])'), 'Should include disabled styles');
    assert.ok(css.includes('.slider-wrap'), 'Should include slider-wrap styles');
    assert.ok(css.includes('.val-display'), 'Should include val-display styles');
    assert.ok(css.includes('.help'), 'Should include help styles');
    assert.ok(css.includes('.error-msg'), 'Should include error-msg styles');
    assert.ok(css.includes(':host([error])'), 'Should include error state');
    assert.ok(css.includes(':host([showvalue])'), 'Should include showvalue state');
    assert.ok(css.includes('--_accent'), 'Should use --_accent variable');
  });

  it('render outputs correct HTML structure', () => {
    const inst = Object.create(mod.UIInputSlider.prototype);
    inst.label = 'Volume';
    inst.help = 'Adjust volume';
    inst.error = '';
    inst.required = true;
    inst.showvalue = true;
    inst.value = 50;
    inst.min = 0;
    inst.max = 100;
    inst.step = 1;
    inst.disabled = false;
    inst.name = 'vol';
    const html = inst.render();
    assert.ok(html.includes('Volume'), 'Should render label text');
    assert.ok(html.includes('Adjust volume'), 'Should render help text');
    assert.ok(html.includes('*'), 'Should render required asterisk');
    assert.ok(html.includes('part="label"'), 'Should expose label CSS part');
    assert.ok(html.includes('part="slider"'), 'Should expose slider CSS part');
    assert.ok(html.includes('part="value"'), 'Should expose value CSS part');
    assert.ok(html.includes('part="help"'), 'Should expose help CSS part');
    assert.ok(html.includes('part="error"'), 'Should expose error CSS part');
    assert.ok(html.includes('type="range"'), 'Should include range input');
    assert.ok(html.includes('aria-valuemin="0"'), 'Should include aria-valuemin');
    assert.ok(html.includes('aria-valuemax="100"'), 'Should include aria-valuemax');
    assert.ok(html.includes('aria-valuenow="50"'), 'Should include aria-valuenow');
    assert.ok(html.includes('name="vol"'), 'Should include name attribute');
  });

  it('render escapes HTML in label, help, and error', () => {
    const inst = Object.create(mod.UIInputSlider.prototype);
    inst.label = '<script>alert("x")</script>';
    inst.help = '<b>bold</b>';
    inst.error = '<img>';
    inst.required = false;
    inst.showvalue = false;
    inst.value = 50;
    inst.min = 0;
    inst.max = 100;
    inst.step = 1;
    inst.disabled = false;
    inst.name = '';
    const html = inst.render();
    assert.ok(!html.includes('<script>'), 'Should escape label HTML');
    assert.ok(!html.includes('<b>'), 'Should escape help HTML');
    assert.ok(!html.includes('<img>'), 'Should escape error HTML');
  });

  it('render shows asterisk only when required is true', () => {
    const inst = Object.create(mod.UIInputSlider.prototype);
    inst.label = 'Test';
    inst.help = '';
    inst.error = '';
    inst.required = false;
    inst.showvalue = false;
    inst.value = 50;
    inst.min = 0;
    inst.max = 100;
    inst.step = 1;
    inst.disabled = false;
    inst.name = '';
    const html = inst.render();
    assert.ok(!html.includes(' *'), 'Should not show asterisk when not required');
    inst.required = true;
    const html2 = inst.render();
    assert.ok(html2.includes(' *'), 'Should show asterisk when required');
  });

  it('is registered as ui-input-slider', () => {
    const registered = globalThis.customElements.get('ui-input-slider');
    assert.equal(registered, mod.UIInputSlider);
  });

  it('has merged _applyStyles method (not separate _applySize/_applyColors)', () => {
    assert.equal(typeof mod.UIInputSlider.prototype._applyStyles, 'function');
    assert.equal(mod.UIInputSlider.prototype._applySize, undefined, '_applySize should not exist');
    assert.equal(mod.UIInputSlider.prototype._applyColors, undefined, '_applyColors should not exist');
  });

  it('has _onInput and _onChange methods', () => {
    assert.equal(typeof mod.UIInputSlider.prototype._onInput, 'function');
    assert.equal(typeof mod.UIInputSlider.prototype._onChange, 'function');
  });

  it('has _attachListeners method', () => {
    assert.equal(typeof mod.UIInputSlider.prototype._attachListeners, 'function');
  });

  it('has _syncSlider method', () => {
    assert.equal(typeof mod.UIInputSlider.prototype._syncSlider, 'function');
  });

  it('has connectedCallback', () => {
    assert.equal(typeof mod.UIInputSlider.prototype.connectedCallback, 'function');
  });

  it('has render method that returns a string', () => {
    const inst = Object.create(mod.UIInputSlider.prototype);
    inst.label = '';
    inst.help = '';
    inst.error = '';
    inst.required = false;
    inst.showvalue = false;
    inst.value = 50;
    inst.min = 0;
    inst.max = 100;
    inst.step = 1;
    inst.disabled = false;
    inst.name = '';
    const html = inst.render();
    assert.equal(typeof html, 'string');
    assert.ok(html.length > 0);
  });
});
