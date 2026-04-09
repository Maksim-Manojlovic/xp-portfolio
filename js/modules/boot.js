// ===== BOOT SEQUENCE =====
import { playXPStartup } from './audio.js';
import { initDesktop } from './desktop.js';
import { applyWallpaper } from './wallpaper.js';
import { showNotification } from './notification.js';

export function startBootSequence(onDesktopReady) {
  setTimeout(() => {
    const boot = document.getElementById('boot-screen');
    boot.style.transition = 'opacity 0.8s';
    boot.style.opacity = '0';
    setTimeout(() => {
      boot.style.display = 'none';
      document.getElementById('welcome-screen').style.display = 'flex';
    }, 800);
  }, 3200);

  // Expose login handler globally
  window.startDesktop = function() {
    const welcome = document.getElementById('welcome-screen');
    welcome.style.transition = 'opacity 0.6s';
    welcome.style.opacity = '0';
    playXPStartup();
    setTimeout(() => {
      welcome.style.display = 'none';
      const desktop = document.getElementById('desktop');
      desktop.style.display = 'block';
      document.getElementById('taskbar').style.display = 'flex';
      initDesktop();
      applyWallpaper(0);
      if (onDesktopReady) onDesktopReady();
      setTimeout(() => showNotification('Welcome back!', 'Maksim Manojlovic\nDouble-click icons to open.\nRight-click desktop for options.'), 800);
      if (window.scheduleErrorPopups) window.scheduleErrorPopups();
    }, 600);
  };
}
