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

const mod = await import('../../src/components/input/date.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UIInputDate module', () => {
  it('exports the UIInputDate class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UIInputDate, 'function');
  });

  it('declares all expected static properties', () => {
    const props = mod.UIInputDate.properties;
    const expected = ['value', 'placeholder', 'name', 'label', 'help', 'error', 'size', 'min', 'max', 'range', 'disabled', 'required'];
    for (const key of expected) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
  });

  it('has correct default values', () => {
    const p = mod.UIInputDate.properties;
    assert.equal(p.value.default, '');
    assert.equal(p.placeholder.default, 'YYYY-MM-DD');
    assert.equal(p.name.default, '');
    assert.equal(p.label.default, '');
    assert.equal(p.help.default, '');
    assert.equal(p.error.default, '');
    assert.equal(p.min.default, '');
    assert.equal(p.max.default, '');
    assert.equal(p.disabled.default, false);
    assert.equal(p.required.default, false);
  });

  it('Boolean properties have correct type', () => {
    const p = mod.UIInputDate.properties;
    const bools = ['disabled', 'required'];
    for (const key of bools) {
      assert.equal(p[key].type, Boolean, `${key} should be Boolean`);
    }
  });

  it('String properties have correct type', () => {
    const p = mod.UIInputDate.properties;
    const strings = ['value', 'placeholder', 'name', 'label', 'help', 'error', 'size', 'min', 'max'];
    for (const key of strings) {
      assert.equal(p[key].type, String, `${key} should be String`);
    }
  });

  it('all properties reflect', () => {
    const p = mod.UIInputDate.properties;
    for (const key of Object.keys(p)) {
      assert.equal(p[key].reflect, true, `${key} should reflect`);
    }
  });

  it('has static _DAYS and _MONTHS arrays', () => {
    assert.ok(Array.isArray(mod.UIInputDate._DAYS));
    assert.equal(mod.UIInputDate._DAYS.length, 7);
    assert.ok(Array.isArray(mod.UIInputDate._MONTHS));
    assert.equal(mod.UIInputDate._MONTHS.length, 12);
    assert.equal(mod.UIInputDate._MONTHS[0], 'January');
  });

  it('has static styles() with expected CSS', () => {
    const css = mod.UIInputDate.styles();
    assert.ok(css.includes('.trigger'), 'Should include trigger styles');
    assert.ok(css.includes('.panel'), 'Should include panel styles');
    assert.ok(css.includes('.day'), 'Should include day styles');
    assert.ok(css.includes('.weekdays'), 'Should include weekdays styles');
    assert.ok(css.includes(':host'), 'Should include host styles');
  });

  it('has a render method', () => {
    assert.equal(typeof mod.UIInputDate.prototype.render, 'function');
  });

  it('is registered as ui-input-date', () => {
    const registered = globalThis.customElements.get('ui-input-date');
    assert.equal(registered, mod.UIInputDate);
  });

  it('has _toISO method that formats dates correctly', () => {
    const proto = mod.UIInputDate.prototype;
    assert.equal(typeof proto._toISO, 'function');
    const d = new Date(2024, 0, 5); // Jan 5 2024
    assert.equal(proto._toISO(d), '2024-01-05');
  });

  it('has _isDisabledDate method', () => {
    const proto = mod.UIInputDate.prototype;
    assert.equal(typeof proto._isDisabledDate, 'function');
  });

  it('has calendar navigation methods', () => {
    assert.equal(typeof mod.UIInputDate.prototype._prevMonth, 'function');
    assert.equal(typeof mod.UIInputDate.prototype._nextMonth, 'function');
  });

  it('has _parseInput method', () => {
    const proto = mod.UIInputDate.prototype;
    assert.equal(typeof proto._parseInput, 'function');
  });

  it('_parseInput handles YYYY-MM-DD', () => {
    const p = mod.UIInputDate.prototype._parseInput;
    assert.equal(p('2024-03-15'), '2024-03-15');
    assert.equal(p('2024-1-5'), '2024-01-05');
  });

  it('_parseInput handles YYYY/MM/DD', () => {
    const p = mod.UIInputDate.prototype._parseInput;
    assert.equal(p('2024/03/15'), '2024-03-15');
  });

  it('_parseInput handles MM/DD/YYYY', () => {
    const p = mod.UIInputDate.prototype._parseInput;
    assert.equal(p('03/15/2024'), '2024-03-15');
    assert.equal(p('12-25-2024'), '2024-12-25');
  });

  it('_parseInput returns empty for empty string', () => {
    assert.equal(mod.UIInputDate.prototype._parseInput(''), '');
    assert.equal(mod.UIInputDate.prototype._parseInput('   '), '');
  });

  it('_parseInput returns null for garbage', () => {
    assert.equal(mod.UIInputDate.prototype._parseInput('hello'), null);
    assert.equal(mod.UIInputDate.prototype._parseInput('abc-def-ghi'), null);
  });

  it('has _selectDate method', () => {
    assert.equal(typeof mod.UIInputDate.prototype._selectDate, 'function');
  });

  it('has _onInputChange and _onInputKeyDown methods', () => {
    assert.equal(typeof mod.UIInputDate.prototype._onInputChange, 'function');
    assert.equal(typeof mod.UIInputDate.prototype._onInputKeyDown, 'function');
  });

  it('has _onClear method', () => {
    assert.equal(typeof mod.UIInputDate.prototype._onClear, 'function');
  });

  it('styles include date-input and clear-btn', () => {
    const css = mod.UIInputDate.styles();
    assert.ok(css.includes('.date-input'), 'Should include date-input styles');
    assert.ok(css.includes('.clear-btn'), 'Should include clear button styles');
  });

  it('styles use focus-within on trigger', () => {
    const css = mod.UIInputDate.styles();
    assert.ok(css.includes('.trigger:focus-within'), 'Should use focus-within not :focus');
    assert.ok(!css.includes('.trigger:focus {'), 'Should not use plain :focus on trigger');
  });

  it('styles include error focus ring', () => {
    const css = mod.UIInputDate.styles();
    assert.ok(css.includes(':host([error]) .trigger:focus-within'), 'Should have error focus ring');
  });

  it('_isDisabledDate respects min', () => {
    const proto = mod.UIInputDate.prototype;
    const ctx = { min: '2024-03-01', max: '' };
    assert.equal(proto._isDisabledDate.call(ctx, '2024-02-28'), true);
    assert.equal(proto._isDisabledDate.call(ctx, '2024-03-01'), false);
    assert.equal(proto._isDisabledDate.call(ctx, '2024-03-15'), false);
  });

  it('_isDisabledDate respects max', () => {
    const proto = mod.UIInputDate.prototype;
    const ctx = { min: '', max: '2024-06-30' };
    assert.equal(proto._isDisabledDate.call(ctx, '2024-07-01'), true);
    assert.equal(proto._isDisabledDate.call(ctx, '2024-06-30'), false);
    assert.equal(proto._isDisabledDate.call(ctx, '2024-06-01'), false);
  });

  it('_isDisabledDate respects both min and max', () => {
    const proto = mod.UIInputDate.prototype;
    const ctx = { min: '2024-03-01', max: '2024-06-30' };
    assert.equal(proto._isDisabledDate.call(ctx, '2024-02-28'), true);
    assert.equal(proto._isDisabledDate.call(ctx, '2024-07-01'), true);
    assert.equal(proto._isDisabledDate.call(ctx, '2024-04-15'), false);
  });

  it('_isDisabledDate returns false when no min/max', () => {
    const proto = mod.UIInputDate.prototype;
    const ctx = { min: '', max: '' };
    assert.equal(proto._isDisabledDate.call(ctx, '2024-01-01'), false);
    assert.equal(proto._isDisabledDate.call(ctx, '2099-12-31'), false);
  });

  it('_toISO zero-pads single-digit month and day', () => {
    const proto = mod.UIInputDate.prototype;
    assert.equal(proto._toISO(new Date(2024, 0, 1)), '2024-01-01');
    assert.equal(proto._toISO(new Date(2024, 11, 31)), '2024-12-31');
    assert.equal(proto._toISO(new Date(2024, 8, 9)), '2024-09-09');
  });

  it('has _attachPanelListeners method', () => {
    assert.equal(typeof mod.UIInputDate.prototype._attachPanelListeners, 'function');
  });

  it('has _refreshPanel method', () => {
    assert.equal(typeof mod.UIInputDate.prototype._refreshPanel, 'function');
  });

  it('has _openPanel and _closePanel methods', () => {
    assert.equal(typeof mod.UIInputDate.prototype._openPanel, 'function');
    assert.equal(typeof mod.UIInputDate.prototype._closePanel, 'function');
  });

  it('has focus and blur methods', () => {
    assert.equal(typeof mod.UIInputDate.prototype.focus, 'function');
    assert.equal(typeof mod.UIInputDate.prototype.blur, 'function');
  });

  // ── Range mode tests ──────────────────────────────────────

  it('range property exists as Boolean with default false', () => {
    const p = mod.UIInputDate.properties.range;
    assert.equal(p.type, Boolean);
    assert.equal(p.default, false);
    assert.equal(p.reflect, true);
  });

  it('has _selectRangeDate method', () => {
    assert.equal(typeof mod.UIInputDate.prototype._selectRangeDate, 'function');
  });

  it('has _updateHoverPreview method', () => {
    assert.equal(typeof mod.UIInputDate.prototype._updateHoverPreview, 'function');
  });

  it('styles include range-related CSS', () => {
    const css = mod.UIInputDate.styles();
    assert.ok(css.includes('data-range-start'), 'Should include range-start style');
    assert.ok(css.includes('data-range-end'), 'Should include range-end style');
    assert.ok(css.includes('data-in-range'), 'Should include in-range style');
    assert.ok(css.includes('data-range-preview'), 'Should include range-preview style');
    assert.ok(css.includes('.range-hint'), 'Should include range-hint style');
  });

  it('range-start and range-end get indigo-500 background', () => {
    const css = mod.UIInputDate.styles();
    assert.ok(css.includes('.day[data-range-start]'), 'Should style range-start days');
    assert.ok(css.includes('.day[data-range-end]'), 'Should style range-end days');
  });

  it('has correct default values including range', () => {
    const p = mod.UIInputDate.properties;
    assert.equal(p.range.default, false);
  });
});
