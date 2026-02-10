import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

/*
 * Tests for UIClipboard.
 */

// Provide minimal DOM shims so the module can load in Node.
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

const mod = await import('../../src/components/clipboard/clipboard.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UIClipboard module', () => {
  it('exports the UIClipboard class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UIClipboard, 'function');
  });

  it('is registered as ui-clipboard', () => {
    assert.equal(globalThis.customElements.get('ui-clipboard'), mod.UIClipboard);
  });
});

describe('UIClipboard static properties', () => {
  it('declares all 9 expected properties', () => {
    const props = mod.UIClipboard.properties;
    for (const key of ['value', 'background', 'color', 'size', 'disabled',
                        'feedback', 'duration', 'flat', 'outline']) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
    assert.equal(Object.keys(props).length, 9, 'Should have exactly 9 properties');
  });

  it('has correct default values', () => {
    const p = mod.UIClipboard.properties;
    assert.equal(p.value.default, '');
    assert.equal(p.background.default, '');
    assert.equal(p.color.default, '');
    assert.equal(p.size.default, '');
    assert.equal(p.disabled.default, false);
    assert.equal(p.feedback.default, 'Copied!');
    assert.equal(p.duration.default, 2000);
    assert.equal(p.flat.default, false);
    assert.equal(p.outline.default, false);
  });

  it('has correct types', () => {
    const p = mod.UIClipboard.properties;
    assert.equal(p.value.type, String);
    assert.equal(p.background.type, String);
    assert.equal(p.color.type, String);
    assert.equal(p.size.type, String);
    assert.equal(p.disabled.type, Boolean);
    assert.equal(p.feedback.type, String);
    assert.equal(p.duration.type, Number);
    assert.equal(p.flat.type, Boolean);
    assert.equal(p.outline.type, Boolean);
  });

  it('all properties reflect', () => {
    const p = mod.UIClipboard.properties;
    for (const key of Object.keys(p)) {
      assert.notEqual(p[key].reflect, false, `${key} should reflect`);
    }
  });
});

describe('UIClipboard methods', () => {
  it('has _copy method', () => {
    assert.equal(typeof mod.UIClipboard.prototype._copy, 'function');
  });

  it('has _applyStyles method', () => {
    assert.equal(typeof mod.UIClipboard.prototype._applyStyles, 'function');
  });

  it('has bound _onBtnClick handler', () => {
    assert.equal(typeof mod.UIClipboard.prototype._onBtnClick, 'function');
  });

  it('has _attachListeners method', () => {
    assert.equal(typeof mod.UIClipboard.prototype._attachListeners, 'function');
  });

  it('has _detachListeners method', () => {
    assert.equal(typeof mod.UIClipboard.prototype._detachListeners, 'function');
  });
});

describe('UIClipboard styles', () => {
  it('static styles() returns CSS string', () => {
    const css = mod.UIClipboard.styles();
    assert.equal(typeof css, 'string');
  });

  it('includes :host selector', () => {
    assert.ok(mod.UIClipboard.styles().includes(':host'));
  });

  it('includes .btn class', () => {
    assert.ok(mod.UIClipboard.styles().includes('.btn'));
  });

  it('includes disabled styles', () => {
    assert.ok(mod.UIClipboard.styles().includes(':host([disabled])'));
  });

  it('includes flat styles', () => {
    assert.ok(mod.UIClipboard.styles().includes(':host([flat])'));
  });

  it('includes outline styles', () => {
    assert.ok(mod.UIClipboard.styles().includes(':host([outline])'));
  });

  it('includes copy/check icon toggle via data-copied', () => {
    const css = mod.UIClipboard.styles();
    assert.ok(css.includes('[data-copied]'), 'Should toggle icons on data-copied');
  });

  it('includes success colour', () => {
    assert.ok(mod.UIClipboard.styles().includes('green'));
  });

  it('includes hover and active states', () => {
    const css = mod.UIClipboard.styles();
    assert.ok(css.includes(':hover'), 'Should have hover');
    assert.ok(css.includes(':active'), 'Should have active');
  });

  it('includes focus-visible ring', () => {
    assert.ok(mod.UIClipboard.styles().includes(':focus-visible'));
  });
});

describe('UIClipboard render', () => {
  it('render() returns button with copy/check icons', () => {
    const instance = Object.create(mod.UIClipboard.prototype);
    instance._feedback = 'Copied!';
    instance.feedback = 'Copied!';
    instance.hasAttribute = () => false;
    const html = instance.render();
    assert.ok(html.includes('<button'), 'Should render a <button>');
    assert.ok(html.includes('aria-label'), 'Should have aria-label');
    assert.ok(html.includes('icon-copy'), 'Should have copy icon');
    assert.ok(html.includes('icon-check'), 'Should have check icon');
    assert.ok(html.includes('<slot>'), 'Should have default slot');
  });

  it('render() includes SVG icons', () => {
    const instance = Object.create(mod.UIClipboard.prototype);
    instance._feedback = 'Copied!';
    instance.feedback = 'Copied!';
    instance.hasAttribute = () => false;
    const html = instance.render();
    assert.ok(html.includes('<svg'), 'Should contain SVG elements');
    assert.ok(html.includes('viewBox'), 'SVGs should have viewBox');
  });
});
