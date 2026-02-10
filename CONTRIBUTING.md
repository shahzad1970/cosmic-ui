# Contributing to UI Components

Thanks for your interest in contributing! This guide will help you get started.

## Getting Started

1. **Fork** the repository
2. **Clone** your fork:
   ```bash
   git clone https://github.com/<your-username>/ui-components.git
   cd ui-components
   ```
3. **Start the dev server**:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:3000` to see the docs/playground

## Development

### Prerequisites

- Node.js 18+
- No other tools required — zero build step

### Project Structure

```
src/
  core/           # Base class, theme, utilities
  components/     # One folder per component
  index.js        # Public barrel file
test/             # Node test-runner tests (mirrors src/components/)
docs/             # Documentation site
```

### Running Tests

```bash
npm test
```

Tests use Node.js built-in test runner (`node:test`) with minimal DOM shims. No browser needed.

### Dev Server

```bash
npm run dev
```

Serves the project at `localhost:3000` with the documentation site.

## Creating a New Component

1. Create `src/components/<name>/<name>.js`
2. Import and extend `UIComponent`:
   ```js
   import { UIComponent } from '../../core/ui-component.js';

   export class UIMyComponent extends UIComponent {
     static properties = {
       label: { type: String, default: '', reflect: true },
     };

     static styles() {
       return `
         :host { display: inline-block; }
       `;
     }

     render() {
       return `<slot></slot>`;
     }
   }

   customElements.define('ui-my-component', UIMyComponent);
   ```
3. Export from `src/index.js`
4. Add tests in `test/<name>/<name>.test.js`
5. Add documentation in `docs/partials/<name>.html`

### Component Conventions

- **Naming**: Elements are `ui-<name>`, classes are `UI<Name>`, files are `<name>.js`
- **Properties**: Use `static properties` with `type`, `default`, and `reflect: true`
- **Styling**: CSS in `static styles()`, use `:host` selectors, expose `--ui-*` custom properties
- **Sizing**: Use `em` units so components scale with `font-size`
- **Colours**: Accept palette tokens (`red-600`, `indigo-500`) via `background`/`color` attributes. Use `resolveColor()` from `core/ui-utils.js`
- **Events**: Use `this.emit('ui-<action>')` for composed, bubbling `CustomEvent`s
- **Slots**: Use a single default `<slot>` — no named slots
- **Dynamic CSS**: Use `this._setDynamicVars({})` — never `this.style.setProperty()`
- **No external dependencies**: Everything is vanilla JS + Web APIs

## Submitting Changes

### Pull Request Process

1. Create a feature branch from `main`:
   ```bash
   git checkout -b feat/my-feature
   ```
2. Make your changes — follow the conventions above
3. Add or update tests — all tests must pass
4. Add or update documentation
5. Commit with a descriptive message:
   ```
   feat: add <ui-sparkline> component
   fix: clipboard button not copying on Safari
   docs: add playground to tooltip page
   ```
6. Push and open a Pull Request against `main`

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Usage |
|--------|-------|
| `feat:` | New feature or component |
| `fix:` | Bug fix |
| `docs:` | Documentation only |
| `test:` | Adding or updating tests |
| `refactor:` | Code change that neither fixes a bug nor adds a feature |
| `style:` | CSS / formatting changes |
| `chore:` | Maintenance, config, dependencies |

### What Makes a Good PR

- **Focused** — one feature or fix per PR
- **Tested** — new or updated tests that pass
- **Documented** — docs updated if user-facing
- **Backwards-compatible** — don't break existing components
- **No new dependencies** — this is a zero-dependency library

## Reporting Bugs

Use the [Bug Report](https://github.com/nicokimmel/ui-components/issues/new?template=bug_report.md) issue template and include:

- Steps to reproduce
- Expected vs actual behaviour
- Browser and OS

## Requesting Features

Use the [Feature Request](https://github.com/nicokimmel/ui-components/issues/new?template=feature_request.md) issue template and describe:

- What problem it solves
- Proposed API / usage example
- Any alternatives considered

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold it.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
