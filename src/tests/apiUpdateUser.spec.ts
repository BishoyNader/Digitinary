// src/tests/apiUpdateUser.spec.ts
import { test, expect } from '@playwright/test';
import { updateUserProfile } from '../helpers/apiHelper';

test.describe('Update User Profile API', () => {
  const newName = 'Updated Name';
  const newPhone = '0987654321';
  const newCompany = 'Updated Company';

  test('Positive Scenario: Update profile with valid data and token', async ({ request }) => {
    const responseBody = await updateUserProfile(request, newName, newPhone, newCompany);
    console.log(`Update Profile Response: ${JSON.stringify(responseBody)}`);

    expect(responseBody.status).toBe(200);
    expect(responseBody.message).toBe('Profile updated successful');
    expect(responseBody.data.name).toBe(newName);
    expect(responseBody.data.phone).toBe(newPhone);
    expect(responseBody.data.company).toBe(newCompany);
  });

  test('Negative Scenario: Update profile with invalid token', async ({ request }) => {
    try {
      await updateUserProfile(request, newName, newPhone, newCompany, 'invalid-user-token');
    } catch (error) {
      const err = error as Error;
      expect(err.message).toContain('Access token is not valid or has expired, you will need to login');
    }
  });

  test('Negative Scenario: Update profile with invalid phone number', async ({ request }) => {
    try {
      await updateUserProfile(request, newName, '123', newCompany);
    } catch (error) {
      const err = error as Error;
      expect(err.message).toContain('Phone number should be between 8 and 20 digits');
    }
  });
});
