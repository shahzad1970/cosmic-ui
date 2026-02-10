import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

/*
 * Smoke-tests for UICallout.
 *
 * Validates module resolution and class shape without a DOM.
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

const mod = await import('../../src/components/callout/callout.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UICallout module', () => {
  it('exports the UICallout class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UICallout, 'function');
  });

  it('is registered as ui-callout', () => {
    assert.equal(globalThis.customElements.get('ui-callout'), mod.UICallout);
  });

  it('declares expected static properties', () => {
    const props = mod.UICallout.properties;
    for (const key of ['background', 'color', 'size', 'elevation', 'dismissible']) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
  });

  it('has correct default values', () => {
    const p = mod.UICallout.properties;
    assert.equal(p.background.default, '');
    assert.equal(p.color.default, '');
    assert.equal(p.size.default, '');
    assert.equal(p.elevation.default, '');
    assert.equal(p.dismissible.default, false);
  });

  it('styles include dismiss button focus ring', () => {
    const css = mod.UICallout.styles();
    assert.ok(css.includes('button:focus-visible'), 'Missing button:focus-visible rule');
    assert.ok(css.includes('--ui-focus-ring'), 'Focus ring should use --ui-focus-ring token');
  });

  it('properties have correct types', () => {
    const p = mod.UICallout.properties;
    assert.equal(p.background.type, String);
    assert.equal(p.color.type, String);
    assert.equal(p.size.type, String);
    assert.equal(p.elevation.type, String);
    assert.equal(p.dismissible.type, Boolean);
  });

  it('all properties reflect', () => {
    const p = mod.UICallout.properties;
    for (const key of Object.keys(p)) {
      assert.notEqual(p[key].reflect, false, `${key} should reflect`);
    }
  });

  it('has _update method', () => {
    assert.equal(typeof mod.UICallout.prototype._update, 'function');
  });

  it('has _attachListeners method', () => {
    assert.equal(typeof mod.UICallout.prototype._attachListeners, 'function');
  });

  it('has _applyStyles method', () => {
    assert.equal(typeof mod.UICallout.prototype._applyStyles, 'function');
  });

  it('render() includes dismiss button and slot', () => {
    const instance = Object.create(mod.UICallout.prototype);
    const html = instance.render();
    assert.ok(html.includes('<slot>'), 'Should contain a slot');
    assert.ok(html.includes('aria-label="Dismiss"'), 'Dismiss button should have aria-label');
    assert.ok(html.includes('part="dismiss"'), 'Dismiss button should have part=dismiss');
    assert.ok(html.includes('\u2715'), 'Dismiss button should show × character');
  });

  it('static styles() returns non-empty CSS', () => {
    const css = mod.UICallout.styles();
    assert.ok(css.length > 0);
    assert.ok(css.includes(':host'), 'Should include :host');
    assert.ok(css.includes('button'), 'Should include button styles');
    assert.ok(css.includes('slot'), 'Should include slot styles');
  });

  it('styles include dismissible host rule', () => {
    const css = mod.UICallout.styles();
    assert.ok(css.includes(':host([dismissible])'), 'Should style host when dismissible');
  });

  it('styles include circular dismiss button', () => {
    const css = mod.UICallout.styles();
    assert.ok(css.includes('border-radius: 50%'), 'Dismiss button should be circular');
  });

  it('styles include elevation border', () => {
    const css = mod.UICallout.styles();
    assert.ok(css.includes(':host([elevation])'), 'Should add border on elevation');
    assert.ok(css.includes('--ui-border-color'), 'Should use --ui-border-color token');
  });
});
