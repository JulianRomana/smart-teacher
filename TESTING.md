# Testing Guide

This project uses a comprehensive testing strategy with two testing frameworks:

## Testing Stack

- **Vitest** - Unit and integration tests for components, utilities, and API routes
- **Playwright** - End-to-end tests for critical user flows
- **@testing-library/react** - Component testing utilities

## Quick Start

```bash
# Run all unit/integration tests
pnpm test

# Run tests in watch mode (re-runs on file changes)
pnpm test:watch

# Run tests with coverage report
pnpm test:coverage

# Open Vitest UI (visual test runner)
pnpm test:ui

# Run E2E tests
pnpm test:e2e

# Run E2E tests with UI mode (recommended for development)
pnpm test:e2e:ui

# Debug E2E tests
pnpm test:e2e:debug
```

## Test Structure

### Unit/Integration Tests (Vitest)

Tests are **co-located** with source files:

```
src/
  components/
    Button.tsx
    Button.test.tsx      ← Component test
  lib/
    utils.ts
    utils.test.ts        ← Utility test
  app/
    api/chat/
      route.ts
      route.test.ts      ← API route test
```

### E2E Tests (Playwright)

E2E tests live in the `e2e/` directory:

```
e2e/
  chat.spec.ts           ← Chat interaction tests
  fixtures/              ← Test fixtures and helpers
```

## Writing Tests

### When to Add Tests

**ALWAYS write tests for:**
- React components
- Utility functions
- API routes
- Server actions
- Critical user flows (E2E)

**SKIP tests for:**
- shadcn/ui components (pre-tested)
- Configuration files
- One-line trivial changes

### Test Decision Matrix

| Feature Type | Test Type | File Location |
|--------------|-----------|---------------|
| React Component | Component test | `Component.test.tsx` |
| Utility Function | Unit test | `util.test.ts` |
| API Route | Integration test | `route.test.ts` |
| Critical User Flow | E2E test | `e2e/flow.spec.ts` |

## Example Tests

### Utility Function Test

```typescript
import { describe, it, expect } from 'vitest'
import { formatDate } from './formatDate'

describe('formatDate', () => {
  it('formats date correctly', () => {
    // Arrange
    const date = new Date('2024-01-15')

    // Act
    const result = formatDate(date)

    // Assert
    expect(result).toBe('Jan 15, 2024')
  })
})
```

### API Route Test

```typescript
import { describe, it, expect } from 'vitest'
import { POST } from './route'

describe('POST /api/endpoint', () => {
  it('returns success response', async () => {
    // Arrange
    const request = new Request('http://localhost:3000/api/endpoint', {
      method: 'POST',
      body: JSON.stringify({ data: 'test' }),
    })

    // Act
    const response = await POST(request)

    // Assert
    expect(response.status).toBe(200)
  })
})
```

### E2E Test

```typescript
import { test, expect } from '@playwright/test'

test('user can complete flow', async ({ page }) => {
  // Arrange
  await page.goto('/')

  // Act
  await page.getByRole('button', { name: 'Submit' }).click()

  // Assert
  await expect(page.getByText('Success')).toBeVisible()
})
```

## Testing Best Practices

1. **Follow AAA Pattern** - Arrange, Act, Assert
2. **Test Behavior, Not Implementation** - Test what users see, not internal state
3. **Use Descriptive Names** - Test names should describe the expected behavior
4. **Keep Tests Independent** - Each test should set up its own state
5. **Use data-testid for Stable Selectors** - Don't rely on CSS classes or text that might change

## Coverage Goals

- **Components**: 80%+ coverage
- **Utilities**: 90%+ coverage
- **API Routes**: 80%+ coverage
- **Critical Flows**: 100% E2E coverage

Check current coverage:
```bash
pnpm test:coverage
```

Coverage reports are generated in `coverage/` directory.

## Continuous Integration

Tests run automatically on:
- Pre-commit (via git hooks)
- Pull request creation
- Main branch pushes

Ensure all tests pass before committing:
```bash
pnpm test --run && pnpm test:e2e
```

## Troubleshooting

### Vitest Issues

**Problem**: Tests timeout
```bash
# Increase timeout in test
it('slow test', { timeout: 10000 }, async () => { ... })
```

**Problem**: Module not found
```bash
# Check tsconfig.json paths match vitest.config.ts resolve.alias
```

### Playwright Issues

**Problem**: Browser not installed
```bash
npx playwright install chromium
```

**Problem**: Tests fail on CI but pass locally
```bash
# Run in headed mode to debug
pnpm test:e2e --headed
```

## Additional Resources

- **Testing Skill**: See `~/.claude/skills/testing.md` for comprehensive testing guide
- **Vitest Docs**: https://vitest.dev/
- **Playwright Docs**: https://playwright.dev/
- **Testing Library Docs**: https://testing-library.com/react

## Example Test Files

This project includes example tests:
- `src/lib/utils.test.ts` - Utility function tests
- `src/app/api/chat/route.test.ts` - API route tests
- `e2e/chat.spec.ts` - E2E chat interaction tests

Study these examples to understand testing patterns and best practices.
