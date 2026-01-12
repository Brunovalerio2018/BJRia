import axios from 'axios';

export const api = axios.create({
  baseURL: "http://localhost:5050", // seu backend
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 10000
});

// Logs de requisição
api.interceptors.request.use(config => {
  console.log('[AXIOS] Requisitando:', config.url);
  return config;
});

// Logs de resposta
api.interceptors.response.use(
  response => response,
  error => {
    console.error('[AXIOS] Erro:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);
