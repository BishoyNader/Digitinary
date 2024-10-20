// src/tests/apiRegisterUser.spec.ts
import { test, expect } from '@playwright/test';
import { registerUser } from '../helpers/apiHelper';

test.describe('Register User API', () => {
  const username = 'testuser';
  const validUsername = 'test';
  const validEmail = 'testuser@example.com';
  const invalidEmail = 'testuser@example';
  const validPassword = 'ValidPassword123';
  const shortPassword = 'short'
  test('Positive Scenario: Register a new user', async ({ request }) => {
    const username = `user_${Math.random().toString(36).substring(7)}`;
    const email = `${username}@example.com`;
    const password = 'TestPassword123';
    const registerResponseBody = await registerUser(request, username, email, password);
    expect(registerResponseBody.status).toBe(201);
    expect(registerResponseBody.data.name).toBe(username);
  });

  test('Negative Scenario: Register with an existing email', async ({ request }) => {
    const username = 'existing_user';
    const email = 'existing_user@example.com';
    const password = 'ExistingPassword123';
    const registerResponseBody = await registerUser(request, username, email, password);
    expect(registerResponseBody.status).toBe(409);
    expect(registerResponseBody.message).toBe('An account already exists with the same email address');
  });

  test('Negative Scenario: Register user with short password', async ({ request }) => {
    const registerResponseBody = await registerUser(request, validUsername, validEmail, shortPassword);
    expect(registerResponseBody.status).toBe(400); // Assuming 400 for bad request
    expect(registerResponseBody.message).toBe('Password must be between 6 and 30 characters');
  });

  test('Negative Scenario: Register user with invalid email format', async ({ request }) => {
    const registerResponseBody = await registerUser(request, username, invalidEmail, validPassword);
    expect(registerResponseBody.status).toBe(400); // Assuming 400 for bad request
    expect(registerResponseBody.message).toBe('A valid email address is required');
  });
});
