import keysObj from './layouts.js';

const layout = localStorage.getItem('layout') || 'en';
const isShiftOn = false;
const isCapsOn = false;

function getKeysArr() { //= =============================GETTING DIVS
  const keyElementsArr = [];
  const valuesArr = [];
  // CREATE KEY DIVS ARR
  for (const key in keysObj) {
    const keyElement = document.createElement('div');
    keyElement.classList.add('key', key);
    keyElementsArr.push(keyElement);
  }
  // CREATE DIVS TEXT CONTENT ARR
  layout === 'en'
    ? Object.entries(keysObj).forEach((key) => {
      valuesArr.push(key[1].en.low);
    })
    : Object.entries(keysObj).forEach((key) => {
      valuesArr.push(key[1].ru.low);
    });
  // CREATE DIVS WITH TEXT CONTENT ARR
  for (let i = 0; i < keyElementsArr.length; i++) {
    keyElementsArr[i].textContent = valuesArr[i];
  }
  return keyElementsArr;
}
const keysArr = getKeysArr();

function init() {
  const wrapper = document.createElement('div'); //=================PAGE CONTAINER
  wrapper.classList.add('wrapper');

  const title = document.createElement('h1');  //====================title
  title.textContent = 'Virtual Keyboard for Windows OS';
  title.classList.add('title');

  const layoutInfo = document.createElement('p'); //=============Current layout info
  layoutInfo.classList.add('info');
  let currentLayout = layout;
  currentLayout === 'en'?
  layoutInfo.textContent = `Current layout: ${layout}. Press Left Shift + Left Alt keys to change layout.` :
  layoutInfo.textContent = `Текущая раскладка: ${layout}. Нажмите левые Shift + Alt чтобы сменить раскладку.`;
  
  const textarea = document.createElement('textarea'); //=========textarea
  textarea.classList.add('textarea');

  const keyLineArr = [];   //=====================key lines
  for (let i = 0; i < 5; i++) {
    const keyLine = document.createElement('div');
    keyLineArr.push(keyLine);
  };
    keyLineArr.forEach(line => line.classList.add('key-line'));
  
  const keyboard = document.createElement('div'); //===============keyboard
  keyboard.classList.add('keyboard');

  for (let i = 0; i < keysArr.length; i++) {  //===============putting keys into lines
    if (i <= 13) keyLineArr[0].append(keysArr[i]);
    if (i >= 14 && i <= 28) keyLineArr[1].append(keysArr[i]);
    if (i >= 29 && i <= 41) keyLineArr[2].append(keysArr[i]);
    if (i >= 42 && i <= 54) keyLineArr[3].append(keysArr[i]);
    if (i >= 55) keyLineArr[4].append(keysArr[i]);
  };
  
  keyboard.append(...keyLineArr);  //==========putting lines to keyboard
  wrapper.append(title, layoutInfo, textarea, keyboard); //====putting content to wrapper
  document.body.prepend(wrapper); //=====putting wraper to body before script tag
};

window.addEventListener('DOMContentLoaded', init);
window.addEventListener('beforeunload', () => localStorage.setItem('layout', layout));
