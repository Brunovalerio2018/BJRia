        // main.js
        import { login } from './core/auth.js';

        document.addEventListener('DOMContentLoaded', () => {
          const form = document.getElementById('loginForm');

          form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const senha = document.getElementById('password').value;

            const sucesso = await login(email, senha);

            if (sucesso) {
              // Redireciona para o dashboard
              window.location.href = '../dashboard.html';
            } else {
              alert('❌ Login ou senha inválidos');
            }
          });
        });