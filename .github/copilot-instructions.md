# Copilot Instructions

## Project overview
Pure-JavaScript custom web component library (similar to Web Awesome / Shoelace) with **zero external dependencies**. Components use Shadow DOM, adopted stylesheets, and vanilla JS — no build step required.

### Design philosophy
The framework aims to be **a complete replacement for raw HTML tags**. Consumers should build their entire UI using `ui-*` components and never use native HTML elements directly. For example, use `<ui-button>` instead of `<button>`, `<ui-input>` instead of `<input>`, etc.

- **Public API is `ui-*` only** — every user-facing element is a custom element.
- **Native elements stay inside Shadow DOM** — components use `<button>`, `<a>`, `<input>`, etc. internally for semantics and accessibility, but these are implementation details hidden from consumers.
- **Components should cover all common UI needs** — buttons, inputs, selects, text, headings, layout containers, badges, alerts, dialogs, etc.

## Directory layout
```
src/
  core/ui-component.js   ← Base class every component extends
  core/ui-theme.js       ← Global colour palette & design tokens (auto-injected)
  core/ui-utils.js       ← Shared utility functions (resolveSize, etc.)
  components/
    app/app.js           ← <ui-app> root container (app shell or page mode)
    app/banner.js        ← <ui-app-banner> top bar
    app/header.js        ← <ui-app-header> page header
    app/subheader.js     ← <ui-app-subheader> secondary header
    app/drawer.js        ← <ui-app-drawer> right sidebar (child of ui-app)
    app/main-header.js   ← <ui-app-main-header> main area header
    app/main.js          ← <ui-app-main> primary content area
    app/main-footer.js   ← <ui-app-main-footer> main area footer
    app/nav-header.js    ← <ui-app-nav-header> left panel header
    app/nav.js           ← <ui-app-nav> left panel
    app/nav-footer.js    ← <ui-app-nav-footer> left panel footer
    app/footer.js        ← <ui-app-footer> application footer
    button/button.js     ← <ui-button> component
  index.js               ← Public barrel — registers all elements
test/                    ← Node test-runner tests (node --test)
index.html               ← Live demo / visual playground
```

## Developer workflows
- **Dev server** — `npm run dev` (serves project on `localhost:3000` via `npx serve`)
- **Tests** — `npm test` (runs `node --test test/**/*.test.js`)
- No build/bundle step; source ships as ES modules.

## Architecture & conventions

### Creating a new component
1. Create `src/components/<name>/<name>.js`.
2. Import and extend `UIComponent` from `../../core/ui-component.js`.
3. Declare a `static properties = { … }` object for reflected attributes.
4. Override `static styles()` → return a CSS string (component-scoped via Shadow DOM).
5. Override `render()` → return an HTML string using `<slot>` for projected content.
6. Register the element: `customElements.define('ui-<name>', ClassName)`.
7. Re-export from `src/index.js`.

### Key patterns
- **Property reflection** — `static properties` entries auto-sync attribute ↔ property. Types: `String`, `Boolean`, `Number`. Example from `button.js`:
  ```js
  static properties = {
    background: { type: String,  default: 'gray-200', reflect: true },
    disabled:   { type: Boolean, default: false,       reflect: true },
  };
  ```
- **Styling** — CSS lives in `static styles()` as a template string. Use `:host` selectors for state styling. Expose CSS custom properties prefixed `--ui-` for theming.
- **Colours via attributes** — Components accept `background` and `color` attributes. Values can be palette tokens (e.g. `red-600`, `indigo-500`) which resolve to `var(--ui-red-600)`, or any raw CSS colour (`#fff`, `salmon`, `rgb(…)`). Use `resolveColor()` from `core/ui-utils.js` to translate. Hover states auto-darken via `resolveColorHover()`.
- **Sizing with `em`** — All dimensions (padding, border-radius, border-width, outline) use `em` so components scale with `font-size`. The `size` attribute accepts CSS named keywords (`xx-small` through `xxx-large`) or any CSS length (e.g. `10px`, `2rem`). Use `resolveSize()` from `core/ui-utils.js` to translate the value and apply it as `font-size` on `:host`.
- **Semantic text** — `<ui-text type="heading">` renders an `<h2>` inside Shadow DOM (bold, block, 1.5em default size). `<ui-text type="paragraph">` renders a `<p>`. Control heading size visually with the `size` attribute.
- **Shared utilities** — `core/ui-utils.js` is the singleton for cross-component helpers. Add any reusable function there (e.g. `resolveSize`, `resolveColor`). Import selectively: `import { resolveSize, resolveColor } from '../../core/ui-utils.js'`.
- **Events** — Use `this.emit('ui-<action>')` (inherited helper) which fires a composed, bubbling `CustomEvent`.
- **Slots** — Use a single default `<slot>` for projected content. Do not use named slots; consumers compose their own layout inside the default slot.
- **Dynamic CSS vars** — Use `this._setDynamicVars({ '--_bg': value })` (inherited helper) to inject CSS custom properties into a `<style>` block inside the shadow DOM. Never use `this.style.setProperty()` — it pollutes the host element's inline `style` attribute.
- **Naming** — Elements are `ui-<name>`, classes are `UI<Name>`, files are `<name>.js`.

### `<ui-app>` layout
`<ui-app>` operates in two modes controlled by the `page` attribute:

- **App shell** (default): `<ui-app>` — Fixed to viewport height (`height: 100dvh`). Only `<ui-app-main>` scrolls; banner, header, and subheader remain visible automatically.
- **Page mode**: `<ui-app page>` — Normal document scrolling (`min-height: 100dvh`), body scrolls naturally.

CSS Grid layout with 3 columns (`auto 1fr auto`) and 7 rows:
```
┌────────────────────────────────────────┐
│  banner (full width)                   │
│  header (full width)                   │
│  subheader (full width)                │
├──────────┬──────────────────┬──────────┤
│ nav-hdr  │  main-header     │ drawer   │
│ nav      │  main            │          │
│ nav-ftr  │  main-footer     │          │
├──────────┴──────────────────┴──────────┤
│  footer (full width)                   │
└────────────────────────────────────────┘
```
All child components are optional — empty grid columns/rows collapse to 0.

### Responsive behaviour
The layout is **automatically responsive** — no consumer media queries needed:

- **≥ 769px (desktop)** — Full 3-column grid: nav | main | drawer.
- **≤ 768px (mobile)** — Single-column grid. Nav, nav-header, nav-footer, and drawer are hidden by default. All horizontal padding reduces. Header font-sizes scale down.
- The `<meta name="viewport">` tag is auto-injected by `<ui-app>` if not already present.
- All dimensions use `em` units, so components scale naturally with font-size.

### Rules
- **No external runtime dependencies** — everything is vanilla JS + Web APIs.
- Components must work without a build step (`<script type="module">`).
- Keep accessibility in mind: set `role`, `tabindex`, and handle `disabled` at the host level.
- Test files live in `test/<component>/` and mirror the component path.

## Theming
Global look-and-feel is controlled through CSS custom properties on `:root`, auto-injected by `core/ui-theme.js` on first import. All design tokens use the `--ui-` prefix.

### Colour palette (primitive tokens)
Each colour has shades 50–950: `--ui-gray-*`, `--ui-red-*`, `--ui-orange-*`, `--ui-amber-*`, `--ui-yellow-*`, `--ui-lime-*`, `--ui-green-*`, `--ui-emerald-*`, `--ui-teal-*`, `--ui-cyan-*`, `--ui-sky-*`, `--ui-blue-*`, `--ui-indigo-*`, `--ui-violet-*`, `--ui-purple-*`, `--ui-fuchsia-*`, `--ui-pink-*`, `--ui-rose-*`. Derived from the Tailwind CSS colour palette.

### Shared UI tokens
`--ui-font`, `--ui-font-mono`, `--ui-focus-ring`, `--ui-border-color`, `--ui-text-color`, `--ui-text-muted`, `--ui-bg`, `--ui-bg-subtle`, `--ui-radius`, `--ui-button-radius`.

To customise, override any `--ui-*` variable on `:root` or a scoped parent.
