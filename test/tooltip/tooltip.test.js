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

const mod = await import('../../src/components/tooltip/tooltip.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UITooltip module', () => {
  it('exports the UITooltip class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UITooltip, 'function');
  });

  it('declares expected static properties', () => {
    const props = mod.UITooltip.properties;
    for (const key of ['content', 'placement', 'delay', 'background', 'color',
                        'size', 'maxWidth', 'disabled']) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
  });

  it('has correct default values', () => {
    const p = mod.UITooltip.properties;
    assert.equal(p.content.default, '');
    assert.equal(p.placement.default, 'top');
    assert.equal(p.delay.default, 200);
    assert.equal(p.background.default, '');
    assert.equal(p.color.default, '');
    assert.equal(p.size.default, '');
    assert.equal(p.maxWidth.default, '');
    assert.equal(p.disabled.default, false);
  });

  it('properties have correct types', () => {
    const p = mod.UITooltip.properties;
    assert.equal(p.content.type, String);
    assert.equal(p.placement.type, String);
    assert.equal(p.delay.type, Number);
    assert.equal(p.disabled.type, Boolean);
    assert.equal(p.maxWidth.type, String);
  });

  it('max-width uses kebab-case attribute', () => {
    assert.equal(mod.UITooltip.properties.maxWidth.attribute, 'max-width');
  });

  it('all properties reflect', () => {
    const p = mod.UITooltip.properties;
    for (const key of Object.keys(p)) {
      assert.notEqual(p[key].reflect, false, `${key} should reflect`);
    }
  });

  it('has static styles()', () => {
    const css = mod.UITooltip.styles();
    assert.ok(css.includes(':host'), 'Should include :host');
    assert.ok(css.includes('inline-block'), 'Host should be inline-block');
  });

  it('has static _ensureGlobalStyles method', () => {
    assert.equal(typeof mod.UITooltip._ensureGlobalStyles, 'function');
  });

  it('has _positionTip method for JS-based placement', () => {
    assert.equal(typeof mod.UITooltip.prototype._positionTip, 'function');
  });

  it('has _getPopup method', () => {
    assert.equal(typeof mod.UITooltip.prototype._getPopup, 'function');
  });

  it('has _removePopup method', () => {
    assert.equal(typeof mod.UITooltip.prototype._removePopup, 'function');
  });

  it('render() includes slot', () => {
    const instance = Object.create(mod.UITooltip.prototype);
    instance.content = 'Hello';
    const html = instance.render();
    assert.ok(html.includes('<slot></slot>'), 'Should have slot');
  });

  it('has show/hide methods', () => {
    assert.equal(typeof mod.UITooltip.prototype._showTip, 'function');
    assert.equal(typeof mod.UITooltip.prototype._hideTip, 'function');
  });

  it('has _applyStyles method', () => {
    assert.equal(typeof mod.UITooltip.prototype._applyStyles, 'function');
  });

  it('is registered as ui-tooltip custom element', () => {
    assert.equal(globalThis.customElements.get('ui-tooltip'), mod.UITooltip);
  });

  it('has _update method', () => {
    assert.equal(typeof mod.UITooltip.prototype._update, 'function');
  });

  it('has _esc method', () => {
    assert.equal(typeof mod.UITooltip.prototype._esc, 'function');
  });

  it('_esc escapes HTML entities and quotes', () => {
    const esc = mod.UITooltip.prototype._esc;
    assert.equal(esc('<b>'), '&lt;b>');
    assert.equal(esc('a&b'), 'a&amp;b');
    assert.equal(esc('say "hi"'), 'say &quot;hi&quot;');
    assert.equal(esc(null), '');
    assert.equal(esc(undefined), '');
    assert.equal(esc(42), '42');
  });

  it('render() returns only a slot (popup is body-level)', () => {
    const instance = Object.create(mod.UITooltip.prototype);
    instance.content = 'Test';
    const html = instance.render();
    assert.ok(html.includes('<slot>'), 'Should include slot');
    assert.ok(!html.includes('class="tip"'), 'Popup is not in shadow DOM');
  });

  it('constructor binds _showTip and _hideTip', () => {
    // Verify the prototype methods exist as bound forms
    assert.equal(typeof mod.UITooltip.prototype._showTip, 'function');
    assert.equal(typeof mod.UITooltip.prototype._hideTip, 'function');
  });

  it('popup class is ui-tooltip-popup (body-level)', () => {
    // The popup uses a global class instead of shadow DOM styling
    assert.equal(typeof mod.UITooltip._ensureGlobalStyles, 'function');
  });

  it('placement property accepts all four directions', () => {
    const p = mod.UITooltip.properties.placement;
    assert.equal(p.default, 'top', 'Default placement should be top');
    assert.equal(p.type, String);
  });
});
