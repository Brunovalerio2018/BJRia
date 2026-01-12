import api from "axios";

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;

    try {
      const res = await api.post('/autorizacao/login', {
        login: email,
        senha
      });

      localStorage.setItem('token', res.data.access_token);
      localStorage.setItem('user', JSON.stringify(res.data.userInfo));

      alert('✅ Login realizado com sucesso');
      window.location.href = 'bjr.html';

    } catch (err) {
      alert('❌ Login ou senha inválidos');
    }
  });
});
