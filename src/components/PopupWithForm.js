import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  close() {
    this.popUpForm.reset();
    super.close();
  }
}
