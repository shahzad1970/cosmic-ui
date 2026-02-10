import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

/*
 * Tests for UITabs and UITab.
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

const tabsMod = await import('../../src/components/tab/tabs.js').catch(e => { console.error(e); return null; });
const tabMod  = await import('../../src/components/tab/tab.js').catch(e => { console.error(e); return null; });

/* ================================================================== */
/*  UITabs                                                             */
/* ================================================================== */
describe('UITabs module', () => {
  it('exports the UITabs class', () => {
    assert.ok(tabsMod, 'Module should load without throwing');
    assert.equal(typeof tabsMod.UITabs, 'function');
  });

  it('is registered as ui-tabs', () => {
    const ctor = globalThis.customElements.get('ui-tabs');
    assert.ok(ctor, 'ui-tabs should be registered');
    assert.equal(ctor, tabsMod.UITabs);
  });

  it('declares all 5 static properties', () => {
    const props = tabsMod.UITabs.properties;
    for (const key of ['background', 'color', 'size', 'placement', 'selected']) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
    assert.equal(Object.keys(props).length, 5, 'Should have exactly 5 properties');
  });

  it('has correct default values', () => {
    const p = tabsMod.UITabs.properties;
    assert.equal(p.background.default, '');
    assert.equal(p.color.default, '');
    assert.equal(p.size.default, '');
    assert.equal(p.placement.default, 'top');
    assert.equal(p.selected.default, 0);
  });

  it('selected is Number type', () => {
    assert.equal(tabsMod.UITabs.properties.selected.type, Number);
  });

  it('placement is String type', () => {
    assert.equal(tabsMod.UITabs.properties.placement.type, String);
  });

  it('all properties reflect', () => {
    const p = tabsMod.UITabs.properties;
    for (const key of Object.keys(p)) {
      assert.equal(p[key].reflect, true, `${key} should reflect`);
    }
  });

  it('does not override attributeChangedCallback', () => {
    const own = Object.getOwnPropertyDescriptor(tabsMod.UITabs.prototype, 'attributeChangedCallback');
    assert.equal(own, undefined, 'Should not have own attributeChangedCallback');
  });

  it('has merged _applyStyles (not separate methods)', () => {
    assert.equal(typeof tabsMod.UITabs.prototype._applyStyles, 'function');
    assert.equal(tabsMod.UITabs.prototype._applySize, undefined, 'Should not have _applySize');
    assert.equal(tabsMod.UITabs.prototype._applyColors, undefined, 'Should not have _applyColors');
  });

  it('has _update override', () => {
    assert.equal(typeof tabsMod.UITabs.prototype._update, 'function');
  });

  it('event handlers are bound methods (not arrow class fields)', () => {
    // Bound methods exist on prototype, arrow fields would only exist on instances
    assert.equal(typeof tabsMod.UITabs.prototype._handleClick, 'function');
    assert.equal(typeof tabsMod.UITabs.prototype._handleKeyDown, 'function');
  });

  it('has connectedCallback and disconnectedCallback', () => {
    assert.equal(typeof tabsMod.UITabs.prototype.connectedCallback, 'function');
    assert.equal(typeof tabsMod.UITabs.prototype.disconnectedCallback, 'function');
  });

  it('has public select method', () => {
    assert.equal(typeof tabsMod.UITabs.prototype.select, 'function');
  });

  it('has _syncTabs method', () => {
    assert.equal(typeof tabsMod.UITabs.prototype._syncTabs, 'function');
  });

  /* ── Styles ── */

  it('static styles() returns non-empty CSS', () => {
    const css = tabsMod.UITabs.styles();
    assert.ok(css.length > 0);
    assert.ok(css.includes(':host'));
  });

  it('styles include tablist, tab, and panels', () => {
    const css = tabsMod.UITabs.styles();
    assert.ok(css.includes('.tablist'));
    assert.ok(css.includes('.tab'));
    assert.ok(css.includes('.panels'));
  });

  it('styles include active indicator line', () => {
    const css = tabsMod.UITabs.styles();
    assert.ok(css.includes('aria-selected="true"]::after'));
  });

  it('styles include bottom placement rule', () => {
    const css = tabsMod.UITabs.styles();
    assert.ok(css.includes('placement="bottom"'));
    assert.ok(css.includes('column-reverse'));
  });

  it('styles include start/end vertical placement rules', () => {
    const css = tabsMod.UITabs.styles();
    assert.ok(css.includes('placement="start"'));
    assert.ok(css.includes('placement="end"'));
    assert.ok(css.includes('flex-direction: row'));
    assert.ok(css.includes('row-reverse'));
  });

  it('styles include vertical indicator for start/end', () => {
    const css = tabsMod.UITabs.styles();
    assert.ok(css.includes('width: 0.15em'));
  });

  it('styles include disabled tab styling', () => {
    const css = tabsMod.UITabs.styles();
    assert.ok(css.includes('aria-disabled="true"'));
    assert.ok(css.includes('cursor: not-allowed'));
  });

  it('styles include focus-visible ring', () => {
    const css = tabsMod.UITabs.styles();
    assert.ok(css.includes('focus-visible'));
    assert.ok(css.includes('--ui-focus-ring'));
  });

  it('styles show active ui-tab and hide inactive', () => {
    const css = tabsMod.UITabs.styles();
    assert.ok(css.includes('::slotted(ui-tab)'));
    assert.ok(css.includes('::slotted(ui-tab[active])'));
  });

  /* ── Render ── */

  it('render includes tablist and slot', () => {
    const inst = Object.create(tabsMod.UITabs.prototype);
    const html = tabsMod.UITabs.prototype.render.call(inst);
    assert.ok(html.includes('role="tablist"'));
    assert.ok(html.includes('<slot>'));
    assert.ok(html.includes('class="panels"'));
  });
});

/* ================================================================== */
/*  UITab                                                              */
/* ================================================================== */
describe('UITab module', () => {
  it('exports the UITab class', () => {
    assert.ok(tabMod, 'Module should load without throwing');
    assert.equal(typeof tabMod.UITab, 'function');
  });

  it('is registered as ui-tab', () => {
    const ctor = globalThis.customElements.get('ui-tab');
    assert.ok(ctor, 'ui-tab should be registered');
    assert.equal(ctor, tabMod.UITab);
  });

  it('declares all 5 static properties', () => {
    const props = tabMod.UITab.properties;
    for (const key of ['label', 'disabled', 'active', 'background', 'color']) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
    assert.equal(Object.keys(props).length, 5, 'Should have exactly 5 properties');
  });

  it('has correct default values', () => {
    const p = tabMod.UITab.properties;
    assert.equal(p.label.default, '');
    assert.equal(p.disabled.default, false);
    assert.equal(p.active.default, false);
    assert.equal(p.background.default, '');
    assert.equal(p.color.default, '');
  });

  it('label is String type', () => {
    assert.equal(tabMod.UITab.properties.label.type, String);
  });

  it('disabled and active are Boolean type', () => {
    assert.equal(tabMod.UITab.properties.disabled.type, Boolean);
    assert.equal(tabMod.UITab.properties.active.type, Boolean);
  });

  it('all properties reflect', () => {
    const p = tabMod.UITab.properties;
    for (const key of Object.keys(p)) {
      assert.equal(p[key].reflect, true, `${key} should reflect`);
    }
  });

  it('does not override attributeChangedCallback', () => {
    const own = Object.getOwnPropertyDescriptor(tabMod.UITab.prototype, 'attributeChangedCallback');
    assert.equal(own, undefined, 'Should not have own attributeChangedCallback');
  });

  it('has _update and _applyStyles', () => {
    assert.equal(typeof tabMod.UITab.prototype._update, 'function');
    assert.equal(typeof tabMod.UITab.prototype._applyStyles, 'function');
  });

  it('static styles() returns non-empty CSS', () => {
    const css = tabMod.UITab.styles();
    assert.ok(css.length > 0);
    assert.ok(css.includes(':host'));
  });

  it('styles include padding for panel content', () => {
    const css = tabMod.UITab.styles();
    assert.ok(css.includes('padding'));
  });

  it('render includes slot', () => {
    const inst = Object.create(tabMod.UITab.prototype);
    const html = tabMod.UITab.prototype.render.call(inst);
    assert.ok(html.includes('<slot>'));
  });
});
