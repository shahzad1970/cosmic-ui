import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

/*
 * Smoke-test for UIImage.
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

const mod = await import('../../src/components/image/image.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UIImage module', () => {
  it('exports the UIImage class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UIImage, 'function');
  });

  it('is registered as ui-image', () => {
    const ctor = globalThis.customElements.get('ui-image');
    assert.ok(ctor, 'ui-image should be registered');
    assert.equal(ctor, mod.UIImage);
  });

  it('declares expected static properties', () => {
    const props = mod.UIImage.properties;
    for (const key of ['src', 'alt', 'width', 'height', 'fit', 'radius', 'fallback', 'size', 'lazy', 'lightbox', 'caption']) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
  });

  it('has correct default values', () => {
    const p = mod.UIImage.properties;
    assert.equal(p.src.default, '');
    assert.equal(p.alt.default, '');
    assert.equal(p.width.default, '');
    assert.equal(p.height.default, '');
    assert.equal(p.fit.default, 'cover');
    assert.equal(p.radius.default, '');
    assert.equal(p.fallback.default, '');
    assert.equal(p.size.default, '');
    assert.equal(p.lazy.default, true);
    assert.equal(p.lightbox.default, false);
    assert.equal(p.caption.default, '');
  });

  it('has correct property types', () => {
    const p = mod.UIImage.properties;
    assert.equal(p.src.type, String);
    assert.equal(p.alt.type, String);
    assert.equal(p.width.type, String);
    assert.equal(p.height.type, String);
    assert.equal(p.fit.type, String);
    assert.equal(p.radius.type, String);
    assert.equal(p.fallback.type, String);
    assert.equal(p.size.type, String);
    assert.equal(p.lazy.type, Boolean);
    assert.equal(p.lightbox.type, Boolean);
    assert.equal(p.caption.type, String);
  });

  it('all properties reflect', () => {
    const p = mod.UIImage.properties;
    for (const [key, meta] of Object.entries(p)) {
      assert.equal(meta.reflect, true, `${key} should reflect`);
    }
  });

  it('static styles() returns non-empty CSS', () => {
    const css = mod.UIImage.styles();
    assert.ok(css.length > 0);
    assert.ok(css.includes(':host'));
  });

  it('styles include skeleton, lightbox, and error-state', () => {
    const css = mod.UIImage.styles();
    assert.ok(css.includes('.skeleton'));
    assert.ok(css.includes('.lightbox'));
    assert.ok(css.includes('.error-state'));
  });

  it('styles include object-fit variable', () => {
    const css = mod.UIImage.styles();
    assert.ok(css.includes('object-fit'));
  });

  it('render includes img tag and skeleton', () => {
    const inst = Object.create(mod.UIImage.prototype);
    inst._src = 'test.jpg';
    inst._alt = 'test';
    inst._lazy = true;
    inst._lightbox = false;
    inst._caption = '';
    const html = mod.UIImage.prototype.render.call(inst);
    assert.ok(html.includes('<img'));
    assert.ok(html.includes('skeleton'));
    assert.ok(html.includes('loading="lazy"'));
  });

  it('render includes caption when set', () => {
    const inst = Object.create(mod.UIImage.prototype);
    inst._src = 'test.jpg';
    inst._alt = 'test';
    inst._lazy = false;
    inst._lightbox = false;
    inst._caption = 'My caption';
    const html = mod.UIImage.prototype.render.call(inst);
    assert.ok(html.includes('My caption'));
    assert.ok(html.includes('caption'));
  });

  it('render includes lightbox when enabled', () => {
    const inst = Object.create(mod.UIImage.prototype);
    inst._src = 'test.jpg';
    inst._alt = 'test';
    inst._lazy = false;
    inst._lightbox = true;
    inst._caption = '';
    const html = mod.UIImage.prototype.render.call(inst);
    assert.ok(html.includes('lightbox'));
    assert.ok(html.includes('lightbox-close'));
  });

  it('has _openLightbox and _closeLightbox methods', () => {
    assert.equal(typeof mod.UIImage.prototype._openLightbox, 'function');
    assert.equal(typeof mod.UIImage.prototype._closeLightbox, 'function');
  });
});
