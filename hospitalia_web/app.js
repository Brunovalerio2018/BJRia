const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();

// Porta
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({ origin: '*' }));

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal (login)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para visitante sem login
app.get('/visitante', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'bjr.html'));
});

// Teste de API
app.get('/api/testaconexao', (req, res) => {
  res.json({ success: true, apiStatus: 'API está funcionando!' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`[WEB] Frontend rodando em http://localhost:${PORT}`);
});
