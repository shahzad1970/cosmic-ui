import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

/*
 * Tests for UIBreadcrumbItem.
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

const mod = await import('../../src/components/breadcrumb/item.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UIBreadcrumbItem module', () => {
  it('exports the UIBreadcrumbItem class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UIBreadcrumbItem, 'function');
  });

  it('is registered as ui-breadcrumb-item', () => {
    const ctor = globalThis.customElements.get('ui-breadcrumb-item');
    assert.ok(ctor, 'ui-breadcrumb-item should be registered');
    assert.equal(ctor, mod.UIBreadcrumbItem);
  });

  it('declares all 3 static properties', () => {
    const props = mod.UIBreadcrumbItem.properties;
    for (const key of ['href', 'target', 'active']) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
    assert.equal(Object.keys(props).length, 3, 'Should have exactly 3 properties');
  });

  it('has correct default values', () => {
    const p = mod.UIBreadcrumbItem.properties;
    assert.equal(p.href.default, '');
    assert.equal(p.target.default, '');
    assert.equal(p.active.default, false);
  });

  it('active is Boolean type, href and target are String', () => {
    const p = mod.UIBreadcrumbItem.properties;
    assert.equal(p.active.type, Boolean);
    assert.equal(p.href.type, String);
    assert.equal(p.target.type, String);
  });

  it('all properties reflect', () => {
    const p = mod.UIBreadcrumbItem.properties;
    for (const key of Object.keys(p)) {
      assert.equal(p[key].reflect, true, `${key} should reflect`);
    }
  });

  it('does not override attributeChangedCallback', () => {
    const own = Object.getOwnPropertyDescriptor(mod.UIBreadcrumbItem.prototype, 'attributeChangedCallback');
    assert.equal(own, undefined, 'Should not have own attributeChangedCallback');
  });

  it('has _update override', () => {
    assert.equal(typeof mod.UIBreadcrumbItem.prototype._update, 'function');
  });

  it('has _updateSeparator method', () => {
    assert.equal(typeof mod.UIBreadcrumbItem.prototype._updateSeparator, 'function');
  });

  it('static styles() returns non-empty CSS', () => {
    const css = mod.UIBreadcrumbItem.styles();
    assert.ok(css.length > 0);
    assert.ok(css.includes(':host'));
  });

  it('styles include link hover underline', () => {
    const css = mod.UIBreadcrumbItem.styles();
    assert.ok(css.includes('a:hover'));
    assert.ok(css.includes('text-decoration: underline'));
  });

  it('styles include active font-weight', () => {
    const css = mod.UIBreadcrumbItem.styles();
    assert.ok(css.includes(':host([active])'));
    assert.ok(css.includes('font-weight: 600'));
  });

  it('styles include separator styling', () => {
    const css = mod.UIBreadcrumbItem.styles();
    assert.ok(css.includes('.sep'));
  });

  it('render includes default slot', () => {
    const inst = Object.create(mod.UIBreadcrumbItem.prototype);
    inst.href = '';
    inst.target = '';
    inst.active = false;
    const html = inst.render();
    assert.ok(html.includes('<slot>'));
  });

  it('render uses anchor when href set and not active', () => {
    const inst = Object.create(mod.UIBreadcrumbItem.prototype);
    inst.href = '/docs';
    inst.target = '_blank';
    inst.active = false;
    const html = inst.render();
    assert.ok(html.includes('<a'));
    assert.ok(html.includes('href="/docs"'));
    assert.ok(html.includes('target="_blank"'));
  });

  it('render uses span label when active', () => {
    const inst = Object.create(mod.UIBreadcrumbItem.prototype);
    inst.href = '/docs';
    inst.target = '';
    inst.active = true;
    const html = inst.render();
    assert.ok(html.includes('class="label"'));
  });

  it('render uses span label when no href', () => {
    const inst = Object.create(mod.UIBreadcrumbItem.prototype);
    inst.href = '';
    inst.target = '';
    inst.active = false;
    const html = inst.render();
    assert.ok(html.includes('class="label"'));
  });
});
