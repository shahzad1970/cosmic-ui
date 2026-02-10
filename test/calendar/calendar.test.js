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

const mod = await import('../../src/components/calendar/calendar.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UICalendar module', () => {
  it('exports the UICalendar class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UICalendar, 'function');
  });

  it('declares all expected static properties', () => {
    const props = mod.UICalendar.properties;
    const expected = ['value', 'min', 'max', 'background', 'color', 'size', 'disabled', 'locale'];
    for (const key of expected) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
  });

  it('has correct default values', () => {
    const p = mod.UICalendar.properties;
    assert.equal(p.value.default, '');
    assert.equal(p.min.default, '');
    assert.equal(p.max.default, '');
    assert.equal(p.background.default, 'indigo-500');
    assert.equal(p.color.default, '');
    assert.equal(p.size.default, '');
    assert.equal(p.disabled.default, false);
    assert.equal(p.locale.default, '');
  });

  it('Boolean properties have correct type', () => {
    const p = mod.UICalendar.properties;
    assert.equal(p.disabled.type, Boolean);
  });

  it('String properties have correct type', () => {
    const p = mod.UICalendar.properties;
    const strings = ['value', 'min', 'max', 'background', 'color', 'size', 'locale'];
    for (const key of strings) {
      assert.equal(p[key].type, String, `${key} should be String`);
    }
  });

  it('all properties reflect', () => {
    const p = mod.UICalendar.properties;
    for (const key of Object.keys(p)) {
      assert.equal(p[key].reflect, true, `${key} should reflect`);
    }
  });

  it('has static styles()', () => {
    const css = mod.UICalendar.styles();
    assert.ok(css.includes(':host'), 'Should include host styles');
    assert.ok(css.includes('inline-block'), 'Should be inline-block display');
  });

  it('has a render method', () => {
    assert.equal(typeof mod.UICalendar.prototype.render, 'function');
  });

  it('is registered as ui-calendar', () => {
    const registered = globalThis.customElements.get('ui-calendar');
    assert.equal(registered, mod.UICalendar);
  });

  it('has _applyStyles method', () => {
    assert.equal(typeof mod.UICalendar.prototype._applyStyles, 'function');
  });

  it('has _attachListeners method', () => {
    assert.equal(typeof mod.UICalendar.prototype._attachListeners, 'function');
  });

  it('has _syncViewFromValue method', () => {
    assert.equal(typeof mod.UICalendar.prototype._syncViewFromValue, 'function');
  });

  it('_update calls _applyStyles before super (merged convention)', () => {
    const src = mod.UICalendar.prototype._update.toString();
    const applyIdx = src.indexOf('_applyStyles');
    const superIdx = src.indexOf('super._update');
    assert.ok(applyIdx > -1, '_update should call _applyStyles');
    assert.ok(superIdx > -1, '_update should call super._update');
    assert.ok(applyIdx < superIdx, '_applyStyles should be called before super._update');
  });

  it('_update calls _syncViewFromValue', () => {
    const src = mod.UICalendar.prototype._update.toString();
    assert.ok(src.includes('_syncViewFromValue'), '_update should call _syncViewFromValue');
  });

  it('_update calls _attachListeners after super._update', () => {
    const src = mod.UICalendar.prototype._update.toString();
    const superIdx = src.indexOf('super._update');
    const attachIdx = src.indexOf('_attachListeners');
    assert.ok(attachIdx > -1, '_update should call _attachListeners');
    assert.ok(attachIdx > superIdx, '_attachListeners should be after super._update');
  });

  it('styles include disabled opacity', () => {
    const css = mod.UICalendar.styles();
    assert.ok(css.includes(':host([disabled])'), 'Should include disabled host styles');
    assert.ok(css.includes('opacity: 0.5'), 'Disabled should reduce opacity');
  });

  it('styles include .selected class', () => {
    const css = mod.UICalendar.styles();
    assert.ok(css.includes('.day.selected'), 'Should style selected days');
  });

  it('styles include .today class', () => {
    const css = mod.UICalendar.styles();
    assert.ok(css.includes('.day.today'), 'Should style today');
  });

  it('styles include .outside class', () => {
    const css = mod.UICalendar.styles();
    assert.ok(css.includes('.day.outside'), 'Should style outside-month days');
  });

  it('styles include .disabled class for days', () => {
    const css = mod.UICalendar.styles();
    assert.ok(css.includes('.day.disabled'), 'Should style disabled days');
  });

  it('styles include accent CSS var for selected day', () => {
    const css = mod.UICalendar.styles();
    assert.ok(css.includes('--_accent'), 'Should use --_accent for selected day color');
  });

  it('styles include nav-btn for month navigation', () => {
    const css = mod.UICalendar.styles();
    assert.ok(css.includes('.nav-btn'), 'Should style navigation buttons');
  });

  it('styles include grid layout for 7-column calendar', () => {
    const css = mod.UICalendar.styles();
    assert.ok(css.includes('repeat(7, 1fr)'), 'Grid should have 7 columns');
  });

  it('does not override connectedCallback with custom _applyStyles call', () => {
    // _applyStyles should only be in _update, not connectedCallback
    const hasOwn = mod.UICalendar.prototype.hasOwnProperty('connectedCallback');
    if (hasOwn) {
      const src = mod.UICalendar.prototype.connectedCallback.toString();
      assert.ok(!src.includes('_applyStyles'), 'connectedCallback should not call _applyStyles directly');
    }
  });

  it('does not override attributeChangedCallback', () => {
    const hasOwn = mod.UICalendar.prototype.hasOwnProperty('attributeChangedCallback');
    assert.ok(!hasOwn, 'Should not override attributeChangedCallback');
  });

  it('render uses this.value not this._value', () => {
    const src = mod.UICalendar.prototype.render.toString();
    // It should reference this.value, this.min, this.max, this.locale
    assert.ok(!src.includes('this._value'), 'Should use this.value, not this._value');
    assert.ok(!src.includes('this._min'), 'Should use this.min, not this._min');
    assert.ok(!src.includes('this._max'), 'Should use this.max, not this._max');
    assert.ok(!src.includes('this._locale'), 'Should use this.locale, not this._locale');
  });

  it('_applyStyles uses this.background not this._background', () => {
    const src = mod.UICalendar.prototype._applyStyles.toString();
    assert.ok(!src.includes('this._background'), 'Should use this.background');
    assert.ok(!src.includes('this._color'), 'Should use this.color');
    assert.ok(!src.includes('this._size'), 'Should use this.size');
  });
});
