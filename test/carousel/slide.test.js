import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

/*
 * Smoke-test for UICarouselSlide.
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

const mod = await import('../../src/components/carousel/slide.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UICarouselSlide module', () => {
  it('exports the UICarouselSlide class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UICarouselSlide, 'function');
  });

  it('is registered as ui-carousel-slide', () => {
    const ctor = globalThis.customElements.get('ui-carousel-slide');
    assert.ok(ctor, 'ui-carousel-slide should be registered');
    assert.equal(ctor, mod.UICarouselSlide);
  });

  it('declares expected static properties', () => {
    const props = mod.UICarouselSlide.properties;
    for (const key of ['background', 'color', 'image']) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
  });

  it('has correct default values', () => {
    const p = mod.UICarouselSlide.properties;
    assert.equal(p.background.default, '');
    assert.equal(p.color.default, '');
    assert.equal(p.image.default, '');
  });

  it('image is String type', () => {
    assert.equal(mod.UICarouselSlide.properties.image.type, String);
  });

  it('styles include background-image and background-size', () => {
    const css = mod.UICarouselSlide.styles();
    assert.ok(css.includes('background-image'));
    assert.ok(css.includes('background-size'));
  });

  it('static styles() returns non-empty CSS', () => {
    const css = mod.UICarouselSlide.styles();
    assert.ok(css.length > 0);
    assert.ok(css.includes(':host'));
    assert.ok(css.includes('display: flex'));
  });

  it('styles include min-height for visible area', () => {
    const css = mod.UICarouselSlide.styles();
    assert.ok(css.includes('min-height'));
  });
});
