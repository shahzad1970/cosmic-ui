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

const mod = await import('../../src/components/input/select.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UIInputSelect module', () => {
  it('exports the UIInputSelect class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UIInputSelect, 'function');
  });

  it('declares all expected static properties', () => {
    const props = mod.UIInputSelect.properties;
    const expected = [
      'value', 'placeholder', 'name', 'label', 'help', 'error',
      'size', 'background', 'color',
      'disabled', 'required', 'multiple', 'searchable',
    ];
    for (const key of expected) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
  });

  it('has correct default values', () => {
    const p = mod.UIInputSelect.properties;
    assert.equal(p.value.default, '');
    assert.equal(p.placeholder.default, 'Select…');
    assert.equal(p.name.default, '');
    assert.equal(p.label.default, '');
    assert.equal(p.help.default, '');
    assert.equal(p.error.default, '');
    assert.equal(p.size.default, '');
    assert.equal(p.background.default, '');
    assert.equal(p.color.default, '');
    assert.equal(p.disabled.default, false);
    assert.equal(p.required.default, false);
    assert.equal(p.multiple.default, false);
    assert.equal(p.searchable.default, false);
  });

  it('Boolean properties have correct type', () => {
    const p = mod.UIInputSelect.properties;
    const bools = ['disabled', 'required', 'multiple', 'searchable'];
    for (const key of bools) {
      assert.equal(p[key].type, Boolean, `${key} should be Boolean`);
    }
  });

  it('String properties have correct type', () => {
    const p = mod.UIInputSelect.properties;
    const strings = ['value', 'placeholder', 'name', 'label', 'help', 'error', 'size', 'background', 'color'];
    for (const key of strings) {
      assert.equal(p[key].type, String, `${key} should be String`);
    }
  });

  it('all properties reflect', () => {
    const p = mod.UIInputSelect.properties;
    for (const key of Object.keys(p)) {
      assert.equal(p[key].reflect, true, `${key} should reflect`);
    }
  });

  it('has static styles() with expected CSS selectors', () => {
    const css = mod.UIInputSelect.styles();
    assert.ok(css.includes('.trigger'), 'Should include .trigger styles');
    assert.ok(css.includes('.dropdown'), 'Should include .dropdown styles');
    assert.ok(css.includes('.option'), 'Should include .option styles');
    assert.ok(css.includes(':host'), 'Should include :host styles');
    assert.ok(css.includes(':host([disabled])'), 'Should include disabled host styles');
    assert.ok(css.includes(':host([data-open])'), 'Should include open state styles');
    assert.ok(css.includes('.help'), 'Should include help styles');
    assert.ok(css.includes('.error-msg'), 'Should include error-msg styles');
    assert.ok(css.includes(':host([error])'), 'Should style the error state');
    assert.ok(css.includes('.search-input'), 'Should include search input styles');
    assert.ok(css.includes('.tag'), 'Should include multi-select tag styles');
    assert.ok(css.includes('.placeholder'), 'Should include placeholder styles');
    assert.ok(css.includes('.caret'), 'Should include caret styles');
    assert.ok(css.includes('.no-results'), 'Should include no-results styles');
  });

  it('render outputs correct HTML structure', () => {
    const inst = Object.create(mod.UIInputSelect.prototype);
    inst.label = 'Country';
    inst.help = 'Select your country';
    inst.error = '';
    inst.required = true;
    inst.placeholder = 'Choose…';
    const html = inst.render();
    assert.ok(html.includes('Country'), 'Should render label text');
    assert.ok(html.includes('Select your country'), 'Should render help text');
    assert.ok(html.includes('*'), 'Should render required asterisk');
    assert.ok(html.includes('part="label"'), 'Should expose label CSS part');
    assert.ok(html.includes('part="trigger"'), 'Should expose trigger CSS part');
    assert.ok(html.includes('part="dropdown"'), 'Should expose dropdown CSS part');
    assert.ok(html.includes('part="help"'), 'Should expose help CSS part');
    assert.ok(html.includes('part="error"'), 'Should expose error CSS part');
    assert.ok(html.includes('role="combobox"'), 'Trigger should have combobox role');
    assert.ok(html.includes('role="listbox"'), 'Dropdown should have listbox role');
    assert.ok(html.includes('class="search-input"'), 'Should include search input');
    assert.ok(html.includes('class="options-list"'), 'Should include options list');
    assert.ok(html.includes('class="no-results"'), 'Should include no-results');
    assert.ok(html.includes('<slot'), 'Should include slot for <option> elements');
  });

  it('render escapes HTML in label, help, and error', () => {
    const inst = Object.create(mod.UIInputSelect.prototype);
    inst.label = '<script>alert("x")</script>';
    inst.help = '<b>bold</b>';
    inst.error = '<img>';
    inst.required = false;
    inst.placeholder = 'Choose…';
    const html = inst.render();
    assert.ok(!html.includes('<script>'), 'Should escape label HTML');
    assert.ok(!html.includes('<b>'), 'Should escape help HTML');
    assert.ok(!html.includes('<img>'), 'Should escape error HTML');
    assert.ok(html.includes('&lt;script>'), 'Should HTML-encode opening angle brackets');
  });

  it('render shows asterisk only when required is true', () => {
    const inst = Object.create(mod.UIInputSelect.prototype);
    inst.label = 'Pick one';
    inst.help = '';
    inst.error = '';
    inst.required = false;
    inst.placeholder = 'Choose…';
    const html = inst.render();
    assert.ok(!html.includes(' *'), 'Should not show asterisk when not required');

    inst.required = true;
    const html2 = inst.render();
    assert.ok(html2.includes(' *'), 'Should show asterisk when required');
  });

  it('is registered as ui-input-select', () => {
    const registered = globalThis.customElements.get('ui-input-select');
    assert.equal(registered, mod.UIInputSelect);
  });

  it('has _openDropdown and _closeDropdown methods', () => {
    assert.equal(typeof mod.UIInputSelect.prototype._openDropdown, 'function');
    assert.equal(typeof mod.UIInputSelect.prototype._closeDropdown, 'function');
  });

  it('has _selectedValues method', () => {
    assert.equal(typeof mod.UIInputSelect.prototype._selectedValues, 'function');
  });

  it('has _renderOptions method', () => {
    assert.equal(typeof mod.UIInputSelect.prototype._renderOptions, 'function');
  });

  it('has _updateDisplay method', () => {
    assert.equal(typeof mod.UIInputSelect.prototype._updateDisplay, 'function');
  });

  it('has _readOptions method', () => {
    assert.equal(typeof mod.UIInputSelect.prototype._readOptions, 'function');
  });

  it('has _selectOption method', () => {
    assert.equal(typeof mod.UIInputSelect.prototype._selectOption, 'function');
  });

  it('has merged _applyStyles method (not separate _applySize/_applyColors)', () => {
    assert.equal(typeof mod.UIInputSelect.prototype._applyStyles, 'function');
    assert.equal(mod.UIInputSelect.prototype._applySize, undefined, '_applySize should not exist');
    assert.equal(mod.UIInputSelect.prototype._applyColors, undefined, '_applyColors should not exist');
  });

  it('has connectedCallback and disconnectedCallback', () => {
    assert.equal(typeof mod.UIInputSelect.prototype.connectedCallback, 'function');
    assert.equal(typeof mod.UIInputSelect.prototype.disconnectedCallback, 'function');
  });

  it('has _onClick, _onKeyDown, _onSearchInput, _onOptionClick methods', () => {
    assert.equal(typeof mod.UIInputSelect.prototype._onClick, 'function');
    assert.equal(typeof mod.UIInputSelect.prototype._onKeyDown, 'function');
    assert.equal(typeof mod.UIInputSelect.prototype._onSearchInput, 'function');
    assert.equal(typeof mod.UIInputSelect.prototype._onOptionClick, 'function');
  });

  it('_selectedValues returns empty array for empty value', () => {
    const inst = Object.create(mod.UIInputSelect.prototype);
    inst.value = '';
    assert.deepEqual(inst._selectedValues(), []);
  });

  it('_selectedValues parses comma-separated multi-values', () => {
    const inst = Object.create(mod.UIInputSelect.prototype);
    inst.value = 'apple,banana,orange';
    assert.deepEqual(inst._selectedValues(), ['apple', 'banana', 'orange']);
  });

  it('_selectedValues trims whitespace from values', () => {
    const inst = Object.create(mod.UIInputSelect.prototype);
    inst.value = ' apple , banana , orange ';
    assert.deepEqual(inst._selectedValues(), ['apple', 'banana', 'orange']);
  });

  it('has render method that returns a string', () => {
    const inst = Object.create(mod.UIInputSelect.prototype);
    inst.label = 'Test';
    inst.help = '';
    inst.error = '';
    inst.required = false;
    inst.placeholder = 'Choose…';
    const html = inst.render();
    assert.equal(typeof html, 'string');
    assert.ok(html.length > 0, 'render should return non-empty string');
  });
});
