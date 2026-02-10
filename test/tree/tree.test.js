import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

/*
 * Tests for UITree.
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

// Load item first (dependency)
await import('../../src/components/tree/item.js').catch(() => {});

const mod = await import('../../src/components/tree/tree.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UITree module', () => {
  it('exports the UITree class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UITree, 'function');
  });

  it('is registered as ui-tree custom element', () => {
    const ctor = globalThis.customElements.get('ui-tree');
    assert.ok(ctor, 'Should be registered');
    assert.equal(ctor, mod.UITree);
  });

  it('declares all 4 static properties', () => {
    const props = mod.UITree.properties;
    for (const key of ['size', 'color', 'background', 'multiselect']) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
    assert.equal(Object.keys(props).length, 4, 'Should have exactly 4 properties');
  });

  it('has correct default values', () => {
    const p = mod.UITree.properties;
    assert.equal(p.size.default, '');
    assert.equal(p.color.default, '');
    assert.equal(p.background.default, '');
    assert.equal(p.multiselect.default, false);
  });

  it('properties have correct types', () => {
    const p = mod.UITree.properties;
    assert.equal(p.size.type, String);
    assert.equal(p.color.type, String);
    assert.equal(p.background.type, String);
    assert.equal(p.multiselect.type, Boolean);
  });

  it('all properties reflect', () => {
    const p = mod.UITree.properties;
    for (const key of Object.keys(p)) {
      assert.equal(p[key].reflect, true, `${key} should reflect`);
    }
  });

  it('does not override attributeChangedCallback', () => {
    const own = Object.getOwnPropertyDescriptor(mod.UITree.prototype, 'attributeChangedCallback');
    assert.equal(own, undefined, 'Should not have own attributeChangedCallback');
  });

  it('has merged _applyStyles (not separate _applySize/_applySelectionColors)', () => {
    assert.equal(typeof mod.UITree.prototype._applyStyles, 'function');
    assert.equal(mod.UITree.prototype._applySize, undefined, 'Should not have _applySize');
    assert.equal(mod.UITree.prototype._applySelectionColors, undefined, 'Should not have _applySelectionColors');
  });

  it('has _update override', () => {
    assert.equal(typeof mod.UITree.prototype._update, 'function');
  });

  it('has static styles()', () => {
    const css = mod.UITree.styles();
    assert.ok(css.includes(':host'), 'Should include :host styles');
    assert.ok(css.includes('display: block'), 'Should be block display');
  });

  it('render() returns a default slot', () => {
    const instance = Object.create(mod.UITree.prototype);
    const html = instance.render();
    assert.ok(html.includes('<slot></slot>'), 'Should have default slot');
  });

  it('has expandAll method', () => {
    assert.equal(typeof mod.UITree.prototype.expandAll, 'function');
  });

  it('has collapseAll method', () => {
    assert.equal(typeof mod.UITree.prototype.collapseAll, 'function');
  });

  it('has deselectAll method', () => {
    assert.equal(typeof mod.UITree.prototype.deselectAll, 'function');
  });

  it('has selectedItems getter', () => {
    const desc = Object.getOwnPropertyDescriptor(mod.UITree.prototype, 'selectedItems');
    assert.ok(desc && typeof desc.get === 'function', 'Should have selectedItems getter');
  });

  it('has selectedValues getter', () => {
    const desc = Object.getOwnPropertyDescriptor(mod.UITree.prototype, 'selectedValues');
    assert.ok(desc && typeof desc.get === 'function', 'Should have selectedValues getter');
  });

  it('has _ensureTabIndex method', () => {
    assert.equal(typeof mod.UITree.prototype._ensureTabIndex, 'function');
  });

  it('has _onItemSelect handler', () => {
    assert.equal(typeof mod.UITree.prototype._onItemSelect, 'function');
  });
});
