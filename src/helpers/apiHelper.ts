// src/helpers/apiHelper.ts
import { APIRequestContext } from '@playwright/test';

export const apiUrl = 'https://practice.expandtesting.com/notes/api';
const validToken = '583121be06c4469fa81e7ebbc855f92196c340455cc042d49b74286b94bca11f';

export const createNote = async (request: APIRequestContext, title: string, description: string, category: string, token = validToken) => {
  const response = await request.post(`${apiUrl}/notes`, {
    data: { title, description, category },
    headers: { 'x-auth-token': token }
  });
  const responseBody = await response.json();
  console.log(`Create Note Response status: ${response.status()}`);
  console.log(`Create Note Response body: ${JSON.stringify(responseBody)}`);
  return responseBody;
};

export const updateNote = async (request: APIRequestContext, noteId: string, title: string, description: string, completed: boolean, category: string, token = validToken) => {
  const response = await request.put(`${apiUrl}/notes/${noteId}`, {
    data: { title, description, completed, category },
    headers: { 'x-auth-token': token }
  });
  const responseBody = await response.json();
  console.log(`Update Note Response status: ${response.status()}`);
  console.log(`Update Note Response body: ${JSON.stringify(responseBody)}`);
  return responseBody;
};

export const deleteNote = async (request: APIRequestContext, noteId: string, token = validToken) => {
  const response = await request.delete(`${apiUrl}/notes/${noteId}`, {
    headers: { 'x-auth-token': token }
  });
  const responseBody = await response.json();
  console.log(`Delete Note Response status: ${response.status()}`);
  console.log(`Delete Note Response body: ${JSON.stringify(responseBody)}`);
  return responseBody;
};

export const getAllNotes = async (request: APIRequestContext, token = validToken) => {
  const response = await request.get(`${apiUrl}/notes`, {
    headers: { 'x-auth-token': token }
  });
  const responseBody = await response.json();
  console.log(`Get All Notes Response status: ${response.status()}`);
  console.log(`Get All Notes Response body: ${JSON.stringify(responseBody)}`);
  return responseBody;
};

export const registerUser = async (request: APIRequestContext, name: string, email: string, password: string) => {
  const response = await request.post(`${apiUrl}/users/register`, {
    data: { name, email, password },
    headers: { 'Content-Type': 'application/json' }
  });
  const responseBody = await response.json();
  console.log(`Register User Response status: ${response.status()}`);
  console.log(`Register User Response body: ${JSON.stringify(responseBody)}`);
  return responseBody;
};

export const loginUser = async (request: APIRequestContext, email: string, password: string) => {
  const response = await request.post(`${apiUrl}/users/login`, {
    data: { email, password },
    headers: { 'Content-Type': 'application/json' }
  });
  const responseBody = await response.json();
  console.log(`Login User Response status: ${response.status()}`);
  console.log(`Login User Response body: ${JSON.stringify(responseBody)}`);
  return responseBody;
};

export const updateUserProfile = async (request: APIRequestContext, name: string, phone: string, company: string, token = validToken) => {
    const response = await request.patch(`${apiUrl}/users/profile`, {
      data: { name, phone, company },
      headers: { 'x-auth-token': token }
    });
  
    const responseText = await response.text();
    console.log(`Update User Profile Response status: ${response.status()}`);
    console.log(`Update User Profile Response body: ${responseText}`);
    
    if (response.status() !== 200) {
      throw new Error(`Unexpected response: ${responseText}`);
    }
  
    try {
      const responseBody = JSON.parse(responseText);
      return responseBody;
    } catch (e) {
      throw new Error(`Failed to parse JSON response: ${responseText}`);
    }
  };

  export const changeUserPassword = async (request: APIRequestContext, currentPassword: string, newPassword: string, token = validToken) => {
    const response = await request.post(`${apiUrl}/users/change-password`, {
      data: { currentPassword, newPassword },
      headers: { 'x-auth-token': token, 'Content-Type': 'application/json' }
    });
    const responseBody = await response.json();
    console.log(`Change User Password Response status: ${response.status()}`);
    console.log(`Change User Password Response body: ${JSON.stringify(responseBody)}`);
    return responseBody;
  };
