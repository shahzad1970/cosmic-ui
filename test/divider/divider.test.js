import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

/*
 * Smoke-test for UIDivider.
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

const mod = await import('../../src/components/divider/divider.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UIDivider module', () => {
  it('exports the UIDivider class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UIDivider, 'function');
  });

  it('is registered as ui-divider', () => {
    const ctor = globalThis.customElements.get('ui-divider');
    assert.ok(ctor, 'ui-divider should be registered');
    assert.equal(ctor, mod.UIDivider);
  });

  it('declares expected static properties', () => {
    const props = mod.UIDivider.properties;
    for (const key of ['label', 'vertical', 'color', 'thickness', 'spacing', 'size', 'variant']) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
  });

  it('has correct default values', () => {
    const p = mod.UIDivider.properties;
    assert.equal(p.label.default, '');
    assert.equal(p.vertical.default, false);
    assert.equal(p.color.default, '');
    assert.equal(p.thickness.default, '');
    assert.equal(p.spacing.default, '');
    assert.equal(p.size.default, '');
    assert.equal(p.variant.default, 'solid');
  });

  it('vertical is Boolean type', () => {
    assert.equal(mod.UIDivider.properties.vertical.type, Boolean);
  });

  it('label, color, thickness, spacing, size, variant are String type', () => {
    const p = mod.UIDivider.properties;
    for (const key of ['label', 'color', 'thickness', 'spacing', 'size', 'variant']) {
      assert.equal(p[key].type, String, `${key} should be String`);
    }
  });

  it('static styles() returns non-empty CSS', () => {
    const css = mod.UIDivider.styles();
    assert.ok(css.length > 0);
    assert.ok(css.includes(':host'));
  });

  it('styles include horizontal and vertical rules', () => {
    const css = mod.UIDivider.styles();
    assert.ok(css.includes(':host(:not([vertical]))'));
    assert.ok(css.includes(':host([vertical])'));
  });

  it('styles include label class', () => {
    const css = mod.UIDivider.styles();
    assert.ok(css.includes('.label'));
  });

  it('styles include line pseudo-elements', () => {
    const css = mod.UIDivider.styles();
    assert.ok(css.includes('::before'));
    assert.ok(css.includes('::after'));
  });

  it('render returns a line div without label by default', () => {
    const inst = Object.create(mod.UIDivider.prototype);
    inst.label = '';
    const html = mod.UIDivider.prototype.render.call(inst);
    assert.ok(html.includes('<div class="line">'));
    assert.ok(!html.includes('class="label"'));
  });

  it('render includes label span when label is set', () => {
    const inst = Object.create(mod.UIDivider.prototype);
    inst.label = 'OR';
    const html = mod.UIDivider.prototype.render.call(inst);
    assert.ok(html.includes('<span class="label">OR</span>'));
  });

  it('render escapes label text', () => {
    const inst = Object.create(mod.UIDivider.prototype);
    inst.label = '<script>';
    const html = mod.UIDivider.prototype.render.call(inst);
    assert.ok(html.includes('&lt;script&gt;'));
    assert.ok(!html.includes('<script>'));
  });

  it('all properties have reflect: true', () => {
    const p = mod.UIDivider.properties;
    for (const key of Object.keys(p)) {
      assert.equal(p[key].reflect, true, `${key} should have reflect: true`);
    }
  });
});
