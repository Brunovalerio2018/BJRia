const api = axios.create({
  baseURL: "http://localhost:5050", // URL do backend
  headers: {
    "x-app-origin": "hospitalia_api",
    "Content-Type": "application/json"
  },
  timeout: 10000
});

api.interceptors.request.use(config => {
  console.log('[AXIOS] Requisitando:', config.url);
  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    console.error('[AXIOS] Erro:', error.message);
    if (error.response) console.error('[AXIOS] Detalhes:', error.response.data);
    return Promise.reject(error);
  }
);
