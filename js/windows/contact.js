// ===== CONTACT WINDOW =====
import { state } from '../state.js';

// TODO: Replace with your Formspree form ID from https://formspree.io
const FORMSPREE_ID = 'xdapvlev';

function buildContact(body) {
  body.innerHTML = `
    <div class="outlook-layout">
      <div class="outlook-toolbar">
        <div class="outlook-btn" onclick="sendContactForm()"><span class="outlook-btn-icon">📨</span>Send</div>
        <div class="outlook-btn" onclick="resetContactForm()"><span class="outlook-btn-icon">🗑️</span>Clear</div>
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
          <input class="compose-input" id="contact-to" placeholder="your@email.com" type="email" />
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
          <button class="compose-send-btn" id="contact-send-btn" onclick="sendContactForm()">📨 Send Message</button>
          <div style="flex:1;"></div>
          <div style="font-size:10px;color:#666;">
            📎 Also reach me at:<br>
            <a href="https://www.linkedin.com/in/maksim-manojlovic-10ab28244/" target="_blank" style="color:#0000cc;">LinkedIn</a> &nbsp;|&nbsp;
            <a href="https://github.com/Maksim-Manojlovic" target="_blank" style="color:#0000cc;">GitHub</a>
          </div>
        </div>

        <!-- Status messages -->
        <div id="contact-sending" style="display:none;">
          <div style="background:#f0f0f0;border:1px solid #d4d0c8;padding:8px 10px;font-size:11px;color:#444;display:flex;align-items:center;gap:8px;">
            <div class="xp-spinner"></div>
            Sending message, please wait...
          </div>
        </div>
        <div id="contact-msg-sent" style="display:none;background:#d8f0d8;border:1px solid #007700;padding:8px 10px;font-size:11px;color:#007700;">
          ✅ Message sent successfully! Maksim will get back to you soon.
        </div>
        <div id="contact-msg-error" style="display:none;background:#fdd;border:1px solid #cc0000;padding:8px 10px;font-size:11px;color:#cc0000;">
          ❌ <span id="contact-error-text">Failed to send. Please try again or email directly.</span>
        </div>
      </div>
    </div>`;
}

export async function sendContactForm() {
  const toEl      = document.getElementById('contact-to');
  const subjectEl = document.getElementById('contact-subject');
  const msgEl     = document.getElementById('contact-msg');
  const sendBtn   = document.getElementById('contact-send-btn');
  const sending   = document.getElementById('contact-sending');
  const sent      = document.getElementById('contact-msg-sent');
  const errorBox  = document.getElementById('contact-msg-error');
  const errorText = document.getElementById('contact-error-text');

  if (!toEl || !msgEl) return;

  const email   = toEl.value.trim();
  const subject = subjectEl?.value.trim() || 'Portfolio Contact';
  const message = msgEl.value.trim();

  // Validate
  if (!email) { toEl.focus(); toEl.style.borderColor = '#cc0000'; return; }
  if (!message) { msgEl.focus(); msgEl.style.borderColor = '#cc0000'; return; }
  toEl.style.borderColor = '';
  msgEl.style.borderColor = '';

  // Show loading state
  sendBtn.disabled = true;
  sendBtn.textContent = '⏳ Sending...';
  sending.style.display = 'block';
  sent.style.display    = 'none';
  errorBox.style.display = 'none';

  try {
    const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ email, subject, message })
    });

    sending.style.display = 'none';

    if (res.ok) {
      sent.style.display = 'block';
      sendBtn.textContent = '✅ Sent!';
      sendBtn.disabled = true;
      // Clear fields
      toEl.value = '';
      subjectEl.value = '';
      msgEl.value = '';
    } else {
      const data = await res.json().catch(() => ({}));
      errorText.textContent = data?.errors?.[0]?.message || 'Failed to send. Please try again.';
      errorBox.style.display = 'block';
      sendBtn.disabled = false;
      sendBtn.textContent = '📨 Send Message';
    }
  } catch {
    sending.style.display = 'none';
    errorText.textContent = 'Network error. Check your connection and try again.';
    errorBox.style.display = 'block';
    sendBtn.disabled = false;
    sendBtn.textContent = '📨 Send Message';
  }
}

export function resetContactForm() {
  const fields = ['contact-to', 'contact-subject', 'contact-msg'];
  fields.forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.value = ''; el.style.borderColor = ''; }
  });
  ['contact-sending', 'contact-msg-sent', 'contact-msg-error'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  const btn = document.getElementById('contact-send-btn');
  if (btn) { btn.disabled = false; btn.textContent = '📨 Send Message'; }
}

export function registerContact() {
  state.windowDefs.contact = {
    title: 'Contact — Outlook Express', icon: '📧', w: 580, h: 460,
    menuBar: ['File', 'Edit', 'View', 'Insert', 'Format', 'Tools', 'Help'],
    toolbar: false, statusBar: false,
    content: buildContact
  };
}
