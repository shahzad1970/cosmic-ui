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

const mod = await import('../../src/components/table/table.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UITable module', () => {
  it('exports the UITable class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UITable, 'function');
  });

  it('declares expected static properties', () => {
    const props = mod.UITable.properties;
    for (const key of ['striped', 'bordered', 'hoverable', 'compact',
                        'selectable', 'sortable', 'size', 'background',
                        'stickyHeader']) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
  });

  it('has correct default values', () => {
    const p = mod.UITable.properties;
    assert.equal(p.striped.default, false);
    assert.equal(p.bordered.default, false);
    assert.equal(p.hoverable.default, false);
    assert.equal(p.compact.default, false);
    assert.equal(p.selectable.default, false);
    assert.equal(p.sortable.default, false);
    assert.equal(p.size.default, '');
    assert.equal(p.background.default, '');
    assert.equal(p.stickyHeader.default, false);
  });

  it('properties have correct types', () => {
    const p = mod.UITable.properties;
    assert.equal(p.striped.type, Boolean);
    assert.equal(p.bordered.type, Boolean);
    assert.equal(p.hoverable.type, Boolean);
    assert.equal(p.compact.type, Boolean);
    assert.equal(p.selectable.type, Boolean);
    assert.equal(p.sortable.type, Boolean);
    assert.equal(p.size.type, String);
    assert.equal(p.background.type, String);
    assert.equal(p.stickyHeader.type, Boolean);
  });

  it('sticky-header uses kebab-case attribute', () => {
    assert.equal(mod.UITable.properties.stickyHeader.attribute, 'sticky-header');
  });

  it('all properties reflect', () => {
    const p = mod.UITable.properties;
    for (const key of Object.keys(p)) {
      assert.notEqual(p[key].reflect, false, `${key} should reflect`);
    }
  });

  it('has static styles()', () => {
    const css = mod.UITable.styles();
    assert.ok(css.includes(':host'), 'Should include :host');
    assert.ok(css.includes('table'), 'Should include table styles');
    assert.ok(css.includes('th'), 'Should style headers');
    assert.ok(css.includes('td'), 'Should style cells');
  });

  it('styles handle striped rows', () => {
    const css = mod.UITable.styles();
    assert.ok(css.includes('striped'), 'Should handle striped variant');
  });

  it('styles handle bordered variant', () => {
    const css = mod.UITable.styles();
    assert.ok(css.includes('bordered'), 'Should handle bordered variant');
  });

  it('styles handle hoverable variant', () => {
    const css = mod.UITable.styles();
    assert.ok(css.includes('hoverable'), 'Should handle hoverable variant');
  });

  it('styles handle compact variant', () => {
    const css = mod.UITable.styles();
    assert.ok(css.includes('compact'), 'Should handle compact variant');
  });

  it('styles handle sticky header', () => {
    const css = mod.UITable.styles();
    assert.ok(css.includes('sticky'), 'Should handle sticky header');
  });

  it('render() includes slot fallback', () => {
    const instance = Object.create(mod.UITable.prototype);
    instance._columns = [];
    instance._data = [];
    instance._selected = new Set();
    instance._sortCol = '';
    instance._sortDir = 'asc';
    const html = instance.render();
    assert.ok(html.includes('<slot'), 'Should have slot fallback');
    assert.ok(html.includes('slot-host'), 'Should wrap slot in hidden host');
    assert.ok(html.includes('wrapper'), 'Should have wrapper for adopted table');
  });

  it('has columns setter', () => {
    const desc = Object.getOwnPropertyDescriptor(mod.UITable.prototype, 'columns');
    assert.ok(desc && desc.set, 'columns should have a setter');
  });

  it('has data setter', () => {
    const desc = Object.getOwnPropertyDescriptor(mod.UITable.prototype, 'data');
    assert.ok(desc && desc.set, 'data should have a setter');
  });

  it('has selectedRows getter', () => {
    const desc = Object.getOwnPropertyDescriptor(mod.UITable.prototype, 'selectedRows');
    assert.ok(desc && desc.get, 'selectedRows should have a getter');
  });

  it('has _renderTable method', () => {
    assert.equal(typeof mod.UITable.prototype._renderTable, 'function');
  });

  it('has _getSortedData method', () => {
    assert.equal(typeof mod.UITable.prototype._getSortedData, 'function');
  });

  it('_getSortedData sorts data ascending', () => {
    const instance = Object.create(mod.UITable.prototype);
    instance._data = [
      { name: 'Charlie' },
      { name: 'Alice' },
      { name: 'Bob' },
    ];
    instance._sortCol = 'name';
    instance._sortDir = 'asc';
    const sorted = instance._getSortedData();
    assert.equal(sorted[0].name, 'Alice');
    assert.equal(sorted[1].name, 'Bob');
    assert.equal(sorted[2].name, 'Charlie');
  });

  it('_getSortedData sorts data descending', () => {
    const instance = Object.create(mod.UITable.prototype);
    instance._data = [
      { name: 'Alice' },
      { name: 'Charlie' },
      { name: 'Bob' },
    ];
    instance._sortCol = 'name';
    instance._sortDir = 'desc';
    const sorted = instance._getSortedData();
    assert.equal(sorted[0].name, 'Charlie');
    assert.equal(sorted[1].name, 'Bob');
    assert.equal(sorted[2].name, 'Alice');
  });

  it('is registered as ui-table custom element', () => {
    assert.equal(globalThis.customElements.get('ui-table'), mod.UITable);
  });
});
