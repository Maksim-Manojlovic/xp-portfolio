// ===== PROJECTS WINDOW =====
import { state } from '../state.js';
import { PROJECT_CATEGORIES, PROJECTS, findProject } from '../data/projects.js';

// ---- Level 1: "My Projects" — shows 3 category folders ----
function buildProjects(body) {
  const totalProjects = Object.values(PROJECTS).reduce((s, arr) => s + arr.length, 0);
  body.style.flexDirection = 'row';
  body.innerHTML = `
    <div class="explorer-layout">
      <div class="explorer-sidebar">
        <div class="sidebar-section">
          <div class="sidebar-title">File and Folder Tasks</div>
          <div class="sidebar-link" onclick="window.openWindow('contact')">📧 Contact Maksim</div>
          <div class="sidebar-link" onclick="window.open('https://github.com/Maksim-Manojlovic','_blank')">🐙 View on GitHub</div>
        </div>
        <div class="sidebar-section">
          <div class="sidebar-title">Other Places</div>
          <div class="sidebar-link" onclick="window.openWindow('about')">💻 About Me</div>
          <div class="sidebar-link" onclick="window.openWindow('skills')">⚙️ Skills</div>
        </div>
        <div class="sidebar-section">
          <div class="sidebar-title">Details</div>
          <div style="font-size:10px;color:#444;line-height:1.7;" id="projects-detail-panel">
            <strong>My Projects</strong><br>
            ${totalProjects} total projects<br>
            3 categories<br><br>
            Double-click a folder<br>to browse by technology.
          </div>
        </div>
      </div>
      <div class="explorer-main">
        <div style="margin-bottom:8px;font-size:11px;color:#555;">
          📂 Double-click a category folder to view projects
        </div>
        <div class="folder-grid" id="project-grid">
          ${PROJECT_CATEGORIES.map(cat => `
            <div class="folder-item" id="catfolder-${cat.id}"
              ondblclick="openCategoryWindow('${cat.id}')"
              onclick="selectCatFolder('${cat.id}')">
              <div class="folder-icon" style="position:relative;">
                📁
                <span style="position:absolute;bottom:-2px;right:-4px;font-size:16px;line-height:1;">${cat.folderIcon}</span>
              </div>
              <div class="folder-name">${cat.name}</div>
            </div>`).join('')}
        </div>
        <div style="margin-top:24px;padding:12px;background:#f8f8f8;border:1px solid #ddd;font-size:11px;color:#666;">
          <strong style="color:#0a246a;">Quick stats:</strong><br>
          🔵 WordPress — ${PROJECTS['cat-wordpress'].length} projects &nbsp;|&nbsp;
          ⚛️ React — ${PROJECTS['cat-react'].length} project &nbsp;|&nbsp;
          🟩 Node.js / JS — ${PROJECTS['cat-node'].length} project
        </div>
      </div>
    </div>`;
}

export function selectCatFolder(catId) {
  document.querySelectorAll('.folder-item').forEach(f => f.classList.remove('selected'));
  const el = document.getElementById(`catfolder-${catId}`);
  if (el) el.classList.add('selected');
  const cat = PROJECT_CATEGORIES.find(c => c.id === catId);
  const detail = document.getElementById('projects-detail-panel');
  if (detail && cat) {
    detail.innerHTML = `<strong>${cat.name}</strong><br>${PROJECTS[cat.id].length} project(s)<br><br>${cat.desc}`;
  }
  const status = document.getElementById('status-projects');
  if (status && cat) status.textContent = `${cat.name} — ${PROJECTS[cat.id].length} projects`;
}

// ---- Level 2: Category window — shows project icons inside that category ----
export function openCategoryWindow(catId) {
  const cat = PROJECT_CATEGORIES.find(c => c.id === catId);
  if (!cat) return;
  const winId = `cat-${catId}`;

  if (state.windows[winId]) { window.focusWindow(winId); return; }

  state.windowDefs[winId] = {
    title: `${cat.name} Projects`, icon: cat.folderIcon, w: 720, h: 480,
    menuBar: ['File','Edit','View','Favorites','Tools','Help'],
    toolbar: true,
    addressBar: { text: cat.path },
    statusBar: true,
    content: (body) => buildCategoryBody(body, cat, winId)
  };
  window.openWindow(winId);
}

function buildCategoryBody(body, cat, winId) {
  const projects = PROJECTS[cat.id];
  body.style.flexDirection = 'row';
  body.innerHTML = `
    <div class="explorer-layout">
      <div class="explorer-sidebar">
        <div class="sidebar-section">
          <div class="sidebar-title">File and Folder Tasks</div>
          <div class="sidebar-link" onclick="window.openWindow('projects')">📂 All Categories</div>
          <div class="sidebar-link" onclick="window.openWindow('contact')">📧 Contact Maksim</div>
        </div>
        <div class="sidebar-section">
          <div class="sidebar-title">Other Categories</div>
          ${PROJECT_CATEGORIES.filter(c => c.id !== cat.id).map(c =>
            `<div class="sidebar-link" onclick="openCategoryWindow('${c.id}')">${c.folderIcon} ${c.name}</div>`
          ).join('')}
        </div>
        <div class="sidebar-section">
          <div class="sidebar-title">Details</div>
          <div style="font-size:10px;color:#444;line-height:1.7;" id="detail-${winId}">
            <strong>${cat.name}</strong><br>
            ${projects.length} project(s)<br><br>
            ${cat.desc}<br><br>
            Double-click a project to view details.
          </div>
        </div>
      </div>
      <div class="explorer-main">
        <div style="margin-bottom:6px;font-size:11px;color:#555;display:flex;align-items:center;gap:6px;">
          <span style="cursor:pointer;color:#0000cc;" onclick="window.openWindow('projects')">My Projects</span>
          <span style="color:#888;">›</span>
          <span style="font-weight:700;">${cat.name}</span>
          <span style="margin-left:auto;color:#888;">${projects.length} item(s)</span>
        </div>
        <div class="folder-grid" id="grid-${winId}">
          ${projects.map(p => `
            <div class="folder-item" id="pf-${winId}-${p.id}"
              ondblclick="openProjectDetail('${p.id}')"
              onclick="selectProjectFolder('${winId}','${p.id}')">
              <div class="folder-icon">${p.icon}</div>
              <div class="folder-name">${p.name}</div>
            </div>`).join('')}
        </div>
      </div>
    </div>`;
}

export function selectProjectFolder(winId, projId) {
  document.querySelectorAll(`#grid-${winId} .folder-item`).forEach(f => f.classList.remove('selected'));
  const el = document.getElementById(`pf-${winId}-${projId}`);
  if (el) el.classList.add('selected');
  const proj = findProject(projId);
  const detail = document.getElementById(`detail-${winId}`);
  if (detail && proj) {
    detail.innerHTML = `<strong>${proj.name}</strong><br>Type: ${proj.type}<br>Status: <span style="color:${proj.status==='Live'?'#007700':proj.status==='In Progress'?'#aa7700':'#0055aa'}">${proj.status}</span><br><br>${proj.desc.substring(0,80)}...`;
  }
  // status bar id is generated as status-{winId} by openWindow
  const statusEl = document.getElementById(`status-${winId}`);
  if (statusEl && proj) statusEl.textContent = `${proj.name} — ${proj.type}`;
}

// ---- Level 3: Project detail — clean info sheet ----
export function openProjectDetail(projId) {
  const proj = findProject(projId);
  if (!proj) return;
  const winId = `proj-${projId}`;
  if (state.windows[winId]) { window.focusWindow(winId); return; }

  // find which category this project belongs to
  let catName = '';
  for (const cat of PROJECT_CATEGORIES) {
    if (PROJECTS[cat.id].find(p => p.id === projId)) { catName = cat.name; break; }
  }

  state.windowDefs[winId] = {
    title: `${proj.name} — Properties`, icon: proj.icon, w: 500, h: 400,
    menuBar: ['File','View','Tools','Help'],
    statusBar: false,
    content: (body) => {
      const statusColor = proj.status === 'Live' ? '#007700' : proj.status === 'In Progress' ? '#aa6600' : '#0055aa';
      const statusBg   = proj.status === 'Live' ? '#e8f8e8' : proj.status === 'In Progress' ? '#fff8e0' : '#e8f0ff';
      body.innerHTML = `
        <div style="display:flex;flex-direction:column;height:100%;overflow-y:auto;">

          <!-- Header strip -->
          <div style="background:linear-gradient(to right,#0a246a,#1e5fc4);padding:10px 14px;display:flex;align-items:center;gap:10px;">
            <span style="font-size:28px;">${proj.icon}</span>
            <div>
              <div style="color:#fff;font-size:13px;font-weight:700;">${proj.name}</div>
              <div style="color:rgba(255,255,255,0.7);font-size:10px;">${proj.type}</div>
            </div>
            <div style="margin-left:auto;background:${statusBg};color:${statusColor};border:1px solid ${statusColor};padding:2px 10px;font-size:10px;font-weight:700;border-radius:2px;">${proj.status}</div>
          </div>

          <!-- Body -->
          <div style="padding:12px 14px;flex:1;">

            <!-- Description -->
            <div style="font-size:11px;color:#333;line-height:1.7;margin-bottom:12px;padding:8px;background:#fafafa;border-left:3px solid #0a246a;">
              ${proj.desc}
            </div>

            <!-- Two column layout -->
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;">

              <!-- Tech stack -->
              <div>
                <div style="font-size:10px;font-weight:700;color:#0a246a;border-bottom:1px solid #d4d0c8;padding-bottom:3px;margin-bottom:6px;letter-spacing:0.05em;">TECH STACK</div>
                <div style="display:flex;flex-wrap:wrap;gap:3px;">
                  ${proj.stack.map(t => `<span style="background:#dde8f8;border:1px solid #7f9db9;padding:2px 6px;font-size:10px;color:#0a246a;">${t}</span>`).join('')}
                </div>
              </div>

              <!-- Key features -->
              <div>
                <div style="font-size:10px;font-weight:700;color:#0a246a;border-bottom:1px solid #d4d0c8;padding-bottom:3px;margin-bottom:6px;letter-spacing:0.05em;">KEY FEATURES</div>
                <ul style="margin:0;padding-left:14px;">
                  ${proj.features.map(f => `<li style="font-size:10px;color:#333;margin-bottom:3px;line-height:1.5;">${f}</li>`).join('')}
                </ul>
              </div>
            </div>

            <!-- URL row -->
            <div style="display:flex;align-items:center;gap:8px;padding:6px 8px;background:#f0f0f0;border:1px solid #d4d0c8;">
              <span style="font-size:11px;font-weight:700;color:#444;white-space:nowrap;">URL:</span>
              <a href="${proj.url}" target="_blank" style="font-size:11px;color:#0000cc;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${proj.url}</a>
              <a href="${proj.url}" target="_blank"
                style="padding:3px 12px;background:#d4d0c8;border:2px solid;border-color:#fff #888 #888 #fff;text-decoration:none;color:#000;font-size:11px;white-space:nowrap;flex-shrink:0;">
                🌐 Visit
              </a>
            </div>

          </div>
        </div>`;
    }
  };
  window.openWindow(winId);
}

export function registerProjects() {
  state.windowDefs.projects = {
    title: 'My Projects', icon: '📁', w: 760, h: 520,
    menuBar: ['File', 'Edit', 'View', 'Favorites', 'Tools', 'Help'],
    toolbar: true, addressBar: { text: 'C:\Users\Maksim\Projects' },
    statusBar: true,
    content: buildProjects
  };
}
