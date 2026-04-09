// ===== DESKTOP ICONS =====
import { state } from '../state.js';
import { iconDefs, XP_ICONS } from '../data/icons.js';
import { startIconDrag } from './drag.js';
import { hideContextMenu } from './contextMenu.js';
import { closeStartMenu } from './startMenu.js';

export function initDesktop() {
  const desktop = document.getElementById('desktop');
  iconDefs.forEach(def => {
    const el = document.createElement('div');
    el.className = 'desktop-icon';
    el.id = `icon-${def.id}`;
    el.style.left = def.x + 'px';
    el.style.top  = def.y + 'px';
    const svgIcon = XP_ICONS[def.id] || `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="32" height="32" rx="3" fill="#dde8f8" stroke="#7f9db9" stroke-width="1"/></svg>`;
    el.innerHTML = `<div class="desktop-icon-img">${svgIcon}</div><div class="desktop-icon-label">${def.label}</div>`;
    el.addEventListener('click', e => { e.stopPropagation(); selectIcon(def.id); });
    el.addEventListener('dblclick', e => { e.stopPropagation(); iconAction(def.id); });
    el.addEventListener('mousedown', e => { e.stopPropagation(); startIconDrag(e, def.id); });
    desktop.appendChild(el);
  });
}

export function selectIcon(id) {
  document.querySelectorAll('.desktop-icon').forEach(el => el.classList.remove('selected'));
  const el = document.getElementById(`icon-${id}`);
  if (el) el.classList.add('selected');
  state.selectedIcon = id;
}

export function iconAction(id) {
  if (id === 'github')   { window.open('https://github.com/Maksim-Manojlovic', '_blank'); return; }
  if (id === 'linkedin') { window.open('https://www.linkedin.com/in/maksim-manojlovic-10ab28244/', '_blank'); return; }
  if (id === 'game')     { window.openGameLauncher(); return; }
  window.openWindow(id);
}

export function desktopClick(e) {
  if (e.target === document.getElementById('desktop')) {
    document.querySelectorAll('.desktop-icon').forEach(el => el.classList.remove('selected'));
    state.selectedIcon = null;
  }
  hideContextMenu();
  closeStartMenu();
}

export function sortIcons() {
  iconDefs.forEach((def, i) => {
    const el = document.getElementById(`icon-${def.id}`);
    if (el) { el.style.left = '14px'; el.style.top = (14 + i * 96) + 'px'; }
  });
  hideContextMenu();
}
