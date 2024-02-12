import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = [...this._popupForm.querySelectorAll(".modal__input")];
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  open() {
    super.open();
  }

  _getValueInputs() {
    const data = {};
    this._inputList.forEach((inputElement) => {
      data[inputElement.name] = inputElement.value;
    });
    return data;
  }

  setEventListener() {
    this._popupForm.addEventListener("submit", () => {
      this._handleFormSubmit(this._getValueInputs());
    });
    super.setEventListener();
  }
}
