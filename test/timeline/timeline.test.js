import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

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

const mod = await import('../../src/components/timeline/timeline.js');

/* ── UITimeline ─────────────────────────────────────────── */

describe('UITimeline module', () => {
  it('exports the UITimeline class', () => {
    assert.equal(typeof mod.UITimeline, 'function');
  });

  it('is registered as a custom element', () => {
    assert.equal(mod.UITimeline.name, 'UITimeline');
  });

  it('declares 4 properties', () => {
    const keys = Object.keys(mod.UITimeline.properties);
    assert.deepEqual(keys, ['size', 'color', 'lineColor', 'alternate']);
  });

  it('has correct property defaults', () => {
    const p = mod.UITimeline.properties;
    assert.equal(p.size.default, '');
    assert.equal(p.color.default, '');
    assert.equal(p.lineColor.default, '');
    assert.equal(p.alternate.default, false);
  });

  it('has correct property types', () => {
    const p = mod.UITimeline.properties;
    assert.equal(p.size.type, String);
    assert.equal(p.color.type, String);
    assert.equal(p.lineColor.type, String);
    assert.equal(p.alternate.type, Boolean);
  });

  it('reflects all properties', () => {
    const p = mod.UITimeline.properties;
    for (const key of Object.keys(p)) {
      assert.equal(p[key].reflect, true, `${key} should reflect`);
    }
  });

  it('lineColor uses attribute "line-color"', () => {
    assert.equal(mod.UITimeline.properties.lineColor.attribute, 'line-color');
  });

  it('styles include line and alternate rules', () => {
    const css = mod.UITimeline.styles();
    assert.ok(css.includes('.line'));
    assert.ok(css.includes('[alternate]'));
    assert.ok(css.includes('--_line-color'));
  });

  it('render includes line div and slot', () => {
    const inst = Object.create(mod.UITimeline.prototype);
    const html = mod.UITimeline.prototype.render.call(inst);
    assert.ok(html.includes('class="line"'));
    assert.ok(html.includes('<slot>'));
  });
});

/* ── UITimelineItem ─────────────────────────────────────── */

describe('UITimelineItem module', () => {
  it('exports the UITimelineItem class', () => {
    assert.equal(typeof mod.UITimelineItem, 'function');
  });

  it('is registered as a custom element', () => {
    assert.equal(mod.UITimelineItem.name, 'UITimelineItem');
  });

  it('declares 2 properties', () => {
    const keys = Object.keys(mod.UITimelineItem.properties);
    assert.deepEqual(keys, ['color', 'icon']);
  });

  it('has correct property defaults', () => {
    const p = mod.UITimelineItem.properties;
    assert.equal(p.color.default, '');
    assert.equal(p.icon.default, '');
  });

  it('has correct property types', () => {
    const p = mod.UITimelineItem.properties;
    for (const key of Object.keys(p)) {
      assert.equal(p[key].type, String, `${key} should be String`);
    }
  });

  it('reflects all properties', () => {
    const p = mod.UITimelineItem.properties;
    for (const key of Object.keys(p)) {
      assert.equal(p[key].reflect, true, `${key} should reflect`);
    }
  });

  it('styles include dot rules', () => {
    const css = mod.UITimelineItem.styles();
    assert.ok(css.includes('.dot'));
    assert.ok(css.includes('.has-icon'));
  });

  it('styles reference --_dot-color with --_timeline-color fallback', () => {
    const css = mod.UITimelineItem.styles();
    assert.ok(css.includes('--_dot-color'));
    assert.ok(css.includes('--_timeline-color'), 'dot should fall back to timeline colour');
  });

  it('styles include alternate _alt layout rules', () => {
    const css = mod.UITimelineItem.styles();
    assert.ok(css.includes('[_alt="left"]'));
    assert.ok(css.includes('[_alt="right"]'));
  });

  it('styles hide last-child bottom padding', () => {
    const css = mod.UITimelineItem.styles();
    assert.ok(css.includes(':last-child'));
  });

  it('render shows icon in dot when set', () => {
    const inst = Object.create(mod.UITimelineItem.prototype);
    inst._color = '';
    inst._icon = 'check';
    const html = mod.UITimelineItem.prototype.render.call(inst);
    assert.ok(html.includes('has-icon'));
    assert.ok(html.includes('<ui-icon'));
    assert.ok(html.includes('check'));
  });

  it('render shows plain dot when no icon', () => {
    const inst = Object.create(mod.UITimelineItem.prototype);
    inst._color = '';
    inst._icon = '';
    const html = mod.UITimelineItem.prototype.render.call(inst);
    assert.ok(html.includes('class="dot"'));
    assert.ok(!html.includes('has-icon'));
  });

  it('render includes single default slot', () => {
    const inst = Object.create(mod.UITimelineItem.prototype);
    inst._color = '';
    inst._icon = '';
    const html = mod.UITimelineItem.prototype.render.call(inst);
    assert.ok(html.includes('<slot>'));
  });
});
