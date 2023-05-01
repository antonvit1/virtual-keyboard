import {
  arrayNameButton,
  shiftArrayEn,
  rusAlphabet,
  shiftArrayRu,
} from './layoutsOfKeyboard.js';

let language = localStorage.getItem('language') || 'Eng';

let symbolsArray = language === 'Eng' ? arrayNameButton : rusAlphabet;
let isShiftPressed = false;
let isCapslockPressed = false;
let cursorPosit = 0;

const body = document.querySelector('body');
const display = document.createElement('textarea');
display.className = 'display';
body.appendChild(display);
display.focus();

const wrapperButton = document.createElement('div');
wrapperButton.className = 'wrapper__button';
body.appendChild(wrapperButton);

display.addEventListener('blur', () => {
  cursorPosit = display.selectionStart;
  display.focus();
});

symbolsArray.forEach((element) => {
  element.forEach((value, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'button';
    button.innerHTML = value;

    wrapperButton.appendChild(button);
    if (value === 'Space') {
      button.classList.add('space');
      button.setAttribute('id', 'Space');
    }
    if (value === 'Backspace') {
      button.classList.add('backspace');
    }
    if (value === 'Delete') {
      button.classList.add('del');
    }
    if (value === 'Enter') {
      button.classList.add('enter');
    }
    if (value === 'Shift') {
      button.classList.add('shift');

      if ((index !== 0)) {
        button.setAttribute('id', 'ShiftRight');
      } else {
        button.setAttribute('id', 'ShiftLeft');
      }
    }
    if (value === 'Tab') {
      button.classList.add('tab');
    }
    if (value === 'CapsLock') {
      button.classList.add('caps-lock');
    }
    if (value === 'Ctrl') {
      button.classList.add('ctrl');
      if (index !== 0) {
        button.setAttribute('id', 'ControlRight');
      } else {
        button.setAttribute('id', 'ControlLeft');
      }
    }
    if (value === 'Alt') {
      if (index !== 2) {
        button.setAttribute('id', 'AltRight');
      } else {
        button.setAttribute('id', 'AltLeft');
      }
    }
    if (value === 'Eng' || value === 'Rus') {
      button.classList.add('lang');
    }
    if (value === '↑') {
      button.setAttribute('id', 'ArrowUp');
    }
    if (value === '↓') {
      button.setAttribute('id', 'ArrowDown');
    }
    if (value === '→') {
      button.setAttribute('id', 'ArrowRight');
    }
    if (value === '←') {
      button.setAttribute('id', 'ArrowLeft');
    }
  });
  const newLine = document.createElement('br');
  wrapperButton.appendChild(newLine);
});

function removeSelectedText() {
  display.value = display.value.slice(0, display.selectionStart)
    + display.value.slice(display.selectionEnd, display.value.length);
  display.selectionStart = cursorPosit;
  display.selectionEnd = cursorPosit;
}

const arrayOfButtons = Array.from(document.querySelectorAll('.button'));

function changeNameOfButtons() {
  if (language === 'Eng' && isShiftPressed) {
    symbolsArray = [...shiftArrayEn];
  } else if (language === 'Rus' && isShiftPressed) {
    symbolsArray = [...shiftArrayRu];
  } else if (language === 'Eng') {
    symbolsArray = [...arrayNameButton];
  } else if (language === 'Rus') {
    symbolsArray = [...rusAlphabet];
  }
  if ((!isShiftPressed && isCapslockPressed) || (isShiftPressed && !isCapslockPressed)) {
    symbolsArray = symbolsArray.map((array) => array.map((value) => {
      if (value === 'Eng' || value === 'Rus' || value === 'Tab' || value === 'CapsLock' || value === 'Shift' || value === 'Ctrl'
  || value === 'Win' || value === 'Alt' || value === 'Space' || value === 'Delete' || value === 'Backspace' || value === 'Enter') {
        return value;
      }
      return value.toUpperCase();
    }));
  }

  symbolsArray.flat().forEach((value, index) => {
    arrayOfButtons[index].innerHTML = value;
  });
}

arrayOfButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.innerHTML;

    if (value === 'Eng' || value === 'Rus') {
      if (value === 'Eng') {
        language = 'Rus';
      } else {
        language = 'Eng';
      }
      localStorage.setItem('language', language);
      changeNameOfButtons();
    } else if (value === 'Space') {
      display.value = `${display.value.slice(
        0,
        display.selectionStart,
      )} ${display.value.slice(display.selectionStart, display.value.length)}`;

      display.selectionStart = cursorPosit + 1;
      display.selectionEnd = cursorPosit + 1;
    } else if (value === 'Tab') {
      display.value = `${display.value.slice(
        0,
        display.selectionStart,
      )}  ${display.value.slice(display.selectionStart, display.value.length)}`;

      display.selectionStart = cursorPosit + 2;
      display.selectionEnd = cursorPosit + 2;
    } else if (value === 'Backspace') {
      if (display.selectionStart !== display.selectionEnd) {
        removeSelectedText();
      } else {
        display.value = display.value.slice(0, display.selectionStart - 1)
          + display.value.slice(display.selectionEnd, display.value.length);
        display.selectionStart = cursorPosit - 1;
        display.selectionEnd = cursorPosit - 1;
      }
    } else if (value === 'Delete') {
      if (display.selectionStart !== display.selectionEnd) {
        removeSelectedText();
      } else {
        display.value = display.value.slice(0, display.selectionStart)
          + display.value.slice(display.selectionStart + 1, display.value.length);
        display.selectionStart = cursorPosit;
        display.selectionEnd = cursorPosit;
      }
    } else if (value === 'Enter') {
      if (display.selectionStart !== display.selectionEnd) {
        removeSelectedText();
      } else {
        display.value = `${display.value.substring(
          0,
          display.selectionStart,
        )}\n${display.value.substring(
          display.selectionEnd,
          display.value.length,
        )}`;
        display.selectionStart = cursorPosit + 1;
        display.selectionEnd = cursorPosit + 1;
      }
    } else if (value === 'Shift') {
      if (isShiftPressed) {
        isShiftPressed = false;
        button.classList.remove('active');
      } else {
        isShiftPressed = true;
        button.classList.add('active');
      }
      changeNameOfButtons();
    } else if (value === 'CapsLock') {
      if (isCapslockPressed) {
        isCapslockPressed = false;
        button.classList.remove('active');
      } else {
        isCapslockPressed = true;
        button.classList.add('active');
      }
      changeNameOfButtons();
    } else if (value === 'Win' || value === 'Alt' || value === 'Ctrl') {
      cursorPosit = display.selectionStart;
    } else if (value === '→') {
      display.selectionStart = cursorPosit + 1;
      display.selectionEnd = cursorPosit + 1;
    } else if (value === '←') {
      display.selectionStart = cursorPosit - 1;
      display.selectionEnd = cursorPosit - 1;
    } else {
      display.value = display.value.slice(0, display.selectionStart)
          + value
          + display.value.slice(display.selectionStart, display.value.length);
      display.selectionStart = cursorPosit + 1;
      display.selectionEnd = cursorPosit + 1;
    }
  });
});

body.addEventListener('keydown', (event) => {
  if (event.key === 'CapsLock') {
    const capsLock = arrayOfButtons.find((button) => button.innerHTML === 'CapsLock');
    if (isCapslockPressed) {
      isCapslockPressed = false;
      capsLock.classList.remove('active');
    } else {
      isCapslockPressed = true;
      capsLock.classList.add('active');
    }
    changeNameOfButtons();
  }
  if (event.code === 'ShiftRight') {
    const shiftRight = arrayOfButtons.find((button) => button.id === 'ShiftRight');
    if (isShiftPressed) {
      isShiftPressed = false;
      shiftRight.classList.remove('active');
    } else {
      isShiftPressed = true;
      shiftRight.classList.add('active');
    }
    changeNameOfButtons();
  }
  if (event.code === 'ShiftLeft') {
    const shiftLeft = arrayOfButtons.find((button) => button.id === 'ShiftLeft');
    if (isShiftPressed) {
      isShiftPressed = false;
      shiftLeft.classList.remove('active');
    } else {
      isShiftPressed = true;
      shiftLeft.classList.add('active');
    }
    changeNameOfButtons();
  }

  arrayOfButtons.forEach((button) => {
    if (event.key === 'Shift' || event.key === 'Alt') {
      if (button.id === event.code) {
        button.classList.add('light');
      }
    } else if (button.id === event.code || button.innerHTML === event.key) {
      button.classList.add('light');
    }
  });
});
body.addEventListener('keyup', (event) => {
  if (event.code === 'ShiftRight') {
    const shiftRight = arrayOfButtons.find((button) => button.id === 'ShiftRight');
    isShiftPressed = false;
    shiftRight.classList.remove('active');
    changeNameOfButtons();
  }
  if (event.code === 'ShiftLeft') {
    const shiftLeft = arrayOfButtons.find((button) => button.id === 'ShiftLeft');
    isShiftPressed = false;
    shiftLeft.classList.remove('active');
    changeNameOfButtons();
  }
  arrayOfButtons.forEach((button) => {
    if (button.id === event.code || button.innerHTML === event.key) {
      button.classList.remove('light');
    }
  });
});
