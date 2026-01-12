document.addEventListener('DOMContentLoaded', () => {

  /* ==================================================
     STATUS DA API – ATUALIZAÇÃO EM TEMPO REAL
  ================================================== */
  async function atualizarStatus() {
    const panel = document.getElementById('statusPanel');
    if (!panel) return;

    try {
      const res = await axios.get('http://localhost:5050/api/status');
      const components = res.data.components || [];

      panel.innerHTML = components.map(c => `
        <div class="status-item">
          <span class="status-dot pulse" style="background:${c.colorCode}"></span>
          <strong>${c.name}</strong>: ${c.status}
        </div>
      `).join('');

    } catch (err) {
      panel.innerHTML = `
        <div><span class="status-dot pulse" style="background:#dc3545"></span> API: Offline</div>
        <div><span class="status-dot pulse" style="background:#dc3545"></span> Banco: Offline</div>
        <div><span class="status-dot pulse" style="background:#dc3545"></span> IA: Offline</div>
      `;
    }
  }

  atualizarStatus();
  setInterval(atualizarStatus, 10000);


  /* ==================================================
     ANIMAÇÃO DE LOGIN – EFEITO FOLHA (DIREITA → ESQUERDA)
  ================================================== */

  const loginBtn = document.getElementById('openLogin');
  const loginOverlay = document.getElementById('loginOverlay');
  const closeLogin = document.getElementById('closeLogin');

  if (loginBtn && loginOverlay) {
    loginBtn.addEventListener('click', e => {
      e.preventDefault();

      loginOverlay.style.display = 'flex';

      // força reflow para a animação funcionar
      loginOverlay.offsetHeight;

      loginOverlay.classList.add('active');
    });
  }

  if (closeLogin && loginOverlay) {
    closeLogin.addEventListener('click', () => {
      loginOverlay.classList.remove('active');

      setTimeout(() => {
        loginOverlay.style.display = 'none';
      }, 800);
    });
  }


  /* ==================================================
     LOGIN (JWT / API)
  ================================================== */

  const loginForm = document.getElementById('loginForm');

  if (loginForm) {
    loginForm.addEventListener('submit', async e => {
      e.preventDefault();

      const usuario = document.getElementById('email').value;
      const senha = document.getElementById('password').value;

      try {
        // 🔐 EXEMPLO REAL
        /*
        const res = await axios.post('http://localhost:5050/api/auth/login', {
          email: usuario,
          password: senha
        });

        localStorage.setItem('token', res.data.access_token);
        */

        // 🔧 SIMULAÇÃO
        if (usuario && senha) {
          localStorage.setItem('token', 'fake-jwt-token');

          loginOverlay.classList.remove('active');

          setTimeout(() => {
            window.location.href = 'dashboard.html';
          }, 700);
        } else {
          alert('Credenciais inválidas');
        }

      } catch (err) {
        alert('Erro ao autenticar');
      }
    });
  }

});


/* ==================================================
   VISITAR SEM LOGIN
================================================== */
function visitWithoutLogin() {
  const dashboard = document.getElementById('dashboard');

  if (dashboard) {
    dashboard.style.display = 'block';
    dashboard.scrollIntoView({ behavior: 'smooth' });
  }
}
