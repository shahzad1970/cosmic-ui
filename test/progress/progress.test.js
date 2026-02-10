import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

/*
 * Smoke-test for UIProgress.
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

const mod = await import('../../src/components/progress/progress.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UIProgress module', () => {
  it('exports the UIProgress class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UIProgress, 'function');
  });

  it('is registered as ui-progress', () => {
    const ctor = globalThis.customElements.get('ui-progress');
    assert.ok(ctor, 'ui-progress should be registered');
    assert.equal(ctor, mod.UIProgress);
  });

  it('declares expected static properties', () => {
    const props = mod.UIProgress.properties;
    for (const key of ['value', 'max', 'type', 'color', 'background', 'size', 'thickness', 'label']) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
  });

  it('has correct default values', () => {
    const p = mod.UIProgress.properties;
    assert.equal(p.value.default, -1);
    assert.equal(p.max.default, 100);
    assert.equal(p.type.default, 'bar');
    assert.equal(p.color.default, '');
    assert.equal(p.background.default, '');
    assert.equal(p.size.default, '');
    assert.equal(p.thickness.default, '');
    assert.equal(p.label.default, false);
  });

  it('value and max are Number type', () => {
    const p = mod.UIProgress.properties;
    assert.equal(p.value.type, Number);
    assert.equal(p.max.type, Number);
  });

  it('label is Boolean type', () => {
    assert.equal(mod.UIProgress.properties.label.type, Boolean);
  });

  it('type, color, background, size, thickness are String type', () => {
    const p = mod.UIProgress.properties;
    for (const key of ['type', 'color', 'background', 'size', 'thickness']) {
      assert.equal(p[key].type, String, `${key} should be String`);
    }
  });

  it('all properties have reflect: true', () => {
    const p = mod.UIProgress.properties;
    for (const key of Object.keys(p)) {
      assert.equal(p[key].reflect, true, `${key} should have reflect: true`);
    }
  });
});

describe('UIProgress styles', () => {
  it('static styles() returns non-empty CSS', () => {
    const css = mod.UIProgress.styles();
    assert.ok(css.length > 0);
    assert.ok(css.includes(':host'));
  });

  it('styles include bar track and fill classes', () => {
    const css = mod.UIProgress.styles();
    assert.ok(css.includes('.bar-track'));
    assert.ok(css.includes('.bar-fill'));
  });

  it('styles include ring track and fill classes', () => {
    const css = mod.UIProgress.styles();
    assert.ok(css.includes('.ring-track'));
    assert.ok(css.includes('.ring-fill'));
  });

  it('styles include indeterminate bar animation', () => {
    const css = mod.UIProgress.styles();
    assert.ok(css.includes('bar-indeterminate'));
    assert.ok(css.includes('@keyframes'));
  });

  it('styles include indeterminate ring animation', () => {
    const css = mod.UIProgress.styles();
    assert.ok(css.includes('ring-spin'));
  });

  it('styles include bar and ring label classes', () => {
    const css = mod.UIProgress.styles();
    assert.ok(css.includes('.bar-label'));
    assert.ok(css.includes('.ring-label'));
  });

  it('styles set ring type to inline-block', () => {
    const css = mod.UIProgress.styles();
    assert.ok(css.includes(':host([type="ring"])'));
    assert.ok(css.includes('inline-block'));
  });
});

describe('UIProgress bar render', () => {
  /** @returns {object} */
  function makeInst(overrides = {}) {
    const inst = Object.create(mod.UIProgress.prototype);
    inst.value = -1;
    inst.max = 100;
    inst.type = 'bar';
    inst.label = false;
    inst.hasAttribute = (n) => n === 'value' ? overrides.value !== undefined : false;
    Object.assign(inst, overrides);
    return inst;
  }

  it('renders bar-track and bar-fill', () => {
    const html = makeInst({ value: 50 }).render();
    assert.ok(html.includes('bar-track'));
    assert.ok(html.includes('bar-fill'));
  });

  it('does not show label when label=false', () => {
    const html = makeInst({ value: 50, label: false }).render();
    assert.ok(!html.includes('bar-label'));
  });

  it('shows percentage label when label=true', () => {
    const html = makeInst({ value: 75, label: true }).render();
    assert.ok(html.includes('75%'));
    assert.ok(html.includes('bar-label'));
  });

  it('clamps label to 0–100', () => {
    const html = makeInst({ value: 150, label: true }).render();
    assert.ok(html.includes('100%'));
  });
});

describe('UIProgress ring render', () => {
  /** @returns {object} */
  function makeInst(overrides = {}) {
    const inst = Object.create(mod.UIProgress.prototype);
    inst.value = -1;
    inst.max = 100;
    inst.type = 'ring';
    inst.label = false;
    inst.thickness = '';
    inst.hasAttribute = (n) => n === 'value' ? overrides.value !== undefined : false;
    Object.assign(inst, overrides);
    return inst;
  }

  it('renders SVG with ring-track and ring-fill circles', () => {
    const html = makeInst({ value: 50 }).render();
    assert.ok(html.includes('<svg'));
    assert.ok(html.includes('ring-track'));
    assert.ok(html.includes('ring-fill'));
  });

  it('renders stroke-dasharray and stroke-dashoffset', () => {
    const html = makeInst({ value: 50 }).render();
    assert.ok(html.includes('stroke-dasharray'));
    assert.ok(html.includes('stroke-dashoffset'));
  });

  it('shows ring label when label=true', () => {
    const html = makeInst({ value: 60, label: true }).render();
    assert.ok(html.includes('ring-label'));
    assert.ok(html.includes('60%'));
  });

  it('does not show ring label when indeterminate', () => {
    const inst = makeInst({ value: -1, label: true });
    inst.hasAttribute = () => false;
    const html = inst.render();
    assert.ok(!html.includes('ring-label'));
  });
});

describe('UIProgress convention methods', () => {
  it('has _update method', () => {
    assert.equal(typeof mod.UIProgress.prototype._update, 'function');
  });

  it('has _applyA11y method', () => {
    assert.equal(typeof mod.UIProgress.prototype._applyA11y, 'function');
  });

  it('has _applyStyles method', () => {
    assert.equal(typeof mod.UIProgress.prototype._applyStyles, 'function');
  });

  it('has _indeterminate getter', () => {
    const desc = Object.getOwnPropertyDescriptor(mod.UIProgress.prototype, '_indeterminate');
    assert.ok(desc, '_indeterminate should exist');
    assert.equal(typeof desc.get, 'function', '_indeterminate should be a getter');
  });

  it('_indeterminate returns true when value < 0', () => {
    const inst = Object.create(mod.UIProgress.prototype);
    inst.value = -1;
    inst.hasAttribute = () => false;
    assert.equal(inst._indeterminate, true);
  });

  it('_indeterminate returns false when value >= 0 and attribute present', () => {
    const inst = Object.create(mod.UIProgress.prototype);
    inst.value = 50;
    inst.hasAttribute = (n) => n === 'value';
    assert.equal(inst._indeterminate, false);
  });

  it('has _renderBar method', () => {
    assert.equal(typeof mod.UIProgress.prototype._renderBar, 'function');
  });

  it('has _renderRing method', () => {
    assert.equal(typeof mod.UIProgress.prototype._renderRing, 'function');
  });

  it('render dispatches to _renderBar for type=bar', () => {
    const inst = Object.create(mod.UIProgress.prototype);
    inst.type = 'bar';
    inst.value = 50;
    inst.max = 100;
    inst.label = false;
    inst.hasAttribute = (n) => n === 'value';
    const html = inst.render();
    assert.ok(html.includes('bar-track'), 'Should render bar');
    assert.ok(!html.includes('<svg'), 'Should not render ring');
  });

  it('render dispatches to _renderRing for type=ring', () => {
    const inst = Object.create(mod.UIProgress.prototype);
    inst.type = 'ring';
    inst.value = 50;
    inst.max = 100;
    inst.label = false;
    inst.thickness = '';
    inst.hasAttribute = (n) => n === 'value';
    const html = inst.render();
    assert.ok(html.includes('<svg'), 'Should render ring SVG');
    assert.ok(!html.includes('bar-track'), 'Should not render bar');
  });

  it('bar label with custom max shows correct percentage', () => {
    const inst = Object.create(mod.UIProgress.prototype);
    inst.type = 'bar';
    inst.value = 25;
    inst.max = 50;
    inst.label = true;
    inst.hasAttribute = (n) => n === 'value';
    const html = inst.render();
    assert.ok(html.includes('50%'), 'Should show 50% (25/50)');
  });

  it('indeterminate bar does not include label', () => {
    const inst = Object.create(mod.UIProgress.prototype);
    inst.type = 'bar';
    inst.value = -1;
    inst.max = 100;
    inst.label = true;
    inst.hasAttribute = () => false;
    const html = inst.render();
    assert.ok(!html.includes('bar-label'), 'Indeterminate bar should not show label');
  });
});
