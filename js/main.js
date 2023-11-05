import { confetti } from "./confetti.js";
import { AmazingCard } from "./Сard.js";

// api с картинками.
export async function fetchApi(cardNumber) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${cardNumber}`);
  const data = await res.json();
  return data.sprites.back_default;
}

// Количество карт.

let arrCard = [];

// Музыкальное сопровождение игры.
function soundClick() {
  let audio = new Audio();
  audio.src = "./music/Gaming.mp3";
  audio.autoplay = true;
  audio.loop = true;
}
// soundClick();

function burgerMenu() {
  const container = document.createElement("div"),
    button = document.createElement("button"),
    spanBunTop = document.createElement("span"),
    spanChez = document.createElement("span"),
    spanMeet = document.createElement("span"),
    spanLettuce = document.createElement("span"),
    spanBunBottom = document.createElement("span");

  button.textContent = "меню";
  container.classList.add("burger-container");
  button.classList.add("burger");
  spanBunTop.classList.add("hamburger", "bun", "top");
  spanChez.classList.add("hamburger", "chez");
  spanMeet.classList.add("hamburger", "meet");
  spanLettuce.classList.add("hamburger", "lettuce");
  spanBunBottom.classList.add("hamburger", "bun", "bottom");

  button.append(spanBunTop, spanChez, spanMeet, spanLettuce, spanBunBottom);
  container.append(button);
  document.getElementById("card-game").append(container);
  return button;
}

// Поле ввода количества карт по вертикали/горизонтали.
function createModalForm() {
  const burgerButton = burgerMenu();
  const modal = document.createElement("div"),
    form = document.createElement("form"),
    buttonClose = document.createElement("button"),
    list = document.createElement("ul"),
    horizonSelectItem = document.createElement("li"),
    verticalSelectItem = document.createElement("li"),
    labelHorizonSelectItem = document.createElement("li"),
    labelVerticalSelectItem = document.createElement("li"),
    span1 = document.createElement("span"),
    span2 = document.createElement("span"),
    formTitle = document.createElement("h4"),
    horizonSelect = document.createElement("select"),
    verticalSelect = document.createElement("select"),
    labelHorizonSelect = document.createElement("span"),
    labelVerticalSelect = document.createElement("span"),
    horizonOption1 = document.createElement("option"),
    verticalOption1 = document.createElement("option"),
    horizonOption2 = document.createElement("option"),
    verticalOption2 = document.createElement("option"),
    horizonOption3 = document.createElement("option"),
    verticalOption3 = document.createElement("option"),
    verticalOption4 = document.createElement("option"),
    verticalOption5 = document.createElement("option"),
    btnStartGame = document.createElement("button");

  modal.classList.add("modal");
  form.classList.add("modal__form");
  formTitle.classList.add("form-title");
  buttonClose.classList.add("modal__btn-close");
  span1.classList.add("btn-close__span", "btn-close__span-1");
  span2.classList.add("btn-close__span", "btn-close__span-2");
  labelHorizonSelect.classList.add("form-label");
  labelVerticalSelect.classList.add("form-label");
  list.classList.add("modal__list");
  horizonSelect.classList.add("input-item");
  verticalSelect.classList.add("input-item");
  btnStartGame.classList.add("btnStartGame");
  formTitle.textContent = "Количество карт";
  labelHorizonSelect.textContent = "горизонтали";
  labelVerticalSelect.textContent = "вертикали";
  btnStartGame.textContent = "Начать новую игру";
  horizonOption1.textContent = 2;
  horizonOption2.textContent = 4;
  horizonOption3.textContent = 6;
  verticalOption1.textContent = 2;
  verticalOption2.textContent = 4;
  verticalOption3.textContent = 6;
  verticalOption4.textContent = 8;
  verticalOption5.textContent = 10;

  horizonSelect.append(horizonOption1, horizonOption2, horizonOption3);
  verticalSelect.append(
    verticalOption1,
    verticalOption2,
    verticalOption3,
    verticalOption4,
    verticalOption5
  );

  horizonSelectItem.append(horizonSelect);
  verticalSelectItem.append(verticalSelect);
  labelHorizonSelectItem.append(labelHorizonSelect);
  labelVerticalSelectItem.append(labelVerticalSelect);

  list.append(
    verticalSelectItem,
    labelVerticalSelectItem,
    horizonSelectItem,
    labelHorizonSelectItem
  );

  buttonClose.append(span1, span2);
  form.append(formTitle, list, btnStartGame, buttonClose);
  modal.append(form);

  burgerButton.addEventListener("click", function (e) {
    e.preventDefault();
    modal.classList.add("modal__form--active");
    form.classList.add("modal__form--active");
    this.classList.add("burger--none");
  });

  buttonClose.addEventListener("click", function (e) {
    e.preventDefault();
    modal.classList.remove("modal__form--active");
    form.classList.remove("modal__form--active");
    burgerButton.classList.remove("burger--none");
  });

  return {
    modal,
    form,
    horizonSelect,
    verticalSelect,
    btnStartGame,
  };
}

function createNumbersArray(count) {
  for (let i = 1; i <= count / 2; i++) {
    arrCard.push(i);
    arrCard.push(i);
  }
}

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function startGame(container, cardsNumberArray, horizon, vertical) {
  shuffle(cardsNumberArray);
  let startTimerGame = false;
  let oneCard = null;
  let twoCard = null;
  const title = document.createElement("h1");
  let cardList = document.createElement("div");
  let timerDiv = createTimerGame();
  const btnRestart = document.createElement("button");
  const inputStartGame = createModalForm();

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
  container.append(inputStartGame.modal);
  container.append(timerDiv);

  inputStartGame.form.addEventListener("submit", (e) => {
    e.preventDefault();
    container.innerHTML = "";
    arrCard.length = 0;

    localStorage.horizonCard = inputStartGame.horizonSelect.value;
    localStorage.verticalCard = inputStartGame.verticalSelect.value;

    createNumbersArray(localStorage.horizonCard * localStorage.verticalCard);

    startGame(
      document.getElementById("card-game"),
      arrCard,
      localStorage.horizonCard,
      localStorage.verticalCard
    );
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
      localStorage.horizonCard,
      localStorage.verticalCard
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
          localStorage.horizonCard,
          localStorage.verticalCard
        );
      }
    }
    return timerGame;
  }
}

startGame(
  document.getElementById("card-game"),
  arrCard,
  localStorage.horizonCard,
  localStorage.verticalCard
);
