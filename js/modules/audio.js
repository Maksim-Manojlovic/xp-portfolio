// ===== XP SOUND ENGINE =====
// All sounds synthesized via Web Audio API — no external files needed.
// One shared AudioContext, created on first use (requires prior user gesture).

let _ctx = null;

function ctx() {
  if (!_ctx || _ctx.state === 'closed') {
    const AC = window.AudioContext || /** @type {any} */ (window).webkitAudioContext;
    _ctx = new AC();
  }
  if (_ctx.state === 'suspended') _ctx.resume();
  return _ctx;
}

function muted() {
  return window._xpMuted === true;
}

// ---- Internal helpers ----

function playTone({ freq = 440, type = 'sine', start = 0, dur = 0.15, vol = 0.15, freqEnd = null } = {}) {
  const c = ctx();
  const osc  = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, c.currentTime + start);
  if (freqEnd !== null) {
    osc.frequency.linearRampToValueAtTime(freqEnd, c.currentTime + start + dur);
  }
  gain.gain.setValueAtTime(0, c.currentTime + start);
  gain.gain.linearRampToValueAtTime(vol, c.currentTime + start + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + start + dur);
  osc.connect(gain);
  gain.connect(c.destination);
  osc.start(c.currentTime + start);
  osc.stop(c.currentTime + start + dur + 0.02);
}

// ---- Public sounds ----

// Boot/login jingle — returns a Promise that resolves when sound ends.
// Uses real XP startup MP3, falls back to synthesized (~2.5s) if unavailable.
export function playXPStartup() {
  return new Promise(resolve => {
    if (muted()) { resolve(); return; }

    const audio = new Audio('public/assets/sound/xp-startup.mp3');
    audio.volume = 0.6;
    audio.addEventListener('ended', resolve, { once: true });
    audio.play().catch(() => {
      // File not found or blocked — synthesized fallback (~2.5s)
      try {
        const notes = [
          { freq: 523.25, t: 0.00, dur: 0.6, vol: 0.18 },
          { freq: 659.25, t: 0.18, dur: 0.6, vol: 0.20 },
          { freq: 783.99, t: 0.36, dur: 0.6, vol: 0.20 },
          { freq: 1046.5, t: 0.54, dur: 0.9, vol: 0.22 },
          { freq: 880.00, t: 0.80, dur: 0.7, vol: 0.18 },
          { freq: 1174.7, t: 1.05, dur: 1.4, vol: 0.25 },
        ];
        notes.forEach(n => playTone({ freq: n.freq, start: n.t, dur: n.dur, vol: n.vol }));
      } catch(e) {}
      setTimeout(resolve, 4000);
    });
  });
}

// Window open — short upward blip (two quick tones)
export function playWindowOpen() {
  if (muted()) return;
  try {
    playTone({ freq: 600,  start: 0,    dur: 0.08, vol: 0.10 });
    playTone({ freq: 900,  start: 0.06, dur: 0.10, vol: 0.08 });
  } catch(e) {}
}

// Window close — short downward blip
export function playWindowClose() {
  if (muted()) return;
  try {
    playTone({ freq: 700, start: 0,    dur: 0.08, vol: 0.10 });
    playTone({ freq: 450, start: 0.06, dur: 0.12, vol: 0.08 });
  } catch(e) {}
}

// Minimize — quick descending sweep
export function playMinimize() {
  if (muted()) return;
  try {
    playTone({ freq: 800, freqEnd: 300, start: 0, dur: 0.14, vol: 0.09, type: 'sine' });
  } catch(e) {}
}

// Restore from minimize — quick ascending sweep
export function playRestore() {
  if (muted()) return;
  try {
    playTone({ freq: 300, freqEnd: 800, start: 0, dur: 0.14, vol: 0.09, type: 'sine' });
  } catch(e) {}
}

// Notification balloon — classic XP two-tone ding (ascending)
export function playNotification() {
  if (muted()) return;
  try {
    playTone({ freq: 880,  start: 0,    dur: 0.18, vol: 0.14 });
    playTone({ freq: 1175, start: 0.15, dur: 0.30, vol: 0.16 });
  } catch(e) {}
}

// Error dialog — descending two-tone ding (the XP "ding" error sound)
export function playErrorDing() {
  if (muted()) return;
  try {
    playTone({ freq: 880, start: 0,   dur: 0.15, vol: 0.20 });
    playTone({ freq: 660, start: 0.1, dur: 0.25, vol: 0.18 });
  } catch(e) {}
}

// Start menu open — subtle single click
export function playStartMenu() {
  if (muted()) return;
  try {
    playTone({ freq: 750, start: 0, dur: 0.09, vol: 0.10 });
  } catch(e) {}
}

// Recycle bin empty — short whomp/thud
export function playRecycle() {
  if (muted()) return;
  try {
    playTone({ freq: 180, freqEnd: 60, start: 0,    dur: 0.20, vol: 0.20, type: 'triangle' });
    playTone({ freq: 120, freqEnd: 40, start: 0.05, dur: 0.25, vol: 0.12, type: 'sine'     });
  } catch(e) {}
}

// Mute toggle — returns new muted state
export function toggleMute() {
  window._xpMuted = !window._xpMuted;
  return window._xpMuted;
}
