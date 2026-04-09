// ===== WINDOW MANAGER =====
import { state } from '../state.js';
import { addTaskbarBtn } from './taskbar.js';

// ---- Build menu HTML ----
// Imported lazily to avoid circular deps — menu.js imports windowManager too
// We call window.buildMenuHTML which is assigned in main.js
function buildMenuHTML(label, winId) {
  return window.buildMenuHTML ? window.buildMenuHTML(label, winId) : `<div class="menu-item">${label}</div>`;
}

export function openWindow(id, opts) {
  const def = state.windowDefs[id];
  if (!def) return;

  if (state.windows[id] && !state.windows[id].minimized) {
    focusWindow(id);
    return;
  }
  if (state.windows[id] && state.windows[id].minimized) {
    unminimizeWindow(id);
    return;
  }

  const desktop = document.getElementById('desktop');
  const dw = desktop.offsetWidth, dh = desktop.offsetHeight;
  const w = Math.min(def.w, dw - 40);
  const h = Math.min(def.h, dh - 40);
  const openCount = Object.keys(state.windows).length;
  const x = Math.max(20, Math.floor((dw - w) / 2) + (openCount * 20 % 100));
  const y = Math.max(0, Math.floor((dh - h) / 2) + (openCount * 20 % 80));

  const win = document.createElement('div');
  win.className = 'window';
  win.id = `window-${id}`;
  win.style.cssText = `left:${x}px;top:${y}px;width:${w}px;height:${h}px;z-index:${++state.zCounter}`;

  // Title bar
  let html = `<div class="title-bar" id="titlebar-${id}">
    <span class="title-icon">${def.icon}</span>
    <span class="title-text">${opts?.title || def.title}</span>
    <div class="title-controls">
      <div class="title-btn" onclick="minimizeWindow('${id}')" title="Minimize">_</div>
      <div class="title-btn" onclick="maximizeWindow('${id}')" title="Maximize">□</div>
      <div class="title-btn close" onclick="closeWindow('${id}')" title="Close">✕</div>
    </div>
  </div>`;

  // Menu bar
  if (def.menuBar && def.menuBar.length > 0) {
    html += `<div class="menu-bar" id="menubar-${id}">` +
      def.menuBar.map(m => buildMenuHTML(m, id)).join('') +
    `</div>`;
  }

  // Toolbar
  if (def.toolbar) {
    html += `<div class="toolbar">
      <div class="toolbar-btn" onclick="toolbarBack('${id}')">◄ Back</div>
      <div class="toolbar-btn" style="opacity:0.5;cursor:default;">▶ Forward</div>
      <div class="toolbar-btn" onclick="toolbarUp('${id}')">⬆ Up</div>
      <div class="toolbar-sep"></div>
      <div class="toolbar-btn" onclick="toolbarSearch('${id}')">🔍 Search</div>
      <div class="toolbar-btn" onclick="toolbarFolders('${id}')">📁 Folders</div>
    </div>`;
  }

  // Address bar
  if (def.addressBar) {
    html += `<div class="address-bar">
      <span class="address-label">Address</span>
      <input class="address-input" value="${def.addressBar.text}" readonly />
      <div class="address-go">Go</div>
    </div>`;
  }

  html += `<div class="window-body" id="body-${id}"></div>`;

  if (def.statusBar) {
    html += `<div class="status-bar">
      <span class="status-panel" id="status-${id}">Ready</span>
      <span class="status-panel" style="flex:0;min-width:80px;text-align:right;">${new Date().toLocaleDateString()}</span>
    </div>`;
  }

  html += `<div class="resize-handle" id="resize-${id}"></div>`;

  win.innerHTML = html;
  desktop.appendChild(win);

  // Fill content
  const body = document.getElementById(`body-${id}`);
  def.content(body, opts);

  // Drag
  const titleBar = document.getElementById(`titlebar-${id}`);
  titleBar.addEventListener('mousedown', e => startDragFromWindow(e, id));

  // Resize
  const resizeHandle = document.getElementById(`resize-${id}`);
  if (resizeHandle) resizeHandle.addEventListener('mousedown', e => startResizeFromWindow(e, id));

  // Focus on click
  win.addEventListener('mousedown', () => focusWindow(id));

  state.windows[id] = { el: win, minimized: false, maximized: false, prevRect: null };
  focusWindow(id);
  addTaskbarBtn(id, def.icon, opts?.title || def.title, minimizeWindow, unminimizeWindow, focusWindow);
}

export function focusWindow(id) {
  state.activeWindowId = id;
  document.querySelectorAll('.window').forEach(w => w.classList.add('inactive'));
  const win = document.getElementById(`window-${id}`);
  if (win) {
    win.classList.remove('inactive');
    win.style.zIndex = ++state.zCounter;
  }
  document.querySelectorAll('.taskbar-btn').forEach(b => b.classList.remove('active'));
  const tbtn = document.getElementById(`tbtn-${id}`);
  if (tbtn) tbtn.classList.add('active');
}

export function minimizeWindow(id) {
  const win = document.getElementById(`window-${id}`);
  if (!win || state.windows[id].minimized) return;
  const tbtn = document.getElementById(`tbtn-${id}`);

  const winRect = win.getBoundingClientRect();
  const btnRect = tbtn ? tbtn.getBoundingClientRect() : null;
  if (btnRect) {
    const ox = (btnRect.left + btnRect.width/2  - winRect.left) / winRect.width  * 100;
    const oy = (btnRect.top  + btnRect.height/2 - winRect.top)  / winRect.height * 100;
    win.style.transformOrigin = `${ox}% ${oy}%`;
  } else {
    win.style.transformOrigin = '50% 100%';
  }

  win.classList.add('minimizing');
  win.addEventListener('animationend', () => {
    win.classList.remove('minimizing');
    win.classList.add('minimized');
    win.style.transformOrigin = '';
  }, { once: true });

  state.windows[id].minimized = true;
  if (tbtn) tbtn.classList.remove('active');
}

export function unminimizeWindow(id) {
  const win = document.getElementById(`window-${id}`);
  if (!win) return;
  win.classList.remove('minimized');
  state.windows[id].minimized = false;

  const tbtn = document.getElementById(`tbtn-${id}`);
  const winRect = win.getBoundingClientRect();
  const btnRect = tbtn ? tbtn.getBoundingClientRect() : null;
  if (btnRect) {
    const ox = (btnRect.left + btnRect.width/2  - winRect.left) / winRect.width  * 100;
    const oy = (btnRect.top  + btnRect.height/2 - winRect.top)  / winRect.height * 100;
    win.style.transformOrigin = `${ox}% ${oy}%`;
  } else {
    win.style.transformOrigin = '50% 100%';
  }

  win.classList.add('unminimizing');
  win.addEventListener('animationend', () => {
    win.classList.remove('unminimizing');
    win.style.transformOrigin = '';
  }, { once: true });

  focusWindow(id);
}

export function maximizeWindow(id) {
  const win = document.getElementById(`window-${id}`);
  if (!win) return;
  const s = state.windows[id];
  if (s.maximized) {
    if (s.prevRect) {
      win.style.left = s.prevRect.left + 'px';
      win.style.top  = s.prevRect.top + 'px';
      win.style.width  = s.prevRect.width + 'px';
      win.style.height = s.prevRect.height + 'px';
    }
    win.classList.remove('maximized');
    s.maximized = false;
  } else {
    s.prevRect = { left: parseInt(win.style.left), top: parseInt(win.style.top), width: win.offsetWidth, height: win.offsetHeight };
    win.classList.add('maximized');
    s.maximized = true;
  }
}

export function closeWindow(id) {
  const win = document.getElementById(`window-${id}`);
  if (win) win.remove();
  delete state.windows[id];
  // Remove from defs if it was dynamic (e.g. category/project windows)
  if (id.startsWith('cat-') || id.startsWith('proj-') || ['game-launcher','wallpaper-picker','turnoff-win','about-dialog','help-win','cheats-win','source-win','minesweeper','stats','cv-download'].includes(id)) {
    delete state.windowDefs[id];
  }
  const tbtn = document.getElementById(`tbtn-${id}`);
  if (tbtn) tbtn.remove();
}

export function minimizeAll() {
  Object.keys(state.windows).forEach(id => {
    if (!state.windows[id].minimized) minimizeWindow(id);
  });
}

// ---- Internal drag helpers (exposed via state) ----
function startDragFromWindow(e, id) {
  if (e.target.classList.contains('title-btn')) return;
  const win = document.getElementById(`window-${id}`);
  if (!win || state.windows[id].maximized) return;
  focusWindow(id);
  const rect = win.getBoundingClientRect();
  state.dragState = { id, startX: e.clientX, startY: e.clientY, origX: rect.left, origY: rect.top };
  e.preventDefault();
}

function startResizeFromWindow(e, id) {
  const win = document.getElementById(`window-${id}`);
  if (!win) return;
  state.resizeState = { id, startX: e.clientX, startY: e.clientY, origW: win.offsetWidth, origH: win.offsetHeight };
  e.preventDefault();
  e.stopPropagation();
}
