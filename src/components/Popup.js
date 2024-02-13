export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeBtn = this._popupElement.querySelector(".modal__close-btn");
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (e) => {
    if (e.key === "Escape") {
      this.close();
    }
  };

  setEventListener() {
    this._closeBtn.addEventListener("click", () => {
      this.close();
    });
    this._popupElement.addEventListener("mousedown", (e) => {
      if (e.target === this._popupElement) {
        this.close();
      }
    });
  }
}
