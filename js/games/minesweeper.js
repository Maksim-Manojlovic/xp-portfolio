// ===== MINESWEEPER =====
import { state } from '../state.js';
import { showXPError } from './xpErrors.js';

export function openMinesweeper() {
  const winId = 'minesweeper';
  if (state.windows[winId]) { window.focusWindow(winId); return; }
  state.windowDefs[winId] = {
    title: 'Minesweeper', icon: '💣', w: 340, h: 420,
    menuBar: ['Game','Help'], toolbar: false, statusBar: false,
    content: buildMinesweeper
  };
  window.openWindow(winId);
  window.showNotification('🎉 Easter egg found!', 'minesweeper.exe restored!\nGood luck...');
  state.minesweeperOpenCount++;
  if (state.minesweeperOpenCount === 2) {
    setTimeout(() => showXPError(6), 3000);
  }

  // Add desktop icon if not already there
  if (!document.getElementById('icon-minesweeper')) {
    const desktop = document.getElementById('desktop');
    const el = document.createElement('div');
    el.className = 'desktop-icon';
    el.id = 'icon-minesweeper';
    // Place it below the existing icons — find a free spot
    el.style.left = '100px';
    el.style.top  = '494px';
    el.innerHTML = `
      <div class="desktop-icon-img">
        <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="36" height="36" rx="2" fill="#c8c4b8" stroke="#888" stroke-width="1"/>
          <rect x="4" y="4" width="32" height="32" rx="1" fill="#d4d0c8"/>
          <!-- Grid cells -->
          <rect x="5" y="5" width="9" height="9" fill="#c8c4b8" stroke="#888" stroke-width="0.5"/>
          <rect x="15" y="5" width="9" height="9" fill="#c8c4b8" stroke="#888" stroke-width="0.5"/>
          <rect x="25" y="5" width="9" height="9" fill="#c8c4b8" stroke="#888" stroke-width="0.5"/>
          <rect x="5" y="15" width="9" height="9" fill="#c8c4b8" stroke="#888" stroke-width="0.5"/>
          <rect x="15" y="15" width="9" height="9" fill="#fff" stroke="#aaa" stroke-width="0.5"/>
          <text x="19.5" y="23" text-anchor="middle" font-size="7" fill="#0000ff" font-weight="bold" font-family="Tahoma,sans-serif">3</text>
          <rect x="25" y="15" width="9" height="9" fill="#fff" stroke="#aaa" stroke-width="0.5"/>
          <text x="29.5" y="23" text-anchor="middle" font-size="7" fill="#007700" font-weight="bold" font-family="Tahoma,sans-serif">2</text>
          <rect x="5" y="25" width="9" height="9" fill="#c8c4b8" stroke="#888" stroke-width="0.5"/>
          <rect x="15" y="25" width="9" height="9" fill="#c8c4b8" stroke="#888" stroke-width="0.5"/>
          <!-- Mine in center-left -->
          <circle cx="9.5" cy="29.5" r="3" fill="#1a1a1a"/>
          <line x1="9.5" y1="25.5" x2="9.5" y2="33.5" stroke="#1a1a1a" stroke-width="1"/>
          <line x1="5.5" y1="29.5" x2="13.5" y2="29.5" stroke="#1a1a1a" stroke-width="1"/>
          <line x1="7" y1="27" x2="12" y2="32" stroke="#1a1a1a" stroke-width="1"/>
          <line x1="12" y1="27" x2="7" y2="32" stroke="#1a1a1a" stroke-width="1"/>
          <circle cx="8" cy="28" r="1" fill="#fff" opacity="0.7"/>
          <!-- Flag -->
          <rect x="25" y="25" width="9" height="9" fill="#c8c4b8" stroke="#888" stroke-width="0.5"/>
          <line x1="27" y1="27" x2="27" y2="33" stroke="#888" stroke-width="1.5"/>
          <polygon points="27,27 33,29 27,31" fill="#f00"/>
        </svg>
      </div>
      <div class="desktop-icon-label">Minesweeper</div>`;
    el.addEventListener('click', e => { e.stopPropagation(); window.selectIcon('minesweeper'); });
    el.addEventListener('dblclick', e => { e.stopPropagation(); openMinesweeper(); });
    el.addEventListener('mousedown', e => { e.stopPropagation(); window.startIconDrag(e, 'minesweeper'); });
    desktop.appendChild(el);
  }

  // Remove minesweeper.exe row from recycle bin if it's open
  const msRow = document.getElementById('ms-restore-row');
  if (msRow) {
    msRow.style.transition = 'opacity 0.4s';
    msRow.style.opacity = '0';
    setTimeout(() => { if (msRow.parentNode) msRow.remove(); }, 400);
  }
}

function buildMinesweeper(body) {
  body.classList.add('silver');
  body.style.padding = '0';

  // Game config
  const ROWS = 9, COLS = 9, MINES = 10;
  let board = [], revealed = [], flagged = [], gameOver = false, gameWon = false;
  let firstClick = true, timerVal = 0, timerInterval = null, minesLeft = MINES;

  function initBoard() {
    board = Array.from({length: ROWS}, () => Array(COLS).fill(0));
    revealed = Array.from({length: ROWS}, () => Array(COLS).fill(false));
    flagged = Array.from({length: ROWS}, () => Array(COLS).fill(false));
    gameOver = false; gameWon = false; firstClick = true;
    timerVal = 0; minesLeft = MINES;
    clearInterval(timerInterval);
    render();
  }

  function placeMines(safeR, safeC) {
    let placed = 0;
    while (placed < MINES) {
      const r = Math.floor(Math.random() * ROWS);
      const c = Math.floor(Math.random() * COLS);
      if (board[r][c] !== -1 && !(r === safeR && c === safeC)) {
        board[r][c] = -1; placed++;
      }
    }
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (board[r][c] === -1) continue;
        let count = 0;
        for (let dr = -1; dr <= 1; dr++)
          for (let dc = -1; dc <= 1; dc++) {
            const nr = r+dr, nc = c+dc;
            if (nr>=0 && nr<ROWS && nc>=0 && nc<COLS && board[nr][nc]===-1) count++;
          }
        board[r][c] = count;
      }
    }
  }

  function reveal(r, c) {
    if (r<0||r>=ROWS||c<0||c>=COLS||revealed[r][c]||flagged[r][c]) return;
    revealed[r][c] = true;
    if (board[r][c] === 0)
      for (let dr=-1;dr<=1;dr++) for(let dc=-1;dc<=1;dc++) reveal(r+dr,c+dc);
  }

  function countFlagsAround(r, c) {
    let f = 0;
    for (let dr=-1;dr<=1;dr++) for(let dc=-1;dc<=1;dc++) {
      const nr=r+dr, nc=c+dc;
      if (nr>=0&&nr<ROWS&&nc>=0&&nc<COLS&&flagged[nr][nc]) f++;
    }
    return f;
  }

  function checkWin() {
    for (let r=0;r<ROWS;r++) for(let c=0;c<COLS;c++)
      if (board[r][c]!==-1 && !revealed[r][c]) return false;
    return true;
  }

  function handleClick(r, c) {
    if (gameOver || gameWon || flagged[r][c]) return;
    if (firstClick) {
      firstClick = false;
      placeMines(r, c);
      timerInterval = setInterval(() => {
        timerVal = Math.min(999, timerVal+1);
        const t = body.querySelector('#ms-timer');
        if (t) t.textContent = String(timerVal).padStart(3,'0');
      }, 1000);
    }
    if (revealed[r][c]) {
      // chord click
      if (board[r][c] > 0 && countFlagsAround(r,c) === board[r][c]) {
        for (let dr=-1;dr<=1;dr++) for(let dc=-1;dc<=1;dc++) {
          const nr=r+dr,nc=c+dc;
          if (nr>=0&&nr<ROWS&&nc>=0&&nc<COLS&&!flagged[nr][nc]&&!revealed[nr][nc]) {
            if (board[nr][nc]===-1) { triggerGameOver(nr,nc); return; }
            reveal(nr,nc);
          }
        }
      }
      render(); return;
    }
    if (board[r][c] === -1) { triggerGameOver(r,c); return; }
    reveal(r, c);
    if (checkWin()) { gameWon=true; clearInterval(timerInterval); }
    render();
  }

  function handleRightClick(e, r, c) {
    e.preventDefault();
    if (gameOver || gameWon || revealed[r][c]) return;
    flagged[r][c] = !flagged[r][c];
    minesLeft += flagged[r][c] ? -1 : 1;
    render();
  }

  function triggerGameOver(hitR, hitC) {
    gameOver = true;
    clearInterval(timerInterval);
    // reveal all mines
    for (let r=0;r<ROWS;r++) for(let c=0;c<COLS;c++)
      if (board[r][c]===-1 && !flagged[r][c]) revealed[r][c]=true;
    render();
    // mark the clicked mine red
    setTimeout(() => {
      const cell = body.querySelector(`[data-r="${hitR}"][data-c="${hitC}"]`);
      if (cell) cell.style.background = '#ff4444';
    }, 10);
  }

  const NUM_COLORS = ['','#0000ff','#007700','#ff0000','#000080','#880000','#008080','#000000','#808080'];

  function render() {
    const face = gameOver ? '😵' : gameWon ? '😎' : '😊';
    const ml = String(Math.max(0, minesLeft)).padStart(3, '0');
    const tr = String(timerVal).padStart(3, '0');

    // Build rows separately for clarity
    let rows = '';
    for (let r = 0; r < ROWS; r++) {
      let cells = '';
      for (let c = 0; c < COLS; c++) {
        const isRev     = revealed[r][c];
        const isFlagged = flagged[r][c];
        const val       = board[r][c];

        let content = '';
        let cellStyle = 'width:22px;height:22px;text-align:center;vertical-align:middle;cursor:default;font-family:Tahoma,sans-serif;font-size:13px;font-weight:700;';

        if (!isRev && isFlagged) {
          content   = '🚩';
          cellStyle += 'background:#c8c4b8;border:2px solid;border-color:#fff #888 #888 #fff;';
        } else if (!isRev) {
          content   = '';
          cellStyle += 'background:#c8c4b8;border:2px solid;border-color:#fff #888 #888 #fff;';
        } else {
          // Revealed
          cellStyle += 'background:#c0bdb2;border:1px solid #999;';
          if (val === -1)    content = '💥';
          else if (val > 0)  content = `<span style="color:${NUM_COLORS[val]}">${val}</span>`;
        }

        const clickable = !gameOver && !gameWon;
        const evts = clickable
          ? `onclick="msClick(${r},${c})" oncontextmenu="msRightClick(event,${r},${c})"`
          : '';

        cells += `<td data-r="${r}" data-c="${c}" ${evts} style="${cellStyle}">${content}</td>`;
      }
      rows += `<tr>${cells}</tr>`;
    }

    const ledStyle = 'background:#000;color:#f00;font-family:"Courier New",monospace;font-size:20px;font-weight:700;padding:1px 4px;min-width:46px;text-align:right;border:2px inset #666;letter-spacing:1px;';

    body.innerHTML = `
      <div style="padding:8px;background:#c8c4b8;display:inline-flex;flex-direction:column;align-items:center;user-select:none;min-width:100%;">
        <div style="background:#c8c4b8;border:2px solid;border-color:#888 #fff #fff #888;padding:6px 8px;display:flex;align-items:center;justify-content:space-between;width:100%;box-sizing:border-box;margin-bottom:8px;">
          <div style="${ledStyle}">${ml}</div>
          <div onclick="msSmileyClick()" style="font-size:22px;cursor:pointer;background:#c8c4b8;border:2px solid;border-color:#fff #888 #888 #fff;padding:1px 8px;border-radius:2px;" title="New Game">${face}</div>
          <div style="${ledStyle}">${tr}</div>
        </div>
        <div style="border:3px solid;border-color:#888 #fff #fff #888;">
          <table style="border-collapse:collapse;table-layout:fixed;" cellpadding="0" cellspacing="0">${rows}</table>
        </div>
        ${gameWon  ? '<div style="margin-top:6px;font-size:11px;font-weight:700;color:#007700;">🎉 You win! Time: ' + timerVal + 's</div>' : ''}
        ${gameOver ? '<div style="margin-top:6px;font-size:11px;font-weight:700;color:#c00;">💀 Game over! Click 😊 to try again.</div>' : ''}
      </div>`;
  }

  // Expose to global scope and kick off
  window._ms = { handleClick, handleRightClick, initBoard };
  initBoard();
}

