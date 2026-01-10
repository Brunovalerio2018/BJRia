const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();

// Porta de execução
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: '*', // Ajuste para produção (ver sugestão de segurança)
}));

// Arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// Rota de teste de conexão com a API
app.get('/api/testaconexao', (req, res) => {
  res.json({ success: true, apiStatus: 'API está funcionando!' });
});


// Rota de teste de conexão com o banco de dados
// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`[WEB] Frontend rodando em http://localhost:${PORT}`);
});
