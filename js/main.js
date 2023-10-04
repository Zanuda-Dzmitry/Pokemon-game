import { confetti } from "./confetti.js";
import { AmazingCard } from "./Сard.js";

// api с картинками.
export async function fetchApi(cardNumber) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${cardNumber}`);
  const data = await res.json();
  return data.sprites.back_default;
}

// Количество карт.
let numberPairs = localStorage.horizonCard * localStorage.verticalCard;
let quantityPairsHorizon = localStorage.horizonCard;
let quantityPairsVertical = localStorage.verticalCard;
let arrCard = [];

// Музыкальное сопровождение игры.
function soundClick() {
  let audio = new Audio();
  audio.src = "./music/Gaming.mp3";
  audio.autoplay = true;
  audio.loop = true;
}
// soundClick();

// Поле ввода количества карт по вертикали/горизонтали.
function createInputForm() {
  const form = document.createElement("form"),
    horizonInput = document.createElement("select"),
    verticalInput = document.createElement("select"),
    horizonOption1 = document.createElement("option"),
    verticalOption1 = document.createElement("option"),
    horizonOption2 = document.createElement("option"),
    verticalOption2 = document.createElement("option"),
    horizonOption3 = document.createElement("option"),
    verticalOption3 = document.createElement("option"),
    verticalOption4 = document.createElement("option"),
    verticalOption5 = document.createElement("option"),
    btnWrapper = document.createElement("div"),
    btnStartGame = document.createElement("button");

  horizonInput.classList.add("input-item-1");
  verticalInput.classList.add("input-item-2");
  btnStartGame.classList.add("btnStartGame");
  btnStartGame.textContent = "Начать новую игру";
  horizonOption1.textContent = 2;
  horizonOption2.textContent = 4;
  horizonOption3.textContent = 6;
  verticalOption1.textContent = 2;
  verticalOption2.textContent = 4;
  verticalOption3.textContent = 6;
  verticalOption4.textContent = 8;
  verticalOption5.textContent = 10;

  horizonInput.append(horizonOption1, horizonOption2, horizonOption3);
  verticalInput.append(
    verticalOption1,
    verticalOption2,
    verticalOption3,
    verticalOption4,
    verticalOption5
  );
  btnWrapper.append(btnStartGame);
  form.append(horizonInput);
  form.append(verticalInput);
  form.append(btnWrapper);

  return {
    form,
    horizonInput,
    verticalInput,
    btnStartGame,
  };
}

function createNumbersArray(count) {
  for (let i = 1; i <= count / 2; i++) {
    arrCard.push(i);
    arrCard.push(i);
  }
}
createNumbersArray(numberPairs);

function shuffle(arr) {
  arr.sort(() => Math.random() - 0.5);
}
shuffle(arrCard);

function startGame(container, cardsNumberArray, horizon, vertical) {
  let startTimerGame = false;
  let oneCard = null;
  let twoCard = null;
  const title = document.createElement("h1");
  let cardList = document.createElement("div");
  let timerDiv = createTimerGame();
  const btnRestart = document.createElement("button");
  const inputStartGame = createInputForm();

  cardList.classList.add("div");
  title.textContent = "Игра в пары";
  title.classList.add("title");
  cardList.classList.add("div");
  btnRestart.textContent = "Начать заново";
  btnRestart.classList.add("btn-restart");

  // Логика горизонтального и вертикального размещения карт.
  if (horizon == 4) {
    cardList.classList.add("div-columns-4");
  }
  if (horizon == 6) {
    cardList.classList.add("div-columns-6");
  }
  if (horizon == 8) {
    cardList.classList.add("div-columns-8");
  }
  if (horizon == 10) {
    cardList.classList.add("div-columns-10");
  }

  container.append(title);
  container.append(inputStartGame.form);
  container.append(timerDiv);

  inputStartGame.form.addEventListener("submit", () => {
    let numberHorizon = inputStartGame.horizonInput.value % 2;
    let numberVertical = inputStartGame.verticalInput.value % 2;

    if (
      (!inputStartGame.horizonInput.value &&
        !inputStartGame.verticalInput.value) ||
      !inputStartGame.horizonInput.value ||
      !inputStartGame.verticalInput.value ||
      inputStartGame.horizonInput.value > 10 ||
      inputStartGame.verticalInput.value > 10 ||
      numberHorizon != 0 ||
      numberVertical != 0
    ) {
      inputStartGame.horizonInput.value = localStorage.horizonCard = 2;
      inputStartGame.verticalInput.value = localStorage.verticalCard = 2;
      return;
    }

    localStorage.horizonCard = inputStartGame.horizonInput.value;
    localStorage.verticalCard = inputStartGame.verticalInput.value;
    inputStartGame.horizonInput.value = "";
    inputStartGame.verticalInput.value = "";
  });

  // Логика карт игры.
  for (const cardNumber of cardsNumberArray) {
    const card = new AmazingCard(cardList, cardNumber, function (copyCard) {
      startTimerGame = true;
      if (oneCard !== null && twoCard !== null) {
        if (oneCard.cardNumber != twoCard.cardNumber) {
          oneCard.open = false;
          twoCard.open = false;
          oneCard = null;
          twoCard = null;
        }
      }

      if (oneCard == null) {
        oneCard = copyCard;
      } else {
        if (twoCard == null) {
          twoCard = copyCard;
        }
      }

      if (oneCard !== null && twoCard !== null) {
        if (oneCard.cardNumber == twoCard.cardNumber) {
          oneCard.success = true;
          twoCard.success = true;
          oneCard = null;
          twoCard = null;
        }
      }

      if (
        document.querySelectorAll(".card-btn--active").length ==
        cardsNumberArray.length
      ) {
        startTimerGame = false;
        delete localStorage.horizonCard;
        delete localStorage.verticalCard;
        document.querySelector(".confetti").innerHTML = confetti;
        container.append(btnRestart);
      }
    });

    container.append(cardList);
  }

  btnRestart.addEventListener("click", () => {
    document.querySelector(".confetti").innerHTML = "";
    container.innerHTML = "";
    startGame(
      document.getElementById("card-game"),
      arrCard,
      quantityPairsHorizon,
      quantityPairsVertical
    );
  });

  // Таймер игры.
  function createTimerGame() {
    let timerGame = document.createElement("div");
    let interval;

    timerGame.classList.add("timer");
    timerGame.textContent = 60;

    if (!interval) {
      interval = setInterval(flashText, 1000);
    }
    function flashText() {
      if (parseInt(timerGame.textContent) > 0 && startTimerGame == true) {
        timerGame.textContent--;
      } else if (parseInt(timerGame.textContent) === 0) {
        clearInterval(interval);
        startTimerGame = false;
        container.innerHTML = "";
        startGame(
          document.getElementById("card-game"),
          arrCard,
          quantityPairsHorizon,
          quantityPairsVertical
        );
      }
    }
    return timerGame;
  }
}

startGame(
  document.getElementById("card-game"),
  arrCard,
  quantityPairsHorizon,
  quantityPairsVertical
);
