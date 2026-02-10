import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

// Minimal DOM shims for Node.
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

const mod = await import('../../src/components/layout/grid.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UILayoutGrid module', () => {
  it('exports the UILayoutGrid class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UILayoutGrid, 'function');
  });

  it('declares expected static properties', () => {
    const props = mod.UILayoutGrid.properties;
    for (const key of ['columns', 'rows', 'gap', 'columnGap', 'rowGap',
                        'align', 'justify', 'alignContent', 'justifyContent',
                        'flow', 'autoRows', 'autoCols', 'areas', 'inline',
                        'padding', 'width', 'height', 'full',
                        'minColWidth']) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
  });

  it('has correct default values', () => {
    const p = mod.UILayoutGrid.properties;
    assert.equal(p.columns.default, '');
    assert.equal(p.rows.default, '');
    assert.equal(p.gap.default, '');
    assert.equal(p.inline.default, false);
    assert.equal(p.full.default, false);
    assert.equal(p.areas.default, '');
    assert.equal(p.minColWidth.default, '');
  });

  it('properties have correct types', () => {
    const p = mod.UILayoutGrid.properties;
    assert.equal(p.columns.type, String);
    assert.equal(p.rows.type, String);
    assert.equal(p.gap.type, String);
    assert.equal(p.inline.type, Boolean);
    assert.equal(p.full.type, Boolean);
    assert.equal(p.flow.type, String);
  });

  it('all properties reflect', () => {
    const p = mod.UILayoutGrid.properties;
    for (const key of Object.keys(p)) {
      assert.notEqual(p[key].reflect, false, `${key} should reflect`);
    }
  });

  it('has kebab-case attribute mappings', () => {
    const p = mod.UILayoutGrid.properties;
    assert.equal(p.columnGap.attribute, 'column-gap');
    assert.equal(p.rowGap.attribute, 'row-gap');
    assert.equal(p.alignContent.attribute, 'align-content');
    assert.equal(p.justifyContent.attribute, 'justify-content');
    assert.equal(p.autoRows.attribute, 'auto-rows');
    assert.equal(p.autoCols.attribute, 'auto-cols');
    assert.equal(p.minColWidth.attribute, 'min-col-width');
  });

  it('has static styles()', () => {
    const css = mod.UILayoutGrid.styles();
    assert.ok(css.includes(':host'), 'Should include :host selector');
    assert.ok(css.includes('grid'), 'Should include grid display');
    assert.ok(css.includes(':host([inline])'), 'Should include inline styles');
    assert.ok(css.includes(':host([full])'), 'Should include full styles');
  });

  it('render() returns a default slot', () => {
    const instance = Object.create(mod.UILayoutGrid.prototype);
    const html = instance.render();
    assert.ok(html.includes('<slot></slot>'), 'Should render default slot');
  });

  it('_resolveTemplate handles integer columns', () => {
    const instance = Object.create(mod.UILayoutGrid.prototype);
    assert.equal(instance._resolveTemplate('3'), 'repeat(3, 1fr)');
    assert.equal(instance._resolveTemplate('1'), 'repeat(1, 1fr)');
    assert.equal(instance._resolveTemplate('12'), 'repeat(12, 1fr)');
  });

  it('_resolveTemplate passes through CSS values', () => {
    const instance = Object.create(mod.UILayoutGrid.prototype);
    assert.equal(instance._resolveTemplate('1fr 2fr 1fr'), '1fr 2fr 1fr');
    assert.equal(instance._resolveTemplate('200px 1fr'), '200px 1fr');
    assert.equal(instance._resolveTemplate('repeat(auto-fill, minmax(200px, 1fr))'),
      'repeat(auto-fill, minmax(200px, 1fr))');
  });

  it('_resolveTemplate returns undefined for empty', () => {
    const instance = Object.create(mod.UILayoutGrid.prototype);
    assert.equal(instance._resolveTemplate(''), undefined);
    assert.equal(instance._resolveTemplate(undefined), undefined);
  });

  it('has content distribution map', () => {
    const map = mod.UILayoutGrid._contentMap;
    assert.equal(map.between, 'space-between');
    assert.equal(map.around, 'space-around');
    assert.equal(map.evenly, 'space-evenly');
    assert.equal(map.stretch, 'stretch');
  });

  it('has _applyLayout method', () => {
    assert.equal(typeof mod.UILayoutGrid.prototype._applyLayout, 'function');
  });

  it('is registered as ui-layout-grid custom element', () => {
    assert.equal(globalThis.customElements.get('ui-layout-grid'), mod.UILayoutGrid);
  });
});
