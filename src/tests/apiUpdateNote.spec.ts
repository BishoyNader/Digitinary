// src/tests/apiUpdateNote.spec.ts
import { test, expect } from '@playwright/test';
import { createNote, updateNote } from '../helpers/apiHelper';

interface Note {
  id: string;
  title: string;
  description: string;
  category: string;
  completed?: boolean;
}

test.describe('Update Note API', () => {
  const invalidToken = 'invalid-user-token';
  const noteTitle = 'Test Note Title';
  const noteDescription = 'This is a test note description.';
  const noteCategory = 'Home'; // Use one of the valid categories: Home, Work, Personal

  const newNoteTitle = 'Updated Note Title';
  const newNoteDescription = 'Updated note description.';
  const newNoteCategory = 'Work'; // Use one of the valid categories: Home, Work, Personal
  const completed = true;

  test('Positive Scenario: Update a note with valid data and token', async ({ request }) => {
    const createResponseBody = await createNote(request, noteTitle, noteDescription, noteCategory);
    const noteId = createResponseBody?.data?.id;
    if (!noteId) throw new Error('Note ID not found.');

    const updateResponseBody = await updateNote(request, noteId, newNoteTitle, newNoteDescription, completed, newNoteCategory);
    console.log(`Update Note Response: ${JSON.stringify(updateResponseBody)}`);

    if (!updateResponseBody.data) {
      throw new Error(`Update failed with response: ${JSON.stringify(updateResponseBody)}`);
    }

    expect(updateResponseBody.data.title).toBe(newNoteTitle);
    expect(updateResponseBody.data.description).toBe(newNoteDescription);
    expect(updateResponseBody.data.completed).toBe(completed);
    expect(updateResponseBody.data.category).toBe(newNoteCategory);
  });

  test('Negative Scenario: Update note with invalid token', async ({ request }) => {
    const createResponseBody = await createNote(request, noteTitle, noteDescription, noteCategory);
    const noteId = createResponseBody?.data?.id;
    if (!noteId) throw new Error('Note ID not found.');

    const updateResponseBody = await updateNote(request, noteId, newNoteTitle, newNoteDescription, completed, newNoteCategory, invalidToken);
    console.log(`Update Note Response: ${JSON.stringify(updateResponseBody)}`);

    expect(updateResponseBody.status).toBe(401);
    expect(updateResponseBody.message).toBe('Access token is not valid or has expired, you will need to login');
  });
});
