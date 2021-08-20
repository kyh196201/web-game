'use strict';

window.addEventListener('DOMContentLoaded', (e) => {
  // Elements
  const $btn = document.getElementById('start-btn');
  const $numbersView = document.getElementById('numbers-view');

  let numbers = [];
  let shuffled = [];
  let bonus = null;

  function createNumbers(max = 45) {
    return Array.from(new Array(max), (v, index) => index + 1);
  }

  function shuffleArray(array) {
    const newArray = array.slice();

    for (let i = newArray.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));

      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }

    return newArray;
  }

  function setColor(num) {
    let color = '';

    if (num < 10) {
      color = 'red';
    } else if (num >= 10 && num < 20) {
      color = 'orange';
    } else if (num >= 20 && num < 30) {
      color = 'darkblue';
    } else if (num >= 30 && num < 40) {
      color = 'green';
    } else if (num >= 40) {
      color = 'purple';
    }

    return color;
  }

  function renderNumberView(numbers, bonus) {
    $numbersView.innerHTML = '';

    const arrlength = numbers.length;

    for (let i = 0; i < arrlength + 1; i++) {
      setTimeout(() => {
        const num = numbers[i];
        let color = '';
        let text = '';

        if (i < arrlength) {
          color = setColor(num);
          text = num;
        } else {
          color = 'blue';
          text = bonus;
        }

        const $el = document.createElement('div');
        $el.className = 'number';
        $el.style.backgroundColor = color;
        $el.textContent = text;

        $numbersView.appendChild($el);
      }, i * 1000);
    }
  }

  function startRaffle() {
    setup();
    bonus = shuffled.pop();
    const pickedNumbers = shuffled.slice(0, 6);

    renderNumberView(pickedNumbers, bonus);
  }

  function bindEvents() {
    $btn.addEventListener('click', () => {
      startRaffle();
    });
  }

  function setup() {
    numbers = createNumbers();
    shuffled = shuffleArray(numbers);
  }

  function init() {
    bindEvents();
  }

  init();
});
