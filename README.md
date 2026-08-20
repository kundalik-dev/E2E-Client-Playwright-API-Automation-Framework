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

| Category            | Tool / Library                          |
|----------------------|------------------------------------------|
| Test Runner          | [Playwright Test](https://playwright.dev/) |
| Language              | JavaScript (ES Modules)                 |
| Package Manager       | pnpm                                    |
| API Testing           | Playwright's built-in `request` context |
| CI/CD                 | GitHub Actions                          |
| Reporting              | Playwright HTML Reporter                |
| Environment Config     | `.env` (dotenv-style key/value pairs)   |

---

## Project Structure

```
05-E2E-Client-Playwright-API-Automation-Framework/
├── .github/workflows/
│   └── playwright.yml          # CI pipeline — runs full suite on push/PR
├── auth-cookie/
│   └── auth-storage-state.json # Saved Playwright storageState (logged-in session)
├── fixtures/
│   ├── auth.fixtures.js        # Custom fixture: authenticated page/session
│   └── pages.fixtures.js       # Custom fixture: injects Page Object instances into tests
├── pages/                      # Page Object Model (POM) — one class per screen
│   ├── login.page.js
│   ├── dashboard.page.js
│   ├── cart.page.js
│   ├── checkout.page.js
│   ├── order-confirmation.page.js
│   └── order-history.page.js
├── tests/
│   ├── api/                    # Pure API-level tests (request context, no browser UI)
│   │   └── login.api.spec.js
│   ├── auth/                   # Authentication / session setup specs
│   │   └── auth.spec.js
│   ├── e2e/                    # Full end-to-end user journeys (UI + API combined)
│   │   └── login.e2e.spec.js
│   └── ui/                     # UI-only tests, one spec per page/feature
│       ├── dashboard-ui.spec.js
│       ├── cart-ui.spec.js
│       ├── checkout-ui.spec.js
│       ├── order-confirmation.spec.js
│       └── order-history-ui.spec.js
├── utils/
│   └── ApiUtils.js             # Shared helper for building/sending API requests
├── playwright.config.js        # Base URL, browser projects, trace/reporter config
├── .env.sample                 # Template for required environment variables
└── package.json
```

### Design Patterns Used

- **Page Object Model (POM):** every screen of the app has a matching class in `pages/` that encapsulates its locators and actions, keeping test specs readable and decoupled from UI selectors.
- **Custom Fixtures:** `fixtures/pages.fixtures.js` wires up Page Object instances so tests can request them directly (e.g. `{ loginPage, cartPage }`) instead of instantiating them manually. `fixtures/auth.fixtures.js` provides a pre-authenticated `page`/context via Playwright's `storageState`, avoiding repeated logins across tests.
- **API Utilities:** `utils/ApiUtils.js` centralizes API request building (headers, base URL, auth tokens) so API specs stay declarative.
- **Layered Test Suites:** tests are separated by concern — `api/` (backend contracts), `ui/` (isolated UI behaviour), `auth/` (login/session), and `e2e/` (full user journeys) — so failures are easy to localize.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS)
- [pnpm](https://pnpm.io/) (`npm install -g pnpm`)

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
username="your-email@gmail.com"
password="Admin@123"
baseURLWithParams="https://rahulshettyacademy.com/client/#/auth/login"
```

> These are demo credentials for the practice application only — no real user data is involved.

---

## Running Tests

| Command                     | Description                                      |
|------------------------------|---------------------------------------------------|
| `pnpm test`                   | Run the full test suite headless                  |
| `pnpm test:headed`            | Run tests with the browser UI visible              |
| `pnpm test:debug`             | Run tests in Playwright's step-through debug mode  |
| `pnpm test:report`            | Show the last generated HTML report                |
| `pnpm test:report:open`       | Show and auto-open the last HTML report             |

Run a single spec or project:

```bash
pnpm exec playwright test tests/ui/dashboard-ui.spec.js
pnpm exec playwright test --project=chromium
```

Tests run across **Chromium, Firefox, and WebKit** by default (see `playwright.config.js`).

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
