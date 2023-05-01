import {
  arrayNameButton,
  shiftArrayEn,
  rusAlphabet,
  shiftArrayRu,
} from "./layoutsOfKeyboard.js";

let language = "Eng";

let symbolsArray = [...arrayNameButton];
let isShiftPressed = false;
let isCapslockPressed = false;
let enterCount = 0;
const enterArray = [];
let cursorPosit = 0;

const body = document.querySelector("body");
const display = document.createElement("textarea");
display.className = "display";
body.appendChild(display);
display.focus();

const wrapperButton = document.createElement("div");
wrapperButton.className = "wrapper__button";
body.appendChild(wrapperButton);

display.addEventListener("blur", () => {
  cursorPosit = display.selectionStart;
  display.focus();
});

symbolsArray.forEach((element) => {
  element.forEach((value) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "button";
    button.innerHTML = value;

    wrapperButton.appendChild(button);
    if (value === "Space") {
      button.classList.add("space");
      button.setAttribute("id", " ");
    }
    if (value === "Backspace") {
      button.classList.add("backspace");
    }
    if (value === "Delete") {
      button.classList.add("del");
    }
    if (value === "Enter") {
      button.classList.add("enter");
    }
    if (value === "Shift") {
      button.classList.add("shift");
    }
    if (value === "Tab") {
      button.classList.add("tab");
    }
    if (value === "CapsLock") {
      button.classList.add("caps-lock");
    }
    if (value === "Ctrl") {
      button.classList.add("ctrl");
    }
    if (value === "Eng" || value === "Rus") {
      button.classList.add("lang");
    }
    if (value === "↑") {
      button.setAttribute("id", "ArrowUp");
    }
    if (value === "↓") {
      button.setAttribute("id", "ArrowDown");
    }
    if (value === "→") {
      button.setAttribute("id", "ArrowRight");
    }
    if (value === "←") {
      button.setAttribute("id", "ArrowLeft");
    }
  });
  const newLine = document.createElement("br");
  wrapperButton.appendChild(newLine);
});

function removeSelectedText() {
  display.value = display.value.slice(0, display.selectionStart)
    + display.value.slice(display.selectionEnd, display.value.length);
  display.selectionStart = cursorPosit;
  display.selectionEnd = cursorPosit;
}

const arrayOfButtons = Array.from(document.querySelectorAll(".button"));

function changeNameOfButtons() {
  if (language === "Eng" && isShiftPressed) {
    symbolsArray = [...shiftArrayEn];
  } else if (language === "Rus" && isShiftPressed) {
    symbolsArray = [...shiftArrayRu];
  } else if (language === "Eng") {
    symbolsArray = [...arrayNameButton];
  } else if (language === "Rus") {
    symbolsArray = [...rusAlphabet];
  }
  if ((!isShiftPressed && isCapslockPressed) || (isShiftPressed && !isCapslockPressed)) {
    symbolsArray = symbolsArray.map((array) => array.map((value) => {
      if (value === "Eng" || value === "Rus" || value === "Tab" || value === "CapsLock" || value === "Shift" || value === "Ctrl"
  || value === "Win" || value === "Alt" || value === "Space" || value === "Delete" || value === "Backspace" || value === "Enter") {
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
  button.addEventListener("click", () => {
    const value = button.innerHTML;

    if (value === "Eng" || value === "Rus") {
      if (value === "Eng") {
        language = "Rus";
      } else {
        language = "Eng";
      }

      changeNameOfButtons();
    } else if (value === "Space") {
      display.value = `${display.value.slice(
        0,
        display.selectionStart,
      )} ${display.value.slice(display.selectionStart, display.value.length)}`;

      display.selectionStart = cursorPosit + 1;
      display.selectionEnd = cursorPosit + 1;
    } else if (value === "Tab") {
      display.value = `${display.value.slice(
        0,
        display.selectionStart,
      )}  ${display.value.slice(display.selectionStart, display.value.length)}`;

      display.selectionStart = cursorPosit + 2;
      display.selectionEnd = cursorPosit + 2;
    } else if (value === "Backspace") {
      if (display.selectionStart !== display.selectionEnd) {
        removeSelectedText();
      } else {
        display.value = display.value.slice(0, display.selectionStart - 1)
          + display.value.slice(display.selectionEnd, display.value.length);
        display.selectionStart = cursorPosit - 1;
        display.selectionEnd = cursorPosit - 1;
      }
    } else if (value === "Delete") {
      if (display.selectionStart !== display.selectionEnd) {
        removeSelectedText();
      } else {
        display.value = display.value.slice(0, display.selectionStart)
          + display.value.slice(display.selectionStart + 1, display.value.length);
        display.selectionStart = cursorPosit;
        display.selectionEnd = cursorPosit;
      }
    } else if (value === "Enter") {
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
      console.log(display.value.split("\n").length);
      enterArray.push(display.selectionStart);
      enterCount += 1;
    } else if (value === "Shift") {
      if (isShiftPressed) {
        isShiftPressed = false;
        button.classList.remove("active");
      } else {
        isShiftPressed = true;
        button.classList.add("active");
      }
      changeNameOfButtons();
    } else if (value === "CapsLock") {
      if (isCapslockPressed) {
        isCapslockPressed = false;
        button.classList.remove("active");
      } else {
        isCapslockPressed = true;
        button.classList.add("active");
      }
      changeNameOfButtons();
    } else if (value === "Win" || value === "Alt" || value === "Ctrl") {
      cursorPosit = display.selectionStart;
    } else if (value === "→") {
      display.selectionStart = cursorPosit + 1;
      display.selectionEnd = cursorPosit + 1;
    } else if (value === "←") {
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

body.addEventListener("keydown", (event) => {
  console.log(event.code);
  const findedButton = arrayOfButtons.find((value) => event.key === value.innerHTML);

  if (findedButton) {
    findedButton.classList.add("light");
  }
});
body.addEventListener("keyup", (event) => {
  const findedButton = arrayOfButtons.find((value) => event.key === value.innerHTML);

  if (findedButton) {
    findedButton.classList.remove("light");
  }
});
