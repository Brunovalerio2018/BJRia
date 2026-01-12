import { protectRoute, getUser, logout } from './core/auth.js';

document.addEventListener('DOMContentLoaded', () => {
  // Bloqueia acesso se não estiver logado
  protectRoute();

  // Mostra dados do usuário
  const user = getUser();
  if (user) {
    document.getElementById('userName').textContent = user.nome;
    document.getElementById('userEmail').textContent = user.email;
  }

  // Botão logout (opcional)
  const btnLogout = document.getElementById('btnLogout');
  if (btnLogout) btnLogout.addEventListener('click', logout);
});
