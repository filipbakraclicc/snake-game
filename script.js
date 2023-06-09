const playBoard = document.querySelector('.play-board');
const scoreElement = document.querySelector('.score');
const highScoreElement = document.querySelector('.high-score');

let foodX, foodY;

let snakeX = 5,
  snakeY = 10;
let snakeBody = [];

let velocityX = 0,
  velocityY = 0;

let gameOver = false;
let setIntervalId;

let score = 0;
let highScore = localStorage.getItem('high-score') || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

const changeFoodPosition = () => {
    // passing random 1-30 value as food position
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
};

const handleGameOver = () => {
  // clearing the interval timer and reloading the page on game over
  clearInterval(setIntervalId);
  alert('Game Over!');
  location.reload();
};

const changeDirection = (e) => {
    console.log(e);
    // Changing velocity based on key we press
    if (e.key === 'ArrowUp' && velocityY != 1) {
      velocityX = 0;
      velocityY = -1;
    } else if (e.key === 'ArrowLeft' && velocityX != 1) {
      velocityX = -1;
      velocityY = 0;
    } else if (e.key === 'ArrowDown'&& velocityY != -1) {
      velocityX = 0;
      velocityY = 1;
    } else if (e.key === 'ArrowRight'&& velocityX != -1) {
      velocityX = 1;
      velocityY = 0;
    }
  };

const initGame = () => {
    if (gameOver) return handleGameOver();

    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX} "></div>`;

    // checking if snake hit the food
    if (snakeX === foodX && snakeY === foodY) {
        changeFoodPosition();
        snakeBody.push([foodX, foodY]); // pushing food position to snake body array
        console.log(snakeBody);

        score++; // increment score by 1
        scoreElement.innerText = `Score: ${score}`;

        highScore = score >= highScore ? score : highScore;
        localStorage.setItem('high-score', highScore);
        highScoreElement.innerText = `High Score: ${highScore}`;
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
      // shifting snakes body
      snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, snakeY]; // setting first element of snake body

    // updating snake head
    snakeX += velocityX;
    snakeY += velocityY;
    
    // Checking if snakes head is out of walls, setting game over
    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
      console.log('Game over');
      gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
      // adding div for each part of snake body
      htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]} "></div>`;
      // checking if snake hit the body
      if (
        i !== 0 &&
        snakeBody[0][1] === snakeBody[i][1] &&
        snakeBody[0][0] === snakeBody[i][0]
      ) {
        gameOver = true;
      }
    }

    playBoard.innerHTML = htmlMarkup;
};

changeFoodPosition();
setIntervalId = setInterval(initGame, 125); // 125 - snake speed
document.addEventListener('keydown', changeDirection);