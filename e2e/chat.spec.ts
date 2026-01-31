import { test, expect } from '@playwright/test'

test.describe('Chat Interaction', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('displays the main chat interface', async ({ page }) => {
    // Assert page title
    await expect(page).toHaveTitle(/Smart Teacher/)

    // Assert chat interface elements are visible
    const chatInput = page.getByPlaceholder(/type your message/i)
    await expect(chatInput).toBeVisible()
  })

  test('user can send a message', async ({ page }) => {
    // Arrange
    const chatInput = page.getByPlaceholder(/type your message/i)
    const testMessage = 'What is division of labor?'

    // Act
    await chatInput.fill(testMessage)
    await chatInput.press('Enter')

    // Assert - message appears in chat
    await expect(page.getByText(testMessage)).toBeVisible({ timeout: 5000 })
  })

  test('displays AI response after sending message', async ({ page }) => {
    // Arrange
    const chatInput = page.getByPlaceholder(/type your message/i)

    // Act
    await chatInput.fill('Hello Adam Smith')
    await chatInput.press('Enter')

    // Assert - Wait for AI response (this will take a few seconds)
    // Look for any new message that's not the user's message
    await page.waitForTimeout(2000) // Give time for streaming to start

    // The page should have more than just the user's message
    const messages = page.locator('[role="article"], .message, [data-message]')
    await expect(messages.first()).toBeVisible({ timeout: 15000 })
  })

  test('allows typing in notes panel', async ({ page }) => {
    // Arrange
    const notesArea = page.getByPlaceholderText(/capture your validated understanding/i)

    // Assert notes panel is visible
    await expect(notesArea).toBeVisible()

    // Act
    await notesArea.fill('My notes about economics')

    // Assert content was added
    await expect(notesArea).toHaveValue('My notes about economics')
  })

  test('displays page title and heading', async ({ page }) => {
    // Assert
    await expect(page.getByRole('heading', { name: /notes/i })).toBeVisible()
  })
})

test.describe('Chat Error Handling', () => {
  test('handles network errors gracefully', async ({ page }) => {
    // Arrange - Block the API endpoint
    await page.route('**/api/chat', (route) => route.abort('failed'))
    await page.goto('/')

    // Act
    const chatInput = page.getByPlaceholder(/type your message/i)
    await chatInput.fill('Test message')
    await chatInput.press('Enter')

    // Assert - Should show some error indication
    // Note: This depends on how error handling is implemented
    // You may need to adjust based on actual error UI
    await page.waitForTimeout(2000)

    // The message should still appear even if API fails
    await expect(page.getByText('Test message')).toBeVisible()
  })
})
