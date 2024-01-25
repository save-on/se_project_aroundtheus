export default class formValidator {
  constructor(options) {
    this._options = options;
  }

  _showInputError() {
    this._errorElement = document.querySelector(
      `.${this._inputElement.id}-error`
    );
    this._errorElement.textContent = this._inputElement.validationMessage;
    this._errorElement.classList.add(this._options.errorClass);
    this._inputElement.classList.add(this._options.inputClassError);
  }

  _hideInputError() {
    this._errorElement = document.querySelector(
      `.${this._inputElement.id}-error`
    );
    this._errorElement.textContent = "";
    this._errorElement.classList.remove(this._options.errorClass);
    this._inputElement.classList.remove(this._options.inputClassError);
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.setAttribute("disabled", true);
    } else {
      this._buttonElement.removeAttribute("disabled");
    }
  }

  _checkInputValidity() {
    if (!this._inputElement.validity.valid) {
      this._showInputError();
    } else {
      this._hideInputError();
    }
  }

  _setEventListeners() {
    this._inputList = [
      ...this._formElement.querySelectorAll(this._options.inputSelector),
    ];
    this._buttonElement = this._formElement.querySelector(
      this._options.submitButtonSelector
    );
    this.toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._inputElement = inputElement;
        this._checkInputValidity();
        this.toggleButtonState();
      });
    });
  }

  enableValidation() {
    const formList = [...document.querySelectorAll(this._options.formSelector)];
    formList.forEach((formElement) => {
      this._formElement = formElement;
      this._formElement.addEventListener("submit", (e) => {
        e.preventDefault();
      });
      this._setEventListeners();
    });
  }
}
