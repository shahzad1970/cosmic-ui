import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

/*
 * Smoke-test for UIList and UIListItem.
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

const mod = await import('../../src/components/list/list.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UIList module', () => {
  it('exports the UIList class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UIList, 'function');
  });

  it('is registered as ui-list', () => {
    const ctor = globalThis.customElements.get('ui-list');
    assert.ok(ctor, 'ui-list should be registered');
    assert.equal(ctor, mod.UIList);
  });

  it('declares expected static properties', () => {
    const props = mod.UIList.properties;
    for (const key of ['size', 'dividers', 'hoverable', 'striped', 'background', 'color', 'bordered']) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
  });

  it('has correct default values', () => {
    const p = mod.UIList.properties;
    assert.equal(p.size.default, '');
    assert.equal(p.dividers.default, false);
    assert.equal(p.hoverable.default, false);
    assert.equal(p.striped.default, false);
    assert.equal(p.background.default, '');
    assert.equal(p.color.default, '');
    assert.equal(p.bordered.default, false);
  });

  it('has correct property types', () => {
    const p = mod.UIList.properties;
    assert.equal(p.size.type, String);
    assert.equal(p.dividers.type, Boolean);
    assert.equal(p.hoverable.type, Boolean);
    assert.equal(p.striped.type, Boolean);
    assert.equal(p.background.type, String);
    assert.equal(p.color.type, String);
    assert.equal(p.bordered.type, Boolean);
  });

  it('all properties reflect', () => {
    const p = mod.UIList.properties;
    for (const [key, meta] of Object.entries(p)) {
      assert.equal(meta.reflect, true, `${key} should reflect`);
    }
  });

  it('static styles() returns non-empty CSS', () => {
    const css = mod.UIList.styles();
    assert.ok(css.length > 0);
    assert.ok(css.includes(':host'));
  });

  it('styles include dividers, hoverable, and bordered rules', () => {
    const css = mod.UIList.styles();
    assert.ok(css.includes('[dividers]'));
    assert.ok(css.includes('[hoverable]'));
    assert.ok(css.includes('[bordered]'));
  });

  it('render includes slot and role="list"', () => {
    const inst = Object.create(mod.UIList.prototype);
    const html = mod.UIList.prototype.render.call(inst);
    assert.ok(html.includes('<slot>'));
    assert.ok(html.includes('role="list"'));
  });
});

describe('UIListItem module', () => {
  it('exports the UIListItem class', () => {
    assert.equal(typeof mod.UIListItem, 'function');
  });

  it('is registered as ui-list-item', () => {
    const ctor = globalThis.customElements.get('ui-list-item');
    assert.ok(ctor, 'ui-list-item should be registered');
    assert.equal(ctor, mod.UIListItem);
  });

  it('declares expected static properties', () => {
    const props = mod.UIListItem.properties;
    for (const key of ['value', 'description', 'disabled', 'href', 'target']) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
  });

  it('has correct default values', () => {
    const p = mod.UIListItem.properties;
    assert.equal(p.value.default, '');
    assert.equal(p.description.default, '');
    assert.equal(p.disabled.default, false);
    assert.equal(p.href.default, '');
    assert.equal(p.target.default, '');
  });

  it('has correct property types', () => {
    const p = mod.UIListItem.properties;
    assert.equal(p.value.type, String);
    assert.equal(p.description.type, String);
    assert.equal(p.disabled.type, Boolean);
    assert.equal(p.href.type, String);
    assert.equal(p.target.type, String);
  });

  it('all properties reflect', () => {
    const p = mod.UIListItem.properties;
    for (const [key, meta] of Object.entries(p)) {
      assert.equal(meta.reflect, true, `${key} should reflect`);
    }
  });

  it('static styles() returns non-empty CSS', () => {
    const css = mod.UIListItem.styles();
    assert.ok(css.length > 0);
    assert.ok(css.includes(':host'));
  });

  it('styles include disabled, leading, trailing, desc selectors', () => {
    const css = mod.UIListItem.styles();
    assert.ok(css.includes('[disabled]'));
    assert.ok(css.includes('.leading'));
    assert.ok(css.includes('.trailing'));
    assert.ok(css.includes('.desc'));
  });

  it('render includes named slots for leading and trailing', () => {
    const inst = Object.create(mod.UIListItem.prototype);
    inst._description = '';
    inst._href = '';
    inst._target = '';
    const html = mod.UIListItem.prototype.render.call(inst);
    assert.ok(html.includes('slot="leading"') || html.includes('name="leading"'));
    assert.ok(html.includes('slot="trailing"') || html.includes('name="trailing"'));
  });

  it('render uses <a> tag when href is set', () => {
    const inst = Object.create(mod.UIListItem.prototype);
    inst._description = '';
    inst._href = 'https://example.com';
    inst._target = '_blank';
    const html = mod.UIListItem.prototype.render.call(inst);
    assert.ok(html.includes('<a'));
    assert.ok(html.includes('href="https://example.com"'));
    assert.ok(html.includes('target="_blank"'));
  });

  it('render uses <div> tag when no href', () => {
    const inst = Object.create(mod.UIListItem.prototype);
    inst._description = '';
    inst._href = '';
    inst._target = '';
    const html = mod.UIListItem.prototype.render.call(inst);
    assert.ok(html.includes('<div'));
    assert.ok(!html.includes('href='));
  });

  it('render includes description when set', () => {
    const inst = Object.create(mod.UIListItem.prototype);
    inst._description = 'Some description';
    inst._href = '';
    inst._target = '';
    const html = mod.UIListItem.prototype.render.call(inst);
    assert.ok(html.includes('Some description'));
    assert.ok(html.includes('desc'));
  });
});
