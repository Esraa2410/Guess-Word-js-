const inputsContainer = document.querySelector(".inputs"),
  discTitle = document.querySelector(".disc"),
  guessCount = document.querySelector(".guess_count"),
  resetButton = document.querySelector("button"),
  typing = document.querySelector(".typing"),
  succ = new Audio("../audios/succ.mp3"),
  winner = document.querySelector(".winner");

// all words
const words = [
  {
    word: "html",
    disc: "Markup language for creating web pages",
  },
  {
    word: "css",
    disc: "Style sheet language for designing web pages",
  },
  {
    word: "javascript",
    disc: "Programming language of the web",
  },
  {
    word: "react",
    disc: "JavaScript library for building UI",
  },
  {
    word: "vue",
    disc: "Progressive JavaScript framework",
  },
  {
    word: "angular",
    disc: "Frontend framework by Google",
  },
  {
    word: "tailwind",
    disc: "Utility-first CSS framework",
  },
  {
    word: "bootstrap",
    disc: "Popular CSS framework",
  },
  {
    word: "sass",
    disc: "CSS preprocessor",
  },
  {
    word: "typescript",
    disc: "Typed superset of JavaScript",
  },
];


let word,
  maxGuess = 12,
  countToWin = [];
document.addEventListener("keydown", () => typing.focus());
typing.addEventListener("input", startGame);
resetButton.addEventListener("click", getRandomWord);

// get Random Word
function getRandomWord() {
  reset();
  let randomObject = words[Math.floor(Math.random() * words.length)];
  let disc = randomObject.disc;
  word = randomObject.word;
  discTitle.innerText = disc;
  guessCount.innerText = maxGuess;
  let inputs = "";
  for (let i = 0; i < word.length; i++) {
    inputs += `<input type="text" disabled/>`;
  }
  inputsContainer.innerHTML = inputs;
}

getRandomWord();

// start game
function startGame(e) {
  let char = e.target.value;
  if (!char.match(/[a-z]/i)) return;
  if (word.includes(char)) {
    for (let i = 0; i < word.length; i++) {
      if (
        word[i] === char &&
        !inputsContainer.querySelectorAll("input")[i].value
      ) {
        inputsContainer.querySelectorAll("input")[i].value = char;
        countToWin.push(char);
      }
    }
  } else {
    maxGuess--;
  }
  guessCount.innerText = maxGuess;
  typing.value = "";

  checkStatus();
}


function checkStatus() {
  if (countToWin.length === word.length) {
    winner.classList.remove("hidden");
    succ.play();
    countToWin = [];
  }
  if (maxGuess <= 0) {
    alert("  Looooser, Try Again.");
    for (let i = 0; i < word.length; i++) {
      inputsContainer.querySelectorAll("input")[i].value = word[i];
    }
  }
}


// reset element
function reset() {
  maxGuess = 12;
  winner.classList.add("hidden");
  countToWin = [];
  succ.pause();
}
