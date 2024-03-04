import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirmation) {
    super({ popupSelector });
    this._handleConfirmation = handleConfirmation;
    this._button = this._popupElement.querySelector(".modal__btn");
  }

  setEventListener() {
    this._button.addEventListener("click", this._handleConfirmation);
    super.setEventListener();
  }
}
