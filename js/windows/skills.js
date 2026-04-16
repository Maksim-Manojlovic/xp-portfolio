// ===== SKILLS WINDOW =====
import { state } from '../state.js';

export function showSkillsSection(navEl, sectionId) {
  const container = navEl.closest('div').nextElementSibling || navEl.closest('div[style*=height]');
  // Find all nav items in parent
  navEl.parentElement.querySelectorAll('.skills-nav-item').forEach(n => n.classList.remove('active'));
  // Find all sections
  const win = navEl.closest('.window-body');
  if (win) win.querySelectorAll('.skills-section').forEach(s => s.classList.remove('active'));
  navEl.classList.add('active');
  const sec = document.getElementById(sectionId);
  if (sec) sec.classList.add('active');
}

export function switchTab(tabEl, panelId) {
  tabEl.closest('.sysprop').querySelectorAll('.sysprop-tab').forEach(t => t.classList.remove('active'));
  tabEl.closest('.sysprop').querySelectorAll('.sysprop-panel').forEach(p => p.classList.remove('active'));
  tabEl.classList.add('active');
  document.getElementById(panelId).classList.add('active');
}

export function buildSkills(body) {
  body.style.background = '#fff';
  body.innerHTML = `
    <div style="display:flex;height:100%;overflow:hidden;">

      <!-- Left nav panel -->
      <div style="width:170px;flex-shrink:0;background:#eef3fb;border-right:1px solid #c8d4e8;padding:8px;overflow-y:auto;">
        <div style="font-size:10px;font-weight:700;color:#0a246a;margin-bottom:6px;letter-spacing:0.05em;">SECTIONS</div>
        <div class="skills-nav-item active" onclick="showSkillsSection(this,'sk-wp')">🌐 WordPress Dev</div>
        <div class="skills-nav-item" onclick="showSkillsSection(this,'sk-react')">⚛️ React Dev</div>
        <div class="skills-nav-item" onclick="showSkillsSection(this,'sk-node')">🟩 Node.js Dev</div>
        <div class="skills-nav-item" onclick="showSkillsSection(this,'sk-tools')">🛠️ Tools & Platforms</div>
        <div class="skills-nav-item" onclick="showSkillsSection(this,'sk-seo')">📈 SEO & Performance</div>
        <div style="margin-top:12px;border-top:1px solid #c8d4e8;padding-top:8px;">
          <div style="font-size:10px;font-weight:700;color:#0a246a;margin-bottom:6px;letter-spacing:0.05em;">DOWNLOAD</div>
          <div class="skills-nav-item" onclick="window.openWindow('cv-download')" style="color:#c00;font-weight:700;">📄 Download CV</div>
        </div>
      </div>

      <!-- Main content -->
      <div style="flex:1;overflow-y:auto;padding:14px 16px;">

        <!-- WordPress Dev -->
        <div class="skills-section active" id="sk-wp">
          <div class="sk-header">🌐 WordPress Developer</div>
          <div class="sk-meta">Jan 2020 – Present · Belgrade, Serbia</div>
          <div class="sk-body">
            Designing, developing, and maintaining WordPress websites. Customizing themes, managing plugins, and optimizing site performance and SEO.
            Experience with WooCommerce setup, product management, and checkout customization.
            Performed detailed SEO audits using SEMrush, Google Search Console and Google Analytics.
            Implemented AI-based tools (ChatGPT, Writesonic, WP AI Assistant) to automate content creation and plugin troubleshooting.
          </div>
          <div class="sk-tag-row">
            <div class="sk-subhead">Tech Stack</div>
            <div class="sk-tags">
              ${['HTML','CSS','JavaScript (ES6+)','jQuery','PHP','WordPress','Elementor Pro','WPBakery','Divi','WooCommerce','Astra Theme'].map(t=>`<span class="sk-tag">${t}</span>`).join('')}
            </div>
            <div class="sk-subhead" style="margin-top:8px;">Plugins & Tools</div>
            <div class="sk-tags">
              ${['WP Rocket','Autoptimize','Lazy Load','Yoast SEO','Rank Math','All in One SEO','Wordfence'].map(t=>`<span class="sk-tag sk-tag-gray">${t}</span>`).join('')}
            </div>
            <div class="sk-subhead" style="margin-top:8px;">Monitoring</div>
            <div class="sk-tags">
              ${['Google PageSpeed Insights','GTmetrix','SEMrush','Google Search Console','Google Analytics'].map(t=>`<span class="sk-tag sk-tag-blue">${t}</span>`).join('')}
            </div>
          </div>
          <div class="sk-projects-note">📁 15+ completed projects — see <span style="color:#0000cc;cursor:pointer;" onclick="window.openCategoryWindow('cat-wordpress')">WordPress Projects folder</span></div>
        </div>

        <!-- React Dev -->
        <div class="skills-section" id="sk-react">
          <div class="sk-header">⚛️ React Developer</div>
          <div class="sk-meta">Project: Headless WordPress Website</div>
          <div class="sk-body">
            Developing a headless WordPress website using React and REST API integration.
            Creating a dynamic frontend in React while managing content through WordPress CMS.
            Implementing JWT authentication for secure content management and user login.
          </div>
          <div class="sk-tag-row">
            <div class="sk-subhead">Tech Stack</div>
            <div class="sk-tags">
              ${['React.js','JavaScript (ES6+)','HTML5','Tailwind CSS','Axios','Node.js','WordPress REST API','JWT','GitHub'].map(t=>`<span class="sk-tag">${t}</span>`).join('')}
            </div>
          </div>
          <div class="sk-projects-note">📁 See <span style="color:#0000cc;cursor:pointer;" onclick="window.openCategoryWindow('cat-react')">React Projects folder</span> — OptAmaze</div>
        </div>

        <!-- Node.js Dev -->
        <div class="skills-section" id="sk-node">
          <div class="sk-header">🟩 Node.js Developer</div>
          <div class="sk-meta">Project: Web Tools Suite · Dec 2024 – Present</div>
          <div class="sk-body">
            Created and maintained a set of web-based tools focused on image optimization, PDF management, and SEO analysis.
            Built REST API endpoints tested with Postman. Full stack development from backend to frontend.
          </div>
          <div class="sk-tag-row">
            <div class="sk-subhead">Tech Stack</div>
            <div class="sk-tags">
              ${['Node.js','Express.js','HTML','JavaScript','Tailwind CSS','Git','npm','Visual Studio Code','Postman'].map(t=>`<span class="sk-tag">${t}</span>`).join('')}
            </div>
          </div>
          <div class="sk-projects-note">📁 See <span style="color:#0000cc;cursor:pointer;" onclick="window.openCategoryWindow('cat-node')">Node.js Projects folder</span> — Web Tools</div>
        </div>

        <!-- Tools & Platforms -->
        <div class="skills-section" id="sk-tools">
          <div class="sk-header">🛠️ Tools & Platforms</div>
          <div class="sk-meta">Development Environment & Workflow</div>
          <div class="sk-tag-row" style="margin-top:8px;">
            <div class="sk-subhead">Version Control</div>
            <div class="sk-tags">${['Git','GitHub'].map(t=>`<span class="sk-tag">${t}</span>`).join('')}</div>
            <div class="sk-subhead" style="margin-top:8px;">Editors & IDEs</div>
            <div class="sk-tags">${['Visual Studio Code','Sublime Text'].map(t=>`<span class="sk-tag sk-tag-gray">${t}</span>`).join('')}</div>
            <div class="sk-subhead" style="margin-top:8px;">API Testing</div>
            <div class="sk-tags">${['Postman'].map(t=>`<span class="sk-tag sk-tag-blue">${t}</span>`).join('')}</div>
            <div class="sk-subhead" style="margin-top:8px;">AI Tools</div>
            <div class="sk-tags">${['ChatGPT','Writesonic','WP AI Assistant'].map(t=>`<span class="sk-tag">${t}</span>`).join('')}</div>
            <div class="sk-subhead" style="margin-top:8px;">Design</div>
            <div class="sk-tags">${['Figma','Canva','Adobe XD'].map(t=>`<span class="sk-tag sk-tag-gray">${t}</span>`).join('')}</div>
          </div>
        </div>

        <!-- SEO & Performance -->
        <div class="skills-section" id="sk-seo">
          <div class="sk-header">📈 SEO & Performance Optimization</div>
          <div class="sk-meta">Applied across 15+ client projects</div>
          <div class="sk-body">
            Performed detailed SEO audits and on-page optimizations. Implemented technical SEO fixes including page speed,
            Core Web Vitals improvements, structured data, and sitemap management.
            Experience with Google Search Console, Analytics, and third-party audit tools.
          </div>
          <div class="sk-tag-row">
            <div class="sk-subhead">SEO Plugins</div>
            <div class="sk-tags">${['Yoast SEO','Rank Math','All in One SEO'].map(t=>`<span class="sk-tag">${t}</span>`).join('')}</div>
            <div class="sk-subhead" style="margin-top:8px;">Performance</div>
            <div class="sk-tags">${['WP Rocket','Autoptimize','Lazy Load','CDN Integration'].map(t=>`<span class="sk-tag sk-tag-gray">${t}</span>`).join('')}</div>
            <div class="sk-subhead" style="margin-top:8px;">Analytics & Monitoring</div>
            <div class="sk-tags">${['Google PageSpeed Insights','GTmetrix','Google Analytics','Google Search Console','SEMrush'].map(t=>`<span class="sk-tag sk-tag-blue">${t}</span>`).join('')}</div>
          </div>
        </div>

      </div>
    </div>

    <style>
      .skills-nav-item { font-size:11px;color:#000;padding:4px 6px;border-radius:2px;cursor:pointer;margin-bottom:2px; }
      .skills-nav-item:hover { background:#d8e8f8; }
      .skills-nav-item.active { background:var(--xp-blue-mid,#3b6bc9);color:#fff;font-weight:700; }
      .skills-section { display:none; }
      .skills-section.active { display:block; }
      .sk-header { font-size:13px;font-weight:700;color:#0a246a;margin-bottom:4px; }
      .sk-meta { font-size:10px;color:#888;margin-bottom:10px;font-style:italic; }
      .sk-body { font-size:11px;color:#333;line-height:1.7;margin-bottom:12px;padding:8px;background:#f8f8f8;border-left:3px solid #3b6bc9; }
      .sk-subhead { font-size:10px;font-weight:700;color:#444;margin-bottom:4px;letter-spacing:0.04em; }
      .sk-tag-row { margin-bottom:12px; }
      .sk-tags { display:flex;flex-wrap:wrap;gap:4px;margin-bottom:2px; }
      .sk-tag { background:#dde8f8;border:1px solid #7f9db9;padding:2px 7px;font-size:10px;color:#0a246a;border-radius:1px; }
      .sk-tag-gray { background:#ece9d8;border:1px solid #b0aca0;color:#444; }
      .sk-tag-blue { background:#e8f4ff;border:1px solid #7fb8db;color:#004080; }
      .sk-projects-note { margin-top:12px;padding:6px 8px;background:#fffbe6;border:1px solid #f0c000;font-size:11px;color:#555; }
    </style>`;
}

export function registerSkills() {
  state.windowDefs.skills = {
    title: "Device Manager — Skills & Tools", icon: `<img src="public/assets/icons/Skills.ico" width="16" height="16" style="image-rendering:pixelated;">`, w: 540, h: 460,
    menuBar: ["Action", "View", "Tools", "Help"],
    toolbar: false, statusBar: false,
    content: buildSkills
  };
}
