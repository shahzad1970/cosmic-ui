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
  // Minimal document / canvas stub for parseColor's named-colour path
  globalThis.document = globalThis.document ?? {
    createElement() { return { width: 0, height: 0, getContext() { return { fillStyle: '', fillRect() {} }; } }; },
  };
}

const mod = await import('../../src/components/input/color.js').catch((e) => {
  console.error('Module load error:', e);
  return null;
});

describe('UIInputColor module', () => {

  /* ── Basics ── */

  it('exports the UIInputColor class', () => {
    assert.ok(mod, 'Module should load without throwing');
    assert.equal(typeof mod.UIInputColor, 'function');
  });

  it('declares all expected static properties', () => {
    const props = mod.UIInputColor.properties;
    const expected = ['value', 'name', 'label', 'help', 'error', 'size', 'disabled', 'required'];
    for (const key of expected) {
      assert.ok(key in props, `Missing property: ${key}`);
    }
  });

  it('has correct default values', () => {
    const p = mod.UIInputColor.properties;
    assert.equal(p.value.default, '#6366f1');
    assert.equal(p.name.default, '');
    assert.equal(p.label.default, '');
    assert.equal(p.help.default, '');
    assert.equal(p.error.default, '');
    assert.equal(p.size.default, '');
    assert.equal(p.disabled.default, false);
    assert.equal(p.required.default, false);
  });

  it('Boolean properties have correct type', () => {
    const p = mod.UIInputColor.properties;
    for (const key of ['disabled', 'required']) {
      assert.equal(p[key].type, Boolean, `${key} should be Boolean`);
    }
  });

  it('String properties have correct type', () => {
    const p = mod.UIInputColor.properties;
    for (const key of ['value', 'name', 'label', 'help', 'error', 'size']) {
      assert.equal(p[key].type, String, `${key} should be String`);
    }
  });

  it('all properties reflect', () => {
    const p = mod.UIInputColor.properties;
    for (const key of Object.keys(p)) {
      assert.equal(p[key].reflect, true, `${key} should reflect`);
    }
  });

  /* ── Theme palette data ── */

  it('has a static _THEME_PALETTE array with ≥198 entries', () => {
    const tp = mod.UIInputColor._THEME_PALETTE;
    assert.ok(Array.isArray(tp));
    assert.ok(tp.length >= 198, 'Should have at least 198 theme swatches (18×11)');
    assert.ok(tp[0].token, 'Each entry should have a token name');
    assert.ok(tp[0].hex, 'Each entry should have a hex value');
    assert.ok(tp[0].hex.startsWith('#'), 'Hex value should start with #');
  });

  it('_THEME_PALETTE covers all 18 colour families', () => {
    const tp = mod.UIInputColor._THEME_PALETTE;
    const families = ['gray','red','orange','amber','yellow','lime','green','emerald',
                      'teal','cyan','sky','blue','indigo','violet','purple','fuchsia','pink','rose'];
    for (const fam of families) {
      assert.ok(tp.some(e => e.token.startsWith(fam + '-')), `Should include ${fam}`);
    }
  });

  it('_THEME_PALETTE includes all 11 shades (50–950) for each family', () => {
    const tokens = mod.UIInputColor._THEME_PALETTE.map(e => e.token);
    const shades = [50,100,200,300,400,500,600,700,800,900,950];
    for (const s of shades) {
      assert.ok(tokens.includes(`red-${s}`), `Should include red-${s}`);
      assert.ok(tokens.includes(`blue-${s}`), `Should include blue-${s}`);
    }
    assert.ok(tokens.includes('indigo-500'));
  });

  it('has _THEME_FAMILIES array with 18 entries', () => {
    const fams = mod.UIInputColor._THEME_FAMILIES;
    assert.ok(Array.isArray(fams));
    assert.equal(fams.length, 18);
    assert.ok(fams[0].name && fams[0].hex, 'Each entry should have name and hex');
  });

  it('has _THEME_SHADES array with 11 entries', () => {
    const shades = mod.UIInputColor._THEME_SHADES;
    assert.ok(Array.isArray(shades));
    assert.equal(shades.length, 11);
    assert.equal(shades[0], 50);
    assert.equal(shades[10], 950);
  });

  /* ── Colour conversion helpers ── */

  it('parseColor parses hex colours', () => {
    const c = mod.UIInputColor.parseColor('#ff0000');
    assert.ok(c);
    assert.equal(c.h, 0);
    assert.equal(c.s, 100);
    assert.equal(c.l, 50);
    assert.equal(c.a, 1);
  });

  it('parseColor parses 3-char hex', () => {
    const c = mod.UIInputColor.parseColor('#f00');
    assert.ok(c);
    assert.equal(c.h, 0);
    assert.equal(c.a, 1);
  });

  it('parseColor parses hex with alpha', () => {
    const c = mod.UIInputColor.parseColor('#ff000080');
    assert.ok(c);
    assert.equal(c.h, 0);
    assert.ok(c.a > 0.49 && c.a < 0.51, 'Alpha should be ~0.5');
  });

  it('parseColor parses rgb()', () => {
    const c = mod.UIInputColor.parseColor('rgb(0, 128, 255)');
    assert.ok(c);
    assert.ok(c.h >= 200 && c.h <= 220);
    assert.equal(c.a, 1);
  });

  it('parseColor parses rgba()', () => {
    const c = mod.UIInputColor.parseColor('rgba(255, 0, 0, 0.5)');
    assert.ok(c);
    assert.equal(c.h, 0);
    assert.equal(c.a, 0.5);
  });

  it('parseColor parses hsl()', () => {
    const c = mod.UIInputColor.parseColor('hsl(120, 100%, 50%)');
    assert.ok(c);
    assert.equal(c.h, 120);
    assert.equal(c.s, 100);
    assert.equal(c.l, 50);
  });

  it('parseColor parses hsla()', () => {
    const c = mod.UIInputColor.parseColor('hsla(240, 50%, 50%, 0.8)');
    assert.ok(c);
    assert.equal(c.h, 240);
    assert.equal(c.a, 0.8);
  });

  it('parseColor resolves theme tokens', () => {
    const c = mod.UIInputColor.parseColor('red-500');
    assert.ok(c, 'Should parse red-500 token');
    assert.equal(c.h, 0);
  });

  it('parseColor returns null for invalid input', () => {
    assert.equal(mod.UIInputColor.parseColor(null), null);
    assert.equal(mod.UIInputColor.parseColor(''), null);
    assert.equal(mod.UIInputColor.parseColor('notacolor123!'), null);
  });

  it('_hslToRgb converts correctly', () => {
    // Pure red
    const r = mod.UIInputColor._hslToRgb(0, 100, 50);
    assert.equal(r.r, 255);
    assert.equal(r.g, 0);
    assert.equal(r.b, 0);
    // Pure green
    const g = mod.UIInputColor._hslToRgb(120, 100, 50);
    assert.equal(g.r, 0);
    assert.equal(g.g, 255);
    assert.equal(g.b, 0);
    // White
    const w = mod.UIInputColor._hslToRgb(0, 0, 100);
    assert.equal(w.r, 255);
    assert.equal(w.g, 255);
    assert.equal(w.b, 255);
  });

  it('_hslToHex produces correct hex', () => {
    assert.equal(mod.UIInputColor._hslToHex(0, 100, 50), '#ff0000');
    assert.equal(mod.UIInputColor._hslToHex(120, 100, 50), '#00ff00');
    assert.equal(mod.UIInputColor._hslToHex(0, 0, 0), '#000000');
  });

  it('_hslToHex includes alpha when < 1', () => {
    const hex = mod.UIInputColor._hslToHex(0, 100, 50, 0.5);
    assert.ok(hex.length === 9, 'Should be 9-char hex with alpha');
    assert.ok(hex.startsWith('#ff0000'));
  });

  it('formatColor formats hex', () => {
    const val = mod.UIInputColor.formatColor(0, 100, 50, 1, 'hex');
    assert.equal(val, '#ff0000');
  });

  it('formatColor formats rgb', () => {
    const val = mod.UIInputColor.formatColor(0, 100, 50, 1, 'rgb');
    assert.equal(val, 'rgb(255, 0, 0)');
  });

  it('formatColor formats rgba with alpha', () => {
    const val = mod.UIInputColor.formatColor(0, 100, 50, 0.5, 'rgb');
    assert.equal(val, 'rgba(255, 0, 0, 0.5)');
  });

  it('formatColor formats hsl', () => {
    const val = mod.UIInputColor.formatColor(120, 50, 50, 1, 'hsl');
    assert.equal(val, 'hsl(120, 50%, 50%)');
  });

  it('formatColor formats hsla with alpha', () => {
    const val = mod.UIInputColor.formatColor(120, 50, 50, 0.3, 'hsl');
    assert.equal(val, 'hsla(120, 50%, 50%, 0.3)');
  });

  it('_hsbToHsl and _hslToHsb are inverse', () => {
    const hsl = mod.UIInputColor._hsbToHsl(200, 80, 60);
    const hsb = mod.UIInputColor._hslToHsb(hsl.h, hsl.s, hsl.l);
    assert.equal(hsb.h, 200);
    assert.ok(Math.abs(hsb.s - 80) <= 1);
    assert.ok(Math.abs(hsb.b - 60) <= 1);
  });

  /* ── Recent colours ── */

  it('has static _recentColors and _addRecent', () => {
    assert.ok(Array.isArray(mod.UIInputColor._recentColors));
    assert.equal(typeof mod.UIInputColor._addRecent, 'function');
  });

  it('_addRecent adds and deduplicates', () => {
    mod.UIInputColor._recentColors.length = 0;
    mod.UIInputColor._addRecent('#aaa');
    mod.UIInputColor._addRecent('#bbb');
    mod.UIInputColor._addRecent('#aaa');
    assert.equal(mod.UIInputColor._recentColors[0], '#aaa');
    assert.equal(mod.UIInputColor._recentColors.length, 2);
  });

  it('_addRecent caps at _MAX_RECENT', () => {
    mod.UIInputColor._recentColors.length = 0;
    for (let i = 0; i < 20; i++) mod.UIInputColor._addRecent(`#c${i}`);
    assert.ok(mod.UIInputColor._recentColors.length <= mod.UIInputColor._MAX_RECENT);
  });

  /* ── CSS ── */

  it('has static styles() with expected CSS selectors', () => {
    const css = mod.UIInputColor.styles();
    const expected = [
      '.swatch', '.panel', ':host', ':host([disabled])', ':host([data-open])',
      '.trigger', '.color-input', '.native-input', '.help', '.error-msg',
      '.panel-tabs', '.panel-tab', '.theme-palette', '.theme-swatch',
      '.sat-bright-canvas', '.hue-track', '.alpha-track',
      '.format-btn', '.recent-swatch', '.slider-thumb',
    ];
    for (const sel of expected) {
      assert.ok(css.includes(sel), `Should include "${sel}" styles`);
    }
  });

  /* ── Render ── */

  it('render outputs correct HTML structure', () => {
    const inst = Object.create(mod.UIInputColor.prototype);
    inst.value = '#ef4444';
    inst.label = 'Brand';
    inst.help = 'Pick a colour';
    inst.error = '';
    inst.required = true;
    inst._format = 'hex';
    const html = inst.render();
    assert.ok(html.includes('Brand'));
    assert.ok(html.includes('Pick a colour'));
    assert.ok(html.includes('*'));
    assert.ok(html.includes('part="label"'));
    assert.ok(html.includes('part="trigger"'));
    assert.ok(html.includes('part="panel"'));
    assert.ok(html.includes('part="help"'));
    assert.ok(html.includes('part="error"'));
    assert.ok(html.includes('class="theme-swatch"'));
    assert.ok(html.includes('data-tab="custom"'));
    assert.ok(html.includes('data-tab="theme"'));
    assert.ok(html.includes('class="color-input"'));
    assert.ok(html.includes('type="color"'));
    assert.ok(html.includes('class="sat-bright-canvas"'));
    assert.ok(html.includes('class="format-btn"'));
    assert.ok(html.includes('hue-track'));
    assert.ok(html.includes('alpha-track'));
  });

  it('render escapes HTML in label, help, and error', () => {
    const inst = Object.create(mod.UIInputColor.prototype);
    inst.value = '#000';
    inst.label = '<script>alert("x")</script>';
    inst.help = '<b>bold</b>';
    inst.error = '<img>';
    inst.required = false;
    inst._format = 'hex';
    const html = inst.render();
    assert.ok(!html.includes('<script>'));
    assert.ok(!html.includes('<b>'));
    assert.ok(!html.includes('<img>'));
  });

  it('render shows asterisk only when required is true', () => {
    const inst = Object.create(mod.UIInputColor.prototype);
    inst.value = '#000';
    inst.label = 'Test';
    inst.help = '';
    inst.error = '';
    inst._format = 'hex';
    inst.required = false;
    assert.ok(!inst.render().includes(' *'));
    inst.required = true;
    assert.ok(inst.render().includes(' *'));
  });

  it('render includes theme token swatches with data-token', () => {
    const inst = Object.create(mod.UIInputColor.prototype);
    inst.value = 'red-500';
    inst.label = '';
    inst.help = '';
    inst.error = '';
    inst.required = false;
    inst._format = 'hex';
    const html = inst.render();
    assert.ok(html.includes('data-token="red-500"'));
    assert.ok(html.includes('data-token="blue-300"'));
    assert.ok(html.includes('data-token="indigo-700"'));
  });

  it('render shows theme tab first and active by default', () => {
    const inst = Object.create(mod.UIInputColor.prototype);
    inst.value = '#000';
    inst.label = '';
    inst.help = '';
    inst.error = '';
    inst.required = false;
    inst._format = 'hex';
    const html = inst.render();
    const themeTabIdx = html.indexOf('data-tab="theme"');
    const customTabIdx = html.indexOf('data-tab="custom"');
    assert.ok(themeTabIdx < customTabIdx, 'Theme tab should appear before custom tab');
    // The theme tab should have data-active
    const activeIdx = html.indexOf('data-active');
    assert.ok(activeIdx < customTabIdx, 'data-active should be on the theme tab');
  });

  /* ── Methods ── */

  it('is registered as ui-input-color', () => {
    assert.equal(globalThis.customElements.get('ui-input-color'), mod.UIInputColor);
  });

  it('has _toHex6 method', () => {
    const proto = mod.UIInputColor.prototype;
    assert.equal(typeof proto._toHex6, 'function');
    assert.equal(proto._toHex6('#ff0000'), '#ff0000');
    assert.equal(proto._toHex6('#f00'), '#ff0000');
  });

  it('_toHex6 resolves theme tokens to hex', () => {
    const proto = mod.UIInputColor.prototype;
    assert.equal(proto._toHex6('red-500'), '#ef4444');
    assert.equal(proto._toHex6('blue-300'), '#93c5fd');
    assert.equal(proto._toHex6('indigo-500'), '#6366f1');
  });

  it('has open/close panel methods', () => {
    assert.equal(typeof mod.UIInputColor.prototype._openPanel, 'function');
    assert.equal(typeof mod.UIInputColor.prototype._closePanel, 'function');
  });

  it('has _onThemeSwatchClick method', () => {
    assert.equal(typeof mod.UIInputColor.prototype._onThemeSwatchClick, 'function');
  });

  it('has _onTabClick method', () => {
    assert.equal(typeof mod.UIInputColor.prototype._onTabClick, 'function');
  });

  it('has _setValueFromInput method', () => {
    assert.equal(typeof mod.UIInputColor.prototype._setValueFromInput, 'function');
  });

  it('has _attachListeners method', () => {
    assert.equal(typeof mod.UIInputColor.prototype._attachListeners, 'function');
  });

  it('has connectedCallback and disconnectedCallback', () => {
    assert.equal(typeof mod.UIInputColor.prototype.connectedCallback, 'function');
    assert.equal(typeof mod.UIInputColor.prototype.disconnectedCallback, 'function');
  });

  it('has canvas and slider pointer handlers', () => {
    const proto = mod.UIInputColor.prototype;
    assert.equal(typeof proto._onCanvasPointerDown, 'function');
    assert.equal(typeof proto._onHuePointerDown, 'function');
    assert.equal(typeof proto._onAlphaPointerDown, 'function');
    assert.equal(typeof proto._onPointerMove, 'function');
    assert.equal(typeof proto._onPointerUp, 'function');
  });

  it('has _drawCanvas method', () => {
    assert.equal(typeof mod.UIInputColor.prototype._drawCanvas, 'function');
  });

  it('has _syncFromValue method', () => {
    assert.equal(typeof mod.UIInputColor.prototype._syncFromValue, 'function');
  });

  it('has _onFormatToggle method', () => {
    assert.equal(typeof mod.UIInputColor.prototype._onFormatToggle, 'function');
  });

  it('has _updateUI method', () => {
    assert.equal(typeof mod.UIInputColor.prototype._updateUI, 'function');
  });

  it('has _refreshRecent method', () => {
    assert.equal(typeof mod.UIInputColor.prototype._refreshRecent, 'function');
  });

  it('render returns a string', () => {
    const inst = Object.create(mod.UIInputColor.prototype);
    inst.value = '#000';
    inst.label = '';
    inst.help = '';
    inst.error = '';
    inst.required = false;
    inst._format = 'hex';
    const html = inst.render();
    assert.equal(typeof html, 'string');
    assert.ok(html.length > 0);
  });
});
