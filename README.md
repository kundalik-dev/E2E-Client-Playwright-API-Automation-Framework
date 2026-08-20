# Client Shopping – E2E & API Test Automation Framework

A JavaScript + Playwright test automation framework built to practice and demonstrate **UI and API test automation** against the [Rahul Shetty Academy Client dummy e-commerce site](https://rahulshettyacademy.com/client/#/auth/login). This project is my personal automation lab — a place to apply industry-standard patterns (Page Object Model, custom fixtures, API utilities, CI pipelines) on a real-world-style application.

> **Status:** Actively under development. The architecture (folder structure, config, CI) is in place; page objects, fixtures, and test specs are being implemented incrementally. See [Project Status](#project-status--roadmap) below.

---

## Application Under Test

**Site:** `https://rahulshettyacademy.com/client` — a demo shopping application that supports:

- User authentication (login)
- Product dashboard / catalog browsing
- Cart management
- Checkout flow
- Order confirmation & order history

It also exposes REST APIs (e.g. login) that are used for API-level testing, so this framework covers both **UI** and **API** layers of the same application.

---

## Tech Stack

| Category           | Tool / Library                             |
| ------------------ | ------------------------------------------ |
| Test Runner        | [Playwright Test](https://playwright.dev/) |
| Language           | JavaScript (ES Modules)                    |
| Package Manager    | pnpm                                       |
| API Testing        | Playwright's built-in `request` context    |
| CI/CD              | GitHub Actions                             |
| Reporting          | Playwright HTML Reporter                   |
| Environment Config | `.env` (dotenv-style key/value pairs)      |
| Linting            | ESLint + `eslint-plugin-playwright`        |
| Formatting         | Prettier                                   |

---

## Project Structure

```
E2E-Client-Playwright-API-Automation-Framework/
├── .github/workflows/
│   └── playwright.yml          # CI pipeline — runs full suite on push/PR
├── auth-cookie/
│   └── auth-storage-state.json # Saved Playwright storageState (logged-in session)
├── fixtures/
│   ├── auth.fixture.js        # Custom fixture: authenticated page/session
│   └── pages.fixture.js       # Custom fixture: injects Page Object instances into tests
├── pages/                     # Page Object Model (POM) — one class per screen
│   ├── login.page.js
│   ├── dashboard.page.js
│   ├── cart.page.js
│   ├── checkout.page.js
│   ├── order-confirmation.page.js
│   └── order-history.page.js
├── tests/
│   ├── api/                    # Pure API-level tests (request context, no browser UI)
│   │   └── login.spec.js
│   ├── auth/                   # Authentication / session setup specs
│   │   └── auth.spec.js
│   ├── e2e/                    # Full end-to-end user journeys (UI + API combined)
│   │   └── login.spec.js
│   └── ui/                     # UI-only tests, one spec per page/feature
│       ├── login.spec.js
│       ├── dashboard.spec.js
│       ├── cart.spec.js
│       ├── checkout.spec.js
│       ├── order-confirmation.spec.js
│       └── order-history.spec.js
├── utils/
│   └── ApiUtils.js             # Shared helper for building/sending API requests
├── eslint.config.js             # ESLint flat config (base rules + Playwright test rules)
├── .prettierrc.json             # Prettier formatting rules
├── .prettierignore              # Files/folders Prettier should skip
├── playwright.config.js        # Base URL, browser projects, trace/reporter config
├── .env.sample                 # Template for required environment variables
└── package.json
```

### Design Patterns Used

- **Page Object Model (POM):**
  - Every screen of the app has a matching class in `pages/` that encapsulates its locators and actions
  - Keeping test specs readable and decoupled from UI selectors.
- **Custom Fixtures:**
  - `fixtures/pages.fixture.js` wires up Page Object instances so tests can request them directly (e.g. `{ loginPage, cartPage }`)
  - Instead of instantiating them manually. `fixtures/auth.fixture.js` provides a pre-authenticated `page`/context via Playwright's `storageState`, avoiding repeated logins across tests.
- **API Utilities:**
  - `utils/ApiUtils.js` centralizes API request building (headers, base URL, auth tokens) so API specs stay declarative.
- **Layered Test Suites:** tests are separated by concern
  - `api/` (backend contracts),
  - `ui/` (isolated UI behaviour),
  - `auth/` (login/session), and
  - `e2e/` (full user journeys)
- so failures are easy to localize.

### Test Naming Convention

- Each test type already lives in its own folder (`tests/api/`, `tests/ui/`, `tests/e2e/`, `tests/auth/`),
- Spec files are named `<feature-or-page>.spec.js` with no redundant type suffix, e.g.:

```
tests/ui/login.spec.js     # UI-only login test
tests/api/login.spec.js    # API-only login test
tests/e2e/login.spec.js    # full login journey (UI + API)
```

- Each test is tagged with a title suffix (e.g. `@ui`, `@api`, `@e2e`) to allow filtering by type in CI pipelines or local runs.
- To filter or run tests by type across folders, use Playwright's `--grep` with a title tag
- e.g. `test('user can add item to cart @ui', ...)` over encoding the type in the filename.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS)
- [pnpm](https://pnpm.io/) (`npm install -g pnpm`) (optional - can use `npm` or `yarn`)

### Installation

```bash
pnpm install
pnpm exec playwright install --with-deps
```

### Environment Variables

Copy the sample env file and fill in credentials for the dummy site:

```bash
cp .env.sample .env
```

```
USER_EMAIL="your-email@gmail.com"
USER_PASSWORD="Admin@123"
baseURLWithParams="https://rahulshettyacademy.com/client/#/auth/login"
```

`playwright.config.js` loads this file via `dotenv` at startup, so any spec can read these through `process.env.USER_EMAIL` / `process.env.USER_PASSWORD`.

> These are demo credentials for the practice application only — no real user data is involved.
>
> **Naming note:** avoid generic keys like `username` in `.env` — on Windows, `USERNAME` is a reserved OS environment variable and silently wins over a same-named `.env` value (dotenv does not override existing env vars by default). Prefixed keys like `USER_EMAIL` / `USER_PASSWORD` sidestep this.

---

## Running Tests

| Command                 | Description                                       |
| ----------------------- | ------------------------------------------------- |
| `pnpm test`             | Run the full test suite headless                  |
| `pnpm test:headed`      | Run tests with the browser UI visible             |
| `pnpm test:debug`       | Run tests in Playwright's step-through debug mode |
| `pnpm test:report`      | Show the last generated HTML report               |
| `pnpm test:report:open` | Show and auto-open the last HTML report           |

Run a single spec or project:

```bash
pnpm exec playwright test tests/ui/dashboard.spec.js
pnpm exec playwright test --project=chromium
```

Tests run only on `Chromium` to run on `Firefox`, and `WebKit` uncomment them from `playwright.config.js`.

---

## Linting & Formatting

Code quality is enforced with **ESLint** (using [`eslint-plugin-playwright`](https://github.com/playwright-community/eslint-plugin-playwright) for Playwright-specific rules, e.g. flagging missing `await`s on Playwright actions/assertions or disallowing focused/skipped tests from being committed) and **Prettier** (consistent formatting across `.js`, `.json`, and `.md` files).

| Command             | Description                                           |
| ------------------- | ----------------------------------------------------- |
| `pnpm lint`         | Check the codebase for lint errors                    |
| `pnpm lint:fix`     | Auto-fix lint errors where possible                   |
| `pnpm format`       | Format all files in place with Prettier               |
| `pnpm format:check` | Check formatting without writing changes (used in CI) |

Run `pnpm lint` and `pnpm format:check` before pushing/opening a PR — this is what a reviewer or CI would check first, and keeping it clean is part of what makes this repo presentable as a portfolio project.

- ESLint config: `eslint.config.js` (flat config) — applies base JS recommended rules everywhere, and Playwright-specific rules only to `tests/**/*.spec.js`.
- Prettier config: `.prettierrc.json` (formatting rules) and `.prettierignore` (excluded paths, e.g. `node_modules`, `playwright-report`).

---

## Continuous Integration

Every push and pull request to `main`/`master` triggers a GitHub Actions workflow (`.github/workflows/playwright.yml`) that:

1. Checks out the code and sets up Node.js
2. Installs dependencies with pnpm
3. Installs Playwright browsers
4. Runs the full test suite
5. Uploads the HTML report as a build artifact (retained for 30 days)

---

## Project Status & Roadmap

- [x] Project scaffolding (folders, config, CI pipeline)
- [x] Playwright config with multi-browser support
- [x] ESLint + Prettier setup
- [ ] Login page object + UI login tests
- [ ] Authenticated session fixture (`storageState` reuse)
- [ ] Dashboard / product listing tests
- [ ] Cart & checkout UI flows
- [ ] Order confirmation & order history tests
- [ ] Login API tests via `ApiUtils`
- [ ] Full end-to-end (UI + API) journey tests

---

## Author

**Kundalik Jadhav**
Built as a hands-on practice project to strengthen Playwright-based UI and API test automation skills.
