// src/tests/apiChangePassword.spec.ts
import { test, expect } from '@playwright/test';
import { changeUserPassword } from '../helpers/apiHelper';

test.describe('Change User Password API', () => {
  const currentPassword = '123123';
  const newPassword = '123456';
  const invalidToken = 'invalid-user-token';
  const invalidCurrentPassword = 'WrongPassword123';

  test('Positive Scenario: Change password with valid data and token', async ({ request }) => {
    const responseBody = await changeUserPassword(request, currentPassword, newPassword);
    console.log(`Change Password Response: ${JSON.stringify(responseBody)}`);

    expect(responseBody.status).toBe(200);
    expect(responseBody.message).toBe('The password was successfully updated');

    // Revert password back to old one
    await changeUserPassword(request, newPassword, currentPassword);
  });

  test('Negative Scenario: Change password with invalid token', async ({ request }) => {
    try {
      await changeUserPassword(request, currentPassword, newPassword, invalidToken);
    } catch (error) {
      const err = error as Error;
      expect(err.message).toContain('Access token is not valid or has expired, you will need to login');
    }
  });

  test('Negative Scenario: Change password with incorrect current password', async ({ request }) => {
    try {
      await changeUserPassword(request, invalidCurrentPassword, newPassword);
    } catch (error) {
      const err = error as Error;
      expect(err.message).toContain('Current password is incorrect');
    }
  });

  test('Negative Scenario: Change password with new password same as current password', async ({ request }) => {
    try {
      await changeUserPassword(request, currentPassword, currentPassword);
    } catch (error) {
      const err = error as Error;
      expect(err.message).toContain('New password cannot be the same as current password');
    }
  });
});
