import { fetchApi } from "./main.js";

class Card {
  _open = false;
  _success = false;

  constructor(cardList, cardNumber, flip) {
    this.cardList = cardList;
    this.cardNumber = cardNumber;
    this.flip = flip;

    const card = document.createElement("div");
    card.classList.add("card-btn");
    this._img.classList.add("card-img");
    this._imgCard.classList.add("card-wrapper");
    this._imgCard.src = "../img/ball-188918.png";
    card.textContent = this.cardNumber;
    this.card = card;
    card.append(this._imgCard, this._img);
    card.addEventListener("click", () => {
      if (
        card.classList.contains("card-btn--open") ||
        card.classList.contains("card-btn--active")
      ) {
        return;
      }
      if (this.open == false && this.success == false) {
        this.open = true;
      }
      this.flip(this);
    });
    this.cardList.append(card);
  }

  set open(value) {
    this._open = value;
    value
      ? this.card.classList.add("card-btn--open")
      : this.card.classList.remove("card-btn--open");
  }

  get open() {
    return this._open;
  }

  set success(value) {
    this._success = value;
    value
      ? this.card.classList.add("card-btn--active")
      : this.card.classList.remove("card-btn--active");
  }

  get success() {
    return this._success;
  }
}

export class AmazingCard extends Card {
  constructor(cardList, cardNumber, flip) {
    super(cardList, cardNumber, flip);
  }

  set cardNumber(value) {
    this._cardNumber = value;
    const imgCard = document.createElement("img");
    const img = document.createElement("img");
    fetchApi(this._cardNumber).then((url) => (img.src = url));
    img.alt = "picture";
    this._imgCard = imgCard;
    this._img = img;
    this._img.onerror = function () {
      throw new TypeError("Ошибка во время загрузки изображения");
    };
  }

  get cardNumber() {
    return this._cardNumber;
  }
}
