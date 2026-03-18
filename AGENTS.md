# AGENTS.md — Acme Onboarding Portal

## Project Overview
Acme Onboarding Portal is a Next.js web application for user registration and onboarding.
It provides a multi-step registration flow with email validation, profile setup, and welcome experience.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Testing**: Jest (unit) + Playwright (E2E)
- **Package Manager**: npm
- **Node Version**: 20+

## Architecture
- `src/app/` — App Router pages and API routes
- `src/components/` — Reusable React components
- `src/lib/` — Utility functions, validation, types
- `src/__tests__/` — Unit tests (Jest)
- `e2e/` — End-to-end tests (Playwright)

## Conventions
- Use TypeScript strict mode
- Component files: PascalCase (e.g., `OnboardingForm.tsx`)
- Utility files: camelCase (e.g., `validateEmail.ts`)
- Tests: `*.test.ts` or `*.test.tsx`
- API routes return JSON with `{ success: boolean, data?: any, error?: string }`
- All form inputs must be validated both client-side AND server-side
- Use `zod` for schema validation

## What NOT to touch
- Do NOT modify `next.config.js` unless explicitly asked
- Do NOT add new dependencies without justification
- Do NOT remove existing tests
- Do NOT change the Tailwind config theme colors

## Definition of Done
1. Code compiles without TypeScript errors
2. All existing tests pass (`npm test`)
3. New functionality has corresponding tests
4. No console errors in the browser
5. Changes follow the project's naming conventions
6. API routes validate input before processing

## Cursor Cloud specific instructions

### Services
This is a single Next.js application (frontend + API routes) with an in-memory data store. No external services, databases, or Docker required.

- **Dev server**: `npm run dev` (port 3000). This is the only service to run.

### Commands reference
See `package.json` scripts: `dev`, `build`, `test`, `test:e2e`, `lint`.

### Non-obvious caveats
- **ESLint**: The repo ships without `.eslintrc.json` or `eslint`/`eslint-config-next` in `devDependencies`. The update script installs these and creates the config so `npm run lint` works. If the PR adding these hasn't been merged yet, the update script handles it idempotently.
- **Playwright browsers**: Both Chromium and WebKit are needed (`npx playwright install --with-deps`). The `mobile` project in `playwright.config.ts` uses iPhone 13 which requires WebKit.
- **In-memory store resets on server restart**: The data store (`src/lib/store.ts`) is ephemeral. Restarting the dev server clears all registered users (except seeded ones). Kill stale `next-server` processes before restarting to avoid port conflicts.
- **Known intentional bug**: 3 Jest tests in `email.test.ts` fail by design (the email regex is intentionally too permissive). See `README.md` for details.
- **Known E2E flake**: The "should navigate to registration page" Playwright test fails on both Chromium and mobile because `page.click("text=Get Started")` on the Next.js `Link` component doesn't trigger client-side navigation reliably. This is a pre-existing issue.
