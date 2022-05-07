import createKeyboard from "./create-keyboard.js";

let layout = localStorage.getItem('layout') || 'en';
let isShiftOn = false;
let isCapsOn = false;
const keysArr = createKeyboard(layout);








window.addEventListener('DOMContentLoaded', init);
window.addEventListener('beforeunload', () => localStorage.setItem('layout', layout));
