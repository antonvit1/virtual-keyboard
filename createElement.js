let arrayNameButton = [
  ["~", "1", "2", "3", "4", "5", "6", "7", "8", "0", "-", "=", "Backspace"],
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
    "DEL",
  ],
  ["Caps Lock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "ENTER"],
  ["SHIFT", "\\", "z", "x", "c", "v", "b", "n", "m", ".", "/", "↑", "SHIFT"],
  ["Ctrl", "Win", "Alt", "Space", "Alt", "Ctrl", "←", "↓", "→"],
];
let cursorPosit = 0;
let body = document.querySelector("body");
let display = document.createElement("textarea");
display.className = "display";
body.appendChild(display);
let wrapperButton = document.createElement("div");
wrapperButton.className = "wrapper__button";
body.appendChild(wrapperButton);

display.addEventListener("blur", () => {
  cursorPosit = display.selectionStart;
  display.focus();
  console.log(cursorPosit);
});

let lineKeyboard = arrayNameButton.map((element) => {
  element.forEach((value, index, array) => {
    let button = document.createElement("button");
    button.type = "button";
    button.className = "button";
    button.innerHTML = value;
    wrapperButton.appendChild(button);
  });
  let newLine = document.createElement("br");
  wrapperButton.appendChild(newLine);
});

function removeSelectedText() {
  display.value =
    display.value.slice(0, display.selectionStart) +
    display.value.slice(display.selectionEnd, display.value.length);
  display.selectionStart = cursorPosit;
  display.selectionEnd = cursorPosit;
}

// button.addEventListener("keydown", function (e) {
//   for (let i = 0; i < arrayNameButton.length; i++) {}
//   let button = document.createElement("button");
//   button.classList.add("active");
// });
let arrayOfButtons = Array.from(document.querySelectorAll(".button"));
arrayOfButtons.forEach((button) => {
  let value = button.innerHTML;

  button.addEventListener("click", function (e) {
    if (value === "Space") {
      button.classList.add("space");
      display.value =
        display.value.slice(0, display.selectionStart) +
        " " +
        display.value.slice(display.selectionStart, display.value.length);

      display.selectionStart = cursorPosit + 1;
      display.selectionEnd = cursorPosit + 1;
    } else if (value === "Backspace") {
      if (display.selectionStart !== display.selectionEnd) {
        removeSelectedText();
      } else {
        display.value =
          display.value.slice(0, display.selectionStart - 1) +
          display.value.slice(display.selectionEnd, display.value.length);
        display.selectionStart = cursorPosit - 1;
        display.selectionEnd = cursorPosit - 1;
      }
    } else if (value === "DEL") {
      display.value =
        display.value.slice(0, display.selectionStart) +
        display.value.slice(display.selectionStart + 1, display.value.length);
      display.selectionStart = cursorPosit;
      display.selectionEnd = cursorPosit;
    } else if (value === "ENTER") {
      display.value =
        display.value.substring(0, display.selectionStart) +
        "\n" +
        display.value.substring(display.selectionEnd, display.value.length);
      display.selectionStart = cursorPosit + 1;
      display.selectionEnd = cursorPosit + 1;
    } else if (value === "SHIFT") {
      display.value += display.value.toLowerCase();
    } else {
      display.value =
        display.value.slice(0, display.selectionStart) +
        value +
        display.value.slice(display.selectionStart, display.value.length);
      cursorPosit = display.selectionStart;
    }
  });
});
