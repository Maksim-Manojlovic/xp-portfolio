// ===== MAIN ENTRY POINT =====
// Imports all modules and wires everything together.
// Key functions are exposed on window so HTML onclick attributes work.

import { state } from './state.js';

// Modules
import { startClock }             from './modules/clock.js';
import { startBootSequence }      from './modules/boot.js';
import { initGlobalDragHandlers, startIconDrag } from './modules/drag.js';
import { initContextMenu, hideContextMenu }       from './modules/contextMenu.js';
import { toggleStartMenu, closeStartMenu }        from './modules/startMenu.js';
import { initMenuCloseOnClick, buildMenuHTML, toggleMenu, menuAction } from './modules/menu.js';
import { showNotification }       from './modules/notification.js';
import { desktopClick, sortIcons, selectIcon } from './modules/desktop.js';
import { applyWallpaper, changeWallpaper, openWallpaperPicker } from './modules/wallpaper.js';
import { doLogOff, openTurnOff, turnOffAction, openAboutDialog, openHelpWindow, openCheats, openSourceViewer } from './modules/dialogs.js';
import { toolbarBack, toolbarUp, toolbarSearch, toolbarFolders, toggleToolbar, toggleStatusBar, zoomWindow, toggleWordWrap, startInWindowSearch, openPropertiesDialog } from './modules/toolbar.js';

// Window manager
import { openWindow, focusWindow, closeWindow, minimizeWindow, unminimizeWindow, maximizeWindow, minimizeAll } from './modules/windowManager.js';

// Window content registrations
import { registerAbout }       from './windows/about.js';
import { registerProjects, openCategoryWindow, openProjectDetail, selectCatFolder, selectProjectFolder } from './windows/projects.js';
import { registerSkills, showSkillsSection, switchTab } from './windows/skills.js';
import { registerContact, sendContactForm, resetContactForm } from './windows/contact.js';
import { registerNotes }       from './windows/notes.js';
import { registerRecycle, msRestoreClick } from './windows/recycle.js';
import { registerCVDownload, buildCVDownload, downloadFile } from './windows/cvDownload.js';
import { registerStats }       from './windows/stats.js';
import {
  registerPaint, paintUndo, paintRedo, paintNew, paintSave, paintOpen,
  paintSetAsWallpaper, paintSelectAll, paintClearImage, paintInvertColors,
  paintFlip, paintRotate, paintShowAttributes, paintApplyAttributes,
  paintShowFlipRotate, paintApplyFlipRotate,
  paintSelectTool, paintSetFG, paintSetBG, paintPickCustomColor,
  paintSetLineWidth, paintSetFillMode, paintSetEraserSize,
  paintSetBrushShape, paintSetAirbrushSize, paintSetZoom,
  paintSetSelMode, paintToggleTextStyle, paintTextStyle,
} from './windows/paint.js';

// Games
import { playRecycle, toggleMute } from './modules/audio.js';
import { startGame, stopGame, switchWeapon, clearDamage, openGameLauncher } from './games/destructionGame.js';
import { openMinesweeper }     from './games/minesweeper.js';
import { showXPError, scheduleErrorPopups } from './games/xpErrors.js';

// ── Register all window definitions ──────────────────────────────────
registerAbout();
registerProjects();
registerSkills();
registerContact();
registerNotes();
registerRecycle();
registerCVDownload();
registerStats();
registerPaint();

// ── Expose functions globally for HTML onclick attributes ─────────────
// Window management
window.openWindow       = openWindow;
window.closeWindow      = closeWindow;
window.focusWindow      = focusWindow;
window.minimizeWindow   = minimizeWindow;
window.unminimizeWindow = unminimizeWindow;
window.maximizeWindow   = maximizeWindow;
window.minimizeAll      = minimizeAll;

// Start menu
window.toggleStartMenu = toggleStartMenu;
window.closeStartMenu  = closeStartMenu;

// Context menu
window.hideContextMenu = hideContextMenu;

// Wallpaper
window.applyWallpaper      = applyWallpaper;
window.changeWallpaper     = changeWallpaper;
window.openWallpaperPicker = openWallpaperPicker;
window.wallpaperIdx        = state.wallpaperIdx; // kept in sync via state.wallpaperIdx

// Desktop
window.sortIcons   = sortIcons;
window.selectIcon  = selectIcon;
window.startIconDrag = startIconDrag;
window.desktopClick = desktopClick;

// Toolbar / menu helpers
window.toolbarBack       = toolbarBack;
window.toolbarUp         = toolbarUp;
window.toolbarSearch     = toolbarSearch;
window.toolbarFolders    = toolbarFolders;
window.toggleToolbar     = toggleToolbar;
window.toggleStatusBar   = toggleStatusBar;
window.zoomWindow        = zoomWindow;
window.toggleWordWrap    = toggleWordWrap;
window.startInWindowSearch = startInWindowSearch;
window.openPropertiesDialog = openPropertiesDialog;
window.buildMenuHTML     = buildMenuHTML;
window.toggleMenu        = toggleMenu;
window.menuAction        = menuAction;

// Dialogs
window.doLogOff        = doLogOff;
window.openTurnOff     = openTurnOff;
window.turnOffAction   = turnOffAction;
window.openAboutDialog = openAboutDialog;
window.openHelpWindow  = openHelpWindow;
window.openCheats      = openCheats;
window.openSourceViewer = openSourceViewer;

// Notifications
window.showNotification = showNotification;

// Projects navigation
window.openCategoryWindow  = openCategoryWindow;
window.openProjectDetail   = openProjectDetail;
window.selectCatFolder     = selectCatFolder;
window.selectProjectFolder = selectProjectFolder;

// Skills
window.showSkillsSection = showSkillsSection;
window.switchTab         = switchTab;

// Contact
window.sendContactForm  = sendContactForm;
window.resetContactForm = resetContactForm;

// Audio
window.playRecycle = playRecycle;
window.toggleMute  = toggleMute;

// CV
window.downloadFile = downloadFile;

// Recycle
window.msRestoreClick = msRestoreClick;

// Paint
window.paintUndo              = paintUndo;
window.paintRedo              = paintRedo;
window.paintNew               = paintNew;
window.paintSave              = paintSave;
window.paintOpen              = paintOpen;
window.paintSetAsWallpaper    = paintSetAsWallpaper;
window.paintSelectAll         = paintSelectAll;
window.paintClearImage        = paintClearImage;
window.paintInvertColors      = paintInvertColors;
window.paintFlip              = paintFlip;
window.paintRotate            = paintRotate;
window.paintShowAttributes    = paintShowAttributes;
window.paintApplyAttributes   = paintApplyAttributes;
window.paintShowFlipRotate    = paintShowFlipRotate;
window.paintApplyFlipRotate   = paintApplyFlipRotate;
window.paintSelectTool        = paintSelectTool;
window.paintSetFG             = paintSetFG;
window.paintSetBG             = paintSetBG;
window.paintPickCustomColor   = paintPickCustomColor;
window.paintSetLineWidth      = paintSetLineWidth;
window.paintSetFillMode       = paintSetFillMode;
window.paintSetEraserSize     = paintSetEraserSize;
window.paintSetBrushShape     = paintSetBrushShape;
window.paintSetAirbrushSize   = paintSetAirbrushSize;
window.paintSetZoom           = paintSetZoom;
window.paintSetSelMode        = paintSetSelMode;
window.paintToggleTextStyle   = paintToggleTextStyle;
window.paintTextStyle         = paintTextStyle;

// Games
window.startGame       = startGame;
window.stopGame        = stopGame;
window.switchWeapon    = switchWeapon;
window.clearDamage     = clearDamage;
window.openGameLauncher = openGameLauncher;
window.openMinesweeper = openMinesweeper;
window.showXPError     = showXPError;
window.scheduleErrorPopups = scheduleErrorPopups;

// Minesweeper click proxies (called from dynamic HTML)
window.msClick      = (r,c) => { if (window._ms) window._ms.handleClick(r,c); };
window.msRightClick = (e,r,c) => { if (window._ms) window._ms.handleRightClick(e,r,c); };
window.msSmileyClick = () => { if (window._ms) window._ms.initBoard(); };
window.msPressCell  = (el) => { if (!window._ms || window._ms.gameOver || window._ms.gameWon) return; el.style.background='#d0ccc4';el.style.boxShadow='none'; };
window.msReleaseCell = (el) => { el.style.background=''; el.style.boxShadow=''; };

// ── Initialize everything ─────────────────────────────────────────────
startClock();
initGlobalDragHandlers();
initContextMenu();
initMenuCloseOnClick();

// Desktop click handler
document.getElementById('desktop').addEventListener('click', desktopClick);
document.getElementById('desktop').addEventListener('dblclick', () => {}); // placeholder

// Boot sequence → exposes window.startDesktop
startBootSequence(() => {
  // Called when desktop is ready
});
