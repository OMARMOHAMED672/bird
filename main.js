let bird = document.getElementById("bird");
let gameContainer = document.querySelector(".game-container");
let scoreDisplay = document.getElementById("score");
let messageDisplay = document.getElementById("message");
let gameOverScreen = document.getElementById("gameOverScreen");
let birdY = window.innerHeight / 2;
let gravity = 0.2;
let velocity = 0;
let pipes = [];
let pipeSpeed = 5.5;
let score = 0;
let isGameOver = false;
// let messages = ["عاش كوكو عاش", "مراتي بتكسب", "اجمدي يبت", "ادي اديلو يا ام اثر,عاش كوكو عاش", "مراتي بتكسب", "اجمدي يبت", "ادي اديلو يا ام اثر"];

function jump() {
  if (!isGameOver) velocity = -4;
}

function updateGame() {
  if (isGameOver) return;

  velocity += gravity;
  birdY += velocity;
  bird.style.top = birdY + "px";

  pipes.forEach((pipe) => {
    pipe.style.left = parseInt(pipe.style.left) - pipeSpeed + "px";

    if (!pipe.passed && parseInt(pipe.style.left) < 20) {
      pipe.passed = true;
      score++;
      scoreDisplay.innerText = "Score: " + score;
      messageDisplay.innerText = messages[score % messages.length];
    }

    let birdRect = bird.getBoundingClientRect();
    let pipeRect = pipe.getBoundingClientRect();

    if (
      birdRect.left < pipeRect.left + pipeRect.width &&
      birdRect.left + birdRect.width > pipeRect.left &&
      birdRect.top < pipeRect.top + pipeRect.height &&
      birdRect.top + birdRect.height > pipeRect.top
    ) {
      gameOver();
    }
  });

  pipes = pipes.filter((pipe) => parseInt(pipe.style.left) >= -180);
}

function createPipe() {
  if (isGameOver) return;

  let pipeHeight = Math.floor(Math.random() * (window.innerHeight / 2)) + 100;
  let gap = 280;
  let spawnPosition = window.innerWidth;

  let topPipe = document.createElement("div");
  topPipe.classList.add("pipe", "top");
  topPipe.style.left = spawnPosition + "px";
  topPipe.style.height = pipeHeight + "px";
  topPipe.passed = false;

  let bottomPipe = document.createElement("div");
  bottomPipe.classList.add("pipe", "bottom");
  bottomPipe.style.left = spawnPosition + "px";
  bottomPipe.style.height = window.innerHeight - pipeHeight - gap + "px";
  bottomPipe.style.top = pipeHeight + gap + "px";
  bottomPipe.passed = false;

  gameContainer.appendChild(topPipe);
  gameContainer.appendChild(bottomPipe);
  pipes.push(topPipe, bottomPipe);
}

function gameOver() {
  isGameOver = true;
  gameOverScreen.style.display = "block";
}

function restartGame() {
  location.reload();
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") jump();
});

setInterval(updateGame, 20);
setInterval(createPipe, 3000);
