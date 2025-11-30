import { test, expect } from '@playwright/test';

test.describe('Staff Flows', () => {
    test.beforeEach(async ({ page }) => {
        // Simulate Staff Login
        await page.goto('/login');
        await page.evaluate(() => {
            localStorage.setItem('userEmail', 'admin@smashpoint.com');
        });
    });

    test('staff can view schedule', async ({ page }) => {
        await page.goto('/staff');
        await expect(page.getByText('Daily Schedule')).toBeVisible();
    });

    test('staff can use POS', async ({ page }) => {
        await page.goto('/staff/pos');

        // 1. Verify Products Load
        await expect(page.getByText('Gatorade')).toBeVisible({ timeout: 10000 });

        // 2. Add to Cart
        await page.getByText('Gatorade').click();

        // 3. Verify Cart Update
        await expect(page.getByText('Current Order')).toBeVisible();

        // Use a more specific locator for the price to avoid strict mode violation
        // Verify the button has the correct amount
        await expect(page.getByRole('button', { name: 'Checkout ($2.50)' })).toBeVisible();

        // 4. Checkout
        page.on('dialog', dialog => dialog.accept()); // Handle alert
        await page.getByRole('button', { name: 'Checkout' }).click();

        // 5. Verify Cart Cleared
        await expect(page.getByText('Cart is empty')).toBeVisible();
    });
});
