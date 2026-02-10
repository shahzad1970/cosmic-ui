import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

/*
 * Smoke-tests for UIToast.
 *
 * Validates module resolution and class shape without a DOM.
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

const mod = await import('../../src/components/toast/toast.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UIToast module', () => {
  it('exports the UIToast class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UIToast, 'function');
  });

  it('is registered as ui-toast', () => {
    assert.equal(globalThis.customElements.get('ui-toast'), mod.UIToast);
  });

  it('declares expected static properties', () => {
    const props = mod.UIToast.properties;
    for (const key of ['background', 'color', 'size', 'elevation', 'duration', 'position', 'dismissible']) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
  });

  it('has correct default values', () => {
    const p = mod.UIToast.properties;
    assert.equal(p.background.default, 'gray-800');
    assert.equal(p.color.default, '');
    assert.equal(p.size.default, '');
    assert.equal(p.elevation.default, '');
    assert.equal(p.duration.default, 4000);
    assert.equal(p.position.default, 'bottom-right');
    assert.equal(p.dismissible.default, true);
  });

  it('duration is Number type', () => {
    assert.equal(mod.UIToast.properties.duration.type, Number);
  });

  it('dismissible defaults to true (unlike callout)', () => {
    assert.equal(mod.UIToast.properties.dismissible.default, true);
  });
});

describe('UIToast positions', () => {
  it('defines 6 valid positions', () => {
    const pos = mod.UIToast._positions;
    assert.ok(pos instanceof Set);
    assert.equal(pos.size, 6);
    for (const p of ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right']) {
      assert.ok(pos.has(p), `Missing position: ${p}`);
    }
  });
});

describe('UIToast containers', () => {
  it('_containers is a Map', () => {
    assert.ok(mod.UIToast._containers instanceof Map);
  });

  it('has static _getContainer method', () => {
    assert.equal(typeof mod.UIToast._getContainer, 'function');
  });

  it('has static _cleanupContainer method', () => {
    assert.equal(typeof mod.UIToast._cleanupContainer, 'function');
  });
});

describe('UIToast static API', () => {
  it('has static show() method', () => {
    assert.equal(typeof mod.UIToast.show, 'function');
  });
});

describe('UIToast styles & render', () => {
  it('static styles() returns non-empty CSS', () => {
    const css = mod.UIToast.styles();
    assert.ok(css.length > 0);
  });

  it('styles include box-shadow for elevation', () => {
    const css = mod.UIToast.styles();
    assert.ok(css.includes('box-shadow'), 'Toasts should have a shadow for visual elevation');
  });

  it('styles include pointer-events auto', () => {
    const css = mod.UIToast.styles();
    assert.ok(css.includes('pointer-events: auto'), 'Toasts must be clickable inside pointer-events:none container');
  });

  it('styles include dismiss button focus ring', () => {
    const css = mod.UIToast.styles();
    assert.ok(css.includes('button:focus-visible'), 'Missing button:focus-visible rule');
    assert.ok(css.includes('--ui-focus-ring'), 'Focus ring should use --ui-focus-ring token');
  });

  it('styles include circular dismiss button', () => {
    const css = mod.UIToast.styles();
    assert.ok(css.includes('border-radius: 50%'), 'Dismiss button should be circular');
  });

  it('render includes slot and dismiss button', () => {
    const html = mod.UIToast.prototype.render.call({});
    assert.ok(html.includes('<slot>'), 'Should contain a slot');
    assert.ok(html.includes('aria-label="Dismiss"'), 'Dismiss button should have aria-label');
    assert.ok(html.includes('\u2715'), 'Dismiss button should show × character');
  });

  it('dismiss button is after slot (right side)', () => {
    const html = mod.UIToast.prototype.render.call({});
    const slotIdx = html.indexOf('<slot>');
    const btnIdx = html.indexOf('<button');
    assert.ok(slotIdx < btnIdx, 'Slot should come before the dismiss button');
  });
});

describe('UIToast timer methods', () => {
  it('has _startTimer method', () => {
    assert.equal(typeof mod.UIToast.prototype._startTimer, 'function');
  });

  it('has _pauseTimer method', () => {
    assert.equal(typeof mod.UIToast.prototype._pauseTimer, 'function');
  });

  it('has _resumeTimer method', () => {
    assert.equal(typeof mod.UIToast.prototype._resumeTimer, 'function');
  });

  it('has _clearTimer method', () => {
    assert.equal(typeof mod.UIToast.prototype._clearTimer, 'function');
  });

  it('has dismiss method', () => {
    assert.equal(typeof mod.UIToast.prototype.dismiss, 'function');
  });
});

describe('UIToast convention methods', () => {
  it('has _update method', () => {
    assert.equal(typeof mod.UIToast.prototype._update, 'function');
  });

  it('has _attachListeners method', () => {
    assert.equal(typeof mod.UIToast.prototype._attachListeners, 'function');
  });

  it('has _applyStyles method', () => {
    assert.equal(typeof mod.UIToast.prototype._applyStyles, 'function');
  });

  it('has _finishDismiss method', () => {
    assert.equal(typeof mod.UIToast.prototype._finishDismiss, 'function');
  });

  it('properties have correct types', () => {
    const p = mod.UIToast.properties;
    assert.equal(p.background.type, String);
    assert.equal(p.color.type, String);
    assert.equal(p.size.type, String);
    assert.equal(p.elevation.type, String);
    assert.equal(p.duration.type, Number);
    assert.equal(p.position.type, String);
    assert.equal(p.dismissible.type, Boolean);
  });

  it('all properties reflect', () => {
    const p = mod.UIToast.properties;
    for (const key of Object.keys(p)) {
      assert.notEqual(p[key].reflect, false, `${key} should reflect`);
    }
  });

  it('slot comes before dismiss button in render', () => {
    const html = mod.UIToast.prototype.render.call({});
    const slotIdx = html.indexOf('<slot>');
    const btnIdx = html.indexOf('aria-label="Dismiss"');
    assert.ok(slotIdx < btnIdx, 'Slot should precede dismiss button');
  });
});
