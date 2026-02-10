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

const mod = await import('../../src/components/skeleton/skeleton.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UISkeleton module', () => {
  it('exports the UISkeleton class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UISkeleton, 'function');
  });

  it('declares expected static properties', () => {
    const props = mod.UISkeleton.properties;
    for (const key of ['variant', 'width', 'height', 'lines', 'gap', 'size',
                        'animated', 'radius']) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
  });

  it('has correct default values', () => {
    const p = mod.UISkeleton.properties;
    assert.equal(p.variant.default, 'text');
    assert.equal(p.width.default, '');
    assert.equal(p.height.default, '');
    assert.equal(p.lines.default, 1);
    assert.equal(p.gap.default, '');
    assert.equal(p.size.default, '');
    assert.equal(p.animated.default, true);
    assert.equal(p.radius.default, '');
  });

  it('properties have correct types', () => {
    const p = mod.UISkeleton.properties;
    assert.equal(p.variant.type, String);
    assert.equal(p.width.type, String);
    assert.equal(p.height.type, String);
    assert.equal(p.lines.type, Number);
    assert.equal(p.gap.type, String);
    assert.equal(p.animated.type, Boolean);
    assert.equal(p.radius.type, String);
  });

  it('all properties reflect', () => {
    const p = mod.UISkeleton.properties;
    for (const key of Object.keys(p)) {
      assert.notEqual(p[key].reflect, false, `${key} should reflect`);
    }
  });

  it('has static styles()', () => {
    const css = mod.UISkeleton.styles();
    assert.ok(css.includes(':host'), 'Should include :host');
    assert.ok(css.includes('.bone'), 'Should include .bone');
    assert.ok(css.includes('@keyframes'), 'Should include shimmer keyframes');
    assert.ok(css.includes('shimmer'), 'Should reference shimmer animation');
  });

  it('styles handle variant circle', () => {
    const css = mod.UISkeleton.styles();
    assert.ok(css.includes('circle'), 'Should handle circle variant');
  });

  it('render() returns bone elements for text variant', () => {
    const instance = Object.create(mod.UISkeleton.prototype);
    instance.variant = 'text';
    instance.lines = 3;
    instance.animated = true;
    const html = instance.render();
    assert.ok(html.includes('bone'), 'Should include bone elements');
  });

  it('render() returns single bone for circle variant', () => {
    const instance = Object.create(mod.UISkeleton.prototype);
    instance.variant = 'circle';
    instance.lines = 1;
    instance.animated = true;
    const html = instance.render();
    assert.ok(html.includes('bone'), 'Should include bone element');
  });

  it('render() returns single bone for rect variant', () => {
    const instance = Object.create(mod.UISkeleton.prototype);
    instance.variant = 'rect';
    instance.lines = 1;
    instance.animated = true;
    const html = instance.render();
    assert.ok(html.includes('bone'), 'Should include bone element');
  });

  it('has _applyStyles method', () => {
    assert.equal(typeof mod.UISkeleton.prototype._applyStyles, 'function');
  });

  it('is registered as ui-skeleton custom element', () => {
    assert.equal(globalThis.customElements.get('ui-skeleton'), mod.UISkeleton);
  });

  it('has _update method', () => {
    assert.equal(typeof mod.UISkeleton.prototype._update, 'function');
  });

  it('render() wraps multi-line bones in .lines container', () => {
    const instance = Object.create(mod.UISkeleton.prototype);
    instance.variant = 'text';
    instance.lines = 4;
    instance.animated = true;
    const html = instance.render();
    assert.ok(html.includes('class="lines"'), 'Multi-line should wrap in .lines');
    const boneCount = (html.match(/text-bone/g) || []).length;
    assert.equal(boneCount, 4, 'Should render 4 bones');
  });

  it('render() single bone has no .lines wrapper', () => {
    const instance = Object.create(mod.UISkeleton.prototype);
    instance.variant = 'text';
    instance.lines = 1;
    instance.animated = true;
    const html = instance.render();
    assert.ok(!html.includes('class="lines"'), 'Single bone should not wrap in .lines');
    assert.ok(html.includes('text-bone'), 'Should render one text-bone');
  });

  it('render() includes part=bone for all variants', () => {
    for (const variant of ['text', 'circle', 'rect']) {
      const instance = Object.create(mod.UISkeleton.prototype);
      instance.variant = variant;
      instance.lines = 1;
      instance.animated = true;
      const html = instance.render();
      assert.ok(html.includes('part="bone"'), `${variant} should expose bone part`);
    }
  });

  it('render() uses correct CSS class per variant', () => {
    const variants = { text: 'text-bone', circle: 'circle-bone', rect: 'rect-bone' };
    for (const [variant, cls] of Object.entries(variants)) {
      const instance = Object.create(mod.UISkeleton.prototype);
      instance.variant = variant;
      instance.lines = 1;
      instance.animated = true;
      const html = instance.render();
      assert.ok(html.includes(cls), `${variant} should use .${cls}`);
    }
  });

  it('styles include last-child width rule for multi-line', () => {
    const css = mod.UISkeleton.styles();
    assert.ok(css.includes('.text-bone:last-child:not(:first-child)'),
      'Should have last-child width rule for natural text effect');
    assert.ok(css.includes('--_last-w'), 'Should reference --_last-w variable');
  });

  it('styles include shimmer animation for animated bones', () => {
    const css = mod.UISkeleton.styles();
    assert.ok(css.includes(':host([animated]) .bone::after'), 'Should animate when [animated]');
    assert.ok(css.includes('@keyframes shimmer'), 'Should define shimmer keyframes');
  });

  it('styles include circle-bone with border-radius 50%', () => {
    const css = mod.UISkeleton.styles();
    assert.ok(css.includes('.circle-bone'), 'Should have circle-bone class');
  });
});
