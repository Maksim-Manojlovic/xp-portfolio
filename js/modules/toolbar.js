// ===== TOOLBAR & MENU ACTION HELPERS =====
import { showNotification } from './notification.js';
import { PROJECT_CATEGORIES, PROJECTS } from '../data/projects.js';

export function toolbarBack(winId) {
  if (winId.startsWith('cat-')) { window.openWindow('projects'); return; }
  if (winId.startsWith('proj-')) {
    const projId = winId.replace('proj-', '');
    for (const cat of PROJECT_CATEGORIES) {
      if (PROJECTS[cat.id].find(p => p.id === projId)) {
        window.openCategoryWindow(cat.id);
        return;
      }
    }
  }
  showNotification('Back', 'Already at the beginning.');
}

export function toolbarUp(winId) {
  if (winId.startsWith('cat-') || winId.startsWith('proj-')) {
    window.openWindow('projects');
  } else {
    showNotification('Up', 'You\'re at the top level.');
  }
}

export function toolbarSearch(winId) {
  showNotification('Search', 'Search functionality coming soon!\nUse Ctrl+F to find on this page.');
}

export function toolbarFolders(winId) {
  showNotification('Folders', 'Folder panel toggle — coming soon!');
}

export function toggleToolbar(winId) {
  const toolbar = document.querySelector(`#window-${winId} .toolbar`);
  if (toolbar) toolbar.style.display = toolbar.style.display === 'none' ? 'flex' : 'none';
}

export function toggleStatusBar(winId) {
  const bar = document.querySelector(`#window-${winId} .status-bar`);
  if (bar) bar.style.display = bar.style.display === 'none' ? 'flex' : 'none';
}

export function zoomWindow(winId, factor) {
  const body = document.getElementById(`body-${winId}`);
  if (!body) return;
  if (factor === null) {
    body.style.zoom = '1';
  } else {
    const current = parseFloat(body.style.zoom || 1);
    body.style.zoom = (current * factor).toFixed(2);
  }
}

export function toggleWordWrap(winId) {
  const area = document.querySelector(`#body-${winId} .notepad-area`);
  if (!area) return;
  area.style.whiteSpace = area.style.whiteSpace === 'nowrap' ? 'pre-wrap' : 'nowrap';
  showNotification('Word Wrap', area.style.whiteSpace === 'nowrap' ? 'Word wrap: OFF' : 'Word wrap: ON');
}

export function startInWindowSearch(winId) {
  const term = prompt('Find:');
  if (!term) return;
  const body = document.getElementById(`body-${winId}`);
  if (!body) return;
  const text = body.innerText;
  if (text.toLowerCase().includes(term.toLowerCase())) {
    showNotification('Found!', `"${term}" found in this window.`);
  } else {
    showNotification('Not Found', `"${term}" not found.`);
  }
}

export function openPropertiesDialog() {
  showNotification('Properties', 'File: portfolio.html\nSize: ~85 KB\nCreated: 2025\nAuthor: Maksim Manojlovic\nType: Masterpiece');
}
