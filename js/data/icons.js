// ===== DESKTOP ICON DEFINITIONS =====

export const iconDefs = [
  { id: 'about',       label: 'About Me',     x: 14,  y: 14  },
  { id: 'projects',    label: 'My Projects',  x: 100, y: 14  },
  { id: 'skills',      label: 'Skills',       x: 14,  y: 110 },
  { id: 'contact',     label: 'Contact',      x: 100, y: 110 },
  { id: 'notes',       label: 'Notes',        x: 14,  y: 206 },
  { id: 'cv-download', label: 'My CV',        x: 100, y: 206 },
  { id: 'github',      label: 'GitHub',       x: 14,  y: 302 },
  { id: 'linkedin',    label: 'LinkedIn',     x: 100, y: 302 },
  { id: 'recycle',     label: 'Recycle Bin',  x: 14,  y: 398 },
  { id: 'game',        label: 'Destroy.exe',  x: 100, y: 398, customIcon: true },
  { id: 'stats',       label: 'My Stats',     x: 14,  y: 494 },
  { id: 'paint',       label: 'Paint',        x: 100, y: 494 },
];

export const XP_ICONS = {
  'about': `<img src="public/assets/icons/121.ico" width="40" height="40" style="image-rendering:pixelated;" />`,

  'projects': `<img src="public/assets/icons/my_documents.ico" width="40" height="40" style="image-rendering:pixelated;" />`,

  'skills': `<img src="public/assets/icons/Skills.ico" width="40" height="40" style="image-rendering:pixelated;" />`,

  'contact': `<img src="public/assets/icons/contact.ico" width="40" height="40" style="image-rendering:pixelated;" />`,

  'notes': `<img src="public/assets/icons/notes.ico" width="40" height="40" style="image-rendering:pixelated;" />`,

  'cv-download': `<img src="public/assets/icons/cv.ico" width="40" height="40" style="image-rendering:pixelated;" />`,

  'github': `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
    <!-- GitHub Octocat simplified -->
    <circle cx="20" cy="18" r="13" fill="#1a1a1a"/>
    <!-- Face -->
    <circle cx="20" cy="17" r="8" fill="#f0e6d3"/>
    <!-- Eyes -->
    <circle cx="17" cy="15" r="1.5" fill="#1a1a1a"/>
    <circle cx="23" cy="15" r="1.5" fill="#1a1a1a"/>
    <!-- Ears / cat -->
    <polygon points="14,10 12,6 17,9" fill="#f0e6d3"/>
    <polygon points="26,10 28,6 23,9" fill="#f0e6d3"/>
    <!-- Tentacles (octocat) -->
    <path d="M12,22 Q8,26 10,30" stroke="#1a1a1a" stroke-width="2" fill="none"/>
    <path d="M28,22 Q32,26 30,30" stroke="#1a1a1a" stroke-width="2" fill="none"/>
    <path d="M16,24 Q15,30 17,34" stroke="#1a1a1a" stroke-width="2" fill="none"/>
    <path d="M24,24 Q25,30 23,34" stroke="#1a1a1a" stroke-width="2" fill="none"/>
  </svg>`,

  'linkedin': `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
    <!-- LinkedIn blue background -->
    <rect x="2" y="2" width="36" height="36" rx="4" fill="#0077b5"/>
    <!-- 'in' text -->
    <rect x="8" y="12" width="5" height="16" rx="1" fill="#fff"/>
    <circle cx="10.5" cy="10" r="3" fill="#fff"/>
    <!-- Right bar -->
    <rect x="17" y="17" width="5" height="11" rx="1" fill="#fff"/>
    <!-- Right curve top -->
    <path d="M17,20 Q17,14 22,14 Q27,14 27,20 L27,28 L22,28 L22,20 Q22,18 20,18 Q17,18 17,20" fill="#fff"/>
  </svg>`,

  'recycle': `<img src="public/assets/icons/recyle_bin.ico" width="40" height="40" style="image-rendering:pixelated;" />`,

  'stats': `<img src="public/assets/icons/Stats.ico" width="40" height="40" style="image-rendering:pixelated;" />`,

  'paint': `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
    <!-- Palette -->
    <ellipse cx="20" cy="22" rx="16" ry="14" fill="#f0e8d0" stroke="#888" stroke-width="1"/>
    <circle cx="20" cy="22" r="5" fill="#c8c0a8" stroke="#888" stroke-width="1"/>
    <!-- Color dots -->
    <circle cx="10" cy="16" r="3" fill="#ff0000"/>
    <circle cx="15" cy="11" r="3" fill="#ffaa00"/>
    <circle cx="22" cy="9"  r="3" fill="#ffff00"/>
    <circle cx="29" cy="12" r="3" fill="#00bb00"/>
    <circle cx="32" cy="19" r="3" fill="#0000ff"/>
    <!-- Brush -->
    <rect x="28" y="2" width="5" height="14" rx="2" transform="rotate(35 30 9)" fill="#c08040" stroke="#888" stroke-width="0.8"/>
    <path d="M24,8 Q30,6 33,12 Q28,14 24,8Z" fill="#6040c0" stroke="#555" stroke-width="0.8"/>
  </svg>`,

  'game': `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
    <!-- Controller body -->
    <path d="M6,14 Q4,12 6,10 L14,10 Q16,8 20,8 Q24,8 26,10 L34,10 Q36,12 34,14 L30,30 Q28,34 24,34 Q22,34 20,32 Q18,34 16,34 Q12,34 10,30 Z" fill="#c8c4b8" stroke="#888" stroke-width="1"/>
    <!-- D-pad -->
    <rect x="10" y="17" width="8" height="3" rx="1" fill="#888"/>
    <rect x="12.5" y="14.5" width="3" height="8" rx="1" fill="#888"/>
    <!-- Buttons -->
    <circle cx="26" cy="16" r="2" fill="#c00"/>
    <circle cx="30" cy="19" r="2" fill="#0a0"/>
    <circle cx="26" cy="22" r="2" fill="#00a"/>
    <circle cx="22" cy="19" r="2" fill="#aa0"/>
    <!-- Start/Select -->
    <rect x="17" y="21" width="3" height="2" rx="1" fill="#888"/>
    <rect x="20" y="21" width="3" height="2" rx="1" fill="#888"/>
  </svg>`,
};
