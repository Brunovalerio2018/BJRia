import { api } from './api.js';

export function initAuth() {
  const token = localStorage.getItem('token');
  if (!token && location.pathname.includes('dashboard')) {
    location.href = 'login.html';
  }
}

export async function login(email, password) {
  const { data } = await api.post('/auth/login', { email, password });
  localStorage.setItem('token', data.access_token);
}

export function logout() {
  localStorage.removeItem('token');
  location.href = 'login.html';
}
