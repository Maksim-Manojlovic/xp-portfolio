# Maksim Manojlovic — Windows XP Portfolio

A fully interactive portfolio built to look and feel like **Windows XP** — complete with a boot screen, draggable windows, a Start menu, taskbar, context menu, easter eggs, and two playable games. No frameworks. No bundler. Pure vanilla JavaScript.

> **Live:** [optamaze.me](https://optamaze.me)

---

## Features

### OS Experience
- **Boot sequence** → Welcome screen → Desktop (full animated flow)
- **Draggable, resizable windows** with minimize, maximize, close, and taskbar integration
- **Start menu** with pinned apps and quick links
- **Right-click context menu** on the desktop (arrange icons, change wallpaper, open apps)
- **System tray** with live clock and tooltip
- **Wallpaper picker** with multiple options
- **XP-style notifications** (pop-up toasts from the tray)
- **Mobile splash screen** — graceful fallback for small screens

### Windows (Apps)
| Window | XP Equivalent | Content |
|---|---|---|
| About Me | System Properties | Bio, education, core stack, links |
| My Projects | Windows Explorer | 3-level folder drill-down: categories → projects → detail |
| Skills & Tools | Device Manager | Tabbed skill breakdown |
| Contact | Outlook Express | Working contact form (Formspree) |
| Notes | Notepad | Personal notes / dev log |
| CV Download | File Download Dialog | Resume download |
| My Stats | Performance Monitor | Animated counters + tech bar chart |
| Recycle Bin | Recycle Bin | Easter egg — contains a playable game |

### Games & Easter Eggs
- **Destruction Mode** — cursor weapon game, destroy the desktop (chainsaw, dynamite, and more)
- **Minesweeper** — fully functional classic implementation
- **XP Error popups** — scheduled fake BSOD/error dialogs
- **Easter egg hint** on the welcome screen (find it yourself)

### Contact Form
- Sends directly via [Formspree](https://formspree.io) — no mail client required
- Loading state, success confirmation, and field-level error messages
- Validates email and message before sending

---

## Tech Stack

| Layer | What's used |
|---|---|
| Structure | HTML5 (single `index.html`) |
| Styles | Vanilla CSS (14 files, component-split) |
| Logic | Vanilla JavaScript — ES Modules |
| Contact | Formspree (AJAX / fetch) |
| Bundler | None |
| Framework | None |

---

## Project Structure

```
├── index.html               # Entry point — all markup lives here
│
├── css/
│   ├── tokens.css           # CSS variables (colors, spacing, XP palette)
│   ├── animations.css       # Keyframe animations
│   ├── boot.css             # Boot screen
│   ├── welcome.css          # Welcome / login screen
│   ├── desktop.css          # Desktop icons, layout
│   ├── window.css           # Window chrome (title bar, buttons, resize)
│   ├── taskbar.css          # Taskbar + system tray
│   ├── start-menu.css       # Start menu
│   ├── context-menu.css     # Right-click menu
│   ├── content.css          # All window content styles
│   ├── game.css             # Destruction game HUD/overlay
│   ├── notification.css     # Toast notifications
│   ├── scrollbars.css       # XP-style custom scrollbars
│   └── mobile.css           # Mobile splash screen
│
├── js/
│   ├── main.js              # Entry point — imports, registers, exposes to window
│   ├── state.js             # Shared app state object
│   │
│   ├── modules/             # Core OS systems
│   │   ├── windowManager.js # Open, close, minimize, maximize, focus, taskbar
│   │   ├── boot.js          # Boot → welcome → desktop sequence
│   │   ├── desktop.js       # Icon rendering, click/select logic
│   │   ├── drag.js          # Window drag + icon drag handlers
│   │   ├── startMenu.js     # Start menu toggle
│   │   ├── contextMenu.js   # Right-click menu
│   │   ├── taskbar.js       # Taskbar window buttons
│   │   ├── toolbar.js       # Explorer-style toolbar (back, up, address bar)
│   │   ├── menu.js          # Window menu bar (File, Edit, View…)
│   │   ├── clock.js         # Live system clock
│   │   ├── audio.js         # Sound effects
│   │   ├── wallpaper.js     # Wallpaper picker + apply
│   │   ├── notification.js  # Toast notification system
│   │   └── dialogs.js       # Turn Off, About, Help, Cheats dialogs
│   │
│   ├── windows/             # Individual window content
│   │   ├── about.js
│   │   ├── projects.js      # 3-level explorer: categories → list → detail
│   │   ├── skills.js
│   │   ├── contact.js       # Outlook Express UI + Formspree fetch
│   │   ├── notes.js
│   │   ├── cvDownload.js
│   │   ├── stats.js         # Animated counters + bar chart
│   │   └── recycle.js       # Easter egg gateway
│   │
│   ├── games/
│   │   ├── destructionGame.js
│   │   ├── minesweeper.js
│   │   └── xpErrors.js      # Fake XP error dialog scheduler
│   │
│   └── data/                # Static content as JS modules
│       ├── projects.js      # All project entries + categories
│       ├── icons.js         # Desktop icon definitions
│       ├── notes.js         # Notepad content
│       ├── wallpapers.js    # Wallpaper list
│       └── xpErrors.js      # Error dialog message pool
│
└── public/
    └── assets/
        ├── images/
        └── icons/
```

---

## Running Locally

No install, no build step.

```bash
git clone https://github.com/Maksim-Manojlovic/xp-portfolio.git
cd xp-portfolio
```

Then open `index.html` in your browser. Because the project uses ES Modules (`type="module"`), you need a local server — not a direct file open:

```bash
# Python
python -m http.server 8080

# Node (npx)
npx serve .

# VS Code
# Install the "Live Server" extension and click "Go Live"
```

---

## Contact Form Setup (for forks)

The contact form posts to [Formspree](https://formspree.io). If you fork this project:

1. Create a free Formspree account and a new form
2. Copy your form ID
3. In `js/windows/contact.js`, replace the ID on line 4:

```js
const FORMSPREE_ID = 'your_form_id_here';
```

---

## License

MIT — feel free to use this as inspiration. Credit appreciated but not required.
