import { expect, test } from '@playwright/test'

test.describe('Todo App', () => {
  test('should display the todo list page', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h1')).toContainText('My Todos')
  })

  test('should have an input to add todos', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('input[name="title"]')).toBeVisible()
    await expect(page.locator('button[type="submit"]')).toContainText('Add')
  })
})
