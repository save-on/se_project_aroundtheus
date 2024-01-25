export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._cardLikeBtn = this._cardElement.querySelector(".card__group");
    this._cardTrashBtn = this._cardElement.querySelector(".card__trash-bin");
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._element = this._getTemplate();
  }

  _setEventListener() {
    this._cardLikeBtn.addEventListener("click", () => {
      this._handleLikeBtn();
    });
    this._cardTrashBtn.addEventListener("click", () => {
      this._handleTrashBtn();
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  _handleLikeBtn() {
    this._cardLikeBtn.classList.toggle("card__group_active");
  }

  _handleTrashBtn() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _getTemplate() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return this._cardElement;
  }

  generateCard() {
    this._setEventListener();

    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__image").alt = this._name;
    this._element.querySelector(".card__title").textContent = this._name;

    return this._element;
  }
}
