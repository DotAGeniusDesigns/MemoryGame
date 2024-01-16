const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

function initializeGame() {
  let cards = document.querySelectorAll("#game div");
  cards.forEach(card => card.classList.remove("inactive"));
  updateScores();
}

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.classList.add("inactive");

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let firstCard = null;
let secondCard = null;
let checking = false;
let guesses = 0;
let matches = 0;
document.querySelector("#startGame").addEventListener("click", function () {
  initializeGame();
  this.style.display = "none";
});

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  // console.log("you just clicked", event.target);
  
  let selectedCard = event.target;
  
  if (checking) return;
  if (selectedCard.classList.contains("flipped")) return;
  if (selectedCard.classList.contains("inactive")) return;
  
  selectedCard.classList.add("flipped");

  if (!firstCard || !secondCard) {
    if (!firstCard) {
      firstCard = selectedCard;
    }
    else if (selectedCard !== firstCard) {
      secondCard = selectedCard;
      checkMatch();
    }
  }
}

function checkMatch() {
  checking = true;
  
  guesses++;
  updateScores();

  if (firstCard.className === secondCard.className) {
    firstCard = null;
    secondCard = null;
    checking = false;
    matches++;
    updateScores();
    if (matches === 5) {
      setTimeout(function () {
        let restart = confirm("Congratulations! Play again?");
        if (restart)
          resetGame();
      }, 500);
    }
  }
  else {
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      firstCard = null;
      secondCard = null;
      checking = false;
    }, 1000);
  }
}

function resetGame() {
  gameContainer.innerHTML = "";
  let shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors);
  guesses = 0;
  matches = 0;
  initializeGame();
}

function updateScores() {
  document.querySelector("#guesses").innerHTML = "Guesses: " + guesses + " Matches: " + matches;
}

//when the DOM loads
createDivsForColors(shuffledColors);
