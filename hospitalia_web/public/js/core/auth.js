// auth.js
import { api } from './api_axios.js';

export async function login(email, senha) {
  try {
    const { data } = await api.post('/autorizacao/login', {
      login: email,
      senha
    });

    // Salva token e dados do usuário
    localStorage.setItem('token', data.access_token);
    localStorage.setItem('user', JSON.stringify(data.userInfo));

    return true; // login ok
  } catch (err) {
    console.error('Login falhou:', err.response?.data || err.message);
    return false; // login falhou
  }
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = 'login.html';
}

// Para proteger páginas privadas
export function protectRoute() {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'login.html';
  }
}

// Pegar dados do usuário logado
export function getUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}
