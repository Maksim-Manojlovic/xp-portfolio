// ===== DRAG & RESIZE =====
import { state } from '../state.js';

export function startIconDrag(e, id) {
  if (e.button !== 0) return;
  const el = document.getElementById(`icon-${id}`);
  if (!el) return;
  const desktop = document.getElementById('desktop');
  state.iconDragState = {
    id,
    startX: e.clientX,
    startY: e.clientY,
    origX: parseInt(el.style.left) || 0,
    origY: parseInt(el.style.top) || 0,
    moved: false,
    deskRect: desktop.getBoundingClientRect()
  };
  e.preventDefault();
}

export function initGlobalDragHandlers() {
  document.addEventListener('mousemove', e => {
    if (state.iconDragState) {
      const dx = e.clientX - state.iconDragState.startX;
      const dy = e.clientY - state.iconDragState.startY;
      if (!state.iconDragState.moved && Math.abs(dx) < 4 && Math.abs(dy) < 4) return;
      state.iconDragState.moved = true;
      const el = document.getElementById(`icon-${state.iconDragState.id}`);
      if (el) {
        const desktop = document.getElementById('desktop');
        const maxX = desktop.offsetWidth - el.offsetWidth;
        const maxY = desktop.offsetHeight - el.offsetHeight;
        el.style.left = Math.max(0, Math.min(maxX, state.iconDragState.origX + dx)) + 'px';
        el.style.top  = Math.max(0, Math.min(maxY, state.iconDragState.origY + dy)) + 'px';
        el.style.opacity = '0.75';
      }
    }

    if (state.dragState) {
      const win = document.getElementById(`window-${state.dragState.id}`);
      if (win) {
        const dx = e.clientX - state.dragState.startX;
        const dy = e.clientY - state.dragState.startY;
        win.style.left = Math.max(0, state.dragState.origX + dx) + 'px';
        win.style.top  = Math.max(0, state.dragState.origY + dy) + 'px';
      }
    }

    if (state.resizeState) {
      const win = document.getElementById(`window-${state.resizeState.id}`);
      if (win) {
        const dx = e.clientX - state.resizeState.startX;
        const dy = e.clientY - state.resizeState.startY;
        win.style.width  = Math.max(200, state.resizeState.origW + dx) + 'px';
        win.style.height = Math.max(120, state.resizeState.origH + dy) + 'px';
      }
    }
  });

  document.addEventListener('mouseup', () => {
    if (state.iconDragState) {
      const el = document.getElementById(`icon-${state.iconDragState.id}`);
      if (el) el.style.opacity = '1';
      state.iconDragState = null;
    }
    state.dragState = null;
    state.resizeState = null;
  });

  // Also clean up chainsaw drag if game is active
  document.addEventListener('mouseup', () => {
    if (window._chainsawDown !== undefined) window._chainsawDown = false;
  });
}
