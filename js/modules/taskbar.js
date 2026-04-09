// ===== TASKBAR =====
import { state } from '../state.js';

export function addTaskbarBtn(id, icon, title, onMinimize, onUnminimize, onFocus) {
  const bar = document.getElementById('taskbar-windows');
  const btn = document.createElement('div');
  btn.className = 'taskbar-btn active';
  btn.id = `tbtn-${id}`;
  btn.innerHTML = `${icon} ${title}`;
  btn.onclick = () => {
    if (state.windows[id] && state.windows[id].minimized) {
      onUnminimize(id);
    } else if (state.activeWindowId === id) {
      onMinimize(id);
    } else {
      onFocus(id);
    }
  };
  bar.appendChild(btn);
}
