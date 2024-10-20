// src/tests/apiDeleteNote.spec.ts
import { test, expect } from '@playwright/test';
import { createNote, deleteNote } from '../helpers/apiHelper';

interface Note {
  id: string;
  title: string;
  description: string;
  category: string;
  completed?: boolean;
}

test.describe('Delete Note API', () => {
  const invalidToken = 'invalid-user-token';
  const noteTitle = 'Test Note Title';
  const noteDescription = 'This is a test note description.';
  const noteCategory = 'Home'; // Use one of the valid categories: Home, Work, Personal

  test('Positive Scenario: Delete a note with valid token', async ({ request }) => {
    const createResponseBody = await createNote(request, noteTitle, noteDescription, noteCategory);
    const noteId = createResponseBody?.data?.id;
    if (!noteId) throw new Error('Note ID not found.');

    const deleteResponseBody = await deleteNote(request, noteId);
    expect(deleteResponseBody.success).toBe(true);
  });

  test('Negative Scenario: Delete note with invalid token', async ({ request }) => {
    const createResponseBody = await createNote(request, noteTitle, noteDescription, noteCategory);
    const noteId = createResponseBody?.data?.id;
    if (!noteId) throw new Error('Note ID not found.');

    const deleteResponseBody = await deleteNote(request, noteId, invalidToken);
    expect(deleteResponseBody.status).toBe(401);
    expect(deleteResponseBody.message).toBe('Access token is not valid or has expired, you will need to login');

    // Clean up: Delete the created note
    await deleteNote(request, noteId);
  });
});
