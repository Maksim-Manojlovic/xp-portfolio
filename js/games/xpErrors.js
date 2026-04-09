// ===== XP ERROR POPUPS =====
import { XP_ERRORS } from '../data/xpErrors.js';
import { playErrorDing } from '../modules/audio.js';

let errorPopupCount = 0;
const errorShownIds = new Set();

export function showXPError(errorIdx) {
  const err = XP_ERRORS[errorIdx];
  const id = `xp-error-${Date.now()}`;

  const el = document.createElement('div');
  el.id = id;

  const offsetX = 80 + (errorPopupCount % 4) * 30;
  const offsetY = 80 + (errorPopupCount % 3) * 40;
  errorPopupCount++;

  el.style.cssText = `
    position:fixed;left:${offsetX}px;top:${offsetY}px;
    width:360px;z-index:9500;
    background:#ece9d8;border:2px solid #0a246a;
    border-radius:4px 4px 2px 2px;
    box-shadow:3px 3px 8px rgba(0,0,0,0.5);
    font-family:'Tahoma',Tahoma,sans-serif;
    animation:errorPopIn 0.15s ease-out;
  `;

  let dragging = false, dx = 0, dy = 0;

  el.innerHTML = `
    <div id="etb-${id}" style="background:linear-gradient(to bottom,#4d94ff 0%,#1550d4 3%,#2470db 30%,#2470db 70%,#1550b8 100%);
      padding:4px 6px;display:flex;align-items:center;gap:6px;cursor:move;border-radius:2px 2px 0 0;">
      <span style="font-size:13px;">${err.icon}</span>
      <span style="color:#fff;font-size:11px;font-weight:700;flex:1;">${err.title}</span>
      <div onclick="document.getElementById('${id}').remove()"
        style="width:17px;height:17px;background:linear-gradient(to bottom,#f88,#e00);
        border:1px solid rgba(0,0,0,0.4);border-radius:2px;display:flex;align-items:center;
        justify-content:center;cursor:pointer;color:#fff;font-size:11px;font-weight:700;">✕</div>
    </div>
    <div style="padding:14px 16px;display:flex;gap:14px;align-items:flex-start;">
      <span style="font-size:36px;flex-shrink:0;">${err.icon}</span>
      <div style="font-size:11px;color:#000;line-height:1.7;white-space:pre-wrap;">${err.msg}</div>
    </div>
    <div style="padding:0 16px 12px;display:flex;justify-content:center;gap:8px;">
      <button onclick="document.getElementById('${id}').remove()"
        style="padding:4px 16px;min-width:90px;background:#d4d0c8;
        border:2px solid;border-color:#fff #888 #888 #fff;
        cursor:pointer;font-family:'Tahoma',sans-serif;font-size:11px;">
        ${err.btn}
      </button>
      <button onclick="document.getElementById('${id}').remove()"
        style="padding:4px 16px;background:#d4d0c8;
        border:2px solid;border-color:#fff #888 #888 #fff;
        cursor:pointer;font-family:'Tahoma',sans-serif;font-size:11px;">
        Cancel
      </button>
    </div>
  `;

  // Make draggable — each popup gets its own clean listeners
  const titleBar = el.querySelector(`#etb-${id}`);
  const onMouseMove = ev => {
    if (!dragging) return;
    el.style.left = (ev.clientX - dx) + 'px';
    el.style.top  = (ev.clientY - dy) + 'px';
  };
  const onMouseUp = () => { dragging = false; };
  titleBar.addEventListener('mousedown', ev => {
    dragging = true;
    dx = ev.clientX - el.offsetLeft;
    dy = ev.clientY - el.offsetTop;
    ev.preventDefault();
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp, { once: true });
  });

  document.body.appendChild(el);
  playErrorDing();
}

export function scheduleErrorPopups() {
  const delays = [25000, 70000, 130000, 200000];
  const pool = [0, 1, 2, 3, 4, 5, 6, 7]; // indices into XP_ERRORS (not 8 — triggered by minesweeper)

  delays.forEach(delay => {
    setTimeout(() => {
      if (!document.hidden) {
        const available = pool.filter(x => !errorShownIds.has(x));
        if (available.length === 0) return;
        const idx = available[Math.floor(Math.random() * available.length)];
        errorShownIds.add(idx);
        showXPError(idx);
      }
    }, delay);
  });
}
