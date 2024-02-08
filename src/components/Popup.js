export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeBtns = document.querySelectorAll(".modal__close-btn");
    this._modals = document.querySelectorAll(".modal");
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    this._handleEscClose();
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", () => {
      this._handleEscClose;
    });
  }

  _handleEscClose() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.close();
      }
    });
  }

  setEventListener() {
    this._closeBtns.forEach((button) => {
      button.addEventListener("click", () => {
        this.close();
      });
    });
    this._modals.forEach((modal) => {
      modal.addEventListener("mousedown", (e) => {
        if (e.target === modal) {
          this.close();
        }
      });
    });
  }
}
