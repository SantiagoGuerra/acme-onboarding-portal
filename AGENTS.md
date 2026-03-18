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
