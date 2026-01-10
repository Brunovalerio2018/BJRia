const express = require('express');
const router = express.Router();
const api = require('./axios.js'); // Importa Axios da mesma pasta

router.get('/testaconexao', async (req, res) => {
  try {
    const response = await api.get('/');
    res.json({ 
      success: true,
      data: response.data,
      apiStatus: 'Conectado com sucesso à API'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      apiStatus: 'Falha na conexão com a API'
    });
  }
});

module.exports = router;