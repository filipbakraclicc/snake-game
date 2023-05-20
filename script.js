const playBoard = document.querySelector('.play-board');

let foodX, foodY;
let snakeX = 5,
  snakeY = 10;

const changeFoodPosition = () => {
    // passing random 1-30 value as food position
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
};

const initGame = () => {
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX} "></div>`;

    htmlMarkup += `<div class="head" style="grid-area: ${snakeX} / ${snakeY} "></div>`;

    playBoard.innerHTML = htmlMarkup;
};

changeFoodPosition();
initGame();