const arrayNameButton = [
  ["Eng", "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
  [
    "Tab",
    "q",
    "w",
    "e",
    "r",
    "t",
    "y",
    "u",
    "i",
    "o",
    "p",
    "[",
    "]",
    "\\",
    "Del",
  ],
  ["Caps Lock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter"],
  ["Shift", "\\", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "↑", "Shift"],
  ["Ctrl", "Win", "Alt", "Space", "Alt", "Ctrl", "←", "↓", "→"],
];

const shiftArrayEn = [["Eng", "~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "Backspace"], [
  "Tab",
  "q",
  "w",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
  "{",
  "}",
  "\\",
  "Del",
],
["Caps Lock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ":", '"', "Enter"],
["Shift", "|", "z", "x", "c", "v", "b", "n", "m", "<", ">", "?", "↑", "Shift"],
["Ctrl", "Win", "Alt", "Space", "Alt", "Ctrl", "←", "↓", "→"]];

const rusAlphabet = [
  ["Rus", "ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
  [
    "Tab",
    "й",
    "ц",
    "у",
    "к",
    "е",
    "н",
    "г",
    "ш",
    "щ",
    "з",
    "х",
    "ъ",
    "\\",
    "Del",
  ],
  ["Caps Lock", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "Enter"],
  ["Shift", "\\", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", "/", "↑", "Shift"],
  ["Ctrl", "Win", "Alt", "Space", "Alt", "Ctrl", "←", "↓", "→"],
];

const shiftArrayRu = [["Rus", "ё", "!", "\"", "№", ";", "%", ":", "?", "*", "(", ")", "_", "+", "Backspace"], [
  "Tab",
  "й",
  "ц",
  "у",
  "к",
  "е",
  "н",
  "г",
  "ш",
  "щ",
  "з",
  "х",
  "ъ",
  "\\",
  "Del",
],
["Caps Lock", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "Enter"],
["Shift", "/", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ",", "↑", "Shift"],
["Ctrl", "Win", "Alt", "Space", "Alt", "Ctrl", "←", "↓", "→"]];
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
    }
    if (value === "Backspace") {
      button.classList.add("backspace");
    }
    if (value === "Del") {
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
    if (value === "Caps Lock") {
      button.classList.add("caps-lock");
    }
    if (value === "Ctrl") {
      button.classList.add("ctrl");
    }
    if (value === "Eng" || value === "Rus") {
      button.classList.add("lang");
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

  symbolsArray.flat().map((value, index) => {
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
    } else if (value === "Del") {
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
      console.log(display.value.split('\n').length);
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
    } else if (value === "Caps Lock") {
      if (isCapslockPressed) {
        isCapslockPressed = false;
        button.classList.remove("active");
      } else {
        isCapslockPressed = true;
        button.classList.add("active");
      }
    } else if (value === "Win" || value === "Alt" || value === "Ctrl") {
      cursorPosit = display.selectionStart;
    } else if (value === "→") {
      display.selectionStart = cursorPosit + 1;
      display.selectionEnd = cursorPosit + 1;
    } else if (value === "←") {
      display.selectionStart = cursorPosit - 1;
      display.selectionEnd = cursorPosit - 1;
    } else if (value === "↑") {
      if (enterCount === 0) {
        display.selectionStart = cursorPosit;
        display.selectionEnd = cursorPosit;
      } else if (enterCount === 1) {
        display.selectionStart -= enterArray[enterArray.length - 1];
        display.selectionEnd -= enterArray[enterArray.length - 1];
        enterArray.pop();
        enterCount -= 1;
      } else {
        display.selectionStart -= (enterArray[enterArray.length - 1]
           - enterArray[enterArray.length - 2]);
        display.selectionEnd -= (enterArray[enterArray.length - 1]
           - enterArray[enterArray.length - 2]);
        enterCount -= 1;
        enterArray.pop();
      }
    } else if (value === "↓") {
      if (enterCount === 0) {
        display.selectionStart = cursorPosit;
        display.selectionEnd = cursorPosit;
      }
    } else {
      if (isCapslockPressed && isShiftPressed) {
        display.value = display.value.slice(0, display.selectionStart)
        + value
        + display.value.slice(display.selectionStart, display.value.length);
      } else if (isShiftPressed) {
        display.value = display.value.slice(0, display.selectionStart)
        + value.toUpperCase()
        + display.value.slice(display.selectionStart, display.value.length);
      } else if (isCapslockPressed) {
        display.value = display.value.slice(0, display.selectionStart)
        + value.toUpperCase()
        + display.value.slice(display.selectionStart, display.value.length);
      } else {
        display.value = display.value.slice(0, display.selectionStart)
        + value
        + display.value.slice(display.selectionStart, display.value.length);
      }
      display.selectionStart = cursorPosit + 1;
      display.selectionEnd = cursorPosit + 1;
    }
  });
});
