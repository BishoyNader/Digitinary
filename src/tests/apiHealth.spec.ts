// src/tests/apiHealthCheck.spec.ts
import { test, expect } from '@playwright/test';
import axios from 'axios';
import { apiUrl } from '../helpers/apiHelper';

test('Healthy API', async () => {
  const response = await axios.get(`${apiUrl}/api-docs/Health/get_health_check`);
  expect(response.status).toBe(200);
  expect(response.data.length).toBeGreaterThan(0);
});
