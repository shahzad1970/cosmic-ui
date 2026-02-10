import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

/*
 * Tests for UITreeItem.
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

const mod = await import('../../src/components/tree/item.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UITreeItem module', () => {
  it('exports the UITreeItem class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UITreeItem, 'function');
  });

  it('is registered as ui-tree-item custom element', () => {
    const ctor = globalThis.customElements.get('ui-tree-item');
    assert.ok(ctor, 'Should be registered');
    assert.equal(ctor, mod.UITreeItem);
  });

  it('declares expected static properties', () => {
    const props = mod.UITreeItem.properties;
    for (const key of ['value', 'disabled', 'expanded', 'selected', 'href', 'target', 'channel']) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
  });

  it('has correct default values', () => {
    const p = mod.UITreeItem.properties;
    assert.equal(p.value.default, '');
    assert.equal(p.disabled.default, false);
    assert.equal(p.expanded.default, false);
    assert.equal(p.selected.default, false);
    assert.equal(p.href.default, '');
    assert.equal(p.target.default, '');
    assert.equal(p.channel.default, '');
  });

  it('properties have correct types', () => {
    const p = mod.UITreeItem.properties;
    assert.equal(p.value.type, String);
    assert.equal(p.disabled.type, Boolean);
    assert.equal(p.expanded.type, Boolean);
    assert.equal(p.selected.type, Boolean);
    assert.equal(p.href.type, String);
    assert.equal(p.target.type, String);
    assert.equal(p.channel.type, String);
  });

  it('all properties reflect', () => {
    const p = mod.UITreeItem.properties;
    for (const key of Object.keys(p)) {
      assert.equal(p[key].reflect, true, `${key} should reflect`);
    }
  });

  it('does not override attributeChangedCallback', () => {
    const own = Object.getOwnPropertyDescriptor(mod.UITreeItem.prototype, 'attributeChangedCallback');
    assert.equal(own, undefined, 'Should not have own attributeChangedCallback');
  });

  it('does not have _onPropertyChanged (removed)', () => {
    assert.equal(mod.UITreeItem.prototype._onPropertyChanged, undefined, 'Should not have _onPropertyChanged');
  });

  it('has _update and _applyStyles', () => {
    assert.equal(typeof mod.UITreeItem.prototype._update, 'function');
    assert.equal(typeof mod.UITreeItem.prototype._applyStyles, 'function');
  });

  it('has static styles() with expected CSS', () => {
    const css = mod.UITreeItem.styles();
    assert.ok(css.includes('.row'), 'Should include .row styles');
    assert.ok(css.includes(':host([disabled])'), 'Should include disabled styles');
    assert.ok(css.includes('.children'), 'Should include children container styles');
    assert.ok(css.includes('.caret'), 'Should include caret styles');
    assert.ok(css.includes('data-has-children'), 'Caret visibility driven by data-has-children');
    assert.ok(css.includes(':host([expanded])'), 'Expansion controlled by expanded attribute');
    assert.ok(css.includes(':host([selected])'), 'Selection styles present');
  });

  it('render() always returns a div-based row', () => {
    const instance = Object.create(mod.UITreeItem.prototype);
    instance.href = '';
    instance.target = '';
    instance.disabled = false;

    const html = instance.render();
    assert.ok(html.includes('<div'), 'Should render a <div>');
    assert.ok(html.includes('class="row"'), 'Should have .row class');
    assert.ok(html.includes('<slot></slot>'), 'Should include default slot');
  });

  it('render() uses div even when href is set', () => {
    const instance = Object.create(mod.UITreeItem.prototype);
    instance.href = '/docs';
    instance.target = '_blank';
    instance.disabled = false;

    const html = instance.render();
    assert.ok(html.includes('<div'), 'Should render a <div>, not an <a>');
    assert.ok(!html.includes('<a'), 'Should not render an <a> tag');
  });

  it('render() always includes caret, spacer, and children panel', () => {
    const instance = Object.create(mod.UITreeItem.prototype);
    instance.href = '';
    instance.target = '';
    instance.disabled = false;

    const html = instance.render();
    assert.ok(html.includes('class="caret"'), 'Caret always in DOM');
    assert.ok(html.includes('class="spacer"'), 'Spacer always in DOM');
    assert.ok(html.includes('class="children"'), 'Children panel always in DOM');
    assert.ok(html.includes('role="group"'), 'Children has role=group');
    assert.ok(html.includes('<slot name="children">'), 'Named children slot present');
  });

  it('render() is static — no dependency on child state', () => {
    const a = Object.create(mod.UITreeItem.prototype);
    a.href = ''; a.target = ''; a.disabled = false;

    const b = Object.create(mod.UITreeItem.prototype);
    b.href = ''; b.target = ''; b.disabled = false;

    assert.equal(a.render(), b.render());
  });

  it('has expand, collapse, toggle methods', () => {
    assert.equal(typeof mod.UITreeItem.prototype.expand, 'function');
    assert.equal(typeof mod.UITreeItem.prototype.collapse, 'function');
    assert.equal(typeof mod.UITreeItem.prototype.toggle, 'function');
  });

  it('has select, deselect methods', () => {
    assert.equal(typeof mod.UITreeItem.prototype.select, 'function');
    assert.equal(typeof mod.UITreeItem.prototype.deselect, 'function');
  });

  it('has _hasChildren getter', () => {
    const desc = Object.getOwnPropertyDescriptor(mod.UITreeItem.prototype, '_hasChildren');
    assert.ok(desc && typeof desc.get === 'function', 'Should have _hasChildren getter');
  });

  it('has _assignSlots method', () => {
    assert.equal(typeof mod.UITreeItem.prototype._assignSlots, 'function');
  });

  it('has keyboard navigation helpers', () => {
    assert.equal(typeof mod.UITreeItem.prototype._focusNext, 'function');
    assert.equal(typeof mod.UITreeItem.prototype._focusPrev, 'function');
    assert.equal(typeof mod.UITreeItem.prototype._focusFirst, 'function');
    assert.equal(typeof mod.UITreeItem.prototype._focusLast, 'function');
    assert.equal(typeof mod.UITreeItem.prototype._getVisibleItems, 'function');
  });
});
