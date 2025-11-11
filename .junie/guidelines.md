# Project Development Guidelines (SvelteKit + Vitest + Playwright + Drizzle + Tailwind)

This document captures project-specific knowledge to help future development. It focuses on non-trivial details unique to this repo (paths, scripts, env expectations, and testing setup).

## 1) Build and Configuration

- Node tooling
  - Package manager: pnpm (repo contains `pnpm-lock.yaml`). npm also works but CI/scripts assume pnpm.
  - Dev server/build tool: Vite (via SvelteKit). Key scripts in `package.json`:
    - `pnpm dev` → `vite dev`
    - `pnpm build` → `vite build`
    - `pnpm preview` → `vite preview`
    - `pnpm check` → typecheck + `svelte-kit sync`

- SvelteKit specifics
  - `svelte.config.js` uses `@sveltejs/adapter-auto`. For non-supported targets, switch adapters explicitly.
  - Compiler option `experimental.async` is enabled and Kit `experimental.remoteFunctions` is on. This affects how `$app/server` remote functions behave; keep it enabled unless refactoring those APIs.

- Environment variables
  - `drizzle.config.ts` requires `DATABASE_URL` to be set at import time. This means any script that imports Drizzle config (including Playwright’s `webServer` build) must run with `DATABASE_URL` present.
  - Practical implication:
    - Before `pnpm build` or `pnpm test:e2e`, export a valid Postgres URL, e.g. via Neon:
      ```bash
      export DATABASE_URL="postgresql://user:password@host/db?sslmode=require"
      ```
    - Without it, `drizzle.config.ts` throws and build fails.

- Database (Drizzle)
  - Commands (require `DATABASE_URL`):
    - `pnpm db:generate` → generate SQL from schema (`src/lib/server/db/schema.ts`).
    - `pnpm db:push` → push SQL to the database.
    - `pnpm db:migrate` → run migrations.
    - `pnpm db:studio` → Drizzle Studio.

- TailwindCSS
  - Tailwind v4 (`tailwindcss@^4`) with `@tailwindcss/vite` plugin configured via Vite/Svelte. No extra `tailwind.config.js` required in v4; utility-first CSS is integrated.

- Linting/Formatting
  - `pnpm format` → Prettier (with Svelte + Tailwind plugins).
  - `pnpm lint` → Prettier check + ESLint (Svelte plugin + config-prettier). Prefer running `pnpm lint` before committing.

## 2) Testing

### 2.1 Unit tests (Vitest)

- Scripts
  - `pnpm test:unit` → runs Vitest in the default environment.
  - `pnpm test` → runs `test:unit` (in run mode) then Playwright e2e.

- File layout
  - Unit tests can live alongside source or under `src/**/__tests__/**` with `*.test.ts`.
  - Example path already used during verification: `src/lib/__tests__/smoke.test.ts`.

- Running
  - Fast TTY run:
    ```bash
    pnpm test:unit -- --run
    ```
  - Watch mode (dev loop):
    ```bash
    pnpm test:unit
    ```

- Browser-based unit tests
  - Repo includes `@vitest/browser` and `vitest-browser-svelte`. There’s also `vitest-setup-client.ts` with browser matchers/providers references.
  - If you need DOM/Svelte component tests without spinning a real browser, consider:
    - Using JSDOM: add a Vitest config (`vitest.config.ts`) setting `test.environment = 'jsdom'`.
    - Or using Vitest Browser with Playwright provider for closer-to-real rendering. Example minimal config:
      ```ts
      // vitest.config.ts
      import { defineConfig } from 'vitest/config';
      export default defineConfig({
        test: {
          browser: { provider: 'playwright' },
          setupFiles: ['./vitest-setup-client.ts']
        }
      });
      ```
    - Use `vitest-browser-svelte` helpers to mount Svelte components.

- Adding a new unit test
  - Create `*.test.ts` under `src/**` and run `pnpm test:unit -- --run`.
  - Example used for validation (now removed):
    ```ts
    import { describe, it, expect } from 'vitest';
    describe('smoke', () => {
      it('adds numbers', () => {
        const add = (a: number, b: number) => a + b;
        expect(add(2, 3)).toBe(5);
      });
    });
    ```

- Notes when tests import Svelte files
  - Ensure the test environment supports DOM (JSDOM or Vitest Browser). Pure Node env will fail on DOM APIs.
  - Svelte 5 runes are compile-time; component tests require proper Svelte/Vite transform. If you add a custom Vitest config, include the Svelte plugin from `@sveltejs/vite-plugin-svelte`.

### 2.2 End-to-End tests (Playwright)

- Config: `playwright.config.ts`
  - `webServer.command` = `npm run build && npm run preview` on port 4173.
  - `testDir` = `e2e`.

- Running
  - Build step needs `DATABASE_URL` (see above). Example:
    ```bash
    export DATABASE_URL="postgresql://user:password@host/db?sslmode=require"
    pnpm test:e2e
    ```
  - Forheaded/headed mode, tracing, and retries can be added via Playwright CLI flags or config.

- Seed/state
  - If tests require specific DB state, add a seeding script gated by `NODE_ENV === 'test'` and run it before `webServer` or inside tests.

## 3) Additional Development Information

- Remote server functions
  - Code uses `$app/server` `form` and `query` helpers with `experimental.remoteFunctions` enabled. See `src/lib/remote/bracket.remote.ts`. These helpers implicitly depend on a valid session (`getSession`) and will `redirect` if unauthenticated.
  - Be mindful that calling these in page `load` or component awaits will navigate on 302 responses; when testing, either mock `getSession` or run with an authenticated context.

- Auth/session awareness
  - Many remote functions call `redirect(302, '/auth/login')` when `!session`. For local dev and tests, either:
    - boot app with a dev auth stub, or
    - guard UI so tests don’t hit auth-gated endpoints, or
    - provide test credentials and session cookie for e2e.

- Database access in tests
  - Unit tests should not import `drizzle.config.ts` or anything that immediately requires `DATABASE_URL` unless you set it; prefer isolating pure logic.

- Code style and conventions
  - Prettier + ESLint enforce style. Run `pnpm format` and `pnpm lint` pre-commit.
  - UI uses Tailwind v4; prefer utility classes and keep components in `src/lib/components/**`.
  - Svelte 5 runes are in use (`$state`, `$props`, `$derived`); keep new code consistent and avoid mixing legacy reactivity with runes in the same component.

- Common pitfalls
  - E2E failing before tests start → missing `DATABASE_URL` during build.
  - Import-time env reads: any script importing `drizzle.config.ts` will fail without env; set it in shells, CI jobs, and IDE run configs.
  - Component tests without DOM env will fail; choose jsdom or browser provider.

## 4) Verified Commands (local)

The following flows are verified to work with a valid `DATABASE_URL` exported:

- Dev
  ```bash
  pnpm install
  pnpm dev
  ```

- Unit tests
  ```bash
  pnpm test:unit -- --run
  ```

- E2E tests
  ```bash
  export DATABASE_URL=...
  pnpm test:e2e
  ```

If your shell uses npm instead, replace `pnpm` with `npm run` equivalents.
