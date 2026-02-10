import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

/*
 * Tests for UIBreadcrumb.
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

const mod = await import('../../src/components/breadcrumb/breadcrumb.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UIBreadcrumb module', () => {
  it('exports the UIBreadcrumb class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UIBreadcrumb, 'function');
  });

  it('is registered as ui-breadcrumb', () => {
    const ctor = globalThis.customElements.get('ui-breadcrumb');
    assert.ok(ctor, 'ui-breadcrumb should be registered');
    assert.equal(ctor, mod.UIBreadcrumb);
  });

  it('declares all 4 static properties', () => {
    const props = mod.UIBreadcrumb.properties;
    for (const key of ['separator', 'background', 'color', 'size']) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
    assert.equal(Object.keys(props).length, 4, 'Should have exactly 4 properties');
  });

  it('has correct default values', () => {
    const p = mod.UIBreadcrumb.properties;
    assert.equal(p.separator.default, '/');
    assert.equal(p.background.default, '');
    assert.equal(p.color.default, '');
    assert.equal(p.size.default, '');
  });

  it('all properties are String type and reflect', () => {
    const p = mod.UIBreadcrumb.properties;
    for (const key of Object.keys(p)) {
      assert.equal(p[key].type, String, `${key} should be String type`);
      assert.equal(p[key].reflect, true, `${key} should reflect`);
    }
  });

  it('does not override attributeChangedCallback', () => {
    const own = Object.getOwnPropertyDescriptor(mod.UIBreadcrumb.prototype, 'attributeChangedCallback');
    assert.equal(own, undefined, 'Should not have own attributeChangedCallback');
  });

  it('has _update that calls _applyStyles', () => {
    assert.equal(typeof mod.UIBreadcrumb.prototype._update, 'function');
    assert.equal(typeof mod.UIBreadcrumb.prototype._applyStyles, 'function');
  });

  it('has _applySeparator method', () => {
    assert.equal(typeof mod.UIBreadcrumb.prototype._applySeparator, 'function');
  });

  it('static styles() returns non-empty CSS with flex layout', () => {
    const css = mod.UIBreadcrumb.styles();
    assert.ok(css.length > 0);
    assert.ok(css.includes(':host'));
    assert.ok(css.includes('display: flex'));
  });

  it('styles include align-items for vertical centering', () => {
    const css = mod.UIBreadcrumb.styles();
    assert.ok(css.includes('align-items'));
  });

  it('render includes nav with aria attributes and slot', () => {
    const inst = Object.create(mod.UIBreadcrumb.prototype);
    const html = mod.UIBreadcrumb.prototype.render.call(inst);
    assert.ok(html.includes('<slot>'));
  });

  it('has connectedCallback that sets up observer', () => {
    assert.equal(typeof mod.UIBreadcrumb.prototype.connectedCallback, 'function');
  });

  it('has disconnectedCallback for cleanup', () => {
    assert.equal(typeof mod.UIBreadcrumb.prototype.disconnectedCallback, 'function');
  });
});
