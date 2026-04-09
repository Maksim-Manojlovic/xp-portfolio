// ===== WALLPAPER =====
import { state } from '../state.js';
import { wallpapers } from '../data/wallpapers.js';
import { showNotification } from './notification.js';

export function applyWallpaper(idx) {
  let styleTag = document.getElementById('wallpaper-style');
  if (!styleTag) {
    styleTag = document.createElement('style');
    styleTag.id = 'wallpaper-style';
    document.head.appendChild(styleTag);
  }
  const wp = wallpapers[idx];
  if (wp.img) {
    styleTag.textContent = `#desktop {
      background-image: url('${wp.img}');
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
    }`;
  } else {
    styleTag.textContent = `#desktop { ${wp.css} background-size: cover; }`;
  }
}

export function changeWallpaper() {
  state.wallpaperIdx = (state.wallpaperIdx + 1) % wallpapers.length;
  applyWallpaper(state.wallpaperIdx);
  showNotification('Wallpaper Changed', `Now showing: "${wallpapers[state.wallpaperIdx].name}"\nRight-click desktop to change again.`);
}

export function openWallpaperPicker() {
  const winId = 'wallpaper-picker';
  if (state.windows[winId]) { window.focusWindow(winId); return; }
  state.windowDefs[winId] = {
    title: 'Display Properties — Background', icon: '🖼️', w: 480, h: 340,
    menuBar: [], toolbar: false, statusBar: false,
    content: (body) => {
      body.classList.add('silver');
      body.style.padding = '12px';
      body.innerHTML = `
        <div style="font-size:11px;font-weight:700;margin-bottom:8px;">Choose a background:</div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:12px;">
          ${wallpapers.map((wp, i) => `
            <div onclick="applyWallpaper(${i});wallpaperIdx=${i};closeWindow('wallpaper-picker')"
              style="cursor:pointer;border:2px solid ${i===state.wallpaperIdx?'#0a246a':'#888'};border-radius:2px;overflow:hidden;">
              <div style="height:60px;${wp.img ? `background-image:url('${wp.img}');background-size:cover;background-position:center;` : wp.css + 'background-size:cover;'}"></div>
              <div style="padding:3px 4px;background:#d4d0c8;font-size:10px;text-align:center;font-weight:${i===state.wallpaperIdx?'700':'400'}">${wp.name}</div>
            </div>`).join('')}
        </div>
        <div style="display:flex;gap:6px;justify-content:flex-end;">
          <button onclick="closeWindow('wallpaper-picker')" style="padding:4px 14px;background:#d4d0c8;border:2px solid;border-color:#fff #888 #888 #fff;cursor:pointer;font-family:Tahoma,sans-serif;font-size:11px;">OK</button>
          <button onclick="closeWindow('wallpaper-picker')" style="padding:4px 14px;background:#d4d0c8;border:2px solid;border-color:#fff #888 #888 #fff;cursor:pointer;font-family:Tahoma,sans-serif;font-size:11px;">Cancel</button>
        </div>`;
    }
  };
  window.openWindow(winId);
  window.hideContextMenu();
}
