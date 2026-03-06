import { test, expect } from '@playwright/test';

test.describe('DevStreamline - Landing Page', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test.describe('Automated Task Reminders', () => {
    test('should set automated task reminders and receive notifications', async ({ page }) => {
      await page.click('text=Set Reminder');
      await page.fill('input[name="task"]', 'Finish documentation');
      await page.fill('input[name="deadline"]', '2023-10-30');
      await page.click('button:has-text("Save")');
      await page.waitForTimeout(500); // Wait for notification
      const notification = await page.locator('.notification').textContent();
      expect(notification).toContain('Reminder set for Finish documentation');
      
      // Verify snooze and mark complete functionality
      await page.click('.notification button:has-text("Snooze")');
      await page.click('.notification button:has-text("Mark Complete")');
      expect(await page.locator('.notification').count()).toBe(0);
    });
  });

  test.describe('Version Control Insights', () => {
    test('should display version control insights and allow reverts', async ({ page }) => {
      await page.click('text=Version Control Insights');
      const changes = await page.locator('.version-change').count();
      expect(changes).toBeGreaterThan(0);
      const firstChange = await page.locator('.version-change').first();
      const changeDetails = await firstChange.textContent();
      expect(changeDetails).toMatch(/made by \w+ on \d{4}-\d{2}-\d{2}/);
      
      await firstChange.click('button:has-text("Revert")');
      const revertConfirmation = await page.locator('.confirmation').textContent();
      expect(revertConfirmation).toContain('Change reverted successfully');
    });
  });

  test.describe('Onboarding Checklist Generator', () => {
    test('should create and customize onboarding checklist', async ({ page }) => {
      await page.click('text=Create Checklist');
      await page.fill('input[name="role"]', 'Software Engineer');
      await page.fill('textarea[name="checklistItems"]', 'Item 1, Item 2');
      await page.click('button:has-text("Save Checklist")');
      const checklistStatus = await page.locator('.checklist-status').textContent();
      expect(checklistStatus).toContain('Checklist created for Software Engineer');
      
      await page.click('text=Share Checklist');
      await page.fill('input[name="email"]', 'newhire@example.com');
      await page.click('button:has-text("Send")');
      const shareConfirmation = await page.locator('.notification').textContent();
      expect(shareConfirmation).toContain('Checklist sent to newhire@example.com');
    });
  });

  test.describe('Resource Allocation Visualizer', () => {
    test('should visualize and manage workloads', async ({ page }) => {
      await page.click('text=Resource Allocation');
      const initialData = await page.locator('.workload').count();
      expect(initialData).toBeGreaterThan(0);
      
      await page.click('.workload:first-child .action-button:has-text("Adjust Task")');
      await page.selectOption('select[name="taskAssignment"]', 'Task 2');
      await page.click('button:has-text("Apply Changes")');
      const alertMessage = await page.locator('.alert').textContent();
      expect(alertMessage).toContain('Resource allocation updated');
    });
  });

  test.describe('Customizable Keyboard Shortcuts', () => {
    test('should create and verify customizable keyboard shortcuts', async ({ page }) => {
      await page.click('text=Keyboard Shortcuts');
      await page.fill('input[name="shortcut"]', 'Ctrl+N');
      await page.fill('input[name="action"]', 'New File');
      await page.click('button:has-text("Save Shortcut")');
      const shortcutConfirmation = await page.locator('.notification').textContent();
      expect(shortcutConfirmation).toContain('Shortcut for New File created');
      
      const appliedShortcuts = await page.locator('.shortcuts-list li').count();
      expect(appliedShortcuts).toBeGreaterThan(0);
    });
  });

  test.describe('User Management', () => {
    test('should manage user accounts successfully', async ({ page }) => {
      await page.click('text=User Management');
      await page.fill('input[name="username"]', 'newuser');
      await page.fill('input[name="email"]', 'newuser@example.com');
      await page.selectOption('select[name="role"]', 'Developer');
      await page.click('button:has-text("Add User")');
      const userConfirmation = await page.locator('.notification').textContent();
      expect(userConfirmation).toContain('User newuser created successfully');

      await page.click(`text=newuser button:has-text("Remove")`);
      const removeConfirmation = await page.locator('.notification').textContent();
      expect(removeConfirmation).toContain('User newuser removed successfully');
    });
  });

});