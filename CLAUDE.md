# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project Goal

This is a personal **Playwright + JavaScript** test automation framework built to practice UI and API test automation against the Rahul Shetty Academy dummy shopping site: `https://rahulshettyacademy.com/client/#/auth/login`.

The purpose is skill-building and portfolio/resume proof-of-work — so the code should follow **industry-standard automation patterns** (Page Object Model, custom fixtures, layered test suites, CI) rather than quick throwaway scripts, even though the target app is a practice/dummy site.

## Current State

The repo currently has the **architecture scaffolded but most implementation files are empty stubs**:

- `pages/*.page.js` — empty classes to be filled in with locators + actions per screen
- `fixtures/*.fixtures.js` — empty, intended to provide custom Playwright fixtures
- `utils/ApiUtils.js` — empty class, intended to centralize API request helpers
- `tests/**/*.spec.js` — empty spec files, one per feature/page

When asked to "implement" or "add" something, check whether the target file already has structure to extend before writing from scratch, since the intended shape is usually implied by the filename and folder it lives in (see below).

## Architecture & Conventions

- **Module system:** ES Modules (`"type": "module"` in `package.json`). Use `import`/`export`, not `require`.
- **Package manager:** pnpm only. Don't introduce npm/yarn lockfiles.
- **Page Object Model:** one class per screen in `pages/`, named `<screen>.page.js` (e.g. `login.page.js`, `cart.page.js`). Each class should take a Playwright `page` in its constructor and expose locators + action methods (e.g. `login(username, password)`, `addToCart()`). Keep assertions out of page objects — they belong in specs.
- **Fixtures:** `fixtures/pages.fixtures.js` should extend Playwright's `test` with page object instances so specs can destructure them (e.g. `test('...', async ({ loginPage }) => {...})`) instead of `new LoginPage(page)` in every spec. `fixtures/auth.fixtures.js` should provide a pre-authenticated context/page via `storageState` (see `auth-cookie/auth-storage-state.json`) to avoid logging in on every test.
- **API utils:** `utils/ApiUtils.js` should centralize API request building (base URL, headers, auth) using Playwright's `request` fixture/context, consumed by specs in `tests/api/`.
- **Test layering:** keep this separation when adding tests —
  - `tests/api/` — pure API/backend tests, no browser page interaction
  - `tests/ui/` — UI-only tests for a single page/feature
  - `tests/auth/` — login/session setup and auth-related specs
  - `tests/e2e/` — full user journeys combining UI + API
- **Spec file naming:** the folder (not the filename) distinguishes test type, so name spec files `<feature-or-page>.spec.js` with no `-ui`/`.api`/`.e2e` suffix — e.g. `tests/ui/login.spec.js`, `tests/api/login.spec.js`, `tests/e2e/login.spec.js`. This keeps names stable if a test is later promoted from `ui/` to `e2e/`. If a test needs to be filtered/run across folders by type, use a Playwright title tag (`test('... @ui', ...)` + `--grep`) rather than encoding type in the filename.
- **Config:** `playwright.config.js` sets `baseURL: "https://rahulshettyacademy.com"` and runs against chromium/firefox/webkit. Don't hardcode the base URL again in tests/pages — use relative paths with `page.goto()` or the configured `baseURL`.
- **Env vars:** credentials and the login URL come from `.env` (see `.env.sample` for the required keys: `username`, `password`, `baseURLWithParams`). `.env` is git-ignored — never commit real values, though these are dummy-site credentials, not sensitive.
  - Note: `playwright.config.js` currently has `dotenv` import commented out — if a task needs `.env` values loaded (e.g. in fixtures or tests), the dotenv config in `playwright.config.js` needs to be uncommented/enabled first.

## Running Tests

```bash
pnpm install && pnpm exec playwright install --with-deps   # first-time setup
pnpm test                    # run full suite headless
pnpm test:headed             # run with browser visible
pnpm test:debug              # step-through debug mode
pnpm exec playwright test tests/ui/dashboard.spec.js       # run a single spec
```

## What Claude Should Do Here

- When implementing a page object, fixture, or spec, follow the existing folder/naming conventions above rather than inventing a new structure.
- Prefer Playwright's built-in `expect` assertions and locator API (`getByRole`, `getByTestId`, etc.) over brittle CSS/XPath selectors when writing new locators.
- Since this is a learning/portfolio project, favor clear, idiomatic Playwright code over cleverness — it should read well to an interviewer reviewing the repo.
- Keep the README's "Project Status & Roadmap" checklist in sync when a roadmap item gets implemented.
