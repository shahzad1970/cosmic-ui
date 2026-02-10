import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

/*
 * Tests for UIDropdownItem.
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

const mod = await import('../../src/components/dropdown/item.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UIDropdownItem module', () => {
  it('exports the UIDropdownItem class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UIDropdownItem, 'function');
  });

  it('is registered as ui-dropdown-item custom element', () => {
    const ctor = globalThis.customElements.get('ui-dropdown-item');
    assert.ok(ctor, 'Should be registered');
    assert.equal(ctor, mod.UIDropdownItem);
  });

  it('declares all 4 static properties', () => {
    const props = mod.UIDropdownItem.properties;
    for (const key of ['value', 'disabled', 'href', 'target']) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
    assert.equal(Object.keys(props).length, 4, 'Should have exactly 4 properties');
  });

  it('has correct default values', () => {
    const p = mod.UIDropdownItem.properties;
    assert.equal(p.value.default, '');
    assert.equal(p.disabled.default, false);
    assert.equal(p.href.default, '');
    assert.equal(p.target.default, '');
  });

  it('all properties reflect', () => {
    const p = mod.UIDropdownItem.properties;
    for (const key of Object.keys(p)) {
      assert.equal(p[key].reflect, true, `${key} should reflect`);
    }
  });

  it('has static styles() with expected CSS', () => {
    const css = mod.UIDropdownItem.styles();
    assert.ok(css.includes('.item'), 'Should include .item styles');
    assert.ok(css.includes(':host([disabled])'), 'Should include disabled styles');
    assert.ok(css.includes('.submenu'), 'Should include submenu styles');
    assert.ok(css.includes('.caret'), 'Should include caret styles');
    assert.ok(css.includes('data-has-submenu'), 'Caret visibility driven by data-has-submenu');
    assert.ok(css.includes('data-submenu-open'), 'Submenu visibility driven by data-submenu-open');
  });

  /* ── Render ── */

  it('render() returns a div-based item by default', () => {
    const instance = Object.create(mod.UIDropdownItem.prototype);
    instance.href = '';
    instance.target = '';
    instance.disabled = false;

    const html = instance.render();
    assert.ok(html.includes('<div'), 'Should render a <div>');
    assert.ok(html.includes('class="item"'), 'Should have .item class');
    assert.ok(html.includes('<slot></slot>'), 'Should include default slot');
  });

  it('render() returns anchor when href is set', () => {
    const instance = Object.create(mod.UIDropdownItem.prototype);
    instance.href = '/settings';
    instance.target = '_blank';
    instance.disabled = false;

    const html = instance.render();
    assert.ok(html.includes('<a'), 'Should render an <a>');
    assert.ok(html.includes('href="/settings"'), 'Should include href');
    assert.ok(html.includes('target="_blank"'), 'Should include target');
  });

  it('render() always includes caret and submenu panel', () => {
    const instance = Object.create(mod.UIDropdownItem.prototype);
    instance.href = '';
    instance.target = '';
    instance.disabled = false;

    const html = instance.render();
    assert.ok(html.includes('class="caret"'), 'Caret always in DOM');
    assert.ok(html.includes('class="submenu"'), 'Submenu panel always in DOM');
    assert.ok(html.includes('role="menu"'), 'Submenu has role=menu');
    assert.ok(html.includes('<slot name="submenu">'), 'Named submenu slot present');
  });

  it('render() is static -- no dependency on child state', () => {
    const a = Object.create(mod.UIDropdownItem.prototype);
    a.href = ''; a.target = ''; a.disabled = false;

    const b = Object.create(mod.UIDropdownItem.prototype);
    b.href = ''; b.target = ''; b.disabled = false;

    assert.equal(a.render(), b.render());
  });

  /* ── Methods ── */

  it('has openSubmenu, closeSubmenu, toggleSubmenu methods', () => {
    assert.equal(typeof mod.UIDropdownItem.prototype.openSubmenu, 'function');
    assert.equal(typeof mod.UIDropdownItem.prototype.closeSubmenu, 'function');
    assert.equal(typeof mod.UIDropdownItem.prototype.toggleSubmenu, 'function');
  });

  it('has _hasSubmenu getter', () => {
    const desc = Object.getOwnPropertyDescriptor(mod.UIDropdownItem.prototype, '_hasSubmenu');
    assert.ok(desc && typeof desc.get === 'function', 'Should have _hasSubmenu getter');
  });

  it('has _assignSlots method', () => {
    assert.equal(typeof mod.UIDropdownItem.prototype._assignSlots, 'function');
  });
});
