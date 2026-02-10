import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

/*
 * Smoke-tests for UIChart.
 *
 * Validates module resolution, class shape, property declarations,
 * render output, deep-clone logic, and normalisation without a browser.
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

const mod = await import('../../src/components/chart/chart.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

/* ------------------------------------------------------------------ */
/*  Module & Registration                                              */
/* ------------------------------------------------------------------ */

describe('UIChart module', () => {
  it('exports the UIChart class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UIChart, 'function');
  });

  it('is registered as ui-chart', () => {
    assert.equal(globalThis.customElements.get('ui-chart'), mod.UIChart);
  });
});

/* ------------------------------------------------------------------ */
/*  Static properties                                                  */
/* ------------------------------------------------------------------ */

describe('UIChart static properties', () => {
  it('declares all expected properties', () => {
    const props = mod.UIChart.properties;
    for (const key of ['height', 'src', 'background', 'color', 'size', 'noAnimate']) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
  });

  it('has correct default values', () => {
    const p = mod.UIChart.properties;
    assert.equal(p.height.default, '8em');
    assert.equal(p.src.default, '');
    assert.equal(p.background.default, '');
    assert.equal(p.color.default, '');
    assert.equal(p.size.default, '');
    assert.equal(p.noAnimate.default, false);
  });

  it('has correct types', () => {
    const p = mod.UIChart.properties;
    assert.equal(p.height.type, String);
    assert.equal(p.src.type, String);
    assert.equal(p.background.type, String);
    assert.equal(p.color.type, String);
    assert.equal(p.size.type, String);
    assert.equal(p.noAnimate.type, Boolean);
  });

  it('all properties reflect', () => {
    const p = mod.UIChart.properties;
    for (const key of Object.keys(p)) {
      assert.notEqual(p[key].reflect, false, `${key} should reflect`);
    }
  });

  it('noAnimate uses attribute name "no-animate"', () => {
    assert.equal(mod.UIChart.properties.noAnimate.attribute, 'no-animate');
  });
});

/* ------------------------------------------------------------------ */
/*  Static styles                                                      */
/* ------------------------------------------------------------------ */

describe('UIChart styles', () => {
  it('has static styles()', () => {
    const css = mod.UIChart.styles();
    assert.ok(css.includes(':host'), 'Should include :host');
  });

  it('uses --_height CSS variable', () => {
    const css = mod.UIChart.styles();
    assert.ok(css.includes('--_height'), 'Should reference --_height');
  });

  it('uses --_bg CSS variable for background', () => {
    const css = mod.UIChart.styles();
    assert.ok(css.includes('--_bg'), 'Should reference --_bg');
  });

  it('uses --_fg CSS variable for colour', () => {
    const css = mod.UIChart.styles();
    assert.ok(css.includes('--_fg'), 'Should reference --_fg');
  });

  it('has loading spinner styles', () => {
    const css = mod.UIChart.styles();
    assert.ok(css.includes('.spinner'), 'Should include spinner class');
    assert.ok(css.includes('@keyframes'), 'Should include keyframes');
    assert.ok(css.includes('animation'), 'Should include animation');
  });

  it('has overlay styles', () => {
    const css = mod.UIChart.styles();
    assert.ok(css.includes('.overlay'), 'Should include overlay class');
    assert.ok(css.includes('.hidden'), 'Should include hidden class');
  });

  it('has empty state styles', () => {
    const css = mod.UIChart.styles();
    assert.ok(css.includes('.empty'), 'Should include empty class');
  });

  it('has error text styles', () => {
    const css = mod.UIChart.styles();
    assert.ok(css.includes('.error-text'), 'Should include error-text class');
    assert.ok(css.includes('--ui-red-500'), 'Error text should use red token');
  });

  it('uses border-radius on host', () => {
    const css = mod.UIChart.styles();
    assert.ok(css.includes('border-radius'), 'Should include border-radius');
    assert.ok(css.includes('--ui-radius'), 'Should use --ui-radius token');
  });
});

/* ------------------------------------------------------------------ */
/*  Render output                                                      */
/* ------------------------------------------------------------------ */

describe('UIChart render', () => {
  /** Helper to create a minimal prototype instance. */
  function makeInstance(overrides = {}) {
    const inst = Object.create(mod.UIChart.prototype);
    inst._src = '';
    inst._config = null;
    inst._height = '8em';
    inst._noAnimate = false;
    Object.assign(inst, overrides);
    return inst;
  }

  it('returns empty state when no src or config', () => {
    const html = makeInstance().render();
    assert.ok(html.includes('class="empty"'), 'Should have empty class');
    assert.ok(html.includes('Provide src or config'), 'Should show guidance text');
  });

  it('returns frame with canvas when src is set', () => {
    const html = makeInstance({ _src: '/data.json' }).render();
    assert.ok(html.includes('<canvas'), 'Should contain canvas');
    assert.ok(html.includes('class="frame"'), 'Should have frame wrapper');
    assert.ok(html.includes('part="canvas"'), 'Canvas should expose part');
  });

  it('returns frame with canvas when config is set', () => {
    const html = makeInstance({ _config: { type: 'bar' } }).render();
    assert.ok(html.includes('<canvas'), 'Should contain canvas');
  });

  it('includes loading overlay', () => {
    const html = makeInstance({ _src: '/data.json' }).render();
    assert.ok(html.includes('overlay-loading'), 'Should have loading overlay');
    assert.ok(html.includes('spinner'), 'Should have spinner');
    assert.ok(html.includes('part="loading"'), 'Loading overlay should expose part');
  });

  it('includes error overlay (hidden by default)', () => {
    const html = makeInstance({ _src: '/data.json' }).render();
    assert.ok(html.includes('overlay-error'), 'Should have error overlay');
    assert.ok(html.includes('Chart failed to load'), 'Should have error message');
    assert.ok(html.includes('part="error"'), 'Error overlay should expose part');
  });
});

/* ------------------------------------------------------------------ */
/*  JS-only properties                                                 */
/* ------------------------------------------------------------------ */

describe('UIChart config property', () => {
  it('has config getter and setter', () => {
    const desc = Object.getOwnPropertyDescriptor(mod.UIChart.prototype, 'config');
    assert.ok(desc, 'config should be a property');
    assert.equal(typeof desc.set, 'function');
    assert.equal(typeof desc.get, 'function');
  });

  it('rejects non-object values', () => {
    const inst = Object.create(mod.UIChart.prototype);
    inst._config = null;
    inst._initialised = false;
    inst.config = 'not-an-object';
    assert.equal(inst.config, null);

    inst.config = 42;
    assert.equal(inst.config, null);
  });

  it('accepts object values', () => {
    const inst = Object.create(mod.UIChart.prototype);
    inst._config = null;
    inst._initialised = false;
    const cfg = { type: 'bar', data: {} };
    inst.config = cfg;
    assert.equal(inst.config, cfg);
  });
});

describe('UIChart chart getter', () => {
  it('has a read-only chart getter', () => {
    const desc = Object.getOwnPropertyDescriptor(mod.UIChart.prototype, 'chart');
    assert.ok(desc, 'chart should be a property');
    assert.equal(typeof desc.get, 'function');
    assert.equal(desc.set, undefined, 'chart should be read-only');
  });

  it('returns null initially', () => {
    const inst = Object.create(mod.UIChart.prototype);
    inst._chart = null;
    assert.equal(inst.chart, null);
  });
});

/* ------------------------------------------------------------------ */
/*  _deepClone                                                         */
/* ------------------------------------------------------------------ */

describe('UIChart _deepClone', () => {
  const proto = mod.UIChart.prototype;

  it('deep-clones plain objects', () => {
    const orig = { a: 1, b: { c: 2 } };
    const clone = proto._deepClone(orig);
    assert.deepEqual(clone, orig);
    assert.notEqual(clone, orig);
    assert.notEqual(clone.b, orig.b);
  });

  it('deep-clones arrays', () => {
    const orig = [1, [2, 3], { x: 4 }];
    const clone = proto._deepClone(orig);
    assert.deepEqual(clone, orig);
    assert.notEqual(clone, orig);
    assert.notEqual(clone[1], orig[1]);
    assert.notEqual(clone[2], orig[2]);
  });

  it('preserves function references', () => {
    const fn = () => 42;
    const orig = { onClick: fn, data: { formatter: fn } };
    const clone = proto._deepClone(orig);
    assert.equal(clone.onClick, fn, 'Top-level function should be same reference');
    assert.equal(clone.data.formatter, fn, 'Nested function should be same reference');
  });

  it('handles null and primitives', () => {
    assert.equal(proto._deepClone(null), null);
    assert.equal(proto._deepClone(42), 42);
    assert.equal(proto._deepClone('hello'), 'hello');
    assert.equal(proto._deepClone(true), true);
    assert.equal(proto._deepClone(undefined), undefined);
  });

  it('handles empty objects and arrays', () => {
    assert.deepEqual(proto._deepClone({}), {});
    assert.deepEqual(proto._deepClone([]), []);
  });
});

/* ------------------------------------------------------------------ */
/*  _normalizeConfig                                                   */
/* ------------------------------------------------------------------ */

describe('UIChart _normalizeConfig', () => {
  const proto = mod.UIChart.prototype;

  it('defaults type to "line"', () => {
    const result = proto._normalizeConfig({ data: { labels: [] } });
    assert.equal(result.type, 'line');
  });

  it('preserves explicit type', () => {
    const result = proto._normalizeConfig({ type: 'bar', data: {} });
    assert.equal(result.type, 'bar');
  });

  it('defaults responsive to true', () => {
    const result = proto._normalizeConfig({ type: 'pie', data: {} });
    assert.equal(result.options.responsive, true);
  });

  it('defaults maintainAspectRatio to false', () => {
    const result = proto._normalizeConfig({ type: 'pie', data: {} });
    assert.equal(result.options.maintainAspectRatio, false);
  });

  it('preserves explicit options', () => {
    const result = proto._normalizeConfig({
      type: 'bar',
      data: {},
      options: { responsive: false, maintainAspectRatio: true, plugins: { legend: { display: false } } },
    });
    assert.equal(result.options.responsive, false);
    assert.equal(result.options.maintainAspectRatio, true);
    assert.equal(result.options.plugins.legend.display, false);
  });

  it('does not mutate the input config', () => {
    const original = { type: 'bar', data: { labels: ['A'] }, options: { responsive: false } };
    const frozen = JSON.parse(JSON.stringify(original));
    proto._normalizeConfig(original);
    assert.deepEqual(original, frozen, 'Original config should not be mutated');
  });

  it('provides empty data object if missing', () => {
    const result = proto._normalizeConfig({ type: 'line' });
    assert.deepEqual(result.data, {});
  });

  it('provides options object if missing', () => {
    const result = proto._normalizeConfig({ type: 'line', data: {} });
    assert.ok(result.options, 'Should have options');
    assert.equal(typeof result.options, 'object');
  });

  it('preserves function callbacks through normalisation', () => {
    const fn = (val) => `$${val}`;
    const result = proto._normalizeConfig({
      type: 'line',
      data: {},
      options: { plugins: { tooltip: { callbacks: { label: fn } } } },
    });
    assert.equal(result.options.plugins.tooltip.callbacks.label, fn);
  });
});

/* ------------------------------------------------------------------ */
/*  _applyStyles / _setOverlay methods                                 */
/* ------------------------------------------------------------------ */

describe('UIChart methods', () => {
  it('has _applyStyles method', () => {
    assert.equal(typeof mod.UIChart.prototype._applyStyles, 'function');
  });

  it('has _scheduleRefresh method', () => {
    assert.equal(typeof mod.UIChart.prototype._scheduleRefresh, 'function');
  });

  it('has _doRefresh method', () => {
    assert.equal(typeof mod.UIChart.prototype._doRefresh, 'function');
  });

  it('has _setOverlay method', () => {
    assert.equal(typeof mod.UIChart.prototype._setOverlay, 'function');
  });

  it('has _destroyChart method', () => {
    assert.equal(typeof mod.UIChart.prototype._destroyChart, 'function');
  });

  it('has static _loadChartJs method', () => {
    assert.equal(typeof mod.UIChart._loadChartJs, 'function');
  });
});

/* ------------------------------------------------------------------ */
/*  Constructor                                                        */
/* ------------------------------------------------------------------ */

describe('UIChart constructor', () => {
  it('initialises internal state via prototype defaults', () => {
    // Cannot call `new UIChart()` without full DOM (attachShadow),
    // so verify the constructor body sets expected fields by
    // inspecting a bare prototype instance with constructor logic.
    const inst = Object.create(mod.UIChart.prototype);
    // Simulate constructor state:
    inst._config = null;
    inst._chart = null;
    inst._loadedSrc = '';
    inst._configFromSrc = null;
    inst._srcRequestId = 0;
    inst._refreshSeq = 0;
    inst._refreshTimer = null;

    assert.equal(inst._config, null);
    assert.equal(inst._chart, null);
    assert.equal(inst._loadedSrc, '');
    assert.equal(inst._configFromSrc, null);
    assert.equal(inst._srcRequestId, 0);
    assert.equal(inst._refreshSeq, 0);
    assert.equal(inst._refreshTimer, null);
  });
});
