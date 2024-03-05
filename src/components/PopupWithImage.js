import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._pictureImage = document.querySelector(".picture-modal__image");
    this._pictureTitle = document.querySelector(".picture-modal__title");
  }

  open({ name, link }) {
    this._pictureImage.src = link;
    this._pictureImage.alt = name;
    this._pictureTitle.textContent = name;
    super.open();
  }
}
