const axios = require("axios");

const api = axios.create({
  baseURL: "http://localhost:1141", // Ajuste para o endereço correto do seu backend
  headers: {
    "x-app-origin": "hospitalia_api",
    "Content-Type": "application/json"
  },
  timeout: 10000, // Tempo limite de 10 segundos para a requisição
  maxRedirects: 0 // Desabilita redirecionamentos automáticos
});

// Interceptor de requisição
api.interceptors.request.use(config => {
  console.log('[AXIOS] Requisitando:', config.baseURL + config.url);
  return config;
});

// Interceptor de resposta
api.interceptors.response.use(
  response => {
    console.log('[AXIOS] Resposta recebida:', response.status, response.data);
    return response;
  },
  error => {
    console.error('[AXIOS] Erro na requisição:', error.message);
    if (error.response) {
      console.error('[AXIOS] Detalhes do erro:', error.response.data);
    }
    return Promise.reject(error);
  }
);

module.exports = api;