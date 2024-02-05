export default class Popup {
  constructor({ popupSelector }) {
    this._popElement = document.querySelector(popupSelector);
  }

  open() {
    // opens popup
    modal.classList.add("modal_opened");
  }

  close() {
    // closes popup
    modal.classList.remove("modal_opened");
  }

  _handleEscClose() {
    // handle esc close
  }

  setEventListener() {
    // set eventlistener
    this._popElement.addEventListener("click");
  }
}
