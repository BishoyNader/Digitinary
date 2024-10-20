// src/tests/apiLogin.spec.ts
import { test, expect } from '@playwright/test';
import { loginUser } from '../helpers/apiHelper';

interface User {
  email: string;
  password: string;
}

test.describe('User Login API', () => {
  const validUser: User = {
    email: 'test12@test13.com',
    password: '123123'
  };
  const invalidUser: User = {
    email: 'invalid_user@example.com',
    password: 'InvalidPassword123'
  };

  test('should login with valid credentials (positive)', async ({ request }) => {
    const responseBody = await loginUser(request, validUser.email, validUser.password);
    expect(responseBody.status).toBe(200);
    expect(responseBody.message).toBe('Login successful');
    expect(responseBody.data.email).toBe(validUser.email);
  });

  test('should fail to login with invalid password (negative)', async ({ request }) => {
    const responseBody = await loginUser(request, validUser.email, 'WrongPassword123');
    expect(responseBody.status).toBe(401);
    expect(responseBody.message).toBe('Incorrect email address or password');
  });

  test('should fail to login with non-existent email (negative)', async ({ request }) => {
    const responseBody = await loginUser(request, invalidUser.email, invalidUser.password);
    expect(responseBody.status).toBe(401);
    expect(responseBody.message).toBe('Incorrect email address or password');
  });

  test('should fail to login with invalid email format (negative)', async ({ request }) => {
    const responseBody = await loginUser(request, 'invalid_email_format', validUser.password);
    expect(responseBody.status).toBe(400);
    expect(responseBody.message).toBe('A valid email address is required');
  });
});
