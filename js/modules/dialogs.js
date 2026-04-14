// ===== DIALOGS =====
import { state } from '../state.js';
import { showNotification } from './notification.js';
import { closeStartMenu } from './startMenu.js';

export function doLogOff() {
  closeStartMenu();
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:#000c2a;z-index:99999;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:16px;cursor:pointer;';
  overlay.innerHTML = `
    <div style="display:flex;flex-direction:column;align-items:center;gap:12px;">
      <div style="font-family:Tahoma,sans-serif;color:#fff;font-size:13px;font-weight:700;text-shadow:1px 1px 2px rgba(0,0,0,0.8);">
        Logging off Maksim Manojlovic...
      </div>
      <div style="width:200px;height:6px;background:#0a2060;border-radius:3px;overflow:hidden;">
        <div id="logoff-bar" style="height:100%;width:0%;background:linear-gradient(to right,#4d94ff,#1a54ba);transition:width 2s ease;border-radius:3px;"></div>
      </div>
      <div style="color:rgba(255,255,255,0.5);font-size:10px;font-family:Tahoma,sans-serif;">Click to cancel</div>
    </div>`;
  overlay.onclick = () => overlay.remove();
  document.body.appendChild(overlay);
  setTimeout(() => { const bar = document.getElementById('logoff-bar'); if (bar) bar.style.width = '100%'; }, 50);
  setTimeout(() => {
    if (!overlay.parentNode) return;
    overlay.remove();
    const ws = document.getElementById('welcome-screen');
    if (ws) {
      ws.style.display = 'flex';
      const desktop = document.getElementById('desktop');
      const taskbar = document.getElementById('taskbar');
      if (desktop) desktop.style.display = 'none';
      if (taskbar) taskbar.style.display = 'none';
    }
  }, 2500);
}

export function openTurnOff() {
  const winId = 'turnoff-win';
  if (state.windows[winId]) { window.focusWindow(winId); return; }
  state.windowDefs[winId] = {
    title: 'Turn Off Computer', icon: '🔴', w: 380, h: 260,
    menuBar: [], toolbar: false, statusBar: false,
    content: (body) => {
      body.classList.add('silver');
      body.innerHTML = `
        <div style="padding:0;height:100%;display:flex;flex-direction:column;">
          <div style="background:var(--xp-title-active);padding:12px 16px;display:flex;align-items:center;gap:10px;">
            <img src="public/assets/icons/turn_off.ico" style="width:24px;height:24px;image-rendering:pixelated;">
            <div style="color:#fff;font-size:12px;font-weight:700;">Turn off computer</div>
          </div>
          <div style="padding:16px;flex:1;">
            <div style="font-size:11px;color:#000;margin-bottom:14px;line-height:1.7;">
              Select what you want the computer to do. This will also<br>close your browser tab. Probably. Maybe. We'll see.
            </div>
            <div style="display:flex;gap:10px;justify-content:center;margin-bottom:14px;">
              <div onclick="turnOffAction('standby')"
                style="cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px;padding:8px 10px;background:#d4d0c8;border:2px solid;border-color:#fff #888 #888 #fff;width:80px;"
                onmouseover="this.style.background='#dde8f8'" onmouseout="this.style.background='#d4d0c8'">
                <svg width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="13" fill="#1460d4"/><path d="M16 6 A10 10 0 0 1 26 16" stroke="#fff" stroke-width="3" fill="none"/><circle cx="16" cy="16" r="4" fill="#fff"/></svg>
                <span style="font-size:10px;font-weight:700;text-align:center;">Stand By</span>
              </div>
              <div onclick="turnOffAction('off')"
                style="cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px;padding:8px 10px;background:#d4d0c8;border:2px solid;border-color:#fff #888 #888 #fff;width:80px;"
                onmouseover="this.style.background='#dde8f8'" onmouseout="this.style.background='#d4d0c8'">
                <img src="public/assets/icons/turn_off.ico" style="width:32px;height:32px;image-rendering:pixelated;">
                <span style="font-size:10px;font-weight:700;text-align:center;">Turn Off</span>
              </div>
              <div onclick="turnOffAction('restart')"
                style="cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px;padding:8px 10px;background:#d4d0c8;border:2px solid;border-color:#fff #888 #888 #fff;width:80px;"
                onmouseover="this.style.background='#dde8f8'" onmouseout="this.style.background='#d4d0c8'">
                <svg width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="13" fill="#007700"/><path d="M10 16 A6 6 0 0 1 22 16" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/><polygon points="22,12 22,20 26,16" fill="#fff"/></svg>
                <span style="font-size:10px;font-weight:700;text-align:center;">Restart</span>
              </div>
            </div>
            <div style="text-align:center;">
              <button onclick="closeWindow('turnoff-win')"
                style="padding:4px 20px;background:#d4d0c8;border:2px solid;border-color:#fff #888 #888 #fff;cursor:pointer;font-family:Tahoma,sans-serif;font-size:11px;">
                Cancel
              </button>
            </div>
          </div>
        </div>`;
    }
  };
  window.openWindow(winId);
  closeStartMenu();
}

export function turnOffAction(action) {
  window.closeWindow('turnoff-win');
  if (action === 'standby') {
    const overlay = document.createElement('div');
    overlay.id = 'sleep-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:#000;z-index:99999;display:flex;align-items:center;justify-content:center;cursor:pointer;';
    overlay.innerHTML = '<div style="color:#333;font-size:48px;text-align:center;font-family:Tahoma,sans-serif;">💤<br><span style="font-size:14px;color:#222;">Click anywhere to wake up</span></div>';
    overlay.onclick = () => overlay.remove();
    document.body.appendChild(overlay);
  } else if (action === 'off') {
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:#0000aa;z-index:99999;padding:40px;font-family:"Courier New",monospace;color:#fff;cursor:pointer;';
    overlay.innerHTML = `
      <div style="font-size:16px;margin-bottom:20px;background:#aaa;color:#000;padding:4px 8px;display:inline-block;">Windows</div>
      <div style="font-size:13px;line-height:2;">
        A fatal error has occurred because you tried to turn off a portfolio.<br><br>
        <strong>PORTFOLIO_SHUTDOWN_NOT_PERMITTED</strong><br><br>
        * The recruiter is still looking. Please do not turn off.<br>
        * Reason: IRQL_NOT_LESS_OR_EQUAL (you tried to leave too soon)<br>
        * Address: C:\\Users\\Maksim\\portfolio.html<br><br>
        If this is the first time you've seen this Stop error screen, restart your browser and continue looking.<br><br>
        Technical information:<br>
        *** STOP: 0x000000D1 (0xC0000005, 0x00000002, 0x00000001, 0xF86B5A89)<br><br>
        Beginning dump of physical memory...<br>
        Physical memory dump complete.<br><br>
        <span style="animation:blink 1s infinite;">_</span><br><br>
        <span style="font-size:11px;color:#aaa;">(Click anywhere to return to desktop)</span>
      </div>`;
    overlay.onclick = () => overlay.remove();
    document.body.appendChild(overlay);
  } else if (action === 'restart') {
    showNotification('Restarting...', 'Windows is restarting.\n\nEstimated time: 47 minutes.\nPlease do not turn off your computer.\n\n(Page will reload in 3 seconds)');
    setTimeout(() => location.reload(), 3000);
  }
}

export function openAboutDialog() {
  const winId = 'about-dialog';
  if (state.windows[winId]) { window.focusWindow(winId); return; }
  state.windowDefs[winId] = {
    title: "About Maksim's Portfolio", icon: '💻', w: 380, h: 260,
    menuBar: [], toolbar: false, statusBar: false,
    content: (body) => {
      body.classList.add('silver');
      body.innerHTML = `
        <div style="display:flex;gap:12px;padding:16px;align-items:flex-start;">
          <span style="font-size:48px;">💻</span>
          <div style="font-size:11px;line-height:1.8;">
            <div style="font-size:14px;font-weight:700;margin-bottom:4px;">Portfolio XP™</div>
            <div>Version 2.0.0 (Build 2025)</div>
            <div>By <strong>Maksim Manojlovic</strong></div>
            <div style="margin-top:6px;color:#666;">Built in pure HTML, CSS & JavaScript.<br>No frameworks were harmed in the making of this portfolio.</div>
            <div style="margin-top:8px;">
              <a href="https://github.com/Maksim-Manojlovic" target="_blank" style="color:#0000cc;">GitHub</a> &nbsp;|&nbsp;
              <a href="mailto:mr.maksim.manojlovic@gmail.com" style="color:#0000cc;">Email</a>
            </div>
          </div>
        </div>
        <div style="border-top:1px solid #d4d0c8;padding:8px 16px;display:flex;justify-content:flex-end;">
          <button onclick="closeWindow('about-dialog')" style="padding:4px 16px;background:#d4d0c8;border:2px solid;border-color:#fff #888 #888 #fff;cursor:pointer;font-size:11px;font-family:Tahoma,sans-serif;">OK</button>
        </div>`;
    }
  };
  window.openWindow(winId);
}

export function openHelpWindow() {
  const winId = 'help-win';
  if (state.windows[winId]) { window.focusWindow(winId); return; }
  state.windowDefs[winId] = {
    title: 'Help and Support', icon: '❓', w: 420, h: 360,
    menuBar: ['File','Tools','Help'], toolbar: false, statusBar: false,
    content: (body) => {
      body.innerHTML = `<div style="padding:16px;font-size:11px;line-height:1.8;overflow-y:auto;flex:1;">
        <div style="font-size:14px;font-weight:700;color:#0a246a;margin-bottom:12px;">❓ Portfolio Help Center</div>
        <div style="margin-bottom:8px;"><strong>🖱️ Double-click icons</strong> to open windows</div>
        <div style="margin-bottom:8px;"><strong>🪟 Drag windows</strong> by their title bar</div>
        <div style="margin-bottom:8px;"><strong>📐 Resize windows</strong> from the bottom-right corner</div>
        <div style="margin-bottom:8px;"><strong>⊞ Start menu</strong> for full navigation</div>
        <div style="margin-bottom:8px;"><strong>🖱️ Right-click</strong> desktop for options & wallpaper</div>
        <div style="margin-bottom:8px;"><strong>🪚 Tools → Destroy Desktop</strong> to unleash chaos</div>
        <div style="margin-bottom:8px;"><strong>[W]</strong> Switch weapon &nbsp; <strong>[C]</strong> Clear &nbsp; <strong>[Esc]</strong> Exit game</div>
        <div style="margin-top:16px;padding:8px;background:#fffbe6;border:1px solid #f0c000;font-size:10px;">
          💡 Tip: This portfolio is built with vanilla HTML, CSS & JS modules. No frameworks!
        </div>
      </div>`;
    }
  };
  window.openWindow(winId);
}

export function openCheats() {
  const winId = 'cheats-win';
  if (state.windows[winId]) { window.focusWindow(winId); return; }
  state.windowDefs[winId] = {
    title: '🕵️ Secret Cheat Codes', icon: '🕵️', w: 360, h: 320,
    menuBar: [], toolbar: false, statusBar: false,
    content: (body) => {
      body.innerHTML = `<div style="padding:14px;font-size:11px;line-height:2;overflow-y:auto;flex:1;">
        <div style="font-weight:700;color:#0a246a;margin-bottom:10px;">KONAMI CODES FOR THIS PORTFOLIO:</div>
        <div>🪚 <strong>Tools → Destroy Desktop</strong> — Chainsaw mode</div>
        <div>🎨 <strong>Tools → Paintball Mode</strong> — Paintball guns</div>
        <div>💣 <strong>Tools → Full Destruction</strong> — Bomb mode</div>
        <div style="margin-top:8px;border-top:1px solid #ddd;padding-top:8px;">
          <div>⌨️ <strong>[W]</strong> — Switch weapon in game</div>
          <div>⌨️ <strong>[C]</strong> — Clear all damage</div>
          <div>⌨️ <strong>[Esc]</strong> — Exit game mode</div>
        </div>
        <div style="margin-top:8px;border-top:1px solid #ddd;padding-top:8px;">
          <div>🖱️ <strong>Right-click desktop</strong> → Change Wallpaper</div>
          <div>🎯 <strong>Recycle Bin</strong> — Easter egg content</div>
        </div>
        <div style="margin-top:10px;background:#e8f0ff;border:1px solid #7f9db9;padding:6px 8px;font-size:10px;">
          🤫 Try opening ALL windows at once for maximum chaos.
        </div>
      </div>`;
    }
  };
  window.openWindow(winId);
}

export function openSourceViewer() {
  const winId = 'source-win';
  if (state.windows[winId]) { window.focusWindow(winId); return; }
  state.windowDefs[winId] = {
    title: 'view-source: index.html', icon: '📄', w: 580, h: 440,
    menuBar: ['File','Edit'], toolbar: false, statusBar: false,
    content: (body) => {
      const src = document.documentElement.outerHTML.substring(0, 2000);
      body.innerHTML = `<div style="padding:8px;font-family:'Courier New',monospace;font-size:10px;
        line-height:1.5;overflow:auto;flex:1;color:#000;white-space:pre-wrap;word-break:break-all;">` +
        src.replace(/</g,'&lt;').replace(/>/g,'&gt;') +
        `\n\n... [${Math.round(document.documentElement.outerHTML.length/1024)}KB total — open DevTools to see full source]</div>`;
    }
  };
  window.openWindow(winId);
}
