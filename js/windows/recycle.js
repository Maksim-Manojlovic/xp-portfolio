// ===== RECYCLE BIN WINDOW =====
import { state } from '../state.js';

let _msClickTimer = null;
let _msClickCount = 0;

export function msRestoreClick(el) {
  _msClickCount++;
  clearTimeout(_msClickTimer);

  const hint = document.getElementById('ms-restore-hint');

  if (_msClickCount === 1) {
    el.style.background = '#cce0ff';
    el.style.opacity = '1';
    if (hint) hint.style.display = 'inline';
    _msClickTimer = setTimeout(() => {
      _msClickCount = 0;
      const row = document.getElementById('ms-restore-row');
      if (row) { row.style.background = '#fffff0'; row.style.opacity = '0.45'; }
      const h = document.getElementById('ms-restore-hint');
      if (h) h.style.display = 'none';
    }, 800);
  } else {
    _msClickCount = 0;
    if (hint) hint.style.display = 'none';
    window.openMinesweeper();
  }
}

function buildRecycle(body) {
  const trash = [
    { icon: '📄', name: 'old-portfolio-v1.zip',          date: '2021', size: '24 MB' },
    { icon: '📄', name: 'my-first-wordpress-theme.zip',   date: '2020', size: '8 MB' },
    { icon: '📁', name: 'failed-startup-idea',            date: '2022', size: '—' },
    { icon: '📄', name: 'todo-never-done.txt',            date: '2023', size: '2 KB' },
    { icon: '📄', name: 'spaghetti-jquery-code.js',       date: '2021', size: '156 KB' },
    { icon: '📄', name: 'design-i-didnt-like.psd',        date: '2022', size: '88 MB' },
    { icon: '📁', name: 'half-finished-react-app',        date: '2023', size: '—' },
    { icon: '📄', name: 'commit-messages-like-fix',       date: '2021', size: '—' },
  ];

  body.innerHTML = `
    <div style="display:flex;flex-direction:column;flex:1;height:100%;">
      <div style="padding:8px 12px;background:#fff8dc;border-bottom:1px solid #d4d0c8;font-size:11px;color:#666;flex-shrink:0;">
        🗑️ These items are permanently deleted from Maksim's hard drive.
        <span style="color:#0000cc;cursor:pointer;" onclick="playRecycle();alert('Nice try! 😄')">Empty Recycle Bin</span>
      </div>
      <div class="recycle-content">
        <div id="ms-restore-row"
          style="display:flex;align-items:center;gap:8px;padding:6px 8px;
                 border-bottom:2px solid #d4d0c8;font-size:11px;
                 background:#fffff0;cursor:pointer;
                 opacity:0.45;transition:opacity 0.25s,background 0.2s;"
          onmouseover="this.style.opacity='1';this.style.background='#fffde0'"
          onmouseout="this.style.opacity='0.45';this.style.background='#fffff0'"
          onclick="msRestoreClick(this)"
          title="Click once to select • Double-click to restore">
          <span style="font-size:18px;">💣</span>
          <span style="flex:1;color:#444;font-style:italic;">minesweeper.exe</span>
          <span style="color:#aaa;min-width:60px;">2001</span>
          <span style="color:#aaa;min-width:60px;text-align:right;">62 KB</span>
          <span id="ms-restore-hint" style="font-size:10px;color:#888;white-space:nowrap;display:none;">↩ Restore?</span>
        </div>
        ${trash.map(t => `
          <div class="recycle-item">
            <span style="font-size:16px;">${t.icon}</span>
            <span style="flex:1;">${t.name}</span>
            <span style="color:#999;min-width:60px;">${t.date}</span>
            <span style="color:#999;min-width:60px;text-align:right;">${t.size}</span>
          </div>`).join('')}
        <div style="margin-top:12px;padding:8px;background:#f0f0f0;border:1px dashed #ccc;font-size:11px;color:#666;text-align:center;">
          💡 Everyone has a recycle bin. Mine just has JavaScript crimes from 2020.
        </div>
      </div>
    </div>`;
}

export function registerRecycle() {
  state.windowDefs.recycle = {
    title: 'Recycle Bin', icon: '🗑️', w: 500, h: 400,
    menuBar: ['File', 'Edit', 'View', 'Tools', 'Help'],
    toolbar: true, addressBar: { text: 'C:\\RECYCLER' },
    statusBar: true,
    content: buildRecycle
  };
}
