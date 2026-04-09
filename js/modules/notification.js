// ===== NOTIFICATION =====
import { playNotification } from './audio.js';

export function showNotification(title, msg) {
  playNotification();
  const notif = document.createElement('div');
  notif.className = 'xp-notification';
  notif.innerHTML = `<div class="xp-notification-title">${title}</div><div>${msg.replace(/\n/g, '<br>')}</div><div class="xp-notification-close" onclick="this.parentNode.remove()">✕</div>`;
  document.body.appendChild(notif);
  setTimeout(() => { if (notif.parentNode) notif.remove(); }, 5000);
}
