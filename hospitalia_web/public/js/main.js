import api from "axios";

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;

    try {
      const res = await api.post('http://localhost:5050/api#/autorizacao/login', {
        login: email,
        senha
      });

      localStorage.setItem('token', res.data.access_token);
      localStorage.setItem('user', JSON.stringify(res.data.userInfo));

      alert('✅ Login realizado com sucesso');
      window.location.href = 'bjr.html';

    } catch (err) {
      console.error(err);
      alert('❌ Login ou senha inválidos');
    }
  });
});
