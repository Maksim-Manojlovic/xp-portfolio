// ===== DESTRUCTION GAME =====
import { state } from '../state.js';
import { showNotification } from '../modules/notification.js';

// Game animation styles are in css/animations.css and css/game.css

let gameActive = false;
let gameWeapon = 'chainsaw'; // 'chainsaw' | 'paintball' | 'bomb'
const WEAPONS = ['chainsaw','paintball','bomb'];
const WEAPON_LABELS = { chainsaw:'🪚 Chainsaw', paintball:'🎨 Paintball', bomb:'💣 Bomb' };
const PAINT_COLORS = ['#e74c3c','#e67e22','#f1c40f','#2ecc71','#3498db','#9b59b6','#1abc9c','#e91e63','#ff5722','#00bcd4'];
let paintColorIdx = 0;
let chainsawDown = false;
let bombAmmo = 12;

export function startGame(weapon) {
  gameWeapon = weapon;
  gameActive = true;
  bombAmmo = 12;
  const overlay = document.getElementById('game-overlay');
  const cursor  = document.getElementById('game-cursor');
  const hud     = document.getElementById('game-hud');
  overlay.classList.add('active');
  cursor.style.display = 'block';
  hud.classList.add('visible');
  updateHUD();
  window.showNotification('🎮 Game On!', weapon === 'chainsaw' ? '🪚 Chainsaw activated!\nClick & drag to destroy.' :
    weapon === 'paintball' ? '🎨 Paintball mode!\nClick to fire.' : '💣 BOMB MODE!\n12 bombs. Use wisely.');
}

export function stopGame() {
  gameActive = false;
  const overlay = document.getElementById('game-overlay');
  const cursor  = document.getElementById('game-cursor');
  const hud     = document.getElementById('game-hud');
  overlay.classList.remove('active');
  cursor.style.display = 'none';
  hud.classList.remove('visible');
  chainsawDown = false;
}

export function switchWeapon() {
  const idx = WEAPONS.indexOf(gameWeapon);
  gameWeapon = WEAPONS[(idx + 1) % WEAPONS.length];
  bombAmmo = 12;
  updateHUD();
  window.showNotification('Weapon Switch', WEAPON_LABELS[gameWeapon]);
}

function updateHUD() {
  document.getElementById('hud-weapon').textContent = WEAPON_LABELS[gameWeapon];
  document.getElementById('hud-ammo').textContent = gameWeapon === 'bomb' ? `💣 x${bombAmmo}` :
    gameWeapon === 'chainsaw' ? '⚡ Unlimited' : '🎨 Unlimited';
}

export function clearDamage() {
  const overlay = document.getElementById('game-overlay');
  while (overlay.firstChild) overlay.removeChild(overlay.firstChild);
  bombAmmo = 12;
  updateHUD();
  window.showNotification('Cleared!','Desktop restored. For now...');
}

// Cursor tracking

function updateCursorAppearance() {
  const cursor = document.getElementById('game-cursor');
  if (gameWeapon === 'chainsaw') {
    // SVG chainsaw — visible on all platforms
    cursor.innerHTML = `<svg width="44" height="44" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg">
      <!-- Handle -->
      <rect x="2" y="18" width="18" height="8" rx="2" fill="#8B4513" stroke="#4a2400" stroke-width="1"/>
      <!-- Engine block -->
      <rect x="10" y="14" width="14" height="16" rx="2" fill="#888" stroke="#444" stroke-width="1"/>
      <!-- Bar -->
      <rect x="22" y="19" width="20" height="6" rx="1" fill="#666" stroke="#333" stroke-width="1"/>
      <!-- Chain teeth top -->
      <rect x="23" y="17" width="4" height="3" rx="1" fill="#ccc"/>
      <rect x="29" y="17" width="4" height="3" rx="1" fill="#ccc"/>
      <rect x="35" y="17" width="4" height="3" rx="1" fill="#ccc"/>
      <!-- Chain teeth bottom -->
      <rect x="23" y="24" width="4" height="3" rx="1" fill="#ccc"/>
      <rect x="29" y="24" width="4" height="3" rx="1" fill="#ccc"/>
      <rect x="35" y="24" width="4" height="3" rx="1" fill="#ccc"/>
      <!-- Tip -->
      <polygon points="42,19 42,25 44,22" fill="#666"/>
      <!-- Engine detail -->
      <rect x="12" y="17" width="4" height="3" rx="1" fill="#aaa"/>
      <circle cx="20" cy="22" r="2" fill="#444"/>
      ${chainsawDown ? '<circle cx="22" cy="12" r="3" fill="rgba(255,80,0,0.8)"/>' : ''}
    </svg>`;
    cursor.className = chainsawDown ? 'chainsaw chainsaw-rev' : 'chainsaw';
    cursor.style.filter = chainsawDown ? 'drop-shadow(0 0 4px rgba(255,100,0,0.8))' : 'drop-shadow(1px 1px 2px rgba(0,0,0,0.6))';
  } else if (gameWeapon === 'paintball') {
    cursor.innerHTML = `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <!-- Gun body -->
      <rect x="2" y="15" width="24" height="8" rx="2" fill="#2a2a2a" stroke="#111" stroke-width="1"/>
      <!-- Barrel -->
      <rect x="24" y="17" width="14" height="4" rx="1" fill="#1a1a1a"/>
      <!-- Handle grip -->
      <rect x="8" y="22" width="7" height="10" rx="2" fill="#1a1a1a" stroke="#111" stroke-width="1"/>
      <!-- Paint tank -->
      <ellipse cx="6" cy="16" rx="5" ry="6" fill="${PAINT_COLORS[paintColorIdx % PAINT_COLORS.length]}" stroke="#333" stroke-width="1"/>
      <!-- Sight -->
      <rect x="14" y="13" width="3" height="3" rx="1" fill="#555"/>
      <!-- Trigger -->
      <path d="M12 22 L10 28 L13 28 L14 22" fill="#333"/>
      <!-- Barrel tip flash -->
      <circle cx="38" cy="19" r="2" fill="${PAINT_COLORS[paintColorIdx % PAINT_COLORS.length]}" opacity="0.8"/>
    </svg>`;
    cursor.className = 'paintball';
    cursor.style.filter = 'drop-shadow(1px 1px 2px rgba(0,0,0,0.5))';
  } else {
    // Bomb
    cursor.innerHTML = `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <!-- Bomb body -->
      <circle cx="20" cy="25" r="13" fill="#1a1a1a" stroke="#444" stroke-width="1.5"/>
      <!-- Shine -->
      <circle cx="15" cy="19" r="4" fill="rgba(255,255,255,0.15)"/>
      <!-- Fuse cord -->
      <path d="M20 12 Q24 6 28 4 Q32 2 30 8" stroke="#8B6914" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <!-- Fuse spark -->
      <circle cx="30" cy="8" r="3" fill="#ff8c00"/>
      <circle cx="30" cy="8" r="1.5" fill="#fff"/>
      <!-- Sparkle rays -->
      <line x1="30" y1="4" x2="30" y2="2" stroke="#ffcc00" stroke-width="1.5"/>
      <line x1="33" y1="6" x2="35" y2="5" stroke="#ffcc00" stroke-width="1.5"/>
      <line x1="34" y1="9" x2="36" y2="10" stroke="#ffcc00" stroke-width="1.5"/>
    </svg>`;
    cursor.className = '';
    cursor.style.filter = 'drop-shadow(0 0 6px rgba(255,140,0,0.7))';
  }
}


// Chainsaw — ragged scratch marks
function spawnChainsawDamage(x, y) {
  const overlay = document.getElementById('game-overlay');
  // main scratch
  const scratch = document.createElement('div');
  const len = 40 + Math.random() * 60;
  const angle = (Math.random() - 0.5) * 180;
  scratch.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:${len}px;height:${2+Math.random()*3}px;
    background:rgba(0,0,0,${0.6+Math.random()*0.4});transform:rotate(${angle}deg);transform-origin:0 50%;
    border-radius:1px;pointer-events:none;`;
  overlay.appendChild(scratch);
  // flying debris particles
  for (let i = 0; i < 4; i++) {
    const p = document.createElement('div');
    const px = x + (Math.random()-0.5)*60;
    const py = y + (Math.random()-0.5)*60;
    const size = 2 + Math.random()*5;
    p.style.cssText = `position:absolute;left:${px}px;top:${py}px;width:${size}px;height:${size}px;
      background:rgba(80,40,10,${0.5+Math.random()*0.5});border-radius:50%;pointer-events:none;
      transform:translate(-50%,-50%);`;
    overlay.appendChild(p);
  }
}

// Paintball — colorful splats
function firePaintball(x, y) {
  const overlay = document.getElementById('game-overlay');
  const color = PAINT_COLORS[paintColorIdx % PAINT_COLORS.length];
  paintColorIdx++;
  const size = 30 + Math.random() * 50;
  // main blob
  const blob = document.createElement('div');
  blob.style.cssText = `position:absolute;left:${x}px;top:${y}px;
    width:${size}px;height:${size * (0.7+Math.random()*0.6)}px;
    background:${color};border-radius:${40+Math.random()*30}% ${60+Math.random()*20}% ${40+Math.random()*30}% ${50+Math.random()*30}%;
    transform:translate(-50%,-50%) rotate(${Math.random()*360}deg);
    pointer-events:none;opacity:0.88;`;
  overlay.appendChild(blob);
  // drips
  const dripCount = 3 + Math.floor(Math.random()*4);
  for (let i = 0; i < dripCount; i++) {
    const drip = document.createElement('div');
    const dx = x + (Math.random()-0.5)*size*1.5;
    const dy = y + (Math.random()-0.3)*size*1.5;
    const ds = 6 + Math.random()*20;
    drip.style.cssText = `position:absolute;left:${dx}px;top:${dy}px;
      width:${ds * (0.4+Math.random()*0.4)}px;height:${ds}px;
      background:${color};border-radius:50% 50% 40% 40%;
      transform:translate(-50%,-50%);pointer-events:none;opacity:0.75;`;
    overlay.appendChild(drip);
  }
  // ricochet splats
  for (let i = 0; i < 2; i++) {
    const rs = document.createElement('div');
    const rx = x + (Math.random()-0.5)*120;
    const ry = y + (Math.random()-0.5)*120;
    const rsz = 5 + Math.random()*12;
    rs.style.cssText = `position:absolute;left:${rx}px;top:${ry}px;
      width:${rsz}px;height:${rsz}px;background:${color};border-radius:50%;
      transform:translate(-50%,-50%);pointer-events:none;opacity:0.6;`;
    overlay.appendChild(rs);
  }
}

// Bomb — huge explosion
function detonateBomb(x, y) {
  const overlay = document.getElementById('game-overlay');
  // shockwave ring
  const ring = document.createElement('div');
  ring.style.cssText = `position:absolute;left:${x}px;top:${y}px;
    width:10px;height:10px;border:4px solid rgba(255,140,0,0.9);border-radius:50%;
    transform:translate(-50%,-50%);pointer-events:none;
    animation:bombRing 0.5s ease-out forwards;`;
  overlay.appendChild(ring);
  setTimeout(() => { if(ring.parentNode) ring.remove(); }, 600);

  // scorch mark
  const scorch = document.createElement('div');
  const sz = 80 + Math.random()*60;
  scorch.style.cssText = `position:absolute;left:${x}px;top:${y}px;
    width:${sz}px;height:${sz * (0.7+Math.random()*0.6)}px;
    background:radial-gradient(circle,rgba(0,0,0,0.9) 0%,rgba(40,20,0,0.7) 40%,rgba(80,40,0,0.3) 70%,transparent 100%);
    border-radius:50%;transform:translate(-50%,-50%) rotate(${Math.random()*360}deg);
    pointer-events:none;`;
  overlay.appendChild(scorch);

  // debris chunks
  for (let i = 0; i < 20; i++) {
    const d = document.createElement('div');
    const angle = Math.random() * Math.PI * 2;
    const dist  = 40 + Math.random() * 140;
    const dx = x + Math.cos(angle) * dist;
    const dy = y + Math.sin(angle) * dist;
    const dsz = 3 + Math.random() * 12;
    const isOrange = Math.random() > 0.5;
    d.style.cssText = `position:absolute;left:${dx}px;top:${dy}px;
      width:${dsz}px;height:${dsz * (0.5+Math.random())}px;
      background:${isOrange ? `rgba(${200+Math.random()*55},${60+Math.random()*80},0,0.85)` : `rgba(30,20,10,0.8)`};
      transform:translate(-50%,-50%) rotate(${Math.random()*360}deg);
      pointer-events:none;border-radius:${Math.random()>0.5?'2px':'50%'};`;
    overlay.appendChild(d);
  }

  // cracks radiating from blast
  for (let i = 0; i < 8; i++) {
    const crack = document.createElement('div');
    const cAngle = (i / 8) * 360 + Math.random()*20;
    const cLen = 60 + Math.random()*100;
    crack.style.cssText = `position:absolute;left:${x}px;top:${y}px;
      width:${cLen}px;height:${1+Math.random()*2}px;
      background:rgba(0,0,0,0.7);transform-origin:0 50%;
      transform:rotate(${cAngle}deg);pointer-events:none;`;
    overlay.appendChild(crack);
  }

  // flash effect
  const flash = document.createElement('div');
  flash.style.cssText = `position:fixed;inset:0;background:rgba(255,200,0,0.4);pointer-events:none;
    animation:bombFlash 0.3s ease-out forwards;z-index:8050;`;
  document.body.appendChild(flash);
  setTimeout(() => { if(flash.parentNode) flash.remove(); }, 400);
}

// ── Event listeners for game ──────────────────────────────────────────
document.getElementById('game-overlay').addEventListener('mousedown', e => {
  if (!gameActive) return;
  if (gameWeapon === 'chainsaw') {
    chainsawDown = true;
    spawnChainsawDamage(e.clientX, e.clientY);
  } else if (gameWeapon === 'paintball') {
    firePaintball(e.clientX, e.clientY);
  } else if (gameWeapon === 'bomb') {
    if (bombAmmo > 0) { detonateBomb(e.clientX, e.clientY); bombAmmo--; updateHUD(); }
    else window.showNotification('Out of ammo!','No more bombs! Press [C] to reload.');
  }
});

document.addEventListener('mousemove', e => {
  if (!gameActive) return;
  const cursor = document.getElementById('game-cursor');
  if (cursor) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
    updateCursorAppearance();
  }
  if (chainsawDown && gameWeapon === 'chainsaw') {
    spawnChainsawDamage(e.clientX, e.clientY);
  }
});

document.addEventListener('mouseup', () => { chainsawDown = false; });

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && gameActive) { stopGame(); return; }
  if (gameActive) {
    if (e.key === 'w' || e.key === 'W') switchWeapon();
    if (e.key === 'c' || e.key === 'C') clearDamage();
  }
});

export function openGameLauncher() {
  const winId = 'gamelauncher';
  if (state.windows[winId]) { window.focusWindow(winId); return; }
  state.windowDefs[winId] = {
    title: 'Game Launcher', icon: '🎮', w: 340, h: 280,
    menuBar: ['File', 'Help'], toolbar: false, statusBar: false,
    content: body => {
      body.style.padding = '16px';
      body.innerHTML = `
        <div style="font-family:'Tahoma',sans-serif;font-size:11px;">
          <div style="font-weight:700;font-size:13px;margin-bottom:12px;">🎮 Desktop Destruction Suite</div>
          <div style="margin-bottom:8px;color:#444;">Select your weapon and wreak havoc on the desktop:</div>
          <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:16px;">
            <button onclick="startGame('chainsaw');closeWindow('gamelauncher')"
              style="padding:8px 12px;background:#d4d0c8;border:2px solid;border-color:#fff #888 #888 #fff;cursor:pointer;font-family:'Tahoma',sans-serif;font-size:11px;text-align:left;">
              🪚 Chainsaw — Click & drag to scratch
            </button>
            <button onclick="startGame('paintball');closeWindow('gamelauncher')"
              style="padding:8px 12px;background:#d4d0c8;border:2px solid;border-color:#fff #888 #888 #fff;cursor:pointer;font-family:'Tahoma',sans-serif;font-size:11px;text-align:left;">
              🎨 Paintball — Click to splat
            </button>
            <button onclick="startGame('bomb');closeWindow('gamelauncher')"
              style="padding:8px 12px;background:#d4d0c8;border:2px solid;border-color:#fff #888 #888 #fff;cursor:pointer;font-family:'Tahoma',sans-serif;font-size:11px;text-align:left;">
              💣 Bomb — 12 bombs, use wisely
            </button>
          </div>
          <div style="font-size:10px;color:#888;">Esc to stop • W to switch weapon • C to clear damage</div>
        </div>`;
    }
  };
  window.openWindow(winId);
}
