# AGENTS.md — AI Agent Instructions for Cosmic UI

> This file helps AI coding agents (Claude, GPT, Copilot, Cursor, etc.) understand and generate code using the **Cosmic UI** web component library.

## What is Cosmic UI?

A **zero-dependency**, pure-JavaScript web component library with **80+ custom elements**. Components use Shadow DOM, vanilla JS, and ES modules. No build step, no framework required — just a single `<script>` tag.

### Quick Setup

```html
<!-- Single file — all components -->
<script type="module" src="https://raw.githubusercontent.com/shahzad1970/cosmic-ui/main/dist/cosmic-ui.min.js"></script>

<!-- Or via npm -->
<script type="module" src="https://unpkg.com/cosmic-ui-components/dist/cosmic-ui.min.js"></script>
```

### Core Principle

**Never use raw HTML elements.** Every `<div>`, `<button>`, `<input>`, `<h1>`, `<p>`, `<span>`, `<table>` etc. has a `<ui-*>` replacement. Build the **entire UI** with `<ui-*>` tags.

| Instead of | Use |
|---|---|
| `<div>` | `<ui-layout-stack>`, `<ui-layout-grid>`, `<ui-layout-container>` |
| `<button>` | `<ui-button>` |
| `<input>` | `<ui-input>` |
| `<select>` | `<ui-input-select>` |
| `<textarea>` | `<ui-input-textarea>` |
| `<input type="checkbox">` | `<ui-input-checkbox>` |
| `<input type="radio">` | `<ui-input-radio>` |
| `<input type="range">` | `<ui-input-slider>` |
| `<input type="file">` | `<ui-input-file>` |
| `<input type="color">` | `<ui-input-color>` |
| `<input type="date">` | `<ui-input-date>` |
| `<input type="number">` | `<ui-input-number>` |
| `<h1>`–`<h6>` | `<ui-text type="heading" size="xxx-large">` |
| `<p>` | `<ui-text type="paragraph">` |
| `<span>` | `<ui-text>` |
| `<table>` | `<ui-table>` |
| `<hr>` | `<ui-divider>` |
| `<details>` | `<ui-details>` |
| `<dialog>` | `<ui-dialog>` |
| `<img>` | `<ui-image>` |
| `<form>` | `<ui-form>` |
| `<nav>` | `<ui-breadcrumb>`, `<ui-tabs>`, `<ui-tree>` |

---

## Two Fundamental Patterns

### 1. Colour via Attributes

`background` and `color` accept **palette tokens** (Tailwind-style) or any CSS colour:

```html
<!-- Palette tokens -->
<ui-button background="indigo-500" color="white">Save</ui-button>
<ui-badge background="red-500">3</ui-badge>
<ui-callout background="amber-100" color="amber-900">Warning</ui-callout>

<!-- Raw CSS colours also work -->
<ui-button background="#ff6600">Orange</ui-button>
```

Available colour families (each with shades 50–950):
`gray`, `red`, `orange`, `amber`, `yellow`, `lime`, `green`, `emerald`, `teal`, `cyan`, `sky`, `blue`, `indigo`, `violet`, `purple`, `fuchsia`, `pink`, `rose`

### 2. Size via Attribute

All components accept `size` — named keywords or CSS lengths:

```html
<ui-button size="small">Small</ui-button>
<ui-button size="x-large">Extra Large</ui-button>
<ui-button size="2rem">Custom</ui-button>
```

Named sizes: `xx-small`, `x-small`, `small`, `medium`, `large`, `x-large`, `xx-large`, `xxx-large`

---

## Complete Component Reference

### App Shell — Full Application Layout

Build a full app with fixed header, scrollable main, nav sidebar, and footer:

```html
<ui-app>
  <ui-app-banner background="indigo-600" color="white">Announcement</ui-app-banner>
  <ui-app-header background="white" elevation="1">Header</ui-app-header>
  <ui-app-subheader>Subheader</ui-app-subheader>
  <ui-app-nav-header>Nav Title</ui-app-nav-header>
  <ui-app-nav>Navigation Links</ui-app-nav>
  <ui-app-nav-footer>Nav Footer</ui-app-nav-footer>
  <ui-app-main-header>Page Title</ui-app-main-header>
  <ui-app-main>Main Content (scrolls)</ui-app-main>
  <ui-app-main-footer>Main Footer</ui-app-main-footer>
  <ui-app-drawer>Right Sidebar</ui-app-drawer>
  <ui-app-footer background="gray-100">Footer</ui-app-footer>
</ui-app>
```

Grid layout:
```
┌────────────────────────────────────────┐
│  banner (full width)                   │
│  header (full width)                   │
│  subheader (full width)                │
├──────────┬──────────────────┬──────────┤
│ nav-hdr  │  main-header     │ drawer   │
│ nav      │  main (scrolls)  │          │
│ nav-ftr  │  main-footer     │          │
├──────────┴──────────────────┴──────────┤
│  footer (full width)                   │
└────────────────────────────────────────┘
```

All children are optional. Empty areas collapse. Responsive: nav and drawer hide on mobile (≤768px).

| Element | Properties |
|---|---|
| `<ui-app>` | `page` (Boolean — page scroll mode), `nav-open` (Boolean), `background`, `color`, `size` |
| `<ui-app-banner>` | `background`, `color`, `elevation`, `size` |
| `<ui-app-header>` | `background`, `color`, `elevation`, `size` |
| `<ui-app-subheader>` | `background`, `color`, `elevation`, `size` |
| `<ui-app-nav>` | `background`, `color`, `width` (default `16rem`), `elevation`, `size`, `channel` |
| `<ui-app-nav-header>` | `background`, `color`, `elevation`, `size` |
| `<ui-app-nav-footer>` | `background`, `color`, `elevation`, `size` |
| `<ui-app-main>` | `background`, `color`, `elevation`, `size` |
| `<ui-app-main-header>` | `background`, `color`, `elevation`, `size` |
| `<ui-app-main-footer>` | `background`, `color`, `elevation`, `size` |
| `<ui-app-drawer>` | `background`, `color`, `width` (default `16rem`), `elevation`, `size`, `open` (Boolean) |
| `<ui-app-footer>` | `background`, `color`, `elevation`, `size` |

---

### Layout Components

#### Stack (Flex Layout)

```html
<!-- Vertical (default) -->
<ui-layout-stack gap="1em">
  <ui-text>Item 1</ui-text>
  <ui-text>Item 2</ui-text>
</ui-layout-stack>

<!-- Horizontal -->
<ui-layout-stack horizontal gap="1em" align="center">
  <ui-button>Left</ui-button>
  <ui-button>Right</ui-button>
</ui-layout-stack>

<!-- Centered content -->
<ui-layout-stack center full>
  <ui-text>Centered on page</ui-text>
</ui-layout-stack>
```

**Properties:** `direction`, `horizontal` (Boolean), `gap`, `align`, `justify`, `wrap` (Boolean), `inline` (Boolean), `reverse` (Boolean), `padding`, `width`, `height`, `grow` (Boolean), `center` (Boolean), `full` (Boolean)

#### Grid

```html
<ui-layout-grid columns="3" gap="1em">
  <ui-card>Card 1</ui-card>
  <ui-card>Card 2</ui-card>
  <ui-card>Card 3</ui-card>
</ui-layout-grid>

<!-- Responsive auto-fit grid -->
<ui-layout-grid min-col-width="250px" gap="1em">
  <ui-card>Auto-sized</ui-card>
  <ui-card>Auto-sized</ui-card>
  <ui-card>Auto-sized</ui-card>
</ui-layout-grid>
```

**Properties:** `columns`, `rows`, `gap`, `column-gap`, `row-gap`, `align`, `justify`, `align-content`, `justify-content`, `flow`, `auto-rows`, `auto-cols`, `areas`, `inline` (Boolean), `padding`, `width`, `height`, `full` (Boolean), `min-col-width`

#### Container

```html
<ui-layout-container max-width="960px" padding="2em">
  Centered, constrained content
</ui-layout-container>
```

**Properties:** `max-width`, `padding`, `align`, `width`, `size`

#### Split (Resizable Panes)

```html
<ui-layout-split position="30" height="400px">
  <div>Left pane</div>
  <div>Right pane</div>
</ui-layout-split>
```

**Properties:** `vertical` (Boolean), `position` (default `50`), `min` (default `10`), `max` (default `90`), `gutter-size` (default `6`), `disabled` (Boolean), `width`, `height`, `full` (Boolean)
**Events:** `ui-resize` → `{position}`

#### Spacer

```html
<ui-layout-spacer size="2em"></ui-layout-spacer>
```

**Properties:** `size`

---

### Buttons

```html
<!-- Basic -->
<ui-button>Default</ui-button>
<ui-button background="indigo-500" color="white">Primary</ui-button>

<!-- Variants -->
<ui-button outline>Outline</ui-button>
<ui-button flat>Flat</ui-button>
<ui-button link>Link</ui-button>
<ui-button plain>Plain</ui-button>
<ui-button pill>Pill Shape</ui-button>
<ui-button circle>●</ui-button>

<!-- States -->
<ui-button disabled>Disabled</ui-button>

<!-- As link -->
<ui-button href="https://example.com" target="_blank">Visit</ui-button>

<!-- Button group -->
<ui-button-group>
  <ui-button>One</ui-button>
  <ui-button>Two</ui-button>
  <ui-button>Three</ui-button>
</ui-button-group>
```

**ui-button Properties:** `background` (default `gray-200`), `color`, `size`, `disabled` (Boolean), `pill` (Boolean), `circle` (Boolean), `outline` (Boolean), `flat` (Boolean), `link` (Boolean), `plain` (Boolean), `href`, `target`, `channel`, `type` (default `button`)
**Events:** `ui-click`

**ui-button-group Properties:** `size`, `vertical` (Boolean)

---

### Text & Typography

```html
<!-- Headings -->
<ui-text type="heading" size="xxx-large">Page Title</ui-text>
<ui-text type="heading" size="x-large">Section</ui-text>
<ui-text type="heading" size="large">Subsection</ui-text>

<!-- Paragraphs -->
<ui-text type="paragraph">Body text in a paragraph block.</ui-text>

<!-- Inline formatting -->
<ui-text bold>Bold</ui-text>
<ui-text italic>Italic</ui-text>
<ui-text underline>Underline</ui-text>
<ui-text strike>Strikethrough</ui-text>
<ui-text mono>Monospace</ui-text>
<ui-text muted>Muted colour</ui-text>
<ui-text color="red-500">Red text</ui-text>
<ui-text truncate>Very long text that gets cut off…</ui-text>
<ui-text lines="3">Clamp to 3 lines…</ui-text>
```

**Properties:** `type` (`heading`, `paragraph`, or empty for inline), `block` (Boolean), `display`, `size`, `color`, `weight`, `bold` (Boolean), `align`, `transform`, `leading`, `spacing`, `wrap`, `indent`, `margin`, `padding`, `decoration`, `muted` (Boolean), `mono` (Boolean), `italic` (Boolean), `underline` (Boolean), `strike` (Boolean), `truncate` (Boolean), `nowrap` (Boolean), `selectable` (Boolean, default true), `break`, `lines` (Number — line clamp), `font`

---

### Form & Inputs

#### Form Container

```html
<ui-form>
  <ui-input name="email" label="Email" type="email" required></ui-input>
  <ui-input name="password" label="Password" type="password" required></ui-input>
  <ui-button type="submit" background="indigo-500" color="white">Log In</ui-button>
</ui-form>

<script>
  document.querySelector('ui-form').addEventListener('ui-submit', e => {
    console.log(e.detail.values); // { email: '…', password: '…' }
  });
</script>
```

**Properties:** `name`, `action`, `method` (default `POST`), `disabled` (Boolean), `loading` (Boolean), `novalidate` (Boolean)
**Events:** `ui-submit` → `{values, formData}`, `ui-response` → `{ok, status, data, values}`, `ui-error`, `ui-invalid` → `{errors}`, `ui-reset`
**Methods:** `getValues()`, `getFormData()`, `validate()`, `submit()`, `submitJson(url, options)`, `reset()`

#### Text Input

```html
<ui-input label="Name" placeholder="Enter name" required clearable></ui-input>
<ui-input label="Password" type="password" toggleable></ui-input>
<ui-input label="Email" type="email" prefix="✉" help="We'll never share this"></ui-input>
<ui-input label="Price" type="number" prefix="$" suffix=".00"></ui-input>
```

**Properties:** `type` (default `text`), `value`, `placeholder`, `name`, `label`, `help`, `error`, `prefix`, `suffix`, `size`, `background`, `color`, `disabled` (Boolean), `readonly` (Boolean), `required` (Boolean), `clearable` (Boolean), `toggleable` (Boolean — show/hide for password), `pattern`, `minlength` (Number), `maxlength` (Number), `min`, `max`, `step`, `autocomplete`
**Events:** `ui-input`, `ui-change`, `ui-clear`, `ui-focus`, `ui-blur`
**Methods:** `focus()`, `blur()`, `selectAll()`, `clear()`, `checkValidity()`

#### Textarea

```html
<ui-input-textarea label="Bio" rows="5" maxlength="500" autoresize></ui-input-textarea>
```

**Properties:** `value`, `placeholder`, `name`, `label`, `help`, `error`, `size`, `background`, `color`, `rows` (Number, default 3), `minlength` (Number), `maxlength` (Number), `disabled` (Boolean), `readonly` (Boolean), `required` (Boolean), `autoresize` (Boolean)
**Events:** `ui-input`, `ui-change`, `ui-focus`, `ui-blur`

#### Select

```html
<ui-input-select label="Country" placeholder="Choose…" searchable required>
  <option value="us">United States</option>
  <option value="uk">United Kingdom</option>
  <option value="ca">Canada</option>
</ui-input-select>
```

**Properties:** `value`, `placeholder` (default `Select…`), `name`, `label`, `help`, `error`, `size`, `background`, `color`, `disabled` (Boolean), `required` (Boolean), `multiple` (Boolean), `searchable` (Boolean)
**Events:** `ui-change` → `{value}`, `ui-focus`, `ui-blur`

#### Checkbox & Switch

```html
<ui-input-checkbox label="Accept terms" required></ui-input-checkbox>
<ui-input-switch label="Dark mode" checked></ui-input-switch>
```

**Checkbox Properties:** `checked` (Boolean), `indeterminate` (Boolean), `value`, `name`, `label`, `help`, `error`, `size`, `background`, `disabled` (Boolean), `required` (Boolean)
**Switch Properties:** `checked` (Boolean), `value`, `name`, `label`, `help`, `error`, `size`, `background`, `disabled` (Boolean), `required` (Boolean)
**Events:** `ui-change` → `{checked, value}`

#### Radio Group

```html
<ui-input-radio-group label="Plan" name="plan" value="pro">
  <ui-input-radio value="free" label="Free"></ui-input-radio>
  <ui-input-radio value="pro" label="Pro"></ui-input-radio>
  <ui-input-radio value="enterprise" label="Enterprise"></ui-input-radio>
</ui-input-radio-group>
```

**Radio Group Properties:** `value`, `name`, `label`, `help`, `error`, `size`, `background`, `disabled` (Boolean), `required` (Boolean)
**Radio Properties:** `checked` (Boolean), `value`, `label`, `disabled` (Boolean)
**Events:** `ui-change` → `{value}`

#### Slider

```html
<ui-input-slider label="Volume" value="75" min="0" max="100" showvalue></ui-input-slider>
```

**Properties:** `value` (Number, default 50), `min` (Number, default 0), `max` (Number, default 100), `step` (Number, default 1), `name`, `label`, `help`, `error`, `size`, `background`, `disabled` (Boolean), `required` (Boolean), `showvalue` (Boolean)
**Events:** `ui-input`, `ui-change`

#### Number

```html
<ui-input-number label="Quantity" value="1" min="0" max="99" step="1"></ui-input-number>
```

**Properties:** `value` (Number, default 0), `min` (Number), `max` (Number), `step` (Number, default 1), `placeholder`, `name`, `label`, `help`, `error`, `size`, `background`, `color`, `disabled` (Boolean), `readonly` (Boolean), `required` (Boolean)
**Events:** `ui-input`, `ui-change`

#### Date Picker

```html
<ui-input-date label="Birthday" value="1990-01-15"></ui-input-date>
<ui-input-date label="Trip" range></ui-input-date>
```

**Properties:** `value`, `placeholder` (default `YYYY-MM-DD`), `name`, `label`, `help`, `error`, `size`, `min`, `max`, `range` (Boolean), `disabled` (Boolean), `required` (Boolean)
**Events:** `ui-change` → `{value}` or `{value, start, end}` for range

#### Color Picker

```html
<ui-input-color label="Brand Colour" value="#6366f1"></ui-input-color>
```

**Properties:** `value` (default `#6366f1`), `name`, `label`, `help`, `error`, `size`, `disabled` (Boolean), `required` (Boolean)
**Events:** `ui-change` → `{value}`

#### File Upload

```html
<ui-input-file label="Upload" accept="image/*" multiple></ui-input-file>
```

**Properties:** `accept`, `name`, `label`, `help`, `error`, `size`, `background`, `disabled` (Boolean), `required` (Boolean), `multiple` (Boolean)
**Events:** `ui-change` → `{files}`
**Methods:** `clear()`

#### Rating

```html
<ui-input-rating label="Rate this" value="4" max="5" color="amber-400"></ui-input-rating>
```

**Properties:** `value` (Number, default 0), `max` (Number, default 5), `name`, `label`, `help`, `error`, `size`, `color` (default `amber-400`), `disabled` (Boolean), `readonly` (Boolean), `required` (Boolean)
**Events:** `ui-change` → `{value}`

#### OTP Input

```html
<ui-input-otp label="Verification Code" length="6" masked></ui-input-otp>
```

**Properties:** `length` (Number, default 6), `value`, `name`, `label`, `help`, `error`, `size`, `background`, `disabled` (Boolean), `required` (Boolean), `masked` (Boolean)
**Events:** `ui-input`, `ui-complete` → `{value}`

#### Tags Input

```html
<ui-input-tags label="Skills" value="JavaScript, CSS, HTML" max="10"></ui-input-tags>
```

**Properties:** `value` (comma-separated), `placeholder` (default `Add…`), `name`, `label`, `help`, `error`, `size`, `background`, `color` (default `indigo-100`), `max` (Number), `disabled` (Boolean), `required` (Boolean)
**Events:** `ui-change` → `{value, tags}`

#### Code Editor

```html
<ui-input-code language="javascript" height="20em" dark line-numbers></ui-input-code>
```

**Properties:** `value`, `language` (default `json`), `height` (default `12em`), `size`, `dark` (Boolean, default true), `label`, `placeholder`, `line-numbers` (Boolean, default true), `wrap` (Boolean), `readonly` (Boolean), `disabled` (Boolean), `tab-size` (Number, default 2)
**Events:** `ui-input`, `ui-change`, `ui-focus`, `ui-blur`

---

### Data Display

#### Table

```html
<ui-table striped hoverable sortable sticky-header></ui-table>

<script>
  const table = document.querySelector('ui-table');
  table.columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' }
  ];
  table.data = [
    { name: 'Alice', email: 'alice@example.com', role: 'Admin' },
    { name: 'Bob', email: 'bob@example.com', role: 'User' }
  ];
</script>
```

**Properties:** `striped` (Boolean), `bordered` (Boolean), `hoverable` (Boolean), `compact` (Boolean), `selectable` (Boolean), `sortable` (Boolean), `size`, `background`, `sticky-header` (Boolean)
**Events:** `ui-sort` → `{column, direction}`, `ui-select` → `{selected, row, index}`
**JS Setters:** `columns`, `data`

#### Badge

```html
<ui-badge background="red-500" color="white">3</ui-badge>
<ui-badge pill outline>New</ui-badge>
<ui-badge pulse background="green-500">●</ui-badge>
```

**Properties:** `background`, `color`, `size`, `pill` (Boolean), `outline` (Boolean), `circle` (Boolean), `pulse` (Boolean), `bounce` (Boolean), `shake` (Boolean), `ping` (Boolean)

#### Avatar

```html
<ui-avatar src="photo.jpg" alt="User"></ui-avatar>
<ui-avatar initials="JS" background="indigo-500" color="white"></ui-avatar>
<ui-avatar initials="AW" status="online" status-color="green-500"></ui-avatar>
```

**Properties:** `src`, `initials`, `alt`, `size`, `background`, `color`, `circle` (Boolean, default true), `square` (Boolean), `status`, `status-color`

#### Icon

```html
<ui-icon src="home" size="1.5em"></ui-icon>
<ui-icon src="settings" color="gray-500" spin></ui-icon>
```

**Properties:** `src` (icon name), `set`, `color`, `size`, `label`, `spin` (Boolean), `stroke` (Number)

#### Image

```html
<ui-image src="photo.jpg" alt="Photo" width="300px" lightbox></ui-image>
```

**Properties:** `src`, `alt`, `width`, `height`, `fit` (default `cover`), `radius`, `fallback`, `size`, `lazy` (Boolean, default true), `lightbox` (Boolean), `caption`
**Events:** `ui-load`, `ui-error`

#### Stat

```html
<ui-stat label="Revenue" value="$12,340" trend="+12%" icon="trending-up"></ui-stat>
```

**Properties:** `label`, `value`, `trend`, `icon`, `background`, `color`, `size`, `compact` (Boolean)

#### Calendar

```html
<ui-calendar value="2026-02-10" background="indigo-500"></ui-calendar>
```

**Properties:** `value`, `min`, `max`, `background` (default `indigo-500`), `color`, `size`, `disabled` (Boolean), `locale`
**Events:** `ui-change` → `{value, date}`

---

### Navigation

#### Breadcrumb

```html
<ui-breadcrumb>
  <ui-breadcrumb-item href="/">Home</ui-breadcrumb-item>
  <ui-breadcrumb-item href="/docs">Docs</ui-breadcrumb-item>
  <ui-breadcrumb-item active>Current Page</ui-breadcrumb-item>
</ui-breadcrumb>
```

**Breadcrumb Properties:** `separator` (default `/`), `background`, `color`, `size`
**Item Properties:** `href`, `target`, `active` (Boolean)

#### Tabs

```html
<ui-tabs selected="0">
  <ui-tab label="Profile">Profile content</ui-tab>
  <ui-tab label="Settings">Settings content</ui-tab>
  <ui-tab label="Billing" disabled>Billing content</ui-tab>
</ui-tabs>
```

**Tabs Properties:** `background`, `color`, `size`, `placement` (default `top`), `selected` (Number, default 0)
**Tab Properties:** `label`, `disabled` (Boolean), `active` (Boolean), `background`, `color`
**Events:** `ui-tab-change` → `{index}`
**Methods:** `select(index)`

#### Pagination

```html
<ui-pagination total="50" current="1" siblings="2" background="indigo-500"></ui-pagination>
```

**Properties:** `total` (Number, default 1), `current` (Number, default 1), `siblings` (Number, default 1), `background` (default `indigo-500`), `color`, `size`, `disabled` (Boolean), `compact` (Boolean)
**Events:** `ui-change` → `{page}`

#### Tree

```html
<ui-tree>
  <ui-tree-item value="docs" expanded>
    Docs
    <ui-tree-item value="getting-started">Getting Started</ui-tree-item>
    <ui-tree-item value="api">API Reference</ui-tree-item>
  </ui-tree-item>
  <ui-tree-item value="examples">Examples</ui-tree-item>
</ui-tree>
```

**Tree Properties:** `size`, `color`, `background`, `multiselect` (Boolean)
**Tree Methods:** `expandAll()`, `collapseAll()`, `deselectAll()`
**Item Properties:** `value`, `disabled` (Boolean), `expanded` (Boolean), `selected` (Boolean), `href`, `target`, `channel`, `background`, `color`, `size`
**Item Events:** `ui-select` → `{value, item}`, `ui-navigate`, `ui-expand`, `ui-collapse`
**Item Methods:** `expand()`, `collapse()`, `toggle()`, `select()`, `deselect()`

#### Menu (Context Menu)

```html
<ui-menu target="#my-element">
  <ui-menu-item value="cut">Cut</ui-menu-item>
  <ui-menu-item value="copy">Copy</ui-menu-item>
  <ui-menu-item divider></ui-menu-item>
  <ui-menu-item value="paste">Paste</ui-menu-item>
</ui-menu>
```

**Menu Properties:** `target`, `elevation` (default `3`), `size`, `background`, `color`, `open` (Boolean)
**Menu Events:** `ui-select` → `{value, item}`, `ui-open`, `ui-close`
**Menu Methods:** `show(x, y)`, `hide()`
**Item Properties:** `value`, `disabled` (Boolean), `divider` (Boolean)

#### Dropdown

```html
<ui-dropdown background="indigo-500" color="white">
  Actions
  <ui-dropdown-item value="edit">Edit</ui-dropdown-item>
  <ui-dropdown-item value="delete">Delete</ui-dropdown-item>
  <ui-dropdown-item href="/settings">Settings</ui-dropdown-item>
</ui-dropdown>
```

**Dropdown Properties:** `background` (default `gray-200`), `color`, `size`, `disabled` (Boolean), `pill` (Boolean), `outline` (Boolean), `flat` (Boolean), `elevation`, `placement` (default `bottom-start`)
**Dropdown Events:** `ui-select` → `{item, value}`, `ui-open`, `ui-close`
**Dropdown Methods:** `open()`, `close()`, `toggle()`
**Item Properties:** `value`, `disabled` (Boolean), `href`, `target`

---

### Feedback & Overlays

#### Dialog (Modal)

```html
<ui-dialog label="Confirm" id="my-dialog">
  <ui-text type="paragraph">Are you sure?</ui-text>
  <ui-layout-stack horizontal gap="0.5em" justify="flex-end">
    <ui-button onclick="this.closest('ui-dialog').hide()">Cancel</ui-button>
    <ui-button background="red-500" color="white">Delete</ui-button>
  </ui-layout-stack>
</ui-dialog>

<ui-button onclick="document.getElementById('my-dialog').show()">Open Dialog</ui-button>
```

**Properties:** `open` (Boolean), `modal` (Boolean, default true), `width`, `max-height`, `size`, `padding`, `background`, `elevation`, `persistent` (Boolean — no close on backdrop click), `no-header` (Boolean), `label`
**Events:** `ui-open`, `ui-close` → `{reason}`, `ui-request-close` → `{reason}`
**Methods:** `show()`, `showModal()`, `hide(reason)`

#### Drawer (Slide-in Panel)

```html
<ui-drawer label="Settings" placement="right" id="settings-drawer">
  <ui-text type="paragraph">Drawer content</ui-text>
</ui-drawer>

<ui-button onclick="document.getElementById('settings-drawer').show()">Open Drawer</ui-button>
```

**Properties:** `open` (Boolean), `placement` (default `right` — `left`, `right`, `top`, `bottom`), `width` (default `320px`), `height` (default `320px`), `elevation` (default `4`), `background`, `size`, `label`, `persistent` (Boolean), `no-header` (Boolean)
**Events:** `ui-open`, `ui-close` → `{reason}`
**Methods:** `show()`, `hide(reason)`

#### Toast (Notification)

```html
<!-- Programmatic (preferred) -->
<script>
  // Import or use after loading the library
  UIToast.show('File saved successfully!', {
    background: 'green-600',
    color: 'white',
    duration: 3000,
    position: 'top-right'
  });
</script>

<!-- Declarative -->
<ui-toast background="red-500" color="white" duration="5000">Error occurred!</ui-toast>
```

**Properties:** `background` (default `gray-800`), `color`, `size`, `elevation`, `duration` (Number, default 4000ms), `position` (default `bottom-right`), `dismissible` (Boolean, default true)
**Events:** `ui-dismiss`
**Methods:** `dismiss()`
**Static:** `UIToast.show(message, opts)`

#### Tooltip

```html
<ui-tooltip content="More info here" placement="top">
  <ui-button>Hover me</ui-button>
</ui-tooltip>
```

**Properties:** `content`, `placement` (default `top`), `delay` (Number, default 200), `background`, `color`, `size`, `max-width`, `disabled` (Boolean)

#### Popover

```html
<ui-popover placement="bottom" trigger="click" arrow>
  <ui-button>Click me</ui-button>
  <div slot="content">Popover content here</div>
</ui-popover>
```

**Properties:** `placement` (default `bottom`), `trigger` (default `click`), `elevation` (default `3`), `background`, `color`, `size`, `width`, `padding`, `open` (Boolean), `arrow` (Boolean)
**Events:** `ui-open`, `ui-close`
**Methods:** `show()`, `hide()`

#### Callout

```html
<ui-callout background="blue-100" color="blue-900" dismissible>
  <ui-text bold>Info:</ui-text> Your changes have been saved.
</ui-callout>
```

**Properties:** `background`, `color`, `size`, `elevation`, `dismissible` (Boolean)
**Events:** `ui-dismiss`

#### Progress

```html
<ui-progress value="65" color="indigo-500" label></ui-progress>
<ui-progress type="circle" value="75" color="green-500" label></ui-progress>
<ui-progress value="-1" color="indigo-500"></ui-progress> <!-- Indeterminate -->
```

**Properties:** `value` (Number, default -1 for indeterminate), `max` (Number, default 100), `type` (default `bar` — or `circle`), `color`, `background`, `size`, `thickness`, `label` (Boolean)

#### Spinner

```html
<ui-spinner size="2em" color="indigo-500"></ui-spinner>
<ui-spinner overlay></ui-spinner> <!-- Full-page overlay -->
```

**Properties:** `size`, `color`, `thickness`, `speed`, `label` (default `Loading`), `overlay` (Boolean)

#### Skeleton

```html
<ui-skeleton variant="text" lines="3" gap="0.5em"></ui-skeleton>
<ui-skeleton variant="circle" width="3em" height="3em"></ui-skeleton>
<ui-skeleton variant="rect" width="100%" height="200px"></ui-skeleton>
```

**Properties:** `variant` (default `text` — or `circle`, `rect`), `width`, `height`, `lines` (Number, default 1), `gap`, `size`, `animated` (Boolean, default true), `radius`

---

### Cards

```html
<ui-card elevation="2">
  <ui-card-media height="200px">
    <ui-image src="photo.jpg" alt="Photo"></ui-image>
  </ui-card-media>
  <ui-card-header>Card Title</ui-card-header>
  <ui-card-body>Card content goes here.</ui-card-body>
  <ui-card-footer>
    <ui-button background="indigo-500" color="white">Action</ui-button>
  </ui-card-footer>
</ui-card>
```

**Card Properties:** `background`, `color`, `size`, `elevation`, `outline` (Boolean), `flat` (Boolean), `clickable` (Boolean)
**Card Events:** `ui-click` (when clickable)
**Card-header Properties:** `background`, `color`, `size`, `border` (Boolean)
**Card-media Properties:** `height`
**Card-body Properties:** `background`, `color`, `size`
**Card-footer Properties:** `background`, `color`, `size`

---

### Carousel

```html
<ui-carousel autoplay="5000" loop navigation indicators>
  <ui-carousel-slide image="slide1.jpg">Caption 1</ui-carousel-slide>
  <ui-carousel-slide image="slide2.jpg">Caption 2</ui-carousel-slide>
  <ui-carousel-slide background="indigo-500" color="white">Custom Slide</ui-carousel-slide>
</ui-carousel>
```

**Carousel Properties:** `background`, `color`, `size`, `elevation`, `autoplay` (Number, ms), `loop` (Boolean), `navigation` (Boolean, default true), `indicators` (Boolean, default true)
**Carousel Events:** `ui-slide-change` → `{index}`
**Carousel Methods:** `goTo(index)`, `next()`, `prev()`
**Slide Properties:** `background`, `color`, `image`

---

### Details (Accordion)

```html
<ui-details summary="Click to expand" open>
  <ui-text type="paragraph">Hidden content revealed.</ui-text>
</ui-details>
```

**Properties:** `summary` (default `Details`), `open` (Boolean), `background`, `color`, `size`, `elevation`, `outline` (Boolean), `flat` (Boolean)
**Events:** `ui-toggle` → `{open}`

---

### Divider

```html
<ui-divider></ui-divider>
<ui-divider label="OR"></ui-divider>
<ui-divider vertical></ui-divider>
<ui-divider variant="dashed" color="red-300"></ui-divider>
```

**Properties:** `label`, `vertical` (Boolean), `color`, `thickness`, `spacing`, `size`, `variant` (default `solid`)

---

### Utilities

#### Clipboard

```html
<ui-clipboard value="npm install cosmic-ui-components">Copy Command</ui-clipboard>
```

**Properties:** `value`, `background`, `color`, `size`, `disabled` (Boolean), `feedback` (default `Copied!`), `duration` (Number, default 2000), `flat` (Boolean), `outline` (Boolean)
**Events:** `ui-copy` → `{value}`

#### Command Palette

```html
<ui-command placeholder="Search…">
  <ui-command-item value="new" label="New File" icon="file-plus" group="File"></ui-command-item>
  <ui-command-item value="open" label="Open File" icon="folder-open" group="File"></ui-command-item>
  <ui-command-item value="settings" label="Settings" icon="settings" group="General"></ui-command-item>
</ui-command>
```

**Properties:** `open` (Boolean), `placeholder` (default `Type a command…`), `shortcut` (default `k` — triggers on ⌘K/Ctrl+K), `no-shortcut` (Boolean), `elevation` (default `5`), `size`, `width`
**Events:** `ui-select` → `{value, label, item}`, `ui-open`, `ui-close`
**Methods:** `show()`, `hide()`

#### Kbd (Keyboard Key)

```html
<ui-kbd>⌘</ui-kbd><ui-kbd>K</ui-kbd>
<ui-kbd separator="+">Ctrl Shift P</ui-kbd>
```

**Properties:** `size`, `background`, `color`, `separator`

#### Include (HTML Partial Loader)

```html
<ui-include src="/partials/header.html"></ui-include>
<ui-include src="/partials/page.html" channel="route"></ui-include>
```

**Properties:** `src`, `mode` (default `replace`), `channel`, `base`, `lazy` (Boolean), `nocache` (Boolean)
**Events:** `ui-load` → `{src, html}`, `ui-error` → `{src, error}`
**Methods:** `reload()`

#### Wiki (Markdown Renderer)

```html
<ui-wiki src="/docs/readme.md" toc></ui-wiki>
```

**Properties:** `src`, `background`, `color`, `size`, `padding`, `nocache` (Boolean), `toc` (Boolean — shows table of contents sidebar)
**Events:** `ui-load` → `{src, markdown}`, `ui-error` → `{src, error}`
**Methods:** `reload()`
**Static:** `UIWiki.parseMarkdown(md)`, `UIWiki.clearCache()`

#### Scroll Area

```html
<ui-scroll-area height="300px" scrollbar="thin">
  Long content here…
</ui-scroll-area>
```

**Properties:** `height`, `max-height`, `width`, `size`, `direction` (default `vertical`), `scrollbar` (default `thin`), `padding`
**Events:** `ui-scroll-end`
**Methods:** `scrollToTop()`, `scrollToBottom()`, `scrollToLeft()`, `scrollToRight()`

---

### Data Visualization

#### Chart

```html
<ui-chart height="16em"></ui-chart>
<script>
  document.querySelector('ui-chart').config = {
    type: 'bar',
    data: { labels: ['Jan','Feb','Mar'], datasets: [{ data: [10, 20, 30] }] }
  };
</script>
```

**Properties:** `height` (default `8em`), `src` (JSON URL), `background`, `color`, `size`, `no-animate` (Boolean)
**Events:** `ui-load`, `ui-error`
**JS Setter:** `config`

#### Map

```html
<ui-map lat="40.7128" lng="-74.0060" zoom="12" height="400px"></ui-map>
```

**Properties:** `height` (default `20em`), `lat` (Number), `lng` (Number), `zoom` (Number, default 2), `src` (GeoJSON URL), `dark` (Boolean), `no-zoom` (Boolean)
**JS Setter:** `config`

---

### Steps & Timeline

#### Steps

```html
<ui-steps current="1" background="indigo-500">
  <ui-step label="Account" description="Create account"></ui-step>
  <ui-step label="Profile" description="Fill profile"></ui-step>
  <ui-step label="Done" description="All set"></ui-step>
</ui-steps>
```

**Steps Properties:** `current` (Number, default 0), `background` (default `indigo-500`), `color`, `size`, `vertical` (Boolean), `clickable` (Boolean)
**Step Properties:** `label`, `description`, `icon`
**Events:** `ui-change` → `{index}`

#### Timeline

```html
<ui-timeline>
  <ui-timeline-item color="green-500" icon="check">
    <ui-text bold>Completed</ui-text>
    <ui-text muted>2 hours ago</ui-text>
  </ui-timeline-item>
  <ui-timeline-item color="blue-500" icon="clock">
    <ui-text bold>In Progress</ui-text>
  </ui-timeline-item>
</ui-timeline>
```

**Timeline Properties:** `size`, `color`, `line-color`, `alternate` (Boolean)
**Item Properties:** `color`, `icon`

---

### List

```html
<ui-list dividers hoverable>
  <ui-list-item value="1" description="Description text">Item Title</ui-list-item>
  <ui-list-item value="2" href="/page">Linked Item</ui-list-item>
</ui-list>
```

**List Properties:** `size`, `dividers` (Boolean), `hoverable` (Boolean), `striped` (Boolean), `background`, `color`, `bordered` (Boolean)
**Item Properties:** `value`, `description`, `disabled` (Boolean), `href`, `target`
**Item Events:** `ui-click` → `{value}`

---

## Theming

Override CSS custom properties on `:root` or any parent:

```css
:root {
  --ui-font: 'Inter', sans-serif;
  --ui-font-mono: 'Fira Code', monospace;
  --ui-radius: 0.5em;
  --ui-button-radius: 0.5em;
  --ui-focus-ring: #6366f1;
  --ui-border-color: #e5e7eb;
  --ui-text-color: #1f2937;
  --ui-text-muted: #6b7280;
  --ui-bg: #ffffff;
  --ui-bg-subtle: #f9fafb;
}
```

### Colour Palette Tokens

Each colour has shades `50`, `100`, `200`, `300`, `400`, `500`, `600`, `700`, `800`, `900`, `950`:

```css
--ui-gray-50 through --ui-gray-950
--ui-red-50 through --ui-red-950
--ui-orange-50 through --ui-orange-950
--ui-amber-50 through --ui-amber-950
--ui-yellow-50 through --ui-yellow-950
--ui-lime-50 through --ui-lime-950
--ui-green-50 through --ui-green-950
--ui-emerald-50 through --ui-emerald-950
--ui-teal-50 through --ui-teal-950
--ui-cyan-50 through --ui-cyan-950
--ui-sky-50 through --ui-sky-950
--ui-blue-50 through --ui-blue-950
--ui-indigo-50 through --ui-indigo-950
--ui-violet-50 through --ui-violet-950
--ui-purple-50 through --ui-purple-950
--ui-fuchsia-50 through --ui-fuchsia-950
--ui-pink-50 through --ui-pink-950
--ui-rose-50 through --ui-rose-950
```

---

## Common Patterns for AI Agents

### Building a Login Page

```html
<script type="module" src="cosmic-ui.min.js"></script>

<ui-app page>
  <ui-app-main>
    <ui-layout-stack center full>
      <ui-card elevation="2" style="width: 400px">
        <ui-card-header>
          <ui-text type="heading" align="center">Sign In</ui-text>
        </ui-card-header>
        <ui-card-body>
          <ui-form>
            <ui-layout-stack gap="1em">
              <ui-input name="email" label="Email" type="email" required></ui-input>
              <ui-input name="password" label="Password" type="password" required toggleable></ui-input>
              <ui-button type="submit" background="indigo-500" color="white" size="large">Sign In</ui-button>
            </ui-layout-stack>
          </ui-form>
        </ui-card-body>
      </ui-card>
    </ui-layout-stack>
  </ui-app-main>
</ui-app>
```

### Building a Dashboard

```html
<ui-app>
  <ui-app-header background="indigo-600" color="white">
    <ui-layout-stack horizontal align="center" gap="1em" padding="0 1em">
      <ui-text type="heading" size="large">Dashboard</ui-text>
    </ui-layout-stack>
  </ui-app-header>
  <ui-app-nav background="gray-50">
    <ui-tree>
      <ui-tree-item value="overview" selected>Overview</ui-tree-item>
      <ui-tree-item value="analytics">Analytics</ui-tree-item>
      <ui-tree-item value="settings">Settings</ui-tree-item>
    </ui-tree>
  </ui-app-nav>
  <ui-app-main>
    <ui-layout-stack gap="1.5em" padding="1.5em">
      <ui-layout-grid columns="3" gap="1em">
        <ui-stat label="Users" value="1,234" trend="+12%" icon="users"></ui-stat>
        <ui-stat label="Revenue" value="$56,789" trend="+8%" icon="dollar-sign"></ui-stat>
        <ui-stat label="Orders" value="892" trend="-3%" icon="shopping-cart"></ui-stat>
      </ui-layout-grid>
      <ui-card>
        <ui-card-header>Recent Orders</ui-card-header>
        <ui-card-body>
          <ui-table striped hoverable></ui-table>
        </ui-card-body>
      </ui-card>
    </ui-layout-stack>
  </ui-app-main>
</ui-app>
```

### Building a Settings Form

```html
<ui-card>
  <ui-card-header>
    <ui-text type="heading">Account Settings</ui-text>
  </ui-card-header>
  <ui-card-body>
    <ui-form>
      <ui-layout-stack gap="1em">
        <ui-layout-grid columns="2" gap="1em">
          <ui-input name="first" label="First Name" required></ui-input>
          <ui-input name="last" label="Last Name" required></ui-input>
        </ui-layout-grid>
        <ui-input name="email" label="Email" type="email" required></ui-input>
        <ui-input-textarea name="bio" label="Bio" rows="4" maxlength="500"></ui-input-textarea>
        <ui-input-select name="timezone" label="Timezone" searchable>
          <option value="utc">UTC</option>
          <option value="est">Eastern</option>
          <option value="pst">Pacific</option>
        </ui-input-select>
        <ui-input-switch name="notifications" label="Email Notifications" checked></ui-input-switch>
        <ui-divider></ui-divider>
        <ui-layout-stack horizontal gap="0.5em" justify="flex-end">
          <ui-button type="reset">Cancel</ui-button>
          <ui-button type="submit" background="indigo-500" color="white">Save</ui-button>
        </ui-layout-stack>
      </ui-layout-stack>
    </ui-form>
  </ui-card-body>
</ui-card>
```

---

## Key Rules for Code Generation

1. **Always use `<ui-*>` elements** — never raw HTML tags like `<div>`, `<button>`, `<input>`, `<h1>`, `<p>`, `<table>`.
2. **Use `<ui-layout-stack>` for flex layouts** — vertical by default, add `horizontal` for rows.
3. **Use `<ui-layout-grid>` for grid layouts** — set `columns` or `min-col-width` for responsive grids.
4. **Use palette tokens for colours** — e.g., `background="indigo-500"` not `background="#6366f1"`.
5. **Use named sizes** — e.g., `size="large"` not `size="18px"`.
6. **Use `<ui-text>` for all text** — `type="heading"` for headlines, `type="paragraph"` for body text.
7. **Use `<ui-form>` to wrap inputs** — it collects values automatically on submit.
8. **Listen for `ui-*` events** — all custom events are prefixed with `ui-`.
9. **All components are self-closing or have a default `<slot>`** — content goes inside the tag.
10. **No build step needed** — just add `<script type="module" src="cosmic-ui.min.js">` to any HTML file.
