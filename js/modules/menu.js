// ===== MENU SYSTEM =====
import { showNotification } from './notification.js';

export function getMenuItems(label, winId) {
  const menus = {
    'File': [
      { icon:'📄', label:'New Window',       action: ()=>window.openWindow('projects') },
      { sep: true },
      { icon:'💾', label:'Save Page As...',  action: ()=>showNotification('Save As','Saving HTML portfolio...\nDone! Just kidding — it\'s already a file 😄') },
      { icon:'🖨️', label:'Print...',         action: ()=>showNotification('Print','Sending to printer...\nPaper jam on page 2. Classic.') },
      { sep: true },
      { icon:'🔒', label:'Properties',       action: ()=>window.openPropertiesDialog(winId) },
      { sep: true },
      { icon:'🚪', label:'Close',            action: ()=>window.closeWindow(winId) },
    ],
    'Edit': [
      { icon:'↩️', label:'Undo',             shortcut:'Ctrl+Z', action: ()=>showNotification('Undo','Nothing to undo.\nLife doesn\'t have Ctrl+Z either. 😔') },
      { icon:'✂️', label:'Cut',              shortcut:'Ctrl+X', action: ()=>showNotification('Cut','Cut what exactly?') },
      { icon:'📋', label:'Copy',             shortcut:'Ctrl+C', action: ()=>{ navigator.clipboard?.writeText(window.location.href); showNotification('Copied!','URL copied to clipboard.'); } },
      { icon:'📌', label:'Paste',            shortcut:'Ctrl+V', disabled: true },
      { sep: true },
      { icon:'🔍', label:'Find on this page',shortcut:'Ctrl+F', action: ()=>window.startInWindowSearch(winId) },
      { sep: true },
      { icon:'✅', label:'Select All',       shortcut:'Ctrl+A', action: ()=>showNotification('Select All','Everything selected. Congrats.') },
    ],
    'View': [
      { icon:'🔎', label:'Zoom In',          action: ()=>window.zoomWindow(winId, 1.1) },
      { icon:'🔍', label:'Zoom Out',         action: ()=>window.zoomWindow(winId, 0.9) },
      { icon:'🔲', label:'Normal Size',      action: ()=>window.zoomWindow(winId, null) },
      { sep: true },
      { icon:'🔄', label:'Refresh',          shortcut:'F5', action: ()=>{ window.closeWindow(winId); setTimeout(()=>window.openWindow(winId.replace('cat-','').replace('proj-','')),100); } },
      { sep: true },
      { icon:'🖼️', label:'Change Wallpaper', action: ()=>window.openWallpaperPicker() },
      { icon:'💻', label:'View Source Code', action: ()=>window.openSourceViewer() },
    ],
    'Favorites': [
      { icon:'⭐', label:'Add to Favorites', action: ()=>showNotification('Favorites','Added to favorites!\n(Not really, bookmarks are so 2003)') },
      { sep: true },
      { icon:'🐙', label:'GitHub',           action: ()=>window.open('https://github.com/Maksim-Manojlovic','_blank') },
      { icon:'💼', label:'LinkedIn',         action: ()=>window.open('https://www.linkedin.com/in/maksim-manojlovic-10ab28244/','_blank') },
      { icon:'🚀', label:'OptAmaze',         action: ()=>window.open('https://optamaze.me','_blank') },
    ],
    'Tools': [
      { icon:'🌐', label:'Internet Options', action: ()=>showNotification('Internet Options','This button has been here since 2001.\nNo one has ever clicked it on purpose.') },
      { icon:'🔒', label:'Pop-up Blocker',   action: ()=>showNotification('Pop-up Blocker','✅ All pop-ups blocked.\n(Except this one. Ironic.)') },
      { icon:'🗑️', label:'Delete Cookies',   action: ()=>showNotification('Delete Cookies','Cookies deleted!\nNow re-accept 47 GDPR banners.') },
      { sep: true },
      { icon:'🪚', label:'Destroy Desktop — Chainsaw!', action: ()=>window.startGame('chainsaw') },
      { icon:'🎨', label:'Paintball Mode!',  action: ()=>window.startGame('paintball') },
      { icon:'💣', label:'FULL DESTRUCTION', action: ()=>window.startGame('bomb') },
      { sep: true },
      { icon:'⚙️', label:'Windows Update',   action: ()=>showNotification('Windows Update','Checking for updates...\n\n473 updates available.\nEstimated time: 6 hours.\nDo not turn off your computer.') },
    ],
    'Help': [
      { icon:'❓', label:'Help Topics',         action: ()=>window.openHelpWindow() },
      { icon:'🔍', label:'Is this thing on?',   action: ()=>showNotification('Technical Support','Yes, it\'s on.\nHave you tried turning it off and on again?') },
      { sep: true },
      { icon:'😎', label:'About This Portfolio', action: ()=>window.openAboutDialog() },
      { icon:'🕵️', label:'Secret Cheat Codes',  action: ()=>window.openCheats() },
    ],
    'Format': [
      { icon:'🔤', label:'Font...',   action: ()=>showNotification('Font','Times New Roman, 12pt.\nJust like your school essays.') },
      { icon:'↔️', label:'Word Wrap', action: ()=>window.toggleWordWrap(winId) },
    ],
    'Action': [
      { icon:'🔄', label:'Scan for hardware changes', action: ()=>showNotification('Device Manager','Scanning...\n\n✅ All skills up to date!\n⚠️ TypeScript — needs update.') },
      { icon:'📤', label:'Export skills as PDF',      action: ()=>showNotification('Export','Generating PDF...\nOpening LinkedIn instead.') },
      { icon:'➕', label:'Add new skill',             action: ()=>showNotification('Add Skill','Learning in progress...\nCheck back later!') },
    ],
    'Insert': [
      { icon:'📎', label:'Attachment', action: ()=>showNotification('Attachment','Attaching CV...\nConsider me attached 📎') },
      { icon:'😀', label:'Insert Emoji', action: ()=>showNotification('Emoji','😎🚀💻🎉 — inserted!') },
      { icon:'📸', label:'Signature',  action: ()=>showNotification('Signature','— Maksim Manojlovic\nmr.maksim.manojlovic@gmail.com\nBelgrade, Serbia') },
    ],
    'Game': [
      { icon:'🆕', label:'New Game', action: ()=>{ if (window._ms) window._ms.initBoard(); } },
      { sep: true },
      { icon:'😎', label:'Beginner',     disabled: true },
      { icon:'🧠', label:'Intermediate', disabled: true },
      { icon:'💀', label:'Expert',       disabled: true },
    ],
  };
  return menus[label] || [
    { icon:'🤷', label:`${label} menu`, disabled: true },
    { sep: true },
    { icon:'😬', label:'Nothing useful here', disabled: true },
    { icon:'☕', label:'Make coffee instead', action: ()=>showNotification('Coffee','☕ Brewing...') },
  ];
}

export function buildMenuHTML(label, winId) {
  const items = getMenuItems(label, winId);
  const itemsHTML = items.map((item, idx) => {
    if (item.sep) return `<div class="menu-dropdown-sep"></div>`;
    return `<div class="menu-dropdown-item${item.disabled?' disabled':''}"
      onclick="${item.disabled ? '' : `menuAction(event,'${winId}',${idx},'${label}')`}">
      <span class="item-icon">${item.icon||''}</span>
      ${item.label}
      ${item.shortcut ? `<span class="item-shortcut">${item.shortcut}</span>` : ''}
    </div>`;
  }).join('');
  return `<div class="menu-item" onclick="toggleMenu(event, this)" data-win="${winId}" data-label="${label}">
    ${label}
    <div class="menu-dropdown">${itemsHTML}</div>
  </div>`;
}

export function toggleMenu(e, el) {
  e.stopPropagation();
  const isOpen = el.classList.contains('open');
  document.querySelectorAll('.menu-item.open').forEach(m => m.classList.remove('open'));
  if (!isOpen) el.classList.add('open');
}

export function menuAction(e, winId, idx, label) {
  e.stopPropagation();
  document.querySelectorAll('.menu-item.open').forEach(m => m.classList.remove('open'));
  const items = getMenuItems(label, winId);
  const item = items[idx];
  if (item && item.action) item.action();
}

export function initMenuCloseOnClick() {
  document.addEventListener('click', () => {
    document.querySelectorAll('.menu-item.open').forEach(m => m.classList.remove('open'));
  });
}
