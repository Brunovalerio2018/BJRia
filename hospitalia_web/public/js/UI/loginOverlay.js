export function initLoginOverlay() {
  const loginBtn = document.getElementById('openLogin');
  const overlay = document.getElementById('loginOverlay');
  const closeBtn = document.getElementById('closeLogin');

  if (!loginBtn || !overlay) return;

  loginBtn.addEventListener('click', e => {
    e.preventDefault();
    overlay.style.display = 'flex';
    overlay.offsetHeight;
    overlay.classList.add('active');
  });

  closeBtn?.addEventListener('click', () => {
    overlay.classList.remove('active');
    setTimeout(() => overlay.style.display = 'none', 800);
  });
}
