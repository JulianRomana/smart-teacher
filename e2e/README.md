# E2E Tests

End-to-end tests using Playwright to verify critical user flows.

## Structure

```
e2e/
  ├── fixtures/          # Test fixtures and mock data
  ├── *.spec.ts          # Test files
  └── README.md          # This file
```

## Running Tests

```bash
# Run all E2E tests
pnpm test:e2e

# Run with UI mode (recommended for development)
pnpm test:e2e:ui

# Debug mode (opens browser DevTools)
pnpm test:e2e:debug

# Run specific test file
pnpm test:e2e e2e/chat.spec.ts
```

## Writing Tests

Place test files directly in the `e2e/` directory with `.spec.ts` extension.

Example:
```typescript
import { test, expect } from '@playwright/test'

test('user can interact with chat', async ({ page }) => {
  await page.goto('/')

  // Your test assertions here
  await expect(page).toHaveTitle(/Smart Teacher/)
})
```

## Best Practices

1. **Test user journeys, not implementation** - Focus on what users do, not how the code works
2. **Use data-testid for stable selectors** - Avoid relying on CSS classes or text that might change
3. **Keep tests independent** - Each test should set up its own state
4. **Use Page Object Model** - Create reusable page objects in `fixtures/` for complex pages
5. **Test critical paths first** - Focus on features that users depend on most

## Configuration

See `playwright.config.ts` in the project root for configuration options.
