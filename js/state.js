// ===== SHARED MUTABLE STATE =====
// Single source of truth for all runtime state

export const state = {
  // Open windows registry: { [id]: { el, minimized, maximized, prevRect } }
  windows: {},

  // Window definitions registry: { [id]: { title, icon, w, h, menuBar, toolbar, addressBar, statusBar, content } }
  windowDefs: {},

  // z-index counter for window stacking
  zCounter: 100,

  // Drag state for windows
  dragState: null,

  // Resize state for windows
  resizeState: null,

  // Drag state for desktop icons
  iconDragState: null,

  // Currently focused window id
  activeWindowId: null,

  // Currently selected desktop icon id
  selectedIcon: null,

  // Current wallpaper index
  wallpaperIdx: 0,

  // Minesweeper open count (for easter egg trigger)
  minesweeperOpenCount: 0,
};
