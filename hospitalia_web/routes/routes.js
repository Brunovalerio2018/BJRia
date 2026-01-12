const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Caminho base do HTML
const BJRIA_PATH = path.join(__dirname, '..', 'public', 'bjria');

// --------------------
// Função para servir qualquer HTML
// --------------------
function serveHtml(filePath) {
  return (req, res) => {
    const fullPath = path.join(BJRIA_PATH, filePath);
    fs.access(fullPath, fs.constants.F_OK, (err) => {
      if (err) return res.status(404).send('Página não encontrada');
      res.sendFile(fullPath);
    });
  };
}

// --------------------
// Rotas raiz
// --------------------
router.get('/', serveHtml('login.html'));
router.get('/bjr.html', serveHtml('bjr.html'));

// --------------------
// Rotas automáticas por pasta e página
// --------------------
// Estrutura de páginas que você quer mapear
const routesMap = {
  auditoria: ['logs'],
  epidemiologia: ['mapa'],
  gestao: ['licencas'],
  hospitais: ['relatorios', 'uti'],
  ia: ['alertas', 'diagnostico'],
  pacientes: ['criticos', 'historico'],
};

// Gera rotas dinamicamente
for (const folder in routesMap) {
  routesMap[folder].forEach(page => {
    router.get(`/${folder}/${page}`, serveHtml(`${folder}/${page}.html`));
  });
}

// --------------------
// Rota 404 genérica
// --------------------
router.use((req, res) => {
  serveHtml('404.html')(req, res);
});

module.exports = router;
