# Acme Onboarding Portal

A Next.js web application for user registration and onboarding — built as a demo project to showcase an **agentic SDLC pipeline** with [Cursor](https://cursor.com).

## What's this about?

This repo is designed to demonstrate how Cursor's Background Agents, Bugbot, and Automations can handle the full lifecycle of a bug fix — from issue to merge-ready PR — with human-in-the-loop supervision.

**There's an intentional bug** in the email validator. The registration form accepts invalid emails like `user@` and `test@.com` because the regex is too permissive. Three unit tests are written to catch this bug, and they **will fail** until the fix is applied.

## Quick Start

```bash
npm install
npm run dev     # starts at http://localhost:3000
npm test        # 3 tests will fail (the seeded bug)
```

## The Demo Flow

1. **A bug is filed** in Linear: "Email validation allows invalid emails"
2. **Cursor picks it up** — either by direct assignment or `@Cursor` mention
3. **The agent works** in an isolated Ubuntu VM, reads project rules, fixes the code, runs tests
4. **A PR is opened** on GitHub with the fix
5. **Bugbot reviews** the PR and may suggest improvements
6. **A human approves** (or sends follow-up instructions)

## Project Structure

```
src/
├── app/
│   ├── register/page.tsx      # Registration form (the bug lives here too)
│   ├── api/register/route.ts  # Registration API endpoint
│   └── api/validate-email/    # Email validation endpoint
├── lib/
│   ├── validators/
│   │   ├── email.ts           # ⚠️ THE BUG IS HERE — regex too permissive
│   │   ├── password.ts
│   │   └── profile.ts
│   ├── types.ts
│   └── store.ts               # In-memory user store
├── __tests__/
│   ├── email.test.ts          # 3 tests fail due to the bug
│   ├── password.test.ts       # All pass
│   └── profile.test.ts        # All pass
└── e2e/
    └── registration.spec.ts   # Playwright E2E tests
```

## Cursor Config Files

| File | Purpose |
|------|---------|
| `AGENTS.md` | Global rules: stack, naming, what not to touch, definition of done |
| `.cursor/rules/product.mdc` | Product context and requirements |
| `.cursor/rules/architecture.mdc` | Architecture decisions and patterns |
| `.cursor/rules/testing.mdc` | Testing standards |
| `.cursor/rules/security.mdc` | Security guidelines |
| `.cursor/rules/deployment.mdc` | Deployment and environment setup |
| `.cursor/BUGBOT.md` | Review criteria for Bugbot |
| `.cursor/environment.json` | Remote agent environment setup |

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript** (strict mode)
- **Tailwind CSS**
- **Zod** (validation)
- **Jest** (unit tests)
- **Playwright** (E2E tests)

## The Bug (Spoiler)

In `src/lib/validators/email.ts`, the regex `/^[^\s@]+@[^\s@]*$/` only checks for an `@` symbol — it doesn't validate that there's a proper domain after it. The fix is straightforward: use zod's built-in `.email()` validator instead.

---

Built for the talk: **"From Issue to Merge-Ready PR: An Agentic Pipeline with Cursor, Engineering Rules, and Human-in-the-Loop"**
