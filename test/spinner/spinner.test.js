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

const mod = await import('../../src/components/spinner/spinner.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UISpinner module', () => {
  it('exports the UISpinner class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UISpinner, 'function');
  });

  it('declares expected static properties', () => {
    const props = mod.UISpinner.properties;
    for (const key of ['size', 'color', 'thickness', 'speed', 'label', 'overlay']) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
  });

  it('has correct default values', () => {
    const p = mod.UISpinner.properties;
    assert.equal(p.size.default, '');
    assert.equal(p.color.default, '');
    assert.equal(p.thickness.default, '');
    assert.equal(p.speed.default, '');
    assert.equal(p.label.default, 'Loading');
    assert.equal(p.overlay.default, false);
  });

  it('properties have correct types', () => {
    const p = mod.UISpinner.properties;
    assert.equal(p.size.type, String);
    assert.equal(p.color.type, String);
    assert.equal(p.thickness.type, String);
    assert.equal(p.speed.type, String);
    assert.equal(p.label.type, String);
    assert.equal(p.overlay.type, Boolean);
  });

  it('all properties reflect', () => {
    const p = mod.UISpinner.properties;
    for (const key of Object.keys(p)) {
      assert.notEqual(p[key].reflect, false, `${key} should reflect`);
    }
  });

  it('has static styles()', () => {
    const css = mod.UISpinner.styles();
    assert.ok(css.includes(':host'), 'Should include :host');
    assert.ok(css.includes('.spinner'), 'Should include spinner class');
    assert.ok(css.includes('animation'), 'Should include animation');
    assert.ok(css.includes('@keyframes'), 'Should include keyframes');
  });

  it('styles handle overlay mode', () => {
    const css = mod.UISpinner.styles();
    assert.ok(css.includes('overlay'), 'Should include overlay styles');
  });

  it('render() includes spinner and label', () => {
    const instance = Object.create(mod.UISpinner.prototype);
    instance.label = 'Loading';
    const html = instance.render();
    assert.ok(html.includes('role="status"'), 'Should have role=status');
    assert.ok(html.includes('spinner'), 'Should include spinner element');
  });

  it('has _applyStyles method', () => {
    assert.equal(typeof mod.UISpinner.prototype._applyStyles, 'function');
  });

  it('is registered as ui-spinner custom element', () => {
    assert.equal(globalThis.customElements.get('ui-spinner'), mod.UISpinner);
  });

  it('has _update method', () => {
    assert.equal(typeof mod.UISpinner.prototype._update, 'function');
  });

  it('has _esc method', () => {
    assert.equal(typeof mod.UISpinner.prototype._esc, 'function');
  });

  it('_esc escapes ampersands and quotes', () => {
    const esc = mod.UISpinner.prototype._esc;
    assert.equal(esc('a&b'), 'a&amp;b');
    assert.equal(esc('say "hi"'), 'say &quot;hi&quot;');
    assert.equal(esc(null), '');
    assert.equal(esc(undefined), '');
  });

  it('render() includes part=spinner', () => {
    const instance = Object.create(mod.UISpinner.prototype);
    instance.label = 'Loading';
    const html = instance.render();
    assert.ok(html.includes('part="spinner"'), 'Should expose spinner part');
  });

  it('render() aria-label matches label property', () => {
    const instance = Object.create(mod.UISpinner.prototype);
    instance.label = 'Processing';
    const html = instance.render();
    assert.ok(html.includes('aria-label="Processing"'), 'Should use custom label');
  });

  it('styles include @keyframes spin', () => {
    const css = mod.UISpinner.styles();
    assert.ok(css.includes('@keyframes spin'), 'Should define spin keyframes');
  });

  it('styles include spinner border for track and accent', () => {
    const css = mod.UISpinner.styles();
    assert.ok(css.includes('border-top-color'), 'Should highlight the top border');
    assert.ok(css.includes('--_track'), 'Should use --_track for track colour');
    assert.ok(css.includes('--_color'), 'Should use --_color for accent colour');
  });
});
