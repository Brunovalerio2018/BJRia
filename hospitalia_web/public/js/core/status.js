import { api } from './api.js';
import { ENV } from '../config/env.js';

export function initStatus() {
  const panel = document.getElementById('statusPanel');
  if (!panel) return;

  async function atualizar() {
    try {
      const { data } = await api.get('/status');
      panel.innerHTML = data.components.map(c => `
        <div class="status-item">
          <span class="status-dot pulse" style="background:${c.colorCode}"></span>
          ${c.name}: ${c.status}
        </div>
      `).join('');
    } catch {
      panel.innerHTML = `<span class="status-dot red"></span> Sistema Offline`;
    }
  }

  atualizar();
  setInterval(atualizar, ENV.STATUS_REFRESH);
}
