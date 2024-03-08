import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._pictureImage = document.querySelector(".picture-modal__image");
    this._pictureTitle = document.querySelector(".picture-modal__title");
  }

  open({ _name, _link }) {
    this._pictureImage.src = _link;
    this._pictureImage.alt = _name;
    this._pictureTitle.textContent = _name;
    super.open();
  }
}
