// ===== STATS WINDOW =====
import { state } from '../state.js';
import { PROJECTS } from '../data/projects.js';

export function buildStats(body) {
  body.style.background = '#ece9d8';

  // ---- Live-computed stats from PROJECTS data ----
  const allProjects = Object.values(PROJECTS).flat();
  const totalProjects = allProjects.length;
  const liveProjects  = allProjects.filter(p => p.status === 'Live').length;
  const wpProjects    = PROJECTS['cat-wordpress'].length;
  const reactProjects = PROJECTS['cat-react'].length;
  const nodeProjects  = PROJECTS['cat-node'].length;

  // Collect unique tech across all projects
  const allTech = new Set(allProjects.flatMap(p => p.stack));
  const totalTech = allTech.size;

  // Years of experience (started Jan 2020)
  const yearsExp = Math.floor((Date.now() - new Date('2020-01-01')) / (1000*60*60*24*365.25));

  const stats = [
    { label: 'Total Projects',      value: totalProjects, icon: '📁', color: '#1460d4', suffix: '' },
    { label: 'Live Websites',       value: liveProjects,  icon: '🌐', color: '#007700', suffix: '' },
    { label: 'WordPress Projects',  value: wpProjects,    icon: '🔵', color: '#21759b', suffix: '' },
    { label: 'React Projects',      value: reactProjects, icon: '⚛️', color: '#61dafb', suffix: '' },
    { label: 'Node.js Projects',    value: nodeProjects,  icon: '🟩', color: '#68a063', suffix: '' },
    { label: 'Technologies Used',   value: totalTech,     icon: '🛠️', color: '#8b008b', suffix: '+' },
    { label: 'Years Experience',    value: yearsExp,      icon: '📅', color: '#c00',    suffix: '+' },
    { label: 'SEO Audits Done',     value: 12,            icon: '📈', color: '#b8860b', suffix: '+' },
  ];

  body.innerHTML = `
    <div style="padding:0;height:100%;overflow-y:auto;">

      <!-- XP System Properties style header -->
      <div style="background:linear-gradient(to right,#0a246a,#2470db);padding:12px 16px;display:flex;align-items:center;gap:12px;">
        <svg width="36" height="36" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="34" height="34" rx="2" fill="#fff" stroke="#7f9db9" stroke-width="1"/>
          <line x1="8" y1="30" x2="36" y2="30" stroke="#d4d0c8" stroke-width="0.5"/>
          <line x1="8" y1="23" x2="36" y2="23" stroke="#d4d0c8" stroke-width="0.5"/>
          <line x1="8" y1="16" x2="36" y2="16" stroke="#d4d0c8" stroke-width="0.5"/>
          <rect x="10" y="18" width="5" height="12" fill="#4d94ff"/>
          <rect x="17" y="12" width="5" height="18" fill="#4d94ff"/>
          <rect x="24" y="20" width="5" height="10" fill="#4d94ff"/>
          <rect x="31" y="8"  width="5" height="22" fill="#f0c040"/>
          <line x1="8" y1="30" x2="8" y2="7" stroke="#fff" stroke-width="1"/>
          <line x1="8" y1="30" x2="37" y2="30" stroke="#fff" stroke-width="1"/>
        </svg>
        <div>
          <div style="color:#fff;font-size:13px;font-weight:700;">Maksim Manojlovic — Developer Stats</div>
          <div style="color:rgba(255,255,255,0.7);font-size:10px;">System Properties · Performance Monitor · Live data</div>
        </div>
      </div>

      <!-- Stat cards grid -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:12px;">
        ${stats.map(s => `
          <div style="background:#fff;border:1px solid #d4d0c8;padding:10px 12px;display:flex;align-items:center;gap:10px;">
            <span style="font-size:22px;flex-shrink:0;">${s.icon}</span>
            <div style="flex:1;min-width:0;">
              <div style="font-size:10px;color:#666;margin-bottom:2px;">${s.label}</div>
              <div style="font-size:24px;font-weight:700;color:${s.color};line-height:1;" id="stat-count-${s.label.replace(/\s+/g,'-').toLowerCase()}">0${s.suffix}</div>
            </div>
          </div>`).join('')}
      </div>

      <!-- Tech stack bar chart -->
      <div style="margin:0 12px 12px;background:#fff;border:1px solid #d4d0c8;padding:10px 12px;">
        <div style="font-size:11px;font-weight:700;color:#0a246a;margin-bottom:8px;border-bottom:1px solid #d4d0c8;padding-bottom:4px;">
          Technology breakdown
        </div>
        ${[
          { label:'WordPress / PHP', pct: Math.round(wpProjects/totalProjects*100), color:'#21759b' },
          { label:'React / JS',      pct: Math.round((reactProjects+nodeProjects)/totalProjects*100), color:'#61dafb' },
          { label:'HTML / CSS',      pct:95, color:'#e44d26' },
          { label:'SEO & Performance',pct:85, color:'#f0c040' },
        ].map(b => `
          <div style="margin-bottom:6px;">
            <div style="display:flex;justify-content:space-between;font-size:10px;color:#444;margin-bottom:2px;">
              <span>${b.label}</span><span style="font-weight:700;">${b.pct}%</span>
            </div>
            <div style="height:12px;background:#d4d0c8;border:1px inset #aaa;overflow:hidden;">
              <div style="height:100%;background:repeating-linear-gradient(90deg,${b.color} 0px,${b.color} 12px,${adjustColor(b.color)} 12px,${adjustColor(b.color)} 14px);
                width:0%;transition:width 0.8s ease;" data-target="${b.pct}%" class="stat-bar"></div>
            </div>
          </div>`).join('')}
      </div>

      <div style="padding:0 12px 12px;font-size:10px;color:#888;text-align:center;">
        Stats auto-update when projects are added · Last computed: ${new Date().toLocaleDateString('en-GB')}
      </div>
    </div>`;

  // Animate count-up numbers
  stats.forEach(s => {
    const el = document.getElementById('stat-count-' + s.label.replace(/\s+/g,'-').toLowerCase());
    if (!el) return;
    let current = 0;
    const target = s.value;
    const step = Math.max(1, Math.floor(target / 30));
    const interval = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current + s.suffix;
      if (current >= target) clearInterval(interval);
    }, 40);
  });

  // Animate progress bars
  setTimeout(() => {
    body.querySelectorAll('.stat-bar').forEach(bar => {
      bar.style.width = bar.dataset.target;
    });
  }, 100);
}

export function adjustColor(hex) {
  // Slightly darken a hex color for the bar stripe effect
  try {
    const n = parseInt(hex.replace('#',''), 16);
    const r = Math.max(0, ((n>>16)&0xff) - 30);
    const g = Math.max(0, ((n>>8)&0xff)  - 30);
    const b = Math.max(0, (n&0xff)        - 30);
    return '#' + [r,g,b].map(x=>x.toString(16).padStart(2,'0')).join('');
  } catch { return hex; }
}

export function registerStats() {
  state.windowDefs.stats = {
    title: "System Properties — Developer Stats", icon: "📊", w: 520, h: 400,
    menuBar: ["File","View","Tools","Help"], toolbar: false, statusBar: false,
    content: buildStats
  };
}
