const express = require('express');
const router = express.Router();
const api = require('./axios.js');

router.post('/login', async (req, res) => {
  try {
    const { login, senha } = req.body;
    
    // Substitua pela chamada real à sua API
    const response = await api.post('/auth/login', { login });
    
    res.json({
      success: true,
      access_token: response.data.token,
      user: response.data.user
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      error: 'Credenciais inválidas'
    });
  }
});

module.exports = router;