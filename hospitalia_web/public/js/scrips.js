document.addEventListener('DOMContentLoaded', () => {
  const statusDiv = document.getElementById('status');
  statusDiv.style.display = 'none'; // Esconde o status por padrão

  // Verifica conexão com a API
  axios.get('http://localhost:1141/')
    .then(() => {
      // Mostra um ícone verde pequeno no canto se conectado
      mostrarStatusConexao(true);
    })
    .catch(() => {
      // Não mostra nada se falhar (ou pode mostrar um ícone vermelho, se quiser)
      mostrarStatusConexao(false);
    });

  // Animação da logo (opcional)
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.style.transform = 'translateY(-100px)';
    setTimeout(() => {
      logo.style.transition = 'transform 0.5s ease-out';
      logo.style.transform = 'translateY(0)';
    }, 100);
  }

  // Redireciona se já estiver logado
  const token = localStorage.getItem('userToken');
  if (token) {
    window.location.href = '/tabRoutes';
  }
});

function mostrarStatusConexao(status) {
  let statusIcon = document.getElementById('statusIcon');
  if (!statusIcon) {
    statusIcon = document.createElement('span');
    statusIcon.id = 'statusIcon';
    statusIcon.style.position = 'fixed';
    statusIcon.style.bottom = '10px';
    statusIcon.style.right = '10px';
    statusIcon.style.fontSize = '18px';
    statusIcon.style.zIndex = '9999';
    document.body.appendChild(statusIcon);
  }
  if (status === "ok") {
    statusIcon.innerHTML = '🟢 <span style="font-size:12px;"></span>';
    statusIcon.title = 'Conectado à API';
  } else if (status === "manutencao") {
    statusIcon.innerHTML = '🟠 <span style="font-size:12px;">Manutenção</span>';
    statusIcon.title = 'API em manutenção';
  } else {
    statusIcon.innerHTML = '🔴 <span style="font-size:12px;">Off</span>';
    statusIcon.title = 'Erro ao conectar à API';
  }
}
function toggleSenha() {
  const senhaField = document.getElementById('senha');
  const type = senhaField.type === 'password' ? 'text' : 'password';
  senhaField.type = type;
}

async function login() {
  const usuario = document.getElementById('usuario').value;
  const senha = document.getElementById('senha').value;
  const salvarUsuario = document.getElementById('salvarUsuario').checked;

  if (!usuario || !senha) {
    alert('Preencha todos os campos!');
    return;
  }

  document.getElementById('loading').classList.remove('hidden');
  // Não mostra status de autenticação para o usuário
  // document.getElementById('status').textContent = 'Autenticando...';

  try {
    const response = await axios.post('http://localhost:1141/api/autorizacao/login', {
      login: usuario,
      senha: senha
    });

    const data = response.data;

    if (data.access_token) {
      localStorage.setItem('userToken', data.access_token);
      alert('Login realizado com sucesso!');

      if (salvarUsuario) {
        localStorage.setItem('savedUsername', usuario);
        localStorage.setItem('savedPassword', senha);
      } else {
        localStorage.removeItem('savedUsername');
        localStorage.removeItem('savedPassword');
      }

      window.location.href = '/tabRoutes';
    } else {
      alert('Credenciais inválidas.');
    }
  } catch (error) {
    alert('Erro ao autenticar. Tente novamente.');
  } finally {
    document.getElementById('loading').classList.add('hidden');
  }
}