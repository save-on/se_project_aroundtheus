export default class formValidator {
  constructor(options, formElement) {
    this._options = options;
    this._formElement = formElement;
    this._buttonElement = this._formElement.querySelector(
      this._options.submitButtonSelector
    );
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
    this._errorElement = this._formElement.querySelector(
      `.${this._inputElement.id}-error`
    );
    this._errorElement.textContent = "";
    this._errorElement.classList.remove(this._options.errorClass);
    this._inputElement.classList.remove(this._options.inputClassError);
  }

  resetValidation() {
    this.toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._inputElement = inputElement;
      this._hideInputError();
    });
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
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._setEventListeners();
  }
}
