// ===== CLOCK =====

export function updateClock() {
  const now = new Date();
  const h = now.getHours().toString().padStart(2, '0');
  const m = now.getMinutes().toString().padStart(2, '0');
  const timeStr = `${h}:${m}`;

  const days   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const day    = days[now.getDay()];
  const date   = now.getDate();
  const month  = months[now.getMonth()];
  const year   = now.getFullYear();
  const dateStr = `${day}, ${date} ${month} ${year}`;

  const timeEl    = document.getElementById('clock-time');
  const tooltipEl = document.getElementById('clock-tooltip');
  if (timeEl)    timeEl.textContent    = timeStr;
  if (tooltipEl) tooltipEl.textContent = dateStr;
}

export function startClock() {
  updateClock();
  setInterval(updateClock, 10000);
}
