// ===== START MENU =====
import { playStartMenu } from './audio.js';

export function toggleStartMenu() {
  const menu = document.getElementById('start-menu');
  const opening = menu.style.display !== 'flex';
  menu.style.display = opening ? 'flex' : 'none';
  if (opening) playStartMenu();
}

export function closeStartMenu() {
  document.getElementById('start-menu').style.display = 'none';
}
