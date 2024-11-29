// script.js
const gameGrid = document.querySelector(".game-grid");
const message = document.getElementById("message");

// Card data
const icons = ["🍎", "🍊", "🍇", "🍌", "🍓", "🍍", "🍒", "🥝"];
let cardsArray = [...icons, ...icons]; // Duplicate icons for matching pairs
let firstCard, secondCard;
let lockBoard = false;
let matchedPairs = 0;

// Shuffle cards using Fisher-Yates algorithm
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createCards() {
  shuffle(cardsArray);

  // Generate cards dynamically
  cardsArray.forEach((icon) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.icon = icon;
    card.textContent = icon;

    // Add click event
    card.addEventListener("click", flipCard);

    gameGrid.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard || this === firstCard || this.classList.contains("matched")) return;

  this.classList.add("flipped");

  if (!firstCard) {
    // First card clicked
    firstCard = this;
  } else {
    // Second card clicked
    secondCard = this;

    checkMatch();
  }
}

function checkMatch() {
  if (firstCard.dataset.icon === secondCard.dataset.icon) {
    // Match found
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    matchedPairs++;

    resetBoard();

    if (matchedPairs === icons.length) {
      message.textContent = "Congratulations! You found all pairs!";
    }
  } else {
    // No match, flip back after delay
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      resetBoard();
    }, 1000);
  }
}

function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Initialize game
createCards();
