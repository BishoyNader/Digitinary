// src/tests/apiCreateNote.spec.ts
import { test, expect } from '@playwright/test';
import { createNote, getAllNotes } from '../helpers/apiHelper';

interface Note {
  id: string;
  title: string;
  description: string;
  category: string;
  completed?: boolean;
}

test.describe('Create Note API', () => {
  const invalidToken = 'invalid-user-token';
  const noteTitle = 'Test Note Title';
  const noteDescription = 'This is a test note description.';
  const noteCategory = 'Home'; // Use one of the valid categories: Home, Work, Personal

  test('Positive Scenario: Create a note with valid token and verify in list', async ({ request }) => {
    const createResponseBody = await createNote(request, noteTitle, noteDescription, noteCategory);
    expect(createResponseBody.success).toBe(true);
    expect(createResponseBody.data.title).toBe(noteTitle);
    expect(createResponseBody.data.description).toBe(noteDescription);
    expect(createResponseBody.data.category).toBe(noteCategory);

    // Verify the note from the notes list
    const noteId = createResponseBody.data.id;
    const listResponseBody = await getAllNotes(request);
    expect(listResponseBody.data.some((note: Note) => note.id === noteId)).toBeTruthy();
  });

  test('Negative Scenario: Create a note with invalid token', async ({ request }) => {
    const createResponseBody = await createNote(request, noteTitle, noteDescription, noteCategory, invalidToken);
    expect(createResponseBody.status).toBe(401); // Assuming 401 for unauthorized
    expect(createResponseBody.message).toBe('Access token is not valid or has expired, you will need to login');
  });

  test('Negative Scenario: Create a note without a title', async ({ request }) => {
    const createResponseBody = await createNote(request, '', noteDescription, noteCategory);
    expect(createResponseBody.status).toBe(400); // Assuming 400 for bad request
    expect(createResponseBody.message).toBe('Title must be between 4 and 100 characters');
  });
});
