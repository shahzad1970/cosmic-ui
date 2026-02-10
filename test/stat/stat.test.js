import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

/*
 * Smoke-tests for UIStat.
 *
 * Validates module resolution, class shape, styles, and render output.
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

const mod = await import('../../src/components/stat/stat.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UIStat module', () => {
  it('exports the UIStat class', () => {
    assert.equal(typeof mod.UIStat, 'function');
  });

  it('is registered as a custom element', () => {
    assert.equal(mod.UIStat.name, 'UIStat');
  });

  it('declares 8 properties', () => {
    const keys = Object.keys(mod.UIStat.properties);
    assert.deepEqual(keys, ['label', 'value', 'trend', 'icon', 'background', 'color', 'size', 'compact']);
  });

  it('has correct property defaults', () => {
    const p = mod.UIStat.properties;
    assert.equal(p.label.default, '');
    assert.equal(p.value.default, '');
    assert.equal(p.trend.default, '');
    assert.equal(p.icon.default, '');
    assert.equal(p.background.default, '');
    assert.equal(p.color.default, '');
    assert.equal(p.size.default, '');
    assert.equal(p.compact.default, false);
  });

  it('has correct property types', () => {
    const p = mod.UIStat.properties;
    assert.equal(p.label.type, String);
    assert.equal(p.value.type, String);
    assert.equal(p.trend.type, String);
    assert.equal(p.icon.type, String);
    assert.equal(p.background.type, String);
    assert.equal(p.color.type, String);
    assert.equal(p.size.type, String);
    assert.equal(p.compact.type, Boolean);
  });

  it('reflects all properties', () => {
    const p = mod.UIStat.properties;
    for (const key of Object.keys(p)) {
      assert.equal(p[key].reflect, true, `${key} should reflect`);
    }
  });

  it('styles include host, stat, label, value, trend, extra', () => {
    const css = mod.UIStat.styles();
    assert.ok(css.includes(':host'));
    assert.ok(css.includes('.stat'));
    assert.ok(css.includes('.label'));
    assert.ok(css.includes('.value'));
    assert.ok(css.includes('.trend'));
    assert.ok(css.includes('.extra'));
  });

  it('styles support compact layout', () => {
    const css = mod.UIStat.styles();
    assert.ok(css.includes('[compact]'));
  });

  it('styles use --_bg for background', () => {
    const css = mod.UIStat.styles();
    assert.ok(css.includes('--_bg'));
  });

  it('styles use --_color for text colour', () => {
    const css = mod.UIStat.styles();
    assert.ok(css.includes('--_color'));
  });

  it('styles use --_border-color for adaptive border', () => {
    const css = mod.UIStat.styles();
    assert.ok(css.includes('--_border-color'));
  });

  it('styles use --_label-color for label contrast', () => {
    const css = mod.UIStat.styles();
    assert.ok(css.includes('--_label-color'));
  });

  it('styles include trend.up and trend.down colours', () => {
    const css = mod.UIStat.styles();
    assert.ok(css.includes('.trend.up'));
    assert.ok(css.includes('.trend.down'));
  });

  it('styles include trend.neutral colours', () => {
    const css = mod.UIStat.styles();
    assert.ok(css.includes('.trend.neutral'));
  });

  it('styles hide empty extra div', () => {
    const css = mod.UIStat.styles();
    assert.ok(css.includes('.extra.empty'));
  });

  it('render shows label when set', () => {
    const inst = Object.create(mod.UIStat.prototype);
    inst._label = 'Total Users';
    inst._value = '';
    inst._trend = '';
    inst._icon = '';
    const html = mod.UIStat.prototype.render.call(inst);
    assert.ok(html.includes('Total Users'));
    assert.ok(html.includes('class="label"'));
  });

  it('render shows value when set', () => {
    const inst = Object.create(mod.UIStat.prototype);
    inst._label = '';
    inst._value = '12,345';
    inst._trend = '';
    inst._icon = '';
    const html = mod.UIStat.prototype.render.call(inst);
    assert.ok(html.includes('12,345'));
    assert.ok(html.includes('class="value"'));
  });

  it('render shows icon when set', () => {
    const inst = Object.create(mod.UIStat.prototype);
    inst._label = '';
    inst._value = '';
    inst._trend = '';
    inst._icon = 'users';
    const html = mod.UIStat.prototype.render.call(inst);
    assert.ok(html.includes('<ui-icon>'));
    assert.ok(html.includes('users'));
    assert.ok(html.includes('stat-icon'));
  });

  it('render omits icon div when empty', () => {
    const inst = Object.create(mod.UIStat.prototype);
    inst._label = '';
    inst._value = '';
    inst._trend = '';
    inst._icon = '';
    const html = mod.UIStat.prototype.render.call(inst);
    assert.ok(!html.includes('stat-icon'));
  });

  it('render omits label div when empty', () => {
    const inst = Object.create(mod.UIStat.prototype);
    inst._label = '';
    inst._value = '';
    inst._trend = '';
    inst._icon = '';
    const html = mod.UIStat.prototype.render.call(inst);
    assert.ok(!html.includes('class="label"'));
  });

  it('render shows trend up for "+" prefix', () => {
    const inst = Object.create(mod.UIStat.prototype);
    inst._label = '';
    inst._value = '';
    inst._trend = '+12%';
    inst._icon = '';
    const html = mod.UIStat.prototype.render.call(inst);
    assert.ok(html.includes('class="trend up"'));
    assert.ok(html.includes('+12%'));
  });

  it('render shows trend down for "-" prefix', () => {
    const inst = Object.create(mod.UIStat.prototype);
    inst._label = '';
    inst._value = '';
    inst._trend = '-3.2%';
    inst._icon = '';
    const html = mod.UIStat.prototype.render.call(inst);
    assert.ok(html.includes('class="trend down"'));
    assert.ok(html.includes('-3.2%'));
  });

  it('render shows trend up for "up" keyword', () => {
    const inst = Object.create(mod.UIStat.prototype);
    inst._label = '';
    inst._value = '';
    inst._trend = 'up';
    inst._icon = '';
    const html = mod.UIStat.prototype.render.call(inst);
    assert.ok(html.includes('class="trend up"'));
    // "up" keyword should not display text label
    assert.ok(html.includes('<svg'));
  });

  it('render shows trend down for "down" keyword', () => {
    const inst = Object.create(mod.UIStat.prototype);
    inst._label = '';
    inst._value = '';
    inst._trend = 'down';
    inst._icon = '';
    const html = mod.UIStat.prototype.render.call(inst);
    assert.ok(html.includes('class="trend down"'));
  });

  it('render shows trend neutral for values without +/- prefix', () => {
    const inst = Object.create(mod.UIStat.prototype);
    inst._label = '';
    inst._value = '';
    inst._trend = '5%';
    inst._icon = '';
    const html = mod.UIStat.prototype.render.call(inst);
    assert.ok(html.includes('class="trend neutral"'));
    assert.ok(html.includes('5%'));
  });

  it('render omits trend when empty', () => {
    const inst = Object.create(mod.UIStat.prototype);
    inst._label = '';
    inst._value = '';
    inst._trend = '';
    inst._icon = '';
    const html = mod.UIStat.prototype.render.call(inst);
    assert.ok(!html.includes('class="trend'));
  });

  it('render includes default slot', () => {
    const inst = Object.create(mod.UIStat.prototype);
    inst._label = '';
    inst._value = '';
    inst._trend = '';
    inst._icon = '';
    const html = mod.UIStat.prototype.render.call(inst);
    assert.ok(html.includes('<slot>'));
  });

  it('escapes HTML in label and value', () => {
    const inst = Object.create(mod.UIStat.prototype);
    inst._label = '<script>alert(1)</script>';
    inst._value = '<b>bold</b>';
    inst._trend = '';
    inst._icon = '';
    const html = mod.UIStat.prototype.render.call(inst);
    assert.ok(!html.includes('<script>'));
    assert.ok(html.includes('&lt;script'));
    assert.ok(!html.includes('<b>'));
    assert.ok(html.includes('&lt;b'));
  });

  it('escapes HTML in trend', () => {
    const inst = Object.create(mod.UIStat.prototype);
    inst._label = '';
    inst._value = '';
    inst._trend = '<img onerror=alert(1)>';
    inst._icon = '';
    const html = mod.UIStat.prototype.render.call(inst);
    assert.ok(!html.includes('<img'));
  });

  it('escapes HTML in icon', () => {
    const inst = Object.create(mod.UIStat.prototype);
    inst._label = '';
    inst._value = '';
    inst._trend = '';
    inst._icon = '<script>x</script>';
    const html = mod.UIStat.prototype.render.call(inst);
    assert.ok(!html.includes('<script>x'));
  });
});
