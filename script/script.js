import keysObj from './layouts.js';

let layout = localStorage.getItem('layout') || 'en';
let isShiftOn = false;
let isCapsOn = false;

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

function init() { //====================================== INIT ON LOADING PAGE 
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
    keysArr[i].addEventListener('mousedown', clickHandler);
    keysArr[i].addEventListener('mouseup', clickHandler);
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

function clickHandler (event) {   //=======================Click events
  const textarea = document.querySelector('.textarea');
  textarea.focus();
  let cursorPosition = textarea.selectionStart;

//===== ckick on shift
  if (event.type === 'mousedown' && (event.currentTarget.classList.contains('ShiftLeft') || event.currentTarget.classList.contains('ShiftRight'))) {
    isShiftOn = true;
    console.log(isShiftOn);
  };
  if (event.type === 'mouseup' && (event.currentTarget.classList.contains('ShiftLeft') || event.currentTarget.classList.contains('ShiftRight'))) {
    isShiftOn = false;
    console.log(isShiftOn);
  }
//======== click on caps
  if (event.type !== 'mouseup' && event.currentTarget.classList.contains('CapsLock')) {
    isCapsOn = !isCapsOn;
    event.currentTarget.classList.toggle('active');
    console.log(`caps ${isCapsOn}`);
  };
  //======= click on fn keys
  if (event.type === 'mousedown' && event.currentTarget.classList.contains('Tab')) textarea.value += '\t';
  if (event.type === 'mousedown' && event.currentTarget.classList.contains('Backspace')) {
    if (textarea.selectionStart === textarea.selectionEnd) {
      textarea.value = textarea.value.slice(0, cursorPosition - 1) + textarea.value.slice(cursorPosition, textarea.value.length);
      textarea.selectionStart = cursorPosition - 1;
      textarea.selectionEnd = cursorPosition - 1;
    };
    if (textarea.selectionStart !== textarea.selectionEnd) {
      textarea.value = textarea.value.slice(0, textarea.selectionStart) + textarea.value.slice(textarea.selectionEnd, textarea.value.length);
      textarea.selectionStart = cursorPosition;
      textarea.selectionEnd = cursorPosition;
    };
  };
  if (event.type === 'mousedown' && event.currentTarget.classList.contains('Enter')) textarea.value += '\n';
  if (event.type === 'mousedown' && event.currentTarget.classList.contains('Delete')) {
    textarea.selectionStart === textarea.selectionEnd ? 
    textarea.value = textarea.value.slice(0, cursorPosition) + textarea.value.slice(cursorPosition + 1, textarea.value.length) :
    textarea.value = textarea.value.slice(0, textarea.selectionStart) + textarea.value.slice(textarea.selectionEnd, textarea.value.length);
    textarea.selectionStart = cursorPosition;
    textarea.selectionEnd = cursorPosition;
  };
    //=========Click on arrows
    if (event.type === 'mousedown' && event.currentTarget.classList.contains('ArrowLeft') && cursorPosition > 0) {
      textarea.selectionStart = cursorPosition - 1;
      textarea.selectionEnd = cursorPosition - 1;
    };
    if (event.type === 'mousedown' && event.currentTarget.classList.contains('ArrowRight') && cursorPosition < textarea.value.length) {
      textarea.selectionStart = cursorPosition + 1;
      textarea.selectionEnd = cursorPosition + 1;
    };
    if (event.type === 'mousedown' && event.currentTarget.classList.contains('ArrowUp') && cursorPosition >= 90) {
      textarea.selectionStart = cursorPosition - 90;
      textarea.selectionEnd = cursorPosition - 90;
    };
    if (event.type === 'mousedown' && event.currentTarget.classList.contains('ArrowDown') && cursorPosition <= textarea.value.length - 90) {
      textarea.selectionStart = cursorPosition + 90;
      textarea.selectionEnd = cursorPosition + 90;
    };
//========click on keys (typing)
  if (event.type === 'mousedown'
    && !event.currentTarget.classList.contains('Tab')
    && !event.currentTarget.classList.contains('Backspace')
    && !event.currentTarget.classList.contains('Delete')
    && !event.currentTarget.classList.contains('CapsLock')
    && !event.currentTarget.classList.contains('Enter')
    && !event.currentTarget.classList.contains('ShiftLeft')
    && !event.currentTarget.classList.contains('ShiftRight')
    && !event.currentTarget.classList.contains('ControlLeft')
    && !event.currentTarget.classList.contains('MetaLeft')
    && !event.currentTarget.classList.contains('AltLeft')
    && !event.currentTarget.classList.contains('AltRight')
    && !event.currentTarget.classList.contains('ArrowLeft')
    && !event.currentTarget.classList.contains('ArrowRight')
    && !event.currentTarget.classList.contains('ArrowUp')
    && !event.currentTarget.classList.contains('ArrowDown')
    && !event.currentTarget.classList.contains('ControlRight')) {
    const text = event.currentTarget.textContent;
    textarea.setRangeText(text, cursorPosition, cursorPosition, 'end');
  };

  
};


window.addEventListener('DOMContentLoaded', init);
window.addEventListener('beforeunload', () => localStorage.setItem('layout', layout));
