// Grabbing elements
const grid = document.querySelector('.grid');
const startButton = document.getElementById('start');
const scoreDisplay = document.getElementById('score');

// Dynamic game variables
const width = 20;
let squares = [];
let currentSnake = [2,1,0];
let direction = 1;
let appleIndex = 0;
let score = 0;
let intervalTime = 1000;
let speed = 0.9;
let timerId = 0;

function createGrid() {
  for (let i = 0; i < width * width; i++) {
  // create sqaures
  const square = document.createElement('div');
  // add it to the squares array   
  squares.push(square);
  // add styling to each square
  square.classList.add('square');
  // put the square in the game grid
  grid.appendChild(square);
  }
}
createGrid();

// Display the snake on the game grid
currentSnake.forEach(index =>squares[index].classList.add('snake'));

// Start a new round
function startGame() {
  // remove the snake
  currentSnake.forEach(index => squares[index].classList.remove('snake'));
  // remove the apple
  squares[appleIndex].classList.remove('apple');
  clearInterval(timerId);
  // reset the array to default
  currentSnake = [2,1,0];
  // set the score to default
  score = 0;
  // add new score to browser
  scoreDisplay.textContent = score;
  direction = 1;
  intervalTime = 1000;
  generateApple();
  // add the snake to its starting position
  currentSnake.forEach(index => squares[index].classList.add('snake'));
  timerId = setInterval(move, intervalTime);
}

// Move the snake on user input
function move() {
  // snake dies if it hits the walls or itself
  if (
    (currentSnake[0] - width < 0 && direction === -width) || // hits top wall
    (currentSnake[0] % width === width - 1 && direction === 1) || // hits right wall
    (currentSnake[0] + width >= width * width && direction === width) || // hits bottom wall
    (currentSnake[0] % width === 0 && direction === -1) || // hits left wall
    squares[currentSnake[0] + direction].classList.contains('snake') // hits itself
  )
    return clearInterval(timerId);
    // remove last element from currentSnake array
    const tail = currentSnake.pop();
    // remove styling from last element
    squares[tail].classList.remove('snake');
    // add element in the direction snake is moving
    currentSnake.unshift(currentSnake[0] + direction);

  // when snake eats the apple
  if (squares[currentSnake[0]].classList.contains('apple')) {
    // remove apple
    squares[currentSnake[0]].classList.remove('apple');
    // grow the snake array
    currentSnake.push(tail);
    // grow the snake
    squares[tail].classList.add('snake');
    //generate new apple
    generateApple();
    //add one to the score
    score++;
    //display the score
    scoreDisplay.textContent = score;
    //speed up the snake
    clearInterval(timerId);
    intervalTime = intervalTime * speed;
    timerId = setInterval(move, intervalTime);
  }
  squares[currentSnake[0]].classList.add('snake');
}

// Randomly place apples for the snake
function generateApple() {
  do {
    appleIndex = Math.floor(Math.random() * squares.length);
  } while (squares[appleIndex].classList.contains('snake'));
  squares[appleIndex].classList.add('apple');
} 

// 37, 38, 39, 40 are for left, up, right, and down keys respectively

function control(e) {
  if (e.keyCode === 37) {
    direction = -1;
  } else if (e.keyCode === 38) {
    direction = -width;
  } else if (e.keyCode === 39) {
    direction = 1;
  } else if (e.keyCode === 40) {
    direction = +width;
  }
}

// Event listeners
document.addEventListener('keyup', control);
startButton.addEventListener('click', startGame);