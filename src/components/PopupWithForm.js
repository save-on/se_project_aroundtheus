import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = document.forms["card-form"];
    this._handleFormSubmit = handleFormSubmit;
    this._name = document.querySelector(".modal__input_type_create-title");
    this._link = document.querySelector(".modal__input_type_image-link");
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
    data.name = this._name;
    data.link = this._link;
    console.log(this._name);
    console.log(this._link);
  }

  setEventListener() {
    this._popupForm.addEventListener("submit", () => {
      this._handleFormSubmit();
    });
    super.setEventListener();
  }
}
