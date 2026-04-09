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
  window.startDesktop = async function() {
    const welcome    = document.getElementById('welcome-screen');
    const welcomeTop = welcome.querySelector('.welcome-title');
    const welcomeBody = welcome.querySelector('.welcome-body');

    // Swap body content to "logging in" state
    welcomeBody.innerHTML = `
      <div class="welcome-logging-in">
        <div class="welcome-avatar" style="margin-bottom:12px;">👨‍💻</div>
        <div class="welcome-username">Maksim Manojlovic</div>
        <div class="welcome-loading-label">Loading your personal settings...</div>
        <div class="welcome-loading-bar">
          <div class="welcome-loading-seg"></div>
          <div class="welcome-loading-seg"></div>
          <div class="welcome-loading-seg"></div>
        </div>
      </div>`;
    if (welcomeTop) welcomeTop.textContent = 'Please wait...';

    // Wait for the startup sound to finish
    await playXPStartup();

    // Fade out welcome → show desktop
    welcome.style.transition = 'opacity 0.6s';
    welcome.style.opacity = '0';
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
