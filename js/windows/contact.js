// ===== CONTACT WINDOW =====
import { state } from '../state.js';

function buildContact(body) {
  body.innerHTML = `
    <div class="outlook-layout">
      <div class="outlook-toolbar">
        <div class="outlook-btn"><span class="outlook-btn-icon">📨</span>Send</div>
        <div class="outlook-btn"><span class="outlook-btn-icon">📋</span>Copy</div>
        <div class="outlook-btn"><span class="outlook-btn-icon">📎</span>Attach</div>
        <div style="flex:1;"></div>
        <div class="outlook-btn"><span class="outlook-btn-icon">🔒</span>Secure</div>
      </div>
      <div class="compose-area">
        <div class="compose-field">
          <span class="compose-label">From:</span>
          <input class="compose-input" value="mr.maksim.manojlovic@gmail.com" readonly />
        </div>
        <div class="compose-field">
          <span class="compose-label">To:</span>
          <input class="compose-input" id="contact-to" placeholder="your@email.com" />
        </div>
        <div class="compose-field">
          <span class="compose-label">Subject:</span>
          <input class="compose-input" id="contact-subject" placeholder="Hello, Maksim!" />
        </div>
        <div class="compose-divider"></div>
        <div class="compose-field" style="align-items:flex-start;">
          <span class="compose-label" style="padding-top:4px;">Message:</span>
          <textarea class="compose-input area" id="contact-msg" placeholder="Type your message here...&#10;&#10;I'd love to hear from you!"></textarea>
        </div>
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
          <button class="compose-send-btn" onclick="sendContactForm()">📨 Send Message</button>
          <div style="flex:1;"></div>
          <div style="font-size:10px;color:#666;">
            📎 Also reach me at:<br>
            <a href="https://www.linkedin.com/in/maksim-manojlovic-10ab28244/" target="_blank" style="color:#0000cc;">LinkedIn</a> &nbsp;|&nbsp;
            <a href="https://github.com/Maksim-Manojlovic" target="_blank" style="color:#0000cc;">GitHub</a>
          </div>
        </div>
        <div id="contact-msg-sent" style="display:none;background:#d8f0d8;border:1px solid #007700;padding:6px 10px;font-size:11px;color:#007700;">
          ✅ Message sent! Maksim will get back to you soon.
        </div>
      </div>
    </div>`;
}

export function sendContactForm() {
  const to = document.getElementById('contact-to').value;
  const subject = document.getElementById('contact-subject').value;
  const msg = document.getElementById('contact-msg').value;
  if (!to || !msg) { alert('Please fill in your email and message!'); return; }
  const mailto = `mailto:mr.maksim.manojlovic@gmail.com?subject=${encodeURIComponent(subject||'Portfolio Contact')}&body=${encodeURIComponent(`From: ${to}\n\n${msg}`)}`;
  window.open(mailto, '_blank');
  const sent = document.getElementById('contact-msg-sent');
  if (sent) sent.style.display = 'block';
}

export function registerContact() {
  state.windowDefs.contact = {
    title: 'Contact — Outlook Express', icon: '📧', w: 580, h: 460,
    menuBar: ['File', 'Edit', 'View', 'Insert', 'Format', 'Tools', 'Help'],
    toolbar: false, statusBar: false,
    content: buildContact
  };
}
