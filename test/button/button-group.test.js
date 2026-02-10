import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

/*
 * Tests for UIButtonGroup.
 */

// Minimal DOM shims.
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

const mod = await import('../../src/components/button/button-group.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UIButtonGroup module', () => {
  it('exports the UIButtonGroup class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UIButtonGroup, 'function');
  });

  it('is registered as ui-button-group', () => {
    const ctor = globalThis.customElements.get('ui-button-group');
    assert.ok(ctor, 'ui-button-group should be registered');
    assert.equal(ctor, mod.UIButtonGroup);
  });

  it('declares expected static properties', () => {
    const props = mod.UIButtonGroup.properties;
    for (const key of ['size', 'vertical']) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
    assert.equal(Object.keys(props).length, 2, 'Should have exactly 2 properties');
  });

  it('has correct default values', () => {
    const p = mod.UIButtonGroup.properties;
    assert.equal(p.size.default, '');
    assert.equal(p.vertical.default, false);
  });

  it('all properties are reflected', () => {
    const props = mod.UIButtonGroup.properties;
    for (const [key, def] of Object.entries(props)) {
      assert.equal(def.reflect, true, `${key} should have reflect: true`);
    }
  });

  it('size is String type', () => {
    assert.equal(mod.UIButtonGroup.properties.size.type, String);
  });

  it('vertical is Boolean type', () => {
    assert.equal(mod.UIButtonGroup.properties.vertical.type, Boolean);
  });

  it('static styles() returns non-empty CSS', () => {
    const css = mod.UIButtonGroup.styles();
    assert.ok(css.length > 0);
    assert.ok(css.includes(':host'));
    assert.ok(css.includes('inline-flex'));
  });

  it('styles include horizontal radius rules', () => {
    const css = mod.UIButtonGroup.styles();
    assert.ok(css.includes('::slotted(ui-button:first-child)'));
    assert.ok(css.includes('::slotted(ui-button:last-child)'));
    assert.ok(css.includes('::slotted(ui-button:only-child)'));
  });

  it('styles include vertical overrides', () => {
    const css = mod.UIButtonGroup.styles();
    assert.ok(css.includes(':host([vertical])'));
    assert.ok(css.includes('flex-direction: column'));
  });

  it('styles handle z-index on hover', () => {
    const css = mod.UIButtonGroup.styles();
    assert.ok(css.includes('z-index: 1'));
  });

  it('styles use negative margin overlap for borders', () => {
    const css = mod.UIButtonGroup.styles();
    assert.ok(css.includes('margin-left: -1px'), 'Horizontal overlap');
    assert.ok(css.includes('margin-top: -1px'), 'Vertical overlap');
  });

  it('has _applyStyles method', () => {
    assert.equal(typeof mod.UIButtonGroup.prototype._applyStyles, 'function');
  });

  it('has _update method that calls _applyStyles (convention check)', () => {
    const proto = mod.UIButtonGroup.prototype;
    assert.equal(typeof proto._update, 'function', 'Should have _update');
    const src = proto._update.toString();
    assert.ok(src.includes('_applyStyles'), '_update should call _applyStyles');
  });

  it('does not override attributeChangedCallback', () => {
    // _applyStyles should be called via _update, not attributeChangedCallback
    const own = Object.getOwnPropertyNames(mod.UIButtonGroup.prototype);
    assert.ok(!own.includes('attributeChangedCallback'),
      'Should not override attributeChangedCallback directly');
  });

  it('render() returns slot-only markup', () => {
    const instance = Object.create(mod.UIButtonGroup.prototype);
    const html = instance.render();
    assert.ok(html.includes('<slot></slot>'), 'Should render default slot');
  });
});
