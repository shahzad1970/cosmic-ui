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

const mod = await import('../../src/components/scroll-area/scroll-area.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UIScrollArea module', () => {
  it('exports the UIScrollArea class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UIScrollArea, 'function');
  });

  it('declares expected static properties', () => {
    const props = mod.UIScrollArea.properties;
    assert.ok('height' in props, 'Missing property: height');
    assert.ok('maxHeight' in props, 'Missing property: maxHeight');
    assert.ok('width' in props, 'Missing property: width');
    assert.ok('size' in props, 'Missing property: size');
    assert.ok('direction' in props, 'Missing property: direction');
    assert.ok('scrollbar' in props, 'Missing property: scrollbar');
    assert.ok('padding' in props, 'Missing property: padding');
  });

  it('has correct default values', () => {
    const p = mod.UIScrollArea.properties;
    assert.equal(p.height.default, '');
    assert.equal(p.maxHeight.default, '');
    assert.equal(p.width.default, '');
    assert.equal(p.size.default, '');
    assert.equal(p.direction.default, 'vertical');
    assert.equal(p.scrollbar.default, 'thin');
    assert.equal(p.padding.default, '');
  });

  it('properties have correct types', () => {
    const p = mod.UIScrollArea.properties;
    assert.equal(p.height.type, String);
    assert.equal(p.maxHeight.type, String);
    assert.equal(p.width.type, String);
    assert.equal(p.size.type, String);
    assert.equal(p.direction.type, String);
    assert.equal(p.scrollbar.type, String);
    assert.equal(p.padding.type, String);
  });

  it('all properties reflect', () => {
    const p = mod.UIScrollArea.properties;
    for (const key of Object.keys(p)) {
      assert.notEqual(p[key].reflect, false, `${key} should reflect`);
    }
  });

  it('maxHeight uses attribute name max-height', () => {
    const p = mod.UIScrollArea.properties;
    assert.equal(p.maxHeight.attribute, 'max-height');
  });

  it('has static styles()', () => {
    const css = mod.UIScrollArea.styles();
    assert.ok(css.includes(':host'), 'Should include :host selector');
    assert.ok(css.includes('.scroll-container'), 'Should include scroll-container class');
    assert.ok(css.includes('overflow'), 'Should include overflow rules');
  });

  it('styles include direction variants', () => {
    const css = mod.UIScrollArea.styles();
    assert.ok(css.includes('[direction="vertical"]'), 'Should include vertical direction');
    assert.ok(css.includes('[direction="horizontal"]'), 'Should include horizontal direction');
    assert.ok(css.includes('[direction="both"]'), 'Should include both direction');
  });

  it('styles include scrollbar variants', () => {
    const css = mod.UIScrollArea.styles();
    assert.ok(css.includes('[scrollbar="thin"]'), 'Should include thin scrollbar');
    assert.ok(css.includes('[scrollbar="hidden"]'), 'Should include hidden scrollbar');
    assert.ok(css.includes('[scrollbar="auto"]'), 'Should include auto scrollbar');
  });

  it('styles include scroll shadow indicators', () => {
    const css = mod.UIScrollArea.styles();
    assert.ok(css.includes('.shadow'), 'Should include shadow class');
    assert.ok(css.includes('.shadow-top'), 'Should include shadow-top class');
    assert.ok(css.includes('.shadow-bottom'), 'Should include shadow-bottom class');
    assert.ok(css.includes('data-scroll-up'), 'Should include data-scroll-up selector');
    assert.ok(css.includes('data-scroll-down'), 'Should include data-scroll-down selector');
  });

  it('styles expose CSS custom properties for shadow customisation', () => {
    const css = mod.UIScrollArea.styles();
    assert.ok(css.includes('--ui-scroll-shadow-size'), 'Should use --ui-scroll-shadow-size');
    assert.ok(css.includes('--ui-scroll-shadow-color'), 'Should use --ui-scroll-shadow-color');
  });

  it('render() returns scroll container with slot and shadow indicators', () => {
    const instance = Object.create(mod.UIScrollArea.prototype);
    const html = instance.render();
    assert.ok(html.includes('<div class="scroll-container">'), 'Should have scroll-container div');
    assert.ok(html.includes('<slot>'), 'Should have default slot');
    assert.ok(html.includes('shadow-top'), 'Should have top shadow indicator');
    assert.ok(html.includes('shadow-bottom'), 'Should have bottom shadow indicator');
  });

  it('has _applyStyles method', () => {
    assert.equal(typeof mod.UIScrollArea.prototype._applyStyles, 'function');
  });

  it('has _attachScrollListener method', () => {
    assert.equal(typeof mod.UIScrollArea.prototype._attachScrollListener, 'function');
  });

  it('has _updateScrollIndicators method', () => {
    assert.equal(typeof mod.UIScrollArea.prototype._updateScrollIndicators, 'function');
  });

  it('overrides _update for scroll listener re-attachment', () => {
    assert.equal(typeof mod.UIScrollArea.prototype._update, 'function');
    // Ensure it's the component's own override, not inherited
    assert.ok(
      mod.UIScrollArea.prototype.hasOwnProperty('_update') ||
      Object.getOwnPropertyDescriptor(mod.UIScrollArea.prototype, '_update'),
      '_update should be defined on UIScrollArea prototype'
    );
  });

  it('has scrollToTop method', () => {
    assert.equal(typeof mod.UIScrollArea.prototype.scrollToTop, 'function');
  });

  it('has scrollToBottom method', () => {
    assert.equal(typeof mod.UIScrollArea.prototype.scrollToBottom, 'function');
  });

  it('has scrollToLeft method', () => {
    assert.equal(typeof mod.UIScrollArea.prototype.scrollToLeft, 'function');
  });

  it('has scrollToRight method', () => {
    assert.equal(typeof mod.UIScrollArea.prototype.scrollToRight, 'function');
  });

  it('host has overflow:hidden for shadow clipping', () => {
    const css = mod.UIScrollArea.styles();
    assert.ok(css.includes('overflow: hidden') || css.includes('overflow:hidden'),
      ':host should have overflow:hidden to clip shadow indicators');
  });

  it('is registered as ui-scroll-area custom element', () => {
    assert.equal(globalThis.customElements.get('ui-scroll-area'), mod.UIScrollArea);
  });
});
