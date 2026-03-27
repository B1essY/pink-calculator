let display = document.getElementById("display");

function append(value) {
  display.value += value;
  addClickAnimation(event.target);
}

function clearDisplay() {
  display.value = "";
  addClickAnimation(event.target);
}

function calculate() {
  try {
    display.value = eval(display.value);
  } catch (e) {
    display.value = "Error";
  }
  addClickAnimation(event.target);
}

function addClickAnimation(button) {
  button.style.animation = 'none';
  setTimeout(() => {
    button.style.animation = 'buttonClick 0.6s ease-out';
  }, 10);
}

const style = document.createElement('style');
style.textContent = `
  @keyframes buttonClick {
    0% {
      transform: scale(1) rotateZ(0deg);
    }
    50% {
      transform: scale(0.95) rotateZ(2deg);
    }
    100% {
      transform: scale(1) rotateZ(0deg);
    }
  }
`;
document.head.appendChild(style);