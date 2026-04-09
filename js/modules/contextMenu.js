// ===== CONTEXT MENU =====
import { closeStartMenu } from './startMenu.js';

export function showContextMenu(x, y) {
  const menu = document.getElementById('context-menu');
  menu.style.display = 'block';
  menu.style.left = x + 'px';
  menu.style.top = Math.min(y, window.innerHeight - menu.offsetHeight - 30) + 'px';
  closeStartMenu();
}

export function hideContextMenu() {
  document.getElementById('context-menu').style.display = 'none';
}

export function initContextMenu() {
  document.getElementById('desktop').addEventListener('contextmenu', e => {
    e.preventDefault();
    showContextMenu(e.clientX, e.clientY);
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('#context-menu')) hideContextMenu();
    if (!e.target.closest('#start-menu') && !e.target.closest('#start-btn')) closeStartMenu();
  });
}
