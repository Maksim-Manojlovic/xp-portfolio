// ===== PAINT UI — tool definitions, icons, HTML builders =====

// 28 authentic XP Paint palette colors (2 rows × 14)
export const XP_COLORS = [
  '#000000','#808080','#800000','#808000','#008000','#008080','#000080','#800080',
  '#c0c0c0','#ffffff','#ff0000','#ffff00','#00ff00','#00ffff',
  '#0000ff','#ff00ff','#ff8040','#804000','#ffff80','#80ff00',
  '#00ff80','#80ffff','#8080ff','#ff80ff','#ff0080','#ff4000','#408000','#004080',
];

export const TOOL_DEFS = [
  { id:'select-free', label:'Free-Form Select' },
  { id:'select',      label:'Select' },
  { id:'eraser',      label:'Eraser/Color Eraser' },
  { id:'fill',        label:'Fill With Color' },
  { id:'picker',      label:'Pick Color' },
  { id:'magnifier',   label:'Magnifier' },
  { id:'pencil',      label:'Pencil' },
  { id:'brush',       label:'Brush' },
  { id:'airbrush',    label:'Air Brush' },
  { id:'text',        label:'Text' },
  { id:'line',        label:'Line' },
  { id:'curve',       label:'Curve' },
  { id:'rect',        label:'Rectangle' },
  { id:'polygon',     label:'Polygon' },
  { id:'ellipse',     label:'Ellipse' },
  { id:'roundrect',   label:'Rounded Rectangle' },
];

// Pixel-art style SVG icons for each tool (24×24)
const ICONS = {
  'select-free': `<svg width="20" height="20" viewBox="0 0 20 20"><path d="M3,10 Q2,4 8,2 L14,5 L11,8 L17,14 L14,16 L8,10 L6,13 Z" fill="white" stroke="black" stroke-width="1" stroke-dasharray="2,1"/></svg>`,
  'select':      `<svg width="20" height="20" viewBox="0 0 20 20"><rect x="2" y="2" width="16" height="16" fill="none" stroke="black" stroke-width="1.5" stroke-dasharray="3,2"/></svg>`,
  'eraser':      `<svg width="20" height="20" viewBox="0 0 20 20"><rect x="1" y="9" width="11" height="8" rx="1" fill="#ff80a0" stroke="black" stroke-width="1"/><path d="M9,9 L15,3 L18,6 L12,12 Z" fill="#ff80a0" stroke="black" stroke-width="1"/><line x1="1" y1="17" x2="18" y2="17" stroke="black" stroke-width="1.5"/></svg>`,
  'fill':        `<svg width="20" height="20" viewBox="0 0 20 20"><path d="M3,13 L9,2 L15,13 Q15,18 12,18 L6,18 Q3,18 3,13Z" fill="#4080ff" stroke="black" stroke-width="1"/><rect x="10" y="12" width="3" height="6" rx="1" fill="#c08040" stroke="black" stroke-width="0.8"/><ellipse cx="17" cy="17" rx="2" ry="2" fill="#ff0000"/></svg>`,
  'picker':      `<svg width="20" height="20" viewBox="0 0 20 20"><path d="M13,2 L17,6 L8,15 L5,17 L3,15 L5,12 Z" fill="#e0e0e0" stroke="black" stroke-width="1"/><line x1="11" y1="4" x2="15" y2="8" stroke="black" stroke-width="0.8"/><circle cx="4" cy="16" r="2" fill="#ff0000"/></svg>`,
  'magnifier':   `<svg width="20" height="20" viewBox="0 0 20 20"><circle cx="8" cy="8" r="6" fill="white" stroke="black" stroke-width="1.5"/><circle cx="8" cy="8" r="4" fill="#c8deff" opacity="0.7"/><line x1="13" y1="13" x2="18" y2="18" stroke="black" stroke-width="2.5" stroke-linecap="round"/></svg>`,
  'pencil':      `<svg width="20" height="20" viewBox="0 0 20 20"><polygon points="5,15 7,13 15,5 17,7 9,15" fill="#ffe060" stroke="black" stroke-width="1"/><polygon points="5,15 3,17 7,17 7,13" fill="#f0a040" stroke="black" stroke-width="0.8"/><line x1="15" y1="5" x2="17" y2="7" stroke="#e87070" stroke-width="2"/><line x1="3" y1="17" x2="7" y2="17" stroke="black" stroke-width="1.2"/></svg>`,
  'brush':       `<svg width="20" height="20" viewBox="0 0 20 20"><rect x="8" y="1" width="4" height="8" rx="2" fill="#c08040" stroke="black" stroke-width="1"/><path d="M7,9 Q10,7 13,9 L14,15 Q10,19 6,15 Z" fill="#6040c0" stroke="black" stroke-width="1"/></svg>`,
  'airbrush':    `<svg width="20" height="20" viewBox="0 0 20 20"><rect x="3" y="8" width="9" height="6" rx="2" fill="#d0d0d0" stroke="black" stroke-width="1"/><rect x="10" y="9" width="5" height="4" rx="1" fill="#b0b0b0" stroke="black" stroke-width="1"/><rect x="5" y="5" width="5" height="4" rx="1" fill="#c0c0c0" stroke="black" stroke-width="0.8"/><circle cx="14" cy="5" r="1" fill="black" opacity="0.5"/><circle cx="16" cy="4" r="0.7" fill="black" opacity="0.4"/><circle cx="16" cy="7" r="0.7" fill="black" opacity="0.4"/><circle cx="13" cy="3" r="0.5" fill="black" opacity="0.3"/><circle cx="17" cy="6" r="0.5" fill="black" opacity="0.3"/></svg>`,
  'text':        `<svg width="20" height="20" viewBox="0 0 20 20"><text x="2" y="16" font-family="serif" font-size="15" font-weight="bold" fill="black">A</text><line x1="14" y1="8" x2="14" y2="17" stroke="black" stroke-width="1.5"/></svg>`,
  'line':        `<svg width="20" height="20" viewBox="0 0 20 20"><line x1="3" y1="17" x2="17" y2="3" stroke="black" stroke-width="2" stroke-linecap="round"/></svg>`,
  'curve':       `<svg width="20" height="20" viewBox="0 0 20 20"><path d="M3,17 Q18,17 10,3" fill="none" stroke="black" stroke-width="2" stroke-linecap="round"/></svg>`,
  'rect':        `<svg width="20" height="20" viewBox="0 0 20 20"><rect x="2" y="4" width="16" height="12" fill="none" stroke="black" stroke-width="2"/></svg>`,
  'polygon':     `<svg width="20" height="20" viewBox="0 0 20 20"><polygon points="10,2 18,8 15,17 5,17 2,8" fill="none" stroke="black" stroke-width="2"/></svg>`,
  'ellipse':     `<svg width="20" height="20" viewBox="0 0 20 20"><ellipse cx="10" cy="10" rx="8" ry="6" fill="none" stroke="black" stroke-width="2"/></svg>`,
  'roundrect':   `<svg width="20" height="20" viewBox="0 0 20 20"><rect x="2" y="4" width="16" height="12" rx="4" fill="none" stroke="black" stroke-width="2"/></svg>`,
};

// Brush shape definitions [cols x rows per brush]
export const BRUSH_SHAPES = [
  { label:'●', type:'round', size:2 },
  { label:'⬤', type:'round', size:4 },
  { label:'⬤', type:'round', size:6 },
  { label:'⬤', type:'round', size:9 },
  { label:'■', type:'square', size:2 },
  { label:'■', type:'square', size:4 },
  { label:'■', type:'square', size:6 },
  { label:'■', type:'square', size:9 },
  { label:'╲', type:'diag1', size:4 },
  { label:'╱', type:'diag2', size:4 },
  { label:'—', type:'horiz', size:4 },
  { label:'│', type:'vert',  size:4 },
];

export function buildToolboxHTML(id) {
  const buttons = TOOL_DEFS.map((t, i) =>
    `<div class="paint-tool-btn${t.id === 'pencil' ? ' active' : ''}"
          title="${t.label}"
          id="ptool-${id}-${t.id}"
          onclick="paintSelectTool('${id}','${t.id}')">
       ${ICONS[t.id] || '?'}
     </div>`
  ).join('');

  return `
    <div class="paint-tools-grid" id="paint-tools-${id}">${buttons}</div>
    <div class="paint-options" id="paint-options-${id}">${buildOptionsHTML('pencil')}</div>`;
}

export function buildOptionsHTML(tool) {
  if (tool === 'brush') {
    return `<div class="paint-opts-label">Shape:</div>
      <div class="paint-opts-grid" id="paint-brush-shapes">
        ${BRUSH_SHAPES.map((s, i) =>
          `<div class="paint-opt-btn${i===0?' active':''}" onclick="paintSetBrushShape(${i})" title="${s.label}" style="font-size:${i<4?'8':'10'}px;">${s.label}</div>`
        ).join('')}
      </div>`;
  }
  if (tool === 'eraser') {
    return `<div class="paint-opts-label">Size:</div>
      <div class="paint-opts-eraser">
        ${[4,8,12,16].map((s,i) =>
          `<div class="paint-opt-btn${i===1?' active':''}" onclick="paintSetEraserSize(${s})" title="${s}px"
                style="width:${s}px;height:${s}px;min-width:0;background:#fff;border:1px solid #000;"></div>`
        ).join('')}
      </div>`;
  }
  if (tool === 'airbrush') {
    return `<div class="paint-opts-label">Size:</div>
      <div class="paint-opts-col">
        ${[{l:'· ',s:1},{l:'·· ',s:2},{l:'···',s:3}].map((o,i) =>
          `<div class="paint-opt-btn${i===0?' active':''}" onclick="paintSetAirbrushSize(${o.s})" style="width:40px;letter-spacing:2px;">${o.l}</div>`
        ).join('')}
      </div>`;
  }
  if (tool === 'magnifier') {
    return `<div class="paint-opts-label">Zoom:</div>
      <div class="paint-opts-col">
        ${[1,2,6,8].map((z,i) =>
          `<div class="paint-opt-btn${i===0?' active':''}" onclick="paintSetZoom(${z})" style="width:36px;">${z}x</div>`
        ).join('')}
      </div>`;
  }
  if (['line','curve'].includes(tool)) {
    return `<div class="paint-opts-label">Width:</div>
      <div class="paint-opts-lines">
        ${[1,2,3,4,5].map((w,i) =>
          `<div class="paint-opt-btn${i===0?' active':''}" onclick="paintSetLineWidth(${w})" style="width:44px;height:${8+w*2}px;">
             <div style="width:36px;height:${w}px;background:#000;"></div>
           </div>`
        ).join('')}
      </div>`;
  }
  if (['rect','polygon','ellipse','roundrect'].includes(tool)) {
    const fillIcons = [
      `<svg width="18" height="12"><rect x="1" y="1" width="16" height="10" fill="none" stroke="black" stroke-width="1.5"/></svg>`,
      `<svg width="18" height="12"><rect x="1" y="1" width="16" height="10" fill="#bbb" stroke="black" stroke-width="1.5"/></svg>`,
      `<svg width="18" height="12"><rect x="1" y="1" width="16" height="10" fill="black"/></svg>`,
    ];
    return `<div class="paint-opts-fill">
        ${fillIcons.map((ic,i) =>
          `<div class="paint-opt-btn${i===0?' active':''}" onclick="paintSetFillMode(${i})" style="width:44px;height:20px;">${ic}</div>`
        ).join('')}
      </div>
      <div class="paint-opts-label">Width:</div>
      <div class="paint-opts-lines">
        ${[1,2,3,4,5].map((w,i) =>
          `<div class="paint-opt-btn${i===0?' active':''}" onclick="paintSetLineWidth(${w})" style="width:44px;height:${8+w*2}px;">
             <div style="width:36px;height:${w}px;background:#000;"></div>
           </div>`
        ).join('')}
      </div>`;
  }
  if (['select','select-free'].includes(tool)) {
    return `<div class="paint-opts-label">Selection:</div>
      <div class="paint-opts-col">
        <div class="paint-opt-btn active" onclick="paintSetSelMode('opaque')" style="width:44px;font-size:9px;" title="Opaque">Opaque</div>
        <div class="paint-opt-btn" onclick="paintSetSelMode('transparent')" style="width:44px;font-size:9px;" title="Transparent">Transp.</div>
      </div>`;
  }
  return `<div style="height:60px;"></div>`;
}

export function buildColorPanelHTML(id) {
  const swatches = XP_COLORS.map(c =>
    `<div class="paint-swatch" style="background:${c};" title="${c}"
          onclick="paintSetFG('${id}','${c}')"
          oncontextmenu="paintSetBG('${id}','${c}');event.preventDefault();"></div>`
  ).join('');
  return `
    <div class="paint-color-panel">
      <div class="paint-fg-bg">
        <div class="paint-bg-swatch" id="paint-bg-${id}" style="background:#ffffff;"
             title="Background color — right-click palette to set&#10;Double-click to pick custom"
             ondblclick="paintPickCustomColor('${id}','bg')"></div>
        <div class="paint-fg-swatch" id="paint-fg-${id}" style="background:#000000;"
             title="Foreground color — left-click palette to set&#10;Double-click to pick custom"
             ondblclick="paintPickCustomColor('${id}','fg')"></div>
      </div>
      <div class="paint-palette">${swatches}</div>
    </div>`;
}

export function buildTextToolbarHTML(id) {
  const fonts = ['Arial','Times New Roman','Courier New','Verdana','Tahoma','Comic Sans MS','Impact'];
  const sizes = [8,9,10,11,12,14,16,18,20,24,28,36,48,72];
  return `
    <div class="paint-text-toolbar" id="paint-text-toolbar-${id}">
      <select id="paint-font-${id}" onchange="paintTextStyle('${id}')">
        ${fonts.map(f => `<option value="${f}"${f==='Arial'?' selected':''}>${f}</option>`).join('')}
      </select>
      <input type="number" id="paint-fontsize-${id}" value="16" min="6" max="144"
             onchange="paintTextStyle('${id}')" style="width:40px;">
      <div class="paint-text-tb-btn" id="ptb-bold-${id}"   onclick="paintToggleTextStyle('${id}','bold')"   title="Bold"><b>B</b></div>
      <div class="paint-text-tb-btn" id="ptb-italic-${id}" onclick="paintToggleTextStyle('${id}','italic')" title="Italic"><i>I</i></div>
      <div class="paint-text-tb-btn" id="ptb-under-${id}"  onclick="paintToggleTextStyle('${id}','under')"  title="Underline"><u>U</u></div>
    </div>`;
}

// ── Global UI action handlers (registered in main.js) ──

export function paintSelectTool(id, tool) {
  document.querySelectorAll(`[id^="ptool-${id}-"]`).forEach(el => el.classList.remove('active'));
  const btn = document.getElementById(`ptool-${id}-${tool}`);
  if (btn) btn.classList.add('active');

  const opts = document.getElementById(`paint-options-${id}`);
  if (opts) opts.innerHTML = buildOptionsHTML(tool);

  const cursors = {
    pencil:'crosshair', brush:'crosshair', eraser:'cell', fill:'crosshair',
    picker:'crosshair', magnifier:'zoom-in', text:'text',
    select:'default', 'select-free':'default',
    line:'crosshair', curve:'crosshair', rect:'crosshair',
    polygon:'crosshair', ellipse:'crosshair', roundrect:'crosshair', airbrush:'crosshair',
  };
  const canvas = document.getElementById(`paint-canvas-${id}`);
  if (canvas) canvas.style.cursor = cursors[tool] || 'crosshair';

  // Text toolbar visibility
  const textTb = document.getElementById(`paint-text-toolbar-${id}`);
  if (textTb) textTb.style.display = tool === 'text' ? 'flex' : 'none';

  const P = window._paint;
  if (!P || P.winId !== id) return;

  // Commit any in-progress polygon/curve before switching
  if (P.tool === 'polygon' && P.polygonPoints.length > 1) {
    P.ctx.beginPath();
    P.ctx.moveTo(P.polygonPoints[0].x, P.polygonPoints[0].y);
    P.polygonPoints.slice(1).forEach(pt => P.ctx.lineTo(pt.x, pt.y));
    P.ctx.closePath();
    applyShapeStyle(P);
  }

  // Rasterize any open text input
  rasterizeTextInput(P);

  P.tool = tool;
  P.polygonPoints = [];
  P.isPolygonDrawing = false;
  P.curveStep = 0;
  P.curvePoints = [];
  if (P.octx) P.octx.clearRect(0, 0, P.overlay.width, P.overlay.height);
}

export function paintSetFG(id, color) {
  const el = document.getElementById(`paint-fg-${id}`);
  if (el) el.style.background = color;
  const P = window._paint;
  if (P && P.winId === id) {
    P.fg = color;
    const ta = document.getElementById('paint-text-input');
    if (ta) ta.style.color = color;
  }
}

export function paintSetBG(id, color) {
  const el = document.getElementById(`paint-bg-${id}`);
  if (el) el.style.background = color;
  const P = window._paint;
  if (P && P.winId === id) P.bg = color;
}

export function paintPickCustomColor(id, which) {
  const input = document.createElement('input');
  input.type = 'color';
  input.value = which === 'fg'
    ? (document.getElementById(`paint-fg-${id}`)?.style.background || '#000000')
    : (document.getElementById(`paint-bg-${id}`)?.style.background || '#ffffff');
  input.style.display = 'none';
  document.body.appendChild(input);
  input.oninput = () => which === 'fg' ? paintSetFG(id, input.value) : paintSetBG(id, input.value);
  input.onchange = () => input.remove();
  input.click();
}

export function paintSetLineWidth(w) {
  document.querySelectorAll('[onclick^="paintSetLineWidth"]').forEach(el => el.classList.remove('active'));
  event?.target?.closest?.('.paint-opt-btn')?.classList.add('active');
  const P = window._paint; if (P) P.lineWidth = w;
}

export function paintSetFillMode(m) {
  document.querySelectorAll('[onclick^="paintSetFillMode"]').forEach(el => el.classList.remove('active'));
  event?.target?.closest?.('.paint-opt-btn')?.classList.add('active');
  const P = window._paint; if (P) P.fillMode = m;
}

export function paintSetEraserSize(s) {
  document.querySelectorAll('[onclick^="paintSetEraserSize"]').forEach(el => el.classList.remove('active'));
  event?.target?.closest?.('.paint-opt-btn')?.classList.add('active');
  const P = window._paint; if (P) P.eraserSize = s;
}

export function paintSetBrushShape(i) {
  document.querySelectorAll('[onclick^="paintSetBrushShape"]').forEach(el => el.classList.remove('active'));
  event?.target?.closest?.('.paint-opt-btn')?.classList.add('active');
  const P = window._paint; if (P) P.brushShape = i;
}

export function paintSetAirbrushSize(s) {
  document.querySelectorAll('[onclick^="paintSetAirbrushSize"]').forEach(el => el.classList.remove('active'));
  event?.target?.closest?.('.paint-opt-btn')?.classList.add('active');
  const P = window._paint; if (P) P.airbrushSize = s;
}

export function paintSetZoom(z) {
  document.querySelectorAll('[onclick^="paintSetZoom"]').forEach(el => el.classList.remove('active'));
  event?.target?.closest?.('.paint-opt-btn')?.classList.add('active');
  const P = window._paint;
  if (!P) return;
  P.zoomLevel = z;
  const wrapper = document.getElementById(`paint-wrapper-${P.winId}`);
  if (wrapper) {
    wrapper.style.transformOrigin = 'top left';
    wrapper.style.transform = `scale(${z})`;
  }
}

export function paintSetSelMode(m) {
  document.querySelectorAll('[onclick^="paintSetSelMode"]').forEach(el => el.classList.remove('active'));
  event?.target?.closest?.('.paint-opt-btn')?.classList.add('active');
  const P = window._paint; if (P) P.selectionMode = m;
}

export function paintToggleTextStyle(id, style) {
  const btn = document.getElementById(`ptb-${style.replace('under','under')}-${id}`);
  if (btn) btn.classList.toggle('active');
  const P = window._paint;
  if (!P) return;
  if (style === 'bold')   P.textStyle.bold   = !P.textStyle.bold;
  if (style === 'italic') P.textStyle.italic = !P.textStyle.italic;
  if (style === 'under')  P.textStyle.under  = !P.textStyle.under;
  updateTextInput(P);
}

export function paintTextStyle(id) {
  const P = window._paint; if (!P) return;
  const fEl = document.getElementById(`paint-font-${id}`);
  const sEl = document.getElementById(`paint-fontsize-${id}`);
  if (fEl) P.textStyle.font = fEl.value;
  if (sEl) P.textStyle.size = parseInt(sEl.value) || 16;
  updateTextInput(P);
}

function updateTextInput(P) {
  const el = document.getElementById('paint-text-input');
  if (!el) return;
  el.style.font = `${P.textStyle.italic?'italic ':''} ${P.textStyle.bold?'bold ':''} ${P.textStyle.size}px "${P.textStyle.font}"`;
  el.style.textDecoration = P.textStyle.under ? 'underline' : 'none';
}

// Saves the active textarea into P.textObjects without drawing to canvas.
export function saveActiveTextToObjects(P) {
  const el = document.getElementById('paint-text-input');
  if (!el || !P) return;
  const text = el.value || '';
  el.remove();
  if (!text.trim()) return;
  const fontStr = `${P.textStyle.italic?'italic ':''} ${P.textStyle.bold?'bold ':''} ${P.textStyle.size}px "${P.textStyle.font}"`;
  const tmp = document.createElement('canvas').getContext('2d');
  tmp.font = fontStr;
  const lines = text.split('\n');
  const lineH = P.textStyle.size + 2;
  const w = Math.max(...lines.map(l => tmp.measureText(l).width), 10);
  const h = lines.length * lineH;
  P.textObjects.push({ x: P.textX_x, y: P.textX_y, text, style: { ...P.textStyle }, color: P.fg, w, h });
}

// Renders all placed-but-not-committed text objects on the overlay canvas.
export function renderTextOverlay(P) {
  if (!P || !P.octx) return;
  P.octx.clearRect(0, 0, P.overlay.width, P.overlay.height);
  P.textObjects.forEach(obj => {
    const fontStr = `${obj.style.italic?'italic ':''} ${obj.style.bold?'bold ':''} ${obj.style.size}px "${obj.style.font}"`;
    P.octx.save();
    P.octx.font = fontStr;
    P.octx.fillStyle = obj.color;
    P.octx.textBaseline = 'top';
    const lineH = obj.style.size + 2;
    if (obj.style.under) {
      obj.text.split('\n').forEach((line, i) => {
        const lw = P.octx.measureText(line).width;
        P.octx.fillRect(obj.x, obj.y + i * lineH + obj.style.size + 1, lw, 1);
      });
    }
    obj.text.split('\n').forEach((line, i) => {
      P.octx.fillText(line, obj.x, obj.y + i * lineH);
    });
    const pad = 3;
    P.octx.setLineDash([4, 4]);
    P.octx.strokeStyle = '#555';
    P.octx.lineWidth = 1;
    P.octx.strokeRect(obj.x - pad, obj.y - pad, obj.w + pad * 2, obj.h + pad * 2);
    P.octx.setLineDash([]);
    P.octx.restore();
  });
}

// Updates the text toolbar UI to reflect P.textStyle (used when re-opening a text object).
export function syncTextToolbar(P) {
  const id = P.winId;
  const fEl = document.getElementById(`paint-font-${id}`);
  const sEl = document.getElementById(`paint-fontsize-${id}`);
  if (fEl) fEl.value = P.textStyle.font;
  if (sEl) sEl.value = P.textStyle.size;
  ['bold', 'italic', 'under'].forEach(s => {
    const btn = document.getElementById(`ptb-${s}-${id}`);
    if (btn) btn.classList.toggle('active', !!P.textStyle[s]);
  });
}

// Commits all text objects (overlay) + active textarea to the main canvas.
// Called when switching tools or any other "finalize" action.
export function rasterizeTextInput(P) {
  if (!P) return;
  saveActiveTextToObjects(P);
  if (!P.textObjects || !P.textObjects.length) return;
  P.ctx.save();
  P.textObjects.forEach(obj => {
    const fontStr = `${obj.style.italic?'italic ':''} ${obj.style.bold?'bold ':''} ${obj.style.size}px "${obj.style.font}"`;
    P.ctx.font = fontStr;
    P.ctx.fillStyle = obj.color;
    P.ctx.textBaseline = 'top';
    const lineH = obj.style.size + 2;
    if (obj.style.under) {
      obj.text.split('\n').forEach((line, i) => {
        const lw = P.ctx.measureText(line).width;
        P.ctx.fillRect(obj.x, obj.y + i * lineH + obj.style.size + 1, lw, 1);
      });
    }
    obj.text.split('\n').forEach((line, i) => {
      P.ctx.fillText(line, obj.x, obj.y + i * lineH);
    });
  });
  P.ctx.restore();
  P.textObjects = [];
  if (P.octx) P.octx.clearRect(0, 0, P.overlay.width, P.overlay.height);
  pushUndo(P);
}

function applyShapeStyle(P) {
  P.ctx.strokeStyle = P.fg;
  P.ctx.fillStyle   = P.bg;
  P.ctx.lineWidth   = P.lineWidth;
  if (P.fillMode === 0) { P.ctx.stroke(); }
  else if (P.fillMode === 1) { P.ctx.fill(); P.ctx.stroke(); }
  else { P.ctx.fill(); }
}

function pushUndo(P) {
  if (!P.ctx) return;
  P.undoStack.push(P.ctx.getImageData(0, 0, P.canvas.width, P.canvas.height));
  if (P.undoStack.length > 20) P.undoStack.shift();
  P.redoStack = [];
  P.modified = true;
  const title = document.querySelector(`#titlebar-${P.winId} .title-text`);
  if (title && !title.textContent.startsWith('*')) title.textContent = '*' + title.textContent;
}
