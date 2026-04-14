// ===== PAINT TOOLS — all drawing logic =====
import { BRUSH_SHAPES } from './paint-ui.js';
import { rasterizeTextInput } from './paint-ui.js';

// ── Coordinate helper ──────────────────────────────────────────────────────
export function getPos(e, canvas, zoom) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: Math.floor((e.clientX - rect.left) / zoom),
    y: Math.floor((e.clientY - rect.top)  / zoom),
  };
}

// ── Undo snapshot ──────────────────────────────────────────────────────────
function snapshot(P) {
  P.undoStack.push(P.ctx.getImageData(0, 0, P.canvas.width, P.canvas.height));
  if (P.undoStack.length > 20) P.undoStack.shift();
  P.redoStack = [];
  P.modified = true;
  const title = document.querySelector(`#titlebar-${P.winId} .title-text`);
  if (title && !title.textContent.startsWith('*')) title.textContent = '*' + title.textContent;
}

// ── Brush drawing ──────────────────────────────────────────────────────────
function drawBrushAt(ctx, x, y, color, shapeIdx) {
  const s = BRUSH_SHAPES[shapeIdx] || BRUSH_SHAPES[0];
  ctx.fillStyle   = color;
  ctx.strokeStyle = color;
  ctx.lineWidth   = s.size / 2;
  ctx.lineCap     = 'round';
  ctx.beginPath();
  if (s.type === 'round') {
    ctx.arc(x, y, s.size / 2, 0, Math.PI * 2);
    ctx.fill();
  } else if (s.type === 'square') {
    const h = s.size / 2;
    ctx.fillRect(x - h, y - h, s.size, s.size);
  } else if (s.type === 'diag1') {
    ctx.moveTo(x - s.size, y - s.size);
    ctx.lineTo(x + s.size, y + s.size);
    ctx.stroke();
  } else if (s.type === 'diag2') {
    ctx.moveTo(x + s.size, y - s.size);
    ctx.lineTo(x - s.size, y + s.size);
    ctx.stroke();
  } else if (s.type === 'horiz') {
    ctx.moveTo(x - s.size, y);
    ctx.lineTo(x + s.size, y);
    ctx.stroke();
  } else if (s.type === 'vert') {
    ctx.moveTo(x, y - s.size);
    ctx.lineTo(x, y + s.size);
    ctx.stroke();
  }
}

// ── Flood fill (BFS) ───────────────────────────────────────────────────────
export function floodFill(canvas, ctx, sx, sy, fillHex, tolerance) {
  const w = canvas.width, h = canvas.height;
  const imgData = ctx.getImageData(0, 0, w, h);
  const d = imgData.data;

  const si = (sy * w + sx) * 4;
  const tr = d[si], tg = d[si+1], tb = d[si+2], ta = d[si+3];

  const fr = parseInt(fillHex.slice(1,3),16);
  const fg = parseInt(fillHex.slice(3,5),16);
  const fb = parseInt(fillHex.slice(5,7),16);

  if (tr===fr && tg===fg && tb===fb && ta===255) return;

  const tol = tolerance ?? 32;
  function match(i) {
    return Math.abs(d[i]-tr) <= tol && Math.abs(d[i+1]-tg) <= tol &&
           Math.abs(d[i+2]-tb) <= tol && Math.abs(d[i+3]-ta) <= tol;
  }

  const visited = new Uint8Array(w * h);
  const queue = [sy * w + sx];
  visited[sy * w + sx] = 1;

  while (queue.length) {
    const pos = queue.pop();
    const pi = pos * 4;
    if (!match(pi)) continue;
    d[pi]=fr; d[pi+1]=fg; d[pi+2]=fb; d[pi+3]=255;
    const x = pos % w, y = (pos / w) | 0;
    if (x > 0   && !visited[pos-1]) { visited[pos-1]=1; queue.push(pos-1); }
    if (x < w-1 && !visited[pos+1]) { visited[pos+1]=1; queue.push(pos+1); }
    if (y > 0   && !visited[pos-w]) { visited[pos-w]=1; queue.push(pos-w); }
    if (y < h-1 && !visited[pos+w]) { visited[pos+w]=1; queue.push(pos+w); }
  }
  ctx.putImageData(imgData, 0, 0);
}

// ── Pick color from canvas ─────────────────────────────────────────────────
export function pickColor(canvas, ctx, x, y) {
  const p = ctx.getImageData(x, y, 1, 1).data;
  return `#${p[0].toString(16).padStart(2,'0')}${p[1].toString(16).padStart(2,'0')}${p[2].toString(16).padStart(2,'0')}`;
}

// ── Shape helpers (draw to a given ctx) ───────────────────────────────────
function drawLineShape(ctx, x0,y0,x1,y1, color, lw) {
  ctx.beginPath(); ctx.moveTo(x0,y0); ctx.lineTo(x1,y1);
  ctx.strokeStyle=color; ctx.lineWidth=lw; ctx.lineCap='round'; ctx.stroke();
}

function drawRectShape(ctx, x0,y0,x1,y1, fg,bg, lw, mode) {
  const x=Math.min(x0,x1), y=Math.min(y0,y1), w=Math.abs(x1-x0), h=Math.abs(y1-y0);
  ctx.beginPath(); ctx.rect(x,y,w,h);
  if (mode===1||mode===2) { ctx.fillStyle=bg; ctx.fill(); }
  if (mode===0||mode===1) { ctx.strokeStyle=fg; ctx.lineWidth=lw; ctx.stroke(); }
}

function drawRoundRectShape(ctx, x0,y0,x1,y1, fg,bg, lw, mode) {
  const x=Math.min(x0,x1), y=Math.min(y0,y1), w=Math.abs(x1-x0), h=Math.abs(y1-y0);
  const r = Math.min(8, w/3, h/3);
  ctx.beginPath();
  ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y); ctx.arcTo(x+w,y,x+w,y+r,r);
  ctx.lineTo(x+w,y+h-r); ctx.arcTo(x+w,y+h,x+w-r,y+h,r);
  ctx.lineTo(x+r,y+h); ctx.arcTo(x,y+h,x,y+h-r,r);
  ctx.lineTo(x,y+r); ctx.arcTo(x,y,x+r,y,r); ctx.closePath();
  if (mode===1||mode===2) { ctx.fillStyle=bg; ctx.fill(); }
  if (mode===0||mode===1) { ctx.strokeStyle=fg; ctx.lineWidth=lw; ctx.stroke(); }
}

function drawEllipseShape(ctx, x0,y0,x1,y1, fg,bg, lw, mode) {
  const cx=(x0+x1)/2, cy=(y0+y1)/2, rx=Math.abs(x1-x0)/2, ry=Math.abs(y1-y0)/2;
  ctx.beginPath(); ctx.ellipse(cx,cy,Math.max(rx,1),Math.max(ry,1),0,0,Math.PI*2);
  if (mode===1||mode===2) { ctx.fillStyle=bg; ctx.fill(); }
  if (mode===0||mode===1) { ctx.strokeStyle=fg; ctx.lineWidth=lw; ctx.stroke(); }
}

function drawPolygonShape(ctx, pts, fg,bg, lw, mode, close) {
  if (pts.length < 2) return;
  ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y);
  pts.slice(1).forEach(p => ctx.lineTo(p.x, p.y));
  if (close) ctx.closePath();
  if (close && (mode===1||mode===2)) { ctx.fillStyle=bg; ctx.fill(); }
  ctx.strokeStyle=fg; ctx.lineWidth=lw; ctx.stroke();
}

function drawCurveShape(ctx, pts, fg, lw) {
  if (pts.length < 2) return;
  ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y);
  if (pts.length === 2) {
    ctx.lineTo(pts[1].x, pts[1].y);
  } else if (pts.length === 3) {
    ctx.quadraticCurveTo(pts[2].x, pts[2].y, pts[1].x, pts[1].y);
  }
  ctx.strokeStyle=fg; ctx.lineWidth=lw; ctx.lineCap='round'; ctx.stroke();
}

// ── Airbrush ───────────────────────────────────────────────────────────────
function airbrushAt(ctx, x, y, color, size) {
  const radii   = [10, 18, 28];
  const counts  = [15, 30, 50];
  const r = radii[size-1] ?? 10;
  const n = counts[size-1] ?? 15;
  ctx.fillStyle = color;
  for (let i=0; i<n; i++) {
    const a = Math.random() * Math.PI * 2;
    const d = Math.random() * r;
    ctx.fillRect(x + Math.cos(a)*d, y + Math.sin(a)*d, 1, 1);
  }
}

// ── Selection drawing ──────────────────────────────────────────────────────
let selAnim = null;
function drawSelectionRect(octx, x0,y0,x1,y1) {
  if (selAnim) cancelAnimationFrame(selAnim);
  const x=Math.min(x0,x1), y=Math.min(y0,y1), w=Math.abs(x1-x0), h=Math.abs(y1-y0);
  let off = 0;
  function frame() {
    octx.clearRect(0,0,octx.canvas.width,octx.canvas.height);
    octx.setLineDash([4,4]); octx.lineDashOffset = -off;
    octx.strokeStyle='#000'; octx.lineWidth=1;
    octx.strokeRect(x+0.5,y+0.5,w,h);
    octx.setLineDash([4,4]); octx.lineDashOffset = -off+4;
    octx.strokeStyle='#fff'; octx.lineWidth=1;
    octx.strokeRect(x+0.5,y+0.5,w,h);
    octx.setLineDash([]);
    off = (off+1) % 8;
    selAnim = requestAnimationFrame(frame);
  }
  frame();
}

function clearSelAnim() {
  if (selAnim) { cancelAnimationFrame(selAnim); selAnim = null; }
}

// ── MOUSE EVENT HANDLERS ───────────────────────────────────────────────────

export function onMouseDown(e, P) {
  if (e.button !== 0 && e.button !== 2) return;
  const pos = getPos(e, P.canvas, P.zoomLevel);
  const x = pos.x, y = pos.y;
  const useBG = e.button === 2;
  const drawColor = useBG ? P.bg : P.fg;
  const altColor  = useBG ? P.fg : P.bg;

  switch (P.tool) {
    // ── Pencil ──────────────────────────────────────────────
    case 'pencil':
      snapshot(P);
      P.isDrawing = true;
      P.ctx.beginPath();
      P.ctx.moveTo(x, y);
      P.ctx.fillStyle = drawColor;
      P.ctx.fillRect(x, y, 1, 1);
      P.lastX = x; P.lastY = y;
      break;

    // ── Brush ───────────────────────────────────────────────
    case 'brush':
      snapshot(P);
      P.isDrawing = true;
      drawBrushAt(P.ctx, x, y, drawColor, P.brushShape);
      P.lastX = x; P.lastY = y;
      break;

    // ── Eraser ──────────────────────────────────────────────
    case 'eraser':
      snapshot(P);
      P.isDrawing = true;
      P.ctx.fillStyle = P.bg;
      P.ctx.fillRect(x - P.eraserSize/2, y - P.eraserSize/2, P.eraserSize, P.eraserSize);
      P.lastX = x; P.lastY = y;
      break;

    // ── Fill ────────────────────────────────────────────────
    case 'fill':
      if (x >= 0 && x < P.canvas.width && y >= 0 && y < P.canvas.height) {
        snapshot(P);
        floodFill(P.canvas, P.ctx, x, y, drawColor, 32);
      }
      break;

    // ── Picker ──────────────────────────────────────────────
    case 'picker':
      if (x >= 0 && x < P.canvas.width && y >= 0 && y < P.canvas.height) {
        const col = pickColor(P.canvas, P.ctx, x, y);
        if (!useBG) window.paintSetFG(P.winId, col);
        else        window.paintSetBG(P.winId, col);
      }
      break;

    // ── Magnifier ───────────────────────────────────────────
    case 'magnifier': {
      const levels = [1,2,6,8];
      const cur = levels.indexOf(P.zoomLevel);
      const next = useBG
        ? levels[Math.max(0, cur-1)]
        : levels[Math.min(levels.length-1, cur+1)];
      window.paintSetZoom(next);
      break;
    }

    // ── Airbrush ─────────────────────────────────────────────
    case 'airbrush':
      snapshot(P);
      P.isDrawing = true;
      airbrushAt(P.ctx, x, y, drawColor, P.airbrushSize);
      break;

    // ── Text ─────────────────────────────────────────────────
    case 'text':
      rasterizeTextInput(P);
      {
        const ta = document.createElement('textarea');
        ta.id = 'paint-text-input';
        ta.rows = 3;
        ta.style.font = `${P.textStyle.italic?'italic ':''} ${P.textStyle.bold?'bold ':''} ${P.textStyle.size}px "${P.textStyle.font}"`;
        ta.style.color = P.fg;
        ta.style.textDecoration = P.textStyle.under ? 'underline' : 'none';
        ta.style.left = (x * P.zoomLevel) + 'px';
        ta.style.top  = (y * P.zoomLevel) + 'px';
        P.textX_x = x; P.textX_y = y;
        P.canvas.parentElement.appendChild(ta);
        ta.focus();
        ta.addEventListener('blur', () => { rasterizeTextInput(P); });
        ta.addEventListener('keydown', ev => { if (ev.key === 'Escape') { ta.remove(); } });
      }
      break;

    // ── Line ────────────────────────────────────────────────
    case 'line':
      snapshot(P);
      P.isDrawing = true;
      P.startX = x; P.startY = y;
      P.drawColor = drawColor;
      break;

    // ── Curve ───────────────────────────────────────────────
    case 'curve':
      if (P.curveStep === 0) {
        snapshot(P);
        P.isDrawing = true;
        P.curvePoints = [{x,y}];
        P.startX = x; P.startY = y;
        P.drawColor = drawColor;
      } else {
        P.isDrawing = true;
      }
      break;

    // ── Rect / RoundRect / Ellipse ───────────────────────────
    case 'rect':
    case 'roundrect':
    case 'ellipse':
      snapshot(P);
      P.isDrawing = true;
      P.startX = x; P.startY = y;
      P.drawColor = drawColor;
      P.altColor  = altColor;
      break;

    // ── Polygon ──────────────────────────────────────────────
    case 'polygon':
      if (!P.isPolygonDrawing) {
        snapshot(P);
        P.isPolygonDrawing = true;
        P.polygonPoints = [{x,y}];
        P.drawColor = drawColor;
        P.altColor  = altColor;
      } else {
        P.polygonPoints.push({x,y});
      }
      P.lastX = x; P.lastY = y;
      break;

    // ── Select / Select-Free ─────────────────────────────────
    case 'select':
    case 'select-free':
      clearSelAnim();
      if (P.octx) P.octx.clearRect(0,0,P.overlay.width,P.overlay.height);
      snapshot(P);
      P.isDrawing = true;
      P.startX = x; P.startY = y;
      P.selection = null;
      break;
  }

  e.preventDefault();
}

export function onMouseMove(e, P) {
  const pos = getPos(e, P.canvas, P.zoomLevel);
  const x = pos.x, y = pos.y;

  // Status bar coords
  updateStatus(P, x, y);

  if (!P.isDrawing) {
    // Show polygon rubber-band
    if (P.tool === 'polygon' && P.isPolygonDrawing && P.octx) {
      P.octx.clearRect(0,0,P.overlay.width,P.overlay.height);
      drawPolygonShape(P.octx, [...P.polygonPoints, {x,y}], P.fg, P.bg, P.lineWidth, 0, false);
    }
    return;
  }

  switch (P.tool) {
    case 'pencil':
      P.ctx.beginPath();
      P.ctx.strokeStyle = P.drawColor || P.fg;
      P.ctx.lineWidth   = 1;
      P.ctx.lineCap     = 'round';
      P.ctx.moveTo(P.lastX, P.lastY);
      P.ctx.lineTo(x, y);
      P.ctx.stroke();
      P.lastX = x; P.lastY = y;
      break;

    case 'brush':
      drawBrushAt(P.ctx, x, y, P.drawColor || P.fg, P.brushShape);
      P.lastX = x; P.lastY = y;
      break;

    case 'eraser':
      P.ctx.fillStyle = P.bg;
      P.ctx.fillRect(x - P.eraserSize/2, y - P.eraserSize/2, P.eraserSize, P.eraserSize);
      P.lastX = x; P.lastY = y;
      break;

    case 'airbrush':
      airbrushAt(P.ctx, x, y, P.drawColor || P.fg, P.airbrushSize);
      break;

    case 'line':
      P.octx.clearRect(0,0,P.overlay.width,P.overlay.height);
      drawLineShape(P.octx, P.startX, P.startY, x, y, P.drawColor, P.lineWidth);
      break;

    case 'curve':
      P.octx.clearRect(0,0,P.overlay.width,P.overlay.height);
      if (P.curveStep === 0) {
        // Show straight line while dragging first segment
        drawLineShape(P.octx, P.curvePoints[0].x, P.curvePoints[0].y, x, y, P.drawColor, P.lineWidth);
        P.curvePoints[1] = {x,y};
      } else if (P.curveStep === 1) {
        // Show quadratic curve with control point at mouse
        const pts = [P.curvePoints[0], P.curvePoints[1], {x,y}];
        drawCurveShape(P.octx, pts, P.drawColor, P.lineWidth);
      }
      break;

    case 'rect':
      P.octx.clearRect(0,0,P.overlay.width,P.overlay.height);
      drawRectShape(P.octx, P.startX,P.startY,x,y, P.drawColor,P.altColor, P.lineWidth, P.fillMode);
      break;

    case 'roundrect':
      P.octx.clearRect(0,0,P.overlay.width,P.overlay.height);
      drawRoundRectShape(P.octx, P.startX,P.startY,x,y, P.drawColor,P.altColor, P.lineWidth, P.fillMode);
      break;

    case 'ellipse':
      P.octx.clearRect(0,0,P.overlay.width,P.overlay.height);
      drawEllipseShape(P.octx, P.startX,P.startY,x,y, P.drawColor,P.altColor, P.lineWidth, P.fillMode);
      break;

    case 'select':
      P.octx.clearRect(0,0,P.overlay.width,P.overlay.height);
      drawSelectionRect(P.octx, P.startX,P.startY,x,y);
      break;

    case 'select-free':
      P.octx.clearRect(0,0,P.overlay.width,P.overlay.height);
      // Draw freeform selection path
      break;
  }
}

export function onMouseUp(e, P) {
  const pos = getPos(e, P.canvas, P.zoomLevel);
  const x = pos.x, y = pos.y;

  switch (P.tool) {
    case 'pencil':
    case 'brush':
    case 'eraser':
    case 'airbrush':
      P.isDrawing = false;
      break;

    case 'line':
      P.isDrawing = false;
      P.octx.clearRect(0,0,P.overlay.width,P.overlay.height);
      drawLineShape(P.ctx, P.startX,P.startY,x,y, P.drawColor, P.lineWidth);
      break;

    case 'curve':
      if (P.curveStep === 0) {
        // First drag done — set endpoint
        P.curvePoints[1] = {x,y};
        P.curveStep = 1;
        P.isDrawing = false;
        // Keep overlay line visible
        drawLineShape(P.octx, P.curvePoints[0].x, P.curvePoints[0].y, x, y, P.drawColor, P.lineWidth);
      } else if (P.curveStep === 1) {
        // Bend set → commit
        P.octx.clearRect(0,0,P.overlay.width,P.overlay.height);
        drawCurveShape(P.ctx, [P.curvePoints[0], P.curvePoints[1], {x,y}], P.drawColor, P.lineWidth);
        P.curveStep = 0;
        P.curvePoints = [];
        P.isDrawing = false;
      }
      break;

    case 'rect':
      P.isDrawing = false;
      P.octx.clearRect(0,0,P.overlay.width,P.overlay.height);
      drawRectShape(P.ctx, P.startX,P.startY,x,y, P.drawColor,P.altColor, P.lineWidth, P.fillMode);
      break;

    case 'roundrect':
      P.isDrawing = false;
      P.octx.clearRect(0,0,P.overlay.width,P.overlay.height);
      drawRoundRectShape(P.ctx, P.startX,P.startY,x,y, P.drawColor,P.altColor, P.lineWidth, P.fillMode);
      break;

    case 'ellipse':
      P.isDrawing = false;
      P.octx.clearRect(0,0,P.overlay.width,P.overlay.height);
      drawEllipseShape(P.ctx, P.startX,P.startY,x,y, P.drawColor,P.altColor, P.lineWidth, P.fillMode);
      break;

    case 'select':
      P.isDrawing = false;
      P.selection = {
        x: Math.min(P.startX, x), y: Math.min(P.startY, y),
        w: Math.abs(x - P.startX), h: Math.abs(y - P.startY),
      };
      drawSelectionRect(P.octx, P.startX,P.startY,x,y);
      break;

    case 'select-free':
      P.isDrawing = false;
      break;
  }
}

export function onDblClick(e, P) {
  if (P.tool !== 'polygon') return;
  const pos = getPos(e, P.canvas, P.zoomLevel);
  // Close polygon
  clearSelAnim();
  P.octx.clearRect(0,0,P.overlay.width,P.overlay.height);
  if (P.polygonPoints.length > 1) {
    drawPolygonShape(P.ctx, P.polygonPoints, P.drawColor, P.altColor, P.lineWidth, P.fillMode, true);
  }
  P.isPolygonDrawing = false;
  P.polygonPoints = [];
}

// ── Status bar update ─────────────────────────────────────────────────────
function updateStatus(P, x, y) {
  const coordEl = document.getElementById(`paint-status-coord-${P.winId}`);
  if (coordEl) coordEl.textContent = `${x}, ${y}`;
}
