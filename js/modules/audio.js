// ===== XP SOUNDS =====

export function playXPStartup() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [
      { freq: 523.25, t: 0.00, dur: 0.6, vol: 0.18 },  // C5
      { freq: 659.25, t: 0.18, dur: 0.6, vol: 0.20 },  // E5
      { freq: 783.99, t: 0.36, dur: 0.6, vol: 0.20 },  // G5
      { freq: 1046.5, t: 0.54, dur: 0.9, vol: 0.22 },  // C6
      { freq: 880.00, t: 0.80, dur: 0.7, vol: 0.18 },  // A5
      { freq: 1174.7, t: 1.05, dur: 1.4, vol: 0.25 },  // D6 (sustain)
    ];
    notes.forEach(n => {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = n.freq;
      gain.gain.setValueAtTime(0, ctx.currentTime + n.t);
      gain.gain.linearRampToValueAtTime(n.vol, ctx.currentTime + n.t + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + n.t + n.dur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + n.t);
      osc.stop(ctx.currentTime + n.t + n.dur + 0.05);
    });
  } catch(e) { /* audio not available */ }
}

export function playErrorDing() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.setValueAtTime(660, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.4);
  } catch(e) {}
}
