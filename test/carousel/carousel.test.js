import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

/*
 * Smoke-test for UICarousel.
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

const mod = await import('../../src/components/carousel/carousel.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UICarousel module', () => {
  it('exports the UICarousel class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UICarousel, 'function');
  });

  it('is registered as ui-carousel', () => {
    const ctor = globalThis.customElements.get('ui-carousel');
    assert.ok(ctor, 'ui-carousel should be registered');
    assert.equal(ctor, mod.UICarousel);
  });

  it('declares expected static properties', () => {
    const props = mod.UICarousel.properties;
    for (const key of ['background', 'color', 'size', 'elevation', 'autoplay', 'loop', 'navigation', 'indicators']) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
  });

  it('has correct default values', () => {
    const p = mod.UICarousel.properties;
    assert.equal(p.background.default, '');
    assert.equal(p.color.default, '');
    assert.equal(p.size.default, '');
    assert.equal(p.elevation.default, '');
    assert.equal(p.autoplay.default, 0);
    assert.equal(p.loop.default, false);
    assert.equal(p.navigation.default, true);
    assert.equal(p.indicators.default, true);
  });

  it('elevation is String type', () => {
    assert.equal(mod.UICarousel.properties.elevation.type, String);
  });

  it('autoplay is Number type', () => {
    assert.equal(mod.UICarousel.properties.autoplay.type, Number);
  });

  it('loop, navigation, indicators are Boolean type', () => {
    const p = mod.UICarousel.properties;
    assert.equal(p.loop.type, Boolean);
    assert.equal(p.navigation.type, Boolean);
    assert.equal(p.indicators.type, Boolean);
  });

  it('static styles() returns non-empty CSS', () => {
    const css = mod.UICarousel.styles();
    assert.ok(css.length > 0);
    assert.ok(css.includes(':host'));
  });

  it('styles include track, arrows, and dots', () => {
    const css = mod.UICarousel.styles();
    assert.ok(css.includes('.track'));
    assert.ok(css.includes('.arrow'));
    assert.ok(css.includes('.dots'));
  });

  it('styles include transition on track', () => {
    const css = mod.UICarousel.styles();
    assert.ok(css.includes('transition: transform'));
  });

  it('has public next, prev, goTo methods', () => {
    assert.equal(typeof mod.UICarousel.prototype.next, 'function');
    assert.equal(typeof mod.UICarousel.prototype.prev, 'function');
    assert.equal(typeof mod.UICarousel.prototype.goTo, 'function');
  });

  it('render includes arrow buttons and slot', () => {
    const inst = Object.create(mod.UICarousel.prototype);
    const html = mod.UICarousel.prototype.render.call(inst);
    assert.ok(html.includes('arrow--prev'));
    assert.ok(html.includes('arrow--next'));
    assert.ok(html.includes('<slot>'));
  });
});
