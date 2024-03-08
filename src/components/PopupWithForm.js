import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = [...this._popupForm.querySelectorAll(".modal__input")];
    this._modalBtn = this._popupElement.querySelector(".modal__btn");
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  _getValueInputs() {
    const data = {};
    this._inputList.forEach((inputElement) => {
      data[inputElement.name] = inputElement.value;
    });
    return data;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._modalBtn.textContent = "Saving...";
    } else {
      this._modalBtn.textContent = "Save";
    }
  }

  setEventListener() {
    this._popupForm.addEventListener("submit", () => {
      this._handleFormSubmit(this._getValueInputs());
    });
    super.setEventListener();
  }
}
