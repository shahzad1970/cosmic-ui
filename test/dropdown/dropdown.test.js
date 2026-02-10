import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

/*
 * Tests for UIDropdown.
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

const mod = await import('../../src/components/dropdown/dropdown.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UIDropdown module', () => {
  it('exports the UIDropdown class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UIDropdown, 'function');
  });

  it('is registered as ui-dropdown custom element', () => {
    const ctor = globalThis.customElements.get('ui-dropdown');
    assert.ok(ctor, 'Should be registered');
    assert.equal(ctor, mod.UIDropdown);
  });

  it('declares all 9 static properties', () => {
    const props = mod.UIDropdown.properties;
    for (const key of ['background', 'color', 'size', 'disabled',
                        'pill', 'outline', 'flat', 'elevation', 'placement']) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
    assert.equal(Object.keys(props).length, 9, 'Should have exactly 9 properties');
  });

  it('has correct default values', () => {
    const p = mod.UIDropdown.properties;
    assert.equal(p.background.default, 'gray-200');
    assert.equal(p.color.default, '');
    assert.equal(p.size.default, 'medium');
    assert.equal(p.disabled.default, false);
    assert.equal(p.pill.default, false);
    assert.equal(p.outline.default, false);
    assert.equal(p.flat.default, false);
    assert.equal(p.elevation.default, '');
    assert.equal(p.placement.default, 'bottom-start');
  });

  it('all properties reflect', () => {
    const p = mod.UIDropdown.properties;
    for (const key of Object.keys(p)) {
      assert.equal(p[key].reflect, true, `${key} should reflect`);
    }
  });

  it('does not override attributeChangedCallback', () => {
    const own = Object.getOwnPropertyDescriptor(mod.UIDropdown.prototype, 'attributeChangedCallback');
    assert.equal(own, undefined, 'Should not have own attributeChangedCallback');
  });

  it('has merged _applyStyles (not separate _applySize/_applyColors)', () => {
    assert.equal(typeof mod.UIDropdown.prototype._applyStyles, 'function');
    assert.equal(mod.UIDropdown.prototype._applySize, undefined, 'Should not have _applySize');
    assert.equal(mod.UIDropdown.prototype._applyColors, undefined, 'Should not have _applyColors');
  });

  it('has _update override', () => {
    assert.equal(typeof mod.UIDropdown.prototype._update, 'function');
  });

  it('placement property has correct type and reflects', () => {
    const p = mod.UIDropdown.properties.placement;
    assert.equal(p.type, String);
    assert.equal(p.default, 'bottom-start');
    assert.equal(p.reflect, true);
  });

  it('has open, close, and toggle methods', () => {
    assert.equal(typeof mod.UIDropdown.prototype.open, 'function');
    assert.equal(typeof mod.UIDropdown.prototype.close, 'function');
    assert.equal(typeof mod.UIDropdown.prototype.toggle, 'function');
  });

  it('has _assignSlots method', () => {
    assert.equal(typeof mod.UIDropdown.prototype._assignSlots, 'function');
  });

  it('has _styleMenuItems method', () => {
    assert.equal(typeof mod.UIDropdown.prototype._styleMenuItems, 'function');
  });

  it('has keyboard handler _onKeyDown', () => {
    assert.equal(typeof mod.UIDropdown.prototype._onKeyDown, 'function');
  });

  it('listens for ui-click via _onItemSelect', () => {
    assert.equal(typeof mod.UIDropdown.prototype._onItemSelect, 'function');
  });

  /* ── Styles ── */

  it('static styles() includes expected CSS', () => {
    const css = mod.UIDropdown.styles();
    assert.ok(css.includes('.trigger'), 'Should include .trigger styles');
    assert.ok(css.includes('.menu'), 'Should include .menu styles');
    assert.ok(css.includes('.caret'), 'Should include .caret styles');
    assert.ok(css.includes('bottom-start'), 'Should include bottom-start placement');
    assert.ok(css.includes('bottom-end'), 'Should include bottom-end placement');
    assert.ok(css.includes('top-start'), 'Should include top-start placement');
    assert.ok(css.includes('top-end'), 'Should include top-end placement');
    assert.ok(css.includes(':host([outline])'), 'Should include outline styles');
    assert.ok(css.includes(':host([flat])'), 'Should include flat styles');
    assert.ok(css.includes(':host([pill])'), 'Should include pill styles');
    assert.ok(css.includes('::slotted(ui-dropdown-item)'), 'Should style slotted items');
  });

  /* ── Render ── */

  it('render() returns trigger + menu markup', () => {
    const instance = Object.create(mod.UIDropdown.prototype);
    instance.disabled = false;
    instance.placement = 'bottom-start';

    const html = instance.render();
    assert.ok(html.includes('<button'), 'Should render a <button> trigger');
    assert.ok(html.includes('class="trigger"'), 'Should have .trigger class');
    assert.ok(html.includes('class="caret"'), 'Should include caret');
    assert.ok(html.includes('slot name="trigger"'), 'Should have trigger slot');
    assert.ok(html.includes('role="menu"'), 'Should have role=menu on the panel');
    assert.ok(html.includes('class="menu bottom-start"'), 'Should include placement class');
  });

  it('placement is reflected in render output', () => {
    const instance = Object.create(mod.UIDropdown.prototype);
    instance.disabled = false;

    for (const p of ['bottom-start', 'bottom-end', 'top-start', 'top-end']) {
      instance.placement = p;
      const html = instance.render();
      assert.ok(html.includes(`class="menu ${p}"`), `Should include placement class ${p}`);
    }
  });
});
