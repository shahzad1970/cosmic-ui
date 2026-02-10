/**
 * UIUtils — Singleton hosting shared helpers for all UI components.
 *
 * Import selectively:
 *   import { resolveSize, resolveColor } from '../../core/ui-utils.js';
 *
 * Or grab the whole bag:
 *   import * as utils from '../../core/ui-utils.js';
 */

/* ------------------------------------------------------------------ */
/*  Size helpers                                                       */
/* ------------------------------------------------------------------ */

/**
 * Map of CSS named font-sizes → em multipliers.
 * Based on the typical browser scale (medium = 1em).
 */
const SIZE_MAP = Object.freeze({
  'xx-small':  0.5625,   //  9px @ 16px base
  'x-small':   0.625,    // 10px
  'small':     0.8125,   // 13px
  'medium':    1,         // 16px
  'large':     1.125,    // 18px
  'x-large':   1.5,      // 24px
  'xx-large':  2,         // 32px
  'xxx-large': 3,         // 48px
});

/**
 * Resolve a size token to a CSS-ready value.
 *
 * - Named sizes (`small`, `x-large`, …) are converted to `em` values.
 * - Any other string (e.g. `"10px"`, `"2rem"`, `"clamp(…)"`) is returned as-is.
 *
 * @param {string} size — A named size keyword or arbitrary CSS length.
 * @returns {string|undefined}  CSS value ready for `font-size`.
 *
 * @example
 *   resolveSize('large')   // '1.125em'
 *   resolveSize('xx-small') // '0.5625em'
 *   resolveSize('10px')    // '10px'
 *   resolveSize('2rem')    // '2rem'
 */
export function resolveSize(size) {
  if (!size) return undefined;
  const key = size.trim().toLowerCase();
  if (key in SIZE_MAP) {
    return `${SIZE_MAP[key]}em`;
  }
  return size; // pass-through arbitrary CSS values
}

/**
 * Check whether a value is one of the named size keywords.
 *
 * @param {string} size
 * @returns {boolean}
 */
export function isNamedSize(size) {
  return size != null && size.trim().toLowerCase() in SIZE_MAP;
}

/**
 * All recognised named size keywords (sorted small → large).
 * @type {ReadonlyArray<string>}
 */
export const NAMED_SIZES = Object.freeze(Object.keys(SIZE_MAP));

/* ------------------------------------------------------------------ */
/*  Colour helpers                                                     */
/* ------------------------------------------------------------------ */

/**
 * Pattern that matches a palette token: `<family>-<shade>`.
 * e.g. "red-600", "indigo-50", "gray-950"
 */
const PALETTE_RE = /^([a-z]+)-(\d{2,3})$/;

/**
 * Resolve a colour token to a CSS-ready value.
 *
 * - Palette tokens (`red-600`, `indigo-50`) are converted to `var(--ui-red-600)`.
 * - Any other string (e.g. `#ef4444`, `rgb(…)`, `oklch(…)`) is returned as-is.
 *
 * @param {string} value — A palette token or arbitrary CSS colour.
 * @returns {string|undefined}  CSS value ready for `background` / `color`.
 *
 * @example
 *   resolveColor('red-600')   // 'var(--ui-red-600)'
 *   resolveColor('indigo-50') // 'var(--ui-indigo-50)'
 *   resolveColor('#ef4444')   // '#ef4444'
 *   resolveColor('salmon')    // 'salmon'
 */
export function resolveColor(value) {
  if (!value) return undefined;
  const trimmed = value.trim().toLowerCase();
  if (PALETTE_RE.test(trimmed)) {
    return `var(--ui-${trimmed})`;
  }
  return value; // pass-through raw CSS colours
}

/**
 * Check whether a value is a recognised palette token.
 *
 * @param {string} value
 * @returns {boolean}
 */
export function isPaletteToken(value) {
  return value != null && PALETTE_RE.test(value.trim().toLowerCase());
}

/**
 * Given a palette token like `"red-600"`, return the next-darker shade
 * for use as a hover colour (e.g. `"red-700"`).
 *
 * Returns `undefined` if the value isn't a palette token or is already
 * at the darkest shade (950).
 *
 * @param {string} token — e.g. `"red-600"`
 * @returns {string|undefined}  e.g. `"var(--ui-red-700)"`
 */
const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

export function resolveColorHover(token) {
  if (!token) return undefined;
  const trimmed = token.trim().toLowerCase();
  const match = trimmed.match(PALETTE_RE);
  if (!match) return undefined;
  const [, family, shadeStr] = match;
  const shade = Number(shadeStr);
  const idx = SHADES.indexOf(shade);
  if (idx === -1 || idx >= SHADES.length - 1) return undefined;
  return `var(--ui-${family}-${SHADES[idx + 1]})`;
}

/**
 * Given a palette token like `"red-600"`, return a shade that is
 * `steps` positions lighter on the palette scale.
 *
 * Returns `undefined` if the value isn't a palette token or is already
 * at the lightest shade (50).
 *
 * @param {string} token — e.g. `"indigo-500"`
 * @param {number} [steps=1] — how many shade steps lighter
 * @returns {string|undefined}  e.g. `"var(--ui-indigo-400)"`
 */
export function resolveColorLighter(token, steps = 1) {
  if (!token) return undefined;
  const trimmed = token.trim().toLowerCase();
  const match = trimmed.match(PALETTE_RE);
  if (!match) return undefined;
  const [, family, shadeStr] = match;
  const shade = Number(shadeStr);
  const idx = SHADES.indexOf(shade);
  if (idx === -1) return undefined;
  const newIdx = Math.max(0, idx - steps);
  return `var(--ui-${family}-${SHADES[newIdx]})`;
}

/**
 * Given a palette token like `"red-400"`, return a shade that is
 * `steps` positions darker on the palette scale.
 *
 * Returns `undefined` if the value isn't a palette token or is already
 * at the darkest shade (950).
 *
 * @param {string} token — e.g. `"indigo-500"`
 * @param {number} [steps=1] — how many shade steps darker
 * @returns {string|undefined}  e.g. `"var(--ui-indigo-700)"`
 */
export function resolveColorDarker(token, steps = 1) {
  if (!token) return undefined;
  const trimmed = token.trim().toLowerCase();
  const match = trimmed.match(PALETTE_RE);
  if (!match) return undefined;
  const [, family, shadeStr] = match;
  const shade = Number(shadeStr);
  const idx = SHADES.indexOf(shade);
  if (idx === -1) return undefined;
  const newIdx = Math.min(SHADES.length - 1, idx + steps);
  return `var(--ui-${family}-${SHADES[newIdx]})`;
}

/* ------------------------------------------------------------------ */
/*  Elevation helpers                                                  */
/* ------------------------------------------------------------------ */

/**
 * Elevation levels: 1 (subtle) through 5 (dramatic).
 *
 * Each level maps to a CSS `box-shadow` value that produces a
 * progressively more prominent lift effect.
 */
const ELEVATION_MAP = Object.freeze({
  '1': '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)',
  '2': '0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)',
  '3': '0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)',
  '4': '0 20px 25px rgba(0,0,0,0.1), 0 8px 10px rgba(0,0,0,0.04)',
  '5': '0 25px 50px rgba(0,0,0,0.15), 0 12px 24px rgba(0,0,0,0.08)',
});

/**
 * Resolve an elevation token to a CSS `box-shadow` value.
 *
 * Accepts numeric strings `"1"` – `"5"`.
 * Any other string is returned as-is so consumers can pass
 * arbitrary `box-shadow` CSS.
 *
 * @param {string} value — elevation level or raw CSS box-shadow
 * @returns {string|undefined}
 *
 * @example
 *   resolveElevation('2')   // '0 4px 6px rgba(…), …'
 *   resolveElevation('5')   // '0 25px 50px rgba(…), …'
 *   resolveElevation('')    // undefined
 */
export function resolveElevation(value) {
  if (!value) return undefined;
  const key = String(value).trim();
  if (key in ELEVATION_MAP) return ELEVATION_MAP[key];
  return value; // pass-through arbitrary box-shadow CSS
}

/* ------------------------------------------------------------------ */
/*  Contrast / luminance helpers                                       */
/* ------------------------------------------------------------------ */

/**
 * Resolve any CSS colour string to an `[r, g, b]` array (0-255).
 *
/**
 * Simple colour-resolution cache to avoid repeated DOM round-trips.
 * @type {Map<string, number[]|null>}
 */
const _rgbCache = new Map();
const _RGB_CACHE_MAX = 200;

/**
 * Resolve any CSS colour string to an `[r, g, b]` array (0-255).
 *
 * Works for palette tokens (`red-600`), hex (`#ef4444`), named colours
 * (`salmon`), `rgb(…)`, `hsl(…)`, `oklch(…)` — anything the browser
 * understands.
 *
 * Results are cached to avoid repeated DOM round-trips.
 * Returns `null` in non-browser environments or if the colour can't be parsed.
 *
 * @param {string} value — palette token or CSS colour
 * @returns {number[]|null}  `[r, g, b]` or `null`
 */
export function resolveRGB(value) {
  if (!value || typeof document === 'undefined') return null;

  const cacheKey = value.trim().toLowerCase();
  if (_rgbCache.has(cacheKey)) return _rgbCache.get(cacheKey);

  // If it's a palette token, read the computed CSS variable.
  let cssValue = value;
  if (PALETTE_RE.test(cacheKey)) {
    const computed = getComputedStyle(document.documentElement)
      .getPropertyValue(`--ui-${cacheKey}`)
      .trim();
    if (!computed) { _rgbCache.set(cacheKey, null); return null; }
    cssValue = computed;
  }

  // Use a temporary element to let the browser resolve to rgb.
  const el = document.createElement('span');
  el.style.color = cssValue;
  el.style.display = 'none';
  document.body.appendChild(el);
  const resolved = getComputedStyle(el).color; // always "rgb(r, g, b)" or "rgba(…)"
  el.remove();

  const match = resolved.match(/rgba?\(\s*(\d+),\s*(\d+),\s*(\d+)/);
  const rgb = match ? [Number(match[1]), Number(match[2]), Number(match[3])] : null;

  // Evict oldest entries when cache is full.
  while (_rgbCache.size >= _RGB_CACHE_MAX) {
    const first = _rgbCache.keys().next().value;
    _rgbCache.delete(first);
  }
  _rgbCache.set(cacheKey, rgb);
  return rgb;
}

/**
 * Compute the relative luminance of an `[r, g, b]` colour (0-255).
 * Per WCAG 2.0 formula.
 *
 * @param {number[]} rgb
 * @returns {number}  Luminance between 0 (black) and 1 (white).
 */
export function luminance([r, g, b]) {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Return `'#fff'` or `'#000'` — whichever has better contrast against the
 * given background colour.
 *
 * Accepts palette tokens (`red-600`) or any CSS colour (`#ef4444`, `salmon`).
 * Falls back to `'#000'` if the colour can't be resolved.
 *
 * @param {string} bgValue — palette token or CSS colour
 * @returns {string}  `'#fff'` or `'#000'`
 *
 * @example
 *   contrastColorFor('indigo-500') // '#fff'
 *   contrastColorFor('gray-200')   // '#000'
 *   contrastColorFor('#fde68a')    // '#000'
 */
export function contrastColorFor(bgValue) {
  const rgb = resolveRGB(bgValue);
  if (!rgb) return '#000';
  return luminance(rgb) > 0.179 ? '#000' : '#fff';
}
