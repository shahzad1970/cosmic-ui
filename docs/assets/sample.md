# Welcome to Cosmic UI

Cosmic UI is a **pure-JavaScript** web component library with _zero_ external dependencies.

## Features

- Shadow DOM encapsulation
- Adopted stylesheets for performance
- **50+ components** out of the box
- No build step — just `<script type="module">`

## Quick Start

Install via npm:

```bash
npm install @ui-components/core
```

Then import and use:

```html
<script type="module" src="ui-components/src/index.js"></script>

<ui-button background="indigo-600">Click me</ui-button>
```

## Component Categories

| Category    | Examples                        | Count |
|-------------|---------------------------------|-------|
| Layout      | Stack, Grid, Split, Container   | 8     |
| Content     | Text, Icon, Card, Badge         | 13    |
| Forms       | Input, Select, Checkbox, Slider | 17    |
| Actions     | Button, Dropdown, Menu          | 6     |
| Navigation  | Breadcrumb, Tabs, Tree          | 5     |
| Feedback    | Dialog, Toast, Tooltip          | 9     |

## Design Philosophy

> Components should cover all common UI needs. Consumers build their
> entire UI using `ui-*` components and never use native HTML elements directly.

### Colour Palette

All colours follow the Tailwind palette with shades **50–950**:

- `gray`, `red`, `orange`, `amber`, `yellow`
- `lime`, `green`, `emerald`, `teal`, `cyan`
- `sky`, `blue`, `indigo`, `violet`, `purple`

### Task List

- [x] Core framework complete
- [x] 50+ components shipped
- [ ] Documentation site finished
- [ ] v1.0 release

---

*Built with love using Cosmic UI.*
