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
];

export const XP_ICONS = {
  'about': `<img src="public/assets/icons/121.ico" width="40" height="40" style="image-rendering:pixelated;" />`,

  'projects': `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
    <!-- Folder back -->
    <rect x="2" y="12" width="36" height="24" rx="2" fill="#f0c040"/>
    <!-- Folder tab -->
    <path d="M2,14 L2,12 Q2,10 4,10 L16,10 Q18,10 20,12 L22,14 Z" fill="#f0c040"/>
    <!-- Folder front shade -->
    <rect x="2" y="14" width="36" height="22" rx="0" fill="#f8d060"/>
    <!-- Folder highlight top -->
    <rect x="2" y="14" width="36" height="3" rx="0" fill="#fce88a" opacity="0.6"/>
    <!-- Shadow bottom -->
    <rect x="2" y="33" width="36" height="3" rx="0 0 2 2" fill="#d4a820" opacity="0.5"/>
    <!-- Files inside hint -->
    <rect x="10" y="20" width="20" height="2" rx="1" fill="rgba(255,255,255,0.7)"/>
    <rect x="10" y="24" width="15" height="2" rx="1" fill="rgba(255,255,255,0.5)"/>
    <rect x="10" y="28" width="17" height="2" rx="1" fill="rgba(255,255,255,0.4)"/>
  </svg>`,

  'skills': `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
    <!-- Outer gear ring -->
    <circle cx="20" cy="20" r="15" fill="#c8c4b8" stroke="#888" stroke-width="1"/>
    <!-- Gear teeth (8 teeth) -->
    <rect x="18" y="2" width="4" height="6" rx="1" fill="#b0aca0"/>
    <rect x="18" y="32" width="4" height="6" rx="1" fill="#b0aca0"/>
    <rect x="2" y="18" width="6" height="4" rx="1" fill="#b0aca0"/>
    <rect x="32" y="18" width="6" height="4" rx="1" fill="#b0aca0"/>
    <rect x="6" y="7" width="4" height="6" rx="1" transform="rotate(-45 8 10)" fill="#b0aca0"/>
    <rect x="28" y="5" width="4" height="6" rx="1" transform="rotate(45 30 8)" fill="#b0aca0"/>
    <rect x="5" y="27" width="4" height="6" rx="1" transform="rotate(45 7 30)" fill="#b0aca0"/>
    <rect x="28" y="27" width="4" height="6" rx="1" transform="rotate(-45 30 30)" fill="#b0aca0"/>
    <!-- Inner circle -->
    <circle cx="20" cy="20" r="9" fill="#ece9d8"/>
    <circle cx="20" cy="20" r="5" fill="#888"/>
    <circle cx="20" cy="20" r="3" fill="#d4d0c8"/>
  </svg>`,

  'contact': `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
    <!-- Envelope body -->
    <rect x="3" y="9" width="34" height="24" rx="2" fill="#dde8f8" stroke="#7f9db9" stroke-width="1"/>
    <!-- Envelope flap -->
    <path d="M3,9 L20,23 L37,9 Z" fill="#c8d8f0" stroke="#7f9db9" stroke-width="1"/>
    <!-- Envelope sides -->
    <line x1="3" y1="33" x2="14" y2="22" stroke="#7f9db9" stroke-width="1"/>
    <line x1="37" y1="33" x2="26" y2="22" stroke="#7f9db9" stroke-width="1"/>
    <!-- Outlook Express blue stripe -->
    <rect x="3" y="9" width="34" height="5" rx="2 2 0 0" fill="#1460d4" opacity="0.9"/>
    <!-- @ symbol -->
    <text x="20" y="30" text-anchor="middle" font-size="10" fill="#0a246a" font-weight="bold">@</text>
  </svg>`,

  'notes': `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
    <!-- Notepad body -->
    <rect x="6" y="4" width="28" height="34" rx="1" fill="#fff" stroke="#888" stroke-width="1"/>
    <!-- Top binding -->
    <rect x="6" y="4" width="28" height="6" fill="#fffacd" stroke="#888" stroke-width="1"/>
    <!-- Spiral holes -->
    <circle cx="12" cy="7" r="1.5" fill="#888"/>
    <circle cx="20" cy="7" r="1.5" fill="#888"/>
    <circle cx="28" cy="7" r="1.5" fill="#888"/>
    <!-- Text lines -->
    <rect x="10" y="14" width="20" height="2" rx="1" fill="#c8d4e8"/>
    <rect x="10" y="18" width="16" height="2" rx="1" fill="#c8d4e8"/>
    <rect x="10" y="22" width="18" height="2" rx="1" fill="#c8d4e8"/>
    <rect x="10" y="26" width="12" height="2" rx="1" fill="#c8d4e8"/>
    <rect x="10" y="30" width="15" height="2" rx="1" fill="#c8d4e8"/>
    <!-- Pencil -->
    <rect x="28" y="20" width="4" height="14" rx="1" transform="rotate(-30 30 27)" fill="#f8d060"/>
    <polygon points="28,32 32,32 30,36" fill="#ffaa55" transform="rotate(-30 30 27)"/>
    <rect x="28" y="20" width="4" height="3" rx="0" transform="rotate(-30 30 27)" fill="#e87070"/>
  </svg>`,

  'cv-download': `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
    <!-- Document -->
    <rect x="6" y="2" width="22" height="28" rx="1" fill="#fff" stroke="#7f9db9" stroke-width="1"/>
    <!-- Folded corner -->
    <path d="M22,2 L28,8 L22,8 Z" fill="#c8d8f0"/>
    <path d="M22,2 L28,8 L22,8 Z" fill="none" stroke="#7f9db9" stroke-width="1"/>
    <!-- Lines -->
    <rect x="9" y="12" width="14" height="2" rx="1" fill="#c8d4e8"/>
    <rect x="9" y="16" width="10" height="2" rx="1" fill="#c8d4e8"/>
    <rect x="9" y="20" width="12" height="2" rx="1" fill="#c8d4e8"/>
    <rect x="9" y="24" width="8" height="2" rx="1" fill="#c8d4e8"/>
    <!-- Red CV badge -->
    <rect x="18" y="22" width="18" height="14" rx="2" fill="#c00"/>
    <text x="27" y="32" text-anchor="middle" font-size="8" fill="#fff" font-weight="bold">CV</text>
    <!-- Down arrow -->
    <polygon points="27,25 23,29 31,29" fill="#fff"/>
    <rect x="26" y="28" width="2" height="4" fill="#fff"/>
  </svg>`,

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

  'recycle': `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
    <!-- Bin body -->
    <path d="M10,16 L12,36 L28,36 L30,16 Z" fill="#c8d4e8" stroke="#7f9db9" stroke-width="1"/>
    <!-- Bin lid -->
    <rect x="7" y="12" width="26" height="4" rx="1" fill="#a8b8d8" stroke="#7f9db9" stroke-width="1"/>
    <!-- Handle -->
    <rect x="16" y="9" width="8" height="4" rx="2" fill="#a8b8d8" stroke="#7f9db9" stroke-width="1"/>
    <!-- Lines on bin -->
    <line x1="15" y1="20" x2="14" y2="33" stroke="#7f9db9" stroke-width="1"/>
    <line x1="20" y1="20" x2="20" y2="33" stroke="#7f9db9" stroke-width="1"/>
    <line x1="25" y1="20" x2="26" y2="33" stroke="#7f9db9" stroke-width="1"/>
    <!-- Recycle arrow hint -->
    <text x="20" y="30" text-anchor="middle" font-size="9" fill="#3b6bc9">♻</text>
  </svg>`,

  'stats': `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
    <!-- Chart background -->
    <rect x="3" y="3" width="34" height="34" rx="2" fill="#fff" stroke="#7f9db9" stroke-width="1"/>
    <!-- Grid lines -->
    <line x1="8" y1="30" x2="36" y2="30" stroke="#d4d0c8" stroke-width="0.5"/>
    <line x1="8" y1="23" x2="36" y2="23" stroke="#d4d0c8" stroke-width="0.5"/>
    <line x1="8" y1="16" x2="36" y2="16" stroke="#d4d0c8" stroke-width="0.5"/>
    <!-- Bars -->
    <rect x="10" y="18" width="5" height="12" fill="#1460d4"/>
    <rect x="17" y="12" width="5" height="18" fill="#1460d4"/>
    <rect x="24" y="20" width="5" height="10" fill="#1460d4"/>
    <rect x="31" y="8"  width="5" height="22" fill="#f0c040"/>
    <!-- X axis -->
    <line x1="8" y1="30" x2="8" y2="7" stroke="#888" stroke-width="1"/>
    <line x1="8" y1="30" x2="37" y2="30" stroke="#888" stroke-width="1"/>
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
