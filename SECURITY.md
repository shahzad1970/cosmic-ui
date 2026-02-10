# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly.

**Do NOT open a public GitHub issue for security vulnerabilities.**

Instead, please email **[INSERT SECURITY EMAIL]** with:

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

We will acknowledge your report within 48 hours and aim to release a fix within 7 days for critical issues.

## Supported Versions

| Version | Supported |
|---------|-----------|
| 0.1.x   | ✅        |

## Scope

This library runs entirely in the browser with no server-side code, no external network calls, and no dependencies. The primary security concerns are:

- **XSS via component attributes** — components that render user-provided strings must escape HTML
- **DOM injection** — components should not use `innerHTML` with unsanitised input
- **Prototype pollution** — property handling should not allow prototype chain manipulation
