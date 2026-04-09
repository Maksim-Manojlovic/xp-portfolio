// ===== START MENU =====

export function toggleStartMenu() {
  const menu = document.getElementById('start-menu');
  menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
}

export function closeStartMenu() {
  document.getElementById('start-menu').style.display = 'none';
}
