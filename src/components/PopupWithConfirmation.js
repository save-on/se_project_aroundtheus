import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirmation) {
    super({ popupSelector });
    this._handleConfirmation = handleConfirmation;
    this._button = this._popupElement.querySelector(".modal__btn");
  }

  open(cardData) {
    this._cardData = cardData;
    super.open();
  }

  setEventListener() {
    super.setEventListener();
    this._button.addEventListener("click", () => {
      this._handleConfirmation(this._cardData, this._cardElement);
    });
  }
}
