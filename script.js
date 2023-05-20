const playBoard = document.querySelector('.play-board');

let foodX, foodY;
let snakeX = 5,
  snakeY = 10;

let velocityX = 0,
  velocityY = 0;

const changeFoodPosition = () => {
    // passing random 1-30 value as food position
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
};

const changeDirection = (e) => {
    console.log(e);
    // Changing velocity based on key we press
    if (e.key === 'ArrowUp') {
      velocityX = 0;
      velocityY = -1;
    } else if (e.key === 'ArrowLeft') {
      velocityX = -1;
      velocityY = 0;
    } else if (e.key === 'ArrowDown') {
      velocityX = 0;
      velocityY = 1;
    } else if (e.key === 'ArrowRight') {
      velocityX = 1;
      velocityY = 0;
    }
  };

const initGame = () => {
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX} "></div>`;

    // updating snake head
    snakeX += velocityX;
    snakeY += velocityY;

    htmlMarkup += `<div class="head" style="grid-area: ${snakeX} / ${snakeY} "></div>`;

    playBoard.innerHTML = htmlMarkup;
};

changeFoodPosition();
setInterval(initGame, 125); // 125 - snake speed
document.addEventListener('keydown', changeDirection);