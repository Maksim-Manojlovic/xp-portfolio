// ===== ABOUT WINDOW =====
import { state } from '../state.js';

function buildAbout(body) {
  body.innerHTML = `
    <div class="about-layout">
      <div class="about-left">
        <div class="about-photo">👨‍💻</div>
        <div class="about-specs">
          <div style="font-weight:700;margin-bottom:4px;font-size:11px;">SYSTEM INFO</div>
          <div class="spec-row"><span class="spec-label">Name</span><span class="spec-val">Maksim</span></div>
          <div class="spec-row"><span class="spec-label">DOB</span><span class="spec-val">15.04.2000</span></div>
          <div class="spec-row"><span class="spec-label">Location</span><span class="spec-val">Belgrade</span></div>
          <div class="spec-row"><span class="spec-label">Status</span><span class="spec-val" style="color:#007700;">Open ✓</span></div>
          <div class="spec-row"><span class="spec-label">Email</span></div>
          <div style="font-size:10px;color:#0000cc;word-break:break-all;margin-top:2px;">mr.maksim.manojlovic<br>@gmail.com</div>
        </div>
      </div>
      <div class="about-right">
        <div class="about-section">
          <div class="about-section-title">👋 Hello, World!</div>
          <div class="about-text">
            I'm <strong>Maksim Manojlovic</strong>, a developer based in Belgrade, Serbia.
            I'm currently studying <strong>Information Systems and Technologies</strong> at the
            Faculty of Organizational Sciences, Belgrade (Oct 2019 – Present).<br><br>
            I started building WordPress websites in 2020 and have delivered 15+ projects for
            businesses, e-commerce stores, and personal brands. I'm now expanding into
            modern JavaScript — React and Node.js — with a headless WordPress approach.
          </div>
        </div>
        <div class="about-section">
          <div class="about-section-title">🎓 Education</div>
          <div class="about-text">
            <strong>Faculty of Organizational Sciences</strong> — Belgrade<br>
            Information Systems and Technologies | Oct 2019 – Present<br><br>
            <strong>10th Belgrade Gymnasium "Mihajlo Pupin"</strong><br>
            Sep 2015 – May 2019
          </div>
        </div>
        <div class="about-section">
          <div class="about-section-title">🧰 Core Stack</div>
          <div class="skill-grid">
            ${['HTML5','CSS3','JavaScript','PHP','React.js','Node.js','WordPress','Elementor','WooCommerce','Tailwind CSS','REST API','JWT','Git/GitHub','SEMrush'].map(s=>`<span class="skill-tag">${s}</span>`).join('')}
          </div>
        </div>
        <div class="about-section">
          <div class="about-section-title">🔗 Links</div>
          <div class="about-text">
            <a href="https://github.com/Maksim-Manojlovic" target="_blank">🐙 github.com/Maksim-Manojlovic</a><br>
            <a href="https://www.linkedin.com/in/maksim-manojlovic-10ab28244/" target="_blank">💼 LinkedIn Profile</a><br>
            <span style="color:#0000cc;cursor:pointer;" onclick="openWindow('contact')">📧 Send Email</span><br>
            <span style="color:#c00;cursor:pointer;font-weight:700;" onclick="openWindow('cv-download')">📄 Download CV & Portfolio</span>
          </div>
        </div>
      </div>
    </div>`;
}

export function registerAbout() {
  state.windowDefs.about = {
    title: 'About Maksim Manojlovic', icon: '💻', w: 680, h: 480,
    menuBar: ['File', 'View', 'Tools', 'Help'],
    toolbar: true, addressBar: { text: 'C:\\Users\\Maksim\\About Me' },
    statusBar: true,
    content: buildAbout
  };
}
