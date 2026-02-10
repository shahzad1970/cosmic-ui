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

const mod = await import('../../src/components/input/tags.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UIInputTags module', () => {
  it('exports the UIInputTags class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UIInputTags, 'function');
  });

  it('declares all expected static properties', () => {
    const props = mod.UIInputTags.properties;
    const expected = ['value', 'placeholder', 'name', 'label', 'help', 'error', 'size', 'background', 'color', 'max', 'disabled', 'required'];
    for (const key of expected) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
  });

  it('has correct default values', () => {
    const p = mod.UIInputTags.properties;
    assert.equal(p.value.default, '');
    assert.equal(p.placeholder.default, 'Add…');
    assert.equal(p.name.default, '');
    assert.equal(p.label.default, '');
    assert.equal(p.help.default, '');
    assert.equal(p.error.default, '');
    assert.equal(p.size.default, '');
    assert.equal(p.background.default, '');
    assert.equal(p.color.default, 'indigo-100');
    assert.equal(p.max.default, 0);
    assert.equal(p.disabled.default, false);
    assert.equal(p.required.default, false);
  });

  it('Number properties have correct type', () => {
    const p = mod.UIInputTags.properties;
    assert.equal(p.max.type, Number);
  });

  it('Boolean properties have correct type', () => {
    const p = mod.UIInputTags.properties;
    const bools = ['disabled', 'required'];
    for (const key of bools) {
      assert.equal(p[key].type, Boolean, `${key} should be Boolean`);
    }
  });

  it('String properties have correct type', () => {
    const p = mod.UIInputTags.properties;
    const strings = ['value', 'placeholder', 'name', 'label', 'help', 'error', 'size', 'background', 'color'];
    for (const key of strings) {
      assert.equal(p[key].type, String, `${key} should be String`);
    }
  });

  it('all properties reflect', () => {
    const p = mod.UIInputTags.properties;
    for (const key of Object.keys(p)) {
      assert.equal(p[key].reflect, true, `${key} should reflect`);
    }
  });

  it('has static styles() with expected CSS', () => {
    const css = mod.UIInputTags.styles();
    assert.ok(css.includes('.wrapper'), 'Should include wrapper styles');
    assert.ok(css.includes('.tag'), 'Should include tag styles');
    assert.ok(css.includes('.tag-remove'), 'Should include remove button styles');
    assert.ok(css.includes('.input'), 'Should include input styles');
    assert.ok(css.includes(':host'), 'Should include host styles');
  });

  it('has a render method', () => {
    assert.equal(typeof mod.UIInputTags.prototype.render, 'function');
  });

  it('is registered as ui-input-tags', () => {
    const registered = globalThis.customElements.get('ui-input-tags');
    assert.equal(registered, mod.UIInputTags);
  });

  it('has _addTag and _removeTag methods', () => {
    const proto = mod.UIInputTags.prototype;
    assert.equal(typeof proto._addTag, 'function');
    assert.equal(typeof proto._removeTag, 'function');
  });

  it('has _syncTagsFromValue method', () => {
    assert.equal(typeof mod.UIInputTags.prototype._syncTagsFromValue, 'function');
  });

  it('has _syncValue method', () => {
    assert.equal(typeof mod.UIInputTags.prototype._syncValue, 'function');
  });

  it('has _onKeyDown and _onInput methods', () => {
    const proto = mod.UIInputTags.prototype;
    assert.equal(typeof proto._onKeyDown, 'function');
    assert.equal(typeof proto._onInput, 'function');
  });

  it('has focus and blur methods', () => {
    assert.equal(typeof mod.UIInputTags.prototype.focus, 'function');
    assert.equal(typeof mod.UIInputTags.prototype.blur, 'function');
  });

  it('has tags getter', () => {
    const desc = Object.getOwnPropertyDescriptor(mod.UIInputTags.prototype, 'tags');
    assert.ok(desc && typeof desc.get === 'function', 'Should have tags getter');
  });

  it('uses merged _applyStyles (no separate _applySize/_applyColors)', () => {
    const proto = mod.UIInputTags.prototype;
    assert.equal(typeof proto._applyStyles, 'function');
    assert.equal(proto._applySize, undefined, 'Should not have separate _applySize');
    assert.equal(proto._applyColors, undefined, 'Should not have separate _applyColors');
  });

  it('styles include error focus ring', () => {
    const css = mod.UIInputTags.styles();
    assert.ok(css.includes(':host([error]) .wrapper:focus-within'), 'Should include error focus-within ring');
  });

  it('styles include tag animation', () => {
    const css = mod.UIInputTags.styles();
    assert.ok(css.includes('tag-in'), 'Should include tag-in animation');
  });
});
