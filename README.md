<p align="center">
  <img src="https://img.shields.io/badge/zero-dependencies-brightgreen" alt="Zero Dependencies">
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="MIT License">
  <img src="https://img.shields.io/badge/components-50+-purple" alt="50+ Components">
  <img src="https://img.shields.io/badge/build-none_required-orange" alt="No Build Step">
</p>

# UI Components

A pure-JavaScript custom web component library with **zero external dependencies**. Build complete user interfaces using `<ui-*>` elements — no framework, no build step, just the platform.

Components use Shadow DOM, adopted stylesheets, and vanilla JS. Drop a `<script type="module">` tag in your HTML and start building.

## Features

- **Zero dependencies** — vanilla JS + Web APIs only
- **No build step** — ship ES modules directly
- **50+ components** — from buttons to command palettes
- **Shadow DOM isolation** — styles never leak
- **Automatic theming** — Tailwind-inspired colour palette with `--ui-*` tokens
- **Responsive by default** — `em`-based sizing scales naturally
- **Accessible** — semantic HTML, ARIA roles, keyboard navigation
- **Tree-shakeable** — import only what you need

## Quick Start

### CDN (easiest)

```html
<script type="module" src="https://unpkg.com/@ui-components/core/src/index.js"></script>

<ui-button background="indigo-500">Click me</ui-button>
```

### npm

```bash
npm install @ui-components/core
```

```html
<script type="module">
  import '@ui-components/core';
</script>

<ui-button background="indigo-500">Click me</ui-button>
```

### Cherry-pick components

```js
import '@ui-components/core/src/components/button/button.js';
import '@ui-components/core/src/components/input/input.js';
```

## Components

### Layout & Structure

| Component | Element | Description |
|-----------|---------|-------------|
| App Shell | `<ui-app>` | Full application layout with nav, header, main, footer |
| Container | `<ui-layout-container>` | Responsive max-width container |
| Stack | `<ui-layout-stack>` | Vertical/horizontal flex layout |
| Grid | `<ui-layout-grid>` | CSS grid layout |
| Split | `<ui-layout-split>` | Resizable split panes |
| Spacer | `<ui-layout-spacer>` | Spacing utility |
| Divider | `<ui-divider>` | Visual separator |
| Scroll Area | `<ui-scroll-area>` | Custom scrollbar container |

### Forms & Inputs

| Component | Element | Description |
|-----------|---------|-------------|
| Input | `<ui-input>` | Text input with label, validation |
| Textarea | `<ui-input-textarea>` | Multi-line text input |
| Select | `<ui-input-select>` | Dropdown select |
| Checkbox | `<ui-input-checkbox>` | Checkbox toggle |
| Switch | `<ui-input-switch>` | On/off switch |
| Radio | `<ui-input-radio>` | Radio button |
| Radio Group | `<ui-input-radio-group>` | Grouped radio buttons |
| Slider | `<ui-input-slider>` | Range slider |
| Number | `<ui-input-number>` | Numeric stepper |
| Date | `<ui-input-date>` | Date picker |
| Color | `<ui-input-color>` | Colour picker |
| File | `<ui-input-file>` | File upload |
| Rating | `<ui-input-rating>` | Star rating |
| OTP | `<ui-input-otp>` | One-time password input |
| Tags | `<ui-input-tags>` | Tag/chip input |
| Code | `<ui-input-code>` | Code editor block |
| Form | `<ui-form>` | Form container with validation & JSON submit |

### Data Display

| Component | Element | Description |
|-----------|---------|-------------|
| Table | `<ui-table>` | Styled data table |
| Text | `<ui-text>` | Headings, paragraphs, inline text |
| Badge | `<ui-badge>` | Status badge / counter |
| Avatar | `<ui-avatar>` | User avatar (image, initials, icon) |
| Icon | `<ui-icon>` | SVG icon (Lucide icon set) |
| Stat | `<ui-stat>` | Key-value statistic display |
| Image | `<ui-image>` | Enhanced image with lightbox |
| Calendar | `<ui-calendar>` | Monthly calendar view |
| Timeline | `<ui-timeline>` | Vertical timeline |
| Steps | `<ui-steps>` | Step-by-step progress |
| List | `<ui-list>` | Styled list |
| Chart | `<ui-chart>` | Data visualisation chart |
| Map | `<ui-map>` | Interactive map |

### Navigation

| Component | Element | Description |
|-----------|---------|-------------|
| Breadcrumb | `<ui-breadcrumb>` | Breadcrumb navigation |
| Tabs | `<ui-tabs>` | Tabbed navigation |
| Pagination | `<ui-pagination>` | Page navigation |
| Tree | `<ui-tree>` | Hierarchical tree view |
| Menu | `<ui-menu>` | Context menu / right-click menu |
| Dropdown | `<ui-dropdown>` | Dropdown button menu |

### Feedback & Overlays

| Component | Element | Description |
|-----------|---------|-------------|
| Button | `<ui-button>` | Click actions with variants |
| Button Group | `<ui-button-group>` | Grouped buttons |
| Dialog | `<ui-dialog>` | Modal / dialog |
| Drawer | `<ui-drawer>` | Slide-in panel |
| Toast | `<ui-toast>` | Notification toast |
| Tooltip | `<ui-tooltip>` | Hover/focus tooltip |
| Popover | `<ui-popover>` | Click-triggered popover |
| Callout | `<ui-callout>` | Info / warning / error callout |
| Progress | `<ui-progress>` | Progress bar |
| Spinner | `<ui-spinner>` | Loading spinner |
| Skeleton | `<ui-skeleton>` | Content placeholder |

### Utilities

| Component | Element | Description |
|-----------|---------|-------------|
| Card | `<ui-card>` | Content card with header/body/footer |
| Carousel | `<ui-carousel>` | Image / content carousel |
| Details | `<ui-details>` | Collapsible accordion |
| Clipboard | `<ui-clipboard>` | Copy-to-clipboard button |
| Command | `<ui-command>` | Command palette (⌘K) |
| Kbd | `<ui-kbd>` | Keyboard key display |
| Include | `<ui-include>` | HTML partial loader |

## Theming

All design tokens use the `--ui-` prefix and are auto-injected on first import:

```css
/* Override any token */
:root {
  --ui-font: 'Inter', sans-serif;
  --ui-radius: 0.5em;
  --ui-focus-ring: #6366f1;
}
```

### Colour palette

Every colour has shades 50–950: `--ui-gray-*`, `--ui-red-*`, `--ui-blue-*`, `--ui-indigo-*`, `--ui-green-*`, and more (Tailwind-compatible).

Use palette tokens as attribute values:

```html
<ui-button background="indigo-600" color="white">Save</ui-button>
<ui-badge background="red-500">3</ui-badge>
<ui-callout background="amber-100" color="amber-900">Warning!</ui-callout>
```

### Sizing

All components accept a `size` attribute — CSS named sizes (`xx-small` – `xxx-large`) or any CSS length:

```html
<ui-button size="small">Small</ui-button>
<ui-button size="x-large">Extra Large</ui-button>
<ui-button size="2rem">Custom</ui-button>
```

## Development

```bash
# Clone
git clone https://github.com/nicokimmel/ui-components.git
cd ui-components

# Start dev server (localhost:3000)
npm run dev

# Run tests
npm test
```

### Project structure

```
src/
  core/
    ui-component.js    # Base class every component extends
    ui-theme.js        # Global colour palette & design tokens
    ui-utils.js        # Shared utility functions
  components/          # One folder per component
    button/button.js
    input/input.js
    …
  index.js             # Public barrel — registers all elements
test/                  # Node test-runner tests
docs/                  # Documentation site
```

### Creating a component

1. Create `src/components/<name>/<name>.js`
2. Extend `UIComponent`
3. Define `static properties`, `static styles()`, and `render()`
4. Register with `customElements.define('ui-<name>', …)`
5. Re-export from `src/index.js`
6. Add tests in `test/<name>/`

## Browser Support

Works in all modern browsers that support Custom Elements v1 and Shadow DOM:

- Chrome / Edge 79+
- Firefox 63+
- Safari 13.1+

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

[MIT](LICENSE) — use it however you like.
