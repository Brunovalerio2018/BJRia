const express = require('express');
const path = require('path');
const cors = require('cors');
const routes = require('./routes/routes'); // importa seu arquivo de rotas

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({ origin: '*' }));

// Servir arquivos estáticos (CSS, JS, imagens)
app.use(express.static(path.join(__dirname, 'public')));

// Usar as rotas definidas em routes.js
app.use('/', routes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`[WEB] Frontend rodando em http://localhost:${PORT}`);
});
