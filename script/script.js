import keysObj from './layouts.js';

let layout = localStorage.getItem('layout') || 'en';
let isShiftOn = false;
let isCapsOn = false;

//get key values arrays

function getValuesLowArr () {
  const valuesLowArr = [];
layout === 'en'
    ? Object.entries(keysObj).forEach((key) => {
      valuesLowArr.push(key[1].en.low);
    })
    : Object.entries(keysObj).forEach((key) => {
      valuesLowArr.push(key[1].ru.low);
    });
    return valuesLowArr;
};
function getValuesHighArr () {
  const valuesHighArr = [];
layout === 'en'
    ? Object.entries(keysObj).forEach((key) => {
      valuesHighArr.push(key[1].en.high);
    })
    : Object.entries(keysObj).forEach((key) => {
      valuesHighArr.push(key[1].ru.high);
    });
    return valuesHighArr;
};
function getValuesCapsArr () {
  const valuesCapsArr = [];
layout === 'en'
    ? Object.entries(keysObj).forEach((key) => {
      valuesCapsArr.push(key[1].en.capsOn);
    })
    : Object.entries(keysObj).forEach((key) => {
      valuesCapsArr.push(key[1].ru.capsOn);
    });
    return valuesCapsArr;
};
function getValuesCapsShiftArr () {
  const valuesCapsShiftArr = [];
layout === 'en'
    ? Object.entries(keysObj).forEach((key) => {
      valuesCapsShiftArr.push(key[1].en.capsOnShift);
    })
    : Object.entries(keysObj).forEach((key) => {
      valuesCapsShiftArr.push(key[1].ru.capsOnShift);
    });
    return valuesCapsShiftArr;
};

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
  };
  return keyElementsArr;
};
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
  let cursorPosition = textarea.selectionStart;
  textarea.focus();

//===== ckick on shift
  if (event.type === 'mousedown' && (event.currentTarget.classList.contains('ShiftLeft') || event.currentTarget.classList.contains('ShiftRight'))) {
    isShiftOn = true;
    const valuesShiftArr = getValuesHighArr();
    for (let i = 0; i < keysArr.length; i++) {
      keysArr[i].textContent = valuesShiftArr[i];
    };
  };
  if (event.type === 'mouseup' && (event.currentTarget.classList.contains('ShiftLeft') || event.currentTarget.classList.contains('ShiftRight'))) {
    isShiftOn = false;
    const valuesLowArr = getValuesLowArr();
    for (let i = 0; i < keysArr.length; i++) {
      keysArr[i].textContent = valuesLowArr[i];
    };
  };
//======== click on caps
  if (event.type !== 'mouseup' && event.currentTarget.classList.contains('CapsLock')) {
    isCapsOn = !isCapsOn;
    event.currentTarget.classList.toggle('active');
    if (isCapsOn === true) {   
      const valuesCapsArr = getValuesCapsArr();
      for (let i = 0; i < keysArr.length; i++) {
        keysArr[i].textContent = valuesCapsArr[i];
      };
    } else {
      const valuesLowArr = getValuesLowArr();
      for (let i = 0; i < keysArr.length; i++) {
        keysArr[i].textContent = valuesLowArr[i];
      };
    };
  };
//======== click shift when caps is on
if (event.type === 'mousedown' && isCapsOn && (event.currentTarget.classList.contains('ShiftLeft') || event.currentTarget.classList.contains('ShiftRight'))) {
  isShiftOn = true;
  const valuesCapsShiftArr = getValuesCapsShiftArr();
  for (let i = 0; i < keysArr.length; i++) {
    keysArr[i].textContent = valuesCapsShiftArr[i];
  };
};
if (event.type === 'mouseup' && isCapsOn && (event.currentTarget.classList.contains('ShiftLeft') || event.currentTarget.classList.contains('ShiftRight'))) {
  isShiftOn = false;
  const valuesCapsArr = getValuesCapsArr();
  for (let i = 0; i < keysArr.length; i++) {
    keysArr[i].textContent = valuesCapsArr[i];
  };
};

  //======= click on fn keys
  if (event.type === 'mousedown' && event.currentTarget.classList.contains('Tab')) {
    textarea.value += '\t';
  };
  if (event.type === 'mousedown' && event.currentTarget.classList.contains('Backspace')) {
    if (textarea.selectionStart === textarea.selectionEnd && cursorPosition > 0) {
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
  if (event.type === 'mousedown' && event.currentTarget.classList.contains('Enter')) {
    textarea.value += '\n';
  };
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
    if (event.type === 'mousedown' && event.currentTarget.classList.contains('ArrowUp') && cursorPosition < 90) {
      cursorPosition = 0;
      textarea.selectionStart = cursorPosition;
      textarea.selectionEnd = cursorPosition;
    };
    if (event.type === 'mousedown' && event.currentTarget.classList.contains('ArrowDown') && cursorPosition <= textarea.value.length - 90) {
      textarea.selectionStart = cursorPosition + 90;
      textarea.selectionEnd = cursorPosition + 90;
    };
    if (event.type === 'mousedown' && event.currentTarget.classList.contains('ArrowDown') && cursorPosition > textarea.value.length - 90) {
      cursorPosition = textarea.length - 1;
      textarea.selectionStart = cursorPosition;
      textarea.selectionEnd = cursorPosition;
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

// ===================PRESS EVENTS
const pressHandler = (event) => {
  event.preventDefault();
  const textarea = document.querySelector('.textarea');
  let cursorPosition = textarea.selectionStart;
  textarea.focus();
  
  //===== press shift
  if (event.type === 'keydown' && (event.code === 'ShiftLeft' || event.code === 'ShiftRight')) {
    isShiftOn = true;
    const valuesShiftArr = getValuesHighArr();
    for (let i = 0; i < keysArr.length; i++) {
      keysArr[i].textContent = valuesShiftArr[i];
    };
  };
  if (event.type === 'keyup' && (event.code === 'ShiftLeft' || event.code === 'ShiftRight')) {
    isShiftOn = false;
    const valuesLowArr = getValuesLowArr();
    for (let i = 0; i < keysArr.length; i++) {
      keysArr[i].textContent = valuesLowArr[i];
    };
  };
//======== press caps
  if (event.type !== 'keyup' && event.code === 'CapsLock') {
    isCapsOn = !isCapsOn;
    document.querySelector('.CapsLock').classList.toggle('active');
    if (isCapsOn === true) {   
      const valuesCapsArr = getValuesCapsArr();
      for (let i = 0; i < keysArr.length; i++) {
        keysArr[i].textContent = valuesCapsArr[i];
      };
    } else {
      const valuesLowArr = getValuesLowArr();
      for (let i = 0; i < keysArr.length; i++) {
        keysArr[i].textContent = valuesLowArr[i];
      };
    };
  };
//======== press shift when caps is on
if (event.type === 'keydown' && isCapsOn && (event.code === 'ShiftLeft' || event.code === 'ShiftRight')) {
  isShiftOn = true;
  const valuesCapsShiftArr = getValuesCapsShiftArr();
  for (let i = 0; i < keysArr.length; i++) {
    keysArr[i].textContent = valuesCapsShiftArr[i];
  };
};
if (event.type === 'keyup' && isCapsOn && (event.code === 'ShiftLeft' || event.code === 'ShiftRight')) {
  isShiftOn = false;
  const valuesCapsArr = getValuesCapsArr();
  for (let i = 0; i < keysArr.length; i++) {
    keysArr[i].textContent = valuesCapsArr[i];
  };
};

  //======= press fn keys
  if (event.type === 'keydown' && event.code === 'Tab') {
    textarea.value += '\t';
  };
  if (event.type === 'keydown' && event.code === 'Backspace') {
    if (textarea.selectionStart === textarea.selectionEnd && cursorPosition > 0) {
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
  if (event.type === 'keydown' && event.code === 'Enter') {
    textarea.value += '\n';
  };
  if (event.type === 'keydown' && event.code === 'Delete') {
    textarea.selectionStart === textarea.selectionEnd ? 
    textarea.value = textarea.value.slice(0, cursorPosition) + textarea.value.slice(cursorPosition + 1, textarea.value.length) :
    textarea.value = textarea.value.slice(0, textarea.selectionStart) + textarea.value.slice(textarea.selectionEnd, textarea.value.length);
    textarea.selectionStart = cursorPosition;
    textarea.selectionEnd = cursorPosition;
  };
    //=========press arrows
    if (event.type === 'keydown' && event.code === 'ArrowLeft' && cursorPosition > 0) {
      textarea.selectionStart = cursorPosition - 1;
      textarea.selectionEnd = cursorPosition - 1;
    };
    if (event.type === 'keydown' && event.code === 'ArrowRight' && cursorPosition < textarea.value.length) {
      textarea.selectionStart = cursorPosition + 1;
      textarea.selectionEnd = cursorPosition + 1;
    };
    if (event.type === 'keydown' && event.code === 'ArrowUp' && cursorPosition >= 90) {
      textarea.selectionStart = cursorPosition - 90;
      textarea.selectionEnd = cursorPosition - 90;
    };
    if (event.type === 'keydown' && event.code === 'ArrowUp' && cursorPosition < 90) {
      cursorPosition = 0;
      textarea.selectionStart = cursorPosition;
      textarea.selectionEnd = cursorPosition;
    };
    if (event.type === 'keydown' && event.code === 'ArrowDown' && cursorPosition <= textarea.value.length - 90) {
      textarea.selectionStart = cursorPosition + 90;
      textarea.selectionEnd = cursorPosition + 90;
    };
    if (event.type === 'keydown' && event.code === 'ArrowDown' && cursorPosition > textarea.value.length - 90) {
      cursorPosition = textarea.length - 1;
      textarea.selectionStart = cursorPosition;
      textarea.selectionEnd = cursorPosition;
    };
//========press keys (typing)
  if (event.type === 'keydown'
    && event.code !== 'Tab'
    && event.code !== 'Backspace'
    && event.code !== 'Delete'
    && event.code !== 'CapsLock'
    && event.code !== 'Enter'
    && event.code !== 'ShiftLeft'
    && event.code !== 'ShiftRight'
    && event.code !== 'ControlLeft'
    && event.code !== 'MetaLeft'
    && event.code !== 'AltLeft'
    && event.code !== 'AltRight'
    && event.code !== 'ArrowLeft'
    && event.code !== 'ArrowRight'
    && event.code !== 'ArrowUp'
    && event.code !== 'ArrowDown'
    && event.code !== 'ControlRight') {
    for (let i = 0; i < keysArr.length; i++) {
      if (keysArr[i].classList.contains(event.code)) {
        const text = keysArr[i].textContent;
        textarea.setRangeText(text, cursorPosition, cursorPosition, 'end');
      };
    };

  };
//========pressed key animation
if (event.type === 'keydown' && event.code !== 'CapsLock') {
  for (let i = 0; i < keysArr.length; i++) {
    if (keysArr[i].classList.contains(event.code)) {
      keysArr[i].classList.add('active');
    };
  };
};
if (event.type === 'keyup' && event.code !== 'CapsLock') {
  for (let i = 0; i < keysArr.length; i++) {
    if (keysArr[i].classList.contains(event.code)) {
      keysArr[i].classList.remove('active');
    };
  };
}; 


};
window.addEventListener('keydown', pressHandler);
window.addEventListener('keyup', pressHandler);
window.addEventListener('DOMContentLoaded', init);
window.addEventListener('beforeunload', () => localStorage.setItem('layout', layout));
