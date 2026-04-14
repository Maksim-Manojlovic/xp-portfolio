// ===== PAINT WINDOW =====
import { state } from '../state.js';
import {
  buildToolboxHTML, buildColorPanelHTML, buildTextToolbarHTML,
  buildOptionsHTML, rasterizeTextInput,
  paintSelectTool, paintSetFG, paintSetBG, paintPickCustomColor,
  paintSetLineWidth, paintSetFillMode, paintSetEraserSize,
  paintSetBrushShape, paintSetAirbrushSize, paintSetZoom,
  paintSetSelMode, paintToggleTextStyle, paintTextStyle,
} from './paint-ui.js';
import { onMouseDown, onMouseMove, onMouseUp, onDblClick, floodFill } from './paint-tools.js';

// ── Paint singleton state ──────────────────────────────────────────────────
function makePaintState(id) {
  return {
    winId: id,
    tool: 'pencil',
    fg: '#000000',
    bg: '#ffffff',
    brushShape: 0,
    lineWidth: 1,
    fillMode: 0,
    eraserSize: 8,
    airbrushSize: 1,
    zoomLevel: 1,
    undoStack: [],
    redoStack: [],
    isDrawing: false,
    startX: 0, startY: 0,
    lastX: 0, lastY: 0,
    drawColor: '#000000',
    altColor: '#ffffff',
    curveStep: 0,
    curvePoints: [],
    polygonPoints: [],
    isPolygonDrawing: false,
    selection: null,
    selectionMode: 'opaque',
    textX_x: 0, textX_y: 0,
    textStyle: { font:'Arial', size:16, bold:false, italic:false, under:false },
    modified: false,
    canvas: null,
    ctx: null,
    overlay: null,
    octx: null,
  };
}

// ── Register window ────────────────────────────────────────────────────────
export function registerPaint() {
  state.windowDefs.paint = {
    title: 'untitled - Paint',
    icon: '🎨',
    w: 780, h: 560,
    menuBar: ['File','Edit','View','Image','Colors','Help'],
    toolbar: false,
    statusBar: false,
    content: buildPaint,
  };
}

// ── Build window content ───────────────────────────────────────────────────
function buildPaint(body) {
  const id = 'paint';
  body.style.cssText = 'padding:0;overflow:hidden;display:flex;flex-direction:column;';

  body.innerHTML = `
    <div class="paint-app" id="paint-app-${id}">
      <div class="paint-toolbox">
        ${buildToolboxHTML(id)}
      </div>
      <div class="paint-main">
        ${buildTextToolbarHTML(id)}
        <div class="paint-canvas-area" id="paint-area-${id}">
          <div class="paint-canvas-wrapper" id="paint-wrapper-${id}">
            <canvas id="paint-canvas-${id}" width="600" height="400"></canvas>
            <canvas id="paint-overlay-${id}" width="600" height="400"></canvas>
            <div class="paint-resize-e"  id="paint-re-${id}"></div>
            <div class="paint-resize-s"  id="paint-rs-${id}"></div>
            <div class="paint-resize-se" id="paint-rse-${id}"></div>
          </div>
        </div>
        ${buildColorPanelHTML(id)}
        <div class="paint-status">
          <div class="paint-status-panel" id="paint-status-tool-${id}">Pencil</div>
          <div class="paint-status-panel" id="paint-status-coord-${id}">0, 0</div>
          <div class="paint-status-panel" id="paint-status-size-${id}">600 × 400</div>
        </div>
      </div>
    </div>`;

  initPaintCanvas(id);
}

// ── Canvas initialization ──────────────────────────────────────────────────
function initPaintCanvas(id) {
  const P = makePaintState(id);
  window._paint = P;

  const canvas  = document.getElementById(`paint-canvas-${id}`);
  const overlay = document.getElementById(`paint-overlay-${id}`);
  P.canvas  = canvas;
  P.ctx     = canvas.getContext('2d');
  P.overlay = overlay;
  P.octx    = overlay.getContext('2d');

  // White background
  P.ctx.fillStyle = '#ffffff';
  P.ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Initial undo snapshot
  P.undoStack.push(P.ctx.getImageData(0, 0, canvas.width, canvas.height));

  // ── Canvas events ──
  canvas.addEventListener('mousedown',   e => onMouseDown(e, P));
  canvas.addEventListener('contextmenu', e => { onMouseDown(e, P); e.preventDefault(); });

  window.addEventListener('mousemove', e => {
    if (P.winId !== 'paint') return;
    onMouseMove(e, P);
  });
  window.addEventListener('mouseup', e => {
    if (P.winId !== 'paint' || !P.isDrawing && P.tool !== 'curve') return;
    onMouseUp(e, P);
  });

  canvas.addEventListener('dblclick', e => onDblClick(e, P));

  // Cursor coords on mousemove
  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / P.zoomLevel);
    const y = Math.floor((e.clientY - rect.top)  / P.zoomLevel);
    const el = document.getElementById(`paint-status-coord-${id}`);
    if (el) el.textContent = `${x}, ${y}`;
  });
  canvas.addEventListener('mouseleave', () => {
    const el = document.getElementById(`paint-status-coord-${id}`);
    if (el) el.textContent = '';
  });

  // ── Keyboard shortcuts ──
  document.addEventListener('keydown', paintKeyDown);

  // ── Canvas resize handles ──
  initResizeHandles(id, P);
}

function paintKeyDown(e) {
  const P = window._paint;
  if (!P || state.activeWindowId !== P.winId) return;
  if (e.ctrlKey && e.key === 'z') { e.preventDefault(); paintUndo(); }
  if (e.ctrlKey && e.key === 'y') { e.preventDefault(); paintRedo(); }
  if (e.ctrlKey && e.key === 'a') { e.preventDefault(); paintSelectAll(); }
  if (e.key === 'Escape') {
    if (P.isPolygonDrawing) {
      P.isPolygonDrawing = false; P.polygonPoints = [];
      P.octx.clearRect(0,0,P.overlay.width,P.overlay.height);
    }
    rasterizeTextInput(P);
  }
}

// ── Canvas resize handles ──────────────────────────────────────────────────
function initResizeHandles(id, P) {
  ['e','s','se'].forEach(dir => {
    const handle = document.getElementById(`paint-r${dir}-${id}`);
    if (!handle) return;
    handle.addEventListener('mousedown', e => {
      e.stopPropagation();
      const startX = e.clientX, startY = e.clientY;
      const origW = P.canvas.width, origH = P.canvas.height;
      const savedData = P.ctx.getImageData(0, 0, origW, origH);

      function onMove(ev) {
        const dx = ev.clientX - startX, dy = ev.clientY - startY;
        const newW = Math.max(50, origW + (dir.includes('e') ? dx : 0));
        const newH = Math.max(50, origH + (dir.includes('s') ? dy : 0));
        P.canvas.width  = newW;  P.canvas.height = newH;
        P.overlay.width = newW;  P.overlay.height = newH;
        P.ctx.fillStyle = '#ffffff';
        P.ctx.fillRect(0, 0, newW, newH);
        P.ctx.putImageData(savedData, 0, 0);
        const el = document.getElementById(`paint-status-size-${id}`);
        if (el) el.textContent = `${newW} × ${newH}`;
      }
      function onUp() {
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', onUp);
      }
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);
    });
  });
}

// ── Global paint actions (exposed to window) ───────────────────────────────

export function paintUndo() {
  const P = window._paint; if (!P) return;
  if (P.undoStack.length <= 1) return;
  P.redoStack.push(P.undoStack.pop());
  const img = P.undoStack[P.undoStack.length - 1];
  P.ctx.putImageData(img, 0, 0);
}

export function paintRedo() {
  const P = window._paint; if (!P) return;
  if (!P.redoStack.length) return;
  const img = P.redoStack.pop();
  P.undoStack.push(img);
  P.ctx.putImageData(img, 0, 0);
}

export function paintNew() {
  const P = window._paint; if (!P) return;
  P.ctx.fillStyle = '#ffffff';
  P.ctx.fillRect(0, 0, P.canvas.width, P.canvas.height);
  P.undoStack = [P.ctx.getImageData(0,0,P.canvas.width,P.canvas.height)];
  P.redoStack = [];
  P.modified = false;
  const title = document.querySelector(`#titlebar-${P.winId} .title-text`);
  if (title) title.textContent = 'untitled - Paint';
}

export function paintSave() {
  const P = window._paint; if (!P) return;
  const link = document.createElement('a');
  link.download = 'painting.png';
  link.href = P.canvas.toDataURL('image/png');
  link.click();
  P.modified = false;
  const title = document.querySelector(`#titlebar-${P.winId} .title-text`);
  if (title) title.textContent = title.textContent.replace(/^\*/,'');
}

export function paintOpen() {
  const P = window._paint; if (!P) return;
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = () => {
    const file = input.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      P.canvas.width  = img.width;  P.canvas.height = img.height;
      P.overlay.width = img.width;  P.overlay.height = img.height;
      P.ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      P.undoStack = [P.ctx.getImageData(0,0,P.canvas.width,P.canvas.height)];
      P.redoStack = [];
      const el = document.getElementById(`paint-status-size-${P.winId}`);
      if (el) el.textContent = `${img.width} × ${img.height}`;
      const title = document.querySelector(`#titlebar-${P.winId} .title-text`);
      if (title) title.textContent = `${file.name} - Paint`;
    };
    img.src = url;
  };
  input.click();
}

export function paintSetAsWallpaper() {
  const P = window._paint; if (!P) return;
  const dataUrl = P.canvas.toDataURL('image/png');
  // Inject into wallpaper system
  const desktop = document.getElementById('desktop');
  if (desktop) desktop.style.backgroundImage = `url("${dataUrl}")`;
  window.showNotification('Wallpaper Set', '🖼️ Your painting is now the desktop wallpaper!');
}

export function paintSelectAll() {
  const P = window._paint; if (!P) return;
  P.selection = {x:0, y:0, w:P.canvas.width, h:P.canvas.height};
}

export function paintClearImage() {
  const P = window._paint; if (!P) return;
  const snap = P.ctx.getImageData(0,0,P.canvas.width,P.canvas.height);
  P.undoStack.push(snap);
  if (P.undoStack.length > 20) P.undoStack.shift();
  P.ctx.fillStyle = P.bg;
  P.ctx.fillRect(0, 0, P.canvas.width, P.canvas.height);
}

export function paintInvertColors() {
  const P = window._paint; if (!P) return;
  const snap = P.ctx.getImageData(0,0,P.canvas.width,P.canvas.height);
  P.undoStack.push(snap);
  const img = P.ctx.getImageData(0,0,P.canvas.width,P.canvas.height);
  const d = img.data;
  for (let i=0; i<d.length; i+=4) { d[i]=255-d[i]; d[i+1]=255-d[i+1]; d[i+2]=255-d[i+2]; }
  P.ctx.putImageData(img, 0, 0);
}

export function paintFlip(dir) {
  const P = window._paint; if (!P) return;
  const snap = P.ctx.getImageData(0,0,P.canvas.width,P.canvas.height);
  P.undoStack.push(snap);
  const w = P.canvas.width, h = P.canvas.height;
  P.ctx.save();
  P.ctx.translate(dir==='h' ? w : 0, dir==='v' ? h : 0);
  P.ctx.scale(dir==='h' ? -1 : 1, dir==='v' ? -1 : 1);
  P.ctx.drawImage(P.canvas, 0, 0);
  P.ctx.restore();
}

export function paintRotate(deg) {
  const P = window._paint; if (!P) return;
  const snap = P.ctx.getImageData(0,0,P.canvas.width,P.canvas.height);
  P.undoStack.push(snap);
  const offscreen = document.createElement('canvas');
  if (deg===90||deg===270) {
    offscreen.width = P.canvas.height; offscreen.height = P.canvas.width;
  } else {
    offscreen.width = P.canvas.width; offscreen.height = P.canvas.height;
  }
  const octx = offscreen.getContext('2d');
  octx.translate(offscreen.width/2, offscreen.height/2);
  octx.rotate(deg * Math.PI / 180);
  octx.drawImage(P.canvas, -P.canvas.width/2, -P.canvas.height/2);
  P.canvas.width = offscreen.width; P.canvas.height = offscreen.height;
  P.overlay.width = offscreen.width; P.overlay.height = offscreen.height;
  P.ctx.drawImage(offscreen, 0, 0);
}

export function paintShowAttributes() {
  const P = window._paint; if (!P) return;
  const id = 'paint-attr-dlg';
  if (state.windows[id]) { window.focusWindow(id); return; }
  state.windowDefs[id] = {
    title:'Attributes', icon:'🖼️', w:280, h:200,
    menuBar:[], toolbar:false, statusBar:false,
    content: (body) => {
      body.classList.add('silver');
      body.innerHTML = `
        <div style="padding:14px;font-size:11px;">
          <div class="paint-attr-table">
            <label>Width:</label>
            <input id="pa-w" type="number" value="${P.canvas.width}" min="1">
            <label>Height:</label>
            <input id="pa-h" type="number" value="${P.canvas.height}" min="1">
          </div>
          <div style="margin-top:16px;display:flex;gap:6px;justify-content:flex-end;">
            <button onclick="paintApplyAttributes()" style="padding:3px 14px;font-family:Tahoma;font-size:11px;background:#d4d0c8;border:2px solid;border-color:#fff #888 #888 #fff;cursor:pointer;">OK</button>
            <button onclick="closeWindow('${id}')" style="padding:3px 14px;font-family:Tahoma;font-size:11px;background:#d4d0c8;border:2px solid;border-color:#fff #888 #888 #fff;cursor:pointer;">Cancel</button>
          </div>
        </div>`;
    }
  };
  window.openWindow(id);
}

export function paintApplyAttributes() {
  const P = window._paint; if (!P) return;
  const w = parseInt(document.getElementById('pa-w')?.value) || P.canvas.width;
  const h = parseInt(document.getElementById('pa-h')?.value) || P.canvas.height;
  const saved = P.ctx.getImageData(0, 0, P.canvas.width, P.canvas.height);
  P.undoStack.push(saved);
  P.ctx.fillStyle = '#ffffff';
  P.canvas.width = w; P.canvas.height = h;
  P.overlay.width = w; P.overlay.height = h;
  P.ctx.fillStyle = '#ffffff'; P.ctx.fillRect(0,0,w,h);
  P.ctx.putImageData(saved, 0, 0);
  const el = document.getElementById(`paint-status-size-${P.winId}`);
  if (el) el.textContent = `${w} × ${h}`;
  window.closeWindow('paint-attr-dlg');
}

export function paintShowFlipRotate() {
  const id = 'paint-fr-dlg';
  if (state.windows[id]) { window.focusWindow(id); return; }
  state.windowDefs[id] = {
    title:'Flip and Rotate', icon:'🔄', w:280, h:220,
    menuBar:[], toolbar:false, statusBar:false,
    content:(body) => {
      body.classList.add('silver');
      body.innerHTML = `
        <div style="padding:14px;font-size:11px;display:flex;flex-direction:column;gap:6px;">
          <div style="font-weight:700;">Flip:</div>
          <label style="display:flex;align-items:center;gap:6px;"><input type="radio" name="pfr" value="fh" checked> Flip Horizontal</label>
          <label style="display:flex;align-items:center;gap:6px;"><input type="radio" name="pfr" value="fv"> Flip Vertical</label>
          <div style="font-weight:700;margin-top:6px;">Rotate:</div>
          <label style="display:flex;align-items:center;gap:6px;"><input type="radio" name="pfr" value="r90"> 90° Clockwise</label>
          <label style="display:flex;align-items:center;gap:6px;"><input type="radio" name="pfr" value="r180"> 180°</label>
          <label style="display:flex;align-items:center;gap:6px;"><input type="radio" name="pfr" value="r270"> 90° Counter-Clockwise</label>
          <div style="display:flex;gap:6px;justify-content:flex-end;margin-top:10px;">
            <button onclick="paintApplyFlipRotate()" style="padding:3px 14px;font-family:Tahoma;font-size:11px;background:#d4d0c8;border:2px solid;border-color:#fff #888 #888 #fff;cursor:pointer;">OK</button>
            <button onclick="closeWindow('${id}')" style="padding:3px 14px;font-family:Tahoma;font-size:11px;background:#d4d0c8;border:2px solid;border-color:#fff #888 #888 #fff;cursor:pointer;">Cancel</button>
          </div>
        </div>`;
    }
  };
  window.openWindow(id);
}

export function paintApplyFlipRotate() {
  const val = document.querySelector('[name="pfr"]:checked')?.value;
  if (!val) return;
  if (val==='fh') paintFlip('h');
  else if (val==='fv') paintFlip('v');
  else if (val==='r90') paintRotate(90);
  else if (val==='r180') paintRotate(180);
  else if (val==='r270') paintRotate(270);
  window.closeWindow('paint-fr-dlg');
}

// Re-export UI functions for main.js
export {
  paintSelectTool, paintSetFG, paintSetBG, paintPickCustomColor,
  paintSetLineWidth, paintSetFillMode, paintSetEraserSize,
  paintSetBrushShape, paintSetAirbrushSize, paintSetZoom,
  paintSetSelMode, paintToggleTextStyle, paintTextStyle,
};
