// ===== NOTES WINDOW =====
import { state } from '../state.js';
import { NOTES } from '../data/notes.js';

function buildNotes(body) {
  body.innerHTML = `<div class="notepad-area" contenteditable="true">${NOTES}</div>`;
}

export function registerNotes() {
  state.windowDefs.notes = {
    title: 'notes.txt — Notepad', icon: '📝', w: 480, h: 400,
    menuBar: ['File', 'Edit', 'Format', 'View', 'Tools', 'Help'],
    toolbar: false, statusBar: false,
    content: buildNotes
  };
}
