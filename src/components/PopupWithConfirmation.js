import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._button = this._popupElement.querySelector(".modal__btn");
  }

  setSubmitAction(fn) {
    this._handleSubmit = fn;
  }

  setEventListener() {
    super.setEventListener();
    this._button.addEventListener("click", () => {
      this._handleSubmit();
    });
  }
}
