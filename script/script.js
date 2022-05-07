import keysObj from './layouts.js';

const layout = 'ru';
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



window.addEventListener('DOMContentLoaded', init);
window.addEventListener('beforeunload', () => localStorage.setItem('layout', layout));
